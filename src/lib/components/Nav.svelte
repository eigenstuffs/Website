<script>
	import { page } from '$app/stores';

	const navItems = [
		{ path: '/readme', name: 'README' },
		{ path: '/cv', name: 'CV' }
	];
</script>

<nav aria-label="Primary">
	<a href="/" class="nav-brand">Branden Bohrnsen</a>
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
		font-size: var(--fs-small);
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--sp-2) var(--sp-4);
		padding: var(--sp-6) 0 0;
	}

	.nav-brand {
		color: var(--text);
		font-weight: 500;
		text-decoration: none;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-2) var(--sp-4);
	}

	ul a {
		color: var(--dim);
		text-decoration: none;
	}

	ul a.active {
		color: var(--text);
	}
</style>
