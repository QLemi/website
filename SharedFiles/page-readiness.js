window.pageReadinessClosed = new Promise(resolve => {
  window.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('page-readiness');
    if (!dialog || typeof dialog.showModal !== 'function') {
      resolve();
      return;
    }
    dialog.addEventListener('close', resolve, { once: true });
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.showModal();
  }, { once: true });
});
