<script>
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  let mounted = false;

  const fullName = "Branden Bohrnsen";
  const title = "PhD Student";
  const institution = "University of Michigan";

  const socialLinks = [
    { label: "twitter", href: "https://x.com/eigenstuffs", iconName: "simple-icons:x" },
    { label: "github", href: "https://github.com/eigenstuffs", iconName: "simple-icons:github" },
    { label: "email", href: "mailto:bohrnsen@umich.edu", iconName: "mdi:email-outline" },
    { label: "linkedin", href: "https://linkedin.com/in/brandenbohrnsen", iconName: "simple-icons:linkedin" },
  ];

  const papers = [
    {
      title: "Polarized Climate Policy",
      url: "https://github.com/eigenstuffs/thesis/blob/main/dec%206%20version.pdf",
      abstract: "Climate policy is a result of the distributive conflict between fossil fuel incumbents and clean energy interests. I test this theory empirically using state legislature data from 1998 to 2020.",
      status: "wip"
    },
    {
      title: "Measuring Local Wealth in the Philippines",
      url: "https://osf.io/95jva",
      abstract: "Using comparable household surveys, I estimate local wealth from 1985 to 2010, addressing issues with existing small area poverty estimates.",
      status: "wip"
    }
  ];

  const games = [
    {
      title: "Don't Break the Bicycle",
      url: "https://dubiousduck.itch.io/dont-break-the-bicycle",
      description: "72-hour game jam collaboration. First place in ACM Studio Jam."
    },
    {
      title: "Villainess x Reborn",
      url: "https://brandenmb.itch.io/villainess-x-reborn",
      description: "Team lead, programmer. 1,400+ downloads, 5-star rating."
    },
    {
      title: "Social Interaction Simulator",
      url: "https://brandenmb.itch.io/social-interaction-simulator",
      description: "Typing game. #17 of 173 in Mini Jam 100."
    },
    {
      title: "game with squares",
      url: "https://brandenmb.itch.io/gamewithsquares",
      description: "Minimalist platformer, 72 hours."
    }
  ];

  onMount(() => {
    mounted = true;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
</script>

<div class="page" class:mounted>
  
  <!-- Hero -->
  <section id="about" class="hero">
    <div class="container">
      <div class="fade-in">
        <h1>{fullName}</h1>
        <p class="subtitle">{title}, <a href="https://fordschool.umich.edu/phd/public-policy-and-political-science" target="_blank" rel="noopener noreferrer">Political Science & Public Policy</a><br><span class="muted">{institution}</span></p>
        
        <div class="social-row">
          {#each socialLinks as link}
            <a
              href={link.href}
              target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              class="social-link"
              title={link.label}
            >
              <Icon icon={link.iconName} width="18" height="18" />
            </a>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- About -->
  <section class="section">
    <div class="container">
      <div class="fade-in">
        <span class="section-label">about</span>
        <p>
          I study political economy and political behavior. My research concerns interest group behavior in climate policymaking and AI interventions for social good.
        </p>
        <p>
          My methodological interests are in multimodal data, networks, and experiments.
        </p>
        <p>
          Please reach out at any time — I'm always happy to connect.
        </p>
      </div>
    </div>
  </section>

  <!-- Research -->
  <section id="research" class="section">
    <div class="container">
      <div class="fade-in">
        <span class="section-label">research</span>
        
        <div class="paper-list">
          {#each papers as paper}
            <div class="paper">
              <div class="paper-header">
                <a href={paper.url} target="_blank" rel="noopener noreferrer">{paper.title}</a>
                <span class="badge">{paper.status}</span>
              </div>
              <p class="paper-abstract">{paper.abstract}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- CV -->
  <section id="cv" class="section">
    <div class="container">
      <div class="fade-in">
        <span class="section-label">cv</span>
        <p>Academic background and experience.</p>
        <div class="btn-row">
          <a href="/branden_bohrnsen_cv.pdf" download class="btn">
            <Icon icon="mdi:download" width="16" height="16" />
            download pdf
          </a>
          <a href="/branden_bohrnsen_cv.pdf" target="_blank" class="btn">
            <Icon icon="mdi:open-in-new" width="16" height="16" />
            view
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Games -->
  <section id="games" class="section">
    <div class="container">
      <div class="fade-in">
        <span class="section-label">games</span>
        <p>In my free time, I develop video games. Here are some I am especially proud of.</p>
        
        <div class="games-list">
          {#each games as game}
            <div class="game-item">
              <a href={game.url} target="_blank" rel="noopener noreferrer">{game.title}</a>
              <span class="muted"> — {game.description}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <p class="mono muted">© {new Date().getFullYear()} {fullName}</p>
    </div>
  </footer>
</div>

<style>
  .page {
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .page.mounted {
    opacity: 1;
  }

  /* Hero */
  .hero {
    padding: var(--space-24) 0 var(--space-16);
  }

  .hero h1 {
    margin-bottom: var(--space-2);
  }

  .subtitle {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--space-6);
    line-height: 1.6;
  }

  .muted {
    color: var(--color-text-muted);
  }

  .social-row {
    display: flex;
    gap: var(--space-1);
  }

  /* Papers */
  .paper-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .paper-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-2);
    flex-wrap: wrap;
  }

  .paper-header a {
    font-weight: var(--font-weight-semibold);
  }

  .paper-abstract {
    margin: 0;
    font-size: 0.9375rem;
  }

  /* Buttons */
  .btn-row {
    display: flex;
    gap: var(--space-3);
    flex-wrap: wrap;
  }

  /* Games */
  .games-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .game-item {
    font-size: 0.9375rem;
  }

  .game-item a {
    font-weight: var(--font-weight-semibold);
  }

  /* Footer */
  .footer {
    padding: var(--space-12) 0;
    text-align: center;
  }

  .footer p {
    font-size: 0.8125rem;
    margin: 0;
  }

  .mono {
    font-family: var(--font-mono);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero {
      padding: var(--space-16) 0 var(--space-12);
    }
  }
</style>
