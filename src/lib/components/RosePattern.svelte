<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  const W = 47;
  const H = 23;
  const FRAMES = 48;
  const MS = 110;
  const ASPECT = 2.15;
  const R_MAX = 20;

  // Character weight gradient
  const CH  = ['.', ':', ':', '*', '*', '#'];
  // Color class per level
  const CL  = ['e', 'e', 'd', 'c', 'b', 'a'];

  function frame(t: number): number[][] {
    const cx = (W - 1) / 2;
    const cy = (H - 1) / 2;
    const pulse = 0.88 + 0.12 * Math.sin(t * 5);
    const out: number[][] = [];

    for (let y = 0; y < H; y++) {
      const row: number[] = [];
      for (let x = 0; x < W; x++) {
        const dx = x - cx;
        const dy = (y - cy) * ASPECT;
        const r  = Math.sqrt(dx * dx + dy * dy);
        const th = Math.atan2(dy, dx);

        // ---- primary rose: 6-petal flower rotating slowly ----
        const rose = Math.abs(Math.cos(3 * (th + t)));
        const cR   = rose * R_MAX * pulse;

        // edge glow (bright outline of petals)
        const eDist = Math.abs(r - cR);
        const edge  = Math.max(0, 1 - eDist / 3.2);

        // interior wash (soft fill inside petals)
        let fill = 0;
        if (cR > 2 && r < cR) {
          fill = 0.45 * Math.sqrt(1 - r / cR);
        }

        // secondary lace: finer pattern for interior texture
        const lace    = Math.abs(Math.cos(5 * th - t * 1.7));
        const laceR   = lace * cR * 0.85;
        const laceDist = Math.abs(r - laceR);
        let laceVal    = 0;
        if (cR > 3 && r < cR) {
          laceVal = Math.max(0, 1 - laceDist / 2) * 0.35;
        }

        // bright center (pistil)
        const center = r < 3 ? Math.pow(1 - r / 3, 0.6) : 0;

        // combine
        let v = Math.max(edge, fill + laceVal, center);
        v = Math.max(0.04, Math.min(1, v));

        row.push(Math.min(CH.length - 1, Math.round(v * (CH.length - 1))));
      }
      out.push(row);
    }
    return out;
  }

  function html(grid: number[][]): string {
    let s = '';
    for (let y = 0; y < H; y++) {
      let x = 0;
      while (x < W) {
        const c = CL[grid[y][x]];
        let run = '';
        while (x < W && CL[grid[y][x]] === c) { run += CH[grid[y][x]]; x++; }
        s += `<span class="${c}">${run}</span>`;
      }
      if (y < H - 1) s += '\n';
    }
    return s;
  }

  let pages: string[] = [];
  let idx = 0;
  let timer: ReturnType<typeof setInterval> | undefined;
  let ok = false;

  onMount(() => {
    for (let i = 0; i < FRAMES; i++) {
      pages.push(html(frame((i / FRAMES) * Math.PI / 3)));
    }
    ok = true;
    timer = setInterval(() => { idx = (idx + 1) % FRAMES; }, MS);
  });

  onDestroy(() => { if (timer) clearInterval(timer); });
</script>

{#if ok}
<div class="panel" aria-hidden="true">
  <pre>{@html pages[idx]}</pre>
</div>
{/if}

<style>
  .panel {
    margin: 1.5rem 0;
    border: 1px solid #181818;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(ellipse at center, rgba(255,200,0,0.025) 0%, transparent 60%);
  }

  pre {
    margin: 0;
    padding: 1.2rem 1.8rem;
    font-family: 'Courier New', 'Lucida Console', monospace;
    font-size: 11px;
    line-height: 1.15;
    white-space: pre;
    user-select: none;
  }

  /* Brightness tiers — gold gradient from invisible to radiant */
  pre :global(.a) { color: #ffd700; text-shadow: 0 0 6px rgba(255,215,0,0.35); }
  pre :global(.b) { color: rgba(255,215,0,0.62); }
  pre :global(.c) { color: rgba(255,215,0,0.30); }
  pre :global(.d) { color: rgba(255,215,0,0.13); }
  pre :global(.e) { color: rgba(255,215,0,0.035); }
</style>
