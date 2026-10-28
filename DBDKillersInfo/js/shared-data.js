const SharedDbd = (() => {
  let records = null;
  let fixedConfig = null;
  const baselines = new WeakMap();
  const lookupIndexes = new WeakMap();
  let allPerks = [];
  const fixedFields = ['name', 'releaseDate', 'releaseOrder', 'chapter', 'update'];
  const localKeys = ['SHOW_OWNER_UI', 'killerTags', 'buildTags', 'itemOrder', 'addonOrder'];
  const copy = value => JSON.parse(JSON.stringify(value));
  const image = record => SharedCatalog.assetUrl(record.image?.url) || SharedCatalog.fallback();
  const find = (list, value) => {
    if (!lookupIndexes.has(list)) {
      const ids = new Map();
      const names = new Map();
      for (const record of list) {
        ids.set(record.id, record);
        for (const name of [record.name, ...(record.aliases || [])]) names.set(SharedCatalog.normalize(name), record);
      }
      lookupIndexes.set(list, {
        ids,
        names
      });
    }
    const index = lookupIndexes.get(list);
    return index.ids.get(value) || index.names.get(SharedCatalog.normalize(value));
  };
  const perkList = () => allPerks;
  async function initialize() {
    records = await SharedCatalog.loadMany(['killers', 'survivors', 'killerPerks', 'survivorPerks', 'items', 'itemAddons', 'categories']);
    allPerks = [...records.killerPerks.entries, ...records.survivorPerks.entries];
    const portraits = {};
    for (const character of records.killers.entries) {
      for (const name of [character.name, ...character.aliases]) portraits[name] = image(character);
    }
    const charactersById = new Map([...records.killers.entries, ...records.survivors.entries].map(character => [character.id, character]));
    const perk = record => ({
      id: record.id,
      name: record.name,
      role: record.role,
      character: charactersById.get(record.characterId)?.name || record.characterName || '',
      icon: image(record),
      categories: record.categories
    });
    fixedConfig = {
      killerPortraits: portraits,
      survivorRoster: records.survivors.entries.map(record => ({
        id: record.id,
        name: record.name,
        icon: image(record)
      })),
      survivorPortraits: records.survivors.entries.map(image),
      killerPerks: records.killerPerks.entries.map(perk),
      survivorPerks: records.survivorPerks.entries.map(perk),
      perkIcons: {},
      items: records.items.entries.map(record => ({
        id: record.id,
        name: record.name,
        type: record.type,
        rarity: record.rarity,
        event: record.eventId,
        bloodweb: record.availableInBloodweb,
        icon: image(record),
        description: record.description || ''
      })),
      itemAddons: records.itemAddons.entries.map(record => ({
        id: record.id,
        name: record.name,
        type: record.itemType,
        rarity: record.rarity,
        icon: image(record),
        description: record.description || ''
      })),
      typeLabels: Object.fromEntries(records.categories.itemTypes.map(type => [type.id, type.name])),
      typeOrder: records.categories.itemTypes.map(type => type.id),
      rarityColors: Object.fromEntries(records.categories.rarities.map(rarity => [rarity.id, rarity.color])),
      placeholderPortrait: SharedCatalog.fallback(),
      placeholderPerk: SharedCatalog.fallback(),
      placeholderItem: SharedCatalog.fallback()
    };
    const deepFreeze = value => {
      if (value && typeof value === 'object') {
        Object.values(value).forEach(deepFreeze);
        Object.freeze(value);
      }
      return value;
    };
    deepFreeze(fixedConfig);
    applyConfig();
  }
  function applyConfig() {
    if (fixedConfig) Object.assign(CONFIG, fixedConfig);
  }
  function characterData(id) {
    const character = records.killers.entries.find(record => record.id === id);
    if (!character) return null;
    return {
      name: character.name,
      releaseDate: character.releaseDate || '',
      releaseOrder: character.releaseOrder ?? 9999,
      chapter: character.chapterName || '',
      update: character.introducedIn || ''
    };
  }
  function hydrate(data, includeMissing = true) {
    if (!records) return data;
    data.killers ||= [];
    if (includeMissing) {
      const known = new Set(records.killers.entries.map(character => character.id));
      const orphans = new Map((data.orphanedKillers || []).map(record => [record.id, record]));
      for (const local of data.killers) if (!known.has(local.id)) orphans.set(local.id, local);
      data.killers = data.killers.filter(local => known.has(local.id));
      for (const [id, local] of orphans) {
        if (known.has(id)) {
          if (!data.killers.some(record => record.id === id)) data.killers.push(local);
          orphans.delete(id);
        }
      }
      if (orphans.size) data.orphanedKillers = [...orphans.values()];else delete data.orphanedKillers;
    }
    for (const character of records.killers.entries) {
      let local = data.killers.find(record => record.id === character.id);
      if (!local) {
        if (!includeMissing) continue;
        local = {
          id: character.id,
          difficulty: '',
          skillFloor: 0,
          skillCeiling: 0,
          fun2play: 0,
          tier: '',
          tags: [],
          patch: ''
        };
        data.killers.push(local);
      }
      Object.assign(local, characterData(character.id));
    }
    const perks = perkList();
    const legacy = data._coreConfig || {};
    const legacyPerks = new Map();
    for (const [key, role] of [['killerPerks', 'killer'], ['survivorPerks', 'survivor']]) {
      for (const perk of legacy[key] || []) {
        const generated = role + ':' + String(perk.name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const current = find(perks, perk.id || generated);
        if (current) legacyPerks.set(SharedCatalog.normalize(perk.name), current);
      }
    }
    for (const build of [...(data.builds || []), ...(data.survivorBuilds || [])]) {
      if (Array.isArray(build.perkIds) && !Array.isArray(build.perks)) build.perks = [...build.perkIds.map(id => find(perks, id)?.name || id), ...(build.unresolvedPerks || [])];else if (Array.isArray(build.perks) && legacyPerks.size) build.perks = build.perks.map(name => (find(perks, name) || legacyPerks.get(SharedCatalog.normalize(name)))?.name || name);
    }
    for (const build of [...(data.survivorBuilds || []), ...(data.loadouts || [])]) {
      if (build.itemId && !Object.hasOwn(build, 'item')) build.item = find(records.items.entries, build.itemId)?.name || build.itemId;
      if (Array.isArray(build.addonIds) && !Array.isArray(build.addons)) build.addons = [...build.addonIds.map(id => find(records.itemAddons.entries, id)?.name || id), ...(build.unresolvedAddons || [])];
      if (build.item && !find(records.items.entries, build.item)) {
        const previous = (legacy.items || []).find(item => SharedCatalog.normalize(item.name) === SharedCatalog.normalize(build.item));
        const current = previous && find(records.items.entries, previous.id);
        if (current) build.item = current.name;
      }
      if (Array.isArray(build.addons) && legacy.itemAddons) build.addons = build.addons.map(name => {
        if (find(records.itemAddons.entries, name)) return name;
        const previous = legacy.itemAddons.find(addon => SharedCatalog.normalize(addon.name) === SharedCatalog.normalize(name));
        return (previous && find(records.itemAddons.entries, previous.id))?.name || name;
      });
    }
    return data;
  }
  function localConfig(source = CONFIG) {
    const result = {};
    for (const key of localKeys) if (source[key] !== undefined) result[key] = copy(source[key]);
    for (const key of ['killerTags', 'buildTags']) for (const tag of result[key] || []) delete tag._locked;
    for (const [key, list] of [['itemOrder', records?.items.entries], ['addonOrder', records?.itemAddons.entries]]) {
      if (!list || !result[key]) continue;
      for (const type of Object.keys(result[key])) result[key][type] = result[key][type].map(value => find(list, value)?.id || value);
    }
    return result;
  }
  function serialize(source) {
    const data = copy(source || {});
    for (const killer of data.killers || []) {
      if (characterData(killer.id)) fixedFields.forEach(key => delete killer[key]);
    }
    const perks = perkList();
    for (const build of [...(data.builds || []), ...(data.survivorBuilds || [])]) {
      const ids = [];
      const unresolved = [];
      for (const value of build.perks || []) {
        const perk = find(perks, value);
        if (perk) ids.push(perk.id);else if ((build.perkIds || []).includes(value)) ids.push(value);else unresolved.push(value);
      }
      if (Array.isArray(build.perks)) {
        build.perkIds = ids;
        if (unresolved.length) build.unresolvedPerks = unresolved;else delete build.unresolvedPerks;
        delete build.perks;
      }
    }
    for (const build of [...(data.survivorBuilds || []), ...(data.loadouts || [])]) {
      if (Object.hasOwn(build, 'item') && !build.item) delete build.itemId;
      if (build.item) {
        const item = find(records.items.entries, build.item);
        if (item) {
          build.itemId = item.id;
          delete build.item;
        }
      }
      if (Array.isArray(build.addons)) {
        const matches = build.addons.map(value => ({
          value,
          record: find(records.itemAddons.entries, value)
        }));
        build.addonIds = matches.filter(match => match.record).map(match => match.record.id);
        const unresolved = matches.filter(match => !match.record).map(match => match.value);
        if (unresolved.length) build.unresolvedAddons = unresolved;else delete build.unresolvedAddons;
        delete build.addons;
      }
    }
    ['perks', '_perkIcons', '_customPerks', '_removedPerks', '_pendingPerkIcons'].forEach(key => delete data[key]);
    if (data._coreConfig) data._coreConfig = localConfig(data._coreConfig);
    return data;
  }
  function guardEditor() {
    ['k-name', 'k-release', 'k-chapter', 'k-release-order'].forEach(id => {
      const field = document.getElementById(id);
      if (field) {
        field.readOnly = true;
        field.title = 'Read-only definition from SharedFiles';
      }
    });
  }
  function baseline(source) {
    if (!baselines.has(source)) baselines.set(source, hydrate(copy(source)));
    return baselines.get(source);
  }
  return Object.freeze({
    initialize,
    applyConfig,
    hydrate,
    serialize,
    localConfig,
    characterData,
    guardEditor,
    baseline
  });
})();
function getKillerPortrait(name) {
  return CONFIG.killerPortraits?.[name] || CONFIG.placeholderPortrait;
}
function getPerkIcon(name) {
  const perk = [...(CONFIG.killerPerks || []), ...(CONFIG.survivorPerks || [])].find(record => SharedCatalog.normalize(record.name) === SharedCatalog.normalize(name));
  return perk?.icon || CONFIG.perkIcons?.[name] || CONFIG.placeholderPerk;
}
function getSurvivorPortrait(id) {
  const roster = CONFIG.survivorRoster || [];
  const character = roster.find(record => record.id === id || record.name === id);
  if (character) return character.icon;
  if (!roster.length) return CONFIG.placeholderPortrait;
  let hash = 0;
  for (const letter of String(id || 'surv')) hash = hash * 33 + letter.charCodeAt(0) >>> 0;
  return roster[hash % roster.length].icon;
}
