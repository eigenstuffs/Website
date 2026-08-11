<script>
	import { onMount, onDestroy } from 'svelte';
	import {
		cssGradientFromPalette,
		hourOfDay,
		paletteAtHour,
		wrapHour
	} from '$lib/sky/palettes';
	/** @typedef {import('$lib/sky/palettes').SkyPalette} SkyPalette */

	/** Scrub offset in hours (keyboard h/l). */
	let scrub = 0;
	let useFallback = false;
	let fallbackStyle = '';
	/** Hour currently being rendered, for the readout. */
	let shownHour = 0;

	/** @type {HTMLCanvasElement | undefined} */
	let canvas;
	/** @type {HTMLDivElement | undefined} */
	let band;

	/** @type {WebGLRenderingContext | null} */
	let gl = null;
	/** @type {WebGLProgram | null} */
	let program = null;
	/** @type {number | null} */
	let raf = null;
	/** @type {ReturnType<typeof setInterval> | null} */
	let clockTimer = null;
	/** @type {ResizeObserver | null} */
	let ro = null;
	/** @type {IntersectionObserver | null} */
	let io = null;
	/** @type {MediaQueryList | null} */
	let schemeQuery = null;

	/** @type {Record<string, WebGLUniformLocation | null>} */
	let uniforms = {};
	let startTime = 0;
	let reducedMotion = false;
	/** Band intersects the viewport. */
	let onScreen = true;
	/** Tab is foregrounded. */
	let tabVisible = true;
	/** Page background in linear 0–1 RGB, so the band can settle into it in either theme. */
	let pageBg = [1, 1, 1];

	const VS = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

	const FS = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uSun;
uniform float uSunBloom;
uniform vec3 uSunGlow;
uniform vec3 uZenith;
uniform vec3 uMid;
uniform vec3 uLow;
uniform float uStarAmt;
uniform float uCirrusAmt;
uniform vec3 uCirrusTint;
uniform vec3 uPageBg;

/*
 * Sine-based hashes correlate badly at lattice scale and threw visible
 * diagonal moire through the star field. This is the standard sine-free
 * integer hash, which distributes evenly.
 */
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 frag = gl_FragCoord.xy / uRes; // y: 0 bottom, 1 top
  float aspect = uRes.x / max(uRes.y, 1.0);
  float ys = frag.y;
  vec2 p = vec2(frag.x * aspect, ys);
  float t = uTime;

  // Vertical gradient: low band -> mid -> zenith.
  vec3 col = mix(uMid, uZenith, smoothstep(0.45, 1.02, ys));
  col = mix(uLow, col, smoothstep(0.0, 0.5, ys));

  // Sun. A tight core inside a broad halo, stretched horizontally the way
  // atmospheric scatter spreads along the horizon. Deliberately dim: this is
  // a glow in the sky, not a light source pointed at the reader.
  vec2 d = p - vec2(uSun.x * aspect, uSun.y);
  d.x *= 0.62;
  float sd2 = dot(d, d);
  // The core only resolves when the sun is low; overhead it is pure wash.
  float lowSun = 1.0 - smoothstep(0.05, 0.5, uSun.y);
  float core = exp(-sd2 * mix(240.0, 70.0, uSunBloom)) * (0.2 + 0.8 * lowSun);
  float halo = exp(-sd2 * mix(28.0, 7.0, uSunBloom));
  col += uSunGlow * (core * 0.38 + halo * 0.17 * (0.5 + uSunBloom));

  // Cirrus, drifting slowly across the upper band.
  if (uCirrusAmt > 0.01) {
    vec2 cuv = vec2(p.x * 0.5 + t * 0.008, ys * 2.1 + 0.25);
    float band = smoothstep(0.22, 0.7, ys) * (1.0 - smoothstep(0.88, 1.05, ys));
    float w = fbm(cuv);
    float cirrus = smoothstep(0.42, 0.72, w) * band * uCirrusAmt;
    col = mix(col, uCirrusTint, cirrus * 0.26);
    float w2 = fbm(cuv * 1.65 + vec2(2.4, -t * 0.22));
    float thin = smoothstep(0.55, 0.82, w2) * band * uCirrusAmt * 0.4;
    col = mix(col, uCirrusTint * 1.03, thin * 0.18);
  }

  // Stars, thinning toward the lower haze. Brightness varies per star so the
  // field reads as depth rather than as a uniform sprinkle.
  if (uStarAmt > 0.01) {
    vec2 grid = floor((p / vec2(aspect, 1.0)) * uRes * 0.4);
    float n = hash(grid);
    float mag = hash(grid + 41.7);
    float twinkle = 0.9 + 0.1 * sin(t * (0.15 + mag * 0.25) + mag * 20.0);
    float star = step(0.9975, n) * (0.35 + 0.65 * mag * mag) * twinkle;
    col += vec3(star * uStarAmt * smoothstep(0.15, 0.7, ys));
  }

  /*
   * Settle into the page background. The lower 18% of the band resolves to
   * exactly uPageBg, which is the strip the content overlaps -- so headings
   * always sit on flat page colour, in either theme -- and the fade above it
   * is long and eased so the transition never reads as an edge.
   */
  float settle = 1.0 - smoothstep(0.18, 0.68, ys);
  settle = settle * settle * (3.0 - 2.0 * settle);
  col = mix(col, uPageBg, settle);

  // Static ordered-ish dither at 1/255 to kill 8-bit gradient banding.
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}
`;

	/**
	 * @param {WebGLRenderingContext} g
	 * @param {number} type
	 * @param {string} src
	 */
	function compile(g, type, src) {
		const s = g.createShader(type);
		if (!s) return null;
		g.shaderSource(s, src);
		g.compileShader(s);
		if (!g.getShaderParameter(s, g.COMPILE_STATUS)) {
			console.error(g.getShaderInfoLog(s));
			g.deleteShader(s);
			return null;
		}
		return s;
	}

	/** Read --bg off the document so the band settles into the active theme. */
	function readPageBg() {
		if (typeof window === 'undefined') return;
		const raw = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
		const hex = raw.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
		if (hex) {
			let h = hex[1];
			if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
			pageBg = [
				parseInt(h.slice(0, 2), 16) / 255,
				parseInt(h.slice(2, 4), 16) / 255,
				parseInt(h.slice(4, 6), 16) / 255
			];
			return;
		}
		const rgb = raw.match(/(\d+(?:\.\d+)?)/g);
		if (rgb && rgb.length >= 3) {
			pageBg = [Number(rgb[0]) / 255, Number(rgb[1]) / 255, Number(rgb[2]) / 255];
		}
	}

	function pageBgCss() {
		const c = pageBg.map((v) => Math.round(v * 255));
		return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
	}

	/**
	 * @param {SkyPalette} p
	 */
	function applyPalette(p) {
		shownHour = p.hour;
		if (!gl || !program) {
			fallbackStyle = `background: ${cssGradientFromPalette(p, pageBgCss())};`;
			return;
		}
		gl.useProgram(program);
		gl.uniform2f(uniforms.uSun, p.sunX, p.sunY);
		gl.uniform1f(uniforms.uSunBloom, p.sunBloom);
		gl.uniform3fv(uniforms.uSunGlow, p.sunGlow);
		gl.uniform3fv(uniforms.uZenith, p.skyZenith);
		gl.uniform3fv(uniforms.uMid, p.skyMid);
		gl.uniform3fv(uniforms.uLow, p.skyLow);
		gl.uniform1f(uniforms.uStarAmt, p.starAmt);
		gl.uniform1f(uniforms.uCirrusAmt, p.cirrusAmt);
		gl.uniform3fv(uniforms.uCirrusTint, p.cirrusTint);
		gl.uniform3fv(uniforms.uPageBg, pageBg);
	}

	function currentPalette() {
		return paletteAtHour(wrapHour(hourOfDay(new Date()) + scrub));
	}

	function resize() {
		if (!canvas || !band) return;
		const rect = band.getBoundingClientRect();
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const w = Math.max(1, Math.floor(rect.width * dpr));
		const h = Math.max(1, Math.floor(rect.height * dpr));
		if (canvas.width !== w || canvas.height !== h) {
			canvas.width = w;
			canvas.height = h;
			canvas.style.width = `${rect.width}px`;
			canvas.style.height = `${rect.height}px`;
			if (gl) {
				gl.viewport(0, 0, w, h);
				if (program && uniforms.uRes) {
					gl.useProgram(program);
					gl.uniform2f(uniforms.uRes, w, h);
				}
			}
			draw(performance.now());
		}
	}

	/** @param {number} now */
	function draw(now) {
		if (!gl || !program) return;
		gl.useProgram(program);
		if (!reducedMotion) {
			gl.uniform1f(uniforms.uTime, (now - startTime) * 0.001);
		}
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}

	/** @param {number} now */
	function frame(now) {
		draw(now);
		raf = requestAnimationFrame(frame);
	}

	/** Animate only while the band is on screen, the tab is visible, and motion is allowed. */
	function syncLoop() {
		const shouldRun = onScreen && tabVisible && !reducedMotion && !!gl && !!program;
		if (shouldRun && raf == null) {
			raf = requestAnimationFrame(frame);
		} else if (!shouldRun && raf != null) {
			cancelAnimationFrame(raf);
			raf = null;
		}
	}

	function syncPalette() {
		applyPalette(currentPalette());
		if (raf == null) draw(performance.now());
	}

	function onSchemeChange() {
		readPageBg();
		syncPalette();
	}

	function onVisibility() {
		tabVisible = !document.hidden;
		syncLoop();
	}

	/** @param {KeyboardEvent} e */
	function onKey(e) {
		if (e.metaKey || e.ctrlKey || e.altKey) return;
		const target = /** @type {HTMLElement} */ (e.target);
		const tag = target?.tagName;
		if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) return;
		if (e.key === 'h' || e.key === 'H') {
			scrub = wrapHour(scrub - 0.35);
			syncPalette();
		} else if (e.key === 'l' || e.key === 'L') {
			scrub = wrapHour(scrub + 0.35);
			syncPalette();
		}
	}

	function resetScrub() {
		scrub = 0;
		syncPalette();
	}

	/** @param {number} h */
	function formatHour(h) {
		const hh = Math.floor(h);
		const mm = Math.floor((h - hh) * 60);
		return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
	}

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		startTime = performance.now();
		readPageBg();

		schemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		schemeQuery.addEventListener('change', onSchemeChange);

		if (!canvas) {
			useFallback = true;
			syncPalette();
			return;
		}

		const ctx = canvas.getContext('webgl', {
			antialias: false,
			alpha: false,
			failIfMajorPerformanceCaveat: false
		});

		if (!ctx) {
			useFallback = true;
			syncPalette();
			return;
		}

		gl = ctx;
		const vs = compile(gl, gl.VERTEX_SHADER, VS);
		const fs = compile(gl, gl.FRAGMENT_SHADER, FS);
		if (!vs || !fs) {
			useFallback = true;
			syncPalette();
			return;
		}

		program = gl.createProgram();
		if (!program) {
			useFallback = true;
			syncPalette();
			return;
		}
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.bindAttribLocation(program, 0, 'aPos');
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error(gl.getProgramInfoLog(program));
			useFallback = true;
			syncPalette();
			return;
		}

		const buf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
			gl.STATIC_DRAW
		);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

		gl.useProgram(program);
		const names = [
			'uRes',
			'uTime',
			'uSun',
			'uSunBloom',
			'uSunGlow',
			'uZenith',
			'uMid',
			'uLow',
			'uStarAmt',
			'uCirrusAmt',
			'uCirrusTint',
			'uPageBg'
		];
		uniforms = {};
		for (const n of names) uniforms[n] = gl.getUniformLocation(program, n);

		resize();
		syncPalette();
		syncLoop();

		ro = new ResizeObserver(() => resize());
		if (band) ro.observe(band);

		io = new IntersectionObserver(
			(entries) => {
				onScreen = entries[0]?.isIntersecting ?? true;
				syncLoop();
			},
			{ rootMargin: '64px' }
		);
		if (band) io.observe(band);

		document.addEventListener('visibilitychange', onVisibility);
		clockTimer = setInterval(syncPalette, 30_000);
		window.addEventListener('keydown', onKey);
	});

	onDestroy(() => {
		if (raf != null) cancelAnimationFrame(raf);
		if (clockTimer != null) clearInterval(clockTimer);
		ro?.disconnect();
		io?.disconnect();
		schemeQuery?.removeEventListener('change', onSchemeChange);
		if (typeof document !== 'undefined') {
			document.removeEventListener('visibilitychange', onVisibility);
		}
		if (typeof window !== 'undefined') {
			window.removeEventListener('keydown', onKey);
		}
		if (gl && program) {
			gl.deleteProgram(program);
		}
		gl = null;
		program = null;
	});
</script>

<div class="sky-root">
	<div
		class="sky-band"
		bind:this={band}
		aria-hidden="true"
		style={useFallback ? fallbackStyle : undefined}
	>
		{#if !useFallback}
			<canvas bind:this={canvas} class="sky-canvas"></canvas>
		{/if}
	</div>

	{#if scrub !== 0}
		<div class="sky-meta">
			<p class="sky-readout">
				<span class="sky-time">{formatHour(shownHour)}</span>
				<button type="button" class="sky-reset" on:click={resetScrub}>now</button>
			</p>
		</div>
	{/if}
</div>

<style>
	.sky-root {
		position: relative;
		width: 100%;
		z-index: 0;
		pointer-events: none;
	}

	/*
	 * The negative margin pulls content up into the band's lower 18%, which the
	 * shader resolves to flat page background. Keep the two in step: the offset
	 * must stay <= 18% of the height.
	 */
	.sky-band {
		pointer-events: none;
		position: relative;
		width: 100%;
		height: 22rem;
		margin-bottom: -3.75rem;
		overflow: hidden;
	}

	.sky-canvas {
		position: absolute;
		inset: 0;
		display: block;
		width: 100%;
		height: 100%;
	}

	/*
	 * Only present while the sky is being scrubbed, so there is no idle chrome.
	 * Aligned to the content column, pinned near the top of the band where it
	 * cannot collide with the nav sitting in the band's negative-margin overlap.
	 */
	.sky-meta {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 0.75rem;
		width: 100%;
		max-width: var(--measure);
		padding: 0 var(--gutter);
		display: flex;
		justify-content: flex-end;
		pointer-events: none;
	}

	.sky-readout {
		display: flex;
		align-items: baseline;
		gap: 0.55rem;
		margin: 0;
		padding: 0.2rem 0.5rem;
		border-radius: 999px;
		/* Fixed translucent scrim: legible against every palette, in both themes. */
		background: rgba(12, 12, 16, 0.34);
		color: rgba(255, 255, 255, 0.92);
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.06em;
		animation: sky-meta-in 0.18s ease-out;
	}

	.sky-time {
		font-variant-numeric: tabular-nums;
	}

	.sky-reset {
		font: inherit;
		letter-spacing: inherit;
		color: inherit;
		background: none;
		border: none;
		border-bottom: 1px solid rgba(255, 255, 255, 0.45);
		padding: 0;
		cursor: pointer;
		pointer-events: auto;
	}

	.sky-reset:hover {
		border-bottom-color: rgba(255, 255, 255, 0.9);
	}

	.sky-reset:focus-visible {
		outline: 2px solid rgba(255, 255, 255, 0.8);
		outline-offset: 2px;
	}

	@keyframes sky-meta-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 640px) {
		.sky-band {
			height: 16rem;
			margin-bottom: -2.75rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.sky-readout {
			animation: none;
		}
	}
</style>
