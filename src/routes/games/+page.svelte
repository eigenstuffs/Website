<script>
  const games = [
    {
      title: "Don't Break the Bicycle",
      embed: `<iframe frameborder="0" src="https://itch.io/embed/3118685?border_width=0" width="100%" height="165"><a href="https://dubiousduck.itch.io/dont-break-the-bicycle">Don't Break the Bicycle by DubiousDuck, brandenmb, Jon Wake, LemonInk</a></iframe>`,
      description: "A collaboration with Oscar Su created over 72 hours for ACM Studio. We ranked first in the inaugural Studio Jam."
    },
    {
      title: "Villainess x Reborn",
      embed: `<iframe frameborder="0" src="https://itch.io/embed/2746015?border_width=0" width="100%" height="165"><a href="https://brandenmb.itch.io/villainess-x-reborn">Villainess x Reborn (Early Build)</a></iframe>`,
      description: "I served as a team lead for this project, focusing on programming and UI/UX. Over 1,400 downloads with a 5-star average rating."
    },
    {
      title: "Social Interaction Simulator",
      embed: `<iframe frameborder="0" src="https://itch.io/embed/1409939?border_width=0" width="100%" height="165"><a href="https://brandenmb.itch.io/social-interaction-simulator">Social Interaction Simulator by brandenmb</a></iframe>`,
      description: "A stressful typing game about day-to-day life. Ranked #17 out of 173 entries in Mini Jam 100: Overload."
    },
    {
      title: "game with squares",
      embed: `<iframe frameborder="0"src="https://itch.io/embed/1967456?border_width=0" width="100%" height="165"><a href="https://brandenmb.itch.io/gamewithsquares">game with squares by brandenmb</a></iframe>`,
      description: "A minimalistic platformer made in 72 hours."
    }
  ];
</script>

<div>
  <header>
    <h1>Games</h1>
  </header>

  <main class="games-grid">
    {#each games as game (game.title)}
      <article class="game-entry">
        <h2>{game.title}</h2>
        <div class="embed-container">
          {@html game.embed}
        </div>
        <p class="game-description">{game.description}</p>
      </article>
    {/each}
  </main>
</div>

<style>
  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2rem;
  }

  /* Key styles for the 2x2 grid */
  .games-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .game-entry {
    display: flex;
    flex-direction: column;
    background-color: #1a1a1a;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #333;
  }

  h2 {
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .embed-container {
    width: 100%;
    margin-bottom: 1rem;
  }

  .embed-container :global(iframe) {
    display: block;
    width: 100%;
    height: 165px;
    border: none;
  }

  .game-description {
    font-size: 0.9rem;
    line-height: 1.5;
    text-align: left;
    margin-top: auto; /* Pushes description to the bottom */
  }

  /* Responsive adjustments for smaller screens */
  @media (max-width: 768px) {
    .games-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
