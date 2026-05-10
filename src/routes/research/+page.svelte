<script>
  const workingPapers = [
    {
      title: "Portable Legacies: Copperbelt Origins and Interethnic Marriage in Zambia",
      url: "/copperbelt.pdf",
      coauthors: ["Ashton Butler"],
      abstract: "Can institutions create cross-ethnic ties that outlast the places that produced them? Using IPUMS census microdata from 2000 and 2010, we compare Copperbelt-born Zambian husbands with other married men in the same non-Copperbelt constituencies after the restructuring of Zambia's mining economy. Copperbelt-born husbands are more likely to be in cross-block marriages even after accounting for local marriage markets and standard observables. The results suggest that institutionally dense settings can leave social traces that remain visible after geographic mobility and institutional change.",
    }
  ];

  const inProgressPapers = [
    {
      title: "Polarized Climate Policy",
      url: "https://github.com/eigenstuffs/thesis/blob/main/dec%206%20version.pdf",
      abstract: "Climate policy is a result of the distributive conflict between fossil fuel incumbents and clean energy interests. Consequently, the climate policies that most immediatley threaten fossil fuels are the most polarized. I test this theory empirically using state legislature data from 1998 to 2020.",
    },
    {
      title: "Measuring Local Wealth in the Philippines",
      url: "https://osf.io/95jva",
      abstract: "Existing small area estimates of poverty suffer from three main issues: (1) they are typically incomparable over time, (2) their validity is conditional on accurate income reporting, and (3) estimates outside of census years fail to update data. Using the case of the Philippines, I exploit comparable household surveys to estimate local wealth from 1985 to 2010.",
    }
  ];
</script>

<div class="research-page">
  <h1 class="page-title">Research</h1>

  <section>
    <h2>Working Papers</h2>
    <div class="cards">
      {#each workingPapers as paper (paper.title)}
        <article class="card">
          <div class="card-header">
            <h3>
              {#if paper.url}
                <a href={paper.url} target="_blank" rel="noopener noreferrer">
                  {paper.title} →
                </a>
              {:else}
                {paper.title}
              {/if}
            </h3>
          </div>
          {#if paper.coauthors && paper.coauthors.length > 0}
            <p class="coauthors">with {paper.coauthors.join(', ')}</p>
          {/if}
          <p class="abstract">{paper.abstract}</p>
        </article>
      {/each}
    </div>
  </section>

  <section>
    <h2>In Progress</h2>
    <div class="cards">
      {#each inProgressPapers as paper (paper.title)}
        <article class="card">
          <div class="card-header">
            <h3>
              {#if paper.url}
                <a href={paper.url} target="_blank" rel="noopener noreferrer">
                  {paper.title} →
                </a>
              {:else}
                {paper.title}
              {/if}
            </h3>
          </div>
          <p class="abstract">{paper.abstract}</p>
        </article>
      {/each}
    </div>
  </section>
</div>

<style>
  .research-page {
    width: 100%;
  }

  section + section {
    margin-top: 2.5rem;
  }

  h2 {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--dim);
    margin: 0 0 1.25rem 0;
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .card {
    border-left: 4px solid var(--accent);
    background: var(--surface);
    padding: 1.25rem 1.5rem;
    border-radius: 0 4px 4px 0;
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.3;
  }

  h3 a {
    color: var(--text-heading);
    text-decoration: none;
    transition: color 0.15s;
  }

  h3 a:hover {
    color: var(--accent);
  }

  .status-pill {
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
    border-radius: 100px;
    background: rgba(74, 103, 65, 0.12);
    color: var(--accent-secondary);
    white-space: nowrap;
    margin-top: 0.15rem;
  }

  .coauthors {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--dim);
    margin: 0 0 0.5rem;
  }

  .abstract {
    font-size: 0.95rem;
    line-height: 1.7;
    margin: 0;
    color: var(--text);
  }
</style>
