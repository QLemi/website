const SHEET_ID = STREAKI_CONFIG.SHEET_ID;
const SHEET_MAIN_GID = STREAKI_CONFIG.SHEET_MAIN_GID;
const SHEET_INNE_GID = STREAKI_CONFIG.SHEET_INNE_GID;
const PORTRAIT_MAP = STREAKI_CONFIG.PORTRAIT_MAP;
const PLACEHOLDER_IMG = STREAKI_CONFIG.PLACEHOLDER_IMG;
const TAG_LABELS = STREAKI_CONFIG.TAG_LABELS || { K: 'Killer', S: 'Survivor', O: 'Both', P: 'Playthrough' };

let currentView = STREAKI_CONFIG.DEFAULT_VIEW || 'default';
let cachedCharacters = null;
let enabledTags = { K: true, S: true, O: true, P: false };
let minStreakOnly = true;
let searchQuery = '';

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

function parseTags(raw) {
  const up = (raw || '').toUpperCase();
  const tags = [];
  const seen = new Set();
  for (let i = 0; i < up.length; i++) {
    const ch = up[i];
    if ((ch === 'K' || ch === 'S' || ch === 'O' || ch === 'P') && !seen.has(ch)) {
      seen.add(ch);
      tags.push(ch);
    }
  }
  return tags;
}

function typeFromTags(tags) {
  if (!tags || !tags.length) return 'killer';
  const first = tags[0];
  if (first === 'S') return 'survivor';
  if (first === 'O') return 'other';
  if (first === 'P') return 'playthrough';
  return 'killer';
}

function mergeTagsOrdered(streaks) {
  const seen = new Set();
  const out = [];
  streaks.forEach(s => {
    (s.tags || []).forEach(t => {
      if (!seen.has(t)) { seen.add(t); out.push(t); }
    });
  });
  return out;
}

function roleLabel(type) {
  if (type === 'survivor') return 'Survivor';
  if (type === 'other') return 'Both';
  if (type === 'playthrough') return 'Playthrough';
  return 'Killer';
}

function tagsHtml(tags) {
  return (tags || []).map(t =>
    `<span class="tag-chip tag-${t}">${TAG_LABELS[t] || t}</span>`
  ).join('');
}

async function loadSheet(gid, mode) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load sheet gid=${gid} (HTTP ${response.status})`);
  }

  const rows = parseCSV(await response.text());
  if (rows.length < 2) return [];

  let headerRowIndex = -1;
  for (let i = 0; i < Math.min(rows.length, 15); i++) {
    const names = rows[i].filter(c => c && c.trim().length > 2);
    if (names.length >= 2) {
      headerRowIndex = i;
      break;
    }
  }
  if (headerRowIndex === -1) return [];

  const header = rows[headerRowIndex];
  const dataStart = headerRowIndex + 1;
  const step = mode === 'inne' ? 4 : 3;

  const positions = [];
  for (let col = 0; col < header.length; col++) {
    const name = (header[col] || '').trim();
    if (name) positions.push({ col, name });
  }

  const characters = [];

  for (const { col, name } of positions) {
    const streaks = [];

    for (let r = dataStart; r < rows.length; r++) {
      const row = rows[r];
      while (row.length <= col + step) row.push('');

      let category, valueRaw, checkRaw, tags;

      if (mode === 'inne') {
        tags = parseTags(row[col]);
        const wincon = (row[col + 1] || '').trim();
        category = wincon || name;
        valueRaw = (row[col + 2] || '').trim();
        checkRaw = (row[col + 3] || '').trim().toUpperCase();
        if (!tags.length) tags = ['S'];
      } else {
        tags = ['K'];
        category = (row[col] || '').trim();
        valueRaw = (row[col + 1] || '').trim();
        checkRaw = (row[col + 2] || '').trim().toUpperCase();
      }

      if (!valueRaw) continue;

      const value = parseInt(valueRaw, 10);
      if (isNaN(value)) continue;

      const isFinished = (checkRaw === 'TRUE' || checkRaw === 'CHECKED' || checkRaw === '\u2713' || checkRaw === 'YES');
      const active = !isFinished;

      streaks.push({
        category: category || 'Streak',
        value,
        active,
        tags
      });
    }

    if (streaks.length > 0) {
      const charTags = mode === 'inne' ? mergeTagsOrdered(streaks) : ['K'];
      const type = typeFromTags(charTags);
      characters.push({
        image: PORTRAIT_MAP[name] || '',
        name,
        type,
        tags: charTags,
        streaks
      });
    }
  }

  return characters;
}

async function loadCharactersFromSheet() {
  const [main, inne] = await Promise.all([
    loadSheet(SHEET_MAIN_GID, 'main'),
    loadSheet(SHEET_INNE_GID, 'inne')
  ]);
  return [...main, ...inne];
}

function prepareCharacters(characters) {
  characters.forEach(c => {
    c.best = Math.max(...c.streaks.map(s => s.value));
    c.streaks.sort((a, b) => b.value - a.value);
  });
  characters.sort((a, b) => b.best - a.best);
  return characters;
}

function filterCharacters(characters) {
  const q = searchQuery.trim().toLowerCase();
  return characters.map(c => {
    const nameMatch = !q || c.name.toLowerCase().includes(q);
    const streaks = c.streaks.filter(s => {
      const tags = (s.tags && s.tags.length) ? s.tags : ['K'];
      if (!tags.some(t => enabledTags[t])) return false;
      if (minStreakOnly && s.value < 10) return false;
      if (nameMatch) return true;
      return s.category.toLowerCase().includes(q);
    });
    if (!streaks.length) return null;
    const best = Math.max(...streaks.map(s => s.value));
    return Object.assign({}, c, { streaks, best });
  }).filter(Boolean);
}

function updateStats(characters) {
  const totalStreaks = characters.reduce((sum, c) => sum + c.streaks.length, 0);
  const activeCount = characters.reduce((sum, c) => sum + c.streaks.filter(s => s.active).length, 0);

  const elChars = document.getElementById('total-characters');
  const elStreaks = document.getElementById('total-streaks');
  const elBest = document.getElementById('best-streak');
  const elActive = document.getElementById('active-count');

  if (elChars) elChars.textContent = characters.length;
  if (elStreaks) elStreaks.textContent = totalStreaks;
  if (elBest) elBest.textContent = characters.length ? characters[0].best : 0;
  if (elActive) elActive.textContent = activeCount;
}

function pctOfBest(val, best) {
  if (!best || best <= 0) return 0;
  return Math.min(100, Math.round((val / best) * 100));
}

function typeClass(type) {
  if (type === 'survivor') return ' survivor';
  if (type === 'other') return ' other';
  if (type === 'playthrough') return ' playthrough';
  return '';
}

function renderDefault(characters) {
  const grid = document.getElementById('streak-grid');
  grid.className = 'grid view-default';
  grid.innerHTML = '';

  characters.forEach((c, i) => {
    const card = document.createElement('article');
    card.className = 'card' + typeClass(c.type);
    card.style.animationDelay = `${i * 0.05}s`;

    const streaksHtml = c.streaks.map((s, idx) => `
      <div class="streak-row ${s.active ? 'active' : ''}">
        <div class="streak-left">
          ${s.active ? '<span class="active-badge">ACTIVE</span>' : ''}
          <span class="streak-category" data-full="${s.category}">${s.category}</span>
        </div>
        <span class="streak-value ${idx === 0 || s.active ? 'highlight' : ''}">${s.value}</span>
      </div>
    `).join('');

    card.innerHTML = `
      <span class="card-corner tl"></span>
      <span class="card-corner tr"></span>
      <span class="card-corner bl"></span>
      <span class="card-corner br"></span>
      <div class="card-top">
        <div class="portrait">
          <img src="${c.image}" alt="${c.name}" loading="lazy"
               onerror="this.src='${PLACEHOLDER_IMG}'">
        </div>
        <div class="card-info">
          <div class="killer-name">${c.name}</div>
          <div class="card-tags">${tagsHtml(c.tags || [])}</div>
        </div>
        <div class="best-badge">
          <div class="best-label">Best</div>
          <div class="best-value">${c.best}</div>
        </div>
      </div>
      <div class="streaks-list">${streaksHtml}</div>
    `;
    grid.appendChild(card);
  });
}

function renderNeon(characters) {
  const grid = document.getElementById('streak-grid');
  grid.className = 'grid view-neon';
  grid.innerHTML = '';

  characters.forEach((c, i) => {
    const hasActive = c.streaks.some(s => s.active);
    const card = document.createElement('article');
    card.className = 'neon-card' + typeClass(c.type) + (hasActive ? ' has-active' : '');
    card.style.animationDelay = `${i * 0.04}s`;

    const circ = 2 * Math.PI * 28;

    card.innerHTML = `
      <div class="neon-head">
        <div class="neon-ring">
          <svg viewBox="0 0 72 72">
            <circle class="track" cx="36" cy="36" r="28"/>
            <circle class="progress" cx="36" cy="36" r="28"
              stroke-dasharray="${circ}" stroke-dashoffset="0"/>
          </svg>
          <div class="neon-img">
            <img src="${c.image}" alt="${c.name}" loading="lazy"
                 onerror="this.src='${PLACEHOLDER_IMG}'">
          </div>
        </div>
        <div class="neon-meta">
          <div class="neon-name">${c.name}</div>
          <div class="neon-type">${roleLabel(c.type).toUpperCase()}</div>
        </div>
        <div class="neon-best">
          <div class="neon-best-num">${c.best}</div>
          <div class="neon-best-lab">BEST</div>
        </div>
      </div>
      <div class="neon-streaks">
        ${c.streaks.map((s, idx) => `
          <div class="neon-node ${s.active ? 'active' : ''} ${idx === 0 ? 'best' : ''}">
            <div class="neon-dot">${idx + 1}</div>
            <div class="neon-body">
              <div class="neon-cat">${s.category}</div>
              <div class="neon-bar"><div class="neon-fill" style="width:${pctOfBest(s.value, c.best)}%"></div></div>
            </div>
            <div class="neon-val">${s.value}</div>
          </div>
        `).join('')}
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderTimeline(characters) {
  const grid = document.getElementById('streak-grid');
  grid.className = 'grid view-timeline';
  grid.innerHTML = '';

  characters.forEach((c, i) => {
    const block = document.createElement('div');
    block.className = 'tl-block' + typeClass(c.type);
    block.style.animationDelay = `${i * 0.05}s`;

    block.innerHTML = `
      <div class="tl-side">
        <div class="tl-portrait">
          <img src="${c.image}" alt="${c.name}" loading="lazy"
               onerror="this.src='${PLACEHOLDER_IMG}'">
        </div>
        <div class="tl-name">${c.name}</div>
        <div class="tl-type">${roleLabel(c.type).toUpperCase()}</div>
        <div class="tl-best">${c.best}<span>BEST</span></div>
      </div>
      <div class="tl-col">
        ${c.streaks.map(s => `
          <div class="tl-row ${s.active ? 'active' : ''}">
            <div>
              <div class="tl-cat">${s.category}</div>
              <div class="tl-meta">${s.active ? '<span class="tl-pill">ACTIVE</span>' : ''}</div>
              <div class="tl-bar"><div class="tl-fill" style="width:${pctOfBest(s.value, c.best)}%"></div></div>
            </div>
            <div class="tl-val">${s.value}</div>
          </div>
        `).join('')}
      </div>
    `;
    grid.appendChild(block);
  });
}

function renderSplit(characters) {
  const grid = document.getElementById('streak-grid');
  grid.className = 'grid view-split';
  grid.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'split-wrap';

  const side = document.createElement('div');
  side.className = 'split-side';
  side.id = 'split-side';

  const detail = document.createElement('div');
  detail.className = 'split-detail';
  detail.id = 'split-detail';
  detail.innerHTML = '<div class="split-empty">SELECT A CHARACTER</div>';

  characters.forEach((c, i) => {
    const item = document.createElement('div');
    item.className = 'split-item' + (c.streaks.some(s => s.active) ? ' has-active' : '') + (i === 0 ? ' active' : '') + typeClass(c.type);
    item.innerHTML = `
      <img src="${c.image}" alt="${c.name}" loading="lazy"
           onerror="this.src='${PLACEHOLDER_IMG}'">
      <div class="split-item-name">${c.name}</div>
      <div class="split-item-best">${c.best}</div>
    `;
    item.onclick = () => {
      side.querySelectorAll('.split-item').forEach(x => x.classList.remove('active'));
      item.classList.add('active');
      showSplitDetail(c, detail);
    };
    side.appendChild(item);
  });

  wrap.appendChild(side);
  wrap.appendChild(detail);
  grid.appendChild(wrap);

  if (characters.length) showSplitDetail(characters[0], detail);
}

function showSplitDetail(c, detail) {
  detail.innerHTML = `
    <div class="split-dhead">
      <div class="split-dport">
        <img src="${c.image}" alt="${c.name}" loading="lazy"
             onerror="this.src='${PLACEHOLDER_IMG}'">
      </div>
      <div>
        <div class="split-dname">${c.name}</div>
        <div class="card-tags">${tagsHtml(c.tags || [])}</div>
        <div class="split-dbest">${c.best}<span>BEST STREAK</span></div>
      </div>
    </div>
    <div class="split-streaks">
      ${c.streaks.map(s => `
        <div class="split-row ${s.active ? 'active' : ''}">
          <div>
            <div class="split-cat">${s.category}${s.active ? '<span class="split-pill">ACTIVE</span>' : ''}</div>
            <div class="split-bar"><div class="split-fill" style="width:${pctOfBest(s.value, c.best)}%"></div></div>
          </div>
          <div class="split-val">${s.value}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderLanes(characters) {
  const grid = document.getElementById('streak-grid');
  grid.className = 'grid view-lanes';
  grid.innerHTML = '';

  characters.forEach((c, i) => {
    const lane = document.createElement('div');
    lane.className = 'lane' + typeClass(c.type);
    lane.style.animationDelay = `${i * 0.05}s`;

    lane.innerHTML = `
      <div class="lane-head">
        <img src="${c.image}" alt="${c.name}" loading="lazy"
             onerror="this.src='${PLACEHOLDER_IMG}'">
        <div>
          <div class="lane-name">${c.name}</div>
          <div class="lane-type">${roleLabel(c.type).toUpperCase()}</div>
        </div>
        <div class="lane-best">${c.best}</div>
      </div>
      <div class="lane-track">
        ${c.streaks.map(s => `
          <div class="lane-chip ${s.active ? 'active' : ''}">
            <div class="lane-chip-cat">${s.category}</div>
            <div class="lane-chip-val">${s.value}</div>
            <div class="lane-chip-bar"><div class="lane-chip-fill" style="width:${pctOfBest(s.value, c.best)}%"></div></div>
          </div>
        `).join('')}
      </div>
    `;
    grid.appendChild(lane);
  });
}

function getVisibleCharacters() {
  if (!cachedCharacters) return [];
  const prepared = prepareCharacters(cachedCharacters.map(c => Object.assign({}, c, { streaks: c.streaks.slice() })));
  return filterCharacters(prepared);
}

function renderCharacters(characters) {
  if (characters) {
    cachedCharacters = characters;
  }
  const visible = getVisibleCharacters();
  updateStats(visible);

  if (currentView === 'neon') renderNeon(visible);
  else if (currentView === 'timeline') renderTimeline(visible);
  else if (currentView === 'split') renderSplit(visible);
  else if (currentView === 'lanes') renderLanes(visible);
  else renderDefault(visible);

  const sel = document.getElementById('view-select');
  if (sel) sel.value = currentView;

  document.body.className = 'view-' + currentView;
  updateFilterButtons();
}

function switchView(view) {
  currentView = view;
  renderCharacters();
}

function toggleTag(tag) {
  enabledTags[tag] = !enabledTags[tag];
  renderCharacters();
}

function toggleMinStreak() {
  minStreakOnly = !minStreakOnly;
  renderCharacters();
}

function updateFilterButtons() {
  document.querySelectorAll('.tag-filter[data-tag]').forEach(btn => {
    const tg = btn.dataset.tag;
    btn.classList.toggle('active', !!enabledTags[tg]);
  });
  const minBtn = document.getElementById('min-streak-filter');
  if (minBtn) minBtn.classList.toggle('active', minStreakOnly);
}

function setSearch(q) {
  searchQuery = q || '';
  renderCharacters();
}

async function refreshData() {
  const grid = document.getElementById('streak-grid');
  if (grid) {
    grid.innerHTML = '<p class="loading-msg">Loading data from Google Sheets...</p>';
  }

  try {
    const characters = await loadCharactersFromSheet();
    renderCharacters(characters);
  } catch (err) {
    if (grid) {
      grid.innerHTML = `<p class="error-msg">Error: ${err.message}</p>`;
    }
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sel = document.getElementById('view-select');
  if (sel) {
    sel.addEventListener('change', () => switchView(sel.value));
  }
  document.querySelectorAll('.tag-filter[data-tag]').forEach(btn => {
    btn.addEventListener('click', () => toggleTag(btn.dataset.tag));
  });
  const minBtn = document.getElementById('min-streak-filter');
  if (minBtn) minBtn.addEventListener('click', toggleMinStreak);
  const search = document.getElementById('streak-search');
  if (search) {
    search.addEventListener('input', () => setSearch(search.value));
  }
  refreshData();
});

window.refreshData = refreshData;
window.switchView = switchView;
window.toggleTag = toggleTag;
window.toggleMinStreak = toggleMinStreak;
