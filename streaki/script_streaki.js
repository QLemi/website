
const SHEET_ID = '1WrJPj5Pdms2lFV59NCVPm7eU5eLz2-eSp55MFk4qNGg';
const SHEET_MAIN_GID = '0';         
const SHEET_INNE_GID = '2135936810'; 

const PORTRAIT_MAP = {
  'The Trapper':          'https://deadbydaylight.wiki.gg/images/K01_TheTrapper_Portrait.png',
  'The Wraith':           'https://deadbydaylight.wiki.gg/images/K02_TheWraith_Portrait.png',
  'The Hillbilly':        'https://deadbydaylight.wiki.gg/images/K03_TheHillbilly_Portrait.png',
  'The Nurse':            'https://deadbydaylight.wiki.gg/images/K04_TheNurse_Portrait.png',
  'The Shape':            'https://deadbydaylight.wiki.gg/images/K05_TheShape_Portrait.png',
  'The Hag':              'https://deadbydaylight.wiki.gg/images/K06_TheHag_Portrait.png',
  'The Doctor':           'https://deadbydaylight.wiki.gg/images/K07_TheDoctor_Portrait.png',
  'The Huntress':         'https://deadbydaylight.wiki.gg/images/K08_TheHuntress_Portrait.png',
  'The Cannibal':         'https://deadbydaylight.wiki.gg/images/K09_TheCannibal_Portrait.png',
  'The Nightmare':        'https://deadbydaylight.wiki.gg/images/K10_TheNightmare_Portrait.png',
  'The Pig':              'https://deadbydaylight.wiki.gg/images/K11_ThePig_Portrait.png',
  'The Clown':            'https://deadbydaylight.wiki.gg/images/K12_TheClown_Portrait.png',
  'The Spirit':           'https://deadbydaylight.wiki.gg/images/K13_TheSpirit_Portrait.png',
  'The Legion':           'https://deadbydaylight.wiki.gg/images/K14_TheLegion_Portrait.png',
  'The Plague':           'https://deadbydaylight.wiki.gg/images/K15_ThePlague_Portrait.png',
  'The Ghost Face':       'https://deadbydaylight.wiki.gg/images/K16_TheGhostFace_Portrait.png',
  'The Demogorgon':       'https://deadbydaylight.wiki.gg/images/K17_TheDemogorgon_Portrait.png',
  'The Oni':              'https://deadbydaylight.wiki.gg/images/K18_TheOni_Portrait.png',
  'The Deathslinger':     'https://deadbydaylight.wiki.gg/images/K19_TheDeathslinger_Portrait.png',
  'The Executioner':      'https://deadbydaylight.wiki.gg/images/K20_TheExecutioner_Portrait.png',
  'The Blight':           'https://deadbydaylight.wiki.gg/images/K21_TheBlight_Portrait.png',
  'The Twins':            'https://deadbydaylight.wiki.gg/images/K22_TheTwins_Portrait.png',
  'The Trickster':        'https://deadbydaylight.wiki.gg/images/K23_TheTrickster_Portrait.png',
  'The Nemesis':          'https://deadbydaylight.wiki.gg/images/K24_TheNemesis_Portrait.png',
  'The Cenobite':         'https://deadbydaylight.wiki.gg/images/K25_TheCenobite_Portrait.png',
  'The Artist':           'https://deadbydaylight.wiki.gg/images/K26_TheArtist_Portrait.png',
  'The Onryo':            'https://deadbydaylight.wiki.gg/images/K27_TheOnryo_Portrait.png',
  'The Dredge':           'https://deadbydaylight.wiki.gg/images/K28_TheDredge_Portrait.png',
  'The Mastermind':       'https://deadbydaylight.wiki.gg/images/K29_TheMastermind_Portrait.png',
  'The Knight':           'https://deadbydaylight.wiki.gg/images/K30_TheKnight_Portrait.png',
  'The Skull Merchant':   'https://deadbydaylight.wiki.gg/images/K31_TheSkullMerchant_Portrait.png',
  'The Singularity':      'https://deadbydaylight.wiki.gg/images/K32_TheSingularity_Portrait.png',
  'The Xenomorph':        'https://deadbydaylight.wiki.gg/images/K33_TheXenomorph_Portrait.png',
  'The Good Guy':         'https://deadbydaylight.wiki.gg/images/K34_TheGoodGuy_Portrait.png',
  'The Unknown':          'https://deadbydaylight.wiki.gg/images/K35_TheUnknown_Portrait.png',
  'The Lich':             'https://deadbydaylight.wiki.gg/images/K36_TheLich_Portrait.png',
  'The Dark Lord':        'https://deadbydaylight.wiki.gg/images/K37_TheDarkLord_Portrait.png',
  'The Houndmaster':      'https://deadbydaylight.wiki.gg/images/K38_TheHoundmaster_Portrait.png',
  'The Ghoul':            'https://deadbydaylight.wiki.gg/images/K39_TheGhoul_Portrait.png',
  'The Animatronic':      'https://deadbydaylight.wiki.gg/images/K40_TheAnimatronic_Portrait.png',
  'The Krasue':           'https://deadbydaylight.wiki.gg/images/K41_TheKrasue_Portrait.png',
  'The First':            'https://deadbydaylight.wiki.gg/images/K42_TheFirst_Portrait.png',
  'The Slasher':          'https://deadbydaylight.wiki.gg/images/K43_TheSlasher_Portrait.png',

 
  'Copycat':              'https://deadbydaylight.wiki.gg/images/S03_ClaudetteMorel_Portrait.png',
  'Solo Escape':          'https://deadbydaylight.wiki.gg/images/S02_MegThomas_Portrait.png',
  'Team Escape':          'https://deadbydaylight.wiki.gg/images/S01_DwightFairfield_Portrait.png',
};


function parseCSV(text) {
  const rows = [];
  let current = [];
  let inQuotes = false;
  let field = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') { field += '"'; i++; }
      else if (char === '"') inQuotes = false;
      else field += char;
    } else {
      if (char === '"') inQuotes = true;
      else if (char === ',') { current.push(field); field = ''; }
      else if (char === '\n' || (char === '\r' && next === '\n')) {
        current.push(field); rows.push(current); current = []; field = '';
        if (char === '\r') i++;
      } else if (char === '\r') {
        current.push(field); rows.push(current); current = []; field = '';
      } else field += char;
    }
  }
  if (field || current.length) { current.push(field); rows.push(current); }
  return rows;
}


async function loadSheet(gid, mode) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Nie udało się pobrać arkusza gid=${gid} (HTTP ${response.status})`);
  }

  const rows = parseCSV(await response.text());
  if (rows.length < 2) return [];


  let headerRowIndex = -1;
  for (let i = 0; i < Math.min(rows.length, 15); i++) {
    const names = rows[i].filter(c => c && c.trim().length > 2);
    if (names.length >= 2) {
      headerRowIndex = i;
      break;
    }
  }
  if (headerRowIndex === -1) return [];

  const header = rows[headerRowIndex];
  const dataStart = headerRowIndex + 1;

  const positions = [];
  for (let col = 0; col < header.length; col++) {
    const name = (header[col] || '').trim();
    if (name) positions.push({ col, name });
  }

  const characters = [];

  for (const { col, name } of positions) {
    const streaks = [];
    let role = 'killer';

    for (let r = dataStart; r < rows.length; r++) {
      const row = rows[r];
      while (row.length <= col + 2) row.push('');

      let category, valueRaw, checkRaw;

      if (mode === 'inne') {
   
        const roleRaw = (row[col] || '').trim().toLowerCase();
        if (roleRaw === 's' || roleRaw === 'survivor') role = 'survivor';
        if (roleRaw === 'k' || roleRaw === 'killer') role = 'killer';

        category = name;
        valueRaw = (row[col + 1] || '').trim();
        checkRaw = (row[col + 2] || '').trim().toUpperCase();
      } else {
   
        category = (row[col] || '').trim();
        valueRaw = (row[col + 1] || '').trim();
        checkRaw = (row[col + 2] || '').trim().toUpperCase();
      }

      if (!valueRaw) continue;

      const value = parseInt(valueRaw, 10);
      if (isNaN(value)) continue;

      const isFinished = (checkRaw === 'TRUE' || checkRaw === 'CHECKED' || checkRaw === '✓' || checkRaw === 'YES');
      const active = !isFinished;

      streaks.push({
        category: category || 'Streak',
        value,
        active
      });
    }

    if (streaks.length > 0) {
      characters.push({
        image: PORTRAIT_MAP[name] || '',
        name,
        type: role,
        streaks
      });
    }
  }

  return characters;
}


async function loadCharactersFromSheet() {
  const [main, inne] = await Promise.all([
    loadSheet(SHEET_MAIN_GID, 'main'),
    loadSheet(SHEET_INNE_GID, 'inne')
  ]);

  return [...main, ...inne];
}


function renderCharacters(characters) {
  characters.forEach(c => {
    c.best = Math.max(...c.streaks.map(s => s.value));
    c.streaks.sort((a, b) => b.value - a.value);
  });
  characters.sort((a, b) => b.best - a.best);

  const totalStreaks = characters.reduce((sum, c) => sum + c.streaks.length, 0);
  const activeCount = characters.reduce((sum, c) => sum + c.streaks.filter(s => s.active).length, 0);

  document.getElementById('total-characters').textContent = characters.length;
  document.getElementById('total-streaks').textContent = totalStreaks;
  document.getElementById('best-streak').textContent = characters.length ? characters[0].best : 0;
  document.getElementById('active-count').textContent = activeCount;

  const grid = document.getElementById('streak-grid');
  grid.innerHTML = '';

  characters.forEach((c, i) => {
    const card = document.createElement('article');
    card.className = 'card' + (c.type === 'survivor' ? ' survivor' : '');
    card.style.animationDelay = `${i * 0.05}s`;

    const streaksHtml = c.streaks.map((s, idx) => `
      <div class="streak-row ${s.active ? 'active' : ''}">
        <div class="streak-left">
          ${s.active ? '<span class="active-badge">ACTIVE</span>' : ''}
          <span class="streak-category" data-full="${s.category}">${s.category}</span>
        </div>
        <span class="streak-value ${idx === 0 || s.active ? 'highlight' : ''}">${s.value}</span>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="card-top">
        <div class="portrait">
          <img src="${c.image}" alt="${c.name}" loading="lazy"
               onerror="this.src='https://via.placeholder.com/120x120/1a0a0c/8b0000?text=?'">
        </div>
        <div class="card-info">
          <div class="killer-name">${c.name}</div>
          <span class="type-tag type-${c.type}">${c.type === 'killer' ? 'Killer' : 'Survivor'}</span>
        </div>
        <div class="best-badge">
          <div class="best-label">Best</div>
          <div class="best-value">${c.best}</div>
        </div>
      </div>
      <div class="streaks-list">${streaksHtml}</div>
    `;
    grid.appendChild(card);
  });
}
async function refreshData() {
  const grid = document.getElementById('streak-grid');
  if (grid) {
    grid.innerHTML = '<p style="color:#9a9088;text-align:center;padding:2rem;grid-column:1/-1;">Ładowanie danych z Google Sheets...</p>';
  }

  try {
    const characters = await loadCharactersFromSheet();
    renderCharacters(characters);
  } catch (err) {
    if (grid) {
      grid.innerHTML = `<p style="color:#ff6b6b;text-align:center;padding:2rem;grid-column:1/-1;">Błąd: ${err.message}</p>`;
    }
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', refreshData);
window.refreshData = refreshData;
