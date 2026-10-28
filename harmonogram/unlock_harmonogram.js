(() => {
  'use strict';

  try {
    localStorage.removeItem('harmonogram-last-verified-v1');
  } catch {}
  const STORAGE_KEY = 'harmonogram-remember-key-v1';
  const EXPIRY_KEY = 'harmonogram-remember-expiry-v1';
  const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const form = document.getElementById('unlock-form');
  const passwordInput = document.getElementById('password');
  const rememberInput = document.getElementById('remember-me');
  const errorMessage = document.getElementById('login-error');
  const statusMessage = document.getElementById('login-status');
  const unlockButton = document.getElementById('unlock-button');
  function clearRememberedLogin() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EXPIRY_KEY);
    } catch (_) {}
  }
  function bytesFromBase64(value) {
    return Uint8Array.from(atob(value), character => character.charCodeAt(0));
  }
  function base64FromBytes(bytes) {
    return btoa(String.fromCharCode(...new Uint8Array(bytes)));
  }
  async function deriveKey(password, salt) {
    const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
    return crypto.subtle.deriveBits({
      name: 'PBKDF2',
      salt,
      iterations: HARMONOGRAM_ENCRYPTED_PAGE.iterations,
      hash: 'SHA-256'
    }, material, 256);
  }
  async function decryptPage(rawKey) {
    const encrypted = window.HARMONOGRAM_ENCRYPTED_PAGE;
    const key = await crypto.subtle.importKey('raw', rawKey, {
      name: 'AES-GCM'
    }, false, ['decrypt']);
    const plaintext = await crypto.subtle.decrypt({
      name: 'AES-GCM',
      iv: bytesFromBase64(encrypted.iv)
    }, key, bytesFromBase64(encrypted.ciphertext));
    return new TextDecoder().decode(plaintext);
  }
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
    passwordInput.setAttribute('aria-invalid', 'true');
  }
  function clearError() {
    errorMessage.hidden = true;
    passwordInput.removeAttribute('aria-invalid');
  }
  function prepareUnlockedPage(html) {
    const page = new DOMParser().parseFromString(html, 'text/html');
    page.querySelectorAll('input[type="file"], [data-import], [data-restore]').forEach(element => element.remove());
    page.querySelectorAll('[onclick], [data-command]').forEach(element => {
      const command = element.getAttribute('data-command') || '';
      const handler = element.getAttribute('onclick') || '';
      if (/^(?:\/import|\/restore|\/odtworz)$/.test(command) || /(?:importVerifiedBackup|restoreVerifiedBackup)\s*\(/.test(handler)) element.remove();
    });
    page.querySelectorAll('script[src], link[rel="stylesheet"][href]').forEach(element => {
      const attribute = element.tagName === 'SCRIPT' ? 'src' : 'href';
      const value = element.getAttribute(attribute);
      if (/^(?:\.\/)?(?:script_harmonogram\.js|config_harmonogram\.js|style_harmonogram\.css)(?:[?#]|$)/.test(value)) {
        const url = new URL(value, location.href);
        url.searchParams.set('v', 'repo-update-1');
        element.setAttribute(attribute, url.pathname + url.search + url.hash);
      }
    });
    return '<!doctype html>' + page.documentElement.outerHTML;
  }
  function openPage(html) {
    const updated = prepareUnlockedPage(html);
    document.open();
    document.write(updated);
    document.close();
  }
  async function unlockWithPassword(password, remember) {
    const encrypted = window.HARMONOGRAM_ENCRYPTED_PAGE;
    if (!encrypted || !crypto.subtle) throw new Error('Do odblokowania potrzebne jest bezpieczne połączenie HTTPS.');
    const rawKey = await deriveKey(password, bytesFromBase64(encrypted.salt));
    const html = await decryptPage(rawKey);
    if (remember) {
      try {
        localStorage.setItem(STORAGE_KEY, base64FromBytes(rawKey));
        localStorage.setItem(EXPIRY_KEY, String(Date.now() + WEEK_MS));
      } catch (_) {
        clearRememberedLogin();
      }
    } else {
      clearRememberedLogin();
    }
    openPage(html);
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    clearError();
    unlockButton.disabled = true;
    unlockButton.textContent = 'Otwieranie…';
    statusMessage.textContent = 'Sprawdzam hasło…';
    statusMessage.hidden = false;
    try {
      await unlockWithPassword(passwordInput.value, rememberInput.checked);
    } catch (error) {
      unlockButton.disabled = false;
      unlockButton.textContent = 'Otwórz harmonogram';
      statusMessage.hidden = true;
      showError(error?.name === 'OperationError' || error?.name === 'DataError' ? 'Nie udało się odszyfrować strony. Sprawdź hasło i spróbuj ponownie.' : error.message || 'Nie udało się otworzyć strony.');
      passwordInput.focus();
      passwordInput.select();
    }
  });
  passwordInput.addEventListener('input', clearError);
  document.getElementById('show-password').addEventListener('click', event => {
    const visible = passwordInput.type === 'password';
    passwordInput.type = visible ? 'text' : 'password';
    event.currentTarget.setAttribute('aria-label', visible ? 'Ukryj hasło' : 'Pokaż hasło');
    event.currentTarget.title = visible ? 'Ukryj hasło' : 'Pokaż hasło';
  });
  async function restoreRememberedLogin() {
    let rememberedKey = '';
    let expiresAt = 0;
    try {
      rememberedKey = localStorage.getItem(STORAGE_KEY) || '';
      expiresAt = Number(localStorage.getItem(EXPIRY_KEY)) || 0;
    } catch (_) {}
    if (!rememberedKey || expiresAt <= Date.now()) {
      clearRememberedLogin();
      return;
    }
    if (!crypto.subtle || !window.HARMONOGRAM_ENCRYPTED_PAGE) return;
    unlockButton.disabled = true;
    unlockButton.textContent = 'Otwieranie…';
    passwordInput.disabled = true;
    rememberInput.disabled = true;
    statusMessage.textContent = 'Otwieram zapamiętany harmonogram…';
    statusMessage.hidden = false;
    try {
      openPage(await decryptPage(bytesFromBase64(rememberedKey)));
    } catch (_) {
      clearRememberedLogin();
      unlockButton.disabled = false;
      unlockButton.textContent = 'Otwórz harmonogram';
      passwordInput.disabled = false;
      rememberInput.disabled = false;
      statusMessage.hidden = true;
      showError('Zapamiętany dostęp wygasł lub jest nieprawidłowy. Wpisz hasło ponownie.');
    }
  }
  restoreRememberedLogin();
})();
