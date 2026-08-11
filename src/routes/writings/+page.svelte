<script>
	const essays = [
		{
			title: 'Inside The Roblox Casino',
			subtitle: 'The gambling mechanics hidden inside children’s games',
			venue: 'Free Systems',
			coauthors: 'with Andy Hall',
			year: '2026',
			href: 'https://freesystems.substack.com/p/inside-the-roblox-casino'
		}
	];
</script>

<svelte:head>
	<title>Writings — Branden Bohrnsen</title>
	<meta name="description" content="Essays and public writing." />
</svelte:head>

<h1 class="page-title">Writings</h1>

<section class="panel">
	<ul class="essays">
		{#each essays as essay}
			<li>
				<a href={essay.href} target="_blank" rel="noopener noreferrer" class="essay-title"
					>{essay.title}</a
				>
				{#if essay.subtitle}
					<p class="subtitle">{essay.subtitle}</p>
				{/if}
				<p class="meta">
					{essay.venue}{#if essay.coauthors} · {essay.coauthors}{/if} · {essay.year}
				</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.essays {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.essays li + li {
		margin-top: 1.15rem;
		padding-top: 1.15rem;
		border-top: 1px solid var(--border);
	}

	.essay-title {
		font-size: 1rem;
		font-weight: 500;
	}

	.subtitle {
		font-size: 0.9rem;
		color: var(--dim);
		margin: 0.25rem 0 0;
	}

	.meta {
		font-size: 0.85rem;
		color: var(--dim);
		margin: 0.2rem 0 0;
	}
</style>
