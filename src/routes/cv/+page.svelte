<script>
	import Seo from '$lib/components/Seo.svelte';

	const pdf = '/branden_bohrnsen_cv.pdf';
</script>

<Seo title="CV" description="Curriculum vitae for Branden Bohrnsen." />

<div class="cv-page">
	<header>
		<h1 class="page-title">Curriculum vitae</h1>
		<p class="meta"><a href={pdf} download>Download PDF</a></p>
	</header>

	<iframe src={pdf} title="Curriculum vitae"></iframe>

	<p class="meta fallback">If the PDF doesn’t display, <a href={pdf} download>download it</a>.</p>
</div>

<style>
	.cv-page {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	header {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--sp-3);
		margin-bottom: var(--sp-4);
	}

	header .page-title {
		margin: 0;
	}

	iframe {
		width: 100%;
		min-height: 78vh;
		border: 1px solid var(--border);
		background: var(--surface);
	}

	.fallback {
		margin-top: var(--sp-3);
	}
</style>
