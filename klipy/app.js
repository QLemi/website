(() => {
  'use strict';
  const sheet = '13OEe_4RbR5KZa8M22PD0oHj_HMQrHiAkXEiB6ntqHe0';
  const sources = { twitch: { gid: '0', label: 'Twitch' }, youtube: { gid: '629759906', label: 'YouTube' } };
  const $ = id => document.getElementById(id);
  const elements = { list: $('list'), state: $('list-state'), status: $('status'), search: $('search'), game: $('game'), channel: $('channel'), author: $('author'), sort: $('sort'), count: $('result-count'), player: $('player'), empty: $('player-empty'), title: $('now-title'), meta: $('now-meta'), original: $('open-original'), previous: $('previous'), next: $('next'), random: $('random'), position: $('position') };
  const data = { twitch: [], youtube: [] };
  const failures = {};
  let channelNames = {};
  const usingBackup = {};
  let activeSource = 'twitch';
  let visible = [];
  let current = null;
  const shareParams = new URLSearchParams(location.search);
  const sharedSource = shareParams.get('source');
  const sharedId = shareParams.get('clip');
  const sharedStart = shareParams.get('start');
  let pendingSharedClip = (sharedSource === 'twitch' || sharedSource === 'youtube') && /^[\w-]+$/.test(sharedId || '') ? { source: sharedSource, id: sharedId, start: sharedStart && /^\d+$/.test(sharedStart) ? Number(sharedStart) : 0 } : null;
  const expandedDescriptions = new Set();
  let request = 0;
  let controller;
  function parseLink(raw, source) {
    let url; try { url = new URL(raw); } catch { return null; }
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    if (!['https:', 'http:'].includes(url.protocol)) return null;
    if (source === 'twitch') {
      let id = '', channel = '';
      if (host === 'clips.twitch.tv') id = url.pathname.split('/').filter(Boolean)[0] || '';
      else if (host === 'twitch.tv') { const match = url.pathname.match(/^\/([^/]+)\/clip\/([^/]+)/i); if (match) { channel = match[1]; id = match[2]; } }
      if (!/^[\w-]+$/.test(id)) return null;
      return { id, channel };
    }
    let id = '';
    if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0] || '';
    else if (host === 'youtube.com' || host === 'm.youtube.com') id = url.searchParams.get('v') || url.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1] || '';
    if (!/^[\w-]{11}$/.test(id)) return null;
    const time = url.searchParams.get('t') || url.searchParams.get('start') || '';
    let start = 0;
    if (/^\d+s?$/.test(time)) start = parseInt(time, 10);
    else { const m = time.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/); if (m) start = Number(m[1] || 0) * 3600 + Number(m[2] || 0) * 60 + Number(m[3] || 0); }
    return { id, start, channel: '' };
  }
  function normalized(value) { return String(value || '').trim().toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l'); }
  function displayTitle(value) { return value.replace(/(^|\s)([^\p{L}\p{N}]*)(\p{L})/gu, (_, space, prefix, letter) => space + prefix + letter.toLocaleUpperCase()); }
  function parseRows(rows, source) {
    if (!rows.length) throw new Error('The spreadsheet is empty.');
    const headers = rows[0].map(normalized);
    const index = name => headers.findIndex(v => name.some(x => v === x));
    const columns = { url: index(['link']), author: index(['autor']), game: index(['kategoria/gra','kategoria', 'gra']), title: index(['tytul klipa','tytul klipu','tytul']), replacementTitle: index(['zastapiony tytul']), description: index(['opis']), channel: index(['kanal', 'channel']) };
    if (columns.url < 0 || columns.title < 0 || columns.game < 0 || (source === 'twitch' && columns.author < 0)) throw new Error('Required spreadsheet columns are missing.');
    let skipped = 0;
    const result = [];
    rows.slice(1).forEach((r, i) => {
      if (!r.some(v => String(v).trim())) return;
      const link = (r[columns.url] || '').trim(); const info = parseLink(link, source);
      if (!info) { skipped++; return; }
      const originalTitle = (r[columns.title] || '').trim();
      const replacementTitle = columns.replacementTitle < 0 ? '' : (r[columns.replacementTitle] || '').trim();
      const title = displayTitle(replacementTitle || originalTitle || 'Untitled');
      const channel = (columns.channel >= 0 ? (r[columns.channel] || '').trim() : '') || channelNames[source + ':' + info.id] || info.channel;
      result.push({ ...info, channel, link, title, originalTitle, game: (r[columns.game] || '').trim(), author: columns.author < 0 ? '' : (r[columns.author] || '').trim(), description: columns.description < 0 ? '' : (r[columns.description] || '').trim(), source, order: i, key: source + ':' + info.id });
    });
    return { result, skipped };
  }
  function fetchSource(source, signal) {
    return new Promise((resolve, reject) => {
      const name = 'lemiClipsSheet' + source + Date.now() + Math.floor(Math.random() * 100000);
      const script = document.createElement('script');
      const timeout = setTimeout(() => finish(new Error('The spreadsheet request timed out.')), 15000);
      let completed = false;
      function finish(error, value) {
        if (completed) return;
        completed = true;
        clearTimeout(timeout);
        signal.removeEventListener('abort', abort);
        script.remove();
        delete window[name];
        if (error) reject(error); else resolve(value);
      }
      function abort() { finish(new DOMException('Loading was interrupted.', 'AbortError')); }
      window[name] = response => {
        try {
          if (response.status !== 'ok' || !response.table) throw new Error('Could not read the spreadsheet.');
          const table = response.table;
          const rows = [table.cols.map(c => c.label || '')];
          for (const row of table.rows || []) rows.push((row.c || []).map(cell => cell == null ? '' : String(cell.f ?? cell.v ?? '')));
          finish(null, parseRows(rows, source));
        } catch (error) { finish(error); }
      };
      script.onerror = () => finish(new Error('Could not connect to the spreadsheet.'));
      signal.addEventListener('abort', abort, { once: true });
      if (signal.aborted) { abort(); return; }
      const params = new URLSearchParams({ gid: sources[source].gid, headers: '1', tqx: 'responseHandler:' + name });
      script.src = `https://docs.google.com/spreadsheets/d/${sheet}/gviz/tq?${params}`;
      document.head.append(script);
    });
  }
  function status() {
    const lines = Object.keys(sources).filter(s => failures[s]).map(s => sources[s].label + ': ' + failures[s]);
    elements.status.textContent = lines.join(' ');
  }
  function gameOptions() {
    const previous = elements.game.value;
    const games = [...new Set(data[activeSource].map(x => x.game).filter(Boolean))].sort((a,b) => a.localeCompare(b, 'pl'));
    elements.game.replaceChildren(new Option('All games', ''), ...games.map(g => new Option(g, g)));
    if (games.includes(previous)) elements.game.value = previous;
  }
  function channelOptions() {
    const previous = elements.channel.value;
    const known = new Map();
    for (const item of data[activeSource]) {
      const key = normalized(item.channel);
      if (key && !known.has(key)) known.set(key, item.channel);
    }
    const options = [...known.entries()].sort((a, b) => a[1].localeCompare(b[1], 'pl'));
    elements.channel.replaceChildren(new Option('All channels', ''), ...options.map(([key, label]) => new Option(label, key)));
    if (data[activeSource].some(item => !item.channel)) elements.channel.add(new Option('Unknown channel', '__unknown__'));
    if ([...elements.channel.options].some(option => option.value === previous)) elements.channel.value = previous;
  }
  function render() {
    const query = normalized(elements.search.value);
    const game = elements.game.value, author = elements.author.value, channel = elements.channel.value;
    visible = data[activeSource].filter(item => (!game || item.game === game) && (!channel || (channel === '__unknown__' ? !item.channel : normalized(item.channel) === channel)) && (!author || activeSource !== 'twitch' || normalized(item.author) === normalized(author)) && (!query || normalized([item.title,item.originalTitle,item.channel,item.game,item.author,item.description].join(' ')).includes(query)));
    if (elements.sort.value === 'newest') visible.reverse();
    else if (elements.sort.value === 'title') visible.sort((a,b) => a.title.localeCompare(b.title, 'pl', { sensitivity: 'base' }));
    const n = visible.length;
    elements.count.textContent = n + (n === 1 ? ' clip' : ' clips');
    elements.list.replaceChildren();
    const fragment = document.createDocumentFragment();
    visible.forEach(item => {
      const row = document.createElement('div'); row.className = 'clip-row';
      const button = document.createElement('button'); button.type = 'button'; button.className = 'clip-play';
      const selected = current?.key === item.key; row.classList.toggle('selected', selected); if (selected) button.setAttribute('aria-current', 'true');
      const icon = document.createElement('span'); icon.className = 'clip-icon'; icon.setAttribute('aria-hidden', 'true'); icon.textContent = '▷';
      const info = document.createElement('span'); info.className = 'clip-info';
      const title = document.createElement('strong'); title.textContent = item.title;
      const tags = document.createElement('span'); tags.className = 'clip-tags';
      const tagValues = [['channel', 'Channel: ' + (item.channel || 'unknown')], ['game', 'Game: ' + (item.game || 'no category')]];
      if (item.author) tagValues.push(['author', 'Creator: ' + item.author]);
      tagValues.forEach(([kind, value]) => { const tag = document.createElement('span'); tag.className = 'clip-tag clip-tag-' + kind; tag.textContent = value; tags.append(tag); });
      info.append(title);
      let toggle;
      if (item.description) {
        const description = document.createElement('span'); description.className = 'clip-description';
        const preview = item.description.split(/\r?\n/).slice(0, 2).join('\n').slice(0, 100).trimEnd();
        const shortened = preview.length < item.description.length;
        const updateDescription = () => { const expanded = expandedDescriptions.has(item.key); description.textContent = shortened && !expanded ? preview + '…' : item.description; if (toggle) { toggle.textContent = expanded ? 'Show less' : 'Show more'; toggle.setAttribute('aria-expanded', String(expanded)); } };
        if (shortened) { toggle = document.createElement('button'); toggle.type = 'button'; toggle.className = 'clip-description-toggle'; toggle.setAttribute('aria-label', 'Toggle description for ' + item.title); toggle.addEventListener('click', () => { if (expandedDescriptions.has(item.key)) expandedDescriptions.delete(item.key); else expandedDescriptions.add(item.key); updateDescription(); }); }
        updateDescription(); info.append(description);
      }
      info.append(tags);
      const arrow = document.createElement('span'); arrow.className = 'clip-chevron'; arrow.setAttribute('aria-hidden', 'true'); arrow.textContent = '›';
      button.append(icon, info, arrow); button.addEventListener('click', () => play(item)); row.append(button); if (toggle) row.append(toggle); fragment.append(row);
    });
    elements.list.append(fragment);
    elements.state.hidden = visible.length > 0;
    elements.state.textContent = failures[activeSource] && !data[activeSource].length ? 'Could not load the data. Try refreshing.' : data[activeSource].length ? 'No results. Try changing the search or filters.' : 'No clips in this tab.';
    elements.random.disabled = !visible.length;
    updateControls();
  }
  function updateControls() {
    const i = visible.findIndex(item => item.key === current?.key);
    elements.previous.disabled = i <= 0; elements.next.disabled = i < 0 || i >= visible.length - 1;
    elements.position.textContent = i < 0 ? '—' : `${i + 1} / ${visible.length}`;
  }
  function updateNowPlaying(item) {
    elements.title.textContent = item.title;
    const tags = [['platform', 'Platform: ' + sources[item.source].label], ['channel', 'Channel: ' + (item.channel || 'unknown')], ['game', 'Game: ' + (item.game || 'no category')]];
    if (item.author) tags.push(['author', 'Creator: ' + item.author]);
    elements.meta.className = 'now-tags';
    elements.meta.replaceChildren(...tags.map(([kind, value]) => { const tag = document.createElement('span'); tag.className = 'clip-tag clip-tag-' + kind; tag.textContent = value; return tag; }));
    elements.original.href = item.link; elements.original.hidden = false;
    const frame = elements.player.querySelector('iframe'); if (frame) frame.title = 'Player: ' + item.title;
  }
  function play(item, autoplayShared = false) {
    pendingSharedClip = null;
    $('share-status').textContent = ''; $('share-url').hidden = true; $('copy-link').disabled = false;
    current = item;
    const frame = document.createElement('iframe');
    const loading = document.createElement('div'); loading.className = 'player-loading'; loading.setAttribute('role', 'status');
    const spinner = document.createElement('span'); spinner.className = 'player-loading-spinner'; spinner.setAttribute('aria-hidden', 'true');
    const message = document.createElement('span'); message.textContent = 'Loading player…'; loading.append(spinner, message);
    const hideLoading = () => { clearTimeout(loadingTimeout); loading.remove(); };
    const loadingTimeout = setTimeout(hideLoading, 15000);
    frame.addEventListener('load', hideLoading, { once: true });
    frame.title = 'Player: ' + item.title; frame.allow = 'autoplay; fullscreen; picture-in-picture'; frame.allowFullscreen = true; frame.referrerPolicy = 'strict-origin-when-cross-origin';
    if (item.source === 'twitch') {
      const query = new URLSearchParams({ clip: item.id, parent: location.hostname || 'localhost', autoplay: autoplayShared || $('autoplay').checked ? 'true' : 'false' });
      frame.src = 'https://clips.twitch.tv/embed?' + query;
    } else {
      const query = new URLSearchParams({ rel: '0', autoplay: autoplayShared || $('autoplay').checked ? '1' : '0' }); if (item.start) query.set('start', String(item.start));
      frame.src = `https://www.youtube-nocookie.com/embed/${item.id}?${query}`;
    }
    elements.player.dataset.source = item.source; elements.player.replaceChildren(frame, loading); elements.player.hidden = false; elements.empty.hidden = true;
    updateNowPlaying(item);
    render();
    if (matchMedia('(max-width: 1000px)').matches) document.querySelector('.player-shell').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function switchSource(source) {
    if (source === activeSource) return;
    activeSource = source; document.querySelector('.workspace').dataset.source = source; elements.game.value = ''; elements.channel.value = ''; elements.author.value = '';
    document.querySelectorAll('.source-tab').forEach(button => { const selected = button.dataset.source === source; button.classList.toggle('active', selected); button.setAttribute('aria-pressed', String(selected)); });
    $('author-wrap').hidden = source !== 'twitch'; gameOptions(); channelOptions(); render();
  }
  async function load() {
    const run = ++request; controller?.abort(); controller = new AbortController();
    $('refresh').disabled = true; elements.status.textContent = 'Loading clips…';
    const [results, channelResult] = await Promise.all([
      Promise.allSettled(Object.keys(sources).map(s => fetchSource(s, controller.signal))),
      fetch('kanaly.json', { signal: controller.signal }).then(response => response.ok ? response.json() : {}).catch(() => ({}))
    ]);
    channelNames = channelResult;
    if (run !== request) return;
    let backup = null;
    if (results.some((result, i) => result.status === 'rejected' && !data[Object.keys(sources)[i]].length)) {
      try { const response = await fetch('materialy-zapasowe.json', { signal: controller.signal }); if (response.ok) backup = await response.json(); } catch {}
    }
    if (run !== request) return;
    Object.keys(sources).forEach((source, i) => {
      const result = results[i];
      if (result.status === 'fulfilled') { data[source] = result.value.result.map(item => ({ ...item, channel: item.channel || channelNames[item.key] || '' })); usingBackup[source] = false; failures[source] = result.value.skipped ? `Skipped ${result.value.skipped} invalid links.` : ''; }
      else if (!data[source].length && backup?.[source]) {
        try { data[source] = parseRows(backup[source], source).result; usingBackup[source] = true; } catch {}
        failures[source] = data[source].length ? 'Could not connect to the spreadsheet. Showing a backup list that may be out of date.' : 'Could not load the data. Check access to the spreadsheet and try again.';
      } else failures[source] = data[source].length ? (usingBackup[source] ? 'Could not connect to the spreadsheet. Showing a backup list that may be out of date.' : 'Could not refresh; showing previously loaded data.') : 'Could not load the data. Check access to the spreadsheet and try again.';
      $('count-' + source).textContent = data[source].length;
    });
    if (current) { const updated = data[current.source].find(item => item.key === current.key); if (updated) { current = updated; updateNowPlaying(current); } }
    $('refresh').disabled = false; status(); gameOptions(); channelOptions(); render();
    if (pendingSharedClip) {
      const shared = pendingSharedClip;
      const item = data[shared.source].find(x => x.id === shared.id && (shared.source !== 'youtube' || (x.start || 0) === shared.start));
      if (item) { switchSource(shared.source); play(item, true); }
      else $('share-status').textContent = 'The shared clip was not found. Refresh to try again.';
    }
  }
  try { $('autoplay').checked = localStorage.getItem('clips-autoplay') === 'true'; } catch {}
  $('autoplay').addEventListener('change', () => { try { localStorage.setItem('clips-autoplay', String($('autoplay').checked)); } catch {} });
  document.querySelectorAll('.source-tab').forEach(button => button.addEventListener('click', () => switchSource(button.dataset.source)));
  [elements.search, elements.game, elements.channel, elements.author, elements.sort].forEach(control => control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', render));
  $('clear').addEventListener('click', () => { elements.search.value = ''; elements.game.value = ''; elements.channel.value = ''; elements.author.value = ''; elements.sort.value = 'newest'; render(); elements.search.focus(); });
  $('refresh').addEventListener('click', load);
  $('copy-link').addEventListener('click', async () => {
    if (!current) return;
    const url = new URL(location.href); url.search = ''; url.hash = ''; url.searchParams.set('source', current.source); url.searchParams.set('clip', current.id);
    if (current.source === 'youtube' && current.start) url.searchParams.set('start', String(current.start));
    const value = url.href;
    try { if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(value); $('share-url').hidden = true; $('share-status').textContent = 'Link copied!'; }
    catch { $('share-url').value = value; $('share-url').hidden = false; $('share-url').focus(); $('share-url').select(); $('share-status').textContent = 'Copy the selected link:'; }
  });
  elements.previous.addEventListener('click', () => { const i = visible.findIndex(item => item.key === current?.key); if (i > 0) play(visible[i - 1]); });
  elements.next.addEventListener('click', () => { const i = visible.findIndex(item => item.key === current?.key); if (i >= 0 && i < visible.length - 1) play(visible[i + 1]); });
  elements.random.addEventListener('click', () => { if (!visible.length) return; let options = visible.filter(item => item.key !== current?.key); if (!options.length) options = visible; play(options[Math.floor(Math.random() * options.length)]); });
  document.addEventListener('keydown', event => { if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '')) { event.preventDefault(); elements.search.focus(); } });
  load();
})();
