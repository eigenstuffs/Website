<script>
	import Nav from '$lib/components/Nav.svelte';
	import { page } from '$app/stores';
	import '../app.css';

	/** Pages that need more than the prose measure. */
	const widePaths = ['/cv'];

	$: isHome = $page.url.pathname === '/';
	$: isWide = widePaths.some((p) => $page.url.pathname.startsWith(p));
</script>

<a class="skip-link" href="#main">Skip to content</a>

<div class="layout-container" class:wide={isWide}>
	{#if !isHome}
		<Nav />
	{/if}

	<main id="main" class="main-content">
		<slot />
	</main>

	<footer class="site-footer meta">© {new Date().getFullYear()} Branden Bohrnsen</footer>
</div>

<style>
	.skip-link {
		position: absolute;
		left: -9999px;
		top: 0;
		z-index: 10;
		padding: var(--sp-2) var(--sp-3);
		background: var(--surface);
		border: 1px solid var(--border-strong);
		font-size: var(--fs-small);
	}

	.skip-link:focus {
		left: var(--sp-3);
		top: var(--sp-3);
	}

	.site-footer {
		padding: var(--sp-5) 0 var(--sp-6);
		font-size: var(--fs-small);
	}
</style>
