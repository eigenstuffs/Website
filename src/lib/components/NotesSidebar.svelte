<script>
  export let notes = [];
  export let activeFilename = null;
  export let onSelect = (/** @type {string} */ _filename) => {};
  export let onCreate = (/** @type {string} */ _filename) => {};
  export let onDelete = (/** @type {string} */ _filename) => {};
  export let onRename = (/** @type {string} */ _oldFilename, /** @type {string} */ _newFilename) => {};

  let creating = false;
  let newFilename = '';
  let renamingFilename = null;
  let renameValue = '';
  let sidebarOpen = false;

  function startCreate() {
    creating = true;
    newFilename = '';
    setTimeout(() => {
      const input = document.querySelector('.new-note-input');
      if (input) /** @type {HTMLInputElement} */ (input).focus();
    }, 10);
  }

  function confirmCreate() {
    let name = newFilename.trim();
    if (!name) {
      creating = false;
      return;
    }
    if (!name.endsWith('.md')) name += '.md';
    onCreate(name);
    creating = false;
    newFilename = '';
  }

  function cancelCreate() {
    creating = false;
    newFilename = '';
  }

  function startRename(/** @type {string} */ filename) {
    renamingFilename = filename;
    renameValue = filename.replace(/\.md$/, '');
    setTimeout(() => {
      const input = document.querySelector('.rename-input');
      if (input) {
        /** @type {HTMLInputElement} */ (input).focus();
        /** @type {HTMLInputElement} */ (input).select();
      }
    }, 10);
  }

  function confirmRename() {
    let name = renameValue.trim();
    if (!name || !renamingFilename) {
      renamingFilename = null;
      return;
    }
    if (!name.endsWith('.md')) name += '.md';
    if (name !== renamingFilename) {
      onRename(renamingFilename, name);
    }
    renamingFilename = null;
    renameValue = '';
  }

  function cancelRename() {
    renamingFilename = null;
    renameValue = '';
  }

  function handleDeleteClick(/** @type {MouseEvent} */ e, /** @type {string} */ filename) {
    e.stopPropagation();
    if (notes.length <= 1) return;
    onDelete(filename);
  }
</script>

<button class="mobile-toggle" on:click={() => sidebarOpen = !sidebarOpen}>
  {sidebarOpen ? '✕' : '☰'} notes
</button>

<aside class="sidebar" class:open={sidebarOpen}>
  <div class="sidebar-header">
    <span class="sidebar-title">notes</span>
    <button class="new-btn" on:click={startCreate} title="New note">+</button>
  </div>

  {#if creating}
    <div class="new-note-row">
      <input
        class="new-note-input"
        bind:value={newFilename}
        placeholder="filename"
        on:keydown={(e) => {
          if (e.key === 'Enter') confirmCreate();
          if (e.key === 'Escape') cancelCreate();
        }}
        on:blur={confirmCreate}
      />
    </div>
  {/if}

  <ul class="note-list">
    {#each notes as note (note.filename)}
      <li
        class="note-item"
        class:active={note.filename === activeFilename}
      >
        {#if renamingFilename === note.filename}
          <input
            class="rename-input"
            bind:value={renameValue}
            on:keydown={(e) => {
              if (e.key === 'Enter') confirmRename();
              if (e.key === 'Escape') cancelRename();
            }}
            on:blur={confirmRename}
          />
        {:else}
          <button
            class="note-name"
            on:click={() => { onSelect(note.filename); sidebarOpen = false; }}
            on:dblclick={() => startRename(note.filename)}
            title="Click to open, double-click to rename"
          >
            {note.filename.replace(/\.md$/, '')}
          </button>
          {#if notes.length > 1}
            <button
              class="delete-btn"
              on:click={(e) => handleDeleteClick(e, note.filename)}
              title="Delete note"
            >
              ×
            </button>
          {/if}
        {/if}
      </li>
    {/each}
  </ul>

  {#if notes.length === 0 && !creating}
    <p class="empty-msg">No notes yet. Click + to create one.</p>
  {/if}
</aside>

<style>
  .mobile-toggle {
    display: none;
    position: fixed;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 100;
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    color: var(--dim-color);
    font-family: var(--font-family-main);
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
    border-radius: 3px;
    cursor: pointer;
  }

  .mobile-toggle:hover {
    color: var(--text-color);
  }

  .sidebar {
    width: 220px;
    min-width: 220px;
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.75rem;
    border-bottom: 1px solid var(--border-color);
  }

  .sidebar-title {
    font-size: 0.8rem;
    color: var(--dim-color);
    letter-spacing: 0.5px;
  }

  .new-btn {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--dim-color);
    font-family: var(--font-family-main);
    font-size: 0.9rem;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
  }

  .new-btn:hover {
    color: var(--selected-text-color);
    border-color: var(--selected-text-color);
  }

  .new-note-row {
    padding: 0.4rem 0.75rem;
    border-bottom: 1px solid var(--border-color);
  }

  .new-note-input,
  .rename-input {
    width: 100%;
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    font-family: var(--font-family-main);
    font-size: 0.8rem;
    padding: 0.25rem 0.4rem;
    border-radius: 3px;
    outline: none;
  }

  .new-note-input:focus,
  .rename-input:focus {
    border-color: var(--selected-text-color);
  }

  .note-list {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
    overflow-y: auto;
  }

  .note-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(34, 34, 34, 0.5);
  }

  .note-item.active {
    background: rgba(255, 215, 0, 0.06);
  }

  .note-name {
    flex: 1;
    background: none;
    border: none;
    color: var(--text-color);
    font-family: var(--font-family-main);
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
    text-align: left;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s;
  }

  .note-item.active .note-name {
    color: var(--selected-text-color);
  }

  .note-name:hover {
    color: var(--text-color-heading);
  }

  .delete-btn {
    background: none;
    border: none;
    color: transparent;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.3rem 0.5rem;
    transition: color 0.2s;
    line-height: 1;
  }

  .note-item:hover .delete-btn {
    color: var(--dim-color);
  }

  .delete-btn:hover {
    color: #c44 !important;
  }

  .empty-msg {
    padding: 1rem 0.75rem;
    font-size: 0.8rem;
    color: var(--dim-color);
    text-align: center;
  }

  @media (max-width: 768px) {
    .mobile-toggle {
      display: block;
    }

    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 99;
      background: var(--bg-color);
      transform: translateX(-100%);
      transition: transform 0.25s ease;
    }

    .sidebar.open {
      transform: translateX(0);
    }
  }
</style>
