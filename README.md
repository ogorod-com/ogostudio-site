# Ogo Studio Website

Static studio site for Ogo Studio. Built on a single locked shell (header,
footer, design tokens, motion system) with self-hosted fonts and zero external
requests at runtime. Deployed via GitHub Pages at
`https://ogorod-com.github.io/ogostudio-site/`.

See `WEBSITE-ARCHITECTURE.md` for the locked architecture decisions, page set,
design system, and maintenance rules.

## Pages (9 public)

- `index.html`: Landing. Studio identity + GeoFlag showcase + Steam funnel.
- `about.html`: The studio story and where it is going.
- `press.html`: Press kit. Fast facts, screenshots, logos, contact.
- `support.html`: FAQ accordion + Formspree contact form.
- `privacy.html`: Privacy policy.
- `eula.html`: Terms of use.
- `credits.html`: Credits and attributions.
- `blog/index.html`: Dev blog index.
- `blog/posts/`: Individual blog post HTML files.
- `404.html`: Not-found page (served by GitHub Pages, uses absolute paths).

## Stack

- Vanilla HTML, CSS, and a tiny JS module. No framework, no build step.
- All styling lives in `assets/css/style.css`.
- Progressive enhancement in `assets/js/enhance.js` (cursor spotlight, sticky
  CTA, mobile menu, View Transitions). The site is fully usable without it.
- Fonts are self-hosted WOFF2 in `assets/fonts/` (DM Sans, Space Grotesk,
  JetBrains Mono), `font-display: swap`. No Google Fonts CDN, no external
  requests at runtime. Matches the GeoFlag privacy posture.

## Assets

- `assets/css/style.css`: the one stylesheet for every page.
- `assets/js/enhance.js`: optional progressive enhancement.
- `assets/fonts/`: self-hosted WOFF2 + OFL licenses.
- `assets/logo/`, `assets/beet/`: brand marks and the pixel-art beet mascot.
- `assets/screenshots/`: GeoFlag screenshots (WebP, responsive).
- `assets/og/`: Open Graph social images.
- Favicons, `site.webmanifest`, `sitemap.xml`, `robots.txt` at the repo root.

## Support form

The contact form on `support.html` posts to Formspree (form ID `mzdybylw`).

## Deploy

GitHub Pages from the `main` branch, root directory. No build, no CI. Every
push to `main` deploys within about a minute.
