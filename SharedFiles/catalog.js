(() => {
  'use strict';

  const scriptBase = new URL('.', document.currentScript.src);
  const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().replace(/\s+/g, ' ').toLowerCase();
  const freeze = value => {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      Object.values(value).forEach(freeze);
      Object.freeze(value);
    }
    return value;
  };
  function createCatalog(options = {}) {
    const base = new URL(options.baseUrl || scriptBase);
    const requests = new Map();
    const images = new Map();
    let currentManifest = null;
    const localUrl = relative => {
      const url = new URL(relative, base);
      if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) throw new Error('Catalog path is outside SharedFiles.');
      return url.href;
    };
    const assetUrl = value => {
      if (!value) return null;
      const url = new URL(value, base);
      if (!['https:', 'http:', 'file:'].includes(url.protocol)) throw new Error('Unsupported image URL.');
      return url.href;
    };
    async function read(file) {
      const url = localUrl(file);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(url, {
          cache: 'no-store',
          signal: controller.signal
        });
        if (!response.ok) throw new Error('Catalog returned HTTP ' + response.status + ': ' + file);
        const text = await response.text();
        const decoded = options.decode ? await options.decode(text, {
          url,
          file
        }) : JSON.parse(text.replace(/^\uFEFF/, ''));
        return typeof decoded === 'string' ? JSON.parse(decoded.replace(/^\uFEFF/, '')) : decoded;
      } finally {
        clearTimeout(timer);
      }
    }
    function rememberImages(value) {
      if (!value || typeof value !== 'object') return;
      if (Object.hasOwn(value, 'image') && value.image) {
        const record = value.image;
        if (record.url !== null && typeof record.url !== 'string') throw new Error('Invalid image definition.');
        if (!Array.isArray(record.alternatives) || record.alternatives.some(url => typeof url !== 'string')) throw new Error('Invalid image alternatives.');
        if (record.local != null && (!/\.webp$/i.test(record.local) || /^\w+:|^\/\//.test(record.local))) throw new Error('Local image fallback must be a relative WebP file.');
        if (record.local) localUrl(record.local);
        const candidates = [record.url, record.local, ...(record.alternatives || [])].filter(Boolean).map(assetUrl);
        for (const candidate of candidates) images.set(candidate, candidates);
      }
      Object.values(value).forEach(item => {
        if (Array.isArray(item)) item.forEach(rememberImages);else if (item && typeof item === 'object') rememberImages(item);
      });
    }
    function validate(data, key) {
      if (!data || typeof data !== 'object' || data.schemaVersion !== 1) throw new Error('Unsupported catalog schema: ' + key);
      if (Object.hasOwn(data, 'entries')) {
        if (!Array.isArray(data.entries)) throw new Error('Invalid catalog entries: ' + key);
        const ids = new Set();
        for (const entry of data.entries) {
          if (!entry || typeof entry.id !== 'string' || !entry.id || ids.has(entry.id) || typeof entry.name !== 'string' || !entry.name) throw new Error('Invalid or duplicate record in ' + key);
          if (entry.aliases && (!Array.isArray(entry.aliases) || entry.aliases.some(alias => typeof alias !== 'string'))) throw new Error('Invalid aliases in ' + key);
          if (['killers', 'survivors', 'killerPerks', 'survivorPerks', 'items', 'itemAddons', 'offerings', 'perkIcons'].includes(key) && (!entry.image || typeof entry.image !== 'object')) throw new Error('Missing image definition for ' + key + ': ' + entry.id);
          if (['killers', 'killerPerks'].includes(key) && entry.role !== 'killer') throw new Error('Invalid killer role: ' + entry.id);
          if (['survivors', 'survivorPerks'].includes(key) && entry.role !== 'survivor') throw new Error('Invalid survivor role: ' + entry.id);
          if (['killerPerks', 'survivorPerks'].includes(key) && (!Array.isArray(entry.categories) || entry.categories.some(category => typeof category !== 'string'))) throw new Error('Invalid perk categories: ' + entry.id);
          ids.add(entry.id);
        }
      }
      rememberImages(data);
      return freeze(data);
    }
    function manifest() {
      if (!requests.has('manifest')) {
        const request = read('manifest.json').then(data => {
          validate(data, 'manifest');
          if (!data.files || typeof data.files !== 'object' || typeof data.catalogVersion !== 'string') throw new Error('Invalid catalog manifest.');
          currentManifest = data;
          return data;
        }).catch(error => {
          requests.delete('manifest');
          throw error;
        });
        requests.set('manifest', request);
      }
      return requests.get('manifest');
    }
    function load(key) {
      if (!requests.has(key)) {
        const request = manifest().then(data => {
          if (!Object.hasOwn(data.files, key)) throw new Error('Unknown catalog collection: ' + key);
          return read(data.files[key]);
        }).then(data => validate(data, key)).catch(error => {
          requests.delete(key);
          throw error;
        });
        requests.set(key, request);
      }
      return requests.get(key);
    }
    async function loadMany(keys) {
      const values = await Promise.all(keys.map(load));
      return freeze(Object.fromEntries(keys.map((key, i) => [key, values[i]])));
    }
    async function characters() {
      const data = await loadMany(['killers', 'survivors']);
      return freeze([...data.killers.entries, ...data.survivors.entries]);
    }
    async function portraitMap() {
      const result = {};
      for (const character of await characters()) {
        for (const name of [character.name, ...(character.aliases || [])]) result[name] = assetUrl(character.image.url) || fallback();
      }
      return freeze(result);
    }
    function fallback() {
      return localUrl(currentManifest?.imagePolicy?.fallback || 'images/fallback.svg');
    }
    function imageCandidates(value) {
      const src = typeof value === 'string' ? assetUrl(value) : value?.url ? assetUrl(value.url) : null;
      const candidates = typeof value === 'object' && value ? [value.url, value.local, ...(value.alternatives || [])].filter(Boolean).map(assetUrl) : images.get(src) || [src].filter(Boolean);
      const wikiAlternatives = candidates.flatMap(candidate => {
        const url = new URL(candidate);
        return url.hostname === 'deadbydaylight.wiki.gg' && url.pathname.startsWith('/images/') ? ['https://deadbydaylight.wiki.gg/wiki/Special:FilePath/' + encodeURIComponent(decodeURIComponent(url.pathname.split('/').pop()))] : [];
      });
      return [...new Set([...candidates, ...wikiAlternatives, fallback()])];
    }
    return Object.freeze({
      manifest,
      load,
      loadMany,
      characters,
      portraitMap,
      assetUrl,
      normalize,
      imageCandidates,
      fallback,
      withDecoder: decode => createCatalog({
        baseUrl: base.href,
        decode
      })
    });
  }
  const catalog = createCatalog();
  Object.defineProperty(window, 'SharedCatalog', {
    value: catalog,
    writable: false,
    configurable: false
  });
  const failed = new WeakMap();
  document.addEventListener('error', event => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement)) return;
    event.stopImmediatePropagation();
    image.onerror = null;
    image.removeAttribute('onerror');
    const attempts = failed.get(image) || new Set();
    attempts.add(image.currentSrc || image.src);
    failed.set(image, attempts);
    const next = catalog.imageCandidates(image.src).find(url => !attempts.has(url));
    if (!next) {
      image.hidden = true;
      return;
    }
    image.hidden = false;
    image.srcset = '';
    image.src = next;
  }, true);
})();
