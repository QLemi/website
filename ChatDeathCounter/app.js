(() => {
  "use strict";

  const params = new URLSearchParams(location.search);
  const channel = (params.get("channel") || "").trim().replace(/^#/, "").toLowerCase();
  const byId = id => document.getElementById(id);
  const setup = byId("setup");
  const panel = byId("panel");

  byId("setup-form").addEventListener("submit", event => {
    event.preventDefault();
    const name = byId("channel-input").value.trim().replace(/^#/, "").toLowerCase();
    if (!/^[a-z0-9_]{1,25}$/.test(name)) {
      byId("channel-input").setCustomValidity("Enter a valid Twitch channel name.");
      byId("channel-input").reportValidity();
      return;
    }
    byId("channel-input").setCustomValidity("");
    const url = new URL(location.href);
    url.search = "";
    url.searchParams.set("channel", name);
    url.hash = "";
    const output = byId("setup-output");
    output.replaceChildren();
    const caption = document.createElement("div");
    caption.textContent = "Overlay URL";
    const code = document.createElement("code");
    code.textContent = url.href;
    output.append(caption, code);
    output.hidden = false;
  });

  if (!channel || !/^[a-z0-9_]{1,25}$/.test(channel)) {
    setup.hidden = false;
    if (channel) {
      byId("channel-input").setCustomValidity("The channel name in this link is invalid.");
      byId("channel-input").title = "The channel name in this link is invalid.";
    }
    return;
  }

  setup.remove();
  panel.hidden = false;

  const storageKey = `deathcounter_${channel}`;
  const defaults = {
    deaths: 0,
    overallMs: 0,
    overallRunning: false,
    overallStartedAt: 0,
    currentBoss: null,
    bosses: {},
    config: {
      permission: "everyone",
      foreground: "#ffffff",
      accent: "#ff4655",
      background: "#000000",
      opacity: 0.55,
      size: 28,
      font: "Segoe UI",
      title: "Deaths",
      showTimer: true,
      showBoss: true,
      toastDuration: 4000
    }
  };
  let state;
  let toastTimer = 0;
  let chatClient = null;
  const loadedFonts = new Set();

  const cloneDefaults = () => JSON.parse(JSON.stringify(defaults));
  state = readState();
  function readState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "{}");
      const saved = parsed && typeof parsed === "object" ? parsed : {};
      return {
        ...cloneDefaults(),
        ...saved,
        config: { ...defaults.config, ...(saved.config || {}) },
        bosses: saved.bosses && typeof saved.bosses === "object" ? saved.bosses : {}
      };
    } catch {
      return cloneDefaults();
    }
  }
  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {                                                           }
  }
  const now = () => Date.now();
  const overallElapsed = () => state.overallMs + (state.overallRunning ? now() - state.overallStartedAt : 0);
  const bossElapsed = boss => boss.ms + (boss.running ? now() - boss.startedAt : 0);
  const currentBoss = () => state.currentBoss ? state.bosses[state.currentBoss] || null : null;
  const normalizeName = value => value.trim().toLowerCase();

  function formatTime(milliseconds, forceHours = false) {
    const seconds = Math.max(0, Math.floor(milliseconds / 1000));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainder = seconds % 60;
    const two = value => String(value).padStart(2, "0");
    return hours || forceHours ? `${hours}:${two(minutes)}:${two(remainder)}` : `${two(minutes)}:${two(remainder)}`;
  }
  function parseTime(value) {
    if (!value) return null;
    const parts = value.split(":").map(part => Number(part));
    if (parts.some(part => !Number.isInteger(part) || part < 0) || parts.length > 3) return null;
    let seconds = 0;
    for (const part of parts) seconds = seconds * 60 + part;
    return seconds * 1000;
  }
  function parseNumber(args) {
    if (!args.length) return { add: 1 };
    if (args[0].toLowerCase() === "set" && args[1] !== undefined && /^\d+$/.test(args[1])) return { set: Number(args[1]) };
    if (/^[+-]\d+$/.test(args[0])) return { add: Number(args[0]) };
    if (/^\d+$/.test(args[0])) return { set: Number(args[0]) };
    return null;
  }
  function pauseBoss(boss) {
    if (boss?.running) { boss.ms += now() - boss.startedAt; boss.running = false; }
  }
  function resumeBoss(boss) {
    if (boss && !boss.running && !boss.defeated) { boss.startedAt = now(); boss.running = true; }
  }
  function showToast(message) {
    const toast = byId("toast");
    toast.textContent = message;
    toast.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("on"), state.config.toastDuration);
  }
  function say(message) {
    showToast(message);
  }
  function appendChatMessage(username, message) {
    const list = byId("chat-messages");
    if (!list) return;
    list.querySelector(".chat-empty")?.remove();
    const line = document.createElement("div");
    line.className = "chat-message";
    const user = document.createElement("span");
    user.className = "chat-user";
    user.textContent = `${username}:`;
    const content = document.createElement("span");
    content.textContent = message;
    line.append(user, content);
    list.append(line);
    while (list.children.length > 10) list.firstElementChild.remove();
    list.scrollTop = list.scrollHeight;
  }
  function parseIrcLine(line) {
    const match = line.match(/^(?:@([^ ]+) )?(?::([^ ]+) )?([A-Z]+)(?: ([^:]*))?(?: :(.*))?$/);
    if (!match) return null;
    const tags = {};
    if (match[1]) {
      for (const entry of match[1].split(";")) {
        const separator = entry.indexOf("=");
        const key = separator < 0 ? entry : entry.slice(0, separator);
        const value = separator < 0 ? "" : entry.slice(separator + 1);
        tags[key] = value.replace(/\\s/g, " ").replace(/\\:/g, ";").replace(/\\r/g, "\r").replace(/\\n/g, "\n").replace(/\\\\/g, "\\");
      }
    }
    return { tags, prefix: match[2] || "", command: match[3], params: (match[4] || "").trim().split(/\s+/).filter(Boolean), trailing: match[5] || "" };
  }
  function handleCommand(command, args, isModerator) {
    const rest = args.join(" ").trim();
    const config = state.config;
    if (config.permission === "mods" && !isModerator && !["commands", "cmds", "bosses"].includes(command)) return;

    if (command === "perms") {
      if (!isModerator) return say("Only moderators can change permissions.");
      if (["everyone", "mods"].includes(args[0])) { config.permission = args[0]; return say(`Commands: ${args[0]}`); }
      return say("Usage: !perms everyone|mods");
    }
    switch (command) {
      case "commands": case "cmds":
        return say("!death [+N|-N|set N] · !boss NAME · !bd · !bossdone · !bosspause/!bossresume · !bossreset · !bossclear · !bosses · !timer start|stop|reset|set H:M:S · !style … · !show/!hide timer|boss · !perms everyone|mods · !resetall");
      case "death": case "d": case "rip": {
        const change = parseNumber(args);
        if (!change) return say("Usage: !death [+N|-N|set N]");
        const before = state.deaths;
        state.deaths = change.set !== undefined ? change.set : Math.max(0, state.deaths + change.add);
        const difference = state.deaths - before;
        const boss = currentBoss();
        if (boss?.running && difference) boss.deaths = Math.max(0, boss.deaths + difference);
        return say(`${config.title}: ${state.deaths}${boss?.running ? ` · ${boss.name}: ${boss.deaths}` : ""}`);
      }
      case "bd": case "bossdeath": {
        const boss = currentBoss();
        if (!boss) return say("No active boss. Use !boss NAME");
        const change = parseNumber(args);
        if (!change) return;
        const before = boss.deaths;
        boss.deaths = change.set !== undefined ? change.set : Math.max(0, boss.deaths + change.add);
        state.deaths = Math.max(0, state.deaths + boss.deaths - before);
        return say(`${boss.name}: ${boss.deaths} deaths`);
      }
      case "boss": {
        if (!rest) { const boss = currentBoss(); return say(boss ? `Current boss: ${boss.name}` : "No boss. Use !boss NAME"); }
        pauseBoss(currentBoss());
        const key = normalizeName(rest);
        if (!state.bosses[key]) state.bosses[key] = { name: rest, deaths: 0, ms: 0, running: false, startedAt: 0, defeated: false };
        state.currentBoss = key;
        const boss = state.bosses[key];
        boss.defeated = false;
        resumeBoss(boss);
        return say(`Boss: ${boss.name} (${boss.deaths} deaths, ${formatTime(bossElapsed(boss))})`);
      }
      case "bossdone": case "win": case "defeated": case "gg": {
        const boss = currentBoss();
        if (!boss) return say("No active boss.");
        pauseBoss(boss); boss.defeated = true;
        return say(`${boss.name} defeated! ${formatTime(bossElapsed(boss))} · ${boss.deaths} deaths`);
      }
      case "bosspause": { const boss = currentBoss(); if (!boss) return; pauseBoss(boss); return say("Boss timer paused"); }
      case "bossresume": { const boss = currentBoss(); if (!boss) return; resumeBoss(boss); return say("Boss timer running"); }
      case "bossreset": {
        const boss = currentBoss(); if (!boss) return;
        boss.deaths = 0; boss.ms = 0; boss.defeated = false; boss.running = true; boss.startedAt = now();
        return say(`${boss.name} reset`);
      }
      case "bosstime": {
        const boss = currentBoss(); if (!boss) return;
        const value = args[0] === "set" ? args[1] : args[0];
        const milliseconds = parseTime(value);
        if (milliseconds === null) return say("Usage: !bosstime set H:M:S");
        boss.ms = milliseconds; boss.startedAt = now(); boss.running = !boss.defeated;
        return say(`Boss timer: ${formatTime(milliseconds)}`);
      }
      case "bossclear": pauseBoss(currentBoss()); state.currentBoss = null; return say("Boss cleared");
      case "bossremove": {
        if (!rest) return;
        const key = normalizeName(rest);
        if (!state.bosses[key]) return say("Unknown boss");
        if (state.currentBoss === key) state.currentBoss = null;
        delete state.bosses[key];
        return say(`Removed ${rest}`);
      }
      case "bosses": {
        const bosses = Object.values(state.bosses);
        if (!bosses.length) return say("No bosses yet.");
        return say(bosses.slice(-6).map(boss => `${boss.defeated ? "✔" : "•"} ${boss.name} ${boss.deaths}☠ ${formatTime(bossElapsed(boss))}`).join(" | "));
      }
      case "start": case "stop": case "timer": {
        const subcommand = command === "timer" ? (args[0] || "") : command;
        if (subcommand === "start") { if (!state.overallRunning) { state.overallStartedAt = now(); state.overallRunning = true; } return say("Timer started"); }
        if (["stop", "pause"].includes(subcommand)) { if (state.overallRunning) { state.overallMs = overallElapsed(); state.overallRunning = false; } return say("Timer stopped"); }
        if (subcommand === "reset") { state.overallMs = 0; state.overallStartedAt = now(); return say("Timer reset"); }
        if (["set", "add"].includes(subcommand)) {
          const milliseconds = parseTime(args[1]);
          if (milliseconds === null) return say("Usage: !timer set H:MM:SS");
          state.overallMs = subcommand === "set" ? milliseconds : overallElapsed() + milliseconds;
          state.overallStartedAt = now();
          return say(`Timer: ${formatTime(state.overallMs, true)}`);
        }
        return say("Usage: !timer start|stop|reset|set H:M:S|add H:M:S");
      }
      case "show": case "hide": {
        const visible = command === "show";
        if (args[0] === "timer") { config.showTimer = visible; return say(`Timer ${visible ? "shown" : "hidden"}`); }
        if (args[0] === "boss") { config.showBoss = visible; return say(`Boss row ${visible ? "shown" : "hidden"}`); }
        return say(`Usage: !${command} timer|boss`);
      }
      case "style": case "set": {
        const [property, ...values] = args;
        const value = values.join(" ").trim();
        const color = /^#?(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
        const hex = text => `#${text.replace(/^#/, "")}`;
        if (property === "color" && color.test(value)) { config.foreground = hex(value); return say("Text color set"); }
        if (property === "accent" && color.test(value)) { config.accent = hex(value); return say("Accent set"); }
        if (property === "bg" && color.test(value)) { config.background = hex(value); return say("Background set"); }
        if (property === "opacity" && Number.isFinite(Number(value))) { config.opacity = Math.min(1, Math.max(0, Number(value) > 1 ? Number(value) / 100 : Number(value))); return say(`Opacity ${config.opacity}`); }
        if (property === "size" && Number.isFinite(Number(value))) { config.size = Math.min(120, Math.max(10, Number(value))); return say(`Size ${config.size}`); }
        if (property === "font" && value) { config.font = value.slice(0, 40).replace(/[;{}]/g, ""); return say(`Font: ${config.font}`); }
        if (property === "title" && value) { config.title = value.slice(0, 20); return say(`Title: ${config.title}`); }
        if (property === "toast" && Number.isFinite(Number(value))) { config.toastDuration = Math.min(30000, Math.max(0, Number(value) * 1000)); return say(`Pop-ups: ${Number(value)}s`); }
        if (property === "reset") { state.config = cloneDefaults().config; return say("Style reset"); }
        return say("!style color|accent|bg HEX · opacity 0-100 · size PX · font NAME · title TEXT · toast SEC · reset");
      }
      case "resetall": {
        if (!isModerator) return say("Mods only.");
        const configCopy = state.config;
        state = cloneDefaults();
        state.config = configCopy;
        return say("Everything reset");
      }
    }
  }
  function render() {
    const config = state.config;
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty("--fg", config.foreground);
    rootStyle.setProperty("--accent", config.accent);
    rootStyle.setProperty("--opacity", String(config.opacity));
    rootStyle.setProperty("--font-size", `${config.size}px`);
    rootStyle.setProperty("--font-family", `'${config.font.replace(/['"\\]/g, "")}',sans-serif`);
    if (!loadedFonts.has(config.font)) {
      loadedFonts.add(config.font);
      const fontLink = document.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(config.font).replace(/%20/g, "+")}:wght@500;700&display=swap`;
      document.head.append(fontLink);
    }
    const color = config.background.replace(/^#/, "");
    const fullColor = color.length === 3 ? color.split("").map(char => char + char).join("") : color;
    rootStyle.setProperty("--bg-rgb", [0, 2, 4].map(index => parseInt(fullColor.slice(index, index + 2), 16)).join(","));
    byId("deaths-label").textContent = `☠ ${config.title}`;
    byId("deaths-value").textContent = String(state.deaths);
    byId("overall-time").textContent = config.showTimer ? formatTime(overallElapsed(), true) : "";
    byId("overall-time").classList.toggle("hide", !config.showTimer);
    const boss = currentBoss();
    const bossRow = byId("boss-row");
    bossRow.classList.toggle("hide", !(boss && config.showBoss));
    if (boss) {
      byId("boss-name").textContent = `${boss.defeated ? "✔ " : ""}${boss.name}`;
      byId("boss-deaths").textContent = `☠ ${boss.deaths}`;
      byId("boss-time").textContent = formatTime(bossElapsed(boss));
      bossRow.classList.toggle("done", boss.defeated);
      bossRow.classList.toggle("paused", !boss.running && !boss.defeated);
    }
  }

  render();
  byId("chat-channel").textContent = `#${channel}`;
  setInterval(render, 250);
  setInterval(save, 2000);

  let reconnectTimer = 0;
  let reconnectDelay = 2000;
  function connectChat() {
    clearTimeout(reconnectTimer);
    showToast(`Connecting anonymously to #${channel}…`);
    try {
      chatClient = new WebSocket("wss://irc-ws.chat.twitch.tv:443");
    } catch (error) {
      console.error(error);
      showToast("Could not open a Twitch chat connection.");
      reconnectTimer = setTimeout(connectChat, reconnectDelay);
      reconnectDelay = Math.min(30000, reconnectDelay * 2);
      return;
    }
    chatClient.addEventListener("open", () => {
      const guest = `justinfan${Math.floor(10000 + Math.random() * 90000)}`;
      chatClient.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership\r\n");
      chatClient.send("PASS SCHMOOPIIE\r\n");
      chatClient.send(`NICK ${guest}\r\n`);
      chatClient.send(`JOIN #${channel}\r\n`);
    });
    chatClient.addEventListener("message", event => {
      for (const rawLine of String(event.data).split("\r\n")) {
        if (!rawLine) continue;
        if (rawLine.startsWith("PING ")) {
          chatClient.send(`PONG ${rawLine.slice(5)}\r\n`);
          continue;
        }
        const parsed = parseIrcLine(rawLine);
        if (!parsed) continue;
        if (parsed.command === "001") {
          reconnectDelay = 2000;
          showToast(`Connected anonymously to #${channel}; chat commands are ready.`);
        }
        if (parsed.command !== "PRIVMSG") continue;
        const username = parsed.prefix.split("!")[0] || parsed.tags.login || "viewer";
        const message = parsed.trailing;
        appendChatMessage(username, message);
        const text = message.trim();
        if (!text.startsWith("!")) continue;
        const parts = text.slice(1).split(/\s+/);
        const command = parts.shift().toLowerCase();
        const badges = Object.fromEntries((parsed.tags.badges || "").split(",").filter(Boolean).map(item => item.split("/")));
        const moderator = parsed.tags.mod === "1" || Boolean(badges.broadcaster || badges.moderator);
        try { handleCommand(command, parts, moderator); } catch (error) { console.error(error); }
        save();
        render();
      }
    });
    chatClient.addEventListener("error", error => {
      console.error("Twitch WebSocket error", error);
      showToast("Twitch chat connection failed; retrying…");
    });
    chatClient.addEventListener("close", () => {
      showToast("Disconnected from Twitch chat; reconnecting…");
      reconnectTimer = setTimeout(connectChat, reconnectDelay);
      reconnectDelay = Math.min(30000, reconnectDelay * 2);
    });
  }
  connectChat();
  window.addEventListener("beforeunload", save);
})();
