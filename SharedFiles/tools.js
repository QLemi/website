(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const html = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = value => SharedCatalog.normalize(value);
  const image = record => SharedCatalog.assetUrl(record?.image?.url) || SharedCatalog.fallback();
  function status(message, error = false) { $('status').textContent = message; $('status').classList.toggle('error', error); }
  const read = (key, fallback) => { let value; try { value = localStorage.getItem(key); } catch { status('Browser storage could not be read. Export a copy of your work before leaving.', true); return fallback; } if (!value) return fallback; try { return JSON.parse(value); } catch { status('Stored data could not be decoded. Download a recovery copy before starting fresh.',true); return {app:'unreadable-data'}; } };
  function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { status('Could not save in this browser. Export a copy before leaving.', true); return false; } }
  function download(blob, name) { const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 3000); }
  const exportJSON = (value, name) => download(new Blob([JSON.stringify(value, null, 2)], {type:'application/json'}), name);
  async function fileJSON(file) { if (!file || file.size > 12000000) throw new Error('Choose a JSON project smaller than 12 MB.'); return JSON.parse(await file.text()); }
  const integer = (value, min = 0, max = 100) => Number.isSafeInteger(value) && value >= min && value <= max;
  function recover(key,message) {
    status(message,true);
    const panel = document.createElement('section'); panel.className = 'notice row';
    const backup = document.createElement('button'), reset = document.createElement('button');
    backup.textContent = 'Download stored data'; reset.textContent = 'Start fresh';
    backup.onclick = () => { try { download(new Blob([localStorage.getItem(key) || ''],{type:'application/json'}),key+'-recovery.json'); } catch { status('Browser storage is unavailable.',true); } };
    reset.onclick = async () => { if (!await confirmAction('Start a new project on this device? Download the stored data first if you want to keep it.')) return; try { localStorage.removeItem(key); location.reload(); } catch { status('Browser storage is unavailable.',true); } };
    panel.append(backup,reset); $('status').after(panel);
  }
  function random(length) { if (!Number.isSafeInteger(length) || length < 1) throw new Error('The pool is empty.'); const data = new Uint32Array(1); const limit = Math.floor(4294967296 / length) * length; do { crypto.getRandomValues(data); } while (data[0] >= limit); return data[0] % length; }
  function sample(values, count) { const pool = [...values]; const result = []; while (pool.length && result.length < count) result.push(pool.splice(random(pool.length), 1)[0]); return result; }
  async function confirmAction(message) {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = '<h2>Confirm change</h2><p></p><form method="dialog" class="row"><button value="cancel" autofocus>Cancel</button><button value="confirm" class="primary">Continue</button></form>';
    dialog.querySelector('p').textContent = message; document.body.append(dialog); dialog.showModal();
    return new Promise(resolve => dialog.addEventListener('close', () => { const confirmed = dialog.returnValue === 'confirm'; dialog.remove(); resolve(confirmed); }, {once:true}));
  }
  function csv(text) {
    if (/^\s*</.test(text)) throw new Error('The sheet returned a web page instead of CSV.');
    const rows = []; let row = [], field = '', quoted = false;
    text = text.replace(/^\uFEFF/, '');
    for (let i = 0; i < text.length; i++) { const c = text[i]; if (quoted) { if (c === '"' && text[i + 1] === '"') { field += '"'; i++; } else if (c === '"') quoted = false; else field += c; } else if (c === '"') quoted = true; else if (c === ',') { row.push(field); field = ''; } else if (c === '\r' || c === '\n') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(field); rows.push(row); row = []; field = ''; } else field += c; }
    if (field || row.length) { row.push(field); rows.push(row); }
    if (quoted) throw new Error('Incomplete CSV data.');
    return rows;
  }
  async function prestiges(role, characters) {
    const gid = role === 'killer' ? STATS_CONFIG.SHEET_KILLERS_GID : STATS_CONFIG.SHEET_SURVIVORS_GID;
    const url = 'https://docs.google.com/spreadsheets/d/' + encodeURIComponent(STATS_CONFIG.SHEET_ID) + '/gviz/tq?tqx=out:csv&gid=' + encodeURIComponent(gid) + '&_=' + Date.now();
    const response = await fetch(url, {cache:'no-store', signal:AbortSignal.timeout(15000)});
    if (!response.ok) throw new Error('Sheet returned HTTP ' + response.status);
    const rows = csv(await response.text());
    const prestigeRow = rows.find((row, i) => i > 0 && /^(prestiz|prestige)/.test(normalize(row[0])));
    if (!rows[0] || !prestigeRow) throw new Error('No prestige row found in the statistics sheet.');
    const records = {};
    rows[0].forEach((name, col) => { if (!col) return; const character = characters.find(c => c.role === role && [c.name, ...(c.aliases || [])].some(alias => normalize(alias) === normalize(name))); const raw = (prestigeRow[col] || '').trim(); if (character && /^\d+$/.test(raw) && integer(Number(raw))) records[character.id] = Number(raw); });
    if (!Object.keys(records).length) throw new Error('No matching characters with a valid prestige (0–100).');
    return {values:records, time:Date.now()};
  }
  window.DBDTools = Object.freeze({$, html, normalize, image, status, read, save, download, exportJSON, fileJSON, integer, recover, random, sample, confirmAction, csv, prestiges});
})();
