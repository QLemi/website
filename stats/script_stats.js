'use strict';

const statsIndexes = new WeakMap();
let renderedSortData = null;
function statsIndex() {
  const characters = list();
  if (!statsIndexes.has(characters)) {
    const categories = new Set();
    const maxima = new Map();
    for (const character of characters) {
      for (const item of character.stats) {
        const key = normalize(item.category);
        maxima.set(key, Math.max(maxima.get(key) || 0, item.value));
        if (!isPrestige(item.category)) categories.add(item.category);
      }
    }
    statsIndexes.set(characters, {
      categories: [...categories].sort((a, b) => a.localeCompare(b, 'en')),
      maxima
    });
  }
  return statsIndexes.get(characters);
}
const CONFIG = {
  ...STATS_CONFIG
};
const CACHE_KEY = 'dbd_stats_cache_v2';
const nf = new Intl.NumberFormat('en-US');
const state = {
  mode: CONFIG.DEFAULT_MODE === 'survivors' ? 'survivors' : 'killers',
  data: {
    killers: [],
    survivors: []
  },
  meta: {
    killers: null,
    survivors: null
  },
  selected: {
    killers: null,
    survivors: null
  },
  search: '',
  sort: 'game',
  itemSortCategory: '',
  prestigeRange: 'all',
  prestigePlus: null,
  detailSearch: '',
  totalsSearch: '',
  totalsMode: 'killers'
};
const $ = id => document.getElementById(id);
const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('en-US');
const escapeHtml = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[c]);
const fmt = value => nf.format(Number(value) || 0);
const modeName = mode => mode === 'survivors' ? 'Survivors' : 'Killers';
const isPrestige = category => normalize(category).startsWith('prestiz');
const isBonusOffering = category => {
  const name = normalize(category);
  if (CONFIG.BONUS_OFFERINGS?.has(name)) return true;
  return name.includes('strimers') || name.includes('streamer') || name.includes('pudding') || /\b(cake|ciasto|ciasta|flan|terrormisu|cobbler|scream pie|torte)\b/.test(name);
};
function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}
function writeStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (_) {
    return false;
  }
}
function safeUrl(value) {
  if (typeof value !== 'string') return '';
  if (value.startsWith(new URL('../SharedFiles/', document.baseURI).href)) return value;
  if (/^https:\/\//i.test(value) || /^(?:assets\/|\.\.\/SharedFiles\/)[a-z0-9_./-]+$/i.test(value)) return value;
  return '';
}
function avatar(character, className) {
  const name = character.name || '?';
  const initials = name.split(/\s+/).map(part => part[0] || '').slice(0, 2).join('').toUpperCase();
  const src = safeUrl(character.image);
  return '<span class="avatar ' + className + '">' + '<span class="avatar-initials" aria-hidden="true">' + escapeHtml(initials) + '</span>' + (src ? '<img class="avatar-photo" src="' + escapeHtml(src) + '" alt="" loading="lazy">' : '') + '</span>';
}
function categoryColor(category) {
  const colors = CONFIG.CATEGORY_COLORS || {};
  const exact = Object.keys(colors).find(key => normalize(key) === normalize(category));
  if (exact) return colors[exact];
  const name = normalize(category);
  if (name.includes('anniversary') || name.includes('banquet') || name.includes('masquerade')) return '#fb923c';
  if (name.includes('blood moon')) return '#fb7185';
  if (name.includes('halloween')) return '#c084fc';
  if (name.includes('bone chill')) return '#facc15';
  return '#7dd3fc';
}
function categoryIcon(category, value) {
  if (isPrestige(category) && value > 0) {
    const sprite = CONFIG.PRESTIGE_SPRITES;
    const level = Math.max(1, Math.min(100, Math.floor(value)));
    const entry = sprite?.levels?.[level];
    const sheet = entry && sprite[entry.sheet];
    if (entry && sheet && safeUrl(sheet.url)) {
      const size = 64;
      const scale = size / entry.w;
      const showLabel = entry.label && level !== 99 && level !== 100;
      return '<span class="prestige-sprite" style="width:' + size + 'px;height:' + size + 'px;background-image:url(&quot;' + escapeHtml(sheet.url) + '&quot;);background-size:' + sheet.width * scale + 'px ' + sheet.height * scale + 'px;background-position:' + -entry.x * scale + 'px ' + -entry.y * scale + 'px" aria-hidden="true">' + (showLabel ? '<span class="prestige-label">' + level + '</span>' : '') + '</span>';
    }
  }
  const icons = CONFIG.CATEGORY_ICONS || {};
  const exact = Object.keys(icons).find(key => normalize(key) === normalize(category));
  const src = safeUrl(exact ? icons[exact] : '');
  return src ? '<span class="category-image-wrap"><span class="category-dot" style="--category-color:' + categoryColor(category) + '"></span><img class="category-icon" src="' + escapeHtml(src) + '" alt="" loading="lazy"></span>' : '<span class="category-dot" style="--category-color:' + categoryColor(category) + '"></span>';
}
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  const input = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quoted) {
      if (c === '"' && input[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;else field += c;
    } else if (c === '"') quoted = true;else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && input[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += c;
  }
  if (field !== '' || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}
function stopCategory(category) {
  const name = normalize(category.trim());
  return !name || name.startsWith('last update') || name.startsWith('need bp') || name.startsWith('lacznie');
}
function parseSheet(text) {
  if (/^\s*</.test(text)) throw new Error('The Data Source Did Not Return CSV Data.');
  const rows = parseCSV(text);
  if (rows.length < 2) throw new Error('The Data Source Contains No Stats Table.');
  const header = rows[0];
  const result = [];
  for (let col = 1; col < header.length; col++) {
    const name = (header[col] || '').trim();
    if (!name) continue;
    const stats = [];
    for (let r = 1; r < rows.length; r++) {
      const category = (rows[r][0] || '').trim();
      if (stopCategory(category)) break;
      const raw = (rows[r][col] || '').trim();
      if (!raw || /^(N\/D|N\/A)$/i.test(raw)) continue;
      const cleaned = raw;
      if (!/^\d+$/.test(cleaned)) continue;
      const value = Number(cleaned);
      if (!Number.isSafeInteger(value) || value < 0) continue;
      stats.push({
        category,
        value
      });
    }
    if (stats.length) result.push({
      name,
      image: (CONFIG.PORTRAIT_MAP || {})[name] || '',
      stats
    });
  }
  if (!result.length) throw new Error('No Characters With Stats Were Found.');
  return result;
}
async function loadSheet(mode) {
  const gid = mode === 'survivors' ? CONFIG.SHEET_SURVIVORS_GID : CONFIG.SHEET_KILLERS_GID;
  const url = 'https://docs.google.com/spreadsheets/d/' + encodeURIComponent(CONFIG.SHEET_ID) + '/gviz/tq?tqx=out:csv&gid=' + encodeURIComponent(gid) + '&_=' + Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal
    });
    if (!response.ok) throw new Error('The Data Source Returned HTTP ' + response.status + '.');
    return parseSheet(await response.text());
  } finally {
    clearTimeout(timer);
  }
}
function restoreCache() {
  const cache = readStorage(CACHE_KEY, {});
  for (const mode of ['killers', 'survivors']) {
    const entry = cache && cache[mode];
    if (entry && Array.isArray(entry.data) && entry.data.length && Number.isFinite(entry.time) && entry.time > 0) {
      const characters = entry.data.filter(character => character && typeof character.name === 'string' && character.name.trim() && (character.image == null || typeof character.image === 'string') && Array.isArray(character.stats) && character.stats.length && character.stats.every(item => item && typeof item.category === 'string' && item.category.trim() && Number.isSafeInteger(item.value) && item.value >= 0));
      if (!characters.length) continue;
      state.data[mode] = characters.map(character => ({
        ...character,
        image: CONFIG.PORTRAIT_MAP[character.name] || ''
      }));
      state.meta[mode] = {
        source: 'cached',
        time: entry.time
      };
    }
  }
}
function saveCache() {
  const cache = {};
  for (const mode of ['killers', 'survivors']) {
    if (state.data[mode].length && state.meta[mode]) {
      cache[mode] = {
        data: state.data[mode].map(character => ({
          name: character.name,
          stats: character.stats
        })),
        time: state.meta[mode].time
      };
    }
  }
  writeStorage(CACHE_KEY, cache);
}
function list() {
  return state.data[state.mode] || [];
}
function prestige(character) {
  return character.stats.find(item => isPrestige(item.category))?.value ?? 0;
}
function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
function offeringsTotal(characters) {
  let offerings = 0;
  for (const character of characters) {
    for (const item of character.stats) {
      if (isPrestige(item.category)) continue;
      if (isBonusOffering(item.category)) offerings += item.value;
    }
  }
  return offerings;
}
function renderStatus() {
  const meta = state.meta[state.mode];
  const status = $('source-status');
  const time = $('source-time');
  const dot = $('source-dot');
  dot.className = 'source-dot';
  if (!meta) {
    status.textContent = 'No Data Available';
    time.textContent = 'Check Your Connection And Data Access';
    dot.classList.add('error');
    return;
  }
  const stamp = new Date(meta.time).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  if (meta.source === 'live') {
    status.textContent = 'Connected';
    time.textContent = 'Last fetched: ' + stamp;
  } else {
    status.textContent = 'Cached Data';
    time.textContent = 'Last fetched: ' + stamp;
    dot.classList.add('cached');
  }
}
function renderTabs() {
  document.body.classList.toggle('mode-survivors', state.mode === 'survivors');
  document.body.classList.toggle('mode-killers', state.mode === 'killers');
  for (const mode of ['killers', 'survivors']) {
    const tab = $('tab-' + mode);
    const active = state.mode === mode;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    $('tab-' + mode + '-count').textContent = state.data[mode].length || '—';
  }
  $('explorer').setAttribute('aria-labelledby', 'tab-' + state.mode);
}
function renderOverview() {
  const characters = list();
  const levels = characters.map(prestige);
  const sum = levels.reduce((total, value) => total + value, 0);
  const totalOfferings = offeringsTotal(characters);
  $('stat-chars').textContent = fmt(characters.length);
  $('stat-total-prestige').textContent = fmt(sum);
  $('stat-avg-prestige').textContent = characters.length ? fmt(Math.round(sum / characters.length)) + ' / ' + fmt(median(levels)) : '—';
  $('stat-p100').textContent = fmt(levels.filter(value => value >= 100).length);
  $('stat-p10').textContent = fmt(levels.filter(value => value >= 10).length);
  $('stat-p25').textContent = fmt(levels.filter(value => value >= 25).length);
  $('stat-p50').textContent = fmt(levels.filter(value => value >= 50).length);
  $('stat-offerings').textContent = fmt(totalOfferings);
}
function renderCombinedOverview() {
  const characters = [...state.data.killers, ...state.data.survivors];
  const levels = characters.map(prestige);
  const totalPrestige = levels.reduce((sum, level) => sum + level, 0);
  const totalOfferings = offeringsTotal(characters);
  $('combined-chars').textContent = fmt(characters.length);
  $('combined-prestige').textContent = fmt(totalPrestige);
  $('combined-average').textContent = characters.length ? fmt(Math.round(totalPrestige / characters.length)) + ' / ' + fmt(median(levels)) : '—';
  $('combined-p100').textContent = fmt(levels.filter(level => level >= 100).length);
  $('combined-p10').textContent = fmt(levels.filter(level => level >= 10).length);
  $('combined-p25').textContent = fmt(levels.filter(level => level >= 25).length);
  $('combined-p50').textContent = fmt(levels.filter(level => level >= 50).length);
  $('combined-offerings').textContent = fmt(totalOfferings);
  $('combined-summary-chars').textContent = fmt(characters.length) + ' characters';
  $('combined-summary-prestige').textContent = fmt(totalPrestige) + ' prestige';
  $('combined-summary-p100').textContent = fmt(levels.filter(level => level >= 100).length) + ' P100';
}
function filteredCharacters() {
  const query = normalize(state.search.trim());
  const range = state.prestigeRange.split('-').map(Number);
  const filtered = list().filter(character => (!query || normalize(character.name).includes(query)) && (state.prestigePlus !== null ? prestige(character) >= state.prestigePlus : state.prestigeRange === 'all' || (state.prestigeRange === '100' ? prestige(character) === 100 : prestige(character) >= range[0] && prestige(character) <= range[1])));
  if (state.sort === 'prestige') filtered.sort((a, b) => prestige(b) - prestige(a) || a.name.localeCompare(b.name, 'en'));else if (state.sort === 'item') {
    const amount = character => character.stats.find(item => normalize(item.category) === normalize(state.itemSortCategory))?.value ?? 0;
    const gameOrder = new Map(list().map((character, index) => [character.name, index]));
    filtered.sort((a, b) => amount(b) - amount(a) || gameOrder.get(a.name) - gameOrder.get(b.name));
  } else if (state.sort === 'game') {
    const gameOrder = new Map(list().map((character, index) => [character.name, index]));
    filtered.sort((a, b) => gameOrder.get(a.name) - gameOrder.get(b.name));
  } else filtered.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  return filtered;
}
function renderCharacters() {
  populateItemSortOptions();
  const filtered = filteredCharacters();
  const selected = state.selected[state.mode];
  if (!filtered.some(character => character.name === selected)) {
    state.selected[state.mode] = filtered[0]?.name || null;
  }
  $('list-count').textContent = filtered.length + ' Of ' + list().length + ' Characters';
  $('character-list').innerHTML = filtered.length ? filtered.map(character => {
    const selected = state.selected[state.mode] === character.name;
    const level = prestige(character);
    const prestigeStat = character.stats.find(item => isPrestige(item.category));
    const prestigeBadge = level > 0 && prestigeStat ? '<span class="prestige-chip" role="img" aria-label="Prestige P' + fmt(level) + '">' + categoryIcon(prestigeStat.category, level) + '</span>' : '<span class="prestige-chip prestige-chip-zero" aria-label="Prestige P0">P0</span>';
    return '<div class="character-item' + (selected ? ' selected' : '') + '">' + '<button class="character-select" type="button" data-select="' + escapeHtml(character.name) + '"' + (selected ? ' aria-current="true"' : '') + '>' + avatar(character, 'avatar-small') + '<span class="character-meta"><strong>' + escapeHtml(character.name) + '</strong></span>' + prestigeBadge + '</button>' + '</div>';
  }).join('') : '<div class="empty-state side-empty">No Characters Match These Filters.<button type="button" id="reset-filters" class="text-button">Clear Filters</button></div>';
  syncExplorerListHeight();
}
function populateItemSortOptions() {
  const select = $('item-sort-category');
  const characters = list();
  const categories = statsIndex().categories;
  if (!categories.includes(state.itemSortCategory)) state.itemSortCategory = '';
  if (renderedSortData !== characters) {
    select.innerHTML = '<option value="">Choose Item…</option>' + categories.map(category => '<option value="' + escapeHtml(category) + '">' + escapeHtml(category) + '</option>').join('');
    renderedSortData = characters;
  }
  select.value = state.itemSortCategory;
  select.disabled = !categories.length;
  if (state.sort === 'item' && !state.itemSortCategory) {
    state.sort = 'game';
    $('sort-select').value = 'game';
  }
}
function syncExplorerListHeight() {
  const characterList = $('character-list');
  if (!characterList) return;
  if (window.matchMedia('(max-width: 760px)').matches) {
    characterList.style.maxHeight = 'none';
    return;
  }
  const detail = $('character-detail');
  const controls = document.querySelector('.sidebar-controls');
  const targetHeight = Math.max(655, (detail?.scrollHeight || 0) + 2);
  characterList.style.maxHeight = Math.max(120, targetHeight - (controls?.offsetHeight || 0) - 2) + 'px';
}
function maxForCategory(category) {
  return Math.max(1, statsIndex().maxima.get(normalize(category)) || 0);
}
function renderDetail() {
  const detail = $('character-detail');
  const character = list().find(item => item.name === state.selected[state.mode]);
  if (!character) {
    detail.innerHTML = '<div class="empty-state">' + (list().length ? 'Select A Character Or Adjust The Filters.' : 'Data For This Role Is Unavailable. Try Refreshing.') + '</div>';
    syncExplorerListHeight();
    return;
  }
  const prestigeStat = character.stats.find(item => isPrestige(item.category));
  const currentPrestige = prestigeStat?.value ?? 0;
  const prestigeValue = '<strong class="prestige-feature-value">P' + fmt(currentPrestige) + '</strong>';
  detail.innerHTML = '<div class="detail-topline"><span class="mini-label">' + modeName(state.mode).toUpperCase() + ' / CHARACTER PROFILE</span><div class="detail-actions">' + '<a class="button button-quiet button-small" href="../streaki/streaki.html">View Streaks <span class="external-link-icon" aria-hidden="true">↗</span></a></div></div>' + '<div class="profile">' + avatar(character, 'avatar-large') + '<div class="profile-info"><h3>' + escapeHtml(character.name) + '</h3><div class="profile-badges"><span class="profile-badge">' + character.stats.filter(item => !isPrestige(item.category)).length + ' Categories</span></div></div></div>' + (prestigeStat ? '<div class="prestige-feature"><span class="prestige-feature-icon">' + categoryIcon(prestigeStat.category, currentPrestige) + '</span><span class="prestige-feature-copy"><span class="mini-label">' + escapeHtml(prestigeStat.category) + '</span><small>CHARACTER PRESTIGE</small></span>' + prestigeValue + '</div>' : '') + '<div class="detail-subhead"><div><h4>Inventory & Stats</h4></div>' + '<label class="sr-only" for="detail-search">Search Character Categories</label><input id="detail-search" type="search" placeholder="Search Categories…" value="' + escapeHtml(state.detailSearch) + '"></div><div class="stat-list" id="detail-stats"></div>';
  $('detail-search').addEventListener('input', event => {
    state.detailSearch = event.target.value;
    renderDetailRows(character);
  });
  renderDetailRows(character);
  syncExplorerListHeight();
}
function renderDetailRows(character) {
  const query = normalize(state.detailSearch.trim());
  const stats = character.stats.filter(item => !isPrestige(item.category) && (!query || normalize(item.category).includes(query)));
  $('detail-stats').innerHTML = stats.length ? stats.map(item => {
    const color = categoryColor(item.category);
    const percent = item.value > 0 ? Math.max(1, Math.min(100, isPrestige(item.category) ? item.value : Math.round(item.value / maxForCategory(item.category) * 100))) : 0;
    const right = '<strong class="stat-value">' + fmt(item.value) + '</strong>';
    return '<div class="stat-row"><div class="stat-icon" style="--category-color:' + color + '">' + categoryIcon(item.category, item.value) + '</div><div class="stat-main"><div class="stat-name">' + escapeHtml(item.category) + '</div><div class="stat-track"><span style="width:' + percent + '%;background:' + color + '"></span></div></div><div class="stat-number">' + right + '</div></div>';
  }).join('') : '<div class="empty-state">No Matching Categories Found.</div>';
  syncExplorerListHeight();
}
function roleCategoryTotals(mode) {
  const sums = new Map();
  for (const character of state.data[mode] || []) {
    for (const item of character.stats) {
      if (isPrestige(item.category)) continue;
      const key = normalize(item.category);
      const previous = sums.get(key);
      sums.set(key, {
        category: previous?.category || item.category,
        total: (previous?.total || 0) + item.value
      });
    }
  }
  return sums;
}
function renderTotals() {
  document.querySelectorAll('[data-total-mode]').forEach(button => {
    const active = button.dataset.totalMode === state.totalsMode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const killers = roleCategoryTotals('killers');
  const survivors = roleCategoryTotals('survivors');
  let categories;
  if (state.totalsMode === 'both') {
    categories = [...killers].filter(([key]) => survivors.has(key)).map(([key, item]) => [item.category, item.total + survivors.get(key).total]);
  } else {
    const totals = state.totalsMode === 'survivors' ? survivors : killers;
    categories = [...totals.values()].map(item => [item.category, item.total]);
  }
  const query = normalize(state.totalsSearch.trim());
  const items = categories.filter(([category]) => !query || normalize(category).includes(query)).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'pl'));
  $('totals-count').textContent = items.length + ' Categories';
  $('footer-totals').innerHTML = items.length ? items.map(([category, total], index) => '<div class="total-card"><span class="total-rank">' + String(index + 1).padStart(2, '0') + '</span><span class="total-icon" style="--category-color:' + categoryColor(category) + '">' + categoryIcon(category) + '</span><span class="total-name">' + escapeHtml(category) + '</span><strong>' + fmt(total) + '</strong></div>').join('') : '<div class="empty-state">No Categories Match This Search.</div>';
}
function renderAll() {
  renderTabs();
  renderStatus();
  renderOverview();
  renderCombinedOverview();
  renderCharacters();
  renderDetail();
  renderTotals();
}
function switchMode(mode) {
  if (mode !== 'killers' && mode !== 'survivors') return;
  state.mode = mode;
  state.detailSearch = '';
  state.search = '';
  state.totalsSearch = '';
  $('character-search').value = '';
  $('totals-search').value = '';
  renderAll();
}
async function refreshData() {
  const button = $('refresh-button');
  if (button.disabled) return;
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  button.textContent = '↻ Loading…';
  try {
    if (!state.data[state.mode].length) {
      $('source-status').textContent = 'Connecting…';
      $('source-time').textContent = 'Loading Data';
    }
    const modes = ['killers', 'survivors'];
    const results = await Promise.allSettled(modes.map(loadSheet));
    let updated = 0;
    results.forEach((result, index) => {
      const mode = modes[index];
      if (result.status === 'fulfilled') {
        state.data[mode] = result.value;
        state.meta[mode] = {
          source: 'live',
          time: Date.now()
        };
        updated++;
      } else {
        console.error('Could not load ' + mode + ' data:', result.reason);
        if (state.data[mode].length && state.meta[mode]) state.meta[mode].source = 'cached';
      }
    });
    if (updated) saveCache();
    if (!state.data[state.mode].length && state.data[state.mode === 'killers' ? 'survivors' : 'killers'].length) {
      state.mode = state.mode === 'killers' ? 'survivors' : 'killers';
    }
    renderAll();
    if (!updated) toast('Could Not Load New Data. Check Your Connection.');else if (updated < 2) toast('Some Data Is Unavailable. Available Data Is Shown.');
  } catch (error) {
    console.error('Could not display statistics:', error);
    toast('Could not display the data. Please try Refresh again.');
  } finally {
    button.disabled = false;
    button.removeAttribute('aria-busy');
    button.innerHTML = '<span aria-hidden="true">↻</span> Refresh';
  }
}
function applyHash() {
  const params = new URLSearchParams(location.hash.replace(/^#/, ''));
  const mode = params.get('role');
  const name = params.get('char');
  if (mode === 'killers' || mode === 'survivors') state.mode = mode;
  if (name) state.selected[state.mode] = name;
}
function clearFilters() {
  state.search = '';
  state.sort = 'game';
  state.itemSortCategory = '';
  state.prestigeRange = 'all';
  state.prestigePlus = null;
  state.detailSearch = '';
  $('character-search').value = '';
  $('sort-select').value = 'game';
  $('item-sort-category').value = '';
  $('prestige-filter').value = 'all';
  renderCharacters();
  renderDetail();
}
let toastTimer;
function toast(message) {
  const element = $('toast');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove('show'), 3600);
}
async function init() {
  try {
    const shared = await SharedCatalog.loadMany(['categories', 'prestige', 'items', 'itemAddons', 'offerings']);
    CONFIG.PORTRAIT_MAP = await SharedCatalog.portraitMap();
    CONFIG.CATEGORY_ICONS = {};
    CONFIG.CATEGORY_COLORS = {};
    const inventory = [...shared.items.entries, ...shared.itemAddons.entries, ...shared.offerings.entries];
    for (const entry of inventory) for (const name of [entry.name, ...(entry.aliases || [])]) if (entry.image.url) CONFIG.CATEGORY_ICONS[name] = SharedCatalog.assetUrl(entry.image.url);
    CONFIG.BONUS_OFFERINGS = new Set(shared.offerings.entries.filter(entry => entry.category === 'bloodpoints').flatMap(entry => [entry.name, ...(entry.aliases || [])]).map(normalize));
    const inventoryById = new Map(inventory.map(entry => [entry.id, entry]));
    for (const category of shared.categories.statistics) for (const name of [category.name, ...category.aliases]) {
      const linked = inventoryById.get(category.offeringId || category.itemId || category.addonId);
      const picture = linked?.image || category.image;
      if (picture?.url) CONFIG.CATEGORY_ICONS[name] = SharedCatalog.assetUrl(picture.url);
      if (category.color) CONFIG.CATEGORY_COLORS[name] = category.color;
    }
    CONFIG.ROLE_POOL_CATS = shared.categories.offeringPoolCategories;
    CONFIG.PRESTIGE_SPRITES = JSON.parse(JSON.stringify(shared.prestige));
    for (const key of ['sheet1', 'sheet2']) CONFIG.PRESTIGE_SPRITES[key].url = SharedCatalog.assetUrl(CONFIG.PRESTIGE_SPRITES[key].url);
  } catch (error) {
    console.error(error);
    $('source-status').textContent = 'Shared definitions unavailable';
    $('source-time').textContent = 'Reload the page to try again';
    $('character-detail').textContent = 'Could not load SharedFiles. Your saved data has not been reset.';
    return;
  }
  restoreCache();
  applyHash();
  renderAll();
  window.addEventListener('resize', syncExplorerListHeight);
  $('refresh-button').addEventListener('click', refreshData);
  document.querySelectorAll('.role-tab').forEach(button => button.addEventListener('click', () => switchMode(button.dataset.mode)));
  document.querySelector('.role-switch').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tabs = [...document.querySelectorAll('.role-tab')];
    const current = tabs.indexOf(event.target);
    if (current < 0) return;
    event.preventDefault();
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    switchMode(tabs[index].dataset.mode);
    tabs[index].focus();
  });
  $('character-search').addEventListener('input', event => {
    state.search = event.target.value;
    renderCharacters();
    renderDetail();
  });
  $('clear-filters-button').addEventListener('click', clearFilters);
  $('sort-select').addEventListener('change', event => {
    state.sort = event.target.value;
    if (state.sort === 'item' && !state.itemSortCategory) {
      state.itemSortCategory = $('item-sort-category').options[1]?.value || '';
      $('item-sort-category').value = state.itemSortCategory;
      if (!state.itemSortCategory) {
        state.sort = 'game';
        $('sort-select').value = 'game';
      }
    }
    renderCharacters();
    renderDetail();
  });
  $('item-sort-category').addEventListener('change', event => {
    state.itemSortCategory = event.target.value;
    if (state.itemSortCategory) {
      state.sort = 'item';
      $('sort-select').value = 'item';
    }
    renderCharacters();
    renderDetail();
  });
  $('prestige-filter').addEventListener('change', event => {
    const value = event.target.value;
    state.prestigePlus = value.startsWith('min-') ? Number(value.slice(4)) : null;
    state.prestigeRange = state.prestigePlus === null ? value : 'all';
    renderCharacters();
    renderDetail();
  });
  $('character-list').addEventListener('click', event => {
    const selected = event.target.closest('[data-select]');
    if (selected) {
      state.selected[state.mode] = selected.dataset.select;
      state.detailSearch = '';
      renderCharacters();
      renderDetail();
    }
    if (event.target.id === 'reset-filters') {
      clearFilters();
    }
  });
  $('totals-search').addEventListener('input', event => {
    state.totalsSearch = event.target.value;
    renderTotals();
  });
  document.querySelector('.totals-role-switch').addEventListener('click', event => {
    const button = event.target.closest('[data-total-mode]');
    if (!button) return;
    state.totalsMode = button.dataset.totalMode;
    renderTotals();
  });
  document.addEventListener('error', event => {
    if (event.target instanceof HTMLImageElement) event.target.hidden = true;
  }, true);
  document.addEventListener('load', event => {
    if (event.target instanceof HTMLImageElement && event.target.classList.contains('avatar-photo')) {
      event.target.closest('.avatar')?.classList.add('has-photo');
    }
  }, true);
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '')) {
      event.preventDefault();
      $('character-search').focus();
    }
  });
  window.addEventListener('hashchange', () => {
    applyHash();
    renderAll();
  });
  refreshData();
}
document.addEventListener('DOMContentLoaded', init);
