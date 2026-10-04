# CLAUDE.md — Sai Sandesh Bodukuri portfolio

Personal portfolio for an AI/ML engineer. Influence hierarchy (fixed by the owner): AI/ML 50% · F1 30% · Samurai 20%. This ranks creative influence, not screen area. F1 and Samurai appear as visible, original, restrained devices layered inside the same components as the AI/ML content (never one theme per section). Target impression: advanced AI laboratory × motorsport engineering × disciplined Japanese/Samurai craftsmanship.
Full spec: `docs/CLAUDE_CONTEXT.md`. Read only the section you need; section numbers are stable. This file is the short version, and the spec wins on conflict.

## Commands (pnpm; scripts are created in Step 1)
- `pnpm dev` · `pnpm build` · `pnpm start`
- `pnpm check` = typecheck + lint + unit tests (run before every commit)
- `pnpm e2e` = Playwright + axe (affected routes must pass)
- `pnpm lhci` = Lighthouse CI against the production build

## Constraints (all gating)
Accessibility, performance, responsiveness, maintainability. Priority: clarity > credibility > performance > expression. Restraint budget: AI/ML content is the focal point of every viewport, with at most one prominent F1 device and one prominent Samurai device; everything else stays quiet. Every device states a purpose (§2.2): functional, or aesthetic (hierarchy, atmosphere, cultural/design reference, identity, composition, transition/boundary, interaction affordance). Purely visual elements are allowed when restrained, intentional, and subordinate to AI/ML content, and they never carry data. Every effect needs a row in the effect register (§2.5). Do not add visual devices outside the §2.2/§2.4 vocabulary without the §2.6 change process and §2.7 review.

## Stack (decided; change only on measured evidence, §1.1 and §17)
Next.js App Router + TypeScript strict, Tailwind with CSS-variable tokens, `next/font`, Canvas2D hero. Not in baseline: Three.js/R3F, Framer Motion, Lenis, shadcn/ui, MDX, analytics. Never add technology because it is popular.

## Never
- Invent content, metrics, methodology, datasets, or demo output. Use only Verified items (§0); mark gaps `TODO(content)`.
- Add a dependency, design-system-level token, pattern, or effect without asking (§2.6, §8).
- Hard-code UI colours; use tokens (§3). Isolated, justified implementation values are fine with a short comment.
- Use `dangerouslySetInnerHTML`, `eval`, or client-side secrets.
- Put email, phone number, or tokens in code comments, logs, JSON-LD, or docs.
- Start the LCP element hidden, animate layout properties, or add per-section scroll reveals.
- Make the terminal the only route to any content.
- Use F1 branding, logos, liveries, proprietary graphics, official or real circuit artwork, flags, helmets, or cars.
- Use anime/gaming imagery, Samurai figures, katana icons, armour, cherry blossom, torii, faux-Japanese fonts, or Japanese characters used only for looks. Kanji: default none, at most 3, meaningful, glossed, verified, approved in §17.
- Present decorative telemetry as data: every telemetry value is real, or the element is unlabelled and `aria-hidden`.

## Always
- Server Components by default; `"use client"` at the smallest leaf (§7). Pass minimal serialisable props.
- Read content from `src/content/*`; every item has `status`; production renders only `verified`.
- Respect `prefers-reduced-motion`; ambient motion must be pausable (§5.1).
- Layer influences inside components and run the §2.7 coherence tests on every new visible component. Decorative devices carry `data-decorative` and `aria-hidden`. Never put `clip-path` on an element that carries a focus outline.
- Keyboard access, visible focus, semantic landmarks, descriptive links (§9).
- Mobile-first; check 320 / 360 / 390 / 768 / 1024 / 1440.
- Pin exact dependency versions after checking with `pnpm view`; never trust remembered versions.

## Design essentials (names only; values live in `tokens.css`)
- Colour: `--bg-0/1/2`, `--line-1/2` (decorative only, never a control's sole boundary), `--fg-1/2/3` (`--fg-3` only at ≥14px), `--accent` (fills, lines, large text), `--accent-text` (small text), `--on-accent` (labels on accent fills), `--data` (charts/telemetry only), `--focus`.
- Type: Big Shoulders Display (display, uppercase), IBM Plex Sans (text), IBM Plex Mono (readouts, tabular figures).
- Motion: `--dur-*`, `--ease-*`; animate only transform, opacity, clip-path.
- Shape: surfaces radius 0, controls 2px; flagship surfaces may have one chamfered corner (`--cut-size`); no shadows, glass, or gradient washes.
- Shared geometry: `--stroke-hair`, `--stroke-trace`, one diagonal `--cut-angle`, `--pattern-alpha`, `--dur-draw`. Vermilion is the one accent (seal ink, racing attention, active state).
- Devices (§2.2): seal, ink strokes, blade separators (≤3 per page), chamfered flagships, timing-board tables, starting-grid layout, track path, lap line, telemetry traces and redline meters (real data only), one asanoha-style lattice (≤2 surfaces). Short ≤4-character code labels only inside Readout/TimingBoard.

## Components
`ui/` `layout/` `sections/` `interactive/` `case-study/` (§1.3). Client islands: Cursor, HeroField, TypedLine, PipelineExplorer, Terminal, TelemetryTrace (playback), MobileMenu, ScrollProgress, MotionToggle. Prefer files under ~150 lines, but split by responsibility, reuse, and maintainability rather than line count.

## Performance targets (§10; measure production builds)
First-load JS (gzip): ≤170 KB target · 170–200 KB investigate and record the cause · >200 KB hard investigation gate. LCP ≤2.0 s, TBT ≤150 ms, CLS ≤0.02 (lab). Lighthouse mobile ≥90 where realistic. Lazy-load islands; start HeroField after LCP; zero third-party requests. Optimise what measurements show.

## Security (§12)
`GITHUB_TOKEN` is server-only. CSP starts Report-Only; no `unsafe-eval`. Terminal uses a fixed command registry. Email is server-rendered as obfuscated text, enhanced to `mailto:` + copy. Résumé PDF is `noindex`.

## Working on a task
1. Read the relevant `docs/CLAUDE_CONTEXT.md` sections for the step (§14).
2. If more than 3 files change, post a short plan (files to create/modify) and wait for a go-ahead.
3. Make the smallest change that meets the step's scope. No extras.
4. Run `pnpm check` (plus `pnpm e2e` / `pnpm lhci` when applicable).
5. Report: 3-line changelog · decisions needing a §17 entry · open items · what you verified and what you did not.

## Definition of Done
`pnpm check` green · new logic unit-tested · axe clean · keyboard and reduced-motion verified · production build checked against §10 (misses explained) · no unlogged dependency/token/pattern/effect · Pending content not rendered.

## Context management
- One roadmap step per session; start with §0 and that step's sections.
- Do not re-read the whole spec or regenerate unchanged files; refer to tokens by name.
- If an instruction conflicts with the spec, say so and ask which wins.
- Append new decisions to §17 of the spec.

## Git
Branch per step `step/NN-name`; Conventional Commits; PR description = Definition of Done.
