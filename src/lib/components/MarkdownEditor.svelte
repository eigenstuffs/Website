<script>
  import { marked } from 'marked';

  export let content = '';
  export let saveStatus = 'saved';
  export let onInput = (/** @type {string} */ _content) => {};

  let activeTab = 'edit';

  $: renderedHtml = marked(content || '');

  function handleInput(/** @type {Event} */ e) {
    const target = /** @type {HTMLTextAreaElement} */ (e.target);
    onInput(target.value);
  }

  function handleKeydown(/** @type {KeyboardEvent} */ e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = /** @type {HTMLTextAreaElement} */ (e.target);
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;
      target.value = value.substring(0, start) + '  ' + value.substring(end);
      target.selectionStart = target.selectionEnd = start + 2;
      onInput(target.value);
    }
  }
</script>

<div class="editor-container">
  <div class="editor-header">
    <div class="tab-bar">
      <button
        class="tab"
        class:active={activeTab === 'edit'}
        on:click={() => activeTab = 'edit'}
      >
        Edit
      </button>
      <button
        class="tab"
        class:active={activeTab === 'preview'}
        on:click={() => activeTab = 'preview'}
      >
        Preview
      </button>
    </div>
    <span
      class="save-status"
      class:saved={saveStatus === 'saved'}
      class:saving={saveStatus === 'saving'}
      class:unsaved={saveStatus === 'unsaved'}
    >
      {#if saveStatus === 'saved'}
        saved
      {:else if saveStatus === 'saving'}
        saving...
      {:else}
        unsaved
      {/if}
    </span>
  </div>

  <div class="editor-panes">
    <div class="edit-pane" class:hidden-mobile={activeTab !== 'edit'}>
      <textarea
        value={content}
        on:input={handleInput}
        on:keydown={handleKeydown}
        placeholder="Start writing..."
        spellcheck="true"
      ></textarea>
    </div>
    <div class="divider"></div>
    <div class="preview-pane" class:hidden-mobile={activeTab !== 'preview'}>
      <div class="markdown-body">
        {@html renderedHtml}
      </div>
    </div>
  </div>
</div>

<style>
  .editor-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    overflow: hidden;
  }

  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0.75rem;
    border-bottom: 1px solid var(--border-color);
    background: rgba(255, 255, 255, 0.02);
  }

  .tab-bar {
    display: flex;
    gap: 0.25rem;
  }

  .tab {
    background: none;
    border: none;
    color: var(--dim-color);
    font-family: var(--font-family-main);
    font-size: 0.8rem;
    padding: 0.25rem 0.6rem;
    cursor: pointer;
    border-radius: 3px;
    transition: color 0.2s, background 0.2s;
  }

  .tab:hover {
    color: var(--text-color);
  }

  .tab.active {
    color: var(--selected-text-color);
    background: rgba(255, 215, 0, 0.08);
  }

  .save-status {
    font-size: 0.75rem;
    letter-spacing: 0.3px;
  }

  .save-status.saved {
    color: #4a7;
  }

  .save-status.saving {
    color: var(--dim-color);
  }

  .save-status.unsaved {
    color: var(--selected-text-color);
  }

  .editor-panes {
    display: flex;
    flex: 1;
    min-height: 0;
  }

  .edit-pane,
  .preview-pane {
    flex: 1;
    min-width: 0;
    overflow: auto;
  }

  .divider {
    width: 1px;
    background: var(--border-color);
  }

  textarea {
    width: 100%;
    height: 100%;
    background: transparent;
    color: var(--text-color);
    font-family: var(--font-family-main);
    font-size: 0.85rem;
    line-height: 1.7;
    border: none;
    outline: none;
    resize: none;
    padding: 1rem;
    tab-size: 2;
  }

  textarea::placeholder {
    color: var(--dim-color);
  }

  .preview-pane {
    padding: 1rem;
  }

  .markdown-body {
    font-size: 0.85rem;
    line-height: 1.7;
    color: var(--text-color);
  }

  .markdown-body :global(h1),
  .markdown-body :global(h2),
  .markdown-body :global(h3),
  .markdown-body :global(h4) {
    color: var(--text-color-heading);
    margin: 1.2em 0 0.5em;
    font-weight: normal;
  }

  .markdown-body :global(h1) {
    font-size: 1.4rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.3em;
  }

  .markdown-body :global(h2) {
    font-size: 1.15rem;
  }

  .markdown-body :global(h3) {
    font-size: 1rem;
  }

  .markdown-body :global(a) {
    color: var(--link-color);
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 215, 0, 0.3);
  }

  .markdown-body :global(a:hover) {
    border-color: var(--link-color);
  }

  .markdown-body :global(code) {
    background: rgba(255, 255, 255, 0.06);
    padding: 0.15em 0.35em;
    border-radius: 3px;
    font-size: 0.9em;
  }

  .markdown-body :global(pre) {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.8rem;
    overflow-x: auto;
  }

  .markdown-body :global(pre code) {
    background: none;
    padding: 0;
  }

  .markdown-body :global(blockquote) {
    border-left: 3px solid var(--selected-text-color);
    margin: 0.8em 0;
    padding: 0.3em 1em;
    color: var(--dim-color);
  }

  .markdown-body :global(ul),
  .markdown-body :global(ol) {
    padding-left: 1.5em;
  }

  .markdown-body :global(li) {
    margin: 0.25em 0;
  }

  .markdown-body :global(hr) {
    border: none;
    border-top: 1px solid var(--border-color);
    margin: 1.5em 0;
  }

  .markdown-body :global(img) {
    max-width: 100%;
    border-radius: 4px;
  }

  .markdown-body :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
  }

  .markdown-body :global(th),
  .markdown-body :global(td) {
    border: 1px solid var(--border-color);
    padding: 0.4em 0.8em;
    text-align: left;
  }

  .markdown-body :global(th) {
    color: var(--text-color-heading);
  }

  /* Mobile: show only active tab */
  @media (max-width: 768px) {
    .editor-panes {
      flex-direction: column;
    }

    .divider {
      display: none;
    }

    .hidden-mobile {
      display: none;
    }

    .edit-pane,
    .preview-pane {
      flex: 1;
    }
  }

  /* Desktop: always show both panes, hide tab bar */
  @media (min-width: 769px) {
    .tab-bar {
      display: none;
    }
  }
</style>
