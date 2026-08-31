const characters = [
      {
        image: "https://deadbydaylight.wiki.gg/images/K39_TheGhoul_Portrait.png",
        name: "The Ghoul",
        type: "killer",
        streaks: [
          { category: "4k Only, No Hatch", value: 55, active: true },
          { category: "Only Slug 4k Only, No Hatch", value: 28 }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K05_TheShape_Portrait.png",
        name: "The Shape",
        type: "killer",
        streaks: [
          { category: "4k/3k + Hatch", value: 35 },
          { category: "Old Exposed Myers", value: 16 }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K02_TheWraith_Portrait.png",
        name: "The Wraith",
        type: "killer",
        streaks: [
          { category: "Only Slug 4k Only, No Hatch", value: 36 },
          { category: "4k Only, No Hatch", value: 2, active: true }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K15_ThePlague_Portrait.png",
        name: "The Plague",
        type: "killer",
        streaks: [
          { category: "4k Only, No Hatch", value: 25, active: true },
          { category: "4k/3k + Hatch", value: 13 }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K35_TheUnknown_Portrait.png",
        name: "The Unknown",
        type: "killer",
        streaks: [
          { category: "4k/3k + Hatch", value: 22 }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K10_TheNightmare_Portrait.png",
        name: "The Nightmare",
        type: "killer",
        streaks: [
          { category: "RPD East Showcase 2 Days Streak", value: 18 }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K06_TheHag_Portrait.png",
        name: "The Hag",
        type: "killer",
        streaks: [
          { category: "3k+", value: 15 }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K24_TheNemesis_Portrait.png",
        name: "The Nemesis",
        type: "killer",
        streaks: [
          { category: "4k/3k + Hatch", value: 11 }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K18_TheOni_Portrait.png",
        name: "The Oni",
        type: "killer",
        streaks: [
          { category: "4k/3k + Hatch", value: 8, active: true }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K37_TheDarkLord_Portrait.png",
        name: "The Dark Lord",
        type: "killer",
        streaks: [
          { category: "4k/3k + Hatch", value: 8, active: true }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K14_TheLegion_Portrait.png",
        name: "The Legion",
        type: "killer",
        streaks: [
          { category: "4k Only, No Hatch", value: 5 }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K11_ThePig_Portrait.png",
        name: "The Pig",
        type: "killer",
        streaks: [
          { category: "4k Only, No Hatch", value: 1, active: true }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K32_TheSingularity_Portrait.png",
        name: "The Singularity",
        type: "killer",
        streaks: [
          { category: "4k Only, No Hatch", value: 1, active: true }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K34_TheGoodGuy_Portrait.png",
        name: "The Good Guy",
        type: "killer",
        streaks: [
          { category: "4k Only, No Hatch", value: 1, active: true }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K42_TheFirst_Portrait.png",
        name: "The First",
        type: "killer",
        streaks: [
          { category: "3k+", value: 3, active: true }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/K43_TheSlasher_Portrait.png",
        name: "The Slasher",
        type: "killer",
        streaks: [
          { category: "4k/3k + Hatch", value: 30, active: true }
        ]
      },
      // ——— SURVIVOR ———
      {
        image: "https://deadbydaylight.wiki.gg/images/S03_ClaudetteMorel_Portrait.png",
        name: "Copycat",
        type: "survivor",
        streaks: [
          { category: "Copycat", value: 13 }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/S02_MegThomas_Portrait.png",
        name: "Solo Escape",
        type: "survivor",
        streaks: [
          { category: "Solo Escape", value: 11 }
        ]
      },
      {
        image: "https://deadbydaylight.wiki.gg/images/S01_DwightFairfield_Portrait.png",
        name: "Team Escape",
        type: "survivor",
        streaks: [
          { category: "Team Escape", value: 22 }
        ]
      }
    ];

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

    const style = document.createElement('style');
    style.textContent = `
      .card { opacity: 0; transform: translateY(18px); animation: cardIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      @keyframes cardIn { to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);