<script>
  const pdfUrl = '/branden_bohrnsen_cv.pdf';
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0d0d0d;
    color: #ffffff;
    height: 100vh;
    flex-direction: column; /* Ensures vertical stacking of elements */
  }

  .pdf-container {
    width: 80%;
    height: 80%; /* Adjusted height for better spacing */
    border: 1px solid #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin-bottom: 1rem; /* Adds spacing below the PDF container */
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 10px;
  }

  button {
    background-color: #1f2937;
    color: #ffffff;
    border: 1px solid #374151;
    border-radius: 5px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
  }

  button:hover {
    background-color: #374151;
  }

  footer {
    position: absolute;
    bottom: 1rem;
    font-size: 0.8rem;
    color: #6b7280;
  }
</style>

<div class="pdf-container">
    <iframe src={pdfUrl} title="CV"></iframe>
</div>

<div class="button-row">
  <button on:click={() => (window.location.href = '/')}>Home</button>
</div>

