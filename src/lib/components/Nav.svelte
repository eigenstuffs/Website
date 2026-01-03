<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  const menuItems = [
    { id: 'about', name: 'about' },
    { id: 'research', name: 'research' },
    { id: 'cv', name: 'cv' },
    { id: 'games', name: 'games' },
  ];

  let activeSection = 'about';
  let mounted = false;
  let scrolled = false;

  function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleScroll() {
    scrolled = window.scrollY > 20;
    
    const sections = menuItems.map(item => document.getElementById(item.id));
    const scrollPosition = window.scrollY + 120;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPosition) {
        activeSection = menuItems[i].id;
        break;
      }
    }
  }

  onMount(() => {
    mounted = true;
    if (browser) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', handleScroll);
    }
  });
</script>

<nav class="nav" class:mounted class:scrolled>
  <div class="nav-inner">
    <a href="#about" class="nav-logo" on:click|preventDefault={() => scrollToSection('about')}>
      bb
    </a>
    
    <ul class="nav-links">
      {#each menuItems as item}
        <li>
          <a 
            href="#{item.id}" 
            class="nav-link"
            class:active={activeSection === item.id}
            on:click|preventDefault={() => scrollToSection(item.id)}
          >
            {item.name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: var(--space-4) 0;
    background: var(--color-bg);
    transition: all var(--transition-base);
  }

  .nav.scrolled {
    border-bottom: 1px solid var(--color-border);
    padding: var(--space-3) 0;
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--space-6);
  }

  .nav-logo {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text);
    text-decoration: none;
  }

  .nav-logo:hover {
    color: var(--color-accent);
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: var(--space-4);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-link {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--color-text-muted);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .nav-link:hover {
    color: var(--color-text);
    text-decoration: none;
  }

  .nav-link.active {
    color: var(--color-text);
  }

  /* Animation */
  .nav {
    opacity: 0;
    transform: translateY(-8px);
  }

  .nav.mounted {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.4s ease, transform 0.4s ease, border 0.2s ease, padding 0.2s ease;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .nav-inner {
      padding: 0 var(--space-4);
    }

    .nav-links {
      gap: var(--space-3);
    }

    .nav-link {
      font-size: 0.75rem;
    }
  }
</style>