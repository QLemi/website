const CATEGORIES = [
      ["Totalna Sigiemka", "albo prawie"],
      ["Miłośnicy", "bardziej strimera niż streama"],
      ["Widzowie Premium", "jak są, to średnia czatu idzie w górę"],
      ["Średnia półka", "ani nie irytują, ani nie zachwycają"],
      ["Marudy", "raz na rok napisze coś sensownego a tak to marudzi"],
      ["NPC Brainrot", "czy to na pewno człowiek? czy już chat gpt"],
      ["Lurker", "więcej śpi niż ogląda"]
    ];

    const VIEWERS = [
      {name: "De_Destru", color: "#e74c3c", img: "./ikony_widzów/viewer1.jpg"},
      {name: "YouBaited", img: "./ikony_widzów/youbait.png"},
      {name: "Veximei", img: "./ikony_widzów/vexy.png"},
      {name: "Mairisaun", img: "./ikony_widzów/mairi.png"},
      {name: "Dantee_z", img: "./ikony_widzów/dante.png"},
      {name: "Hvsk103sa", img: "./ikony_widzów/hvsk.png"},
      {name: "Nosti103sa", img: "./ikony_widzów/nosti.png"},
      {name: "laufiq", img: "./ikony_widzów/lauf.png"},
      {name: "Himcia", img: "./ikony_widzów/himcia.png"},
      {name: "Palladyn654", img: "./ikony_widzów/paladyn.png"},
      {name: "Amelciabot", img: "./ikony_widzów/amelka.png"},
      {name: "Nesstim1", img: "./ikony_widzów/nestim.png"},
      {name: "Szpyciooo", img: "./ikony_widzów/szypycio.png"},
      {name: "Astrid", img: "./ikony_widzów/astrid.png"},
      {name: "ferdinandfe", img: "./ikony_widzów/ferdek.png"},
      {name: "Dosiek1402", img: "./ikony_widzów/dosiek.png"},
      {name: "Matiksonnnnn103sa", img: "./ikony_widzów/mati.png"},
      {name: "Merstive", img: "./ikony_widzów/merstiv.png"},
      {name: "Smifdbd", img: "./ikony_widzów/smif.png"},
      {name: "Martella", img: "./ikony_widzów/martela.png"},
      {name: "QLemii", color: "#e74c3c", img: "./ikony_widzów/viewer2.jpg"},
      {name: "Arvena", img: "./ikony_widzów/arvena.png"},
      {name: "Izolski", img: "./ikony_widzów/izo.png"},
      {name: "Davesonek", img: "./ikony_widzów/davso.png"},
      {name: "Audiocostamm", img: "./ikony_widzów/audio.png"},
      {name: "Starsiicle", img: "./ikony_widzów/star.png"},
      {name: "ooFatimaoo", img: "./ikony_widzów/fatima.png"},
      {name: "povJesieniara", img: "./ikony_widzów/jesieniara.png"},
      {name: "TickerSloth", img: "./ikony_widzów/ticker.png"},
      {name: "BezRobotnyWojtek", img: "./ikony_widzów/szpont.png"},
      {name: "Brokatowy", img: "./ikony_widzów/brokat.png"},
      {name: "AdamrePL", img: "./ikony_widzów/adam.png"},
      {name: "M4rtin3k", img: "./ikony_widzów/mart.png"}
    ];

    const STORAGE_KEY = "tierlista-widzow-state";

    const tiersEl = document.getElementById('tiers');
    const poolEl = document.getElementById('pool');
    const resetBtn = document.getElementById('resetBtn');

    CATEGORIES.forEach(([main, sub], index) => {
      const tier = document.createElement('div');
      tier.className = 'tier';
      tier.innerHTML = `
        <div class="tier-header">
          <span class="tier-main">${main}</span>
          <span class="tier-sub">${sub}</span>
        </div>
        <div class="tier-content" data-tier="${index}"></div>
      `;
      tiersEl.appendChild(tier);
    });

    function createViewerCard(viewer) {
      const card = document.createElement('div');
      card.className = 'viewer-card';
      card.draggable = true;
      card.dataset.name = viewer.name;

      const initials = viewer.name
        .split(/[\s_]+/)
        .map(w => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

      let avatarHTML;
      if (viewer.img) {
        avatarHTML = `<div class="viewer-avatar">
          <img src="${viewer.img}" alt="${viewer.name}" loading="lazy"
               onerror="this.style.display='none'; this.parentElement.textContent='${initials}'; this.parentElement.style.background='${viewer.color || '#3a3a4d'}'">
        </div>`;
      } else {
        avatarHTML = `<div class="viewer-avatar" style="background: ${viewer.color || '#3a3a4d'}">${initials}</div>`;
      }

      card.innerHTML = `
        ${avatarHTML}
        <div class="viewer-name">${viewer.name}</div>
      `;

      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', viewer.name);
        e.dataTransfer.effectAllowed = 'move';
        card.classList.add('dragging');
        setTimeout(() => card.style.opacity = '0.4', 0);
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        card.style.opacity = '';
        clearDropIndicators();
        document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
      });

      return card;
    }

    const cards = {};

    VIEWERS.forEach(v => {
      const card = createViewerCard(v);
      cards[v.name] = card;
      poolEl.appendChild(card);
    });

    function clearDropIndicators() {
      document.querySelectorAll('.viewer-card.drag-before, .viewer-card.drag-after').forEach(el => {
        el.classList.remove('drag-before', 'drag-after');
      });
    }

    function getDropTarget(zone, clientX, clientY) {
      const cardEls = [...zone.querySelectorAll('.viewer-card:not(.dragging)')];
      if (cardEls.length === 0) return { target: null, place: 'end' };

      for (const el of cardEls) {
        const rect = el.getBoundingClientRect();
        if (clientX >= rect.left && clientX <= rect.right &&
            clientY >= rect.top && clientY <= rect.bottom) {
          const midX = rect.left + rect.width / 2;
          return { target: el, place: clientX < midX ? 'before' : 'after' };
        }
      }

      let best = null;
      let bestScore = Infinity;
      for (const el of cardEls) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clientX - cx;
        const dy = clientY - cy;
        const score = dx * dx + dy * dy * 4;
        if (score < bestScore) {
          bestScore = score;
          best = el;
        }
      }

      if (!best) return { target: null, place: 'end' };

      const rect = best.getBoundingClientRect();
      if (clientX < rect.left) return { target: best, place: 'before' };
      if (clientX > rect.right) return { target: best, place: 'after' };
      const midX = rect.left + rect.width / 2;
      return { target: best, place: clientX < midX ? 'before' : 'after' };
    }

    function getCurrentState() {
      const state = { pool: [], tiers: {} };

      poolEl.querySelectorAll('.viewer-card').forEach(card => {
        state.pool.push(card.dataset.name);
      });

      document.querySelectorAll('.tier-content').forEach(zone => {
        const tierId = zone.dataset.tier;
        state.tiers[tierId] = [];
        zone.querySelectorAll('.viewer-card').forEach(card => {
          state.tiers[tierId].push(card.dataset.name);
        });
      });

      return state;
    }

    function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(getCurrentState()));
      } catch (e) {}
    }

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
      } catch (e) {
        return null;
      }
    }

    function applyState(state) {
      if (!state) return;

      if (Array.isArray(state.pool) || state.tiers) {
        if (Array.isArray(state.pool)) {
          state.pool.forEach(name => {
            if (cards[name]) poolEl.appendChild(cards[name]);
          });
        }
        if (state.tiers) {
          Object.entries(state.tiers).forEach(([tierId, names]) => {
            const zone = document.querySelector('.tier-content[data-tier="' + tierId + '"]');
            if (!zone || !Array.isArray(names)) return;
            names.forEach(name => {
              if (cards[name]) zone.appendChild(cards[name]);
            });
          });
        }
        return;
      }

      Object.entries(state).forEach(([name, location]) => {
        const card = cards[name];
        if (!card) return;
        if (location === 'pool') {
          poolEl.appendChild(card);
        } else {
          const zone = document.querySelector('.tier-content[data-tier="' + location + '"]');
          if (zone) zone.appendChild(card);
          else poolEl.appendChild(card);
        }
      });
    }

    applyState(loadState());

    const dropZones = [
      ...document.querySelectorAll('.tier-content'),
      poolEl
    ];

    dropZones.forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        zone.classList.add('drag-over');

        clearDropIndicators();
        const info = getDropTarget(zone, e.clientX, e.clientY);
        if (info.target) {
          info.target.classList.add(info.place === 'before' ? 'drag-before' : 'drag-after');
        }
      });

      zone.addEventListener('dragleave', (e) => {
        if (!zone.contains(e.relatedTarget)) {
          zone.classList.remove('drag-over');
          clearDropIndicators();
        }
      });

      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        clearDropIndicators();

        const name = e.dataTransfer.getData('text/plain');
        const card = cards[name];
        if (!card) return;

        const info = getDropTarget(zone, e.clientX, e.clientY);

        if (info.target && info.target !== card) {
          if (info.place === 'before') {
            zone.insertBefore(card, info.target);
          } else {
            zone.insertBefore(card, info.target.nextSibling);
          }
        } else if (!info.target) {
          zone.appendChild(card);
        } else if (card.parentElement !== zone) {
          zone.appendChild(card);
        }

        saveState();
      });
    });

    document.addEventListener('dblclick', (e) => {
      const card = e.target.closest('.viewer-card');
      if (card && !poolEl.contains(card)) {
        poolEl.appendChild(card);
        saveState();
      }
    });

    resetBtn.addEventListener('click', () => {
      if (!confirm('Na pewno zresetować? Wszystkie karty wrócą do puli i zapisany układ zostanie usunięty.')) {
        return;
      }

      VIEWERS.forEach(v => {
        if (cards[v.name]) {
          poolEl.appendChild(cards[v.name]);
        }
      });

      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}

      resetBtn.textContent = '✓ Zresetowano!';
      setTimeout(() => {
        resetBtn.innerHTML = '🔄 Resetuj wszystko';
      }, 1500);
    });