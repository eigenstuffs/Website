<script>
	import ProceduralSky from '$lib/components/ProceduralSky.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import { page } from '$app/stores';
	import '../app.css';

	/** Pages that need more than the prose measure. */
	const widePaths = ['/games', '/cv'];

	$: isHome = $page.url.pathname === '/';
	$: isWide = widePaths.some((p) => $page.url.pathname.startsWith(p));
</script>

<a class="skip-link" href="#main">Skip to content</a>

<ProceduralSky />

<div class="layout-container" class:wide={isWide}>
	{#if !isHome}
		<Nav />
	{/if}

	<main id="main" class="main-content" class:home-main={isHome}>
		<slot />
	</main>

	<footer class="site-footer">
		<span>© {new Date().getFullYear()} Branden Bohrnsen</span>
		<span class="sep" aria-hidden="true">·</span>
		<a href="mailto:bohrnsen@umich.edu">bohrnsen@umich.edu</a>
	</footer>
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
		border-radius: 4px;
		font-family: var(--font-ui);
		font-size: var(--fs-sm);
		text-decoration: none;
	}

	.skip-link:focus {
		left: var(--sp-3);
		top: var(--sp-3);
	}

	.layout-container :global(.main-content.home-main) {
		padding-top: var(--sp-2);
	}

	.site-footer {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0 var(--sp-2);
		font-family: var(--font-ui);
		font-size: var(--fs-sm);
		color: var(--dim);
		padding: var(--sp-5) 0 var(--sp-6);
		border-top: 1px solid var(--border);
	}

	.site-footer a {
		color: var(--dim);
	}

	.site-footer a:hover {
		color: var(--text);
	}

	.sep {
		color: var(--border-strong);
	}
</style>
