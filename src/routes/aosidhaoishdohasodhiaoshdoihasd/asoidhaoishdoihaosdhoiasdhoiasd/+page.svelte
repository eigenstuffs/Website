<div class="blog-post-container">
  <article>
    <header class="post-header">
      <h1>AI-assisted research is and isn't for me</h1>
      <p class="post-date">2025-09-08</p>
    </header>

    <section class="post-content">
        <p>
            Over the past several months, I have incorporated generative AI into my workflow. 
            I use Gemini 2.5 Pro to summarize articles for graduate seminars, because I can ask
            it to only source within the documents, ensuring a pretty reliable output. I mainly use
            Gemini CLI for visualization tasks, since I know how to visualize data and waste a lot of
            time with repetitive data transformations and ggplot themings. Because I am confident that
            I can read and draw plots, I am comfortable using these tools.
        </p>

        <p>
            These integrations have generally made my life better at a low cost. I use free student plans,
            so I am not paying in a literal sense, but I do feel that I have become less patient in reading
            line-by-line (often suboptimal for graduate courses anyways) and I think my coding skills are slightly worse. In
            exchange, I get to optimize repetitive coding procedures and slow literature crawls. I'm not yet sure whether
            this trade-off is worth it, but it seems to free up time for thinking, which can be higher value.
        </p>

        <p>
            It seems like a lot of the work we are tempted to outsource to AI is critical to the
            research process. I feel that without manually doing literature reviews and reading material first-hand, I
            am a worse thinker. In the rare case that I try and modify my writing through AI reviews, I find
            myself disappointed with the constant circular nitpicking and generalist reasoning. Hours of AI-generated
            feedback are not even remotely as useful as one constructive email from an experienced researcher. 
        </p>
            
        <p>
            Unfortunately, if you prompt a LLM to be critical, it will be critical, but if you prompt it to give feedback, it will praise
            your work. I am not convinced there is a way to bypass the psychological barrier of knowing that the LLM
            is producing the output you want to see, not the product of actual human reasoning.
            I am not confident we can overcome the issue of "glazing" without arbitrarily forcing the chatbot to find reasons
            to be dissatisfied. This reason alone makes AI-assisted research incredibly difficult.
        </p>

        <p>
            Even writing this, I am thinking about whether these perceived AI productivity gains are actually real. If you gave a researcher
            an hour with Google Scholar and another an hour with Gemini Deep Research, I would bet that the former scholar would piece
            together a stronger grasp on the current debates and topics within a literature proximate to their interests. The time
            we spend waiting for a CLI to mess up our data cleaning for the fifth time could probably just be spent doing the task
            and not stop-starting our cognitive processes.
        </p>

        <p>
            I think I am done using LLMs for substantive work beyond summarizing articles I have sourced myself. Reading papers yourself not only ensures
            accurate information transmission but also opens your eyes to citation networks, writing strategies, and the evolution
            of debate. Because the LLM is not a specialized expert, it will oftentimes brush over niche contributions in favor of broader
            themes in the literature – but you are wasting your time if you only walk away with that, unless your goal is to engage with the
            topic as a new consumer. I do find utility in having the LLM fact-check me if I incorrectly describe an argument, but this basically
            automates sanity checks, not the actual work.
        </p>

        <p>
            I do think there is a productive use for AI in research, particularly as a technical instrument. Using LLMs to build
            survey questions based on past responses is incredibly cool, for instance. I'd be personally comfortable using LLMs to
            build an Otree experiment, since the cost of doing it myself would be learning a new ecosystem and language (Python) that
            I do not enjoy and only find marginally helpful.
        </p>

        <p>
            I will begin exploring the use of small-language models (SLMs) for specialized tasks. I'd like an assistant that can plot things how I
            like to plot them using training data I have selected, using the packages I like. If I train the model myself, I lose the ability to automate
            unknown questions, but I get model outputs that I understand. As far as I know, this is the ideal balance between maintaining programming ability and
            automating the boring stuff. 
        </p>

        <p>
            I think we are quickly hitting diminishing returns for AI use in research, at least for substituting the work of thinking. I selfishly hope I'm
            right about this, as that provides me job security. I think we are only scratching the surface of what AI can do as a treatment and as an instrument
            to extract as much information we can from experimental work. SLMs also provide an excellent opportunity to safely outsource repetitive tasks while
            not forfeiting coding ability.
        </p>
      </section>
  </article>

  <footer class="footer-nav">
    <a href="/blog">&larr; Back to Blog List</a>
  </footer>
</div>

<style>
  .blog-post-container {
    width: 100%;
    max-width: 620px;
  }

  .post-header {
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.2rem;
    font-weight: normal;
    color: var(--text-color-heading);
    margin: 0 0 0.4rem 0;
    line-height: 1.4;
  }

  .post-date {
    font-size: 0.78rem;
    color: var(--dim-color);
    margin: 0;
  }

  .post-content p {
    font-size: 0.88rem;
    line-height: 1.8;
    margin: 0 0 1rem 0;
  }

  .footer-nav {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }

  .footer-nav a {
    color: var(--dim-color);
    font-size: 0.85rem;
    transition: color 0.2s;
  }

  .footer-nav a:hover {
    color: var(--text-color);
  }
</style>
