// ============================================
// DBD KILLER HUB - MAIN SCRIPT v4
// ============================================

const STORAGE_KEY = "dbd_killer_hub_v56";


let state = { killers: [], builds: [], tags: [], perks: [], addons: [] };

// temporary selections in forms
let formSelectedTags = [];
let formSelectedPerks = [];
let formSelectedAddons = [];
let formSelectedCombos = [];
let formContentSections = null; // array of arrays, each 1-2 addon names

// Otz lookup: data/otz-addons.js (getOtzStore, getOtzAddonsForKiller)



let activeFilterTags = [];
let activeBuildFilterTags = [];
let killersListScrollY = 0;
let showAllKillerTags = false;



function getKillerTags() { return state.killerTags || state.tags || []; }
function getBuildTags() { return state.buildTags || []; }
function findTagMeta(name, list) {
  return (list || []).find(x => x.id === name || x.name === name);
}

const TIER_RANKS = ["S+","S","S-","A+","A","A-","B+","B","B-","C+","C","C-","D+","D","D-","E+","E","E-","F+","F",""];
const TIER_SORT_ORDER = { "S+":0,"S":1,"S-":2,"A+":3,"A":4,"A-":5,"B+":6,"B":7,"B-":8,"C+":9,"C":10,"C-":11,"D+":12,"D":13,"D-":14,"E+":15,"E":16,"E-":17,"F+":18,"F":19,"":99 };

function tierRankValue(t) {
  if (!t) return 99;
  const key = String(t).toUpperCase();
  return TIER_SORT_ORDER[key] !== undefined ? TIER_SORT_ORDER[key] : 99;
}

function formatReleaseDate(iso) {
  if (!iso || iso === "—") return "—";
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return m[3] + "." + m[2] + "." + m[1];
  return String(iso);
}


function renderMarkdown(raw) {
  if (!raw || raw === "placeholder") return "";
  let t = escapeHtml(String(raw));
  // code blocks ```
  t = t.replace(/```([\s\S]*?)```/g, (_, c) => `<pre class="md-pre">${c}</pre>`);
  // inline code
  t = t.replace(/`([^`]+)`/g, '<code class="md-code">$1</code>');
  // links [text](url)
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a class="md-link" href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // colors [red]...[/red] [orange] [yellow] [green] [blue] [purple] [pink] [gray] [white]
  t = t.replace(/\[(red|orange|yellow|green|blue|purple|pink|gray|grey|white|cyan)\]([\s\S]*?)\[\/\1\]/gi,
    (_, c, body) => `<span class="md-color md-${c.toLowerCase()}">${body}</span>`);
  // headings
  t = t.replace(/^### (.+)$/gm, '<h5 class="md-h3">$1</h5>');
  t = t.replace(/^## (.+)$/gm, '<h4 class="md-h2">$1</h4>');
  t = t.replace(/^# (.+)$/gm, '<h3 class="md-h1">$1</h3>');
  // bold ** **
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // underline __ __
  t = t.replace(/__([^_]+)__/g, '<span class="md-u">$1</span>');
  // italic * *
  t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // strike ~~ ~~
  t = t.replace(/~~([^~]+)~~/g, '<s>$1</s>');
  // spoiler || ||
  t = t.replace(/\|\|([^|]+)\|\|/g, '<span class="md-spoiler" title="Click to reveal" onclick="this.classList.toggle(\'revealed\')">$1</span>');
  // quote >
  t = t.replace(/^&gt; (.+)$/gm, '<blockquote class="md-quote">$1</blockquote>');
  // lists - item
  t = t.replace(/^- (.+)$/gm, '<li class="md-li">$1</li>');
  t = t.replace(/(<li class="md-li">[\s\S]*?<\/li>)(?:\s*<li class="md-li">[\s\S]*?<\/li>)*/g, (m) => `<ul class="md-ul">${m}</ul>`);
  // newlines
  t = t.replace(/\n/g, '<br>');
  // clean br inside block elements
  t = t.replace(/<(h[3-5]|ul|li|blockquote|pre)([^>]*)><br>/g, '<$1$2>');
  t = t.replace(/<br><\/(h[3-5]|ul|blockquote|pre)>/g, '</$1>');
  return t;
}

function formatToolbarHTML(textareaId) {
  return `<div class="fmt-toolbar">
    <button type="button" class="fmt-btn" title="Bold" onclick="wrapFmt('${textareaId}','**','**')"><b>B</b></button>
    <button type="button" class="fmt-btn" title="Italic" onclick="wrapFmt('${textareaId}','*','*')"><i>I</i></button>
    <button type="button" class="fmt-btn" title="Underline" onclick="wrapFmt('${textareaId}','__','__')"><span style="text-decoration:underline">U</span></button>
    <button type="button" class="fmt-btn" title="Strikethrough" onclick="wrapFmt('${textareaId}','~~','~~')"><s>S</s></button>
    <button type="button" class="fmt-btn" title="Heading" onclick="wrapFmt('${textareaId}','# ','')">H</button>
    <button type="button" class="fmt-btn" title="Link" onclick="insertLinkFmt('${textareaId}')">Link</button>
    <button type="button" class="fmt-btn" title="Spoiler" onclick="wrapFmt('${textareaId}','||','||')">||</button>
    <select class="fmt-color" onchange="if(this.value){wrapFmt('${textareaId}','['+this.value+']','[/'+this.value+']');this.value=''}" title="Color">
      <option value="">Color</option>
      <option value="red">Red</option>
      <option value="orange">Orange</option>
      <option value="yellow">Yellow</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="purple">Purple</option>
      <option value="pink">Pink</option>
      <option value="cyan">Cyan</option>
      <option value="gray">Gray</option>
      <option value="white">White</option>
    </select>
    <button type="button" class="fmt-btn fmt-info" title="Formatting help" onclick="toggleFmtHelp('${textareaId}')">?</button>
  </div>
  <div class="fmt-help" id="fmt-help-${textareaId}" hidden>
    <strong>Formatting</strong>
    <ul>
      <li><code>**bold**</code> → <b>bold</b></li>
      <li><code>*italic*</code> → <i>italic</i></li>
      <li><code>__underline__</code></li>
      <li><code>~~strike~~</code></li>
      <li><code># Big heading</code> / <code>## Medium</code> / <code>### Small</code></li>
      <li><code>[visible text](https://url)</code> — link hides under text</li>
      <li><code>[red]colored[/red]</code> — colors: red, orange, yellow, green, blue, purple, pink, cyan, gray, white</li>
      <li><code>||spoiler||</code> — hidden until click</li>
      <li><code>&gt; quote</code> · <code>- list item</code> · <code>\`code\`</code></li>
    </ul>
  </div>`;
}

function wrapFmt(id, before, after) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  const sel = el.value.slice(start, end) || "text";
  const next = el.value.slice(0, start) + before + sel + after + el.value.slice(end);
  el.value = next;
  el.focus();
  el.setSelectionRange(start + before.length, start + before.length + sel.length);
  // sync section body if this is a section textarea
  if (id && id.startsWith("k-sec-")) {
    const i = +id.replace("k-sec-", "");
    if (formContentSections && formContentSections[i]) formContentSections[i].body = el.value;
  }
  schedulePreviewRefresh();
}

function insertLinkFmt(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  const sel = el.value.slice(start, end) || "link text";
  const snippet = `[${sel}](https://)`;
  el.value = el.value.slice(0, start) + snippet + el.value.slice(end);
  el.focus();
  // select url part
  const urlStart = start + sel.length + 3;
  el.setSelectionRange(urlStart, urlStart + 8);
}

function toggleFmtHelp(id) {
  const h = document.getElementById("fmt-help-" + id);
  if (h) h.hidden = !h.hidden;
}


function tierBadgeHTML(tier) {
  if (!tier) return `<span class="tier-badge tier-none">—</span>`;
  const t = String(tier).toUpperCase();
  const letter = t.charAt(0);
  return `<span class="tier-badge tier-${letter}">${escapeHtml(t)}</span>`;
}

// In-page toast / confirm (no browser popups)
function showToast(msg, ms = 2200) {
  let el = document.getElementById("app-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "app-toast";
    el.className = "app-toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), ms);
}

function showConfirm(message, onYes) {
  const existing = document.getElementById("app-confirm");
  if (existing) existing.remove();
  const box = document.createElement("div");
  box.id = "app-confirm";
  box.className = "app-confirm-overlay";
  box.innerHTML = `
    <div class="app-confirm-box">
      <p>${escapeHtml(message)}</p>
      <div class="app-confirm-actions">
        <button class="btn" id="app-confirm-no">Cancel</button>
        <button class="btn btn-primary" id="app-confirm-yes">Confirm</button>
      </div>
    </div>`;
  document.body.appendChild(box);
  box.querySelector("#app-confirm-no").onclick = () => box.remove();
  box.querySelector("#app-confirm-yes").onclick = () => { box.remove(); onYes && onYes(); };
  box.onclick = (e) => { if (e.target === box) box.remove(); };
}




function ensureOtzOnWindow() {
  try {
    if (typeof OTZ_ADDONS !== "undefined" && OTZ_ADDONS && Object.keys(OTZ_ADDONS).length) {
      if (!window.OTZ_ADDONS || !Object.keys(window.OTZ_ADDONS).length) {
        window.OTZ_ADDONS = OTZ_ADDONS;
      }
    }
  } catch (_) {}
}

function init() {
  ensureOtzOnWindow();
  loadData();
  applyOwnerUiVisibility();
  setupNavigation();
  setupEditorTabs();
  renderAll();
}

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state = JSON.parse(saved);
      state.builds.forEach(b => {
        if (b.killerId && !b.killerIds) { b.killerIds = [b.killerId]; delete b.killerId; }
        if (!b.killerIds) b.killerIds = [];
      });
      state.killers.forEach(k => {
        if (k.patch === undefined) k.patch = "";
        if (k.skillFloor === undefined && k.skill !== undefined) {
          k.skillFloor = k.skill; k.skillCeiling = k.skill; delete k.skill;
        }
        if (k.fun2play === undefined && k.desire !== undefined) {
          k.fun2play = k.desire; delete k.desire;
        }
        if (k.skillFloor === undefined) k.skillFloor = 0;
        if (k.skillCeiling === undefined) k.skillCeiling = 0;
        if (k.fun2play === undefined) k.fun2play = 0;
        // difficulty rename
        const diffMap = {
          "Very Easy": "Beginner", "Easy": "Easy", "Medium": "Medium",
          "Hard": "Hard", "Very Hard": "Very Hard", "Nightmare": "Extremely Hard",
          "Intermediate": "Medium", "Advanced": "Hard", "Expert": "Very Hard", "Master": "Extremely Hard"
        };
        if (diffMap[k.difficulty]) k.difficulty = diffMap[k.difficulty];
        // recommendedCombos from recommendedAddons
        if (!k.recommendedCombos && k.recommendedAddons && k.recommendedAddons.length) {
          k.recommendedCombos = [k.recommendedAddons];
        }

        // personalRank number -> tier letter
        if (k.tier === undefined) {
          if (typeof k.personalRank === "number" && k.personalRank > 0) {
            // map old 1..15-ish to tiers loosely, or leave empty
            k.tier = "";
          } else if (typeof k.personalRank === "string") {
            k.tier = k.personalRank;
          } else {
            k.tier = k.tier || "";
          }
        }

      });
      // migrate tags -> killerTags / buildTags
      if (!state.killerTags) state.killerTags = [];
      if (!state.buildTags) state.buildTags = [];
      if (state.tags && state.tags.length && !state.killerTags.length && !state.buildTags.length) {
        // split heuristically or put all into killerTags + copy meta/fun to build
        const buildish = new Set(["meta","fun","tournament","universal","info","hex","chase","gen-pressure","slowdown"]);
        state.tags.forEach(t => {
          if (buildish.has(t.id) || buildish.has(t.name)) state.buildTags.push(t);
          else state.killerTags.push(t);
        });
      }
      if (typeof INITIAL_DATA !== "undefined") {
        if (!state.killerTags.length && INITIAL_DATA.killerTags) state.killerTags = JSON.parse(JSON.stringify(INITIAL_DATA.killerTags));
        if (!state.buildTags.length && INITIAL_DATA.buildTags) state.buildTags = JSON.parse(JSON.stringify(INITIAL_DATA.buildTags));
      }

    } catch (e) { seedInitial(); }
  } else seedInitial();
}

function seedInitial() {
  if (typeof INITIAL_DATA !== "undefined") {
    state = JSON.parse(JSON.stringify(INITIAL_DATA));
  } else {
    state = { killers: [], builds: [], killerTags: [], buildTags: [], tags: [], perks: [], addons: [] };
  }
  if (!state.killerTags) state.killerTags = [];
  if (!state.buildTags) state.buildTags = [];
  if (!state.addons) state.addons = [];
  if (!state.perks) state.perks = [];
  if (!state.builds) state.builds = [];
  if (!state.killers) state.killers = [];
  state.killers.forEach(k => {
    if (k.tier === undefined) k.tier = "";
    if (k.skillFloor === undefined) k.skillFloor = 0;
    if (k.skillCeiling === undefined) k.skillCeiling = 0;
    if (k.fun2play === undefined) k.fun2play = 0;
        // difficulty rename
        const diffMap = {
          "Very Easy": "Beginner", "Easy": "Easy", "Medium": "Medium",
          "Hard": "Hard", "Very Hard": "Very Hard", "Nightmare": "Extremely Hard",
          "Intermediate": "Medium", "Advanced": "Hard", "Expert": "Very Hard", "Master": "Extremely Hard"
        };
        if (diffMap[k.difficulty]) k.difficulty = diffMap[k.difficulty];
        // recommendedCombos from recommendedAddons
        if (!k.recommendedCombos && k.recommendedAddons && k.recommendedAddons.length) {
          k.recommendedCombos = [k.recommendedAddons];
        }

  });
  saveData();
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getBaseline() {
  return (typeof INITIAL_DATA !== "undefined") ? INITIAL_DATA : { killers: [], builds: [], perks: [], killerTags: [], buildTags: [] };
}

function isLocalOnlyKiller(k) {
  const base = getBaseline().killers || [];
  return !base.some(ik => ik.id === k.id);
}
function isDirtyKiller(k) {
  const base = (getBaseline().killers || []).find(ik => ik.id === k.id);
  if (!base) return true;
  const pick = (x) => JSON.stringify({
    name: x.name, difficulty: x.difficulty, skillFloor: x.skillFloor, skillCeiling: x.skillCeiling,
    fun2play: x.fun2play, tier: x.tier || "", tags: x.tags || [], notes: x.notes, guide: x.guide,
    vsNotes: x.vsNotes, addonNotes: x.addonNotes, patch: x.patch || "", contentSections: x.contentSections || []
  });
  return pick(k) !== pick(base);
}
function isLocalOnlyBuild(b) {
  const base = getBaseline().builds || [];
  return !base.some(ib => ib.id === b.id);
}
function isDirtyBuild(b) {
  const base = (getBaseline().builds || []).find(ib => ib.id === b.id);
  if (!base) return true;
  const pick = (x) => JSON.stringify({
    name: x.name, killerIds: x.killerIds || [], perks: x.perks || [], tags: x.tags || [],
    addons: x.addons || [], description: x.description || "", patch: x.patch || ""
  });
  return pick(b) !== pick(base);
}
function isLocalOnlyPerk(name) {
  return !(getBaseline().perks || []).includes(name);
}
function isLocalOnlyTag(kind, t) {
  const arr = kind === "build" ? (getBaseline().buildTags || []) : (getBaseline().killerTags || []);
  return !arr.some(x => x.id === t.id || x.name === t.name);
}
function unsavedBadge(title) {
  return `<span class="unsaved-badge" title="${escapeAttr(title || "Not saved to data.js / config.js yet — local only")}">💾?</span>`;
}
function dirtyBadge(title) {
  return `<span class="dirty-badge" title="${escapeAttr(title || "Changed locally — export to data.js")}">●</span>`;
}

function updateEditorUnsavedBanner() {
  const el = document.getElementById("editor-unsaved-banner");
  if (!el) return;
  const localK = (state.killers || []).filter(isLocalOnlyKiller).length;
  const dirtyK = (state.killers || []).filter(k => !isLocalOnlyKiller(k) && isDirtyKiller(k)).length;
  const localB = (state.builds || []).filter(isLocalOnlyBuild).length;
  const dirtyB = (state.builds || []).filter(b => !isLocalOnlyBuild(b) && isDirtyBuild(b)).length;
  const localP = (state.perks || []).filter(isLocalOnlyPerk).length;
  const total = localK + dirtyK + localB + dirtyB + localP;
  if (total === 0) {
    el.hidden = true;
    el.innerHTML = "";
    return;
  }
  el.hidden = false;
  el.innerHTML = `
    <strong>Unsaved to files</strong>
    <span>${localK ? localK + " new killer(s) " : ""}${dirtyK ? dirtyK + " edited killer(s) " : ""}${localB ? localB + " new build(s) " : ""}${dirtyB ? dirtyB + " edited build(s) " : ""}${localP ? localP + " new perk(s)" : ""}</span>
    <span class="hint-inline">Generate data.js code and paste into the file, then Reset after updating files.</span>
  `;
}



function applyOwnerUiVisibility() {
  const show = typeof CONFIG !== "undefined" && Number(CONFIG.SHOW_OWNER_UI) === 1;
  document.querySelectorAll('.nav-btn[data-tab="editor"], .nav-btn[data-tab="settings"]').forEach(btn => {
    btn.hidden = !show;
    btn.style.display = show ? "" : "none";
  });
  if (!show) {
    const active = document.querySelector(".nav-btn.active");
    const tab = active && active.dataset.tab;
    if (tab === "editor" || tab === "settings") {
      if (typeof switchTab === "function") switchTab("killers");
    }
  }
}

function setupNavigation() {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });
}

function switchTab(tabName) {
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelector(`.nav-btn[data-tab="${tabName}"]`)?.classList.add("active");
  document.getElementById(`tab-${tabName}`)?.classList.add("active");
  if (tabName === "killers") renderKillers();
  if (tabName === "builds") renderBuilds();
  if (tabName === "editor") renderEditor();
}

function renderAll() {
  populateFilterSelects();
  renderKillers();
  renderBuilds();
}

function populateFilterSelects() {
  renderTagFilterUI();
  const bk = document.getElementById("build-killer-filter");
  if (bk) {
    const cur = bk.value;
    bk.innerHTML = `<option value="">All killers</option>` +
      state.killers.map(k => `<option value="${k.id}">${escapeHtml(k.name)}</option>`).join("");
    if (cur) bk.value = cur;
  }
  renderBuildTagFilterUI();
  populateBuildPatchFilter();
}

function renderTagFilterUI() {
  const panel = document.getElementById("filter-tags-panel");
  const countEl = document.getElementById("filter-tags-count");
  if (countEl) countEl.textContent = activeFilterTags.length ? `(${activeFilterTags.length})` : "";
  if (!panel) return;
  const tags = getKillerTags();
  if (!tags.length) {
    panel.innerHTML = `<p class="filter-panel-empty">No tags yet</p>`;
    return;
  }
  panel.innerHTML =
    `<div class="filter-panel-head">
      <span>Filter by tags</span>
      ${activeFilterTags.length ? `<button type="button" class="btn btn-sm" onclick="event.stopPropagation();activeFilterTags=[];renderTagFilterUI();renderKillers();">Clear</button>` : ""}
    </div>
    <div class="filter-panel-chips">` +
    tags.map(t => {
      const on = activeFilterTags.includes(t.name) || activeFilterTags.includes(t.id);
      return `<button type="button" class="tag-filter-chip ${on ? "on" : ""}" style="--tc:${t.color || "#888"}" onclick="event.stopPropagation();toggleFilterTag('${escapeAttr(t.name)}')">${escapeHtml(t.name)}</button>`;
    }).join("") +
    `</div>`;
}

function toggleShowAllTags() {
  showAllKillerTags = !showAllKillerTags;
  const btn = document.getElementById("btn-show-all-tags");
  if (btn) {
    btn.textContent = showAllKillerTags ? "All tags: On" : "All tags: Off";
    btn.classList.toggle("btn-active", showAllKillerTags);
  }
  renderKillers();
}

function toggleKillerTagsPanel(e) {
  e && e.stopPropagation();
  const panel = document.getElementById("filter-tags-panel");
  if (!panel) return;
  const open = panel.hidden;
  closeAllFilterPanels();
  panel.hidden = !open;
  if (!panel.hidden) renderTagFilterUI();
}

function renderBuildTagFilterUI() {
  const panel = document.getElementById("build-filter-tags-panel");
  const countEl = document.getElementById("build-filter-tags-count");
  if (countEl) countEl.textContent = activeBuildFilterTags.length ? `(${activeBuildFilterTags.length})` : "";
  if (!panel) return;
  const tags = getBuildTags();
  if (!tags.length) {
    panel.innerHTML = `<p class="filter-panel-empty">No tags yet</p>`;
    return;
  }
  panel.innerHTML =
    `<div class="filter-panel-head">
      <span>Filter by tags</span>
      ${activeBuildFilterTags.length ? `<button type="button" class="btn btn-sm" onclick="event.stopPropagation();activeBuildFilterTags=[];renderBuildTagFilterUI();renderBuilds();">Clear</button>` : ""}
    </div>
    <div class="filter-panel-chips">` +
    tags.map(t => {
      const on = activeBuildFilterTags.includes(t.name) || activeBuildFilterTags.includes(t.id);
      return `<button type="button" class="tag-filter-chip ${on ? "on" : ""}" style="--tc:${t.color || "#888"}" onclick="event.stopPropagation();toggleBuildFilterTag('${escapeAttr(t.name)}')">${escapeHtml(t.name)}</button>`;
    }).join("") +
    `</div>`;
}

function toggleBuildTagsPanel(e) {
  e && e.stopPropagation();
  const panel = document.getElementById("build-filter-tags-panel");
  if (!panel) return;
  const open = panel.hidden;
  closeAllFilterPanels();
  panel.hidden = !open;
  if (!panel.hidden) renderBuildTagFilterUI();
}

function closeAllFilterPanels() {
  ["filter-tags-panel", "build-filter-tags-panel"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.hidden = true;
  });
}

function populateBuildPatchFilter() {
  const sel = document.getElementById("build-patch-value");
  if (!sel) return;
  const cur = sel.value;
  const patches = [...new Set((state.builds || []).map(b => (b.patch || "").trim()).filter(Boolean))];
  patches.sort(comparePatchVersions);
  sel.innerHTML = `<option value="">Patch</option>` + patches.map(p =>
    `<option value="${escapeAttr(p)}" ${p === cur ? "selected" : ""}>${escapeHtml(p)}</option>`
  ).join("");
}

/** Compare patch strings like 10.1.2, 9.2.0, 8.4.0 */
function comparePatchVersions(a, b) {
  const pa = String(a).split(/[^0-9]+/).filter(Boolean).map(Number);
  const pb = String(b).split(/[^0-9]+/).filter(Boolean).map(Number);
  const n = Math.max(pa.length, pb.length);
  for (let i = 0; i < n; i++) {
    const x = pa[i] || 0, y = pb[i] || 0;
    if (x !== y) return x - y;
  }
  return String(a).localeCompare(String(b));
}

function patchMatches(buildPatch, op, filterPatch) {
  if (!filterPatch) return true;
  const bp = (buildPatch || "").trim();
  if (!bp) return false;
  const cmp = comparePatchVersions(bp, filterPatch);
  if (op === "=") return cmp === 0;
  if (op === ">") return cmp > 0;
  if (op === ">=") return cmp >= 0;
  if (op === "<") return cmp < 0;
  if (op === "<=") return cmp <= 0;
  return cmp === 0;
}

function resetBuildFilters() {
  activeBuildFilterTags = [];
  const s = document.getElementById("build-search"); if (s) s.value = "";
  const k = document.getElementById("build-killer-filter"); if (k) k.value = "";
  const op = document.getElementById("build-patch-op"); if (op) op.value = "=";
  const pv = document.getElementById("build-patch-value"); if (pv) pv.value = "";
  renderBuildTagFilterUI();
  populateBuildPatchFilter();
  renderBuilds();
}


function toggleFilterTag(name) {
  const i = activeFilterTags.indexOf(name);
  if (i >= 0) activeFilterTags.splice(i, 1);
  else activeFilterTags.push(name);
  renderTagFilterUI();
  renderKillers();
}

function toggleBuildFilterTag(name) {
  const i = activeBuildFilterTags.indexOf(name);
  if (i >= 0) activeBuildFilterTags.splice(i, 1);
  else activeBuildFilterTags.push(name);
  renderBuildTagFilterUI();
  renderBuilds();
}





// ---------- KILLERS ----------
function resetKillerFilters() {
  const s = document.getElementById("killer-search"); if (s) s.value = "";
  const d = document.getElementById("filter-difficulty"); if (d) d.value = "";
  const f = document.getElementById("filter-fun"); if (f) f.value = "";
  const sk = document.getElementById("filter-skill"); if (sk) sk.value = "";
  const so = document.getElementById("sort-by"); if (so) so.value = "releaseDate";
  activeFilterTags = [];
  renderTagFilterUI();
  renderKillers();
  showToast("Filters reset");
}


function renderKillers() {
  const search = (document.getElementById("killer-search")?.value || "").toLowerCase();
  const diff = document.getElementById("filter-difficulty")?.value || "";
  const funF = document.getElementById("filter-fun")?.value || "";
  
    const sortBy = document.getElementById("sort-by")?.value || "releaseDate";

  let list = [...state.killers];
  if (search) list = list.filter(k => k.name.toLowerCase().includes(search));
  if (diff) list = list.filter(k => k.difficulty === diff);
  if (funF === "9+") list = list.filter(k => (k.fun2play || 0) >= 9);
  if (funF === "7+") list = list.filter(k => (k.fun2play || 0) >= 7);
  if (funF === "5+") list = list.filter(k => (k.fun2play || 0) >= 5);
  if (funF === "7-10") list = list.filter(k => (k.fun2play || 0) >= 7);
  if (funF === "5-6.9") list = list.filter(k => (k.fun2play || 0) >= 5 && (k.fun2play || 0) < 7);
  if (funF === "3-4.9") list = list.filter(k => (k.fun2play || 0) >= 3 && (k.fun2play || 0) < 5);
  if (funF === "0-2.9") list = list.filter(k => (k.fun2play || 0) < 3);
  if (funF === "high") list = list.filter(k => (k.fun2play || 0) >= 7);
  if (funF === "mid") list = list.filter(k => (k.fun2play || 0) >= 4 && (k.fun2play || 0) < 7);
  if (funF === "low") list = list.filter(k => (k.fun2play || 0) < 4);
  const skillF = document.getElementById("filter-skill")?.value || "";
  if (skillF === "ceil9+") list = list.filter(k => (k.skillCeiling || 0) >= 9);
  if (skillF === "ceil8+") list = list.filter(k => (k.skillCeiling || 0) >= 8);
  if (skillF === "ceil7+") list = list.filter(k => (k.skillCeiling || 0) >= 7);
  if (skillF === "ceil5+") list = list.filter(k => (k.skillCeiling || 0) >= 5);
  if (skillF === "ceil3-6") list = list.filter(k => (k.skillCeiling || 0) >= 3 && (k.skillCeiling || 0) <= 6);
  if (skillF === "floor7+") list = list.filter(k => (k.skillFloor || 0) >= 7);
  if (skillF === "floor5+") list = list.filter(k => (k.skillFloor || 0) >= 5);
  if (skillF === "floor3+") list = list.filter(k => (k.skillFloor || 0) >= 3);
  if (skillF === "easy-entry") list = list.filter(k => (k.skillFloor || 0) > 0 && (k.skillFloor || 0) <= 4);
  if (skillF === "high-skill") list = list.filter(k => (k.skillCeiling || 0) >= 8);
  if (skillF === "wide-range") list = list.filter(k => ((k.skillCeiling || 0) - (k.skillFloor || 0)) >= 4);
  if (skillF === "narrow") list = list.filter(k => ((k.skillCeiling || 0) - (k.skillFloor || 0)) <= 2 && (k.skillCeiling || 0) > 0);

  if (activeFilterTags.length) {
    list = list.filter(k => activeFilterTags.every(t =>
      (k.tags || []).includes(t) || (k.tags || []).some(kt => kt.toLowerCase() === t.toLowerCase())
    ));
  }

  list.sort((a, b) => {
    if (sortBy === "releaseDate") {
      const da = a.releaseDate || "9999", db = b.releaseDate || "9999";
      if (da !== db) return da.localeCompare(db);
      return (a.releaseOrder || 999) - (b.releaseOrder || 999);
    }
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "personalRank" || sortBy === "tier") {
      const ar = tierRankValue(a.tier), br = tierRankValue(b.tier);
      if (ar !== br) return ar - br; // S+ first
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "skillCeiling") return (b.skillCeiling || 0) - (a.skillCeiling || 0);
    if (sortBy === "skillFloor") return (b.skillFloor || 0) - (a.skillFloor || 0);
    if (sortBy === "fun2play") return (b.fun2play || 0) - (a.fun2play || 0);
    if (sortBy === "funAsc") return (a.fun2play || 0) - (b.fun2play || 0);
    if (sortBy === "difficulty") {
      const order = ["Beginner","Easy","Medium","Hard","Very Hard","Extremely Hard"];
      return order.indexOf(a.difficulty) - order.indexOf(b.difficulty);
    }
    if (sortBy === "difficultyDesc") {
      const order = ["Beginner","Easy","Medium","Hard","Very Hard","Extremely Hard"];
      return order.indexOf(b.difficulty) - order.indexOf(a.difficulty);
    }
    if (sortBy === "nameDesc") return b.name.localeCompare(a.name);
    if (sortBy === "releaseDesc") {
      const da = a.releaseDate || "", db = b.releaseDate || "";
      if (da !== db) return db.localeCompare(da);
      return (b.releaseOrder || 0) - (a.releaseOrder || 0);
    }
    if (sortBy === "chapter") {
      const ca = String(a.chapter || ""), cb = String(b.chapter || "");
      if (ca !== cb) return ca.localeCompare(cb, undefined, {numeric: true});
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const container = document.getElementById("killers-container");
  if (!container) return;

  container.innerHTML = list.map(k => {
    const src = getKillerPortrait(k.name);
    const sf = Number(k.skillFloor) || 0, sc = Number(k.skillCeiling) || 0;
    const skillShow = (sf > 0 || sc > 0) ? `${sf.toFixed(1)}–${sc.toFixed(1)}` : "—";
    const funShow = (Number(k.fun2play) || 0) > 0 ? Number(k.fun2play).toFixed(1) : "—";
    const allTags = k.tags || [];
    const tagList = showAllKillerTags ? allTags : allTags.slice(0, 3);
    const moreN = showAllKillerTags ? 0 : Math.max(0, allTags.length - tagList.length);
    const topTags = tagList.length
      ? `<div class="card-tags ${showAllKillerTags ? "card-tags-expanded" : ""}">${tagList.map(t => {
          const tg = findTagMeta(t, getKillerTags());
          const col = (tg && tg.color) || "#666";
          return `<span class="tag-dot" style="--tc:${col}" title="${escapeAttr(t)}">${escapeHtml(t)}</span>`;
        }).join("")}${moreN > 0 ? `<span class="tag-more">+${moreN}</span>` : ""}</div>`
      : "";
    return `
      <div class="killer-card" onclick="openKillerDetail('${k.id}')">
        <div class="killer-card-portrait">
          <img src="${src}" alt="${escapeAttr(k.name)}" loading="lazy" onerror="this.src=CONFIG.placeholderPortrait">
          <div class="killer-card-overlay">
            <span class="kc-tier">${tierBadgeHTML(k.tier)}</span>
            <span class="kc-diff">${escapeHtml(k.difficulty || "—")}</span>
          </div>
        </div>
        <div class="killer-card-body">
          <div class="name">${escapeHtml(k.name)}</div>
          <div class="card-stats">
            <div class="stat"><span class="stat-l">Skill</span><span class="stat-v">${skillShow}</span></div>
            <div class="stat"><span class="stat-l">Fun</span><span class="stat-v">${funShow}</span></div>
          </div>
          ${topTags}
        </div>
      </div>`;
  }).join("") || "";
}

function openKillerDetail(id) {
  killersListScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  const k = state.killers.find(x => x.id === id);
  if (!k) return;
  const killerBuilds = state.builds.filter(b => (b.killerIds || []).includes(id));
  const src = getKillerPortrait(k.name);

  const releaseStr = k.releaseDate
    ? `${formatReleaseDate(k.releaseDate)}${k.chapter ? " · " + k.chapter : ""}${k.update ? " · Update " + k.update : ""}`
    : "—";

  const sf = Number(k.skillFloor) || 0, sc = Number(k.skillCeiling) || 0;
  const skillStr = (sf > 0 || sc > 0) ? `${sf.toFixed(1)} – ${sc.toFixed(1)}` : "—";
  const funStr = (Number(k.fun2play) || 0) > 0 ? Number(k.fun2play).toFixed(1) : "—";

  let otzList = [];
  if (typeof getOtzAddonsForKiller === "function") {
    otzList = getOtzAddonsForKiller(k.name) || [];
    if (!otzList.length && k.id) otzList = getOtzAddonsForKiller(k.id) || [];
    if (!otzList.length && k.name) otzList = getOtzAddonsForKiller(String(k.name).replace(/^The\s+/i, "")) || [];
  }
  const tierOrder = { S: 0, A: 1, B: 2, C: 3, D: 4 };
  const sortedOtz = [...otzList].sort((a, b) => (tierOrder[a.tier] ?? 9) - (tierOrder[b.tier] ?? 9));
  const otzRow = sortedOtz.length
    ? sortedOtz.map((a, i) => `
        <div class="otz-addon-item tier-${a.tierClass || a.tier}" data-otz-idx="${i}"
          onmouseenter="showOtzTooltip(event, ${i})" onmouseleave="hideOtzTooltip()" onclick="pinOtzTooltip(event, ${i})">
          <img src="${a.img}" alt="${escapeAttr(a.name)}" loading="lazy" onerror="this.style.opacity=0.3">
          <span class="otz-tier-badge">${a.tier}</span>
          <span class="otz-addon-name">${escapeHtml(a.name)}</span>
        </div>`).join("")
    : `<p style="color:var(--text-dim)">No Otz data for this killer.
      <br><span style="font-size:0.8rem">Name: <code>${escapeHtml(k.name)}</code>
      · Otz key: <code>${escapeHtml(String(typeof getOtzKeyFromKillerName==="function"?getOtzKeyFromKillerName(k.name):"?"))}</code>
      · Keys: <code>${(typeof getOtzStore==="function"&&getOtzStore())?Object.keys(getOtzStore()).length:(window.OTZ_ADDONS?Object.keys(window.OTZ_ADDONS).length:0)}</code></span>
      <br><span style="font-size:0.78rem">If key is null, update/replace <code>otz-addons.js</code>. Hard-refresh (Ctrl+F5).</span></p>`;
  window._currentOtzList = sortedOtz;

  const html = `
    <div class="detail-hero">
      <div class="detail-portrait">
        <img src="${src}" alt="" onerror="this.src=CONFIG.placeholderPortrait">
      </div>
      <div class="detail-hero-info">
        <h1>${escapeHtml(k.name)}</h1>
        <div class="release-line">Release: <strong>${escapeHtml(releaseStr)}</strong></div>
        ${k.patch ? `<span class="patch-badge">Notes current for: ${escapeHtml(k.patch)}</span>` : ""}
        <div class="profile-meta profile-meta-strong" style="margin-top:0.75rem">
          <span class="profile-stat">Difficulty <strong>${k.difficulty || "—"}</strong></span>
          <span class="profile-stat">Tier ${tierBadgeHTML(k.tier)}</span>
          <span class="profile-stat">Skill <strong>${skillStr}</strong></span>
          <span class="profile-stat">Fun to Play <strong>${funStr}</strong></span>
        </div>
        <div class="tags" style="margin-top:0.5rem">${(k.tags || []).map(t => {
          const tg = findTagMeta(t, getKillerTags()) || findTagMeta(t, getBuildTags());
          const col = tg?.color || "#5a2a2a";
          return `<span class="tag" style="border-color:${col};color:${col}">${escapeHtml(t)}</span>`;
        }).join("")}</div>
      </div>
    </div>

    <div class="otz-addons-box">
      <h3>Otz Addon Tierlist</h3>
      <p class="otz-note" style="margin-bottom:0.75rem">Otzdarva addon ranking
      ${otzList.length ? `<span style="color:var(--text-dim);font-size:0.8rem"> · ${otzList.length} addons</span>` : ""}</p>
      <div class="otz-tier-row">${otzRow}</div>
      ${k.addonNotes && k.addonNotes !== "placeholder" ? `
        <div class="addon-notes-below">
          <h4>Addon notes</h4>
          <div class="md-body">${renderMarkdown(k.addonNotes)}</div>
        </div>` : ""}
      ${(() => {
        // support new recommendedCombos: [[a,b],[c]] or legacy recommendedAddons: [a,b]
        let combos = k.recommendedCombos;
        if (!combos || !combos.length) {
          if (k.recommendedAddons && k.recommendedAddons.length)
            combos = [k.recommendedAddons];
          else return "";
        }
        const boxes = combos.map((combo, ci) => {
          // support {name, addons} or string[]
          const addons = Array.isArray(combo) ? combo : (combo.addons || []);
          const cname = (!Array.isArray(combo) && combo.name) ? combo.name : ("Combo " + (ci + 1));
          const items = addons.map(name => {
            const found = sortedOtz.find(a => a.name.toLowerCase() === String(name).toLowerCase());
            const img = found?.img || findOtzAddonImg(name, [k.id]);
            return `<div class="my-combo-item" title="${escapeAttr(name)}">
              ${img ? `<img src="${img}" alt="">` : ""}
              <span>${escapeHtml(name)}</span>
            </div>`;
          }).join("");
          return `<div class="my-combo-box"><h4>${escapeHtml(cname)}</h4><div class="my-combo-row">${items}</div></div>`;
        }).join("");
        return `<div class="my-combos-wrap">${boxes}</div>`;
      })()}
    </div>

    ${(() => {
      const secs = (k.contentSections && k.contentSections.length)
        ? k.contentSections.filter(s => s.key !== "addonNotes")
        : [
            { key: "notes", title: "Short Note", body: k.notes },
            { key: "guide", title: "Guide / How to Play", body: k.guide }
          ];
      return secs.map(sec => {
        const body = sec.body;
        if (!body || body === "placeholder") return "";
        return `<div class="detail-section">
          <h3>${escapeHtml(sec.title || sec.key)}</h3>
          <div class="md-body">${renderMarkdown(body)}</div>
        </div>`;
      }).join("");
    })()}
    <div class="detail-section">
      <h3>Builds (${killerBuilds.length})</h3>
      <div class="profile-builds">
        ${killerBuilds.length
          ? killerBuilds.map(b => buildCardHTML(b, true)).join("")
          : "<p style='color:var(--text-dim)'>No builds.</p>"}
      </div>
    </div>
  `;

  document.getElementById("killers-list-view").hidden = true;
  document.getElementById("killer-detail-view").hidden = false;
  document.getElementById("killer-detail-content").innerHTML = html;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function ensureComboBoxes() {
  if (!formSelectedCombos.length) formSelectedCombos = [{ name: "", addons: [] }];
  formSelectedCombos = formSelectedCombos.map(c => {
    if (Array.isArray(c)) return { name: "", addons: [...c] };
    return { name: c.name || "", addons: [...(c.addons || [])] };
  });
}

function addComboBox() {
  formSelectedCombos.push({ name: "", addons: [] });
  renderComboBoxes(document.getElementById("k-name")?.value);
}

function removeComboBox(ci) {
  formSelectedCombos.splice(ci, 1);
  if (!formSelectedCombos.length) formSelectedCombos = [{ name: "", addons: [] }];
  renderComboBoxes(document.getElementById("k-name")?.value);
}

function setComboName(ci, val) {
  ensureComboBoxes();
  if (formSelectedCombos[ci]) formSelectedCombos[ci].name = val;
  schedulePreviewRefresh();
}

function getComboOtzList() {
  if (typeof getOtzAddonsForKiller !== "function") return [];
  const name = document.getElementById("k-name")?.value?.trim() || "";
  const id = document.getElementById("k-id")?.value?.trim() || window._editingKillerId || "";
  // Prefer full object so id-based Otz keys work (chucky, jason, …)
  if (id || name) {
    const list = getOtzAddonsForKiller({ id, name }) || [];
    if (list.length) return list;
  }
  if (name) return getOtzAddonsForKiller(name) || [];
  if (id) return getOtzAddonsForKiller(id) || [];
  return [];
}

function renderComboBoxes(killerName) {
  ensureComboBoxes();
  const container = document.getElementById("combo-boxes-container");
  const hint = document.getElementById("k-combo-hint");
  if (!container) return;
  const list = getComboOtzList();
  // Keep pool for click handler (avoid fragile inline JS with special chars in names)
  window._comboOtzPool = list;
  if (hint) {
    hint.textContent = list.length
      ? "Name each combo and pick up to 2 addons (click again to remove)."
      : "No Otz addons for this killer — check killer.id matches OTZ_ADDONS key.";
  }
  container.innerHTML = formSelectedCombos.map((combo, ci) => {
    const selected = (combo.addons || []).map(x => String(x).toLowerCase());
    const chips = (combo.addons || []).map((name, ai) => `
      <span class="chip" style="background:#1a1520;border-color:#5a4a6a;color:#d0c0e0">
        ${escapeHtml(name)}
        <button type="button" class="chip-x" data-combo-ci="${ci}" data-combo-ai="${ai}" title="Remove">×</button>
      </span>`).join("");
    const grid = list.map((a, ai) => {
      const on = selected.includes(String(a.name).toLowerCase());
      return `<button type="button" class="addon-pick-btn ${on ? "on" : ""}" data-combo-ci="${ci}" data-otz-ai="${ai}" title="${escapeAttr(a.name)}">
        ${a.img ? `<img src="${escapeAttr(a.img)}" alt="" loading="lazy">` : ""}
        <span class="tier">${escapeHtml(a.tier || "")}</span>
        <span class="aname">${escapeHtml(a.name)}</span>
      </button>`;
    }).join("");
    return `
      <div class="combo-box-block">
        <div class="combo-box-header">
          <input type="text" class="combo-name-input" value="${escapeAttr(combo.name || "")}"
            placeholder="Combo name"
            oninput="setComboName(${ci}, this.value)"
            onclick="event.stopPropagation()">
          <button type="button" class="btn btn-sm btn-danger" onclick="removeComboBox(${ci})">Remove</button>
        </div>
        <div class="chip-list">${chips || '<span style="color:var(--text-dim);font-size:0.8rem">No addons</span>'}</div>
        <div class="addon-picker-grid">${grid || (list.length ? "" : '<span style="color:var(--text-dim);font-size:0.8rem">No list</span>')}</div>
      </div>`;
  }).join("");

  // Event delegation — works with any characters in addon names
  container.querySelectorAll(".addon-pick-btn[data-otz-ai]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const ci = +btn.dataset.comboCi;
      const ai = +btn.dataset.otzAi;
      const pool = window._comboOtzPool || [];
      const a = pool[ai];
      if (!a || !a.name) return;
      toggleComboAddon(ci, a.name);
    });
  });
  container.querySelectorAll(".chip-x[data-combo-ci]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const ci = +btn.dataset.comboCi;
      const ai = +btn.dataset.comboAi;
      ensureComboBoxes();
      if (!formSelectedCombos[ci]) return;
      formSelectedCombos[ci].addons.splice(ai, 1);
      renderComboBoxes();
      schedulePreviewRefresh();
    });
  });
}

function toggleComboAddon(ci, name) {
  ensureComboBoxes();
  if (!formSelectedCombos[ci]) formSelectedCombos[ci] = { name: "", addons: [] };
  const arr = formSelectedCombos[ci].addons;
  const i = arr.findIndex(x => String(x).toLowerCase() === String(name).toLowerCase());
  if (i >= 0) arr.splice(i, 1);
  else {
    if (arr.length >= 2) { showToast("Max 2 addons per combo"); return; }
    arr.push(name);
  }
  renderComboBoxes();
  schedulePreviewRefresh();
}

function setupKillerComboPicker(killerName) {
  renderComboBoxes(killerName);
}

let otzTooltipPinned = false;

function positionOtzTooltip(tip, anchorEl) {
  const rect = anchorEl.getBoundingClientRect();
  const tipW = Math.min(340, window.innerWidth - 16);
  tip.style.width = tipW + "px";
  let left = rect.left + rect.width / 2 - tipW / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - tipW - 8));
  tip.style.left = left + "px";
  tip.style.top = (rect.bottom + 8) + "px";
  requestAnimationFrame(() => {
    const h = tip.offsetHeight;
    if (rect.bottom + 8 + h > window.innerHeight - 8) {
      tip.style.top = Math.max(8, rect.top - h - 8) + "px";
    }
  });
}

function fillOtzTooltip(tip, a) {
  tip.innerHTML = `
    <div class="otz-tip-head">
      ${a.img ? `<img src="${a.img}" alt="">` : ""}
      <div>
        <strong>${escapeHtml(a.name)}</strong>
        <span class="otz-tier-badge" style="position:static;margin-left:0.35rem">${escapeHtml(a.tier || "")}</span>
      </div>
    </div>
    <div class="otz-tip-body">${escapeHtml(a.comment || "No Otz comment available.").replace(/\n/g, "<br>")}</div>
    <div class="otz-tip-foot">${otzTooltipPinned ? "Click outside to close" : "Click addon to pin"}</div>
  `;
}

function showOtzTooltip(ev, idx) {
  const list = window._currentOtzList || [];
  const a = list[idx];
  if (!a) return;
  if (otzTooltipPinned) return;
  let tip = document.getElementById("otz-tooltip");
  if (!tip) {
    tip = document.createElement("div");
    tip.id = "otz-tooltip";
    tip.className = "otz-tooltip";
    document.body.appendChild(tip);
  }
  fillOtzTooltip(tip, a);
  tip.classList.add("show");
  tip.classList.remove("pinned");
  positionOtzTooltip(tip, ev.currentTarget);
}

function hideOtzTooltip() {
  if (otzTooltipPinned) return;
  document.getElementById("otz-tooltip")?.classList.remove("show");
}

function pinOtzTooltip(ev, idx) {
  ev.preventDefault();
  ev.stopPropagation();
  const list = window._currentOtzList || [];
  const a = list[idx];
  if (!a) return;
  let tip = document.getElementById("otz-tooltip");
  if (!tip) {
    tip = document.createElement("div");
    tip.id = "otz-tooltip";
    tip.className = "otz-tooltip";
    document.body.appendChild(tip);
  }
  otzTooltipPinned = true;
  fillOtzTooltip(tip, a);
  tip.classList.add("show", "pinned");
  positionOtzTooltip(tip, ev.currentTarget);
}

if (!window._otzOutsideBound) {
  window._otzOutsideBound = true;
  document.addEventListener("click", (e) => {
    if (!otzTooltipPinned) return;
    const tip = document.getElementById("otz-tooltip");
    if (!tip) return;
    if (tip.contains(e.target)) return;
    if (e.target.closest && e.target.closest(".otz-addon-item")) return;
    otzTooltipPinned = false;
    tip.classList.remove("show", "pinned");
  });
}

function closeKillerDetail() {
  const list = document.getElementById("killers-list-view");
  const detail = document.getElementById("killer-detail-view");
  if (list) list.hidden = false;
  if (detail) {
    detail.hidden = true;
    const c = document.getElementById("killer-detail-content");
    if (c) c.innerHTML = "";
  }
  requestAnimationFrame(() => window.scrollTo(0, killersListScrollY || 0));
}

// ---------- DIAMOND ----------
function perkDiamondHTML(perks, large = false) {
  const slots = ["top", "left", "right", "bottom"];
  const p = perks || [];
  return `
    <div class="perk-diamond ${large ? "large" : ""}">
      ${slots.map((cls, i) => {
        const name = p[i];
        if (!name) return `<div class="perk-slot ${cls} empty" title="Pusty slot"></div>`;
        return `<div class="perk-slot ${cls}" title="${escapeAttr(name)}">
          <img src="${getPerkIcon(name)}" alt="${escapeAttr(name)}" onerror="this.src=CONFIG.placeholderPerk">
        </div>`;
      }).join("")}
    </div>
  `;
}

function findOtzAddonImg(addonName, killerIds) {
  if (typeof getOtzAddonsForKiller !== "function") return null;
  const ids = killerIds || [];
  for (const kid of ids) {
    const killer = state.killers.find(k => k.id === kid);
    if (!killer) continue;
    const list = getOtzAddonsForKiller(killer) || getOtzAddonsForKiller(killer.name) || [];
    const found = list.find(a => a.name.toLowerCase() === String(addonName).toLowerCase());
    if (found) return found.img;
  }
  // global search
  if (typeof OTZ_ADDONS !== "undefined") {
    for (const key of Object.keys(OTZ_ADDONS)) {
      const found = (OTZ_ADDONS[key].addons || []).find(a => a.name.toLowerCase() === String(addonName).toLowerCase());
      if (found) return found.img;
    }
  }
  return null;
}

function buildCardHTML(b, compact = false) {
  const killerNames = (b.killerIds || []).map(id => state.killers.find(k => k.id === id)?.name || id).join(", ");
  const hasKillers = !!(b.killerIds && b.killerIds.length);
  return `
    <div class="build-card" style="${compact ? "padding:0.75rem;grid-template-columns:auto 1fr auto" : ""}">
      ${perkDiamondHTML(b.perks)}
      <div>
        <div class="title">${escapeHtml(b.name)}</div>
        <div class="sub">
          ${hasKillers ? escapeHtml(killerNames) : ""}
          ${hasKillers && b.patch ? ` • <span class="patch-badge">${escapeHtml(b.patch)}</span>` : ""}
        </div>
        ${!hasKillers ? `<div class="universal-build-label">Universal build (no specific killer)</div>` : ""}
        ${(b.addons && b.addons.length) ? `
          <div class="addon-row addon-row-icons">
            ${b.addons.map((a, i) => {
              const img = (b.addonImages && b.addonImages[i]) || findOtzAddonImg(a, b.killerIds);
              return `<div class="addon-icon-block" title="${escapeAttr(a)}">
                ${img ? `<img src="${img}" alt="" onerror="this.style.display='none'">` : ""}
                <span>${escapeHtml(a)}</span>
              </div>`;
            }).join("")}
          </div>
        ` : (hasKillers ? `<div class="universal-build-label">Universal build (no specific addons)</div>` : "")}
        <div class="tags" style="margin-top:0.3rem">${(b.tags || []).map(t => {
          const tg = findTagMeta(t, getKillerTags()) || findTagMeta(t, getBuildTags());
          const col = tg?.color || "#5a2a2a";
          return `<span class="tag" style="border-color:${col};color:${col}">${escapeHtml(t)}</span>`;
        }).join("")}</div>
        ${b.description ? `<p class="desc">${escapeHtml(b.description)}</p>` : ""}
      </div>
      <div class="build-actions">
        <button class="btn btn-sm" onclick="event.stopPropagation();copyBuild('${b.id}')" title="Copy">📋 Copy</button>
      </div>
    </div>
  `;
}

function renderBuilds() {
  const search = (document.getElementById("build-search")?.value || "").toLowerCase();
  const killerF = document.getElementById("build-killer-filter")?.value || "";
  let list = [...state.builds];
  if (search) {
    list = list.filter(b =>
      (b.name || "").toLowerCase().includes(search) ||
      (b.perks || []).some(p => p.toLowerCase().includes(search)) ||
      (b.tags || []).some(t => t.toLowerCase().includes(search))
    );
  }
  if (killerF) list = list.filter(b => (b.killerIds || []).includes(killerF));
  if (activeBuildFilterTags.length) {
    list = list.filter(b => activeBuildFilterTags.every(t =>
      (b.tags || []).includes(t) || (b.tags || []).some(bt => bt.toLowerCase() === t.toLowerCase())
    ));
  }
  const patchOp = document.getElementById("build-patch-op")?.value || "=";
  const patchVal = document.getElementById("build-patch-value")?.value || "";
  if (patchVal) list = list.filter(b => patchMatches(b.patch, patchOp, patchVal));


  const container = document.getElementById("builds-container");
  if (!container) return;
  container.innerHTML = list.map(b => buildCardHTML(b)).join("") || "";
}

function copyBuild(id) {
  const b = state.builds.find(x => x.id === id);
  if (!b) return;
  const killers = (b.killerIds || []).map(id => state.killers.find(k => k.id === id)?.name || id).join(", ");
  const lines = [
    killers || b.name,
    (b.perks || []).join(", "),
  ];
  if (b.addons && b.addons.length) lines.push(b.addons.join(", "));
  const text = lines.filter(Boolean).join("\n");
  navigator.clipboard.writeText(text).then(() => showToast("Copied!")).catch(() => prompt("Copy:", text));
}

function deleteBuild(id) {
  showConfirm("Delete this build?", () => {
    state.builds = state.builds.filter(b => b.id !== id);
    saveData();
    renderBuilds();
    if (document.getElementById("tab-editor")?.classList.contains("active")) renderEditor();
    showToast("Build deleted");
  });
}

// ---------- CHIP HELPERS (tagi / perki) ----------
function renderChipList(containerId, items, type, kind) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (type === "tag") {
    el.innerHTML = items.map((t, i) => {
      const tg = findTagMeta(t, getKillerTags()) || findTagMeta(t, getBuildTags());
      const col = tg?.color || "#c41e3a";
      return `<span class="chip" style="background:${col}22;border-color:${col};color:${col}">
        ${escapeHtml(t)}
        <button type="button" class="chip-x" onclick="removeFormTag(${i})">×</button>
      </span>`;
    }).join("");
  } else if (type === "addon") {
    el.innerHTML = items.map((a, i) => `
      <span class="chip" style="background:#1a1520;border-color:#5a4a6a;color:#d0c0e0">
        ${escapeHtml(a)}
        <button type="button" class="chip-x" onclick="removeFormAddon(${i})">×</button>
      </span>
    `).join("");
  } else {
    el.innerHTML = items.map((p, i) => `
      <span class="chip" style="background:#2a1a3a;border-color:#6b3a9e;color:#d4b0ff">
        <img src="${getPerkIcon(p)}" onerror="this.src=CONFIG.placeholderPerk" alt="">
        ${escapeHtml(p)}
        <button type="button" class="chip-x" onclick="removeFormPerk(${i})">×</button>
      </span>
    `).join("");
  }
}

function removeFormAddon(i) {
  formSelectedAddons.splice(i, 1);
  schedulePreviewRefresh();
  renderChipList("form-addon-chips", formSelectedAddons.map(x => typeof x === "string" ? x : x.name), "addon");
}

// Current pool for addon picker (Otz list when single killer)
let formAddonPool = []; // {name, img?, tier?}

function toggleAllKillers(on) {
  document.querySelectorAll("#b-killers input[type=checkbox]").forEach(cb => {
    cb.checked = !!on;
  });
  refreshBuildAddonPool();
}

function refreshBuildAddonPool() {
  const checked = [...document.querySelectorAll("#b-killers input:checked")].map(el => el.value);
  formAddonPool = [];
  if (checked.length === 1) {
    const killer = state.killers.find(k => k.id === checked[0]);
    if (killer && typeof getOtzAddonsForKiller === "function") {
      const list = getOtzAddonsForKiller(killer) || getOtzAddonsForKiller(killer.name) || [];
      formAddonPool = list.map(a => ({ name: a.name, img: a.img, tier: a.tier }));
    }
  }
  // only fall back to generic names if not exactly one killer
  if (!formAddonPool.length && checked.length !== 1) {
    formAddonPool = (state.addons || []).map(a => ({ name: a, img: null, tier: null }));
  }
  updateAddonPickerHint(checked.length);
  renderAddonPickerGrid();
}

function updateAddonPickerHint(count) {
  const hint = document.getElementById("addon-picker-hint");
  if (!hint) return;
  if (count === 1) hint.textContent = "Otz addons for selected killer — click to add (max 2)";
  else if (count === 0) hint.textContent = "Select exactly 1 killer to load Otz addons";
  else hint.textContent = "Multiple killers selected — addons optional / universal";
}

function renderAddonPickerGrid() {
  const grid = document.getElementById("form-addon-grid");
  if (!grid) return;
  const selectedNames = formSelectedAddons.map(x => typeof x === "string" ? x : x.name);
  if (!formAddonPool.length) {
    grid.innerHTML = `<span style="color:var(--text-dim);font-size:0.85rem">No Otz addons loaded (select 1 killer)</span>`;
    return;
  }
  grid.innerHTML = formAddonPool.map((a, idx) => {
    const on = selectedNames.some(n => String(n).toLowerCase() === String(a.name).toLowerCase());
    return `<button type="button" class="addon-pick-btn ${on ? "on" : ""}" data-addon-idx="${idx}" title="${escapeAttr(a.name)} (${a.tier || "?"})">
      ${a.img ? `<img src="${a.img}" alt="">` : ""}
      <span class="tier">${a.tier || ""}</span>
      <span class="aname">${escapeHtml(a.name)}</span>
    </button>`;
  }).join("");
  grid.querySelectorAll("[data-addon-idx]").forEach(btn => {
    btn.onclick = () => {
      const a = formAddonPool[+btn.dataset.addonIdx];
      if (!a) return;
      const selectedNames = formSelectedAddons.map(x => typeof x === "string" ? x : x.name);
      const hit = selectedNames.findIndex(n => String(n).toLowerCase() === String(a.name).toLowerCase());
      if (hit >= 0) {
        formSelectedAddons.splice(hit, 1);
      } else {
        addFormAddon(a);
        return;
      }
      renderChipList("form-addon-chips", formSelectedAddons.map(x => typeof x === "string" ? x : x.name), "addon");
      renderAddonPickerGrid();
    };
  });
}

function setupAddonSearch(inputId, dropdownId) {
  const input = document.getElementById(inputId);
  const drop = document.getElementById(dropdownId);
  refreshBuildAddonPool();
  document.querySelectorAll("#b-killers input").forEach(cb => {
    cb.addEventListener("change", () => {
      refreshBuildAddonPool();
      if (input && document.activeElement === input) showAddonSuggestions();
    });
  });
  if (!input || !drop) return;
  const showAddonSuggestions = () => {
    refreshBuildAddonPool();
    const q = input.value.trim().toLowerCase();
    const selectedNames = formSelectedAddons.map(x => typeof x === "string" ? x : x.name);
    const available = formAddonPool.filter(a =>
      !selectedNames.includes(a.name) && (!q || a.name.toLowerCase().includes(q))
    ).slice(0, 50);
    if (!available.length) { drop.classList.remove("open"); drop.innerHTML = ""; return; }
    drop.innerHTML = available.map((a, idx) => `
      <div class="chip-dropdown-item" data-addon-idx="${idx}">
        ${a.img ? `<img src="${a.img}" alt="" style="width:28px;height:28px;border-radius:4px;object-fit:cover">` : ""}
        ${a.tier ? `<span class="otz-tier-badge" style="position:static;margin-right:0.25rem">${a.tier}</span>` : ""}
        ${escapeHtml(a.name)}
      </div>
    `).join("");
    drop.querySelectorAll("[data-addon-idx]").forEach(el => {
      el.onclick = () => addFormAddon(available[+el.dataset.addonIdx]);
    });
    drop.classList.add("open");
  };
  input.onfocus = showAddonSuggestions;
  input.onclick = showAddonSuggestions;
  input.oninput = showAddonSuggestions;
  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const q = input.value.trim().toLowerCase();
      if (!q) return;
      refreshBuildAddonPool();
      const found = formAddonPool.find(a => a.name.toLowerCase() === q);
      if (found) addFormAddon(found);
      else if (input.value.trim().length > 1) addFormAddon({ name: input.value.trim(), img: null, tier: null });
      input.value = "";
      drop.classList.remove("open");
    }
  };
}

function addFormAddon(addon) {
  if (typeof addon === "string") addon = { name: addon, img: null, tier: null };
  if (!addon || !addon.name) return;
  if (formSelectedAddons.some(x => String(typeof x === "string" ? x : x.name).toLowerCase() === String(addon.name).toLowerCase())) return;
  if (formSelectedAddons.length >= 2) { showToast("Max 2 addons"); return; }
  formSelectedAddons.push(addon);
  renderChipList("form-addon-chips", formSelectedAddons.map(x => typeof x === "string" ? x : x.name), "addon");
  renderAddonPickerGrid();
  schedulePreviewRefresh();
  schedulePreviewRefresh();
  const input = document.getElementById("addon-search-input");
  const drop = document.getElementById("addon-search-dropdown");
  if (input) input.value = "";
  if (drop) { drop.classList.remove("open"); drop.innerHTML = ""; }
}


let formTagKind = "killer";
function removeFormTag(i) {
  formSelectedTags.splice(i, 1);
  renderChipList("form-tag-chips", formSelectedTags, "tag", formTagKind);
  setupTagPicker(formTagKind);
  schedulePreviewRefresh();
}

function removeFormPerk(i) {
  formSelectedPerks.splice(i, 1);
  try { refreshBuildEditPreview(); } catch (_) {}
  schedulePreviewRefresh();
  renderChipList("form-perk-chips", formSelectedPerks, "perk");
}

function setupTagPicker(kind) {
  // kind: "killer" | "build"
  formTagKind = kind;
  const list = kind === "build" ? getBuildTags() : getKillerTags();
  const grid = document.getElementById("form-tag-grid");
  if (!grid) return;
  grid.innerHTML = list.map(t => {
    const on = formSelectedTags.includes(t.name) || formSelectedTags.includes(t.id);
    return `<button type="button" class="tag-pick-btn ${on ? "on" : ""}" style="--tc:${t.color}" data-tag="${escapeAttr(t.name)}">
      ${escapeHtml(t.name)}
    </button>`;
  }).join("");
  grid.querySelectorAll("[data-tag]").forEach(btn => {
    btn.onclick = () => {
      const name = btn.dataset.tag;
      const i = formSelectedTags.indexOf(name);
      if (i >= 0) formSelectedTags.splice(i, 1);
      else formSelectedTags.push(name);
      renderChipList("form-tag-chips", formSelectedTags, "tag", kind);
      setupTagPicker(kind);
      schedulePreviewRefresh();
    };
  });
}

function addFormTag(name) {
  if (formSelectedTags.includes(name)) return;
  formSelectedTags.push(name);
  renderChipList("form-tag-chips", formSelectedTags, "tag");
  const input = document.getElementById("tag-search-input");
  const drop = document.getElementById("tag-search-dropdown");
  if (input) input.value = "";
  if (drop) { drop.classList.remove("open"); drop.innerHTML = ""; }
}

function setupPerkSearch(inputId, dropdownId) {
  const input = document.getElementById(inputId);
  const drop = document.getElementById(dropdownId);
  if (!input || !drop) return;
  const showPerkSuggestions = () => {
    const q = input.value.trim().toLowerCase();
    const available = state.perks.filter(p =>
      !formSelectedPerks.includes(p) && (!q || p.toLowerCase().includes(q))
    ).slice(0, 60);
    if (!available.length) { drop.classList.remove("open"); drop.innerHTML = ""; return; }
    drop.innerHTML = available.map((p, idx) => `
      <div class="chip-dropdown-item" data-perk-idx="${idx}">
        <img src="${getPerkIcon(p)}" onerror="this.src=CONFIG.placeholderPerk" alt="">
        ${escapeHtml(p)}
      </div>
    `).join("");
    drop.querySelectorAll("[data-perk-idx]").forEach(el => {
      el.onclick = () => addFormPerk(available[+el.dataset.perkIdx]);
    });
    drop.classList.add("open");
  };
  input.onfocus = showPerkSuggestions;
  input.onclick = showPerkSuggestions;
  input.oninput = showPerkSuggestions;
  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      const found = state.perks.find(p => p.toLowerCase() === q.toLowerCase());
      if (found) addFormPerk(found);
      input.value = "";
      drop.classList.remove("open");
    }
  };
}

function addFormPerk(name) {
  if (!name || formSelectedPerks.includes(name)) return;
  if (formSelectedPerks.length >= 4) { showToast("Max 4 perks"); return; }
  formSelectedPerks.push(name);
  renderChipList("form-perk-chips", formSelectedPerks, "perk");
  const input = document.getElementById("perk-search-input");
  const drop = document.getElementById("perk-search-dropdown");
  if (input) input.value = "";
  if (drop) { drop.classList.remove("open"); drop.innerHTML = ""; }
  // immediate preview (no debounce delay)
  try { refreshBuildEditPreview(); } catch (_) {}
  schedulePreviewRefresh();
}

// ---------- BUILD MODAL ----------
function refreshBuildEditPreview() {
  const box = document.getElementById("build-edit-preview-body");
  if (!box) return;
  const name = document.getElementById("b-name")?.value?.trim() || "Build name";
  const patch = document.getElementById("b-patch")?.value?.trim() || "";
  const desc = document.getElementById("b-desc")?.value?.trim() || "";
  const killerIds = [...document.querySelectorAll("#b-killers input:checked")].map(el => el.value);
  const killerNames = killerIds.map(id => state.killers.find(k => k.id === id)?.name || id);
  const perks = formSelectedPerks || [];
  const addons = (formSelectedAddons || []).map(x => typeof x === "string" ? x : x.name);
  const tags = (formSelectedTags || []).map(t => {
    const tg = findTagMeta(t, getBuildTags());
    const col = (tg && tg.color) || "#9b59b6";
    return `<span class="tag-dot" style="--tc:${col}">${escapeHtml(t)}</span>`;
  }).join("");
  const perkDiamond = perks.length
    ? perkDiamondHTML(perks, false)
    : `<p style="color:#666;font-size:0.85rem">No perks yet</p>`;
  const addonRow = addons.length ? `
    <div class="addon-row addon-row-icons" style="margin-top:0.5rem">
      ${addons.map((a, i) => {
        const img = (formSelectedAddons[i] && formSelectedAddons[i].img) || findOtzAddonImg(a, killerIds);
        return `<div class="addon-icon-block" title="${escapeAttr(a)}">
          ${img ? `<img src="${img}" alt="">` : ""}
          <span>${escapeHtml(a)}</span>
        </div>`;
      }).join("")}
    </div>` : `<p style="color:#666;font-size:0.8rem;margin-top:0.4rem">${killerIds.length ? "Universal (no specific addons)" : "No specific killer selected"}</p>`;
  box.innerHTML = `
    <div class="build-card-preview">
      <strong style="font-size:1.05rem">${escapeHtml(name)}</strong>
      <div style="font-size:0.8rem;color:#b0a0a8;margin:0.35rem 0">
        ${killerNames.length ? escapeHtml(killerNames.join(", ")) : "<em>No killers</em>"}
        ${patch ? " · " + escapeHtml(patch) : ""}
      </div>
      <div class="card-tags">${tags}</div>
      ${perkDiamond}
      ${addonRow}
      ${desc ? `<div class="md-body" style="margin-top:0.6rem;font-size:0.85rem">${escapeHtml(desc)}</div>` : ""}
    </div>`;
}

function openBuildModal(editId = null) {
  const b = editId ? state.builds.find(x => x.id === editId) : null;
  formSelectedTags = [...(b?.tags || [])];
  formSelectedPerks = [...(b?.perks || [])];
  formSelectedAddons = (b?.addons || []).map((name, i) => ({
    name,
    img: (b.addonImages && b.addonImages[i]) || null,
    tier: null
  }));
  const selectedKillers = new Set(b?.killerIds || []);

  const html = `
    <div class="edit-modal-topbar">
      <h2 style="margin:0">${b ? "Edit build" : "New build"}</h2>
      <div class="edit-modal-actions">
        <button class="btn" type="button" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" type="button" onclick="saveBuild('${editId || ""}')">Save</button>
      </div>
    </div>
    <div class="killer-edit-layout">
      <div class="edit-form-panel">
        <div class="edit-block">
          <h3 class="edit-block-title">Basics</h3>
          <div class="form-group"><label>Name</label>
            <input id="b-name" value="${escapeAttr(b?.name || "")}" oninput="schedulePreviewRefresh()">
          </div>
          <div class="form-group"><label>Patch / update</label>
            <input id="b-patch" value="${escapeAttr(b?.patch || "")}" oninput="schedulePreviewRefresh()">
          </div>
          <div class="form-group"><label>Description</label>
            <textarea id="b-desc" rows="3" oninput="schedulePreviewRefresh()">${escapeHtml(b?.description || "")}</textarea>
          </div>
        </div>
        <div class="edit-block">
          <h3 class="edit-block-title">Killers
            <button type="button" class="btn btn-sm" onclick="toggleAllKillers(true); schedulePreviewRefresh();">All</button>
            <button type="button" class="btn btn-sm" onclick="toggleAllKillers(false); schedulePreviewRefresh();">Clear</button>
          </h3>
          <div class="multi-killers" id="b-killers">
            ${state.killers.map(k => `
              <label><input type="checkbox" value="${k.id}" ${selectedKillers.has(k.id) ? "checked" : ""} onchange="refreshBuildAddonPool(); schedulePreviewRefresh();"> ${escapeHtml(k.name)}</label>
            `).join("")}
          </div>
        </div>
        <div class="edit-block">
          <h3 class="edit-block-title">Perks (max 4)</h3>
          <div class="chip-input-wrap">
            <div class="chip-list" id="form-perk-chips"></div>
            <div class="chip-search-row">
              <input id="perk-search-input" placeholder="Search perk…" autocomplete="off">
            </div>
            <div class="chip-dropdown" id="perk-search-dropdown"></div>
          </div>
        </div>
        <div class="edit-block">
          <h3 class="edit-block-title">Tags</h3>
          <div class="tag-picker">
            <div class="chip-list" id="form-tag-chips"></div>
            <div class="tag-picker-grid" id="form-tag-grid"></div>
          </div>
        </div>
        <div class="edit-block">
          <h3 class="edit-block-title">Addons (optional)</h3>
          <p id="addon-picker-hint" class="hint" style="margin:0 0 0.4rem">Select exactly 1 killer for Otz list</p>
          <div class="chip-list" id="form-addon-chips"></div>
          <div class="addon-picker-grid" id="form-addon-grid"></div>
          <div class="chip-input-wrap" style="margin-top:0.5rem">
            <div class="chip-search-row">
              <input id="addon-search-input" placeholder="Search addon…" autocomplete="off">
            </div>
            <div class="chip-dropdown" id="addon-search-dropdown"></div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn" type="button" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" type="button" onclick="saveBuild('${editId || ""}')">Save</button>
        </div>
      </div>
      <div class="killer-edit-preview">
        <div class="preview-top-actions">
          <button class="btn" type="button" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" type="button" onclick="saveBuild('${editId || ""}')">Save</button>
        </div>
        <h3 class="preview-label">Live preview</h3>
        <div id="build-edit-preview-body"></div>
      </div>
    </div>
  `;
  showModal(html, { wide: true });
  formTagKind = "build";
  renderChipList("form-tag-chips", formSelectedTags, "tag", "build");
  renderChipList("form-perk-chips", formSelectedPerks, "perk");
  renderChipList("form-addon-chips", formSelectedAddons.map(x => typeof x === "string" ? x : x.name), "addon");
  setupTagPicker("build");
  setupPerkSearch("perk-search-input", "perk-search-dropdown");
  setupAddonSearch("addon-search-input", "addon-search-dropdown");
  refreshBuildEditPreview();
}

function saveBuild(editId) {
  const name = document.getElementById("b-name").value.trim();
  if (!name) { showToast("Enter a name"); return; }
  const killerIds = [...document.querySelectorAll("#b-killers input:checked")].map(el => el.value);

  const data = {
    name, killerIds,
    perks: [...formSelectedPerks].slice(0, 4),
    tags: [...formSelectedTags],
    addons: formSelectedAddons.slice(0, 2).map(x => typeof x === "string" ? x : x.name),
    addonImages: formSelectedAddons.slice(0, 2).map(x => (typeof x === "object" && x.img) ? x.img : null).filter(Boolean),
    description: document.getElementById("b-desc")?.value.trim() || "",
    patch: document.getElementById("b-patch")?.value.trim() || "",
    version: "",
    favorite: false,
    currentlyUsing: false,
    changes: ""
  };

  if (editId) {
    const idx = state.builds.findIndex(x => x.id === editId);
    if (idx >= 0) state.builds[idx] = { ...state.builds[idx], ...data };
  } else {
    data.id = "b" + Date.now();
    state.builds.push(data);
  }
  saveData();
  closeModal();
  renderBuilds();
  populateFilterSelects();
  if (document.getElementById("tab-editor")?.classList.contains("active")) renderEditor();
  showToast("Build saved");
}

// ---------- KILLER FORM ----------
const DEFAULT_CONTENT_SECTIONS = [
  { key: "notes", title: "Short Note", builtin: true },
  { key: "guide", title: "Guide / How to Play", builtin: true }
];

function loadKillerSections(k) {
  if (k && Array.isArray(k.contentSections) && k.contentSections.length) {
    return k.contentSections
      .filter(s => s.key !== "addonNotes")
      .map(s => ({
        key: s.key,
        title: s.title || s.key,
        body: s.body === "placeholder" ? "" : (s.body || ""),
        builtin: !!s.builtin || ["notes", "guide"].includes(s.key)
      }));
  }
  return DEFAULT_CONTENT_SECTIONS.map(d => ({
    key: d.key,
    title: d.title,
    builtin: true,
    body: (() => {
      const v = k && k[d.key];
      return (!v || v === "placeholder") ? "" : String(v);
    })()
  }));
}

function renderContentSectionsEditor() {
  const wrap = document.getElementById("content-sections-editor");
  if (!wrap || !formContentSections) return;
  const presentKeys = new Set(formContentSections.map(s => s.key));
  const missingBuiltins = DEFAULT_CONTENT_SECTIONS.filter(d => !presentKeys.has(d.key));
  wrap.innerHTML =
    (missingBuiltins.length
      ? `<div class="restored-builtins">${missingBuiltins.map(d =>
          `<button type="button" class="btn btn-sm" onclick="restoreBuiltinSection('${d.key}')">↩ Restore ${escapeHtml(d.title)}</button>`
        ).join("")}</div>`
      : "") +
    formContentSections.map((sec, i) => `
      <div class="section-edit-block" data-sec-i="${i}">
        <div class="section-edit-head">
          <div class="section-order-btns">
            <button type="button" class="btn btn-sm" onclick="moveContentSection(${i}, -1)" title="Move up" ${i === 0 ? "disabled" : ""}>↑</button>
            <button type="button" class="btn btn-sm" onclick="moveContentSection(${i}, 1)" title="Move down" ${i >= formContentSections.length - 1 ? "disabled" : ""}>↓</button>
          </div>
          <input type="text" class="section-title-input" value="${escapeAttr(sec.title)}"
            ${sec.builtin ? "readonly" : ""}
            oninput="updateSectionTitle(${i}, this.value)"
            placeholder="Section title">
          <button type="button" class="btn btn-sm btn-danger" onclick="removeContentSection(${i})">Remove</button>
        </div>
        ${formatToolbarHTML("k-sec-" + i)}
        <textarea id="k-sec-${i}" rows="4" oninput="updateSectionBody(${i}, this.value)">${escapeHtml(sec.body || "")}</textarea>
      </div>
    `).join("");
}

function moveContentSection(i, dir) {
  if (!formContentSections) return;
  const j = i + dir;
  if (j < 0 || j >= formContentSections.length) return;
  const tmp = formContentSections[i];
  formContentSections[i] = formContentSections[j];
  formContentSections[j] = tmp;
  renderContentSectionsEditor();
  refreshKillerEditPreview();
}

function updateSectionTitle(i, val) {
  if (!formContentSections || !formContentSections[i]) return;
  formContentSections[i].title = val;
  refreshKillerEditPreview();
}
function updateSectionBody(i, val) {
  if (!formContentSections || !formContentSections[i]) return;
  formContentSections[i].body = val;
  refreshKillerEditPreview();
}
function removeContentSection(i) {
  if (!formContentSections) return;
  formContentSections.splice(i, 1);
  renderContentSectionsEditor();
  refreshKillerEditPreview();
}
function restoreBuiltinSection(key) {
  const def = DEFAULT_CONTENT_SECTIONS.find(d => d.key === key);
  if (!def || !formContentSections) return;
  if (formContentSections.some(s => s.key === key)) return;
  formContentSections.push({ key: def.key, title: def.title, body: "", builtin: true });
  renderContentSectionsEditor();
  refreshKillerEditPreview();
}
function addCustomContentSection() {
  if (!formContentSections) formContentSections = [];
  formContentSections.push({ key: "custom_" + Date.now(), title: "New section", body: "", builtin: false });
  renderContentSectionsEditor();
  refreshKillerEditPreview();
}

function refreshKillerEditPreview() {
  const box = document.getElementById("killer-edit-preview-body");
  if (!box) return;
  const name = document.getElementById("k-name")?.value?.trim() || "Killer name";
  const difficulty = document.getElementById("k-difficulty")?.value || "—";
  const tier = document.getElementById("k-tier")?.value || "";
  const sf = document.getElementById("k-skill-floor")?.value || "0";
  const sc = document.getElementById("k-skill-ceiling")?.value || "0";
  const fun = document.getElementById("k-fun")?.value || "0";
  const patch = document.getElementById("k-patch")?.value || "";
  const release = document.getElementById("k-release")?.value || "";
  const chapter = document.getElementById("k-chapter")?.value || "";
  const src = getKillerPortrait(name);
  const tags = (formSelectedTags || []).map(t => {
    const tg = findTagMeta(t, getKillerTags());
    const col = (tg && tg.color) || "#666";
    return `<span class="tag-dot" style="--tc:${col}">${escapeHtml(t)}</span>`;
  }).join("");
  // Sync section bodies from live textareas before paint
  if (formContentSections) {
    formContentSections.forEach((sec, i) => {
      const ta = document.getElementById("k-sec-" + i);
      if (ta) sec.body = ta.value;
    });
  }
  const addonNotesEl = document.getElementById("k-addon-notes");
  const addonNotes = addonNotesEl ? String(addonNotesEl.value || "").trim() : "";
  const killerId = window._editingKillerId || "";
  const comboHtml = (formSelectedCombos || []).filter(c => (c.addons || []).length || (c.name || "").trim()).map((combo, ci) => {
    const items = (combo.addons || []).map(n => {
      const img = findOtzAddonImg(n, killerId ? [killerId] : []) || findOtzAddonImg(n, []);
      return `<div class="my-combo-item" title="${escapeAttr(n)}">
        ${img ? `<img src="${escapeAttr(img)}" alt="">` : ""}
        <span>${escapeHtml(n)}</span>
      </div>`;
    }).join("");
    return `<div class="my-combo-box"><h4>${escapeHtml(combo.name || ("Combo " + (ci + 1)))}</h4><div class="my-combo-row">${items || "—"}</div></div>`;
  }).join("");
  const sections = (formContentSections || []).map(sec => {
    const body = (sec.body || "").trim();
    return `<div class="detail-section" style="margin-top:0.65rem">
      <h3 style="font-size:0.95rem;margin-bottom:0.3rem">${escapeHtml(sec.title)}</h3>
      <div class="md-body">${body ? renderMarkdown(body) : "<em style='color:var(--text-dim)'>—</em>"}</div>
    </div>`;
  }).join("");
  box.innerHTML = `
    <div style="display:flex;gap:0.75rem;align-items:flex-start">
      <img src="${src}" alt="" style="width:72px;height:96px;object-fit:cover;border-radius:8px;border:1px solid #333"
        onerror="this.src=CONFIG.placeholderPortrait">
      <div style="flex:1;min-width:0">
        <div style="display:flex;flex-wrap:wrap;gap:0.35rem;align-items:center;margin-bottom:0.35rem">
          <strong style="font-size:1.05rem">${escapeHtml(name)}</strong>
          ${tierBadgeHTML(tier)}
        </div>
        <div style="font-size:0.8rem;color:#b0a0a8">
          ${escapeHtml(difficulty)} · Skill ${escapeHtml(sf)}–${escapeHtml(sc)} · Fun ${escapeHtml(fun)}
          ${patch ? " · Patch " + escapeHtml(patch) : ""}
          ${release ? " · " + escapeHtml(formatReleaseDate(release) || release) : ""}
          ${chapter ? " · Ch. " + escapeHtml(chapter) : ""}
        </div>
        <div class="card-tags" style="margin-top:0.4rem">${tags || "<span style='color:#666;font-size:0.75rem'>No tags</span>"}</div>
      </div>
    </div>
    ${comboHtml ? `<div class="my-combos-wrap" style="margin-top:0.75rem">${comboHtml}</div>` : ""}
    <div class="detail-section" style="margin-top:0.75rem">
      <h3 style="font-size:0.95rem">Addon notes</h3>
      <div class="md-body">${addonNotes ? renderMarkdown(addonNotes) : "<em style='color:var(--text-dim)'>—</em>"}</div>
    </div>
    ${sections}`;
}

function schedulePreviewRefresh(immediate) {
  const run = () => {
    try { refreshKillerEditPreview(); } catch (_) {}
    try { refreshBuildEditPreview(); } catch (_) {}
  };
  // Always run once immediately so chips/perks appear at once
  run();
  // Light debounce only for rapid typing in textareas
  if (immediate === false) {
    clearTimeout(window._previewRefreshT);
    window._previewRefreshT = setTimeout(run, 80);
  }
}



function openDetailedKillerForm(editId = null) {
  try {
  if (!state.addons) state.addons = [];
  if (!state.killerTags) state.killerTags = [];
  const k = editId ? state.killers.find(x => x.id === editId) : null;
  formSelectedTags = [...(k?.tags || [])];
  window._editingKillerId = k?.id || "";
  formContentSections = loadKillerSections(k);

  if (k?.recommendedCombos && k.recommendedCombos.length) {
    formSelectedCombos = k.recommendedCombos.map(c => {
      if (Array.isArray(c)) return { name: "", addons: [...c] };
      return { name: c.name || "", addons: [...(c.addons || [])] };
    });
  } else if (k?.recommendedAddons && k.recommendedAddons.length) {
    formSelectedCombos = [{ name: "", addons: [...k.recommendedAddons] }];
  } else {
    formSelectedCombos = [{ name: "", addons: [] }];
  }

  const addonNotesVal = (k?.addonNotes && k.addonNotes !== "placeholder") ? k.addonNotes : "";

  const html = `
    <div class="edit-modal-topbar">
      <h2 style="margin:0">${k ? "Edit killer" : "New killer"}</h2>
      <div class="edit-modal-actions">
        ${k ? `<button class="btn btn-danger" type="button" onclick="deleteKiller('${k.id}')">Delete</button>` : ""}
        <button class="btn" type="button" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" type="button" onclick="saveKiller('${editId || ""}')">Save</button>
      </div>
    </div>
    <div class="killer-edit-layout">
      <div class="killer-edit-form edit-form-panel">
        <div class="edit-block">
          <h3 class="edit-block-title">Identity</h3>
          <div class="form-group"><label>Name *</label>
            <input id="k-name" value="${escapeAttr(k?.name || "")}" oninput="schedulePreviewRefresh()">
          </div>
          <div class="form-row-3">
            <div class="form-group"><label>Release date</label>
              <input type="date" id="k-release" value="${escapeAttr((k?.releaseDate || "").slice(0,10))}" oninput="schedulePreviewRefresh()">
            </div>
            <div class="form-group"><label>Chapter</label>
              <input id="k-chapter" value="${escapeAttr(k?.chapter != null ? String(k.chapter) : "")}" placeholder="e.g. 1 or 32" oninput="schedulePreviewRefresh()">
            </div>
            <div class="form-group"><label>Release order</label>
              <input type="number" id="k-release-order" value="${k?.releaseOrder ?? 9999}" min="0" step="1" title="Same date: lower = earlier (Trapper=1)">
            </div>
          </div>
        </div>
        <div class="edit-block">
          <h3 class="edit-block-title">Ratings</h3>
          <div class="form-row-3">
            <div class="form-group"><label>Difficulty</label>
              <select id="k-difficulty" onchange="schedulePreviewRefresh()">
                ${["Beginner","Easy","Medium","Hard","Very Hard","Extremely Hard"].map(d =>
                  `<option value="${d}" ${k?.difficulty === d ? "selected" : ""}>${d}</option>`).join("")}
              </select>
            </div>
            <div class="form-group"><label>Skill floor</label>
              <input type="number" id="k-skill-floor" min="0" max="10" step="0.1" value="${k?.skillFloor ?? 0}" oninput="schedulePreviewRefresh()">
            </div>
            <div class="form-group"><label>Skill ceiling</label>
              <input type="number" id="k-skill-ceiling" min="0" max="10" step="0.1" value="${k?.skillCeiling ?? 0}" oninput="schedulePreviewRefresh()">
            </div>
          </div>
          <div class="form-row-3">
            <div class="form-group"><label>Fun to Play</label>
              <input type="number" id="k-fun" min="0" max="10" step="0.1" value="${k?.fun2play ?? 0}" oninput="schedulePreviewRefresh()">
            </div>
            <div class="form-group"><label>Tier</label>
              <select id="k-tier" onchange="schedulePreviewRefresh()">
                ${TIER_RANKS.map(t => `<option value="${t}" ${(k?.tier || "") === t ? "selected" : ""}>${t || "— unranked"}</option>`).join("")}
              </select>
            </div>
            <div class="form-group"><label>Notes for patch</label>
              <input id="k-patch" value="${escapeAttr(k?.patch || "")}" oninput="schedulePreviewRefresh()">
            </div>
          </div>
        </div>
        <div class="edit-block">
          <h3 class="edit-block-title">Tags</h3>
          <div class="tag-picker" id="form-tag-picker">
            <div class="chip-list" id="form-tag-chips"></div>
            <div class="tag-picker-grid" id="form-tag-grid"></div>
          </div>
        </div>
        <div class="edit-block">
          <h3 class="edit-block-title">Addon combos & notes</h3>
          <p class="hint" id="k-combo-hint" style="margin:0 0 0.4rem">Up to 2 addons per combo. Addon notes stay fixed under Otz on the profile.</p>
          <div id="combo-boxes-container"></div>
          <button type="button" class="btn btn-sm" style="margin-top:0.5rem" onclick="addComboBox(); schedulePreviewRefresh();">+ Add combo box</button>
          <div class="form-group" style="margin-top:0.85rem">
            <label>Addon notes <span class="hint">(always visible with Otz addons)</span></label>
            ${formatToolbarHTML("k-addon-notes")}
            <textarea id="k-addon-notes" rows="3" oninput="schedulePreviewRefresh()">${escapeHtml(addonNotesVal)}</textarea>
          </div>
        </div>
        <div class="edit-block">
          <h3 class="edit-block-title">Text sections</h3>
          <p class="hint" style="margin:0 0 0.4rem">Reorder with ↑↓. Remove / restore defaults, or add custom sections.</p>
          <div id="content-sections-editor"></div>
          <button type="button" class="btn btn-sm" onclick="addCustomContentSection()">+ New section</button>
        </div>
        <div class="modal-actions">
          ${k ? `<button class="btn btn-danger" style="margin-right:auto" type="button" onclick="deleteKiller('${k.id}')">Delete</button>` : ""}
          <button class="btn" type="button" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" type="button" onclick="saveKiller('${editId || ""}')">Save</button>
        </div>
      </div>
      <div class="killer-edit-preview">
        <div class="preview-top-actions">
          <button class="btn" type="button" onclick="closeModal()">Cancel</button>
          <button class="btn btn-primary" type="button" onclick="saveKiller('${editId || ""}')">Save</button>
        </div>
        <h3 class="preview-label">Live preview</h3>
        <div id="killer-edit-preview-body"></div>
      </div>
    </div>
  `;
  showModal(html, { wide: true });
  formTagKind = "killer";
  renderChipList("form-tag-chips", formSelectedTags, "tag", "killer");
  setupTagPicker("killer");
  setupKillerComboPicker(k?.name || "");
  renderContentSectionsEditor();
  refreshKillerEditPreview();
  document.getElementById("k-name")?.addEventListener("change", () => setupKillerComboPicker(document.getElementById("k-name").value));
  } catch (err) {
    console.error(err);
    showToast("Could not open editor: " + err.message);
  }
}

function saveKiller(editId) {
  const name = document.getElementById("k-name").value.trim();
  if (!name) { showToast("Enter a name"); return; }
  let id = editId || name.toLowerCase().replace(/^the\s+/i, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (!editId && state.killers.some(k => k.id === id)) id = id + "-" + Date.now();

  if (formContentSections) {
    formContentSections.forEach((sec, i) => {
      const ta = document.getElementById("k-sec-" + i);
      if (ta) sec.body = ta.value;
      const titleEl = document.querySelector('.section-edit-block[data-sec-i="' + i + '"] .section-title-input');
      if (titleEl && !sec.builtin) sec.title = titleEl.value;
    });
  }
  const sections = (formContentSections || []).map(sec => ({
    key: sec.key,
    title: sec.title || sec.key,
    body: (sec.body || "").trim() || "placeholder",
    builtin: !!sec.builtin
  }));
  const byKey = Object.fromEntries(sections.map(s => [s.key, s.body]));
  const prev = editId ? state.killers.find(x => x.id === editId) : null;
  const addonNotes = (document.getElementById("k-addon-notes")?.value || "").trim() || "placeholder";

  const data = {
    id, name,
    difficulty: document.getElementById("k-difficulty")?.value || "Medium",
    skillFloor: Math.round((+document.getElementById("k-skill-floor")?.value || 0) * 10) / 10,
    skillCeiling: Math.round((+document.getElementById("k-skill-ceiling")?.value || 0) * 10) / 10,
    fun2play: Math.round((+document.getElementById("k-fun")?.value || 0) * 10) / 10,
    tier: document.getElementById("k-tier")?.value || "",
    tags: [...formSelectedTags],
    notes: byKey.notes || "placeholder",
    guide: byKey.guide || "placeholder",
    vsNotes: prev?.vsNotes || "placeholder",
    addonNotes,
    contentSections: sections,
    recommendedCombos: (formSelectedCombos || [])
      .map(c => ({ name: (c.name || "").trim(), addons: [...(c.addons || [])] }))
      .filter(c => c.addons.length || c.name),
    patch: document.getElementById("k-patch")?.value.trim() || "",
    releaseDate: document.getElementById("k-release")?.value || "",
    chapter: document.getElementById("k-chapter")?.value.trim() || "",
    releaseOrder: Math.max(0, parseInt(document.getElementById("k-release-order")?.value, 10) || 0)
  };

  if (editId) {
    const idx = state.killers.findIndex(x => x.id === editId);
    if (idx >= 0) state.killers[idx] = { ...state.killers[idx], ...data };
  } else {
    state.killers.push(data);
  }
  saveData();
  closeModal();
  renderKillers();
  populateFilterSelects();
  if (document.getElementById("tab-editor")?.classList.contains("active")) renderEditor();
  showToast("Killer saved");
}

function deleteKiller(id) {
  showConfirm("Delete this killer?", () => {
  state.killers = state.killers.filter(k => k.id !== id);
  state.builds.forEach(b => { b.killerIds = (b.killerIds || []).filter(kid => kid !== id); });
  saveData();
  closeModal();
  renderAll();
  if (document.getElementById("tab-editor")?.classList.contains("active")) renderEditor();
  showToast("Killer deleted");
  });
  return;
  // old path disabled
  state.killers = state.killers.filter(k => k.id !== id);
  state.builds.forEach(b => { b.killerIds = (b.killerIds || []).filter(kid => kid !== id); });
  saveData();
  closeModal();
  renderAll();
  renderEditor();
}

// ---------- QUICK ADD (tylko w Editor) ----------
function quickAddPerk() {
  const panel = document.getElementById("perk-add-form");
  if (panel) {
    panel.hidden = false;
    document.getElementById("new-perk-name")?.focus();
  }
}

function submitNewPerk() {
  const name = document.getElementById("new-perk-name")?.value.trim();
  const url = document.getElementById("new-perk-url")?.value.trim();
  if (!name) { showToast("Enter perk name"); return; }
  if (!url) { showToast("Enter icon URL (wiki.gg)"); return; }
  if (!state.perks.includes(name)) state.perks.push(name);
  if (typeof CONFIG !== "undefined") {
    if (!CONFIG.perkIcons) CONFIG.perkIcons = {};
    CONFIG.perkIcons[name] = url;
  }
  if (!state._pendingPerkIcons) state._pendingPerkIcons = {};
  state._pendingPerkIcons[name] = url;
  saveData();
  const snippet = `  "${name}": "${url}",`;
  const sn = document.getElementById("perk-config-snippet");
  if (sn) {
    sn.hidden = false;
    const ta = sn.querySelector("textarea");
    if (ta) ta.value = snippet;
  }
  const n1 = document.getElementById("new-perk-name");
  const n2 = document.getElementById("new-perk-url");
  if (n1) n1.value = "";
  if (n2) n2.value = "";
  showToast("Perk added locally — paste icon line into config.js");
  renderEditor();
}

function copyPerkSnippet() {
  const ta = document.querySelector("#perk-config-snippet textarea");
  if (!ta) return;
  navigator.clipboard.writeText(ta.value).then(() => showToast("Copied!")).catch(() => {});
}

function cancelNewPerk() {
  const panel = document.getElementById("perk-add-form");
  if (panel) panel.hidden = true;
}

// ---------- EDITOR ----------

function setupEditorTabs() {
  document.querySelectorAll(".editor-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".editor-tab").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".editor-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`editor-${btn.dataset.editor}`)?.classList.add("active");
    });
  });
}

function renderEditor() {
  const kList = document.getElementById("editor-killers-list");
  if (kList) {
    const q = (document.getElementById("ed-killer-search")?.value || "").trim().toLowerCase();
    const sort = document.getElementById("ed-killer-sort")?.value || "name";
    let list = state.killers.slice();
    if (q) {
      list = list.filter(k =>
        (k.name || "").toLowerCase().includes(q) ||
        (k.id || "").toLowerCase().includes(q) ||
        (k.difficulty || "").toLowerCase().includes(q) ||
        (k.tier || "").toLowerCase().includes(q) ||
        (k.tags || []).some(t => String(t).toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => {
      if (sort === "nameDesc") return b.name.localeCompare(a.name);
      if (sort === "tier") {
        const d = tierRankValue(a.tier) - tierRankValue(b.tier);
        return d !== 0 ? d : a.name.localeCompare(b.name);
      }
      if (sort === "difficulty" || sort === "difficultyDesc") {
        const order = ["Beginner","Easy","Medium","Hard","Very Hard","Extremely Hard"];
        const d = order.indexOf(a.difficulty) - order.indexOf(b.difficulty);
        return sort === "difficultyDesc" ? -d : d;
      }
      if (sort === "fun2play") return (b.fun2play || 0) - (a.fun2play || 0);
      if (sort === "skillCeiling") return (b.skillCeiling || 0) - (a.skillCeiling || 0);
      if (sort === "release") {
        const da = a.releaseDate || "", db = b.releaseDate || "";
        if (da !== db) return da.localeCompare(db);
        return (a.releaseOrder || 0) - (b.releaseOrder || 0);
      }
      return a.name.localeCompare(b.name);
    });
    kList.innerHTML = list.map(k => `
      <div class="editor-item">
        <img src="${getKillerPortrait(k.name)}" style="width:40px;height:40px;border-radius:6px;object-fit:cover" onerror="this.src=CONFIG.placeholderPortrait">
        <strong style="min-width:140px">${escapeHtml(k.name)}</strong>
        <span style="font-size:0.78rem;color:var(--text-dim)">${k.difficulty} • ${k.skillFloor ?? 0}–${k.skillCeiling ?? 0} • Fun ${k.fun2play ?? 0} • ${tierBadgeHTML(k.tier)}</span>
        ${isLocalOnlyKiller(k) ? unsavedBadge("New killer — not in data.js") : (isDirtyKiller(k) ? dirtyBadge("Edited — export to data.js") : "")}
        <button class="btn btn-sm" style="margin-left:auto" onclick="openDetailedKillerForm('${k.id}')">Edit</button>
      </div>
    `).join("") || "<p style='color:var(--text-dim)'>None</p>";
  }

  const bList = document.getElementById("editor-builds-list");
  if (bList) {
    const q = (document.getElementById("ed-build-search")?.value || "").trim().toLowerCase();
    const sort = document.getElementById("ed-build-sort")?.value || "name";
    let list = state.builds.slice();
    if (q) {
      list = list.filter(b => {
        const names = (b.killerIds || []).map(id => state.killers.find(k => k.id === id)?.name || id).join(" ").toLowerCase();
        return (b.name || "").toLowerCase().includes(q) || names.includes(q) ||
          (b.patch || "").toLowerCase().includes(q) ||
          (b.tags || []).some(t => String(t).toLowerCase().includes(q)) ||
          (b.perks || []).some(p => String(p).toLowerCase().includes(q));
      });
    }
    list.sort((a, b) => {
      if (sort === "nameDesc") return b.name.localeCompare(a.name);
      if (sort === "patch") return String(a.patch || "").localeCompare(String(b.patch || ""), undefined, { numeric: true });
      if (sort === "killer") {
        const na = (a.killerIds || []).map(id => state.killers.find(k => k.id === id)?.name || id).join(",");
        const nb = (b.killerIds || []).map(id => state.killers.find(k => k.id === id)?.name || id).join(",");
        return na.localeCompare(nb);
      }
      return a.name.localeCompare(b.name);
    });
    bList.innerHTML = list.map(b => {
      const names = (b.killerIds || []).map(id => state.killers.find(k => k.id === id)?.name || id).join(", ");
      return `
        <div class="editor-item">
          <strong style="min-width:140px">${escapeHtml(b.name)}</strong>
          <span style="font-size:0.78rem;color:var(--text-dim)">${escapeHtml(names) || "—"} ${b.patch ? "· " + escapeHtml(b.patch) : ""}</span>
          ${isLocalOnlyBuild(b) ? unsavedBadge("New build — not in data.js") : (isDirtyBuild(b) ? dirtyBadge("Edited — export to data.js") : "")}
          <button class="btn btn-sm" style="margin-left:auto" onclick="openBuildModal('${b.id}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteBuild('${b.id}')">X</button>
        </div>
      `;
    }).join("") || "<p style='color:var(--text-dim)'>No builds</p>";
  }

  const ktList = document.getElementById("editor-killer-tags-list");
  if (ktList) {
    const q = (document.getElementById("ed-ktag-search")?.value || "").trim().toLowerCase();
    const tags = getKillerTags().map((t, i) => ({ t, i })).filter(x => !q || String(x.t.name || "").toLowerCase().includes(q));
    ktList.innerHTML = tags.map(({ t, i }) => tagEditRowHTML("killer", t, i)).join("") || "<p style='color:var(--text-dim)'>No killer tags</p>";
  }
  const btList = document.getElementById("editor-build-tags-list");
  if (btList) {
    const q = (document.getElementById("ed-btag-search")?.value || "").trim().toLowerCase();
    const tags = getBuildTags().map((t, i) => ({ t, i })).filter(x => !q || String(x.t.name || "").toLowerCase().includes(q));
    btList.innerHTML = tags.map(({ t, i }) => tagEditRowHTML("build", t, i)).join("") || "<p style='color:var(--text-dim)'>No build tags</p>";
  }
  const pList = document.getElementById("editor-perks-list");
  if (pList) {
    const q = (document.getElementById("ed-perk-search")?.value || "").trim().toLowerCase();
    const rows = state.perks.map((p, i) => ({ p, i })).filter(x => {
      const name = typeof x.p === "string" ? x.p : (x.p && x.p.name);
      return !q || String(name || "").toLowerCase().includes(q);
    });
    pList.innerHTML = rows.map(({ p, i }) => {
      const name = typeof p === "string" ? p : (p && p.name) || "";
      return `
      <div class="editor-item">
        <img src="${getPerkIcon(name)}" style="width:36px;height:36px;border-radius:4px" onerror="this.style.opacity=0.3">
        <strong>${escapeHtml(name)}</strong>
        ${isLocalOnlyPerk(name) ? unsavedBadge("New perk") : ""}
      </div>`;
    }).join("") || "<p style='color:var(--text-dim)'>No perks</p>";
  }
  updateEditorUnsavedBanner();
}


function tagEditRowHTML(kind, t, i) {
  const locked = t._locked !== false;
  return `
    <div class="editor-item tag-edit-row ${locked ? "locked" : ""}">
      <button type="button" class="btn btn-sm lock-btn" title="${locked ? "Unlock to edit" : "Lock"}"
        onclick="toggleTagLock('${kind}',${i})">${locked ? "🔒" : "🔓"}</button>
      <input type="color" value="${t.color}" ${locked ? "disabled" : ""} onchange="updateTagField('${kind}',${i},'color',this.value)" title="Color">
      <input type="text" class="tag-name-input" value="${escapeAttr(t.name)}" ${locked ? "readonly" : ""} onchange="updateTagField('${kind}',${i},'name',this.value)">
      ${isLocalOnlyTag(kind, t) ? unsavedBadge("New tag — not in data.js") : ""}
      <button class="btn btn-sm btn-danger" ${locked ? "disabled" : ""} onclick="deleteEditorTag('${kind}',${i})">Del</button>
    </div>`;
}

function toggleTagLock(kind, i) {
  const arr = kind === "build" ? state.buildTags : state.killerTags;
  if (!arr[i]) return;
  const currentlyLocked = arr[i]._locked !== false;
  arr[i]._locked = !currentlyLocked;
  saveData();
  renderEditor();
}

function addEditorTag(kind) {
  const arr = kind === "build" ? (state.buildTags = state.buildTags || []) : (state.killerTags = state.killerTags || []);
  const id = "tag-" + Date.now();
  arr.push({ id, name: "new-tag", color: kind === "build" ? "#9b59b6" : "#4a9eff" });
  saveData(); renderEditor();
}

function updateTagField(kind, i, field, value) {
  const arr = kind === "build" ? state.buildTags : state.killerTags;
  if (!arr[i]) return;
  arr[i][field] = value;
  if (field === "name") arr[i].id = value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  saveData();
  // refresh filters / picks without full re-render of inputs (avoid losing focus)
  populateFilterSelects();
}

function editEditorTag(kind, i) {
  // kept for compatibility — editing is inline
  updateTagField(kind, i, "name", state[kind === "build" ? "buildTags" : "killerTags"][i]?.name);
}

function deleteEditorTag(kind, i) {
  const arr = kind === "build" ? state.buildTags : state.killerTags;
  showConfirm("Delete this tag?", () => {
    arr.splice(i, 1);
    saveData(); renderEditor();
    showToast("Tag deleted");
  });
}


// ---------- MERGE data.js / JSON ----------

let _lastMergedData = null;
let _lastMergeReport = null;

function setMergeStatus(html) {
  const el = document.getElementById("merge-status");
  if (el) el.innerHTML = html || "";
}

function parseDataFileText(text, label) {
  text = String(text || "").replace(/^\uFEFF/, "").trim();
  if (!text) throw new Error(label + ": empty file");
  if (text[0] === "{" || text[0] === "[") {
    const obj = JSON.parse(text);
    return obj.INITIAL_DATA || obj;
  }
  const m = text.match(/INITIAL_DATA\s*=\s*/);
  const startSearch = m ? m.index + m[0].length : 0;
  const i = text.indexOf("{", startSearch);
  if (i < 0) throw new Error(label + ": no object found");
  let depth = 0, inStr = false, esc = false, quote = "";
  for (let j = i; j < text.length; j++) {
    const ch = text[j];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (ch === "\\") { esc = true; continue; }
      if (ch === quote) inStr = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") { inStr = true; quote = ch; continue; }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        const slice = text.slice(i, j + 1);
        try { return JSON.parse(slice); }
        catch (_) { return (new Function("return (" + slice + ")"))(); }
      }
    }
  }
  throw new Error(label + ": could not parse object");
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file selected"));
    const r = new FileReader();
    r.onload = () => resolve(String(r.result || ""));
    r.onerror = () => reject(new Error("Failed to read " + file.name));
    r.readAsText(file);
  });
}

function normalizeDataShape(d) {
  d = d || {};
  return {
    killers: Array.isArray(d.killers) ? d.killers.slice() : [],
    builds: Array.isArray(d.builds) ? d.builds.slice() : [],
    killerTags: Array.isArray(d.killerTags) ? d.killerTags.slice() : (Array.isArray(d.tags) ? d.tags.slice() : []),
    buildTags: Array.isArray(d.buildTags) ? d.buildTags.slice() : [],
    perks: Array.isArray(d.perks) ? d.perks.slice() : []
  };
}

function isEmptyVal(v) {
  if (v == null) return true;
  if (typeof v === "string") return !v.trim() || v === "placeholder";
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "number") return false;
  return false;
}

function mergeRecord(a, b) {
  if (!a) return b ? JSON.parse(JSON.stringify(b)) : null;
  if (!b) return JSON.parse(JSON.stringify(a));
  const out = JSON.parse(JSON.stringify(a));
  for (const key of Object.keys(b)) {
    const bv = b[key], av = out[key];
    if (isEmptyVal(bv)) continue;
    if (isEmptyVal(av)) {
      out[key] = JSON.parse(JSON.stringify(bv));
      continue;
    }
    if (Array.isArray(bv) && Array.isArray(av)) {
      if (key === "tags") {
        out[key] = [...new Set([...av, ...bv].map(String))];
      } else if (key === "recommendedCombos" || key === "perks" || key === "addons" || key === "killerIds") {
        out[key] = bv.length >= av.length ? JSON.parse(JSON.stringify(bv)) : av;
      } else {
        out[key] = JSON.parse(JSON.stringify(bv));
      }
    } else if (bv && av && typeof bv === "object" && typeof av === "object" && !Array.isArray(bv)) {
      out[key] = mergeRecord(av, bv);
    } else {
      out[key] = bv;
    }
  }
  return out;
}

function mergeTagLists(a, b) {
  const map = new Map();
  for (const t of [...(a || []), ...(b || [])]) {
    if (!t || !t.name) continue;
    const k = String(t.name).toLowerCase();
    if (!map.has(k)) map.set(k, { name: t.name, color: t.color || "#5a2a2a" });
    else {
      const cur = map.get(k);
      if (t.color && (!cur.color || cur.color === "#5a2a2a")) cur.color = t.color;
    }
  }
  return [...map.values()];
}

function mergeDataSets(a, b) {
  a = normalizeDataShape(a);
  b = normalizeDataShape(b);
  const killers = new Map();
  for (const k of a.killers) if (k && k.id) killers.set(String(k.id), k);
  for (const k of b.killers) {
    if (!k || !k.id) continue;
    const id = String(k.id);
    killers.set(id, mergeRecord(killers.get(id), k));
  }
  const builds = new Map();
  for (const x of a.builds) if (x && x.id) builds.set(String(x.id), x);
  for (const x of b.builds) {
    if (!x || !x.id) continue;
    const id = String(x.id);
    builds.set(id, mergeRecord(builds.get(id), x));
  }
  const perkSet = new Set();
  const perks = [];
  for (const p of [...a.perks, ...b.perks]) {
    const name = typeof p === "string" ? p : (p && p.name);
    if (!name) continue;
    const key = String(name).toLowerCase();
    if (perkSet.has(key)) continue;
    perkSet.add(key);
    perks.push(String(name));
  }
  return {
    killers: [...killers.values()],
    builds: [...builds.values()],
    killerTags: mergeTagLists(a.killerTags, b.killerTags),
    buildTags: mergeTagLists(a.buildTags, b.buildTags),
    perks
  };
}

function recordFingerprint(obj, keys) {
  if (!obj) return "";
  const o = {};
  for (const k of keys) {
    if (obj[k] !== undefined) o[k] = obj[k];
  }
  return JSON.stringify(o);
}

const KILLER_DIFF_KEYS = ["name","tier","difficulty","skillFloor","skillCeiling","fun2play","notes","guide","addonNotes","patch","tags","chapter","releaseDate","releaseOrder","recommendedCombos","contentSections"];
const BUILD_DIFF_KEYS = ["name","description","perks","addons","tags","patch","killerIds"];


function shortVal(v) {
  if (v == null) return "—";
  if (typeof v === "string") {
    const t = v.trim();
    if (!t || t === "placeholder") return "—";
    return t.length > 80 ? t.slice(0, 77) + "…" : t;
  }
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) {
    if (!v.length) return "[]";
    if (v.every(x => typeof x === "string" || typeof x === "number")) {
      const s = v.join(", ");
      return s.length > 90 ? s.slice(0, 87) + "…" : s;
    }
    return "[" + v.length + " items]";
  }
  if (typeof v === "object") {
    try { return JSON.stringify(v).slice(0, 90); } catch (_) { return "{…}"; }
  }
  return String(v);
}

function fieldDiffs(a, b, keys) {
  const out = [];
  for (const key of keys) {
    const av = a ? a[key] : undefined;
    const bv = b ? b[key] : undefined;
    if (JSON.stringify(av ?? null) === JSON.stringify(bv ?? null)) continue;
    out.push({ key, from: shortVal(av), to: shortVal(bv) });
  }
  return out;
}

function buildMergeReport(sources, merged) {
  const byKiller = new Map();
  const byBuild = new Map();
  for (const src of sources) {
    for (const k of src.data.killers || []) {
      if (!k || !k.id) continue;
      const id = String(k.id);
      if (!byKiller.has(id)) byKiller.set(id, { sources: [], items: [] });
      const e = byKiller.get(id);
      e.sources.push(src.label);
      e.items.push({ label: src.label, item: k });
    }
    for (const b of src.data.builds || []) {
      if (!b || !b.id) continue;
      const id = String(b.id);
      if (!byBuild.has(id)) byBuild.set(id, { sources: [], items: [] });
      const e = byBuild.get(id);
      e.sources.push(src.label);
      e.items.push({ label: src.label, item: b });
    }
  }
  const killersAdded = [];
  const killersModified = [];
  for (const [id, info] of byKiller) {
    const name = (info.items[0] && info.items[0].item.name) || id;
    const uniqSrc = [...new Set(info.sources)];
    if (info.items.length === 1) {
      killersAdded.push({ id, name, from: uniqSrc[0] });
    } else {
      // pairwise diffs against first source as baseline, also list all sources
      const base = info.items[0].item;
      const allDiffs = [];
      for (let i = 1; i < info.items.length; i++) {
        const d = fieldDiffs(base, info.items[i].item, KILLER_DIFF_KEYS);
        for (const x of d) {
          allDiffs.push({
            key: x.key,
            from: x.from,
            to: x.to,
            fromSrc: info.items[0].label,
            toSrc: info.items[i].label
          });
        }
      }
      // unique by key keeping last
      const map = new Map();
      for (const d of allDiffs) map.set(d.key, d);
      const diffs = [...map.values()];
      if (diffs.length) {
        killersModified.push({ id, name, from: uniqSrc.join(" + "), diffs });
      }
    }
  }
  const buildsAdded = [];
  const buildsModified = [];
  for (const [id, info] of byBuild) {
    const name = (info.items[0] && info.items[0].item.name) || id;
    const uniqSrc = [...new Set(info.sources)];
    if (info.items.length === 1) {
      buildsAdded.push({ id, name, from: uniqSrc[0] });
    } else {
      const base = info.items[0].item;
      const map = new Map();
      for (let i = 1; i < info.items.length; i++) {
        for (const x of fieldDiffs(base, info.items[i].item, BUILD_DIFF_KEYS)) {
          map.set(x.key, {
            key: x.key, from: x.from, to: x.to,
            fromSrc: info.items[0].label, toSrc: info.items[i].label
          });
        }
      }
      const diffs = [...map.values()];
      if (diffs.length) buildsModified.push({ id, name, from: uniqSrc.join(" + "), diffs });
    }
  }
  const allTagNames = new Map();
  sources.forEach(s => {
    (s.data.killerTags || []).forEach(t => {
      const k = String(t.name).toLowerCase();
      if (!allTagNames.has(k)) allTagNames.set(k, { name: t.name, src: [] });
      allTagNames.get(k).src.push(s.label);
    });
  });
  const tagsNew = [...allTagNames.values()].filter(t => t.src.length === 1);
  const buildTagMaps = new Map();
  sources.forEach(s => {
    (s.data.buildTags || []).forEach(t => {
      const k = String(t.name).toLowerCase();
      if (!buildTagMaps.has(k)) buildTagMaps.set(k, { name: t.name, src: [] });
      buildTagMaps.get(k).src.push(s.label);
    });
  });
  const buildTagsNew = [...buildTagMaps.values()].filter(t => t.src.length === 1);
  const perkMaps = new Map();
  sources.forEach(s => {
    (s.data.perks || []).forEach(p => {
      const name = typeof p === "string" ? p : p.name;
      if (!name) return;
      const k = String(name).toLowerCase();
      if (!perkMaps.has(k)) perkMaps.set(k, { name, src: [] });
      perkMaps.get(k).src.push(s.label);
    });
  });
  const perksNew = [...perkMaps.values()].filter(t => t.src.length === 1);

  return {
    killersAdded, killersModified,
    buildsAdded, buildsModified,
    tagsNew, buildTagsNew, perksNew,
    sources: sources.map(s => s.label),
    totals: {
      killers: (merged && merged.killers || []).length,
      builds: (merged && merged.builds || []).length
    }
  };
}

function renderMergeReportHTML(r) {
  if (!r) return "<p>No report</p>";
  const li = (cls, html) => `<li class="${cls}">${html}</li>`;
  let html = `<div class="merge-summary">Sources: <strong>${(r.sources || []).map(escapeHtml).join(" · ")}</strong></div>`;

  html += `<h4>Killers added <span class="merge-count">${r.killersAdded.length}</span></h4>`;
  if (!r.killersAdded.length) html += `<p class="ch-same">None</p>`;
  else html += "<ul>" + r.killersAdded.map(x =>
    li("ch-add", `<strong>${escapeHtml(x.name)}</strong> <code>${escapeHtml(x.id)}</code> <span class="ch-src">from ${escapeHtml(x.from)}</span>`)
  ).join("") + "</ul>";

  html += `<h4>Killers changed <span class="merge-count">${r.killersModified.length}</span></h4>`;
  if (!r.killersModified.length) html += `<p class="ch-same">None</p>`;
  else html += "<ul>" + r.killersModified.map(x => {
    const diffs = (x.diffs || []).map(d =>
      `<div class="merge-diff-row"><code>${escapeHtml(d.key)}</code>
        <span class="diff-from" title="${escapeAttr(d.fromSrc || "")}">${escapeHtml(d.from)}</span>
        <span class="diff-arrow">→</span>
        <span class="diff-to" title="${escapeAttr(d.toSrc || "")}">${escapeHtml(d.to)}</span></div>`
    ).join("");
    return li("ch-mod", `<strong>${escapeHtml(x.name)}</strong> <span class="ch-src">${escapeHtml(x.from)}</span>${diffs ? `<div class="merge-diff-list">${diffs}</div>` : ""}`);
  }).join("") + "</ul>";

  html += `<h4>Builds added <span class="merge-count">${r.buildsAdded.length}</span></h4>`;
  if (!r.buildsAdded.length) html += `<p class="ch-same">None</p>`;
  else html += "<ul>" + r.buildsAdded.map(x =>
    li("ch-add", `<strong>${escapeHtml(x.name)}</strong> <code>${escapeHtml(x.id)}</code> <span class="ch-src">from ${escapeHtml(x.from)}</span>`)
  ).join("") + "</ul>";

  html += `<h4>Builds changed <span class="merge-count">${r.buildsModified.length}</span></h4>`;
  if (!r.buildsModified.length) html += `<p class="ch-same">None</p>`;
  else html += "<ul>" + r.buildsModified.map(x => {
    const diffs = (x.diffs || []).map(d =>
      `<div class="merge-diff-row"><code>${escapeHtml(d.key)}</code>
        <span class="diff-from">${escapeHtml(d.from)}</span>
        <span class="diff-arrow">→</span>
        <span class="diff-to">${escapeHtml(d.to)}</span></div>`
    ).join("");
    return li("ch-mod", `<strong>${escapeHtml(x.name)}</strong> <span class="ch-src">${escapeHtml(x.from)}</span>${diffs ? `<div class="merge-diff-list">${diffs}</div>` : ""}`);
  }).join("") + "</ul>";

  html += `<h4>Tags / perks only in one source</h4>`;
  html += `<ul class="merge-side">`;
  html += `<li><strong>Killer tags:</strong> ${r.tagsNew.length ? r.tagsNew.map(x => escapeHtml(x.name) + " <span class='ch-src'>(" + escapeHtml(x.src.join(", ")) + ")</span>").join(", ") : "—"}</li>`;
  html += `<li><strong>Build tags:</strong> ${r.buildTagsNew.length ? r.buildTagsNew.map(x => escapeHtml(x.name) + " <span class='ch-src'>(" + escapeHtml(x.src.join(", ")) + ")</span>").join(", ") : "—"}</li>`;
  html += `<li><strong>Perks:</strong> ${r.perksNew.length ? r.perksNew.map(x => escapeHtml(x.name) + " <span class='ch-src'>(" + escapeHtml(x.src.join(", ")) + ")</span>").join(", ") : "—"}</li>`;
  html += `</ul>`;
  return html;
}

function toggleMergeChanges() {
  const box = document.getElementById("merge-changes");
  const btn = document.getElementById("btn-merge-changes");
  if (!box || !_lastMergeReport) { showToast("Run Merge first"); return; }
  if (box.hidden) {
    box.innerHTML = renderMergeReportHTML(_lastMergeReport);
    box.hidden = false;
    if (btn) btn.textContent = "Hide changes";
  } else {
    box.hidden = true;
    if (btn) btn.textContent = "Show changes";
  }
}

async function runDataMerge() {
  const fa = document.getElementById("merge-file-a") && document.getElementById("merge-file-a").files[0];
  const fb = document.getElementById("merge-file-b") && document.getElementById("merge-file-b").files[0];
  const includeLive = document.getElementById("merge-include-live") && document.getElementById("merge-include-live").checked;
  const out = document.getElementById("merge-result");
  const btnApply = document.getElementById("btn-apply-merge");
  const btnCopy = document.getElementById("btn-copy-merge");
  const btnCh = document.getElementById("btn-merge-changes");
  const chBox = document.getElementById("merge-changes");
  if (btnApply) btnApply.disabled = true;
  if (btnCopy) btnCopy.disabled = true;
  const btnDl0 = document.getElementById("btn-merge-download");
  if (btnDl0) btnDl0.disabled = true;
  if (btnCh) { btnCh.disabled = true; btnCh.textContent = "Show changes"; }
  if (chBox) { chBox.hidden = true; chBox.innerHTML = ""; }
  _lastMergedData = null;
  _lastMergeReport = null;
  try {
    if (!fa && !fb) {
      setMergeStatus("Select at least one file (A and/or B). With one file, enable “Also merge current page data” to combine with the live page.");
      return;
    }
    if ((fa && !fb && !includeLive) || (fb && !fa && !includeLive)) {
      // single file without live is fine — just normalizes/outputs that file
    }
    setMergeStatus("Reading…");
    let merged = { killers: [], builds: [], killerTags: [], buildTags: [], perks: [] };
    const notes = [];
    const sources = [];
    if (fa) {
      const da = normalizeDataShape(parseDataFileText(await readFileAsText(fa), "File A"));
      merged = mergeDataSets(merged, da);
      sources.push({ label: "A:" + fa.name, data: da });
      notes.push("A <code>" + escapeHtml(fa.name) + "</code>: " + da.killers.length + " killers, " + da.builds.length + " builds");
    }
    if (fb) {
      const db = normalizeDataShape(parseDataFileText(await readFileAsText(fb), "File B"));
      merged = mergeDataSets(merged, db);
      sources.push({ label: "B:" + fb.name, data: db });
      notes.push("B <code>" + escapeHtml(fb.name) + "</code>: " + db.killers.length + " killers, " + db.builds.length + " builds");
    }
    if (includeLive && typeof state !== "undefined" && state) {
      const live = normalizeDataShape({
        killers: state.killers,
        builds: state.builds,
        killerTags: state.killerTags || state.tags,
        buildTags: state.buildTags,
        perks: state.perks
      });
      merged = mergeDataSets(merged, live);
      sources.push({ label: "Live", data: live });
      notes.push("Live page: " + live.killers.length + " killers, " + live.builds.length + " builds");
    }
    _lastMergedData = merged;
    _lastMergeReport = buildMergeReport(sources, merged);
    if (out) out.value = "const INITIAL_DATA = " + JSON.stringify(merged, null, 2) + ";\n";
    if (btnApply) btnApply.disabled = false;
    if (btnCopy) btnCopy.disabled = false;
    if (btnCh) btnCh.disabled = false;
    const btnDl = document.getElementById("btn-merge-download");
    if (btnDl) btnDl.disabled = false;
    const r = _lastMergeReport;
    setMergeStatus(
      notes.join("<br>") +
      "<br><strong>Result:</strong> " + merged.killers.length + " killers, " +
      merged.builds.length + " builds, " + merged.killerTags.length + " killer tags, " +
      merged.buildTags.length + " build tags, " + merged.perks.length + " perks." +
      "<br><span class=\"ch-add\">+" + r.killersAdded.length + " killers</span>, " +
      "<span class=\"ch-mod\">~" + r.killersModified.length + " killers changed</span>, " +
      "<span class=\"ch-add\">+" + r.buildsAdded.length + " builds</span> — click <strong>Show changes</strong> for details."
    );
    showToast("Merge done");
  } catch (err) {
    console.error(err);
    setMergeStatus("Error: " + escapeHtml(err.message || String(err)));
    showToast("Merge failed");
  }
}

function applyMergedToLive() {
  if (!_lastMergedData) { showToast("Run Merge first"); return; }
  showConfirm("Replace current page data with merge result? (LocalStorage will update)", () => {
    state.killers = _lastMergedData.killers;
    state.builds = _lastMergedData.builds;
    state.killerTags = _lastMergedData.killerTags;
    state.buildTags = _lastMergedData.buildTags;
    state.tags = _lastMergedData.killerTags;
    state.perks = _lastMergedData.perks;
    saveData();
    renderAll();
    renderEditor();
    showToast("Applied merge to page");
    setMergeStatus((document.getElementById("merge-status").innerHTML || "") + "<br>Applied to LocalStorage. Still paste into data/data.js for permanent file.");
  });
}

function copyMergedDataJs() {
  const ta = document.getElementById("merge-result");
  if (!ta || !ta.value) { showToast("Nothing to copy"); return; }
  navigator.clipboard.writeText(ta.value).then(() => showToast("Copied data.js")).catch(() => {
    ta.select();
    showToast("Select all → Ctrl+C");
  });
}

async function mergeAndDownload() {
  await runDataMerge();
  if (!_lastMergedData) return;
  const text = (document.getElementById("merge-result") && document.getElementById("merge-result").value)
    || ("const INITIAL_DATA = " + JSON.stringify(_lastMergedData, null, 2) + ";\n");
  const blob = new Blob([text], { type: "application/javascript;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "data.js";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  showToast("Merged + downloaded data.js");
}


function buildDataJsText() {
  return `// ============================================
// DBD KILLER HUB - START DATA
// Generated: ${new Date().toLocaleString("pl-PL")}
// Paste this entire file as data/data.js
// ============================================

const INITIAL_DATA = ${JSON.stringify(state, null, 2)};
`;
}

function generateConfigCode() {
  saveData();
  const ta = document.getElementById("generated-code");
  if (!ta) { showToast("Open Data Editor tab first"); return; }
  ta.value = buildDataJsText();
  ta.scrollIntoView({ behavior: "smooth", block: "center" });
  showToast("Code generated — Copy or Download");
}

function copyGeneratedCode() {
  const ta = document.getElementById("generated-code");
  if (!ta) return;
  if (!ta.value) generateConfigCode();
  navigator.clipboard.writeText(ta.value).then(() => showToast("Copied!")).catch(() => {
    ta.select();
    showToast("Select all → Ctrl+C");
  });
}

function downloadGeneratedDataJs() {
  // Always regenerate from current state first, then download
  if (typeof generateConfigCode === "function") generateConfigCode();
  else saveData();
  const text = (document.getElementById("generated-code") && document.getElementById("generated-code").value)
    || buildDataJsText();
  const blob = new Blob([text], { type: "application/javascript;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "data.js";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  showToast("Generated + downloaded data.js");
}

function exportJSON() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `dbd-killer-hub-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
}

function importJSON(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const raw = String(e.target.result || "");
      let data;
      if (typeof parseDataFileText === "function") {
        data = parseDataFileText(raw, file.name);
      } else {
        data = JSON.parse(raw);
      }
      data = data.INITIAL_DATA || data;
      state = {
        killers: data.killers || [],
        builds: data.builds || [],
        tags: data.killerTags || data.tags || [],
        killerTags: data.killerTags || data.tags || [],
        buildTags: data.buildTags || [],
        perks: data.perks || [],
        addons: data.addons || []
      };
      state.builds.forEach(b => {
        if (b.killerId && !b.killerIds) { b.killerIds = [b.killerId]; delete b.killerId; }
        if (!b.killerIds) b.killerIds = [];
      });
      saveData();
      renderAll();
      if (document.getElementById("tab-editor")?.classList.contains("active")) renderEditor();
      showToast("Imported " + file.name);
    } catch (err) {
      console.error(err);
      showToast("Import failed");
      setMergeStatus && setMergeStatus("Import error: " + (err.message || err));
      alert("Import error: " + err.message);
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}




// ============================================================
// OTZ ADDONS — all logic here; data/otz-addons.js is pure data
// Match rule: OTZ_ADDONS[killer.id]  (same id you paste as key)
// Fallback: normalized display name
// ============================================================

function getOtzStore() {
  try {
    if (typeof window !== "undefined" && window.OTZ_ADDONS && Object.keys(window.OTZ_ADDONS).length)
      return window.OTZ_ADDONS;
  } catch (_) {}
  try {
    if (typeof OTZ_ADDONS !== "undefined" && OTZ_ADDONS && Object.keys(OTZ_ADDONS).length)
      return OTZ_ADDONS;
  } catch (_) {}
  return null;
}

function ensureOtzOnWindow() {
  try {
    if (typeof OTZ_ADDONS !== "undefined" && OTZ_ADDONS)
      window.OTZ_ADDONS = OTZ_ADDONS;
  } catch (_) {}
}

/** Normalize "The Good Guy" → "goodguy" (only used as fallback). */
function normalizeKillerKey(name) {
  if (!name) return "";
  return String(name)
    .replace(/^The\s+/i, "")
    .toLowerCase()
    .replace(/judgment/g, "judgement")
    .replace(/[^a-z0-9]+/g, "");
}

/**
 * Resolve Otz entry for a killer object or name string.
 * Priority: killer.id → normalized name → displayName parts on Otz entries.
 */
function resolveOtzKey(killerOrName) {
  const store = getOtzStore();
  if (!store) return null;

  let id = "";
  let name = "";
  if (killerOrName && typeof killerOrName === "object") {
    id = String(killerOrName.id || "").toLowerCase().trim();
    name = String(killerOrName.name || "");
  } else {
    name = String(killerOrName || "");
    id = normalizeKillerKey(name);
  }

  // 1) Exact id (this is the intended path — paste Otz block under this key)
  if (id && store[id]) return id;

  // 2) Normalized name as key
  const n = normalizeKillerKey(name);
  if (n && store[n]) return n;

  // 3) id with spaces stripped vs keys with spaces (pyramid head, skull merchant)
  if (id) {
    const compact = id.replace(/\s+/g, "");
    for (const key of Object.keys(store)) {
      if (key.replace(/\s+/g, "") === compact) return key;
    }
  }

  // 4) Match Otz displayName aliases ("Chucky,Good Guy")
  const want = n || id;
  if (want) {
    for (const key of Object.keys(store)) {
      const dn = store[key] && store[key].displayName;
      if (!dn) continue;
      for (const part of String(dn).split(/[,\/|]/)) {
        if (normalizeKillerKey(part) === want) return key;
      }
    }
  }
  return null;
}


function decodeHtmlEntities(str) {
  if (str == null || str === "") return "";
  let s = String(str);
  if (!/[&][#a-zA-Z0-9]+;/.test(s)) return s;
  s = s.replace(/&#34;|&quot;/gi, '"')
       .replace(/&#39;|&apos;/gi, "'")
       .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
       .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
       .replace(/&lt;/gi, "<")
       .replace(/&gt;/gi, ">")
       .replace(/&amp;/gi, "&");
  return s;
}

function getOtzAddonsForKiller(killerOrName) {
  const store = getOtzStore();
  if (!store) return [];
  const key = resolveOtzKey(killerOrName);
  if (!key || !store[key]) return [];
  return (store[key].addons || []).map(a => ({
    ...a,
    name: decodeHtmlEntities(a.name),
    comment: decodeHtmlEntities(a.comment || "")
  }));
}

// Back-compat aliases used elsewhere in app
function getOtzKeyFromKillerName(name) {
  return resolveOtzKey(name);
}

function setOtzStatus(msg) {
  const el = document.getElementById("otz-update-status");
  if (el) el.innerHTML = msg || "";
}

function parseSingleOtzKiller(html, otzId) {
  const id = String(otzId).trim().toLowerCase();
  if (!id) return null;
  const tierMap = { strongest: "S", good: "A", decent: "B", "almost-no-effect": "C", detrimental: "D" };
  const parts = html.split(/<div class="killerGroup">/).slice(1);
  for (const part of parts) {
    const km = part.match(/<img src="\.\/public\/killers\/([^"]+)"[^>]*alt="([^"]*)"/);
    if (!km) continue;
    const key = km[1].replace(/\.png$/i, "").toLowerCase();
    if (key !== id && key.replace(/\s+/g, "") !== id.replace(/\s+/g, "")) continue;
    const alt = (km[2] || key).trim();
    const addons = [];
    const re = /<div class="addon-back\s+([^"]+)">\s*<div class="addon"\s+data-comment="([^"]*)"[\s\S]*?<img[^>]+src="(\.\/public\/addons\/[^"]+)"/g;
    let m;
    while ((m = re.exec(part)) !== null) {
      const tierClass = m[1].trim();
      let commentRaw = m[2]
        .replace(/&#47;/g, "/").replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
        .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
      const nameM = commentRaw.match(/<b[^>]*>\s*([^<]+?)\s*<\/b>/i);
      let name = nameM ? nameM[1].trim() : m[3].split("/").pop().replace(/\.png$/i, "");
      let text = commentRaw
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/?(ul|li|p|i|span|a|b)[^>]*>/gi, (tag) => (tag.startsWith("</") || /li/i.test(tag) ? "\n" : ""))
        .replace(/<[^>]+>/g, "");
      text = text.replace(/\n{3,}/g, "\n\n").trim();
      text = text.replace(new RegExp("^" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*:?\\s*", "i"), "").trim();
      addons.push({
        name,
        tier: tierMap[tierClass] || tierClass,
        img: "https://otz-addon-tierlist.pages.dev/" + m[3].replace(/^\.\//, ""),
        tierClass,
        comment: text.slice(0, 1200)
      });
    }
    if (addons.length) return { otzKey: key, displayName: alt, addons };
  }
  return null;
}

function formatOtzSnippet(entryKey, data) {
  const inner = JSON.stringify({ displayName: data.displayName, addons: data.addons }, null, 2);
  const indented = inner.split("\n").map((line, i) => (i === 0 ? line : "  " + line)).join("\n");
  return `  "${entryKey}": ${indented}`;
}

/**
 * Fetch Otz page → build paste snippets.
 * entry key = "My killer id" field if set, else Otz folder id.
 * Rule: key in OTZ_ADDONS must equal killer.id on the site.
 */
async function fetchOtzKillerSnippet() {
  const idRaw = document.getElementById("otz-fetch-id")?.value || "";
  const myId = (document.getElementById("otz-fetch-mapname")?.value || "").trim().toLowerCase();
  const ids = idRaw.split(/[,;]+/).map(s => s.trim().toLowerCase()).filter(Boolean);
  const out = document.getElementById("otz-snippet-out");
  if (!ids.length) {
    setOtzStatus("Wpisz Otz ID (folder png), np. <code>chucky</code>.");
    showToast("Podaj Otz ID");
    return;
  }
  setOtzStatus("Pobieranie Otza…");
  try {
    const res = await fetch("https://otz-addon-tierlist.pages.dev/", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const html = await res.text();
    const blocks = [];
    const notes = [];
    for (const id of ids) {
      const data = parseSingleOtzKiller(html, id);
      if (!data) {
        notes.push(`❌ <code>${id}</code> nie znaleziony`);
        continue;
      }
      // One Otz id + one my id: use my id as key. Multiple Otz ids: each keeps its Otz key.
      const entryKey = (myId && ids.length === 1) ? myId : id;
      blocks.push(formatOtzSnippet(entryKey, data));
      notes.push(`✅ Otz <code>${id}</code> → klucz pliku <code>"${entryKey}"</code> (${data.addons.length} addonów)`);
      // merge into live store for this session
      try {
        const store = getOtzStore() || (window.OTZ_ADDONS = {});
        store[entryKey] = { displayName: data.displayName, addons: data.addons };
        if (typeof OTZ_ADDONS !== "undefined") OTZ_ADDONS[entryKey] = store[entryKey];
      } catch (_) {}
    }
    if (!blocks.length) {
      setOtzStatus(notes.join("<br>"));
      if (out) out.value = "";
      return;
    }
    if (out) out.value = blocks.join(",\n") + ",";
    setOtzStatus(
      notes.join("<br>") +
      "<br><strong>Wklej</strong> do <code>data/otz-addons.js</code> w <code>var OTZ_ADDONS = { … }</code>. " +
      "Klucz <strong>musi być równy</strong> <code>killer.id</code> na stronie — wtedy wszystko łączy się samo."
    );
    showToast("Snippet gotowy");
  } catch (err) {
    console.error(err);
    setOtzStatus(
      "Fetch failed: <code>" + err.message + "</code>. " +
      "Open the site via a local server (<code>npx serve</code>), not <code>file://</code>."
    );
    showToast("Fetch failed");
  }
}

function copyOtzSnippet() {
  const ta = document.getElementById("otz-snippet-out");
  if (!ta || !ta.value.trim()) { showToast("Brak snippeta"); return; }
  navigator.clipboard.writeText(ta.value).then(() => showToast("Skopiowano")).catch(() => { ta.select(); showToast("Ctrl+C"); });
}

function downloadCurrentOtzFile() {
  const store = getOtzStore();
  if (!store) { showToast("Brak OTZ_ADDONS"); return; }
  const fixed = [
    "// OTZ ADDONS — pure data (from live memory)",
    "var OTZ_ADDONS = " + JSON.stringify(store, null, 2) + ";",
    "",
    'if (typeof window !== "undefined") window.OTZ_ADDONS = OTZ_ADDONS;'
  ].join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([fixed], { type: "application/javascript" }));
  a.download = "otz-addons.js";
  a.click();
  showToast("Downloaded");
}


function resetAllData() {
  showConfirm("Reset to starter data from data.js? LocalStorage will be cleared.", () => {
    localStorage.removeItem(STORAGE_KEY);
    seedInitial();
    renderAll();
    renderEditor();
    showToast("Reset complete");
  });
}

function showModal(html, opts) {
  opts = opts || {};
  const mc = document.getElementById("modal-content");
  const ov = document.getElementById("modal-overlay");
  if (mc) {
    mc.innerHTML = html;
    mc.classList.toggle("modal-wide", !!opts.wide);
  }
  if (ov) ov.classList.add("show");
}
function closeModal(e) {
  if (e && e.target === document.getElementById("modal-overlay")) return;
  const ov = document.getElementById("modal-overlay");
  const mc = document.getElementById("modal-content");
  if (ov) ov.classList.remove("show");
  if (mc) { mc.innerHTML = ""; mc.classList.remove("modal-wide"); }
  window._editingKillerId = "";
  formContentSections = null;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function escapeAttr(str) {
  if (!str) return "";
  return String(str).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("click", () => { try { closeAllFilterPanels(); } catch (_) {} });


window.toggleShowAllTags = toggleShowAllTags;
window.toggleKillerTagsPanel = toggleKillerTagsPanel;
window.toggleBuildTagsPanel = toggleBuildTagsPanel;
window.resetBuildFilters = resetBuildFilters;
window.runDataMerge = runDataMerge;
window.mergeAndDownload = mergeAndDownload;
window.toggleMergeChanges = toggleMergeChanges;
window.applyMergedToLive = applyMergedToLive;
window.copyMergedDataJs = copyMergedDataJs;

window.addCustomContentSection = addCustomContentSection;
window.removeContentSection = removeContentSection;
window.restoreBuiltinSection = restoreBuiltinSection;
window.updateSectionTitle = updateSectionTitle;
window.updateSectionBody = updateSectionBody;
window.refreshKillerEditPreview = refreshKillerEditPreview;
window.refreshBuildEditPreview = refreshBuildEditPreview;
window.schedulePreviewRefresh = schedulePreviewRefresh;
window.moveContentSection = moveContentSection;

window.openDetailedKillerForm = openDetailedKillerForm;
window.getOtzAddonsForKiller = getOtzAddonsForKiller;
window.getOtzStore = getOtzStore;
window.resolveOtzKey = resolveOtzKey;
window.fetchOtzKillerSnippet = fetchOtzKillerSnippet;
window.copyOtzSnippet = copyOtzSnippet;
window.downloadCurrentOtzFile = downloadCurrentOtzFile;
window.fetchOtzKillerSnippet = fetchOtzKillerSnippet;
window.copyOtzSnippet = copyOtzSnippet;
window.updateOtzAddonsFromWeb = updateOtzAddonsFromWeb;
window.downloadCurrentOtzFile = downloadCurrentOtzFile;
window.openBuildModal = openBuildModal;
window.saveKiller = saveKiller;
