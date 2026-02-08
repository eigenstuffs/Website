<script>
  // Define post list data locally for the index page
  // 'url' now points directly to the hardcoded page path
  const postsToList = [
     {
      title: "Reflections on the Grad School Application Cycle",
      url: "/blog/grad-school-applications", // Direct link
      date: "2025-05-02",
      summary: "Thinking back on the graduate school application process..."
    }
  ];

  // Optional sort
  // postsToList.sort((a, b) => new Date(b.date) - new Date(a.date));
</script>

<div class="blog-container">
  <h1>Blog</h1>

  <section class="post-list">
    {#each postsToList as post (post.url)}
      <article class="post-entry">
        <span class="post-date">{post.date}</span>
        <h3>
          <a href={post.url}>{post.title}</a>
        </h3>
        <p class="post-summary">{post.summary}</p>
      </article>
    {/each}
  </section>

  <footer class="footer-nav">
    <a href="/">&larr; Back Home</a>
  </footer>
</div>

<style>
  .blog-container {
    width: 100%;
    max-width: 620px;
  }

  h1 {
    font-size: 1.3rem;
    font-weight: normal;
    color: var(--text-color-heading);
    margin: 0 0 2rem 0;
  }

  .post-list {
    margin-bottom: 2rem;
  }

  .post-entry {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-color);
  }

  .post-entry:last-child {
    border-bottom: none;
  }

  .post-date {
    font-size: 0.78rem;
    color: var(--dim-color);
  }

  h3 {
    font-size: 1rem;
    font-weight: normal;
    margin: 0.25rem 0 0.5rem 0;
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

  .post-summary {
    font-size: 0.88rem;
    line-height: 1.6;
    margin: 0;
  }

  .footer-nav {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }

  .footer-nav a {
    color: var(--dim-color);
    font-size: 0.85rem;
    transition: color 0.2s;
  }

  .footer-nav a:hover {
    color: var(--text-color);
  }
</style>
