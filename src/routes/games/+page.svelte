<script>
  // Data from your old page
  const games = [
    {
      title: "Don't Break the Bicycle",
      embed: `<iframe frameborder="0" src="https://itch.io/embed/3118685" width="552" height="167"><a href="https://dubiousduck.itch.io/dont-break-the-bicycle">Don't Break the Bicycle by DubiousDuck, brandenmb, Jon Wake, LemonInk</a></iframe>`,
      description: "A collaboration with Oscar Su created over 72 hours for ACM Studio. We ranked first in the inaugural Studio Jam."
    },
    {
      title: "Villainess x Reborn",
      embed: `<iframe frameborder="0" src="https://itch.io/embed/2746015" width="552" height="167"><a href="https://brandenmb.itch.io/villainess-x-reborn">Villainess x Reborn (Early Build)</a></iframe>`,
      description: "I served as a team lead for this project, focusing on programming and UI/UX. Over 1,400 downloads with a 5-star average rating."
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

<div class="page-container games-container">
  <header>
    <h1>Games</h1>
  </header>

  <main class="content-area">
    {#each games as game (game.title)}
      <article class="game-entry">
        <h2>{game.title}</h2>
        <p class="game-description">{game.description}</p>
        <div class="embed-container">
          {@html game.embed}
        </div>
      </article>
    {/each}
  </main>

  <footer class="footer-nav">
    <a href="/">&larr; Back Home</a>
  </footer>
</div>

<style>
  .games-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 1.5rem;
    max-width: 800px; /* Consistent max width */
    margin: 0 auto;
    box-sizing: border-box;
  }

  header {
     text-align: center;
     margin-bottom: 1.5rem;
     flex-shrink: 0;
  }

  h1 {
    font-size: 2rem;
    color: var(--text-color-heading);
  }

  .content-area {
      flex-grow: 1; /* Push footer down */
      width: 100%;
  }

  .game-entry {
    margin-bottom: 3rem; /* More space between game entries */
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--separator-color);
  }
  .game-entry:last-child {
      border-bottom: none;
  }


  h2 { /* Game Titles */
    font-size: 1.3rem; /* Slightly larger than paper titles */
    color: var(--text-color-heading);
    margin-bottom: 0.75rem;
    text-align: center; /* Center game titles */
  }

  .game-description {
    font-size: 0.95rem;
    line-height: 1.6;
    text-align: left; /* Keep description left-aligned */
    color: var(--text-color-main);
    margin-bottom: 1.5rem; /* Space before embed */
    max-width: 650px; /* Limit description width */
    margin-left: auto; /* Center description block */
    margin-right: auto; /* Center description block */
  }

  .embed-container {
      max-width: 552px; /* Max width from iframe */
      margin: 0 auto; /* Center the container */
      background-color: #191919; /* Optional: slightly lighter bg for embed area */
      padding: 5px; /* Optional: small padding around iframe */
      border-radius: 3px;
  }

  /* Make the iframe responsive within the container */
  .embed-container :global(iframe) {
      display: block; /* Remove extra space below iframe */
      width: 100%; /* Take full width of container */
      height: 167px; /* Keep original height */
      border: none; /* Ensure no iframe border */
      max-width: 100%; /* Prevent exceeding container width */
  }


  .footer-nav {
      margin-top: 2rem;
      text-align: center;
      flex-shrink: 0;
      padding-top: 1rem;
      border-top: 1px solid var(--separator-color);
  }

</style>