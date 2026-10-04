<script>
	import Seo from '$lib/components/Seo.svelte';
	import { marked } from 'marked';
	import source from '$lib/readme.md?raw';

	// Links that leave the site open in a new tab.
	const html = marked
		.parse(source, { async: false })
		.replaceAll('<a href="http', '<a target="_blank" rel="noopener noreferrer" href="http');
</script>

<Seo title="README" description="More about Branden Bohrnsen: games, music, AI, and climate politics." />

<h1 class="page-title">README</h1>

<div class="readme">
	{@html html}
</div>

<style>
	.readme :global(p + p) {
		margin-top: var(--sp-4);
	}
</style>
