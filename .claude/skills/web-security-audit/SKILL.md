---
name: web-security-audit
description: Non-destructive pre-launch security audit of a website the user owns - exposed secrets and .env/.git/backup files, deploy-folder hygiene, HTTPS/TLS, security headers, client-side XSS, protection of customer data in forms and bookings, third-party scripts, information disclosure, account/domain/email hardening - reported as what is fine, what to fix (by severity) and a launch verdict (READY / READY WITH RESERVATIONS / NOT READY). Use before any launch or deploy, after adding forms/integrations, or when the user asks whether the site is secure or can be hacked.
---

# Web Security Audit

Goal: find what an attacker could read, abuse or corrupt before real customers arrive, and give a clear launch verdict.

## 0. Rules
- **Only sites the user owns or is authorised to test.** If ownership is unclear, ask.
- **Non-destructive only:** plain GET/HEAD requests, source reading and harmless form validation checks. No DoS or load testing, no brute force, no real exploitation, no mass scanning, no submitting real data to production endpoints without the user's permission.
- **Never print a full secret.** Show the first 4 characters + `…` + the file and line.
- Report only what you observed. Mark anything you could not test as `NOT VERIFIED` with the reason. Never invent findings or scores.
- **Do not fix anything** during the audit. Propose fixes; apply them only after the user approves.
- Reports are written in the user's language.

## 1. Setup
- **Mode:** `local` (deploy folder + local server, before launch) or `live` (public URL). In `local` mode, server headers, TLS, DNS and hosting behaviour are `NOT VERIFIED` (the local server is not the production server). Recommend a `live` re-run right after deploy.
- Identify: the **deploy folder** (exactly what will be uploaded), the stack (static / framework / CMS), the hosting (Apache/Hostinger → `.htaccess`; Vercel → `vercel.json`; Netlify → `_headers`; nginx), and every third party (forms, booking, analytics, CDNs, fonts, payments).
- Local server if needed: `python3 -m http.server 8080 --bind 127.0.0.1` from the deploy folder.
- If `grep` is aliased (e.g. to ugrep, which rejects some of the patterns below), run `command grep` or `/usr/bin/grep`.

## 2. Checks
Status for each: PASS / FAIL / NOT VERIFIED / N/A.

### S1 — Secrets in shipped code
```bash
grep -rnIE "(api[_-]?key|secret|token|passw(or)?d|authorization|bearer|private[_-]?key|client[_-]?secret|sk_(live|test)_|pk_live_|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|ghp_[0-9A-Za-z]{36}|xox[baprs]-|-----BEGIN [A-Z ]*PRIVATE KEY|https?://[^/\s:]+:[^@\s]+@)" <deploy-folder>
```
Also check inline `<script>` config objects and any `.js`/`.json`/`.map` files. Classify each hit: **public by design** (form endpoint IDs, publishable keys, public usernames, public API calls that need no key) vs **real secret** (anything granting write/admin/read-others access). A real secret in the browser = **Critical**; it must be rotated, not just deleted.

### S2 — Sensitive files in the deploy folder and on the server
1. Inventory what will be uploaded: `find <deploy-folder> -type f | sort`. Flag: `.env*`, `.git/`, `.DS_Store`, `.claude/`, `.playwright-mcp/`, `.web-work/`, `node_modules/`, backups (`*.bak`, `*.old`, `*.orig`, `*.zip`, `*.tar*`, `*.sql`, `*.before*`, `*~`), `*.map`, logs, screenshots, source/design files, notes. Also flag the risk of uploading the **project root** instead of the deploy folder.
2. Probe the running site (expect 403/404; a 200 with real content = FAIL):
```bash
for p in .env .env.local .env.production .git/config .git/HEAD .DS_Store .htaccess .htpasswd .claude/settings.json .playwright-mcp/ .web-work/ backup.zip site.zip package.json composer.json phpinfo.php wp-config.php.bak server-status debug.log error_log; do
  printf "%s %s\n" "$(curl -s -o /dev/null -w '%{http_code}' "$URL/$p")" "$p"; done
```
3. Directory listing: request a folder without an index file (e.g. `/assets/`). A file listing = FAIL (`Options -Indexes` on Apache).
4. Beware SPA/soft-404s that return 200 for everything: compare the body with a random path before concluding.

### S3 — HTTPS / TLS (live)
- `curl -sI http://<domain>` → 301 to `https://`. Both apex and `www` resolve to one canonical HTTPS host.
- `echo | openssl s_client -connect <domain>:443 -servername <domain> 2>/dev/null | openssl x509 -noout -issuer -dates` → valid issuer, not expiring soon.
- No mixed content: `grep -rnE "(src|href|action)=\"http://" <deploy-folder>`.

### S4 — Security headers (live)
`curl -sI https://<domain>` and check:
| Header | Expected |
|---|---|
| Strict-Transport-Security | `max-age=31536000; includeSubDomains` (add `preload` only deliberately) |
| Content-Security-Policy | Allow-list built from the third parties actually detected; `frame-ancestors 'self'`, `form-action` limited to real form targets, `object-src 'none'`, `base-uri 'self'` |
| X-Content-Type-Options | `nosniff` |
| X-Frame-Options | `SAMEORIGIN` (legacy fallback to `frame-ancestors`) |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | disable unused features: `camera=(), microphone=(), geolocation=()` |
| Server / X-Powered-By | no version numbers |
Deliver a ready-to-paste config for the detected host. If the page relies on inline scripts or runtime CSS generators (e.g. Tailwind Play CDN), say that a strict CSP needs `'unsafe-inline'`/`'unsafe-eval'` until the build is fixed, and treat that as a reservation, not a pass.

### S5 — Client-side XSS / injection
```bash
grep -rnE "innerHTML|outerHTML|insertAdjacentHTML|document\.write|eval\(|new Function|setTimeout\(['\"]|location\.(search|hash|href)|URLSearchParams|postMessage|addEventListener\(['\"]message" <deploy-folder>
```
For each sink, trace the data source. **FAIL** if user input, URL params/hash, `postMessage` data or third-party API responses reach an HTML sink without escaping (fix: `textContent`, DOM creation or an escape helper). Constant strings/translations = PASS. Also check: `target="_blank"` has `rel="noopener"`; no open redirects (`?next=`, `?url=`); `postMessage` handlers check `event.origin`.

### S6 — Customer data (forms, bookings, checkout)
For every form and every flow that sends personal data:
- Sent over HTTPS with **POST**; no personal data in URLs, `localStorage`/`sessionStorage`/cookies, `console.log`, analytics events or error messages.
- **Who validates server-side?** Client-side validation is bypassable (DevTools, curl), so the receiving service must enforce its own rules. Document the service (Formspree, Cal.com, own backend…) and what it enforces.
- **Abuse/spam:** honeypot field (e.g. Formspree `_gotcha`), CAPTCHA/Turnstile if spam is likely, provider-side allowed domains/origin restrictions, rate limiting (provider side). Flag missing ones with the exact dashboard setting to enable.
- **Access control:** no browser-side key with permission to read, change or cancel other customers' records. Booking/checkout responses must not contain other customers' data. Read the network calls in the source (`fetch`/XHR URLs, headers and bodies).
- Only necessary data collected; `autocomplete` attributes correct; consent/privacy link next to the form where the law requires it.
- Confirmation/success views do not echo raw input via HTML sinks (see S5).

### S7 — Third parties / supply chain
- List every external script, stylesheet, font, iframe and API with its purpose.
- Scripts from CDNs pinned to a version with `integrity` (SRI) + `crossorigin` where the CDN supports it. Unpinned "latest" or dev-only CDNs (e.g. `cdn.tailwindcss.com`) = reservation: they execute third-party code with full page access and are not for production.
- Fewer third parties = smaller attack surface; flag unused ones.

### S8 — Information disclosure
- HTML comments with internal notes, TODOs, test URLs or credentials: `grep -rn "<!--" <deploy-folder>`.
- Source maps (`*.map`), verbose error pages, debug flags, stack traces.
- Personal email/phone in plain text → spam harvesting (Low); suggest a contact form or obfuscation if the user cares.

### S9 — Accounts, domain and email (manual checklist + DNS)
- 2FA on hosting, domain registrar, email and every provider dashboard (forms, booking, analytics, payments). Unique passwords. Registrar transfer lock on.
- `dig +short TXT <domain>` (SPF), `dig +short TXT _dmarc.<domain>` (DMARC), DKIM enabled at the mail provider → prevents others sending mail as the domain. `dig +short CAA <domain>` (optional).
- Hosting: file permissions not world-writable; FTP disabled in favour of SFTP; backups enabled.

### S10 — Legal-technical consistency
The privacy/cookie policy names the third parties and cookies actually loaded (compare with S7), and does not claim protections that are not in place (e.g. "HTTPS" before SSL is on).

### S11 — Optional external scanners (live only)
Mozilla Observatory, SSL Labs, securityheaders.com (via WebFetch or ask the user to open them). Quote their grade only if you actually got it.

## 3. Severity
- **Critical:** real secret exposed; customer data readable/modifiable by others; `.env`/`.git`/backups downloadable; XSS reachable from a URL.
- **High:** no HTTPS or broken certificate; form data sent over HTTP or leaked into URLs/storage/logs; missing server-side validation on a flow that writes data; clickjacking on a page with sensitive actions.
- **Medium:** missing CSP/HSTS/other headers; no anti-spam; dev CDN or unpinned third-party scripts; directory listing without sensitive files.
- **Low:** version banners, plain-text emails, missing SPF/DMARC, minor hygiene.

## 4. Report → `.web-work/security-report.md`
```
# Informe de seguridad — <fecha> — modo <local|live> — <url>
Alcance: <deploy folder / URL> | Herramientas: <curl, openssl, grep, …>

| Check | Estado | Nota |
|---|---|---|
| S1 Secretos | … | … |
…

## ✅ Lo que está bien
- …

## ⚠️ Lo que hay que mejorar
| ID | Severidad | Evidencia (archivo:línea / URL / comando) | Riesgo en una frase | Arreglo concreto |

## Pendiente de verificar
- <check> — motivo — cuándo/cómo verificarlo

## Veredicto: LISTO | LISTO CON RESERVAS | NO LISTO
<2–3 líneas: por qué, y qué hacer primero>
```
Verdict rules: any **Critical or High** open → **NO LISTO**. Only Medium/Low → **LISTO CON RESERVAS** (list them in fix order). Nothing open and no critical check left `NOT VERIFIED` → **LISTO**. A `local`-mode audit can never be **LISTO** on its own: S3/S4 need a `live` run.

Return to the caller (≤ 10 lines): verdict, counts by severity, top 3 issues by ID, report path.
