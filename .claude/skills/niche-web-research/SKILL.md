---
name: niche-web-research
description: Worldwide research protocol that finds 10 current, relevant/trending websites for a given niche and turns them into a compact reference matrix plus a design synthesis. Use when a website brief needs market/design references, when the user asks what sites in a sector look like today, or before designing a site for an unfamiliar niche.
---

# Niche Web Research

Goal: 10 live, verified, diverse websites in the requested niche that are useful visual references for the brief's goal, backed by current web evidence rather than memory.

## 0. Before searching
- If `.web-work/research.md` already exists for this niche, reuse it. Extend it only if the brief asks something new.
- From `.web-work/brief.md`, take the niche, the goal, the target market(s) and the positioning (e.g. premium vs. accessible). These shape the queries.

## 1. Discover (several channels, narrow queries)
Use at least 3 channel types. Never rely on a single results page:
- General web search in English plus 1–2 other relevant languages/markets (e.g. `"<niche> website" design 2026`, `best <niche> websites`).
- Design discovery/awards: Awwwards, CSS Design Awards, Godly, Land-book, Httpster, SiteInspire, Lapa Ninja, One Page Love (as available).
- Recent industry roundups/articles (check the publication date).
- Social/discovery surfaces (Dribbble/Behance case studies of live sites, Instagram/TikTok/X mentions) when accessible.
- Traffic/visibility indicators only when a tool actually exposes them.

Build a candidate list of about 15–20. Record the source URL for each candidate.

## 2. Select 10
Score each candidate qualitatively on: niche relevance · currentness evidence · visual quality · usefulness for this brief's goal · diversity vs. already-selected sites · ease of inspection.
- Aim for geographic and stylistic diversity (different markets, price tiers, layout families).
- Exclude near-duplicates, dead or parked sites, and sites behind login/geo-walls.
- Open each finalist (browser tool, or WebFetch if no browser is available) to confirm it is live and the observations are real. If a site can't be verified, mark it and replace it where possible.

## 3. Observe each site (one pass per site)
Prefer parallel inspection over serial inspection when the tooling supports it and it reduces total context: for example, 2–3 subagents, each given a batch of URLs and told to return only the 11 fields per site. Otherwise inspect the sites serially, keeping notes terse.
Record these 11 fields: name/brand · URL · country/market (if identifiable) · why relevant · what is currently notable/trending (with evidence) · hero pattern · navigation pattern · CTA pattern · typography/spacing · notable components/interactions · what to adapt without copying.

## 4. Output → `.web-work/research.md`
```
# Research: <niche> (<date>)
Method: channels used, queries (short), limitations.

| # | Site | Market | Why Relevant | Hero Pattern | CTA Pattern | Design Signal | Evidence |
|---|------|--------|--------------|--------------|-------------|---------------|----------|

## Per-site notes
### 1. <Name> — <URL>
- Nav / Typography & spacing / Components & interactions / Adapt (not copy): …

## Synthesis
- Common patterns worth using
- Patterns becoming common that should not be copied blindly
- Opportunities to differentiate
- Recommended direction for this site
```

## Honesty rules
- No invented trend scores, traffic, awards or dates. Prefer a qualitative "why selected" to false precision.
- Every recency or trend claim cites its evidence (e.g. an award page, a roundup date, a visible "© 2026", a recent launch post).
- If real-time trend signals are unavailable, say so and explain how you triangulated.
- If fewer than 10 sites could be verified, deliver the verified ones and state the gap.
