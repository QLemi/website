# DBD Killer Hub — jak aktualizować (dla właściciela)

Strona jest **offline** (HTML/CSS/JS + LocalStorage).  
Użytkownicy tylko przeglądają. Ty co jakiś czas wchodzisz w **Editor / Settings**.

---

## Struktura plików

```
dbd-hub/
  index.html          ← start
  style.css
  js/
    app.js            ← logika UI (nie ruszaj bez potrzeby)
  data/
    data.js           ← killerzy, buildy, tagi, perki (Twoje dane)
    config.js         ← URL portretów i ikon perków
    otz-addons.js     ← tierlista addonów Otza (+ helpery)
  tools/
    fetch-otz.mjs     ← jedyna zalecana aktualizacja Otza
  UPDATE.md           ← ten plik
```

---

## 1. Zmiana notatek / tierów / buildów / tagów

1. Otwórz stronę → **⚙ Editor**
2. Edytuj killera / build / tagi
3. **Generate data.js code** → **Copy code**
4. Wklej całość do pliku **`data/data.js`** (nadpisz)
5. Odśwież stronę (Ctrl+F5)  
   Opcjonalnie: Settings → Reset to starter data (wczyta świeży `data.js` do LocalStorage)

LocalStorage trzyma roboczą kopię. **Trwały zapis = plik `data/data.js`.**

---

## 2. Nowy killer (np. nowy chapter)

### A. Dane na stronie
1. Editor → Killers → **+ Add killer**
2. Nazwa dokładnie jak w grze, np. `The Judgement`
3. Tagi, difficulty, notes, guide, combo addonów…
4. Generate → wklej do **`data/data.js`**

### B. Portret
W **`data/config.js`** w obiekcie `killerPortraits` dodaj:

```js
"The Judgement": "https://deadbydaylight.wiki.gg/images/KXX_TheJudgement_Portrait.png",
```

(URL z wiki.gg)

### C. Addony Otza

`data/otz-addons.js` to **tylko dane** (`var OTZ_ADDONS = { ... }`). Logika jest w `js/app.js`.

**Reguła:** klucz w pliku = `killer.id` → addony podpinają się same.

1. Settings → Otz folder ID (np. `chucky`) + opcjonalnie klucz = Twój `killer.id`
2. **Fetch** → **Copy** → wklej do `OTZ_ADDONS` w `data/otz-addons.js`
3. Ctrl+F5

Cała lista od zera: `node tools/fetch-otz.mjs`


## 3. Nowy perk (ikona)

1. Editor → Perks → **+ Add perk** (nazwa + URL ikony z wiki.gg)
2. Skopiuj wygenerowany fragment do **`data/config.js`** → `perkIcons`
3. Generate data.js jeśli lista perków ma zostać w `data.js`

---

## 4. Czego unikać

| Złe | Dlaczego |
|-----|----------|
| Ręczne „Update Otz” tylko w przeglądarce przy `file://` | CORS — często psuje / nic nie robi |
| Pobieranie zepsutego `otz-addons.js` z błędnymi `\\n` | Stara wersja generatora — używaj tylko `node tools/fetch-otz.mjs` |
| Podmiana **tylko jednego** pliku po większej aktualizacji | `app.js` + `otz-addons.js` muszą być spójne |
| Edycja LocalStorage bez Generate → `data.js` | Po resecie / innej przeglądarce dane znikają |

---

## 5. Szybka diagnostyka Otza (konsola F12)

```js
Object.keys(getOtzStore() || {}).length
getOtzAddonsForKiller("The Trapper").length
getOtzAddonsForKiller("The Judgement").length
```

Oczekiwane: ~40+, **20**, **20**.

---

## 6. Udostępnianie innym

Wyślij **cały folder** `dbd-hub`.  
Odbiorca otwiera `index.html` (albo serwuje lokalnie: `npx serve`).  
Nie musi nic konfigurować — tylko przegląda.
