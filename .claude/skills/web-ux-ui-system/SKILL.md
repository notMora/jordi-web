---
name: web-ux-ui-system
description: Turns the brief, niche research and reference analysis into a concise, original design direction - visual direction, design tokens, type/spacing scales, components, page sections, responsive and motion behaviour, art direction and CTA hierarchy - without overdesigning. Use before implementing any new website or major redesign.
---

# Web UX/UI System

Inputs: `.web-work/brief.md`, plus `research.md` and `reference-analysis.md` if they exist. Output: `.web-work/design-direction.md`, about 1–2 screens long. It is a decision document, not a style-guide novel.

## Principles
- Match the niche and the brand positioning (premium, playful, clinical, local, etc.) from the brief.
- Research tells you what is *current*. Differentiate through composition, content and implementation, not by novelty for its own sake.
- Preserve the user's reference intent (PRIMARY first) while producing an original result.
- Avoid the generic "AI website" look: default purple gradients, centred everything, identical three-card rows, meaningless blobs and glassmorphism, stock emoji icons. Each visual choice needs a reason tied to the niche or brief.
- Use the smallest token set that covers the page. Don't add tokens or variants that nothing uses.
- If the project already has a design system or tokens, extend them instead of replacing them.

## Deliverable structure
1. **Visual direction:** 3–5 adjectives, a one-paragraph rationale, and what we deliberately avoid.
2. **Tokens**
   - Colour: background, surface, text, muted text, primary/accent, border, plus states. Check contrast pairs (body text ≥ 4.5:1, large text ≥ 3:1). Use brand colours from the brief if provided.
   - Type: 1–2 families with a fallback stack and the licence source (e.g. Google Fonts). Fluid scale with `clamp()` for display/h1/h2/h3/body/small, plus line-heights.
   - Spacing: a 4- or 8-based scale, section padding (mobile → desktop) and container max-width.
   - Radius/border strategy (one or two radii, used consistently) and shadow/elevation, if any.
3. **Component inventory:** only what the pages need (e.g. header/nav + mobile menu, hero, buttons, card, form fields, footer), with variants.
4. **Page architecture:** the section order per page, each with purpose and content source (brief, `[PLACEHOLDER]` or asset). Use the `website-content-structure` skill.
5. **Hero spec:** answers to the 9 questions and the reconstruction ledger from `hero-analysis-and-reconstruction`.
6. **Responsive behaviour:** breakpoints and how each key section transforms.
7. **Interaction/motion:** purposeful and subtle. Include a `prefers-reduced-motion` fallback.
8. **Art direction:** photography/illustration style, crops and treatment, and asset sourcing (user assets, licensed stock or neutral placeholders).
9. **CTA hierarchy:** one primary action with its repeat points, secondary actions, and where each leads.
10. **Contradictions resolved:** conflict → decision → reason. Append these to `decision-log.md`.
