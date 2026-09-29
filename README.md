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

## Branches and deploy (Hostinger Git)
- `source` — this full project. Work and commit here.
- `main` — **only the website** (the contents of `public/` at the root). Hostinger Git deploys `main` into `public_html`.

To publish: commit on `source`, then run `./deploy.sh`. It creates a commit on `main` whose files are exactly `public/`, and pushes both branches. Never merge `source` into `main`.

External services: Cal.com (availability + bookings, public API, no key) and Formspree (contact form).
If you add a third-party script, font or API, update the `Content-Security-Policy` in `public/.htaccess` and the privacy/cookie policies.
