<script>
  import { onMount, onDestroy } from 'svelte';
  import NotesSidebar from '$lib/components/NotesSidebar.svelte';
  import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';

  let authenticated = false;
  let loading = true;
  let password = '';
  let authError = '';

  let notes = [];
  let activeFilename = null;
  let activeContent = '';
  let saveStatus = 'saved';
  let debounceTimer;

  onMount(async () => {
    const res = await fetch('/api/notes/auth');
    if (res.ok) {
      authenticated = true;
      await loadNotes();
    }
    loading = false;
  });

  onDestroy(() => {
    clearTimeout(debounceTimer);
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
      await loadNotes();
    } else {
      const data = await res.json().catch(() => null);
      authError = data ? JSON.stringify(data) : 'wrong password';
    }
  }

  function handlePasswordKeydown(/** @type {KeyboardEvent} */ e) {
    if (e.key === 'Enter') login();
  }

  function sortNotes() {
    notes = [...notes].sort((a, b) => (b.lastEdited || 0) - (a.lastEdited || 0));
  }

  async function loadNotes() {
    const res = await fetch('/api/notes');
    if (res.ok) {
      const data = await res.json();
      notes = data.notes;
      sortNotes();
      if (notes.length > 0 && !activeFilename) {
        selectNote(notes[0].filename);
      }
    }
  }

  function selectNote(/** @type {string} */ filename) {
    if (saveStatus === 'unsaved' && activeFilename) {
      saveNoteNow();
    }
    activeFilename = filename;
    const note = notes.find((/** @type {{ filename: string }} */ n) => n.filename === filename);
    activeContent = note ? note.content : '';
    saveStatus = 'saved';
  }

  function handleEditorInput(/** @type {string} */ content) {
    activeContent = content;
    const idx = notes.findIndex((/** @type {{ filename: string }} */ n) => n.filename === activeFilename);
    if (idx >= 0) {
      notes[idx].content = content;
    }
    saveStatus = 'unsaved';
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => saveNoteNow(), 2000);
  }

  async function saveNoteNow() {
    if (!activeFilename || saveStatus === 'saving') return;
    const contentToSave = activeContent;
    const filenameToSave = activeFilename;
    saveStatus = 'saving';

    const res = await fetch('/api/notes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: filenameToSave, content: contentToSave })
    });

    if (res.ok && activeFilename === filenameToSave) {
      saveStatus = 'saved';
      const idx = notes.findIndex((/** @type {{ filename: string }} */ n) => n.filename === filenameToSave);
      if (idx >= 0) {
        notes[idx].lastEdited = Date.now();
        sortNotes();
      }
    } else if (!res.ok) {
      saveStatus = 'unsaved';
    }
  }

  async function createNote(/** @type {string} */ filename) {
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename })
    });

    if (res.ok) {
      await loadNotes();
      selectNote(filename);
    }
  }

  async function deleteNote(/** @type {string} */ filename) {
    const res = await fetch('/api/notes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename })
    });

    if (res.ok) {
      notes = notes.filter((/** @type {{ filename: string }} */ n) => n.filename !== filename);
      if (activeFilename === filename) {
        if (notes.length > 0) {
          selectNote(notes[0].filename);
        } else {
          activeFilename = null;
          activeContent = '';
        }
      }
    }
  }

  async function renameNote(/** @type {string} */ oldFilename, /** @type {string} */ newFilename) {
    const note = notes.find((/** @type {{ filename: string }} */ n) => n.filename === oldFilename);
    if (!note) return;

    const res = await fetch('/api/notes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: oldFilename,
        content: note.content,
        newFilename
      })
    });

    if (res.ok) {
      await loadNotes();
      if (activeFilename === oldFilename) {
        activeFilename = newFilename;
      }
    }
  }
</script>

<svelte:head>
  <title>Notes</title>
  <style>
    :global(.layout-container) {
      align-items: stretch !important;
      padding: 1.5rem 1.5rem 2rem !important;
    }

    :global(.main-content) {
      max-width: none !important;
      width: 100% !important;
      align-items: stretch !important;
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
  <div class="notes-app">
    <NotesSidebar
      {notes}
      {activeFilename}
      onSelect={selectNote}
      onCreate={createNote}
      onDelete={deleteNote}
      onRename={renameNote}
    />
    <div class="editor-area">
      {#if activeFilename}
        <MarkdownEditor
          content={activeContent}
          {saveStatus}
          onInput={handleEditorInput}
        />
      {:else}
        <div class="empty-state">
          <p>no notes yet</p>
          <p class="dim">click <strong>+</strong> in the sidebar to create one</p>
        </div>
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

  /* Password gate */
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

  /* Notes app layout */
  .notes-app {
    display: flex;
    width: 100%;
    height: calc(100vh - 7rem);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    overflow: hidden;
  }

  .editor-area {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--dim-color);
    font-size: 0.9rem;
    gap: 0.25rem;
  }

  .empty-state p {
    margin: 0;
  }

  .empty-state .dim {
    font-size: 0.8rem;
  }

  .empty-state :global(strong) {
    color: var(--selected-text-color);
  }

  @media (max-width: 768px) {
    .notes-app {
      height: calc(100vh - 5rem);
      border: none;
      border-radius: 0;
    }
  }
</style>
