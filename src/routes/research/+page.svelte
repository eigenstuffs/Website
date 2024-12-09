<script>
  const papers = [
    {
      title: "The Role of Partisanship in State Climate Policy",
      authors: "Branden Bohrnsen",
      abstract:
        "What are the political determinants of state climate policy? I argue that facets of climate policy differ in their incentive structures, particularly along the lines of clean energy and energy efficiency. Analyzing policies and environmental outcomes from 1998 to 2020 across state legislatures, I find that Republican-led polarization is associated with worse clean energy outcomes and weaker climate policies. Energy efficiency, on the other hand, is robust to polarization, which I attribute to shared ince ntives between policymakers and fossil fuel stakeholders. I suggest that the bundling of popular energy efficiency policies with controversial, yet effective renewable energy policy is necessary to sustain meaningful climate policies.",
      link: "https://github.com/eigenstuffs/thesis/blob/main/dec%206%20version.pdf",
    }
  ]
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

  .container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
    text-align: center;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .paper {
    background-color: #1f2937;
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    text-align: left;
  }

  .paper-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .paper-authors {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #9ca3af;
  }

  .paper-abstract {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
    color: #3498db;
    font-weight: bold;
  }

  a:hover {
    color: #2980b9;
  }

  .button-row {
    margin-top: 2rem;
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
  }

  button:hover {
    background-color: #374151;
  }
</style>

<div class="container">
  <h1>Working Papers</h1>
  {#each papers as paper}
    <div class="paper">
      <div class="paper-title">{paper.title}</div>
      <div class="paper-authors">{paper.authors}</div>
      <div class="paper-abstract">{paper.abstract}</div>
      <a href={paper.link} target="_blank" rel="noopener noreferrer">Read Latest Version</a>
    </div>
  {/each}
  <div class="button-row">
    <button on:click={() => (window.location.href = '/')}>Home</button>
  </div>
</div>
