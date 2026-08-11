<div class="cv-page">
	<h1 class="page-title">Curriculum Vitae</h1>

	<a href="/branden_bohrnsen_cv.pdf" download class="download-btn">Download PDF ↓</a>

	<div class="pdf-frame">
		<iframe
			src="/branden_bohrnsen_cv.pdf"
			title="CV PDF Viewer"
			aria-label="Embedded PDF of Curriculum Vitae"
		></iframe>
		<p class="fallback">
			Your browser doesn't support embedded PDFs.
			<a href="/branden_bohrnsen_cv.pdf" download>Download the CV directly</a>.
		</p>
	</div>
</div>

<style>
	.cv-page {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.download-btn {
		display: inline-block;
		align-self: flex-start;
		font-size: 0.9rem;
		color: var(--text);
		margin-bottom: 1.25rem;
		text-underline-offset: 2px;
		text-decoration-color: #d4d4d8;
	}

	.download-btn:hover {
		text-decoration-color: #a1a1aa;
	}

	.pdf-frame {
		flex-grow: 1;
		display: flex;
		overflow: hidden;
		border-top: 1px solid var(--border);
	}

	iframe {
		flex-grow: 1;
		border: none;
		width: 100%;
		height: 100%;
		min-height: 75vh;
	}

	.fallback {
		display: none;
		text-align: center;
		padding: 1.5rem;
		font-size: 0.9rem;
	}
</style>
