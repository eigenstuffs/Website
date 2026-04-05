<div class="cv-page">
  <h1 class="page-title">Curriculum Vitae</h1>

  <a href="/branden_bohrnsen_cv.pdf" download class="download-btn">
    Download PDF ↓
  </a>

  <div class="pdf-card">
    <iframe
      src="/branden_bohrnsen_cv.pdf"
      title="CV PDF Viewer"
      aria-label="Embedded PDF of Curriculum Vitae">
    </iframe>
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
    font-family: var(--font-mono);
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--accent);
    border-radius: 4px;
    color: var(--accent);
    margin-bottom: 1.5rem;
    transition: background 0.15s, color 0.15s;
  }

  .download-btn:hover {
    background: var(--accent);
    color: #fff;
  }

  .pdf-card {
    flex-grow: 1;
    display: flex;
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
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

  .fallback a {
    color: var(--accent);
    text-decoration: underline;
  }
</style>
