<div class="page-container">
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
        You can <a href="/your_cv.pdf" download>download the CV directly</a> instead.
    </p>
  </div>


  <nav class="back-link">
    <a href="/">&larr; Back Home</a>
  </nav>
</div>

<style>
  /* --- Theme Variables (Should be globalized eventually) --- */
  :root {
    --bg-color: #000000;
    --text-color-main: #FFFFFF;
     --link-color: #FFFFFF; /* White links */
    --link-hover-color: #DDDDDD; /* Grey hover */
    --font-family-typewriter: 'Courier Prime', monospace;
  }

  .page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Ensure container takes full height */
    background-color: var(--bg-color);
    color: var(--text-color-main);
    font-family: var(--font-family-typewriter);
    padding: 1rem 0.5rem; /* Reduced padding slightly for edge-to-edge feel */
    margin: 0 auto;
    box-sizing: border-box; /* Include padding in height calc */
  }

  h1 {
    font-size: 1.8rem; /* Smaller title */
    text-align: center;
    color: var(--text-color-main);
    margin-bottom: 1rem; /* Space below title */
    flex-shrink: 0; /* Prevent title from shrinking */
  }

  .pdf-embed {
      flex-grow: 1; /* Allow embed area to fill available space */
      display: flex; /* Use flex for iframe stretching */
      flex-direction: column; /* Stack iframe and fallback */
      margin-bottom: 1rem; /* Space before back link */
      min-height: 0; /* Necessary for flex-grow in some browsers */
      overflow: hidden; /* Prevent potential overflow */
  }

  iframe {
    flex-grow: 1; /* Make iframe fill the embed container */
    border: none; /* Remove iframe border */
    width: 100%; /* Full width */
    height: 100%; /* Full height of parent */
    min-height: 500px; /* Ensure a minimum decent height */
  }

  /* Basic styling for PDF viewers that might not support dark mode */
   iframe body {
       background-color: #555; /* Example, may not always work */
   }

  /* Hide fallback if iframe loads (simplistic approach) */
  /* A more robust solution might involve JS checking */
   iframe:not([src="about:blank"]) + .fallback {
       display: none;
   }

  .fallback {
      display: none; /* Initially hidden, shown by browser if iframe fails */
      text-align: center;
      padding: 1rem;
      font-size: 0.9rem;
  }

 .fallback a {
      color: var(--link-color);
   }
    .fallback a:hover {
      color: var(--link-hover-color);
   }


  .back-link {
    text-align: center;
    flex-shrink: 0; /* Prevent link from shrinking */
    padding-bottom: 0.5rem; /* Space at bottom */
  }

  .back-link a {
      color: var(--link-color);
      text-decoration: none;
      font-size: 0.9rem;
   }

   .back-link a:hover {
      color: var(--link-hover-color);
      text-decoration: underline;
   }

  /* --- Google Font Import (Reminder) --- */
  /* @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap'); */

</style>