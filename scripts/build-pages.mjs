// Builds the static multilingual pages in public/ (/, /de/, /es/ and their service and industry pages)
// plus public/sitemap.xml. Sources: src/pages/home.html, src/partials/*.html, the shared strings in
// public/assets/js/i18n.js and one src/content/pages/<id>.json per service/industry page.
// Fails on any missing translation, so no page ships half-translated.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import vm from 'node:vm';

const SITE = 'https://moradesign.shop';
const LANGS = ['en', 'de', 'es'];
const PREFIX = { en: '/', de: '/de/', es: '/es/' };
const HTML_LANG = { en: 'en', de: 'de-CH', es: 'es' };
const HREFLANG = { en: ['en', 'x-default'], de: ['de', 'de-CH'], es: ['es'] };
const OG_LOCALE = { en: 'en_GB', de: 'de_CH', es: 'es_ES' };
const WHATSAPP = 'https://wa.me/41779039164';
const INSTAGRAM = 'https://www.instagram.com/jordimoradesign/';
const EMAIL = 'info@moradesign.shop';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const T = vm.runInNewContext(read('public/assets/js/i18n.js') + ';i18nData');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fail = (msg) => { throw new Error(msg); };

// Pages
const content = readdirSync(new URL('src/content/pages/', root)).filter((f) => f.endsWith('.json'))
  .map((f) => ({ id: f.slice(0, -5), ...JSON.parse(read(`src/content/pages/${f}`)) }))
  .sort((a, b) => a.order - b.order);
const home = { id: 'home', type: 'home', slug: { en: '', de: '', es: '' } };
const pages = [home, ...content];
const byId = Object.fromEntries(pages.map((p) => [p.id, p]));
const services = content.filter((p) => p.type === 'service');
const industries = content.filter((p) => p.type === 'industry');
const path = (page, lang) => PREFIX[lang] + (page.slug[lang] ? page.slug[lang] + '/' : '');

for (const p of content) {
  for (const lang of LANGS) {
    const c = p[lang] || fail(`${p.id}: missing "${lang}"`);
    for (const k of ['nav', 'teaser', 'title', 'desc', 'h1', 'intro', 'pains_title', 'pains', 'included_title', 'included', 'faq', 'service_type']) {
      if (!c[k] || (Array.isArray(c[k]) && !c[k].length)) fail(`${p.id}.${lang}: missing "${k}"`);
    }
    if (!p.slug[lang]) fail(`${p.id}: missing slug for "${lang}"`);
  }
  for (const r of p.related || []) byId[r] || fail(`${p.id}: unknown related page "${r}"`);
}

// Markup shared by the service/industry pages (same classes as the home sections)
const sectionHead = (dark, labelKey, title) => `<div class="border-b ${dark ? 'border-[#262626]' : 'border-[#E5E5E5]'} pb-8 mb-16">
<span class="font-label-code text-label-code tracking-[0.2em] uppercase ${dark ? 'text-[#8E8E8E]' : 'text-[#6B6B6B]'} block mb-3" data-i18n="${labelKey}">${labelKey}</span>
<h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-semibold tracking-tight uppercase break-words hyphens-auto ${dark ? 'text-[#FAFAFA]' : 'text-[#0A0A0A]'}">${esc(title)}</h2>
</div>`;

const linkCard = (target, lang) => `<a class="group border border-[#262626] bg-[#141414] p-8 flex flex-col hover:border-[#C6FF3D] transition-none" href="${path(target, lang)}">
<h3 class="font-headline-sm text-headline-sm font-semibold text-[#FAFAFA] group-hover:text-[#C6FF3D]">${esc(target[lang].nav)}</h3>
<p class="mt-3 font-body-md text-[16px] leading-[26px] text-[#C6C6C7] flex-1">${esc(target[lang].teaser)}</p>
<span aria-hidden="true" class="mt-6 font-label-ui text-label-ui uppercase tracking-wider text-[#C6FF3D]">→</span>
</a>`;

const landing = (p, lang) => {
  const c = p[lang];
  return `<!-- @include doc-start -->
<!-- @include header -->
<main class="w-full pt-20 bg-background min-h-screen"><div class="flex flex-col w-full text-on-surface antialiased">
<section class="hero w-full bg-[#0A0A0A] text-[#FAFAFA] border-b border-[#262626] pt-12 md:pt-20 pb-20 md:pb-28">
<div class="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
<nav class="border-b border-[#262626] pb-6 mb-12 md:mb-16 font-label-code text-label-code uppercase tracking-widest text-[#8E8E8E]" data-i18n-aria="breadcrumb_label" aria-label="Breadcrumb">
<ol class="flex flex-wrap items-center gap-2"><li><a class="hover:text-[#C6FF3D]" href="${PREFIX[lang]}" data-i18n="breadcrumb_home">Home</a></li><li aria-hidden="true" class="text-[#404040]">/</li><li aria-current="page" class="text-[#FAFAFA]">${esc(c.nav)}</li></ol>
</nav>
<div class="max-w-5xl">
<h1 class="hero-slogan font-display-xl text-[34px] leading-[40px] sm:text-[44px] sm:leading-[48px] md:text-[64px] md:leading-[68px] tracking-[-0.04em] font-semibold text-[#FAFAFA] uppercase [text-wrap:balance] break-words hyphens-auto">${esc(c.h1)}</h1>
<p class="font-body-lg text-body-lg text-[#C6C6C7] max-w-3xl mt-8 leading-relaxed [text-wrap:pretty]">${esc(c.intro)}</p>
<div class="mt-10 flex flex-col sm:flex-row sm:items-center gap-6">
<a id="hero-cta" class="w-full sm:w-auto inline-flex items-center justify-center text-center bg-[#C6FF3D] hover:bg-[#FAFAFA] text-[#0A0A0A] font-label-ui text-label-ui uppercase tracking-wider px-8 py-4 min-h-[52px] border border-[#C6FF3D] transition-none" data-i18n="nav_cta" href="#booking-calendar">Book a discovery call →</a>
<a class="relative after:absolute after:inset-x-0 after:-inset-y-3 after:content-[''] self-center font-label-ui text-label-ui uppercase tracking-wider text-[#FAFAFA] hover:text-[#C6FF3D] border-b border-[#FAFAFA] hover:border-[#C6FF3D] pb-1 transition-none" href="${WHATSAPP}" rel="noopener noreferrer" target="_blank" data-i18n="hero_whatsapp">WhatsApp →</a>
</div>
<p class="mt-6 font-label-code text-label-code uppercase tracking-wider text-[#8E8E8E]" data-i18n="hero_microcopy">20 minutes</p>
<p class="mt-12 max-w-3xl border-t border-[#262626] pt-6 font-label-code text-label-code text-[#8E8E8E] uppercase tracking-widest leading-relaxed" data-i18n="hero_trust">Trust</p>
</div>
</div>
</section>
<section class="w-full bg-[#FAFAFA] text-[#0A0A0A] border-b border-[#E5E5E5] py-20 md:py-32" id="challenge">
<div class="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
${sectionHead(false, 'inner_sec1', c.pains_title)}
<ul class="grid grid-cols-1 md:grid-cols-2 gap-8">
${c.pains.map((t) => `<li class="bg-[#FFFFFF] border border-[#E5E5E5] border-l-2 border-l-[#0A0A0A] p-8 font-body-lg text-body-lg text-[#2F3131]">${esc(t)}</li>`).join('\n')}
</ul>
</div>
</section>
<section class="w-full bg-[#0A0A0A] text-[#FAFAFA] border-b border-[#262626] py-20 md:py-32" id="included">
<div class="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
${sectionHead(true, 'inner_sec2', c.included_title)}
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
${c.included.map((i) => `<article class="border border-[#262626] bg-[#141414] p-8">
<span aria-hidden="true" class="material-symbols-outlined text-[28px] text-[#C6FF3D]">check</span>
<h3 class="mt-6 font-headline-sm text-headline-sm font-semibold text-[#FAFAFA]">${esc(i.title)}</h3>
<p class="mt-3 font-body-md text-[16px] leading-[26px] text-[#C6C6C7]">${esc(i.text)}</p>
</article>`).join('\n')}
</div>
<div class="mt-12 border border-[#262626] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
<div>
<p class="font-headline-sm text-headline-sm font-semibold text-[#FAFAFA]" data-i18n="serv_help_title">Not sure?</p>
<p class="font-body-md text-[16px] leading-[26px] text-[#C6C6C7] mt-1" data-i18n="serv_help_text">Tell me about your business.</p>
</div>
<a class="shrink-0 inline-flex items-center justify-center text-center bg-[#C6FF3D] hover:bg-[#FAFAFA] text-[#0A0A0A] font-label-ui text-label-ui uppercase tracking-wider px-8 py-4 min-h-[52px] border border-[#C6FF3D] transition-none" data-i18n="nav_cta" href="#booking-calendar">Book a discovery call →</a>
</div>
</div>
</section>
<!-- @include process -->
<section class="w-full bg-[#0A0A0A] text-[#FAFAFA] border-b border-[#262626] py-20 md:py-32" id="related">
<div class="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
${sectionHead(true, 'inner_sec4', T[lang].related_title)}
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
${(p.related || []).map((r) => linkCard(byId[r], lang)).join('\n')}
</div>
</div>
</section>
<section class="w-full bg-[#0A0A0A] text-[#FAFAFA] border-b border-[#262626] py-20 md:py-32" id="faq">
<div class="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
<div class="border-b border-[#262626] pb-8 mb-16">
<span class="font-label-code text-label-code tracking-[0.2em] uppercase text-[#8E8E8E] block mb-3" data-i18n="sec_faq">05 — FAQ</span>
<h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-semibold tracking-tight uppercase text-[#FAFAFA]" data-i18n="faq_headline">FAQ</h2>
</div>
<div class="max-w-4xl border-t border-[#262626] divide-y divide-[#262626]" id="faq-accordion">
${c.faq.map((f) => `<div class="faq-item group">
<h3><button aria-expanded="false" class="faq-trigger w-full py-6 flex justify-between items-center text-left text-[#FAFAFA] hover:text-[#C6FF3D] transition-none" type="button">
<span class="font-headline-sm text-headline-sm font-medium pr-4">${esc(f.q)}</span>
<span aria-hidden="true" class="faq-icon font-headline-sm text-headline-sm font-light text-[#8E8E8E] group-hover:text-[#C6FF3D]">+</span>
</button></h3>
<div class="faq-content hidden pb-6 text-[#C6C6C7] font-body-md text-body-md pr-12"><p>${esc(f.a)}</p></div>
</div>`).join('\n')}
</div>
</div>
</section>
<!-- @include contact -->
</div></main>
<!-- @include footer -->
<!-- @include doc-end -->
`;
};

// Structured data: only facts that are real and visible on the site (no address, no ratings)
const org = { '@type': 'Organization', '@id': `${SITE}/#org`, name: 'Jordi Mora', alternateName: 'Mora Design', url: `${SITE}/`,
  email: EMAIL, sameAs: [INSTAGRAM], founder: { '@id': `${SITE}/#jordi` },
  areaServed: { '@type': 'Country', name: 'Switzerland' }, knowsLanguage: ['en', 'de', 'es'] };
const person = { '@type': 'Person', '@id': `${SITE}/#jordi`, name: 'Jordi Miguel Mora Romero', alternateName: 'Jordi Mora',
  image: `${SITE}/jordi-mora.jpg`, sameAs: [INSTAGRAM], worksFor: { '@id': `${SITE}/#org` } };
const website = { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Jordi Mora', publisher: { '@id': `${SITE}/#org` }, inLanguage: LANGS.map((l) => HTML_LANG[l]) };
const faqNode = (url, qa) => ({ '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

const jsonLd = (p, lang, meta) => {
  const url = SITE + path(p, lang);
  const page = { '@type': 'WebPage', '@id': url, url, name: meta.title, description: meta.desc, inLanguage: HTML_LANG[lang], isPartOf: { '@id': `${SITE}/#website` } };
  let graph;
  if (p.type === 'home') {
    const d = T[lang];
    const qa = [1, 2, 3, 4, 5, 6].map((n) => [d[`faq_q${n}`], d[`faq_a${n}`]]);
    graph = [org, person, website, { ...page, about: { '@id': `${SITE}/#org` } }, faqNode(url, qa)];
  } else {
    const c = p[lang];
    const crumbs = { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
      { '@type': 'ListItem', position: 1, name: T[lang].breadcrumb_home, item: SITE + PREFIX[lang] },
      { '@type': 'ListItem', position: 2, name: c.nav, item: url }] };
    const service = { '@type': 'Service', '@id': `${url}#service`, name: c.h1, serviceType: c.service_type, description: meta.desc, url,
      provider: { '@id': `${SITE}/#org` }, areaServed: { '@type': 'Country', name: 'Switzerland' } };
    graph = [org, website, { ...page, breadcrumb: { '@id': `${url}#breadcrumb` }, mainEntity: { '@id': `${url}#service` } }, service, crumbs, faqNode(url, c.faq.map((f) => [f.q, f.a]))];
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
};

const seoHead = (p, lang, meta) => {
  const url = SITE + path(p, lang);
  const alternates = LANGS.flatMap((l) => HREFLANG[l].map((h) => `<link rel="alternate" hreflang="${h}" href="${SITE + path(p, l)}">`)).join('');
  const og = [['og:type', 'website'], ['og:site_name', 'Jordi Mora'], ['og:title', meta.title], ['og:description', meta.desc], ['og:url', url],
    ['og:image', `${SITE}/og-image.jpg`], ['og:image:width', '1200'], ['og:image:height', '630'], ['og:locale', OG_LOCALE[lang]],
    ...LANGS.filter((l) => l !== lang).map((l) => ['og:locale:alternate', OG_LOCALE[l]])]
    .map(([k, v]) => `<meta property="${k}" content="${esc(v)}">`).join('');
  return `<link rel="canonical" href="${url}">${alternates}${og}<meta name="twitter:card" content="summary_large_image">` +
    `<script type="application/ld+json">${jsonLd(p, lang, meta)}</script>`;
};

// Template pipeline: includes → {{variables}} → data-i18n translations
const includes = (html) => html.replace(/<!-- @include ([\w-]+) -->\n?/g, (_, name) => read(`src/partials/${name}.html`));

const vars = (html, v) => html.replace(/\{\{([\w-]+)(?::([\w-]+))?\}\}/g, (m, name, arg) => {
  const val = arg !== undefined ? v[name]?.(arg) : v[name];
  return val !== undefined ? val : fail(`unknown template variable ${m}`);
});

const setAttr = (tag, name, value) => {
  const re = new RegExp(`\\s${name}="[^"]*"`);
  return re.test(tag) ? tag.replace(re, () => ` ${name}="${value}"`) : tag.replace(/\s*\/?>$/, (end) => ` ${name}="${value}"${end}`);
};

const translate = (html, lang, where) => {
  const dict = T[lang];
  const text = (key) => (dict[key] !== undefined ? esc(dict[key]) : fail(`${where}: no "${lang}" translation for "${key}"`));
  let n = 0;
  html = html.replace(/<([a-z0-9]+)(\s(?:[^>]*?\s)?data-i18n="([\w-]+)"[^>]*)>([^<]*)<\/\1>/g, (_, tag, attrs, key) => { n++; return `<${tag}${attrs}>${text(key)}</${tag}>`; });
  const total = (html.match(/\sdata-i18n="/g) || []).length;
  if (n !== total) fail(`${where}: ${total - n} data-i18n element(s) contain markup and can't be translated`);
  const ATTR = { alt: 'alt', aria: 'aria-label', ph: 'placeholder' };
  return html.replace(/<[a-z][^>]*\sdata-i18n-(?:alt|aria|ph)="[^>]*>/g, (tag) =>
    [...tag.matchAll(/\sdata-i18n-(alt|aria|ph)="([\w-]+)"/g)].reduce((t, [, kind, key]) => setAttr(t, ATTR[kind], text(key)), tag));
};

// Shared generated blocks
const footerLinks = (lang) => [['footer_services', services], ['footer_industries', industries]].map(([key, list]) =>
  `<div class="space-y-space-sm"><div class="font-label-code text-label-code uppercase text-outline tracking-widest" data-i18n="${key}">${key}</div><ul class="space-y-space-xs">` +
  list.map((p) => `<li class="border-b border-outline-variant/10 pb-1"><a class="inline-block py-1.5 font-label-ui text-label-ui text-on-surface-variant hover:text-primary-container transition-colors" href="${path(p, lang)}">${esc(p[lang].nav)}</a></li>`).join('') +
  '</ul></div>').join('');

const industriesBlock = (lang) => `<div class="mt-12 border-t border-[#262626] pt-12">
<h3 class="font-headline-md text-[24px] leading-[30px] tracking-[-0.02em] xl:text-headline-md font-semibold text-[#FAFAFA]" data-i18n="industries_title">Industries</h3>
<p class="font-body-md text-[16px] leading-[26px] text-[#C6C6C7] mt-2 max-w-2xl" data-i18n="industries_sub">Industries</p>
<div class="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
${industries.map((p) => linkCard(p, lang)).join('\n')}
</div>
</div>`;

const render = (p, lang) => {
  const meta = p.type === 'home' ? { title: T[lang].page_title, desc: T[lang].page_desc } : { title: p[lang].title, desc: p[lang].desc };
  for (const [k, max] of [['title', 60], ['desc', 160]]) {
    if (meta[k].length > max) console.warn(`warning: ${p.id}.${lang} ${k} is ${meta[k].length} chars (> ${max})`);
  }
  const leadName = p.type === 'home' ? 'Inicio' : p[lang].nav;
  const html = vars(includes(p.type === 'home' ? read('src/pages/home.html') : landing(p, lang)), {
    htmllang: HTML_LANG[lang], lang, title: esc(meta.title), desc: esc(meta.desc), seo: seoHead(p, lang, meta),
    home: p.type === 'home' ? '' : PREFIX[lang],
    book: '#booking-calendar',
    canonical: SITE + path(p, lang),
    lead_subject: esc(`Nueva consulta desde la web: ${leadName} (${lang.toUpperCase()})`),
    url: (id) => (byId[id] ? path(byId[id], lang) : fail(`unknown page id "${id}"`)),
    alt: (l) => path(p, l),
    langcls: (l) => (l === lang ? 'text-primary-container font-semibold' : 'text-on-surface-variant'),
    footer_links: footerLinks(lang),
    industries_block: industriesBlock(lang),
  });
  return translate(html, lang, `${p.id}.${lang}`);
};

const out = (urlPath, html) => {
  const dir = new URL(`public${urlPath}`, root);
  mkdirSync(dir, { recursive: true });
  writeFileSync(new URL('index.html', dir), html);
};

for (const p of pages) for (const lang of LANGS) out(path(p, lang), render(p, lang));

// 404 page (served by .htaccess for any unknown URL, so every asset URL is absolute)
const notFound = vars(includes(`<!-- @include doc-start -->
<!-- @include header -->
<main class="w-full pt-20 bg-[#0A0A0A] min-h-screen"><section class="w-full bg-[#0A0A0A] text-[#FAFAFA] py-20 md:py-32"><div class="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
<span class="font-label-code text-label-code tracking-[0.2em] uppercase text-[#8E8E8E] block mb-3">Error 404</span>
<h1 class="font-display-xl text-[38px] leading-[42px] md:text-[64px] md:leading-[68px] tracking-[-0.04em] font-semibold uppercase">Page not found</h1>
<ul class="mt-12 max-w-3xl border-t border-[#262626] divide-y divide-[#262626] font-body-lg text-body-lg text-[#C6C6C7]">
<li class="py-6">This page doesn't exist. <a class="text-[#C6FF3D] underline underline-offset-4" href="/">Go to the home page →</a></li>
<li class="py-6" lang="de-CH">Diese Seite existiert nicht. <a class="text-[#C6FF3D] underline underline-offset-4" href="/de/">Zur Startseite →</a></li>
<li class="py-6" lang="es">Esta página no existe. <a class="text-[#C6FF3D] underline underline-offset-4" href="/es/">Ir a la página de inicio →</a></li>
</ul>
</div></section></main>
<!-- @include footer -->
<!-- @include doc-end -->
`), {
  htmllang: 'en', lang: 'en', title: 'Page not found | Jordi Mora', desc: 'This page does not exist.', seo: '<meta name="robots" content="noindex">',
  home: '/', book: '/#booking-calendar', alt: (l) => PREFIX[l], langcls: (l) => (l === 'en' ? 'text-primary-container font-semibold' : 'text-on-surface-variant'),
  footer_links: footerLinks('en'),
});
writeFileSync(new URL('public/404.html', root), translate(notFound, 'en', '404'));

// Sitemap with language alternates
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.flatMap((p) => LANGS.map((lang) => `<url><loc>${SITE + path(p, lang)}</loc>${LANGS.flatMap((l) => HREFLANG[l].map((h) => `<xhtml:link rel="alternate" hreflang="${h}" href="${SITE + path(p, l)}"/>`)).join('')}</url>`)).join('\n')}
</urlset>
`;
writeFileSync(new URL('public/sitemap.xml', root), sitemap);
console.log(`built ${pages.length * LANGS.length} pages + 404 + sitemap`);
