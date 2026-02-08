<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  const W = 79;
  const H = 5;
  const FRAMES = 20;
  const MS = 400;

  const CH = [' ', '.', '*', '#'];
  const CL = ['e', 'd', 'b', 'a'];

  function hash(a: number, b: number, c: number): number {
    let h = (a * 374761393 + b * 668265263 + c * 1274126177) | 0;
    h = ((h ^ (h >>> 13)) * 1103515245 + 12345) | 0;
    return (h & 0x7FFFFFFF) / 0x7FFFFFFF;
  }

  function genFrame(fi: number): number[][] {
    const grid: number[][] = [];
    for (let y = 0; y < H; y++) {
      const row: number[] = [];
      for (let x = 0; x < W; x++) {
        const sv = hash(x, y, 0);
        let level = 0;

        if (sv < 0.02) {
          const tw = hash(x, y, fi);
          level = tw > 0.5 ? 3 : tw > 0.2 ? 2 : 1;
        } else if (sv < 0.05) {
          const tw = hash(x, y, fi + 77);
          level = tw > 0.55 ? 2 : tw > 0.3 ? 1 : 0;
        }

        row.push(level);
      }
      grid.push(row);
    }
    return grid;
  }

  function buildHtml(grid: number[][]): string {
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

  let htmlFrames: string[] = [];
  let idx = 0;
  let timer: ReturnType<typeof setInterval> | undefined;
  let ok = false;

  onMount(() => {
    for (let i = 0; i < FRAMES; i++) {
      htmlFrames.push(buildHtml(genFrame(i)));
    }
    ok = true;
    timer = setInterval(() => { idx = (idx + 1) % FRAMES; }, MS);
  });

  onDestroy(() => { if (timer) clearInterval(timer); });
</script>

{#if ok}
<div class="panel" aria-hidden="true">
  <pre>{@html htmlFrames[idx]}</pre>
</div>
{/if}

<style>
  .panel {
    margin: 1.5rem 0;
    width: 100%;
    max-width: 560px;
    overflow: hidden;
  }

  pre {
    margin: 0;
    padding: 0;
    font-family: 'Courier New', 'Lucida Console', monospace;
    font-size: min(12px, calc((100vw - 2rem) / 48));
    line-height: 1.15;
    white-space: pre;
    user-select: none;
  }

  pre :global(.a) { color: #ffd700; text-shadow: 0 0 4px rgba(255,215,0,0.18); }
  pre :global(.b) { color: rgba(255,215,0,0.40); }
  pre :global(.d) { color: rgba(255,215,0,0.08); }
  pre :global(.e) { color: rgba(255,215,0,0.012); }
</style>
