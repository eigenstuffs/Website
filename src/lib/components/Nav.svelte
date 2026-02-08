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

  function handleKeydown(/** @type {KeyboardEvent} */ event) {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      selectedIndex = (selectedIndex + 1) % menuItems.length;
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
    } else if (event.key === 'Enter') {
      event.preventDefault();
      goto(menuItems[selectedIndex].path);
    }
  }

  function handleSelect(/** @type {number} */ index) {
    selectedIndex = index;
    goto(menuItems[index].path);
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
        <a
          href={item.path}
          class:selected={selectedIndex === index}
          on:click|preventDefault={() => handleSelect(index)}
          on:touchstart|preventDefault={() => handleSelect(index)}
        >
          {item.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 2rem;
    justify-content: center;
  }

  a {
    color: var(--dim-color);
    text-decoration: none;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    transition: color 0.2s;
  }

  a:hover {
    color: var(--text-color);
  }

  a.selected {
    color: var(--selected-text-color);
  }
</style>
