<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  // Updated menu items for the horizontal layout
  const menuItems = [
    { path: '/', name: 'Home' },
    { path: '/cv', name: 'CV' },
    { path: '/research', name: 'Research' },
    { path: '/games', name: 'Games' },
  ];

  let selectedIndex = menuItems.findIndex(item => item.path === $page.url.pathname);
  if (selectedIndex === -1) selectedIndex = 0;

  // Sound effects remain the same
  let moveSound;
  let selectSound;

  function playSound(sound) {
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  // Updated keydown handler for left/right navigation
  function handleKeydown(event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      selectedIndex = (selectedIndex + 1) % menuItems.length;
      playSound(moveSound);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
      playSound(moveSound);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      playSound(selectSound);
      goto(menuItems[selectedIndex].path);
    }
  }

  onMount(() => {
    if (browser) {
      moveSound = new Audio('/sounds/snd_menumove_ch1.wav');
      selectSound = new Audio('/sounds/snd_select_ch1.wav');
      window.addEventListener('keydown', handleKeydown);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('keydown', handleKeydown);
    }
  });
</script>

<nav>
  <ul>
    {#each menuItems as item, index}
      <li>
        <span class="heart" style="visibility: {selectedIndex === index ? 'visible' : 'hidden'};">❤</span>
        <a href={item.path} class:selected={selectedIndex === index}>
          {item.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    display: inline-block;
    margin-top: 2rem;
  }
  
  /* Make the list horizontal */
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex; /* Key change for horizontal layout */
    gap: 2rem; /* Space between menu items */
    align-items: center; /* Vertically align items */
  }

  li {
    display: flex;
    flex-direction: column; /* Stack heart on top of the link */
    align-items: center;
  }
  
  /* Adjust heart positioning */
  .heart {
    margin-bottom: 0.5rem;
    height: 1em; /* Ensure it takes up space even when hidden */
  }
</style>
