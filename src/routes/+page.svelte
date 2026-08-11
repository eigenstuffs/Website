<script>
	import Seo from '$lib/components/Seo.svelte';

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

<Seo
	description="PhD student in Public Policy & Political Science at the University of Michigan, studying political economy and the energy transition."
/>

<div class="home">
	<h1>Branden Bohrnsen</h1>

	<div class="bio">
		<p class="lede">I’m interested in political economy and the energy transition.</p>
		<p>
			I’m a PhD student in Public Policy &amp; Political Science at Michigan’s
			<a href="https://fordschool.umich.edu/" target="_blank" rel="noopener noreferrer">Ford School</a
			>. I study how voters, firms, and governments bargain over disruptive infrastructure.
		</p>
		<p>
			I’m affiliated with the Climate Politics Lab at Michigan and
			<a href="https://freesystems.substack.com/" target="_blank" rel="noopener noreferrer"
				>Free Systems</a
			> at Stanford GSB.
		</p>
	</div>

	<nav class="home-links" aria-label="Site and social links">
		<ul class="link-group">
			{#each pageLinks as link}
				<li><a href={link.href}>{link.label}</a></li>
			{/each}
		</ul>
		<span class="divider" aria-hidden="true"></span>
		<ul class="link-group">
			{#each socialLinks as link}
				<li>
					<a
						href={link.href}
						target={link.href.startsWith('mailto:') ? undefined : '_blank'}
						rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<style>
	.home {
		padding-top: var(--sp-1);
	}

	h1 {
		font-size: var(--fs-xl);
		font-weight: 600;
		line-height: 1.1;
		letter-spacing: -0.03em;
		margin: 0 0 var(--sp-5);
	}

	.bio {
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
		max-width: 32rem;
	}

	.lede {
		font-size: 1.1875rem;
		line-height: 1.55;
		color: var(--text);
	}

	.home-links {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--sp-2) var(--sp-4);
		margin-top: var(--sp-6);
		font-family: var(--font-ui);
	}

	.link-group {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--sp-2) var(--sp-4);
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.home-links a {
		font-size: var(--fs-sm);
		color: var(--dim);
		text-decoration: none;
		padding-bottom: 2px;
		border-bottom: 1px solid var(--underline);
		transition:
			color 0.15s ease,
			border-color 0.15s ease;
	}

	.home-links a:hover {
		color: var(--text);
		border-bottom-color: var(--underline-hover);
	}

	.divider {
		width: 1px;
		height: 0.85rem;
		background: var(--border-strong);
	}

	@media (max-width: 480px) {
		.divider {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.home-links a {
			transition: none;
		}
	}
</style>
