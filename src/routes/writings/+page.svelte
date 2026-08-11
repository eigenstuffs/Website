<script>
	import Seo from '$lib/components/Seo.svelte';

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

<Seo title="Writings" description="Essays and public writing by Branden Bohrnsen." />

<h1 class="page-title">Writings</h1>

<ul class="essays">
	{#each essays as essay (essay.href)}
		<li>
			<h2 class="item-title">
				<a href={essay.href} target="_blank" rel="noopener noreferrer">{essay.title}</a>
			</h2>
			{#if essay.subtitle}
				<p class="subtitle">{essay.subtitle}</p>
			{/if}
			<p class="meta">
				{essay.venue}{#if essay.coauthors}&nbsp;· {essay.coauthors}{/if}&nbsp;· {essay.year}
			</p>
		</li>
	{/each}
</ul>

<style>
	.essays {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--sp-5);
	}

	.essays li + li {
		padding-top: var(--sp-5);
		border-top: 1px solid var(--border);
	}

	.item-title a {
		color: var(--text-heading);
	}

	.subtitle {
		margin: var(--sp-1) 0 var(--sp-2);
		color: var(--text);
	}
</style>
