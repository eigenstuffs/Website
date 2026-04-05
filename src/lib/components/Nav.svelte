<script>
  import { page } from '$app/stores';

  const navItems = [
    { path: '/cv', name: 'cv' },
    { path: '/research', name: 'research' },
    { path: '/games', name: 'games' },
  ];

  let mobileOpen = false;

  function closeMobile() {
    mobileOpen = false;
  }
</script>

<nav>
  <div class="nav-inner">
    <a href="/" class="nav-brand" on:click={closeMobile}>branden.zip</a>

    <button
      class="mobile-toggle"
      on:click={() => (mobileOpen = !mobileOpen)}
      aria-label="Toggle navigation"
      aria-expanded={mobileOpen}
    >
      {#if mobileOpen}✕{:else}≡{/if}
    </button>

    <ul class:open={mobileOpen}>
      {#each navItems as item}
        <li>
          <a
            href={item.path}
            class:active={$page.url.pathname.startsWith(item.path)}
            on:click={closeMobile}
          >
            {item.name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style>
  nav {
    border-bottom: 2px solid var(--border);
    background: var(--bg);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-inner {
    max-width: 44rem;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-brand {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--text-heading);
    text-decoration: none;
    letter-spacing: -0.01em;
  }

  .nav-brand:hover {
    color: var(--accent);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 1.75rem;
    align-items: center;
  }

  li a {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    color: var(--dim);
    text-decoration: none;
    padding-bottom: 2px;
    border-bottom: 3px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }

  li a:hover {
    color: var(--text);
  }

  li a.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  .mobile-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text);
    cursor: pointer;
    padding: 0;
    line-height: 1;
    font-family: var(--font-mono);
  }

  @media (max-width: 600px) {
    .nav-inner {
      padding: 0.75rem 1rem;
      flex-wrap: wrap;
    }

    .mobile-toggle {
      display: block;
    }

    ul {
      display: none;
      width: 100%;
      flex-direction: column;
      gap: 0;
      padding-top: 0.75rem;
    }

    ul.open {
      display: flex;
    }

    li a {
      display: block;
      padding: 0.5rem 0;
      border-bottom: none;
    }

    li a.active {
      border-bottom: none;
      font-weight: 500;
    }
  }
</style>
