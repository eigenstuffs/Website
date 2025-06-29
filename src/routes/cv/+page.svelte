<script>
</script>

<div class="cv-page-content">
  <h1>Curriculum Vitae</h1>

  <div class="pdf-embed">
    <iframe
      src="/branden_bohrnsen_cv.pdf"
      type="application/pdf"
      title="CV PDF Viewer"
      aria-label="Embedded PDF of Curriculum Vitae">
    </iframe>
    <p class="fallback">
        It appears your browser doesn't support embedding PDFs directly.
        You can <a href="/branden_bohrnsen_cv.pdf" download>download the CV directly</a> instead.
    </p>
  </div>
</div>

<style>
  .cv-page-content {
    flex-grow: 1; 
    display: flex;
    flex-direction: column;
    width: 90vw;
    max-width: 1100px;
  }

  h1 {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 1rem;
    flex-shrink: 0;
  }

  .pdf-embed {
    flex-grow: 1; 
    display: flex;
    min-height: 0; 
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
    padding: 1rem;
    font-size: 0.9rem;
  }

  .fallback a {
    color: var(--link-color);
    text-decoration: underline;
  }
</style>
