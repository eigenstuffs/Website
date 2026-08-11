<script>
	const workingPapers = [
		{
			title: 'Portable Legacies: Copperbelt Origins and Interethnic Marriage in Zambia',
			url: '/copperbelt.pdf',
			linkLabel: 'View PDF',
			coauthors: ['Ashton Butler'],
			abstract:
				"Can institutions create cross-ethnic ties that outlast the places that produced them? Using IPUMS census microdata from 2000 and 2010, we compare Copperbelt-born Zambian husbands with other married men in the same non-Copperbelt constituencies after the restructuring of Zambia's mining economy. Copperbelt-born husbands are more likely to be in cross-block marriages even after accounting for local marriage markets and standard observables. The results suggest that institutionally dense settings can leave social traces that remain visible after geographic mobility and institutional change."
		}
	];

	const inProgressPapers = [
		{
			title: 'Polarized Climate Policy',
			url: 'https://github.com/eigenstuffs/thesis/blob/main/dec%206%20version.pdf',
			linkLabel: 'View Draft',
			abstract:
				'Climate policy is a result of the distributive conflict between fossil fuel incumbents and clean energy interests. Consequently, the climate policies that most immediatley threaten fossil fuels are the most polarized. I test this theory empirically using state legislature data from 1998 to 2020.'
		},
		{
			title: 'Measuring Local Wealth in the Philippines',
			url: 'https://osf.io/95jva',
			linkLabel: 'View on OSF',
			abstract:
				'Existing small area estimates of poverty suffer from three main issues: (1) they are typically incomparable over time, (2) their validity is conditional on accurate income reporting, and (3) estimates outside of census years fail to update data. Using the case of the Philippines, I exploit comparable household surveys to estimate local wealth from 1985 to 2010.'
		}
	];
</script>

<svelte:head>
	<title>Research — Branden Bohrnsen</title>
</svelte:head>

<h1 class="page-title">Research</h1>

<section class="panel">
	<h2 class="section-label">Working Papers</h2>
	{#each workingPapers as paper (paper.title)}
		<article class="entry">
			<h3>{paper.title}</h3>
			{#if paper.coauthors && paper.coauthors.length > 0}
				<p class="byline">with {paper.coauthors.join(', ')}</p>
			{/if}
			<p class="abstract">{paper.abstract}</p>
			{#if paper.url}
				<a href={paper.url} target="_blank" rel="noopener noreferrer" class="doc-link"
					>{paper.linkLabel}</a
				>
			{/if}
		</article>
	{/each}
</section>

<section class="panel">
	<h2 class="section-label">In Progress</h2>
	{#each inProgressPapers as paper (paper.title)}
		<article class="entry">
			<h3>{paper.title}</h3>
			<p class="abstract">{paper.abstract}</p>
			{#if paper.url}
				<a href={paper.url} target="_blank" rel="noopener noreferrer" class="doc-link"
					>{paper.linkLabel}</a
				>
			{/if}
		</article>
	{/each}
</section>

<style>
	.panel {
		margin-bottom: 2rem;
	}

	.entry + .entry {
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border);
	}

	h3 {
		font-size: 1rem;
		font-weight: 500;
		margin: 0 0 0.25rem;
	}

	.byline {
		font-size: 0.85rem;
		color: var(--dim);
		font-style: italic;
		margin: 0 0 0.5rem;
	}

	.abstract {
		font-size: 0.9rem;
		margin: 0 0 0.65rem;
		color: var(--text);
	}

	.doc-link {
		font-size: 0.9rem;
	}
</style>
