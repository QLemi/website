const STREAKI_PROFILES = [
  {
    page: 'streaki.html',
    PROFILE_LABEL: 'Lemi',
    PROFILE_URL: 'https://steamcommunity.com/id/qlemi/',
    SHEET_ID: '1WrJPj5Pdms2lFV59NCVPm7eU5eLz2-eSp55MFk4qNGg',
    SHEET_MAIN_GID: '0',
    SHEET_INNE_GID: '2135936810',
    SHEET_PLAY_GID: '821403985'
  },
  {
    page: 'kamkiller.html',
    PROFILE_LABEL: 'Kamkiller'
  }
];

const streakPage = decodeURIComponent(location.pathname.split('/').pop());
const STREAKI_CONFIG = {
  ...STREAKI_PROFILES.find(profile => profile.page === streakPage),
  "PLACEHOLDER_IMG": "image-unavailable.svg",
  "TAG_LABELS": {
    "K": "Killer",
    "S": "Survivor",
    "O": "Both",
    "P": "Playthrough"
  },
  "CUSTOM_PORTRAITS": {
    "Copycat": "https://deadbydaylight.wiki.gg/images/S03_ClaudetteMorel_Portrait.png",
    "Solo Escape": "https://deadbydaylight.wiki.gg/images/S02_MegThomas_Portrait.png",
    "Team Escape": "https://deadbydaylight.wiki.gg/images/S01_DwightFairfield_Portrait.png"
  }
};
