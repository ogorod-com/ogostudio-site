# Ogo Studio Website Architecture

**Version 1.0 — May 27, 2026**
*Living document. Update when architecture decisions change, not when copy changes.*

---

## 1. Purpose

This document is the rebuild reference for the Ogo Studio public website at
`https://ogorod-com.github.io/ogostudio-site/`. If the site is ever rebuilt
from scratch, this file defines the base: what it is, what it's not, what
tools and patterns to use, what to avoid, and how to keep it from drifting.

The site is the STUDIO surface. It primarily promotes GeoFlag today but it
must outlive GeoFlag and serve Game 2, Game 3, etc. without a rebuild each
time.

This file is committed to the `ogostudio-site` repo at the root. Read it
before touching the site. Read it before starting a rebuild conversation
with Claude.ai. Read it before adding a feature.

---

## 2. Site goals (in priority order)

1. **Convert Steam funnel.** Demo install, full game wishlist, dev page
   follow, community group join. Every page surfaces a Steam path.
2. **Establish the studio identity.** Brand voice, founder presence,
   ogorod feel (visually, never in words). Make a player believe one
   careful human is behind this.
3. **Serve legal and support obligations.** Privacy, EULA, credits,
   support form. Required by Steam Partner and player expectations.
4. **Anchor press and discovery.** Press kit, fact sheet, downloadable
   assets, contact line. Reviewers and Next Fest coverage land here.
5. **Host long-form thinking.** Blog posts when there is something
   worth saying. Quarterly cadence, not weekly.

The site is NOT a CMS, not a portfolio, not a roadmap tracker, not a
newsletter platform, not a Steam replacement. Steam is the storefront.
The site is the steady hand behind the curtain.

---

## 3. Brand voice anchor

This site obeys `_Studio/OGO-STUDIO-BRAND.md` v0.3 as written. No
deviation without a brand book update first. Specifically:

- True black canvas (`--ogo-bg #000000`).
- Single accent (`--ogo-glow #52E2D0`).
- Space Grotesk display, DM Sans body, JetBrains Mono for code and IDs.
- First person voice ("I", "me"), never "we / us / our". Legal pages
  are the only exception and may stay institutional.
- No em dashes or en dashes in any customer-facing copy.
- Garden / ogorod / tend / grow language is OFF-LIMITS in copy. The
  garden feel lives in icons, the beet mascot, and quiet visual touches,
  not in words.
- Privacy: founder is "Andrey" or "Andrey, Ogo Studio". Full last name
  never appears on the site.
- Platform: GeoFlag is Windows only. No Mac claims until a Mac build
  ships and is signed.

---

## 4. Architecture decisions (locked)

These are the locked decisions. Changing one is a rebuild trigger, not
a quick edit.

| # | Decision | Why |
|---|---|---|
| 1 | Vanilla HTML, CSS, JS. No framework. | Matches ops dashboard, zero build dependencies, GitHub Pages serves directly, survives infrastructure churn for 5+ years. |
| 2 | Multi-page architecture (8 pages). | Legal pages have stable URLs (Steam Partner backend links to them), SEO benefits, no SPA complexity for a brochure site. |
| 3 | No build step. | Files on disk = files in production. No webpack, vite, parcel, esbuild. Easier rebuild, easier handoff to future-Andrey. |
| 4 | Design tokens ported from ops dashboard `style.css`. | Single source of truth across studio surfaces. When brand book updates, both surfaces update together. |
| 5 | Content is hardcoded HTML, not synced from STUDIO.md. | Site has ~10 hardcoded facts. Sync infrastructure for 10 facts is over-engineering. Monthly review + milestone checklist catch drift. |
| 6 | Blog is hand-authored HTML per post. | Quarterly cadence makes a markdown pipeline unjustified. Claude Code drafts the HTML. |
| 7 | Deployment: GitHub Pages from `main` branch. | Free, already wired, already referenced from Steam store pages. |
| 8 | No custom domain. | `ogorod-com.github.io/ogostudio-site/` is fine. Custom domain decision deferred until there is a business reason. |
| 9 | Andrey's full last name never appears. | Privacy. Permanent rule. |
| 10 | GeoFlag is Windows only on this site. | Truthful current state. Re-add Mac if and when a Mac build ships. |
| 11 | Premium = craft, not flash. | See section 7. Brand-aligned interpretation of "high quality." |
| 12 | Native browser APIs only for motion. | View Transitions, scroll-driven animations, @property. No GSAP, no Lottie, no Three.js, no Framer Motion. |
| 13 | Progressive enhancement. | Site works on a 5-year-old browser without JS. Modern browsers get the polish. |
| 14 | Legacy Vercel deployment stays as museum. | First GeoFlag at `geoflag-game.vercel.app` preserved as historical artifact. No redirects, no merge. |

---

## 5. Page set

Eight pages. Each has one job. Don't expand without a brand book or
strategy update.

| Page | URL | Job |
|---|---|---|
| Landing | `/` (index.html) | Convert visitor to Steam (demo or wishlist). Show studio identity. State what's shipping and when. |
| About | `/about.html` | Tell the studio story. Andrey, ogorod origin (visually), the plan. Beet at the desk illustration. |
| Press | `/press.html` | Reviewer-ready: logos, screenshots (vintage + modern), fact sheet, embargo-friendly contact, key dates. |
| Blog index | `/blog/index.html` | List posts, newest first. Date + title + one-sentence excerpt. |
| Blog post | `/blog/posts/YYYY-MM-DD-slug.html` | Long-form. First person, garden language off-limits in body copy. |
| Support | `/support.html` | FAQ + Formspree contact form. First person. |
| Privacy | `/privacy.html` | Legal. Institutional voice acceptable. |
| EULA | `/eula.html` | Legal. Institutional voice acceptable. |
| Credits | `/credits.html` | Attribution: open source libraries, asset sources, Andrey credit (first name only). |
| 404 | `/404.html` | Beet waving with a sign. Single link back to home. |

Footer on every page: Steam funnel row (demo / wishlist / dev page /
community group) + legal row (privacy / EULA / credits / support).

Header on every page: wordmark left, nav right (Games / About / Blog /
Press / Support).

---

## 6. Design system

### 6.1 Colors

All values from Brand Book v0.3 §4. Defined as CSS custom properties
in `style.css` at `:root`.

Core:
- `--ogo-bg: #000000`
- `--ogo-bg-deep: #0a0c0e`
- `--ogo-glow: #52E2D0`
- `--ogo-glow-soft: rgba(82,226,208,0.15)`
- `--ogo-beet: #95113B`
- `--ogo-beet-light: #C2185B`
- `--ogo-beet-deep: #6A1040`
- `--ogo-leaf: #96D64E`
- `--ogo-leaf-deep: #93B83A`
- `--ogo-earth: #56441F`
- `--ogo-text: #FFFFFF`
- `--ogo-text-muted: #9A9EA3`
- `--ogo-line: rgba(255,255,255,0.06)`

Functional:
- `--ui-success: #6AB07A`
- `--ui-warning: #E8A838`
- `--ui-danger: #D86A5C`
- `--ui-panel: #14171B`
- `--ui-panel-2: #1A1E23`

Rules from Brand Book §4.3 apply verbatim. Beet palette is mascot only.
Leaf and earth are mascot only.

### 6.2 Typography

Three families self-hosted in assets/fonts/ as WOFF2 files (DM Sans,
Space Grotesk, JetBrains Mono). Each family ships with its OFL.txt
license file. @font-face rules in assets/css/style.css with
font-display: swap. The site makes ZERO external requests at runtime,
matching the privacy posture established for GeoFlag after the May 2026
legal audit.

- **Space Grotesk** weights 400, 500, 600 — display, headings, wordmark.
- **DM Sans** weights 400, 500 — body, UI labels.
- **JetBrains Mono** weight 400 — code, build IDs, timestamps, hex values.

Type scale tokens from Brand Book §5.2:
- `--type-display: 32px / 1.2 / 500 Space Grotesk`
- `--type-h1: 22px / 1.3 / 500 Space Grotesk`
- `--type-h2: 16px / 1.4 / 500 DM Sans (often uppercase + tracking)`
- `--type-body: 16px / 1.55 / 400 DM Sans`
- `--type-small: 14px / 1.4 / 400 DM Sans`
- `--type-micro: 11px / 1.3 / 500 DM Sans`
- `--type-mono: 14px / 1.4 / 400 JetBrains Mono`

All numeric data uses `font-variant-numeric: tabular-nums`.

### 6.3 Spacing

4px base unit. Approved values: 4, 8, 12, 16, 24, 32, 48, 64. Never an
arbitrary value. Defined as tokens `--space-1` through `--space-8`.

### 6.4 Borders and radius

- Border: `0.5px solid var(--ogo-line)`. Hairline, almost invisible.
- No box shadows on panels. Elevation = background brightness.
- Radius: 6px tiles, 8px panels, 10px cards, 12px hero containers.
  Never 0, never above 16.

### 6.5 Motion specs

- Default transition: 200ms ease-out.
- Slow transition: 400ms ease-out (wordmark glow, page-level state).
- Wordmark glow pulse: 4s ease-in-out infinite alternate.
- No bouncy or elastic easings. Brand violation.
- `@media (prefers-reduced-motion: reduce)` disables all motion.

---

## 7. Visual approach: premium through craft

This section is the rebuild's interpretation of "make it world class."
Read it before writing any visual code. The brand wins when motion is
restrained and craft is overwhelming.

### 7.1 The techniques we use

All are native browser features. No libraries.

1. **CSS scroll-driven animations** (`animation-timeline: view()` and
   `scroll()`). Safari 26+, Chrome 115+, Edge 115+, Firefox behind flag.
   Used for: section reveals on scroll entry, beet drift on hero
   scroll, reading progress bar on long posts. Wrapped in
   `@supports (animation-timeline: view())` for graceful fallback.

2. **View Transitions API** (`document.startViewTransition()` and
   `@view-transition` CSS rule). Used for: page navigation between
   landing, about, press, blog index. Default cross-fade plus custom
   slide for blog post entry. Wrapped in feature check.

3. **CSS `@property` for animatable custom properties.** Used for:
   wordmark glow pulse, cyan accent transitions, gradient angle
   animation on hero. Replaces JavaScript animation libraries.

4. **SVG fractal noise overlay.** A single inline SVG `<filter>` with
   `feTurbulence` applied as a 4-6% opacity overlay on the body. Gives
   the true-black canvas a tactile, printed feel. ~1KB. Inline, no
   request.

5. **Cursor spotlight on hero.** Small radial cyan glow at 10% opacity
   follows the cursor inside the hero section only. Pointer events
   none, GPU compositor only. Disabled on touch devices via media
   query.

6. **Sticky CTA after hero scroll.** Wishlist button collapses into
   the header bar after the visitor scrolls past the hero. Industry-
   standard conversion pattern. Achieved via Intersection Observer
   or `scroll-timeline` view boundary.

7. **Scroll snap on screenshot galleries.** Vintage and modern theme
   comparison uses `scroll-snap-type: x mandatory` for thumb scrolling
   on mobile. Keyboard arrows work. Reduced motion respected.

8. **Native `<dialog>` for press kit asset preview.** No modal library.
   `dialog.showModal()` is browser standard, fully accessible by
   default, escape closes it, focus trapped.

9. **`prefers-color-scheme`: do nothing.** Site is dark-only by
   design. Light mode toggle is brand violation.

### 7.2 The techniques we do not use

| Technique | Why we skip it |
|---|---|
| Three.js or any WebGL | Page weight, brand calm violation, no real player benefit |
| Particle backgrounds | "Look at me" energy, off-brand |
| GSAP, Framer Motion, Lottie, anime.js | Library bloat for what native CSS does in 2026 |
| Parallax that scrolls opposite the page | Disorienting, off-brand calm motion rule |
| Bouncy / elastic easings | Brand book §9.4 prohibits |
| Cursor trails | 2014 portfolio energy |
| Liquid blob morphs | Off-brand |
| Custom font loaders | Google Fonts `display=swap` is sufficient |
| jQuery | Year is 2026 |
| Tailwind | Adds a build step, contradicts decision 3 |
| React, Vue, Svelte | Brochure site, no state, contradicts decision 1 |

### 7.3 Browser support strategy

- **Baseline target:** evergreen Chrome, Edge, Firefox, Safari from the
  last 2 years. Mobile Safari 15+, Mobile Chrome 115+.
- **Progressive enhancement:** scroll-driven animations, View
  Transitions, and `@property` are wrapped in `@supports`. The site
  is fully functional and reads correctly without any of them.
- **Reduced motion:** every animation has a `@media
  (prefers-reduced-motion: reduce)` override that sets `animation:
  none` and disables transitions.
- **Reduced data:** no `prefers-reduced-data` handling needed because
  total page weight is already under the budget in section 11.
- **No IE, no legacy Edge.** Steam Hardware Survey shows neither
  matter to the audience.

### 7.4 Benchmarks (re-reference when evaluating mockups)

- `thatgamecompany.com` — calm minimal, premium without effects.
- `noita.steamcommunity.com` (Noita marketing site) — specific copy,
  minimal layout, atmospheric.
- `heartmachine.com` — one notch more motion, still restrained.
- `annapurnainteractive.com` — premium catalog presentation.

If a design choice looks more like a SaaS startup than these
references, redesign it.

---

## 8. Tech stack

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`) on every page |
| Styling | Vanilla CSS with custom properties, modern selectors (`:has()`, `:is()`, `:where()`), container queries where useful |
| Scripting | Vanilla JS, ES modules, optional. Used only where View Transitions, Intersection Observer, or progressive enhancement require it |
| Fonts | Self-hosted WOFF2 in assets/fonts/ (Space Grotesk, DM Sans, JetBrains Mono), font-display: swap. Zero external requests. |
| Images | WebP for screenshots and photos, SVG for logos and icons, PNG for the pixel-art beet (with `image-rendering: pixelated`) |
| Forms | Formspree (existing ID `mzdybylw`) |
| Analytics | None. Steam handles attribution. |
| Comments | None on blog. Steam community hub is the conversation surface. |
| Search | None. Single-digit page count makes search unjustified. |
| Hosting | GitHub Pages on the `ogostudio-site` repo `main` branch |
| Deployment | Auto on push to `main`. No CI required. |
| DNS | None. Use the `.github.io` URL. |

Total runtime dependencies: zero npm packages. The repo never gets a
`package.json`.

---

## 9. Asset requirements

### 9.1 Logos (canonical, already exist)

Located in `_Studio/Ogo Studio Logo/`. Site copies what it needs into
`/assets/logo/`:
- `ogo-studio-lockup.png` — header on all pages, larger hero treatment on landing
- `ogo-mark.png` — favicon source, social profile preview, small footer mark
- `founder-lockup.png` — about page founder section
- `founder-avatar-184.png` — about page founder section (alt)
- `beet-at-desk.png` — about page hero illustration

Transparent-background variants are pending per Brand Book §6.4.
Generate when capacity allows. Until then, flattened-to-black versions
work on every page since the canvas is `--ogo-bg`.

### 9.2 Beet illustration roster

Per Brand Book §6.2 (mascot vs logo). Generate over launch milestones,
not all at once. Initial set of 5:

1. **Beet at the desk** (exists) — about page hero.
2. **Beet sleeping or resting** — empty states, footer easter egg.
3. **Beet waving with a small sign** — 404 page.
4. **Beet writing or thinking** — blog post hero, dev log moments.
5. **Beet on a small boat** — press kit, expedition framing.

Future expansions tied to milestones: beet celebrating (full launch
July 13), beet planting (Game 2 announcement), beet meditating
(retrospectives).

All beet illustrations: pixel-art style, transparent background,
character always faces forward or screen-right (Brand Book §6.3),
output at 2x for retina at minimum.

### 9.3 Screenshots

Six total to start, all from the current GeoFlag build:
- 2 vintage walnut theme (hero use)
- 2 modern frosted glass theme (hero use)
- 1 daily challenge screen
- 1 study mode map

Format: WebP at 1920×1080 source, served at responsive sizes via
`<picture>` + `srcset`. Compressed to under 200KB each.

### 9.4 Favicon set

Generated from `ogo-mark.png`:
- `favicon.ico` — 32×32 multi-resolution
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` — 180×180
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `site.webmanifest`

### 9.5 Open Graph and Twitter Card

One social preview image per page minimum:
- `og-default.png` — 1200×630, wordmark + tagline on `--ogo-bg`
- `og-geoflag.png` — 1200×630, GeoFlag capsule treatment
- `og-press.png` — 1200×630, "Press kit for reviewers" + wordmark

---

## 10. Content sources and the manual-update rule

Fork 2 decision: content is hardcoded, not synced from STUDIO.md.

To stop drift, every hardcoded fact on the site has an HTML comment
above it citing the truth source. Pattern:

```html
<!-- TRUTH: STUDIO.md launch date row -->
<p>Full game launches July 13, 2026</p>

<!-- TRUTH: STUDIO.md tools stack section -->
<p>Built with Tauri v2.</p>

<!-- TRUTH: GeoFlag CLAUDE.md game modes section -->
<p>154 countries, 4 game modes.</p>
```

Claude Code reads these comments during any future edit and verifies
the truth source before committing. Future-Andrey doing a manual edit
can grep for `<!-- TRUTH:` to find every fact and re-verify.

---

## 11. Performance budget

| Metric | Target | Hard ceiling |
|---|---|---|
| Initial page weight (landing) | < 400KB | 800KB |
| Total page weight including all images | < 1MB | 2MB |
| LCP (Largest Contentful Paint) | < 1.5s | 2.5s |
| CLS (Cumulative Layout Shift) | < 0.05 | 0.1 |
| FID / INP (input responsiveness) | < 100ms | 200ms |
| Font count loaded per page | 3 families max | — |
| JS payload (compressed) | < 5KB | 15KB |

Verified on a throttled "Slow 4G" profile with Chrome DevTools before
each merge to `main`. Failing the hard ceiling blocks the merge.

---

## 12. Accessibility minimums

- Semantic HTML on every page. `<main>` wraps the unique page content.
- `<html lang="en">` on every page.
- Skip-to-content link as the first focusable element on every page.
- All images have `alt` text. Decorative images use `alt=""`.
- Keyboard navigation works without JS. Visible focus rings using
  `--ogo-glow`.
- Color contrast: body text on background passes WCAG AA (4.5:1
  minimum). Muted text on background passes 3:1.
- `prefers-reduced-motion` honored everywhere there is motion.
- Form labels are real `<label>` elements, not placeholder text.
- Native `<dialog>` for any modal (focus trap and escape are free).
- No `tabindex` greater than 0. Source order matches reading order.

---

## 13. SEO and social

### 13.1 Meta tags (every page)

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{Page-specific title} · Ogo Studio</title>
<meta name="description" content="{Page-specific 150-160 chars}">

<meta property="og:type" content="website">
<meta property="og:title" content="{Same as title}">
<meta property="og:description" content="{Same as description}">
<meta property="og:image" content="{Absolute URL to og image}">
<meta property="og:url" content="{Canonical URL}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{Same as title}">
<meta name="twitter:description" content="{Same as description}">
<meta name="twitter:image" content="{Same as og:image}">

<link rel="canonical" href="{Canonical URL}">
<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

### 13.2 Title pattern

`{Page name} · Ogo Studio` for sub-pages.
`Ogo Studio · Games for curious players` for landing.
Use middle dot (·) not pipe (|). Never em dash.

### 13.3 Sitemap and robots

- `/sitemap.xml` listing every page with `lastmod`.
- `/robots.txt` allowing all, pointing to sitemap.

### 13.4 Structured data

`Organization` JSON-LD on landing page minimum. `BlogPosting` on blog
posts. Author is "Andrey" only.

---

## 14. File and folder structure

```
ogostudio-site/
├── index.html              landing
├── about.html
├── press.html
├── support.html
├── privacy.html
├── eula.html
├── credits.html
├── 404.html
├── sitemap.xml
├── robots.txt
├── site.webmanifest
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── README.md
├── WEBSITE-ARCHITECTURE.md  this file
├── blog/
│   ├── index.html
│   ├── _template.md
│   └── posts/
│       └── 2026-05-25-why-i-made-geoflag.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── enhance.js       optional, View Transitions + cursor spotlight
│   ├── logo/
│   │   ├── ogo-studio-lockup.png
│   │   ├── ogo-mark.png
│   │   ├── founder-lockup.png
│   │   ├── founder-avatar-184.png
│   │   └── beet-at-desk.png
│   ├── beet/
│   │   ├── beet-sleeping.png
│   │   ├── beet-waving.png
│   │   ├── beet-writing.png
│   │   └── beet-on-boat.png
│   ├── screenshots/
│   │   ├── vintage-01.webp
│   │   ├── vintage-02.webp
│   │   ├── modern-01.webp
│   │   ├── modern-02.webp
│   │   ├── daily.webp
│   │   └── study.webp
│   ├── og/
│   │   ├── og-default.png
│   │   ├── og-geoflag.png
│   │   └── og-press.png
│   └── press-kit/
│       └── ogo-studio-press-kit.zip
├── .claude/
│   └── settings.local.json
└── .gitignore
```

---

## 15. Deployment

- **Host:** GitHub Pages.
- **Source:** `main` branch, root directory.
- **Build:** none.
- **Push to deploy:** every commit on `main` deploys within ~1 minute.
- **URL:** `https://ogorod-com.github.io/ogostudio-site/` — preserved
  exactly. Linked from Steam store pages. Never changes without
  Steam Partner backend update first.
- **Custom domain:** not configured. Decision deferred until a
  business reason exists.
- **CDN:** GitHub Pages includes Fastly-backed edge serving. No
  additional configuration.

### 15.1 Legacy Vercel preservation

The first GeoFlag site at `https://geoflag-game.vercel.app` is kept
live as a historical artifact ("museum"). No redirect, no merge, no
canonical link. It represents an earlier version of the project and
stays untouched. Retirement strategy permanently deferred.

---

## 16. Maintenance system

Three mechanisms to keep the site from drifting.

### 16.1 Monthly review

Added to `STUDIO.md` monthly goals: "site freshness check." Five
minutes to:
1. Visit landing, scan for stale dates, prices, status claims.
2. Click every Steam link in the footer. Confirm all four resolve.
3. Confirm support page platform line still matches shipping reality.
4. If anything is wrong, fire a hot-patch via Claude Code that day.

### 16.2 Launch checklist (per milestone)

A `MILESTONES.md` file in this repo lists, for each milestone
(demo update, Next Fest, full launch, future game launches), the
exact pages and lines to update. Example block:

```
## Full launch July 13, 2026
- [ ] index.html: replace status block; remove "demo available now"; add "available now on Steam"
- [ ] index.html: replace launch date with "released July 13, 2026"
- [ ] press.html: update fact sheet with final review aggregate
- [ ] blog post: launch day announcement
- [ ] About page: update studio status line
- [ ] Update Last updated date on legal pages
```

Each milestone block is created when the milestone is announced. The
template lives in the same file.

### 16.3 Drift detection via TRUTH comments

Pattern documented in section 10. Every hardcoded fact in HTML carries
a comment pointing to its truth source. Claude Code can grep for
`<!-- TRUTH:` and cross-reference STUDIO.md or the relevant project
docs to find drift.

Future: Cowork can be extended to run a Friday cross-reference task.
Not built today.

---

## 17. Future evolution

When Game 2 ships, the site grows without a rebuild.

### 17.1 The Games index

`index.html` evolves from "GeoFlag-forward" to "Studio-forward":
- Hero stays studio-level (curiosity, exploration, one-person studio).
- Section below the hero becomes a games grid: GeoFlag tile + Game 2
  tile + future tiles.
- Each game tile has its own deeper page at `/games/{slug}.html`.
- GeoFlag's current content moves to `/games/geoflag.html`.

### 17.2 Per-game pages

Telltale model: each game can have its own visual treatment within the
studio brand chrome. The header, footer, and underlying token palette
stay studio. The hero, screenshots, and game-specific copy lean into
that game's identity (vintage walnut for GeoFlag, whatever for Game 2).

### 17.3 Triggers for rebuild

Rebuild this site only if one of the following is true:
1. The brand book version jumps past v1.0 with material identity
   change (new mascot, new core palette).
2. The studio expands beyond one person and needs team representation.
3. A platform or browser shift makes the current stack untenable
   (e.g., GitHub Pages discontinues, or HTML standards change).

Cosmetic tweaks, new pages, new games, content updates are not rebuild
triggers. They are commits.

---

## 18. Out of scope (deferred decisions)

These are intentionally not built or decided. Revisit only when
prompted.

| Item | Why deferred |
|---|---|
| Custom domain | No business reason. `.github.io` is fine for personal infra. |
| Newsletter / email capture | Steam wishlister email already exists as the channel. |
| RSS feed for blog | Quarterly posting cadence makes RSS over-engineered. Revisit if posting frequency hits monthly. |
| i18n / translations | Audience is English-speaking. Steam handles localization for the game itself. |
| Comments on blog | Steam community hub is the conversation surface. |
| Analytics | Steam handles attribution. No client-side tracking on the site. |
| Search | 8 pages. Browser Cmd-F covers it. |
| Discord widget embed | Discord isn't built yet. Add when it is. |
| Direct download / itch.io mirror | Steam-first studio. Re-evaluate post-launch. |
| Game 2 page | Game 2 is in exploration. Build the page when there's something to show. |

---

## 19. Version history

- **v1.1** — May 28, 2026. Font delivery changed from Google Fonts CDN
  to self-hosted WOFF2 to eliminate external requests and align with the
  privacy claim that the site collects no device identifiers.
- **v1.0** — May 27, 2026. Initial architecture document written
  during rebuild stage 1. Locked architecture decisions, defined page
  set, design system pointer to Brand Book v0.3, visual approach
  ("premium through craft"), maintenance system to prevent drift.

---

**End of architecture document.**
