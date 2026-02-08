<script>
  import {
    DAY_LABELS, DAY_ORDER, getExercisesForDay,
    getLatestLog, getBestSet, getStagnationLevel
  } from '$lib/workout-data';

  /** @type {import('$lib/workout-data').WorkoutData} */
  export let data;

  let filterDay = 'all';

  $: filteredDays = filterDay === 'all' ? DAY_ORDER : [filterDay];

  /**
   * @param {string} exKey
   */
  function lastLoggedDate(exKey) {
    const log = getLatestLog(data.logs, exKey);
    return log ? log.date : null;
  }

  /**
   * @param {number} level
   */
  function stagnationLabel(level) {
    if (level === 0) return null;
    if (level === 1) return 'watch';
    return 'stagnant';
  }

  /**
   * @param {number} level
   */
  function stagnationClass(level) {
    if (level === 0) return '';
    if (level === 1) return 'stag-watch';
    return 'stag-stagnant';
  }

  /**
   * @param {string} exKey
   */
  function getSessionCount(exKey) {
    return data.logs.filter(l => l.exercise === exKey).length;
  }
</script>

<div class="stats">
  <div class="stats-header">
    <span class="stats-title">exercise stats</span>
    <div class="filter-btns">
      <button
        class="filter-btn"
        class:active={filterDay === 'all'}
        on:click={() => filterDay = 'all'}
      >all</button>
      {#each DAY_ORDER as dayKey}
        <button
          class="filter-btn"
          class:active={filterDay === dayKey}
          on:click={() => filterDay = dayKey}
        >{dayKey.replace('-', ' ')}</button>
      {/each}
    </div>
  </div>

  {#each filteredDays as dayKey}
    {@const dayExercises = getExercisesForDay(data.exercises, dayKey)}
    {#if dayExercises.length > 0}
      <div class="day-group">
        <span class="day-group-label">{DAY_LABELS[dayKey]}</span>
        <div class="exercise-stats">
          {#each dayExercises as [exKey, ex]}
            {@const latest = getLatestLog(data.logs, exKey)}
            {@const bestSet = latest ? getBestSet(latest) : null}
            {@const setCount = latest ? latest.sets.length : 0}
            {@const stagLevel = getStagnationLevel(data.logs, exKey)}
            {@const stagLabel = stagnationLabel(stagLevel)}
            {@const stagClass = stagnationClass(stagLevel)}
            {@const sessions = getSessionCount(exKey)}
            {@const lastDate = lastLoggedDate(exKey)}
            <div class="stat-card {stagClass}">
              <div class="stat-top">
                <span class="stat-name">{ex.name}</span>
                <span class="stat-type">{ex.type}</span>
              </div>
              <div class="stat-body">
                {#if bestSet}
                  <div class="stat-main">
                    <span class="stat-sets">{setCount}<span class="stat-unit">sets</span></span>
                    <span class="stat-x">·</span>
                    <span class="stat-weight">{bestSet.weight}<span class="stat-unit">lb</span></span>
                    <span class="stat-x">×</span>
                    <span class="stat-reps">{bestSet.reps}<span class="stat-unit">reps</span></span>
                  </div>
                  <div class="stat-details">
                    <span>{sessions} session{sessions !== 1 ? 's' : ''}</span>
                    <span>last: {lastDate}</span>
                  </div>
                {:else}
                  <div class="stat-empty">no data yet</div>
                {/if}
              </div>
              {#if stagLabel}
                <div class="stag-badge {stagClass}">
                  {stagLabel}
                  {#if stagLevel === 1}
                    — try +5 lb or +1 rep
                  {:else}
                    — consider deload or change approach
                  {/if}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {/each}

  {#if data.logs.length === 0}
    <div class="empty-state">
      <p>no workout data yet</p>
      <p class="dim">log a workout to see your stats here</p>
    </div>
  {/if}
</div>

<style>
  .stats {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .stats-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .stats-title {
    font-size: 0.85rem;
    color: var(--selected-text-color);
    letter-spacing: 0.5px;
  }

  .filter-btns {
    display: flex;
    gap: 0.2rem;
    flex-wrap: wrap;
  }

  .filter-btn {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--dim-color);
    font-family: var(--font-family-main);
    font-size: 0.65rem;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .filter-btn:hover {
    color: var(--text-color);
    border-color: #444;
  }

  .filter-btn.active {
    color: var(--selected-text-color);
    border-color: var(--selected-text-color);
  }

  .day-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .day-group-label {
    font-size: 0.72rem;
    color: var(--dim-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid var(--border-color);
  }

  .exercise-stats {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 0.5rem;
  }

  .stat-card {
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.65rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    transition: border-color 0.2s;
  }

  .stat-card.stag-watch {
    border-color: #665500;
  }

  .stat-card.stag-stagnant {
    border-color: #663333;
  }

  .stat-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .stat-name {
    font-size: 0.78rem;
    color: var(--text-color);
  }

  .stat-type {
    font-size: 0.6rem;
    color: var(--dim-color);
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .stat-body {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stat-main {
    display: flex;
    align-items: baseline;
    gap: 0.3rem;
  }

  .stat-sets {
    font-size: 1.2rem;
    color: var(--text-color);
  }

  .stat-weight {
    font-size: 1.2rem;
    color: var(--selected-text-color);
    font-weight: normal;
  }

  .stat-x {
    font-size: 0.75rem;
    color: var(--dim-color);
  }

  .stat-reps {
    font-size: 1.2rem;
    color: var(--text-color);
  }

  .stat-unit {
    font-size: 0.6rem;
    color: var(--dim-color);
    margin-left: 0.15rem;
  }

  .stat-details {
    display: flex;
    gap: 0.75rem;
    font-size: 0.65rem;
    color: var(--dim-color);
  }

  .stat-empty {
    font-size: 0.75rem;
    color: var(--dim-color);
    font-style: italic;
  }

  .stag-badge {
    font-size: 0.65rem;
    padding: 0.2rem 0.4rem;
    border-radius: 2px;
    margin-top: 0.1rem;
  }

  .stag-badge.stag-watch {
    color: #cc9900;
    background: rgba(204, 153, 0, 0.08);
  }

  .stag-badge.stag-stagnant {
    color: #cc4444;
    background: rgba(204, 68, 68, 0.08);
  }

  .empty-state {
    text-align: center;
    padding: 2rem;
    color: var(--dim-color);
    font-size: 0.85rem;
  }

  .empty-state p {
    margin: 0.25rem 0;
  }

  .empty-state .dim {
    font-size: 0.75rem;
    opacity: 0.6;
  }

  @media (max-width: 600px) {
    .exercise-stats {
      grid-template-columns: 1fr;
    }
  }
</style>
