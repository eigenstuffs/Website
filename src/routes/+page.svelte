<script>
	const pageLinks = [
		{ label: 'CV', href: '/cv' },
		{ label: 'Research', href: '/research' },
		{ label: 'Writings', href: '/writings' },
		{ label: 'Games', href: '/games' }
	];

	const socialLinks = [
		{ label: 'Email', href: 'mailto:bohrnsen@umich.edu' },
		{ label: 'Bluesky', href: 'https://bsky.app/profile/branden.zip' },
		{ label: 'X', href: 'https://x.com/eigenstuffs' },
		{ label: 'GitHub', href: 'https://github.com/eigenstuffs' }
	];
</script>

<svelte:head>
	<title>Branden Bohrnsen</title>
	<meta
		name="description"
		content="PhD student in Public Policy & Political Science at the University of Michigan, studying political economy and the energy transition."
	/>
</svelte:head>

<div class="home">
	<h1>Branden Bohrnsen</h1>

	<div class="bio">
		<p>I'm interested in political economy and the energy transition.</p>
		<p>
			I'm a PhD student in Public Policy &amp; Political Science at Michigan's
			<a href="https://fordschool.umich.edu/" target="_blank" rel="noopener noreferrer">Ford School</a>.
			I study how voters, firms, and governments bargain over disruptive infrastructure.
		</p>
		<p>
			I'm affiliated with the Climate Politics Lab at Michigan and
			<a href="https://freesystems.substack.com/" target="_blank" rel="noopener noreferrer">Free Systems</a>
			at Stanford GSB.
		</p>
	</div>

	<nav class="home-links" aria-label="Site and social links">
		{#each pageLinks as link}
			<a href={link.href}>{link.label}</a>
		{/each}
		<span class="sep" aria-hidden="true">·</span>
		{#each socialLinks as link}
			<a
				href={link.href}
				target={link.href.startsWith('mailto:') ? undefined : '_blank'}
				rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
			>
				{link.label}
			</a>
		{/each}
	</nav>
</div>

<style>
	.home {
		padding-top: 0.25rem;
	}

	h1 {
		font-size: 1.125rem;
		font-weight: 500;
		color: var(--text);
		margin: 0 0 1.35rem;
		letter-spacing: -0.015em;
	}

	.bio {
		display: flex;
		flex-direction: column;
		gap: 1.15rem;
	}

	.bio p {
		margin: 0;
		color: var(--text);
	}

	.home-links {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.65rem 0.9rem;
		margin-top: 1.85rem;
	}

	.home-links a {
		font-size: 0.9rem;
		color: var(--dim);
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-color: #d4d4d8;
	}

	.home-links a:hover {
		color: var(--text);
		text-decoration-color: #a1a1aa;
	}

	.sep {
		color: #d4d4d8;
		font-size: 0.85rem;
		user-select: none;
	}
</style>
