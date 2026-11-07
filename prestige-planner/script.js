(() => {
  'use strict';
  const T = DBDTools, {$, html, image, status} = T;
  const categories = ['temporary', 'short-term', 'general', 'long-term', 'milestones', 'road-to-p100'];
  const labels = {temporary: 'Temporary', general: 'General', 'short-term': 'Short-term', 'long-term': 'Long-term', 'road-to-p100': 'Road to P100', milestones: 'Milestones'};
  let prestigeSprites = null, characters = [], published = [], draft = null, snapshots = {}, editingId = null, loaded = false, dirty = false, formDirty = false;
  const errors = {};
  const summaryCategories = new Set(categories.filter(category => category !== 'long-term' && category !== 'milestones' && category !== 'road-to-p100'));
  const priorityChanges = new Set();
  let expirySignature = "", selectedCategory = categories[0];
  const categoryStorageKey = 'dbd-planner-selected-category-v1';
  try {
    const saved = localStorage.getItem(categoryStorageKey);
    if (['all', 'p100-completed', ...categories].includes(saved)) selectedCategory = saved;
  } catch (_) {}
  const find = id => characters.find(c => c.id === id);
  const goals = () => draft ?? published;
  const current = id => snapshots[find(id)?.role]?.values?.[id] ?? null;
  const localDateTime = value => {
    const d = new Date(value);
    const part = n => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + part(d.getMonth() + 1) + '-' + part(d.getDate()) + 'T' + part(d.getHours()) + ':' + part(d.getMinutes());
  };
  const expiryTime = value => {
    if (typeof value !== 'string') return NaN;
    if (/^[2-9]\d{3}-\d{2}-\d{2}$/.test(value)) {
      const d = new Date(value + 'T23:59:59.999');
      return localDateTime(d).slice(0, 10) === value ? d.getTime() : NaN;
    }
    if (!/^[2-9]\d{3}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) return NaN;
    const d = new Date(value);
    return Number.isFinite(d.getTime()) && d.toISOString() === value ? d.getTime() : NaN;
  };
  const expired = g => g.category === 'temporary' && expiryTime(g.expires) <= Date.now();
  const done = g => current(g.character) !== null && current(g.character) >= g.target;
  const active = g => !expired(g) && !done(g);
  const ranked = list => [...list].sort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category) || Number(done(a)) - Number(done(b)) || b.priority - a.priority || list.indexOf(a) - list.indexOf(b));
  function validate(data) {
    if (!data || data.app !== 'dbd-prestige-goals' || data.version !== 2 || !Array.isArray(data.goals) || data.goals.length > 500) throw new Error('Invalid goals file (expected Prestige Goals version 2, up to 500 goals).');
    const ids = new Set();
    return data.goals.map(g => {
      if (!g || typeof g.id !== 'string' || !/^[a-zA-Z0-9-]{1,64}$/.test(g.id) || ids.has(g.id) || !find(g.character) || !categories.includes(g.category) || !T.integer(g.start, 0, 99) || !T.integer(g.target, 1) || g.target <= g.start || (g.category === 'road-to-p100' && g.target !== 100) || !T.integer(g.priority, 0, 999) || typeof g.note !== 'string' || g.note.length > 160 || (g.category === 'temporary' ? !Number.isFinite(expiryTime(g.expires)) : g.expires !== null)) throw new Error('Invalid goal: check character, category, prestige range, priority and expiry date.');
      ids.add(g.id);
      return {id: g.id, character: g.character, category: g.category, start: g.start, target: g.target, priority: g.priority, expires: g.expires === null ? null : new Date(expiryTime(g.expires)).toISOString(), note: g.note};
    });
  }
  function sources() {
    $('source-goals').textContent = errors.goals ? 'Goals · ' + errors.goals + (loaded ? ' · showing previous goals' : '') : loaded ? 'Goals loaded' : 'Goals · not loaded';
    $('source-goals').classList.toggle('error', !!errors.goals);
    $('source-goals').hidden = !errors.goals;
    for (const r of ['killer', 'survivor']) {
      const s = snapshots[r];
      $('source-' + r).textContent = (r === 'killer' ? 'Killers' : 'Survivors') + ' · ' + (errors[r] ? 'refresh failed: ' + errors[r] + (s ? ' · previous data from ' + new Date(s.time).toLocaleString() : ' · progress unknown') : s ? 'fetched ' + new Date(s.time).toLocaleString() : 'not fetched');
      $('source-' + r).classList.toggle('error', !!errors[r]);
      $('source-' + r).hidden = !errors[r];
    }
  }
  const progressOf = g => { const level = current(g.character); return level === null ? null : Math.max(0, Math.min(1, (level - g.start) / (g.target - g.start))); };
  function prestigeIcon(level, size = 48) {
    const entry = prestigeSprites?.levels?.[level], sheet = entry && prestigeSprites?.[entry.sheet];
    if (!entry || !sheet || !['sheet1', 'sheet2'].includes(entry.sheet) || typeof sheet.url !== 'string' || !/^images\/prestige\/[a-z0-9_]+\.png$/i.test(sheet.url) || ![entry.x, entry.y, entry.w, entry.h, sheet.width, sheet.height].every(Number.isFinite) || entry.w <= 0) return '<span class="prestige-fallback" aria-hidden="true">' + (level === null ? '?' : 'P' + level) + '</span>';
    const scale = size / entry.w, url = new URL('../SharedFiles/' + sheet.url, document.baseURI).href;
    return '<span class="planner-prestige-sprite" aria-hidden="true" style="width:' + size + 'px;height:' + size + 'px;background-image:url(&quot;' + html(url) + '&quot;);background-size:' + sheet.width * scale + 'px ' + sheet.height * scale + 'px;background-position:' + -entry.x * scale + 'px ' + -entry.y * scale + 'px">' + (entry.label && level !== 99 && level !== 100 ? '<span class="planner-prestige-label">' + level + '</span>' : '') + '</span>';
  }
  function card(g, showCategory = false) {
    const c = find(g.character), level = current(c.id), finished = done(g), ended = expired(g);
    const progress = level === null ? null : Math.max(0, Math.min(100, (level - g.start) / (g.target - g.start) * 100));
    const state = finished ? 'Completed' : ended ? 'Expired' : level === null ? 'Awaiting spreadsheet data' : 'In progress';
    const details = [showCategory ? labels[g.category] : '', g.note, g.expires ? 'Until ' + new Date(expiryTime(g.expires)).toLocaleString([], {year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'}) : ''].filter(Boolean).join(' · ');
    const priorityLabel = g.priority <= 2 ? 'Lowest' : g.priority === 3 ? 'Low' : g.priority === 4 ? 'Below normal' : g.priority === 5 ? 'Normal' : g.priority === 6 ? 'Above normal' : g.priority === 7 ? 'High' : 'Highest';
    const priorityClass = 'priority-' + priorityLabel.toLowerCase().replace(' ', '-');
    const actions = draft ? '<div class="goal-actions"><button type="button" data-action="edit">Edit</button><button type="button" data-action="remove" class="danger">Remove</button></div>' : '';
    return '<article class="goal ' + (finished || ended ? 'done' : '') + ($('goal-near').checked && active(g) && progress !== null && progress > 75 ? ' nearly-complete' : '') + '" data-id="' + html(g.id) + '"><div class="goal-head"><img class="portrait" src="' + html(image(c)) + '" alt="" loading="lazy"><div class="goal-main"><h3>' + html(c.name) + '</h3><p class="muted small">' + state + (errors[c.role] && level !== null ? ' · previous data' : '') + '</p><span class="goal-priority ' + priorityClass + '" aria-label="Priority: ' + priorityLabel + '">Priority: ' + priorityLabel + '</span></div></div><div class="prestige-route"><div class="prestige-current" aria-label="Current prestige: ' + (level === null ? 'unknown' : 'P' + level) + '">' + prestigeIcon(level, 48) + '</div><span class="prestige-transition-wrap" aria-hidden="true"><span class="prestige-current-number">' + (level === null ? '?' : 'P' + level) + '</span><span class="prestige-transition"><i></i><i></i></span></span><div class="prestige-target" aria-label="Target prestige: P' + g.target + '">' + prestigeIcon(g.target, 76) + '</div></div>' + (details ? '<p class="goal-detail small muted" title="' + html(details) + '">' + html(details) + '</p>' : '') + '<div class="goal-progress"><div class="goal-progress-heading"><span>Progress</span><strong>' + (progress === null ? 'Unknown' : Math.floor(progress) + '%') + '</strong></div><div class="progress' + (progress === null ? ' progress-unknown' : '') + '"' + (progress === null ? ' aria-label="Progress unknown"' : ' role="progressbar" aria-label="' + html(c.name) + ' prestige goal" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.floor(progress) + '"') + '><span style="width:' + (progress ?? 0) + '%"></span></div><span class="progress-remaining">' + (progress === null ? 'Awaiting spreadsheet data' : Math.max(0, g.target - level) + ' prestiges left') + '</span></div>' + actions + '</article>';
  }

  function render() {
    const list = ranked(goals()), counted = list.filter(g => summaryCategories.has(g.category)), ongoing = counted.filter(active);
    const maxTargets = new Map();
    ongoing.forEach(g => maxTargets.set(g.character, Math.max(maxTargets.get(g.character) ?? 0, g.target)));
    let remaining = 0, unknown = false;
    for (const [id, target] of maxTargets) { const level = current(id); if (level === null) unknown = true; else remaining += Math.max(0, target - level); }
    $('active-count').textContent = ongoing.length;
    $('complete-count').textContent = counted.filter(done).length;
    $('prestiges-left').textContent = unknown ? remaining + ' + unknown' : remaining;
    $('view-label').textContent = draft ? 'Preview' + (dirty ? ' · changes to download' : '') : '';
    const query = $('goal-search').value.trim().toLocaleLowerCase(), role = $('goal-role-filter').value, state = $('goal-status-filter').value;
    const sort = $('goal-sort').value;
    const matches = g => {
      const c = find(g.character);
      return c.name.toLocaleLowerCase().includes(query) && (role === 'all' || c.role === role) && (state === 'all' || (state === 'active' && active(g)) || (state === 'completed' && done(g)) || (state === 'expired' && expired(g) && !done(g)));
    };
    const order = items => {
      const result = [...items];
      if (sort === 'name') result.sort((a, b) => find(a.character).name.localeCompare(find(b.character).name));
      if (sort === 'closest') result.sort((a, b) => (current(a.character) === null ? Infinity : Math.max(0, a.target - current(a.character))) - (current(b.character) === null ? Infinity : Math.max(0, b.target - current(b.character))));
      if (sort === 'progress') result.sort((a, b) => (progressOf(b) ?? -1) - (progressOf(a) ?? -1));
      if (sort === 'priority') result.sort((a, b) => Number(done(a)) - Number(done(b)) || b.priority - a.priority);
      return result;
    };
    $('nav-count-all').textContent = list.filter(active).length;
    $('all-goals-panel').hidden = selectedCategory !== 'all';
    const allVisible = order(list.filter(matches));
    $('count-all').textContent = allVisible.length + ' shown';
    $('queue-all').innerHTML = allVisible.map(g => card(g, true)).join('') || '<p class="empty small">No goals match these filters.</p>';
    for (const category of categories) {
      const group = list.filter(g => g.category === category), visible = order(group.filter(matches));
      $('nav-count-' + category).textContent = group.filter(active).length;
      $('queue-' + category).closest('.category-panel').hidden = category !== selectedCategory;
      $('count-' + category).textContent = group.filter(active).length + ' active / ' + group.length;
      $('queue-' + category).innerHTML = visible.map(g => card(g)).join('') || '<p class="empty small">' + (group.length ? 'No goals match these filters.' : 'No goals in this category.') + '</p>';
    }
    const completed = characters.filter(c => current(c.id) === 100);
    const matched = completed.filter(c => c.name.toLocaleLowerCase().includes(query) && (role === 'all' || c.role === role));
    const unavailable = ['killer', 'survivor'].filter(r => !snapshots[r]);
    $('nav-count-p100-completed').textContent = completed.length;
    $('count-p100-completed').textContent = completed.length;
    $('p100-completed-panel').hidden = selectedCategory !== 'p100-completed';
    $('status-filter-label').hidden = selectedCategory === 'p100-completed';
    $('inactive-filter-label').hidden = selectedCategory === 'p100-completed';
    $('goal-sort').closest('label').hidden = selectedCategory === 'p100-completed';
    $('goal-near').closest('label').hidden = selectedCategory === 'p100-completed';
    const issues = ['killer', 'survivor'].filter(r => errors[r] || unavailable.includes(r));
    $('p100-source-note').textContent = issues.length ? 'Some spreadsheet data is unavailable or from a previous refresh. See data status above.' : '';
    $('queue-p100-completed').innerHTML = matched.map(c => '<article class="goal completed-character"><div class="goal-head"><img class="portrait" src="' + html(image(c)) + '" alt="" loading="lazy"><div class="goal-main"><h3>' + html(c.name) + '</h3><p class="muted small">' + (c.role === 'killer' ? 'Killer' : 'Survivor') + (errors[c.role] ? ' · previous data' : '') + '</p></div></div><div class="completed-prestige" role="img" aria-label="Prestige P100">' + prestigeIcon(100, 76) + '</div></article>').join('') || '<p class="empty small">' + (unavailable.length ? 'P100 data is not available for every role.' : completed.length ? 'No characters match these filters.' : 'No P100 characters found.') + '</p>';
    sources();
    renderCharacterGoals();
    expirySignature = goals().map(g => expired(g)).join();
  }
  function renderCharacterGoals() {
    const id = $('goal-character').value;
    const existing = draft ? ranked(draft.filter(g => g.character === id)) : [];
    $('character-goals').hidden = !existing.length;
    $('character-goals').innerHTML = existing.length ? '<h3>Existing goals</h3><div class="existing-goals-list">' + existing.map(g => '<div class="existing-goal" data-id="' + html(g.id) + '"><span><strong>' + html(labels[g.category]) + ' · P' + g.target + '</strong><small>' + (done(g) ? 'Completed' : expired(g) ? 'Expired' : 'In progress') + (g.note ? ' · ' + html(g.note) : '') + '</small></span><button type="button" data-action="edit"' + (editingId === g.id ? ' disabled' : '') + '>' + (editingId === g.id ? 'Editing' : 'Edit') + '</button></div>').join('') + '</div>' : '';
  }
  function fillCharacters() {
    $('goal-character').disabled = !$('goal-role').value;
    $('goal-character').innerHTML = '<option value="" selected disabled>Choose a character…</option>' + characters.filter(c => c.role === $('goal-role').value).map(c => '<option value="' + html(c.id) + '">' + html(c.name) + '</option>').join('');
    fillBaseline();
  }
  function fillBaseline(resetTarget = true) {
    const id = $('goal-character').value, level = current(id);
    $('goal-start').value = level ?? '';
    $('goal-target').min = level === null ? 1 : level + 1;
    if (resetTarget) $('goal-target').value = $('goal-category').value === 'road-to-p100' ? 100 : level === null || level >= 100 ? '' : Math.min(100, level + (level === 0 ? 3 : 1));
    $('save-goal').disabled = !find(id) || level === null || !!errors[find(id)?.role] || level >= 100;
    $('stage-hint').textContent = !id ? '' : level === null ? 'Prestige unavailable. Refresh data.' : errors[find(id)?.role] ? 'Refresh failed. Try again before saving.' : level >= 100 ? 'This character is already P100.' : '';
    $('stage-hint').hidden = !$('stage-hint').textContent;
    renderCharacterGoals();
  }
  function categoryChanged() {
    const temporary = $('goal-category').value === 'temporary';
    $('expiry-field').hidden = !temporary;
    $('goal-expires').required = temporary;
    const road = $('goal-category').value === 'road-to-p100';
    $('goal-target').readOnly = road;
    if (road) $('goal-target').value = 100;
  }
  function resetForm() {
    editingId = null; formDirty = false;
    $('goal-form').reset();
    fillCharacters(); categoryChanged();
    $('save-goal').textContent = 'Add goal'; $('cancel-edit').hidden = true;
  }
  function editGoal(g) {
    editingId = g.id; formDirty = false;
    $('goal-role').value = find(g.character).role; fillCharacters();
    $('goal-character').value = g.character;
    for (const key of ['category', 'target', 'priority', 'note']) $('goal-' + key).value = g[key] ?? '';
    $('goal-expires').value = g.expires ? localDateTime(expiryTime(g.expires)) : '';
    fillBaseline(false); categoryChanged();
    $('save-goal').textContent = 'Save goal'; $('cancel-edit').hidden = false;
    $('editor').scrollIntoView({behavior: 'smooth', block: 'start'}); $('goal-character').focus();
  }
  async function sync() {
    if ($('sync').disabled) return;
    $('sync').disabled = true; status('Reading goals file and current prestiges…');
    try {
      await Promise.all([
        (async () => {
          try {
            const response = await fetch('data/goals.json?_=' + Date.now(), {cache: 'no-store', signal: AbortSignal.timeout(15000)});
            if (!response.ok) throw new Error('HTTP ' + response.status);
            published = validate(await response.json()); loaded = true; delete errors.goals;
          } catch (e) { errors.goals = e.message; }
        })(),
        ...['killer', 'survivor'].map(async r => {
          try { snapshots[r] = await T.prestiges(r, characters); delete errors[r]; }
          catch (e) { errors[r] = e.message; }
        })
      ]);
      render();
      if (draft) fillBaseline(false);
      status(Object.keys(errors).length ? 'Some data could not be refreshed.' : '', !!Object.keys(errors).length);
    } finally { $('sync').disabled = false; if (!draft) $('open-editor').disabled = !loaded; }
  }
  $('open-editor').onclick = () => {
    if (!loaded) { status('Goals are not loaded. Refresh data before editing.', true); return; }
    draft = published.map(g => ({...g})); dirty = false;
    $('editor').hidden = false; $('open-editor').disabled = true;
    $('goal-status-filter').value = 'all'; $('show-inactive').checked = true; resetForm(); render(); $('goal-character').focus();
  };
  $('close-editor').onclick = async () => {
    if ((dirty || formDirty || priorityChanges.size) && !await T.confirmAction('Close without downloading your changes?')) return;
    draft = null; dirty = false; formDirty = false; editingId = null; $('editor').hidden = true;
    $('open-editor').disabled = false;
    categories.forEach(c => { $('priorities-' + c).hidden = true; });
    priorityChanges.clear();
    render(); $('open-editor').focus();
  };
  $('goal-form').addEventListener('input', () => { formDirty = true; });
  $('goal-form').addEventListener('change', () => { formDirty = true; });
  $('goal-role').onchange = fillCharacters;
  $('goal-character').onchange = () => fillBaseline();
  $('goal-category').onchange = categoryChanged;
  $('cancel-edit').onclick = resetForm;
  $('goal-form').onsubmit = e => {
    e.preventDefault(); if (!draft) return;
    if (!editingId && draft.length >= 500) { status('The file supports up to 500 goals.', true); return; }
    const character = $('goal-character').value, level = current(character), target = Number($('goal-target').value);
    if (!$('goal-role').value || !find(character) || find(character).role !== $('goal-role').value || level === null || errors[find(character).role] || !T.integer(target, 1) || target <= level) { status('Choose a role and character with current spreadsheet data, and a target above their current prestige.', true); return; }
    const expiryInput = $('goal-expires').value;
    if ($('goal-category').value === 'temporary' && (!expiryInput || !Number.isFinite(new Date(expiryInput).getTime()) || localDateTime(expiryInput) !== expiryInput)) { status('Choose a valid expiry date and time.', true); return; }
    const g = {id: editingId ?? crypto.randomUUID(), character: $('goal-character').value, category: $('goal-category').value, start: level, target, priority: Number($('goal-priority').value), expires: $('goal-category').value === 'temporary' ? new Date(expiryInput).toISOString() : null, note: $('goal-note').value.trim()};
    try {
      const proposed = editingId ? draft.map(x => x.id === editingId ? g : x) : [...draft, g];
      draft = validate({app: 'dbd-prestige-goals', version: 2, goals: proposed});
      dirty = true; resetForm(); render(); status('Goal saved to preview.');
    } catch (error) { status(error.message, true); }
  };
  document.querySelector('.goal-categories').onclick = async e => {
    const priorityButton = e.target.closest('[data-priorities]');
    if (priorityButton) { openPriorities(priorityButton.dataset.priorities); return; }
    const button = e.target.closest('[data-action]'); if (!button) return;
    if (!draft) return;
    const g = draft.find(g => g.id === button.closest('[data-id]').dataset.id); if (!g) return;
    if (button.dataset.action === 'edit') {
      if (formDirty && !await T.confirmAction('Discard the unsaved goal form and edit another goal?')) return;
      if (draft) editGoal(g);
    }
    if (button.dataset.action === 'remove' && await T.confirmAction('Remove this goal from the preview?') && draft) {
      draft = draft.filter(x => x.id !== g.id); dirty = true;
      if (editingId === g.id) resetForm(); render();
    }
  };
  async function openPriorities(category) {
    if (!categories.includes(category)) return;
    if (!draft) $('open-editor').onclick();
    if (!draft) return;
    const form = $('priorities-' + category);
    if (!form.hidden) {
      if (priorityChanges.has(category) && !await T.confirmAction('Discard the unsaved priority changes?')) return;
      form.hidden = true; priorityChanges.delete(category); return;
    }
    const group = ranked(draft.filter(g => g.category === category));
    if (!group.length) { status('No goals in this category.'); return; }
    form.innerHTML = '<div class="priority-rows">' + group.map(g => '<label class="priority-row"><span><strong>' + html(find(g.character).name) + '</strong><small>P' + g.target + (done(g) ? ' · Completed' : expired(g) ? ' · Expired' : '') + '</small></span><input type="number" min="0" max="999" step="1" required value="' + g.priority + '" data-priority-id="' + html(g.id) + '" aria-label="Priority for ' + html(find(g.character).name) + ' P' + g.target + '"></label>').join('') + '</div><div class="row"><button type="submit" class="primary">Apply priorities</button><button type="button" data-cancel-priorities>Cancel</button></div>';
    form.hidden = false;
    form.oninput = () => priorityChanges.add(category);
    form.querySelector('[data-cancel-priorities]').onclick = () => { form.hidden = true; priorityChanges.delete(category); };
    form.onsubmit = e => {
      e.preventDefault(); if (!draft || !form.reportValidity()) return;
      const changes = new Map([...form.querySelectorAll('[data-priority-id]')].map(input => [input.dataset.priorityId, Number(input.value)]));
      if ([...changes.values()].some(value => !T.integer(value, 0, 999))) return;
      draft = draft.map(g => g.category === category && changes.has(g.id) ? {...g, priority: changes.get(g.id)} : g);
      if (editingId && changes.has(editingId)) $('goal-priority').value = changes.get(editingId);
      dirty = true; form.hidden = true; priorityChanges.delete(category); render(); status('Priorities updated in preview.');
    };
    form.querySelector('input')?.focus();
  }
  $('character-goals').onclick = document.querySelector('.goal-categories').onclick;
  $('download').onclick = () => {
    if (!draft) return;
    if (priorityChanges.size) { status('Apply or cancel the priority changes before downloading.', true); return; }
    if (formDirty) { status('Save or cancel the current goal before downloading.', true); return; }
    T.exportJSON({app: 'dbd-prestige-goals', version: 2, goals: draft}, 'goals.json');
    dirty = false; render(); status('Goals downloaded.');
  };
  document.querySelectorAll('.category-choice').forEach(button => {
    button.onclick = () => {
      selectedCategory = button.dataset.category;
      try { localStorage.setItem(categoryStorageKey, selectedCategory); } catch (_) {}
      document.querySelectorAll('.category-choice').forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
      render();
    };
  });
  $('goal-search').addEventListener('input', render);
  $('goal-role-filter').addEventListener('change', render);
  $('goal-status-filter').addEventListener('change', () => { $('show-inactive').checked = $('goal-status-filter').value === 'all'; render(); });
  $('show-inactive').addEventListener('change', () => { $('goal-status-filter').value = $('show-inactive').checked ? 'all' : 'active'; render(); });
  $('goal-sort').addEventListener('change', render);
  $('goal-near').addEventListener('change', render);
  document.querySelectorAll('[data-summary-category]').forEach(input => {
    input.onchange = () => {
      if (input.checked) summaryCategories.add(input.dataset.summaryCategory);
      else summaryCategories.delete(input.dataset.summaryCategory);
      render();
    };
  });
  $('sync').onclick = sync;
  window.addEventListener('beforeunload', e => { if (dirty || formDirty || priorityChanges.size) { e.preventDefault(); e.returnValue = ''; } });
  async function init() {
    try {
      const [roster, sprites] = await Promise.all([SharedCatalog.characters(), SharedCatalog.load('prestige').catch(() => null)]);
      characters = [...roster]; prestigeSprites = sprites;
      $('sync').disabled = false;
      document.querySelectorAll('.category-choice').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === selectedCategory)));
      render();
      await sync();
      setInterval(() => { if (!document.hidden && goals().map(g => expired(g)).join() !== expirySignature) render(); }, 1000);
      document.addEventListener('visibilitychange', () => { if (!document.hidden) render(); });
    } catch (e) { status('Could not load characters. Reload to try again. ' + e.message, true); }
  }
  init();
})();
