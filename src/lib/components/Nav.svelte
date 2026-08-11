<script>
	import { page } from '$app/stores';

	const navItems = [
		{ path: '/cv', name: 'CV' },
		{ path: '/research', name: 'Research' },
		{ path: '/writings', name: 'Writings' },
		{ path: '/games', name: 'Games' }
	];
</script>

<nav aria-label="Primary">
	<a href="/" class="nav-brand">branden.zip</a>
	<ul>
		{#each navItems as item}
			{@const active = $page.url.pathname.startsWith(item.path)}
			<li>
				<a href={item.path} class:active aria-current={active ? 'page' : undefined}>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--sp-4);
		padding: var(--sp-3) 0 var(--sp-2);
		position: relative;
		z-index: 2;
		font-family: var(--font-ui);
	}

	.nav-brand {
		font-size: 0.9375rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--text-heading);
		text-decoration: none;
	}

	.nav-brand:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-color: var(--underline-hover);
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-4);
		justify-content: flex-end;
	}

	li a {
		font-size: var(--fs-sm);
		color: var(--dim);
		text-decoration: none;
		padding-bottom: 2px;
		border-bottom: 1px solid transparent;
		transition:
			color 0.15s ease,
			border-color 0.15s ease;
	}

	li a:hover {
		color: var(--text);
		border-bottom-color: var(--underline-hover);
	}

	li a.active {
		color: var(--text);
		border-bottom-color: var(--text);
	}

	@media (max-width: 480px) {
		nav {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--sp-2);
		}

		ul {
			justify-content: flex-start;
			gap: var(--sp-3);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		li a {
			transition: none;
		}
	}
</style>
