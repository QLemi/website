(() => {
  'use strict';
  document.querySelectorAll('.dbd-site-nav').forEach(nav => {
    const menu = nav.querySelector('.dbd-site-menu');
    const summary = menu?.querySelector('summary');
    if (!menu || !summary) return;
    nav.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || !menu.open || !menu.contains(event.target)) return;
      menu.open = false;
      summary.focus();
      event.preventDefault();
      event.stopPropagation();
    });
    document.addEventListener('click', event => {
      if (menu.open && !nav.contains(event.target)) menu.open = false;
    });
    menu.addEventListener('click', event => {
      if (event.target.closest('a[href]')) menu.open = false;
    });
    menu.addEventListener('focusout', () => {
      requestAnimationFrame(() => {
        if (menu.open && !nav.contains(document.activeElement)) menu.open = false;
      });
    });
    const desktop = matchMedia('(min-width: 1100px)');
    desktop.addEventListener('change', event => {
      if (!event.matches) return;
      const hadFocus = menu.contains(document.activeElement);
      menu.open = false;
      if (hadFocus) nav.querySelector('.dbd-site-home')?.focus();
    });
  });
})();
