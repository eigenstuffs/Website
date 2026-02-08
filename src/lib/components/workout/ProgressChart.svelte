<script>
  import { onMount, onDestroy, afterUpdate } from 'svelte';
  import {
    DAY_LABELS, DAY_ORDER, getExercisesForDay, getBestSet
  } from '$lib/workout-data';

  /** @type {import('$lib/workout-data').WorkoutData} */
  export let data;

  let selectedExercise = '';
  let metric = 'weight'; // 'weight' | 'reps' | 'volume'
  let timeRange = 'all'; // '4w' | '8w' | 'all'

  /** @type {HTMLCanvasElement} */
  let canvasEl;

  /** @type {any} */
  let chartInstance = null;

  /** @type {any} */
  let Chart = null;

  // Build exercise options from data
  $: exerciseOptions = Object.entries(data.exercises).map(([key, ex]) => ({
    key,
    label: `${ex.name} (${ex.days.map(d => d.replace('-', ' ')).join(', ')})`
  }));

  // Auto-select first exercise with data
  $: if (!selectedExercise && exerciseOptions.length > 0) {
    const withData = exerciseOptions.find(e => data.logs.some(l => l.exercise === e.key));
    selectedExercise = withData ? withData.key : exerciseOptions[0].key;
  }

  // Filter logs for selected exercise
  $: exerciseLogs = selectedExercise
    ? [...data.logs]
        .filter(l => l.exercise === selectedExercise)
        .sort((a, b) => a.date.localeCompare(b.date))
    : [];

  // Apply time range filter
  $: filteredLogs = (() => {
    if (timeRange === 'all') return exerciseLogs;
    const weeks = timeRange === '4w' ? 4 : 8;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - weeks * 7);
    const cutoffStr = cutoff.toISOString().split('T')[0];
    return exerciseLogs.filter(l => l.date >= cutoffStr);
  })();

  // Chart data
  $: chartData = filteredLogs.map(log => {
    const best = getBestSet(log);
    if (!best) return null;
    let value = 0;
    if (metric === 'weight') value = best.weight;
    else if (metric === 'reps') value = best.reps;
    else value = best.weight * best.reps;
    return { date: log.date, value };
  }).filter(Boolean);

  onMount(async () => {
    const chartModule = await import('chart.js');
    const {
      Chart: ChartJS,
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      CategoryScale,
      Tooltip,
      Filler
    } = chartModule;

    ChartJS.register(
      LineController, LineElement, PointElement,
      LinearScale, CategoryScale, Tooltip, Filler
    );

    Chart = ChartJS;
    renderChart();
  });

  onDestroy(() => {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  });

  afterUpdate(() => {
    if (Chart) renderChart();
  });

  function renderChart() {
    if (!canvasEl || !Chart) return;

    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }

    if (chartData.length === 0) return;

    const labels = chartData.map(d => d.date);
    const values = chartData.map(d => d.value);

    const metricLabel = metric === 'weight' ? 'Weight (lb)' : metric === 'reps' ? 'Reps' : 'Volume (lb×reps)';

    chartInstance = new Chart(canvasEl, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: metricLabel,
          data: values,
          borderColor: '#FFD700',
          backgroundColor: 'rgba(255, 215, 0, 0.08)',
          borderWidth: 2,
          pointBackgroundColor: '#FFD700',
          pointBorderColor: '#FFD700',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.25
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            backgroundColor: '#1a1a1a',
            titleColor: '#a0a0a0',
            bodyColor: '#FFD700',
            borderColor: '#333',
            borderWidth: 1,
            titleFont: { family: "'Courier New', monospace", size: 11 },
            bodyFont: { family: "'Courier New', monospace", size: 12 },
            padding: 8,
            displayColors: false
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#555',
              font: { family: "'Courier New', monospace", size: 10 },
              maxRotation: 45
            },
            grid: { color: 'rgba(255,255,255,0.04)' },
            border: { color: '#333' }
          },
          y: {
            ticks: {
              color: '#555',
              font: { family: "'Courier New', monospace", size: 10 }
            },
            grid: { color: 'rgba(255,255,255,0.04)' },
            border: { color: '#333' },
            beginAtZero: false
          }
        }
      }
    });
  }
</script>

<div class="progress">
  <div class="progress-controls">
    <div class="control-group">
      <label class="control-label" for="exercise-select">exercise:</label>
      <select id="exercise-select" class="control-select" bind:value={selectedExercise}>
        {#each exerciseOptions as opt}
          <option value={opt.key}>{opt.label}</option>
        {/each}
      </select>
    </div>

    <div class="control-row">
      <div class="control-group" role="group" aria-label="Metric selector">
        <span class="control-label">metric:</span>
        <div class="toggle-btns">
          <button class="toggle-btn" class:active={metric === 'weight'} on:click={() => metric = 'weight'}>weight</button>
          <button class="toggle-btn" class:active={metric === 'reps'} on:click={() => metric = 'reps'}>reps</button>
          <button class="toggle-btn" class:active={metric === 'volume'} on:click={() => metric = 'volume'}>volume</button>
        </div>
      </div>

      <div class="control-group" role="group" aria-label="Time range selector">
        <span class="control-label">range:</span>
        <div class="toggle-btns">
          <button class="toggle-btn" class:active={timeRange === '4w'} on:click={() => timeRange = '4w'}>4 wk</button>
          <button class="toggle-btn" class:active={timeRange === '8w'} on:click={() => timeRange = '8w'}>8 wk</button>
          <button class="toggle-btn" class:active={timeRange === 'all'} on:click={() => timeRange = 'all'}>all</button>
        </div>
      </div>
    </div>
  </div>

  <div class="chart-container">
    {#if chartData.length > 0}
      <canvas bind:this={canvasEl}></canvas>
    {:else}
      <div class="chart-empty">
        <p>no data for this exercise</p>
        <p class="dim">log workouts to see progression</p>
      </div>
    {/if}
  </div>

  {#if chartData.length > 1}
    {@const first = chartData[0]}
    {@const last = chartData[chartData.length - 1]}
    {@const diff = last.value - first.value}
    {@const pct = first.value > 0 ? ((diff / first.value) * 100).toFixed(1) : '—'}
    <div class="chart-summary">
      <span class="summary-item">
        start: <strong>{first.value}</strong>
      </span>
      <span class="summary-item">
        current: <strong>{last.value}</strong>
      </span>
      <span class="summary-item" class:positive={diff > 0} class:negative={diff < 0}>
        change: <strong>{diff > 0 ? '+' : ''}{diff}</strong> ({diff > 0 ? '+' : ''}{pct}%)
      </span>
    </div>
  {/if}
</div>

<style>
  .progress {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .progress-controls {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .control-row {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .control-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .control-label {
    font-size: 0.72rem;
    color: var(--dim-color);
    flex-shrink: 0;
  }

  .control-select {
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    font-family: var(--font-family-main);
    font-size: 0.75rem;
    padding: 0.3rem 0.5rem;
    border-radius: 3px;
    outline: none;
    max-width: 350px;
    cursor: pointer;
  }

  .control-select:focus {
    border-color: var(--selected-text-color);
  }

  .control-select option {
    background: #1a1a1a;
    color: var(--text-color);
  }

  .toggle-btns {
    display: flex;
    gap: 0.15rem;
  }

  .toggle-btn {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--dim-color);
    font-family: var(--font-family-main);
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
  }

  .toggle-btn:hover {
    color: var(--text-color);
    border-color: #444;
  }

  .toggle-btn.active {
    color: var(--selected-text-color);
    border-color: var(--selected-text-color);
  }

  .chart-container {
    width: 100%;
    height: 320px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.75rem;
    position: relative;
  }

  .chart-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--dim-color);
    font-size: 0.85rem;
    gap: 0.25rem;
  }

  .chart-empty p {
    margin: 0;
  }

  .chart-empty .dim {
    font-size: 0.75rem;
    opacity: 0.6;
  }

  .chart-summary {
    display: flex;
    gap: 1.5rem;
    font-size: 0.72rem;
    color: var(--dim-color);
    flex-wrap: wrap;
  }

  .summary-item :global(strong) {
    color: var(--text-color);
  }

  .summary-item.positive :global(strong) {
    color: #6c6;
  }

  .summary-item.negative :global(strong) {
    color: #c44;
  }

  @media (max-width: 600px) {
    .chart-container {
      height: 250px;
      padding: 0.5rem;
    }

    .control-row {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>
