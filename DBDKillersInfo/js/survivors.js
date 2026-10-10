/* Survivor hub: preview on the Survivors tab, editing only in Editor. */
let lastHubSurvivorId = "";
function ensureSurvivorMeta() {
  if (!state.survivorInfo) state.survivorInfo = { count: String((CONFIG.survivorRoster || CONFIG.survivorPortraits || []).length), perkCount: String((CONFIG.survivorPerks || []).length), note: "", patch: "" };
  else if (state.survivorInfo.count === "48") state.survivorInfo.count = String((CONFIG.survivorRoster || CONFIG.survivorPortraits || []).length);
  if (!CONFIG.itemOrder) CONFIG.itemOrder = {};
  if (!CONFIG.addonOrder) CONFIG.addonOrder = {};
  if (!state.loadouts) state.loadouts = [];
  if (!state.survivorBuilds) state.survivorBuilds = [];
}
function orderedCatalog(kind, type) {
  const src = kind === "item" ? (CONFIG.items || []) : (CONFIG.itemAddons || []);
  const base = src.filter(x => x.type === type);
  const saved = (kind === "item" ? CONFIG.itemOrder : CONFIG.addonOrder)?.[type] || [];
  const map = new Map(base.map(x => [x.name, x]));
  const out = [];
  saved.forEach(n => { if (map.has(n)) { out.push(map.get(n)); map.delete(n); } });
  map.forEach(x => out.push(x));
  return out;
}
function rarityBorder(r) {
  const rarity = String(r || "").toLowerCase();
  return (CONFIG.rarityColors && CONFIG.rarityColors[rarity]) || "#777777";
}
function rarityBackground(r) {
  const hex = rarityBorder(r).replace("#", "");
  const value = parseInt(hex.length === 3 ? hex.split("").map(ch => ch + ch).join("") : hex, 16);
  if (!Number.isFinite(value)) return "rgba(110,100,115,.10)";
  return `rgba(${(value >> 16) & 255},${(value >> 8) & 255},${value & 255},.15)`;
}
function tileHTML(obj, big) {
  return `<div class="tier-tile ${obj.event ? "event" : ""}" style="border-color:${rarityBorder(obj.rarity)};background-color:${rarityBackground(obj.rarity)}" title="${escapeAttr(obj.description || obj.name)}">
    ${obj.event ? `<span class="event-flag">EVT</span>` : ""}
    <img src="${escapeAttr(obj.icon)}" alt="" style="width:${big ? 58 : 46}px;height:${big ? 58 : 46}px" onerror="this.src=CONFIG.placeholderItem">
    <span>${escapeHtml(obj.name)}</span>
  </div>`;
}
function loadoutHTML(itemName, addons) {
  const item = itemByName(itemName);
  const ads = (addons || []).slice(0, 2);
  return `<div class="loadout-bar">
    <div class="loadout-slot item-slot"><div class="slot-label">ITEM</div>
      <div class="item-mini" style="background-color:${rarityBackground(item && item.rarity)};border-color:${rarityBorder(item && item.rarity)}">
        <img src="${escapeAttr((item && item.icon) || CONFIG.placeholderItem)}" alt="" onerror="this.src=CONFIG.placeholderItem">
        <div class="nm">${escapeHtml(itemName || "")}</div>
      </div></div>
    <div class="loadout-slot addon-slot"><div class="slot-label">ADD-ONS</div>
      <div class="addon-pair">${ads.map(n => {
        const a = addonByName(n, item && item.type);
        return `<div class="addon-mini" style="background-color:${rarityBackground(a && a.rarity)};border-color:${rarityBorder(a && a.rarity)}"><img src="${escapeAttr((a && a.icon) || CONFIG.placeholderItem)}" alt="" title="${escapeAttr(n)}" onerror="this.src=CONFIG.placeholderItem"><div class="nm">${escapeHtml(n)}</div></div>`;
      }).join("") || `<div class="ph"></div>`}</div></div>
  </div>`;
}
function itemByName(name) {
  return (CONFIG.items || []).find(i => i.name.toLowerCase() === String(name || "").toLowerCase());
}
function addonByName(name, type) {
  return (CONFIG.itemAddons || []).find(a => a.name.toLowerCase() === String(name || "").toLowerCase() && (!type || a.type === type));
}
function survivorBuildCardHTML(b) {
  return `<div class="build-card surv-build-card">
    <img class="portrait" src="${getSurvivorPortrait(b.survivorId || b.id)}" alt="" onerror="this.src=CONFIG.placeholderPortrait">
    ${perkDiamondHTML(b.perks)}
    ${loadoutHTML(b.item, b.addons)}
    <div class="surv-build-copy">
      <div class="title">${escapeHtml(b.name)}</div>
      <div class="sub">${b.patch ? `Notes current for: <span class="patch-badge">${escapeHtml(b.patch)}</span>` : "Survivor"}</div>
      <div class="tags" style="margin-top:.3rem">${(b.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
      ${b.description ? `<p class="desc">${escapeHtml(b.description)}</p>` : ""}
    </div>
    <div class="build-actions"><button class="btn btn-sm" onclick="event.stopPropagation();copySurvivorBuild('${escapeAttr(b.id)}')" title="Copy build">📋 Copy</button></div>
  </div>`;
}
function copySurvivorBuild(id) {
  const b = (state.survivorBuilds || []).find(x => String(x.id) === String(id));
  if (!b) return;
  const lines = [b.name, (b.perks || []).join(", "), b.item, (b.addons || []).join(", "), b.patch, (b.tags || []).join(", "), b.description];
  const text = lines.filter(Boolean).join("\n");
  navigator.clipboard.writeText(text).then(() => showToast("Copied!")).catch(() => prompt("Copy:", text));
}
function renderSurvivorDetail(randomizePortrait = false) {
  ensureSurvivorMeta();
  const box = document.getElementById("survivor-detail-content");
  if (!box) return;
  const info = state.survivorInfo;
  const roster = CONFIG.survivorRoster || [];
  if (randomizePortrait && roster.length) {
    const options = roster.filter(s => s.id !== lastHubSurvivorId);
    lastHubSurvivorId = (options[Math.floor(Math.random() * options.length)] || roster[0]).id;
  }
  const hubPortrait = roster.find(s => s.id === lastHubSurvivorId)?.icon || getSurvivorPortrait("hub");
  const cats = (CONFIG.typeOrder || []).map(type => {
    const items = orderedCatalog("item", type);
    const ads = orderedCatalog("addon", type);
    if (!items.length && !ads.length) return "";
    return `<section class="item-cat">
      <div class="tier-head"><h3>${escapeHtml(CONFIG.typeLabels[type] || type)}</h3><span class="tier-dir">Tier list · strongest on the left → weakest on the right</span></div>
      <div class="item-split">
        <div><div class="tier-label">Items</div><div class="tier-row">${items.map(i => tileHTML(i, true)).join("")}</div></div>
        <div><div class="tier-label">Add-ons</div><div class="tier-row">${ads.map(a => tileHTML(a, false)).join("")}</div></div>
      </div>
    </section>`;
  }).join("");
  const patches = [...new Set([...(state.builds || []).map(b => b.patch), ...(state.survivorBuilds || []).map(b => b.patch), ...(state.killers || []).map(k => k.patch)].filter(Boolean))];
  box.innerHTML = `
    <div class="detail-hero">
      <div class="detail-portrait"><img src="${escapeAttr(hubPortrait)}" alt="" onerror="this.src=CONFIG.placeholderPortrait"></div>
      <div class="detail-hero-info">
        <h1>Survivor</h1>
        <div class="release-line">${escapeHtml(info.note || "Shared Survivor hub")}</div>
        ${info.patch ? `<span class="patch-badge">${escapeHtml(info.patch)}</span>` : ""}
        <div class="profile-meta profile-meta-strong" style="margin-top:.75rem">
          <span class="profile-stat">Survivors <strong>${escapeHtml(info.count || "—")}</strong></span>
          <span class="profile-stat">Perks <strong>${escapeHtml(info.perkCount || "—")}</strong></span>
          <span class="profile-stat">Items <strong>${(CONFIG.items || []).length}</strong></span>
        </div>
      </div>
    </div>
    ${cats}
    <h2>Item + addon combo</h2>
    <div class="combo-row">${(state.loadouts || []).map(c => `<div class="combo-box"><div class="hint">${escapeHtml(c.name)}</div>${loadoutHTML(c.item, c.addons)}</div>`).join("") || `<p class="hint">No combos yet. Add one in Editor → Survivor Hub.</p>`}</div>
    <h2 style="margin-top:1.1rem">Buildy</h2>
    <div class="filters survivor-build-filters">
      <input id="sbuild-search" placeholder="Search builds, perks, tags..." oninput="renderSurvivorBuilds()">
      <select id="sbuild-sort" onchange="renderSurvivorBuilds()"><option value="name">Name A–Z</option><option value="nameDesc">Name Z–A</option><option value="patchDesc">Patch newest</option><option value="patch">Patch oldest</option></select>
      <div class="perk-filter" data-perk-filter="survivor-hub"><div class="perk-filter-chips" id="survivor-hub-perk-chips"></div><input id="survivor-hub-perk-search" placeholder="Filter by perks…" autocomplete="off" onclick="renderPerkFilterSuggestions('survivor-hub','survivor',true)" oninput="renderPerkFilterSuggestions('survivor-hub','survivor')"><div class="chip-dropdown" id="survivor-hub-perk-dropdown"></div></div>
      <div class="patch-filter-group" title="Filter by build patch"><select id="sbuild-patch-op" onchange="renderSurvivorBuilds()"><option value="=">=</option><option value=">">&gt;</option><option value=">=">&gt;=</option><option value="<">&lt;</option><option value="<=">&lt;=</option></select><select id="sbuild-patch-value" onchange="renderSurvivorBuilds()"><option value="">Patch</option>${patches.sort(comparePatchVersions).map(p => `<option value="${escapeAttr(p)}">${escapeHtml(p)}</option>`).join("")}</select></div>
      <button class="btn btn-sm" onclick="document.getElementById('sbuild-search').value='';document.getElementById('sbuild-patch-op').value='=';document.getElementById('sbuild-patch-value').value='';document.getElementById('sbuild-sort').value='name';buildPerkFilters['survivor-hub']=[];renderPerkFilterChips('survivor-hub');renderSurvivorBuilds()">↺ Reset</button>
    </div>
    <div id="sbuilds-container" class="builds-list"></div>`;
  renderSurvivorBuilds();
}
function renderSurvivorBuilds() {
  const box = document.getElementById("sbuilds-container");
  if (!box) return;
  const q = (document.getElementById("sbuild-search")?.value || "").toLowerCase();
  const patch = document.getElementById("sbuild-patch-value")?.value || "";
  const patchOp = document.getElementById("sbuild-patch-op")?.value || "=";
  let list = (state.survivorBuilds || []).slice();
  if (q) list = list.filter(b => [b.name, b.item, b.patch, b.description, ...(b.perks || []), ...(b.addons || []), ...(b.tags || [])].join(" ").toLowerCase().includes(q));
  if (patch) list = list.filter(b => patchMatches(b.patch, patchOp, patch));
  list = list.filter(b => (buildPerkFilters["survivor-hub"] || []).every(perk => (b.perks || []).includes(perk)));
  list = applyBuildSearchSort(list, "", document.getElementById("sbuild-sort")?.value || "name", []);
  box.innerHTML = list.map(survivorBuildCardHTML).join("") || `<p class="hint">No Survivor builds found.</p>`;
}
function renderSurvivorBits() {
  ensureSurvivorMeta();
  const hub = document.getElementById("editor-shub-body");
  if (hub) { hub.innerHTML = survivorHubEditorHTML(); comboDraft = { item:"", addons:[] }; fillComboAddons(); }
  if (document.getElementById("survivor-detail-content")) renderSurvivorDetail();
  const list = document.getElementById("editor-sbuilds-list");
  if (list) {
    const query = (document.getElementById("ed-sbuild-search")?.value || "").trim().toLowerCase();
    const builds = (state.survivorBuilds || []).filter(b => !query || [b.name,b.item,b.patch,b.description,...(b.perks || []),...(b.addons || []),...(b.tags || [])].join(" ").toLowerCase().includes(query));
    list.innerHTML = builds.map(b => `<div class="editor-item"><strong>${escapeHtml(b.name)}</strong> <span class="hint-inline">${escapeHtml(b.item || "")}</span>
      <button class="btn btn-sm" onclick="openSurvivorBuildModal('${b.id}')">Edit</button>
      <button class="btn btn-sm" onclick="deleteSurvivorBuild('${b.id}')">Delete</button></div>`).join("") || `<p class="hint">No Survivor builds found.</p>`;
  }
}
function survivorHubEditorHTML() {
  const info = state.survivorInfo;
  const rarityNames = { common:"Common", uncommon:"Uncommon", rare:"Rare", veryrare:"Very Rare", visceral:"Visceral", ultrarare:"Ultra Rare" };
  const rarityColors = Object.keys(rarityNames).map(r => '<label class="rarity-color-row"><span class="rarity-swatch" style="--rarity-color:' + rarityBorder(r) + '"></span><span>' + rarityNames[r] + '</span><input type="color" value="' + escapeAttr(rarityBorder(r)) + '" aria-label="' + rarityNames[r] + ' rarity color" onchange="setRarityColor(\'' + r + '\',this.value)"></label>').join("");
  const cats = (CONFIG.typeOrder || []).map(type => {
    const items = orderedCatalog("item", type), ads = orderedCatalog("addon", type);
    const row = (arr, kind) => arr.map((x, i) => '<div class="order-row" style="--rarity-color:' + rarityBorder(x.rarity) + ';--rarity-bg:' + rarityBackground(x.rarity) + '"><img src="' + escapeAttr(x.icon) + '" alt="" width="44" height="44"><span class="order-row-name">' + escapeHtml(x.name) + '</span>' +
      '<label class="rarity-editor-label">Rarity<select onchange="setCatalogRarity(\'' + kind + '\',\'' + type + '\',' + i + ',this.value)">' +
      ['common','uncommon','rare','veryrare','visceral','ultrarare'].map(r => '<option value="' + r + '" ' + (String(x.rarity || '').toLowerCase() === r ? 'selected' : '') + '>' + ({common:'Common',uncommon:'Uncommon',rare:'Rare',veryrare:'Very Rare',visceral:'Visceral',ultrarare:'Ultra Rare'}[r]) + '</option>').join('') +
      '</select></label>' +
      '<button class="btn btn-sm" onclick="moveTier(\'' + kind + '\',\'' + type + '\',' + i + ',-1)">Up</button>' +
      '<button class="btn btn-sm" onclick="moveTier(\'' + kind + '\',\'' + type + '\',' + i + ',1)">Down</button></div>').join("");
    return '<section class="item-cat"><h3>' + escapeHtml(CONFIG.typeLabels[type] || type) + '</h3><p class="hint">Set each rarity and use Up/Down to rank entries from strongest to weakest.</p>' +
      '<div class="item-split"><div class="hub-catalog-column"><div class="tier-label">Items</div>' + row(items,"item") + '</div><div class="hub-catalog-column"><div class="tier-label">Add-ons</div>' + row(ads,"addon") + '</div></div></section>';
  }).join("");
  const comboCards = (state.loadouts || []).map((c,i) => '<div class="combo-box"><strong>' + escapeHtml(c.name) + '</strong>' + loadoutHTML(c.item,c.addons) +
    '<button class="btn btn-sm btn-danger" onclick="state.loadouts.splice(' + i + ',1);saveData();renderSurvivorBits()">Delete</button></div>').join("");
  return '<h2>Survivor card information</h2><div class="survivor-hub-info-grid">' +
    '<label>Survivors<input id="si-count" placeholder="Survivor count" value="' + escapeAttr(info.count || "") + '"></label>' +
    '<label>Survivor perks<input id="si-perks" placeholder="Perk count" value="' + escapeAttr(info.perkCount || "") + '"></label>' +
    '<label>Notes current for:<input id="si-patch" placeholder="Patch" value="' + escapeAttr(info.patch || "") + '"></label>' +
    '<label>Note<input id="si-note" placeholder="Short note" value="' + escapeAttr(info.note || "") + '"></label></div>' +
    '<button class="btn btn-primary" onclick="saveSurvivorInfo()">Save information</button>' +
    '<h2 style="margin-top:1.2rem">Rarity colors</h2><p class="hint">Rarity colors are part of config.js and are included in the downloaded configuration file.</p><div class="rarity-color-list">' + rarityColors + '</div>' +
    '<h2 style="margin-top:1.2rem">Item and add-on tier list</h2><div class="survivor-hub-catalog">' + cats + '</div>' +
    '<h2 style="margin-top:1.2rem">Item + add-on combos</h2><p class="hint">1. Choose an item. 2. Choose up to two matching add-ons. 3. Save the combo.</p>' +
    '<div id="ed-combos" class="combo-row">' + (comboCards || '<p class="hint">No saved combos.</p>') + '</div>' +
    '<div class="combo-builder"><label>Combo name <input id="combo-name" value="Combo" placeholder="Example: healing kit"></label>' +
    '<h3>1. Choose an item</h3><div id="combo-items" class="addon-picker-grid"></div>' +
    '<h3>2. Choose up to two add-ons</h3><p id="combo-addon-hint" class="hint">Choose an item first to unlock matching add-ons.</p>' +
    '<div id="combo-addons" class="addon-picker-grid"></div><div id="combo-preview" style="margin:.7rem 0"></div>' +
    '<button class="btn btn-primary" onclick="saveSurvCombo()">+ Save combo</button></div>';
}
function saveSurvivorInfo() {
  ensureSurvivorMeta();
  state.survivorInfo.count = document.getElementById("si-count").value.trim();
  state.survivorInfo.perkCount = document.getElementById("si-perks").value.trim();
  state.survivorInfo.patch = document.getElementById("si-patch").value.trim();
  state.survivorInfo.note = document.getElementById("si-note").value.trim();
  saveData();
  showToast("Information saved");
  renderSurvivorDetail();
}
function moveTier(kind, type, index, dir) {
  ensureSurvivorMeta();
  const list = orderedCatalog(kind, type).map(x => x.name);
  const j = index + dir;
  if (j < 0 || j >= list.length) return;
  const tmp = list[index]; list[index] = list[j]; list[j] = tmp;
  const bag = kind === "item" ? CONFIG.itemOrder : CONFIG.addonOrder;
  bag[type] = list;
  saveData();
  renderSurvivorBits();
}
function setCatalogRarity(kind, type, index, rarity) {
  const entry = orderedCatalog(kind, type)[index];
  if (!entry) return;
  entry.rarity = rarity;
  saveData();
  renderSurvivorBits();
  showToast('Rarity saved');
}
function setRarityColor(rarity, color) {
  if (!/^#[0-9a-f]{6}$/i.test(color)) return;
  CONFIG.rarityColors = CONFIG.rarityColors || {};
  CONFIG.rarityColors[rarity] = color;
  saveData();
  renderSurvivorDetail();
  const hub = document.getElementById("editor-shub-body");
  if (hub) {
    const draft = Object.fromEntries(["si-count", "si-perks", "si-patch", "si-note", "combo-name"].map(id => [id, document.getElementById(id)?.value ?? ""]));
    hub.innerHTML = survivorHubEditorHTML();
    Object.entries(draft).forEach(([id, value]) => { const input = document.getElementById(id); if (input) input.value = value; });
    fillComboAddons();
  }
  showToast('Rarity color saved locally. Download config.js to save it to the project.');
}
let comboDraft = { item:"", addons:[] };
function saveSurvCombo() {
  ensureSurvivorMeta();
  if (!comboDraft.item) return showToast("Choose an item first");
  state.loadouts.push({ name:document.getElementById("combo-name").value.trim() || "Combo", item:comboDraft.item, addons:comboDraft.addons.slice() });
  saveData(); renderSurvivorBits(); showToast("Combo saved");
}
function fillComboAddons() {
  const items = document.getElementById("combo-items"), addons = document.getElementById("combo-addons");
  if (!items || !addons) return;
  items.innerHTML = (CONFIG.items || []).map((it,i) => '<button type="button" class="addon-pick-btn ' + (comboDraft.item === it.name ? "on" : "") + '" style="border-color:' + rarityBorder(it.rarity) + ';background-color:' + rarityBackground(it.rarity) + '" data-item="' + i + '"><img src="' + escapeAttr(it.icon) + '" alt=""><span class="aname">' + escapeHtml(it.name) + '</span></button>').join("");
  items.querySelectorAll("[data-item]").forEach(btn => btn.onclick = () => { comboDraft.item = CONFIG.items[+btn.dataset.item].name; comboDraft.addons = []; fillComboAddons(); });
  const item = itemByName(comboDraft.item);
  const pool = item ? (CONFIG.itemAddons || []).filter(a => a.type === item.type) : [];
  const hint = document.getElementById("combo-addon-hint");
  if (hint) hint.textContent = item ? "Matching add-ons for " + item.name + ". Choose up to two." : "Choose an item first to unlock matching add-ons.";
  addons.innerHTML = pool.map((x,i) => '<button type="button" class="addon-pick-btn ' + (comboDraft.addons.includes(x.name) ? "on" : "") + '" style="border-color:' + rarityBorder(x.rarity) + ';background-color:' + rarityBackground(x.rarity) + '" data-addon="' + i + '"><img src="' + escapeAttr(x.icon) + '" alt=""><span class="aname">' + escapeHtml(x.name) + '</span></button>').join("");
  addons.querySelectorAll("[data-addon]").forEach(btn => btn.onclick = () => {
    const name = pool[+btn.dataset.addon].name, i = comboDraft.addons.indexOf(name);
    if (i >= 0) comboDraft.addons.splice(i,1);
    else if (comboDraft.addons.length < 2) comboDraft.addons.push(name);
    else return showToast("Maximum two add-ons");
    fillComboAddons();
  });
  const preview = document.getElementById("combo-preview");
  if (preview) preview.innerHTML = item ? loadoutHTML(item.name,comboDraft.addons) : "";
}

function deleteSurvivorBuild(id) {
  state.survivorBuilds = (state.survivorBuilds || []).filter(b => b.id !== id);
  saveData();
  renderSurvivorBits();
}
function setBuildSide(side) {
  let input = document.getElementById("build-side");
  if (!input) {
    input = document.createElement("input");
    input.type = "hidden";
    input.id = "build-side";
    document.getElementById("tab-builds")?.prepend(input);
  }
  input.value = side;
  document.querySelectorAll("#build-side-switch button").forEach(b => b.classList.toggle("on", b.dataset.side === side));
  const permitted = side === "killer" ? (CONFIG.killerPerks || []).map(p => p.name) : side === "survivor" ? (CONFIG.survivorPerks || []).map(p => p.name) : [...(CONFIG.killerPerks || []), ...(CONFIG.survivorPerks || [])].map(p => p.name);
  buildPerkFilters.builds = (buildPerkFilters.builds || []).filter(p => permitted.includes(p));
  renderPerkFilterChips("builds");
  const perkDrop = document.getElementById("builds-perk-dropdown");
  if (perkDrop) { perkDrop.classList.remove("open"); perkDrop.innerHTML = ""; }
  renderBuilds();
}
function openSurvivorBuildModal(id) {
  const existing = (state.survivorBuilds || []).find(b => b.id === id) || null;
  let survivorChoice = existing?.survivorId || "random";
  const survivorRoster = CONFIG.survivorRoster || [];
  const randomPreviewSurvivor = survivorRoster[Math.floor(Math.random() * survivorRoster.length)] || null;
  const pickedP = [...((existing && existing.perks) || [])];
  const pickedA = [...((existing && existing.addons) || [])];
  const pickedTags = [...((existing && existing.tags) || [])];
  let item = (existing && existing.item) || "";
  const patches = [...new Set([...(state.builds || []).map(b => b.patch), ...(state.survivorBuilds || []).map(b => b.patch), ...(state.killers || []).map(k => k.patch)].filter(Boolean))];
  let host = document.getElementById("surv-modal");
  if (!host) { host = document.createElement("div"); host.id = "surv-modal"; document.body.appendChild(host); }
  host.innerHTML = `<div class="modal-back" style="position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:300;overflow:auto;padding:2rem 1rem">
    <div class="modal modal-wide" style="background:#141414;border:1px solid #333;border-radius:12px;padding:1rem;max-width:1080px;margin:0 auto">
      <div class="edit-modal-topbar"><h2 style="margin:0">${existing ? "Edit survivor build" : "New survivor build"}</h2><div class="edit-modal-actions"><button class="btn" type="button" onclick="document.getElementById('surv-modal').innerHTML=''">Cancel</button><button class="btn btn-primary" type="button" id="sb-save-top">Save</button></div></div>
      <div class="killer-edit-layout"><div class="edit-form-panel">
      <div class="edit-block"><h3 class="edit-block-title">Basics</h3>
      <div class="form-group"><label>Name</label><input id="sb-name" value="${escapeAttr(existing && existing.name || "")}"></div>
      <div class="form-group"><label>Survivor</label><select id="sb-survivor-pick"><option value="random">Random Survivor</option>${survivorRoster.map(s => `<option value="${escapeAttr(s.id)}">${escapeHtml(s.name)}</option>`).join("")}</select><small class="hint">Random selects a Survivor from the current catalog. You can also choose a specific character.</small></div>
      <div class="form-group"><label>Patch / update</label>
        <select id="sb-patch-pick"><option value="">Choose an existing patch…</option>${patches.map(p => `<option>${escapeHtml(p)}</option>`).join("")}</select>
        <input id="sb-patch" placeholder="Or enter a new patch" value="${escapeAttr(existing && existing.patch || "")}">
      </div>
      <div class="form-group"><label>Description</label><textarea id="sb-desc" rows="3">${escapeHtml(existing && existing.description || "")}</textarea></div></div>
      <div class="edit-block"><h3 class="edit-block-title">Perks (max 4)</h3>
      <div class="chip-list" id="sb-perk-chips"></div>
      <div class="chip-input-wrap"><div class="chip-search-row"><input id="sb-perk-search" placeholder="Search perk…" autocomplete="off"></div><div class="chip-dropdown" id="sb-perk-drop"></div></div></div>
      <div class="edit-block"><h3 class="edit-block-title">Item &amp; add-ons</h3>
      <div class="addon-picker-grid" id="sb-items"></div>
      <div class="chip-list" id="sb-addon-chips"></div>
      <div class="addon-picker-grid" id="sb-addons"></div></div>
      <div class="edit-block"><h3 class="edit-block-title">Tags</h3><div class="tag-picker-grid" id="sb-tags"></div></div>
      <div class="modal-actions"><button class="btn" type="button" onclick="document.getElementById('surv-modal').innerHTML=''">Cancel</button> <button class="btn btn-primary" id="sb-save">Save</button></div>
      </div><aside class="killer-edit-preview"><div class="preview-top-actions"><button class="btn" type="button" onclick="document.getElementById('surv-modal').innerHTML=''">Cancel</button><button class="btn btn-primary" type="button" id="sb-save-preview">Save</button></div><h3 class="preview-label">Live preview</h3><div id="sb-preview"></div></aside></div>
    </div></div>`;
  document.getElementById("sb-survivor-pick").value = survivorRoster.some(s => s.id === survivorChoice) ? survivorChoice : "random";
  survivorChoice = document.getElementById("sb-survivor-pick").value;
  document.getElementById("sb-survivor-pick").onchange = e => { survivorChoice = e.target.value; paint(); };
  document.getElementById("sb-patch-pick").onchange = (e) => { if (e.target.value) document.getElementById("sb-patch").value = e.target.value; paint(); };
  function paint() {
    document.getElementById("sb-perk-chips").innerHTML = pickedP.map((n, i) => `<span class="chip perk-chip"><img src="${getPerkIcon(n)}" alt="">${escapeHtml(n)} <button class="chip-x" data-i="${i}">×</button></span>`).join("");
    document.getElementById("sb-perk-chips").querySelectorAll(".chip-x").forEach(btn => btn.onclick = () => { pickedP.splice(+btn.dataset.i, 1); paint(); });
    document.getElementById("sb-items").innerHTML = (CONFIG.items || []).map((it, idx) => `<button type="button" class="addon-pick-btn ${item === it.name ? "on" : ""}" style="border-color:${rarityBorder(it.rarity)};background-color:${rarityBackground(it.rarity)}" data-i="${idx}"><img src="${it.icon}" alt=""><span class="aname">${escapeHtml(it.name)}</span></button>`).join("");
    document.getElementById("sb-items").querySelectorAll("button").forEach(btn => btn.onclick = () => { item = CONFIG.items[+btn.dataset.i].name; pickedA.length = 0; paint(); });
    const pool = (CONFIG.itemAddons || []).filter(a => item && itemByName(item) && a.type === itemByName(item).type);
    document.getElementById("sb-addons").innerHTML = pool.map((a, idx) => `<button type="button" class="addon-pick-btn ${pickedA.includes(a.name) ? "on" : ""}" style="border-color:${rarityBorder(a.rarity)};background-color:${rarityBackground(a.rarity)}" data-i="${idx}"><img src="${a.icon}" alt=""><span class="aname">${escapeHtml(a.name)}</span></button>`).join("");
    document.getElementById("sb-addons").querySelectorAll("button").forEach(btn => btn.onclick = () => {
      const name = pool[+btn.dataset.i].name;
      const i = pickedA.indexOf(name);
      if (i >= 0) pickedA.splice(i, 1); else if (pickedA.length < 2) pickedA.push(name); else pickedA.splice(0, 1, name);
      paint();
    });
    document.getElementById("sb-addon-chips").innerHTML = pickedA.map(n => `<span class="chip addon-chip">${escapeHtml(n)} <button type="button" class="chip-x" data-addon="${escapeAttr(n)}">×</button></span>`).join("");
    document.getElementById("sb-addon-chips").querySelectorAll("[data-addon]").forEach(btn => btn.onclick = () => { pickedA.splice(pickedA.indexOf(btn.dataset.addon), 1); paint(); });
    const tags = getBuildTags();
    document.getElementById("sb-tags").innerHTML = tags.map(t => `<button type="button" class="tag-pick-btn ${pickedTags.includes(t.name) ? "on" : ""}" style="--tc:${t.color || "#c41e3a"}" data-tag="${escapeAttr(t.name)}">${escapeHtml(t.name)}</button>`).join("");
    document.getElementById("sb-tags").querySelectorAll("button").forEach(btn => btn.onclick = () => {
      const name = btn.dataset.tag;
      const i = pickedTags.indexOf(name);
      if (i >= 0) pickedTags.splice(i, 1); else pickedTags.push(name);
      paint();
    });
    const preview = document.getElementById("sb-preview");
    const title = document.getElementById("sb-name").value.trim() || "Build name";
    const patch = document.getElementById("sb-patch").value.trim() || "Patch";
    const desc = document.getElementById("sb-desc").value.trim();
    const previewSurvivor = survivorChoice === "random" ? randomPreviewSurvivor : survivorRoster.find(s => s.id === survivorChoice);
    preview.innerHTML = '<div class="survivor-build-preview"><div class="build-card-preview"><img class="build-preview-killer" src="' + escapeAttr((previewSurvivor && previewSurvivor.icon) || CONFIG.placeholderPortrait) + '" alt=""><div class="build-preview-content"><strong>' + escapeHtml(title) + '</strong><div class="hint">' + escapeHtml((previewSurvivor && previewSurvivor.name) || "Random Survivor") + '</div><div class="hint">Notes current for: ' + escapeHtml(patch) + '</div><div class="card-tags">' + pickedTags.map(t => '<span class="tag">' + escapeHtml(t) + '</span>').join("") + '</div></div></div>' + perkDiamondHTML(pickedP) + loadoutHTML(item,pickedA) + (desc ? '<p class="desc">' + escapeHtml(desc) + '</p>' : '') + '</div>';
  }
  const input = document.getElementById("sb-perk-search");
  const drop = document.getElementById("sb-perk-drop");
  input.oninput = input.onfocus = () => {
    const q = input.value.trim().toLowerCase();
    const list = (CONFIG.survivorPerks || []).filter(p => !pickedP.includes(p.name) && (!q || p.name.toLowerCase().includes(q))).slice(0, 40);
    drop.innerHTML = list.map((p, i) => `<div class="chip-dropdown-item" data-i="${i}"><img src="${p.icon}" alt="">${escapeHtml(p.name)}</div>`).join("");
    drop.classList.toggle("open", list.length > 0);
    drop.querySelectorAll("[data-i]").forEach(el => el.onclick = () => {
      if (pickedP.length >= 4) return showToast("Max 4 perks");
      pickedP.push(list[+el.dataset.i].name);
      input.value = ""; drop.classList.remove("open"); paint();
    });
  };
  document.getElementById("sb-save").onclick = () => {
    const rec = {
      id: (existing && existing.id) || ("sb_" + Date.now().toString(36)),
      survivorId: survivorChoice === "random" ? (randomPreviewSurvivor?.id || "") : survivorChoice,
      name: document.getElementById("sb-name").value.trim() || "Build",
      perks: pickedP.slice(), addons: pickedA.slice(), tags: pickedTags.slice(), item,
      patch: document.getElementById("sb-patch").value.trim(),
      description: document.getElementById("sb-desc").value.trim()
    };
    const idx = state.survivorBuilds.findIndex(b => b.id === rec.id);
    if (idx >= 0) state.survivorBuilds[idx] = rec; else state.survivorBuilds.push(rec);
    saveData(); host.innerHTML = ""; renderSurvivorBits(); showToast("Build saved");
  };
  document.getElementById("sb-save-top").onclick = document.getElementById("sb-save").onclick;
  document.getElementById("sb-save-preview").onclick = document.getElementById("sb-save").onclick;
  ["sb-name","sb-patch","sb-desc"].forEach(id => document.getElementById(id).addEventListener("input", paint));
  paint();
}
