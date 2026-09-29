---
name: seo-lead-generation
description: Evidence-based SEO protocol for lead-generation websites in any niche and market - keyword research without paid tools, SERP analysis, keyword-to-URL mapping, site architecture, on-page, technical SEO (canonical, hreflang, sitemap, structured data), conversion of organic visits into enquiries/calls, measurement and an off-page checklist - with no fabricated data and no black-hat tactics. Use when planning or auditing a site's search visibility, writing SEO copy, or adding pages meant to rank and capture leads.
---

# SEO for Lead Generation

The goal is qualified enquiries (calls, bookings, form leads), not traffic for its own sake. Rank for searches with commercial intent that the business can actually serve, then convert them.

## 1. Honesty rules (non-negotiable)
- Never promise or imply a guaranteed ranking. Say what code and content can control (technical quality, relevance, conversion) and what they can't (authority, competition, algorithm changes, time).
- Never invent search volumes, difficulty scores, traffic, CTRs or competitor metrics. Without a keyword tool, write `volume: unverified` and prioritise by intent, SERP evidence and business fit. Tell the user where to verify it (e.g. Google Ads Keyword Planner, Search Console once data exists).
- Never fabricate business facts (clients, reviews, ratings, prices, years, addresses, awards). Follow `.claude/rules/quality-and-safety.md`.
- No black-hat or grey-hat tactics: keyword stuffing, doorway pages (near-identical pages that only swap a keyword or city), hidden text/links, cloaking, sneaky redirects, fake or incentivised reviews, `AggregateRating` without real reviews, link buying, PBNs, auto-generated spam content. They risk manual actions and destroy trust.

## 2. Keyword research without paid tools
1. **Seeds** = real services × customer types/niches × locations the business really serves × intent modifiers ("create", "agency", "cost", "for <niche>", "with online booking"). Take them from the brief, not from imagination.
2. **Expand** with the target market's search engine and language settings (country domain and language parameters): autocomplete suggestions, "People also ask", related searches. Use WebSearch; WebFetch public suggestion endpoints if needed. Save useful queries/URLs to `.web-work/`.
3. **SERP analysis** for each candidate primary keyword (top ~10): dominant intent (commercial / informational / local / navigational) · page type that ranks (service page, directory, listicle, local pack) · who ranks (big agencies, directories, freelancers, marketplaces) · visible weaknesses (thin copy, no FAQ, slow, no niche focus). Record observations as facts and your conclusions as interpretation.
4. **Choose** keywords a new or small site can realistically win: long-tail, niche-specific, commercial intent, matching a service the business delivers. Avoid head terms dominated by local packs or directories unless the business can compete there.
5. **Map**: one primary keyword per URL + 2–5 secondaries/synonyms. No two URLs target the same primary (cannibalisation). Informational queries go to FAQ or guides, not to service pages.

## 3. Architecture and URLs
- Hub → spoke: home (brand + main service + market) → service pages → niche/industry pages, all cross-linked with descriptive anchor text.
- Short, lowercase, hyphenated, localised slugs per language (no umlauts/accents in URLs: `fuer`, `diseno`). One canonical URL per page, trailing-slash style consistent.
- Multilingual: one URL per language, real translated HTML (not JS-swapped text), self-referencing canonical, reciprocal `hreflang` for every language plus `x-default`, and a crawlable `<a href>` language switcher. No automatic redirects by IP or browser language.
- Visible breadcrumbs on inner pages. Every page reachable within 3 clicks and linked from the footer or nav.

## 4. On-page checklist (per URL)
- `<title>` ≤ 60 chars: primary keyword near the start + brand. Meta description ≤ 155 chars: benefit + differentiator + CTA. Both unique.
- One `<h1>` containing the primary keyword naturally. `<h2>`s cover secondaries and the questions the SERP shows.
- The first paragraph answers the search intent directly (what, for whom, where, next step).
- Substantive, page-specific content: niche problems, what's included, process, FAQ written for that audience. If two pages would read the same after swapping one word, merge them or rewrite one.
- Descriptive `alt` on meaningful images; descriptive internal links; no orphan pages.
- Primary CTA visible above the fold on mobile and desktop, repeated after key sections, with the lead form on the page itself.
- Correct locale conventions (spelling variant, currency, date/phone formats) for the target market.

## 5. Technical SEO
- HTTPS, one host (www or bare) with 301s, no duplicate `/index.html` URLs, a real 404 page returning status 404.
- `robots.txt` allowing crawl and pointing to the sitemap. An XML sitemap listing only canonical, indexable URLs, with `xhtml:link` alternates for multilingual sites.
- `<html lang>` per page. Open Graph + Twitter card (title, description, 1200×630 image, URL).
- Core Web Vitals: no render-blocking third-party code, sized images, lazy-loading below the fold, fonts self-hosted or preconnected. Measure with Lighthouse and report real numbers only.
- Structured data (JSON-LD), **only with real facts** the page also shows visibly: `Organization`/`Person`, `WebSite`, `Service` (with `areaServed`), `BreadcrumbList`, `FAQPage` (matching visible Q&A). Use `LocalBusiness` only with a real, public address. Never add ratings or reviews that don't exist. Validate with Google's Rich Results Test / Schema Markup Validator.
- Check the Content-Security-Policy: `application/ld+json` blocks are data and aren't blocked by `script-src`, but analytics domains must be allowed explicitly.

## 6. Converting organic visits into leads
- Each landing page ends with the lead capture (booking widget and/or short form), not a link to another page.
- Minimum fields: name, contact (email/phone), optional message. Clear privacy notice. Honest microcopy about what happens next.
- Attribute every lead to its page and language (hidden field, email subject or booking note) so leads can be traced without analytics.
- Trust elements must be real: process, guarantees the business actually offers, the person behind it, concept work labelled as concept. Use `[PLACEHOLDER: …]` for proof the business doesn't have yet.
- Track conversions (`generate_lead`, contact clicks) only with the visitor's consent where the law requires it.

## 7. Measurement
- Google Search Console + Bing Webmaster Tools (verification by DNS or meta tag, sitemap submitted). These need no cookies.
- Analytics (GA4 or a cookieless tool): key events for form submit success, booking success, WhatsApp/phone/email clicks. Consent banner before any non-essential cookie; privacy/cookie policies updated.
- Review monthly: queries with impressions but low CTR (rewrite title/meta), pages at positions 5–20 (strengthen content and internal links), pages with traffic but no leads (fix CTA/form).

## 8. Off-page and local checklist (user-side; code can't do it)
- Google Business Profile: needs a real address or service-area business verification in that country. Don't fake an address.
- Consistent name, email, phone and URL on relevant national/industry directories and professional profiles (e.g. LinkedIn).
- Real reviews from real clients on platforms that allow them. Never write or buy them.
- Earn links: partners, suppliers, local associations, guest articles, case studies of real projects once they exist.
- A country-code domain can strengthen geo-relevance. It's the user's decision and cost.

## 9. Output formats
**Keyword map** (`.web-work/seo-keyword-map.md`):
| URL (per language) | Primary keyword | Secondaries | Intent | SERP evidence (who ranks, page type) | Volume | Why winnable |

**Page brief**: URL · primary/secondary keywords · title · meta · H1 · H2 outline · FAQ questions · internal links in/out · CTA · structured data types · facts used / placeholders.

**Audit** (`.web-work/seo-report.md`): check → PASS / NEEDS FIXES / N/A → evidence (measurement or observation) → fix. Then list the user-side tasks separately.

Project-specific facts (market, country, languages, locale spelling, local directories, constraints) belong in `.web-work/seo-brief.md`, not in this skill.
