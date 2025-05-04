<script>
  import Icon from '@iconify/svelte';

  const name = "Branden Bohrnsen";
  const nameLength = name.length;

  const socialLinks = [
    { label: "Bluesky", href: "https://bsky.app/profile/branden.zip", iconName: "simple-icons:bluesky" },
    { label: "X (Twitter)", href: "https://x.com/eigenstuffs", iconName: "simple-icons:x" },
    { label: "GitHub", href: "https://github.com/eigenstuffs", iconName: "simple-icons:github" },
    { label: "Email", href: "mailto:bohrnsen@umich.edu", iconName: "mdi:email-outline" },
    { label: "LinkedIn", href: "https://linkedin.com/in/brandenbohrnsen", iconName: "simple-icons:linkedin" },
  ];

  const navLinks = [
    { label: "Research", href: "/research" },
    { label: "CV", href: "/cv" },
    { label: "Games", href: "/games" },
  ];
</script>

<div class="page-container home-container">
  <h1 class="name-heading" style="--name-length: {nameLength};">
    {name}
  </h1>

  <nav class="social-links" aria-label="Social Media Links">
    {#each socialLinks as link (link.label)}
      <a
        href={link.href}
        target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
        rel="noopener noreferrer"
        aria-label={link.label}
        class="social-icon-link"
        title={link.label}
      >
        <Icon icon={link.iconName} />
      </a>
    {/each}
  </nav>

  <p class="bio">
    Hello! I am a Public Policy & Political Science PhD Student at the University of Michigan.<br><br>

    I am interested in political economy. My current work studies how economic and political actors engage
    in the distributive conflict of climate politics.<br><br>

    I enjoy working with multimodal data, and have interests in causal inference
    and measurement.<br><br>

    Prior to my PhD, I graduated from UCLA with Highest Honors in Political Science. I also develop
    video games, which you can find below.<br><br>

    Please reach out at any time! My socials are above.
  </p>

  <nav class="button-nav">
    {#each navLinks as link}
      <a href={link.href} class="button">{link.label}</a>
    {/each}
  </nav>

</div>

<style>
  .home-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1.5rem;
    text-align: center;
  }

  .name-heading {
    --steps: var(--name-length, 10);
    font-size: 2.5rem;
    color: var(--text-color-heading);
    margin-bottom: 1rem;
    display: inline-block;
    position: relative;
    width: 0;
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid var(--cursor-color);
    animation-name: typing, blink-caret;
    animation-duration: calc(var(--steps) * var(--typing-speed)), 0.75s;
    animation-timing-function: steps(var(--steps), start), step-end;
    animation-delay: 0s;
    animation-iteration-count: 1, infinite;
    animation-fill-mode: forwards;
  }

  @keyframes typing {
    from { width: 0; }
    to { width: calc(var(--steps) * 1ch); }
  }

  @keyframes blink-caret {
     0%, 100% { border-color: var(--cursor-color); }
     50% { border-color: transparent; }
  }

  .social-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    min-height: 2.5rem; /* ADDED: Reserve vertical space */
    width: 100%; /* Ensure it takes width for alignment */
  }

  .social-icon-link {
    color: var(--icon-color);
    display: inline-block;
    line-height: 0;
  }

  .social-icon-link :global(svg) {
     width: var(--icon-size);
     height: var(--icon-size);
     vertical-align: middle;
  }

  .social-icon-link:hover,
  .social-icon-link:focus {
    color: var(--icon-hover-color);
  }

  .bio {
    font-size: 1rem;
    line-height: 1.5;
    max-width: 550px;
    margin-bottom: 1.5rem;
    text-align: left;
  }

  .button-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.8rem;
  }

  .button {
    display: inline-block;
    background-color: var(--button-bg);
    color: var(--button-text);
    padding: 0.6rem 1.2rem;
    border-radius: 3px;
    text-decoration: none;
    font-family: var(--font-family-typewriter);
    font-weight: normal;
    font-size: 0.85rem;
    border: 1px solid var(--button-text);
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    text-align: center;
  }

   .button:hover,
   .button:focus {
    background-color: var(--button-hover-bg);
    color: var(--button-text);
    text-decoration: none;
   }
</style>