<script>
  import { onMount } from 'svelte';
  import WeeklyChecklist from '$lib/components/workout/WeeklyChecklist.svelte';
  import WorkoutLogger from '$lib/components/workout/WorkoutLogger.svelte';
  import StatsPanel from '$lib/components/workout/StatsPanel.svelte';
  import ProgressChart from '$lib/components/workout/ProgressChart.svelte';
  import { createDefaultData } from '$lib/workout-data';

  let authenticated = false;
  let loading = true;
  let password = '';
  let authError = '';

  /** @type {import('$lib/workout-data').WorkoutData} */
  let workoutData = createDefaultData();
  let saving = false;
  let activeTab = 'week';

  const tabs = [
    { id: 'week', label: 'this week' },
    { id: 'log', label: 'log workout' },
    { id: 'stats', label: 'stats' },
    { id: 'progress', label: 'progress' }
  ];

  onMount(async () => {
    const res = await fetch('/api/notes/auth');
    if (res.ok) {
      authenticated = true;
      await loadData();
    }
    loading = false;
  });

  async function login() {
    authError = '';
    const res = await fetch('/api/notes/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (res.ok) {
      authenticated = true;
      password = '';
      await loadData();
    } else {
      authError = 'wrong password';
    }
  }

  /** @param {KeyboardEvent} e */
  function handlePasswordKeydown(e) {
    if (e.key === 'Enter') login();
  }

  async function loadData() {
    const res = await fetch('/api/workout');
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.exercises && Object.keys(json.data.exercises).length > 0) {
        workoutData = json.data;
      } else {
        // Seed with defaults
        workoutData = createDefaultData();
        await saveData();
      }
    }
  }

  async function saveData() {
    if (saving) return;
    saving = true;
    try {
      await fetch('/api/workout', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: workoutData })
      });
    } finally {
      saving = false;
    }
  }

  /** @param {import('$lib/workout-data').WorkoutData} updated */
  function handleDataUpdate(updated) {
    workoutData = updated;
    saveData();
  }
</script>

<svelte:head>
  <title>Workout</title>
  <style>
    .main-content {
      max-width: 900px !important;
      justify-content: flex-start !important;
    }
  </style>
</svelte:head>

{#if loading}
  <div class="loading">
    <span class="blink">loading...</span>
  </div>
{:else if !authenticated}
  <div class="password-gate">
    <div class="gate-box">
      <span class="gate-prompt">&gt; enter password:</span>
      <div class="gate-input-row">
        <input
          type="password"
          bind:value={password}
          on:keydown={handlePasswordKeydown}
          placeholder="••••••••"
          autofocus
        />
        <button on:click={login}>unlock</button>
      </div>
      {#if authError}
        <span class="gate-error">{authError}</span>
      {/if}
    </div>
  </div>
{:else}
  <div class="workout-app">
    <div class="tab-bar">
      {#each tabs as tab}
        <button
          class="tab-btn"
          class:active={activeTab === tab.id}
          on:click={() => activeTab = tab.id}
        >
          {tab.label}
        </button>
      {/each}
      {#if saving}
        <span class="save-indicator">saving...</span>
      {/if}
    </div>
    <div class="tab-divider"></div>

    <div class="tab-content">
      {#if activeTab === 'week'}
        <WeeklyChecklist data={workoutData} onUpdate={handleDataUpdate} />
      {:else if activeTab === 'log'}
        <WorkoutLogger data={workoutData} onUpdate={handleDataUpdate} />
      {:else if activeTab === 'stats'}
        <StatsPanel data={workoutData} />
      {:else if activeTab === 'progress'}
        <ProgressChart data={workoutData} />
      {/if}
    </div>
  </div>
{/if}

<style>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    color: var(--dim-color);
    font-size: 0.9rem;
  }

  .blink {
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }

  .password-gate {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
  }

  .gate-box {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.5rem 2rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    min-width: 300px;
  }

  .gate-prompt {
    font-size: 0.85rem;
    color: var(--dim-color);
  }

  .gate-input-row {
    display: flex;
    gap: 0.5rem;
  }

  .gate-input-row input {
    flex: 1;
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    font-family: var(--font-family-main);
    font-size: 0.85rem;
    padding: 0.4rem 0.6rem;
    border-radius: 3px;
    outline: none;
  }

  .gate-input-row input:focus {
    border-color: var(--selected-text-color);
  }

  .gate-input-row button {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--dim-color);
    font-family: var(--font-family-main);
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    border-radius: 3px;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
  }

  .gate-input-row button:hover {
    color: var(--selected-text-color);
    border-color: var(--selected-text-color);
  }

  .gate-error {
    font-size: 0.8rem;
    color: #c44;
  }

  /* Workout app layout */
  .workout-app {
    width: 100%;
    min-height: calc(100vh - 12rem);
  }

  .tab-bar {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    padding: 0 0.25rem;
  }

  .tab-btn {
    background: none;
    border: none;
    color: var(--dim-color);
    font-family: var(--font-family-main);
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    transition: color 0.2s;
    border-bottom: 2px solid transparent;
    letter-spacing: 0.3px;
  }

  .tab-btn:hover {
    color: var(--text-color);
  }

  .tab-btn.active {
    color: var(--selected-text-color);
    border-bottom-color: var(--selected-text-color);
  }

  .save-indicator {
    margin-left: auto;
    font-size: 0.7rem;
    color: var(--dim-color);
    animation: blink 1s step-end infinite;
  }

  .tab-divider {
    width: 100%;
    height: 1px;
    background: var(--border-color);
    margin-bottom: 1.25rem;
  }

  .tab-content {
    padding: 0 0.25rem;
  }

  @media (max-width: 600px) {
    .tab-btn {
      font-size: 0.75rem;
      padding: 0.4rem 0.5rem;
    }
  }
</style>
