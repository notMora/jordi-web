---
name: device-compatibility-qa
description: Mobile-first pre-launch device test - a phone/tablet/desktop/ultra-wide viewport matrix, landscape, zoom, Safari/WebKit, Chromium and Firefox engines, measured checks (horizontal overflow, tap targets, input zoom, fixed elements, viewport units, safe areas), end-to-end critical flows on mobile, and mobile Core Web Vitals - reported as what is correct, what to improve and a launch verdict. Use before launching a website, when most traffic comes from phones, or when the user asks whether the site works well on mobile, tablet or every device.
---

# Device Compatibility QA (mobile-first)

Goal: prove that the site works, reads well and converts on every common device, with **mobile as the priority**. This skill adds device depth to `visual-browser-qa`; use that skill's general gates (visual, accessibility, SEO) and do not repeat them here.

## 0. Rules
- Measure instead of eyeballing where possible (JS snippets below). Every finding needs evidence: viewport, selector, value, screenshot path.
- Emulation is not a real device. Say so in the report and give the user the short real-device checklist (§6).
- Do not submit real bookings, payments or messages to production services without the user's permission. Stop at the last step before submission, or use a test mode.
- Reports are written in the user's language. Never invent scores or metrics.

## 1. Setup
- URL (or start a local server, e.g. `python3 -m http.server 8080 --bind 127.0.0.1` from the deploy folder).
- Read `.web-work/design-direction.md` and the last `.web-work/qa-report.md` if they exist.
- Tooling: the browser MCP (Playwright / Chrome) for Chromium. For **WebKit (Safari/iOS)** and **Firefox**, and if the user allows it, run Playwright via `npx` from the scratchpad (never add it to the project):
  ```bash
  cd <scratchpad> && npm init -y >/dev/null && npm i -D playwright >/dev/null && npx playwright install webkit firefox
  ```
  Then use a small script with `devices['iPhone 13']`, `devices['iPhone SE']`, `devices['Pixel 7']`, `devices['iPad Mini']`, etc. If a tool is unavailable, mark that engine `NOT VERIFIED`.

## 2. Viewport matrix
| Class | Viewports (CSS px) |
|---|---|
| **Mobile (priority)** | 320×568 · 360×800 · 375×667 · 390×844 · 430×932 · landscape 844×390 |
| Tablet | 768×1024 · 820×1180 · 1024×1366 · landscape 1024×768 |
| Desktop | 1280×800 · 1440×900 · 1920×1080 · 2560×1440 |
| Extra | 200 % zoom at 1280 (≈ 640 wide) · `prefers-reduced-motion: reduce` |
| Engines | Chromium · WebKit (iPhone + iPad) · Firefox |

Full-page screenshot per viewport; save to the scratchpad and reference by name. On mobile, also scroll through each section.

## 3. Measured checks (run in each mobile viewport; spot-check tablet)
```js
(() => {
  const vw = document.documentElement.clientWidth, r = {};
  r.viewportMeta = document.querySelector('meta[name=viewport]')?.content || 'MISSING';
  r.hScroll = document.documentElement.scrollWidth > vw;
  r.overflowing = [...document.querySelectorAll('body *')].filter(e => {
    const b = e.getBoundingClientRect(); return b.width && (b.right > vw + 1 || b.left < -1);
  }).slice(0, 10).map(e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + '.' + [...e.classList].slice(0, 2).join('.'));
  r.smallTargets = [...document.querySelectorAll('a,button,input,select,textarea,[role=button],label[for]')].filter(e => {
    const b = e.getBoundingClientRect(); return b.width && b.height && (b.width < 44 || b.height < 44) && getComputedStyle(e).visibility !== 'hidden';
  }).slice(0, 15).map(e => `${e.tagName.toLowerCase()} "${(e.innerText || e.value || e.name || '').trim().slice(0, 25)}" ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`);
  r.inputsUnder16px = [...document.querySelectorAll('input,select,textarea')].filter(e => parseFloat(getComputedStyle(e).fontSize) < 16).map(e => e.name || e.id || e.type);
  r.bodyFontPx = getComputedStyle(document.body).fontSize;
  r.fixedEls = [...document.querySelectorAll('body *')].filter(e => ['fixed', 'sticky'].includes(getComputedStyle(e).position)).map(e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + ' h=' + Math.round(e.getBoundingClientRect().height));
  r.imgsOversized = [...document.images].filter(i => i.naturalWidth > i.clientWidth * 2.5 && i.clientWidth).map(i => `${i.src.split('/').pop()} ${i.naturalWidth}px→${i.clientWidth}px`);
  r.imgsNoDims = [...document.images].filter(i => !i.getAttribute('width') && !i.style.aspectRatio).length;
  return r;
})()
```
Interpretation: `hScroll` true = **blocker**. Small targets on primary CTAs/nav/form controls = **major**; inline text links in paragraphs are acceptable if spaced. Inputs < 16 px = iOS auto-zoom on focus (**major**). Fixed/sticky elements taller than ~15 % of the viewport height on mobile = **major** (they cover content).

## 4. Manual checks
**Mobile (every item, at 390×844 plus 320 and landscape):**
- Hero: headline, value proposition and primary CTA visible without scrolling at 390×844; nothing clipped at 320; image crop keeps the focal point.
- Navigation: menu opens and closes, closes after tapping a link, anchors land below any sticky header (not hidden behind it), body does not scroll behind an open menu, focus is trapped/restored reasonably.
- Primary CTA reachable with the thumb; hover-only interactions have a tap equivalent.
- Forms: correct `type`/`inputmode`/`autocomplete` (email, tel, name); the keyboard does not cover the focused field or the submit button; error messages are visible next to the field; success state visible without hunting.
- **Critical flows end-to-end** (contact, booking, checkout): complete each one on mobile up to the last safe step; third-party widgets/iframes fit the width and are usable by touch.
- `100vh` sections do not jump or hide content when the browser bar collapses (prefer `svh`/`dvh`); content respects safe areas (notch, home indicator) on edge-to-edge layouts; orientation change does not break the layout.
- Readability: body ≥ 16 px, line length ≈ 30–75 characters, sufficient contrast in bright light (no light-grey body text), no hyphenation/orphan disasters in headings in any language the site offers.
- Carousels/sliders swipe correctly and do not trap vertical scrolling.

**Tablet:** layouts between breakpoints look intentional (no huge gaps, no single stretched column, no desktop nav squeezed until it wraps); portrait and landscape.
**Desktop / ultra-wide:** content max-width holds at 1920/2560 (no 2000 px-long lines); hover and focus states visible; full keyboard pass through nav, CTAs and forms.
**Zoom 200 % / large text:** no overlapping or clipped text, content still reachable.
**Engines:** repeat the hero, nav, one form and the booking flow in WebKit and Firefox; note any engine-specific break (date inputs, `backdrop-filter`, `gap`, sticky, smooth scroll, fonts).

## 5. Mobile performance
If allowed, run Lighthouse (mobile emulation + default throttling) from the scratchpad:
```bash
npx --yes lighthouse <url> --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --output=json --output-path=<scratchpad>/lh-mobile.json --chrome-flags="--headless=new" --quiet
```
If Chrome is not installed, prefix with `CHROME_PATH=$(node -e "console.log(require('playwright').chromium.executablePath())")` from the scratchpad where Playwright is installed.
Report the real numbers: **LCP < 2.5 s**, **CLS < 0.1**, **TBT < 200 ms** (lab proxy for INP), total page weight, largest images, render-blocking resources, font loading. Note that a local server has no CDN/compression, so re-measure on the live URL after launch.

## 6. Real-device checklist (for the user, ≤ 8 lines)
Give the user a short list to try on their own iPhone (Safari) and an Android phone (Chrome): open the site, open/close the menu, tap the main CTA, fill the form up to submit, walk through the booking flow, rotate the phone, check readability outdoors.

## 7. Severity
- **Blocker:** horizontal scroll; content or CTA unreachable; a critical flow cannot be completed on some device/engine.
- **Major:** iOS input zoom; small primary tap targets; sticky elements covering content; broken tablet layout; mobile LCP > 4 s or CLS > 0.25.
- **Minor:** awkward wrapping, spacing inconsistencies, LCP 2.5–4 s, CLS 0.1–0.25.
- **Polish:** visual refinements with no functional impact.

## 8. Report → `.web-work/device-qa-report.md`
```
# Informe de dispositivos — <fecha> — <url>
Herramientas: <browser MCP / Playwright WebKit+Firefox / Lighthouse> | Emulación (no dispositivo real)

| Clase | Estado | Viewports / motores probados |
|---|---|---|
| Móvil | PASS / NEEDS FIXES / NOT VERIFIED | … |
| Tablet | … | … |
| Desktop | … | … |
| Motores (WebKit/Firefox) | … | … |
| Rendimiento móvil | … | LCP … · CLS … · TBT … |

## ✅ Lo que está correcto
- …

## ⚠️ Lo que se puede mejorar
| ID | Severidad | Dispositivo/viewport | Problema (selector, valor medido) | Arreglo sugerido | Captura |

## Checklist en dispositivo real
- …

## Veredicto: LISTO | LISTO CON RESERVAS | NO LISTO
<2–3 líneas: por qué y qué arreglar primero>
```
Verdict rules: any **blocker** anywhere, or any **major on mobile** → **NO LISTO**. Majors only on tablet/desktop, or minors anywhere → **LISTO CON RESERVAS**. Otherwise **LISTO**. Mobile left `NOT VERIFIED` → never **LISTO**.

Return to the caller (≤ 10 lines): verdict, status per class, counts by severity, top 3 issues by ID, report path.

## 9. Retest
After fixes, re-run only the affected viewports/checks plus the §3 snippet at 390×844 and 320×568, and update the report.
