const SHEET_ID = STREAKI_CONFIG.SHEET_ID;
const SHEET_MAIN_GID = STREAKI_CONFIG.SHEET_MAIN_GID;
const SHEET_INNE_GID = STREAKI_CONFIG.SHEET_INNE_GID;
const SHEET_PLAY_GID = STREAKI_CONFIG.SHEET_PLAY_GID || '821403985';
const PORTRAIT_MAP = STREAKI_CONFIG.PORTRAIT_MAP;
const PLACEHOLDER_IMG = STREAKI_CONFIG.PLACEHOLDER_IMG;
const TAG_LABELS = STREAKI_CONFIG.TAG_LABELS || { K: 'Killer', S: 'Survivor', O: 'Both', P: 'Playthrough' };

let currentView = STREAKI_CONFIG.DEFAULT_VIEW || 'default';
let cachedCharacters = null;
let enabledTags = { K: true, S: true, O: true, P: false };
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
    `<span class="role-tag tag-${t}">${TAG_LABELS[t] || t}</span>`
  ).join('');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

async function loadSheet(gid, mode) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load sheet gid=${gid} (HTTP ${response.status})`);

  const rows = parseCSV(await response.text());
  if (rows.length < 2) return [];

  let headerRowIndex = -1;
  for (let i = 0; i < Math.min(rows.length, 15); i++) {
    const names = rows[i].filter(c => c && c.trim().length > 2);
    if (names.length >= 2) { headerRowIndex = i; break; }
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
      streaks.push({ category: category || 'Streak', value, active: !isFinished, tags });
    }

    if (streaks.length > 0) {
      const charTags = mode === 'inne' ? mergeTagsOrdered(streaks) : ['K'];
      characters.push({
        image: PORTRAIT_MAP[name] || '',
        name,
        type: typeFromTags(charTags),
        tags: charTags,
        streaks
      });
    }
  }
  return characters;
}


async function loadPlaythroughSheet() {
  if (!SHEET_PLAY_GID) return [];
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_PLAY_GID}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.warn('Playthrough sheet failed', response.status);
    return [];
  }
  const rows = parseCSV(await response.text());
  if (!rows.length) return [];

  const cell = (r, c) => {
    if (r < 0 || r >= rows.length) return '';
    const row = rows[r] || [];
    return (row[c] || '').trim();
  };
  const isDone = () => false;
  const num = (v) => {
    const n = parseFloat(String(v || '').replace(',', '.'));
    return isNaN(n) ? 0 : n;
  };

  /**
   * Layout (Excel 1-based → 0-based):
   *   Boxes grow RIGHT: cols B-C (1-2), D-E (3-4), F-G (5-6), ...
   *   Row 6  name
   *   Row 7  type
   *   Row 8  games
   *   Row 9  4k
   *   Row 10 3k
   *   Row 11 2k
   *   Row 12 1k
   *   Row 13 0k
   *   Row 14 note/patch
   *   Row 15+  value in box col | caption in box col+1  (dates, numbers + labels)
   * Column A is only human labels — ignored by parser.
   */
  const out = [];
  const maxCols = Math.max(0, ...rows.map(r => r.length));

  for (let col = 1; col < maxCols; col += 2) {
    const name = cell(5, col);
    if (!name) continue;

    const fields = {
      type: cell(6, col),
      games: cell(7, col),
      k4: cell(8, col),
      k3: cell(9, col),
      k2: cell(10, col),
      k1: cell(11, col),
      k0: cell(12, col),
      note: cell(13, col),
      noteDate: cell(13, col + 1)  // C14 / E14 / … date next to Note
    };

    // Notes from row 15 (idx 14) down: [value, caption] pairs
    const notes = [];
    for (let r = 14; r < rows.length; r++) {
      const value = cell(r, col);
      const caption = cell(r, col + 1);
      if (!value && !caption) {
        // end this box notes if both empty (allow single gap)
        const nVal = cell(r + 1, col);
        const nCap = cell(r + 1, col + 1);
        if (!nVal && !nCap) break;
        continue;
      }
      notes.push({
        kind: 'note',
        date: value,
        title: '',
        note: caption || value,
        text: caption || value,
        value,
        caption
      });
    }

    out.push(buildPlayEntry(name, fields, [], notes, isDone, num));
  }

  return out;
}

function buildPlayEntry(name, fields, extras, details, isDone, num) {
  const typeRaw = normSafe(fields.type);
  let playType = 'challenge';
  if (typeRaw === 'session' || typeRaw === 'sesja' || typeRaw === 'log') playType = 'session';
  if (typeRaw === 'survivor' || typeRaw === 'surv' || typeRaw === 'surw') playType = 'survivor';

  const finished = isDone(fields.done);
  let g = num(fields.games);
  let a4 = num(fields.k4), a3 = num(fields.k3), a2 = num(fields.k2), a1 = num(fields.k1), a0 = num(fields.k0);
  let avg = num(fields.avg);
  const note = (fields.note || '').trim();
  const noteDate = (fields.noteDate || '').trim();

  // Survivor: row 4k slot = Escape, 3k slot = Death
  const isSurv = playType === 'survivor';
  const escapes = isSurv ? a4 : 0;
  const deaths = isSurv ? a3 : 0;

  const sortVal = isSurv ? (escapes || g) : (a4 || g || details.length);
  return {
    image: '',
    name,
    type: 'playthrough',
    playType,
    tags: ['P'],
    play: {
      playType,
      finished,
      active: !finished,
      games: g,
      k4: isSurv ? 0 : a4,
      k3: isSurv ? 0 : a3,
      k2: isSurv ? 0 : a2,
      k1: isSurv ? 0 : a1,
      k0: isSurv ? 0 : a0,
      escapes,
      deaths,
      avg,
      note,
      noteDate,
      extras: extras || [],
      details
    },
    streaks: [{ category: note || playType, value: sortVal, active: !finished, tags: ['P'] }],
    best: sortVal
  };
}

function normSafe(s) {
  return (s || '').trim().toLowerCase();
}

async function loadCharactersFromSheet() {
  const [main, inne, play] = await Promise.all([
    loadSheet(SHEET_MAIN_GID, 'main'),
    loadSheet(SHEET_INNE_GID, 'inne'),
    loadPlaythroughSheet()
  ]);
  // Drop old P-tagged entries from inne if dedicated play sheet has data
  let inneFiltered = inne;
  if (play.length) {
    inneFiltered = inne.filter(c => !(c.tags && c.tags.length === 1 && c.tags[0] === 'P'));
  }
  return [...main, ...inneFiltered, ...play];
}

/**
 * Group attempts by wincon (category).
 * - best / bestAttempt
 * - activeAttempt: ongoing run that is NOT the best (lower than top)
 * - isBestActive: the best itself is still in progress
 * - attempts: all sorted by value desc
 */
function groupStreaksByCategory(streaks) {
  const map = new Map();
  for (const s of streaks) {
    const key = (s.category || '').trim().toLowerCase();
    if (!key) continue;
    if (!map.has(key)) {
      map.set(key, { category: s.category, attempts: [], tags: s.tags || [] });
    }
    const g = map.get(key);
    g.attempts.push(Object.assign({}, s));
    (s.tags || []).forEach(t => { if (!g.tags.includes(t)) g.tags.push(t); });
  }

  const groups = [];
  for (const g of map.values()) {
    g.attempts.sort((a, b) => b.value - a.value);
    g.best = g.attempts[0].value;
    g.bestAttempt = g.attempts[0];
    g.isBestActive = !!(g.bestAttempt && g.bestAttempt.active);

    const lowerActives = g.attempts.filter(a => a.active && a.value < g.best);
    if (lowerActives.length) {
      lowerActives.sort((a, b) => b.value - a.value);
      g.activeAttempt = lowerActives[0];
    } else {
      g.activeAttempt = null;
    }

    g.hasHistory = g.attempts.length > 1;
    g.attemptCount = g.attempts.length;
    groups.push(g);
  }
  groups.sort((a, b) => b.best - a.best);
  return groups;
}

function prepareCharacters(characters) {
  characters.forEach(c => {
    if (c.play) {
      c.groups = groupStreaksByCategory(c.streaks || []);
      c.best = c.best || (c.groups[0] && c.groups[0].best) || 0;
      return;
    }
    c.groups = groupStreaksByCategory(c.streaks);
    c.best = c.groups.length ? c.groups[0].best : 0;
  });
  characters.sort((a, b) => b.best - a.best);
  return characters;
}

function filterCharacters(characters) {
  const q = searchQuery.trim().toLowerCase();
  return characters.map(c => {
    const nameMatch = !q || c.name.toLowerCase().includes(q);
    const filteredStreaks = c.streaks.filter(s => {
      const tags = (s.tags && s.tags.length) ? s.tags : ['K'];
      if (!tags.some(t => enabledTags[t])) return false;
      if (nameMatch) return true;
      return s.category.toLowerCase().includes(q);
    });
    if (!filteredStreaks.length) return null;
    const groups = groupStreaksByCategory(filteredStreaks);
    if (!groups.length) return null;
    return Object.assign({}, c, { streaks: filteredStreaks, groups, best: groups[0].best });
  }).filter(Boolean);
}

function updateStats(characters) {
  const totalGroups = characters.reduce((sum, c) => sum + (c.groups ? c.groups.length : 0), 0);
  const activeCount = characters.reduce((sum, c) => {
    if (!c.groups) return sum;
    return sum + c.groups.filter(g => g.isBestActive || g.activeAttempt).length;
  }, 0);

  const elChars = document.getElementById('total-characters');
  const elStreaks = document.getElementById('total-streaks');
  const elBest = document.getElementById('best-streak');
  const elActive = document.getElementById('active-count');
  if (elChars) elChars.textContent = characters.length;
  if (elStreaks) elStreaks.textContent = totalGroups;
  if (elBest) elBest.textContent = characters.length ? characters[0].best : 0;
  if (elActive) elActive.textContent = activeCount;
}

/* ---------- WINCON ROW (modern compact) ---------- */
function renderWinconBlock(g, idx, charBest, type) {
  const isActive = g.isBestActive;
  const hasCurrent = !!g.activeAttempt;
  const hasHistory = g.hasHistory;
  const pct = pctOfBest(g.best, charBest);
  const role = typeClass(type).trim() || 'killer';

  const mainBadge = isActive
    ? '<span class="wc-badge active">ACTIVE</span>'
    : '';

  const expandBtn = hasHistory
    ? `<button type="button" class="wc-expand" aria-expanded="false" title="Show all attempts">
         <span class="wc-expand-ico" aria-hidden="true"></span>
         <span class="wc-expand-count">${g.attemptCount}</span>
       </button>`
    : '';

  const currentLine = hasCurrent ? `
    <div class="wc-current">
      <span class="wc-badge active subtle">ACTIVE</span>
      <span class="wc-current-val">${g.activeAttempt.value}</span>
    </div>` : '';

  let historyPanel = '';
  if (hasHistory) {
    historyPanel = `
      <div class="wc-history" hidden>
        ${g.attempts.map((a, i) => `
          <div class="wc-hist-row ${a.active ? 'is-active' : ''} ${i === 0 ? 'is-top' : ''}">
            <span class="wc-hist-rank">${i === 0 ? '★' : (i + 1)}</span>
            <span class="wc-hist-bar"><span class="wc-hist-bar-fill" style="width:${pctOfBest(a.value, g.best)}%"></span></span>
            <span class="wc-hist-val">${a.value}</span>
            <span class="wc-hist-state ${a.active ? 'is-active' : (i === 0 ? 'is-best' : 'is-done')}">${a.active ? 'ACTIVE' : (i === 0 ? 'BEST' : 'DONE')}</span>
          </div>
        `).join('')}
      </div>`;
  }

  return `
    <div class="wc-block role-${role} ${isActive ? 'is-active' : ''} ${hasCurrent ? 'has-current' : ''}">
      <div class="wc-progress" title="${pct}% of character best">
        <div class="wc-progress-fill ${isActive ? 'active' : ''}" style="width:${pct}%"></div>
      </div>
      <div class="wc-main">
        <div class="wc-left">
          ${mainBadge}
          <span class="wc-name" title="${escapeHtml(g.category)}">${escapeHtml(g.category)}</span>
          ${expandBtn}
        </div>
        <div class="wc-right">
          <span class="wc-val ${idx === 0 || isActive ? 'top' : ''}">${g.best}</span>
        </div>
      </div>
      ${currentLine}
      ${historyPanel}
    </div>`;
}

function bindExpanders(root) {
  root.querySelectorAll('.wc-expand').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const block = btn.closest('.wc-block');
      if (!block) return;
      const panel = block.querySelector('.wc-history');
      if (!panel) return;
      const open = panel.hasAttribute('hidden');
      if (open) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.classList.toggle('open', open);
    });
  });
}

/* ---------- DEFAULT VIEW ---------- */

function parseResultTone(result) {
  const m = String(result || '').toLowerCase().match(/(\d)\s*k/);
  if (!m) return 'neutral';
  const k = parseInt(m[1], 10);
  if (k >= 4) return 'great';
  if (k === 3) return 'good';
  if (k === 2) return 'ok';
  if (k === 1) return 'bad';
  return 'fail';
}


function parsePlayDate(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  // DD.MM.YYYY or DD.MM.YY or DD.MM
  let m = s.match(/^(\d{1,2})[./-](\d{1,2})(?:[./-](\d{2,4}))?$/);
  if (m) {
    let d = parseInt(m[1], 10), mo = parseInt(m[2], 10) - 1, y = m[3] ? parseInt(m[3], 10) : null;
    if (y === null) y = new Date().getFullYear();
    else if (y < 100) y += 2000;
    const dt = new Date(y, mo, d);
    return isNaN(dt.getTime()) ? null : dt;
  }
  // YYYY-MM-DD
  m = s.match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/);
  if (m) {
    const dt = new Date(parseInt(m[1],10), parseInt(m[2],10)-1, parseInt(m[3],10));
    return isNaN(dt.getTime()) ? null : dt;
  }
  const t = Date.parse(s);
  return isNaN(t) ? null : new Date(t);
}

function formatTimeAgo(date) {
  if (!date) return '';
  const now = new Date();
  // compare calendar days roughly
  const ms = now.getTime() - date.getTime();
  if (ms < 0) return 'w przyszłości';
  const days = Math.floor(ms / 86400000);
  if (days === 0) return 'dziś';
  if (days === 1) return '1 dzień temu';
  if (days < 7) return days + ' dni temu';
  const weeks = Math.floor(days / 7);
  if (days < 30) {
    if (weeks === 1) return '1 tydzień temu';
    return weeks + ' tyg. temu';
  }
  const months = Math.floor(days / 30.44);
  if (days < 365) {
    if (months <= 1) return '1 miesiąc temu';
    if (months < 5) return months + ' miesiące temu';
    return months + ' miesięcy temu';
  }
  const years = Math.floor(days / 365.25);
  if (years === 1) return '1 rok temu';
  if (years < 5) return years + ' lata temu';
  return years + ' lat temu';
}

function renderPlayCard(p, i) {
  const play = p.play || {};
  const details = play.details || [];
  const hasDetails = details.length > 0;
  const id = 'play-' + Math.random().toString(36).slice(2, 9);
  const isSurv = play.playType === 'survivor';

  const total = play.games || 0;
  const wins = isSurv
    ? (play.escapes || 0)
    : ((play.k4 || 0) + (play.k3 || 0));
  const winPct = total ? Math.round((wins / total) * 100) : 0;
  const k4Pct = total ? Math.round(((play.k4 || 0) / total) * 100) : 0;
  const escPct = total ? Math.round(((play.escapes || 0) / total) * 100) : 0;

  const chips = [];
  const addChip = (count, cls, label) => {
    if (!count) return;
    chips.push(`<span class="play-chip ${cls}"><b>${count}</b><span>${label}</span></span>`);
  };
  if (isSurv) {
    addChip(play.escapes, 'c4', 'escape');
    addChip(play.deaths, 'c0', 'death');
  } else {
    addChip(play.k4, 'c4', '4k');
    addChip(play.k3, 'c3', '3k');
    addChip(play.k2, 'c2', '2k');
    addChip(play.k1, 'c1', '1k');
    addChip(play.k0, 'c0', '0k');
  }
  (play.extras || []).forEach(ex => {
    const lab = (ex.label || '').trim();
    if (/^best\s*map$/i.test(lab)) return;
    chips.push(`<span class="play-chip cextra"><span>${escapeHtml(lab)}</span><b>${escapeHtml(ex.value)}</b></span>`);
  });

  let detailHtml = '';
  if (hasDetails) {
    detailHtml = `
      <div class="play-details" id="${id}" hidden>
        <ul class="play-notes">
          ${details.map(d => {
            const val = d.value || d.date || '';
            const cap = d.caption || d.note || d.text || '';
            return `
            <li class="play-note-item">
              ${val ? `<span class="play-note-date">${escapeHtml(val)}</span>` : ''}
              <span class="play-note-text">${escapeHtml(cap)}</span>
            </li>`;
          }).join('')}
        </ul>
      </div>`;
  }

  const card = document.createElement('article');
  card.className = 'play-card' + (play.playType === 'survivor' ? ' is-survivor' : (play.playType === 'session' ? ' is-session' : ' is-challenge'));
  card.innerHTML = `
    <div class="play-top">
      <div class="play-type-badge">${play.playType === 'survivor' ? 'SURVIVOR' : (play.playType === 'session' ? 'SESSION' : 'CHALLENGE')}</div>
      ${play.note || play.noteDate ? `<div class="play-patch">${play.note ? `<span class="play-patch-note">${escapeHtml(play.note)}</span>` : ''}${(() => { const ago = formatTimeAgo(parsePlayDate(play.noteDate)); return ago ? `<span class="play-patch-ago">${escapeHtml(ago)}</span>` : (play.noteDate ? `<span class="play-patch-ago">${escapeHtml(play.noteDate)}</span>` : ''); })()}</div>` : ''}
    </div>
    <div class="play-title">${escapeHtml(p.name)}</div>
    <div class="play-score-row">
      <div class="play-score">
        <span class="play-score-num">${wins}</span><span class="play-score-sep">/</span><span class="play-score-den">${total || '—'}</span>
        <span class="play-score-lab">${isSurv ? 'escapes' : 'wins'}</span>
      </div>
      <div class="play-score-sub">
        ${total ? `<div><b>${isSurv ? escPct : winPct}%</b> ${isSurv ? 'escape rate' : 'win rate'}</div>` : ''}
        ${(!isSurv && total) ? `<div><b>${k4Pct}%</b> 4k rate</div>` : ''}
        ${play.highlight && play.highlight.value ? `<div class="play-hl"><b>${escapeHtml(play.highlight.value)}</b>${play.highlight.label ? ` <span>${escapeHtml(play.highlight.label)}</span>` : ''}</div>` : ''}
      </div>
    </div>
    ${total ? `<div class="play-bar"><div class="play-bar-fill" style="width:${winPct}%"></div></div>` : ''}
    <div class="play-chips">${chips.join('')}</div>
    ${hasDetails ? `
      <button type="button" class="play-expand wc-expand" aria-expanded="false" data-play-expand="${id}">
        <span class="wc-expand-ico" aria-hidden="true"></span>
        <span class="wc-expand-count">${details.length}</span>
        <span class="play-expand-lab">notes</span>
      </button>` : ''}
    ${detailHtml}
  `;
  return card;
}

function bindPlayExpanders(root) {
  root.querySelectorAll('[data-play-expand]').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-play-expand');
      const panel = document.getElementById(id);
      if (!panel) return;
      const open = panel.hasAttribute('hidden');
      if (open) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.classList.toggle('open', open);
    });
  });
}

function renderDefault(characters) {
  const grid = document.getElementById('streak-grid');
  grid.className = 'grid view-default';
  grid.innerHTML = '';

  const play = characters.filter(c => c.type === 'playthrough' && c.play);
  const rest = characters.filter(c => !(c.type === 'playthrough' && c.play));

  play.forEach((c, i) => {
    const card = renderPlayCard(c, i);
    grid.appendChild(card);
  });
  if (play.length) bindPlayExpanders(grid);

  rest.forEach((c, i) => {
    const card = document.createElement('article');
    card.className = 'card' + typeClass(c.type);

    const groups = c.groups || [];
    const body = groups.map((g, idx) => renderWinconBlock(g, idx, c.best, c.type)).join('');

    card.innerHTML = `
      <div class="card-top">
        <div class="portrait">
          <img src="${c.image}" alt="${escapeHtml(c.name)}" loading="lazy" onerror="this.src='${PLACEHOLDER_IMG}'">
        </div>
        <div class="card-info">
          <div class="killer-name">${escapeHtml(c.name)}</div>
          <div class="card-tags">${tagsHtml(c.tags || [])}</div>
        </div>
        <div class="best-badge">
          <div class="best-label">Best</div>
          <div class="best-value">${c.best}</div>
        </div>
      </div>
      <div class="streaks-list">${body}</div>
    `;
    grid.appendChild(card);
    bindExpanders(card);
  });
}

/* ---------- NEON VIEW ---------- */
function renderNeon(characters) {
  // Same layout as default; neon only changes colors via CSS
  renderDefault(characters);
  const grid = document.getElementById('streak-grid');
  if (grid) grid.className = 'grid view-neon';
  document.querySelectorAll('.grid .card').forEach(el => {
    if (!el.classList.contains('play-card')) el.classList.add('neon-card');
  });
}

/* ---------- SPLIT VIEW (fixed for new grouping) ---------- */
function renderSplit(characters) {
  const grid = document.getElementById('streak-grid');
  grid.className = 'grid view-split';
  grid.innerHTML = `
    <div class="split-side" id="split-list"></div>
    <div class="split-detail" id="split-detail">
      <p class="split-placeholder">Select a character</p>
    </div>
  `;

  const side = document.getElementById('split-list');
  const detail = document.getElementById('split-detail');

  characters.forEach((c, i) => {
    const groups = c.groups || [];
    const item = document.createElement('div');
    item.className = 'split-item'
      + (groups.some(g => g.isBestActive || g.activeAttempt) ? ' has-active' : '')
      + (i === 0 ? ' active' : '')
      + typeClass(c.type);
    item.innerHTML = `
      <img src="${c.image}" alt="" loading="lazy" onerror="this.src='${PLACEHOLDER_IMG}'">
      <div class="split-item-info">
        <div class="split-item-name">${escapeHtml(c.name)}</div>
        <div class="split-item-meta">${groups.length} wincon${groups.length !== 1 ? 's' : ''}</div>
      </div>
      <div class="split-item-best">${c.best}</div>
    `;
    item.addEventListener('click', () => {
      side.querySelectorAll('.split-item').forEach(x => x.classList.remove('active'));
      item.classList.add('active');
      showSplitDetail(c, detail);
    });
    side.appendChild(item);
  });

  if (characters.length) showSplitDetail(characters[0], detail);
}

function showSplitDetail(c, detail) {
  const groups = c.groups || [];
  detail.innerHTML = `
    <div class="split-detail-head">
      <img src="${c.image}" alt="" loading="lazy" onerror="this.src='${PLACEHOLDER_IMG}'">
      <div class="split-detail-meta">
        <div class="split-dname">${escapeHtml(c.name)}</div>
        <div class="split-dtype">${roleLabel(c.type)}</div>
      </div>
      <div class="split-dbest">${c.best}<span>BEST</span></div>
    </div>
    <div class="split-streaks" id="split-streaks-root">
      ${groups.map((g, idx) => renderWinconBlock(g, idx, c.best, c.type)).join('')}
    </div>
  `;
  bindExpanders(detail);
}

/* ---------- CORE ---------- */
function getVisibleCharacters() {
  if (!cachedCharacters) return [];
  const prepared = prepareCharacters(
    cachedCharacters.map(c => Object.assign({}, c, { streaks: c.streaks.slice() }))
  );
  return filterCharacters(prepared);
}

function renderCharacters(characters) {
  if (characters) cachedCharacters = characters;
  const visible = getVisibleCharacters();
  updateStats(visible);

  if (currentView === 'neon') renderNeon(visible);
  else if (currentView === 'split') renderSplit(visible);
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

function updateFilterButtons() {
  document.querySelectorAll('.tag-filter[data-tag]').forEach(btn => {
    btn.classList.toggle('active', !!enabledTags[btn.dataset.tag]);
  });
}

function setSearch(q) {
  searchQuery = q || '';
  renderCharacters();
}

async function refreshData() {
  const grid = document.getElementById('streak-grid');
  if (grid) grid.innerHTML = '<p class="loading-msg">Loading data from Google Sheets...</p>';
  try {
    const characters = await loadCharactersFromSheet();
    renderCharacters(characters);
  } catch (err) {
    if (grid) grid.innerHTML = `<p class="error-msg">Error: ${err.message}</p>`;
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sel = document.getElementById('view-select');
  if (sel) sel.addEventListener('change', () => switchView(sel.value));
  document.querySelectorAll('.tag-filter[data-tag]').forEach(btn => {
    btn.addEventListener('click', () => toggleTag(btn.dataset.tag));
  });
  const search = document.getElementById('streak-search');
  if (search) search.addEventListener('input', () => setSearch(search.value));
  refreshData();
});

window.refreshData = refreshData;
window.switchView = switchView;
window.toggleTag = toggleTag;
