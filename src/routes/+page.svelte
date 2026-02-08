<script>
  import Icon from '@iconify/svelte';
  import NatureScene from '$lib/components/NatureScene.svelte';
  import { onMount } from 'svelte';

  const fullName = "Branden Bohrnsen";
  let displayedName = "";
  const typingSpeed = 150;

  onMount(() => {
    let charIndex = 0;
    const intervalId = setInterval(() => {
      if (charIndex < fullName.length) {
        displayedName += fullName[charIndex];
        charIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, typingSpeed);
    return () => clearInterval(intervalId);
  });

  const socialLinks = [
    { label: "Bluesky", href: "https://bsky.app/profile/branden.zip", iconName: "simple-icons:bluesky" },
    { label: "X (Twitter)", href: "https://x.com/eigenstuffs", iconName: "simple-icons:x" },
    { label: "GitHub", href: "https://github.com/eigenstuffs", iconName: "simple-icons:github" },
    { label: "Email", href: "mailto:bohrnsen@umich.edu", iconName: "mdi:email-outline" },
    { label: "LinkedIn", href: "https://linkedin.com/in/brandenbohrnsen", iconName: "simple-icons:linkedin" },
  ];
</script>

<div class="home-container">
  <h1 class="name-heading">
    {displayedName}<span class="blinking-cursor"></span>
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

  <NatureScene />

  <p class="bio">
    Hello! I am a <a href="https://fordschool.umich.edu/phd/public-policy-and-political-science">Public Policy and Political Science PhD</a> student at the University of Michigan.<br><br>
    I am interested in political economy and political behavior. My <a href="https://branden.zip/research">current research agendas</a> concern the behavior of interest groups in climate policymaking and the development of AI interventions for social and economic good. My methodological interests are in multimodal data, networks, and experiments.<br><br>
    Please reach out at any time! My socials are above.
  </p>
</div>

<style>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .name-heading {
    font-size: 1.6rem;
    font-weight: normal;
    margin: 0 0 1rem 0;
    min-height: 1.2em;
    color: var(--text-color-heading);
  }

  .blinking-cursor {
    display: inline-block;
    background-color: var(--cursor-color);
    width: 2px;
    height: 1em;
    margin-left: 1px;
    animation: blink-caret-js 0.75s step-end infinite;
    vertical-align: text-bottom;
  }

  @keyframes blink-caret-js {
    from, to { background-color: transparent; }
    50% { background-color: var(--cursor-color); }
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .social-icon-link {
    color: var(--icon-color);
    transition: color 0.2s;
  }

  .social-icon-link :global(svg) {
    width: var(--icon-size);
    height: var(--icon-size);
  }

  .social-icon-link:hover {
    color: var(--icon-hover-color);
  }

  .bio {
    font-size: 0.9rem;
    line-height: 1.7;
    max-width: 520px;
    text-align: left;
    margin: 0;
  }

  .bio :global(a) {
    color: var(--link-color);
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 215, 0, 0.3);
    transition: border-color 0.2s;
  }

  .bio :global(a:hover) {
    border-color: var(--link-color);
  }
</style>
