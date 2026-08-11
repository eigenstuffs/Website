<script>
	import ProceduralSky from '$lib/components/ProceduralSky.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { page } from '$app/stores';
	import '../app.css';

	$: isHome = $page.url.pathname === '/';
</script>

<ProceduralSky />
<div class="layout-container" class:home-layout={isHome}>
	{#if !isHome}
		<Nav />
	{/if}
	<main class="main-content" class:home-main={isHome}>
		<slot />
	</main>
	{#if !isHome}
		<footer class="site-footer">
			© {new Date().getFullYear()} Branden Bohrnsen ·
			<a href="mailto:bohrnsen@umich.edu">bohrnsen@umich.edu</a>
		</footer>
	{/if}
</div>

<style>
	.home-layout :global(.main-content.home-main) {
		padding-top: 0.5rem;
	}

	.site-footer {
		text-align: left;
		font-size: 0.78rem;
		color: var(--dim);
		padding: 0 0 2rem;
	}

	.site-footer a {
		color: var(--dim);
		text-decoration-color: #d4d4d8;
	}

	.site-footer a:hover {
		color: var(--text);
		text-decoration-color: #a1a1aa;
	}
</style>
