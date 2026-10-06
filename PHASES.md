# PHASES.md

Send one phase at a time as a message to the agent. Rules and design live in `AGENTS.md` and `DESIGN.md`, so these messages stay short. Reference images are in `screenshot/` at the project root; do not re-attach them. The reference is a starting point: the agent is expected to improve on it.

Fill these in once, in Phase 0 (do not take them from the reference screenshots):
- Brand name: {{BRAND_NAME}}
- Tagline: {{TAGLINE}}
- Email / phone / address / hours: {{CONTACT}}

---

## Phase 0: Foundation

Phase 0. Scaffold Vite + React + TS + Tailwind + Router. Import `design/tokens.css`, map it into the Tailwind theme, add `@fontsource/roboto`. Build Container, Panel, Section, PageShell with the 12px frame, and the dev-only GridOverlay (key G) matching the grid-settings image in `screenshot/`. Create `site.ts` with typed schema and placeholder content: brand, nav, hero, about, 6 services (+2 optional), process steps, 12 partners, 8 team members, 6 posts, 9 gallery items, 8 FAQs, contact details. Add Nav and Footer shells and all 6 routes rendering empty pages. Brand details are above.

## Phase 1: UI primitives

Phase 1. Build the primitives from DESIGN.md section 8 and show every state on a dev-only `/dev/kit` route: Button (variants, sizes, states, loading), Eyebrow, SectionHeader, ServiceCard (anatomy from the service-card image in `screenshot/`, tokens win on spacing; restyle if you can do better), GlassCard and Orbs (DESIGN.md section 6, with fallbacks and reduced-motion handling), Field / Select / Textarea with validation states, Accordion, Marquee, TeamCard, PostCard, Lightbox, Reveal.

## Phase 2: Home, top half

Phase 2. Make the first screen excellent, not a copy of the reference. Build Nav (rounded and floating at the top, fixed and rectangular after scroll, mobile drawer), Hero (blurred orb backdrop, glass stats bar), About, CTA banner, Services (all cards), How we work. Assemble them in Home in order.

## Phase 3: Home, bottom half

Phase 3. Build Partners (two opposite Marquee rows), Team carousel (4 at once), Steps to get started, Blogs and gallery, Contact (service preselect from the query param, mock submit adapter, success state), FAQ, Footer (navy, orbs, no payment logos). Add the optional Testimonials section, hidden by default. Assemble in Home in order.

## Phase 4: Inner pages

Phase 4. Build About (including blog and gallery sections), Services (detail rows with anchors), Blog list, BlogPost, Gallery with filter and Lightbox. Each ends with the CTA band and Footer.

## Phase 5: QA pass

Phase 5. Audit the whole codebase and fix what you find:
1. Raw hex and off-scale px values → tokens.
2. Contrast of every text/background pair, especially anything on `--color-secondary`.
3. Keyboard test of nav, drawer, accordion, carousel, lightbox (focus order, traps).
4. Layout at 1920, 1440, 1280, 1024, 768, 390.
5. `prefers-reduced-motion` disables marquee, reveals and hover sweeps.
6. GridOverlay excluded from the production build.
7. Blur performance: count `backdrop-filter` elements per viewport (max 4), orbs per panel (max 3), confirm no animated blur radius, check scroll smoothness, and verify text contrast on every glass surface.
Return a short report, then the fixes.

---

## Change request template

Change: {{what}}. Where: {{page / section}}. Keep tokens and grid. Touch only what is needed.
