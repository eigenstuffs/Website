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

  $: inProgressPapers = papers.filter(p => p.status === 'In Progress');
</script>

<div class="research-page-container">
  <header>
    <h1>Research</h1>
  </header>

  <main>
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
</div>

<style>
  .research-page-container {
    width: 100%;
    max-width: 900px; /* This binds the content to a reasonable width */
    margin: 0 auto; /* This centers the container on the screen */
  }

  header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .paper-list {
    margin-bottom: 2.5rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--separator-color, #444);
    padding-bottom: 0.5rem;
  }

  .paper-entry {
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    font-weight: normal;
  }

  h3 a {
    text-decoration: underline;
  }

  .abstract {
    font-size: 0.95rem;
    line-height: 1.6;
    text-align: left;
  }
</style>
