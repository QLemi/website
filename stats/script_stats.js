const SHEET_ID = STATS_CONFIG.SHEET_ID;
const GID_KILLERS = STATS_CONFIG.SHEET_KILLERS_GID;
const GID_SURVIVORS = STATS_CONFIG.SHEET_SURVIVORS_GID;
const PORTRAIT_MAP = STATS_CONFIG.PORTRAIT_MAP;
const CATEGORY_COLORS = STATS_CONFIG.CATEGORY_COLORS;
const CATEGORY_ICONS = STATS_CONFIG.CATEGORY_ICONS || {};
const PLACEHOLDER_IMG = STATS_CONFIG.PLACEHOLDER_IMG;
const ROLE_POOL_CATS = (STATS_CONFIG.ROLE_POOL_CATS || ['Strimersy', 'Cake', 'Puddingi', 'Muszle']).map(s => s.toLowerCase());
const SHOW_ICONS = !!STATS_CONFIG.SHOW_CATEGORY_ICONS;

let currentMode = STATS_CONFIG.DEFAULT_MODE || 'killers';
let killersData = null;
let survivorsData = null;
let selectedIndex = 0;
let roleMaxByCat = {};
let roleMaxByGroup = {};
let searchQuery = '';
let footerExpanded = false;
let demandMode = false;
const DEMAND_LS_KEY = 'dbd_stats_demand_v1';


function parseCSV(text) {
  const rows = [];
  let current = [];
  let inQuotes = false;
  let field = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (char === '"' && next === '"') { field += '"'; i++; }
      else if (char === '"') inQuotes = false;
      else field += char;
    } else {
      if (char === '"') inQuotes = true;
      else if (char === ',') { current.push(field); field = ''; }
      else if (char === '\n' || (char === '\r' && next === '\n')) {
        current.push(field); rows.push(current); current = []; field = '';
        if (char === '\r') i++;
      } else if (char === '\r') {
        current.push(field); rows.push(current); current = []; field = '';
      } else field += char;
    }
  }
  if (field || current.length) { current.push(field); rows.push(current); }
  return rows;
}

function shouldStopCategory(cat) {
  const c = cat.trim().toLowerCase();
  if (!c) return true;
  if (c.startsWith('last update')) return true;
  if (c.startsWith('need bp')) return true;
  if (c.startsWith('łącznie') || c.startsWith('lacznie')) return true;
  return false;
}

function extractParenGroup(name) {
  const m = name.match(/\(([^)]+)\)\s*$/);
  if (!m) return null;
  return m[1].trim().toLowerCase();
}

function getCategoryColor(name) {
  const n = name.trim();
  if (CATEGORY_COLORS[n]) return CATEGORY_COLORS[n];
  for (const key of Object.keys(CATEGORY_COLORS)) {
    if (n.toLowerCase() === key.toLowerCase()) return CATEGORY_COLORS[key];
  }
  const lower = n.toLowerCase();
  if (lower.includes('anniversary') || lower.includes('banquet') || lower.includes('masquerade') || lower.includes('rocznic')) return '#f97316';
  if (lower.includes('blood moon') || lower.includes('bloodshot') || lower.includes('bloodsense')) return '#ef4444';
  if (lower.includes('halloween') || lower.includes('arcane') || lower.includes('blight serum') || lower.includes('wisp') || lower.includes('bulb') || lower.includes('serum') || lower.includes('hallows')) return '#a855f7';
  if (lower.includes('bone chill') || lower.includes('mistle') || lower.includes('winter')) return '#fde68a';
  if (lower.includes('chinski') || lower.includes('envelope') || lower.includes('firecracker') || lower.includes('festive')) return '#eab308';
  if (lower.includes('presti')) return '#6b7280';
  if (lower.includes('strimer')) return '#22c55e';
  if (lower.includes('pudding') || lower.includes('muszl') || lower.includes('cake')) return '#86efac';
  return '#94a3b8';
}

function getCategoryIcon(name) {
  const n = name.trim();
  if (CATEGORY_ICONS[n]) return CATEGORY_ICONS[n];
  for (const key of Object.keys(CATEGORY_ICONS)) {
    if (n.toLowerCase() === key.toLowerCase()) return CATEGORY_ICONS[key];
  }
  return null;
}


function getPrestigeSprite(level) {
  const cfg = STATS_CONFIG.PRESTIGE_SPRITES;
  if (!cfg || level == null || isNaN(level) || level <= 0) return null;
  let lv = Math.min(100, Math.max(1, Math.floor(Number(level))));
  const entry = (cfg.levels && cfg.levels[lv]) || null;
  if (!entry) return null;
  const sheet = cfg[entry.sheet];
  if (!sheet) return null;
  const size = cfg.displaySize || 48;
  const scale = size / entry.w;
  const bgW = sheet.width * scale;
  const bgH = sheet.height * scale;
  const posX = -entry.x * scale;
  const posY = -entry.y * scale;
  const showLabel = entry.label && lv !== 99 && lv !== 100;
  const labelHtml = showLabel
    ? `<span class="prestige-label">${lv}</span>`
    : (entry.label && (lv === 99 || lv === 100) ? '' : '');
  return {
    html: `<span class="prestige-sprite" style="width:${size}px;height:${size}px;background-image:url('${sheet.url}');background-size:${bgW}px ${bgH}px;background-position:${posX}px ${posY}px;">${showLabel ? `<span class="prestige-label">${lv}</span>` : ''}</span>`
  };
}

function categoryIconHtml(category, value, color) {
  const isPrestige = category.trim().toLowerCase().includes('presti');
  if (isPrestige && value != null) {
    const sprite = getPrestigeSprite(value);
    if (sprite) return sprite.html;
  }
  if (SHOW_ICONS) {
    const icon = getCategoryIcon(category);
    if (icon) return `<img class="cat-icon" src="${icon}" alt="" onerror="this.style.display='none'">`;
    return `<span class="cat-dot big" style="background:${color};box-shadow:0 0 8px ${color}"></span>`;
  }
  return `<span class="cat-dot" style="background:${color};box-shadow:0 0 8px ${color}"></span>`;
}

function computeRoleScales(list) {
  const maxByCat = {};
  const maxByGroup = {};
  list.forEach(c => {
    c.stats.forEach(s => {
      if (s.value === null) return;
      const key = s.category.trim().toLowerCase();
      maxByCat[key] = Math.max(maxByCat[key] || 0, s.value);
      const group = extractParenGroup(s.category);
      if (group) maxByGroup[group] = Math.max(maxByGroup[group] || 0, s.value);
    });
  });
  roleMaxByCat = maxByCat;
  roleMaxByGroup = maxByGroup;
}

function barPercent(stat) {
  if (stat.value === null) return 0;
  if (stat.value === 0) return 0;
  const name = stat.category.trim();
  const lower = name.toLowerCase();
  let pct = 0;

  if (lower.includes('presti')) {
    pct = Math.min(100, Math.max(0, (stat.value / 100) * 100));
  } else if (ROLE_POOL_CATS.some(p => lower === p || lower.includes(p))) {
    const max = roleMaxByCat[lower] || stat.value || 1;
    pct = Math.min(100, Math.round((stat.value / max) * 100));
  } else {
    const group = extractParenGroup(name);
    if (group && roleMaxByGroup[group]) {
      pct = Math.min(100, Math.round((stat.value / roleMaxByGroup[group]) * 100));
    } else {
      const max = roleMaxByCat[lower] || stat.value || 1;
      pct = Math.min(100, Math.round((stat.value / max) * 100));
    }
  }

  if (stat.value > 0 && pct < 1) return 1;
  return pct;
}

async function loadSheet(gid) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} gid=${gid}`);
  const text = await response.text();
  if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
    throw new Error('Arkusz niedostępny (brak publicznego dostępu?)');
  }
  const rows = parseCSV(text);
  if (rows.length < 2) return [];

  const header = rows[0];
  const characters = [];

  for (let col = 1; col < header.length; col++) {
    const name = (header[col] || '').trim();
    if (!name) continue;

    const stats = [];
    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      const category = (row[0] || '').trim();
      if (shouldStopCategory(category)) break;

      const raw = (row[col] || '').trim();
      if (raw === '' || raw.toUpperCase() === 'N/D' || raw.toUpperCase() === 'N/A') {
        continue;
      }
      const num = parseInt(raw.replace(/\s/g, ''), 10);
      if (isNaN(num)) continue;
      stats.push({ category, value: num, display: String(num) });
    }

    if (stats.length === 0) continue;

    characters.push({
      name,
      image: PORTRAIT_MAP[name] || '',
      stats
    });
  }

  return characters;
}

async function loadAll() {
  const [killers, survivors] = await Promise.all([
    loadSheet(GID_KILLERS),
    loadSheet(GID_SURVIVORS)
  ]);
  killersData = killers;
  survivorsData = survivors;
  return { killers, survivors };
}

function currentList() {
  return currentMode === 'survivors' ? (survivorsData || []) : (killersData || []);
}

function median(arr) {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

function updateStatsBar() {
  const list = currentList();
  const totalChars = list.length;
  const prestigeValues = [];
  let prestigeSum = 0;
  let p100 = 0;

  list.forEach(c => {
    const prest = c.stats.find(s => s.category.trim().toLowerCase().includes('presti'));
    if (prest && prest.value !== null) {
      prestigeValues.push(prest.value);
      prestigeSum += prest.value;
      if (prest.value >= 100) p100++;
    }
  });

  const avgPrestige = prestigeValues.length ? Math.round(prestigeSum / prestigeValues.length) : 0;
  const medPrestige = median(prestigeValues);

  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('stat-chars', totalChars);
  set('stat-avg-prestige', avgPrestige + ' / ' + medPrestige);
  set('stat-p100', p100);
  set('stat-total-prestige', prestigeSum.toLocaleString('en-US'));
  set('stat-mode', currentMode === 'survivors' ? 'SURVIVORS' : 'KILLERS');
}

function renderFooterTotals() {
  const footer = document.getElementById('footer-totals');
  if (!footer) return;
  const list = currentList();
  if (!list.length) {
    footer.innerHTML = '<div class="footer-empty">No data</div>';
    return;
  }

  const order = [];
  const sums = {};
  list.forEach(c => {
    c.stats.forEach(s => {
      const key = s.category;
      if (!(key in sums)) {
        sums[key] = 0;
        order.push(key);
      }
      if (s.value !== null) sums[key] += s.value;
    });
  });

  const visible = footerExpanded ? order : order.slice(0, 4);
  const hasMore = order.length > 4;

  const gridClass = footerExpanded || order.length <= 4 ? 'footer-grid' : 'footer-grid footer-grid-collapsed';
  footer.innerHTML = `
    <div class="${gridClass}">
      ${visible.map(cat => {
        const color = getCategoryColor(cat);
        const icon = SHOW_ICONS ? getCategoryIcon(cat) : null;
        const iconHtml = icon
          ? `<img class="footer-icon" src="${icon}" alt="" onerror="this.style.display='none'">`
          : `<span class="cat-dot" style="background:${color};box-shadow:0 0 6px ${color}"></span>`;
        return `
          <div class="footer-item">
            <div class="footer-cat">${iconHtml}<span>${cat}</span></div>
            <div class="footer-val" style="color:${color}">${sums[cat].toLocaleString('en-US')}</div>
          </div>
        `;
      }).join('')}
    </div>
    ${hasMore ? `<button class="footer-toggle" id="footer-toggle-btn">${footerExpanded ? 'Collapse' : 'Expand (+' + (order.length - 4) + ')'}</button>` : ''}
  `;

  const btn = document.getElementById('footer-toggle-btn');
  if (btn) {
    btn.onclick = () => {
      footerExpanded = !footerExpanded;
      renderFooterTotals();
    };
  }
}

function ensureSideChrome() {
  const side = document.getElementById('split-side');
  let wrap = side.querySelector('.mode-toggle-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'mode-toggle-wrap';
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'mode-toggle-btn';
    toggleBtn.id = 'mode-toggle-btn';
    toggleBtn.onclick = () => switchMode(currentMode === 'killers' ? 'survivors' : 'killers');
    wrap.appendChild(toggleBtn);

    const search = document.createElement('input');
    search.type = 'search';
    search.className = 'char-search';
    search.id = 'char-search';
    search.placeholder = 'Search character...';
    search.autocomplete = 'off';
    search.spellcheck = false;
    search.oninput = () => {
      searchQuery = search.value;
      renderSideItemsOnly();
    };
    wrap.appendChild(search);
    side.insertBefore(wrap, side.firstChild);
  }
  const toggleBtn = document.getElementById('mode-toggle-btn');
  if (toggleBtn) toggleBtn.textContent = currentMode === 'killers' ? '→ SURVIVORS' : '→ KILLERS';
  const search = document.getElementById('char-search');
  if (search && search.value !== searchQuery) search.value = searchQuery;
  return search;
}

function renderSideItemsOnly() {
  const side = document.getElementById('split-side');
  const list = currentList();
  side.querySelectorAll('.split-item, .side-empty').forEach(el => el.remove());

  if (!list.length) {
    const empty = document.createElement('div');
    empty.className = 'side-empty';
    empty.textContent = 'No data';
    side.appendChild(empty);
    return;
  }

  const q = searchQuery.trim().toLowerCase();
  const filtered = q
    ? list.map((c, i) => ({ c, i })).filter(({ c }) => c.name.toLowerCase().includes(q))
    : list.map((c, i) => ({ c, i }));

  if (!filtered.length) {
    const empty = document.createElement('div');
    empty.className = 'side-empty';
    empty.textContent = 'No results';
    side.appendChild(empty);
    return;
  }

  if (selectedIndex >= list.length) selectedIndex = 0;

  filtered.forEach(({ c, i }) => {
    const item = document.createElement('div');
    item.className = 'split-item' + (i === selectedIndex ? ' active' : '');
    item.innerHTML = `
      <img src="${c.image}" alt="${c.name}" loading="lazy"
           onerror="this.src='${PLACEHOLDER_IMG}'">
      <div class="split-item-name">${c.name}</div>
    `;
    item.onclick = () => {
      selectedIndex = i;
      side.querySelectorAll('.split-item').forEach(x => x.classList.remove('active'));
      item.classList.add('active');
      exitDemandMode();
      renderDetail();
    };
    side.appendChild(item);
  });
}

function focusSearch() {
  const search = document.getElementById('char-search');
  if (search) {
    search.focus();
    const len = search.value.length;
    try { search.setSelectionRange(len, len); } catch (e) {}
  }
}

function renderSideList() {
  const side = document.getElementById('split-side');
  ensureSideChrome();
  renderSideItemsOnly();
}


function demandKey(mode, charName, category) {
  return mode + '|' + charName + '|' + category;
}

function loadDemandMap() {
  try {
    const raw = localStorage.getItem(DEMAND_LS_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw);
    return data && typeof data === 'object' ? data : {};
  } catch (e) {
    return {};
  }
}

function saveDemandMap(map) {
  localStorage.setItem(DEMAND_LS_KEY, JSON.stringify(map));
  updateDemandBadge();
}

function getDemandOverride(mode, charName, category) {
  const map = loadDemandMap();
  const key = demandKey(mode, charName, category);
  if (!(key in map)) return null;
  return map[key];
}

function setDemandOverride(mode, charName, category, original, value) {
  const map = loadDemandMap();
  const key = demandKey(mode, charName, category);
  if (value === null || value === '' || Number(value) === Number(original)) {
    delete map[key];
  } else {
    map[key] = { original: Number(original), value: Number(value) };
  }
  saveDemandMap(map);
}

function removeDemandOverride(key) {
  const map = loadDemandMap();
  delete map[key];
  saveDemandMap(map);
}

function listDemandOverrides() {
  const map = loadDemandMap();
  return Object.keys(map).map(key => {
    const parts = key.split('|');
    return {
      key,
      mode: parts[0],
      name: parts[1],
      category: parts.slice(2).join('|'),
      original: map[key].original,
      value: map[key].value
    };
  }).sort((a, b) => a.name.localeCompare(b.name) || a.category.localeCompare(b.category));
}

function updateDemandBadge() {
  const badge = document.getElementById('demand-count-badge');
  if (!badge) return;
  const n = Object.keys(loadDemandMap()).length;
  badge.textContent = n ? String(n) : '';
  badge.style.display = n ? 'inline-block' : 'none';
}

function setDemandMode(on) {
  demandMode = !!on;
  const btn = document.getElementById('demand-toggle-btn');
  if (btn) btn.classList.toggle('active', demandMode);
  renderDetail();
}

function exitDemandMode() {
  if (!demandMode) return;
  setDemandMode(false);
}

function openDemandModal() {
  const overlay = document.getElementById('demand-modal-overlay');
  if (!overlay) return;
  renderDemandModalList();
  overlay.classList.remove('hidden');
}

function closeDemandModal() {
  const overlay = document.getElementById('demand-modal-overlay');
  if (overlay) overlay.classList.add('hidden');
}

function renderDemandModalList() {
  const body = document.getElementById('demand-modal-body');
  if (!body) return;
  const items = listDemandOverrides();
  if (!items.length) {
    body.innerHTML = '<div class="demand-empty">No demand changes</div>';
    return;
  }
  body.innerHTML = items.map(it => `
    <div class="demand-change">
      <div class="demand-change-text">
        <b>${it.name}</b> · ${it.category}<br>
        <span class="from">${it.original}</span> → <span class="to">${it.value}</span>
        <span style="color:#666;font-size:0.75rem"> (${it.mode})</span>
      </div>
      <button class="demand-change-x" data-key="${it.key.replace(/"/g, '&quot;')}" title="Remove">×</button>
    </div>
  `).join('');
  body.querySelectorAll('.demand-change-x').forEach(btn => {
    btn.onclick = () => {
      removeDemandOverride(btn.getAttribute('data-key'));
      renderDemandModalList();
      if (demandMode) renderDetail();
    };
  });
}


function renderDetail() {
  const detail = document.getElementById('split-detail');
  const list = currentList();
  if (!list.length) {
    detail.innerHTML = '<div class="split-empty">NO DATA</div>';
    return;
  }
  const c = list[selectedIndex] || list[0];
  const roleLabel = currentMode === 'survivors' ? 'SURVIVOR' : 'KILLER';
  const visibleStats = c.stats.filter(s => s.value !== null);

  detail.innerHTML = `
    <div class="split-dhead">
      <div class="split-dport">
        <img src="${c.image}" alt="${c.name}" loading="lazy"
             onerror="this.src='${PLACEHOLDER_IMG}'">
        <div class="port-ring"></div>
      </div>
      <div class="split-dmeta">
        <div class="split-drole">${roleLabel}</div>
        <div class="split-dname">${c.name}</div>
        <div class="split-dpills">
          <span class="pill"><b>${visibleStats.length}</b> categories</span>
        </div>
      </div>
    </div>
    <div class="split-streaks">
      ${visibleStats.map(s => {
        const color = getCategoryColor(s.category);
        const original = s.value;
        const override = getDemandOverride(currentMode, c.name, s.category);
        const effective = demandMode && override ? override.value : original;
        const displayStat = { category: s.category, value: effective, display: String(effective) };
        const pct = barPercent(displayStat);
        const iconHtml = categoryIconHtml(s.category, effective, color);
        const valueHtml = demandMode
          ? `<input class="demand-input${override ? ' overridden' : ''}" type="number" inputmode="numeric"
               data-char="${c.name.replace(/"/g, '&quot;')}" data-cat="${s.category.replace(/"/g, '&quot;')}" data-original="${original}"
               value="${override ? override.value : original}" placeholder="${original}">`
          : `<div class="split-val" style="color:${color}">${s.display}</div>`;
        if (SHOW_ICONS) {
          return `
          <div class="split-row has-icon">
            <div class="split-icon-slot">${iconHtml}</div>
            <div class="split-row-left">
              <div class="split-cat"><span class="cat-label">${s.category}</span></div>
              <div class="split-bar">
                <div class="split-fill" style="width:${pct}%;background:linear-gradient(90deg,${color},${color}aa)"></div>
              </div>
            </div>
            ${valueHtml}
          </div>`;
        }
        return `
          <div class="split-row">
            <div class="split-row-left">
              <div class="split-cat">
                ${iconHtml}
                <span class="cat-label">${s.category}</span>
              </div>
              <div class="split-bar">
                <div class="split-fill" style="width:${pct}%;background:linear-gradient(90deg,${color},${color}aa)"></div>
              </div>
            </div>
            ${valueHtml}
          </div>
        `;
      }).join('')}
    </div>
  `;

  if (demandMode) {
    detail.querySelectorAll('.demand-input').forEach(inp => {
      const save = () => {
        const charName = inp.getAttribute('data-char');
        const cat = inp.getAttribute('data-cat');
        const original = Number(inp.getAttribute('data-original'));
        const raw = inp.value.trim();
        if (raw === '') {
          setDemandOverride(currentMode, charName, cat, original, null);
          inp.classList.remove('overridden');
          if (cat.toLowerCase().includes('presti')) renderDetail();
          return;
        }
        const num = parseInt(raw, 10);
        if (isNaN(num)) return;
        setDemandOverride(currentMode, charName, cat, original, num);
        inp.classList.toggle('overridden', num !== original);
        if (cat.toLowerCase().includes('presti')) renderDetail();
      };
      inp.addEventListener('change', save);
      inp.addEventListener('blur', save);
    });
  }
}

function renderAll() {
  document.body.className = 'mode-' + currentMode + (SHOW_ICONS ? ' show-icons' : '');
  const list = currentList();
  computeRoleScales(list);
  updateStatsBar();
  renderSideList();
  renderDetail();
  renderFooterTotals();
  requestAnimationFrame(() => focusSearch());
}

function switchMode(mode) {
  currentMode = mode;
  selectedIndex = 0;
  searchQuery = '';
  footerExpanded = false;
  demandMode = false;
  const btn = document.getElementById('demand-toggle-btn');
  if (btn) btn.classList.remove('active');
  renderAll();
}

async function refreshData() {
  const detail = document.getElementById('split-detail');
  const side = document.getElementById('split-side');
  if (detail) detail.innerHTML = '<div class="split-empty">Loading...</div>';
  if (side) side.innerHTML = '';
  const footer = document.getElementById('footer-totals');
  if (footer) footer.innerHTML = '';

  try {
    await loadAll();
    selectedIndex = 0;
    searchQuery = '';
    footerExpanded = false;
    demandMode = false;
    const btn = document.getElementById('demand-toggle-btn');
    if (btn) btn.classList.remove('active');
    renderAll();
    updateDemandBadge();
  } catch (err) {
    if (detail) detail.innerHTML = `<div class="split-empty error">Error: ${err.message}</div>`;
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', refreshData);
window.refreshData = refreshData;
window.switchMode = switchMode;
window.toggleDemandMode = function () { setDemandMode(!demandMode); };
window.openDemandModal = openDemandModal;
window.closeDemandModal = closeDemandModal;
document.addEventListener('DOMContentLoaded', () => {
  updateDemandBadge();
  const overlay = document.getElementById('demand-modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeDemandModal();
    });
  }
});
