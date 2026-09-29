---
name: reference-site-analysis
description: Browser-based analysis of user-supplied reference URL(s) as a design system - structure, visual hierarchy, hero, components, responsive behaviour, content and conversion patterns - converted into implementation guidance without copying. Use whenever the user provides a reference website, says "like this site", or supplies several references to combine.
---

# Reference Site Analysis

Treat the reference as a design system to understand, not code or content to copy.

## Classify references first
Tag each URL as **PRIMARY** (the direction to follow), **SECONDARY** (specific elements only) or **INSPIRATION-ONLY** (mood). If the user didn't say, infer it from their wording and mark it `ASSUMPTION:`.

## Protocol (once per URL, one complete pass)
1. Open the page with a browser tool (Claude in Chrome, Playwright MCP, Chrome DevTools MCP, whichever is available). Inspect the **rendered** page, not only the HTML.
2. Capture the above-the-fold area at desktop width (~1440) and mobile width (~375). If resizing isn't possible, say so.
3. Scroll the full page once and note the section order.
4. For the hero, apply the `hero-analysis-and-reconstruction` skill.
5. Write observations, keeping **Observed** facts separate from **Interpretation**.
6. Convert them into implementation guidance.
7. Never copy the reference's proprietary text, logos, images, video or code into the project.

No browser tool available: use WebFetch for structure and copy hierarchy, and state "visual inspection not performed". Page inaccessible (blocked, login, geo, errors): report it, invent nothing, and fall back to user screenshots or other verified references if available.

## Extraction checklist
page purpose · target audience signals · header/nav structure · hero composition · hero height and above-the-fold hierarchy · headline/subheadline relationship · primary and secondary CTA placement · image/video treatment · typography hierarchy (families/classification, weights, relative sizes) · colour palette and contrast behaviour · spacing/rhythm · card/component patterns · section order · footer structure · responsive clues · motion/interaction patterns · trust signals/social proof · visible conversion strategy.

## Multiple references
Synthesise the shared principles, and attribute every adopted element to its source (e.g. "hero split from REF-1, card rhythm from REF-2"). Where references conflict, list the conflict and recommend one side, justified by the brief. Never merge them blindly.

## Output → `.web-work/reference-analysis.md`
```
# Reference analysis
## REF-1 <URL> — PRIMARY
Access: full | partial (why) | failed (why)
### Observed        (checklist items, terse)
### Hero breakdown  (from hero skill)
### Interpretation  (why it works, for whom)
### Guidance        (adopt / adapt / avoid)
## Synthesis (only if more than one reference): shared principles · attributions · conflicts → recommendation
```
