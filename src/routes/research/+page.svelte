<script>
	import Seo from '$lib/components/Seo.svelte';

	const workingPapers = [
		{
			title: 'Portable Legacies: Copperbelt Origins and Interethnic Marriage in Zambia',
			url: '/copperbelt.pdf',
			linkLabel: 'View PDF',
			coauthors: ['Ashton Butler'],
			abstract:
				'Can institutions create cross-ethnic ties that outlast the places that produced them? Using IPUMS census microdata from 2000 and 2010, we compare Copperbelt-born Zambian husbands with other married men in the same non-Copperbelt constituencies after the restructuring of Zambia’s mining economy. Copperbelt-born husbands are more likely to be in cross-block marriages even after accounting for local marriage markets and standard observables. The results suggest that institutionally dense settings can leave social traces that remain visible after geographic mobility and institutional change.'
		}
	];

	const inProgressPapers = [
		{
			title: 'Polarized Climate Policy',
			url: 'https://github.com/eigenstuffs/thesis/blob/main/dec%206%20version.pdf',
			linkLabel: 'View Draft',
			coauthors: [],
			abstract:
				'Climate policy is a result of the distributive conflict between fossil fuel incumbents and clean energy interests. Consequently, the climate policies that most immediately threaten fossil fuels are the most polarized. I test this theory empirically using state legislature data from 1998 to 2020.'
		},
		{
			title: 'Measuring Local Wealth in the Philippines',
			url: 'https://osf.io/95jva',
			linkLabel: 'View on OSF',
			coauthors: [],
			abstract:
				'Existing small area estimates of poverty suffer from three main issues: (1) they are typically incomparable over time, (2) their validity is conditional on accurate income reporting, and (3) estimates outside of census years fail to update data. Using the case of the Philippines, I exploit comparable household surveys to estimate local wealth from 1985 to 2010.'
		}
	];

	const sections = [
		{ label: 'Working Papers', papers: workingPapers },
		{ label: 'In Progress', papers: inProgressPapers }
	];
</script>

<Seo
	title="Research"
	description="Working papers and projects in progress on political economy, climate policy, and development."
/>

<h1 class="page-title">Research</h1>

{#each sections as section (section.label)}
	<section class="panel">
		<h2 class="section-label">{section.label}</h2>
		<div class="entries">
			{#each section.papers as paper (paper.title)}
				<article class="entry">
					<h3 class="item-title">{paper.title}</h3>
					{#if paper.coauthors.length > 0}
						<p class="byline">with {paper.coauthors.join(', ')}</p>
					{/if}
					<p class="abstract">{paper.abstract}</p>
					{#if paper.url}
						<p class="actions">
							<a href={paper.url} target="_blank" rel="noopener noreferrer" class="doc-link">
								{paper.linkLabel}
							</a>
						</p>
					{/if}
				</article>
			{/each}
		</div>
	</section>
{/each}

<style>
	.panel + .panel {
		margin-top: var(--sp-7);
		padding-top: var(--sp-6);
		border-top: 1px solid var(--border);
	}

	.entries {
		display: flex;
		flex-direction: column;
		gap: var(--sp-6);
	}

	.byline {
		font-family: var(--font-ui);
		font-size: var(--fs-sm);
		color: var(--dim);
		margin: 0 0 var(--sp-2);
	}

	.abstract {
		margin: var(--sp-2) 0 0;
		color: var(--text);
	}

	.actions {
		margin: var(--sp-3) 0 0;
	}

	.doc-link {
		font-family: var(--font-ui);
		font-size: var(--fs-sm);
		text-decoration: none;
		padding-bottom: 2px;
		border-bottom: 1px solid var(--underline);
		transition: border-color 0.15s ease;
	}

	.doc-link:hover {
		border-bottom-color: var(--underline-hover);
	}

	@media (prefers-reduced-motion: reduce) {
		.doc-link {
			transition: none;
		}
	}
</style>
