<script lang="ts">
  import { onMount } from 'svelte';

  const NODE_COUNT = 45;
  const W = 800;
  const H = 160;
  const EDGE_DIST = 100;

  function seededRandom(seed: number) {
    let s = seed;
    return () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };
  }

  interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    color: string;
  }

  const rng = seededRandom(42);
  const colors = ['#c2410c', '#4a6741', '#d6d0c4', '#78716c'];

  let nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
    x: rng() * W,
    y: rng() * H,
    vx: (rng() - 0.5) * 0.3,
    vy: (rng() - 0.5) * 0.2,
    r: 2 + rng() * 3,
    color: colors[Math.floor(rng() * colors.length)],
  }));

  let edges: Array<[number, number, number]> = [];
  let mouseX = W / 2;
  let mouseY = H / 2;
  let frame: number;
  let svgEl: SVGSVGElement;

  function computeEdges() {
    edges = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < EDGE_DIST) {
          edges.push([i, j, 1 - d / EDGE_DIST]);
        }
      }
    }
  }

  function tick() {
    nodes = nodes.map((n) => {
      let { x, y, vx, vy } = n;

      const rect = svgEl?.getBoundingClientRect();
      if (rect && rect.width > 0) {
        const scaleX = W / rect.width;
        const scaleY = H / rect.height;
        const mx = mouseX * scaleX;
        const my = mouseY * scaleY;
        const dx = mx - x;
        const dy = my - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          vx += (dx / dist) * 0.015;
          vy += (dy / dist) * 0.015;
        }
      }

      x += vx;
      y += vy;
      vx *= 0.998;
      vy *= 0.998;

      if (x < 0) { x = 0; vx *= -0.5; }
      if (x > W) { x = W; vx *= -0.5; }
      if (y < 0) { y = 0; vy *= -0.5; }
      if (y > H) { y = H; vy *= -0.5; }

      return { ...n, x, y, vx, vy };
    });
    computeEdges();
    frame = requestAnimationFrame(tick);
  }

  function handleMouseMove(e: MouseEvent) {
    if (!svgEl) return;
    const rect = svgEl.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }

  onMount(() => {
    computeEdges();
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });
</script>

<div
  class="field"
  role="presentation"
  aria-hidden="true"
  on:mousemove={handleMouseMove}
>
  <svg
    bind:this={svgEl}
    viewBox="0 0 {W} {H}"
    preserveAspectRatio="xMidYMid slice"
  >
    {#each edges as [i, j, strength]}
      <line
        x1={nodes[i].x}
        y1={nodes[i].y}
        x2={nodes[j].x}
        y2={nodes[j].y}
        stroke="var(--border)"
        stroke-width="0.8"
        opacity={strength * 0.5}
      />
    {/each}
    {#each nodes as node}
      <circle
        cx={node.x}
        cy={node.y}
        r={node.r}
        fill={node.color}
        opacity="0.7"
      />
    {/each}
  </svg>
</div>

<style>
  .field {
    width: 100%;
    margin: 1rem 0 1.5rem;
    border-top: 2px solid var(--border);
    border-bottom: 2px solid var(--border);
    overflow: hidden;
    cursor: crosshair;
  }

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
