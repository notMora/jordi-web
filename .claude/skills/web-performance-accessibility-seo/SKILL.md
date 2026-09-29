---
name: web-performance-accessibility-seo
description: Practical final-audit checks for website performance, accessibility, metadata, heading structure, image handling, basic SEO and indexability. Use during the final audit of a website, when reviewing a page's quality, or when building metadata, images or forms.
---

# Web Performance, Accessibility & SEO

Do practical checks, not exhaustive audits. Use Lighthouse (or the browser tool's audit) if it's available; otherwise do the manual checks below. Report measured numbers only. Never estimate scores.

## Performance
- **Dependencies:** there is no library for something a few lines of CSS/JS can do. Check the bundle for accidental large imports (icon packs, full lodash, animation libraries used once).
- **Images:** modern formats (AVIF/WebP) where supported · explicit dimensions or aspect-ratio · responsive `srcset`/`sizes` or the framework's image component · the hero/LCP image eager-loaded with priority, everything below the fold lazy-loaded · no multi-MB originals.
- **Fonts:** at most 2 families and only the weights used, with `font-display: swap`, and self-hosted or preconnected.
- **Rendering:** no render-blocking third-party scripts in `<head>` · animations on `transform`/`opacity` · no layout shift from late-loading media · no repeated client-side work (effects re-running each render, unthrottled scroll handlers).
- **Video:** muted, `playsinline`, a poster image, sized sources, and no autoplay on mobile if it's heavy.

## Accessibility
- Landmarks are present · one `h1` · no skipped heading levels.
- Keyboard: every interactive element is reachable, focus is visible, and the mobile menu is operable and escapable.
- Contrast: body text ≥ 4.5:1, large text/UI ≥ 3:1 (check text over images specifically).
- Images: meaningful ones have descriptive `alt`, decorative ones `alt=""`.
- Forms: labels, error messages linked via `aria-describedby`, correct input types and `autocomplete`.
- `lang` attribute set · `prefers-reduced-motion` respected · no information conveyed by colour alone.

## SEO basics (where SEO matters)
- A unique `<title>` (~50–60 chars) and meta description (~150–160) per page, reflecting only real business facts.
- Open Graph/Twitter image and title · canonical URL · favicon.
- A clear heading hierarchy · descriptive link/button text · crawlable `<a href>` navigation, not JS-only.
- `robots` not blocking in production · a sitemap if there are multiple pages · meaningful URLs.
- Structured data only when the facts are real and provided (e.g. `LocalBusiness`/`Restaurant` with a real address and hours). Never use placeholder values in JSON-LD.

## Output
Add a "Final audit" section to `.web-work/qa-report.md`: check → PASS/NEEDS FIXES/N/A → evidence (a measurement or observation) → fix.
