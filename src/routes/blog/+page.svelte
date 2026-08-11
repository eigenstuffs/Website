<script>
	import Seo from '$lib/components/Seo.svelte';

	const posts = [
		{
			title: 'Reflections on Applying to Graduate School',
			url: '/blog/grad-school-applications',
			date: '2025-05-02',
			summary:
				'Notes from a political science PhD admissions cycle: what helped, what I would do differently, and what the GRE actually costs you.'
		}
	];

	/** @param {string} iso */
	const formatDate = (iso) =>
		new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
</script>

<Seo title="Blog" description="Occasional posts by Branden Bohrnsen." />

<h1 class="page-title">Blog</h1>

<ul class="post-list">
	{#each posts as post (post.url)}
		<li class="post-entry">
			<time class="post-date" datetime={post.date}>{formatDate(post.date)}</time>
			<h2 class="item-title"><a href={post.url}>{post.title}</a></h2>
			<p class="post-summary">{post.summary}</p>
		</li>
	{/each}
</ul>

<style>
	.post-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--sp-5);
	}

	.post-entry + .post-entry {
		padding-top: var(--sp-5);
		border-top: 1px solid var(--border);
	}

	.post-date {
		display: block;
		font-family: var(--font-ui);
		font-size: var(--fs-sm);
		color: var(--dim);
		margin-bottom: var(--sp-1);
	}

	.item-title a {
		color: var(--text-heading);
	}

	.post-summary {
		margin: var(--sp-2) 0 0;
		color: var(--text);
	}
</style>
