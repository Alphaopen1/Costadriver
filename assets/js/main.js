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
  var form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var name = val('client-name');
    var email = val('client-email');
    var dep = val('departure-date');
    var ret = val('return-date');
    var origin = val('origin');
    var dest = val('destination');
    var pax = val('passengers');
    var vehicle = val('vehicle');
    var message = val('message');

    // Validation
    if (!name) { highlightField('client-name'); return; }
    if (!email || email.indexOf('@') === -1) { highlightField('client-email'); return; }

    // Build message
    var parts = [
      '🚘 *New Booking — Costa Driver*',
      '',
      '👤 *Name:* ' + name,
      '📧 *Email:* ' + email
    ];
    if (dep) parts.push('📅 *Departure:* ' + dep);
    if (ret) parts.push('📅 *Return:* ' + ret);
    if (origin) parts.push('📍 *From:* ' + origin);
    if (dest) parts.push('📍 *To:* ' + dest);
    if (pax) parts.push('👥 *Passengers:* ' + pax);
    if (vehicle) parts.push('🚗 *Vehicle:* ' + vehicle);
    if (message) parts.push('💬 *Notes:* ' + message);

    var text = parts.join('\n');

    // Check chosen method
    var method = 'email';
    var radios = form.querySelectorAll('input[name="send-method"]');
    radios.forEach(function(r) { if (r.checked) method = r.value; });

    if (method === 'whatsapp') {
      var waLink = 'https://wa.me/33767821715?text=' + encodeURIComponent(text);
      window.open(waLink, '_blank');
    } else {
      var emailBody = text.replace(/\*/g, '');
      var mailto = 'mailto:contact@costadriver.fr'
        + '?subject=' + encodeURIComponent('Booking Request — ' + name)
        + '&body=' + encodeURIComponent(emailBody);
      window.location.href = mailto;
    }

    // Show success message
    form.querySelectorAll('.form-group, .form-row, button').forEach(function(el) {
      el.style.display = 'none';
    });
    var success = document.getElementById('booking-success');
    if (success) success.style.display = 'block';
  });

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function highlightField(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = '#c0392b';
    el.focus();
    setTimeout(function() { el.style.borderColor = ''; }, 3000);
  }
})();
