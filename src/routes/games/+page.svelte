<script>
  const games = [
    {
      title: "Don't Break the Bicycle",
      embed: `<iframe frameborder="0" src="https://itch.io/embed/3118685?border_width=0" width="100%" height="165"><a href="https://dubiousduck.itch.io/dont-break-the-bicycle">Don't Break the Bicycle by DubiousDuck, brandenmb, Jon Wake, LemonInk</a></iframe>`,
      description: "A collaboration with Oscar Su created over 72 hours for ACM Studio.",
      badge: "1st place — Studio Jam"
    },
    {
      title: "Villainess x Reborn",
      embed: `<iframe frameborder="0" src="https://itch.io/embed/2746015?border_width=0" width="100%" height="165"><a href="https://brandenmb.itch.io/villainess-x-reborn">Villainess x Reborn (Early Build)</a></iframe>`,
      description: "Team lead, programming & UI/UX. Over 1,400 downloads with a 5-star average rating.",
      badge: "Team Lead"
    },
    {
      title: "Social Interaction Simulator",
      embed: `<iframe frameborder="0" src="https://itch.io/embed/1409939?border_width=0" width="100%" height="165"><a href="https://brandenmb.itch.io/social-interaction-simulator">Social Interaction Simulator by brandenmb</a></iframe>`,
      description: "A stressful typing game about day-to-day life.",
      badge: "#17 / 173 — Mini Jam 100"
    },
    {
      title: "game with squares",
      embed: `<iframe frameborder="0" src="https://itch.io/embed/1967456?border_width=0" width="100%" height="165"><a href="https://brandenmb.itch.io/gamewithsquares">game with squares by brandenmb</a></iframe>`,
      description: "A minimalistic platformer made in 72 hours.",
      badge: "72h Jam"
    }
  ];
</script>

<div class="games-page">
  <h1 class="page-title">Games</h1>

  <div class="games-grid">
    {#each games as game (game.title)}
      <article class="game-card">
        <div class="card-top">
          <h2>{game.title}</h2>
          {#if game.badge}
            <span class="badge">{game.badge}</span>
          {/if}
        </div>
        <div class="embed-container">
          {@html game.embed}
        </div>
        <p class="game-desc">{game.description}</p>
      </article>
    {/each}
  </div>
</div>

<style>
  .games-page {
    width: 100%;
  }

  .games-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  .game-card {
    display: flex;
    flex-direction: column;
    padding: 1.25rem;
    border: 2px solid var(--border);
    border-radius: 4px;
    transition: border-color 0.15s;
  }

  .game-card:hover {
    border-color: var(--accent);
  }

  .card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  h2 {
    font-size: 1.05rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.3;
  }

  .badge {
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    padding: 0.2rem 0.55rem;
    border-radius: 100px;
    background: rgba(194, 65, 12, 0.1);
    color: var(--accent);
    white-space: nowrap;
    margin-top: 0.1rem;
  }

  .embed-container {
    width: 100%;
    margin-bottom: 0.75rem;
  }

  .embed-container :global(iframe) {
    display: block;
    width: 100%;
    height: 165px;
    border: none;
  }

  .game-desc {
    font-size: 0.9rem;
    line-height: 1.55;
    margin: 0;
    margin-top: auto;
    color: var(--dim);
  }

  @media (max-width: 768px) {
    .games-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
