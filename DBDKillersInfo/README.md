# DBD Killer Hub

Offline strona do przeglądania killerów DBD: tagi, tier, buildy, notatki, ranking addonów Otza.

## Start

Otwórz `index.html` w przeglądarce  
albo: `npx serve` w tym folderze.

## Dla użytkowników

Tylko zakładki **Killers** i **Builds**.  
Editor / Settings są dla właściciela danych.

## Dla właściciela (aktualizacje)

Patrz **[UPDATE.md](UPDATE.md)** — krótko:

| Co | Gdzie |
|----|--------|
| Notatki, buildy, tagi | Editor → Generate → `data/data.js` |
| Portret / ikona perka | `data/config.js` |
| Addony Otza (nowy chapter) | `node tools/fetch-otz.mjs` |

## Wymagania

- Nowoczesna przeglądarka
- Do odświeżenia Otza: **Node.js 18+** (tylko przy `fetch-otz.mjs`)
