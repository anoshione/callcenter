# AGENTS.md: Call Center Website

You are a senior front-end engineer and designer-minded implementer building a marketing website for a **call center / BPO company**. The design system (tokens, grid) is fixed. The visual design is a **reference you are expected to improve on**: keep the system, raise the craft. Where the design is silent, make one token-consistent decision, record it in the phase summary, and continue.

## Read first (every task)

1. `DESIGN.md`: layout, type roles, components, pages, motion, accessibility. Read the sections relevant to the task before writing code.
2. `design/tokens.css`: the only source of design values.
3. `screenshot/` (project root): reference images. At the start of Phase 0, open every image and note what it shows (typically: a full-page reference site, a service-card crop, the Figma grid settings). They are a **style reference, not the final design**.

## Non-negotiable rules

1. **Tokens only.** Every color, spacing, radius, font size and line height comes from `design/tokens.css`. No raw hex, no off-scale px in components. If something is missing, use a derived token already in that file. Never invent a brand color.
2. **Tokens and grid beat screenshots.** If a reference image disagrees with the tokens or grid, follow the tokens and grid.
3. **Design freedom, within limits.** The reference is a floor, not a ceiling: make the site better than it. You may improve composition, card forms, interactions, hero concept, imagery treatment and microcopy, and add derived tokens mixed from brand tokens. You may not add hues, break the grid or panel system, or change the section and page scope. See DESIGN.md section 2. Heavy blur and glass is a core part of the look (DESIGN.md section 6).
4. **No pricing anywhere.** No prices, plans, packages, "Buy now", "starting at", or comparison tables. Visitors see services, contact us, we discuss, we quote. Every service CTA leads to the contact form. The reference site has a Pricing section: do not build it.
5. **Content lives in data.** All copy, images, links, team, posts, gallery, FAQ, partners and contact details live in `src/content/site.ts` (typed). Components read from it. Changing copy must never require editing a component.
6. **No filler.** No lorem ipsum. Write specific, plausible call-center copy. Brand name is `site.brand.name` (placeholder `{{BRAND_NAME}}`). Any statistic or claim is a placeholder marked `// TODO verify`. Never present invented clients, numbers or testimonials as real.
7. **Do not copy from the reference.** Read DESIGN.md section 11. No stock photos (one has a third-party logo), no dummy or call-tracking copy, no payment logos, no real contact details unless provided in `site.ts`. Use local placeholders from `src/assets/placeholders/`. No hotlinked images.
8. **Complete files.** No "rest of code here" or truncated components.
9. **One question at most, and only if blocked.** Otherwise state the assumption and continue.

## Stack

React + Vite + TypeScript, Tailwind CSS, React Router, `lucide-react`, self-hosted Roboto via `@fontsource/roboto` (weights 300, 400, 500, 700). CSS-first animation (transitions, keyframes, IntersectionObserver). Add a motion library only if CSS is clearly worse. No UI kits.

Tailwind theme must map to the CSS variables (`@theme` in v4, `theme.extend` in v3) so `bg-primary`, `text-text-2`, `rounded-24`, `gap-24` resolve to tokens. `src/styles/tokens.css` imports `design/tokens.css`; do not duplicate values.

## Project structure

```
design/            tokens.css
screenshot/        reference images (read-only for you)
src/
  styles/          tokens.css (import only), global.css
  content/site.ts
  lib/             submitContact.ts (mock adapter)
  components/ui/       Button, Eyebrow, SectionHeader, Accordion, Field, Marquee, Lightbox, Reveal, GlassCard, Orbs
  components/layout/   Nav, Footer, Container, Panel, Section, PageShell, GridOverlay
  components/sections/ Hero, About, Services, HowWeWork, Partners, Team, GetStarted, BlogGallery, Contact, Faq, Testimonials
  pages/               Home, About, Services, Blog, BlogPost, Gallery
```

Routes: `/`, `/about`, `/services`, `/blog`, `/blog/:slug`, `/gallery`. Contact lives on Home at `/#contact`; from other pages the nav Contact button goes to `/#contact`.

## Working protocol

The user will say "Phase N". See `PHASES.md` for the plan.

1. **Plan first.** Before coding a phase, write a short implementation plan: files to create or change, assumptions, and one line per section, "Design idea: ...", naming what makes it better than the reference. Then implement.
2. **Build and run.** Run the dev server and the type check. Fix errors before reporting.
3. **Verify visually.** If a browser tool is available, load the pages you changed and check at 1920, 1440, 1280, 1024, 768 and 390 widths. Press `G` to toggle the grid overlay and confirm content aligns to the 12 columns. Compare against `screenshot/` for anatomy, then judge whether your version is actually better.
4. **Self-audit before finishing.** Search your changes for raw hex values (`#[0-9a-fA-F]{3,8}`) and off-scale px values. Replace them with tokens.
5. **Report in at most 8 lines:** what was built, assumptions made, any deviation from tokens or references and why, anything left undone.
6. Do not restate these rules or the tokens. Do not re-explain code unless asked.
7. For change requests, touch only what was asked. Keep tokens and grid.

## Quality bar

- WCAG AA. Body text ≥ 4.5:1. White text on `--color-secondary` is about 3.65:1 and fails AA at normal size: green buttons use navy text (`--color-primary`) or large bold labels only. `--color-grey-4` and `--color-offline` are for borders and disabled states, never text. Success and warning colors are for icons and badges, not text on white.
- Semantic landmarks, one `h1` per page, logical heading order, skip link, visible `:focus-visible`, alt text on every image (decorative: empty alt). Tap targets ≥ 44px.
- Respect `prefers-reduced-motion`: marquee, orbs, reveals and hover sweeps become static.
- Blur performance: max 3 orbs per panel, max 4 `backdrop-filter` elements visible at once, never animate blur radius, glass text must pass AA. Check scroll smoothness on the home page. Details in DESIGN.md section 6.
- Images have explicit aspect ratios (no layout shift); lazy-load below the fold.
- Per-page `<title>` and meta description from `site.ts`.
- `GridOverlay` is dev-only and must not ship in the production build.

## Never

Prices or plans. Raw hex or off-scale spacing. New brand hues. Neon glows or hover gradients stronger than the token. Body text on bare blur. Animated blur radius. Emoji as icons. Lorem ipsum. Hotlinked images. Autoplaying media. Autoplaying carousels without a pause control. Editing existing values in `design/tokens.css` or anything in `screenshot/` (new derived tokens may be added to the derived block, and must be listed in the phase report).
Design values live in `design/tokens.css`. This file says how to use them. Do not copy token values into components or into this file.

## 1. Brand and tone

A professional, trustworthy BPO / call center company. Calm navy anchors the brand, green is a precise accent. The feel is modern and premium: soft rounded panels, generous whitespace, layered depth from **heavy blur and glass**, image-led service cards, smooth restrained motion. Not playful, not corporate-stiff.

Business model: **no public pricing.** The visitor browses services, contacts us, we discuss needs and provide a quote. Copy and CTAs reflect this ("Talk to us", "Get a tailored proposal").

## 2. Design latitude (read this)

The screenshots in `screenshot/` are a **reference, not the final design**. Treat them as a floor, not a ceiling: the goal is a better site than the reference.

**Fixed (do not change):**
- Tokens in `design/tokens.css`: no new hues, no raw values.
- Grid: 1920 canvas, 1440 container, 12 columns, gutter 24, margin 240, and the 12px frame/panel system (section 3).
- Content scope: the sections, pages and routes listed in section 7, and the no-pricing rule.
- Accessibility (WCAG AA), performance limits for blur (section 6), reduced-motion support.

**Free (use your judgment and improve):**
- Composition inside each section: layout, proportions, hierarchy, how elements overlap.
- Card forms, hover and scroll interactions, micro-interactions, transitions between sections.
- Hero concept, imagery treatment (masks, crops, overlays), iconography style, decorative patterns.
- Tints, shades and gradients mixed from brand tokens (`color-mix`); new derived tokens when needed, added to the derived block of `design/tokens.css` (list them in the phase report).
- Copy: sharpen headlines and microcopy.

**How to use the freedom:** in each phase plan, write one line per section: "Design idea: ..." naming what makes it better than the reference. Do not redesign for its own sake; each change should improve clarity, trust or polish. If the reference does something well, keep it.

Starting points (take, adapt or beat):
- Hero: a "Support available 24/7" chip with a softly pulsing `--color-success` dot (static claim, not fake live data); one key phrase in the H1 highlighted with a green marker underline; stats count up once when scrolled into view.
- Cards: a soft spotlight that follows the pointer (radial `--gradient-hover`), subtle 3D-free lift.
- Services: consider a bento rhythm (featured service larger) instead of six identical tiles.
- Partners: logos in grayscale at rest, full color on hover, row pauses on hover.
- Blog: one featured post plus a stacked pair, not the reference's offset zig-zag.
- CTA banners: blurred color orbs drifting slowly behind the text.
- Footer: oversized brand wordmark softly blurred into the panel edge.

## 3. Layout system

- Canvas **1920** wide. Content container **1440**, centered. **12 columns**, gutter 24, side margin 240 at 1920 (column width 98px at 1440).
- Container: `width: min(var(--container-max), 100% - 2 * var(--page-pad))`. Raise `--page-pad` in `global.css`: 16px mobile, 32px tablet, 64px laptop (<1600). At 1920 it resolves to 1440 with 240px margins.
- Columns: 12 (≥1280), 8 (768-1279), 4 (<768). Gutter 24 (16 on mobile). Breakpoints: 1280 and 768.
- **Frame:** the page body has `--frame-inset` (12px) padding on all sides. Every major section is a rounded **Panel** (radius 32; 20 on mobile) with a 12px gap between panels. Panels alternate `--color-surface` and `--color-grey-1`; hero, CTA banners and footer are navy (`--color-primary`) or image-backed. Each Panel contains a Container. Vertical padding `--space-section` (`--space-section-sm` below 1280).
- Panels may use `overflow: hidden` so blurred orbs and images clip to the rounded corners.
- **GridOverlay** (dev only, key `G`): 12 columns, margin 240 at 1920, gutter 24, black at 10% opacity, stretch.

## 4. Typography

Font: Roboto (`--font-family`). Weights: 300 eyebrows, 400 body, 500 titles and buttons, 700 display numerals only. Line height uses the paired `--lh-*` token for each `--fs-*`.

| Role | Size / line-height | Weight | Color |
|---|---|---|---|
| Hero H1 | 72/96 (48/64 under 1280, 36/40 under 768) | 500 | primary on light, surface on navy |
| Section H2 | 48/64 (36/40 tablet, 32/36 mobile) | 500 | primary (surface on navy) |
| H3 | 36/40 | 500 | primary |
| Card title | 28/32 | 500 | primary |
| Lead | 20/24 | 400 | text-2 |
| Body | 16/20 | 400 | text |
| Card eyebrow | 16/20 | 300 | text |
| Section eyebrow | 16/20 | 500 | `--color-secondary-active` on light, `--color-secondary` on navy |
| Small | 14/16 | 400 | text-2 |
| Caption | 12/16 | 400 | grey-5 |
| Big numerals | 96/128 | 700 | primary |

Body line-height tokens are tight (16 on 14px, 20 on 16px). Use them as specified. Do not silently loosen them; flag it in the phase report if paragraphs look cramped.

## 5. Interpreted requirements

- **Nav:** at scroll 0 it floats as a rounded bar (radius 24) inside the hero's 12px inset, as **glass** (`--glass-bg`, `backdrop-filter: blur(var(--blur-md))`). Once the user scrolls past a sentinel (IntersectionObserver, not a scroll listener) it becomes `position: fixed; top: 0`, full width, **radius 0**, `--glass-bg-strong`, `--shadow-sm`, slightly reduced height. Transition radius, height, shadow and background over `--dur-base`. Reserve its height so there is no layout shift. Logo left, links centered, navy CTA pill at right ("Explore our services" at the top, "Contact us" after scroll). Mobile drawer under 1280, active-link indicator.
- **Hover gradient:** "slight gradient on hover" means `--gradient-hover` fading in over cards, interactive tiles and secondary buttons. Never stronger. (Blur orbs in section 6 are static atmosphere, a separate thing.)
- **Service CTAs** link to `/#contact?service=<slug>`; the contact form preselects that service.
- **Services on Home** show all 6-8 services. If a uniform grid is used: ≤6 → 3 per row (4 columns each); 7-8 → 4 per row (3 columns each). A bento layout is allowed if every service stays equally reachable.

## 6. Blur and glass system

Heavy blur is a signature of this site: banners, hero, CTA bands, nav and overlays should feel layered and soft. Tokens: `--blur-*`, `--glass-*`, `--orb-*` in `design/tokens.css`.

**Where to use it**
1. **Hero and banner backdrops.** Large blurred color orbs (`--orb-green`, `--orb-navy`, `--orb-light`) behind the content, `filter: blur(var(--blur-orb))`, positioned partly off-panel. A photo may sit on top with a gradient mask so it dissolves into the blurred background. A heavily blurred copy of the photo (`--blur-xl`, scaled up ~1.1 to hide edges) works as an ambient backdrop.
2. **Glass surfaces.** Nav, hero stats bar, contact card, floating chips: `--glass-bg` (light) or `--glass-bg-dark` (on navy), `backdrop-filter: blur(var(--blur-lg))`, 1px `--glass-border` / `--glass-border-dark`, radius 24.
3. **Image scrims.** Progressive blur at the bottom of image cards under overlaid text: gradient mask plus `backdrop-filter`.
4. **CTA banners and navy panels.** Two or three drifting orbs over the navy, plus the faint line-icon texture (phone, headset, chat bubble) at 4-6% opacity as a local SVG.
5. **Contact section.** Map as a background, blurred heavily at the edges (mask) and sharper near the card, with a glass form card on top.
6. **Section transitions.** A soft blurred gradient where a navy panel meets a light one, if it helps.

**Rules (performance and legibility)**
- Max **3 orbs per panel**; max **4 elements with `backdrop-filter` visible at once** in a viewport.
- Orbs animate with `transform` and `opacity` only (slow drift, 20-40s loops). **Never animate the blur radius** or animate elements that carry `backdrop-filter`.
- Do not put `backdrop-filter` on large scrolling containers. Orbs and masked images are pre-composed; keep `will-change: transform` only on animated orbs.
- Text on glass must pass AA (4.5:1) against the worst-case background. If it does not, raise the glass opacity or add a scrim. Never put body text directly on a bare orb.
- Provide `@supports not (backdrop-filter: blur(1px))` fallbacks: use `--glass-bg-strong` / solid navy.
- Under `prefers-reduced-motion`, orbs stay static.
- Blur radii shrink automatically on small screens (tokens handle it); also reduce orb count to 1-2 under 768.

## 7. Pages and sections

Nav links: Home, About, Services, Blog, Gallery, and a [Contact us] button. Routes: `/`, `/about`, `/services`, `/blog`, `/blog/:slug`, `/gallery`.

### Home (in this order; layout inside each is yours to improve)
1. **Hero + Nav.** Eyebrow chip, H1 (short, 2-3 lines), one supporting paragraph, two CTAs (primary "Get in touch →", outline "About us"). Agent photo or abstract composition on a blurred orb backdrop. A **glass stats bar** overlapping the bottom edge: 4 items with line icons, value + label. Stat values are placeholders marked `// TODO verify`. Up to 3 hero slides from `site.hero.slides` with manual pagination only; no autoplay.
2. **About us.** Eyebrow, title, short story, "Learn more" → `/about`. Visual: overlapping photos, or a photo with a floating glass card holding one proof point.
3. **CTA banner.** Navy rounded banner with orbs, one-line statement, pill "Get in touch →".
4. **Our services** (navy panel with orbs and icon texture). All 6-8 ServiceCards, then "View all services" → `/services`. Initial six: Customer Support, Technical Support, Appointment Setting, Inbound Call Center, Outbound Call Center, IT Services. Optional placeholder extras: Live Chat & Email Support, Back-Office & Data Entry.
5. **How we work.** 4-5 delivery stages (Discover, Design, Onboard & train, Go live, Report & improve) as icon tiles or an interactive stepper.
6. **Partners we've worked with.** Two Marquee rows, opposite directions.
7. **Testimonials** (optional, hidden unless `site.sections.testimonials` is true). One featured quote, two smaller; placeholder content.
8. **Our team.** TeamCard carousel, 4 at once.
9. **Steps to get started.** 4 steps on a connected timeline that animates in on scroll: Contact us → Discovery call → Tailored proposal → Launch. States the no-pricing approach openly. Ends with a primary CTA.
10. **Blogs and gallery.** Blogs: featured post plus a stacked pair, "See more" → `/blog`. Gallery: masonry of 6-9 rounded images, hover caption, click opens the Lightbox, "See more" → `/gallery`.
11. **Contact us.** Glass form card over a blurred map panel. Left: eyebrow, title, phone, email, address, social icons. Right: form (full name, phone, email, service select, message, "Send ↗"). Submits through the mock `submitContact()` in `src/lib/`; show a success state. Stacks on mobile.
12. **FAQ.** 8 questions in two columns, `?` icon at left, plus/close at right, one open at a time per column. The pricing answer says: scoped to your needs and quoted after a discovery call.
13. **Footer** (navy panel). Brand + blurb + social; page links; contact; working hours; copyright. No payment-method logos.

### Inner pages
- **About:** detailed story, mission and vision, values, milestones, team, then the Blogs and Gallery sections reused from Home, then a CTA banner.
- **Services:** intro, then each service as a detail row (alternating image/text, anchor id = slug) with deliverables, who it's for, and a CTA to the contact form with the service preselected.
- **Blog:** featured post plus grid. **BlogPost:** article layout, reading time, related posts.
- **Gallery:** filterable grid with Lightbox.
- Every inner page ends with a CTA banner and the Footer.

## 8. Components

**Button.** Variants `primary` (navy fill), `secondary` (green fill), `outline`, `link`. Sizes md, lg. Radius `--radius-round`, weight 500. States: default; hover (`-hover` token); active (`-active` token, `scale(.98)`); disabled (`-disabled` token, no pointer events); `:focus-visible` (`--focus-ring`); loading (spinner, width preserved). Hover: trailing arrow moves 4px right and a soft gradient sweep passes over the fill (`--dur-base`, `--ease-out`). On glass or navy, an `outline` variant uses `--glass-border-dark`. Green buttons use navy text, not white (see AGENTS.md).

**ServiceCard.** Required content: image, eyebrow (16/300), title (28/32, 500), description (16/20), 3-4 pointers with check icons, CTA. Anatomy reference: `screenshot/` service-card image (white card, rounded image, small eyebrow above a navy title). Visual treatment is yours: keep it clean, image-led, token-based. Hover ideas: image zoom 1.04 in an `overflow: hidden` wrapper, pointer spotlight with `--gradient-hover`, lift 4px with `--shadow-md`, arrow reveal. Cards size to content and pin the CTA to the bottom. Do not reproduce the large empty gap under the text in the reference.

**Marquee.** Two rows, opposite directions, duplicated content for a seamless loop, CSS keyframes, edge fade mask, pause on hover, static wrapped layout under `prefers-reduced-motion`. Each item: placeholder wordmark (SVG/text) plus company name.

**TeamCard.** Photo, name (primary, 500), role (small), row of up to 4 social links from `site.ts` (hidden if absent). Carousel: 4 at once on desktop (3 columns each), 2 on tablet, 1 on mobile; scroll-snap, arrow buttons, keyboard accessible.

**Accordion.** `aria-expanded` and `aria-controls`; animated via `grid-template-rows: 0fr → 1fr`; icon rotation.

**Form fields.** Label above, radius 12, border `--color-grey-3`, focus `--focus-ring`. Error uses `--color-error` with message text and icon (never color alone); success uses `--color-success`. Validate inline on blur.

**Lightbox.** Arrow keys and Esc, focus trap, restore focus on close; backdrop uses `--blur-lg`.

**Glass / Orbs.** Build `GlassCard` and `Orbs` (props: preset, count) as reusable components implementing section 6, so no section hand-rolls its own blur.

**Reveal on scroll.** Fade + 16px translate, once, `--dur-slow`, staggered 60ms within a group. Off under `prefers-reduced-motion`.

## 9. Motion

Durations `--dur-fast` (micro: color, press), `--dur-base` (hover, nav, accordion), `--dur-slow` (reveals). Easing `--ease-out`. Animate `transform` and `opacity`. Marquee loop ≈ 40-60s; orb drift 20-40s. No autoplay carousels.

## 10. Content notes

- Voice: clear, confident, human. Short sentences. Benefit before feature.
- Service pointers: concrete deliverables ("24/7 coverage", "Bilingual agents", "Weekly performance reports"), not vague adjectives.
- Placeholder images: local SVG/gradient placeholders with explicit aspect ratios, named by slot (`hero`, `about`, `service-<slug>`, `team-<n>`, `post-<n>`, `gallery-<n>`).

## 11. Do not copy from the reference

The reference site in `screenshot/` is used for style and structure only.

- **No Pricing section** (Basic / Professional / Advanced with prices) and no "Buy now" buttons.
- **No payment-processor logos** (bKash, Nagad, Rocket) in the footer.
- **Its "Get started" copy** (campaign, tracking number, target line) describes a call-tracking product, not a call center. Write new step copy.
- **Its blog and testimonial text** is dummy text. Write real-sounding placeholders.
- **Photos** are stock; one has a third-party logo. Use local placeholders.
- **Brand name, phone, email, address** shown there are not defaults; use the `site.brand` and `site.contact` values the user provides.