<script>
  const writings = [
    {
      title: "Inside The Roblox Casino",
      subtitle: "The gambling mechanics hidden inside children's games",
      url: "https://substack.com/home/post/p-189885936",
      coauthors: ["Andy Hall"],
      venue: "Free Systems",
      date: "Mar 2026"
    }
  ];
</script>

<div class="writings-page">
  <h1 class="page-title">Writings</h1>

  <div class="items">
    {#each writings as piece (piece.title)}
      <article class="item">
        <div class="item-header">
          <h2>
            <a href={piece.url} target="_blank" rel="noopener noreferrer">
              {piece.title} →
            </a>
          </h2>
          <span class="date">{piece.date}</span>
        </div>
        {#if piece.subtitle}
          <p class="subtitle">{piece.subtitle}</p>
        {/if}
        <div class="meta">
          {#if piece.coauthors && piece.coauthors.length > 0}
            <span class="coauthors">with {piece.coauthors.join(', ')}</span>
          {/if}
          {#if piece.coauthors && piece.coauthors.length > 0 && piece.venue}
            <span class="sep">·</span>
          {/if}
          {#if piece.venue}
            <span class="venue">{piece.venue}</span>
          {/if}
        </div>
      </article>
    {/each}
  </div>
</div>

<style>
  .writings-page {
    width: 100%;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .item {
    border-left: 4px solid var(--accent);
    background: var(--surface);
    padding: 1.25rem 1.5rem;
    border-radius: 0 4px 4px 0;
  }

  .item-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.35rem;
  }

  h2 {
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.3;
  }

  h2 a {
    color: var(--text-heading);
    text-decoration: none;
    transition: color 0.15s;
  }

  h2 a:hover {
    color: var(--accent);
  }

  .date {
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--dim);
    margin-top: 0.2rem;
    white-space: nowrap;
  }

  .subtitle {
    font-size: 0.95rem;
    color: var(--text);
    margin: 0 0 0.6rem;
    line-height: 1.55;
  }

  .meta {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .coauthors,
  .venue {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--dim);
  }

  .sep {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--dim);
  }
</style>
