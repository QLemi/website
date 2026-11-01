(() => {
  'use strict';
  const T = DBDTools, {$, html, image, status} = T, KEY = 'dbd-wheel-v1';
  let killers = [], perks = [], selected = new Set(), perkSelected = new Set(), history = [], busy = false, last = null;
  let catalogs = {}, selections = {}, perkSelections = {};
  let audioContext = null, lastTick = 0;
  function startSound() { try { const Audio = window.AudioContext || window.webkitAudioContext; if (!Audio) return; audioContext ||= new Audio(); if (audioContext.state === 'suspended') audioContext.resume().catch(() => {}); lastTick = 0; } catch {} }
  function tone(frequency, length, strength, glide = true) { try { if (!audioContext || audioContext.state !== 'running' || $('sound-mute').checked) return; const volume = Number($('sound-volume').value) / 100; if (!volume) return; const now = audioContext.currentTime, oscillator = audioContext.createOscillator(), gain = audioContext.createGain(); oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(frequency, now); if (glide) oscillator.frequency.exponentialRampToValueAtTime(frequency * .72, now + length); gain.gain.setValueAtTime(.0001, now); gain.gain.linearRampToValueAtTime(Math.max(.0001, volume * strength), now + .004); gain.gain.exponentialRampToValueAtTime(.0001, now + length); oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.start(now); oscillator.stop(now + length); } catch {} }
  function tickSound(view, distance, progress, time) { const track = view.querySelector('.roulette-track'), first = track.children[0], next = track.children[1]; if (!first || !next) return; const step = next.offsetLeft - first.offsetLeft; if (!step) return; const index = Math.floor((view.clientWidth / 2 + distance * progress - first.offsetLeft + (step - first.offsetWidth) / 2) / step); if (view.dataset.tickIndex !== undefined && Number(view.dataset.tickIndex) !== index && time - lastTick >= 70) { lastTick = time; tone(440, .018, .16, false); } view.dataset.tickIndex = String(index); }
  function soundSettings() { $('sound-level').textContent = $('sound-volume').value + '%'; persist(); }
  const pool = () => killers.filter(c => selected.has(c.id));
  const matchesSelection = (filter, isSelected) => filter === 'all' || (filter === 'selected' ? isSelected : !isSelected);
  const visibleKillers = () => killers.filter(c => matchesSelection($('character-selection-filter').value, selected.has(c.id)) && ($('license').value === 'all' || c.license === $('license').value) && ($('gender-filter').value === 'all' || c.gender === $('gender-filter').value) && T.normalize(c.name + ' ' + c.chapterName).includes(T.normalize($('killer-search').value)));
  const visiblePerks = () => perks.filter(p => matchesSelection($('perk-selection-filter').value, perkSelected.has(p.id)) && T.normalize(p.name).includes(T.normalize($('perk-search').value)));
  function persist() { T.save(KEY, {selected:[...selected], perks:[...perkSelected], build:$('with-build').checked, noRepeat:$('no-repeat').checked, duration:$('duration').value, soundVolume:Number($('sound-volume').value), soundMuted:$('sound-mute').checked, role:$('draw-role').value, drawType:$('draw-type').value, drawCount:$('draw-count').value, selections:Object.fromEntries(Object.entries(selections).map(([k,v])=>[k,[...v]])), perkSelections:Object.fromEntries(Object.entries(perkSelections).map(([k,v])=>[k,[...v]])), history}); }
  function counts() {
    const n = pool().length, perkMode = $('draw-type').value === 'perk', required = perkMode ? Number($('draw-count').value) : 4;
    $('pool-count').textContent = n + ' characters · ' + perkSelected.size + ' perks'; $('selected-count').textContent = n + ' selected'; $('perk-count').textContent = perkSelected.size;
    $('spin').disabled = busy || (perkMode ? perkSelected.size < required : !n || ($('with-build').checked && perkSelected.size < 4));
    $('spin-hint').textContent = perkMode ? (perkSelected.size < required ? 'Select at least ' + required + ' perks.' : '') : !n ? 'Select at least one character to spin.' : $('with-build').checked && perkSelected.size < 4 ? 'Select at least four perks, or switch off the build.' : '';
  }
  function renderKillers() { $('character-filter-count').textContent = visibleKillers().length + ' shown · ' + selected.size + ' selected'; $('killer-pool').innerHTML = visibleKillers().map(c => '<label class="choice"><input type="checkbox" data-killer="' + html(c.id) + '" ' + (selected.has(c.id) ? 'checked' : '') + '><img src="' + html(image(c)) + '" alt="" loading="lazy"><span>' + html(c.name) + '</span></label>').join('') || '<p class="muted small">No characters match this filter.</p>'; }
  function renderPerks() { $('perk-filter-count').textContent = visiblePerks().length + ' shown · ' + perkSelected.size + ' selected'; $('perk-pool').innerHTML = visiblePerks().map(p => '<label class="choice"><input type="checkbox" data-perk="' + html(p.id) + '" ' + (perkSelected.has(p.id) ? 'checked' : '') + '><span>' + html(p.name) + '</span></label>').join('') || '<p class="muted small">No perks match this filter.</p>'; }
  function changed() { counts(); persist(); }
  function renderHistory() { $('history').innerHTML = history.map(h => { const c = killers.find(c => c.id === h.id); return c ? '<div class="history-item"><img src="' + html(image(c)) + '" alt=""><span>' + html(c.name) + '<br><span class="muted small">' + h.perks.map(id => html(perks.find(p => p.id === id)?.name || id)).join(' · ') + '</span></span><small>' + new Date(h.time).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) + '</small></div>' : ''; }).join('') || '<p class="muted small">Your last 8 spins will appear here.</p>'; }
  function setDrawMode() {
    const perkMode = $('draw-type').value === 'perk';
    document.querySelectorAll('[data-draw-choice]').forEach(button => { const selected = button.dataset.drawChoice === (perkMode ? 'perk' : $('with-build').checked ? 'build' : 'character'); button.setAttribute('aria-pressed', String(selected)); button.classList.toggle('is-selected', selected); });
    $('character-pool-panel').hidden = perkMode; $('no-repeat-option').hidden = perkMode;
    $('perks-panel').hidden = !perkMode && !$('with-build').checked;
    $('roulette-rows').classList.toggle('perk-roulette', perkMode);
    $('draw-count-label').hidden = !perkMode; $('build-option').hidden = true;
    document.querySelectorAll('[data-role]').forEach(button => { const selected = button.dataset.role === $('draw-role').value; button.setAttribute('aria-pressed', String(selected)); button.classList.toggle('is-selected', selected); });
    renderPreview();
    persist();
  }
  function randomDirections(count) { const first = T.random(2) === 1, directions = Array.from({length: count}, (_, i) => i % 2 ? !first : first); return T.sample(directions, count); }
  function prepareRoulette(entries, winner, view = $('roulette-view'), small = false, reverse = false) {
    const cards = Array.from({length: 80 + Math.ceil(view.clientWidth / 60)}, () => entries[T.random(entries.length)]);
    cards[37] = winner;
    const alternatives = entries.filter(c => c.id !== winner.id);
    if (alternatives.length) {
      for (let i = 33; i <= 41; i++) {
        if (i !== 37 && cards[i].id === winner.id) cards[i] = alternatives[T.random(alternatives.length)];
      }
    }
    const track = view.querySelector('.roulette-track');
    track.innerHTML = cards.map(c => '<div class="roulette-card' + (small ? ' perk-roulette-card' : '') + '"><img src="' + html(image(c)) + '" alt=""><span>' + html(c.name) + '</span></div>').join('');
    const card = track.children[37];
    const point = .15 + T.random(701) / 1000;
    const distance = card.offsetLeft + card.offsetWidth * point - view.clientWidth / 2;
    const startOffset = reverse ? distance * 2 : 0;
    view.dataset.startOffset = String(startOffset);
    track.style.transform = 'translateX(' + (-startOffset) + 'px)';
    return distance;
  }
  async function spin() {
    if (busy || $('spin').disabled) return;
    startSound();
    if ($('draw-type').value === 'perk') { await spinPerks(); return; }
    const entries = pool(), eligible = entries.filter(c => !$('no-repeat').checked || entries.length === 1 || c.id !== history[0]?.id);
    const winner = eligible[T.random(eligible.length)], index = entries.indexOf(winner), build = $('with-build').checked ? T.sample(perks.filter(p => perkSelected.has(p.id)), 4) : [];
    busy = true; counts(); $('spin').textContent = 'The Entity is choosing…'; document.querySelector('aside').inert = true;
    const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : Number($('duration').value) * .75;
    const rouletteViews = [], directions = randomDirections(1 + build.length);
    {
      $('roulette-rows').innerHTML = '';
      const addLane = (item, index, isPerk) => {
        const view = document.createElement('div'); view.className = 'roulette-view ' + (isPerk ? 'roulette-perk-lane' : 'roulette-character-lane');
        view.innerHTML = '<p class="roulette-caption">' + (isPerk ? 'Perk ' + (index + 1) : 'Selected character') + '</p><div class="roulette-reel"><div class="roulette-marker" aria-hidden="true"></div><div class="roulette-window"><div class="roulette-track"></div></div></div>';
        $('roulette-rows').append(view); rouletteViews.push({view, distance:prepareRoulette(isPerk ? perks.filter(p=>perkSelected.has(p.id)) : entries, item, view, isPerk, directions[rouletteViews.length])});
      };
      addLane(winner, 0, false);
      build.forEach((perk, index) => addLane(perk, index, true));
      $('roulette-rows').classList.toggle('perk-roulette', build.length > 0);
    }
    await new Promise(resolve => { let started; function frame(time) {
      started ??= time; const t = duration ? Math.min(1, (time - started) / duration) : 1;
      {
        let complete = true;
        rouletteViews.forEach(({view,distance}, lane) => { const laneDuration = duration ? duration + lane * 650 : 0; const laneT = laneDuration ? Math.min(1, (time - started) / laneDuration) : 1; if (laneT < 1) complete = false; const progress = 1 - Math.pow(1-laneT,4); const startOffset = Number(view.dataset.startOffset) || 0; const offset = startOffset + (distance - startOffset) * progress; tickSound(view, offset, 1, time); view.querySelector('.roulette-track').style.transform = 'translateX(' + (-offset) + 'px)'; });
        if (!complete) requestAnimationFrame(frame); else resolve(); return;
      }
    } requestAnimationFrame(frame); });
    busy = false; document.querySelector('aside').inert = false;
    last = {winner, build}; showResult(winner, build);
    status('Selected: ' + winner.name + (build.length ? '. Build: ' + build.map(p => p.name).join(', ') : '.'));
    history.unshift({id:winner.id, perks:build.map(p => p.id), time:Date.now()}); history = history.slice(0, 8); persist(); renderHistory(); $('spin').innerHTML = 'Spin again <span aria-hidden="true">↻</span>'; counts();
  }
  async function spinPerks() {
    const entries = perks.filter(p => perkSelected.has(p.id)), winners = T.sample(entries, Number($('draw-count').value));
    busy = true; document.querySelector('aside').inert = true; counts();
    $('spin').textContent = 'The Entity is choosing…';
    const rows = $('roulette-rows'); rows.innerHTML = '';
    const views = winners.map((winner, i) => {
      const view = document.createElement('div'); view.className = 'roulette-view roulette-perk-lane';
      view.innerHTML = '<p class="roulette-caption">Perk ' + (i + 1) + '</p><div class="roulette-reel"><div class="roulette-marker" aria-hidden="true"></div><div class="roulette-window"><div class="roulette-track"></div></div></div>'; 
      rows.append(view); return view;
    });
    const directions = randomDirections(views.length);
    const distances = views.map((view, i) => prepareRoulette(entries.filter(p => !winners.slice(0, i).some(w => w.id === p.id)), winners[i], view, true, directions[i]));
    const base = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : Number($('duration').value) * .75;
    await new Promise(resolve => { let started; function frame(time) {
      started ??= time; let done = true;
      views.forEach((view, i) => { const duration = base ? base + i * 650 : 0, t = duration ? Math.min(1, (time - started) / duration) : 1; if (t < 1) done = false; const progress = 1 - Math.pow(1 - t, 4); const startOffset = Number(view.dataset.startOffset) || 0; const offset = startOffset + (distances[i] - startOffset) * progress; tickSound(view, offset, 1, time); view.querySelector('.roulette-track').style.transform = 'translateX(' + (-offset) + 'px)'; });
      if (done) resolve(); else requestAnimationFrame(frame);
    } requestAnimationFrame(frame); });
    last = {winner: {name:'Perk build'}, build:winners}; showResult(null, winners);
    status('Selected perks: ' + winners.map(p => p.name).join(', ') + '.');
    busy = false; document.querySelector('aside').inert = false; $('spin').innerHTML = 'Spin again <span aria-hidden="true">↻</span>'; counts();
  }
  function showResult(character, items) {
    $('winner-image').hidden = !character;
    if (character) { $('winner-image').src = image(character); $('winner-image').alt = character.name; }
    $('result-heading').textContent = character ? character.name : 'Perk build'; $('winner-chapter').textContent = character?.chapterName || '';
    const positions = ['top','left','right','bottom'];
    $('build').innerHTML = items.length ? positions.map((position, index) => { const perk = items[index]; return '<div class="result-perk ' + position + (perk ? '' : ' empty') + '">' + (perk ? '<img src="' + html(image(perk)) + '" alt="' + html(perk.name) + '">' : '') + '</div>'; }).join('') : '';
    $('build').hidden = !items.length; $('perk-names').textContent = items.map(perk => perk.name).join(' · '); $('result-overlay').hidden = false; $('close-result').focus();
  }
  function closeResult() { $('result-overlay').hidden = true; $('spin').focus(); }
  $('close-result').addEventListener('click', closeResult);
  $('result-overlay').addEventListener('keydown', event => { if (event.key === 'Escape') { event.preventDefault(); closeResult(); } else if (event.key === 'Tab') { const buttons = [$('close-result'), $('copy-result')], first = buttons[0], lastButton = buttons[1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); lastButton.focus(); } else if (!event.shiftKey && document.activeElement === lastButton) { event.preventDefault(); first.focus(); } } });
  function switchRole() {
    const role = $('draw-role').value; document.body.classList.toggle('wheel-survivors', role === 'survivor'); killers = catalogs[role]; perks = catalogs[role + 'Perks']; selected = selections[role]; perkSelected = perkSelections[role];
    $('character-pool-heading').textContent = role === 'killer' ? 'Killer pool' : 'Survivor pool';
    $('license').value = 'all'; $('gender-filter').value = 'all';
    $('killer-search').value = ''; $('perk-search').value = '';
    renderKillers(); renderPerks(); changed(); renderHistory();
  }
  function renderPreview() {
    const perkMode = $('draw-type').value === 'perk', buildMode = !perkMode && $('with-build').checked;
    const count = perkMode ? Number($('draw-count').value) : buildMode ? 5 : 1;
    $('roulette-rows').classList.toggle('perk-roulette', perkMode || buildMode);
    $('roulette-rows').innerHTML = Array.from({length:count}, (_, index) => {
      const character = !perkMode && index === 0, title = character ? 'Character' : 'Perk ' + (perkMode ? index + 1 : index);
      return '<div class="roulette-view ' + (character ? 'roulette-character-lane' : 'roulette-perk-lane') + '"><p class="roulette-caption">' + title + '</p><div class="roulette-reel"><div class="roulette-marker" aria-hidden="true"></div><div class="roulette-window"><div class="roulette-preview">Ready to spin</div></div></div></div>';
    }).join('');
  }
  async function init() {
    try {
      const data = await SharedCatalog.loadMany(['killers','survivors','killerPerks','survivorPerks']); const stored = T.read(KEY, null);
      catalogs = {killer:[...data.killers.entries], survivor:[...data.survivors.entries], killerPerks:[...data.killerPerks.entries], survivorPerks:[...data.survivorPerks.entries]};
      for (const role of ['killer','survivor']) {
        const saved = stored?.selections?.[role] ?? (role === 'killer' ? stored?.selected : null), savedPerks = stored?.perkSelections?.[role] ?? (role === 'killer' ? stored?.perks : null);
        selections[role] = new Set(Array.isArray(saved) ? saved.filter(id => catalogs[role].some(c => c.id === id)) : catalogs[role].map(c => c.id));
        perkSelections[role] = new Set(Array.isArray(savedPerks) ? savedPerks.filter(id => catalogs[role+'Perks'].some(c => c.id === id)) : catalogs[role+'Perks'].map(c => c.id));
      }
      if (stored) { if (Number.isFinite(stored.soundVolume)) $('sound-volume').value = Math.max(0, Math.min(100, stored.soundVolume)); $('sound-mute').checked = stored.soundMuted === true; $('sound-level').textContent = $('sound-volume').value + '%'; $('draw-role').value = stored.role === 'survivor' ? 'survivor' : 'killer';  $('draw-type').value = stored.drawType === 'perk' ? 'perk' : 'character'; $('draw-count').value = ['1','2','3','4'].includes(stored.drawCount) ? stored.drawCount : '1'; $('with-build').checked = stored.build !== false; $('no-repeat').checked = stored.noRepeat === true; if (['3000','5600'].includes(stored.duration)) $('duration').value = stored.duration; history = Array.isArray(stored.history) ? stored.history.filter(h => h && typeof h.id === 'string' && Array.isArray(h.perks) && h.perks.every(p => typeof p === 'string') && Number.isFinite(h.time)).slice(0,8) : []; }
      switchRole();
      setDrawMode(); renderKillers(); renderPerks(); counts(); renderHistory(); status('Ready. Choose your pool and spin.');
    } catch (e) { status('Could not load the catalog. Reload to try again. ' + e.message, true); }
  }
  function resetDisplay() {
    $('roulette-rows').innerHTML = '';
    $('result-overlay').hidden = true; last = null;
    $('spin').innerHTML = 'Spin <span aria-hidden="true">↻</span>';
  }
  document.querySelectorAll('[data-role]').forEach(button => button.addEventListener('click', () => { $('draw-role').value = button.dataset.role; resetDisplay(); switchRole(); setDrawMode(); }));
  function chooseType(type) { $('draw-type').value = type; resetDisplay(); setDrawMode(); counts(); }
  document.querySelectorAll('[data-draw-choice]').forEach(button => button.addEventListener('click', () => { const choice = button.dataset.drawChoice; $('with-build').checked = choice === 'build'; chooseType(choice === 'perk' ? 'perk' : 'character'); document.querySelectorAll('[data-draw-choice]').forEach(item => { const selected = item === button; item.setAttribute('aria-pressed', String(selected)); item.classList.toggle('is-selected', selected); }); }));
  $('draw-type').addEventListener('change', () => chooseType($('draw-type').value));
  $('draw-count').addEventListener('change', () => { resetDisplay(); setDrawMode(); counts(); });
  $('sound-volume').addEventListener('input', soundSettings);
  $('sound-mute').addEventListener('change', soundSettings);
  $('spin').addEventListener('click', spin);
  for (const id of ['license','gender-filter','killer-search','character-selection-filter']) $(id).addEventListener('input', renderKillers);
  for (const id of ['perk-search','perk-selection-filter']) $(id).addEventListener('input', renderPerks);
  $('character-filter-reset').addEventListener('click', () => { $('license').value = 'all'; $('gender-filter').value = 'all'; $('killer-search').value = ''; $('character-selection-filter').value = 'all'; renderKillers(); });
  $('perk-filter-reset').addEventListener('click', () => { $('perk-search').value = ''; $('perk-selection-filter').value = 'all'; renderPerks(); });
  $('killer-pool').addEventListener('change', e => { const id = e.target.dataset.killer; if (!id) return; e.target.checked ? selected.add(id) : selected.delete(id); renderKillers(); changed(); });
  $('perk-pool').addEventListener('change', e => { const id = e.target.dataset.perk; if (!id) return; e.target.checked ? perkSelected.add(id) : perkSelected.delete(id); renderPerks(); counts(); persist(); });
  for (const [id, checked, type] of [['select-visible',true,'killer'],['clear-visible',false,'killer'],['perks-select',true,'perk'],['perks-clear',false,'perk']]) $(id).addEventListener('click', () => { const set = type === 'killer' ? selected : perkSelected; (type === 'killer' ? visibleKillers() : visiblePerks()).forEach(c => checked ? set.add(c.id) : set.delete(c.id)); renderKillers(); renderPerks(); changed(); });
  for (const id of ['with-build','no-repeat','duration']) $(id).addEventListener('change', () => { if (id === 'with-build') { setDrawMode(); $('perks-panel').hidden = !$('with-build').checked && $('draw-type').value !== 'perk'; } counts(); persist(); });
  $('clear-history').addEventListener('click', async () => { if (busy || !history.length || !await T.confirmAction('Clear the recent spins? Your pools will stay unchanged.')) return; history = []; persist(); renderHistory(); });
  $('copy-result').addEventListener('click', async () => { if (!last) return; try { await navigator.clipboard.writeText(last.winner.name + (last.build.length ? '\n' + last.build.map(p => p.name).join(' / ') : '')); status('Result copied.'); } catch { status('Clipboard is unavailable. You can select and copy the result on the page.', true); } });
  init();
})();


