<script>
  import Icon from '@iconify/svelte';
  import NetworkField from '$lib/components/NetworkField.svelte';

  const socialLinks = [
    { label: "bsky", href: "https://bsky.app/profile/branden.zip", iconName: "simple-icons:bluesky" },
    { label: "x", href: "https://x.com/eigenstuffs", iconName: "simple-icons:x" },
    { label: "github", href: "https://github.com/eigenstuffs", iconName: "simple-icons:github" },
    { label: "linkedin", href: "https://linkedin.com/in/brandenbohrnsen", iconName: "simple-icons:linkedin" },
  ];
</script>

<div class="home">
  <h1>Branden Bohrnsen</h1>
  <p class="role">PhD Student, Public Policy & Political Science, University of Michigan</p>

  <nav class="social-row" aria-label="Social links">
    {#each socialLinks as link}
      <a
        href={link.href}
        target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
        rel="noopener noreferrer"
        class="pill"
      >
        <Icon icon={link.iconName} />
        {link.label}
      </a>
    {/each}
  </nav>

  <NetworkField />

  <div class="bio">
    <p>
      Hello! I am a PhD student in Public Policy & Political Science at the University of Michigan's Ford School.
    </p>
    <p>
      My research concerns the politics of disruptive technologies. I am curious as to how societies govern and respond to transformative forces like renewable energy and AI, as well as how the winners and losers created by these technologies engage in distributive conflict. I enjoy novel data collection and employing tools from causal inference and machine learning in my work.
    </p>
    <p>
      I am currently affiliated with the Climate Politics Lab at Michigan and the Free Systems Lab at the Stanford Graduate School of Business.
    </p>
    <p class="email">bohrnsen@umich.edu</p>
  </div>
</div>

<style>
  .home {
    width: 100%;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: 0.25rem;
    position: relative;
    display: inline-block;
  }

  h1::after {
    content: '';
    display: block;
    width: 3rem;
    height: 4px;
    background: var(--accent);
    margin-top: 0.35rem;
    border-radius: 2px;
  }

  .role {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--dim);
    margin: 0.75rem 0 1.5rem;
    letter-spacing: 0.02em;
  }

  .social-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: 0.3rem 0.65rem;
    border: 1.5px solid var(--border);
    border-radius: 100px;
    color: var(--dim);
    transition: color 0.15s, border-color 0.15s, background 0.15s;
  }

  .pill:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: rgba(194, 65, 12, 0.05);
  }

  .pill :global(svg) {
    width: 0.85rem;
    height: 0.85rem;
  }

  .bio {
    max-width: 38rem;
  }

  .bio p {
    margin: 0 0 1rem;
  }

  .bio a {
    color: var(--accent);
    border-bottom: 1.5px solid rgba(194, 65, 12, 0.25);
    transition: border-color 0.15s;
  }

  .bio a:hover {
    border-color: var(--accent);
  }

  .bio .email {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--dim);
    margin-top: 0.25rem;
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 2.4rem;
    }
  }
</style>
