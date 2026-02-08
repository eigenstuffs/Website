<script lang="ts">
  import { onMount } from 'svelte';

  const W = 79;
  const H = 5;

  function hash(a: number, b: number, c: number): number {
    let h = (a * 374761393 + b * 668265263 + c * 1274126177) | 0;
    h = ((h ^ (h >>> 13)) * 1103515245 + 12345) | 0;
    return (h & 0x7FFFFFFF) / 0x7FFFFFFF;
  }

  let html = '';
  let ok = false;

  onMount(() => {
    let s = '';
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const sv = hash(x, y, 0);
        if (sv < 0.02) {
          // Bright star — slow, prominent pulse with glow
          const dur = (3 + hash(x, y, 2) * 4).toFixed(1);
          const del = (hash(x, y, 3) * -8).toFixed(1);
          const peak = (0.8 + hash(x, y, 4) * 0.2).toFixed(2);
          s += `<span class="s3" style="animation-duration:${dur}s;animation-delay:${del}s;--p:${peak}">#</span>`;
        } else if (sv < 0.04) {
          // Medium star — moderate pulse
          const dur = (2.5 + hash(x, y, 2) * 5).toFixed(1);
          const del = (hash(x, y, 3) * -8).toFixed(1);
          const peak = (0.4 + hash(x, y, 4) * 0.3).toFixed(2);
          s += `<span class="s2" style="animation-duration:${dur}s;animation-delay:${del}s;--p:${peak}">*</span>`;
        } else if (sv < 0.07) {
          // Dim star — gentle shimmer
          const dur = (2 + hash(x, y, 2) * 6).toFixed(1);
          const del = (hash(x, y, 3) * -8).toFixed(1);
          const peak = (0.15 + hash(x, y, 4) * 0.2).toFixed(2);
          s += `<span class="s1" style="animation-duration:${dur}s;animation-delay:${del}s;--p:${peak}">.</span>`;
        } else {
          s += ' ';
        }
      }
      if (y < H - 1) s += '\n';
    }
    html = s;
    ok = true;
  });
</script>

{#if ok}
<div class="panel" aria-hidden="true">
  <pre>{@html html}</pre>
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

  /* Bright stars — gold with glow halo */
  pre :global(.s3) {
    color: #ffd700;
    animation-name: glow-bright;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  /* Medium stars — softer pulse */
  pre :global(.s2) {
    color: #ffd700;
    animation-name: glow-mid;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  /* Dim stars — subtle fade */
  pre :global(.s1) {
    color: #ffd700;
    animation-name: glow-dim;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  @keyframes glow-bright {
    0%, 100% {
      opacity: 0.06;
      text-shadow: none;
    }
    50% {
      opacity: var(--p, 0.9);
      text-shadow:
        0 0 6px rgba(255, 215, 0, 0.45),
        0 0 14px rgba(255, 215, 0, 0.18);
    }
  }

  @keyframes glow-mid {
    0%, 100% {
      opacity: 0.03;
      text-shadow: none;
    }
    50% {
      opacity: var(--p, 0.5);
      text-shadow: 0 0 4px rgba(255, 215, 0, 0.18);
    }
  }

  @keyframes glow-dim {
    0%, 100% {
      opacity: 0.015;
    }
    50% {
      opacity: var(--p, 0.18);
    }
  }
</style>
