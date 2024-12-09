
<script>
  const games = [
    {
      title: "Villainess x Reborn",
      embed: `<iframe frameborder="0" src="https://itch.io/embed/2746015" width="552" height="167"><a href="https://brandenmb.itch.io/villainess-x-reborn">Villainess x Reborn (Early Build)</a></iframe>`,
      description: "I served as the team lead for this project, focusing on programming and UI/UX."
    },
    {
      title: "Don't Break the Bicycle",
      embed: `<iframe frameborder="0" src="https://itch.io/embed/3118685" width="552" height="167"><a href="https://dubiousduck.itch.io/dont-break-the-bicycle">Don't Break the Bicycle by DubiousDuck, brandenmb, Jon Wake, LemonInk</a></iframe>`,
      description: "A collaboration with Oscar Su created over 72 hours for ACM Studio. We ranked first in the inaugural Studio Jam."
    },
    {
      title: "Social Interaction Simulator",
      embed: `<iframe frameborder="0" src="https://itch.io/embed/1409939" width="552" height="167"><a href="https://brandenmb.itch.io/social-interaction-simulator">Social Interaction Simulator by brandenmb</a></iframe>`,
      description: "A stressful typing game about day-to-day life. Ranked #17 out of 173 entries in Mini Jam 100: Overload."
    },
    {
      title: "game with squares",
      embed: `<iframe frameborder="0" src="https://itch.io/embed/1967456" width="552" height="167"><a href="https://brandenmb.itch.io/gamewithsquares">game with squares by brandenmb</a></iframe>`,
      description: "A minimalistic platformer made in 72 hours."
    }
  ];
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #0d0d0d;
    color: #ffffff;
    font-family: 'Inter', sans-serif;
  }

  .portfolio-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 1rem;
    text-align: left;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .game {
    margin-bottom: 2rem;
  }

  .game-description {
    margin: 0.5rem 0 1.5rem;
    font-size: 1rem;
    color: #cccccc;
  }

  button {
    background-color: #1f2937;
    color: #ffffff;
    border: 1px solid #374151;
    border-radius: 5px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    align-items: center;
  }

  button:hover {
    background-color: #374151;
  }

  footer {
    position: absolute;
    bottom: 1rem;
    font-size: 0.8rem;
    color: #6b7280;
  }
</style>

<div class="portfolio-container">
  <h1>Games</h1>
  {#each games as game}
    <div class="game">
      <h2>{game.title}</h2>
      <p class="game-description">{game.description}</p>
      {@html game.embed}
    </div>
  {/each}
  <div class="button-row">
    <button on:click={() => (window.location.href = '/')}>Home</button>
   </div>
</div>