<script>
  import { DAY_LABELS, DAY_ORDER, getISOWeek } from '$lib/workout-data';

  /** @type {import('$lib/workout-data').WorkoutData} */
  export let data;
  /** @type {(data: import('$lib/workout-data').WorkoutData) => void} */
  export let onUpdate;

  $: currentWeek = getISOWeek(new Date());
  $: checkins = data.weeklyCheckins[currentWeek] || {};
  $: completedCount = DAY_ORDER.filter(d => checkins[d]).length;
  $: progressPct = (completedCount / DAY_ORDER.length) * 100;

  // Gather recent weeks for history (last 6 weeks excluding current)
  $: recentWeeks = Object.keys(data.weeklyCheckins)
    .filter(w => w !== currentWeek)
    .sort()
    .reverse()
    .slice(0, 6);

  /** @param {string} dayKey */
  function toggleDay(dayKey) {
    const updated = structuredClone(data);
    if (!updated.weeklyCheckins[currentWeek]) {
      updated.weeklyCheckins[currentWeek] = {};
    }
    if (updated.weeklyCheckins[currentWeek][dayKey]) {
      updated.weeklyCheckins[currentWeek][dayKey] = null;
    } else {
      updated.weeklyCheckins[currentWeek][dayKey] = new Date().toISOString().split('T')[0];
    }
    onUpdate(updated);
  }

  /** @param {string} week */
  function weekCompletedCount(week) {
    const wc = data.weeklyCheckins[week] || {};
    return DAY_ORDER.filter(d => wc[d]).length;
  }

  /** @param {string} weekStr */
  function formatWeek(weekStr) {
    // "2026-W06" -> "Week 6"
    const match = weekStr.match(/W(\d+)/);
    return match ? `wk ${parseInt(match[1])}` : weekStr;
  }
</script>

<div class="checklist">
  <div class="section-header">
    <span class="week-label">{currentWeek}</span>
    <span class="progress-text">{completedCount}/{DAY_ORDER.length} sessions</span>
  </div>

  <div class="progress-bar">
    <div class="progress-fill" style="width: {progressPct}%"></div>
  </div>

  <div class="day-cards">
    {#each DAY_ORDER as dayKey}
      {@const done = !!checkins[dayKey]}
      {@const dateStr = checkins[dayKey]}
      <button
        class="day-card"
        class:done
        on:click={() => toggleDay(dayKey)}
      >
        <div class="day-check">
          {#if done}
            <span class="check-mark">&#10003;</span>
          {:else}
            <span class="check-empty">&#9744;</span>
          {/if}
        </div>
        <div class="day-info">
          <span class="day-name">{DAY_LABELS[dayKey]}</span>
          {#if dateStr}
            <span class="day-date">{dateStr}</span>
          {:else}
            <span class="day-date dim">not done</span>
          {/if}
        </div>
      </button>
    {/each}
  </div>

  {#if recentWeeks.length > 0}
    <div class="history-section">
      <span class="history-label">recent weeks</span>
      <div class="history-rows">
        {#each recentWeeks as week}
          {@const wCount = weekCompletedCount(week)}
          {@const wCheckins = data.weeklyCheckins[week] || {}}
          <div class="history-row">
            <span class="history-week">{formatWeek(week)}</span>
            <div class="history-dots">
              {#each DAY_ORDER as d}
                <span
                  class="history-dot"
                  class:filled={!!wCheckins[d]}
                  title="{DAY_LABELS[d]}{wCheckins[d] ? ` — ${wCheckins[d]}` : ''}"
                ></span>
              {/each}
            </div>
            <span class="history-count">{wCount}/4</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .checklist {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .week-label {
    font-size: 0.85rem;
    color: var(--selected-text-color);
    letter-spacing: 0.5px;
  }

  .progress-text {
    font-size: 0.75rem;
    color: var(--dim-color);
  }

  .progress-bar {
    width: 100%;
    height: 3px;
    background: var(--border-color);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--selected-text-color);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  .day-cards {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .day-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: none;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    text-align: left;
    font-family: var(--font-family-main);
    width: 100%;
  }

  .day-card:hover {
    border-color: #444;
    background: rgba(255, 255, 255, 0.02);
  }

  .day-card.done {
    border-color: #2a3a1a;
    background: rgba(100, 200, 60, 0.04);
  }

  .day-check {
    font-size: 1.1rem;
    width: 1.5rem;
    text-align: center;
    flex-shrink: 0;
  }

  .check-mark {
    color: #6c6;
  }

  .check-empty {
    color: var(--dim-color);
  }

  .day-info {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .day-name {
    font-size: 0.8rem;
    color: var(--text-color);
  }

  .day-date {
    font-size: 0.7rem;
    color: var(--dim-color);
  }

  .day-date.dim {
    opacity: 0.5;
  }

  /* History */
  .history-section {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }

  .history-label {
    font-size: 0.75rem;
    color: var(--dim-color);
    display: block;
    margin-bottom: 0.5rem;
  }

  .history-rows {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .history-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .history-week {
    font-size: 0.7rem;
    color: var(--dim-color);
    min-width: 3rem;
  }

  .history-dots {
    display: flex;
    gap: 0.4rem;
  }

  .history-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border-color);
    transition: background 0.2s;
  }

  .history-dot.filled {
    background: var(--selected-text-color);
  }

  .history-count {
    font-size: 0.65rem;
    color: var(--dim-color);
    margin-left: auto;
  }

  @media (max-width: 600px) {
    .day-card {
      padding: 0.6rem 0.75rem;
    }

    .day-name {
      font-size: 0.75rem;
    }
  }
</style>
