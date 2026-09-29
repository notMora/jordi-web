# jordi-web

Static site for Jordi Mora — web design & AI automation (moradesign.shop). EN / ES / DE.

- `public/` — **the only folder that goes online.** HTML, compiled CSS, JS, self-hosted fonts, `.htaccess`.
- `src/` + `tailwind.*.config.js` — Tailwind sources. `public/assets/css/*.css` are generated from them.
- `design/` — design system notes and reference screenshot (not deployed).
- `.claude/` — Claude Code agents, rules and skills used to build and audit the site.

## Build CSS
```bash
npm install
npm run build
```
Run it after changing classes in `public/*.html` or `public/assets/js/*.js`, and commit the generated CSS.

## Deploy (Hostinger)
Upload the **contents** of `public/` (including the hidden `.htaccess`) into `public_html`. Never upload the repository root.

External services: Cal.com (availability + bookings, public API, no key) and Formspree (contact form).
If you add a third-party script, font or API, update the `Content-Security-Policy` in `public/.htaccess` and the privacy/cookie policies.
