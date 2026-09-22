// Portraits + perk icon URLs — edit when adding killers/perks

const CONFIG = {
  // 1 = show Editor + Settings buttons | 0 = hide (viewer mode)
  SHOW_OWNER_UI: 1,

  // Portrety killerów (wiki.gg)
  killerPortraits: {
    "The Trapper":          "https://deadbydaylight.wiki.gg/images/K01_TheTrapper_Portrait.png",
    "The Wraith":           "https://deadbydaylight.wiki.gg/images/K02_TheWraith_Portrait.png",
    "The Hillbilly":        "https://deadbydaylight.wiki.gg/images/K03_TheHillbilly_Portrait.png",
    "The Nurse":            "https://deadbydaylight.wiki.gg/images/K04_TheNurse_Portrait.png",
    "The Shape":            "https://deadbydaylight.wiki.gg/images/K05_TheShape_Portrait.png",
    "The Hag":              "https://deadbydaylight.wiki.gg/images/K06_TheHag_Portrait.png",
    "The Doctor":           "https://deadbydaylight.wiki.gg/images/K07_TheDoctor_Portrait.png",
    "The Huntress":         "https://deadbydaylight.wiki.gg/images/K08_TheHuntress_Portrait.png",
    "The Cannibal":         "https://deadbydaylight.wiki.gg/images/K09_TheCannibal_Portrait.png",
    "The Nightmare":        "https://deadbydaylight.wiki.gg/images/K10_TheNightmare_Portrait.png",
    "The Pig":              "https://deadbydaylight.wiki.gg/images/K11_ThePig_Portrait.png",
    "The Clown":            "https://deadbydaylight.wiki.gg/images/K12_TheClown_Portrait.png",
    "The Spirit":           "https://deadbydaylight.wiki.gg/images/K13_TheSpirit_Portrait.png",
    "The Legion":           "https://deadbydaylight.wiki.gg/images/K14_TheLegion_Portrait.png",
    "The Plague":           "https://deadbydaylight.wiki.gg/images/K15_ThePlague_Portrait.png",
    "The Ghost Face":       "https://deadbydaylight.wiki.gg/images/K16_TheGhostFace_Portrait.png",
    "The Demogorgon":       "https://deadbydaylight.wiki.gg/images/K17_TheDemogorgon_Portrait.png",
    "The Oni":              "https://deadbydaylight.wiki.gg/images/K18_TheOni_Portrait.png",
    "The Deathslinger":     "https://deadbydaylight.wiki.gg/images/K19_TheDeathslinger_Portrait.png",
    "The Executioner":      "https://deadbydaylight.wiki.gg/images/K20_TheExecutioner_Portrait.png",
    "The Blight":           "https://deadbydaylight.wiki.gg/images/K21_TheBlight_Portrait.png",
    "The Twins":            "https://deadbydaylight.wiki.gg/images/K22_TheTwins_Portrait.png",
    "The Trickster":        "https://deadbydaylight.wiki.gg/images/K23_TheTrickster_Portrait.png",
    "The Nemesis":          "https://deadbydaylight.wiki.gg/images/K24_TheNemesis_Portrait.png",
    "The Cenobite":         "https://deadbydaylight.wiki.gg/images/K25_TheCenobite_Portrait.png",
    "The Artist":           "https://deadbydaylight.wiki.gg/images/K26_TheArtist_Portrait.png",
    "The Onryo":            "https://deadbydaylight.wiki.gg/images/K27_TheOnryo_Portrait.png",
    "The Dredge":           "https://deadbydaylight.wiki.gg/images/K28_TheDredge_Portrait.png",
    "The Mastermind":       "https://deadbydaylight.wiki.gg/images/K29_TheMastermind_Portrait.png",
    "The Knight":           "https://deadbydaylight.wiki.gg/images/K30_TheKnight_Portrait.png",
    "The Skull Merchant":   "https://deadbydaylight.wiki.gg/images/K31_TheSkullMerchant_Portrait.png",
    "The Singularity":      "https://deadbydaylight.wiki.gg/images/K32_TheSingularity_Portrait.png",
    "The Xenomorph":        "https://deadbydaylight.wiki.gg/images/K33_TheXenomorph_Portrait.png",
    "The Good Guy":         "https://deadbydaylight.wiki.gg/images/K34_TheGoodGuy_Portrait.png",
    "The Unknown":          "https://deadbydaylight.wiki.gg/images/K35_TheUnknown_Portrait.png",
    "The Lich":             "https://deadbydaylight.wiki.gg/images/K36_TheLich_Portrait.png",
    "The Dark Lord":        "https://deadbydaylight.wiki.gg/images/K37_TheDarkLord_Portrait.png",
    "The Houndmaster":      "https://deadbydaylight.wiki.gg/images/K38_TheHoundmaster_Portrait.png",
    "The Ghoul":            "https://deadbydaylight.wiki.gg/images/K39_TheGhoul_Portrait.png",
    "The Animatronic":      "https://deadbydaylight.wiki.gg/images/K40_TheAnimatronic_Portrait.png",
    "The Krasue":           "https://deadbydaylight.wiki.gg/images/K41_TheKrasue_Portrait.png",
    "The First":            "https://deadbydaylight.wiki.gg/images/K42_TheFirst_Portrait.png",
    "The Slasher":          "https://deadbydaylight.wiki.gg/images/K43_TheSlasher_Portrait.png",
    "The Judgment":         "https://deadbydaylight.wiki.gg/images/K44_TheJudgment_Portrait.png",
    "The Judgement":        "https://deadbydaylight.wiki.gg/images/K44_TheJudgment_Portrait.png"
  },

  // Ikony perków (wiki.gg) – top popularne + te używane w sample data
  // Format: "https://deadbydaylight.wiki.gg/images/IconPerks_xxx.png"
  perkIcons: {
    "Scourge Hook: Pain Resonance": "https://deadbydaylight.wiki.gg/images/IconPerks_scourgeHookPainResonance.png",
    "Pain Resonance":               "https://deadbydaylight.wiki.gg/images/IconPerks_scourgeHookPainResonance.png",
    "Lethal Pursuer":               "https://deadbydaylight.wiki.gg/images/IconPerks_lethalPursuer.png",
    "Pop Goes the Weasel":          "https://deadbydaylight.wiki.gg/images/IconPerks_popGoesTheWeasel.png",
    "Corrupt Intervention":         "https://deadbydaylight.wiki.gg/images/IconPerks_corruptIntervention.png",
    "Barbecue & Chili":             "https://deadbydaylight.wiki.gg/images/IconPerks_barbecueAndChilli.png",
    "BBQ & Chili":                  "https://deadbydaylight.wiki.gg/images/IconPerks_barbecueAndChilli.png",
    "Nowhere to Hide":              "https://deadbydaylight.wiki.gg/images/IconPerks_nowhereToHide.png",
    "Hex: Ruin":                    "https://deadbydaylight.wiki.gg/images/IconPerks_hexRuin.png",
    "Eruption":                     "https://deadbydaylight.wiki.gg/images/IconPerks_eruption.png",
    "Dead Man's Switch":            "https://deadbydaylight.wiki.gg/images/IconPerks_deadMansSwitch.png",
    "A Nurse's Calling":            "https://deadbydaylight.wiki.gg/images/IconPerks_aNursesCalling.png",
    "Grim Embrace":                 "https://deadbydaylight.wiki.gg/images/IconPerks_grimEmbrace.png",
    "Discordance":                  "https://deadbydaylight.wiki.gg/images/IconPerks_discordance.png",
    "Surge":                        "https://deadbydaylight.wiki.gg/images/IconPerks_surge.png",
    "Deadlock":                     "https://deadbydaylight.wiki.gg/images/IconPerks_deadlock.png",
    "Hex: Plaything":               "https://deadbydaylight.wiki.gg/images/IconPerks_hexPlaything.png",
    "Iron Maiden":                  "https://deadbydaylight.wiki.gg/images/IconPerks_ironMaiden.png",
    "Whispers":                     "https://deadbydaylight.wiki.gg/images/IconPerks_whispers.png",
    "Friends 'til the End":         "https://deadbydaylight.wiki.gg/images/IconPerks_friendsTilTheEnd.png",
    "Brutal Strength":              "https://deadbydaylight.wiki.gg/images/IconPerks_brutalStrength.png",
    "Enduring":                     "https://deadbydaylight.wiki.gg/images/IconPerks_enduring.png",
    "Spirit Fury":                  "https://deadbydaylight.wiki.gg/images/IconPerks_spiritFury.png",
    "Bamboozle":                    "https://deadbydaylight.wiki.gg/images/IconPerks_bamboozle.png",
    "Save the Best for Last":       "https://deadbydaylight.wiki.gg/images/IconPerks_saveTheBestForLast.png",
    "Scourge Hook: Floods of Rage": "https://deadbydaylight.wiki.gg/images/IconPerks_scourgeHookFloodsOfRage.png",
    "Hex: Devour Hope":             "https://deadbydaylight.wiki.gg/images/IconPerks_hexDevourHope.png",
    "Hex: No One Escapes Death":    "https://deadbydaylight.wiki.gg/images/IconPerks_hexNoOneEscapesDeath.png",
    "Sloppy Butcher":               "https://deadbydaylight.wiki.gg/images/IconPerks_sloppyButcher.png",
    "Bitter Murmur":                "https://deadbydaylight.wiki.gg/images/IconPerks_bitterMurmur.png",
    "Spies from the Shadows":       "https://deadbydaylight.wiki.gg/images/IconPerks_spiesFromTheShadows.png",
    "Tinkerer":                     "https://deadbydaylight.wiki.gg/images/IconPerks_tinkerer.png",
    "Monitor & Abuse":              "https://deadbydaylight.wiki.gg/images/IconPerks_monitorAndAbuse.png",
    "Overcharge":                   "https://deadbydaylight.wiki.gg/images/IconPerks_overcharge.png",
    "Thanatophobia":                "https://deadbydaylight.wiki.gg/images/IconPerks_thanatophobia.png",
    "Distressing":                  "https://deadbydaylight.wiki.gg/images/IconPerks_distressing.png",
    "Unrelenting":                  "https://deadbydaylight.wiki.gg/images/IconPerks_unrelenting.png",
    "Lightborn":                    "https://deadbydaylight.wiki.gg/images/IconPerks_lightborn.png",
    "Franklin's Demise":            "https://deadbydaylight.wiki.gg/images/IconPerks_franklinsDemise.png",
    "Coup de Grace":                "https://deadbydaylight.wiki.gg/images/IconPerks_coupDeGr%C3%A2ce.png?",
    "No Way Out":                   "https://deadbydaylight.wiki.gg/images/IconPerks_noWayOut.png",
    "Hex: Crowd Control":           "https://deadbydaylight.wiki.gg/images/IconPerks_hexCrowdControl.png",
    "Call of Brine":                "https://deadbydaylight.wiki.gg/images/IconPerks_callOfBrine.png",
    "Merciless Storm":              "https://deadbydaylight.wiki.gg/images/IconPerks_mercilessStorm.png",
    "Oppression":                   "https://deadbydaylight.wiki.gg/images/IconPerks_oppression.png",
    "Dragon's Grip":                "https://deadbydaylight.wiki.gg/images/IconPerks_dragonsGrip.png",
    "I'm All Ears":                 "https://deadbydaylight.wiki.gg/images/IconPerks_imAllEars.png",
    "Zanshin Tactics":              "https://deadbydaylight.wiki.gg/images/IconPerks_zanshinTactics.png",
    "Blood Warden":                 "https://deadbydaylight.wiki.gg/images/IconPerks_bloodWarden.png",
    "Remember Me":                  "https://deadbydaylight.wiki.gg/images/IconPerks_rememberMe.png",
    "Fire Up":                      "https://deadbydaylight.wiki.gg/images/IconPerks_fireUp.png",
    "Play with Your Food":          "https://deadbydaylight.wiki.gg/images/IconPerks_playWithYourFood.png",
    "Dying Light":                  "https://deadbydaylight.wiki.gg/images/IconPerks_dyingLight.png",
    "Hex: Huntress Lullaby":        "https://deadbydaylight.wiki.gg/images/IconPerks_hexHuntressLullaby.png",
    "Thrilling Tremors":            "https://deadbydaylight.wiki.gg/images/IconPerks_thrillingTremors.png",
    "Pop Goes the Weasel":          "https://deadbydaylight.wiki.gg/images/IconPerks_popGoesTheWeasel.png",
  "Gearhead": "https://deadbydaylight.wiki.gg/images/IconPerks_gearhead.png",
  "Nemesis": "https://deadbydaylight.wiki.gg/images/IconPerks_nemesis.png",
  "Darkness Revealed": "https://deadbydaylight.wiki.gg/images/IconPerks_darknessRevealed.png",
  "Predator": "https://deadbydaylight.wiki.gg/images/IconPerks_predator.png",
  "Mindbreaker": "https://deadbydaylight.wiki.gg/images/IconPerks_mindbreaker.png",
  "Alien Instinct": "https://deadbydaylight.wiki.gg/images/IconPerks_alienInstinct.png",
  "All-Shaking Thunder": "https://deadbydaylight.wiki.gg/images/IconPerks_allShakingThunder.png",
  "Deerstalker": "https://deadbydaylight.wiki.gg/images/IconPerks_deerstalker.png",
  "Hex: Thrill of the Hunt": "https://deadbydaylight.wiki.gg/images/IconPerks_hexThrillOfTheHunt.png",
  "Agitation": "https://deadbydaylight.wiki.gg/images/IconPerks_agitation.png",
  "Insidious": "https://deadbydaylight.wiki.gg/images/IconPerks_insidious.png",
  "Knock Out": "https://deadbydaylight.wiki.gg/images/IconPerks_knockOut.png",
  "Iron Grasp": "https://deadbydaylight.wiki.gg/images/IconPerks_ironGrasp.png",
  "Unnerving Presence": "https://deadbydaylight.wiki.gg/images/IconPerks_unnervingPresence.png",
  "Stridor": "https://deadbydaylight.wiki.gg/images/IconPerks_stridor.png",
  "Make Your Choice": "https://deadbydaylight.wiki.gg/images/IconPerks_makeYourChoice.png",
  "Rancor": "https://deadbydaylight.wiki.gg/images/IconPerks_rancor.png",
  "Blood Echo": "https://deadbydaylight.wiki.gg/images/IconPerks_bloodEcho.png",
  "Infectious Fright": "https://deadbydaylight.wiki.gg/images/IconPerks_infectiousFright.png",
  "Surveillance": "https://deadbydaylight.wiki.gg/images/IconPerks_surveillance.png",
  "Forced Penance": "https://deadbydaylight.wiki.gg/images/IconPerks_forcedPenance.png",
  "Trail of Torment": "https://deadbydaylight.wiki.gg/images/IconPerks_trailOfTorment.png",
  "Deathbound": "https://deadbydaylight.wiki.gg/images/IconPerks_deathbound.png",
  "Hex: Retribution": "https://deadbydaylight.wiki.gg/images/IconPerks_hexRetribution.png",
  "Jolt": "https://deadbydaylight.wiki.gg/images/IconPerks_surge.png",
  "Scourge Hook: Gift of Pain": "https://deadbydaylight.wiki.gg/images/IconPerks_scourgeHookGiftOfPain.png",
  "Septic Touch": "https://deadbydaylight.wiki.gg/images/IconPerks_septicTouch.png",
  "Hex: Undying": "https://deadbydaylight.wiki.gg/images/IconPerks_hexUndying.png",
  "Friends 'Til the End": "https://deadbydaylight.wiki.gg/images/IconPerks_friendsTilTheEnd.png",
  "Terminus": "https://deadbydaylight.wiki.gg/images/IconPerks_terminus.png",
  "Ultimate Weapon": "https://deadbydaylight.wiki.gg/images/IconPerks_ultimateWeapon.png",
  "Hubris": "https://deadbydaylight.wiki.gg/images/IconPerks_hubris.png",
  "Leverage": "https://deadbydaylight.wiki.gg/images/IconPerks_leverage.png",
  "Game Afoot": "https://deadbydaylight.wiki.gg/images/IconPerks_gameAfoot.png",
  "Hex: Blood Favour": "https://deadbydaylight.wiki.gg/images/IconPerks_hexBloodFavour.png",
  "Phantom Fear": "https://deadbydaylight.wiki.gg/images/IconPerks_PhantomFear.png",
  "Celestial Witness": "https://deadbydaylight.wiki.gg/images/T_UI_iconsPerks_CelestialWitness.png",
  "Lay Waste": "https://deadbydaylight.wiki.gg/images/T_UI_iconsPerks_LayWaste.png",
  "Turn Back the Clock": "https://deadbydaylight.wiki.gg/images/IconsPerks_TurnBackTheClock.png"
  },

  // Placeholder gdy brak obrazka
  placeholderPortrait: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%231a1a1a' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-family='sans-serif' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E",
  placeholderPerk: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect fill='%23222' width='64' height='64' rx='8'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='%23555' font-size='10'%3E?%3C/text%3E%3C/svg%3E"
};

// Helpery globalne
function getKillerPortrait(name) {
  return (CONFIG.killerPortraits && CONFIG.killerPortraits[name]) || CONFIG.placeholderPortrait;
}
function getPerkIcon(name) {
  if (!name) return CONFIG.placeholderPerk;
  if (CONFIG.perkIcons && CONFIG.perkIcons[name]) return CONFIG.perkIcons[name];
  // fallback slug for wiki.gg
  let slug = String(name).replace(/^Hex:\s*/i, "hex").replace(/^Scourge Hook:\s*/i, "scourgeHook");
  slug = slug.replace(/['']/g, "").replace(/&/g, "");
  slug = slug.replace(/[^a-zA-Z0-9]+/g, "");
  if (slug.length) {
    slug = slug.charAt(0).toLowerCase() + slug.slice(1);
    return "https://deadbydaylight.wiki.gg/images/IconPerks_" + slug + ".png";
  }
  return CONFIG.placeholderPerk;
}
function getAddonIcon(name) {
  return (CONFIG.addonIcons && CONFIG.addonIcons[name]) || CONFIG.placeholderPerk;
}
