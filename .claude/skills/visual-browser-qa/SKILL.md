---
name: visual-browser-qa
description: Browser validation loop and quality gates for a built website - desktop/mobile/intermediate viewports, navigation, hero, typography, spacing, CTAs, media, forms, focus states, console errors, broken links and obvious accessibility issues - reported as PASS / NEEDS FIXES per gate. Use after any website build or change, and before declaring a website done.
---

# Visual Browser QA

A website is not complete because it compiles. Verify it in a real browser.

## 1. Setup
- Start the dev server (or use the URL provided) and note the URL and the command.
- Browser tooling, in order of preference: whatever browser MCP is available (Claude in Chrome, Playwright MCP, Chrome DevTools MCP). If none exists, report "**Browser QA not possible: no browser tool**". Then do only static checks (build output, HTML via curl/WebFetch, link crawl), mark every visual gate `NOT VERIFIED`, and tell the user how to enable one.
- Viewports: **1440×900** (desktop), **390×844** (mobile), **768×1024** (intermediate). Spot-check 320px width for overflow.
- Read `.web-work/design-direction.md` (hero spec and CTA hierarchy) before looking, so you compare against the agreed intent rather than taste.

## 2. Inspect (one pass per viewport, reuse screenshots)
desktop · mobile · navigation (links, mobile menu open/close, sticky behaviour) · hero (focal point, hierarchy, CTA above the fold, media crop) · typography wrapping (orphans, overflow, clipped headings) · spacing rhythm · CTA behaviour (destination, hover/focus) · images/media (load, crop, alt) · forms if present (labels, validation, submit path) · hover/focus states (keyboard Tab through the page) · console errors/warnings · broken routes/links (all internal links, plus anchors) · obvious accessibility issues.

## 3. Quality gates
Report each gate as PASS / NEEDS FIXES / NOT VERIFIED / N/A:
- **FUNCTIONAL:** requested routes/pages exist · navigation works · primary CTA works or is correctly wired for the environment · no blocking errors.
- **VISUAL:** hero matches the approved design direction · hierarchy is clear · spacing is consistent · typography is readable · imagery fits the composition · no clipping/overflow at common widths.
- **RESPONSIVE:** desktop checked · mobile checked · intermediate layout is sensible.
- **ACCESSIBILITY:** semantic structure · visible keyboard focus · adequate contrast · alt text for meaningful images · form labels and accessible controls.
- **PERFORMANCE:** no unnecessary heavy assets/dependencies · sound image strategy · no obvious render-blocking or repeated client-side work.
- **SEO BASICS:** meaningful title/metadata · one clear heading hierarchy · descriptive link/button text · crawlable structure where SEO matters.
- **REFERENCE FIDELITY:** the reference's useful structural/design principles are captured, and the result is not a clone.

Use the `web-performance-accessibility-seo` skill for the detailed performance/a11y/SEO checks.

## 4. Report → `.web-work/qa-report.md`
```
# QA report — round <n> — <date> — <url>
Tooling: <browser tool> | Viewports: …
| Gate | Status |
## Issues
| ID | Gate | Severity (blocker/major/minor/polish) | Viewport | Issue (exact, with selector/section) | Suggested fix | Retest |
```
Severity order is the fix order: broken functionality > layout breakage > readability/accessibility > visual polish.

## 5. Loop
After the builder fixes issues, retest **only the affected items**, plus a quick smoke test of the hero and nav on both main viewports. Update the Retest column. Stop when there are no blocker/major issues and every applicable gate is PASS (or NOT VERIFIED with a stated reason).
