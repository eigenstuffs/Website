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
	<a href="/" class="nav-brand" class:active={$page.url.pathname === '/'}>branden.zip</a>
	<ul>
		{#each navItems as item}
			<li>
				<a
					href={item.path}
					class:active={$page.url.pathname.startsWith(item.path)}
				>
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
		gap: 1rem;
		padding: 0.75rem 0 0.25rem;
		position: relative;
		z-index: 2;
	}

	.nav-brand {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--text);
		text-decoration: none;
	}

	.nav-brand:hover {
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-color: #a1a1aa;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
		justify-content: flex-end;
	}

	li a {
		font-size: 0.9rem;
		font-weight: 400;
		color: var(--dim);
		text-decoration: none;
	}

	li a:hover {
		color: var(--text);
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-color: #a1a1aa;
	}

	li a.active,
	.nav-brand.active {
		color: var(--text);
	}

	@media (max-width: 480px) {
		nav {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		ul {
			justify-content: flex-start;
			gap: 0.75rem;
		}
	}
</style>
