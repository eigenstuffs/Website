<script>
  import Nav from '$lib/components/Nav.svelte';
  import '../app.css';
</script>

<div class="layout-container">
  <main class="main-content">
    <slot />
  </main>
  <Nav />
</div>
