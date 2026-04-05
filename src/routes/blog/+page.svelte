<script>
  const postsToList = [
    {
      title: "Reflections on the Grad School Application Cycle",
      url: "/blog/grad-school-applications",
      date: "2025-05-02",
      summary: "Thinking back on the graduate school application process..."
    }
  ];
</script>

<div class="blog-page">
  <h1 class="page-title">Blog</h1>

  <section class="post-list">
    {#each postsToList as post (post.url)}
      <article class="post-entry">
        <time class="post-date">{post.date}</time>
        <h3><a href={post.url}>{post.title}</a></h3>
        <p class="post-summary">{post.summary}</p>
      </article>
    {/each}
  </section>
</div>

<style>
  .blog-page {
    width: 100%;
  }

  .post-list {
    margin: 0;
  }

  .post-entry {
    margin-bottom: 2.5rem;
  }

  .post-date {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--dim);
    letter-spacing: 0.02em;
    display: block;
    margin-bottom: 0.3rem;
  }

  h3 {
    font-size: 1.35rem;
    font-weight: 600;
    margin: 0 0 0.4rem 0;
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

  .post-summary {
    font-size: 1rem;
    line-height: 1.65;
    margin: 0;
    color: var(--dim);
  }
</style>
