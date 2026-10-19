(() => {
  "use strict";

  const DEFAULT_API_URL = "https://script.google.com/macros/s/AKfycbzc3T5Ali7BTrNuybshDjYyA2Xb_bk5xpqZ-xKRzK6RfoIFESuXVwfWy0mUS8JU1EVEyQ/exec";
  const PLACEHOLDER_IMAGE = "https://deadbydaylight.wiki.gg/images/IconHelp_killers.png";
  const SESSION_KEY = "dbdGuessWhoSession";
  const CHARACTER_DATA = window.GUESS_WHO_ROSTER || {};
  const KILLER_IMAGES = CHARACTER_DATA.killerPortraits || {};
  const SURVIVORS = CHARACTER_DATA.survivorRoster || [];
  const KILLERS = Object.entries(KILLER_IMAGES).filter(([name]) => name !== "The Judgement").map(([name, image]) => ({ id: `killer:${slug(name)}`, name, kind: "killer", image }));
  const ROSTER = [...KILLERS, ...SURVIVORS.map(item => ({ id: `survivor:${item.id}`, name: item.name, kind: "survivor", image: item.icon }))];
  const $ = selector => document.querySelector(selector);
  const home = $("#home-view"), room = $("#room-view"), notice = $("#notice");
  let session = readSession();
  let pendingRoomId = "";
  let pendingRoomMode = "mixed";
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

  function slug(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function esc(value) { return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])); }
  function readSession() { try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; } }
  function saveSession(value) { session = value; localStorage.setItem(SESSION_KEY, JSON.stringify(value)); }
  function clearSession() { closePrivateWindow(); session = null; currentState = null; localEliminated = null; streamerMode = false; localStorage.removeItem(SESSION_KEY); history.replaceState({}, "", location.pathname); stopPolling(); syncStreamerControls(); showHome(); }
  function randomToken(length, alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789") {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return [...bytes].map(value => alphabet[value % alphabet.length]).join("");
  }
  function randomRoomId() { return randomToken(9, "ABCDEFGHJKLMNPQRSTUVWXYZ23456789").toUpperCase(); }
  function setNotice(message, type = "error") { notice.textContent = message; notice.className = `notice${type === "success" ? " success" : ""}`; notice.hidden = false; }
  function clearNotice() { notice.hidden = true; notice.textContent = ""; }
  function rosterFor(mode) { return ROSTER.filter(character => mode === "mixed" || character.kind === (mode === "killers" ? "killer" : "survivor")); }
  function fillCharacterSelect(select, mode, chosen = "") {
    const list = rosterFor(mode);
    select.innerHTML = `<option value="">Choose a character…</option>${list.map(c => `<option value="${esc(c.id)}" ${c.id === chosen ? "selected" : ""}>${esc(c.name)}</option>`).join("")}`;
  }
  function syncStreamerControls() {
    document.querySelectorAll(".streamer-toggle-input").forEach(toggle => { toggle.checked = streamerMode; });
    document.querySelectorAll(".streamer-toggle-input").forEach(toggle => {
      const select = document.getElementById(toggle.dataset.secretSelect);
      if (select) { select.disabled = streamerMode; select.hidden = streamerMode; }
    });
    document.querySelectorAll("[data-streamer-note]").forEach(note => { note.hidden = !streamerMode; });
  }
  function privatePopupShell(content) {
    if (!privateWindow || privateWindow.closed) return;
    privateWindow.document.open();
    privateWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Private Streamer Mode</title><style>
      *{box-sizing:border-box}body{margin:0;min-height:100vh;background:#111219;color:#f2f0ed;font:14px Inter,system-ui,sans-serif;padding:22px;background-image:radial-gradient(ellipse at 50% 0,#35232b,transparent 60%)}main{max-width:440px;margin:0 auto}.eyebrow{font-size:10px;letter-spacing:.16em;color:#e48d91;font-weight:800}h1{font-size:24px;margin:8px 0 6px}p{color:#aaabb4;line-height:1.5;margin:0 0 18px}label{display:block;font-size:12px;font-weight:700;margin:18px 0 7px}select,button{width:100%;font:inherit;color:#f7f3f1;border:1px solid #ffffff1c;border-radius:10px;background:#1d2029;padding:12px}button{margin-top:16px;border:0;background:linear-gradient(135deg,#e6525d,#ae3448);font-weight:800;cursor:pointer}.preview{display:flex;align-items:center;gap:14px;margin-top:16px;padding:12px;border:1px solid #ffffff14;border-radius:12px;background:#191b23;min-height:88px}.preview img{width:62px;height:62px;object-fit:cover;border-radius:9px;background:#282a32}.preview b{font-size:14px}.feedback{margin-top:12px;color:#a8dfba;font-size:12px}.secret-card{text-align:center;padding:18px;border:1px solid #ffffff16;border-radius:14px;background:#191b23}.secret-card img{width:min(100%,330px);aspect-ratio:1;object-fit:cover;border-radius:12px;display:block;margin:16px auto}.secret-card h2{font-size:23px;margin:0}.secret-card p{margin:6px 0 0;font-size:12px}.private-info{margin-top:14px;padding:16px;border:1px solid #ffffff16;border-radius:14px;background:#191b23}.private-info label{margin:0 0 7px;color:#e4a0a3}.private-info>b{font-size:18px}.private-info button{font-size:12px;padding:10px;margin:12px 0 18px}.private-info .question-label{margin-top:0}.private-info p{margin:0 0 14px;padding:11px;border-radius:9px;background:#11131a}.check-row{display:flex;gap:9px;align-items:center;margin:0;color:#eee;font-weight:600}.check-row input{accent-color:#e45d68;width:16px;height:16px}
      .picker-stage{margin-top:16px;padding:14px;border:1px solid #ffffff18;border-radius:16px;background:linear-gradient(145deg,#1a1a1c,#111);box-shadow:0 16px 35px #0005}.picker-preview{display:grid;grid-template-columns:128px 1fr;align-items:center;gap:16px;min-height:128px}.picker-art{position:relative;display:grid;place-items:center;width:128px;aspect-ratio:1;border:1px solid #c41e3a77;border-radius:14px;overflow:hidden;background:radial-gradient(circle at 45% 35%,#451b25,#111 72%);box-shadow:0 8px 24px #0006}.picker-art img{width:100%;height:100%;object-fit:cover}.picker-art .preview-question{font-size:52px;font-weight:800;color:#ec7b85;text-shadow:0 0 22px #dd405666}.picker-copy small{display:block;margin-bottom:7px;color:#e36b78;font-size:9px;font-weight:800;letter-spacing:.16em}.picker-copy b{display:block;font-size:18px;line-height:1.2}.picker-copy p{margin:7px 0 0;font-size:12px}.picker-save{min-height:48px;margin-top:14px;background:linear-gradient(135deg,#c41e3a,#8b0000);box-shadow:0 8px 23px #9e123b40}.picker-save.saved{background:linear-gradient(135deg,#246d43,#17452b);box-shadow:0 8px 23px #2ecc7125}.picker-save:disabled{opacity:.45;cursor:not-allowed}.check-row{align-items:flex-start;line-height:1.4}.check-row input:disabled{opacity:.35}.question-privacy{margin-top:12px;padding-top:12px;border-top:1px solid #ffffff14}.private-info .question-preview{margin:8px 0 12px;color:#ddd;background:#101010;font-size:12px}.private-info .actual-question-note{display:block;margin-top:5px;color:#d3b279;font-size:10px;font-weight:500}.keep-window-open{margin:0 0 14px;padding:10px 12px;border:1px solid #c41e3a66;border-radius:9px;background:#c41e3a17;color:#f1b0b6;font-size:12px;font-weight:750;text-align:center}.secret-card{background:#111;border-color:#ffffff19}.secret-card img{border:1px solid #ffffff20}.private-info{background:#111;border-color:#ffffff19}.private-info label{color:#e56c79}.private-info button{background:linear-gradient(135deg,#c41e3a,#8b0000)}.private-info p{background:#0b0b0d}
    </style></head><body>${content}</body></html>`);
    privateWindow.document.close();
  }
  function renderPrivatePicker() {
    if (!privateContext || !privateContext.selectId || !privateWindow || privateWindow.closed) return;
    privateContext.screen = "picker";
    const mainSelect = document.getElementById(privateContext.selectId);
    const selected = privateContext.pendingChoice ?? mainSelect?.value ?? "";
    const characters = rosterFor(privateContext.mode);
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
    popupSelect.addEventListener("change", () => { privateContext.pendingChoice = popupSelect.value; privateContext.savedChoice = ""; updatePreview(); });
    updatePreview();
    privateWindow.document.getElementById("private-save").addEventListener("click", () => {
      if (!popupSelect.value || !mainSelect) return;
      mainSelect.value = popupSelect.value;
      privateContext.pendingChoice = popupSelect.value;
      privateContext.savedChoice = popupSelect.value;
      updatePreview();
      mainSelect.dispatchEvent(new Event("change", { bubbles: true }));
      const note = mainSelect.parentElement.querySelector("[data-streamer-note]");
      if (note) note.textContent = "Secret saved. It will be sent when you create or join the room.";
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
    const showQuestion = Boolean(session.streamerRevealQuestion);
    const showQuestionText = Boolean(session.streamerShowQuestionText);
    privatePopupShell(`<main><div class="keep-window-open">Keep this window open while playing.</div><span class="eyebrow">PRIVATE WINDOW · NOT SHOWN ON STREAM</span><section class="secret-card"><p>Your secret character</p>${character ? `${portraitMarkup(character.image, character.name, "")}<h2>${esc(character.name)}</h2>` : "<h2>Character unavailable</h2>"}</section><section class="private-info"><label>Opponent</label><b>${esc(opponentName || "Opponent")}</b><button id="reveal-name" type="button">${session.streamerRevealName ? "Hide name on main page" : "Reveal name on main page"}</button><label class="question-label">Latest question</label><p class="question-preview">${esc(questionText)}</p><div class="question-privacy"><label class="check-row"><input id="reveal-question" type="checkbox" ${showQuestion ? "checked" : ""}> Show a question card on the main page</label><label class="check-row"><input id="reveal-question-text" type="checkbox" ${showQuestionText ? "checked" : ""} ${showQuestion ? "" : "disabled"}> Show the exact question text<small class="actual-question-note">When off, a safe placeholder appears instead.</small></label></div></section></main>`);
    privateWindow.document.getElementById("reveal-name").addEventListener("click", () => {
      session.streamerRevealName = !session.streamerRevealName; saveSession(session); renderRoom();
    });
    privateWindow.document.getElementById("reveal-question").addEventListener("change", event => {
      session.streamerRevealQuestion = Boolean(event.target.checked);
      if (!session.streamerRevealQuestion) session.streamerShowQuestionText = false;
      saveSession(session); renderRoom();
    });
    privateWindow.document.getElementById("reveal-question-text").addEventListener("change", event => {
      session.streamerShowQuestionText = Boolean(event.target.checked);
      saveSession(session); renderRoom();
    });
    if (privateContext) { privateContext.screen = "game"; privateContext.signature = JSON.stringify([session.character, opponentName, question, questionBy, currentState?.answer, currentState?.status, session.streamerRevealQuestion, session.streamerShowQuestionText, session.streamerRevealName]); }
  }
  function syncPrivateWindow() {
    if (!streamerMode || !session || !privateWindow || privateWindow.closed) return;
    const opponentSeat = session.seat === "host" ? "guest" : "host";
    const signature = JSON.stringify([session.character, currentState ? seatName(opponentSeat) : "Opponent", currentState?.question, currentState?.questionBy, currentState?.answer, currentState?.status, session.streamerRevealQuestion, session.streamerShowQuestionText, session.streamerRevealName]);
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
    if (session) { session.streamerMode = enabled; saveSession(session); }
    if (!enabled) closePrivateWindow(!popupClosed);
    syncStreamerControls();
    if (enabled && context) {
      privateContext = context;
      privateWindow = window.open("", "dbdStreamerPrivate", "popup=yes,width=500,height=820,resizable=yes,scrollbars=yes");
      if (!privateWindow) {
        streamerMode = false;
        if (session) { session.streamerMode = false; saveSession(session); }
        syncStreamerControls();
        setNotice("Your browser blocked the private window. Allow pop-ups for this site and turn Streamer Mode on again.");
        return false;
      }
      if (session) renderPrivateCharacter();
      else renderPrivatePicker();
      privateWindowWatch = setInterval(() => {
        if (privateWindow?.closed) setStreamerMode(false, null, true);
      }, 500);
    } else if (enabled && privateWindow && !privateWindow.closed) {
      if (session) renderPrivateCharacter();
      else renderPrivatePicker();
    }
    if (session && currentState) renderRoom();
    return true;
  }
  function updateChoiceCards() {
    document.querySelectorAll(".choice-card").forEach(card => card.classList.toggle("selected", card.querySelector("input").checked));
  }
  function showHome() { room.hidden = true; home.hidden = false; $("#hero").hidden = false; if (pollTimer) stopPolling(); }
  function showRoom() { home.hidden = true; room.hidden = false; $("#hero").hidden = true; }
  function stopPolling() { if (pollTimer) clearInterval(pollTimer); pollTimer = null; pollDelay = 0; }
  function saveEliminationDraft() {
    if (!session || !localEliminated) return;
    session.localEliminated = [...localEliminated];
    saveSession(session);
  }
  function localStats() {
    const stats = session?.localStats || {};
    return { questions: Number(stats.questions) || 0, answers: Number(stats.answers) || 0, guesses: Number(stats.guesses) || 0, wrongGuesses: Number(stats.wrongGuesses) || 0 };
  }
  function incrementLocalStats(key, amount = 1) {
    if (!session) return;
    const stats = localStats();
    stats[key] = Math.max(0, stats[key] + amount);
    session.localStats = stats;
    saveSession(session);
  }
  function applyState(next) {
    const previousStatus = currentState?.status;
    const roundKey = Number(next.roundStartedAt) || 0;
    const firstSeenRound = Boolean(session && !Object.prototype.hasOwnProperty.call(session, "streamerRoundStartedAt"));
    const startedNewRound = next.status === "playing" && ((previousStatus && previousStatus !== "playing") || firstSeenRound || Number(session?.streamerRoundStartedAt || 0) !== roundKey);
    const localRoundChanged = next.status === "playing" && roundKey && Number(session?.localRoundStartedAt || 0) !== roundKey;
    if (startedNewRound && session) { session.streamerRevealName = false; session.streamerRevealQuestion = false; session.streamerShowQuestionText = false; session.streamerRoundStartedAt = roundKey; }
    if (localRoundChanged && session) {
      const firstLocalRound = !Number(session.localRoundStartedAt || 0);
      const savedBoard = firstLocalRound ? (session.localEliminated || session.pendingEliminated || next.eliminated || []) : [];
      session.localRoundStartedAt = roundKey;
      session.localEliminated = [...savedBoard];
      session.localWrongGuesses = [];
      if (!firstLocalRound) session.localStats = { questions: 0, answers: 0, guesses: 0, wrongGuesses: 0 };
      localEliminated = new Set(savedBoard);
    } else if (localEliminated === null) localEliminated = new Set(session?.localEliminated || []);
    next.eliminated = [...(localEliminated || [])];
    next.wrongGuesses = [...(session?.localWrongGuesses || [])];
    next.myStats = localStats();
    if (session && (localRoundChanged || startedNewRound)) saveSession(session);
    currentState = next;
  }
  function syncPolling() {
    let delay = 0;
    if (session && currentState) {
      if (currentState.status === "waiting") delay = 6000;
      else if (currentState.status === "finished") delay = 6000;
      else if (currentState.status === "playing" && (!isMyTurn() || (currentState.question && !currentState.turnAnswered))) delay = 5000;
    }
    if (delay === pollDelay && pollTimer) return;
    stopPolling();
    if (delay) { pollDelay = delay; pollTimer = setInterval(() => refreshState(true), delay); }
  }
  function persistUrlFromRoom() {
    if (!session) return;
    const url = new URL(location.href);
    url.searchParams.set("r", session.id);
    url.searchParams.delete("room");
    url.searchParams.delete("api");
    if (session.seat === "host") { url.searchParams.set("host", session.ticket); url.searchParams.set("character", session.character); }
    else { url.searchParams.delete("host"); url.searchParams.delete("character"); }
    history.replaceState({}, "", url);
  }

  function callApi(action, fields = {}) {
    const endpoint = DEFAULT_API_URL;
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:\?.*)?$/.test(endpoint)) return Promise.reject(new Error("That does not look like an Apps Script web app URL ending in /exec."));
    if (!["state", "preview"].includes(action)) {
      return fetch(endpoint, { method: "POST", mode: "no-cors", credentials: "omit", redirect: "follow", cache: "no-store", headers: { "Content-Type": "text/plain;charset=UTF-8" }, body: JSON.stringify({ action, ...fields }) })
        .then(() => ({ ok: true }))
        .catch(() => { throw new Error("Could not reach the game service. Check the URL and try again."); });
    }
    return new Promise((resolve, reject) => {
      const callback = `guessWhoCallback_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
      const params = new URLSearchParams({ action, callback, ...Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, typeof value === "string" ? value : JSON.stringify(value)])) });
      const script = document.createElement("script");
      let timeout;
      const finish = () => { clearTimeout(timeout); delete window[callback]; script.remove(); if (activeRequest === script) activeRequest = null; };
      window[callback] = result => { finish(); if (!result || result.ok !== true) reject(new Error(result?.error || "The game service returned an error.")); else resolve(result); };
      script.onerror = () => { finish(); reject(new Error("Could not reach the game service. Check the URL and try again.")); };
      timeout = setTimeout(() => { finish(); reject(new Error("The game service took too long to respond.")); }, 12000);
      script.src = `${endpoint}${endpoint.includes("?") ? "&" : "?"}${params.toString()}`;
      script.referrerPolicy = "no-referrer";
      activeRequest = script;
      document.head.appendChild(script);
    });
  }

  function withBusy(button, task, busyLabel = "Please wait…") {
    if (busy) return;
    busy = true;
    const original = button?.innerHTML;
    if (button) { button.disabled = true; button.innerHTML = `<span class="spinner"></span>${busyLabel}`; }
    clearNotice();
    return Promise.resolve().then(task).catch(error => setNotice(error.message || "Something went wrong.")).finally(() => {
      busy = false;
      if (button?.isConnected) { button.disabled = false; button.innerHTML = original; }
    });
  }

  async function refreshState(quiet = false) {
    if (!session || busy || backgroundMutation || pollInFlight) return;
    pollInFlight = true;
    try {
      const data = await callApi("state", { id: session.id, ticket: session.ticket, seat: session.seat });
      const stateChanged = JSON.stringify(currentState) !== JSON.stringify(data.state);
      applyState(data.state);
      if (stateChanged) renderRoom();
      clearNotice();
      syncPolling();
    } catch (error) {
      if (/invalid|not found|expired/i.test(error.message)) { clearSession(); setNotice("This room session is no longer available. Return to the homepage to create or join another game."); }
      else if (!quiet) setNotice(error.message);
    } finally {
      pollInFlight = false;
    }
  }

  async function perform(action, fields = {}, after = true) {
    if (!session) throw new Error("Your room session has expired. Return to the homepage and join again.");
    const result = await callApi(action, { id: session.id, ticket: session.ticket, seat: session.seat, ...fields });
    if (after) {
      const fresh = await callApi("state", { id: session.id, ticket: session.ticket, seat: session.seat });
      if (action === "guess") {
        const guessWasAccepted = fresh.state.status === "finished" || (fresh.state.status === "playing" && fresh.state.currentTurn !== session.seat && !fresh.state.question);
        if (!guessWasAccepted) throw new Error("The guess was not accepted. Your turn or board may have changed; please try again.");
        incrementLocalStats("guesses");
        if (fresh.state.status !== "finished") {
          session.localWrongGuesses = [...new Set([...(session.localWrongGuesses || []), fields.characterId])];
          incrementLocalStats("wrongGuesses");
        }
      }
      applyState(fresh.state);
      renderRoom();
      syncPolling();
    }
    return result;
  }

  function queueOptimisticAction(action, fields, previousState, previousEliminated) {
    if (backgroundMutation) return;
    backgroundMutation = true;
    const auth = { id: session.id, ticket: session.ticket, seat: session.seat };
    callApi(action, { ...auth, ...fields })
      .then(() => {
        return callApi("state", auth);
      })
      .then(data => {
        const state = data.state;
        const confirmed = action === "ask" ? state.question === fields.question && state.questionBy === session.seat && state.currentTurn !== session.seat
          : action === "answer" ? state.answer === fields.answer && state.currentTurn === session.seat
          : action === "voiceChat" ? Boolean(state.voiceChat) === Boolean(fields.enabled)
          : action === "kick" ? !state.guestName
          : true;
        if (!confirmed) throw new Error("The server did not accept that action. Your board changes are still local; try again.");
        if (action === "ask") incrementLocalStats("questions");
        if (action === "answer") incrementLocalStats("answers");
        applyState(state); renderRoom(); clearNotice();
      })
      .catch(error => {
        currentState = previousState;
        localEliminated = previousEliminated;
        if (session) saveSession(session);
        renderRoom();
        setNotice(error.message || "The update could not be saved.");
      })
      .finally(() => { backgroundMutation = false; syncPolling(); });
  }

  function submitOptimistic(action, fields, mutate) {
    if (backgroundMutation || busy) return;
    const previousState = JSON.parse(JSON.stringify(currentState));
    const previousEliminated = new Set(localEliminated || []);
    mutate();
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
    const countLabel = room.querySelector(".board-heading > span");
    if (countLabel) countLabel.textContent = `${count} possible ${count === 1 ? "character" : "characters"} · tap to eliminate or restore`;
    const select = $("#guess-select");
    if (select) {
      const selected = select.value;
      const deck = currentState.deck || [];
      select.innerHTML = `<option value="">Choose a character…</option>${deck.map(item => `<option value="${esc(item.id)}" class="${wrong.has(item.id) ? "guess-wrong" : eliminated.has(item.id) ? "guess-eliminated" : "guess-available"}" style="color:${wrong.has(item.id) ? "#f08084" : eliminated.has(item.id) ? "#efb76a" : "#7bd49b"}" ${wrong.has(item.id) ? "disabled" : ""}>${wrong.has(item.id) ? "🔴" : eliminated.has(item.id) ? "🟠" : "🟢"} ${esc(item.name)}${wrong.has(item.id) ? " · Wrong guess" : eliminated.has(item.id) ? " · Eliminated" : " · Available"}</option>`).join("")}`;
      if (deck.some(item => item.id === selected)) select.value = selected;
    }
  }

  function characterById(id) { return ROSTER.find(c => c.id === id); }
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
  function seatName(seat) { return seat === "host" ? currentState.hostName : currentState.guestName; }
  function displaySeatName(seat) { return streamerMode && seat !== session.seat && !session.streamerRevealName ? "Opponent" : seatName(seat) || "Opponent"; }
  function seatReady(seat) { return seat === "host" ? currentState.hostReady : currentState.guestReady; }
  function isMyTurn() { return currentState?.currentTurn === session?.seat; }

  function renderRoom() {
    if (!currentState || !session) return;
    const previousQuestion = $("#question-input");
    const questionDraft = previousQuestion?.value || "";
    const questionHadFocus = previousQuestion && document.activeElement === previousQuestion;
    showRoom();
    const state = currentState;
    const selfName = session.seat === "host" ? state.hostName : state.guestName;
    const otherSeat = session.seat === "host" ? "guest" : "host";
    const otherName = seatName(otherSeat);
    const otherReady = seatReady(otherSeat);
    const hostMode = session.seat === "host";
    const bothReady = state.hostReady && state.guestReady;
    const voiceToggle = state.status === "waiting" && hostMode && otherReady ? `<label class="voice-chat-toggle"><input id="voice-chat-toggle" type="checkbox" ${state.voiceChat ? "checked" : ""}><span class="voice-switch"></span><span><b>Voice chat</b></span></label>` : "";
    const header = `<div class="room-top"><div><span class="eyebrow">PRIVATE ROOM · ${esc(state.modeLabel)}</span><h2>${state.status === "playing" ? "The hunt is on" : state.status === "finished" ? "Round complete" : "Waiting for your opponent"}</h2><span class="room-code">ROOM ${esc(state.id)}</span></div><div class="room-actions">${voiceToggle}${state.status === "waiting" && hostMode && otherReady ? `<button class="primary-button" data-action="start">Start game ↗</button>` : ""}${state.status === "waiting" && hostMode && Boolean(state.guestName) ? `<button class="danger-button" data-action="kick">Remove player</button>` : ""}<button class="soft-button" data-action="exit">${state.status === "finished" ? "Exit room" : "Leave room"}</button></div></div>`;
    const players = `<div class="room-grid">${playerCard("host", state)}${playerCard("guest", state)}</div>`;
    const link = state.status === "waiting" && hostMode ? `<div class="room-link-box"><span class="subtle">INVITE LINK</span><input class="${streamerMode ? "streamer-link-blur" : ""}" readonly value="${esc(shareUrl())}" aria-label="Invite link"><button class="secondary-button" data-action="copy-link">Copy link</button></div>` : "";
    let body = "";
    if (state.status === "waiting") body = `<div class="waiting-state"><h3>${bothReady ? "Both players are ready" : hostMode ? otherReady ? "Your opponent is ready" : "Waiting for an opponent" : "You are ready"}</h3><p>${bothReady ? "Start the game when you are ready." : hostMode ? otherReady ? "Choose the game options and start when ready." : "Share your invite link. The first player to join takes the open seat." : "The host will start the game when ready."}</p></div>`;
    else if (state.status === "playing") body = renderGame();
    else body = renderResult();
    const reopenPrivate = streamerMode && (!privateWindow || privateWindow.closed) ? `<button class="secondary-button" data-action="reopen-private">Open private window</button>` : "";
    room.innerHTML = `<div class="panel room-panel">${header}${players}${link}${body}${reopenPrivate}</div>`;
    bindRoomActions();
    syncStreamerControls();
    syncPrivateWindow();
    const nextQuestion = $("#question-input");
    if (nextQuestion) {
      nextQuestion.value = questionDraft;
      if (questionHadFocus) {
        nextQuestion.focus({ preventScroll: true });
        nextQuestion.setSelectionRange(questionDraft.length, questionDraft.length);
      }
    }
  }

  function playerCard(seat, state) {
    const actualName = seat === "host" ? state.hostName : state.guestName;
    const name = streamerMode && seat !== session.seat && !session.streamerRevealName ? "Opponent" : actualName;
    const ready = seat === "host" ? state.hostReady : state.guestReady;
    const characterId = !streamerMode && seat === session.seat ? session.character : "";
    const avatar = characterId ? characterPortrait(characterId, "player-avatar") : `<span class="player-avatar avatar-placeholder">${name ? esc(name.slice(0, 1).toUpperCase()) : "?"}</span>`;
    return `<div class="player-card">${avatar}<div><b>${esc(name || (seat === "host" ? "Host" : "Open seat"))}${seat === session.seat ? " <span class=\"subtle\">(you)</span>" : ""}</b><small>${seat === "host" ? "Room host" : "Challenger"}</small></div><span class="status-pill ${ready ? "ready" : ""}">${ready ? "READY" : name ? "NOT READY" : "WAITING"}</span></div>`;
  }

  function renderGame() {
    const eliminated = localEliminated || new Set(currentState.eliminated || []);
    const wrong = new Set(currentState.wrongGuesses || []);
    const candidates = (currentState.deck || []).filter(item => !eliminated.has(item.id) && !wrong.has(item.id));
    const ownCharacter = characterById(session.character);
    const secretPanel = streamerMode
      ? `<div class="secret-display streamer-secret"><div class="secret-question-mark">?</div><div class="secret-copy"><span>SECRET PICK · STREAMER MODE</span><b>Hidden from the stream</b><small>Your character is shown in the private window.</small></div></div>`
      : `<div class="secret-display">${ownCharacter ? characterPortrait(ownCharacter.id, "secret-portrait") : ""}<div><span>YOUR CHARACTER</span><b>${esc(ownCharacter?.name || "Unavailable")}</b></div></div>`;
    const answered = Boolean(currentState.answer);
    const myQuestion = currentState.questionBy === session.seat;
    const turnText = isMyTurn()
      ? currentState.question && !answered && !myQuestion ? "Your turn to answer"
        : "Your turn: ask or guess"
      : `${esc(displaySeatName(currentState.currentTurn))}'s turn`;
    const canAsk = isMyTurn() && (!currentState.question || answered);
    const canGuess = isMyTurn() && !(currentState.question && !answered && !myQuestion);
    const showIncoming = !streamerMode || myQuestion || session.streamerRevealQuestion;
    const showExactQuestion = !streamerMode || myQuestion || session.streamerShowQuestionText;
    const visibleQuestion = showExactQuestion ? currentState.question : "A question was received. Answer YES or NO below.";
    const questionBlock = currentState.question ? `<section class="question-box ${answered ? "question-answered" : "question-pending"}"><header class="question-heading"><span class="question-icon">?</span><div><small>${myQuestion ? "YOUR QUESTION" : `${esc(displaySeatName(currentState.questionBy))} ASKED`}</small><b>QUESTION #${Number(currentState.questionNumber || 0)}</b></div><span class="question-state">${answered ? "ANSWERED" : "WAITING"}</span></header>${showIncoming ? `<p class="question-text">${esc(visibleQuestion)}</p>${answered ? `<p class="answer-line"><strong>Answer: ${esc(currentState.answer)}</strong></p>` : `<p class="subtle">Waiting for an answer…</p>`}` : `<p class="question-text hidden-question">Question hidden from the stream</p>`}</section>` : "";
    const questionNumber = Number(currentState.questionNumber || 0) + 1;
    const turnControls = currentState.question && !answered && !myQuestion
      ? `<div class="answer-prompt"><p>${currentState.voiceChat ? `${esc(currentState.question)} · answer the voice question` : "Answer the yes-or-no question"}</p><div class="question-answer"><button class="answer-button answer-yes" data-action="answer" data-value="Yes">YES</button><button class="answer-button answer-no" data-action="answer" data-value="No">NO</button></div></div>`
      : canAsk
        ? currentState.voiceChat
          ? `<div class="voice-question-prompt"><p>Ask your question out loud, then send the numbered prompt.</p><button class="primary-button voice-question-button" data-action="ask">Question #${questionNumber} · End turn</button></div>`
          : `<div class="turn-action-group"><label class="field-label" for="question-input">Ask a yes-or-no question</label><textarea class="question-input" id="question-input" maxlength="180" placeholder="Type your question…"></textarea><button class="primary-button turn-action-button" data-action="ask">Ask and end turn <span>↗</span></button></div>`
        : `<p>Wait for your turn. You can mark your own board while you think.</p>`;
    const myStats = currentState.myStats || {};
    const stats = `<div class="round-stats"><span>YOUR STATS<b>${Number(myStats.questions || 0)} questions · ${Number(myStats.answers || 0)} answers</b><b>${Number(myStats.guesses || 0)} guesses · ${Number(myStats.wrongGuesses || 0)} wrong</b></span></div>`;
    return `<div class="game-layout"><section class="board-panel"><div class="board-heading"><h3>Your board</h3><span>${candidates.length} possible ${candidates.length === 1 ? "character" : "characters"} · tap to eliminate or restore</span></div><div class="board-legend"><span><i class="legend-dot available"></i>Available</span><span><i class="legend-dot eliminated"></i>Eliminated</span><span><i class="legend-dot wrong"></i>Wrong guess · permanent X</span></div><div class="character-grid">${(currentState.deck || []).map(item => `<button class="character-card ${wrong.has(item.id) ? "incorrect-guess" : eliminated.has(item.id) ? "eliminated" : ""}" data-action="eliminate" data-id="${esc(item.id)}" title="${esc(item.name)}" ${wrong.has(item.id) ? "disabled aria-label='Incorrect guess: permanently marked'" : ""}>${characterPortrait(item.id)}<span>${esc(item.name)}</span></button>`).join("")}</div></section><aside class="turn-panel"><div class="turn-banner ${isMyTurn() ? "yours" : ""}"><span class="turn-indicator"></span><span>${turnText}</span></div>${secretPanel}${questionBlock}${turnControls}<div class="divider"></div><div class="turn-action-group"><label class="field-label" for="guess-select">Make a guess</label><select id="guess-select" class="guess-select" ${canGuess ? "" : "disabled"}><option value="">Choose a character…</option>${(currentState.deck || []).map(item => `<option value="${esc(item.id)}" class="${wrong.has(item.id) ? "guess-wrong" : eliminated.has(item.id) ? "guess-eliminated" : "guess-available"}" style="color:${wrong.has(item.id) ? "#f08084" : eliminated.has(item.id) ? "#efb76a" : "#7bd49b"}" ${wrong.has(item.id) ? "disabled" : ""}>${wrong.has(item.id) ? "🔴" : eliminated.has(item.id) ? "🟠" : "🟢"} ${esc(item.name)}${wrong.has(item.id) ? " · Wrong guess" : eliminated.has(item.id) ? " · Eliminated" : " · Available"}</option>`).join("")}</select><button class="primary-button turn-action-button" data-action="guess" ${canGuess ? "" : "disabled"}>Guess and end turn <span>↗</span></button></div>${stats}</aside></div>`;
  }

  function renderResult() {
    const won = currentState.winner === session.seat;
    const otherName = esc(streamerMode && !session.streamerRevealName ? "Opponent" : seatName(session.seat === "host" ? "guest" : "host"));
    const mySecret = characterById(session.character)?.name || "Unknown";
    const opponent = characterById(currentState.opponentCharacter)?.name || "Unknown";
    return `<div class="result-simple"><h3>${won ? "You win" : "You lose"}</h3><div class="result-picks"><span>Your pick <b>${esc(mySecret)}</b></span><span>Opponent's pick <b>${esc(opponent)}</b></span></div><div class="room-actions result-actions"><button class="primary-button" data-action="rematch">Play again</button><button class="soft-button" data-action="exit">Exit</button></div></div>`;
  }

  function bindRoomActions() {
    const voiceToggle = $("#voice-chat-toggle");
    if (voiceToggle) voiceToggle.addEventListener("change", () => {
      const enabled = voiceToggle.checked;
      submitOptimistic("voiceChat", { enabled }, () => { currentState.voiceChat = enabled; });
    });
    room.querySelectorAll("[data-action]").forEach(button => button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "reopen-private") { setStreamerMode(true, { screen: "game" }); return; }
      if (action === "eliminate") {
        if (backgroundMutation || busy) return;
        const id = button.dataset.id;
        if ((currentState.wrongGuesses || []).includes(id)) return;
        localEliminated ||= new Set(currentState.eliminated || []);
        if (localEliminated.has(id)) localEliminated.delete(id); else localEliminated.add(id);
        saveEliminationDraft();
        updateBoardDraftUI(id);
        return;
      }
      if (["ask", "answer", "kick"].includes(action)) {
        if (backgroundMutation || busy) return;
        let fields = {};
        if (action === "ask") {
          const question = currentState.voiceChat ? `Question #${Number(currentState.questionNumber || 0) + 1}` : $("#question-input")?.value.trim();
          if (!question) { setNotice("Write a question first."); return; }
          fields = { question };
        } else if (action === "answer") fields = { answer: button.dataset.value };
        const mutate = () => {
          if (action === "ask") Object.assign(currentState, { question: fields.question, questionBy: session.seat, answer: "", turnAnswered: false, currentTurn: session.seat === "host" ? "guest" : "host" });
          if (action === "answer") Object.assign(currentState, { answer: fields.answer, turnAnswered: true });
          if (action === "kick") Object.assign(currentState, { guestName: "", guestReady: false });
          clearNotice();
        };
        submitOptimistic(action, fields, mutate);
        return;
      }
      withBusy(button, async () => {
        if (action === "copy-link") { await navigator.clipboard.writeText(shareUrl()); setNotice("Invite link copied.", "success"); return; }
        if (action === "guess") { const characterId = $("#guess-select").value; if (!characterId) throw new Error("Choose a character for your guess."); return perform("guess", { characterId }); }
        if (action === "start") { if (backgroundMutation) throw new Error("Wait for the lobby setting to finish saving, then start the game."); return perform("start"); }
        if (action === "kick") { await perform("kick"); setNotice("The player has been removed. The invite link is open again.", "success"); return; }
        if (action === "rematch") return perform("rematch");
        if (action === "exit") { await perform("leave", {}, false); clearSession(); }
      }, action === "copy-link" ? "Copying…" : "Working…");
    }));
  }

  async function createRoom(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = { hostName: String(form.get("name")).trim(), mode: form.get("mode"), deckSize: Number(form.get("deckSize")), hostCharacter: $("#host-character").value };
    if (!data.hostCharacter) return setNotice("Choose your secret character first.");
    const button = event.currentTarget.querySelector("button[type=submit]");
    await withBusy(button, async () => {
      const credentials = { id: randomRoomId(), ticket: randomToken(40) };
      await callApi("create", { ...data, ...credentials });
      saveSession({ ...credentials, seat: "host", character: data.hostCharacter, streamerMode });
      persistUrlFromRoom();
      const state = await callApi("state", { id: session.id, ticket: session.ticket, seat: session.seat });
      applyState(state.state);
      renderRoom();
      syncPolling();
    }, "Creating room…");
  }

  async function joinRoom(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = { id: pendingRoomId, guestName: String(form.get("name")).trim(), guestCharacter: $("#guest-character").value };
    if (!data.guestCharacter) { setNotice("Choose your secret character in the private window first."); return; }
    const button = event.currentTarget.querySelector("button[type=submit]");
    await withBusy(button, async () => {
      const credentials = { ticket: randomToken(40) };
      await callApi("join", { ...data, ...credentials });
      saveSession({ id: data.id, ...credentials, seat: "guest", character: data.guestCharacter, streamerMode });
      persistUrlFromRoom();
      const state = await callApi("state", { id: session.id, ticket: session.ticket, seat: session.seat });
      applyState(state.state);
      renderRoom();
      syncPolling();
    }, "Joining room…");
  }

  async function loadInviteRoom(id) {
    pendingRoomId = id;
    const hostTicket = new URLSearchParams(location.search).get("host");
    if (session && session.id === id) { await refreshState(); return; }
    if (hostTicket) {
      saveSession({ id, seat: "host", ticket: hostTicket, character: new URLSearchParams(location.search).get("character") || "" });
      await refreshState();
      if (currentState) return;
      clearSession();
    }
    try {
      const result = await callApi("preview", { id });
      const state = result.state;
      if (state.status !== "waiting" || state.guestName) { setNotice("This room is already full or the game has started. Ask the host for an available room link."); return; }
      pendingRoomMode = state.mode;
      home.hidden = true; $("#hero").hidden = true; room.hidden = false;
      const allowed = rosterFor(state.mode);
      room.innerHTML = `<div class="panel room-panel"><div class="room-top"><div><span class="eyebrow">JOIN ROOM · ${esc(state.modeLabel)}</span><h2>Choose your character</h2><span class="room-code">ROOM ${esc(state.id)}</span></div><button class="soft-button" id="cancel-join">Cancel</button></div><p class="subtle" style="margin:14px 0 20px">Pick the character your opponent will try to identify. Your choice stays hidden until the round ends.</p><form id="join-form"><label class="field-label" for="guest-name">Your name</label><input id="guest-name" name="name" maxlength="20" placeholder="Enter a nickname" required><label class="field-label" for="guest-character">Your secret character</label><select id="guest-character" name="character" required><option value="">Choose a character…</option>${allowed.map(c => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("")}</select><p class="streamer-hidden-note" data-streamer-note hidden>Your choice is hidden from the stream. Select it in the private window.</p><label class="streamer-toggle"><input class="streamer-toggle-input" type="checkbox" data-secret-select="guest-character"><span class="streamer-switch" aria-hidden="true"></span><span><b>Streamer Mode</b><small>Keep your character off stream</small></span></label><button class="primary-button full-button" type="submit">Join and get ready ✓</button></form></div>`;
      syncStreamerControls();
      $("#cancel-join").onclick = () => { pendingRoomId = ""; setStreamerMode(false); history.replaceState({}, "", location.pathname); clearNotice(); showHome(); };
      $("#join-form").addEventListener("submit", joinRoom);
    } catch (error) { setNotice(error.message); }
  }

  $("#mode-options").addEventListener("change", event => { if (event.target.name === "mode") { updateChoiceCards(); fillCharacterSelect($("#host-character"), event.target.value); } });
  $("#mode-options").addEventListener("change", event => {
    if (event.target.name === "mode" && privateContext?.selectId === "host-character") {
      privateContext.mode = event.target.value;
      renderPrivatePicker();
    }
  });
  fillCharacterSelect($("#host-character"), "mixed");
  updateChoiceCards();
  syncStreamerControls();
  $("#create-form").addEventListener("submit", createRoom);
  document.addEventListener("change", event => {
    const toggle = event.target;
    if (!toggle.matches(".streamer-toggle-input")) return;
    if (!toggle.checked) { setStreamerMode(false); return; }
    const selectId = toggle.dataset.secretSelect;
    const mode = selectId === "host-character" ? document.querySelector('input[name="mode"]:checked')?.value || "mixed" : pendingRoomMode;
    setStreamerMode(true, { selectId, mode });
  });
  $("#invite-form").addEventListener("submit", event => {
    event.preventDefault();
    const id = roomIdFromValue($("#invite-url").value);
    if (!id) { setNotice("Paste a valid room invitation link or a 9-character room code."); return; }
    setStreamerMode(false);
    if (session) clearSession();
    else localStorage.removeItem(SESSION_KEY);
    pendingRoomId = id;
    history.replaceState({}, "", `${location.pathname}?r=${encodeURIComponent(id)}`);
    loadInviteRoom(id);
  });
  const params = new URLSearchParams(location.search);
  const roomId = (params.get("r") || params.get("room") || "").toUpperCase();
  document.addEventListener("visibilitychange", () => { if (!document.hidden && session) refreshState(true); });
  if (session && (!roomId || roomId === session.id)) loadInviteRoom(session.id);
  else if (roomId) { closePrivateWindow(); localStorage.removeItem(SESSION_KEY); session = null; streamerMode = false; loadInviteRoom(roomId); }
})();
