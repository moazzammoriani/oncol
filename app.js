/* Oncology Solutions — interaction & motion */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- sticky nav state ---- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('is-stuck');
    else nav.classList.remove('is-stuck');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile menu ---- */
  const burger = document.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__links a').forEach((a) =>
      a.addEventListener('click', (e) => {
        // on mobile, tapping a parent with a submenu expands it instead of navigating away immediately
        const item = a.closest('.nav__item--has-sub');
        if (item && window.matchMedia('(max-width: 1080px)').matches && !item.classList.contains('exp')) {
          e.preventDefault();
          item.classList.add('exp');
          return;
        }
        nav.classList.remove('open');
      })
    );
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.acc__q').forEach((q) => {
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
    const render = (files) => {
      list.innerHTML = '';
      Array.from(files).forEach((f) => {
        const li = document.createElement('li');
        li.innerHTML = `<span v-icon="file"></span> ${f.name} <em>${(f.size/1024).toFixed(0)} KB</em>`;
        list.appendChild(li);
      });
      // re-render icons for injected nodes
      if (window.__paintIcons) window.__paintIcons(list);
    };
    drop.addEventListener('click', () => input && input.click());
    if (input) input.addEventListener('change', () => render(input.files));
    ['dragover','dragenter'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('is-over'); }));
    ['dragleave','drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('is-over'); }));
    drop.addEventListener('drop', (e) => { if (e.dataTransfer.files.length) render(e.dataTransfer.files); });
  }

  /* ---- counters helper ---- */
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const runCount = (el) => {
    if (el.__counted) return;
    el.__counted = true;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    if (reduce) { el.textContent = prefix + target + suffix; return; }
    const dur = 1500;
    const start = performance.now();
    const tick = (now) => {
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
    revs.forEach((el) => el.classList.add('in'));
    counters.forEach((el) => runCount(el));
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
        if (r.top < vh * 0.85 && r.bottom > 0) { runCount(counters[i]); counters.splice(i, 1); }
      }
      if (prog) {
        const r = prog.parentElement.getBoundingClientRect();
        if (r.top < vh * 0.7 && r.bottom > 0) { prog.style.width = '100%'; }
      }
    };
    window.addEventListener('scroll', checkReveal, { passive: true });
    window.addEventListener('resize', checkReveal);
    window.addEventListener('load', checkReveal);
    checkReveal();
    // staggered safety passes in case layout/fonts shift first paint
    [120, 400, 900].forEach((t) => setTimeout(checkReveal, t));
  }

  /* ---- parallax (hero + tagged media) ---- */
  if (!reduce) {
    const heroMedia = document.getElementById('heroMedia');
    const paras = document.querySelectorAll('[data-parallax] img, [data-parallax-bg] img');
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      if (heroMedia) heroMedia.style.transform = `translateY(${y * 0.18}px)`;
      paras.forEach((img) => {
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
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---- magnetic-ish lift on coral buttons (pointer) ---- */
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.btn--coral').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / r.width;
        const y = (e.clientY - r.top - r.height / 2) / r.height;
        btn.style.transform = `translate(${x * 5}px, ${y * 5 - 2}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---- appointment form ---- */
  const form = document.getElementById('apptForm');
  if (form) {
    form.addEventListener('submit', (e) => {
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
