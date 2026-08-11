<script>
	import Seo from '$lib/components/Seo.svelte';

	const pdf = '/branden_bohrnsen_cv.pdf';
</script>

<Seo title="CV" description="Curriculum vitae for Branden Bohrnsen." />

<div class="cv-page">
	<header class="cv-header">
		<h1 class="page-title">Curriculum Vitae</h1>
		<a href={pdf} download class="download-btn">Download PDF ↓</a>
	</header>

	<div class="pdf-frame">
		<iframe src={pdf} title="Curriculum vitae" aria-label="Embedded PDF of curriculum vitae"
		></iframe>
	</div>

	<p class="fallback">
		If the document doesn’t load, <a href={pdf} download>download the CV directly</a>.
	</p>
</div>

<style>
	.cv-page {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.cv-header {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--sp-3);
	}

	.cv-header .page-title {
		margin-bottom: var(--sp-4);
	}

	.download-btn {
		font-family: var(--font-ui);
		font-size: var(--fs-sm);
		color: var(--text);
		text-decoration: none;
		padding-bottom: 2px;
		border-bottom: 1px solid var(--underline);
		transition: border-color 0.15s ease;
	}

	.download-btn:hover {
		border-bottom-color: var(--underline-hover);
	}

	.pdf-frame {
		display: flex;
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: 4px;
		background: var(--surface);
	}

	iframe {
		flex-grow: 1;
		border: none;
		width: 100%;
		min-height: 78vh;
	}

	.fallback {
		font-family: var(--font-ui);
		font-size: var(--fs-sm);
		color: var(--dim);
		margin: var(--sp-3) 0 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.download-btn {
			transition: none;
		}
	}
</style>
