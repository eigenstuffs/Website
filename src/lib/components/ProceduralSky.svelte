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

	/** @type {Record<string, WebGLUniformLocation | null>} */
	let uniforms = {};
	let startTime = 0;
	let reducedMotion = false;

	const VS = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

	const FS = `
precision mediump float;
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
uniform vec3 uLandNear;
uniform vec3 uLandFar;
uniform vec3 uSeaBody;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
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

// Soft coastal skyline: far range then near range, left-anchored
vec2 coastHeights(float x, float aspect) {
  float nx = x / max(aspect, 0.001);
  // continental dome off-frame left so the range holds at the edge
  float dome = exp(-pow((nx + 0.35) * 1.55, 2.0));
  float far = 0.08 + 0.22 * dome + 0.04 * noise(vec2(nx * 3.2, 1.7));
  float near = 0.02 + 0.18 * exp(-pow((nx + 0.15) * 2.1, 2.0))
             + 0.05 * noise(vec2(nx * 5.5, 4.2));
  // roll into the sea toward mid-frame
  float sea = smoothstep(0.55, 0.95, nx);
  far *= 1.0 - sea * 0.92;
  near *= 1.0 - sea * 0.98;
  return vec2(far, near);
}

vec3 skyAt(vec2 p, float aspect, float t) {
  float ys = p.y;
  vec3 col = mix(uMid, uZenith, smoothstep(0.48, 1.02, ys));
  col = mix(uLow, col, smoothstep(0.0, 0.52, ys));

  // Soft sun bloom
  vec2 sunPos = vec2(uSun.x * aspect, uSun.y);
  float sd = length(p - sunPos);
  float bloom = exp(-sd * sd * mix(7.0, 26.0, 1.0 - uSunBloom));
  float disk = smoothstep(0.05, 0.016, sd);
  col += uSunGlow * bloom * (0.5 + uSunBloom);
  col += uSunGlow * disk * 0.9;

  // Cirrus brush strokes
  if (uCirrusAmt > 0.01) {
    vec2 cuv = vec2(p.x * 0.5 + t * 0.012, ys * 2.1 + 0.25);
    float w = fbm(cuv);
    float band = smoothstep(0.32, 0.82, ys) * (1.0 - smoothstep(0.9, 1.05, ys));
    float cirrus = smoothstep(0.4, 0.7, w) * band * uCirrusAmt;
    col = mix(col, uCirrusTint, cirrus * 0.32);
    float w2 = fbm(cuv * 1.65 + vec2(2.4, -t * 0.35));
    float thin = smoothstep(0.55, 0.8, w2) * band * uCirrusAmt * 0.4;
    col = mix(col, uCirrusTint * 1.04, thin * 0.22);
  }

  // Stars
  if (uStarAmt > 0.01) {
    vec2 grid = floor((p / vec2(aspect, 1.0)) * uRes * 0.42);
    float n = hash(grid);
    float twinkle = 0.94 + 0.06 * sin(t * (0.12 + n * 0.18) + n * 12.0);
    float star = step(0.9972, n) * twinkle;
    float airmass = mix(1.1, 0.75, ys);
    float starFade = smoothstep(0.18, 0.62, ys);
    col += vec3(star * uStarAmt * airmass * starFade);
  }

  // Coastal ranges painted into sky space
  vec2 hh = coastHeights(p.x, aspect);
  float aa = 0.012;
  float farM = 1.0 - smoothstep(hh.x - aa, hh.x + aa, ys);
  float nearM = 1.0 - smoothstep(hh.y - aa, hh.y + aa, ys);
  // only where the range exists
  farM *= step(0.01, hh.x);
  nearM *= step(0.008, hh.y);
  col = mix(col, uLandFar, farM * 0.92);
  col = mix(col, uLandNear, nearM * 0.95);

  return col;
}

void main() {
  vec2 frag = gl_FragCoord.xy / uRes; // y: 0 bottom, 1 top
  float aspect = uRes.x / max(uRes.y, 1.0);
  float t = uTime;
  // Horizon: sky above, still water below
  float H = 0.42;

  vec3 col;
  if (frag.y >= H) {
    float ys = (frag.y - H) / max(1.0 - H, 0.001);
    vec2 p = vec2(frag.x * aspect, ys);
    col = skyAt(p, aspect, t);
  } else {
    float depth = 1.0 - frag.y / H;
    // Soft vertical shimmer + horizontal ripple
    float rx = (noise(vec2(frag.x * 18.0, t * 0.08)) - 0.5) * 0.02 * depth;
    float ry = (noise(vec2(frag.x * 9.0 + 3.1, t * 0.06)) - 0.5) * 0.03 * depth;
    float ym = clamp((H - frag.y) / max(1.0 - H, 0.001) * 0.9 + ry, 0.0, 1.0);
    vec2 rp = vec2((frag.x + rx) * aspect, ym);
    vec3 refl = skyAt(rp, aspect, t);
    // Fresnel: more mirror near horizon, more body color near viewer
    float fres = mix(0.35, 0.88, smoothstep(0.0, 0.55, frag.y / H));
    col = mix(uSeaBody, refl, fres);
    // Soft crest highlights
    float crest = smoothstep(0.55, 0.75, noise(vec2(frag.x * 22.0, t * 0.2 + frag.y * 8.0)));
    col += uSunGlow * crest * 0.04 * (1.0 - depth);
    // Darken slightly with depth
    col *= mix(0.78, 1.0, fres);
  }

  // Soft wash into page white — strong near the bottom, sparing the upper sky
  float whiteBlend = smoothstep(0.38, 0.0, frag.y);
  col = mix(col, vec3(1.0), whiteBlend * 0.82);

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

	/**
	 * @param {SkyPalette} p
	 */
	function applyPalette(p) {
		if (!gl || !program) {
			fallbackStyle = `background: ${cssGradientFromPalette(p)};`;
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
		gl.uniform3fv(uniforms.uLandNear, p.landNear);
		gl.uniform3fv(uniforms.uLandFar, p.landFar);
		gl.uniform3fv(uniforms.uSeaBody, p.seaBody);
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
		}
	}

	/** @param {number} now */
	function frame(now) {
		if (!gl || !program) return;
		gl.useProgram(program);
		if (!reducedMotion) {
			gl.uniform1f(uniforms.uTime, (now - startTime) * 0.001);
		}
		gl.drawArrays(gl.TRIANGLES, 0, 6);
		raf = requestAnimationFrame(frame);
	}

	function syncPalette() {
		applyPalette(currentPalette());
	}

	/** @param {KeyboardEvent} e */
	function onKey(e) {
		if (e.metaKey || e.ctrlKey || e.altKey) return;
		const tag = /** @type {HTMLElement} */ (e.target)?.tagName;
		if (tag === 'INPUT' || tag === 'TEXTAREA' || /** @type {HTMLElement} */ (e.target)?.isContentEditable) {
			return;
		}
		if (e.key === 'h' || e.key === 'H') {
			scrub = wrapHour(scrub - 0.35);
			syncPalette();
		} else if (e.key === 'l' || e.key === 'L') {
			scrub = wrapHour(scrub + 0.35);
			syncPalette();
		}
	}

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		startTime = performance.now();

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
			'uLandNear',
			'uLandFar',
			'uSeaBody'
		];
		uniforms = {};
		for (const n of names) uniforms[n] = gl.getUniformLocation(program, n);

		resize();
		syncPalette();
		raf = requestAnimationFrame(frame);

		ro = new ResizeObserver(() => resize());
		if (band) ro.observe(band);

		clockTimer = setInterval(syncPalette, 30_000);
		if (typeof window !== 'undefined') {
			window.addEventListener('keydown', onKey);
		}
	});

	onDestroy(() => {
		if (raf != null) cancelAnimationFrame(raf);
		if (clockTimer != null) clearInterval(clockTimer);
		ro?.disconnect();
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

<div class="sky-root" aria-hidden="true">
	<div class="sky-band" bind:this={band} style={useFallback ? fallbackStyle : undefined}>
		{#if !useFallback}
			<canvas bind:this={canvas} class="sky-canvas"></canvas>
		{/if}
		<span class="sky-hint">← h · l →</span>
	</div>
</div>

<style>
	.sky-root {
		pointer-events: none;
		position: relative;
		width: 100%;
		z-index: 0;
	}

	.sky-band {
		position: relative;
		width: 100%;
		height: 16rem;
		margin-bottom: -5.5rem;
		overflow: hidden;
		-webkit-mask-image: linear-gradient(
			to bottom,
			#000 0%,
			#000 40%,
			rgba(0, 0, 0, 0.9) 55%,
			rgba(0, 0, 0, 0.55) 68%,
			rgba(0, 0, 0, 0.22) 80%,
			rgba(0, 0, 0, 0.06) 90%,
			transparent 100%
		);
		mask-image: linear-gradient(
			to bottom,
			#000 0%,
			#000 40%,
			rgba(0, 0, 0, 0.9) 55%,
			rgba(0, 0, 0, 0.55) 68%,
			rgba(0, 0, 0, 0.22) 80%,
			rgba(0, 0, 0, 0.06) 90%,
			transparent 100%
		);
	}

	.sky-canvas {
		position: absolute;
		inset: 0;
		display: block;
		width: 100%;
		height: 100%;
	}

	.sky-hint {
		position: absolute;
		right: 0.75rem;
		top: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.62rem;
		letter-spacing: 0.06em;
		color: rgba(255, 255, 255, 0.45);
		user-select: none;
		opacity: 0.65;
	}

	@media (max-width: 640px) {
		.sky-band {
			height: 13rem;
			margin-bottom: -4rem;
		}

		.sky-hint {
			display: none;
		}
	}
</style>
