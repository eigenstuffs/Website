<script>
	import Seo from '$lib/components/Seo.svelte';

	const date = '2025-05-02';
	const formatted = new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<Seo
	title="Reflections on Applying to Graduate School"
	description="Notes from a political science PhD admissions cycle: what helped, what I would do differently, and what the GRE actually costs you."
	type="article"
/>

<div class="article-page">
	<article>
		<header class="post-header">
			<h1>Reflections on Applying to Graduate School</h1>
			<time class="post-date" datetime={date}>{formatted}</time>
		</header>

		<div class="post-content">
			<p>
				Hello! Welcome to my blog. I don’t intend on making this a super frequent thing, but it
				might be fun to document any thoughts that could be useful for others. Today, I wanted to
				reflect on my PhD admissions cycle. Remember, this is inspired by my own experience, which
				you should not treat as gospel. Nonetheless, I hope it can be useful!
			</p>
			<p>
				First, a summary of my cycle. I applied to nine PhD programs. I was accepted to UCLA, NYU,
				and Michigan. I was waitlisted at Harvard and UPenn, before both were cut prematurely due to
				the Trump Administration funding cuts. I was interviewed at Berkeley, but was ultimately
				rejected, alongside Stanford, Princeton, and UChicago. Overall, 3 for 9, and 2.5 consolation
				prizes. Not bad!
			</p>
			<p>
				I ultimately committed to Michigan, which I am thrilled about. I will be the only student to
				matriculate at the Ford School to study the joint PhD in Public Policy and Political Science
				(shoutouts to Helen, the sole other admittee). In my (biased) opinion, it’s the best
				department in the world to study climate politics and Southeast Asia.
			</p>
			<p>
				I’ll first outline what I perceive my own strengths to be. I’m fortunate to have worked with
				several established faculty, who I’m grateful were in my corner and were happy to write my
				letters. I have no doubt that the connections I made at UCLA were critical in my eventual
				acceptances. I highly encourage undergraduates to seek out research opportunities, even if
				unpaid, because the mentorship and training you will receive is priceless.
			</p>
			<p>
				Following this, I suggest that undergraduates take PhD courses whenever possible. In my two
				years at UCLA, I took the first-year series in quantitative methods, which made for a
				stronger writing sample and a great quantitative signal on my transcript. It doesn’t matter
				if you are the only undergraduate, which I was, you can probably just ask for an enrollment
				code and you’ll probably get one. You’ll likely have more luck in methods courses than
				substantive cores. The classes are genuinely very interesting!
			</p>
			<p>
				There are several things I could have improved about my application. The first, and most
				consequential, was the GRE. Please, please do not underestimate the GRE. I have a very
				strong background in coding, but my pure math training is weak, and if you are in a similar
				spot, you will need months of studying to score competitively on the quant section. Most
				political science programs require the GRE and, according to anecdotes, will select on this
				heavily early in the review process. Try Gregmat for both quant and verbal, which I credit
				with moving from a 159Q to 164Q in about a month.
			</p>
			<p>
				Next, make sure you understand program-specific material requirements. For instance, keep
				track of writing sample page limits, and what the personal statement is actually asking for.
				I made a terrible mistake of not realizing Princeton’s personal statement was thematically
				different than other schools until the application deadline, and it certainly showed. Make
				sure you’ve looked at every page of the form and keep this information handy!
			</p>
		</div>
	</article>

	<footer class="footer-nav">
		<a href="/blog">← Back to posts</a>
	</footer>
</div>

<style>
	.article-page {
		width: 100%;
	}

	.post-header {
		margin-bottom: var(--sp-6);
		padding-bottom: var(--sp-4);
		border-bottom: 1px solid var(--border);
	}

	h1 {
		font-size: var(--fs-lg);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.2;
		margin: 0 0 var(--sp-2);
	}

	.post-date {
		font-family: var(--font-ui);
		font-size: var(--fs-sm);
		color: var(--dim);
	}

	.post-content {
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
	}

	.post-content p {
		margin: 0;
	}

	.footer-nav {
		margin-top: var(--sp-7);
		padding-top: var(--sp-4);
		border-top: 1px solid var(--border);
	}

	.footer-nav a {
		font-family: var(--font-ui);
		font-size: var(--fs-sm);
		color: var(--dim);
		text-decoration: none;
		border-bottom: 1px solid var(--underline);
		padding-bottom: 2px;
	}

	.footer-nav a:hover {
		color: var(--text);
		border-bottom-color: var(--underline-hover);
	}
</style>
