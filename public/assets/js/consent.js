// Google Analytics 4, loaded only after the visitor accepts (opt-in). The choice is kept in
// localStorage ('consent' = 'granted' | 'denied') and can be changed from "Cookie settings".
// While GA_ID is empty nothing is shown or loaded. If you change the domains, update the CSP in .htaccess.
(function () {
  var GA_ID = ''; // Google Analytics 4 measurement ID, e.g. 'G-XXXXXXXXXX'
  var TEXT = {
    en: { label: 'Cookie consent', msg: 'With your consent I use Google Analytics to measure visits and see which pages lead to enquiries. It sets cookies and sends usage data to Google, including to the USA.', accept: 'Accept', reject: 'Reject', policy: 'Cookie policy' },
    de: { label: 'Cookie-Einwilligung', msg: 'Mit Ihrer Einwilligung nutze ich Google Analytics, um Besuche zu messen und zu sehen, welche Seiten zu Anfragen führen. Dabei werden Cookies gesetzt und Nutzungsdaten an Google übermittelt, auch in die USA.', accept: 'Akzeptieren', reject: 'Ablehnen', policy: 'Cookie-Richtlinie' },
    es: { label: 'Consentimiento de cookies', msg: 'Con tu consentimiento uso Google Analytics para medir las visitas y ver qué páginas generan consultas. Instala cookies y envía datos de uso a Google, también a EE. UU.', accept: 'Aceptar', reject: 'Rechazar', policy: 'Política de cookies' }
  };
  var loaded = false, banner = null;

  // Called by main.js / booking.js on conversions; does nothing without consent
  window.track = function () {};
  if (!GA_ID) return;

  function stored() { try { return localStorage.getItem('consent'); } catch (e) { return null; } }
  function store(v) { try { localStorage.setItem('consent', v); } catch (e) {} }

  function load() {
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    // Measurement only: no Google signals or ad personalisation (as the privacy policy states)
    window.gtag('config', GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.track = function (name, params) { window.gtag('event', name, params || {}); };
  }

  function clearGaCookies() {
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (!/^_ga/.test(name)) return;
      ['', '; domain=.' + location.hostname.replace(/^www\./, '')].forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/' + domain;
      });
    });
  }

  function choose(v) {
    store(v);
    banner.hidden = true;
    if (v === 'granted' && !loaded) load();
    // Stop GA first: it rewrites its cookies when the page unloads
    if (v === 'denied' && loaded) { window['ga-disable-' + GA_ID] = true; clearGaCookies(); location.reload(); }
  }

  function show() {
    if (!banner) {
      var lang = document.documentElement.lang.slice(0, 2);
      var t = TEXT[lang] || TEXT.en;
      var btn = 'min-h-[44px] px-5 border border-[#FAFAFA] text-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] font-label-ui text-label-ui uppercase tracking-wider';
      banner = document.createElement('section');
      banner.setAttribute('aria-label', t.label);
      banner.className = 'fixed inset-x-0 bottom-0 z-[60] bg-[#0A0A0A] border-t border-[#404040]';
      banner.innerHTML = '<div class="max-w-[1440px] mx-auto px-4 md:px-10 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">' +
        '<p class="text-[14px] leading-[22px] text-[#C6C6C7] max-w-3xl"><span></span> <a class="text-[#FAFAFA] underline underline-offset-2"></a></p>' +
        '<div class="grid grid-cols-2 gap-3 shrink-0"><button type="button" class="' + btn + '" data-choice="denied"></button>' +
        '<button type="button" class="' + btn + '" data-choice="granted"></button></div></div>';
      banner.querySelector('span').textContent = t.msg;
      var a = banner.querySelector('a');
      a.textContent = t.policy;
      a.href = '/cookies.html?lang=' + (TEXT[lang] ? lang : 'en');
      banner.querySelector('[data-choice="denied"]').textContent = t.reject;
      banner.querySelector('[data-choice="granted"]').textContent = t.accept;
      banner.querySelectorAll('[data-choice]').forEach(function (b) {
        b.addEventListener('click', function () { choose(b.dataset.choice); });
      });
      document.body.appendChild(banner);
    }
    banner.hidden = false;
  }

  document.querySelectorAll('[data-consent-open]').forEach(function (b) {
    b.classList.remove('hidden');
    b.addEventListener('click', show);
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    if (a.href.indexOf('https://wa.me/') === 0) window.track('click_whatsapp');
    else if (a.href.indexOf('mailto:') === 0) window.track('click_email');
  });

  var choice = stored();
  if (choice === 'granted') load();
  else if (choice === 'denied') clearGaCookies();
  else show();
})();
