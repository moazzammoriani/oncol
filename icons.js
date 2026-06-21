/* Oncology Solutions — line icon set. Consistent 1.6 stroke, round caps. */
(function () {
  const S = (p) => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const I = {
    report:    S('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M8 13h8M8 17h5"/>'),
    options:   S('<path d="M4 7h10M4 12h16M4 17h7"/><circle cx="18" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>'),
    scan:      S('<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3.2"/>'),
    questions: S('<path d="M9.2 9a2.8 2.8 0 1 1 3.4 2.8c-.9.3-1.6 1-1.6 2v.4"/><path d="M11 17.5h.01"/><circle cx="12" cy="12" r="9"/>'),
    compass:   S('<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>'),
    heart:     S('<path d="M12 20s-7-4.6-7-9.4A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 7-2.4C19 11 12 20 12 20Z"/>'),
    check:     S('<path d="M20 6 9 17l-5-5"/>'),
    upload:    S('<path d="M12 16V5M8 9l4-4 4 4"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>'),
    review:    S('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/><path d="M11 8v3l2 2"/>'),
    expert:    S('<path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M5 20a7 7 0 0 1 14 0"/><path d="m18 4 1 2 2 .5-1.5 1.5.3 2L18 11l-1.8 1 .3-2L15 8.5 17 8z"/>'),
    report2:   S('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="m9 14 2 2 4-4"/>'),
    clock:     S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>'),
    lock:      S('<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><path d="M12 14.5v2.5"/>'),
    badge:     S('<path d="M12 3 4.5 6.2V11c0 4.6 3.2 8 7.5 9 4.3-1 7.5-4.4 7.5-9V6.2z"/><path d="m9 12 2 2 4-4"/>'),
    team:      S('<circle cx="9" cy="9" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 6.2a3 3 0 0 1 0 5.6"/><path d="M17.5 14.3A5.5 5.5 0 0 1 20.5 19"/>'),
    phone:     S('<path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 4.5 4.5L15 16l4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 6.6 1.5 1.5 0 0 1 5 5z"/>'),
    mail:      S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>'),
    facebook:  S('<path d="M14 9V7.2c0-.9.4-1.2 1.3-1.2H17V3h-2.6C11.9 3 11 4.4 11 6.6V9H9v3h2v9h3v-9h2.2l.5-3z"/>'),
    instagram: S('<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="3.8"/><circle cx="16.8" cy="7.2" r=".9" fill="currentColor" stroke="none"/>'),
    linkedin:  S('<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 17v-7"/>'),
    scale:     S('<path d="M12 3v18M7 21h10M5 7h14M5 7 3 13a3 3 0 0 0 6 0L7 7M19 7l-2 6a3 3 0 0 0 6 0l-2-6M8 7l4-2 4 2"/>'),
    brain:     S('<path d="M12 5a2.5 2.5 0 0 0-5 .3A2.5 2.5 0 0 0 5 9.5a2.5 2.5 0 0 0 1 4.2A2.5 2.5 0 0 0 9 18a2.5 2.5 0 0 0 3 .5M12 5a2.5 2.5 0 0 1 5 .3 2.5 2.5 0 0 1 2 4.2 2.5 2.5 0 0 1-1 4.2A2.5 2.5 0 0 1 15 18a2.5 2.5 0 0 1-3 .5M12 5v13.5"/>'),
    globe:     S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    steth:     S('<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M6 3H4M14 3h2M10 16v1a4 4 0 0 0 8 0v-2"/><circle cx="18" cy="11" r="2"/>'),
    building:  S('<path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M15 9h2a2 2 0 0 1 2 2v10M9 7h2M9 11h2M9 15h2"/>'),
    file:      S('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>'),
    shield:    S('<path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/>'),
    plus:      S('<path d="M12 5v14M5 12h14"/>'),
    pin:       S('<path d="M12 21s-6-5-6-10a6 6 0 0 1 12 0c0 5-6 10-6 10Z"/><circle cx="12" cy="11" r="2.2"/>'),
    arrow:     S('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    users:     S('<circle cx="9" cy="9" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 6.2a3 3 0 0 1 0 5.6"/><path d="M17.5 14.3A5.5 5.5 0 0 1 20.5 19"/>'),
  };
  document.querySelectorAll('[v-icon]').forEach((el) => {
    const k = el.getAttribute('v-icon');
    if (I[k]) el.innerHTML = I[k];
  });
  window.__paintIcons = (root) => {
    (root || document).querySelectorAll('[v-icon]').forEach((el) => {
      const k = el.getAttribute('v-icon');
      if (I[k] && !el.firstChild) el.innerHTML = I[k];
    });
  };
})();
