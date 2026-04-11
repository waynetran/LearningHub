# LearningHub — Design & Authoring Principles

This file is the contract for anyone (human or agent) editing the site. Read it before writing any page.

## What the site is

An interactive reference hub for a broad quantitative audience — researchers, scientists, engineers, product managers, executives, students, and enthusiasts — who want a serious, self-contained tour through the math, physics, chemistry, CS, and AI behind modern science and technology. The guiding design question is:

> "How does a smart, busy, possibly-rusty reader land here, find what they need in one click, and dig as deep as they want in layered chunks?"

### Five tracks

- **Mathematics** — the shared language of quantitative reasoning, at `math/index.html` + `math/*.html`. Used by every other track.
- **Physics** — classical through frontier (string theory, quantum info), at `physics/index.html` + `physics/*.html`
- **Chemistry** — atoms to biochemistry to computational methods, at `chemistry/index.html` + `chemistry/*.html`
- **Computer Science** — algorithms, complexity, theory, optimization, at `cs/index.html` + `cs/*.html`
- **AI / Machine Learning** — frontier and history of AI, at `ai-ml.html` + `topics/*.html`

The root landing page (`index.html`) is the hub — it routes visitors into one of the tracks.

## File & URL conventions

```
LearningHub/
├── index.html                ← site hub (landing)
├── ai-ml.html                ← AI/ML track hub
├── problem-set.js            ← shared problem-set runtime (window.LearningHubProblemSet)
├── styles.css                ← all shared styles, SSOT for theme
├── topics/                   ← AI/ML deep dives
│   ├── *.html
├── math/
│   ├── index.html            ← math track hub
│   ├── calculus.html
│   ├── calculus-problems.js  ← problem-set registration for calculus
│   ├── ...                   ← one HTML + one JS per subject
├── physics/
│   ├── index.html
│   ├── classical-mechanics.html
│   ├── classical-mechanics-problems.js
│   ├── ...
├── chemistry/
│   ├── index.html
│   ├── ...
├── cs/
│   ├── index.html
│   ├── algorithms.html
│   ├── algorithms-problems.js
│   ├── ...
```

Paths are relative. From a subject page, the CSS is `../styles.css`, the site hub is `../index.html`, a sibling page is `./<other-subject>.html`, the shared runtime is `../problem-set.js`, and a sibling subject's problem file is `<subject>-problems.js`.

## The audience, and what that implies

Assume the reader has **forgotten the prerequisites** but is **not incapable of learning them**, AND is **not necessarily a programmer** — they may be a physicist, chemist, biologist, engineer, economist, product manager, executive, student, or curious enthusiast. That means:

1. **Never leave a symbol undefined.** Every math formula is followed by a `math-glossary` block that names every variable, operator, and constant in plain English, with a short "why this matters" or analogy.
2. **Prereq badges at the top of every page.** List what the page assumes, and *link each prerequisite* to the page that teaches it. If the link doesn't exist yet, at least drop a `TODO` so we can build it later.
3. **Layered depth.** Give a one-sentence intuition, then a worked example, then the formal statement, then the proof/derivation (optional). Let readers stop at whichever layer they need.
4. **"See also" at the bottom of every major section.** Cross-link to related pages in other tracks — math ↔ physics, physics ↔ chemistry, probability ↔ statistical mechanics, optimization ↔ ML, linear algebra ↔ quantum mechanics, etc.
5. **Examples from many fields, not just AI/ML.** When showing a formula in action, pull use cases from physics experiments, chemistry lab practice, engineering workflows, finance and economics, biology, and AI — whichever best illuminates the idea. Do not default to neural-network framing.

## The page template (non-negotiable)

All subject/deep-dive pages follow the same skeleton used by `topics/foundation-models.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Subject} — Deep Dive</title>
  <link rel="stylesheet" href="../styles.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
    onload="renderMathInElement(document.body, {delimiters: [{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}], throwOnError: false});"></script>
</head>
<body>
<div id="tooltip"></div>

<nav class="topic-nav">
  <a class="back" href="../index.html">← Back to Hub</a>
  <div class="crumb">{Track} / <span class="topic-name">{Subject}</span></div>
</nav>

<div class="topic-layout">
  <aside class="topic-toc">
    <h4>ON THIS PAGE</h4>
    <ul>
      <li><a href="#s1">1. ...</a></li>
      ...
    </ul>
  </aside>

  <article class="topic-content">
    <h1>{Subject}</h1>
    <p class="subtitle">One-sentence promise of what the reader will understand after reading.</p>
    <div class="meta-tags">
      <span>Prereq: <a href="...">X</a>, <a href="...">Y</a></span>
      <span>Read time: ~N min</span>
      <span>Interactive figures: N</span>
      <span>Code: NumPy / PyTorch / ...</span>
    </div>

    <!-- body sections -->

    <div class="bib"> ... </div>
    <div class="next-card"> ... </div>
  </article>
</div>

<script> /* interactive SVG code */ </script>
</body>
</html>
```

### Required sections (every subject page)

1. **Intro / why you care** — plain-English hook, no formulas.
2. **Vocabulary cheat-sheet** — small table or list with the 5–10 symbols used on the page.
3. **Core concept(s)** — with full math + glossary for every formula.
4. **At least one interactive SVG figure** — slider, button, or hover-driven. Use `class="viz-3d"` wrapper and controls pattern from `topics/foundation-models.html`.
5. **Worked example** — numbers, not just symbols.
6. **Code block** — NumPy or pseudocode in `.code-tabs`, using manual span highlighting (`.kw`, `.fn`, `.str`, `.num`, `.cmt`, `.op`).
7. **Connections to other subjects** — "See also" cards with links.
8. **Further reading** — `.bib` block with links where possible.
9. **Next card** — `.next-card` pointing at a sensible next subject.

### Math display standard

Every `$$...$$` display block is immediately followed by a `math-glossary`:

```html
<div class="math-display">$$ f(x) = \sum_{i=1}^n w_i x_i + b $$</div>

<div class="math-glossary">
  <p class="mg-title">Linear combination</p>
  <dl>
    <dt>$f(x)$</dt><dd>The output of the function for input vector $x$.</dd>
    <dt>$w_i$</dt><dd>The i-th weight — a learnable scalar that says how much input $i$ matters.</dd>
    <dt>$x_i$</dt><dd>The i-th component of the input vector.</dd>
    <dt>$b$</dt><dd>Bias — a constant shift applied regardless of input.</dd>
    <dt>$\sum_{i=1}^n$</dt><dd>Sum from i = 1 to n, where n is the number of input features.</dd>
  </dl>
  <p class="mg-analogy"><strong>Analogy.</strong> Like a weighted average of ingredients in a recipe, except the "recipe" is learned from examples instead of written down in advance.</p>
</div>
```

Never skip the glossary. Never use `$$` or `$` without explaining every symbol inside it somewhere on the page.

## Styling — use what exists, do not invent

All colors and components live in `styles.css`. The theme is dark, using these CSS variables:

- `--bg`, `--bg-2`, `--bg-3`, `--panel`, `--panel-2`
- `--text`, `--text-dim`, `--text-bright`
- `--accent` (#7c5cff, violet) — primary
- `--accent-2` (#22d3ee, cyan) — secondary
- `--accent-3` (#f472b6, pink) — highlights/speculative
- `--good` / `--warn` / `--bad`
- `--mono`, `--sans`, `--serif`

### Components available (do not rewrite them — import via className)

- `.hero`, `.hero-inner`, `.hero .chip`, `.lede`
- `.grid`, `.card` (with `.card h4`, `.card .meta`)
- `.callout`, `.callout.warn`, `.callout.good`, `.callout.math` (with `.label`)
- `.defn` (yellow sidebar definition block)
- `.term` (dotted-underline hoverable inline term, with `data-label` and `data-def`)
- `.math-display`, `.math-glossary`, `.mg-title`, `.mg-analogy`, `.mg-why`
- `.code-tabs`, `.ct-header`, `.ct-tab`, `.ct-label`, `.ct-panel` + syntax spans
- `.viz-3d`, `.viz-3d .v3-controls`, `.viz-3d .v3-label`, `.viz-3d .v3-caption`
- `.topic-nav`, `.topic-layout`, `.topic-toc`, `.topic-content`, `.meta-tags`
- `.bib` (bibliography), `.next-card` (next-up pointer)
- `.rank-table` (styled table)
- `.tag`, `.tag.hot`, `.tag.old`

If you need a new visual element, **add it to `styles.css`**, not inline. Never use inline style unless it's a one-off numeric tweak.

## Interactive visualizations

Every page needs at least one. They use inline SVG + a small IIFE at the bottom of the page that listens to slider/button input and re-draws. Look at:

- `topics/foundation-models.html` (Chinchilla scaling calculator)
- `topics/agi.html` (METR time-horizon extrapolation)
- `topics/singularity.html` (takeoff-speed simulator)
- `topics/edge-ai.html` (weight histogram with quantization slider)

Use `viewBox="0 0 720 360"` as a reasonable default. Dark background `#0a0d12`. Grid lines `#1a2030`. Axis `#384050`. Primary curve in `--accent-2` (`#22d3ee`), secondary in `--accent` (`#7c5cff`).

## Code blocks

Use the `.code-tabs` pattern with at least two language tabs when it makes sense (e.g., NumPy + PyTorch, or pseudocode + Python). Syntax highlighting is **manual** via `<span class="kw|fn|str|num|cmt|op">` — no external libraries. See `topics/foundation-models.html` lines ~170–240 for the working pattern.

## Images and photographs

Real photos of historical figures, equipment, and concept sketches are welcome **if and only if** they are public domain or CC-0. Use the following policy:

- **Default: SVG diagrams.** Make one yourself rather than finding a photo. This is the zero-risk path and usually better for pedagogy.
- **If a photo genuinely helps retention** (Ada Lovelace, Newton, Turing, Euler, ENIAC, Bombe, Bell Labs), use Wikimedia Commons URLs in the form `https://upload.wikimedia.org/wikipedia/commons/...`. Only use images you can verify are public domain or CC-0 — if you're not sure, don't.
- **Never hotlink** from arbitrary blogs, news sites, or image search results.
- **Every image must have descriptive alt text and a caption attributing the source.** Use `<figure><img ...><figcaption>...</figcaption></figure>`.
- If in doubt, omit the image and use an SVG diagram instead.

## Voice and tone

- Second person, lightly informal, matter-of-fact. "You'll see..." not "The reader will see..."
- Prefer short sentences and active voice.
- No breathless hype and no condescension. Say what the thing is, why it matters, what trips people up, and what to read next.
- It is OK — good, even — to say "this is hard the first time," "most people get this wrong initially," or "the notation is awful, here's what's happening."
- Don't use em-dashes to string together five clauses. One per sentence.

## Progression and layering

Each subject page should expose three layers of depth:

1. **Skim layer** — H2 headings, subtitle, callouts, and captions. A reader who only reads these should walk away with the main idea.
2. **Read layer** — body paragraphs, worked examples, interactive figures. A reader who reads these should be able to do the subject at a working level.
3. **Dig layer** — code, proofs, derivations, `.bib` links. A reader who follows these becomes self-sufficient.

Never bury a key idea in the Dig layer. Never put fluff in the Skim layer.

## Cross-linking rules

- Every page must link to **at least 3 other pages** on the site (one prereq, one related, one next).
- When a term from another subject appears, link it on first use. Don't link the same term repeatedly on the same page.
- Use the `.term` tooltip for definitions that fit in one sentence. Use a link for definitions that need a full page.

## Common mistakes to avoid

- **"Assumed prereq" without a link.** If you list a prerequisite in the meta tags, link it.
- **Math without a glossary.** Never.
- **Inline styles and ad-hoc colors.** Use existing classes.
- **New, unthemed interactive components.** Reuse the `.viz-3d` pattern; don't roll your own.
- **"Recent papers" without dates.** Always date-stamp cited work.
- **Fake image URLs.** If you don't know the exact URL is real and public domain, don't use it.
- **Adding sections that repeat each other.** Each H2 should add something new.
