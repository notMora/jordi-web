// Each page is rendered in its language at build time (scripts/build-pages.mjs); scripts only follow it
const currentLang = document.documentElement.lang.slice(0, 2) in i18nData ? document.documentElement.lang.slice(0, 2) : 'en';

document.addEventListener('DOMContentLoaded', () => {
  // Language links open the translated page. The choice is also remembered for the legal pages;
  // saved only on an explicit choice, so it stays consent-exempt technical storage
  document.querySelectorAll('[data-set-lang]').forEach(a => a.addEventListener('click', () => {
    try { localStorage.setItem('lang', a.dataset.setLang); } catch (e) {}
  }));

  // Accordion JS (Exclusive one-at-a-time)
  const accordion = document.getElementById('faq-accordion');
  if (accordion) {
    const triggers = accordion.querySelectorAll('.faq-trigger');
    triggers.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        // Close all
        triggers.forEach(otherBtn => {
          const otherItem = otherBtn.closest('.faq-item');
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherItem.querySelector('.faq-icon');
          otherBtn.setAttribute('aria-expanded', 'false');
          otherContent.classList.add('hidden');
          otherIcon.textContent = '+';
        });

        // Toggle selected
        if (!isExpanded) {
          btn.setAttribute('aria-expanded', 'true');
          content.classList.remove('hidden');
          icon.textContent = '—';
        }
      });
    });
  }

  // Contact form -> Formspree (messages arrive by email)
  const form = document.getElementById('contact-form');
  const formOk = document.getElementById('form-feedback');
  const formError = document.getElementById('form-error');
  const formSubmit = document.getElementById('form-submit');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      formOk.classList.add('hidden');
      formError.classList.add('hidden');
      const phoneError = document.getElementById('form-phone-error');
      const phone = form.phone.value.trim().replace(/[\s().\-]/g, '').replace(/^00/, '+');
      phoneError.classList.toggle('hidden', /^\+[0-9]{8,15}$/.test(phone));
      if (!phoneError.classList.contains('hidden')) { form.phone.focus(); return; }
      form.phone.value = phone;
      formSubmit.disabled = true;
      formSubmit.classList.add('opacity-50');
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        // Formspree refuses script submissions while its reCAPTCHA is on: send the form normally,
        // so Formspree shows its check and then delivers the message
        if (!res.ok) { form.submit(); return; }
        form.reset();
        formOk.classList.remove('hidden');
        if (window.track) window.track('generate_lead', { method: 'contact_form' });
      } catch (err) {
        formError.classList.remove('hidden');
      } finally {
        formSubmit.disabled = false;
        formSubmit.classList.remove('opacity-50');
      }
    });
  }

  // Mobile / tablet menu
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const setMenu = (open) => {
    const key = open ? 'nav_menu_close' : 'nav_menu_open';
    mobileMenu.classList.toggle('hidden', !open);
    document.body.classList.toggle('max-xl:overflow-hidden', open); // no page scroll behind the open menu
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('data-i18n-aria', key);
    menuToggle.setAttribute('aria-label', i18nData[currentLang][key]);
    document.getElementById('menu-icon').textContent = open ? 'close' : 'menu';
  };
  menuToggle.addEventListener('click', () => setMenu(mobileMenu.classList.contains('hidden')));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  // Tabbing out of the open menu closes it, so focus never lands on the locked page behind it
  menuToggle.closest('header').addEventListener('focusout', (e) => {
    if (!mobileMenu.classList.contains('hidden') && !e.currentTarget.contains(e.relatedTarget)) setMenu(false);
  });

  // Underline the nav link of the section in view (none while on the hero)
  const navLinks = document.querySelectorAll('header nav a[href^="#"]:not([href="#booking-calendar"])');
  const navSpy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + entry.target.id)));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section').forEach(section => navSpy.observe(section));

  // Sticky CTA bar: shown only while the hero CTA is off screen and the contact section is not yet in view
  const stickyBar = document.getElementById('sticky-cta-bar');
  const contactSection = document.getElementById('contact');
  const heroCta = document.getElementById('hero-cta');
  if (stickyBar && contactSection && heroCta) {
    let heroCtaVisible = true;
    const updateStickyBar = () => {
      const contactVisible = contactSection.getBoundingClientRect().top <= window.innerHeight;
      stickyBar.classList.toggle('translate-y-full', heroCtaVisible || contactVisible);
    };
    // The observer also catches layout shifts (e.g. web font swap) that move the CTA without a scroll
    new IntersectionObserver(([entry]) => { heroCtaVisible = entry.isIntersecting; updateStickyBar(); }).observe(heroCta);
    window.addEventListener('scroll', updateStickyBar, { passive: true });
  }
});
