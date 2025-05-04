<script>
  const papers = [
    {
        title: "Polarized Climate Policy",
        url: "https://github.com/eigenstuffs/thesis/blob/main/dec%206%20version.pdf",
        abstract: "Climate policy is a result of the distributive conflict between fossil fuel incumbents and clean energy interests. Consequently, the climate policies that most immediatley threaten fossil fuels are the most polarized. I test this theory empirically using state legislature data from 1998 to 2020.",
        status: "In Progress"
    },
    {
        title: "Measuring Local Wealth in the Philippines",
        url: "https://osf.io/95jva",
        abstract: "Existing small area estimates of poverty suffer from three main issues: (1) they are typically incomparable over time, (2) their validity is conditional on accurate income reporting, and (3) estimates outside of census years fail to update data. Using the case of the Philippines, I exploit comparable household surveys to estimate local wealth from 1985 to 2010.",
        status: "In Progress"
    }
  ];

  $: workingPapers = papers.filter(p => p.status === 'Working Paper');
  $: inProgressPapers = papers.filter(p => p.status === 'In Progress');

</script>

<div class="page-container research-container">
  <header>
    <h1>Research</h1>
  </header>

  <main class="content-area">
    {#if workingPapers.length > 0}
      <section class="paper-list">
        <h2>Working Papers</h2>
        {#each workingPapers as paper (paper.title)}
          <article class="paper-entry">
            <h3>
              {#if paper.url}
                <a href={paper.url} target="_blank" rel="noopener noreferrer">
                  {paper.title}
                </a>
              {:else}
                {paper.title}
              {/if}
            </h3>
            <p class="abstract">{paper.abstract}</p>
          </article>
        {/each}
      </section>
    {/if}

    {#if inProgressPapers.length > 0}
      <section class="paper-list">
        <h2>In Progress</h2>
        {#each inProgressPapers as paper (paper.title)}
          <article class="paper-entry">
             <h3>
              {#if paper.url}
                <a href={paper.url} target="_blank" rel="noopener noreferrer">
                  {paper.title}
                </a>
              {:else}
                {paper.title}
              {/if}
            </h3>
            <p class="abstract">{paper.abstract}</p>
          </article>
        {/each}
      </section>
    {/if}
  </main>

  <footer class="footer-nav">
    <a href="/">&larr; Back Home</a>
  </footer>
</div>

<style>
  .research-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 1.5rem;
    max-width: 800px;
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
      flex-grow: 1;
      width: 100%;
  }

  .paper-list {
    margin-bottom: 2.5rem;
  }

  h2 {
    font-size: 1.5rem;
    color: var(--text-color-heading);
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--separator-color);
    padding-bottom: 0.5rem;
  }

  .paper-entry {
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    font-weight: normal;
    text-decoration: underline; /* ADDED: Underline paper titles */
  }

  .abstract {
    font-size: 0.95rem;
    line-height: 1.6;
    text-align: left;
    color: var(--text-color-main);
  }

  .footer-nav {
      margin-top: 2rem;
      text-align: center;
      flex-shrink: 0;
      padding-top: 1rem;
      border-top: 1px solid var(--separator-color);
  }

</style>