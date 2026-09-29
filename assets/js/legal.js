// Shows the page in the language saved by the main site ('lang' in localStorage), English by default
(function () {
  var META = JSON.parse(document.getElementById('legal-meta').textContent);
  function show(lang) {
    document.documentElement.lang = lang;
    document.title = META[lang].title;
    document.querySelector('meta[name="description"]').content = META[lang].desc;
    document.querySelectorAll('[data-lang]').forEach(function (el) { el.hidden = el.dataset.lang !== lang; });
    document.querySelectorAll('[data-set-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.setLang === lang)); });
  }
  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      show(b.dataset.setLang);
      try { localStorage.setItem('lang', b.dataset.setLang); } catch (e) {}
    });
  });
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  show(META[saved] ? saved : 'en');
})();
