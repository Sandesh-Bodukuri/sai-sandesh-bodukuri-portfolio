# CLAUDE_CONTEXT.md — Sai Sandesh Bodukuri · Portfolio

Source of truth for every build session. v1.7 · 2026-10-04 (Step 1 closed: owner-run Playwright/axe and Lighthouse results recorded; D-039).
Precedence: this file > chat history > assumptions. If a chat contradicts this file, flag it; do not guess. Changes to this file go through §17.
Status legend: **Verified** = confirmed by the owner · **Pending** = owner still to supply · **Optional** = useful, not required for launch (§0).

**How to load:** never paste the whole file. Load §0 plus the sections listed for the current step in §14. Section numbers are stable; cite them ("per §3").

---

## 0. Brief

- **Owner:** Sai Sandesh Bodukuri (brand name = real name). **Role line:** AI/ML Engineer & Computer Science Developer.
- **Direction (owner-fixed): AI/ML 50% · F1 30% · Samurai 20%.** A hierarchy of creative influence, not screen area. Target impression: *advanced AI laboratory × motorsport engineering × disciplined Japanese/Samurai craftsmanship.*
  - **AI/ML (what I build):** the dominant identity and subject: neural/vector-space visuals, model and data architecture, inference flows, pipelines, technical diagrams, model metrics, the AI terminal, experiment visuals. A visitor must see "AI/ML engineer" immediately.
  - **F1 / motorsport (speed, precision, telemetry, engineering):** shapes interaction language *and* appears as visible design elements, as original abstractions only (§2.4).
  - **Samurai / Japanese (discipline, restraint, craftsmanship, focus):** visibly recognisable yet restrained and sophisticated (§2.4).
  - The three are layered into one coherent system inside the same components, never one theme per section (§2.7).
- **Never:** an anime site, gaming site, F1 fan site, or generic "AI futuristic" template. No Formula 1 branding, logos, team liveries, proprietary graphics, or official circuit artwork. No anime aesthetics, Samurai character illustrations, excessive katana imagery, armour, cherry blossom, torii, or Japanese characters used only because they look Japanese.
- **Audience:** primary recruiters and technical hiring managers; secondary AI/ML internship recruiters, research evaluators, engineers, curious visitors. Technically serious to experts, understandable to non-researchers.
- **First 5 seconds:** "A technically serious AI/ML developer who builds interesting systems and thinks beyond conventional projects." Banned phrases: "passionate developer", "coding enthusiast". Copy is specific: name the system, the method, the number.
- **Content priority:** 1 technical credibility, 2 projects, 3 skills, 4 experience/education, 5 contactability.
- **Section order:** Hero, Projects, Experiments, About (short), Skills, Experience & education, GitHub, Contact. No blog unless added via §17.
- **Primary CTA** View projects. **Secondary** GitHub. Résumé download and Contact live in the nav/footer/contact section, not competing in the hero (the résumé link appears only once the PDF is Verified).

### Content status system
- **Verified**: confirmed by the owner (résumé, messages, links they supplied). Safe to publish.
- **Pending**: the owner still has to provide or confirm it. Never invent it; build the typed slot, not the content.
- **Optional**: useful but not required for launch. Hidden until supplied and confirmed, then Verified.

Rules: (1) Never invent content, methodology, datasets, metrics, or demo output. (2) Pending content blocks a step only if that step lists it under "Needs" in §14. (3) Anything observed by Claude but not confirmed by the owner (for example features seen on a live page) is Pending. (4) Every item in `content/*.ts` carries `status: 'verified' | 'pending' | 'optional'`; production builds render only `verified` items, and a dev-only checklist lists the rest.

### Content facts
**D.E.S.T.I.N.Y. (flagship)**
- Verified: AI-powered career guidance web app; built for the GenAI Exchange Hackathon; live at https://d-e-s-t-i-n-y.vercel.app/; résumé stack: modular Flask backend, Vertex AI/Gemini via Pydantic, Render.
- Pending: problem and why it mattered; approach, architecture, implementation detail; results (if any); lessons; confirmation that the live backend responds; confirmation of features seen on the live page (career matches, aptitude test, AI counselor); confirmation that `github.com/Sandesh-Bodukuri/D.E.S.T.I.N.Y` is the intended public repo.
- Optional: screenshots or a short demo video.

**EEG classification (flagship)**
- Verified: IEEE EMBS Student Chapter AI/ML internship; EEG signal processing with CNN and Random Forest on clinical datasets; 97.20% accuracy; 90% recall; false negatives reduced 57.6% (66 → 28).
- Pending: what the model classifies; what 66 → 28 compares (before/after what); dataset size, source, split, class balance; evaluation-set size and which class the 90% recall refers to; preprocessing and architecture detail; precision or other metrics; what may be shown publicly; lessons.
- Optional: plots or a diagram, if shareable. No public repo or data exists.

**Home Sensor Dashboard & Anomaly Detector (secondary)**
- Verified: Python, Flask, One-Class SVM, Plotly, Pushover alerts; real-time dashboard with unsupervised anomaly detection.
- Pending: confirmation that `github.com/Sandesh-Bodukuri/AI_Powered_Home_Safety_Anomaly_Detection` is the intended repo; problem, approach, results.
- Optional: a real recorded sensor stream with model scores for an Experiments replay.

**AI-Powered Mock Interview Assistant (secondary)**
- Verified: Python, Gemini API, React, Drizzle ORM, SQL, Clerk auth; real-time conversational AI.
- Pending: problem, approach, results.
- Optional: link or repo (none public yet).

**Education, credentials, skills**
- Verified: B.Tech CSE, Bharat Institute of Engineering and Technology, Oct 2022 – May 2026; Multi-Modal GenAI Application Developer Badge; Prompt Design in Vertex AI (Google Cloud Boost); Industrial Training in AI/ML & Robotics (certificate of appreciation + LOR for top performance in the 30-day AI & Robotics training); AI/ML workshop at IIT Hyderabad. Skill groups (no percentages): ML: CNN, Random Forest, One-Class SVM, scikit-learn, Pandas, NumPy · GenAI: LLMs, Gemini API, Vertex AI, prompt design · Backend/API: Python, Flask, REST, Pydantic, SQL, Drizzle ORM · Frontend: JavaScript, React, HTML5/CSS3 · Cloud/tools: GCP, Render, Git · Foundations: DSA, OOP, SDLC.
- Optional: showing CGPA 7.4/10 (decide at Step 5).

**Identity and links**
- Verified: name Sai Sandesh Bodukuri; role line AI/ML Engineer & Computer Science Developer; GitHub https://github.com/Sandesh-Bodukuri; public email (stored only in `content/site.ts`); phone allowed in the résumé PDF only.
- Pending: LinkedIn URL (omit the link until supplied); final résumé PDF.
- Optional: custom domain (the default Vercel domain is acceptable at launch).

**Content rules**
- Robotics = stated interest + training only; never imply a built robot.
- Every number comes from the Verified lists above or from the owner.
- Phone number only inside the résumé PDF. Email only in `content/site.ts`.
- **Metric explanation rule:** keep the exact supplied numbers and add one plain-language line using only generic definitions: accuracy = about how many of every 100 predictions were correct; recall = how many of every 100 real cases of the target class were caught; false negatives = real cases the model missed. Do not state the target class, the baseline behind "66 → 28", the dataset, or the method until they are Verified. Example phrasing: "97.20% accuracy: about 97 of every 100 predictions were correct."
- Gaps are `TODO(content)`; never filler, never plausible-sounding guesses.

---

## 1. Project architecture

### 1.1 Technology decisions
Each choice was evaluated on performance, maintainability, complexity, and fit. "Revisit" = the evidence that reopens the decision. Decisions stand unless measured evidence reopens them; no technology is added because it is popular.

| Technology | Decision | Why | Revisit if |
|---|---|---|---|
| Next.js (App Router) + TypeScript strict | **Adopt** | Server Components keep client JS low; static generation; file routes for case studies; metadata API for SEO; Vercel deploy | Empty-shell mobile Lighthouse < 90 at Step 1 → evaluate Astro |
| Tailwind CSS + CSS-variable tokens | **Adopt** | Zero runtime; tokens map 1:1 to utilities; consistent spacing/colour | — |
| `next/font` self-hosted fonts | **Adopt** | No external requests; automatic fallback metrics reduce CLS | — |
| Canvas2D hero field (no 3D library) | **Adopt** | A projected point cloud needs no scene graph; ~10 KB vs hundreds of KB | Step 7 gate |
| Three.js / React Three Fiber | **Defer (not in baseline)** | Heavy dependency tree for an effect Canvas2D can deliver; biggest Lighthouse risk on low-end mobile | Step 7 gate: documented visual gap that 2D cannot close + agreed chunk budget + verified low-end fallback. Try a lighter WebGL helper before R3F |
| Framer Motion | **Not in baseline** | CSS transitions + WAAPI + small hooks cover every motion in §5 | A needed interaction (e.g. shared-layout transition) is unreasonable in CSS → `LazyMotion` + `domAnimation` only |
| Lenis / smooth-scroll libs | **Reject** | Native scroll is best for accessibility, anchors, find-in-page, and performance. Use `scroll-behavior: smooth` guarded by reduced-motion | — |
| shadcn/ui | **Reject as dependency** | Own tokens and primitives; few complex widgets on this site | One genuinely complex widget → copy one primitive, re-token it, log it |
| Radix primitives | **On demand** | Only for an a11y-hard widget | — |
| Content as typed TS modules | **Adopt** | One source feeds cards, case pages, terminal, JSON-LD | — |
| MDX | **Defer** | No blog yet | Blog or long-form writing added |
| GitHub data | **Adopt (simplifiable): server-side fetch + fallback JSON; build-time/static allowed** | Token stays server-side, resilient to API failure; complexity must stay proportionate to the UX value (§1.2) | Runtime handling becomes disproportionate → build-time or curated static data |
| Contact | **Adopt: obfuscated text enhanced to `mailto:` + copy button, no form** | No backend, no spam surface, readable without JS | — |
| Vitest, Playwright + axe, Lighthouse CI | **Adopt (dev-only)** | Zero runtime cost; enforces §9, §10 | — |
| pnpm, Node LTS pinned (`.nvmrc`, `engines`) | **Adopt** | Strict, reproducible installs | — |
| Hosting: Vercel | **Adopt** | Native Next.js support | — |

### 1.2 Rendering strategy
All routes statically generated. Client JavaScript exists only in the islands listed in §7. No client-side data fetching on load. No third-party scripts.

**GitHub data:** server-side only and resilient (timeout, try/catch, committed fallback JSON); a page never depends on it to render. Default: server fetch with `revalidate: 86400`. **Simplification gate:** if handling this at runtime needs more than one env var, any dynamic rendering, or error paths that can alter page output (complexity disproportionate to the UX value of fresh repo data), switch to a build-time fetch (refreshed on deploy) or a hand-curated static list. Decide and log at Step 5.

### 1.3 File structure
```
repo/
├─ CLAUDE.md                     # Claude Code rules (short)
├─ docs/CLAUDE_CONTEXT.md        # this file
├─ public/                       # résumé PDF, favicon, static assets
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx  page.tsx  not-found.tsx
│  │  ├─ projects/[slug]/page.tsx          # case studies
│  │  ├─ sitemap.ts  robots.ts  opengraph-image.tsx
│  │  └─ globals.css                       # imports styles/*
│  ├─ components/
│  │  ├─ ui/            # Button, TextLink, Chip, Readout, RedlineMeter, TimingBoard, Hairline, InkStroke, BladeSeparator, Seal, VerticalLabel, TrackPath, Icon
│  │  ├─ layout/        # SkipLink, Header, MobileMenu, Footer, Section, Container, ScrollProgress, MotionToggle
│  │  ├─ sections/      # Hero, Projects, Experiments, About, Skills, Timeline, GitHubActivity, Contact
│  │  ├─ interactive/   # Cursor, HeroField, TypedLine, PipelineExplorer, Terminal, TelemetryTrace
│  │  └─ case-study/    # CaseStudyLayout, MetricList, StageList
│  ├─ content/          # site.ts projects.ts experience.ts skills.ts pipeline.ts terminal.ts (typed data)
│  ├─ lib/              # github.ts seo.ts env.ts cn.ts terminal/ (parser, registry) quality.ts (adaptive tiers)
│  ├─ hooks/            # usePointerFine, usePrefersReducedMotion, useMotionPreference
│  └─ styles/           # tokens.css base.css
├─ tests/               # unit/ e2e/ tokens.contrast.test.ts
├─ .env.example  .nvmrc  lighthouserc.json
└─ (config: tsconfig, eslint, prettier, vitest, playwright, next, tailwind)
```

### 1.4 Data flow
`content/*` (typed) → server components → minimal serialisable props → client islands. Client islands never import `content/*` directly (prevents shipping data twice). The terminal reads the same content through props, so it can only say true things.

---

## 2. Design system

**Priority order:** clarity > credibility > performance > expression. Restraint budget: AI/ML content is the focal point of every viewport, with at most one prominent F1 device and one prominent Samurai device; everything else stays quiet (§2.7).

### 2.1 Composition
- Asymmetric 12-column grid with deliberate negative space (ma: the empty margin is a layout decision, not leftover). Text sits left/low; the field and readouts occupy the right/behind. One focal element per viewport.
- Surfaces are sharp (radius 0). Controls (buttons, chips, inputs) use radius 2px. Flagship surfaces may carry one chamfered corner (`--cut-size`), the only non-orthogonal surface shape. Hierarchy comes from border, background step, and geometry, never shadow. No glass, no gradient washes. One static radial vignette is allowed in the hero.
- Colour proportions: ~60% carbon surfaces, ~30% bone text and hairlines, ≤10% vermilion. These are colour proportions, unrelated to the 50/30/20 influence hierarchy. `--data` appears only in charts and telemetry traces.
- Cards are **not** identical: flagship cards are large with metrics; secondary projects are compact timing-board rows. Project lists use a starting-grid arrangement: flagships on the front row, offset by one column; secondary projects behind them.
- Layer influences, never zone them (§2.7).

```
Hero (desktop)
┌─────────────────────────────────────────────────────────────┐
│ [seal]   Projects  Experiments  Skills  Contact    [motion] │
│                                              ·   ·      ╱   │
│                                          ·     ·   ·   ╱    │
│                                          (HeroField)  ╱ blade│
│  SAI SANDESH BODUKURI                               ╱       │
│  Declarative headline            ┌─────────────────────┐    │
│  typed support line              │ telemetry (true data)│    │
│  [View projects]  GitHub         └─────────────────────┘    │
│ ═══ lap line ═════════════════════════════════ S1/8 ═══     │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Approved patterns
**Purpose rule.** Every device states a purpose.
- *Functional:* a real value, a comparison, wayfinding, chronology.
- *Aesthetic (allowed when restrained, intentional, and subordinate):* visual hierarchy · atmosphere · cultural/design reference · identity · composition · transition/boundary · interaction affordance.

Purely visual elements (an ink-brush texture, a blade divider, racing-line geometry, the lattice) are fine and need not encode data. Data-bearing elements must be truthful (§2.4). A device with no stated purpose, or one that competes with AI/ML content, is cut. Nothing outside this catalogue and the §2.4 vocabulary ships without the §2.6 change process and the §2.7 review.

| Pattern | Influence | Purpose | Rules |
|---|---|---|---|
| Hairline section rule | Samurai + F1 | Section boundary | h2 + `--stroke-hair` line to the grid edge; no eyebrow labels |
| EdgeSweep | F1 | Interactive affordance | Interactive cards/links only; mirrors `:focus-visible` |
| Readout | F1 + AI | A real value | Mono tabular value + sentence-case label; short code labels (≤4 chars, e.g. "S3", "ms") allowed only here and in TimingBoard |
| RedlineMeter | F1 | A real metric against its scale | 20 segments; value in `--accent`, track in `--line-2`; `<meter>` with visible value; Verified metrics and system values only; never for skills; the accent marks the value, not danger |
| TimingBoard | F1 | Tabular comparison | Semantic table, hairline rows, right-aligned tabular numerals; for secondary projects, skill groups, repos, stack summaries |
| StartingGrid layout | F1 + Samurai | Hierarchy | Flagships on the front row, offset one column; others behind |
| LapLine + sector ticks | F1 | Wayfinding | §5.3 |
| TrackPath | F1 + Samurai | Chronology, composition; the path may also read as pure racing-line geometry | Abstract single-path SVG (never a real circuit), ≤2 KB, nodes at timeline entries, ink-weight stroke |
| TelemetryTrace | F1 + AI | A real data series | Real data only (anomaly replay, repo activity); decorative traces are unlabelled and `aria-hidden` |
| HeroField flow-field | AI + F1 | Signals an AI system | Reads as embedding space and airflow (§7.1) |
| PipelineExplorer, Terminal, architecture diagrams | AI | System structure | §7; diagrams are inline SVG using stroke tokens |
| Chip, MetricList | AI | Stack tags; results with plain-language meaning | §7.4 |
| Seal (hanko-style mark) | Samurai | Identity and flagship endorsement | "SB" monogram in a vermilion square, slight hand irregularity baked into the geometry; logo, favicon, footer closing mark, flagship badge only |
| InkStroke | Samurai | Hierarchy, transition/boundary, atmosphere (may be purely visual) | Variants `blade` (hero diagonal), `divider`, `rail`; vermilion only for the hero blade and the seal; quiet strokes use `--line-2` or `--fg-3`; each unique path ≤1.5 KB, reused via `<use>` |
| BladeSeparator | Samurai | Transition/boundary, cultural reference (may be purely visual) | One diagonal cut at `--cut-angle`; at most 3 per page; other boundaries are straight hairlines |
| Chamfered surface | Samurai + F1 | Hierarchy, cultural/design reference | One cut corner (`--cut-size`); static `clip-path` on a child so focus rings are never clipped |
| VerticalLabel | Samurai | Composition, cultural/design reference | Latin text, `writing-mode: vertical-rl`, ≤3 words, one per viewport; never the only carrier of meaning |
| Lattice surface | Samurai + AI | Atmosphere, cultural/design reference (may be purely visual) | Asanoha-derived triangular lattice (also reads as a graph mesh); static SVG tile ≤1 KB, opacity ≤`--pattern-alpha`, ≤2 surfaces, never behind body text |
| Ink grain (optional) | Samurai | Atmosphere (may be purely visual) | ≤4 KB tile, ≤1 surface, static |
| Kanji accent (optional) | Samurai | Meaning | §2.4 rules |

### 2.3 Rejected defaults (do not reintroduce)
Eyebrow labels above every heading · numbered markers (01/02) except genuine sequences (pipeline stages, timeline, the lap line's sectors) · small all-caps tracked labels (all-caps is for Big Shoulders display headings; the only exception is a ≤4-character code label inside Readout/TimingBoard) · "→" appended to links · middle-dot meta strings · identical rounded cards with soft shadows · per-section fade-slide-up reveals · hover transitions on non-interactive elements · neon glows · skill percentage bars · stock 3D/particle backgrounds on every section · a theme assigned to a section ("the F1 section", "the Samurai section") · checkered flags, helmets, car silhouettes, tyre or pit-wall imagery, real circuit outlines, team colours · katana icons, armour, cherry blossom, torii, rising-sun motifs, Samurai figures, faux-Japanese display fonts, decorative kanji.

### 2.4 F1 and Samurai vocabulary
Both are visible, original, and restrained. Every device serves at least one purpose from §2.2 (hierarchy, atmosphere, cultural/design reference, identity, composition, transition/boundary, interaction affordance, or a functional role). Purely visual elements are allowed; they never carry data, and they never compete with AI/ML content.

**F1 / motorsport (original abstractions only):** telemetry traces · sector/lap indicators · timing-board-inspired layouts · racing-line geometry and abstract track/path shapes · starting-grid structures · aero/airflow lines · RPM/redline-style indicators · engineering readouts · lap-progress navigation · technical condensed typography with tabular numerals. Not allowed: F1 logos or wordmarks, liveries, proprietary graphics, official circuit artwork, real circuit outlines.
- **Truthful telemetry:** every value is real (build date, repo count, point count, a Verified metric) or the element is decorative, carries no values, and is `aria-hidden`.
- Sector numbering (S1…S8) is allowed only in the lap line, because page sections are a real sequence.

**Samurai / Japanese craftsmanship:** sumi-e-inspired ink strokes · a hanko/seal-inspired mark · blade-like diagonal geometry and separators · one restrained Japanese geometric pattern reference (asanoha-derived lattice) · restrained ink texture · asymmetrical editorial composition and deliberate negative space (ma) · extremely limited meaningful kanji.
- **Kanji:** default none; at most 3 site-wide. Each must carry meaning relevant to its content, have a visible or accessible English gloss and `lang="ja"`, be checked against a dictionary or native speaker before use, and be approved in §17. Rendered as inline SVG or one subsetted glyph; never a CJK webfont. Candidates (not approved): 道 (michi: path, way), 間 (ma: interval, negative space), 技 (waza: craft, technique).
- **Ink and texture** are baked into static SVG geometry or a tiny tile. No runtime SVG filters (feTurbulence, feDisplacementMap) and no blend modes on large areas.
- Not allowed: anime aesthetics, character illustrations, excessive katana imagery, armour, cherry blossom, torii, rising-sun motifs, faux-Japanese display fonts, characters used only because they look Japanese.

### 2.5 Effect register (every effect must appear here)
| Effect | Purpose | Trigger | Reduced motion |
|---|---|---|---|
| Hero load sequence (the one orchestrated moment; includes the blade-stroke draw, `--dur-draw`) | Establish reading order and direct the eye from headline to field | Once per session, ≤900 ms | Instant |
| HeroField drift | Signals "AI system" (flow-field reads as embedding space and airflow), ambient | Auto; paused offscreen/hidden/toggled | One static frame |
| Typed support line | States 3 capabilities | Once, then holds | Final text shown |
| Scroll progress (lap line) | Wayfinding | Scroll (passive) | Shown, no smoothing |
| EdgeSweep | Affordance + keyboard parity | Hover / `:focus-visible` | Static border colour change |
| Cursor ring | Marks interactive targets | Fine pointer only | Not rendered |
| Pipeline stage change | Shows which stage is active | User action, 240 ms | Instant |
| Terminal output | Shows state change | User action | Same (no animation) |
| TelemetryTrace playback (Experiments, real data only) | Shows real model output over time | User-triggered play/step/scrub, no autoplay | No autoplay; stepping and scrubbing still work |

New effect = new row here + §17 entry, or it does not ship.

### 2.6 Change process
Before adding any colour, font, spacing value, animation style, or component pattern: check §3–§5 and §7. If absent, propose it in chat, then add it to the token file and §17 in the same change.

### 2.7 Layering and coherence
**One system, three influences.** Influence ranks creative weight, not screen area. Layer the three inside components; never assign a theme to a section. AI/ML is always the content and the focal point; F1 supplies structure and data language; Samurai supplies composition and the mark.

| Surface | AI/ML | F1 | Samurai |
|---|---|---|---|
| Hero | Vector-space flow-field, role line | Telemetry readouts (true values), lap line | One vermilion blade stroke, seal in the header, asymmetry and negative space |
| Project cards | Models, stack, metrics | Timing-board hierarchy, RedlineMeter for a Verified metric, starting-grid layout | Ink divider, chamfered flagship corner, seal as flagship badge |
| Case studies | Architecture diagram, results | MetricList readouts, sector-style stage list | Vertical label, ink rail, generous ma |
| Experiments | Pipeline, terminal, model output | TelemetryTrace of real data, replay controls | Quiet lattice surface, negative space |
| Skills | Grouped capabilities | TimingBoard table | Asymmetric offset, vertical label |
| Timeline | Education and experience content | TrackPath rail, sector nodes | Ink-weight rail stroke, restrained spacing |
| GitHub | Repo data | TimingBoard rows, TelemetryTrace of real activity | Hairline rhythm |
| Contact + footer | Role line | Timing-style contact rows | Seal as closing mark, negative space |

**Shared primitives** (what makes it one system):
1. **One line language:** `--stroke-hair` (hairlines, track lines, diagram edges), `--stroke-trace` (telemetry, diagrams), and ink strokes, all in the same palette.
2. **One angular vocabulary:** orthogonal lines plus a single diagonal, `--cut-angle`. Blade separators, racing-line kinks, ink strokes, chamfers, and the flow-field's streamline direction all reuse it.
3. **One accent, one meaning cluster:** vermilion is hanko ink, racing attention colour, and the AI "active/selected" state. It is never used for anything else.
4. **One grid:** asymmetric 12 columns; negative space is a layout decision.
5. **One type system:** condensed display + IBM Plex; tabular mono numerals.
6. **One motion verb:** decisive and directional; strokes draw once, in one direction.

**Coherence tests** (every new visible component, at design review):
1. **Layering:** carries at least two influences, and AI/ML content is the focal point (AI/ML is visible above the fold on every page).
2. **Restraint budget:** per viewport, at most one prominent F1 device and one prominent Samurai device. A prominent device is one a visitor would describe unprompted (the blade stroke, the hero seal, a RedlineMeter group, the track path). Hairlines, separators, tabular numerals, and the logo seal (≤40 px, identity) are structure, not devices.
3. **Purpose:** each device states at least one purpose from §2.2. Aesthetic purposes are enough; a device need not encode data.
4. **Fan-site test:** if it would look natural on an F1 fan site or an anime site, reject it.
5. **Primitives:** uses only the shared line, angle, and colour tokens (§3).
6. **Registered:** motion appears in §2.5; any device outside the §2.2 catalogue and the §2.4 vocabulary goes through §2.6 and this review before it ships.
7. **Subordination:** decorative elements never compete with AI/ML content. They do not overlap or sit behind text blocks, diagrams, or metrics at competing contrast; textures stay at or below `--pattern-alpha`; any prominent device sits outside the reading area of the AI/ML content. If they compete, reduce or remove the decoration.

---

## 3. Design tokens

Declared once in `src/styles/tokens.css`, exposed to Tailwind through its theme mechanism (v4 `@theme`; v3 `theme.extend` referencing the variables). Check the installed Tailwind version at Step 1. Tailwind v4 reserves `--text-*` for font sizes and `--color-*` for colours, so raw text-colour tokens are named `--fg-*` (not `--text-*`) and are aliased into the theme as colours.

**Token policy.** Tokenize repeated or design-system-level values: colour, type families and scale, spacing scale, radii, durations and easings, breakpoints, layout widths, z-index layers, cursor parameters. Do not invent tokens for isolated, implementation-specific values (SVG or canvas geometry, particle counts, a one-off offset or aspect ratio, a single component's internal grid): keep them as local constants or arbitrary utilities with a short comment saying why. Two checks: a value used in 3+ places, or that must stay consistent across components, becomes a token; UI colours always come from tokens, and canvas/SVG code reads them from CSS variables instead of hard-coding hex.

```css
:root {
  color-scheme: dark;

  /* Surfaces (carbon) */
  --bg-0: #0A0B0D;   /* page */
  --bg-1: #101216;   /* alternate section */
  --bg-2: #161A1F;   /* cards, terminal */
  --line-1: #262B33; /* hairline (decorative) */
  --line-2: #3A414B; /* strong line (decorative, ~1.7–1.9:1; never the sole boundary of a control) */

  /* Text colour (contrast measured on --bg-2; enforced by tests/tokens.contrast.test.ts) */
  --fg-1: #ECE8DF; /* bone, primary  ~14:1 */
  --fg-2: #A9A59B; /* secondary      ~7:1  */
  --fg-3: #8C887F; /* muted          ~4.9:1; only at ≥14px, never for 13px mono */

  /* Accent */
  --accent: #E34234;      /* vermilion: fills, lines, large text (~4.8:1 on --bg-0) */
  --accent-text: #F0604D; /* small text on any surface (~5.4:1+) */
  --on-accent: #0A0B0D;   /* label on accent fill (~4.8:1) */
  --data: #6FA8B8;        /* charts / telemetry traces only (~6.6:1+) */
  --focus: #ECE8DF;       /* focus ring */

  /* Spacing (4px base) */
  --space-1: .25rem; --space-2: .5rem;  --space-3: .75rem; --space-4: 1rem;
  --space-5: 1.5rem; --space-6: 2rem;   --space-7: 3rem;   --space-8: 4rem;
  --space-9: 6rem;   --space-10: 8rem;

  /* Layout */
  --container-max: 75rem;
  --prose-max: 66ch;
  --gutter: clamp(1rem, 4vw, 2.5rem);
  --section-y: clamp(4.5rem, 11vw, 9rem);
  --nav-h: 3.5rem;

  /* Shape */
  --radius-surface: 0;
  --radius-control: 2px;
  --sweep-w: 2px;
  --stroke-hair: 1px;       /* hairlines, track lines, diagram edges */
  --stroke-trace: 1.5px;    /* telemetry traces, diagram lines */
  --cut-angle: 12deg;       /* the single diagonal: blade separators, racing-line kinks, ink strokes */
  --cut-size: .75rem;       /* chamfer on flagship surfaces */
  --pattern-alpha: .06;     /* opacity ceiling for lattice / grain */

  /* Type: --font-*, --text-* and line-height tokens are defined in this file per §4 */

  /* Motion */
  --dur-instant: 80ms;
  --dur-fast: 140ms;
  --dur-base: 240ms;
  --dur-slow: 420ms;
  --dur-draw: 600ms;         /* ink / blade stroke draw-on, once */
  --dur-sequence: 900ms;     /* hero sequence, total */
  --ease-out: cubic-bezier(.16, 1, .3, 1);      /* accelerate in, settle fast */
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);
  --ease-linear: linear;     /* progress indicators only */

  /* Cursor */
  --cursor-dot: 6px;
  --cursor-ring: 34px;
  --cursor-ring-active: 52px;
  --cursor-stroke: 1.5px;
  --cursor-tau: 70ms;        /* smoothing time constant */
  --cursor-idle: 120ms;      /* stop rAF after this idle time */

  /* Stacking */
  --z-base: 0; --z-sticky: 40; --z-progress: 50; --z-overlay: 80; --z-cursor: 100;
}
```
**Breakpoints (min-width, mobile-first):** sm 30rem · md 48rem · lg 64rem · xl 80rem · 2xl 96rem.
**Button rule:** primary = `--on-accent` text on `--accent` fill (bone text on vermilion fails AA). Small accent text uses `--accent-text`.
**Implementation note (D-037):** in `tokens.css`, tokens in Tailwind-owned namespaces (radius, type scale, fonts, breakpoints) are declared in `@theme static` instead of `:root`; values are unchanged.

---

## 4. Typography

| Role | Family | Weights | Use |
|---|---|---|---|
| Display | **Big Shoulders Display** (variable) | 700–800 | Name and h1/h2 only, uppercase, tight leading |
| Text | **IBM Plex Sans** | 400, 600 | Body, UI, long-form |
| Technical | **IBM Plex Mono** | 400, 500 | Readouts, terminal, code, metrics values (tabular figures) |

Tokens: `--font-display`, `--font-text`, `--font-mono`. Load via `next/font/local` from committed OFL WOFF2 files in `src/fonts` (D-032), latin subset, `display: swap`. Preload display + text only. Max 3 families, ≤5 files. Fallbacks: display `"Arial Narrow", "Roboto Condensed", sans-serif`; text `system-ui, sans-serif`; mono `ui-monospace, monospace`.

Fluid scale (define as `--text-*` tokens at Step 1):
| Token | Size | Line-height | Use |
|---|---|---|---|
| `--text-hero` | `clamp(3.5rem, 1.5rem + 9vw, 9rem)` | 0.92 | Name in hero |
| `--text-display` | `clamp(2.25rem, 1.6rem + 3.2vw, 4.5rem)` | 0.95 | h2 |
| `--text-title` | `clamp(1.375rem, 1.2rem + .9vw, 2rem)` | 1.15 | h3 |
| `--text-lead` | `clamp(1.125rem, 1.05rem + .4vw, 1.375rem)` | 1.5 | Intro paragraphs |
| `--text-body` | `clamp(1rem, .95rem + .25vw, 1.125rem)` | 1.6 | Body |
| `--text-small` | `.875rem` | 1.5 | Secondary |
| `--text-mono` | `.8125rem` | 1.5 | Readouts, terminal |

Rules: line length ≤66ch; body never below 16px; mono never below 13px and then in `--fg-2` or brighter (`--fg-3` needs ≥14px); no italics for emphasis in display; labels are sentence case; use `font-variant-numeric: tabular-nums` for all numbers in readouts; letter-spacing only on display (≤0.01em); a headline never accents a single word in a different colour; kanji per §2.4 (inline SVG or one subsetted glyph, never a CJK webfont); short ≤4-character code labels are allowed inside Readout and TimingBoard only.

---

## 5. Animation and motion system

**Character:** F1 motion is decisive: fast acceleration, quick settle, no bounce, no overshoot. Strokes draw once, in one direction, like a single brush pass: no looping, no wobble. One orchestrated moment (hero load); everything else answers a user action.

- **Allowed properties:** `transform`, `opacity`, `clip-path` (small elements), `stroke-dashoffset` (one-time SVG stroke draw). Edge sweeps use a pseudo-element with `transform: scaleX()`.
- **Forbidden:** animating layout (width/height/top/left/margin), animating `box-shadow`, large blur filters, blanket `will-change`, infinite decorative loops other than the HeroField.
- **Durations/easing:** only tokens (`--dur-*`, `--ease-*`). Hover/focus: `--dur-fast`. State change: `--dur-base`. Hero sequence ≤ `--dur-sequence`. Stagger ≤40 ms, ≤6 items.
- **Progressive enhancement:** content is fully visible without JS. Motion classes are added by JS after hydration.
- **LCP safety:** the hero name/headline (the LCP element) is server-rendered and visible from first paint. The load sequence animates only secondary elements, or non-opacity properties of the headline (clip/transform); it never starts the headline at `opacity: 0`.
- **TypedLine:** no blinking caret (static caret or none).

### 5.1 Reduced motion and pause control
- `prefers-reduced-motion: reduce` → no cursor, HeroField renders one static frame, typed line shows final text, ink and blade strokes render fully drawn, transforms replaced by instant or ≤120 ms opacity changes.
- **MotionToggle** (visible control: header on desktop; footer and mobile menu on small screens) lets anyone pause ambient motion (WCAG 2.2.2). State persists in `localStorage` (wrapped in try/catch). Default off when reduced-motion is set.
- HeroField also pauses when offscreen (IntersectionObserver) or tab hidden (`visibilitychange`).

### 5.2 Cursor spec (desktop only)
- Active only when `(hover: hover) and (pointer: fine)`, no reduced-motion, motion toggle on, `forced-colors` not active, and JS initialised. Otherwise the native cursor is untouched.
- Dot (`--cursor-dot`) follows instantly; ring (`--cursor-ring`) follows with frame-rate-independent smoothing: `alpha = 1 − exp(−dt / --cursor-tau)`.
- States: `default` · `interactive` (hover on `a, button, [role=button], summary`: ring grows to `--cursor-ring-active`, accent stroke) · `text` (inputs, terminal, selectable prose: custom cursor hidden, native text cursor shown) · `none` (`[data-cursor="none"]`).
- Native cursor is hidden only after the first pointer move proves the ring is live; if JS fails it stays visible. Layer is `pointer-events: none`, `transform: translate3d`, no blend modes. One rAF loop, running only while the pointer moves, stops after `--cursor-idle`.

### 5.3 Scroll progress ("lap line")
Thin fixed line (top edge), `aria-hidden`, width driven by CSS scroll-driven animation where supported, with a small passive scroll-listener fallback. Section ticks mark section boundaries; the current section name shows beside it on desktop. Uses `--ease-linear`; no smoothing.

### 5.4 Hover/focus
EdgeSweep: 2px line scales in from the leading edge in `--dur-fast`. Same effect on `:focus-visible`. Wrap hover-only styling in `@media (hover: hover)`.

---

## 6. Responsive rules

- Mobile-first. Equal quality on mobile and desktop; mobile is designed first, not collapsed from desktop.
- Grid: 4 columns < md, 8 at md, 12 at lg+. Container `--container-max`, gutters `--gutter`.
- Test widths: **320** (reflow floor), 360, 390, 768, 1024, 1440. No horizontal scroll at 320. Content works at 200% text zoom.
- Touch targets ≥44×44 CSS px (project standard; WCAG 2.2 AA minimum is 24).
- No hover-only functionality. Every hover effect has a focus and a tap equivalent.
- Use `dvh` not `vh`; honour safe-area insets; hero height `min(100dvh, 56rem)`; check landscape phones.
- **Header:** inline links ≥ md; below md a menu button toggling a `nav` panel (focus managed, Esc closes).
- **HeroField:** density by tier (§10); pointer parallax only for fine pointers; on touch use slow idle drift or static.
- **Terminal on mobile:** full width; quick-command **buttons** (help, projects, skills, experience, run inference, github) so typing is optional; 16px input font to prevent iOS zoom.
- **PipelineExplorer on mobile:** stages stack vertically; tap to select; no hover reliance.
- **Cards:** one column < md; flagship cards span full width at every breakpoint.
- Images and canvases reserve space (aspect-ratio) to prevent layout shift.

---

## 7. Component architecture

**Rule:** Server Components by default. `"use client"` only at the leaf of the interactive islands below. Client files import only from `lib/` and `hooks/`.

| Component | Boundary | Notes |
|---|---|---|
| ui/* (Button, TextLink, Chip, Readout, RedlineMeter, TimingBoard, Hairline, InkStroke, BladeSeparator, Seal, VerticalLabel, TrackPath, Icon) | Server | Icon = inline SVG, no icon library; decorative devices carry `data-decorative` and `aria-hidden` |
| layout/Header, Footer, Section, Container, SkipLink | Server | |
| layout/MobileMenu, ScrollProgress, MotionToggle | Client (tiny) | |
| interactive/Cursor | Client | §5.2 |
| interactive/HeroField | Client, lazy | §7.1 |
| interactive/TypedLine | Client (tiny) | Full phrase in DOM for screen readers; typing is a decorative layer |
| interactive/PipelineExplorer | Client, lazy | §7.2 |
| interactive/TelemetryTrace | Client, lazy (playback only) | Static trace renders on the server; the playback island loads on demand; real data only |
| interactive/Terminal | Client, lazy | §7.3 |
| sections/*, case-study/* | Server | Pass minimal serialisable props into islands |

### 7.1 HeroField
Canvas2D, `aria-hidden`. Points have 3D coordinates projected to 2D; slow drift along a smooth flow field (reads as embedding space and airflow); optional pointer parallax; optional static streamline layer (inline SVG, ≤3 KB, `aria-hidden`). The hero's vermilion blade stroke is SVG outside the canvas. Telemetry overlay is **HTML** (not canvas) and truthful (§2.4). `lib/quality.ts` is a pure adaptive controller: tiers `high → medium → low → static`; drop a tier when p95 frame time exceeds 20 ms over 2 s; if `low` still exceeds 24 ms, freeze to a static frame. Starts after LCP (idle callback). Caps DPR. Fully functional page without it (static gradient-free fallback, headline and CTAs server-rendered).

### 7.2 PipelineExplorer (signature 1)
Stages: Input → Data → Processing → Model → Inference → Output (a genuine sequence, so numbering is allowed). A lens switch selects EEG classification or D.E.S.T.I.N.Y.; each lens supplies stage text from `content/pipeline.ts`. Inline SVG; stages are `<button>`s with arrow-key navigation, `aria-pressed`/`aria-expanded`, and a detail panel. Understandable to a non-researcher: each stage has a one-line plain-language caption and a technical line. Works with no hover. Stage text uses only Verified facts (§0); where detail is Pending, a stage shows its generic name and plain-language caption only.

### 7.3 Terminal (signature 2)
Commands: `help`, `projects`, `skills`, `experience`, `github`, `contact`, `run inference`, `clear`. Output is built from the same content modules.

**Secondary discovery feature.** The terminal is never the only route to anything: every fact it can print is already reachable through normal page content. It is not in the primary nav or the hero, and no task requires it; it lives in the Experiments section. If it fails to load or JS is off, nothing is lost.
- `run inference` replays a **recorded** run and is labelled "recorded run, not a live model". The output must be real output from one of the owner's systems (Optional until supplied); until then the command is not registered. No network calls, no API keys.
- Input is parsed against a fixed registry (`lib/terminal/`); no `eval`, no `dangerouslySetInnerHTML`; output rendered as text nodes; input capped at 200 chars; unknown command → helpful message listing `help`.
- A11y: labelled input, output region `role="log"` with `aria-live="polite"`, no autofocus on load, no focus trap, Tab always leaves (no tab-completion), ArrowUp/Down history, Esc blurs. `<noscript>` states that the terminal needs JavaScript and that the same information is available elsewhere on the page.

### 7.4 Flagship case-study structure
Every flagship follows this order: **Problem → Why it mattered → Approach → System / architecture → Implementation → Results → Lessons → Demo / repository.**

| Part | Content rule |
|---|---|
| Problem | One plain-language paragraph; the page opens with a one-sentence "In plain terms" summary |
| Why it mattered | Who is affected and what was at stake |
| Approach | The method chosen and why; only alternatives the owner actually considered |
| System / architecture | Inline SVG diagram + caption; can reuse the PipelineExplorer lens (§7.2) |
| Implementation | Stack, the owner's contribution, 3–5 technical highlights |
| Results | Exact supplied numbers + plain-language meaning (metric explanation rule, §0) + what they were measured against (only if Verified) |
| Lessons | The owner's own words only |
| Demo / repository | Live link and repo link, or a plain statement that it is not public |

Rules: a part with no Verified content is omitted from the rendered page (never filled); define specialist terms on first use; a non-specialist recruiter should be able to say what the project did and why the numbers matter after one read. Secondary projects use compact card fields instead: problem, solution, technologies, contribution, technical highlights, results, links (Verified only). Minimum content for launch: §17.2.

---

## 8. Dependency rules

**Baseline runtime:** `next`, `react`, `react-dom`. Everything else is dev-only (typescript, tailwindcss + its PostCSS plugin, eslint + next config + jsx-a11y, prettier, vitest, playwright, @axe-core/playwright, @lhci/cli).

**Gate for any new dependency** (all required, recorded in §17): (1) the need in one sentence; (2) measured bundle delta; (3) native/CSS/own-code alternative considered; (4) licence, maintenance state, transitive count; (5) a11y/security impact.

**Auto-reject:** icon libraries, animation libraries (unless §1.1 trigger), UI kits, state libraries, date libraries, lodash, axios, CSS-in-JS runtimes, smooth-scroll libraries, particle libraries, 3D libraries (until Step 7 gate), analytics/trackers, chat/embed widgets, font-icon packs.

**Hygiene:** pin exact versions; commit lockfile; never trust remembered version numbers (check with `pnpm view <pkg> version` when adding); `pnpm audit` in CI; no unknown postinstall scripts. Write `cn()` yourself (5 lines).

---

## 9. Accessibility rules

Target WCAG 2.2 AA minimum, enforced by tests plus manual checks.
1. Landmarks (`header`, `nav`, `main`, `footer`), a skip link as the first focusable element, one `h1` per page, sequential headings, `lang="en"`.
2. Visible focus on every interactive element: `outline: 2px solid var(--focus); outline-offset: 3px`. Never `outline: none` without replacement.
3. Everything operable by keyboard; logical tab order; no keyboard traps; Esc closes overlays and returns focus.
4. Contrast: all token pairs verified by `tests/tokens.contrast.test.ts` (text ≥4.5:1, large text and UI ≥3:1). Never convey meaning by colour alone.
5. Motion per §5.1: reduced-motion honoured, pause control provided, no flashing.
6. Canvas and decorative SVG are `aria-hidden`; informative SVG has `role="img"` + accessible name; informative images have alt text, decorative `alt=""`.
7. Links have descriptive text; external links get `rel="noopener noreferrer"` and a visually-hidden "(opens in new tab)".
8. Support `@media (forced-colors: active)` (borders and focus remain visible) and `prefers-contrast: more` (borders use `--fg-3` or brighter, text uses `--fg-1`).
9. Reflow at 320px, 200% zoom, user text-spacing overrides do not break layout.
10. Custom cursor never replaces the native text cursor and never blocks interaction (§5.2).
11. Typed text and rotating text expose the full phrase to assistive tech and do not repeat indefinitely.
12. Terminal and PipelineExplorer meet §7.2 and §7.3 specifics.
13. Manual pass at Step 8: NVDA + Firefox/Chrome, VoiceOver on iOS Safari.
14. Decorative devices (ink strokes, separators, seal ornaments, lattice, streamlines, decorative traces) carry `data-decorative` and are `aria-hidden`. The logo seal link has the accessible name "Sai Sandesh Bodukuri, home"; the flagship seal badge has visible text "Flagship".
15. Never apply `clip-path` (chamfers, blade cuts) to an element that carries a focus outline; clip a child or pseudo-element so focus rings are never cut.
16. VerticalLabel: ≤3 words, never interactive, never the only carrier of meaning. Kanji: `lang="ja"` plus a gloss (§2.4). RedlineMeter: native `<meter>` with a visible numeric value; colour is never the only carrier.
17. Interactive controls never rely on `--line-1/2` alone for their boundary (those are decorative, below 3:1). Use a filled surface, a border in `--fg-3` or brighter, or text/accent that meets 3:1. The contrast test covers control borders.

---

## 10. Performance targets (budget zones)

Measured on the **production build**, mobile preset (simulated slow 4G, mid-tier phone CPU). All figures are **targets** until Step 1's empty-shell baseline and Step 3's first real hero build calibrate them. Optimise what measurements show, not what the architecture might cost. A missed target triggers investigation and, if kept, a §17 entry with the reason; it never passes silently.

**First-load JS (gzip), every route, framework included:** ≤170 KB = target · 170–200 KB = warning (investigate, record the cause) · >200 KB = hard investigation gate (no further features on that route until understood and either fixed or explicitly accepted in §17).

Accessibility is not a target: zero axe violations is required (§9, §13).

| Metric | Budget |
|---|---|
| Lighthouse mobile | Performance ≥ 90 where realistically achievable (goal 95+); Accessibility 100; Best Practices ≥ 95; SEO 100 |
| LCP | ≤ 2.0 s lab (field p75 ≤ 2.5 s) |
| TBT | ≤ 150 ms |
| CLS | ≤ 0.02 lab (field ≤ 0.1) |
| INP | ≤ 200 ms field; terminal command → output ≤ 50 ms |
| First-load JS (gzip) | Zones above; identical for every route |
| Lazy chunks (gzip) | any ≤ 40 KB; HeroField ≤ 20, Terminal ≤ 25, PipelineExplorer ≤ 30 |
| CSS (gzip) | ≤ 25 KB total |
| Fonts | ≤ 3 families, ≤ 5 files, ≤ 115 KB woff2 total (calibrated at Step 1: measured 111.9 KB, D-032); preload display + text only |
| Images | none above the fold; each ≤ 120 KB, AVIF/WebP via `next/image`, explicit dimensions |
| Visual-device assets | Ink strokes, seal, separators, lattice, streamlines: inline SVG, ≤ 12 KB gzip site-wide; each unique path ≤ 1.5 KB; lattice tile ≤ 1 KB; optional grain tile ≤ 4 KB (AVIF/WebP, may sit above the fold); all static; no runtime SVG filters or blend modes on large areas; chamfer `clip-path` on ≤ 6 elements per viewport |
| Third-party requests | 0 at load |
| HeroField | ≤ 4 ms scripting/frame at `medium` on mid-tier mobile; points: high ≤ 600, medium ≤ 300, low ≤ 120; DPR cap 1.5 (high) / 1 (others) |

Rules: lazy-load all islands below the fold and HeroField after LCP; single rAF loop per effect, paused when not visible; passive listeners; no layout reads in animation loops; no font swapping that shifts layout; prefer CSS over JS; hero must work with JS disabled.

---

## 11. SEO requirements

- Metadata via the App Router metadata API on every route: unique `title` (template `%s · Sai Sandesh Bodukuri`), description (≤160 chars, specific), canonical URL (`NEXT_PUBLIC_SITE_URL`), Open Graph and Twitter card with a generated `opengraph-image`.
- `sitemap.ts` and `robots.ts`. Résumé PDF served with `X-Robots-Tag: noindex` (it contains a phone number).
- JSON-LD `Person`: name, jobTitle, url, `sameAs` (GitHub, LinkedIn). **No email or phone** in structured data. `BreadcrumbList` on case studies.
- Server-rendered, meaningful HTML for all content (the terminal adds nothing crawlers need: §7.3); semantic headings; descriptive link text; no content hidden behind interaction.
- Case-study pages have titles built from the problem and method, not just the project name.
- Core Web Vitals are part of SEO: §10 applies.
- Do not claim anything in metadata that the page does not substantiate.

---

## 12. Security rules

1. No secrets in client code. `GITHUB_TOKEN` (fine-grained, read-only, public data) is server-only: never prefixed `NEXT_PUBLIC_`. Document every variable in `.env.example`; `.env*` is git-ignored; `lib/env.ts` validates at build.
2. Terminal: fixed command registry, no `eval`/`Function`, no HTML injection, no network, length-capped input (§7.3).
3. Demos use recorded data only. No API keys, model endpoints, or user-uploaded data in the browser.
4. Headers (via `next.config`): `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, minimal `Permissions-Policy`, `frame-ancestors 'none'` (and `X-Frame-Options: DENY`), HSTS (Vercel default). CSP: ship **Report-Only** first, no `unsafe-eval`; decide on enforcement at Step 9 after verifying Next.js inline bootstrap handling.
5. External links `rel="noopener noreferrer"`. Only same-origin or allow-listed URLs rendered from content.
6. Email: server-rendered as lightly obfuscated text (e.g. `name [at] domain [dot] com`) so no-JS and screen-reader users can read it; enhanced client-side into a `mailto:` link plus a copy button. Never in JSON-LD, logs, or this file. Résumé PDF `noindex`.
7. Dependencies per §8: pinned, audited, minimal.
8. GitHub fetch: timeout, try/catch, fallback JSON; failure never breaks the build or page.

---

## 13. Testing strategy

Proportionate: test logic and contracts, not markup snapshots.

- **Unit (Vitest):** terminal parser/registry; adaptive quality controller (`lib/quality.ts`); cursor state machine; GitHub data mapper + fallback; content integrity (no empty required fields, valid URLs, only `verified` items rendered in production builds, exact supplied metric values unchanged); **token contrast test** (computes WCAG ratios for every text/surface pair in §3).
- **E2E (Playwright):** home and each case study load without console errors; nav and skip link work by keyboard; no horizontal overflow at 320/360; reduced-motion emulation (no cursor, static hero); JS-disabled render shows headline, CTAs, project content, and the obfuscated contact email; terminal basic commands; mobile menu; every `[data-decorative]` element is `aria-hidden`; focus rings are not clipped on chamfered cards.
- **Accessibility:** axe on every route at mobile and desktop viewports; manual keyboard walkthrough; screen-reader pass at Step 8.
- **Performance:** Lighthouse CI against §10 on the production build (warn on target misses; error only on the >200 KB first-load JS gate); bundle-size check from build output.
- **Manual device check:** at least one real low-end Android for HeroField (Step 7).

**Definition of Done (every batch):**
1. `pnpm check` passes (typecheck + lint + unit).
2. New logic has unit tests.
3. From Step 3: `pnpm e2e` passes for affected routes.
4. axe: zero violations; keyboard path and reduced-motion verified; new visible components pass the §2.7 coherence tests.
5. Production build checked against §10 targets (from Step 3); misses explained in §17.
6. No new dependency, design-system-level token, pattern, or effect without a §17 entry (isolated values per §3 need none).
7. Changelog (3 lines) and open items reported.

---

## 14. Implementation roadmap

Work in logical batches of tightly coupled pieces. Verify each batch against §13 before the next.

| Step | Scope | Gates / decisions | Load sections |
|---|---|---|---|
| **1. Foundation + design system** (scope frozen in §14.1) | Scaffold (Next, TS strict, Tailwind), `tokens.css`, fonts, base layout (Container, Section, SkipLink, Header/Footer shells), content types + stubs, lint/format/typecheck/Vitest, token contrast test, CI, empty-shell Lighthouse baseline | Targets calibrated and logged (§17); Next vs Astro check (D-001) | 0, 1, 3, 4, 8, 13, 15 |
| **2. Interaction infrastructure** | Cursor, ScrollProgress, MotionToggle, `usePointerFine` / reduced-motion hooks | Cursor inert on touch/reduced-motion; no CLS; state-machine unit tests | 3, 5, 6, 9, 15 |
| **3. Navigation + hero** | Header (desktop + mobile menu), hero copy and load sequence, TypedLine, HeroField (Canvas2D, tiers, fallback, pause), truthful readouts | LCP ≤ 2.0 s; HeroField chunk ≤ 20 KB; works without JS; headline copy approved | 0, 2, 4, 5, 6, 7, 9, 10 |
| **4. Projects + case studies** | Project cards (hierarchy variants), `/projects/[slug]` template following §7.4, D.E.S.T.I.N.Y. and EEG case studies, two secondary cards, metadata + JSON-LD | Only Verified content rendered; Pending items listed in a dev-only checklist; no invented text | 0, 2, 7, 11 |
| **5. Content sections** | About, Skills (grouped matrix), Experience & education timeline, GitHub (server-side + fallback, or build-time per §1.2), Contact, résumé download only if the PDF is Verified | GitHub approach logged; email handling per §12; PDF noindex | 0, 2, 7, 11, 12 |
| **6. Signature interactions + Experiments** | PipelineExplorer, Terminal (secondary, §7.3), Experiments section; anomaly-detector replay and `run inference` only if real recorded data is Verified | Chunk targets; a11y specifics §7.2/7.3; everything the terminal prints is available elsewhere on the page | 0, 2, 7, 9, 10, 12 |
| **7. Motion pass + 3D gate** | Tune sequence and transitions against the effect register; real-device HeroField test; go/no-go on WebGL with evidence | Gate criteria in §1.1; default is no-go | 2, 5, 10 |
| **8. Audit** | Full axe + screen reader, Lighthouse on prod build, SEO checks, headers/CSP report review, cross-browser (Safari iOS, Firefox, Chrome Android) | Fix list closed | 2, 9, 10, 11, 12, 13 |
| **9. Deploy** | Vercel project + env vars, domain, headers, CSP enforcement decision, sitemap submission, post-deploy LHCI, rollback plan | Budgets met in production | 1, 10, 11, 12 |

*Differences from the original draft roadmap:* signature interactions get their own step (6) so demos and content are not mixed; "3D scene integration" became a gated decision (7) because the baseline is Canvas2D.

### 14.1 Step 1: exact scope (frozen)
**In scope**
1. Scaffold: Next.js App Router + TypeScript `strict` + `noUncheckedIndexedAccess`, pnpm, Node LTS pinned (`.nvmrc`, `engines`), Tailwind wired to tokens. Verify and pin exact versions with `pnpm view`.
2. `src/styles/tokens.css` (§3 including stroke, cut, pattern, and draw tokens, + §4 type tokens) and `base.css` (reset, focus ring, `forced-colors` / `prefers-contrast` handling, reduced-motion base rules, skip-link style).
3. Fonts via `next/font`: Big Shoulders Display, IBM Plex Sans (400, 600), IBM Plex Mono (400, 500); fallbacks; preload display + text only.
4. Layout shell: `layout.tsx` (lang, metadata base, fonts), SkipLink, Container, Section (hairline h2 pattern), Header shell (static links, no mobile menu), Footer shell; a placeholder `page.tsx` with only an `h1` (name), the role line, and empty section stubs. No hero, no motion, no real sections.
5. Content layer: `content/types.ts` (including the `status` field), `site.ts` (Verified identity data), typed empty modules for projects, experience, skills. Population happens in Steps 4–5.
6. Tooling: ESLint (Next core-web-vitals + jsx-a11y), Prettier, `tsc --noEmit`, Vitest; scripts `dev`, `build`, `start`, `typecheck`, `lint`, `test`, `check`; `.env.example`, minimal `lib/env.ts`, `.gitignore`.
7. Tests: `tests/tokens.contrast.test.ts` (every text/surface pair in §3), one content-integrity test, Playwright config with one smoke + axe test of `/` at 360 and 1280 widths.
8. CI workflow running `pnpm check` and the production build; Lighthouse CI config set to warn on target misses and error only on the >200 KB first-load JS gate.
9. `CLAUDE.md` (repo root) and `docs/CLAUDE_CONTEXT.md` placed in the repo.
10. Baseline report on the empty shell: first-load JS, font transfer sizes, Lighthouse mobile. Record in §17 and calibrate §10 targets.

**Out of scope:** all visual devices (§14.3: seal, ink strokes, separators, patterns, timing and track components), cursor, motion, MotionToggle, hero/HeroField, mobile menu, case studies, GitHub fetch, terminal, pipeline, résumé, SEO beyond base metadata (title, description, `lang`), security headers and CSP (Step 9).

**Needs (content):** none.
**Exit criteria:** DoD §13 items 1, 2, 4; contrast test green; baseline recorded; empty-shell mobile Lighthouse ≥ 90 (otherwise trigger the D-001 review); no dependency beyond the §8 baseline.
**Load:** §0, §1, §3, §4, §8, §13, §15.

### 14.2 Content needed per step
A Pending item blocks a step only if it is listed here.
- **Steps 1–2:** none.
- **Step 3:** hero headline copy approval.
- **Step 4:** none to build the templates (they render Verified content only). Pending flagship narrative parts are omitted until supplied.
- **Step 5:** none. LinkedIn, CGPA display, and the résumé PDF are Optional and appear only once Verified.
- **Step 6:** none to build the components. `run inference` and the anomaly replay ship only if real recorded data is supplied.
- **Steps 7–8:** none (a low-end Android device is recommended for Step 7).
- **Step 9:** every launch blocker in §17.2 closed.

### 14.3 Where each visual device lands
| Step | Devices introduced |
|---|---|
| 1 | Tokens only (stroke, cut, pattern, draw). No devices. |
| 2 | LapLine and sector ticks (ScrollProgress), cursor |
| 3 | Seal (logo, favicon), HeroField flow-field (+ optional streamlines), hero blade stroke, truthful telemetry readouts |
| 4 | StartingGrid layout, TimingBoard rows (secondary projects), chamfered flagships, flagship seal badge, RedlineMeter for Verified EEG metrics, ink dividers, up to 3 BladeSeparators |
| 5 | TrackPath (timeline), TimingBoard (skills, repos), lattice surface (≤2), timing-style contact rows, footer seal, VerticalLabel, kanji decision |
| 6 | TelemetryTrace (only with real data), PipelineExplorer, Terminal |
| 7 | Motion pass (stroke draw timing against §2.5); restraint-budget audit per viewport |
| 8 | Full §2.7 coherence audit at 360 and 1280 px, including the fan-site test |
| 9 | None |

---

## 15. Coding conventions

- TypeScript `strict` + `noUncheckedIndexedAccess`; no `any`, no enums, no non-null `!` without a comment.
- Files: components `PascalCase.tsx`; hooks `useThing.ts`; content/lib `kebab-case.ts`. One component per file. Prefer under ~150 lines, but split by responsibility, reuse, and maintainability rather than line count: a cohesive 200-line component is fine; a 90-line component doing three jobs is not.
- Named exports; default export only where Next requires (route files). No barrel files.
- Imports via `@/` alias. No circular imports.
- Styling: Tailwind utilities that resolve to tokens for design-system-level values (§3 token policy). Isolated implementation-specific values are allowed when technically justified and commented; an arbitrary value repeated 3+ times is promoted to a token. UI colours are never hard-coded. No inline styles except dynamic CSS custom properties.
- Server by default; mark `"use client"` at the smallest leaf. Pass minimal serialisable props.
- Content in `content/*.ts` typed with `satisfies`, each item carrying `status: 'verified' | 'pending' | 'optional'`; production builds render only `verified`; no copy hard-coded in components.
- Comments explain *why*, not *what*. Follow `TODO(tag): …` format (`TODO(content)`, `TODO(perf)`, `TODO(a11y)`).
- No `console.log` in commits. Errors handled at boundaries (GitHub fetch, storage). All `localStorage` access in try/catch.
- Commits: Conventional Commits. Branch per step: `step/NN-name`. PR description = Definition of Done checklist (§13).
- Env access only through `lib/env.ts`.
- ESLint: Next core-web-vitals + `jsx-a11y`; Prettier formatting is not debated.

---

## 16. Claude context-management rules

1. **Load by step.** Start each step in a fresh chat (or fresh Claude Code session) with §0 + the step's sections from §14. Not the whole file.
2. **Kickoff template** (paste into the first message):
```
Step N — <name>. Context: CLAUDE_CONTEXT.md §0, §a, §b (below).
Repo state: <src tree, or the files this step will touch>.
Decisions since last step: <D-xxx entries>.
Task: <scope from §14>.
Return: only new/changed files, a 3-line changelog, open items.
```
3. **Output discipline.** Return only new or changed files. New files in full; edits as minimal diffs with path and surrounding context (full file if ≤150 lines). Never regenerate unchanged files. Refer to tokens by name; never re-paste `tokens.css`.
4. **Plan before code** for any batch touching >3 files: list files to create/modify, then wait for a go-ahead.
5. **Ask before** adding a dependency, token, pattern, or effect (§2.6, §8). Do not add "nice-to-have" extras.
6. **Verify, don't claim.** State what was checked (`pnpm check`, e2e, Lighthouse) and what was not. Paste only failing output back.
7. **Report format:** 3-line changelog · decisions needing a §17 entry · open items.
8. **Conflicts:** if a request contradicts this file, say so and ask which wins.
9. **Decision log is the memory.** After each step, append new decisions to §17 and carry that section forward.
10. **Never put secrets, phone number, or email in chat context or this file.**
11. **Content integrity.** Use only Verified content (§0). Never invent copy, metrics, methodology, datasets, or demo output; name the Pending items the step needs instead.

**claude.ai Project instructions (paste into the Project):**
```
You are the lead engineer for Sai Sandesh Bodukuri's portfolio. CLAUDE_CONTEXT.md in Project knowledge is the source of truth; it wins over chat history. Work in logical batches, one roadmap step at a time (§14). Use only design tokens, never invent colours, fonts, spacing, effects or dependencies without asking (§2.6, §8). Performance, accessibility, responsiveness and maintainability are gating constraints (§9, §10). Return only new/changed files plus a 3-line changelog and open items. Plan first if a batch touches more than 3 files. Use only Verified content (§0); never invent copy, metrics, or methodology. State what you verified and what you did not.
```

---

## 17. Decision log, launch blockers, and content TODOs

### 17.1 Decision log
| ID | Decision | Revisit trigger |
|---|---|---|
| D-001 | Next.js App Router with static generation over Astro | Empty-shell mobile Lighthouse < 90 |
| D-002 | HeroField is Canvas2D; Three.js / R3F deferred behind the Step 7 gate | Gate criteria in §1.1 |
| D-003 | No Framer Motion, Lenis, or shadcn/ui in baseline | §1.1 triggers |
| D-004 | Typed TS content modules (no MDX); contact via obfuscated text enhanced to `mailto:` + copy button, no form | Blog added / form requested |
| D-005 | Fonts: Big Shoulders Display + IBM Plex Sans + IBM Plex Mono | Legibility or weight issues at Step 3 |
| D-006 | Palette: carbon surfaces, bone text, vermilion `#E34234` accent, muted steel `--data`; contrast enforced by test | Test failure or design review |
| D-007 | Two flagship case studies (D.E.S.T.I.N.Y., EEG); two secondary cards | Content change |
| D-008 | Résumé PDF includes phone, served `noindex`; email never in JSON-LD | — |
| D-009 | Terminal `run inference` is a labelled recorded run, never presented as live | A real live model is added |
| D-010 | Section order set by content priority (Projects before About) | Design review |
| D-011 | No generic scroll-reveals; one orchestrated hero moment | — |
| D-012 | Performance figures are targets until calibrated. First-load JS: ≤170 KB target · 170–200 KB warning · >200 KB hard investigation gate (owner decision) | Calibration at Steps 1 and 3 |
| D-013 | Token policy: tokens for repeated/design-system-level values; isolated justified values allowed (owner decision) | A one-off value recurs 3+ times |
| D-014 | Component size: ~150 lines is a guide; split by responsibility, reuse, maintainability (owner decision) | — |
| D-015 | Content status system Verified / Pending / Optional; never invent; only Verified rendered (owner decision) | — |
| D-016 | Flagship case-study structure (8 parts) and metric-explanation rule (owner decision) | — |
| D-017 | Terminal is a secondary discovery feature; `run inference` registered only with real recorded data | A real live model is added |
| D-018 | GitHub: server-side and resilient by default; build-time/static allowed via the simplification gate (§1.2) | Step 5 decision |
| D-019 | Hero name/headline (LCP element) never starts hidden; sequence animates secondary elements only | LCP regression |
| D-020 | Custom cursor off under `forced-colors`; MotionToggle reachable on mobile (footer + menu) | — |
| D-021 | Influence hierarchy revised from 55/30/15 to **AI/ML 50 / F1 30 / Samurai 20** (owner decision, 2026-10-03). A hierarchy of creative influence, not screen area | — |
| D-022 | F1 and Samurai appear as visible, original, restrained devices layered inside components; no per-section themes; coherence tests in §2.7 (owner decision) | Design review shows themed zones or clutter |
| D-023 | Shared primitives: `--stroke-hair`, `--stroke-trace`, `--cut-angle`, `--cut-size`; one accent (vermilion) for hanko ink, racing attention, and the AI active state | A device needs a second accent |
| D-024 | Restraint budget: ≤1 prominent F1 + ≤1 prominent Samurai device per viewport; decorative elements never compete with AI/ML content | Step 7 / 8 audits |
| D-025 | Kanji: default none, ≤3, meaningful, glossed, verified, approved. Candidates 道 / 間 / 技 await the owner's choice | Owner picks or declines |
| D-026 | Ink, texture, and pattern assets are static and tiny (≤12 KB gzip site-wide); no runtime SVG filters; lattice is asanoha-derived and limited to 2 surfaces | Asset budget exceeded |
| D-027 | Hero field is a flow field (embedding space + airflow); the hero blade stroke is the single prominent vermilion Samurai moment in the first viewport (the ≤40 px logo seal is identity, not a device) | Step 3 review |
| D-028 | Code labels (≤4 chars) allowed inside Readout/TimingBoard; all-caps otherwise reserved for display headings; sector numbering only in the lap line | — |
| D-029 | Text-colour tokens renamed `--text-1/2/3` → `--fg-1/2/3` to avoid colliding with Tailwind v4's `--text-*` font-size namespace (final audit) | — |
| D-030 | `--line-1/2` are decorative only (below 3:1); interactive control boundaries use filled surfaces or `--fg-3`+ ; `prefers-contrast: more` uses `--fg-3`+ for borders (final audit) | Contrast test failure |
| D-031 | Purpose rule replaces the "information role" rule (owner clarification, 2026-10-03): every device states a functional or aesthetic purpose; purely visual F1/Samurai elements are allowed when restrained and subordinate; data-bearing elements stay truthful; nothing outside the approved vocabulary ships without §2.6 + §2.7 | — |
| D-032 | Fonts load through `next/font/local` from committed OFL-licensed Fontsource WOFF2 files (`src/fonts`, with licences and a provenance README) instead of `next/font/google`. Measured 111.9 KB for the 5 files; font target calibrated to ≤115 KB (owner-approved), superseding the ≤110 KB estimate. Preloaded on `/`: display + Plex Sans 400/600 = 82.3 KB; Plex Mono is not preloaded | Font files added or changed; Big Shoulders axis instancing considered later |
| D-033 | Toolchain pins (Step 1): Node 24 LTS (`.nvmrc` 24, `engines` `^22.12 \|\| ^24`), pnpm 12.8.1, Next 16.3.8, React 19.3.0, Tailwind 4.3.3, **TypeScript 6.0.3** (not 7: typescript-eslint peers TS <6.1), **ESLint 9.39.5** (not 10: eslint-plugin-react peers ≤9), Vitest 5.0.3, Playwright 1.63.0, @axe-core/playwright 4.13.0, Prettier 3.9.9, @lhci/cli 0.15.1. Exact versions in `package.json`; lockfile generated by `pnpm install` | typescript-eslint / eslint-plugin-react support TS 7 / ESLint 10 |
| D-034 | Dev dependencies beyond the literal §8 list: `postcss` (peer of the Tailwind PostCSS plugin), `@types/node`, `@types/react`, `@types/react-dom`. `eslint-plugin-jsx-a11y` and `typescript-eslint` are not direct dependencies: they come with `eslint-config-next`, and extra rules reference them by name | A config needs a direct plugin import |
| D-035 | `scripts/baseline.mjs` is the dependency-free bundle reporter and the >200 KB first-load JS hard gate (1 KB = 1000 bytes, gzip level 6); CI runs it after the build. Reason: Next 16 `next build` no longer prints per-route sizes, and LHCI cannot express a warn-at-170 / error-at-200 pair on one audit | Next prints reliable sizes again |
| D-036 | CI is GitHub Actions (`check` + build + bundle gate; `e2e`; `lighthouse`). Lighthouse assertions are warn-only; reports are saved as workflow artifacts (`upload.target: filesystem`), never uploaded publicly. Actions pinned to major tags (checkout v7, setup-node v7, upload-artifact v7, pnpm/action-setup v6, verified with `git ls-remote`) | Supply-chain policy requires SHA pinning |
| D-037 | Tailwind namespace handling: radius, type scale, fonts, and breakpoints are declared in `@theme static`; colours remain `:root` tokens aliased through `@theme inline` as `--color-*`; Tailwind default colour, type, radius, and shadow scales are reset so only token values exist; line-heights use the `--text-*--line-height` convention. Utility names: `bg-bg-0`, `text-fg-1`, `border-line-1`, `bg-accent`, `text-accent-text` | Tailwind changes theme namespace behaviour |
| D-038 | pnpm 12 treats unreviewed dependency build scripts as an install error. `unrs-resolver` is explicitly denied in `pnpm-workspace.yaml` (`allowBuilds`); its native binary arrives through optional dependencies and ESLint runs correctly without the script | A dependency needs its build script |
| D-039 | The ≈2.5 s LCP on the skeletal Step 1 page (target ≤2.0 s) is a non-blocking warning. Do not rewrite the foundation to chase it; reassess against the real hero at Step 3, where the LCP ≤2.0 s gate stays in force (owner decision, 2026-10-04) | Step 3 hero measurement |

### 17.2 Launch blockers
**A. Content blockers (must be Verified before launch; checked at Step 9)**
1. Hero headline copy approved (needed to finish Step 3).
2. **D.E.S.T.I.N.Y. minimum:** Problem, Approach, System/architecture, Implementation (the owner's contribution + highlights), Demo/repository. Why it mattered, Results and Lessons are included if they exist and omitted if not.
3. **EEG minimum:** Problem (what is classified and why), Approach, Results with context (what 66 → 28 compares; what accuracy and recall mean here), and a plain statement of what is not public. Dataset size and split are needed for the numbers to be meaningful.
4. **D.E.S.T.I.N.Y. live demo verified:** backend responds and the changelog-style footer text on the live site is replaced. Otherwise link the repo only and drop the word "live".
5. **Secondary projects:** each is either included with Verified content or omitted. No stubs.

**B. Engineering blockers (all must hold at launch)**
- Zero axe violations on every route at mobile and desktop widths; keyboard path, reduced-motion behaviour, and a screen-reader pass done.
- First-load JS ≤ 200 KB on every route; any route in 170–200 KB has a recorded cause; other §10 targets met or deviations explained.
- Core content fully usable with the terminal, HeroField, and custom cursor absent, and with JS disabled.
- No horizontal scroll at 320 px.
- Every visible device passes the §2.7 coherence tests; decorative devices are `aria-hidden`; no focus ring is clipped.
- No secrets in the client bundle; `GITHUB_TOKEN` server-only; security headers configured; CSP decision made; résumé PDF `noindex`.
- No Pending content rendered; no visible `TODO` text.

**C. Optional (never block launch)**
LinkedIn link · résumé download (ship without the button if there is no PDF) · Mock Interview Assistant link · anomaly-detector replay · `run inference` command · EEG plots · D.E.S.T.I.N.Y. screenshots/video · CGPA display · kanji accent · lattice pattern · ink grain texture · custom domain · blog · low-end Android test (recommended).

### 17.3 Content TODOs (Pending)
| Item | Needed by | Class |
|---|---|---|
| Hero headline approval | Step 3 | Blocker |
| D.E.S.T.I.N.Y.: problem, approach, architecture, implementation detail (+ why it mattered, results, lessons if any); confirm repo link, live backend, and features seen on the live page | Step 4 to render; launch | Blocker (minimum set) |
| EEG: what is classified; what 66 → 28 compares; dataset size/split/source; evaluation-set size and which class recall refers to; what may be shown publicly | Step 4 to render; launch | Blocker (minimum set) |
| Secondary projects: confirm repo links; problem/approach/results for each one to show | Step 4 | Include or omit |
| LinkedIn URL | Step 5 | Optional |
| Final résumé PDF (with phone) | Step 5 / 9 | Optional (button hidden until supplied) |
| Real recorded sensor stream + model scores; any real `run inference` sample | Step 6 | Optional |
| Mock Interview Assistant link | Step 4 | Optional |
| EEG plots; D.E.S.T.I.N.Y. screenshots | Step 4 | Optional |
| CGPA display decision | Step 5 | Optional |
| Kanji: choose from 道 / 間 / 技 (or none) | Step 5 | Optional |
| Seal ("SB" monogram) and hero blade-stroke direction: approve or adjust | Step 3 | Design review (not a content blocker) |
| Custom domain | Step 9 | Optional |
| Access to a low-end Android device | Step 7 | Recommended |

### 17.4 Step 1 baseline (empty shell, 2026-10-03)
Measured in the sandbox on a production build (Node 24.21.0, Next 16.3.8, Turbopack). 1 KB = 1000 bytes.

| Metric | Result | Target / zone |
|---|---|---|
| First-load JS (gzip), `/` | 137.2 KB (6 chunks) | ≤170 KB: target zone |
| First-load JS (gzip), `/_not-found` | 137.2 KB | target zone |
| First-load JS (gzip), `/_global-error` | 134.0 KB | target zone |
| CSS (gzip), `/` | 4.3 KB | ≤25 KB |
| HTML (gzip), `/` | 3.2 KB | n/a |
| Font files (inventory) | 5 files, 111.9 KB | ≤115 KB (calibrated, D-032) |
| Fonts preloaded on `/` | 82.3 KB (display + Plex Sans 400 + 600) | n/a |
| Lighthouse mobile (run locally by the owner on the Step 1 production build, localhost:3000) | **Performance 100 · Accessibility 100 · Best Practices 100 · SEO 100.** LCP ≈2.5 s (2499.4 / 2498.1 / 2500.5 ms) vs ≤2.0 s is the one assertion warning; CLS 0; TBT ≈40 ms | Performance ≥90 where realistic; LCP ≤2.0 s |
| Playwright + axe (run locally by the owner) | 6/6 passed at 360 and 1280 px: correct h1, no console errors, no horizontal overflow, skip link first in tab order, **0 axe violations** | Zero violations |
| D-001 review (Next vs Astro) | **Not triggered**: empty-shell mobile Lighthouse Performance is 100. The Step 1 Lighthouse exit criterion is met. LCP phase breakdown (render delay dominant per the owner) is examined at Step 3 | n/a |

The framework floor of about 137 KB leaves roughly 33 KB of headroom under the 170 KB target for Steps 2 to 7 on the home route.

Owner-reported follow-ups (2026-10-04): GitHub Actions has not yet been confirmed by a real run, and `next dev` was not formally verified. Both are operational follow-ups, not Step 2 blockers. The Step 1 rollback checkpoint is commit `f083ba1` on `main`. Step 1 is closed.
