// Shows the page in the language of the link (?lang=de), else the one saved by the main site ('lang' in localStorage), English by default
(function () {
  var META = JSON.parse(document.getElementById('legal-meta').textContent);
  function show(lang) {
    document.documentElement.lang = lang;
    document.title = META[lang].title;
    document.querySelector('meta[name="description"]').content = META[lang].desc;
    document.querySelectorAll('[data-lang]').forEach(function (el) { el.hidden = el.dataset.lang !== lang; });
    document.querySelectorAll('[data-set-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.setLang === lang)); });
    // "Back to site" links go to the home page in the same language
    document.querySelectorAll('[data-home]').forEach(function (a) { a.href = lang === 'en' ? '/' : '/' + lang + '/'; });
  }
  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      show(b.dataset.setLang);
      try { localStorage.setItem('lang', b.dataset.setLang); } catch (e) {}
    });
  });
  var wanted = new URLSearchParams(location.search).get('lang');
  if (!META[wanted]) { try { wanted = localStorage.getItem('lang'); } catch (e) {} }
  show(META[wanted] ? wanted : 'en');
})();
