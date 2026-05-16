const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.classList.remove('nav-open');
  });
});

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ── Booking Form: Email + WhatsApp ── */
(function() {
  const btn = document.getElementById('btn-send-booking');
  if (!btn) return;

  btn.addEventListener('click', function() {
    const form = document.getElementById('booking-form');
    const name = (document.getElementById('client-name') || {}).value || '';
    const email = (document.getElementById('client-email') || {}).value || '';
    const dep = (document.getElementById('departure-date') || {}).value || '';
    const ret = (document.getElementById('return-date') || {}).value || '';
    const origin = (document.getElementById('origin') || {}).value || '';
    const dest = (document.getElementById('destination') || {}).value || '';
    const pax = (document.getElementById('passengers') || {}).value || '';
    const vehicle = (document.getElementById('vehicle') || {}).value || '';
    const message = (document.getElementById('message') || {}).value || '';

    // Basic validation
    if (!name.trim()) { highlightField('client-name'); return; }
    if (!email.trim() || !email.includes('@')) { highlightField('client-email'); return; }

    // Build message body
    const lines = [
      '🚘 *New Booking Request — Costa Driver*',
      '',
      '👤 *Name:* ' + name,
      '📧 *Email:* ' + email,
      dep ? '📅 *Departure:* ' + dep : '',
      ret ? '📅 *Return:* ' + ret : '',
      origin ? '📍 *From:* ' + origin : '',
      dest ? '📍 *To:* ' + dest : '',
      pax ? '👥 *Passengers:* ' + pax : '',
      vehicle ? '🚗 *Vehicle:* ' + vehicle : '',
      message ? '💬 *Notes:* ' + message : '',
    ].filter(Boolean).join('\n');

    // 1) Send email via mailto
    const subject = encodeURIComponent('Booking Request — ' + name);
    const body = encodeURIComponent(lines.replace(/\*/g, '').replace(/[🚘👤📧📅📍👥🚗💬]/g, ''));
    const mailtoLink = 'mailto:contact@costadriver.fr?subject=' + subject + '&body=' + body;

    // 2) Send WhatsApp message
    const waText = encodeURIComponent(lines);
    const waLink = 'https://wa.me/33767821715?text=' + waText;

    // Open both
    window.open(waLink, '_blank');
    window.location.href = mailtoLink;

    // Show success
    form.querySelectorAll('.form-group, .form-row, .btn-submit').forEach(function(el) {
      el.style.display = 'none';
    });
    document.getElementById('booking-success').style.display = 'block';
  });

  function highlightField(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = '#c0392b';
    el.focus();
    setTimeout(function() { el.style.borderColor = ''; }, 3000);
  }
})();
