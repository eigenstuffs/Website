<script>
	import Seo from '$lib/components/Seo.svelte';
	import {
		email,
		officeHoursUrl,
		freeSystemsUrl,
		robloxEssayUrl,
		contactLinks,
		isExternal
	} from '$lib/content';
</script>

<Seo
	description="PhD student in Public Policy and Political Science at the University of Michigan, working on political economy and political behavior."
/>

<header>
	<h1>Branden Bohrnsen</h1>
	<ul class="contact">
		{#each contactLinks as link}
			{@const external = isExternal(link.href)}
			<li>
				<a
					href={link.href}
					target={external ? '_blank' : undefined}
					rel={external ? 'noopener noreferrer' : undefined}>{link.label}</a
				>
			</li>
		{/each}
	</ul>
</header>

<div class="bio">
	<p>
		Welcome! I’m a PhD student in Public Policy and Political Science at the University of
		Michigan, working on political economy and political behavior.
	</p>
	<p>
		I’m a PhD Fellow at the
		<a href={freeSystemsUrl} target="_blank" rel="noopener noreferrer">Free Systems Lab</a>, housed
		at Stanford GSB and the Hoover Institution, where I study agentic systems, AI governance, and
		digital economies. Here’s
		<a href={robloxEssayUrl} target="_blank" rel="noopener noreferrer">a piece</a> on how poor
		incentive design turned Roblox into a digital casino.
	</p>
	<p>
		You can learn more about me in my <a href="/readme">README</a> and <a href="/cv">CV</a>.
	</p>
	<p>
		You can sign up for office hours
		<a href={officeHoursUrl} target="_blank" rel="noopener noreferrer">here</a>
		(Thursdays 1–3pm).
	</p>
	<p>
		To echo many other people’s standing invitations: I love talking about research and learning
		from people, so please feel free to email: <a href="mailto:{email}">{email}</a>.
	</p>
	<p>Go Blue!</p>
</div>

<style>
	header {
		margin: var(--sp-7) 0 var(--sp-6);
	}

	h1 {
		font-size: var(--fs-name);
		line-height: 1.05;
		letter-spacing: -0.01em;
	}

	.contact {
		display: flex;
		flex-wrap: wrap;
		gap: 0 var(--sp-4);
		list-style: none;
		margin: var(--sp-3) 0 0;
		padding: 0;
		font-size: var(--fs-small);
	}

	.bio {
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
	}

	@media (max-width: 600px) {
		header {
			margin-top: var(--sp-5);
		}
	}
</style>
