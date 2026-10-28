(() => {
  'use strict';
  const T = DBDTools, {$, html, image, status} = T, KEY = 'dbd-wheel-v1';
  let killers = [], perks = [], selected = new Set(), perkSelected = new Set(), history = [], rotation = 0, busy = false, last = null;
  const ctx = $('wheel').getContext('2d');
  const pool = () => killers.filter(c => selected.has(c.id));
  const visibleKillers = () => killers.filter(c => ($('license').value === 'all' || c.license === $('license').value) && T.normalize(c.name + ' ' + c.chapterName).includes(T.normalize($('killer-search').value)));
  const visiblePerks = () => perks.filter(p => ($('perk-category').value === 'all' || p.categories.includes($('perk-category').value)) && T.normalize(p.name).includes(T.normalize($('perk-search').value)));
  function persist() { T.save(KEY, {selected:[...selected], perks:[...perkSelected], build:$('with-build').checked, noRepeat:$('no-repeat').checked, duration:$('duration').value, history}); }
  function draw(angle = rotation, entries = pool()) {
    ctx.clearRect(0, 0, 1000, 1000); const n = entries.length; ctx.save(); ctx.translate(500, 500); ctx.rotate(angle);
    if (!n) { ctx.beginPath(); ctx.arc(0, 0, 480, 0, Math.PI * 2); ctx.fillStyle = '#19151b'; ctx.fill(); }
    entries.forEach((c, i) => { const a = i * Math.PI * 2 / n - Math.PI / 2, b = (i + 1) * Math.PI * 2 / n - Math.PI / 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 478, a, b); ctx.closePath(); ctx.fillStyle = ['#672238','#251c27','#422133','#19222b'][i % 4]; ctx.fill(); ctx.strokeStyle = '#d8ad7c45'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.save(); ctx.rotate((a + b) / 2); ctx.fillStyle = '#f3e9e6'; ctx.textAlign = 'right'; ctx.font = '600 ' + Math.min(23, Math.max(12, 740 / n)) + 'px system-ui'; const name = c.name.replace(/^The /, ''); ctx.fillText(name.length > 19 ? name.slice(0, 18) + '…' : name, 440, 7); ctx.restore(); });
    ctx.beginPath(); ctx.arc(0, 0, 480, 0, Math.PI * 2); ctx.strokeStyle = '#bd9569'; ctx.lineWidth = 9; ctx.stroke();
    for (let i = 0; i < 48; i++) { const a = i * Math.PI / 24; ctx.beginPath(); ctx.arc(Math.cos(a) * 491, Math.sin(a) * 491, 3, 0, Math.PI * 2); ctx.fillStyle = '#cab18a'; ctx.fill(); } ctx.restore();
  }
  function counts() { const n = pool().length; $('pool-count').textContent = n + ' killers · ' + perkSelected.size + ' perks'; $('selected-count').textContent = n + ' selected'; $('perk-count').textContent = perkSelected.size; $('spin').disabled = busy || !n || ($('with-build').checked && perkSelected.size < 4); $('spin-hint').textContent = !n ? 'Select at least one killer to spin.' : $('with-build').checked && perkSelected.size < 4 ? 'Select at least four perks, or switch off the build.' : 'Every eligible killer has an equal chance.'; }
  function renderKillers() { $('killer-pool').innerHTML = visibleKillers().map(c => '<label class="choice"><input type="checkbox" data-killer="' + html(c.id) + '" ' + (selected.has(c.id) ? 'checked' : '') + '><img src="' + html(image(c)) + '" alt="" loading="lazy"><span>' + html(c.name) + '</span></label>').join('') || '<p class="muted small">No killers match this filter.</p>'; }
  function renderPerks() { $('perk-pool').innerHTML = visiblePerks().map(p => '<label class="choice"><input type="checkbox" data-perk="' + html(p.id) + '" ' + (perkSelected.has(p.id) ? 'checked' : '') + '><span>' + html(p.name) + '</span></label>').join('') || '<p class="muted small">No perks match this filter.</p>'; }
  function changed() { rotation = 0; draw(); counts(); persist(); }
  function renderHistory() { $('history').innerHTML = history.map(h => { const c = killers.find(c => c.id === h.id); return c ? '<div class="history-item"><img src="' + html(image(c)) + '" alt=""><span>' + html(c.name) + '<br><span class="muted small">' + h.perks.map(id => html(perks.find(p => p.id === id)?.name || id)).join(' · ') + '</span></span><small>' + new Date(h.time).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) + '</small></div>' : ''; }).join('') || '<p class="muted small">Your last 8 spins will appear here.</p>'; }
  async function spin() {
    if (busy || $('spin').disabled) return;
    const entries = pool(), eligible = entries.filter(c => !$('no-repeat').checked || entries.length === 1 || c.id !== history[0]?.id);
    const winner = eligible[T.random(eligible.length)], index = entries.indexOf(winner), build = $('with-build').checked ? T.sample(perks.filter(p => perkSelected.has(p.id)), 4) : [];
    busy = true; counts(); $('spin').textContent = 'The Entity is choosing…'; document.querySelector('aside').inert = true;
    const step = Math.PI * 2 / entries.length, offset = step * (.15 + T.random(700) / 1000), target = -(index * step + offset), start = rotation;
    const delta = Math.PI * 2 * 6 + ((target - rotation) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
    const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : Number($('duration').value);
    await new Promise(resolve => { let started; function frame(time) { started ??= time; const t = duration ? Math.min(1, (time - started) / duration) : 1; draw(start + delta * (1 - Math.pow(1 - t, 5)), entries); if (t < 1) requestAnimationFrame(frame); else resolve(); } requestAnimationFrame(frame); });
    rotation = (start + delta) % (Math.PI * 2); draw(); busy = false; document.querySelector('aside').inert = false;
    last = {winner, build}; $('wheel-core').textContent = winner.name.replace(/^The /, '').slice(0, 2).toUpperCase(); $('winner-image').src = image(winner); $('result-heading').textContent = winner.name; $('winner-chapter').textContent = winner.chapterName; $('build').innerHTML = build.map(p => '<div class="perk"><img src="' + html(image(p)) + '" alt=""><span>' + html(p.name) + '</span></div>').join(''); $('build-note').hidden = !build.length;
    $('result-panel').hidden = false; $('result-panel').classList.remove('reveal'); void $('result-panel').offsetWidth; $('result-panel').classList.add('reveal'); status('Selected: ' + winner.name + (build.length ? '. Build: ' + build.map(p => p.name).join(', ') : '.'));
    history.unshift({id:winner.id, perks:build.map(p => p.id), time:Date.now()}); history = history.slice(0, 8); persist(); renderHistory(); $('spin').innerHTML = 'Spin again <span aria-hidden="true">↻</span>'; counts();
  }
  async function init() {
    try {
      const data = await SharedCatalog.loadMany(['killers','killerPerks']); killers = [...data.killers.entries]; perks = [...data.killerPerks.entries]; const stored = T.read(KEY, null);
      selected = new Set(Array.isArray(stored?.selected) ? stored.selected.filter(id => killers.some(c => c.id === id)) : killers.map(c => c.id)); perkSelected = new Set(Array.isArray(stored?.perks) ? stored.perks.filter(id => perks.some(p => p.id === id)) : perks.map(p => p.id));
      if (stored) { $('with-build').checked = stored.build !== false; $('no-repeat').checked = stored.noRepeat === true; if (['3000','5600'].includes(stored.duration)) $('duration').value = stored.duration; history = Array.isArray(stored.history) ? stored.history.filter(h => h && typeof h.id === 'string' && Array.isArray(h.perks) && h.perks.every(p => typeof p === 'string') && Number.isFinite(h.time)).slice(0,8) : []; }
      $('perk-category').innerHTML += [...new Set(perks.flatMap(p => p.categories))].sort().map(c => '<option value="' + html(c) + '">' + html(c) + '</option>').join('');
      renderKillers(); renderPerks(); draw(); counts(); renderHistory(); status('Ready. Choose your pool and spin.');
    } catch (e) { status('Could not load the catalog. Reload to try again. ' + e.message, true); }
  }
  $('spin').addEventListener('click', spin);
  for (const id of ['license','killer-search']) $(id).addEventListener('input', renderKillers);
  for (const id of ['perk-category','perk-search']) $(id).addEventListener('input', renderPerks);
  $('killer-pool').addEventListener('change', e => { const id = e.target.dataset.killer; if (!id) return; e.target.checked ? selected.add(id) : selected.delete(id); changed(); });
  $('perk-pool').addEventListener('change', e => { const id = e.target.dataset.perk; if (!id) return; e.target.checked ? perkSelected.add(id) : perkSelected.delete(id); counts(); persist(); });
  for (const [id, checked, type] of [['select-visible',true,'killer'],['clear-visible',false,'killer'],['perks-select',true,'perk'],['perks-clear',false,'perk']]) $(id).addEventListener('click', () => { const set = type === 'killer' ? selected : perkSelected; (type === 'killer' ? visibleKillers() : visiblePerks()).forEach(c => checked ? set.add(c.id) : set.delete(c.id)); renderKillers(); renderPerks(); changed(); });
  for (const id of ['with-build','no-repeat','duration']) $(id).addEventListener('change', () => { counts(); persist(); });
  $('clear-history').addEventListener('click', async () => { if (busy || !history.length || !await T.confirmAction('Clear the recent spins? Your pools will stay unchanged.')) return; history = []; persist(); renderHistory(); });
  $('copy-result').addEventListener('click', async () => { if (!last) return; try { await navigator.clipboard.writeText(last.winner.name + (last.build.length ? '\n' + last.build.map(p => p.name).join(' / ') : '')); status('Result copied.'); } catch { status('Clipboard is unavailable. You can select and copy the result on the page.', true); } });
  init();
})();
