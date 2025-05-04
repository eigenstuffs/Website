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

<div class="page-container blog-container">
  <header>
    <h1>Blog</h1>
  </header>

  <main class="content-area">
    <section class="post-list">
      {#each postsToList as post (post.url)}
        <article class="post-entry">
          <p class="post-date">{post.date}</p>
          <h3>
            <a href={post.url}>{post.title}</a>
          </h3>
          <p class="post-summary">{post.summary}</p>
        </article>
      {/each}
    </section>
  </main>

  <footer class="footer-nav">
    <a href="/">&larr; Back Home</a>
  </footer>
</div>

<style>
  .blog-container { display: flex; flex-direction: column; min-height: 100vh; padding: 1.5rem; max-width: 800px; margin: 0 auto; box-sizing: border-box; }
  header { text-align: center; margin-bottom: 1.5rem; flex-shrink: 0; }
  h1 { font-size: 2rem; color: var(--text-color-heading); }
  .content-area { flex-grow: 1; width: 100%; }
  .post-list { margin-bottom: 2.5rem; }
  .post-entry { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--separator-color); }
  .post-entry:last-child { border-bottom: none; }
  .post-date { font-size: 0.85rem; color: var(--text-color-main); opacity: 0.8; margin-bottom: 0.25rem; }
  h3 { font-size: 1.2rem; margin-bottom: 0.5rem; font-weight: normal; }
  .post-summary { font-size: 0.95rem; line-height: 1.6; text-align: left; color: var(--text-color-main); }
  .footer-nav { margin-top: 2rem; text-align: center; flex-shrink: 0; padding-top: 1rem; border-top: 1px solid var(--separator-color); }
</style>