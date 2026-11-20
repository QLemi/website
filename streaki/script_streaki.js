const profileLink = document.querySelector('.steam-chip');
if (profileLink) {
  const profileUrl = STREAKI_CONFIG.PROFILE_URL?.trim();
  const profileLabel = STREAKI_CONFIG.PROFILE_LABEL?.trim();
  if (profileUrl && profileLabel && /^https?:\/\//i.test(profileUrl)) {
    profileLink.hidden = false;
    profileLink.href = profileUrl;
    profileLink.title = 'Steam - ' + profileLabel;
    profileLink.querySelector('.steam-chip-txt').textContent = profileLabel;
  } else {
    profileLink.hidden = true;
    profileLink.removeAttribute('href');
  }
}
let latestRefresh = 0;
let refreshController = null;
function validCount(raw) {
  const text = String(raw ?? '').trim();
  if (!/^\d+$/.test(text)) return null;
  const value = Number(text);
  return Number.isSafeInteger(value) ? value : null;
}
async function fetchSourceCSV(gid, signal) {
  const url = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/export?format=csv&gid=' + encodeURIComponent(gid);
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) abort();else signal?.addEventListener('abort', abort, {
    once: true
  });
  const timer = setTimeout(abort, 15000);
  try {
    const response = await fetch(url, {
      signal: controller.signal
    });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const text = (await response.text()).replace(/^\uFEFF/, '');
    if (/^\s*</.test(text)) throw new Error('The source returned a page instead of CSV data.');
    if (!text.trim()) throw new Error('The source returned an empty response.');
    return parseCSV(text);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', abort);
  }
}
function renderSourceReports(reports) {
  const host = document.getElementById('source-reports');
  if (!host) return;
  host.replaceChildren();
  const issues = reports.filter(report => report.status === 'error' || report.warnings.length);
  host.hidden = issues.length === 0;
  issues.forEach(report => {
    const notice = document.createElement('div');
    notice.className = 'source-notice source-notice-' + report.status;
    const message = document.createElement('span');
    message.textContent = report.name + ': ' + (report.status === 'error' ? report.error : 'Skipped invalid values: ' + report.warnings.length + '.');
    notice.appendChild(message);
    if (report.warnings.length) {
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      summary.textContent = 'Invalid values';
      const list = document.createElement('ul');
      report.warnings.forEach(warning => {
        const item = document.createElement('li');
        item.textContent = warning;
        list.appendChild(item);
      });
      details.append(summary, list);
      notice.appendChild(details);
    }
    host.appendChild(notice);
  });
}
const SHEET_ID = STREAKI_CONFIG.SHEET_ID;
const SHEET_MAIN_GID = STREAKI_CONFIG.SHEET_MAIN_GID;
const SHEET_INNE_GID = STREAKI_CONFIG.SHEET_INNE_GID;
const SHEET_PLAY_GID = String(STREAKI_CONFIG.SHEET_PLAY_GID ?? '');
const hasConfiguredSources = [SHEET_ID, SHEET_MAIN_GID, SHEET_INNE_GID, SHEET_PLAY_GID]
  .every(value => String(value ?? '').trim().length > 0);
let PORTRAIT_MAP = {};
const PLACEHOLDER_IMG = STREAKI_CONFIG.PLACEHOLDER_IMG;
const TAG_LABELS = STREAKI_CONFIG.TAG_LABELS;
let cachedCharacters = null;
let enabledTags = {
  K: true,
  S: true,
  O: true,
  P: true
};
let searchQuery = '';
let activeOnly = false;
let multipleAttemptsOnly = false;
let minimumScore = 0;
let selectedWincons = new Set();
let availableWincons = new Map();
let playthroughFirst = false;
let sortMode = 'best-desc';
let historyIdCounter = 0;
const drawerAnimations = new WeakMap();
const cardLayout = new ResizeObserver(entries => {
  const sizes = entries.map(({ target, borderBoxSize }) => {
    const gridStyle = getComputedStyle(target.parentElement);
    const rowHeight = parseFloat(gridStyle.gridAutoRows);
    const gap = parseFloat(gridStyle.getPropertyValue('--streak-card-gap'));
    return {
      card: target,
      rows: rowHeight ? Math.ceil((borderBoxSize[0].blockSize + gap) / rowHeight) : 1
    };
  });
  sizes.forEach(({ card, rows }) => card.style.setProperty('--streak-card-rows', rows));
});
function parseCSV(text) {
  const rows = [];
  let current = [];
  let inQuotes = false;
  let field = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') inQuotes = false;else field += char;
    } else {
      if (char === '"') inQuotes = true;else if (char === ',') {
        current.push(field);
        field = '';
      } else if (char === '\n' || char === '\r' && next === '\n') {
        current.push(field);
        rows.push(current);
        current = [];
        field = '';
        if (char === '\r') i++;
      } else if (char === '\r') {
        current.push(field);
        rows.push(current);
        current = [];
        field = '';
      } else field += char;
    }
  }
  if (field || current.length) {
    current.push(field);
    rows.push(current);
  }
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
      if (!seen.has(t)) {
        seen.add(t);
        out.push(t);
      }
    });
  });
  return out;
}
function tagsHtml(tags) {
  return (tags || []).map(t => `<span class="role-tag tag-${t}">${TAG_LABELS[t] || t}</span>`).join('');
}
function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function typeClass(type) {
  if (type === 'survivor') return ' survivor';
  if (type === 'other') return ' other';
  if (type === 'playthrough') return ' playthrough';
  return '';
}
async function loadSheet(gid, mode, signal, warnings = []) {
  const rows = await fetchSourceCSV(gid, signal);
  if (rows.length < 2) throw new Error('The source does not contain a data table.');
  let headerRowIndex = -1;
  for (let i = 0; i < Math.min(rows.length, 15); i++) {
    const names = rows[i].filter(c => c && c.trim().length > 2);
    if (names.length >= 2) {
      headerRowIndex = i;
      break;
    }
  }
  if (headerRowIndex === -1) throw new Error('Could not recognize the source table.');
  const header = rows[headerRowIndex];
  const dataStart = headerRowIndex + 1;
  const step = mode === 'inne' ? 4 : 3;
  const positions = [];
  for (let col = 0; col < header.length; col++) {
    const name = (header[col] || '').trim();
    if (name) positions.push({
      col,
      name
    });
  }
  const characters = [];
  for (const {
    col,
    name
  } of positions) {
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
      const value = validCount(valueRaw);
      if (value === null) {
        warnings.push('Row ' + (r + 1) + ', ' + name + ': ' + valueRaw);
        continue;
      }
      const isFinished = checkRaw === 'TRUE' || checkRaw === 'CHECKED' || checkRaw === '\u2713' || checkRaw === 'YES';
      streaks.push({
        category: category || 'Streak',
        value,
        active: !isFinished,
        tags
      });
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
async function loadPlaythroughSheet(signal, warnings = []) {
  if (!SHEET_PLAY_GID) return [];
  const rows = await fetchSourceCSV(SHEET_PLAY_GID, signal);
  if (rows.length < 6) throw new Error('Could not recognize the playthrough table.');
  const cell = (r, c) => {
    if (r < 0 || r >= rows.length) return '';
    const row = rows[r] || [];
    return (row[c] || '').trim();
  };
  const num = value => String(value ?? '').trim() ? validCount(value) : 0;
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
      noteDate: cell(13, col + 1)
    };
    const notes = [];
    for (let r = 14; r < rows.length; r++) {
      const value = cell(r, col);
      const caption = cell(r, col + 1);
      if (!value && !caption) {
        const nVal = cell(r + 1, col);
        const nCap = cell(r + 1, col + 1);
        if (!nVal && !nCap) break;
        continue;
      }
      notes.push({
        value,
        caption: caption || value
      });
    }
    const invalid = ['games', 'k4', 'k3', 'k2', 'k1', 'k0'].filter(key => String(fields[key] || '').trim() && validCount(fields[key]) === null);
    if (invalid.length) {
      invalid.forEach(key => warnings.push(name + ', ' + key + ': ' + fields[key]));
      continue;
    }
    out.push(buildPlayEntry(name, fields, notes, num));
  }
  return out;
}
function buildPlayEntry(name, fields, details, num) {
  const typeRaw = normSafe(fields.type);
  let playType = 'challenge';
  if (typeRaw === 'session' || typeRaw === 'sesja' || typeRaw === 'log' || typeRaw === 'session-killer' || typeRaw === 'session killer' || typeRaw === 'killer-session' || typeRaw === 'killer session') playType = 'session';
  if (typeRaw === 'survivor' || typeRaw === 'surv' || typeRaw === 'surw' || typeRaw === 'session-survivor' || typeRaw === 'session survivor' || typeRaw === 'survivor-session' || typeRaw === 'survivor session') playType = 'survivor';
  const g = num(fields.games);
  const [a4, a3, a2, a1, a0] = [fields.k4, fields.k3, fields.k2, fields.k1, fields.k0].map(num);
  const note = (fields.note || '').trim();
  const noteDate = (fields.noteDate || '').trim();
  const isSurv = playType === 'survivor';
  const escapes = isSurv ? a4 : 0;
  const deaths = isSurv ? a3 : 0;
  const sortVal = isSurv ? escapes || g : a4 || g || details.length;
  return {
    name,
    type: 'playthrough',
    tags: ['P'],
    play: {
      playType,
      games: g,
      k4: isSurv ? 0 : a4,
      k3: isSurv ? 0 : a3,
      k2: isSurv ? 0 : a2,
      k1: isSurv ? 0 : a1,
      k0: isSurv ? 0 : a0,
      escapes,
      deaths,
      note,
      noteDate,
      details
    },
    streaks: [{
      category: note || playType,
      value: sortVal,
      active: true,
      tags: ['P']
    }]
  };
}
function normSafe(s) {
  return (s || '').trim().toLowerCase();
}
async function loadCharactersFromSheet(signal) {
  const sources = [{
    name: 'Killer streaks',
    load: warnings => loadSheet(SHEET_MAIN_GID, 'main', signal, warnings)
  }, {
    name: 'Other streaks',
    load: warnings => loadSheet(SHEET_INNE_GID, 'inne', signal, warnings)
  }, {
    name: 'Playthrough',
    load: warnings => loadPlaythroughSheet(signal, warnings)
  }];
  const warnings = sources.map(() => []);
  const results = await Promise.allSettled(sources.map((source, i) => source.load(warnings[i])));
  const reports = sources.map((source, i) => ({
    name: source.name,
    warnings: warnings[i],
    status: results[i].status === 'rejected' ? 'error' : warnings[i].length ? 'warning' : 'ok',
    error: results[i].status === 'rejected' ? results[i].reason?.name === 'AbortError' ? 'Request timed out or was cancelled.' : String(results[i].reason?.message || results[i].reason) : ''
  }));
  const data = results.map(result => result.status === 'fulfilled' ? result.value : []);
  const [main, other, play] = data;
  const filteredOther = play.length ? other.filter(c => !(c.tags && c.tags.length === 1 && c.tags[0] === 'P')) : other;
  return {
    characters: [...main, ...filteredOther, ...play],
    reports
  };
}
function groupStreaksByCategory(streaks) {
  const map = new Map();
  for (const s of streaks) {
    const key = (s.category || '').trim().toLowerCase();
    if (!key) continue;
    if (!map.has(key)) {
      map.set(key, {
        category: s.category,
        attempts: [],
        tags: [...(s.tags || [])]
      });
    }
    const g = map.get(key);
    g.attempts.push(Object.assign({}, s));
    (s.tags || []).forEach(t => {
      if (!g.tags.includes(t)) g.tags.push(t);
    });
  }
  const groups = [];
  for (const g of map.values()) {
    g.attempts.sort((a, b) => b.value - a.value || Number(b.active) - Number(a.active));
    g.best = g.attempts[0].value;
    g.isBestActive = g.attempts[0].active;
    g.activeAttempt = g.isBestActive ? null : g.attempts.find(attempt => attempt.active) || null;
    g.hasHistory = g.attempts.length > 1;
    g.attemptCount = g.attempts.length;
    groups.push(g);
  }
  groups.sort((a, b) => b.best - a.best);
  return groups;
}
function filterCharacters(characters) {
  const q = searchQuery.trim().toLowerCase();
  const visible = characters.map(c => {
    const nameMatch = !q || c.name.toLowerCase().includes(q);
    const isPlaythrough = c.type === 'playthrough' || c.play;
    const roleAttempts = c.streaks.filter(attempt => {
      const tags = attempt.tags?.length ? attempt.tags : ['K'];
      return tags.some(tag => enabledTags[tag]);
    });
    const groups = groupStreaksByCategory(roleAttempts).filter(group => {
      const category = group.category.trim().toLowerCase();
      if (!nameMatch && !category.includes(q) && !(isPlaythrough && 'playthrough'.includes(q))) return false;
      if (selectedWincons.size && !selectedWincons.has(isPlaythrough ? 'playthrough' : category)) return false;
      if (multipleAttemptsOnly && !group.hasHistory) return false;
      if (!activeOnly) return group.best >= minimumScore;
      const activeScore = group.isBestActive ? group.best : group.activeAttempt?.value;
      return activeScore !== undefined && activeScore >= minimumScore;
    });
    if (!groups.length) return null;
    return Object.assign({}, c, {
      groups,
      tags: mergeTagsOrdered(groups),
      best: groups[0].best
    });
  }).filter(Boolean);
  const compare = (a, b) => {
    if (sortMode === 'best-asc') return a.best - b.best || a.name.localeCompare(b.name, 'en');
    if (sortMode === 'name') return a.name.localeCompare(b.name, 'en') || b.best - a.best;
    if (sortMode === 'attempts') {
      const attemptsA = (a.groups || []).reduce((sum, group) => sum + (group.attemptCount || 1), 0);
      const attemptsB = (b.groups || []).reduce((sum, group) => sum + (group.attemptCount || 1), 0);
      return attemptsB - attemptsA || b.best - a.best || a.name.localeCompare(b.name, 'en');
    }
    return b.best - a.best || a.name.localeCompare(b.name, 'en');
  };
  return visible.sort(compare);
}
function updateFilterSummary(characters) {
  const count = document.getElementById('filter-summary-count');
  const active = document.getElementById('filter-summary-active');
  const clear = document.getElementById('clear-filters');
  if (!count || !active || !clear) return;
  const streakCharacters = (characters || []).filter(character => character.type !== 'playthrough' && !character.play);
  const streakCount = streakCharacters.reduce((sum, character) => sum + (character.groups || []).length, 0);
  const playthroughCount = (characters || []).length - streakCharacters.length;
  const counts = [];
  if (streakCount || !playthroughCount) counts.push(`${streakCount} ${streakCount === 1 ? 'streak' : 'streaks'}`);
  if (streakCharacters.length) counts.push(`${streakCharacters.length} ${streakCharacters.length === 1 ? 'character' : 'characters'}`);
  if (playthroughCount) counts.push(`${playthroughCount} ${playthroughCount === 1 ? 'playthrough' : 'playthroughs'}`);
  count.textContent = counts.join(' · ');
  const filters = [];
  const roleLabels = [['K', 'Killer'], ['S', 'Survivor'], ['O', 'Both']].filter(([tag]) => enabledTags[tag]).map(([, label]) => label);
  if (roleLabels.length < 3) filters.push(`Roles: ${roleLabels.join(', ') || 'none'}`);
  if (activeOnly) filters.push('Active only');
  if (multipleAttemptsOnly) filters.push('Multiple attempts');
  if (minimumScore) filters.push(`Min. ${activeOnly ? 'active ' : ''}score: ${minimumScore}`);
  selectedWincons.forEach(key => filters.push(`Wincon: ${availableWincons.get(key) || key}`));
  if (searchQuery.trim()) filters.push(`Search: ${searchQuery.trim()}`);
  active.innerHTML = filters.map(label => `<span class="filter-summary-chip">${escapeHtml(label)}</span>`).join('');
  clear.hidden = filters.length === 0;
}
function updateWinconOptions(characters) {
  const options = document.getElementById('wincon-filter-options');
  if (!options) return;
  availableWincons = new Map();
  const winconCounts = new Map();
  (characters || []).filter(character => character.type !== 'playthrough' && !character.play).forEach(character => (character.streaks || []).forEach(streak => {
    const label = String(streak.category || '').trim();
    const key = label.toLowerCase();
    if (!label || key === 'playthrough') return;
    if (!availableWincons.has(key)) availableWincons.set(key, label);
    winconCounts.set(key, (winconCounts.get(key) || 0) + 1);
  }));
  const sortedWincons = [...availableWincons.entries()].sort(([keyA, labelA], [keyB, labelB]) => winconCounts.get(keyB) - winconCounts.get(keyA) || labelA.localeCompare(labelB, 'en'));
  availableWincons.set('playthrough', 'Playthrough');
  options.innerHTML = sortedWincons.map(([, label]) => `<option value="${escapeHtml(label)}"></option>`).join('') + '<option value="Playthrough"></option>';
  selectedWincons = new Set([...selectedWincons].filter(key => availableWincons.has(key)));
  renderSelectedWincons();
}
function renderSelectedWincons() {
  const container = document.getElementById('wincon-filter-selected');
  if (!container) return;
  container.innerHTML = [...selectedWincons].map(key => {
    const label = availableWincons.get(key) || key;
    return `<button type="button" class="wincon-filter-chip" data-remove-wincon="${escapeHtml(key)}" aria-label="Remove ${escapeHtml(label)} filter"><span>${escapeHtml(label)}</span><b aria-hidden="true">×</b></button>`;
  }).join('');
}
function addWinconFilter() {
  const input = document.getElementById('wincon-filter-input');
  const feedback = document.getElementById('wincon-filter-feedback');
  const key = input.value.trim().toLowerCase();
  if (!availableWincons.has(key) || selectedWincons.has(key)) {
    feedback.hidden = false;
    feedback.textContent = selectedWincons.has(key) ? 'This win condition is already selected.' : 'Choose a win condition from the list.';
    input.focus();
    return;
  }
  feedback.hidden = true;
  selectedWincons.add(key);
  input.value = '';
  renderSelectedWincons();
  renderCharacters();
  input.focus();
  closeWincon();
}
function updateStats(characters) {
  const streakChars = characters.filter(c => c.type !== 'playthrough' && !c.play);
  const totalGroups = streakChars.reduce((sum, c) => sum + (c.groups ? c.groups.length : 0), 0);
  const activeCount = streakChars.reduce((sum, c) => {
    if (!c.groups) return sum;
    return sum + c.groups.filter(g => g.isBestActive || g.activeAttempt).length;
  }, 0);
  const best = streakChars.length ? Math.max(...streakChars.map(c => c.best || 0)) : 0;
  const elChars = document.getElementById('total-characters');
  const elStreaks = document.getElementById('total-streaks');
  const elBest = document.getElementById('best-streak');
  const elActive = document.getElementById('active-count');
  if (elChars) elChars.textContent = streakChars.length;
  if (elStreaks) elStreaks.textContent = totalGroups;
  if (elBest) elBest.textContent = best;
  if (elActive) elActive.textContent = activeCount;
}
let steamExportRows = [];
let steamExportSelected = new Set();
function buildSteamExportRows(characters) {
  const rows = [];
  (characters || []).filter(c => !c.play && c.type !== 'playthrough').forEach(c => {
    const groups = groupStreaksByCategory(c.streaks || []);
    groups.forEach(g => {
      const tags = g.tags && g.tags.length ? g.tags : c.tags || ['K'];
      rows.push({
        id: `best-${rows.length}`,
        order: rows.length,
        name: c.name,
        category: g.category,
        value: g.best,
        active: g.isBestActive,
        tags
      });
      if (g.activeAttempt) {
        rows.push({
          id: `current-${rows.length}`,
          order: rows.length,
          name: c.name,
          category: g.category,
          value: g.activeAttempt.value,
          active: true,
          tags
        });
      }
    });
  });
  return rows;
}
function steamExportMatchingIds() {
  const roles = [...document.querySelectorAll('.steam-export-role-filter input:checked')].map(input => input.value);
  const statuses = [...document.querySelectorAll('.steam-export-status-filter input:checked')].map(input => input.value);
  const min = Number(document.getElementById('steam-export-min').value || 0);
  const max = Number(document.getElementById('steam-export-max').value || 0);
  const characters = new Set([...document.querySelectorAll('.steam-export-character-options input:checked')].map(input => input.value));
  const query = document.getElementById('steam-export-search').value.trim().toLowerCase();
  return new Set(steamExportRows.filter(row =>
    roles.some(role => row.tags.includes(role))
    && statuses.includes(row.active ? 'active' : 'completed')
    && row.value >= min
    && (max <= 0 || row.value <= max)
    && characters.has(row.name)
    && (!query || `${row.name} ${row.category}`.toLowerCase().includes(query))
  ).map(row => row.id));
}
function selectFilteredSteamRows() {
  steamExportSelected = steamExportMatchingIds();
  updateSteamExport();
}
function steamExportOrderedRows(rows, matchingIds) {
  const sort = document.getElementById('steam-export-sort').value;
  return rows.slice().sort((a, b) => {
    const matchOrder = Number(matchingIds.has(b.id)) - Number(matchingIds.has(a.id));
    if (matchOrder) return matchOrder;
    if (sort === 'high') return b.value - a.value || a.order - b.order;
    if (sort === 'low') return a.value - b.value || a.order - b.order;
    if (sort === 'name') return a.name.localeCompare(b.name) || b.value - a.value || a.order - b.order;
    return a.order - b.order;
  });
}
function steamExportText(matchingIds = steamExportMatchingIds()) {
  const selected = steamExportOrderedRows(steamExportRows.filter(row => steamExportSelected.has(row.id)), matchingIds);
  const format = document.getElementById('steam-export-format').value;
  const profilePage = new URL(STREAKI_CONFIG.page, 'https://qlemi.github.io/website/streaki/');
  const header = `[h2]You can check my streaks [url=${profilePage.href}] HERE [/url][/h2]`;
  if (format === 'compact') {
    return selected.map(row => `${row.name} - ${row.category}: ${row.value}${row.active ? ' [ONGOING]' : ''}`).join('\n');
  }
  if (format === 'role') {
    const roles = [['K', 'KILLER'], ['S', 'SURVIVOR'], ['O', 'BOTH']];
    const groupedText = roles.map(([tag, label]) => {
      const group = selected.filter(row => (row.tags[0] || 'K') === tag);
      return group.length ? `[h2]${label}[/h2]\n${group.map(formatSteamProfileLine).join('\n')}` : '';
    }).filter(Boolean).join('\n\n');
    return groupedText ? `${header}\n\n${groupedText}` : header;
  }
  const completed = selected.filter(row => !row.active);
  const ongoing = selected.filter(row => row.active);
  let text = header;
  if (completed.length) text += `\n\n${completed.map(formatSteamProfileLine).join('\n')}`;
  if (ongoing.length) text += `${completed.length ? '\n\n-----------------------------------------------------------------------------------------------------------\n\n' : '\n\n'}${ongoing.map(formatSteamProfileLine).join('\n')}`;
  return text;
}
function formatSteamProfileLine(row) {
  const title = `[b][u]${row.name} ${row.category} [/u][/b]`;
  return row.active ? `${title} - (still ongoing) [b]${row.value}[/b]` : `${title} - [b]${row.value}[/b]`;
}
function updateSteamExport() {
  const list = document.getElementById('steam-export-list');
  const matchingIds = steamExportMatchingIds();
  const rowHtml = row => `
        <label class="steam-export-row ${row.active ? 'is-ongoing' : ''} ${matchingIds.has(row.id) ? '' : 'outside-filter'}" title="${escapeHtml(row.category)}">
          <input type="checkbox" data-export-id="${row.id}" ${steamExportSelected.has(row.id) ? 'checked' : ''}>
          <span class="steam-export-row-main"><strong>${escapeHtml(row.category)}</strong></span>
          <span class="steam-export-row-result">${matchingIds.has(row.id) ? row.active ? 'ONGOING · ' : '' : 'OUTSIDE FILTER · '}${row.value}</span>
        </label>`;
  const groupHtml = (rows, heading) => {
    if (!rows.length) return '';
    const grouped = new Map();
    rows.forEach(row => {
      if (!grouped.has(row.name)) grouped.set(row.name, []);
      grouped.get(row.name).push(row);
    });
    return `<section class="steam-export-match-section"><h3 class="steam-export-section-title">${heading}</h3><div class="steam-export-character-groups">${[...grouped.entries()].map(([name, characterRows]) => `
      <section class="steam-export-character-group">
        <h3>${escapeHtml(name)}<span>${characterRows.length} streak${characterRows.length === 1 ? '' : 's'}</span></h3>
        <div class="steam-export-character-streaks">${characterRows.map(rowHtml).join('')}</div>
      </section>`).join('')}</div></section>`;
  };
  const ordered = steamExportOrderedRows(steamExportRows, matchingIds);
  const matched = ordered.filter(row => matchingIds.has(row.id));
  const unmatched = ordered.filter(row => !matchingIds.has(row.id));
  list.innerHTML = (matched.length ? groupHtml(matched, 'MATCHING FILTERS') : '<p class="steam-export-empty">No streaks match the current filters.</p>') + groupHtml(unmatched, 'OUTSIDE FILTERS');
  list.querySelectorAll('input[data-export-id]').forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) steamExportSelected.add(input.dataset.exportId);else steamExportSelected.delete(input.dataset.exportId);
      updateSteamExportPreview(matchingIds);
    });
  });
  updateSteamExportPreview(matchingIds);
}
function updateSteamExportPreview(matchingIds) {
  const text = steamExportText(matchingIds);
  document.getElementById('steam-export-preview').value = text;
  document.getElementById('steam-export-count').textContent = `${steamExportSelected.size} selected`;
  document.getElementById('steam-export-feedback').textContent = '';
}
function openSteamExport() {
  if (!cachedCharacters) return;
  steamExportRows = buildSteamExportRows(cachedCharacters);
  steamExportSelected = new Set(steamExportRows.map(row => row.id));
  document.querySelectorAll('.steam-export-role-filter input').forEach(input => {
    input.checked = true;
  });
  document.getElementById('steam-export-min').value = '';
  document.getElementById('steam-export-max').value = '';
  document.getElementById('steam-export-search').value = '';
  document.getElementById('steam-export-sort').value = 'profile';
  document.getElementById('steam-export-format').value = 'profile';
  document.querySelectorAll('.steam-export-status-filter input').forEach(input => {
    input.checked = true;
  });
  const characterOptions = document.getElementById('steam-export-character-options');
  const names = [...new Set(steamExportRows.map(row => row.name))].sort((a, b) => a.localeCompare(b));
  characterOptions.innerHTML = names.map(name => `<label><input type="checkbox" value="${escapeHtml(name)}" checked><span class="steam-character-name">${escapeHtml(name)}</span></label>`).join('');
  document.getElementById('steam-export-character-summary').textContent = 'All characters';
  document.querySelector('.steam-export-character-picker').open = false;
  updateSteamExport();
  document.getElementById('steam-export-dialog').showModal();
}
function renderWinconBlock(g, idx, type) {
  const isActive = g.isBestActive;
  const hasCurrent = !!g.activeAttempt;
  const hasHistory = g.hasHistory;
  const role = typeClass(type).trim() || 'killer';
  const historyId = hasHistory ? `streak-history-${++historyIdCounter}` : '';
  const mainBadge = isActive ? '<span class="wc-badge active">ACTIVE</span>' : '';
  const expandBtn = hasHistory ? `<button type="button" class="wc-history-toggle" aria-expanded="false" aria-label="Show previous attempts" aria-controls="${historyId}" title="Show previous attempts">
       <span class="wc-edge-arrow left" aria-hidden="true"></span>
       <span class="wc-history-summary">Previous runs</span>
       <span class="wc-edge-arrow right" aria-hidden="true"></span>
     </button>` : '';
  const currentLine = hasCurrent ? `
    <div class="wc-current">
      <span class="wc-badge active subtle">ACTIVE</span>
      <span class="wc-current-val">${g.activeAttempt.value}</span>
    </div>` : '';
  const mainToggleAttrs = hasHistory ? `role="button" tabindex="0" aria-expanded="false" aria-controls="${historyId}" aria-label="${escapeHtml(g.category)}, best score ${g.best}, attempts"` : '';
  let historyPanel = '';
  if (hasHistory) {
    historyPanel = `
      <div class="wc-history" id="${historyId}" hidden>
        ${g.attempts.map((a, i) => `
          <div class="wc-hist-row ${a.active ? 'is-active' : ''} ${i === 0 ? 'is-top' : ''}">
            <span class="wc-hist-rank">${i === 0 ? 'BEST' : `ATTEMPT #${i}`}</span>
            <span class="wc-hist-val">${a.value}</span>
            <span class="wc-hist-state ${a.active ? 'is-active' : i === 0 ? 'is-best' : 'is-done'}">${a.active ? 'ACTIVE' : i === 0 ? 'RECORD' : 'COMPLETED'}</span>
          </div>
        `).join('')}
        <button type="button" class="wc-history-collapse" aria-label="Collapse previous attempts">
          <span class="wc-edge-arrow" aria-hidden="true"></span>
          <span class="wc-edge-arrow" aria-hidden="true"></span>
        </button>
      </div>`;
  }
  return `
    <div class="wc-block role-${role} ${isActive ? 'is-active' : ''} ${hasCurrent ? 'has-current' : ''}">
      <div class="wc-main ${hasHistory ? 'wc-main-expandable' : ''}" ${mainToggleAttrs}>
        <div class="wc-left">
          ${mainBadge}
          <span class="wc-name" title="${escapeHtml(g.category)}">${escapeHtml(g.category)}</span>
        </div>
        <div class="wc-result">
          <span class="wc-val ${idx === 0 || isActive ? 'top' : ''}">${g.best}</span>
        </div>
      </div>
      ${currentLine}
      ${hasHistory ? `<div class="wc-drawer">${expandBtn}${historyPanel}</div>` : ''}
    </div>`;
}
function setDrawerOpen(panel, open) {
  const previous = drawerAnimations.get(panel);
  if (previous) previous.cancel();
  if (open) panel.removeAttribute('hidden');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || typeof panel.animate !== 'function') {
    panel.hidden = !open;
    panel.style.transformOrigin = '';
    panel.style.overflow = '';
    drawerAnimations.delete(panel);
    return;
  }
  panel.style.transformOrigin = 'top center';
  panel.style.overflow = 'hidden';
  const animation = panel.animate([{
    transform: open ? 'scaleY(0.96)' : 'scaleY(1)',
    opacity: open ? 0 : 1
  }, {
    transform: open ? 'scaleY(1)' : 'scaleY(0.96)',
    opacity: open ? 1 : 0
  }], {
    duration: 170,
    easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)'
  });
  drawerAnimations.set(panel, animation);
  animation.onfinish = () => {
    if (drawerAnimations.get(panel) !== animation) return;
    panel.style.transformOrigin = '';
    panel.style.overflow = '';
    if (!open) panel.setAttribute('hidden', '');
    drawerAnimations.delete(panel);
  };
}
function bindExpanders(root) {
  root.querySelectorAll('.wc-history-toggle').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const block = btn.closest('.wc-block');
      if (!block) return;
      const panel = block.querySelector('.wc-history');
      if (!panel) return;
      const open = btn.getAttribute('aria-expanded') !== 'true';
      if (open) {
        btn.classList.remove('is-closing');
      } else {
        btn.classList.add('is-closing');
        window.setTimeout(() => btn.classList.remove('is-closing'), 170);
      }
      setDrawerOpen(panel, open);
      block.classList.toggle('is-expanded', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      const mainToggle = block.querySelector('.wc-main-expandable');
      if (mainToggle) {
        mainToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-label', open ? 'Hide previous attempts' : 'Show previous attempts');
    });
    const block = btn.closest('.wc-block');
    const mainToggle = block && block.querySelector('.wc-main-expandable');
    if (!mainToggle || mainToggle.dataset.bound) return;
    mainToggle.dataset.bound = '1';
    mainToggle.addEventListener('click', () => btn.click());
    mainToggle.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      btn.click();
    });
  });
  root.querySelectorAll('.wc-history-collapse').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const block = btn.closest('.wc-block');
      const toggle = block && block.querySelector('.wc-history-toggle');
      if (toggle) toggle.click();
    });
  });
}
function parsePlayDate(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  let m = s.match(/^(\d{1,2})[./-](\d{1,2})(?:[./-](\d{2,4}))?$/);
  if (m) {
    let d = parseInt(m[1], 10),
      mo = parseInt(m[2], 10) - 1,
      y = m[3] ? parseInt(m[3], 10) : null;
    if (y === null) y = new Date().getFullYear();else if (y < 100) y += 2000;
    const dt = new Date(y, mo, d);
    return isNaN(dt.getTime()) ? null : dt;
  }
  m = s.match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/);
  if (m) {
    const dt = new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10));
    return isNaN(dt.getTime()) ? null : dt;
  }
  const t = Date.parse(s);
  return isNaN(t) ? null : new Date(t);
}
function formatTimeAgo(date) {
  if (!date) return '';
  const now = new Date();
  const ms = now.getTime() - date.getTime();
  if (ms < 0) return 'in the future';
  const days = Math.floor(ms / 86400000);
  if (days === 0) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 7) return days + ' days ago';
  const weeks = Math.floor(days / 7);
  if (days < 30) {
    if (weeks === 1) return '1 week ago';
    return weeks + ' weeks ago';
  }
  const months = Math.floor(days / 30.44);
  if (days < 365) {
    if (months <= 1) return '1 month ago';
    return months + ' months ago';
  }
  const years = Math.floor(days / 365.25);
  if (years === 1) return '1 year ago';
  return years + ' years ago';
}
function renderPlayCard(p, index) {
  const play = p.play || {};
  const details = play.details || [];
  const hasDetails = details.length > 0;
  const id = 'play-notes-' + index;
  const isSurv = play.playType === 'survivor';
  const total = play.games || 0;
  const wins = isSurv ? play.escapes || 0 : (play.k4 || 0) + (play.k3 || 0);
  const winPct = total ? Math.round(wins / total * 100) : 0;
  const k4Pct = total ? Math.round((play.k4 || 0) / total * 100) : 0;
  const escPct = total ? Math.round((play.escapes || 0) / total * 100) : 0;
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
  let detailHtml = '';
  if (hasDetails) {
    detailHtml = `
      <div class="play-details" id="${id}" hidden>
        <ul class="play-notes">
          ${details.map(({ value, caption }) => `
            <li class="play-note-item">
              ${value ? `<span class="play-note-date">${escapeHtml(value)}</span>` : ''}
              <span class="play-note-text">${escapeHtml(caption)}</span>
            </li>`).join('')}
        </ul>
      </div>`;
  }
  const card = document.createElement('article');
  card.className = 'play-card' + (play.playType === 'survivor' ? ' is-survivor' : play.playType === 'session' ? ' is-session' : ' is-challenge');
  card.innerHTML = `
    <div class="play-top">
      <div class="play-type-badge">${play.playType === 'survivor' ? 'SESSION-SURVIVOR' : play.playType === 'session' ? 'SESSION-KILLER' : 'CHALLENGE'}</div>
      ${play.note || play.noteDate ? `<div class="play-patch">${play.note ? `<span class="play-patch-note">${escapeHtml(play.note)}</span>` : ''}${(() => {
    const ago = formatTimeAgo(parsePlayDate(play.noteDate));
    return ago ? `<span class="play-patch-ago">${escapeHtml(ago)}</span>` : play.noteDate ? `<span class="play-patch-ago">${escapeHtml(play.noteDate)}</span>` : '';
  })()}</div>` : ''}
    </div>
    <h4 class="play-title">${escapeHtml(p.name)}</h4>
    <div class="play-score-row">
      <div class="play-score">
        <span class="play-score-num">${wins}</span><span class="play-score-sep">/</span><span class="play-score-den">${total || '-'}</span>
        <span class="play-score-lab">${isSurv ? 'escapes' : 'wins'}</span>
      </div>
      <div class="play-score-sub">
        ${total ? `<div><b>${isSurv ? escPct : winPct}%</b> ${isSurv ? 'escape rate' : 'win rate'}</div>` : ''}
        ${!isSurv && total ? `<div><b>${k4Pct}%</b> 4k rate</div>` : ''}
      </div>
    </div>
    ${total ? `<div class="play-bar"><div class="play-bar-fill" style="width:${winPct}%"></div></div>` : ''}
    <div class="play-chips">${chips.join('')}</div>
    ${hasDetails ? `
      <div class="play-drawer wc-drawer">
        <button type="button" class="play-expand wc-history-toggle" aria-expanded="false" aria-label="Show notes" aria-controls="${id}" data-play-expand="${id}">
          <span class="wc-drawer-grip" aria-hidden="true"></span>
          <span class="wc-toggle-chevron left" aria-hidden="true"></span>
          <span class="wc-expand-label">Notes</span>
          <span class="wc-expand-count">${details.length}</span>
          <span class="wc-toggle-chevron" aria-hidden="true"></span>
        </button>
        ${detailHtml}
      </div>` : ''}
  `;
  return card;
}
function bindPlayExpanders(root) {
  root.querySelectorAll('[data-play-expand]').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-play-expand');
      const panel = document.getElementById(id);
      if (!panel) return;
      const open = btn.getAttribute('aria-expanded') !== 'true';
      setDrawerOpen(panel, open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-label', open ? 'Hide notes' : 'Show notes');
      const label = btn.querySelector('.wc-expand-label');
      if (label) label.textContent = open ? 'Hide notes' : 'Notes';
      const count = btn.querySelector('.wc-expand-count');
      if (count) count.hidden = open;
    });
  });
}
function renderDefault(characters) {
  const results = document.getElementById('streak-grid');
  cardLayout.disconnect();
  results.replaceChildren();
  const play = characters.filter(c => c.type === 'playthrough' && c.play);
  const rest = characters.filter(c => !(c.type === 'playthrough' && c.play));
  if (!characters.length) {
    const hasData = cachedCharacters.length > 0;
    results.innerHTML = `
      <div class="streak-empty-state">
        <h3>${hasData ? 'No matching results' : 'No streaks or playthroughs available'}</h3>
        <p>${hasData ? 'Try a different search or clear your filters.' : 'Refresh the page data to check for updates.'}</p>
        <button class="streak-empty-clear" type="button">${hasData ? 'Clear filters' : 'Refresh data'}</button>
      </div>`;
    results.querySelector('.streak-empty-clear').addEventListener('click', hasData ? clearFilters : () => {
      document.querySelector('header .refresh-btn').focus();
      refreshData();
    });
    return;
  }
  const renderStreakCard = c => {
    const card = document.createElement('article');
    const groups = c.groups || [];
    const type = typeFromTags(c.tags);
    card.className = 'card' + typeClass(type);
    card.classList.toggle('streak-density-many', groups.length >= 4);
    const body = groups.map((g, idx) => renderWinconBlock(g, idx, type)).join('');
    card.innerHTML = `
      <div class="card-top">
        <div class="portrait">
          <img src="${escapeHtml(c.image || PLACEHOLDER_IMG)}" alt="" loading="lazy" decoding="async">
        </div>
        <div class="card-info">
          <h4 class="killer-name">${escapeHtml(c.name)}</h4>
          <div class="card-tags">${tagsHtml(c.tags || [])}</div>
        </div>
        <div class="best-badge">
          <div class="best-label">Best</div>
          <div class="best-value">${c.best}</div>
        </div>
      </div>
      <div class="streaks-list">${body}</div>
    `;
    bindExpanders(card);
    return card;
  };
  const appendSection = (title, cards, renderCard) => {
    if (!cards.length) return;
    const section = document.createElement('section');
    section.className = 'streak-results-section';
    const heading = document.createElement('h3');
    heading.textContent = title;
    heading.className = 'streak-results-title';
    const grid = document.createElement('div');
    grid.className = 'grid view-default';
    grid.append(...cards.map(renderCard));
    section.append(heading, grid);
    results.append(section);
  };
  if (playthroughFirst) appendSection('Playthroughs', play, renderPlayCard);
  appendSection('Streaks by character', rest, renderStreakCard);
  if (!playthroughFirst) appendSection('Playthroughs', play, renderPlayCard);
  bindPlayExpanders(results);
  observeCompactCards(results);
}
function observeCompactCards(results) {
  if (results.classList.contains('streak-grid-uniform')) return;
  results.querySelectorAll('.grid > article').forEach(card => cardLayout.observe(card, { box: 'border-box' }));
}
function renderCharacters(characters) {
  if (characters) {
    cachedCharacters = characters;
    updateWinconOptions(cachedCharacters);
    document.getElementById('steam-copy-open').disabled = !cachedCharacters.some(c => c.type !== 'playthrough' && !c.play);
  }
  updateFilterButtons();
  if (!cachedCharacters) return;
  const visible = filterCharacters(cachedCharacters);
  updateStats(visible);
  updateFilterSummary(visible);
  renderDefault(visible);
}
function toggleTag(tag) {
  enabledTags[tag] = !enabledTags[tag];
  renderCharacters();
}
function updateFilterButtons() {
  document.querySelectorAll('.tag-filter[data-tag]').forEach(btn => {
    btn.classList.toggle('active', !!enabledTags[btn.dataset.tag]);
    btn.setAttribute('aria-pressed', String(!!enabledTags[btn.dataset.tag]));
  });
  const activeFilter = document.getElementById('active-only-filter');
  if (activeFilter) {
    activeFilter.classList.toggle('active', activeOnly);
    activeFilter.setAttribute('aria-pressed', String(activeOnly));
  }
  const historyFilter = document.getElementById('history-only-filter');
  if (historyFilter) {
    historyFilter.classList.toggle('active', multipleAttemptsOnly);
    historyFilter.setAttribute('aria-pressed', String(multipleAttemptsOnly));
  }
  const playthroughFilter = document.getElementById('playthrough-position-filter');
  if (playthroughFilter) {
    playthroughFilter.classList.toggle('active', playthroughFirst);
    playthroughFilter.setAttribute('aria-pressed', String(playthroughFirst));
  }
}
function togglePlaythroughPosition() {
  playthroughFirst = !playthroughFirst;
  renderCharacters();
}
function toggleActiveOnly() {
  activeOnly = !activeOnly;
  renderCharacters();
}
function toggleHistoryOnly() {
  multipleAttemptsOnly = !multipleAttemptsOnly;
  renderCharacters();
}
function setSearch(q) {
  searchQuery = q || '';
  renderCharacters();
}
function clearFilters() {
  enabledTags.K = true;
  enabledTags.S = true;
  enabledTags.O = true;
  activeOnly = false;
  multipleAttemptsOnly = false;
  minimumScore = 0;
  selectedWincons.clear();
  searchQuery = '';
  const search = document.getElementById('streak-search');
  const minScore = document.getElementById('streak-min-score');
  if (search) search.value = '';
  if (minScore) minScore.value = '';
  document.getElementById('wincon-filter-input').value = '';
  document.getElementById('wincon-filter-feedback').hidden = true;
  search?.focus();
  renderSelectedWincons();
  renderCharacters();
}
async function refreshData() {
  if (!hasConfiguredSources) return;
  document.querySelector('.streak-filter-details').open = false;
  const requestId = ++latestRefresh;
  refreshController?.abort();
  const controller = new AbortController();
  refreshController = controller;
  const grid = document.getElementById('streak-grid');
  const host = document.getElementById('source-reports');
  const button = document.querySelector('header .refresh-btn');
  const status = document.getElementById('refresh-status');
  button.textContent = 'Refreshing…';
  status.textContent = 'Refreshing streak data.';
  host.setAttribute('aria-busy', 'true');
  grid.setAttribute('aria-busy', 'true');
  if (!cachedCharacters) grid.innerHTML = '<p class="loading-msg" role="status">Loading streaks…</p>';
  try {
    const result = await loadCharactersFromSheet(controller.signal);
    if (requestId !== latestRefresh) return;
    renderSourceReports(result.reports);
    if (result.reports.every(report => report.status === 'error')) throw new Error('No data source could be reached.');
    renderCharacters(result.characters);
    status.textContent = 'Refresh finished.';
  } catch {
    if (requestId !== latestRefresh) return;
    const message = cachedCharacters ? 'Refresh failed. Showing the results already loaded on this page.' : 'Unable to load streaks. Use Refresh data to try again.';
    status.textContent = message;
    if (!cachedCharacters) {
      grid.innerHTML = '<p class="error-msg" role="alert">' + message + '</p>';
    } else {
      const notice = document.createElement('p');
      notice.className = 'source-notice source-notice-error refresh-failed';
      notice.textContent = message;
      host.querySelector('.refresh-failed')?.remove();
      host.prepend(notice);
      host.hidden = false;
    }
  } finally {
    if (requestId === latestRefresh) {
      host.setAttribute('aria-busy', 'false');
      grid.setAttribute('aria-busy', 'false');
      button.textContent = 'Refresh data';
      refreshController = null;
    }
  }
}
document.addEventListener('DOMContentLoaded', async () => {
  const layoutSwitch = document.getElementById('streak-layout-switch');
  const results = document.getElementById(layoutSwitch.getAttribute('aria-controls'));
  if (!hasConfiguredSources) {
    const controls = document.querySelector('.streak-controls');
    controls.classList.add('streak-controls-unconfigured');
    controls.hidden = controls.querySelector('.streak-profiles').hidden;
    controls.querySelector('.streak-filter-details > summary').textContent = 'More options';
    layoutSwitch.hidden = true;
    results.setAttribute('aria-busy', 'false');
    results.innerHTML = `
      <div class="streak-empty-state" role="status">
        <h3>Streak data is not configured yet</h3>
        <p>Results will appear when this profile’s spreadsheet is connected.</p>
      </div>`;
    return;
  }
  layoutSwitch.addEventListener('click', () => {
    const uniformGrid = results.classList.toggle('streak-grid-uniform');
    layoutSwitch.setAttribute('aria-checked', String(uniformGrid));
    cardLayout.disconnect();
    observeCompactCards(results);
  });
  document.querySelectorAll('.tag-filter[data-tag]').forEach(btn => {
    btn.addEventListener('click', () => toggleTag(btn.dataset.tag));
  });
  const activeFilter = document.getElementById('active-only-filter');
  if (activeFilter) activeFilter.addEventListener('click', toggleActiveOnly);
  const historyFilter = document.getElementById('history-only-filter');
  if (historyFilter) historyFilter.addEventListener('click', toggleHistoryOnly);
  const playthroughFilter = document.getElementById('playthrough-position-filter');
  if (playthroughFilter) playthroughFilter.addEventListener('click', togglePlaythroughPosition);
  const streakSort = document.getElementById('streak-sort');
  if (streakSort) streakSort.addEventListener('change', () => {
    sortMode = streakSort.value;
    renderCharacters();
  });
  const clearFiltersButton = document.getElementById('clear-filters');
  if (clearFiltersButton) clearFiltersButton.addEventListener('click', clearFilters);
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    const updateBackToTop = () => {
      const visible = window.scrollY > 420;
      backToTop.classList.toggle('is-visible', visible);
      backToTop.setAttribute('aria-hidden', String(!visible));
      backToTop.tabIndex = visible ? 0 : -1;
    };
    window.addEventListener('scroll', updateBackToTop, {
      passive: true
    });
    updateBackToTop();
    backToTop.addEventListener('click', () => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }
  const minScoreFilter = document.getElementById('streak-min-score');
  if (minScoreFilter) minScoreFilter.addEventListener('input', () => {
    minimumScore = Math.max(0, Math.floor(Number(minScoreFilter.value) || 0));
    renderCharacters();
  });
  const winconFilterInput = document.getElementById('wincon-filter-input');
  const winconFilterAdd = document.getElementById('wincon-filter-add');
  if (winconFilterAdd) winconFilterAdd.addEventListener('click', addWinconFilter);
  if (winconFilterInput) winconFilterInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addWinconFilter();
    }
  });
  const selectedWinconContainer = document.getElementById('wincon-filter-selected');
  if (selectedWinconContainer) selectedWinconContainer.addEventListener('click', event => {
    const chip = event.target.closest('[data-remove-wincon]');
    if (!chip) return;
    selectedWincons.delete(chip.dataset.removeWincon);
    winconFilterInput.focus();
    closeWincon();
    renderSelectedWincons();
    renderCharacters();
  });
  const search = document.getElementById('streak-search');
  if (search) search.addEventListener('input', () => setSearch(search.value));
  const exportDialog = document.getElementById('steam-export-dialog');
  document.getElementById('steam-copy-open').addEventListener('click', openSteamExport);
  document.querySelector('.steam-export-close').addEventListener('click', () => exportDialog.close());
  ['steam-export-min', 'steam-export-max', 'steam-export-search'].forEach(id => {
    const control = document.getElementById(id);
    control.addEventListener('input', selectFilteredSteamRows);
    control.addEventListener('change', selectFilteredSteamRows);
  });
  document.querySelectorAll('.steam-export-role-filter input, .steam-export-status-filter input').forEach(input => {
    input.addEventListener('change', selectFilteredSteamRows);
  });
  document.getElementById('steam-export-character-options').addEventListener('change', event => {
    if (!event.target.matches('input[type="checkbox"]')) return;
    const checked = document.querySelectorAll('.steam-export-character-options input:checked').length;
    const total = document.querySelectorAll('.steam-export-character-options input').length;
    document.getElementById('steam-export-character-summary').textContent = checked === total ? 'All characters' : `${checked} of ${total} selected`;
    selectFilteredSteamRows();
  });
  ['steam-export-sort', 'steam-export-format'].forEach(id => {
    document.getElementById(id).addEventListener('change', updateSteamExport);
  });
  document.getElementById('steam-export-select-visible').addEventListener('click', selectFilteredSteamRows);
  document.getElementById('steam-export-clear').addEventListener('click', () => {
    steamExportSelected.clear();
    updateSteamExport();
  });
  document.getElementById('steam-export-copy').addEventListener('click', async () => {
    const text = steamExportText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      document.getElementById('steam-export-feedback').textContent = 'Copied - ready to paste into Steam.';
    } catch (_) {
      const preview = document.getElementById('steam-export-preview');
      preview.focus();
      preview.select();
      document.getElementById('steam-export-feedback').textContent = 'Select and copy the preview text.';
    }
  });
  exportDialog.addEventListener('click', event => {
    if (event.target === exportDialog) exportDialog.close();
  });
  PORTRAIT_MAP = { ...STREAKI_CONFIG.CUSTOM_PORTRAITS };
  const refreshButton = document.querySelector('header .refresh-btn');
  try {
    PORTRAIT_MAP = { ...(await SharedCatalog.portraitMap()), ...PORTRAIT_MAP };
  } catch (error) {
    const notice = document.createElement('p');
    notice.className = 'source-notice source-notice-warning';
    notice.textContent = 'The portrait catalog is unavailable. Scores still load.';
    document.querySelector('main').prepend(notice);
  }
  refreshButton.disabled = false;
  refreshButton.addEventListener('click', refreshData);
  refreshData();
});
