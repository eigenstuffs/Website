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
    flex-direction: column;
  }

  .pdf-container {
    width: 90%; /* Adjusted width for smaller screens */
    height: 70%; /* Adjusted height for better spacing on mobile */
    border: 1px solid #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 10px;
  }

  .button-row {
    display: flex;
    flex-wrap: wrap; /* Allows buttons to wrap on small screens */
    justify-content: center; /* Center align the buttons */
    gap: 0.5rem; /* Add space between buttons */
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

  button:active {
    transform: scale(0.95); /* Adds feedback for button clicks */
  }

  footer {
    position: absolute;
    bottom: 1rem;
    font-size: 0.8rem;
    color: #6b7280;
    text-align: center;
  }
</style>

<div class="pdf-container">
  <iframe src={pdfUrl} title="CV"></iframe>
</div>

<div class="button-row">
  <button onclick="window.location.href='/'">Home</button>
</div>

<footer>
  © 2024 Your Name. All rights reserved.
</footer>
