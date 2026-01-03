<script>
  import Nav from '$lib/components/Nav.svelte';
  import '../app.css';
  import { onMount } from 'svelte';

  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>Branden Bohrnsen</title>
  <meta name="description" content="Branden Bohrnsen is a PhD candidate in Political Science and Public Policy at the University of Michigan, researching political economy and political behavior." />
</svelte:head>

<div class="layout" class:mounted>
  <Nav />
  <main>
    <slot />
  </main>
</div>

<style>
  .layout {
    min-height: 100vh;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .layout.mounted {
    opacity: 1;
  }

  main {
    padding-top: var(--nav-height);
  }
</style>