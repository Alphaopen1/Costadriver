const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
  hamburger.setAttribute('aria-expanded', open);
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ── Destination cards: make entire card tappable ── */
document.querySelectorAll('.dest-card').forEach(card => {
  const link = card.querySelector('.dest-link');
  if (!link) return;
  card.style.cursor = 'pointer';
  card.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    window.location.href = link.href;
  });
});

/* ── Header: shrink on scroll ── */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Google Ads: gtag_report_conversion ──────────────────────────────────────
   Uses event_callback so the conversion hit is guaranteed to reach Google
   before any page navigation (critical for mailto: redirects).
   Falls back after 1 s if gtag is blocked/slow.
──────────────────────────────────────────────────────────────────────────── */
function gtag_report_conversion(onComplete) {
  var done = false;
  function finish() {
    if (done) return;
    done = true;
    if (typeof onComplete === 'function') onComplete();
  }
  if (typeof gtag !== 'function') { finish(); return false; }

  // Primary conversion: Réservation Formulaire Site (Google-provided label)
  gtag('event', 'conversion', {
    send_to: 'AW-17621110931/a_foCPy_nrIcEJOhs9JB',
    event_callback: finish
  });
  // Secondary label (belt-and-suspenders)
  gtag('event', 'conversion', { send_to: 'AW-17621110931/qzkzClvc768cEJOhs9JB' });

  // Safety timeout: navigate even if gtag stalls
  setTimeout(finish, 1000);
  return false;
}

/* ── Booking Form: Email + WhatsApp ── */
(function () {
  var form = document.getElementById('booking-form');
  if (!form) return;

  /* ── Trip type: disable return date on one-way ── */
  var tripRadios = document.querySelectorAll('input[name="trip-type"]');
  var returnDate = document.getElementById('return-date');

  function toggleReturnDate() {
    var checked = document.querySelector('input[name="trip-type"]:checked');
    if (checked && returnDate) {
      var isOneWay = checked.value === 'one-way';
      returnDate.disabled = isOneWay;
      returnDate.style.opacity = isOneWay ? '0.35' : '1';
      if (isOneWay) returnDate.value = '';
    }
  }

  tripRadios.forEach(function (r) {
    r.addEventListener('change', toggleReturnDate);
  });
  toggleReturnDate();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    var name    = val('client-name');
    var email   = val('client-email');
    var dep     = val('departure-date');
    var ret     = val('return-date');
    var origin  = val('origin');
    var dest    = val('destination');
    var pax     = val('passengers');
    var vehicle = val('vehicle');
    var tripType = document.querySelector('input[name="trip-type"]:checked');
    var pickup  = val('pickup-time');
    var message = val('message');

    // Validation
    if (!name)                         { highlightField('client-name');  return; }
    if (!email || !email.includes('@')) { highlightField('client-email'); return; }

    // Build shared message body
    var parts = ['🚘 *New Booking — Costa Driver*', ''];
    parts.push('👤 *Name:* '  + name);
    parts.push('📧 *Email:* ' + email);
    if (dep)     parts.push('📅 *Departure:* ' + dep);
    if (ret)     parts.push('📅 *Return:* '    + ret);
    if (origin)  parts.push('📍 *From:* '      + origin);
    if (dest)    parts.push('📍 *To:* '        + dest);
    if (pax)     parts.push('👥 *Passengers:* '+ pax);
    if (vehicle) parts.push('🚗 *Vehicle:* '   + vehicle);
    if (pickup)  parts.push('⏰ *Pick-up:* '   + pickup);
    if (tripType) parts.push('🔄 *Trip:* '    + (tripType.value === 'one-way' ? 'One-way / Aller simple' : 'Round-trip / Aller-retour'));
    if (message) parts.push('💬 *Notes:* '     + message);
    var text = parts.join('\n');

    // Chosen send method
    var method = 'email';
    form.querySelectorAll('input[name="send-method"]').forEach(function (r) {
      if (r.checked) method = r.value;
    });

    // Show success immediately (UX)
    showSuccess();

    if (method === 'whatsapp') {
      // WhatsApp: new tab stays open — fire conversion then open
      var waLink = 'https://wa.me/33767821715?text=' + encodeURIComponent(text);
      gtag_report_conversion(function () { window.open(waLink, '_blank'); });
    } else {
      // Email: use event_callback so gtag completes BEFORE mailto triggers
      var emailBody = text.replace(/\*/g, '');
      var mailto = 'mailto:contact@costadriver.fr'
        + '?subject=' + encodeURIComponent('Booking Request — ' + name)
        + '&body='    + encodeURIComponent(emailBody);
      gtag_report_conversion(function () { window.location.href = mailto; });
    }
  });

  function showSuccess() {
    form.querySelectorAll('.form-group, .form-row, button').forEach(function (el) {
      el.style.display = 'none';
    });
    var s = document.getElementById('booking-success');
    if (s) s.style.display = 'block';
  }

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function highlightField(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = '#c0392b';
    el.focus();
    setTimeout(function () { el.style.borderColor = ''; }, 3000);
  }
}());
