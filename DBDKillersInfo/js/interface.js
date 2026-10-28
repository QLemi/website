const dialogOrigins = new WeakMap();
let originalBodyOverflow = '';
function showManagedDialog(dialog, onClose, preferredFocus) {
  if (!dialog.open) {
    if (!document.querySelector('dialog[open]')) {
      originalBodyOverflow = document.body.style.overflow;
    }
    dialogOrigins.set(dialog, document.activeElement);
    dialog.addEventListener('close', () => {
      onClose?.();
      if (!document.querySelector('dialog[open]')) {
        document.body.style.overflow = originalBodyOverflow;
      }
      const origin = dialogOrigins.get(dialog);
      if (origin?.isConnected) origin.focus({
        preventScroll: true
      });
    }, {
      once: true
    });
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  const heading = dialog.querySelector('h2, h3');
  if (heading) {
    heading.id ||= dialog.id + '-title';
    dialog.setAttribute('aria-labelledby', heading.id);
  } else if (!dialog.hasAttribute('aria-label')) {
    dialog.setAttribute('aria-label', 'Confirm action');
  }
  const focusTarget = preferredFocus || dialog.querySelector('input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled])') || dialog.querySelector('button:not([disabled])');
  focusTarget?.focus({
    preventScroll: true
  });
}
function closeSurvivorDialog() {
  document.getElementById('surv-modal')?.close();
}
const missingImageUrl = new URL('../assets/image-unavailable.svg', document.currentScript.src).href;
function handleImageError(event) {
  const image = event.target;
  if (!(image instanceof HTMLImageElement)) return;
  image.onerror = null;
  image.removeAttribute('onerror');
  if (image.src === missingImageUrl) {
    image.hidden = true;
    return;
  }
  image.srcset = '';
  image.src = missingImageUrl;
  image.classList.add('image-unavailable');
}
document.addEventListener('error', handleImageError, true);
document.addEventListener('DOMContentLoaded', () => {
  const labelFields = root => {
    for (const field of root.querySelectorAll('input, select, textarea')) {
      if (field.type === 'hidden' || field.labels?.length || field.hasAttribute('aria-label') || field.hasAttribute('aria-labelledby')) continue;
      const group = field.closest('.form-group, .form-row, .settings-box');
      const label = group?.querySelector('label');
      if (label && !label.htmlFor && !label.querySelector('input, select, textarea') && field.id && group.querySelector('input, select, textarea') === field) {
        label.htmlFor = field.id;
      } else {
        const fieldNames = {
          'ed-build-sort': 'Sort killer builds',
          'ed-killer-sort': 'Sort killers',
          'filter-difficulty': 'Filter by difficulty',
          'filter-fun': 'Filter by fun to play',
          'filter-skill': 'Filter by skill',
          'sort-by': 'Sort killers',
          'build-sort': 'Sort builds',
          'build-killer-filter': 'Filter builds by killer',
          'build-patch-op': 'Patch comparison',
          'build-patch-value': 'Filter builds by patch',
          'sbuild-sort': 'Sort survivor builds',
          'sbuild-patch-op': 'Survivor patch comparison',
          'sbuild-patch-value': 'Filter survivor builds by patch',
          'b-patch': 'Patch or update',
          'b-patch-pick': 'Choose an existing patch',
          'sb-patch': 'Patch or update',
          'sb-patch-pick': 'Choose an existing patch'
        };
        const name = fieldNames[field.id] || field.placeholder || field.title || label?.textContent.trim();
        if (name) field.setAttribute('aria-label', name);
      }
    }
    for (const button of root.querySelectorAll('.chip-x')) {
      button.setAttribute('aria-label', 'Remove ' + (button.parentElement.textContent.replace('×', '').trim() || 'selection'));
    }
  };
  labelFields(document);
  const observer = new MutationObserver(records => {
    if (records.some(record => [...record.addedNodes].some(node => node instanceof HTMLElement))) labelFields(document);
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
