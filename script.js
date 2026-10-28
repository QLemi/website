(() => {
  'use strict';

  const showScriptError = () => {
    const status = document.getElementById('script-status');
    if (status) status.hidden = false;
  };
  window.addEventListener('error', event => {
    if (event instanceof ErrorEvent) showScriptError();
  });
  window.addEventListener('unhandledrejection', showScriptError);
  document.addEventListener('error', event => {
    if (event.target instanceof HTMLImageElement) event.target.hidden = true;
  }, true);
  const menu = document.querySelector('.more-pages');
  const toggle = menu?.querySelector('summary');
  if (menu && toggle) {
    document.addEventListener('click', event => {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.open) {
        event.preventDefault();
        menu.open = false;
        toggle.focus({
          preventScroll: true
        });
      }
    });
    menu.addEventListener('focusout', event => {
      if (event.relatedTarget && !menu.contains(event.relatedTarget)) menu.open = false;
    });
  }
})();
