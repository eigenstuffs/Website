<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  const menuItems = [
    { path: '/', name: 'Home' },
    { path: '/research', name: 'Research' },
    { path: '/blog', name: 'Blog' },
    { path: '/contact', name: 'Contact' },
  ];

  let selectedIndex = menuItems.findIndex(item => item.path === $page.url.pathname);
  if (selectedIndex === -1) selectedIndex = 0;

  function handleKeydown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedIndex = (selectedIndex + 1) % menuItems.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
    } else if (event.key === 'Enter') {
      event.preventDefault();
      goto(menuItems[selectedIndex].path);
    }
  }

  onMount(() => {
    if (browser) {
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
        <span class="heart" style="color: {selectedIndex === index ? 'var(--heart-color)' : 'transparent'};">❤</span>
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
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: left;
  }

  li {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
  }

  .heart {
    margin-right: 1rem;
    width: 1em; 
  }
</style>