<script>
	import Seo from '$lib/components/Seo.svelte';

	const games = [
		{
			title: 'Don’t Break the Bicycle',
			href: 'https://dubiousduck.itch.io/dont-break-the-bicycle',
			cover: '/covers/dont-break-the-bicycle.webp',
			description: 'A collaboration with Oscar Su created over 72 hours for ACM Studio.'
		},
		{
			title: 'Villainess x Reborn',
			href: 'https://brandenmb.itch.io/villainess-x-reborn',
			cover: '/covers/villainess-x-reborn.webp',
			description: 'Team lead, programming & UI/UX. Over 1,400 downloads with a 5-star average rating.'
		},
		{
			title: 'Social Interaction Simulator',
			href: 'https://brandenmb.itch.io/social-interaction-simulator',
			cover: '/covers/social-interaction-simulator.webp',
			description: 'A stressful typing game about day-to-day life.'
		},
		{
			title: 'game with squares',
			href: 'https://brandenmb.itch.io/gamewithsquares',
			cover: '/covers/game-with-squares.webp',
			description: 'A minimalistic platformer made in 72 hours.'
		}
	];
</script>

<Seo title="Games" description="Games made for game jams and student studios, published on itch.io." />

<h1 class="page-title">Games</h1>

<ul class="games-list">
	{#each games as game, i (game.title)}
		<li class="game-entry">
			<a class="cover-link" href={game.href} target="_blank" rel="noopener noreferrer" tabindex="-1"
				aria-hidden="true"
			>
				<img
					src={game.cover}
					alt=""
					class="cover"
					loading={i < 2 ? 'eager' : 'lazy'}
					decoding="async"
					width="1120"
					height="890"
				/>
			</a>
			<h2 class="item-title">
				<a href={game.href} target="_blank" rel="noopener noreferrer">{game.title}</a>
			</h2>
			<p class="meta">{game.description}</p>
		</li>
	{/each}
</ul>

<style>
	.games-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--sp-7) var(--sp-5);
	}

	.cover-link {
		display: block;
		margin-bottom: var(--sp-3);
		text-decoration: none;
		border-radius: 4px;
		overflow: hidden;
		/* A hairline keeps light-edged covers from bleeding into the page. */
		box-shadow: 0 0 0 1px var(--border) inset;
	}

	.cover {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 1120 / 890;
		object-fit: cover;
		background: var(--border);
		transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.3, 1);
	}

	.game-entry:hover .cover {
		transform: scale(1.02);
	}

	.item-title a {
		color: var(--text-heading);
	}

	@media (max-width: 640px) {
		.games-list {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--sp-6);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cover {
			transition: none;
		}

		.game-entry:hover .cover {
			transform: none;
		}
	}
</style>
