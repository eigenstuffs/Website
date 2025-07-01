<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  const menuItems = [
    { path: '/', name: 'Home' },
    { path: '/cv', name: 'CV' },
    { path: '/research', name: 'Research' },
    { path: '/games', name: 'Games' },
  ];

  let selectedIndex = menuItems.findIndex(item => item.path === $page.url.pathname);
  if (selectedIndex === -1) selectedIndex = 0;

  let moveSound;
  let selectSound;

  function playSound(sound) {
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

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

  function handleSelect(index) {
    selectedIndex = index;
    playSound(selectSound);
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
        <a href={item.path} class:selected={selectedIndex === index} on:click={() => handleSelect(index)} on:touchstart|preventDefault={() => handleSelect(index)}>
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
 
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
 
  .heart {
    margin-bottom: 0.5rem;
    height: 1em;
  }
</style>