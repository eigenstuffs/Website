<script>
  import { onMount } from 'svelte';

  let text = "Branden Bohrnsen";
  let displayText = "";
  const duration = 50; // Duration per letter in milliseconds

  onMount(async () => {
    for (let i = 0; i <= text.length; i++) {
      displayText = text.slice(0, i);
      await new Promise(resolve => setTimeout(resolve, duration));
    }
  });
</script>

<style>
  :global(body) {
    background-color: #0d0d0d;
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    overflow: hidden;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0.5rem 0;
    height: 3rem;
    white-space: nowrap;
    overflow: hidden;
    visibility: visible;
    text-align: center;
  }

  p {
    font-size: 1rem;
    text-align: left;
    max-width: 500px;
    line-height: 1.5;
    margin: 1rem 0;
    padding: 0 1rem;
  }
  
  @media (max-width: 768px) {
    p {
      max-width: 90%;
      font-size: 0.95rem;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    .button-row {
      flex-direction: column;
      width: 90%;
      max-width: 300px;
    }
    
    .icon-row {
      flex-wrap: wrap;
      max-width: 300px;
      justify-content: center;
    }
  }
  
  @media (max-width: 480px) {
    p {
      font-size: 0.9rem;
    }
    
    h1 {
      font-size: 1.75rem;
      height: auto;
    }
    
    button {
      width: 100%;
    }
    
    :global(body) {
      height: auto;
      min-height: 100vh;
      padding: 2rem 0;
    }
    
    footer {
      position: relative;
      margin-top: 2rem;
    }
  }

  .icon-row {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1rem 0;
  }

  .icon-link {
    color: #ffffff;
    fill: #ffffff;
    transition: transform 0.2s, fill 0.3s;
    width: 32px;
    height: 32px;
    }

    .icon-link:hover {
        transform: scale(1.2);
        fill: #ffffff;
    }

    .button-row {
        display: flex;
        gap: 1rem;
        margin: 1.5rem 0;
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
  
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px;
    padding: 0 1rem;
    box-sizing: border-box;
  }
</style>

<div class="main-container">
  <h1>{displayText}</h1>
  <div class="icon-row">
    <a href="https://bsky.app/profile/branden.zip" target="_blank" rel="noopener noreferrer">
      <svg class="icon-link" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path d="M23.931,5.298c-3.21,2.418-6.663,7.32-7.931,9.951-1.267-2.631-4.721-7.533-7.931-9.951-2.316-1.744-6.069-3.094-6.069,1.201,0,.857,.49,7.206,.778,8.237,.999,3.583,4.641,4.497,7.881,3.944-5.663,.967-7.103,4.169-3.992,7.372,5.908,6.083,8.492-1.526,9.154-3.476,.123-.36,.179-.527,.179-.379,0-.148,.057,.019,.179,.379,.662,1.949,3.245,9.558,9.154,3.476,3.111-3.203,1.671-6.405-3.992-7.372,3.24,.553,6.882-.361,7.881-3.944,.288-1.031,.778-7.38,.778-8.237,0-4.295-3.753-2.945-6.069-1.201Z"></path>
      </svg>
    </a>
    <a href="https://www.linkedin.com/in/brandenbohrnsen/" target="_blank" rel="noopener noreferrer">
      <svg class="icon-link" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z" fill-rule="evenodd"></path>
      </svg>
    </a>
    <a href="https://x.com/eigenstuffs" target="_blank" rel="noopener noreferrer">
      <svg class="icon-link" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"></path>
      </svg>
    </a>
    <a href="https://github.com/eigenstuffs" target="_blank" rel="noopener noreferrer">
      <svg class="icon-link" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path d="M16,2.345c7.735,0,14,6.265,14,14-.002,6.015-3.839,11.359-9.537,13.282-.7,.14-.963-.298-.963-.665,0-.473,.018-1.978,.018-3.85,0-1.312-.437-2.152-.945-2.59,3.115-.35,6.388-1.54,6.388-6.912,0-1.54-.543-2.783-1.435-3.762,.14-.35,.63-1.785-.14-3.71,0,0-1.173-.385-3.85,1.435-1.12-.315-2.31-.472-3.5-.472s-2.38,.157-3.5,.472c-2.677-1.802-3.85-1.435-3.85-1.435-.77,1.925-.28,3.36-.14,3.71-.892,.98-1.435,2.24-1.435,3.762,0,5.355,3.255,6.563,6.37,6.913-.403,.35-.77,.963-.893,1.872-.805,.368-2.818,.963-4.077-1.155-.263-.42-1.05-1.452-2.152-1.435-1.173,.018-.472,.665,.017,.927,.595,.332,1.277,1.575,1.435,1.978,.28,.787,1.19,2.293,4.707,1.645,0,1.173,.018,2.275,.018,2.607,0,.368-.263,.787-.963,.665-5.719-1.904-9.576-7.255-9.573-13.283,0-7.735,6.265-14,14-14Z"></path>
      </svg>
    </a>
    <a href="mailto:bohrnsen@umich.edu" target="_blank" rel="noopener noreferrer">
      <svg class="icon-link" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path d="M29.44,16.318c0-.993-.089-1.947-.255-2.864h-13.185v5.422h7.535c-.331,1.744-1.324,3.22-2.813,4.213v3.525h4.544c2.647-2.444,4.175-6.033,4.175-10.296Z" opacity=".4"></path><path d="M16,30c3.78,0,6.949-1.247,9.265-3.385l-4.544-3.525c-1.247,.84-2.838,1.349-4.722,1.349-3.64,0-6.733-2.456-7.84-5.765l-2.717,2.09-1.941,1.525c2.304,4.569,7.025,7.713,12.498,7.713Z"></path><path d="M8.16,18.66c-.28-.84-.445-1.731-.445-2.66s.165-1.82,.445-2.66v-3.615H3.502c-.955,1.884-1.502,4.009-1.502,6.275s.547,4.391,1.502,6.275h3.332s1.327-3.615,1.327-3.615Z" opacity=".4"></path><path d="M16,7.575c2.062,0,3.895,.713,5.358,2.087l4.009-4.009c-2.431-2.265-5.587-3.653-9.367-3.653-5.473,0-10.195,3.144-12.498,7.725l4.658,3.615c1.107-3.309,4.2-5.765,7.84-5.765Z"></path>
      </svg>
    </a>
  </div>
  <p>
    Welcome! My name is Branden and I'm a Public Policy & Political Science PhD student at the University of Michigan.<br><br>

    I am interested in political economy. My current research asks how voters, politicians, and economic elites engage in climate politics,
    with a regional focus on Southeast Asia.
    <br><br>

    Methodologically, I am interested in spatial data, text, and networks.<br><br>

    Prior to my PhD, I graduated from UCLA with Highest Honors in Political Science. Aside from research,
    I develop independent video games, which you can also find here.<br><br>

    You can find my recent work and CV below. Feel free to reach out at any time; my contact information is above. Enjoy your stay!
  </p>
  <div class="button-row">
    <button on:click={() => (window.location.href = '/research')}>Research</button>
    <button on:click={() => (window.location.href = '/cv')}>Academic CV</button>
    <button on:click={() => (window.location.href = '/games')}>Games</button>
  </div>
</div>

<footer>© {new Date().getFullYear()} Branden Bohrnsen</footer>