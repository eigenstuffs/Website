<script>
	const postsToList = [
		{
			title: 'Reflections on the Grad School Application Cycle',
			url: '/blog/grad-school-applications',
			date: '2025-05-02',
			summary: 'Thinking back on the graduate school application process...'
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
	.post-entry {
		margin-bottom: 2rem;
	}

	.post-date {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--dim);
		letter-spacing: 0.02em;
		display: block;
		margin-bottom: 0.3rem;
	}

	h3 {
		font-size: 1.05rem;
		font-weight: 500;
		margin: 0 0 0.35rem;
		line-height: 1.35;
	}

	h3 a {
		color: var(--text);
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-color: #d4d4d8;
	}

	h3 a:hover {
		text-decoration-color: #a1a1aa;
	}

	.post-summary {
		font-size: 0.95rem;
		line-height: 1.6;
		margin: 0;
		color: var(--dim);
	}
</style>
