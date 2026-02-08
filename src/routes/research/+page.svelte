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

<div class="research-page">
  <h1>Research</h1>

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
</div>

<style>
  .research-page {
    width: 100%;
    max-width: 620px;
  }

  h1 {
    font-size: 1.3rem;
    font-weight: normal;
    color: var(--text-color-heading);
    margin: 0 0 2rem 0;
  }

  .paper-list {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 0.8rem;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--dim-color);
    margin: 0 0 1.5rem 0;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.5rem;
  }

  .paper-entry {
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1rem;
    font-weight: normal;
    margin: 0 0 0.4rem 0;
    color: var(--text-color-heading);
  }

  h3 a {
    color: var(--link-color);
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 215, 0, 0.3);
    transition: border-color 0.2s;
  }

  h3 a:hover {
    border-color: var(--link-color);
  }

  .abstract {
    font-size: 0.92rem;
    line-height: 1.7;
    margin: 0;
  }
</style>
