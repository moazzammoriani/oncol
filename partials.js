/* Oncology Solutions — shared header/footer injected into every page.
   Each page sets <body data-page="..."> and includes empty
   <div id="site-header"></div> / <div id="site-footer"></div> hosts. */
(function () {
  const page = document.body.dataset.page || '';

  const services = [
    ['patient-and-family-navigation', 'Patient &amp; Family Navigation'],
    ['utilization-management', 'Utilization Management &amp; Disability Reviews'],
    ['medico-legal', 'Medico-Legal Expert Services'],
    ['telemedicine-coverage', 'Telemedicine &amp; Clinical Coverage'],
    ['ai-innovation-advisory', 'AI / Innovation &amp; Advisory'],
    ['practice-consulting', 'Practice &amp; International Clinic Consulting'],
  ];

  const nav = [
    ['index', 'index.html', 'Home'],
    ['about', 'about-us.html', 'About Us'],
    ['services', 'our-services.html', 'Our Services'],
    ['how', 'how-it-works.html', 'How It Works'],
    ['upload', 'upload-reports.html', 'Upload Reports'],
    ['faqs', 'faqs.html', 'FAQs'],
    ['team', 'team.html', 'Team'],
  ];

  const isActive = (key) => (page === key ? ' aria-current="page"' : '');

  const navLinks = nav.map(([key, href, label]) => {
    if (key === 'services') {
      const sub = services
        .map(([slug, name]) => `<a href="service-${slug}.html">${name}</a>`)
        .join('');
      return `<div class="nav__item nav__item--has-sub">
        <a href="${href}"${isActive(key)}>${label}<span class="nav__caret" aria-hidden="true">⌄</span></a>
        <div class="nav__sub">${sub}</div>
      </div>`;
    }
    return `<div class="nav__item"><a href="${href}"${isActive(key)}>${label}</a></div>`;
  }).join('');

  const header = `
  <div class="topbar" id="topbar">
    <div class="wrap topbar__row">
      <a class="topbar__item" href="tel:+18583679786"><span v-icon="phone"></span> +1 (858) 367-9786</a>
      <a class="topbar__item" href="mailto:info@oncsol.com"><span v-icon="mail"></span> info@oncsol.com</a>
      <span class="topbar__spacer"></span>
      <span class="topbar__item topbar__item--muted"><span class="dot"></span> Physician-led second opinions</span>
      <div class="topbar__social">
        <a href="https://www.facebook.com/share/14UqU8B3cjy/?mibextid=wwXIfr" aria-label="Facebook"><span v-icon="facebook"></span></a>
        <a href="https://www.instagram.com/oncologysolutionsonline" aria-label="Instagram"><span v-icon="instagram"></span></a>
      </div>
    </div>
  </div>
  <header class="nav" id="nav">
    <div class="wrap nav__row">
      <a class="brand" id="brand" href="index.html" aria-label="Oncology Solutions home">
        <img class="brand__logo" src="assets/oncology-solutions-logo.png" alt="Oncology Solutions" />
      </a>
      <nav class="nav__links" aria-label="Primary">${navLinks}</nav>
      <div class="nav__cta">
        <a href="contact.html" class="btn btn--coral"${isActive('contact')}>Contact Us</a>
      </div>
      <button class="nav__burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </header>`;

  const footer = `
  <footer class="footer">
    <div class="wrap footer__grid">
      <div class="footer__brand">
        <a class="brand brand--light" href="index.html">
          <img class="brand__logo brand__logo--footer" src="assets/oncology-solutions-logo.png" alt="Oncology Solutions" />
        </a>
        <p>Oncology Solutions provides education, navigation, and professional consulting services. Patient navigation sessions are informational and do not replace your treating physician.</p>
        <div class="footer__social">
          <a href="https://www.facebook.com/share/14UqU8B3cjy/?mibextid=wwXIfr" aria-label="Facebook"><span v-icon="facebook"></span></a>
          <a href="https://www.instagram.com/oncologysolutionsonline" aria-label="Instagram"><span v-icon="instagram"></span></a>
        </div>
      </div>
      <div class="footer__col">
        <h4>Quick Links</h4>
        <a href="index.html">Home</a>
        <a href="about-us.html">About Us</a>
        <a href="our-services.html">Services</a>
        <a href="how-it-works.html">How It Works</a>
        <a href="team.html">Team</a>
        <a href="contact.html">Contact Us</a>
      </div>
      <div class="footer__col">
        <h4>Information</h4>
        <a href="upload-reports.html">Upload Reports</a>
        <a href="faqs.html">FAQs</a>
        <a href="privacy-policy.html">Privacy Policy</a>
        <a href="terms-conditions.html">Terms &amp; Conditions</a>
      </div>
      <div class="footer__col footer__col--cta">
        <h4>Contact Info</h4>
        <a href="tel:+18583679786"><span v-icon="phone"></span> +1 (858) 367-9786</a>
        <a href="mailto:info@oncsol.com"><span v-icon="mail"></span> info@oncsol.com</a>
        <a href="contact.html" class="btn btn--coral">Make an appointment</a>
      </div>
    </div>
    <div class="wrap footer__base">
      <p>© 2026 Oncology Solutions. All rights reserved.</p>
      <p class="footer__disclaimer">Clinical services, where offered, are provided only under appropriate licensure, credentialing, and contracted arrangements.</p>
    </div>
  </footer>`;

  const h = document.getElementById('site-header');
  const f = document.getElementById('site-footer');
  if (h) h.outerHTML = header;
  if (f) f.outerHTML = footer;
})();
