---
name: responsive-web-implementation
description: Implementation rules for building website pages and components that work on desktop, tablet and mobile - stack detection, semantic HTML, accessible controls, fluid layout, reuse and maintainability. Use when writing or modifying website code (pages, sections, components, styles).
---

# Responsive Web Implementation

## 1. Detect before building
- Inspect `package.json`, framework config, the styling approach, existing components/tokens and routing. Respect what exists.
- Greenfield with no stack given: use TypeScript + Next.js (App Router) + Tailwind CSS. For a single static page with no build needs, plain semantic HTML/CSS is acceptable if the brief favours simplicity. Record the choice in `decision-log.md`.
- Before creating anything, search for an existing component or utility that already does it.

## 2. Structure
- Use semantic landmarks: `header`, `nav`, `main`, `section` (each with a heading), `footer`. Exactly one `h1` per page, and headings in order.
- Links navigate (`<a href>`) and buttons act (`<button>`). Never use a clickable `div`.
- Keep content data-driven where practical: copy, nav items, menu/products/services in typed data objects or content files, not scattered through the markup.
- Map design tokens to CSS variables or the Tailwind theme once, then use them everywhere. No magic numbers.

## 3. Responsive
- Build mobile-first. Suggested breakpoints are ~640 / 768 / 1024 / 1280, or the project's own.
- Use fluid type and spacing (`clamp()`), a container with max-width plus side padding (≥ 16px on mobile), and grid/flex that re-flows rather than shrinks.
- Never hard-code widths or heights that break at 320–1920px. Use `min-height` instead of `height` for heroes, and `svh`/`dvh` for mobile viewport units.
- Images use `srcset`/`sizes`, or the framework's image component with explicit dimensions or aspect-ratio to prevent layout shift. Use `object-fit` for crops.
- Check long words and URLs (`overflow-wrap: anywhere` where needed). No horizontal scroll.
- Navigation needs a working mobile menu (toggle with `aria-expanded`, focus management, closes on link click/Escape).

## 4. Accessibility (build it in)
- Visible `:focus-visible` styles and a logical tab order. Include a skip link if the nav is long.
- Meaningful images get descriptive `alt`, and decorative ones get `alt=""`.
- Every form field has a `<label>`, errors are announced, and inputs use the correct `type` and `autocomplete`.
- Respect `prefers-reduced-motion`. Meet the contrast pairs from the design direction.

## 5. Maintainability
- Use small components with clear props and no dead code. Add a dependency only when it saves meaningful work, and state the reason.
- Placeholder assets must be neutral and clearly placeholders (e.g. a solid/gradient block with an aspect ratio, or a labelled local SVG). Never hotlink the reference site's assets.
- After building, run the project's lint/typecheck/build if available, then hand off to `visual-qa`.
