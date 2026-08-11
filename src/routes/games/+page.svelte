<script>
	const games = [
		{
			title: "Don't Break the Bicycle",
			href: 'https://dubiousduck.itch.io/dont-break-the-bicycle',
			cover: 'https://img.itch.zone/aW1nLzE4NjQyNTM3LnBuZw==/360x286%23c/W52DIM.png',
			description: 'A collaboration with Oscar Su created over 72 hours for ACM Studio.'
		},
		{
			title: 'Villainess x Reborn',
			href: 'https://brandenmb.itch.io/villainess-x-reborn',
			cover: 'https://img.itch.zone/aW1nLzE3MDY5NDA2LnBuZw==/360x286%23c/0nOcPK.png',
			description: 'Team lead, programming & UI/UX. Over 1,400 downloads with a 5-star average rating.'
		},
		{
			title: 'Social Interaction Simulator',
			href: 'https://brandenmb.itch.io/social-interaction-simulator',
			cover: 'https://img.itch.zone/aW1nLzgyMTM5NTYucG5n/360x286%23c/8z88tI.png',
			description: 'A stressful typing game about day-to-day life.'
		},
		{
			title: 'game with squares',
			href: 'https://brandenmb.itch.io/gamewithsquares',
			cover: 'https://img.itch.zone/aW1nLzExNTY4NjI2LnBuZw==/360x286%23c/b79nIg.png',
			description: 'A minimalistic platformer made in 72 hours.'
		}
	];
</script>

<div class="games-page">
	<h1 class="page-title">Games</h1>

	<div class="games-list">
		{#each games as game (game.title)}
			<article class="game-entry">
				<a href={game.href} target="_blank" rel="noopener noreferrer" class="cover-link">
					<img src={game.cover} alt="" class="cover" loading="lazy" width="360" height="286" />
				</a>
				<h2>
					<a href={game.href} target="_blank" rel="noopener noreferrer">{game.title}</a>
				</h2>
				<p class="game-desc">{game.description}</p>
			</article>
		{/each}
	</div>
</div>

<style>
	.games-list {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.game-entry + .game-entry {
		padding-top: 2rem;
		border-top: 1px solid var(--border);
	}

	.cover-link {
		display: block;
		margin-bottom: 0.75rem;
		text-decoration: none;
	}

	.cover {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 360 / 286;
		object-fit: cover;
		background: var(--border);
	}

	h2 {
		font-size: 1rem;
		font-weight: 500;
		margin: 0 0 0.35rem;
		line-height: 1.3;
	}

	h2 a {
		color: var(--text);
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-color: #d4d4d8;
	}

	h2 a:hover {
		text-decoration-color: #a1a1aa;
	}

	.game-desc {
		font-size: 0.9rem;
		line-height: 1.55;
		margin: 0;
		color: var(--dim);
	}
</style>
