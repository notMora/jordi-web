// Cal.com booking widget: reads real availability and creates bookings through the public
// Cal.com API (no API key needed). If the Cal.com user or event changes, update these values.
(function () {
  var CAL_USERNAME = 'notmora';
  var CAL_EVENT_SLUG = '20min';
  var CAL_EVENT_TYPE_ID = 7261608;
  var API = 'https://api.cal.com/v2';
  var TZ = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Zurich';
  var STEP = 30;       // slider moves in 30-minute steps
  var MAX_DAYS = 14;
  // How each service appears in the booking notes Jordi receives
  var SERVICE_NOTE = { web: 'Página web', booking: 'Reservas y pagos online', ai: 'Asistente automático (IA)', help: 'Todavía no lo sabe, necesita ayuda' };

  var $ = function (id) { return document.getElementById(id); };
  var elDays = $('bk-days'), elTime = $('bk-time'), elTimeLabel = $('bk-time-label'), elNote = $('bk-time-note');
  var elMarks = $('bk-marks'), elForm = $('bk-form'), elSubmit = $('bk-submit'), elMsg = $('bk-msg');
  var elSummary = $('bk-summary'), elPanel = $('bk-panel'), elSuccess = $('bk-success');
  if (!elDays) return;

  var PILL = 'border border-[#E5E5E5] bg-[#FAFAFA] text-[#0A0A0A] hover:border-[#0A0A0A] ' +
    'aria-pressed:border-[#0A0A0A] aria-pressed:bg-[#0A0A0A] aria-pressed:text-[#FAFAFA] font-label-code text-label-code transition-none';

  var slotsByDay = {};   // "YYYY-MM-DD" -> { minutesOfDay: ISO start }
  var rangeStart = 0, rangeEnd = 0;
  var state = 'loading'; // loading | ready | error
  var selDay = null, booked = null;

  $('bk-tz').textContent = TZ.replace(/_/g, ' ');
  $('bk-fallback').href = 'https://cal.com/' + CAL_USERNAME + '/' + CAL_EVENT_SLUG;

  function t(key) { return i18nData[currentLang][key]; }
  function fmt(iso, opts) { return new Date(iso).toLocaleString(currentLang, Object.assign({ timeZone: TZ }, opts)); }
  function minutesOf(iso) {
    var hm = new Date(iso).toLocaleTimeString('en-GB', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
    return (+hm.slice(0, 2)) * 60 + (+hm.slice(3, 5));
  }
  function clock(min) {
    return new Date(Date.UTC(2000, 0, 1, Math.floor(min / 60), min % 60))
      .toLocaleTimeString(currentLang, { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
  }
  function showMsg(text) { elMsg.textContent = text || ''; elMsg.classList.toggle('hidden', !text); }
  function sliderMin() { return rangeStart + (+elTime.value) * STEP; }
  function selectedIso() { return (slotsByDay[selDay] || {})[sliderMin()] || null; }
  function setSlider(min) { elTime.value = Math.round((min - rangeStart) / STEP); updateTime(); }

  function nearestFree(min) {
    var best = null, bestDiff = Infinity;
    Object.keys(slotsByDay[selDay] || {}).forEach(function (k) {
      var d = Math.abs(+k - min);
      if (d < bestDiff) { bestDiff = d; best = +k; }
    });
    return best;
  }

  function renderMarks() {
    elMarks.innerHTML = '';
    var map = slotsByDay[selDay] || {};
    for (var m = rangeStart; m <= rangeEnd; m += STEP) {
      var s = document.createElement('span');
      s.className = 'flex-1 h-1.5 ' + (map[m] ? 'bg-[#C6FF3D]' : 'bg-[#F0F0F0]');
      elMarks.appendChild(s);
    }
  }

  function updateTime() {
    var min = sliderMin(), iso = selectedIso();
    var pct = rangeEnd > rangeStart ? (min - rangeStart) / (rangeEnd - rangeStart) * 100 : 0;
    elTime.style.setProperty('--fill', pct + '%');
    elTimeLabel.textContent = clock(min);
    elTimeLabel.classList.toggle('text-[#8E8E8E]', !iso);
    elTime.setAttribute('aria-valuetext', clock(min));
    elTime.classList.toggle('is-off', !iso);
    elNote.innerHTML = '';
    if (iso) {
      elNote.textContent = '✓ ' + t('bk_free');
    } else {
      var near = nearestFree(min);
      if (near === null) {
        elNote.textContent = t('bk_day_full');
      } else {
        elNote.appendChild(document.createTextNode(t('bk_busy').replace('{time}', clock(min)) + ' '));
        var a = document.createElement('button');
        a.type = 'button';
        a.className = 'font-semibold text-[#0A0A0A] underline underline-offset-4';
        a.textContent = clock(near);
        a.addEventListener('click', function () { setSlider(near); elTime.focus(); });
        elNote.appendChild(a);
      }
    }
    elSummary.textContent = iso
      ? fmt(iso, { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
      : '—';
    elSubmit.disabled = !iso;
  }

  function selectDay(day) {
    selDay = day;
    Array.prototype.forEach.call(elDays.children, function (c) { c.setAttribute('aria-pressed', String(c.dataset.day === day)); });
    renderMarks();
    if (!selectedIso()) { var near = nearestFree(sliderMin()); if (near !== null) elTime.value = Math.round((near - rangeStart) / STEP); }
    updateTime();
  }

  function render() {
    if (booked) {
      $('bk-success-text').textContent = t('bk_success_text')
        .replace('{date}', fmt(booked.start, { weekday: 'long', day: 'numeric', month: 'long' }))
        .replace('{time}', fmt(booked.start, { hour: '2-digit', minute: '2-digit' }))
        .replace('{email}', booked.email);
      return;
    }
    elDays.innerHTML = '';
    var days = Object.keys(slotsByDay).sort().slice(0, MAX_DAYS);
    var ready = state === 'ready' && days.length;
    $('bk-time-block').classList.toggle('hidden', !ready);
    if (!ready) {
      var p = document.createElement('p');
      p.textContent = t(state === 'loading' ? 'bk_loading' : state === 'error' ? 'bk_error_load' : 'bk_no_slots');
      elDays.appendChild(p);
      elSubmit.disabled = true;
      return;
    }
    days.forEach(function (day) {
      var first = slotsByDay[day][Object.keys(slotsByDay[day])[0]];
      var b = document.createElement('button');
      b.type = 'button';
      b.dataset.day = day;
      b.className = PILL + ' shrink-0 w-16 py-3 text-center';
      b.innerHTML = '<span class="block text-[10px] uppercase opacity-70"></span>' +
        '<span class="block font-bold text-sm"></span><span class="block text-[10px] uppercase opacity-70"></span>';
      b.children[0].textContent = fmt(first, { weekday: 'short' }).replace('.', '');
      b.children[1].textContent = fmt(first, { day: 'numeric' }).replace('.', '');
      b.children[2].textContent = fmt(first, { month: 'short' }).replace('.', '');
      b.addEventListener('click', function () { showMsg(''); selectDay(day); });
      elDays.appendChild(b);
    });
    $('bk-min').textContent = clock(rangeStart);
    $('bk-mid').textContent = clock(rangeStart + Math.round((rangeEnd - rangeStart) / 2 / STEP) * STEP);
    $('bk-max').textContent = clock(rangeEnd);
    selectDay(selDay && slotsByDay[selDay] ? selDay : days[0]);
  }
  window.renderBooking = render;
  elTime.addEventListener('input', function () { showMsg(''); updateTime(); });

  // Load real availability (next 30 days) in the visitor's time zone, keeping :00 and :30 slots.
  // Only once the visitor approaches the booking section, so Cal.com is not contacted on every page view.
  function loadSlots() {
    var from = new Date(), to = new Date();
    to.setDate(to.getDate() + 30);
    fetch(API + '/slots?eventTypeId=' + CAL_EVENT_TYPE_ID +
      '&start=' + from.toISOString().slice(0, 10) + '&end=' + to.toISOString().slice(0, 10) +
      '&timeZone=' + encodeURIComponent(TZ), { headers: { 'cal-api-version': '2024-09-04' } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (j) {
        var data = (j && j.data) || {}, lo = Infinity, hi = -Infinity;
        Object.keys(data).forEach(function (day) {
          var map = {}, n = 0;
          (data[day] || []).forEach(function (s) {
            var m = minutesOf(s.start);
            if (m % STEP) return;
            map[m] = s.start; n++;
            lo = Math.min(lo, m); hi = Math.max(hi, m);
          });
          if (n) slotsByDay[day] = map;
        });
        if (isFinite(lo)) {
          rangeStart = lo; rangeEnd = hi;
          elTime.max = Math.max(1, (hi - lo) / STEP);
        }
        state = Object.keys(slotsByDay).length ? 'ready' : 'empty';
        render();
      })
      .catch(function () { state = 'error'; render(); });
  }
  var slotsObserver = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    slotsObserver.disconnect();
    loadSlots();
  }, { rootMargin: '800px 0px' });
  slotsObserver.observe($('booking-calendar'));

  // Validate and create the booking in Cal.com (Cal.com emails the confirmation to the client)
  elForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var iso = selectedIso();
    if (!iso) return;
    var f = elForm;
    var name = f.name.value.trim(), email = f.email.value.trim(), notes = f.notes.value.trim();
    var phone = f.phone.value.trim().replace(/[\s().\-]/g, '').replace(/^00/, '+');
    var service = (f.querySelector('input[name="service"]:checked') || {}).value;
    if (!service) { showMsg(t('bk_err_service')); f.querySelector('input[name="service"]').focus(); return; }
    if (!name) { showMsg(t('bk_err_name')); f.name.focus(); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { showMsg(t('bk_err_email')); f.email.focus(); return; }
    if (!/^\+[0-9]{8,15}$/.test(phone)) { showMsg(t('bk_err_phone')); f.phone.focus(); return; }

    var details = 'Servicio: ' + SERVICE_NOTE[service] + '\nTeléfono / WhatsApp: ' + phone +
      '\nIdioma: ' + currentLang.toUpperCase() + (notes ? '\n\n' + notes : '');
    showMsg('');
    elSubmit.disabled = true;
    elSubmit.textContent = t('bk_booking');
    fetch(API + '/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'cal-api-version': '2024-08-13' },
      body: JSON.stringify({
        start: new Date(iso).toISOString(),
        eventTypeId: CAL_EVENT_TYPE_ID,
        attendee: { name: name, email: email, timeZone: TZ, language: currentLang },
        bookingFieldsResponses: { notes: details }
      })
    })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          if (!r.ok || j.status === 'error') throw j;
        });
      })
      .then(function () {
        booked = { start: iso, email: email };
        elPanel.classList.add('hidden');
        elSuccess.classList.remove('hidden');
        render();
      })
      .catch(function () {
        elSubmit.disabled = false;
        elSubmit.textContent = t('bk_submit');
        showMsg(t('bk_error_book'));
      });
  });

  render();
})();
