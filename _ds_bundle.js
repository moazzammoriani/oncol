/* @ds-bundle: {"format":3,"namespace":"OncologySolutionsWebsite_027947","components":[],"sourceHashes":{"app.js":"115fa0346dfd","icons.js":"aa820c15046a","partials.js":"7478dd4278c6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.OncologySolutionsWebsite_027947 = window.OncologySolutionsWebsite_027947 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// app.js
try { (() => {
/* Oncology Solutions — interaction & motion */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- sticky nav state ---- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('is-stuck');else nav.classList.remove('is-stuck');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {
    passive: true
  });

  /* ---- mobile menu ---- */
  const burger = document.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__links a').forEach(a => a.addEventListener('click', e => {
      // on mobile, tapping a parent with a submenu expands it instead of navigating away immediately
      const item = a.closest('.nav__item--has-sub');
      if (item && window.matchMedia('(max-width: 1080px)').matches && !item.classList.contains('exp')) {
        e.preventDefault();
        item.classList.add('exp');
        return;
      }
      nav.classList.remove('open');
    }));
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.acc__q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.acc__item');
      const open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---- upload-reports demo ---- */
  const drop = document.getElementById('dropzone');
  if (drop) {
    const input = document.getElementById('fileInput');
    const list = document.getElementById('fileList');
    const render = files => {
      list.innerHTML = '';
      Array.from(files).forEach(f => {
        const li = document.createElement('li');
        li.innerHTML = `<span v-icon="file"></span> ${f.name} <em>${(f.size / 1024).toFixed(0)} KB</em>`;
        list.appendChild(li);
      });
      // re-render icons for injected nodes
      if (window.__paintIcons) window.__paintIcons(list);
    };
    drop.addEventListener('click', () => input && input.click());
    if (input) input.addEventListener('change', () => render(input.files));
    ['dragover', 'dragenter'].forEach(ev => drop.addEventListener(ev, e => {
      e.preventDefault();
      drop.classList.add('is-over');
    }));
    ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => {
      e.preventDefault();
      drop.classList.remove('is-over');
    }));
    drop.addEventListener('drop', e => {
      if (e.dataTransfer.files.length) render(e.dataTransfer.files);
    });
  }

  /* ---- counters helper ---- */
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const runCount = el => {
    if (el.__counted) return;
    el.__counted = true;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    if (reduce) {
      el.textContent = prefix + target + suffix;
      return;
    }
    const dur = 1500;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      const v = Math.round(easeOut(p) * target);
      el.textContent = prefix + v + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---- reveal / counters / progress via manual viewport check (bulletproof) ---- */
  const revs = Array.from(document.querySelectorAll('[data-rv]'));
  const counters = Array.from(document.querySelectorAll('[data-count]'));
  const prog = document.getElementById('stepsProgress');
  if (reduce) {
    revs.forEach(el => el.classList.add('in'));
    counters.forEach(el => runCount(el));
    if (prog) prog.style.width = '100%';
  } else {
    const checkReveal = () => {
      const vh = window.innerHeight;
      for (let i = revs.length - 1; i >= 0; i--) {
        const el = revs[i];
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) {
          el.classList.add('in');
          revs.splice(i, 1);
        }
      }
      for (let i = counters.length - 1; i >= 0; i--) {
        const r = counters[i].getBoundingClientRect();
        if (r.top < vh * 0.85 && r.bottom > 0) {
          runCount(counters[i]);
          counters.splice(i, 1);
        }
      }
      if (prog) {
        const r = prog.parentElement.getBoundingClientRect();
        if (r.top < vh * 0.7 && r.bottom > 0) {
          prog.style.width = '100%';
        }
      }
    };
    window.addEventListener('scroll', checkReveal, {
      passive: true
    });
    window.addEventListener('resize', checkReveal);
    window.addEventListener('load', checkReveal);
    checkReveal();
    // staggered safety passes in case layout/fonts shift first paint
    [120, 400, 900].forEach(t => setTimeout(checkReveal, t));
  }

  /* ---- parallax (hero + tagged media) ---- */
  if (!reduce) {
    const heroMedia = document.getElementById('heroMedia');
    const paras = document.querySelectorAll('[data-parallax] img, [data-parallax-bg] img');
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      if (heroMedia) heroMedia.style.transform = `translateY(${y * 0.18}px)`;
      paras.forEach(img => {
        const r = img.getBoundingClientRect();
        const wrap = img.parentElement.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          const center = (wrap.top + wrap.height / 2 - window.innerHeight / 2) / window.innerHeight;
          img.style.transform = `translateY(${center * -36}px)`;
        }
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, {
      passive: true
    });
    update();
  }

  /* ---- magnetic-ish lift on coral buttons (pointer) ---- */
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.btn--coral').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
        btn.style.transform = `translate(${x * 5}px, ${y * 5 - 2}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ---- appointment form ---- */
  const form = document.getElementById('apptForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('#f-name');
      const email = form.querySelector('#f-email');
      if (!name.value.trim() || !email.value.trim()) {
        (!name.value.trim() ? name : email).focus();
        return;
      }
      document.getElementById('apptOk').hidden = false;
    });
  }

  /* ---- set min date = today ---- */
  const date = document.getElementById('f-date');
  if (date) date.min = new Date().toISOString().split('T')[0];
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "app.js", error: String((e && e.message) || e) }); }

// icons.js
try { (() => {
/* Oncology Solutions — line icon set. Consistent 1.6 stroke, round caps. */
(function () {
  const S = p => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    report: S('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M8 13h8M8 17h5"/>'),
    options: S('<path d="M4 7h10M4 12h16M4 17h7"/><circle cx="18" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>'),
    scan: S('<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3.2"/>'),
    questions: S('<path d="M9.2 9a2.8 2.8 0 1 1 3.4 2.8c-.9.3-1.6 1-1.6 2v.4"/><path d="M11 17.5h.01"/><circle cx="12" cy="12" r="9"/>'),
    compass: S('<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>'),
    heart: S('<path d="M12 20s-7-4.6-7-9.4A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 7-2.4C19 11 12 20 12 20Z"/>'),
    check: S('<path d="M20 6 9 17l-5-5"/>'),
    upload: S('<path d="M12 16V5M8 9l4-4 4 4"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>'),
    review: S('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/><path d="M11 8v3l2 2"/>'),
    expert: S('<path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M5 20a7 7 0 0 1 14 0"/><path d="m18 4 1 2 2 .5-1.5 1.5.3 2L18 11l-1.8 1 .3-2L15 8.5 17 8z"/>'),
    report2: S('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="m9 14 2 2 4-4"/>'),
    clock: S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>'),
    lock: S('<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><path d="M12 14.5v2.5"/>'),
    badge: S('<path d="M12 3 4.5 6.2V11c0 4.6 3.2 8 7.5 9 4.3-1 7.5-4.4 7.5-9V6.2z"/><path d="m9 12 2 2 4-4"/>'),
    team: S('<circle cx="9" cy="9" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 6.2a3 3 0 0 1 0 5.6"/><path d="M17.5 14.3A5.5 5.5 0 0 1 20.5 19"/>'),
    phone: S('<path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 4.5 4.5L15 16l4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 6.6 1.5 1.5 0 0 1 5 5z"/>'),
    mail: S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>'),
    facebook: S('<path d="M14 9V7.2c0-.9.4-1.2 1.3-1.2H17V3h-2.6C11.9 3 11 4.4 11 6.6V9H9v3h2v9h3v-9h2.2l.5-3z"/>'),
    instagram: S('<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="3.8"/><circle cx="16.8" cy="7.2" r=".9" fill="currentColor" stroke="none"/>'),
    linkedin: S('<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 17v-7"/>'),
    scale: S('<path d="M12 3v18M7 21h10M5 7h14M5 7 3 13a3 3 0 0 0 6 0L7 7M19 7l-2 6a3 3 0 0 0 6 0l-2-6M8 7l4-2 4 2"/>'),
    brain: S('<path d="M12 5a2.5 2.5 0 0 0-5 .3A2.5 2.5 0 0 0 5 9.5a2.5 2.5 0 0 0 1 4.2A2.5 2.5 0 0 0 9 18a2.5 2.5 0 0 0 3 .5M12 5a2.5 2.5 0 0 1 5 .3 2.5 2.5 0 0 1 2 4.2 2.5 2.5 0 0 1-1 4.2A2.5 2.5 0 0 1 15 18a2.5 2.5 0 0 1-3 .5M12 5v13.5"/>'),
    globe: S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    steth: S('<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M6 3H4M14 3h2M10 16v1a4 4 0 0 0 8 0v-2"/><circle cx="18" cy="11" r="2"/>'),
    building: S('<path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M15 9h2a2 2 0 0 1 2 2v10M9 7h2M9 11h2M9 15h2"/>'),
    file: S('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>'),
    shield: S('<path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/>'),
    plus: S('<path d="M12 5v14M5 12h14"/>'),
    pin: S('<path d="M12 21s-6-5-6-10a6 6 0 0 1 12 0c0 5-6 10-6 10Z"/><circle cx="12" cy="11" r="2.2"/>'),
    arrow: S('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    users: S('<circle cx="9" cy="9" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 6.2a3 3 0 0 1 0 5.6"/><path d="M17.5 14.3A5.5 5.5 0 0 1 20.5 19"/>')
  };
  document.querySelectorAll('[v-icon]').forEach(el => {
    const k = el.getAttribute('v-icon');
    if (I[k]) el.innerHTML = I[k];
  });
  window.__paintIcons = root => {
    (root || document).querySelectorAll('[v-icon]').forEach(el => {
      const k = el.getAttribute('v-icon');
      if (I[k] && !el.firstChild) el.innerHTML = I[k];
    });
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "icons.js", error: String((e && e.message) || e) }); }

// partials.js
try { (() => {
/* Oncology Solutions — shared header/footer injected into every page.
   Each page sets <body data-page="..."> and includes empty
   <div id="site-header"></div> / <div id="site-footer"></div> hosts. */
(function () {
  const page = document.body.dataset.page || '';
  const services = [['patient-and-family-navigation', 'Patient &amp; Family Navigation'], ['utilization-management', 'Utilization Management &amp; Disability Reviews'], ['medico-legal', 'Medico-Legal Expert Services'], ['telemedicine-coverage', 'Telemedicine &amp; Clinical Coverage'], ['ai-innovation-advisory', 'AI / Innovation &amp; Advisory'], ['practice-consulting', 'Practice &amp; International Clinic Consulting']];
  const nav = [['index', 'index.html', 'Home'], ['about', 'about-us.html', 'About Us'], ['services', 'our-services.html', 'Our Services'], ['how', 'how-it-works.html', 'How It Works'], ['upload', 'upload-reports.html', 'Upload Reports'], ['faqs', 'faqs.html', 'FAQs'], ['team', 'team.html', 'Team']];
  const isActive = key => page === key ? ' aria-current="page"' : '';
  const navLinks = nav.map(([key, href, label]) => {
    if (key === 'services') {
      const sub = services.map(([slug, name]) => `<a href="service-${slug}.html">${name}</a>`).join('');
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "partials.js", error: String((e && e.message) || e) }); }

})();
