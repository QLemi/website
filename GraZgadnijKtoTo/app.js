(async () => {
  "use strict";

  const DEFAULT_API_URL = "https://script.google.com/macros/s/AKfycbzc3T5Ali7BTrNuybshDjYyA2Xb_bk5xpqZ-xKRzK6RfoIFESuXVwfWy0mUS8JU1EVEyQ/exec";
  const PLACEHOLDER_IMAGE = "https://deadbydaylight.wiki.gg/images/IconHelp_killers.png";
  const SESSION_KEY = "dbdGuessWhoSession";
  const CHARACTER_DATA = await SharedCatalog.characters();
  const ROSTER = CHARACTER_DATA.map(character => ({
    id: character.gameId || character.role + ':' + character.id,
    name: character.name,
    kind: character.role,
    image: SharedCatalog.assetUrl(character.image.url) || SharedCatalog.fallback(),
    gender: character.gender,
    license: character.license
  }));
  const $ = selector => document.querySelector(selector);
  const home = $("#home-view"),
    room = $("#room-view"),
    notice = $("#notice");
  let sessionStorageUnavailable = false;
  let session = readSession();
  let pendingRoomId = "";
  let pendingRoomMode = "mixed";
  let pendingRoomFilters = {
    gender: "all",
    license: "all"
  };
  let pendingQueueTicket = "";
  let pendingQueueName = "";
  let pendingQueueCharacter = "";
  let streamerMode = Boolean(session?.streamerMode);
  let privateWindow = null;
  let privateWindowWatch = null;
  let privateContext = null;
  let currentState = null;
  let pollTimer = null;
  let pollDelay = 0;
  let pollInFlight = false;
  let backgroundMutation = false;
  let localEliminated = null;
  let busy = false;
  let activeRequest = null;
  let activeAction = "";
  let activeActionLabel = "";
  let completedAction = null;
  let completedActionTimer = null;
  let wrongNoticeTimer = null;
  let renderedRoomStatus = "";
  function removeStoredSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      sessionStorageUnavailable = true;
    }
  }
  function updateSessionStorageNotice() {
    const element = document.getElementById('session-storage-note');
    if (!element) return;
    element.hidden = !sessionStorageUnavailable;
    element.textContent = 'Browser storage is unavailable. You can play in this tab, but reloading or closing it may prevent you from returning to the game.';
  }
  function setConnectionStatus(connected) {
    const element = document.getElementById('connection-status');
    if (!element) return;
    element.textContent = connected ? 'Połączono' : 'Brak połączenia';
    element.dataset.connected = String(connected);
  }
  function slug(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[ch]);
  }
  function readSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    } catch {
      sessionStorageUnavailable = true;
      return null;
    }
  }
  function saveSession(value) {
    session = value;
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(value));
    } catch {
      sessionStorageUnavailable = true;
    }
    updateSessionStorageNotice();
  }
  function clearSession() {
    closePrivateWindow();
    session = null;
    currentState = null;
    localEliminated = null;
    renderedRoomStatus = "";
    streamerMode = false;
    removeStoredSession();
    history.replaceState({}, "", location.pathname);
    stopPolling();
    syncStreamerControls();
    showHome();
  }
  function randomToken(length, alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789") {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return [...bytes].map(value => alphabet[value % alphabet.length]).join("");
  }
  function randomRoomId() {
    return randomToken(9, "ABCDEFGHJKLMNPQRSTUVWXYZ23456789").toUpperCase();
  }
  function setNotice(message, type = "error") {
    notice.textContent = message;
    notice.className = `notice${type === "success" ? " success" : ""}`;
    notice.hidden = false;
  }
  function clearNotice() {
    notice.hidden = true;
    notice.textContent = "";
  }
  function disconnectIfRoomUnavailable(error) {
    if (!session || !/room not found|room.*expired|invalid room|session is no longer available|place in the player list was not found/i.test(error?.message || "")) return false;
    clearSession();
    setNotice("This game is no longer available. You have been returned to the homepage.");
    return true;
  }
  function rosterFor(mode, gender = "all", license = "all") {
    return ROSTER.filter(character => (mode === "mixed" || character.kind === (mode === "killers" ? "killer" : "survivor")) && (gender === "all" || character.gender === gender) && (license === "all" || character.license === license));
  }
  function currentFilters(scope = document) {
    return {
      gender: scope.querySelector("[name='genderFilter']")?.value || "all",
      license: scope.querySelector("[name='licenseFilter']")?.value || "all"
    };
  }
  function updateDeckSizeOptions(mode, preferredSize, filters = currentFilters()) {
    updateDeckSizeSelect($("#deck-size"), mode, preferredSize, filters);
  }
  function updateDeckSizeSelect(select, mode, preferredSize, filters = {
    gender: "all",
    license: "all"
  }) {
    if (!select) return;
    const maxSize = rosterFor(mode, filters.gender, filters.license).length;
    if (!maxSize) {
      select.innerHTML = `<option value="">No characters match these filters</option>`;
      select.value = "";
      return;
    }
    const currentSize = Number(preferredSize ?? select.value) || 20;
    const minimum = Math.min(8, maxSize);
    const sizes = [...new Set([12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 72, 80, 88, 96, currentSize, maxSize].filter(size => size >= minimum && size <= maxSize))].sort((a, b) => a - b);
    select.innerHTML = sizes.map(size => `<option value="${size}">${size}${size === maxSize ? " · Full roster" : " cards"}</option>`).join("");
    select.value = String(sizes.includes(currentSize) ? currentSize : Math.max(minimum, Math.min(currentSize, maxSize)));
  }
  function fillCharacterSelect(select, mode, chosen = "", filters = {
    gender: "all",
    license: "all"
  }) {
    const list = rosterFor(mode, filters.gender, filters.license);
    select.innerHTML = `<option value="">Choose a character…</option>${list.map(c => `<option value="${esc(c.id)}" ${c.id === chosen ? "selected" : ""}>${esc(c.name)}</option>`).join("")}`;
  }
  function syncStreamerControls() {
    document.querySelectorAll(".streamer-toggle-input").forEach(toggle => {
      toggle.checked = streamerMode;
    });
    document.querySelectorAll(".streamer-toggle-input").forEach(toggle => {
      const select = document.getElementById(toggle.dataset.secretSelect);
      if (select) {
        select.disabled = streamerMode;
        select.hidden = streamerMode;
      }
    });
    document.querySelectorAll("[data-streamer-note]").forEach(note => {
      note.hidden = !streamerMode;
    });
  }
  function privatePopupShell(content) {
    if (!privateWindow || privateWindow.closed) return;
    privateWindow.document.open();
    privateWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Private Streamer Mode</title><style>
      *{box-sizing:border-box}body{margin:0;min-height:100vh;background:#111219;color:#f2f0ed;font:14px Inter,system-ui,sans-serif;padding:22px;background-image:radial-gradient(ellipse at 50% 0,#35232b,transparent 60%)}main{max-width:440px;margin:0 auto}.eyebrow{font-size:10px;letter-spacing:.16em;color:#e48d91;font-weight:800}h1{font-size:24px;margin:8px 0 6px}p{color:#aaabb4;line-height:1.5;margin:0 0 18px}label{display:block;font-size:12px;font-weight:700;margin:18px 0 7px}select,button{width:100%;font:inherit;color:#f7f3f1;border:1px solid #ffffff1c;border-radius:10px;background:#1d2029;padding:12px}button{margin-top:16px;border:0;background:linear-gradient(135deg,#e6525d,#ae3448);font-weight:800;cursor:pointer}.preview{display:flex;align-items:center;gap:14px;margin-top:16px;padding:12px;border:1px solid #ffffff14;border-radius:12px;background:#191b23;min-height:88px}.preview img{width:62px;height:62px;object-fit:cover;border-radius:9px;background:#282a32}.preview b{font-size:14px}.feedback{margin-top:12px;color:#a8dfba;font-size:12px}.secret-card{text-align:center;padding:18px;border:1px solid #ffffff16;border-radius:14px;background:#191b23}.secret-card img{width:min(100%,330px);aspect-ratio:1;object-fit:cover;border-radius:12px;display:block;margin:16px auto}.secret-card h2{font-size:23px;margin:0}.secret-card p{margin:6px 0 0;font-size:12px}.private-info{margin-top:14px;padding:16px;border:1px solid #ffffff16;border-radius:14px;background:#191b23}.private-info label{margin:0 0 7px;color:#e4a0a3}.private-info>b{font-size:18px}.private-info button{font-size:12px;padding:10px;margin:12px 0 18px}.private-info .question-label{margin-top:0}.private-info p{margin:0 0 14px;padding:11px;border-radius:9px;background:#11131a}.check-row{display:flex;gap:9px;align-items:center;margin:0;color:#eee;font-weight:600}.check-row input{accent-color:#e45d68;width:16px;height:16px}
      .picker-stage{margin-top:16px;padding:14px;border:1px solid #ffffff18;border-radius:16px;background:linear-gradient(145deg,#1a1a1c,#111);box-shadow:0 16px 35px #0005}.picker-preview{display:grid;grid-template-columns:128px 1fr;align-items:center;gap:16px;min-height:128px}.picker-art{position:relative;display:grid;place-items:center;width:128px;aspect-ratio:1;border:1px solid #c41e3a77;border-radius:14px;overflow:hidden;background:radial-gradient(circle at 45% 35%,#451b25,#111 72%);box-shadow:0 8px 24px #0006}.picker-art img{width:100%;height:100%;object-fit:cover}.picker-art .preview-question{font-size:52px;font-weight:800;color:#ec7b85;text-shadow:0 0 22px #dd405666}.picker-copy small{display:block;margin-bottom:7px;color:#e36b78;font-size:9px;font-weight:800;letter-spacing:.16em}.picker-copy b{display:block;font-size:18px;line-height:1.2}.picker-copy p{margin:7px 0 0;font-size:12px}.picker-save{min-height:48px;margin-top:14px;background:linear-gradient(135deg,#c41e3a,#8b0000);box-shadow:0 8px 23px #9e123b40}.picker-save.saved{background:linear-gradient(135deg,#246d43,#17452b);box-shadow:0 8px 23px #2ecc7125}.picker-save:disabled{opacity:.45;cursor:not-allowed}.check-row{align-items:flex-start;line-height:1.4}.question-privacy{margin-top:12px;padding-top:12px;border-top:1px solid #ffffff14}.private-info .question-preview{margin:8px 0 6px;color:#ddd;background:#101010;font-size:12px}.private-info .actual-question-note{display:block;color:#d3b279;font-size:10px;font-weight:500}.keep-window-open{margin:0 0 14px;padding:10px 12px;border:1px solid #c41e3a66;border-radius:9px;background:#c41e3a17;color:#f1b0b6;font-size:12px;font-weight:750;text-align:center}.secret-card{background:#111;border-color:#ffffff19}.secret-card img{border:1px solid #ffffff20}.private-info{background:#111;border-color:#ffffff19}.private-info label{color:#e56c79}.private-info button{background:linear-gradient(135deg,#c41e3a,#8b0000)}.private-info p{background:#0b0b0d}.private-queue{margin-top:15px;padding-top:13px;border-top:1px solid #ffffff14}.private-queue>label{display:flex;justify-content:space-between;margin:0 0 8px;color:#e56c79}.private-queue>label span{color:#f2f0ed}.private-queue ul{list-style:none;padding:0;margin:0;display:grid;gap:6px}.private-queue li{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 10px;border:1px solid #ffffff12;border-radius:9px;background:#171920}.private-queue li b{font-size:12px}.private-queue li small{color:#a8abb4;font-size:10px;text-align:right}
    </style></head><body>${content}</body></html>`);
    privateWindow.document.close();
  }
  function renderPrivatePicker() {
    if (!privateContext || !privateContext.selectId || !privateWindow || privateWindow.closed) return;
    privateContext.screen = "picker";
    const mainSelect = document.getElementById(privateContext.selectId);
    const selected = privateContext.pendingChoice ?? mainSelect?.value ?? "";
    const filters = privateContext.filters || {
      gender: "all",
      license: "all"
    };
    const characters = rosterFor(privateContext.mode, filters.gender, filters.license);
    privatePopupShell(`<main><span class="eyebrow">PRIVATE WINDOW · NOT SHOWN ON STREAM</span><h1>Choose your character</h1><label for="private-character">Your secret character</label><select id="private-character"><option value="">Choose a character…</option>${characters.map(c => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("")}</select><section class="picker-stage"><div class="picker-preview"><div class="picker-art"><span class="preview-question" id="private-empty">?</span><img id="private-portrait" alt="" hidden></div><div class="picker-copy"><small id="private-preview-label">CHARACTER PREVIEW</small><b id="private-name">No character selected</b><p id="private-hint">Your selection will be kept private from the stream.</p></div></div></section><button class="picker-save" id="private-save" type="button" disabled>Save selection privately</button><div class="feedback" id="private-feedback" aria-live="polite"></div></main>`);
    const popupSelect = privateWindow.document.getElementById("private-character");
    popupSelect.value = selected;
    const updatePreview = () => {
      const character = characterById(popupSelect.value);
      const portrait = privateWindow.document.getElementById("private-portrait");
      const name = privateWindow.document.getElementById("private-name");
      const empty = privateWindow.document.getElementById("private-empty");
      const label = privateWindow.document.getElementById("private-preview-label");
      const hint = privateWindow.document.getElementById("private-hint");
      const saveButton = privateWindow.document.getElementById("private-save");
      name.textContent = character?.name || "No character selected";
      portrait.hidden = !character;
      empty.hidden = Boolean(character);
      label.textContent = character ? "READY TO SAVE PRIVATELY" : "CHARACTER PREVIEW";
      hint.textContent = character ? `Selected for ${privateContext.mode === "killers" ? "Killers" : privateContext.mode === "survivors" ? "Survivors" : "Mixed"} pool` : "Your selection will be kept private from the stream.";
      saveButton.disabled = !character;
      const alreadySaved = Boolean(character && privateContext.savedChoice === character.id);
      saveButton.classList.toggle("saved", alreadySaved);
      saveButton.textContent = alreadySaved ? `✓ ${character.name} saved privately` : character ? `Save ${character.name} privately` : "Save selection privately";
      if (character) setPortraitSource(portrait, character.image);
    };
    popupSelect.addEventListener("change", () => {
      privateContext.pendingChoice = popupSelect.value;
      privateContext.savedChoice = "";
      updatePreview();
    });
    updatePreview();
    privateWindow.document.getElementById("private-save").addEventListener("click", () => {
      if (!popupSelect.value || !mainSelect) return;
      mainSelect.value = popupSelect.value;
      privateContext.pendingChoice = popupSelect.value;
      privateContext.savedChoice = popupSelect.value;
      updatePreview();
      mainSelect.dispatchEvent(new Event("change", {
        bubbles: true
      }));
      const note = mainSelect.parentElement.querySelector("[data-streamer-note]");
      if (note) note.textContent = session && currentState?.status === "rematch" ? "Secret saved. Click the ready button in the main window to send it." : "Secret saved. It will be sent when you create or join the room.";
      privateWindow.document.getElementById("private-feedback").textContent = `✓ ${characterById(popupSelect.value)?.name || "Character"} saved privately. Continue in the main window.`;
    });
  }
  function renderPrivateCharacter() {
    if (!session || !privateWindow || privateWindow.closed) return;
    const character = characterById(session.character);
    const opponentSeat = session.seat === "host" ? "guest" : "host";
    const opponentName = currentState ? seatName(opponentSeat) : "Opponent";
    const question = currentState?.status === "playing" ? currentState.question : "";
    const questionBy = currentState?.questionBy || "";
    const questionText = question ? `${questionBy === session.seat ? "You asked" : `${opponentName} asked`}: ${question}${currentState.answer ? ` · Answer: ${currentState.answer}` : " · Waiting for an answer"}` : "No question yet.";
    const showQuestionText = Boolean(session.streamerShowQuestionText);
    const queuePlayers = session.seat === "host" && currentState?.joinMode === "list" ? [...(currentState.queuePlayers || [])].sort((a, b) => Number(a.clickedAt) - Number(b.clickedAt)) : [];
    const queueMarkup = queuePlayers.length ? `<div class="private-queue"><label>Players in the lobby <span>${queuePlayers.length}</span></label><ul>${queuePlayers.map(player => `<li><b>${esc(player.name || "Someone is setting up")}</b><small>${player.ready ? "Ready" : "Choosing a character"}</small></li>`).join("")}</ul></div>` : "";
    const signature = JSON.stringify([session.character, opponentName, question, questionBy, currentState?.answer, currentState?.status, queuePlayers.map(player => [player.ticket, player.name, player.ready]), showQuestionText, session.streamerRevealName]);
    if (privateContext?.screen === "game" && privateContext.signature === signature) return;
    const alreadyRendered = privateContext?.screen === "game" && privateWindow.document.getElementById("private-game");
    if (alreadyRendered) {
      privateWindow.document.getElementById("private-opponent").textContent = opponentName || "Opponent";
      privateWindow.document.getElementById("reveal-name").textContent = session.streamerRevealName ? "Hide name on main page" : "Reveal name on main page";
      privateWindow.document.getElementById("private-question").textContent = questionText;
      privateWindow.document.getElementById("private-queue").innerHTML = queueMarkup;
      privateWindow.document.getElementById("reveal-question-text").checked = showQuestionText;
    } else {
      privatePopupShell(`<main id="private-game"><div class="keep-window-open">Keep this window open while playing.</div><span class="eyebrow">PRIVATE WINDOW · NOT SHOWN ON STREAM</span><section class="secret-card">${character ? `${portraitMarkup(character.image, character.name, "")}<h2>${esc(character.name)}</h2>` : "<h2>Character unavailable</h2>"}<p>Your secret character</p></section><section class="private-info"><label>Opponent</label><b id="private-opponent">${esc(opponentName || "Opponent")}</b><button id="reveal-name" type="button">${session.streamerRevealName ? "Hide name on main page" : "Reveal name on main page"}</button><label class="question-label">Latest question</label><p class="question-preview" id="private-question">${esc(questionText)}</p><div class="question-privacy"><label class="check-row"><input id="reveal-question-text" type="checkbox" ${showQuestionText ? "checked" : ""}> Show the exact question on the main page</label><small class="actual-question-note">When off, the main page shows a safe placeholder.</small></div><div id="private-queue">${queueMarkup}</div></section></main>`);
      privateWindow.document.getElementById("reveal-name").addEventListener("click", () => {
        session.streamerRevealName = !session.streamerRevealName;
        saveSession(session);
        renderRoom();
      });
      privateWindow.document.getElementById("reveal-question-text").addEventListener("change", event => {
        session.streamerShowQuestionText = Boolean(event.target.checked);
        saveSession(session);
        renderRoom();
      });
    }
    if (privateContext) {
      privateContext.screen = "game";
      privateContext.signature = signature;
    }
  }
  function syncPrivateWindow() {
    if (!streamerMode || !session || !privateWindow || privateWindow.closed) return;
    if (currentState?.status === "rematch") {
      const selectId = session.seat === "host" ? "rematch-host-character" : "rematch-guest-character";
      if (document.getElementById(selectId)) {
        const pickerMode = session.seat === "host" && !currentState.hostReady ? session.rematchDraft?.mode || currentState.mode : currentState.mode;
        const select = document.getElementById(selectId);
        const pickerFilters = session.seat === "host" && !currentState.hostReady ? session.rematchDraft || currentState : currentState;
        const filters = {
          gender: pickerFilters.genderFilter || "all",
          license: pickerFilters.licenseFilter || "all"
        };
        if (privateContext?.screen !== "picker" || privateContext.selectId !== selectId || privateContext.mode !== pickerMode) privateContext = {
          screen: "picker",
          selectId,
          mode: pickerMode,
          filters,
          pendingChoice: select.value || ""
        };else privateContext.filters = filters;
        const signature = JSON.stringify([selectId, pickerMode, filters, select.value, privateContext.pendingChoice, privateContext.savedChoice]);
        if (privateContext.signature !== signature) {
          privateContext.signature = signature;
          renderPrivatePicker();
        }
      } else renderPrivateCharacter();
      return;
    }
    const opponentSeat = session.seat === "host" ? "guest" : "host";
    const signature = JSON.stringify([session.character, currentState ? seatName(opponentSeat) : "Opponent", currentState?.question, currentState?.questionBy, currentState?.answer, currentState?.status, (currentState?.queuePlayers || []).map(player => [player.ticket, player.name, player.ready]), session.streamerShowQuestionText, session.streamerRevealName]);
    if (privateContext?.screen !== "game" || privateContext?.signature !== signature) renderPrivateCharacter();
  }
  function closePrivateWindow(closeWindow = true) {
    if (privateWindowWatch) clearInterval(privateWindowWatch);
    privateWindowWatch = null;
    const child = privateWindow;
    privateWindow = null;
    privateContext = null;
    if (closeWindow && child && !child.closed) child.close();
  }
  function setStreamerMode(enabled, context = null, popupClosed = false) {
    streamerMode = enabled;
    if (enabled && context?.selectId && !session) {
      const select = document.getElementById(context.selectId);
      context.pendingChoice = select?.value || "";
      if (select) select.value = "";
    }
    if (session) {
      session.streamerMode = enabled;
      saveSession(session);
    }
    if (!enabled) closePrivateWindow(!popupClosed);
    syncStreamerControls();
    if (enabled && context) {
      privateContext = context;
      privateWindow = window.open("", "dbdStreamerPrivate", "popup=yes,width=500,height=820,resizable=yes,scrollbars=yes");
      if (!privateWindow) {
        streamerMode = false;
        if (session) {
          session.streamerMode = false;
          saveSession(session);
        }
        syncStreamerControls();
        setNotice("Your browser blocked the private window. Allow pop-ups for this site and turn Streamer Mode on again.");
        return false;
      }
      if (session) renderPrivateCharacter();else renderPrivatePicker();
      privateWindowWatch = setInterval(() => {
        if (privateWindow?.closed) setStreamerMode(false, null, true);
      }, 500);
    } else if (enabled && privateWindow && !privateWindow.closed) {
      if (session) renderPrivateCharacter();else renderPrivatePicker();
    }
    if (session && currentState) renderRoom();
    return true;
  }
  function updateChoiceCards() {
    document.querySelectorAll(".choice-card").forEach(card => card.classList.toggle("selected", card.querySelector("input").checked));
  }
  function setHostStep(step) {
    document.querySelectorAll("[data-host-step]").forEach(panel => {
      panel.hidden = Number(panel.dataset.hostStep) !== step;
    });
    document.querySelectorAll("[data-step-dot]").forEach(dot => dot.classList.toggle("active", Number(dot.dataset.stepDot) === step));
  }
  function initHostSteps() {
    const next = $("#host-next-step"),
      back = $("#host-back-step");
    if (!next || !back) return;
    next.addEventListener("click", () => {
      const name = $("#host-name"),
        character = $("#host-character");
      if (!name.value.trim()) {
        setNotice("Enter your name to continue.");
        name.focus();
        return;
      }
      if (!character.value) {
        setNotice("Choose your secret character to continue.");
        character.focus();
        return;
      }
      clearNotice();
      setHostStep(2);
    });
    back.addEventListener("click", () => {
      clearNotice();
      setHostStep(1);
    });
  }
  function showHome() {
    room.hidden = true;
    home.hidden = false;
    $("#hero").hidden = false;
    setHostStep(1);
    if (pollTimer) stopPolling();
  }
  function showRoom() {
    home.hidden = true;
    room.hidden = false;
    $("#hero").hidden = true;
  }
  function showJoiningRoom(id) {
    showRoom();
    room.innerHTML = `<section class="panel room-panel join-loading-panel"><span class="eyebrow">JOIN ROOM</span><h2>Connecting to lobby…</h2><p class="subtle">Checking the invitation and loading the room.</p><div class="join-loading-indicator"><span class="spinner"></span><span>Joining room ${esc(id)}</span></div></section>`;
  }
  function showJoinError(message) {
    showRoom();
    room.innerHTML = `<section class="panel room-panel join-loading-panel"><span class="eyebrow">JOIN ROOM</span><h2>Couldn’t join this lobby</h2><p class="subtle">${esc(message)}</p><button class="soft-button" id="join-error-home" type="button">Back to homepage</button></section>`;
    $("#join-error-home").addEventListener("click", () => {
      pendingRoomId = "";
      history.replaceState({}, "", location.pathname);
      clearNotice();
      showHome();
    });
  }
  function stopPolling() {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = null;
    pollDelay = 0;
  }
  function saveEliminationDraft() {
    if (!session || !localEliminated) return;
    session.localEliminated = [...localEliminated];
    saveSession(session);
  }
  function localStats() {
    const stats = session?.localStats || {};
    return {
      questions: Number(stats.questions) || 0,
      answers: Number(stats.answers) || 0,
      guesses: Number(stats.guesses) || 0,
      wrongGuesses: Number(stats.wrongGuesses) || 0
    };
  }
  function incrementLocalStats(key, amount = 1) {
    if (!session) return;
    const stats = localStats();
    stats[key] = Math.max(0, stats[key] + amount);
    session.localStats = stats;
    saveSession(session);
  }
  function localBoardCounts() {
    const total = currentState?.deck?.length || 0;
    const excluded = new Set([...(localEliminated || currentState?.eliminated || []), ...(session?.localWrongGuesses || [])]);
    const eliminated = Math.min(total, excluded.size);
    return {
      eliminated,
      available: Math.max(0, total - eliminated)
    };
  }
  function boardPayload() {
    const counts = localBoardCounts();
    return {
      boardEliminated: counts.eliminated,
      boardAvailable: counts.available
    };
  }
  function updateLocalQuestionHistory(state) {
    if (!session || !state.question || !state.roundStartedAt || !["playing", "finished"].includes(state.status)) return false;
    const history = Array.isArray(session.questionHistory) ? session.questionHistory : [];
    let entry = history.find(item => Number(item.roundStartedAt) === Number(state.roundStartedAt) && Number(item.number) === Number(state.questionNumber));
    let changed = false;
    if (!entry) {
      entry = {
        roundStartedAt: Number(state.roundStartedAt),
        number: Number(state.questionNumber),
        question: String(state.question),
        askedBy: state.questionBy || "",
        answer: ""
      };
      history.push(entry);
      changed = true;
    }
    if (entry.question !== String(state.question)) {
      entry.question = String(state.question);
      changed = true;
    }
    if (entry.askedBy !== (state.questionBy || "")) {
      entry.askedBy = state.questionBy || "";
      changed = true;
    }
    if (state.answer && entry.answer !== state.answer) {
      entry.answer = state.answer;
      entry.answeredBy = state.currentTurn || "";
      changed = true;
    }
    if (history.length > 500) history.splice(0, history.length - 500);
    session.questionHistory = history;
    return changed;
  }
  function trackWrongGuessNotice(state) {
    const nonce = state.lastGuessNonce;
    if (!nonce || state.lastGuessCorrect) return;
    if (session.lastWrongNoticeNonce !== nonce) {
      session.lastWrongNoticeNonce = nonce;
      session.wrongNoticeUntil = Date.now() + 11000;
      saveSession(session);
    }
    const remaining = Number(session.wrongNoticeUntil || 0) - Date.now();
    if (remaining <= 0) return;
    clearTimeout(wrongNoticeTimer);
    wrongNoticeTimer = setTimeout(() => {
      if (!session || session.lastWrongNoticeNonce !== nonce) return;
      session.wrongNoticeUntil = 0;
      saveSession(session);
      if (currentState?.lastGuessNonce === nonce) renderRoom();
    }, remaining + 150);
  }
  function applyState(next) {
    const previousStatus = currentState?.status;
    if (session && session.seat !== "queue" && next.ownCharacter) session.character = next.ownCharacter;
    if (session && next.status === "rematch") {
      if (previousStatus && previousStatus !== "rematch" || !session.rematchDraft) session.rematchDraft = {
        mode: next.mode,
        deckSize: Number(next.deckSize),
        genderFilter: next.genderFilter || "all",
        licenseFilter: next.licenseFilter || "all",
        character: next.ownCharacter || ""
      };else if (currentState && currentState.status === "rematch" && (currentState.mode !== next.mode || currentState.genderFilter !== next.genderFilter || currentState.licenseFilter !== next.licenseFilter)) session.rematchDraft = {
        mode: next.mode,
        deckSize: Number(next.deckSize),
        genderFilter: next.genderFilter || "all",
        licenseFilter: next.licenseFilter || "all",
        character: next.ownCharacter || ""
      };
      if (Object.prototype.hasOwnProperty.call(next, "ownCharacter")) session.character = next.ownCharacter || "";
    } else if (next.status === "playing" && previousStatus === "rematch" && session) session.rematchDraft = null;
    if (session && ["playing", "finished"].includes(next.status)) trackWrongGuessNotice(next);
    const roundKey = Number(next.roundStartedAt) || 0;
    const firstSeenRound = Boolean(session && !Object.prototype.hasOwnProperty.call(session, "streamerRoundStartedAt"));
    const startedNewRound = next.status === "playing" && (previousStatus && previousStatus !== "playing" || firstSeenRound || Number(session?.streamerRoundStartedAt || 0) !== roundKey);
    const localRoundChanged = next.status === "playing" && roundKey && Number(session?.localRoundStartedAt || 0) !== roundKey;
    if (startedNewRound && session) {
      session.streamerRevealName = false;
      session.streamerShowQuestionText = false;
      session.streamerRoundStartedAt = roundKey;
    }
    if (localRoundChanged && session) {
      const firstLocalRound = !Number(session.localRoundStartedAt || 0);
      const savedBoard = firstLocalRound ? session.localEliminated || session.pendingEliminated || next.eliminated || [] : [];
      session.localRoundStartedAt = roundKey;
      session.localEliminated = [...savedBoard];
      session.localWrongGuesses = [];
      if (!firstLocalRound) session.localStats = {
        questions: 0,
        answers: 0,
        guesses: 0,
        wrongGuesses: 0
      };
      localEliminated = new Set(savedBoard);
    } else if (localEliminated === null) localEliminated = new Set(session?.localEliminated || []);
    next.eliminated = [...(localEliminated || [])];
    next.wrongGuesses = [...(session?.localWrongGuesses || [])];
    next.myStats = localStats();
    const historyChanged = session ? updateLocalQuestionHistory(next) : false;
    if (session && (localRoundChanged || startedNewRound || historyChanged || next.status === "rematch")) saveSession(session);
    currentState = next;
  }
  function syncPolling() {
    let delay = 0;
    if (session && currentState) {
      if (currentState.status === "waiting") delay = 6000;else if (currentState.status === "rematch" || currentState.status === "queue") delay = 3500;else if (currentState.status === "finished") delay = 6000;else if (currentState.status === "playing") delay = !isMyTurn() || currentState.question && !currentState.turnAnswered ? 5000 : 12000;
    }
    if (delay === pollDelay && pollTimer) return;
    stopPolling();
    if (delay) {
      pollDelay = delay;
      pollTimer = setInterval(() => refreshState(true), delay);
    }
  }
  function persistUrlFromRoom() {
    if (!session) return;
    const url = new URL(location.href);
    url.searchParams.set("r", session.id);
    url.searchParams.delete("room");
    url.searchParams.delete("api");
    if (session.seat === "host") {
      url.searchParams.set("host", session.ticket);
      url.searchParams.delete("character");
    } else {
      url.searchParams.delete("host");
      url.searchParams.delete("character");
    }
    history.replaceState({}, "", url);
  }
  function callApi(action, fields = {}) {
    const endpoint = DEFAULT_API_URL;
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:\?.*)?$/.test(endpoint)) return Promise.reject(new Error("That does not look like an Apps Script web app URL ending in /exec."));
    if (!["state", "preview"].includes(action)) {
      return fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        credentials: "omit",
        redirect: "follow",
        cache: "no-store",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8"
        },
        body: JSON.stringify({
          action,
          ...fields
        })
      }).then(() => ({
        ok: true
      })).catch(() => {
        setConnectionStatus(false);
        throw new Error("Could not reach the game service. Check the URL and try again.");
      });
    }
    return new Promise((resolve, reject) => {
      const callback = `guessWhoCallback_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
      const params = new URLSearchParams({
        action,
        callback,
        ...Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, typeof value === "string" ? value : JSON.stringify(value)]))
      });
      const script = document.createElement("script");
      let timeout;
      const finish = () => {
        clearTimeout(timeout);
        delete window[callback];
        script.remove();
        if (activeRequest === script) activeRequest = null;
      };
      window[callback] = result => {
        finish();
        setConnectionStatus(Boolean(result && typeof result.ok === "boolean"));
        if (!result || result.ok !== true) reject(new Error(result?.error || "The game service returned an error."));else resolve(result);
      };
      script.onerror = () => {
        finish();
        setConnectionStatus(false);
        reject(new Error("Could not reach the game service. Check the URL and try again."));
      };
      timeout = setTimeout(() => {
        finish();
        setConnectionStatus(false);
        reject(new Error("The game service took too long to respond."));
      }, 12000);
      script.src = `${endpoint}${endpoint.includes("?") ? "&" : "?"}${params.toString()}`;
      script.referrerPolicy = "no-referrer";
      activeRequest = script;
      document.head.appendChild(script);
    });
  }
  function withBusy(button, task, busyLabel = "Please wait…") {
    if (busy) return;
    busy = true;
    activeAction = button?.dataset.action || button?.dataset.formAction || "request";
    activeActionLabel = busyLabel;
    updateRequestControls();
    clearNotice();
    let succeeded = false;
    return Promise.resolve().then(task).then(value => {
      succeeded = true;
      return value;
    }).catch(error => {
      if (!disconnectIfRoomUnavailable(error)) setNotice(error.message || "Something went wrong.");
    }).finally(() => {
      busy = false;
      if (succeeded) showActionSent(activeAction, actionSentLabel(activeAction));
      activeAction = "";
      activeActionLabel = "";
      updateRequestControls();
    });
  }
  function actionSentLabel(action) {
    return {
      ask: "Question sent ✓",
      answer: "Answer sent ✓",
      guess: "Guess sent ✓",
      start: "Game started ✓",
      rematch: "Setup opened ✓",
      "rematch-setup": "Setup saved ✓",
      "rematch-character": "Ready ✓",
      kick: "Player removed ✓",
      voiceChat: "Saved ✓",
      exit: "Left room ✓",
      "copy-link": "Copied ✓"
    }[action] || "Sent ✓";
  }
  function showActionSent(action, label) {
    if (!action) return;
    completedAction = {
      action,
      label,
      until: Date.now() + 1300
    };
    clearTimeout(completedActionTimer);
    completedActionTimer = setTimeout(() => {
      completedAction = null;
      updateRequestControls();
    }, 1350);
    updateRequestControls();
  }
  function updateRequestControls() {
    const locked = busy || backgroundMutation;
    const controls = [...room.querySelectorAll("button[data-action]:not([data-action=eliminate]), button[data-form-action], #guess-select, #voice-chat-toggle")];
    controls.push(...document.querySelectorAll("#create-form button[type='submit'], #join-form button[type='submit']"));
    controls.forEach(control => {
      if (!control.dataset.requestDefaultDisabled) control.dataset.requestDefaultDisabled = control.disabled ? "true" : "false";
      if ((control.dataset.action || control.dataset.formAction) && control.dataset.defaultHtml === undefined) control.dataset.defaultHtml = control.innerHTML;
      control.disabled = locked || control.dataset.requestDefaultDisabled === "true";
      const action = control.dataset.action || control.dataset.formAction;
      control.classList.toggle("request-loading", Boolean(locked && action === activeAction));
      if (!action) return;
      if (locked && action === activeAction) control.innerHTML = `<span class="spinner"></span>${esc(activeActionLabel || "Sending…")}`;else if (!locked && completedAction?.action === action && completedAction.until > Date.now()) control.innerHTML = esc(completedAction.label);else if (control.dataset.defaultHtml !== undefined) control.innerHTML = control.dataset.defaultHtml;
    });
  }
  async function refreshState(quiet = false) {
    if (!session || busy || backgroundMutation || pollInFlight) return;
    pollInFlight = true;
    try {
      const data = await callApi("state", {
        id: session.id,
        ticket: session.ticket,
        seat: session.seat
      });
      if (await leaveQueueIfFinished(data)) return;
      applyQueueAssignment(data);
      const localStateFields = new Set(["eliminated", "wrongGuesses", "myStats"]);
      const previousServerState = Object.fromEntries(Object.entries(currentState || {}).filter(([key]) => !localStateFields.has(key)));
      const stateChanged = JSON.stringify(previousServerState) !== JSON.stringify(data.state);
      applyState(data.state);
      if (stateChanged) renderRoom({
        quiet: true
      });
      clearNotice();
      syncPolling();
    } catch (error) {
      if (!disconnectIfRoomUnavailable(error) && /invalid|not found|expired/i.test(error.message)) {
        clearSession();
        setNotice("This room session is no longer available. Return to the homepage to create or join another game.");
      } else if (!quiet) setNotice(error.message);
    } finally {
      pollInFlight = false;
    }
  }
  function applyQueueAssignment(data) {
    if (!data?.assignment || !session) return;
    session.id = data.assignment.id;
    session.seat = data.assignment.seat;
    session.queueStatus = "";
    saveSession(session);
    persistUrlFromRoom();
  }
  async function leaveQueueIfFinished(data) {
    if (session?.seat !== "queue" || data?.assignment) return false;
    const status = data?.state?.queueStatus;
    const messages = {
      declined: "You declined the quick match and returned to the homepage.",
      noMatch: "There was no room in a quick match for you. You returned to the homepage.",
      notReady: "The host moved on before your setup was ready. You returned to the homepage.",
      kicked: "You were removed from the lobby and returned to the homepage."
    };
    if (!messages[status]) return false;
    try {
      await callApi("queueLeave", {
        id: session.id,
        ticket: session.ticket
      });
    } catch (_) {}
    clearSession();
    setNotice(messages[status], "success");
    return true;
  }
  async function perform(action, fields = {}, after = true) {
    if (!session) throw new Error("Your room session has expired. Return to the homepage and join again.");
    const requestFields = ["ask", "answer", "guess"].includes(action) ? {
      ...fields,
      ...boardPayload(),
      ...(action === "guess" ? {
        requestId: randomToken(18)
      } : {})
    } : fields;
    const result = await callApi(action, {
      id: session.id,
      ticket: session.ticket,
      seat: session.seat,
      ...requestFields
    });
    if (after) {
      const fresh = await callApi("state", {
        id: session.id,
        ticket: session.ticket,
        seat: session.seat
      });
      if (await leaveQueueIfFinished(fresh)) return result;
      applyQueueAssignment(fresh);
      if (action === "guess") {
        const guessWasAccepted = fresh.state.lastGuessBy === session.seat && fresh.state.lastGuess === fields.characterId && fresh.state.lastGuessNonce === requestFields.requestId;
        if (!guessWasAccepted) throw new Error("The guess was not accepted. Your turn or board may have changed; please try again.");
        incrementLocalStats("guesses");
        if (!fresh.state.lastGuessCorrect) {
          session.localWrongGuesses = [...new Set([...(session.localWrongGuesses || []), fields.characterId])];
          incrementLocalStats("wrongGuesses");
        }
      }
      if (action === "rematchSetup") {
        if (fresh.state.status !== "rematch" || !fresh.state.hostReady || fresh.state.mode !== fields.mode || Number(fresh.state.deckSize) !== Number(fields.deckSize)) throw new Error("The next-round setup was not saved.");
        session.character = fields.hostCharacter;
        session.rematchDraft = null;
        saveSession(session);
      }
      if (action === "rematchCharacter") {
        if (fresh.state.status !== "rematch" || !fresh.state.guestReady) throw new Error("Your character was not saved.");
        session.character = fields.guestCharacter;
        session.rematchDraft = null;
        saveSession(session);
      }
      if (action === "start" && fresh.state.status !== "playing") throw new Error("The new round was not started. Check that both players are ready.");
      applyState(fresh.state);
      renderRoom();
      syncPolling();
    }
    return result;
  }
  function queueOptimisticAction(action, fields, previousState, previousEliminated) {
    if (backgroundMutation) return;
    backgroundMutation = true;
    activeAction = action;
    activeActionLabel = action === "ask" ? "Sending question…" : action === "answer" ? "Sending answer…" : action === "kick" ? "Removing player…" : "Saving…";
    updateRequestControls();
    const auth = {
      id: session.id,
      ticket: session.ticket,
      seat: session.seat
    };
    callApi(action, {
      ...auth,
      ...fields,
      ...(["ask", "answer"].includes(action) ? boardPayload() : {})
    }).then(() => {
      return callApi("state", auth);
    }).then(data => {
      const state = data.state;
      const confirmed = action === "ask" ? state.question === fields.question && state.questionBy === session.seat && state.currentTurn !== session.seat : action === "answer" ? state.answer === fields.answer && state.currentTurn === session.seat : action === "voiceChat" ? Boolean(state.voiceChat) === Boolean(fields.enabled) : action === "kick" ? !state.guestName : true;
      if (!confirmed) throw new Error("The server did not accept that action. Your board changes are still local; try again.");
      if (action === "ask") incrementLocalStats("questions");
      if (action === "answer") incrementLocalStats("answers");
      applyState(state);
      renderRoom();
      clearNotice();
    }).catch(error => {
      if (disconnectIfRoomUnavailable(error)) return;
      const latestEliminated = new Set(localEliminated || previousEliminated);
      currentState = previousState;
      localEliminated = latestEliminated;
      if (session) saveEliminationDraft();
      const questionInput = $("#question-input");
      if (action === "ask" && questionInput && !questionInput.value) questionInput.value = fields.question;
      renderRoom();
      setNotice(error.message || "The update could not be saved.");
    }).finally(() => {
      backgroundMutation = false;
      showActionSent(action, actionSentLabel(action));
      activeAction = "";
      activeActionLabel = "";
      updateRequestControls();
      syncPolling();
    });
  }
  function submitOptimistic(action, fields, mutate) {
    if (backgroundMutation || busy) return;
    const previousState = JSON.parse(JSON.stringify(currentState));
    const previousEliminated = new Set(localEliminated || []);
    mutate();
    if (action === "ask" && $("#question-input")) $("#question-input").value = "";
    renderRoom();
    syncPolling();
    queueOptimisticAction(action, fields, previousState, previousEliminated);
  }
  function updateBoardDraftUI(changedId) {
    const eliminated = localEliminated || new Set();
    const wrong = new Set(currentState.wrongGuesses || []);
    const card = [...room.querySelectorAll(".character-card")].find(item => item.dataset.id === changedId);
    if (card) card.classList.toggle("eliminated", eliminated.has(changedId));
    const count = (currentState.deck || []).filter(item => !eliminated.has(item.id) && !wrong.has(item.id)).length;
    room.querySelector('[data-board-count="available"]')?.replaceChildren(document.createTextNode(String(count)));
    room.querySelector('[data-board-count="eliminated"]')?.replaceChildren(document.createTextNode(String(eliminated.size)));
    room.querySelector('[data-board-count="wrong"]')?.replaceChildren(document.createTextNode(String(wrong.size)));
    const select = $("#guess-select");
    if (select) {
      const selected = select.value;
      const deck = currentState.deck || [];
      select.innerHTML = `<option value="">Choose a character…</option>${deck.map(item => `<option value="${esc(item.id)}" class="${wrong.has(item.id) ? "guess-wrong" : eliminated.has(item.id) ? "guess-eliminated" : "guess-available"}" style="color:${wrong.has(item.id) ? "#f08084" : eliminated.has(item.id) ? "#efb76a" : "#7bd49b"}" ${wrong.has(item.id) ? "disabled" : ""}>${wrong.has(item.id) ? "🔴" : eliminated.has(item.id) ? "🟠" : "🟢"} ${esc(item.name)}${wrong.has(item.id) ? " · Wrong guess" : eliminated.has(item.id) ? " · Eliminated" : " · Available"}</option>`).join("")}`;
      if (deck.some(item => item.id === selected)) select.value = selected;
    }
    updatePlayerBoardCounts();
  }
  function updatePlayerBoardCounts() {
    const own = localBoardCounts();
    room.querySelectorAll(".player-board-counts").forEach(box => {
      if (box.dataset.boardSeat !== session.seat) return;
      box.querySelector("[data-count-eliminated]").textContent = `${own.eliminated} eliminated`;
      box.querySelector("[data-count-available]").textContent = `${own.available} available`;
    });
  }
  function characterById(id) {
    return ROSTER.find(c => c.id === id);
  }
  function setPortraitSource(image, source) {
    if (!image || !source) return;
    image.dataset.file = new URL(source).pathname.split("/").pop();
    image.dataset.retry = "0";
    image.onerror = () => {
      if (image.dataset.retry !== "1") {
        image.dataset.retry = "1";
        image.src = `https://deadbydaylight.wiki.gg/wiki/Special:FilePath/${encodeURIComponent(image.dataset.file)}`;
      } else {
        image.onerror = null;
        image.src = PLACEHOLDER_IMAGE;
      }
    };
    image.src = source;
  }
  function portraitMarkup(source, name, classes = "") {
    const file = new URL(source).pathname.split("/").pop();
    return `<img class="${esc(classes)}" src="${esc(source)}" data-file="${esc(file)}" alt="${esc(name)}" onerror="if(this.dataset.retry!=='1'){this.dataset.retry='1';this.src='https://deadbydaylight.wiki.gg/wiki/Special:FilePath/'+encodeURIComponent(this.dataset.file)}else{this.onerror=null;this.src='${esc(PLACEHOLDER_IMAGE)}'}">`;
  }
  function characterPortrait(id, classes = "") {
    const item = characterById(id);
    return item ? portraitMarkup(item.image, item.name, classes) : `<span class="player-avatar avatar-placeholder ${classes}">?</span>`;
  }
  function shareUrl() {
    const invite = new URL(`${location.origin}${location.pathname}`);
    invite.searchParams.set("r", session.id);
    return invite.toString();
  }
  function roomIdFromValue(value) {
    const input = String(value || "").trim();
    if (!input) return "";
    try {
      const url = new URL(input, location.href);
      const id = url.searchParams.get("r") || url.searchParams.get("room");
      if (id) return id.toUpperCase();
    } catch (_) {}
    return /^[A-HJ-NP-Z2-9]{9}$/i.test(input) ? input.toUpperCase() : "";
  }
  function seatName(seat) {
    return seat === "host" ? currentState.hostName : currentState.guestName;
  }
  function displaySeatName(seat) {
    return streamerMode && seat !== session.seat && !session.streamerRevealName ? "Opponent" : seatName(seat) || "Opponent";
  }
  function seatReady(seat) {
    return seat === "host" ? currentState.hostReady : currentState.guestReady;
  }
  function isMyTurn() {
    return currentState?.currentTurn === session?.seat;
  }
  function renderRoom(options = {}) {
    if (!currentState || !session) return;
    const previousQuestion = $("#question-input");
    const questionDraft = previousQuestion?.value || "";
    const questionHadFocus = previousQuestion && document.activeElement === previousQuestion;
    const previousGuess = $("#guess-select");
    const guessDraft = previousGuess?.value || "";
    const historyWasOpen = $(".question-history")?.open || false;
    showRoom();
    room.classList.remove("quiet-refresh");
    if (options.quiet) {
      room.classList.add("quiet-refresh");
      requestAnimationFrame(() => room.classList.remove("quiet-refresh"));
    }
    const state = currentState;
    const selfName = session.seat === "host" ? state.hostName : state.guestName;
    const otherSeat = session.seat === "host" ? "guest" : "host";
    const otherName = seatName(otherSeat);
    const otherReady = seatReady(otherSeat);
    const hostMode = session.seat === "host";
    const bothReady = state.hostReady && state.guestReady;
    const voiceToggle = state.status === "waiting" && hostMode && otherReady ? `<label class="voice-chat-toggle"><input id="voice-chat-toggle" type="checkbox" ${state.voiceChat ? "checked" : ""}><span class="voice-switch"></span><span><b>Voice chat</b></span></label>` : "";
    const header = `<div class="room-top"><div><span class="eyebrow">PRIVATE ROOM · ${esc(state.modeLabel)}</span><h2>${state.status === "playing" ? "The hunt is on" : state.status === "finished" ? "Round complete" : state.status === "rematch" ? "Set up the next round" : state.status === "queue" ? "Waiting for a match" : state.joinMode === "list" && hostMode ? "Choose your opponent" : "Waiting for your opponent"}</h2><span class="room-code">ROOM ${esc(state.id)}</span></div><div class="room-actions">${voiceToggle}${state.status === "waiting" && hostMode && otherReady && state.joinMode !== "list" ? `<button class="primary-button" data-action="start">Start game ↗</button>` : ""}${state.status === "waiting" && hostMode && Boolean(state.guestName) ? `<button class="danger-button" data-action="kick">Remove player</button>` : ""}<button class="soft-button" data-action="exit">${state.status === "finished" ? "Exit room" : "Leave room"}</button></div></div>`;
    const players = state.status === "queue" ? "" : `<div class="room-grid">${playerCard("host", state)}${playerCard("guest", state)}</div>`;
    const link = state.status === "waiting" && hostMode ? `<div class="room-link-box"><span class="subtle">INVITE LINK</span><input class="${streamerMode ? "streamer-link-blur" : ""}" readonly value="${esc(shareUrl())}" aria-label="Invite link"><button class="secondary-button" data-action="copy-link">Copy link</button></div>` : "";
    let body = "";
    if (state.status === "queue") body = renderQueueWaiting(state);else if (state.status === "waiting") body = `${state.joinMode === "list" && hostMode ? renderQueueList(state) : ""}<div class="waiting-state"><h3>${bothReady ? "Both players are ready" : hostMode ? otherReady ? "Your opponent is ready" : state.joinMode === "list" ? "Choose a ready player" : "Waiting for an opponent" : "You are ready"}</h3><p>${bothReady ? "Start the game when you are ready." : hostMode ? otherReady ? "Start when ready." : state.joinMode === "list" ? "Players appear here as they open the invite. Their name appears after they finish setup." : "Share your invite link. The first player to join takes the open seat." : "The host will start the game when ready."}</p></div>`;else if (state.status === "rematch") body = renderRematchSetup();else if (state.status === "playing") body = renderGame();else body = renderResult();
    const history = renderQuestionHistory();
    const reopenPrivate = streamerMode && (!privateWindow || privateWindow.closed) ? `<button class="secondary-button" data-action="reopen-private">Open private window</button>` : "";
    const roomMarkup = `${header}${players}${link}${body}${history}${reopenPrivate}`;
    let roomPanel = room.querySelector(":scope > .room-panel");
    let partialGameRefresh = false;
    if (roomPanel) {
      roomPanel.className = "panel room-panel";
      if (options.quiet && renderedRoomStatus === "playing" && state.status === "playing") {
        const nextPanel = document.createElement("div");
        nextPanel.innerHTML = roomMarkup;
        const oldTurnPanel = roomPanel.querySelector(".turn-panel");
        const nextTurnPanel = nextPanel.querySelector(".turn-panel");
        if (oldTurnPanel && nextTurnPanel) {
          oldTurnPanel.replaceWith(nextTurnPanel);
          bindRoomActions(nextTurnPanel);
          partialGameRefresh = true;
        }
        const nextHistory = nextPanel.querySelector(".question-history");
        const oldHistory = roomPanel.querySelector(".question-history");
        if (oldHistory && nextHistory) oldHistory.replaceWith(nextHistory);else if (oldHistory) oldHistory.remove();else if (nextHistory) roomPanel.append(nextHistory);
        if (nextHistory) nextHistory.open = historyWasOpen;
        const nextCounts = new Map([...nextPanel.querySelectorAll(".player-board-counts")].map(box => [box.dataset.boardSeat, box]));
        roomPanel.querySelectorAll(".player-board-counts").forEach(box => {
          const fresh = nextCounts.get(box.dataset.boardSeat);
          if (!fresh) return;
          ["[data-count-eliminated]", "[data-count-available]"].forEach(selector => {
            const currentValue = box.querySelector(selector),
              freshValue = fresh.querySelector(selector);
            if (currentValue && freshValue) currentValue.textContent = freshValue.textContent;
          });
        });
      }
      if (!partialGameRefresh) roomPanel.innerHTML = roomMarkup;
    } else {
      room.innerHTML = `<div class="panel room-panel">${roomMarkup}</div>`;
    }
    renderedRoomStatus = state.status;
    const historyDetails = $(".question-history");
    if (historyDetails) historyDetails.open = historyWasOpen;
    if (!partialGameRefresh) bindRoomActions();
    syncStreamerControls();
    syncPrivateWindow();
    updateRequestControls();
    const nextQuestion = $("#question-input");
    if (nextQuestion) {
      nextQuestion.value = questionDraft;
      if (questionHadFocus) {
        nextQuestion.focus({
          preventScroll: true
        });
        nextQuestion.setSelectionRange(questionDraft.length, questionDraft.length);
      }
    }
    const nextGuess = $("#guess-select");
    if (nextGuess && [...nextGuess.options].some(option => option.value === guessDraft)) nextGuess.value = guessDraft;
  }
  function renderRematchSetup() {
    const hostMode = session.seat === "host";
    const draft = session.rematchDraft || {
      mode: currentState.mode,
      deckSize: currentState.deckSize,
      genderFilter: currentState.genderFilter || "all",
      licenseFilter: currentState.licenseFilter || "all",
      character: session.character
    };
    const readyForSeat = hostMode ? currentState.hostReady : currentState.guestReady;
    const setupMode = hostMode && !currentState.hostReady ? draft.mode : currentState.mode;
    const selectedCandidate = readyForSeat ? session.character : draft.character;
    const filters = {
      gender: draft.genderFilter || currentState.genderFilter || "all",
      license: draft.licenseFilter || currentState.licenseFilter || "all"
    };
    const selected = selectedCandidate && rosterFor(setupMode, filters.gender, filters.license).some(item => item.id === selectedCandidate) ? selectedCandidate : "";
    const selectedName = characterById(selected)?.name || "No character selected";
    const modeOptions = [["mixed", "Mixed pool"], ["killers", "Killers only"], ["survivors", "Survivors only"]].map(([value, label]) => `<option value="${value}" ${setupMode === value ? "selected" : ""}>${label}</option>`).join("");
    const characterSelect = (id, label) => `<label class="field-label" for="${id}">${label}</label><select id="${id}" required data-secret-select="${id}"></select><p class="streamer-hidden-note" data-streamer-note hidden>Your choice is hidden from the stream. Select it in the private window.</p><label class="streamer-toggle"><input class="streamer-toggle-input" type="checkbox" data-secret-select="${id}"><span class="streamer-switch" aria-hidden="true"></span><span><b>Streamer Mode</b><small>Keep your character off stream</small></span></label>`;
    const mineReady = readyForSeat;
    const myReadyMarkup = mineReady ? `<div class="rematch-ready-card"><span class="ready-check">✓</span><div><b>You are ready</b><small>${streamerMode ? "Your secret character is saved privately." : `Your pick: ${esc(selectedName)}`}</small></div></div>` : "";
    const setup = hostMode ? mineReady ? `<div class="rematch-ready-card"><span class="ready-check">✓</span><div><b>Setup locked · you are ready</b><small>${esc(currentState.modeLabel)} · ${Number(currentState.deckSize)} cards · ${streamerMode ? "Your pick is private" : `Your pick: ${esc(selectedName)}`}</small></div></div>` : `<form id="rematch-host-form" class="rematch-form"><div class="rematch-fields"><div><label class="field-label" for="rematch-mode">Character pool</label><select id="rematch-mode">${modeOptions}</select></div><div><label class="field-label" for="rematch-deck-size">Cards</label><select id="rematch-deck-size"></select></div><div><label class="field-label" for="rematch-gender">Gender</label><select id="rematch-gender"><option value="all">Any gender</option><option value="male">Male</option><option value="female">Female</option></select></div><div><label class="field-label" for="rematch-license">License</label><select id="rematch-license"><option value="all">Any license</option><option value="original">Original</option><option value="licensed">Licensed</option></select></div></div>${characterSelect("rematch-host-character", "Your secret character")}<button class="primary-button full-button" type="submit" data-form-action="rematch-setup">Ready for next round</button></form>` : mineReady ? myReadyMarkup : `<form id="rematch-guest-form" class="rematch-form">${characterSelect("rematch-guest-character", "Your secret character")}<button class="primary-button full-button" type="submit" data-form-action="rematch-character">Ready for next round</button></form>`;
    const canStart = hostMode && currentState.hostReady && currentState.guestReady;
    const start = hostMode ? `<div class="rematch-start"><p>${canStart ? "Both characters are ready." : currentState.hostReady ? "Waiting for the other player to choose a character…" : "Save your setup and character to continue."}</p><button class="primary-button" data-action="start" ${canStart ? "" : "disabled"}>Start game ↗</button></div>` : `<div class="rematch-start"><p>${currentState.guestReady ? "Your character is saved. Waiting for the host to start…" : "Choose your secret character to get ready."}</p></div>`;
    return `<section class="rematch-setup"><div class="rematch-heading"><span class="eyebrow">NEXT ROUND</span><h3>Choose the next matchup</h3><p>Both players stay in the room. Pick new secret characters before the host starts.</p></div>${setup}${start}</section>`;
  }
  function playerCard(seat, state) {
    const actualName = seat === "host" ? state.hostName : state.guestName;
    const name = streamerMode && seat !== session.seat && !session.streamerRevealName ? "Opponent" : actualName;
    const ready = seat === "host" ? state.hostReady : state.guestReady;
    const characterId = !streamerMode && seat === session.seat ? session.character : "";
    const avatar = characterId ? characterPortrait(characterId, "player-avatar") : `<span class="player-avatar avatar-placeholder">${name ? esc(name.slice(0, 1).toUpperCase()) : "?"}</span>`;
    const counts = seat === session.seat ? localBoardCounts() : opponentBoardCounts(seat, state);
    const boardCounts = state.status === "playing" ? `<div class="player-board-counts" data-board-seat="${seat}"><span data-count-eliminated>${counts.eliminated} eliminated</span><span data-count-available>${counts.available} available</span></div>` : "";
    return `<div class="player-card">${avatar}<div class="player-card-copy"><b>${esc(name || (seat === "host" ? "Host" : "Open seat"))}${seat === session.seat ? " <span class=\"subtle\">(you)</span>" : ""}</b><small>${seat === "host" ? "Room host" : "Challenger"}</small>${boardCounts}</div><span class="status-pill ${ready ? "ready" : ""}">${ready ? "READY" : name ? "NOT READY" : "WAITING"}</span></div>`;
  }
  function opponentBoardCounts(seat, state) {
    const total = (state.deck || []).length;
    const eliminatedValue = seat === "host" ? state.hostBoardEliminated : state.guestBoardEliminated;
    const availableValue = seat === "host" ? state.hostBoardAvailable : state.guestBoardAvailable;
    const eliminated = Math.min(total, Math.max(0, Number(eliminatedValue) || 0));
    return {
      eliminated,
      available: availableValue == null ? Math.max(0, total - eliminated) : Math.min(total - eliminated, Math.max(0, Number(availableValue) || 0))
    };
  }
  function renderQuestionHistory() {
    const history = Array.isArray(session?.questionHistory) ? session.questionHistory : [];
    if (!history.length) return "";
    const revealText = !streamerMode || Boolean(session.streamerShowQuestionText);
    const ownHistory = history.filter(entry => entry.askedBy === session.seat);
    const otherSeat = session.seat === "host" ? "guest" : "host";
    const otherHistory = history.filter(entry => entry.askedBy !== session.seat);
    const rows = entries => entries.length ? `<ol>${entries.map(entry => `<li><div><small>ROUND ${new Date(Number(entry.roundStartedAt)).toLocaleDateString()} · QUESTION #${Number(entry.number)}</small><p>${esc(revealText ? entry.question : "Question hidden in Streamer Mode")}</p><span>Answer: <b>${entry.answer ? esc(entry.answer) : "Waiting / not recorded"}</b></span></div></li>`).join("")}</ol>` : `<p class="history-empty">No questions yet.</p>`;
    return `<details class="question-history"><summary>Question history <span>${history.length} saved locally</span></summary><div class="question-history-grid"><section><h4>Your questions</h4>${rows(ownHistory)}</section><section><h4>${esc(displaySeatName(otherSeat))}’s questions</h4>${rows(otherHistory)}</section></div></details>`;
  }
  function renderQueueList(state) {
    const players = [...(state.queuePlayers || [])].sort((a, b) => Number(a.clickedAt) - Number(b.clickedAt));
    const rows = players.length ? players.map((player, index) => {
      const elapsed = Math.max(0, Math.floor((Date.now() - Number(player.clickedAt || Date.now())) / 1000));
      const joined = elapsed < 60 ? `${elapsed}s ago` : `${Math.floor(elapsed / 60)}m ${elapsed % 60}s ago`;
      const name = streamerMode ? `Player #${index + 1}` : player.name || "Someone";
      const waiting = player.outcome === "noMatch" ? `<span class="queue-state-pill">No match</span>` : player.outcome === "notReady" ? `<span class="queue-state-pill">Setup incomplete</span>` : player.response === "yes" ? `<span class="queue-state-pill ready">Accepted</span>` : player.response === "no" ? `<span class="queue-state-pill">Declined</span>` : player.offerAt ? `<span class="queue-state-pill">Quick match offer</span>` : player.ready ? `<span class="queue-state-pill ready">Ready</span>` : `<span class="queue-state-pill">Setting up</span>`;
      const action = !player.offerAt ? `<button class="primary-button queue-play" data-action="select-guest" data-ticket="${esc(player.ticket)}" ${player.ready && !player.outcome ? "" : "disabled"}>Play ↗</button>` : "";
      return `<article class="queue-player"><span class="queue-position">${index + 1}</span><div class="queue-player-info"><b>${esc(name)}</b><small>Joined ${esc(joined)}</small></div>${waiting}${action}</article>`;
    }).join("") : `<p class="queue-empty">No players have opened the invite yet.</p>`;
    const offers = players.some(player => player.offerAt) ? `<p class="queue-note">Unselected players have 60 seconds to accept a quick match. Ready players are paired at random.</p>` : "";
    return `<section class="queue-panel"><header><div><span class="eyebrow">PLAYER LIST</span><h3>Waiting players <span>${players.length}</span></h3></div><small>Oldest first</small></header><div class="queue-player-list">${rows}</div>${offers}</section>`;
  }
  function renderQueueWaiting(state) {
    const status = state.queueStatus;
    if (status === "matching") return `<section class="queue-offer"><span class="eyebrow">QUICK MATCH</span><h3>Looking for another player…</h3><p>Your yes is recorded. We’re pairing players who accepted.</p><div class="queue-countdown"><b>${Math.max(0, Math.ceil((Number(state.offerDeadline) - Date.now()) / 1000))}</b><span>seconds remaining</span></div></section>`;
    if (status === "offer") {
      const seconds = Math.max(0, Math.ceil((Number(state.offerDeadline) - Date.now()) / 1000));
      return `<section class="queue-offer"><span class="eyebrow">YOU WERE NOT SELECTED</span><h3>Quick match?</h3><p>Join another waiting player for a new game. The match starts as soon as the group is paired.</p><div class="queue-countdown"><b>${seconds}</b><span>seconds to answer</span></div><div class="queue-offer-actions"><button class="primary-button" data-action="quick-match" data-accept="yes">Yes, find me a match</button><button class="soft-button" data-action="quick-match" data-accept="no">No thanks</button></div></section>`;
    }
    const messages = {
      waiting: ["You’re on the list", "The host can see that someone joined. Finish your setup to show your nickname and become ready."],
      declined: ["Quick match declined", "You can leave this room and join another invite whenever you like."],
      noMatch: ["No players available", "There weren’t enough other players to form a quick match this time."],
      notReady: ["This invite moved on", "The host chose a ready player before you finished setup."],
      kicked: ["You were removed from this lobby", "You can return to the main page and join another room."],
      matched: ["Match found", "Opening your game…"]
    };
    const [title, message] = messages[status] || messages.waiting;
    return `<section class="queue-awaiting"><span class="queue-waiting-mark">${status === "matched" ? "✓" : "…"}</span><div><h3>${title}</h3><p>${message}</p></div></section>`;
  }
  function renderGame() {
    const eliminated = localEliminated || new Set(currentState.eliminated || []);
    const wrong = new Set(currentState.wrongGuesses || []);
    const candidates = (currentState.deck || []).filter(item => !eliminated.has(item.id) && !wrong.has(item.id));
    const ownCharacter = characterById(session.character);
    const secretPanel = streamerMode ? `<div class="secret-display streamer-secret"><div class="secret-question-mark">?</div><div class="secret-copy"><span>SECRET PICK · STREAMER MODE</span><b>Hidden from the stream</b><small>Your character is shown in the private window.</small></div></div>` : `<div class="secret-display">${ownCharacter ? characterPortrait(ownCharacter.id, "secret-portrait") : ""}<div><span>YOUR CHARACTER</span><b>${esc(ownCharacter?.name || "Unavailable")}</b></div></div>`;
    const answered = Boolean(currentState.answer);
    const myQuestion = currentState.questionBy === session.seat;
    const turnText = isMyTurn() ? currentState.question && !answered && !myQuestion ? "Your turn to answer" : "Your turn: ask or guess" : `${esc(displaySeatName(currentState.currentTurn))}'s turn`;
    const canAsk = isMyTurn() && (!currentState.question || answered);
    const canGuess = isMyTurn() && !(currentState.question && !answered && !myQuestion);
    const showExactQuestion = !streamerMode || myQuestion || session.streamerShowQuestionText;
    const visibleQuestion = showExactQuestion ? currentState.question : "A question was received. Answer YES or NO below.";
    const questionBlock = currentState.question ? `<section class="question-box ${answered ? "question-answered" : "question-pending"}"><header class="question-heading"><span class="question-icon">?</span><div><small>${myQuestion ? "YOUR QUESTION" : `${esc(displaySeatName(currentState.questionBy))} ASKED`}</small><b>QUESTION #${Number(currentState.questionNumber || 0)}</b></div><span class="question-state">${answered ? "ANSWERED" : "WAITING"}</span></header><p class="question-text">${esc(visibleQuestion)}</p>${answered ? `<p class="answer-line"><strong>Answer: ${esc(currentState.answer)}</strong></p>` : `<p class="subtle">Waiting for an answer…</p>`}</section>` : "";
    const questionNumber = Number(currentState.questionNumber || 0) + 1;
    const answerPrompt = currentState.question && !answered && !myQuestion ? `<div class="answer-prompt"><div class="question-answer"><button class="answer-button answer-yes" data-action="answer" data-value="Yes">YES</button><button class="answer-button answer-no" data-action="answer" data-value="No">NO</button></div></div>` : "";
    const questionComposer = currentState.voiceChat ? `<section class="game-action-card question-compose-card"><span class="eyebrow">ASK</span><div class="voice-question-prompt"><p>Ask your question out loud, then send the numbered prompt.</p><button class="primary-button voice-question-button" data-action="ask" ${canAsk ? "" : "disabled"}>Question #${questionNumber} · End turn</button></div></section>` : `<section class="game-action-card question-compose-card"><span class="eyebrow">ASK</span><div class="turn-action-group"><label class="field-label" for="question-input">Ask a yes-or-no question</label><textarea class="question-input" id="question-input" maxlength="180" placeholder="Type your question…"></textarea><button class="primary-button turn-action-button" data-action="ask" ${canAsk ? "" : "disabled"}>Ask and end turn <span>↗</span></button></div></section>`;
    const guessComposer = `<section class="game-action-card guess-compose-card"><span class="eyebrow">GUESS</span><div class="turn-action-group"><label class="field-label" for="guess-select">Choose a character</label><select id="guess-select" class="guess-select"><option value="">Choose a character…</option>${(currentState.deck || []).map(item => `<option value="${esc(item.id)}" class="${wrong.has(item.id) ? "guess-wrong" : eliminated.has(item.id) ? "guess-eliminated" : "guess-available"}" style="color:${wrong.has(item.id) ? "#f08084" : eliminated.has(item.id) ? "#efb76a" : "#7bd49b"}" ${wrong.has(item.id) ? "disabled" : ""}>${wrong.has(item.id) ? "🔴" : eliminated.has(item.id) ? "🟠" : "🟢"} ${esc(item.name)}${wrong.has(item.id) ? " · Wrong guess" : eliminated.has(item.id) ? " · Eliminated" : " · Available"}</option>`).join("")} </select><button class="primary-button turn-action-button" data-action="guess" ${canGuess ? "" : "disabled"}>Guess and end turn <span>↗</span></button></div></section>`;
    const myStats = currentState.myStats || {};
    const stats = `<div class="round-stats"><span>YOUR STATS<b>${Number(myStats.questions || 0)} questions · ${Number(myStats.answers || 0)} answers</b><b>${Number(myStats.guesses || 0)} guesses · ${Number(myStats.wrongGuesses || 0)} wrong</b></span></div>`;
    const wrongAnnouncement = currentState.lastGuess && !currentState.lastGuessCorrect && Date.now() < Number(session.wrongNoticeUntil || 0) ? `<div class="wrong-guess-note" role="status"><b>Wrong guess</b><span>${esc(displaySeatName(currentState.lastGuessBy))} guessed ${esc(characterById(currentState.lastGuess)?.name || "a character")}. It was incorrect, so the turn has passed to ${esc(displaySeatName(currentState.currentTurn))}.</span></div>` : "";
    return `<div class="game-layout"><section class="board-panel"><div class="board-heading"><div><span class="eyebrow">YOUR PRIVATE BOARD</span><h3>Characters</h3></div><div class="board-counts"><span class="board-counter available"><b data-board-count="available">${candidates.length}</b><small>Available</small></span><span class="board-counter eliminated"><b data-board-count="eliminated">${eliminated.size}</b><small>Eliminated</small></span><span class="board-counter wrong"><b data-board-count="wrong">${wrong.size}</b><small>Wrong guess</small></span></div></div><div class="board-legend"><span><i class="legend-dot available"></i>Available</span><span><i class="legend-dot eliminated"></i>Eliminated</span><span><i class="legend-dot wrong"></i>Wrong guess</span></div><div class="character-grid">${(currentState.deck || []).map(item => {
      const character = characterById(item.id);
      return `<button class="character-card ${wrong.has(item.id) ? "incorrect-guess" : eliminated.has(item.id) ? "eliminated" : ""}" data-action="eliminate" data-id="${esc(item.id)}" title="${esc(item.name)}" ${wrong.has(item.id) ? "disabled aria-label='Incorrect guess: permanently marked'" : ""}>${characterPortrait(item.id)}<span>${esc(item.name)}</span><small class="character-tags"><i class="gender-tag ${character.gender}">${character.gender}</i><i class="license-tag ${character.license}">${character.license === "licensed" ? "Licensed" : "Original"}</i></small></button>`;
    }).join("")} </div><p class="board-instruction">Select a card to eliminate it from your possibilities. Select it again to restore it.</p></section><aside class="turn-panel"><div class="turn-overview"><div class="turn-banner ${isMyTurn() ? "yours" : ""}"><span class="turn-indicator"></span><span>${turnText}</span></div>${wrongAnnouncement}<div class="turn-context-grid">${secretPanel}${questionBlock}</div></div><div class="turn-actions"><div class="turn-actions-heading"><span class="eyebrow">YOUR MOVE</span></div>${answerPrompt}<div class="game-action-grid">${questionComposer}${guessComposer}</div></div>${stats}</aside></div>`;
  }
  function renderResult() {
    const won = currentState.winner === session.seat;
    const myCharacter = characterById(session.character);
    const opponentCharacter = characterById(currentState.opponentCharacter);
    const mySecret = myCharacter?.name || "Unknown";
    const opponent = opponentCharacter?.name || "Unknown";
    return `<section class="result-simple ${won ? "result-win" : "result-loss"}"><div class="result-emblem" aria-hidden="true">${won ? "✓" : "×"}</div><span class="eyebrow">ROUND COMPLETE</span><h3>${won ? "Victory" : "Defeat"}</h3><p class="result-caption">${won ? "You guessed the hidden character." : "Your opponent guessed your character."}</p><div class="result-picks"><article class="result-pick-card"><span class="result-pick-label">YOUR PICK</span>${myCharacter ? characterPortrait(myCharacter.id, "result-portrait") : ""}<b>${esc(mySecret)}</b></article><article class="result-pick-card"><span class="result-pick-label">OPPONENT’S PICK</span>${opponentCharacter ? characterPortrait(opponentCharacter.id, "result-portrait") : ""}<b>${esc(opponent)}</b></article></div><div class="room-actions result-actions"><button class="primary-button" data-action="rematch">Play again</button><button class="soft-button" data-action="exit">Exit</button></div></section>`;
  }
  function bindRoomActions(scope = room) {
    const hostForm = scope.querySelector("#rematch-host-form");
    if (hostForm) {
      const modeSelect = scope.querySelector("#rematch-mode"),
        deckSelect = scope.querySelector("#rematch-deck-size"),
        characterSelect = scope.querySelector("#rematch-host-character"),
        genderSelect = scope.querySelector("#rematch-gender"),
        licenseSelect = scope.querySelector("#rematch-license");
      const draft = session.rematchDraft || {
        mode: currentState.mode,
        deckSize: currentState.deckSize,
        genderFilter: currentState.genderFilter || "all",
        licenseFilter: currentState.licenseFilter || "all",
        character: session.character
      };
      modeSelect.value = draft.mode;
      genderSelect.value = draft.genderFilter || "all";
      licenseSelect.value = draft.licenseFilter || "all";
      const filtersNow = () => ({
        gender: genderSelect.value,
        license: licenseSelect.value
      });
      updateDeckSizeSelect(deckSelect, modeSelect.value, draft.deckSize, filtersNow());
      fillCharacterSelect(characterSelect, modeSelect.value, draft.character, filtersNow());
      const saveDraft = () => {
        session.rematchDraft = {
          mode: modeSelect.value,
          deckSize: Number(deckSelect.value),
          genderFilter: genderSelect.value,
          licenseFilter: licenseSelect.value,
          character: characterSelect.value
        };
        saveSession(session);
      };
      const refreshRematchRoster = () => {
        updateDeckSizeSelect(deckSelect, modeSelect.value, deckSelect.value, filtersNow());
        fillCharacterSelect(characterSelect, modeSelect.value, "", filtersNow());
        saveDraft();
        if (privateContext?.selectId === "rematch-host-character") {
          privateContext.mode = modeSelect.value;
          privateContext.filters = filtersNow();
          privateContext.pendingChoice = "";
          renderPrivatePicker();
        }
      };
      deckSelect.addEventListener("change", saveDraft);
      characterSelect.addEventListener("change", saveDraft);
      modeSelect.addEventListener("change", refreshRematchRoster);
      genderSelect.addEventListener("change", refreshRematchRoster);
      licenseSelect.addEventListener("change", refreshRematchRoster);
      hostForm.addEventListener("submit", event => {
        event.preventDefault();
        const button = hostForm.querySelector("button[type=submit]");
        const fields = {
          mode: modeSelect.value,
          deckSize: Number(deckSelect.value),
          genderFilter: genderSelect.value,
          licenseFilter: licenseSelect.value,
          hostCharacter: characterSelect.value
        };
        if (!fields.hostCharacter) {
          setNotice("Choose your secret character first, using the private window if Streamer Mode is on.");
          return;
        }
        withBusy(button, () => perform("rematchSetup", fields), "Saving setup…");
      });
    }
    const guestForm = scope.querySelector("#rematch-guest-form");
    if (guestForm) {
      const characterSelect = scope.querySelector("#rematch-guest-character");
      const draft = session.rematchDraft || {
        mode: currentState.mode,
        deckSize: currentState.deckSize,
        character: session.character
      };
      fillCharacterSelect(characterSelect, currentState.mode, draft.character, {
        gender: currentState.genderFilter || "all",
        license: currentState.licenseFilter || "all"
      });
      characterSelect.addEventListener("change", () => {
        session.rematchDraft = {
          mode: currentState.mode,
          deckSize: Number(currentState.deckSize),
          character: characterSelect.value
        };
        saveSession(session);
      });
      guestForm.addEventListener("submit", event => {
        event.preventDefault();
        const button = guestForm.querySelector("button[type=submit]"),
          guestCharacter = characterSelect.value;
        if (!guestCharacter) {
          setNotice("Choose your secret character first, using the private window if Streamer Mode is on.");
          return;
        }
        withBusy(button, () => perform("rematchCharacter", {
          guestCharacter
        }), "Saving character…");
      });
    }
    const voiceToggle = scope.querySelector("#voice-chat-toggle");
    if (voiceToggle) voiceToggle.addEventListener("change", () => {
      const enabled = voiceToggle.checked;
      submitOptimistic("voiceChat", {
        enabled
      }, () => {
        currentState.voiceChat = enabled;
      });
    });
    scope.querySelectorAll("[data-action]").forEach(button => button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "reopen-private") {
        setStreamerMode(true, {
          screen: "game"
        });
        return;
      }
      if (action === "select-guest") {
        withBusy(button, () => perform("selectGuest", {
          playerTicket: button.dataset.ticket
        }), "Starting selected game…");
        return;
      }
      if (action === "quick-match") {
        withBusy(button, () => perform("quickMatch", {
          accept: button.dataset.accept === "yes"
        }), button.dataset.accept === "yes" ? "Finding a match…" : "Sending response…");
        return;
      }
      if (action === "eliminate") {
        const id = button.dataset.id;
        if ((currentState.wrongGuesses || []).includes(id)) return;
        localEliminated ||= new Set(currentState.eliminated || []);
        if (localEliminated.has(id)) localEliminated.delete(id);else localEliminated.add(id);
        saveEliminationDraft();
        updateBoardDraftUI(id);
        return;
      }
      if (["ask", "answer", "kick"].includes(action)) {
        if (backgroundMutation || busy) return;
        let fields = {};
        if (action === "ask") {
          const question = currentState.voiceChat ? `Question #${Number(currentState.questionNumber || 0) + 1}` : scope.querySelector("#question-input")?.value.trim();
          if (!question) {
            setNotice("Write a question first.");
            return;
          }
          fields = {
            question
          };
        } else if (action === "answer") fields = {
          answer: button.dataset.value
        };
        const mutate = () => {
          if (action === "ask") Object.assign(currentState, {
            question: fields.question,
            questionBy: session.seat,
            answer: "",
            turnAnswered: false,
            currentTurn: session.seat === "host" ? "guest" : "host"
          });
          if (action === "answer") Object.assign(currentState, {
            answer: fields.answer,
            turnAnswered: true
          });
          if (action === "kick") Object.assign(currentState, {
            guestName: "",
            guestReady: false
          });
          clearNotice();
        };
        submitOptimistic(action, fields, mutate);
        return;
      }
      withBusy(button, async () => {
        if (action === "copy-link") {
          await navigator.clipboard.writeText(shareUrl());
          setNotice("Invite link copied.", "success");
          return;
        }
        if (action === "guess") {
          const characterId = scope.querySelector("#guess-select")?.value;
          if (!characterId) throw new Error("Choose a character for your guess.");
          return perform("guess", {
            characterId
          });
        }
        if (action === "start") {
          if (backgroundMutation) throw new Error("Wait for the lobby setting to finish saving, then start the game.");
          return perform("start");
        }
        if (action === "kick") {
          await perform("kick");
          setNotice("The player has been removed. The invite link is open again.", "success");
          return;
        }
        if (action === "rematch") return perform("rematch");
        if (action === "exit") {
          if (session.seat === "queue") await callApi("queueLeave", {
            id: session.id,
            ticket: session.ticket
          });else await perform("leave", {}, false);
          clearSession();
        }
      }, action === "copy-link" ? "Copying…" : "Working…");
    }));
  }
  async function createRoom(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const filters = currentFilters(event.currentTarget);
    const data = {
      hostName: String(form.get("name")).trim(),
      mode: form.get("mode"),
      deckSize: Number(form.get("deckSize")),
      genderFilter: filters.gender,
      licenseFilter: filters.license,
      hostCharacter: $("#host-character").value,
      joinMode: form.get("joinMode") || "first"
    };
    if (!data.hostCharacter) return setNotice("Choose your secret character first.");
    const button = event.currentTarget.querySelector("button[type=submit]");
    await withBusy(button, async () => {
      const credentials = {
        id: randomRoomId(),
        ticket: randomToken(40)
      };
      await callApi("create", {
        ...data,
        ...credentials
      });
      saveSession({
        ...credentials,
        seat: "host",
        character: data.hostCharacter,
        streamerMode
      });
      persistUrlFromRoom();
      const state = await callApi("state", {
        id: session.id,
        ticket: session.ticket,
        seat: session.seat
      });
      applyState(state.state);
      renderRoom();
      syncPolling();
    }, "Creating room…");
  }
  async function joinRoom(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = {
      id: pendingRoomId,
      guestName: String(form.get("name")).trim(),
      guestCharacter: $("#guest-character").value
    };
    if (!data.guestCharacter) {
      setNotice("Choose your secret character in the private window first.");
      return;
    }
    const button = event.currentTarget.querySelector("button[type=submit]");
    await withBusy(button, async () => {
      const credentials = {
        ticket: pendingQueueTicket || randomToken(40)
      };
      const seat = pendingQueueTicket ? "queue" : "guest";
      await callApi(pendingQueueTicket ? "queueReady" : "join", {
        ...data,
        ...credentials
      });
      saveSession({
        id: data.id,
        ...credentials,
        seat,
        character: data.guestCharacter,
        streamerMode,
        queueStatus: "",
        queueName: data.guestName,
        joinFormPending: false
      });
      pendingQueueTicket = "";
      pendingQueueName = "";
      pendingQueueCharacter = "";
      persistUrlFromRoom();
      const state = await callApi("state", {
        id: session.id,
        ticket: session.ticket,
        seat: session.seat
      });
      applyState(state.state);
      renderRoom();
      syncPolling();
    }, "Joining room…");
  }
  async function loadInviteRoom(id) {
    pendingRoomId = id;
    showJoiningRoom(id);
    const hostTicket = new URLSearchParams(location.search).get("host");
    if (session && session.id === id && !(session.seat === "queue" && session.joinFormPending)) {
      await refreshState();
      return;
    }
    if (hostTicket) {
      saveSession({
        id,
        seat: "host",
        ticket: hostTicket,
        character: ""
      });
      await refreshState();
      if (currentState) {
        persistUrlFromRoom();
        return;
      }
      clearSession();
    }
    try {
      const result = await callApi("preview", {
        id
      });
      const state = result.state;
      const listJoin = state.joinMode === "list";
      pendingRoomFilters = {
        gender: state.genderFilter || "all",
        license: state.licenseFilter || "all"
      };
      const savedQueue = session?.id === id && session.seat === "queue" ? session : null;
      if (state.status !== "waiting" && !(listJoin && savedQueue?.joinFormPending) || !listJoin && state.guestName) {
        showJoinError("This room is already full or the game has started. Ask the host for an available room link.");
        return;
      }
      pendingQueueName = savedQueue?.queueName || "";
      pendingQueueCharacter = savedQueue?.character || "";
      if (listJoin) {
        pendingQueueTicket = savedQueue?.ticket || randomToken(40);
        if (!savedQueue) await callApi("queueEnter", {
          id,
          ticket: pendingQueueTicket
        });
        saveSession({
          id,
          ticket: pendingQueueTicket,
          seat: "queue",
          character: pendingQueueCharacter,
          queueName: pendingQueueName,
          streamerMode,
          queueStatus: "joining",
          joinFormPending: true
        });
      }
      pendingRoomMode = state.mode;
      home.hidden = true;
      $("#hero").hidden = true;
      room.hidden = false;
      const allowed = rosterFor(state.mode, state.genderFilter || "all", state.licenseFilter || "all");
      const savedName = pendingQueueName || "";
      const savedCharacter = pendingQueueCharacter || "";
      room.innerHTML = `<div class="panel room-panel"><div class="room-top"><div><span class="eyebrow">JOIN ROOM · ${esc(state.modeLabel)}</span><h2>Choose your character</h2><span class="room-code">ROOM ${esc(state.id)}</span></div><button class="soft-button" id="cancel-join">Cancel</button></div><p class="subtle" style="margin:14px 0 20px">${listJoin ? "You’re on the host’s player list. Finish setup to show your name and become ready." : "Pick the character your opponent will try to identify. Your choice stays hidden until the round ends."}<br>Roster filters: ${esc((state.genderFilter || "all") === "all" ? "Any gender" : state.genderFilter)} · ${esc((state.licenseFilter || "all") === "all" ? "Any license" : state.licenseFilter)}</p><form id="join-form"><label class="field-label" for="guest-name">Your name</label><input id="guest-name" name="name" maxlength="20" placeholder="Enter a nickname" value="${esc(savedName)}" required><label class="field-label" for="guest-character">Your secret character</label><select id="guest-character" name="character" required><option value="">Choose a character…</option>${allowed.map(c => `<option value="${esc(c.id)}" ${c.id === savedCharacter ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select><p class="streamer-hidden-note" data-streamer-note hidden>Your choice is hidden from the stream. Select it in the private window.</p><label class="streamer-toggle"><input class="streamer-toggle-input" type="checkbox" data-secret-select="guest-character"><span class="streamer-switch" aria-hidden="true"></span><span><b>Streamer Mode</b><small>Keep your character off stream</small></span></label><button class="primary-button full-button" type="submit">${listJoin ? "Save setup and get ready ✓" : "Join and get ready ✓"}</button></form></div>`;
      syncStreamerControls();
      $("#guest-name").addEventListener("input", () => {
        if (session?.seat === "queue") {
          session.queueName = $("#guest-name").value;
          saveSession(session);
        }
      });
      $("#guest-character").addEventListener("change", () => {
        if (session?.seat === "queue") {
          session.character = $("#guest-character").value;
          saveSession(session);
        }
      });
      $("#cancel-join").onclick = async () => {
        pendingRoomId = "";
        if (session?.seat === "queue") {
          try {
            await callApi("queueLeave", {
              id: session.id,
              ticket: session.ticket
            });
          } catch (_) {}
          clearSession();
        } else {
          pendingQueueTicket = "";
          setStreamerMode(false);
          history.replaceState({}, "", location.pathname);
          clearNotice();
          showHome();
        }
      };
      $("#join-form").addEventListener("submit", joinRoom);
    } catch (error) {
      showJoinError(error.message || "The room link could not be loaded.");
    }
  }
  $("#mode-options").addEventListener("change", event => {
    if (event.target.name === "mode") {
      updateChoiceCards();
      const filters = currentFilters($("#create-form"));
      updateDeckSizeOptions(event.target.value, undefined, filters);
      fillCharacterSelect($("#host-character"), event.target.value, "", filters);
      updateRosterMatchCount();
    }
  });
  $("#mode-options").addEventListener("change", event => {
    if (event.target.name === "mode" && privateContext?.selectId === "host-character") {
      privateContext.mode = event.target.value;
      privateContext.filters = currentFilters($("#create-form"));
      renderPrivatePicker();
    }
  });
  function updateRosterMatchCount() {
    const filters = currentFilters($("#create-form")),
      mode = $("#mode-options input[name='mode']:checked")?.value || "mixed",
      count = rosterFor(mode, filters.gender, filters.license).length;
    const label = $("#roster-match-count");
    if (label) label.textContent = `${count} characters match · maximum ${count} cards`;
  }
  function refreshHostFilters() {
    const mode = $("#mode-options input[name='mode']:checked")?.value || "mixed",
      filters = currentFilters($("#create-form"));
    updateDeckSizeOptions(mode, undefined, filters);
    fillCharacterSelect($("#host-character"), mode, "", filters);
    updateRosterMatchCount();
    if (privateContext?.selectId === "host-character") {
      privateContext.filters = filters;
      privateContext.pendingChoice = "";
      renderPrivatePicker();
    }
  }
  $("#gender-filter").addEventListener("change", refreshHostFilters);
  $("#license-filter").addEventListener("change", refreshHostFilters);
  fillCharacterSelect($("#host-character"), "mixed", "", {
    gender: "all",
    license: "all"
  });
  updateDeckSizeOptions("mixed", 20, {
    gender: "all",
    license: "all"
  });
  updateRosterMatchCount();
  updateChoiceCards();
  setHostStep(1);
  initHostSteps();
  syncStreamerControls();
  $("#create-form").addEventListener("submit", createRoom);
  document.addEventListener("change", event => {
    const toggle = event.target;
    if (!toggle.matches(".streamer-toggle-input")) return;
    if (!toggle.checked) {
      setStreamerMode(false);
      return;
    }
    const selectId = toggle.dataset.secretSelect;
    const mode = selectId === "host-character" ? document.querySelector('input[name="mode"]:checked')?.value || "mixed" : selectId === "rematch-host-character" ? session?.rematchDraft?.mode || currentState?.mode || "mixed" : selectId === "rematch-guest-character" ? currentState?.mode || "mixed" : pendingRoomMode;
    const filters = selectId === "host-character" ? currentFilters($("#create-form")) : selectId.startsWith("rematch-") ? {
      gender: session?.rematchDraft?.genderFilter || currentState?.genderFilter || "all",
      license: session?.rematchDraft?.licenseFilter || currentState?.licenseFilter || "all"
    } : pendingRoomFilters;
    setStreamerMode(true, {
      selectId,
      mode,
      filters
    });
  });
  $("#invite-form").addEventListener("submit", event => {
    event.preventDefault();
    const id = roomIdFromValue($("#invite-url").value);
    if (!id) {
      setNotice("Paste a valid room invitation link or a 9-character room code.");
      return;
    }
    setStreamerMode(false);
    if (session) clearSession();else removeStoredSession();
    pendingRoomId = id;
    history.replaceState({}, "", `${location.pathname}?r=${encodeURIComponent(id)}`);
    loadInviteRoom(id);
  });
  const params = new URLSearchParams(location.search);
  const roomId = (params.get("r") || params.get("room") || "").toUpperCase();
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && session) refreshState(true);
  });
  if (session && (!roomId || roomId === session.id)) loadInviteRoom(session.id);else if (roomId) {
    closePrivateWindow();
    removeStoredSession();
    session = null;
    streamerMode = false;
    loadInviteRoom(roomId);
  }
  window.addEventListener('offline', () => setConnectionStatus(false));
  updateSessionStorageNotice();
})().catch(error => {
  console.error(error);
  const notice = document.getElementById('notice');
  notice.hidden = false;
  notice.textContent = 'Shared definitions could not be loaded. Reload the page to try again.';
  document.querySelectorAll('form button').forEach(button => button.disabled = true);
});
