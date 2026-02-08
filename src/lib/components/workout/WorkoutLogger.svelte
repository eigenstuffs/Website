<script>
  import {
    DAY_LABELS, DAY_ORDER, getExercisesForDay,
    getLatestLog, generateId, getISOWeek
  } from '$lib/workout-data';

  /** @type {import('$lib/workout-data').WorkoutData} */
  export let data;
  /** @type {(data: import('$lib/workout-data').WorkoutData) => void} */
  export let onUpdate;

  let selectedDay = DAY_ORDER[0];
  let logDate = new Date().toISOString().split('T')[0];

  /** @type {Record<string, {weight: number, reps: number}[]>} */
  let activeSets = {};

  // Whenever day changes, populate sets from most recent log or defaults
  $: exercises = getExercisesForDay(data.exercises, selectedDay);
  $: {
    const newSets = {};
    for (const [key, ex] of exercises) {
      const latest = getLatestLog(data.logs, key);
      if (latest && latest.sets.length > 0) {
        newSets[key] = latest.sets.map(s => ({ ...s }));
      } else {
        const arr = [];
        for (let i = 0; i < ex.defaultSets; i++) {
          const repNum = parseInt(ex.defaultReps) || 10;
          arr.push({ weight: 0, reps: repNum });
        }
        newSets[key] = arr;
      }
    }
    activeSets = newSets;
  }

  /**
   * @param {string} exKey
   * @param {number} setIdx
   * @param {'weight' | 'reps'} field
   * @param {number} delta
   */
  function adjust(exKey, setIdx, field, delta) {
    if (!activeSets[exKey]) return;
    const val = activeSets[exKey][setIdx][field] + delta;
    activeSets[exKey][setIdx][field] = Math.max(0, val);
    activeSets = activeSets; // trigger reactivity
  }

  /**
   * @param {string} exKey
   * @param {number} setIdx
   * @param {'weight' | 'reps'} field
   * @param {Event} e
   */
  function handleInput(exKey, setIdx, field, e) {
    const target = /** @type {HTMLInputElement} */ (e.target);
    const val = parseInt(target.value) || 0;
    activeSets[exKey][setIdx][field] = Math.max(0, val);
    activeSets = activeSets;
  }

  /** @param {string} exKey */
  function addSet(exKey) {
    if (!activeSets[exKey]) return;
    const last = activeSets[exKey][activeSets[exKey].length - 1];
    activeSets[exKey] = [...activeSets[exKey], { weight: last?.weight || 0, reps: last?.reps || 10 }];
  }

  /** @param {string} exKey */
  function removeSet(exKey) {
    if (!activeSets[exKey] || activeSets[exKey].length <= 1) return;
    activeSets[exKey] = activeSets[exKey].slice(0, -1);
  }

  let saveMessage = '';

  function saveWorkout() {
    const updated = structuredClone(data);

    // Add log entries for each exercise
    for (const [exKey] of exercises) {
      const sets = activeSets[exKey];
      if (!sets || sets.every(s => s.weight === 0 && s.reps === 0)) continue;

      updated.logs.push({
        id: generateId(),
        date: logDate,
        day: selectedDay,
        exercise: exKey,
        sets: sets.map(s => ({ weight: s.weight, reps: s.reps }))
      });
    }

    // Auto-check the weekly checklist
    const week = getISOWeek(new Date(logDate));
    if (!updated.weeklyCheckins[week]) {
      updated.weeklyCheckins[week] = {};
    }
    updated.weeklyCheckins[week][selectedDay] = logDate;

    onUpdate(updated);
    saveMessage = 'workout logged';
    setTimeout(() => saveMessage = '', 2500);
  }

  /** @param {string} exKey */
  function weightIncrement(exKey) {
    const ex = data.exercises[exKey];
    return ex?.type === 'compound' ? 10 : 5;
  }
</script>

<div class="logger">
  <div class="logger-header">
    <div class="day-selector">
      {#each DAY_ORDER as dayKey}
        <button
          class="day-btn"
          class:active={selectedDay === dayKey}
          on:click={() => selectedDay = dayKey}
        >
          {dayKey.replace('-', ' ')}
        </button>
      {/each}
    </div>
    <div class="date-row">
      <label class="date-label" for="workout-date">date:</label>
      <input id="workout-date" type="date" bind:value={logDate} class="date-input" />
    </div>
  </div>

  <div class="exercise-list">
    {#each exercises as [exKey, ex]}
      {@const increment = weightIncrement(exKey)}
      <div class="exercise-block">
        <div class="exercise-header">
          <span class="exercise-name">{ex.name}</span>
          <span class="exercise-meta">{ex.type} · {ex.defaultSets}×{ex.defaultReps}</span>
        </div>

        <div class="sets-table">
          <div class="sets-header-row">
            <span class="set-col-label">set</span>
            <span class="set-col-label">weight (lb)</span>
            <span class="set-col-label">reps</span>
          </div>
          {#if activeSets[exKey]}
            {#each activeSets[exKey] as set, idx}
              <div class="set-row">
                <span class="set-num">{idx + 1}</span>
                <div class="set-input-group">
                  <button class="adj-btn" on:click={() => adjust(exKey, idx, 'weight', -increment)}>-{increment}</button>
                  <input
                    type="number"
                    class="set-input"
                    value={set.weight}
                    on:input={(e) => handleInput(exKey, idx, 'weight', e)}
                    min="0"
                    step={increment}
                  />
                  <button class="adj-btn" on:click={() => adjust(exKey, idx, 'weight', increment)}>+{increment}</button>
                </div>
                <div class="set-input-group">
                  <button class="adj-btn" on:click={() => adjust(exKey, idx, 'reps', -1)}>-1</button>
                  <input
                    type="number"
                    class="set-input reps-input"
                    value={set.reps}
                    on:input={(e) => handleInput(exKey, idx, 'reps', e)}
                    min="0"
                    step="1"
                  />
                  <button class="adj-btn" on:click={() => adjust(exKey, idx, 'reps', 1)}>+1</button>
                </div>
              </div>
            {/each}
          {/if}
          <div class="set-actions">
            <button class="set-action-btn" on:click={() => addSet(exKey)}>+ set</button>
            {#if activeSets[exKey]?.length > 1}
              <button class="set-action-btn" on:click={() => removeSet(exKey)}>- set</button>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class="save-row">
    <button class="save-btn" on:click={saveWorkout}>log workout</button>
    {#if saveMessage}
      <span class="save-msg">{saveMessage}</span>
    {/if}
  </div>
</div>

<style>
  .logger {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .logger-header {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .day-selector {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
  }

  .day-btn {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--dim-color);
    font-family: var(--font-family-main);
    font-size: 0.72rem;
    padding: 0.35rem 0.6rem;
    border-radius: 3px;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .day-btn:hover {
    color: var(--text-color);
    border-color: #444;
  }

  .day-btn.active {
    color: var(--selected-text-color);
    border-color: var(--selected-text-color);
  }

  .date-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .date-label {
    font-size: 0.75rem;
    color: var(--dim-color);
  }

  .date-input {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    font-family: var(--font-family-main);
    font-size: 0.8rem;
    padding: 0.3rem 0.5rem;
    border-radius: 3px;
    outline: none;
    color-scheme: dark;
  }

  .date-input:focus {
    border-color: var(--selected-text-color);
  }

  .exercise-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .exercise-block {
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.75rem;
  }

  .exercise-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.6rem;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .exercise-name {
    font-size: 0.82rem;
    color: var(--text-color);
  }

  .exercise-meta {
    font-size: 0.65rem;
    color: var(--dim-color);
  }

  .sets-table {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .sets-header-row {
    display: grid;
    grid-template-columns: 2rem 1fr 1fr;
    gap: 0.5rem;
    font-size: 0.65rem;
    color: var(--dim-color);
    padding: 0 0.1rem;
  }

  .set-row {
    display: grid;
    grid-template-columns: 2rem 1fr 1fr;
    gap: 0.5rem;
    align-items: center;
  }

  .set-num {
    font-size: 0.7rem;
    color: var(--dim-color);
    text-align: center;
  }

  .set-input-group {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }

  .adj-btn {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--dim-color);
    font-family: var(--font-family-main);
    font-size: 0.6rem;
    padding: 0.2rem 0.3rem;
    border-radius: 2px;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .adj-btn:hover {
    color: var(--selected-text-color);
    border-color: var(--selected-text-color);
  }

  .set-input {
    width: 100%;
    min-width: 0;
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    font-family: var(--font-family-main);
    font-size: 0.8rem;
    padding: 0.25rem 0.35rem;
    border-radius: 3px;
    outline: none;
    text-align: center;
    -moz-appearance: textfield;
  }

  .set-input::-webkit-inner-spin-button,
  .set-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .set-input:focus {
    border-color: var(--selected-text-color);
  }

  .set-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.3rem;
  }

  .set-action-btn {
    background: none;
    border: none;
    color: var(--dim-color);
    font-family: var(--font-family-main);
    font-size: 0.65rem;
    padding: 0.2rem 0;
    cursor: pointer;
    transition: color 0.15s;
  }

  .set-action-btn:hover {
    color: var(--selected-text-color);
  }

  .save-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border-color);
  }

  .save-btn {
    background: none;
    border: 1px solid var(--selected-text-color);
    color: var(--selected-text-color);
    font-family: var(--font-family-main);
    font-size: 0.8rem;
    padding: 0.5rem 1.25rem;
    border-radius: 3px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .save-btn:hover {
    background: rgba(255, 215, 0, 0.08);
  }

  .save-msg {
    font-size: 0.75rem;
    color: #6c6;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 600px) {
    .exercise-block {
      padding: 0.6rem;
    }

    .adj-btn {
      font-size: 0.55rem;
      padding: 0.15rem 0.2rem;
    }

    .set-input {
      font-size: 0.75rem;
    }
  }
</style>
