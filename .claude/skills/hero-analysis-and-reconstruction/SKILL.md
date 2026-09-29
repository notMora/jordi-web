---
name: hero-analysis-and-reconstruction
description: Specialised checklist for extracting a reference site's hero (geometry, hierarchy, media, copy, CTA, trust/proof, responsive behaviour) and translating it into an original hero design and implementation. Use when analysing a reference hero, designing a hero section, or building/reviewing one.
---

# Hero Analysis & Reconstruction

The hero is the priority component. The final hero must feel intentional and coherent even if downstream sections are simplified.

## A. Extraction checklist (from a reference)
- **Geometry:** approximate height (vh or px at 1440/375), column/grid relationship (e.g. 7/5 split, centred single column, full-bleed), text alignment, media position, safe margins.
- **Hierarchy:** first visual focal point · eyebrow/badge · headline (size relative to body, line count, weight) · subheadline length · reading order.
- **Media:** photo/video/illustration/3D/none · crop and treatment (overlay, duotone, mask) · motion (autoplay, parallax, reveal).
- **Copy:** message type (benefit, identity, offer, place) · tone · length. Record the *pattern*, never the text.
- **CTA:** count, primary vs. secondary styling, geometry (size, radius, fill/outline), placement relative to the headline, what it leads to.
- **Trust/proof:** ratings, logos, press, metadata (location, hours, price range), scarcity. Note what exists, not invented values.
- **Nav interplay:** transparent/solid header, overlap with media, sticky behaviour.
- **Brand impression:** the intended emotion in 3–5 words.
- **Responsive:** observed mobile layout, or a hypothesis marked `HYPOTHESIS:` (stacking order, media crop, CTA width, headline size).

## B. Pre-coding gate (answer all 9 before building)
1. What is the first visual focal point?
2. What is the headline hierarchy?
3. What does the user understand within 3 seconds?
4. Where is the primary CTA?
5. What supporting proof/trust element exists?
6. What is the media composition?
7. How does the hero behave on mobile?
8. Which elements are essential vs. decorative?
9. Which traits are adapted from references, and which are original?

## C. Reconstruction ledger (in the design direction)
| Trait | Source (REF-n / research #n / original) | Adaptation | Why |
Rules: adapt *principles* (proportion, hierarchy, rhythm, CTA logic), not assets or copy. Introduce at least one deliberate original differentiator (composition, typography pairing, media treatment or interaction).

## D. Build notes
- Use a semantic `<header>`/`<section>` with exactly one `<h1>` on the page (usually in the hero).
- Keep the LCP media optimised: sized, modern format, priority-loaded, never lazy-loaded above the fold.
- Headline sizes use `clamp()` so they don't overflow at 320px, and there is no fixed pixel height that clips content.
- Text over media must meet contrast requirements (use an overlay or scrim if needed).
- The CTA is a real `<a>` or `<button>` with descriptive text and a visible focus state.
