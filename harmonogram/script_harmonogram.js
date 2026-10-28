try {
  localStorage.removeItem('harmonogram-last-verified-v1');
} catch {}
const API_URL = String(typeof HARMONOGRAM_API_URL !== 'undefined' ? HARMONOGRAM_API_URL : '').trim();
const REQUIRED_APP_VERSION = '4';
function apiVersionMatches(response) {
  const version = response && (response.appVersion || response.coreVersion);
  return String(version || '') === REQUIRED_APP_VERSION;
}
const WEEKDAY_SHORT = ['Nd', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];
const WEEKDAY_LONG = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
const MONTH_FORMAT = new Intl.DateTimeFormat('pl-PL', {
  month: 'long',
  year: 'numeric'
});
const DATE_FORMAT = new Intl.DateTimeFormat('pl-PL', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});
let reminders = [];
let selectedDate = dateKey(new Date());
let visibleMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let editingId = null;
let editingTodoId = null;
let editingTodoSubtasks = [];
let agendaMode = true;
let consoleActiveStep = null;
let consoleSize = 0;
let databaseWriteQueue = Promise.resolve();
let pendingDatabaseMutations = [];
let databaseSaveTimer = null;
let editIdleTimer = null;
let lastUserEditAt = null;
let pendingIntegrityRepair = null;
const SAVE_IDLE_MS = 3000;
const SAVE_CHECK_MS = 10000;
const EDIT_LOCK_MS = 60000;
let hasLoadedData = false;
let isLoadingData = false;
let isEditLocked = true;
let serverChecksum = '';
let serverRevision = null;
let confirmedReminders = [];
let writesBlocked = false;
let pendingWrites = 0;
let lastDatabaseSyncAt = null;
let lastIntegrityVerifiedAt = null;
const CONSOLE_COMMANDS = [{
  command: '/help',
  description: 'Pokaż dostępne komendy'
}, {
  command: '/pomoc',
  description: 'Polska wersja komendy /help'
}, {
  command: '/status',
  description: 'Pokaż połączenie, zapis, sumę i stan edycji'
}, {
  command: '/verify',
  description: 'Sprawdź format, liczbę wpisów i sumę kontrolną'
}, {
  command: '/sprawdz',
  description: 'Polska wersja komendy /verify'
}, {
  command: '/repair core',
  description: 'Napraw strukturę arkusza po potwierdzeniu'
}, {
  command: '/repair checksum',
  description: 'Napraw sumę kontrolną po potwierdzeniu'
}, {
  command: '/repair all',
  description: 'Napraw strukturę i sumę po potwierdzeniu na stronie'
}, {
  command: '/repair',
  description: 'Napraw bazę po potwierdzeniu na stronie'
}, {
  command: '/napraw',
  description: 'Polska wersja naprawy bazy'
}, {
  command: '/lock',
  description: 'Natychmiast zablokuj edycję'
}, {
  command: '/clear',
  description: 'Wyczyść historię konsoli'
}, {
  command: '/export',
  description: 'Pobierz zweryfikowaną kopię JSON'
}, {
  command: '/reload',
  description: 'Ponownie wczytaj bazę przypomnień'
}, {
  command: '/wczytaj',
  description: 'Polska wersja komendy /reload'
}, {
  command: '/backup',
  description: 'Pobierz kopię ostatnich potwierdzonych danych'
}, {
  command: '/kopia',
  description: 'Polska wersja komendy /backup'
}];
function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function fromDateKey(value) {
  const [year, month, day] = String(value).split('-').map(Number);
  return new Date(year, month - 1, day, 12);
}
function addDays(date, amount) {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
  result.setDate(result.getDate() + amount);
  return result;
}
function easterSunday(year) {
  const a = year % 19,
    b = Math.floor(year / 100),
    c = year % 100;
  const d = Math.floor(b / 4),
    e = b % 4,
    f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3),
    h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4),
    k = c % 4,
    l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = (h + l - 7 * m + 114) % 31 + 1;
  return new Date(year, month - 1, day, 12);
}
function polishHoliday(day) {
  const key = dateKey(day);
  const fixed = {
    '01-01': 'Nowy Rok',
    '01-06': 'Święto Trzech Króli',
    '05-01': 'Święto Pracy',
    '05-03': 'Święto Konstytucji 3 Maja',
    '08-15': 'Wniebowzięcie NMP',
    '11-01': 'Wszystkich Świętych',
    '11-11': 'Narodowe Święto Niepodległości',
    '12-25': 'Boże Narodzenie',
    '12-26': 'Drugi dzień Bożego Narodzenia'
  };
  const fixedName = fixed[key.slice(5)];
  if (fixedName) return fixedName;
  const easter = easterSunday(day.getFullYear());
  const movable = [[easter, 'Wielkanoc'], [addDays(easter, 1), 'Poniedziałek Wielkanocny'], [addDays(easter, 49), 'Zielone Świątki'], [addDays(easter, 60), 'Boże Ciało']];
  return movable.find(([date]) => dateKey(date) === key)?.[1] || '';
}
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}
function setDatabaseState(state, message) {
  const badge = document.getElementById('database-badge');
  const text = document.getElementById('database-badge-text');
  const consoleRoot = document.getElementById('databaseConsole');
  const consoleState = document.getElementById('dbConsoleState');
  if (badge) badge.dataset.state = state;
  if (text) text.textContent = message;
  updateDatabaseSummary();
  if (state === 'error') setDataLoadingOverlays('error', message || 'Wystąpił problem z bazą. Wczytaj dane ponownie.');
  if (consoleRoot) consoleRoot.dataset.state = state;
  if (consoleState) consoleState.textContent = state === 'ready' ? isEditLocked ? 'GOTOWA · BLOKADA' : 'GOTOWA · EDYCJA' : state === 'saving' ? 'ZAPIS' : state === 'error' ? 'BŁĄD' : state === 'loading' ? 'ŁADOWANIE' : 'ŁĄCZENIE';
  updateConsoleCommandAvailability((state === 'ready' || state === 'error') && !!API_URL);
}
function updateDatabaseSummary() {
  const root = document.getElementById('db-console-summary');
  if (!root) return;
  const stats = {
    connection: document.getElementById('database-badge-text')?.textContent || '—',
    records: hasLoadedData ? String(reminders.length) : '—',
    revision: pendingIntegrityRepair?.revision ?? serverRevision ?? '—',
    save: pendingWrites ? `${pendingWrites} oczekuje` : lastDatabaseSyncAt ? 'zsynchronizowano' : 'brak zapisu'
  };
  root.querySelectorAll('[data-db-summary]').forEach(card => {
    const value = card.querySelector('strong');
    if (value) value.textContent = stats[card.dataset.dbSummary];
  });
}
function setDataLoadingOverlays(state, message = '') {
  const disabled = state !== 'ready';
  document.querySelectorAll('.calendar-panel button:not([data-retry-load]):not([data-accept-empty]), .day-panel button:not([data-retry-load]):not([data-accept-empty]), .todo-panel button:not([data-retry-load]):not([data-accept-empty])').forEach(button => {
    button.disabled = disabled;
  });
  document.querySelectorAll('.db-loading-overlay').forEach(overlay => {
    overlay.hidden = state === 'ready';
    overlay.classList.toggle('is-error', state === 'error');
    const title = overlay.querySelector('.db-loading-card strong');
    const detail = overlay.querySelector('.db-loading-message');
    const retry = overlay.querySelector('[data-retry-load]');
    const acceptEmpty = overlay.querySelector('[data-accept-empty]');
    if (title) title.textContent = state === 'error' ? 'Problem z bazą danych' : 'Ładowanie bazy danych';
    if (detail) detail.textContent = state === 'error' ? message : overlay.id === 'todo-loading-overlay' ? 'Pobieram zadania…' : 'Pobieram przypomnienia…';
    if (retry) retry.hidden = state !== 'error';
    if (acceptEmpty) acceptEmpty.hidden = true;
  });
  updateEditingAvailability();
}
function updateEditingAvailability() {
  const ready = hasLoadedData && !isLoadingData;
  const locked = !ready || isEditLocked || writesBlocked;
  document.querySelectorAll('#new-reminder-button, #new-day-reminder, #new-todo-button, .complete-toggle, .reminder-main, .todo-toggle, .todo-copy, .todo-edit, #save-reminder, #delete-reminder, #save-todo, #delete-todo, #add-subtask, .subtask-remove, .subtask-editor-row input, #subtask-input').forEach(button => {
    button.disabled = locked;
  });
  const lockButton = document.getElementById('toggle-edit-lock');
  if (lockButton) {
    lockButton.disabled = !ready;
    lockButton.textContent = !ready ? '🔒 Edycja zablokowana' : isEditLocked ? '🔓 Odblokuj edycję' : '🔒 Zablokuj edycję';
    lockButton.setAttribute('aria-pressed', String(ready && !isEditLocked));
    lockButton.title = !ready ? 'Edycja będzie dostępna po wczytaniu danych' : isEditLocked ? 'Odblokuj dodawanie i edycję wpisów' : 'Zablokuj dodawanie i edycję wpisów';
  }
}
async function toggleEditLock() {
  if (!hasLoadedData || isLoadingData || writesBlocked) return;
  if (!isEditLocked && (pendingWrites || pendingDatabaseMutations.length)) {
    const button = document.getElementById('toggle-edit-lock');
    if (button) {
      button.disabled = true;
      button.textContent = '⏳ Zapisuję zmiany…';
    }
    addDatabaseConsoleStep('Blokowanie edycji', 'info', 'Wysyłam oczekujące zmiany i sprawdzam zapis.');
    setDatabaseState('saving', 'Zapisywanie przed blokadą…');
    await flushDatabaseWrites();
    if (pendingWrites) await databaseWriteQueue;
    if (writesBlocked) {
      isEditLocked = true;
      updateEditingAvailability();
      addDatabaseConsoleStep('Blokowanie edycji', 'error', 'Zapis nie został potwierdzony. Edycja jest zablokowana, a błąd zapisano w konsoli.');
      return;
    }
  }
  isEditLocked = !isEditLocked;
  if (!isEditLocked) markEditActivity();
  if (isEditLocked) {
    if (document.getElementById('reminder-dialog').open) closeReminderDialog();
    if (document.getElementById('todo-dialog').open) closeTodoDialog();
  }
  updateEditingAvailability();
  setDatabaseState('ready', isEditLocked ? 'Edycja zablokowana' : 'Edycja odblokowana');
}
function confirmInPage({
  title,
  message,
  confirmLabel = 'Potwierdź',
  cancelLabel = 'Anuluj',
  danger = false
}) {
  const dialog = document.getElementById('page-confirm-dialog');
  const titleNode = document.getElementById('page-confirm-title');
  const messageNode = document.getElementById('page-confirm-message');
  const confirmButton = document.getElementById('page-confirm-accept');
  const cancelButton = document.getElementById('page-confirm-cancel');
  titleNode.textContent = title;
  messageNode.textContent = message;
  confirmButton.textContent = confirmLabel;
  confirmButton.classList.toggle('is-danger', danger);
  cancelButton.textContent = cancelLabel;
  return new Promise(resolve => {
    const finish = accepted => {
      dialog.close();
      confirmButton.removeEventListener('click', accept);
      cancelButton.removeEventListener('click', cancel);
      dialog.removeEventListener('cancel', dismiss);
      resolve(accepted);
    };
    const accept = () => finish(true);
    const cancel = () => finish(false);
    const dismiss = event => {
      event.preventDefault();
      finish(false);
    };
    confirmButton.addEventListener('click', accept, {
      once: true
    });
    cancelButton.addEventListener('click', cancel, {
      once: true
    });
    dialog.addEventListener('cancel', dismiss, {
      once: true
    });
    dialog.showModal();
    cancelButton.focus();
  });
}
function markEditActivity() {
  if (isEditLocked || !hasLoadedData) return;
  lastUserEditAt = new Date();
  clearTimeout(editIdleTimer);
  editIdleTimer = setTimeout(() => {
    if (pendingWrites || pendingDatabaseMutations.length) flushDatabaseWrites();
    isEditLocked = true;
    if (document.getElementById('reminder-dialog').open) closeReminderDialog();
    if (document.getElementById('todo-dialog').open) closeTodoDialog();
    updateEditingAvailability();
    if (hasLoadedData && !writesBlocked) setDatabaseState('ready', 'Edycja zablokowana po bezczynności');
  }, EDIT_LOCK_MS);
}
function updateConsoleCommandAvailability(enabled) {
  const input = document.getElementById('dbConsoleCommandInput');
  const button = document.getElementById('dbConsoleCommandRun');
  if (input) input.disabled = !enabled;
  if (button) button.disabled = !enabled;
}
function beginDatabaseConsole(title = 'ŁADOWANIE BAZY DANYCH') {
  const log = document.getElementById('dbConsoleLog');
  if (!log) return;
  log.replaceChildren();
  consoleActiveStep = null;
  const heading = document.createElement('div');
  heading.className = 'db-console-session';
  heading.textContent = `${new Intl.DateTimeFormat('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date())} · ${title}`;
  log.append(heading);
}
function addDatabaseConsoleStep(label, state = 'pending', detail = '') {
  const log = document.getElementById('dbConsoleLog');
  if (!log) return;
  if (state !== 'info' && consoleActiveStep?.dataset.state === 'pending') {
    consoleActiveStep.dataset.state = 'success';
    consoleActiveStep.querySelector('.db-console-icon').textContent = '✓';
    consoleActiveStep = null;
  }
  const line = document.createElement('div');
  line.className = 'db-console-line';
  line.dataset.state = state;
  const time = new Intl.DateTimeFormat('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date());
  line.innerHTML = `<span class="db-console-time">${time}</span><span class="db-console-icon" aria-hidden="true"></span><span class="db-console-label"></span>`;
  line.querySelector('.db-console-icon').textContent = state === 'success' ? '✓' : state === 'error' ? '×' : state === 'info' ? '›' : '…';
  line.querySelector('.db-console-label').textContent = label;
  if (detail) {
    const note = document.createElement('span');
    note.className = 'db-console-detail';
    note.textContent = detail;
    line.append(note);
  }
  log.append(line);
  if (state === 'pending') consoleActiveStep = line;
  log.scrollTop = log.scrollHeight;
}
function finishDatabaseConsole(state, message) {
  if (consoleActiveStep?.dataset.state === 'pending') {
    consoleActiveStep.dataset.state = state === 'error' ? 'error' : 'success';
    consoleActiveStep.querySelector('.db-console-icon').textContent = state === 'error' ? '×' : '✓';
    consoleActiveStep = null;
  }
  addDatabaseConsoleStep(message, state === 'error' ? 'error' : 'success');
  setDatabaseState(state, state === 'ready' ? message : 'Błąd bazy');
}
async function requestDatabase(payload = null, query = '') {
  if (!API_URL) throw new Error('Dodaj adres wdrożonego Apps Script do config_harmonogram.js.');
  const options = payload ? {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(payload),
    cache: 'no-store'
  } : {
    method: 'GET',
    cache: 'no-store'
  };
  const response = await fetch(`${API_URL}${query ? `${API_URL.includes('?') ? '&' : '?'}${query}` : ''}`, options);
  if (!response.ok) throw new Error(`Usługa zwróciła HTTP ${response.status}.`);
  const result = JSON.parse(await response.text());
  if (!result || result.status !== 'ok') throw new Error(result?.error || 'Baza odrzuciła żądanie.');
  return result;
}
function queueDatabaseWrite(payload, label) {
  pendingWrites++;
  pendingDatabaseMutations.push({
    payload,
    label
  });
  markEditActivity();
  addDatabaseConsoleStep(label, 'info', 'Oczekuje na autosave');
  setDatabaseState('saving', 'Zapis za chwilę…');
  clearTimeout(databaseSaveTimer);
  databaseSaveTimer = setTimeout(flushDatabaseWrites, SAVE_IDLE_MS);
  return databaseWriteQueue;
}
function flushDatabaseWrites() {
  clearTimeout(databaseSaveTimer);
  if (!pendingDatabaseMutations.length) return databaseWriteQueue;
  const batch = pendingDatabaseMutations.splice(0);
  const expectedReminders = reminders.map(normalizeReminder);
  databaseWriteQueue = databaseWriteQueue.then(async () => {
    if (writesBlocked) throw new Error('Zapis wstrzymany po błędzie. Wczytaj bazę ponownie przed dalszą edycją.');
    if (!API_URL) throw new Error('Dodaj adres wdrożonego Apps Script do config_harmonogram.js.');
    const expectedAfterChecksum = await remindersChecksum(expectedReminders);
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({
        action: 'batch',
        actions: batch.map(item => item.payload),
        expectedChecksum: serverChecksum
      }),
      cache: 'no-store'
    });
    if (response.type !== 'opaque' && !response.ok) throw new Error(`Usługa zwróciła HTTP ${response.status}.`);
    const verified = await requestDatabase();
    if (!Array.isArray(verified.reminders) || verified.count !== verified.reminders.length || verified.checksum !== expectedAfterChecksum || verified.storedChecksum !== verified.checksum || verified.coreValid !== true || !apiVersionMatches(verified) || (await remindersChecksum(verified.reminders.map(normalizeReminder))) !== verified.checksum) {
      throw new Error('Weryfikacja zapisu nie powiodła się. Przywrócono ostatnie potwierdzone dane.');
    }
    serverChecksum = verified.checksum;
    serverRevision = verified.revision ?? serverRevision;
    confirmedReminders = verified.reminders.map(normalizeReminder);
    reminders = confirmedReminders.map(normalizeReminder);
    lastDatabaseSyncAt = new Date();
    renderCalendar();
    addDatabaseConsoleStep('Autosave', 'success', `${batch.length} zmian · potwierdzono sumą kontrolną`);
    setDatabaseState('ready', `Zapisano ${lastDatabaseSyncAt.toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit'
    })}`);
  }).catch(error => {
    writesBlocked = true;
    reminders = confirmedReminders.map(normalizeReminder);
    hasLoadedData = true;
    isEditLocked = true;
    renderCalendar();
    updateEditingAvailability();
    addDatabaseConsoleStep('Autosave', 'error', error.message || 'Nie udało się wysłać zmian.');
    setDatabaseState('error', 'Błąd zapisu w tle');
  }).finally(() => {
    pendingWrites = Math.max(0, pendingWrites - batch.length);
    if (pendingDatabaseMutations.length && !writesBlocked) databaseSaveTimer = setTimeout(flushDatabaseWrites, SAVE_IDLE_MS);
  });
  return databaseWriteQueue;
}
setInterval(() => {
  if (pendingDatabaseMutations.length && !writesBlocked) flushDatabaseWrites();
}, SAVE_CHECK_MS);
async function loadReminders() {
  clearTimeout(databaseSaveTimer);
  if (writesBlocked && pendingDatabaseMutations.length) {
    pendingWrites = Math.max(0, pendingWrites - pendingDatabaseMutations.length);
    pendingDatabaseMutations = [];
  } else if (pendingDatabaseMutations.length) {
    flushDatabaseWrites();
  }
  isLoadingData = true;
  if (document.getElementById('reminder-dialog').open) closeReminderDialog();
  if (document.getElementById('todo-dialog').open) closeTodoDialog();
  setDataLoadingOverlays('loading');
  beginDatabaseConsole('ŁADOWANIE PRZYPOMNIEŃ');
  setDatabaseState('loading', 'Łączenie z bazą…');
  document.getElementById('new-reminder-button').disabled = true;
  document.getElementById('new-day-reminder').disabled = true;
  document.getElementById('new-todo-button').disabled = true;
  try {
    await databaseWriteQueue;
    setDatabaseState('loading', 'Łączenie z bazą…');
    addDatabaseConsoleStep('Sprawdzanie konfiguracji połączenia');
    if (!API_URL) throw new Error('Dodaj adres wdrożonego Apps Script do config_harmonogram.js.');
    addDatabaseConsoleStep('Łączenie z usługą Apps Script');
    const result = await requestDatabase();
    addDatabaseConsoleStep('Łączenie z usługą Apps Script', 'success', 'Odpowiedź serwera została odebrana');
    addDatabaseConsoleStep('Weryfikacja danych przypomnień');
    if (!Array.isArray(result.reminders) || !Number.isInteger(result.count) || result.count !== result.reminders.length) throw new Error('Odpowiedź bazy ma nieprawidłowy format lub niezgodną liczbę wpisów.');
    const verified = result.reminders.map(normalizeReminder);
    if (!result.checksum || (await remindersChecksum(verified)) !== result.checksum) throw new Error('Suma kontrolna danych jest niezgodna. Dane nie zostały wczytane ani nadpisane.');
    if (!apiVersionMatches(result)) throw new Error(`Apps Script jest nieaktualny (wersja ${result.appVersion || result.coreVersion || 'nieznana'}, wymagana ${REQUIRED_APP_VERSION}). Wklej aktualny plik AppsScript.gs i opublikuj nową wersję.`);
    if (!result.storedChecksum || result.storedChecksum !== result.checksum || result.coreValid !== true) throw new Error('Metadane integralności lub struktura arkusza są niezgodne. Dane nie zostały wczytane ani nadpisane. Użyj /verify, a potem odpowiedniej komendy /repair.');
    serverChecksum = result.checksum;
    serverRevision = result.revision ?? null;
    lastDatabaseSyncAt = new Date();
    reminders = verified;
    confirmedReminders = verified.map(normalizeReminder);
    writesBlocked = false;
    hasLoadedData = true;
    isLoadingData = false;
    addDatabaseConsoleStep('Weryfikacja danych przypomnień', 'success', `${reminders.length} wpisów`);
    finishDatabaseConsole('ready', 'Dane są gotowe do wyświetlenia');
    setDataLoadingOverlays('ready');
    renderCalendar();
  } catch (error) {
    isLoadingData = false;
    hasLoadedData = false;
    isEditLocked = true;
    updateEditingAvailability();
    finishDatabaseConsole('error', error.message || 'Nie udało się wczytać danych.');
    setDataLoadingOverlays('error', error.message || 'Sprawdź połączenie i spróbuj ponownie.');
    document.getElementById('calendar-grid').innerHTML = '<div class="calendar-message">Nie udało się wczytać przypomnień. Szczegóły są w konsoli bazy danych.</div>';
    document.getElementById('day-reminders').innerHTML = '<p class="empty-day">Połącz stronę z bazą, aby wyświetlić przypomnienia.</p>';
  }
}
function normalizeReminder(value) {
  return {
    id: String(value.id || ''),
    title: String(value.title || ''),
    notes: String(value.notes || ''),
    date: String(value.date || ''),
    time: String(value.time || ''),
    repeat: ['none', 'daily', 'weekly', 'monthly', 'yearly'].includes(value.repeat) ? value.repeat : 'none',
    weekdays: Array.isArray(value.weekdays) ? value.weekdays.map(Number).filter(day => Number.isInteger(day) && day >= 0 && day <= 6) : [],
    until: String(value.until || ''),
    completedDates: Array.isArray(value.completedDates) ? value.completedDates.map(String) : [],
    kind: ['todo', 'info'].includes(value.kind) ? value.kind : 'reminder',
    todoCompleted: value.todoCompleted === true || String(value.todoCompleted).toUpperCase() === 'TRUE',
    todoSubtasks: Array.isArray(value.todoSubtasks) ? value.todoSubtasks.slice(0, 50).map(item => ({
      id: String(item?.id || ''),
      text: String(item?.text || '').slice(0, 200),
      completed: item?.completed === true
    })).filter(item => item.id && item.text.trim()) : []
  };
}
async function remindersChecksum(items) {
  const canonical = JSON.stringify(items.map(item => ({
    id: item.id,
    title: item.title,
    notes: item.notes,
    date: item.date,
    time: item.time,
    repeat: item.repeat,
    weekdays: item.weekdays,
    until: item.until,
    completedDates: [...item.completedDates].sort(),
    kind: item.kind,
    todoCompleted: item.todoCompleted,
    todoSubtasks: item.todoSubtasks
  })));
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonical));
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}
function reminderOccurs(reminder, day) {
  const key = dateKey(day);
  if (key < reminder.date || reminder.until && key > reminder.until) return false;
  const start = fromDateKey(reminder.date);
  if (reminder.kind === 'info' || reminder.repeat === 'none') return key === reminder.date;
  if (reminder.repeat === 'daily') return true;
  if (reminder.repeat === 'weekly') return reminder.weekdays.includes(day.getDay());
  if (reminder.repeat === 'monthly') return day.getDate() === start.getDate();
  if (reminder.repeat === 'yearly') return day.getMonth() === start.getMonth() && day.getDate() === start.getDate();
  return false;
}
function occurrencesInRange(from, to) {
  const found = [];
  for (let day = new Date(from); day <= to; day = addDays(day, 1)) {
    for (const reminder of reminders) if (reminder.kind !== 'todo' && reminderOccurs(reminder, day)) found.push({
      reminder,
      date: dateKey(day)
    });
  }
  return found;
}
function renderCalendar() {
  document.getElementById('month-title').textContent = MONTH_FORMAT.format(visibleMonth);
  const grid = document.getElementById('calendar-grid');
  grid.replaceChildren();
  const firstDay = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1, 12);
  const offset = (firstDay.getDay() + 6) % 7;
  const gridStart = addDays(firstDay, -offset);
  const daysInMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
  const cellCount = Math.ceil((offset + daysInMonth) / 7) * 7;
  document.querySelectorAll('.calendar-weekdays span').forEach((label, index) => label.classList.toggle('is-weekend-label', index === 5 || index === 6));
  const occurrences = occurrencesInRange(gridStart, addDays(gridStart, cellCount - 1));
  const byDate = new Map();
  occurrences.forEach(item => {
    if (!byDate.has(item.date)) byDate.set(item.date, []);
    byDate.get(item.date).push(item);
  });
  let monthEntries = 0;
  for (let i = 0; i < cellCount; i++) {
    const day = addDays(gridStart, i);
    const key = dateKey(day);
    const items = byDate.get(key) || [];
    const holiday = polishHoliday(day);
    if (day.getMonth() === visibleMonth.getMonth()) monthEntries += items.length;
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'calendar-day';
    if (day.getMonth() !== visibleMonth.getMonth()) cell.classList.add('outside-month');
    if (day.getDay() === 0 || day.getDay() === 6) cell.classList.add('is-weekend');
    if (holiday) cell.classList.add('is-holiday');
    if (key === dateKey(new Date())) cell.classList.add('is-today');
    if (key === selectedDate) cell.classList.add('is-selected');
    cell.setAttribute('aria-label', `${DATE_FORMAT.format(day)}${holiday ? `, święto: ${holiday}` : ''}${items.length ? `, ${items.length} przypomnień` : ''}`);
    if (holiday) cell.title = holiday;
    const previews = items.slice(0, 2).map(({
      reminder,
      date
    }) => {
      const done = reminder.completedDates.includes(date);
      return `<span class="calendar-entry ${done ? 'is-done' : ''} ${reminder.kind === 'info' ? 'is-info' : ''}"><i></i><span>${escapeHtml(reminder.time ? `${reminder.time} ` : '')}${escapeHtml(reminder.title)}</span></span>`;
    }).join('');
    cell.innerHTML = `<span class="day-number">${day.getDate()}</span><span class="calendar-entries">${previews}</span>${items.length > 2 ? `<span class="more-entries">+${items.length - 2} więcej</span>` : ''}`;
    cell.addEventListener('click', () => {
      selectedDate = key;
      agendaMode = false;
      renderCalendar();
    });
    grid.append(cell);
  }
  document.getElementById('month-count').textContent = `${monthEntries} ${monthEntries === 1 ? 'wpis' : 'wpisów'}`;
  renderSelectedDay(byDate);
  renderTodoList();
  updateEditingAvailability();
}
function repeatLabel(reminder) {
  if (reminder.repeat === 'none') return 'Jednorazowe';
  if (reminder.repeat === 'daily') return 'Codziennie';
  if (reminder.repeat === 'weekly') return `Co tydzień · ${reminder.weekdays.slice().sort((a, b) => (a + 6) % 7 - (b + 6) % 7).map(day => WEEKDAY_SHORT[day]).join(', ')}`;
  if (reminder.repeat === 'monthly') return 'Co miesiąc';
  return 'Co rok';
}
function renderSelectedDay(occurrences = null) {
  document.querySelector('.day-panel').classList.remove('is-agenda');
  if (agendaMode) {
    renderAllUpcoming();
    return;
  }
  document.getElementById('day-panel-eyebrow').textContent = 'WYBRANY DZIEŃ';
  document.getElementById('toggle-agenda-view').textContent = 'See All';
  document.getElementById('new-day-reminder').hidden = false;
  const date = fromDateKey(selectedDate);
  document.getElementById('selected-date-title').textContent = DATE_FORMAT.format(date);
  const container = document.getElementById('day-reminders');
  const items = occurrences ? occurrences.get(selectedDate) || [] : reminders.filter(reminder => reminder.kind !== 'todo' && reminderOccurs(reminder, date)).map(reminder => ({
    reminder,
    date: selectedDate
  }));
  if (!items.length) {
    container.innerHTML = '<div class="empty-day"><span aria-hidden="true">✦</span><strong>Brak przypomnień</strong><p>Ten dzień jest wolny od planów.</p><button type="button" class="text-action" id="empty-add-reminder">Dodaj przypomnienie</button></div>';
    document.getElementById('empty-add-reminder').addEventListener('click', () => openReminderDialog());
    return;
  }
  container.innerHTML = items.map(({
    reminder,
    date: occurrenceDate
  }) => {
    const completed = reminder.completedDates.includes(occurrenceDate);
    return renderReminderCard(reminder, occurrenceDate, completed);
  }).join('');
}
function nextUpcomingOccurrence(reminder, todayKey) {
  if (reminder.kind === 'todo') return '';
  const startKey = reminder.date > todayKey ? reminder.date : todayKey;
  const start = fromDateKey(startKey);
  const searchDays = reminder.repeat === 'yearly' ? 366 * 8 : 366;
  const limit = reminder.until && reminder.until < dateKey(addDays(start, searchDays)) ? fromDateKey(reminder.until) : addDays(start, searchDays);
  for (let day = start; day <= limit; day = addDays(day, 1)) {
    const key = dateKey(day);
    if (reminderOccurs(reminder, day)) return key;
  }
  return '';
}
function countdownLabel(dateKeyValue, todayKey) {
  const days = Math.round((fromDateKey(dateKeyValue) - fromDateKey(todayKey)) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `${days} days left`;
}
function renderReminderCard(reminder, occurrenceDate) {
  const completed = reminder.completedDates.includes(occurrenceDate);
  const info = reminder.kind === 'info';
  return `<article class="reminder-card ${info ? 'is-info no-completion' : ''} ${completed ? 'is-complete' : ''}" data-reminder-id="${escapeHtml(reminder.id)}" data-occurrence-date="${occurrenceDate}">
    ${info ? '' : `<button class="complete-toggle" type="button" data-action="complete" aria-label="${completed ? 'Oznacz jako nieukończone' : 'Oznacz jako ukończone'}" aria-pressed="${completed}"><span>✓</span></button>`}
    <button class="reminder-main" type="button" data-action="edit"><span class="reminder-time">${info ? 'Informacja' : escapeHtml(reminder.time || 'Cały dzień')} <i>·</i> ${info ? escapeHtml(DATE_FORMAT.format(fromDateKey(occurrenceDate))) : escapeHtml(repeatLabel(reminder))}</span><strong>${escapeHtml(reminder.title)}</strong>${reminder.notes ? `<span class="reminder-notes">${escapeHtml(reminder.notes)}</span>` : ''}</button>
  </article>`;
}
function renderAllUpcoming() {
  document.querySelector('.day-panel').classList.add('is-agenda');
  const todayKey = dateKey(new Date());
  const title = document.getElementById('selected-date-title');
  const container = document.getElementById('day-reminders');
  document.getElementById('day-panel-eyebrow').textContent = 'WSZYSTKIE NADCHODZĄCE';
  title.textContent = 'Upcoming';
  document.getElementById('toggle-agenda-view').textContent = 'Selected day';
  document.getElementById('new-day-reminder').hidden = true;
  const byDate = new Map();
  reminders.forEach(reminder => {
    const date = nextUpcomingOccurrence(reminder, todayKey);
    if (!date) return;
    if (!byDate.has(date)) byDate.set(date, []);
    byDate.get(date).push(reminder);
  });
  if (!byDate.size) {
    container.innerHTML = '<p class="empty-day">Nie ma nadchodzących przypomnień.</p>';
    return;
  }
  container.innerHTML = [...byDate.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, items]) => {
    const heading = DATE_FORMAT.format(fromDateKey(date));
    return `<section class="agenda-day"><div class="agenda-day-heading"><strong>${escapeHtml(heading)}</strong><span>${countdownLabel(date, todayKey)}</span></div><div class="day-reminders">${items.map(item => renderReminderCard(item, date)).join('')}</div></section>`;
  }).join('');
}
function renderTodoList() {
  const container = document.getElementById('todo-list');
  const todos = reminders.filter(reminder => reminder.kind === 'todo');
  const expanded = new Set([...container.querySelectorAll('.todo-subtasks[open]')].map(details => details.closest('[data-todo-id]')?.dataset.todoId).filter(Boolean));
  if (!todos.length) {
    container.innerHTML = '<div class="todo-empty">Twoja lista jest pusta. Dodaj zadanie, do którego chcesz wrócić później.</div>';
    return;
  }
  container.innerHTML = todos.map(todo => {
    const subtasks = todo.todoSubtasks || [];
    const completedCount = subtasks.filter(item => item.completed).length;
    return `<article class="todo-item ${todo.todoCompleted ? 'is-complete' : ''}" data-todo-id="${escapeHtml(todo.id)}">
      <button class="todo-toggle" type="button" data-action="todo-complete" aria-label="${todo.todoCompleted ? 'Oznacz jako niewykonane' : 'Oznacz jako wykonane'}" aria-pressed="${todo.todoCompleted}">✓</button>
      <div class="todo-main">
        <button class="todo-copy" type="button" data-action="todo-edit"><strong>${escapeHtml(todo.title)}</strong>${todo.notes ? `<span>${escapeHtml(todo.notes)}</span>` : ''}</button>
        ${subtasks.length ? `<details class="todo-subtasks" ${expanded.has(todo.id) ? 'open' : ''}><summary><span>Punkty pomocnicze</span><span>${completedCount}/${subtasks.length}</span></summary><div class="todo-subtask-list">${subtasks.map(item => `<label class="todo-subtask ${item.completed ? 'is-complete' : ''}"><input type="checkbox" data-subtask-check="${escapeHtml(item.id)}" ${item.completed ? 'checked' : ''} ${isEditLocked || isLoadingData ? 'disabled' : ''}><span>${escapeHtml(item.text)}</span></label>`).join('')}</div></details>` : ''}
      </div>
      <button class="todo-edit" type="button" data-action="todo-edit" aria-label="Edytuj zadanie">✎</button>
    </article>`;
  }).join('');
}
function renderTodoSubtaskEditor() {
  const container = document.getElementById('todo-subtask-editor-list');
  container.innerHTML = editingTodoSubtasks.length ? editingTodoSubtasks.map(item => `<div class="subtask-editor-row" data-subtask-id="${escapeHtml(item.id)}"><input type="checkbox" data-subtask-completed ${item.completed ? 'checked' : ''} aria-label="Punkt ukończony"><input class="subtask-editor-text" type="text" data-subtask-text maxlength="200" value="${escapeHtml(item.text)}" aria-label="Treść punktu pomocniczego"><button class="subtask-remove" type="button" data-action="subtask-remove" aria-label="Usuń punkt">×</button></div>`).join('') : '<p class="subtask-empty">Nie dodano jeszcze punktów.</p>';
}
function openTodoDialog(todo = null) {
  if (!API_URL || !hasLoadedData || isLoadingData || isEditLocked) return;
  editingTodoId = todo?.id || null;
  editingTodoSubtasks = (todo?.todoSubtasks || []).map(item => ({
    ...item
  }));
  document.getElementById('todo-form').reset();
  document.getElementById('todo-dialog-title').textContent = todo ? 'Edytuj zadanie' : 'Nowe zadanie';
  document.getElementById('todo-title').value = todo?.title || '';
  document.getElementById('todo-notes').value = todo?.notes || '';
  document.getElementById('todo-form-error').textContent = '';
  document.getElementById('subtask-input').value = '';
  renderTodoSubtaskEditor();
  document.getElementById('delete-todo').hidden = !todo;
  document.getElementById('todo-dialog').showModal();
}
function closeTodoDialog() {
  document.getElementById('todo-dialog').close();
  editingTodoId = null;
}
function saveTodo(event) {
  event.preventDefault();
  if (!hasLoadedData || isLoadingData || isEditLocked) return;
  const isEditing = !!editingTodoId;
  const title = document.getElementById('todo-title').value.trim();
  if (!title) {
    document.getElementById('todo-form-error').textContent = 'Wpisz treść zadania.';
    return;
  }
  const existing = reminders.find(item => item.id === editingTodoId);
  const todo = normalizeReminder({
    id: editingTodoId || (crypto.randomUUID ? crypto.randomUUID() : `todo-${Date.now()}-${Math.random().toString(36).slice(2)}`),
    kind: 'todo',
    title,
    notes: document.getElementById('todo-notes').value.trim(),
    todoCompleted: existing?.todoCompleted || false,
    todoSubtasks: editingTodoSubtasks,
    date: '',
    time: '',
    repeat: 'none',
    weekdays: [],
    until: '',
    completedDates: []
  });
  const index = reminders.findIndex(item => item.id === todo.id);
  if (index >= 0) reminders[index] = todo;else reminders.push(todo);
  closeTodoDialog();
  renderTodoList();
  beginDatabaseConsole(isEditing ? 'AKTUALIZACJA ZADANIA TO DO' : 'DODAWANIE ZADANIA TO DO');
  queueDatabaseWrite({
    action: 'save',
    reminder: todo
  }, 'Zapis zadania');
}
async function deleteTodo() {
  if (!editingTodoId || !hasLoadedData || isLoadingData || isEditLocked) return;
  if (!(await confirmInPage({
    title: 'Usunąć zadanie?',
    message: 'To zadanie zostanie usunięte z listy i bazy danych.',
    confirmLabel: 'Usuń',
    danger: true
  }))) return;
  const id = editingTodoId;
  reminders = reminders.filter(item => item.id !== id);
  closeTodoDialog();
  renderTodoList();
  beginDatabaseConsole('USUWANIE ZADANIA TO DO');
  queueDatabaseWrite({
    action: 'delete',
    id
  }, 'Usunięcie zadania');
}
function toggleTodo(id) {
  if (!hasLoadedData || isLoadingData || isEditLocked) return;
  const todo = reminders.find(item => item.id === id && item.kind === 'todo');
  if (!todo) return;
  todo.todoCompleted = !todo.todoCompleted;
  renderTodoList();
  beginDatabaseConsole(todo.todoCompleted ? 'ZAZNACZANIE ZADANIA' : 'COFANIE ZADANIA');
  queueDatabaseWrite({
    action: 'todo-complete',
    id,
    completed: todo.todoCompleted
  }, 'Status zadania');
}
function addTodoSubtask() {
  const input = document.getElementById('subtask-input');
  const text = input.value.trim();
  const error = document.getElementById('todo-form-error');
  if (!text) {
    error.textContent = 'Wpisz treść punktu pomocniczego.';
    input.focus();
    return;
  }
  if (editingTodoSubtasks.length >= 50) {
    error.textContent = 'Możesz dodać maksymalnie 50 punktów do jednego zadania.';
    return;
  }
  editingTodoSubtasks.push({
    id: crypto.randomUUID ? crypto.randomUUID() : `step-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text: text.slice(0, 200),
    completed: false
  });
  error.textContent = '';
  input.value = '';
  renderTodoSubtaskEditor();
  input.focus();
}
function handleTodoSubtaskEditorClick(event) {
  if (event.target.closest('#add-subtask')) {
    event.preventDefault();
    addTodoSubtask();
    return;
  }
  const remove = event.target.closest('[data-action="subtask-remove"]');
  if (!remove) return;
  const row = remove.closest('[data-subtask-id]');
  editingTodoSubtasks = editingTodoSubtasks.filter(item => item.id !== row.dataset.subtaskId);
  renderTodoSubtaskEditor();
}
function handleTodoSubtaskEditorChange(event) {
  const row = event.target.closest('[data-subtask-id]');
  if (!row) return;
  const item = editingTodoSubtasks.find(subtask => subtask.id === row.dataset.subtaskId);
  if (!item) return;
  if (event.target.matches('[data-subtask-completed]')) item.completed = event.target.checked;
  if (event.target.matches('[data-subtask-text]')) item.text = event.target.value.trim().slice(0, 200);
}
function handleTodoSubtaskListChange(event) {
  const checkbox = event.target.closest('[data-subtask-check]');
  if (!checkbox || !hasLoadedData || isLoadingData || isEditLocked) return;
  const card = checkbox.closest('[data-todo-id]');
  const todo = reminders.find(item => item.id === card?.dataset.todoId && item.kind === 'todo');
  const subtask = todo?.todoSubtasks.find(item => item.id === checkbox.dataset.subtaskCheck);
  if (!todo || !subtask) return;
  subtask.completed = checkbox.checked;
  renderTodoList();
  beginDatabaseConsole(subtask.completed ? 'ZAZNACZANIE PUNKTU' : 'COFANIE PUNKTU');
  queueDatabaseWrite({
    action: 'save',
    reminder: todo
  }, 'Zapis punktu zadania');
}
function openReminderDialog(reminder = null) {
  if (!API_URL || !hasLoadedData || isLoadingData || isEditLocked) return;
  editingId = reminder?.id || null;
  const form = document.getElementById('reminder-form');
  form.reset();
  document.getElementById('dialog-title').textContent = reminder ? reminder.kind === 'info' ? 'Edytuj informację' : 'Edytuj przypomnienie' : 'Nowy wpis';
  document.getElementById('reminder-title').value = reminder?.title || '';
  document.getElementById('reminder-notes').value = reminder?.notes || '';
  document.getElementById('reminder-kind').value = reminder?.kind === 'info' ? 'info' : 'reminder';
  document.getElementById('reminder-time-mode').value = 'absolute';
  document.getElementById('reminder-date').value = reminder?.date || selectedDate;
  document.getElementById('reminder-time').value = reminder?.time || '';
  document.getElementById('relative-days').value = '0';
  document.getElementById('relative-hours').value = '0';
  document.getElementById('relative-minutes').value = '0';
  document.getElementById('reminder-repeat').value = reminder?.repeat || 'none';
  document.getElementById('reminder-until').value = reminder?.until || '';
  document.querySelectorAll('#weekday-picker input').forEach(input => {
    input.checked = !!reminder?.weekdays.includes(Number(input.value));
  });
  document.getElementById('delete-reminder').hidden = !reminder;
  document.getElementById('form-error').textContent = '';
  updateRepeatFields();
  document.getElementById('reminder-dialog').showModal();
  document.getElementById('reminder-title').focus();
}
function relativeReminderDateTime() {
  const days = Number(document.getElementById('relative-days').value) || 0;
  const hours = Number(document.getElementById('relative-hours').value) || 0;
  const minutes = Number(document.getElementById('relative-minutes').value) || 0;
  const duration = ((days * 24 + hours) * 60 + minutes) * 60 * 1000;
  if (duration <= 0) return null;
  return new Date(Math.ceil((Date.now() + duration) / 60000) * 60000);
}
function updateDueModeFields() {
  const relative = document.getElementById('reminder-time-mode').value === 'relative' && document.getElementById('reminder-kind').value === 'reminder';
  document.getElementById('absolute-due-fields').hidden = relative;
  document.getElementById('relative-due-fields').hidden = !relative;
  document.getElementById('reminder-date').required = !relative;
  const preview = document.getElementById('relative-due-preview');
  const target = relativeReminderDateTime();
  preview.textContent = target ? `Termin: ${target.toLocaleString('pl-PL', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })}` : 'Ustaw co najmniej 1 minutę.';
}
function updateRepeatFields() {
  const repeat = document.getElementById('reminder-repeat').value;
  const info = document.getElementById('reminder-kind').value === 'info';
  document.getElementById('reminder-notes').required = info;
  document.querySelector('#reminder-notes').closest('.form-field').querySelector('.optional').hidden = info;
  document.getElementById('reminder-repeat').closest('.form-field').hidden = info;
  document.getElementById('weekday-picker').hidden = info || repeat !== 'weekly';
  document.getElementById('repeat-until-field').hidden = info || repeat === 'none';
  document.getElementById('reminder-time-mode').closest('.form-field').hidden = info;
  updateDueModeFields();
  document.getElementById('save-reminder').textContent = info ? 'Zapisz informację' : 'Zapisz przypomnienie';
}
function closeReminderDialog() {
  document.getElementById('reminder-dialog').close();
  editingId = null;
}
function saveReminder(event) {
  event.preventDefault();
  if (!API_URL || !hasLoadedData || isLoadingData || isEditLocked) return;
  const title = document.getElementById('reminder-title').value.trim();
  let date = document.getElementById('reminder-date').value;
  let time = document.getElementById('reminder-time').value;
  const repeat = document.getElementById('reminder-repeat').value;
  const kind = document.getElementById('reminder-kind').value;
  const relative = kind === 'reminder' && document.getElementById('reminder-time-mode').value === 'relative';
  const weekdays = [...document.querySelectorAll('#weekday-picker input:checked')].map(input => Number(input.value));
  const until = document.getElementById('reminder-until').value;
  const error = document.getElementById('form-error');
  if (relative) {
    const target = relativeReminderDateTime();
    if (!target) {
      error.textContent = 'Ustaw czas większy od 0.';
      return;
    }
    const pad = value => String(value).padStart(2, '0');
    date = `${target.getFullYear()}-${pad(target.getMonth() + 1)}-${pad(target.getDate())}`;
    time = `${pad(target.getHours())}:${pad(target.getMinutes())}`;
  }
  if (!title || !date) {
    error.textContent = 'Uzupełnij nazwę i datę.';
    return;
  }
  if (kind === 'info' && !document.getElementById('reminder-notes').value.trim()) {
    error.textContent = 'Dodaj notatkę do informacji.';
    return;
  }
  if (kind === 'reminder' && repeat === 'weekly' && !weekdays.length) {
    error.textContent = 'Wybierz co najmniej jeden dzień tygodnia.';
    return;
  }
  if (kind === 'reminder' && until && until < date) {
    error.textContent = 'Koniec powtarzania nie może być przed datą rozpoczęcia.';
    return;
  }
  const existing = reminders.find(item => item.id === editingId);
  const reminder = {
    id: editingId || (crypto.randomUUID ? crypto.randomUUID() : `rem-${Date.now()}-${Math.random().toString(36).slice(2)}`),
    title,
    notes: document.getElementById('reminder-notes').value.trim(),
    date,
    time,
    repeat: kind === 'info' ? 'none' : repeat,
    weekdays: kind === 'reminder' && repeat === 'weekly' ? weekdays : [],
    until: kind === 'reminder' && repeat !== 'none' ? until : '',
    completedDates: kind === 'info' ? [] : existing?.completedDates || [],
    kind
  };
  beginDatabaseConsole(editingId ? 'ZAPIS ZMIAN' : 'DODAWANIE PRZYPOMNIENIA');
  addDatabaseConsoleStep('Weryfikacja danych przypomnienia', 'success');
  const index = reminders.findIndex(item => item.id === reminder.id);
  if (index >= 0) reminders[index] = reminder;else reminders.push(reminder);
  selectedDate = reminder.date;
  visibleMonth = new Date(fromDateKey(selectedDate).getFullYear(), fromDateKey(selectedDate).getMonth(), 1);
  closeReminderDialog();
  renderCalendar();
  queueDatabaseWrite({
    action: 'save',
    reminder
  }, kind === 'info' ? 'Zapis informacji' : 'Zapis przypomnienia');
}
async function deleteReminder() {
  if (!editingId || !hasLoadedData || isLoadingData || isEditLocked) return;
  if (!(await confirmInPage({
    title: 'Usunąć wpis?',
    message: 'To przypomnienie lub informacja zostanie usunięta z kalendarza i bazy danych.',
    confirmLabel: 'Usuń',
    danger: true
  }))) return;
  const id = editingId;
  beginDatabaseConsole('USUWANIE PRZYPOMNIENIA');
  reminders = reminders.filter(reminder => reminder.id !== id);
  closeReminderDialog();
  renderCalendar();
  queueDatabaseWrite({
    action: 'delete',
    id
  }, 'Usunięcie przypomnienia');
}
function toggleComplete(id, date, completed) {
  if (!hasLoadedData || isLoadingData || isEditLocked) return;
  beginDatabaseConsole(completed ? 'ZAZNACZANIE UKOŃCZENIA' : 'COFANIE UKOŃCZENIA');
  const reminder = reminders.find(item => item.id === id);
  if (reminder) {
    const dates = new Set(reminder.completedDates);
    if (completed) dates.add(date);else dates.delete(date);
    reminder.completedDates = [...dates];
  }
  renderCalendar();
  queueDatabaseWrite({
    action: 'complete',
    id,
    date,
    completed
  }, 'Status przypomnienia');
}
function toggleDatabaseConsole() {
  const body = document.getElementById('dbConsoleBody');
  const button = document.getElementById('dbConsoleToggle');
  const collapsed = body.hidden;
  body.hidden = !collapsed;
  button.setAttribute('aria-expanded', String(collapsed));
  button.title = collapsed ? 'Zwiń konsolę' : 'Rozwiń konsolę';
  button.textContent = collapsed ? '⌃' : '⌄';
}
function cycleDatabaseConsoleSize() {
  const root = document.getElementById('databaseConsole');
  consoleSize = (consoleSize + 1) % 3;
  root.dataset.size = String(consoleSize);
  const button = document.getElementById('dbConsoleSize');
  button.title = ['Zmień rozmiar konsoli', 'Powiększ konsolę', 'Przywróć rozmiar konsoli'][consoleSize];
}
function updateConsoleSuggestions() {
  const input = document.getElementById('dbConsoleCommandInput');
  const list = document.getElementById('dbConsoleSuggestions');
  const query = input.value.trim().toLowerCase();
  const matches = query.startsWith('/') ? CONSOLE_COMMANDS.filter(item => item.command.startsWith(query)) : [];
  list.innerHTML = matches.map(item => `<button type="button" class="console-suggestion" role="option" data-command="${item.command}"><code>${item.command}</code><span>${item.description}</span></button>`).join('');
  list.hidden = matches.length === 0;
}
async function fetchVerifiedRemote() {
  const result = await requestDatabase();
  if (!Array.isArray(result.reminders) || !Number.isInteger(result.count) || result.count !== result.reminders.length || !result.checksum) {
    throw new Error('Endpoint nie zwrócił zgodnej liczby wpisów, sumy kontrolnej i listy danych. Sprawdź wersję wdrożenia Apps Script.');
  }
  const items = result.reminders.map(normalizeReminder);
  if ((await remindersChecksum(items)) !== result.checksum) throw new Error('Suma kontrolna odczytanych danych jest niezgodna.');
  if (!apiVersionMatches(result)) throw new Error(`Apps Script jest nieaktualny (wersja ${result.appVersion || result.coreVersion || 'nieznana'}, wymagana ${REQUIRED_APP_VERSION}).`);
  if (result.storedChecksum !== result.checksum || result.coreValid !== true) throw new Error('Metadane integralności lub struktura arkusza są niezgodne.');
  return {
    items,
    checksum: result.checksum,
    storedChecksum: result.storedChecksum,
    revision: result.revision
  };
}
function downloadVerifiedBackup(record) {
  const contents = JSON.stringify({
    format: 'harmonogram-backup-v1',
    savedAt: record.savedAt || '',
    checksum: record.checksum,
    reminders: record.reminders
  }, null, 2);
  const url = URL.createObjectURL(new Blob([contents], {
    type: 'application/json'
  }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `harmonogram-backup-${dateKey(new Date())}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
async function verifyDatabase() {
  if (pendingWrites) await databaseWriteQueue;
  beginDatabaseConsole('WERYFIKACJA BAZY');
  addDatabaseConsoleStep('Pobieranie raportu integralności');
  try {
    const report = await requestDatabase(null, `verify=1&t=${Date.now()}`);
    if (report.status !== 'ok' || !Number.isInteger(report.count) || !report.calculatedChecksum || !report.snapshotFingerprint) throw new Error('Raport weryfikacji ma nieprawidłowy format. Zaktualizuj wdrożenie Apps Script.');
    lastIntegrityVerifiedAt = new Date();
    const countValid = report.count === report.storedCount;
    const checksumValid = report.checksumValid === true && report.storedChecksum === report.calculatedChecksum;
    const versionMatches = apiVersionMatches(report);
    const coreValid = report.coreValid === true && versionMatches;
    addDatabaseConsoleStep('Sprawdzanie struktury arkusza', coreValid ? 'success' : 'error', coreValid ? `schemat ${report.coreVersion || '—'}` : `wersja Apps Script ${report.appVersion || report.coreVersion || 'nieznana'} · wymagana ${REQUIRED_APP_VERSION}; metadane ${report.coreVersion || 'brak'}`);
    addDatabaseConsoleStep('Sprawdzanie liczby wpisów', countValid ? 'success' : 'error', `${report.count} w bazie · ${report.storedCount} w metadanych`);
    addDatabaseConsoleStep('Sprawdzanie sumy SHA-256', checksumValid ? 'success' : 'error', `zapisana ${String(report.storedChecksum).slice(0, 16)}… · wyliczona ${String(report.calculatedChecksum).slice(0, 16)}…`);
    if (!report.dataValid || report.calculatedChecksum !== serverChecksum) {
      isEditLocked = true;
      writesBlocked = true;
      pendingIntegrityRepair = {
        ...report,
        verifiedAt: Date.now()
      };
      updateEditingAvailability();
      finishDatabaseConsole('error', 'Edycja zablokowana. Użyj /repair core, /repair checksum lub /repair all i potwierdź działanie w oknie na stronie.');
      return;
    }
    pendingIntegrityRepair = {
      ...report,
      verifiedAt: Date.now()
    };
    writesBlocked = false;
    finishDatabaseConsole('ready', 'Struktura, liczba wpisów i suma kontrolna są poprawne');
  } catch (error) {
    writesBlocked = true;
    isEditLocked = true;
    updateEditingAvailability();
    finishDatabaseConsole('error', error.message || 'Weryfikacja nie powiodła się.');
  }
}
async function repairDatabaseNow(requestedScope = 'all') {
  if (!['core', 'checksum', 'all'].includes(requestedScope)) requestedScope = 'all';
  if (pendingWrites) await databaseWriteQueue;
  beginDatabaseConsole('NAPRAWA BAZY DANYCH');
  try {
    addDatabaseConsoleStep('Pobieranie aktualnego raportu integralności');
    const report = await requestDatabase(null, `verify=1&t=${Date.now()}`);
    if (report.status !== 'ok' || !report.snapshotFingerprint || !Number.isInteger(report.count)) {
      throw new Error('Raport naprawy ma nieprawidłowy format. Zaktualizuj i opublikuj Apps Script.');
    }
    if (!apiVersionMatches(report)) {
      throw new Error(`Naprawa nie może działać z tym wdrożeniem Apps Script (wersja ${report.appVersion || report.coreVersion || 'nieznana'}). Wklej aktualny plik AppsScript.gs i opublikuj nową wersję przed ponowną próbą.`);
    }
    lastIntegrityVerifiedAt = new Date();
    addDatabaseConsoleStep('Odczyt raportu integralności', 'success', `${report.count} wpisów · rewizja ${report.revision}`);
    if (report.dataValid === true) {
      pendingIntegrityRepair = null;
      writesBlocked = false;
      addDatabaseConsoleStep('Wynik', 'success', 'Baza jest już poprawna; ponownie wczytuję dane.');
      await loadReminders();
      return;
    }
    const problems = [];
    if (report.coreValid !== true) problems.push('struktura');
    if (report.checksumValid !== true || report.storedChecksum !== report.calculatedChecksum) problems.push('suma kontrolna');
    if (report.count !== report.storedCount) problems.push('liczba wpisów');
    addDatabaseConsoleStep('Wykryte problemy', 'error', problems.join(' · ') || 'integralność bazy');
    let scope = requestedScope;
    if (scope === 'checksum' && report.coreValid !== true || scope === 'core' && (report.checksumValid !== true || report.count !== report.storedCount)) {
      scope = 'all';
      addDatabaseConsoleStep('Rozszerzenie zakresu', 'info', 'Sama wybrana naprawa nie usunęłaby wszystkich wykrytych błędów; zostaną naprawione struktura i metadane.');
    }
    const accepted = await confirmInPage({
      title: 'Naprawić bazę danych?',
      message: `Wykryto problem: ${problems.join(', ') || 'integralność bazy'}. Zakres naprawy: ${scope}. Naprawa nie edytuje treści wpisów.`,
      confirmLabel: 'Napraw bazę',
      danger: true
    });
    if (!accepted) {
      addDatabaseConsoleStep('Naprawa anulowana', 'info', 'Baza nie została zmieniona.');
      finishDatabaseConsole(report.dataValid === true ? 'ready' : 'error', 'Naprawa anulowana');
      return;
    }
    const fresh = await requestDatabase(null, `verify=1&t=${Date.now()}`);
    if (fresh.revision !== report.revision || fresh.snapshotFingerprint !== report.snapshotFingerprint) {
      throw new Error('Baza zmieniła się od odczytu. Uruchom /napraw ponownie.');
    }
    addDatabaseConsoleStep('Wysyłanie naprawy do arkusza');
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({
        action: 'repair-integrity',
        scope,
        revision: report.revision,
        snapshotFingerprint: report.snapshotFingerprint
      }),
      cache: 'no-store'
    });
    if (response.type !== 'opaque' && !response.ok) throw new Error(`Usługa zwróciła HTTP ${response.status}.`);
    addDatabaseConsoleStep('Sprawdzanie efektu naprawy');
    const verified = await requestDatabase(null, `verify=1&t=${Date.now()}`);
    if (verified.dataValid !== true || verified.coreValid !== true || !apiVersionMatches(verified) || verified.checksumValid !== true || verified.count !== verified.storedCount) {
      const remaining = [];
      if (verified.coreValid !== true) remaining.push(`struktura arkusza (metadane ${verified.coreVersion || 'nieznane'})`);
      if (!apiVersionMatches(verified)) remaining.push(`wersja Apps Script (${verified.appVersion || verified.coreVersion || 'nieznana'})`);
      if (verified.checksumValid !== true || verified.storedChecksum !== verified.calculatedChecksum) remaining.push('suma kontrolna');
      if (verified.count !== verified.storedCount) remaining.push('liczba wpisów');
      throw new Error(`Apps Script nie potwierdził naprawy (${remaining.join(', ') || 'nieznany problem'}). Sprawdź, czy opublikowano najnowszy kod Apps Script.`);
    }
    pendingIntegrityRepair = null;
    writesBlocked = false;
    await loadReminders();
    addDatabaseConsoleStep('Naprawa potwierdzona', 'success', `Baza poprawna · rewizja ${verified.revision}`);
  } catch (error) {
    pendingIntegrityRepair = null;
    writesBlocked = true;
    isEditLocked = true;
    updateEditingAvailability();
    finishDatabaseConsole('error', error.message || 'Nie udało się naprawić bazy.');
  }
}
async function runConsoleCommand(event) {
  event.preventDefault();
  const input = document.getElementById('dbConsoleCommandInput');
  const command = input.value.trim().toLowerCase();
  document.getElementById('dbConsoleSuggestions').hidden = true;
  input.value = '';
  if (command === '/reload' || command === '/wczytaj') return loadReminders();
  if (command === '/repair' || command === '/napraw' || command === '/repair all') return repairDatabaseNow('all');
  if (command === '/repair core') return repairDatabaseNow('core');
  if (command === '/repair checksum') return repairDatabaseNow('checksum');
  if (command === '/verify' || command === '/sprawdz') return verifyDatabase();
  if (command === '/lock') {
    if (!hasLoadedData) return;
    isEditLocked = true;
    clearTimeout(editIdleTimer);
    updateEditingAvailability();
    setDatabaseState('ready', 'Edycja zablokowana');
    addDatabaseConsoleStep('Blokada edycji', 'success', 'Dane pozostały bez zmian.');
    return;
  }
  if (command === '/clear') {
    document.getElementById('dbConsoleLog').replaceChildren();
    addDatabaseConsoleStep('Konsola wyczyszczona', 'success', 'Historia poleceń wyczyszczona.');
    return;
  }
  if (command === '/status') {
    const secondsToLock = !isEditLocked && lastUserEditAt ? Math.max(0, Math.ceil((EDIT_LOCK_MS - (Date.now() - lastUserEditAt.getTime())) / 1000)) : 0;
    addDatabaseConsoleStep('Stan bazy', 'info', `połączenie ${document.getElementById('database-badge-text').textContent} · ${hasLoadedData ? 'dane wczytane' : 'brak potwierdzonego odczytu'} · ${reminders.length} wpisów · ${pendingWrites} zmian oczekuje · autosave ${pendingWrites ? '3 s bezczynności / kontrola co 10 s' : 'bez zmian do zapisu'} · edycja ${isEditLocked ? 'zablokowana' : `odblokowana, blokada za ${secondsToLock}s`} · rewizja ${pendingIntegrityRepair?.revision ?? serverRevision ?? 'brak raportu'} · SHA ${serverChecksum ? `${serverChecksum.slice(0, 16)}…` : 'brak'} · ostatnia synchronizacja ${lastDatabaseSyncAt ? lastDatabaseSyncAt.toLocaleString('pl-PL') : 'brak'} · ostatnia weryfikacja ${lastIntegrityVerifiedAt ? lastIntegrityVerifiedAt.toLocaleString('pl-PL') : 'brak'} · naprawa ${pendingIntegrityRepair?.scope || 'brak'}`);
    return;
  }
  if (command === '/backup' || command === '/kopia' || command === '/export' || command.startsWith('/export ')) {
    try {
      const remote = await fetchVerifiedRemote();
      const backup = {
        reminders: remote.items,
        checksum: remote.checksum,
        savedAt: new Date().toISOString()
      };
      downloadVerifiedBackup(backup);
      addDatabaseConsoleStep('Pobieranie kopii', 'success', `${backup.reminders.length} wpisów · SHA ${backup.checksum.slice(0, 16)}…`);
    } catch (error) {
      addDatabaseConsoleStep('Pobieranie kopii', 'error', error.message || 'Nie udało się pobrać danych.');
    }
    return;
  }
  if (command === '/help' || command === '/pomoc') {
    addDatabaseConsoleStep('Dostępne komendy', 'info', CONSOLE_COMMANDS.map(item => `${item.command} — ${item.description}`).join(' · '));
    return;
  }
  addDatabaseConsoleStep('Nieznana komenda', 'error', 'Użyj /help, aby zobaczyć dostępne komendy.');
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('previous-month').addEventListener('click', () => {
    visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
    renderCalendar();
  });
  document.getElementById('next-month').addEventListener('click', () => {
    visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
    renderCalendar();
  });
  document.getElementById('go-today').addEventListener('click', () => {
    const today = new Date();
    selectedDate = dateKey(today);
    visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    renderCalendar();
  });
  document.getElementById('new-reminder-button').addEventListener('click', () => openReminderDialog());
  document.getElementById('toggle-edit-lock').addEventListener('click', toggleEditLock);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && pendingDatabaseMutations.length) flushDatabaseWrites();
  });
  document.addEventListener('input', event => {
    if (event.target.closest('#reminder-dialog, #todo-dialog') && !isEditLocked) markEditActivity();
  });
  document.getElementById('new-day-reminder').addEventListener('click', () => openReminderDialog());
  document.getElementById('day-reminders').addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const card = button.closest('[data-reminder-id]');
    if (!card) return;
    const reminder = reminders.find(item => item.id === card.dataset.reminderId);
    if (!reminder) return;
    if (button.dataset.action === 'edit') openReminderDialog(reminder);
    if (button.dataset.action === 'complete') toggleComplete(reminder.id, card.dataset.occurrenceDate, button.getAttribute('aria-pressed') !== 'true');
  });
  document.getElementById('new-todo-button').addEventListener('click', () => openTodoDialog());
  document.querySelectorAll('[data-retry-load]').forEach(button => button.addEventListener('click', loadReminders));
  document.querySelectorAll('[data-accept-empty]').forEach(button => button.remove());
  document.getElementById('toggle-agenda-view').addEventListener('click', () => {
    agendaMode = !agendaMode;
    renderSelectedDay();
  });
  document.getElementById('todo-list').addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    const card = button?.closest('[data-todo-id]');
    if (!button || !card) return;
    const todo = reminders.find(item => item.id === card.dataset.todoId && item.kind === 'todo');
    if (!todo) return;
    if (button.dataset.action === 'todo-complete') toggleTodo(todo.id);
    if (button.dataset.action === 'todo-edit') openTodoDialog(todo);
  });
  document.getElementById('todo-list').addEventListener('change', handleTodoSubtaskListChange);
  document.getElementById('todo-subtask-editor-list').addEventListener('click', handleTodoSubtaskEditorClick);
  document.getElementById('todo-subtask-editor-list').addEventListener('change', handleTodoSubtaskEditorChange);
  document.getElementById('subtask-input').addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTodoSubtask();
    }
  });
  document.getElementById('add-subtask').addEventListener('click', addTodoSubtask);
  document.getElementById('todo-form').addEventListener('submit', saveTodo);
  document.getElementById('delete-todo').addEventListener('click', deleteTodo);
  document.getElementById('close-todo-dialog').addEventListener('click', closeTodoDialog);
  document.getElementById('cancel-todo-dialog').addEventListener('click', closeTodoDialog);
  document.getElementById('todo-dialog').addEventListener('click', event => {
    if (event.target === event.currentTarget) closeTodoDialog();
  });
  document.getElementById('reminder-repeat').addEventListener('change', updateRepeatFields);
  document.getElementById('reminder-kind').addEventListener('change', updateRepeatFields);
  document.getElementById('reminder-time-mode').addEventListener('change', updateDueModeFields);
  ['relative-days', 'relative-hours', 'relative-minutes'].forEach(id => document.getElementById(id).addEventListener('input', updateDueModeFields));
  document.getElementById('reminder-form').addEventListener('submit', saveReminder);
  document.getElementById('delete-reminder').addEventListener('click', deleteReminder);
  document.getElementById('close-dialog').addEventListener('click', closeReminderDialog);
  document.getElementById('cancel-dialog').addEventListener('click', closeReminderDialog);
  document.getElementById('reminder-dialog').addEventListener('click', event => {
    if (event.target === event.currentTarget) closeReminderDialog();
  });
  document.getElementById('dbConsoleToggle').addEventListener('click', toggleDatabaseConsole);
  document.getElementById('dbConsoleSize').addEventListener('click', cycleDatabaseConsoleSize);
  document.getElementById('dbConsoleCommandForm').addEventListener('submit', runConsoleCommand);
  document.getElementById('dbConsoleCommandInput').addEventListener('input', updateConsoleSuggestions);
  document.getElementById('dbConsoleCommandInput').addEventListener('keydown', event => {
    if (event.key === 'Escape') document.getElementById('dbConsoleSuggestions').hidden = true;
    if (event.key === 'Tab' && !document.getElementById('dbConsoleSuggestions').hidden) {
      const first = document.querySelector('#dbConsoleSuggestions [data-command]');
      if (first) {
        event.preventDefault();
        document.getElementById('dbConsoleCommandInput').value = first.dataset.command;
        updateConsoleSuggestions();
      }
    }
  });
  document.getElementById('dbConsoleSuggestions').addEventListener('click', event => {
    const suggestion = event.target.closest('[data-command]');
    if (!suggestion) return;
    document.getElementById('dbConsoleCommandInput').value = suggestion.dataset.command;
    document.getElementById('dbConsoleSuggestions').hidden = true;
    document.getElementById('dbConsoleCommandInput').focus();
  });
  renderCalendar();
  loadReminders();
});
