const INITIAL_DATA = {
  "killers": [
    {
      "id": "trapper",
      "difficulty": "Beginner",
      "skillFloor": 1,
      "skillCeiling": 4,
      "personalRank": 0,
      "tier": "F+",
      "fun2play": 7.3,
      "tags": [
        "M1",
        "AreaControl",
        "BeginnerFriendly",
        "Setup"
      ],
      "addonNotes": "The classic combination of Honing Stone and Iridescent Stone can waste a great deal of Survivor time by requiring two Survivors to rescue a trapped teammate.",
      "recommendedAddons": [
        "Honing Stone",
        "Iridescent Stone"
      ],
      "patch": "10.1.2",
      "recommendedCombos": [
        {
          "name": "1st Best Combo",
          "addons": [
            "Honing Stone",
            "Iridescent Stone"
          ]
        },
        {
          "name": "2nd Best Combo",
          "addons": [
            "Iridescent Stone",
            "Bloody Coil"
          ]
        },
        {
          "name": "Good Value",
          "addons": [
            "Trapper Bag",
            "Fastening Tools"
          ]
        }
      ]
    },
    {
      "id": "wraith",
      "difficulty": "Beginner",
      "skillFloor": 1,
      "skillCeiling": 5,
      "personalRank": 0,
      "tier": "D-",
      "fun2play": 7,
      "tags": [
        "HighMobility",
        "Stealth",
        "BeginnerFriendly",
        "M1",
        "SluggingPotential ",
        "Hit&Run"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "10.1.2",
      "recommendedCombos": []
    },
    {
      "id": "hillbilly",
      "difficulty": "Extremely Hard",
      "skillFloor": 7.5,
      "skillCeiling": 10,
      "personalRank": 0,
      "tier": "A+",
      "fun2play": 9.1,
      "tags": [
        "HighMobility",
        "HighSkill",
        "Snowball",
        "AreaControl",
        "SluggingPotential ",
        "CampingPotential ",
        "Strong1v1",
        "InstantDown",
        "MapDependent",
        "StrongOnOutdoors"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [
        "Iridescent Engravings",
        "Spiked Boots"
      ],
      "patch": "10.1.2",
      "recommendedCombos": [
        {
          "name": "Best Combo",
          "addons": [
            "Iridescent Engravings",
            "Spiked Boots"
          ]
        }
      ]
    },
    {
      "id": "nurse",
      "difficulty": "Very Hard",
      "skillFloor": 6.5,
      "skillCeiling": 8.5,
      "personalRank": 0,
      "tier": "S",
      "fun2play": 7.2,
      "tags": [
        "HighSkill",
        "2TapPotential ",
        "Strong1v1",
        "TunnelPotential ",
        "AreaControl",
        "Snowball",
        "CampingPotential "
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "10.1.2",
      "recommendedCombos": []
    },
    {
      "id": "shape",
      "difficulty": "Medium",
      "skillFloor": 2,
      "skillCeiling": 5,
      "personalRank": 0,
      "tier": "D+",
      "fun2play": 8,
      "tags": [
        "Stealth",
        "BeginnerFriendly",
        "Snowball",
        "2TapPotential ",
        "TunnelPotential ",
        "CampingPotential ",
        "DashAttack",
        "HalfM1",
        "StrongOnIndoors",
        "InstantDown"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "10.1.2",
      "recommendedCombos": []
    },
    {
      "id": "hag",
      "difficulty": "Medium",
      "skillFloor": 4,
      "skillCeiling": 6,
      "personalRank": 0,
      "tier": "E-",
      "fun2play": 2,
      "tags": [
        "AreaControl",
        "2TapPotential ",
        "M1",
        "CampingPotential ",
        "Setup",
        "Hit&Run"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "10.1.2",
      "recommendedCombos": []
    },
    {
      "id": "doctor",
      "difficulty": "Easy",
      "skillFloor": 2,
      "skillCeiling": 5,
      "personalRank": 0,
      "tier": "E+",
      "fun2play": 6,
      "tags": [
        "M1",
        "CampingPotential ",
        "Strong1v1",
        "PassiveSlowdown",
        "StatusEffect"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "10.1.2",
      "recommendedCombos": []
    },
    {
      "id": "huntress",
      "difficulty": "Easy",
      "skillFloor": 2,
      "skillCeiling": 6,
      "personalRank": 0,
      "tier": "D",
      "fun2play": 6,
      "tags": [
        "BeginnerFriendly",
        "Range",
        "AreaControl",
        "2TapPotential ",
        "CampingPotential ",
        "MapDependent"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "10.1.2",
      "recommendedCombos": []
    },
    {
      "id": "cannibal",
      "difficulty": "Medium",
      "skillFloor": 3,
      "skillCeiling": 6,
      "personalRank": 0,
      "tier": "E",
      "fun2play": 8,
      "tags": [
        "CampingPotential ",
        "HalfM1",
        "InstantDown",
        "MapDependent"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "10.1.2",
      "recommendedCombos": []
    },
    {
      "id": "nightmare",
      "difficulty": "Easy",
      "skillFloor": 2,
      "skillCeiling": 6.2,
      "personalRank": 0,
      "tier": "C",
      "fun2play": 8,
      "tags": [
        "BeginnerFriendly",
        "2TapPotential ",
        "M1",
        "Teleport",
        "StatusEffect",
        "StrongOnIndoors",
        "HighSkill"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "10.1.2",
      "recommendedCombos": []
    },
    {
      "id": "pig",
      "difficulty": "Medium",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "E",
      "fun2play": 0,
      "tags": [
        "Stealth",
        "M1",
        "RNG",
        "PassiveSlowdown",
        "DashAttack",
        "StrongOnIndoors"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "clown",
      "difficulty": "Medium",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "D",
      "fun2play": 0,
      "tags": [
        "BeginnerFriendly",
        "2TapPotential ",
        "M1",
        "TunnelPotential ",
        "CampingPotential ",
        "StatusEffect"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "spirit",
      "difficulty": "Hard",
      "skillFloor": 6.2,
      "skillCeiling": 9.5,
      "personalRank": 0,
      "tier": "A-",
      "fun2play": 5.5,
      "tags": [
        "HighSkill",
        "Snowball",
        "AreaControl",
        "2TapPotential ",
        "M1",
        "TunnelPotential ",
        "Strong1v1"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [
        "Rusty Flute",
        "Muddy Sports Day Cap"
      ],
      "patch": "10.1.2",
      "recommendedCombos": [
        {
          "name": "Best Combo",
          "addons": [
            "Rusty Flute",
            "Muddy Sports Day Cap"
          ]
        }
      ]
    },
    {
      "id": "legion",
      "difficulty": "Medium",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "E+",
      "fun2play": 0,
      "tags": [
        "BeginnerFriendly",
        "M1",
        "PassiveSlowdown",
        "Hit&Run"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "plague",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "B-",
      "fun2play": 0,
      "tags": [
        "Range",
        "Snowball",
        "AreaControl",
        "2TapPotential ",
        "M1",
        "CampingPotential ",
        "Hit&Run",
        "StatusEffect"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "ghostface",
      "difficulty": "Medium",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "F+",
      "fun2play": 0,
      "tags": [
        "Stealth",
        "BeginnerFriendly",
        "M1",
        "CampingPotential ",
        "InstantDown",
        "StrongOnIndoors",
        "StatusEffect"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "demogorgon",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "D-",
      "fun2play": 0,
      "tags": [
        "2TapPotential ",
        "HalfM1",
        "Strong1v1",
        "Teleport",
        "DashAttack",
        "MapDependent"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "oni",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "C+",
      "fun2play": 0,
      "tags": [
        "Snowball",
        "HalfM1",
        "SluggingPotential ",
        "CampingPotential ",
        "MapDependent",
        "InstantDown"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "deathslinger",
      "difficulty": "Medium",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "D",
      "fun2play": 0,
      "tags": [
        "Range",
        "2TapPotential ",
        "M1",
        "TunnelPotential ",
        "CampingPotential ",
        "MapDependent"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "executioner",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "C-",
      "fun2play": 0,
      "tags": [
        "Range",
        "HalfM1",
        "RNG",
        "TunnelPotential ",
        "CampingPotential ",
        "Strong1v1"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "blight",
      "difficulty": "Very Hard",
      "skillFloor": 5.7,
      "skillCeiling": 10,
      "personalRank": 0,
      "tier": "S-",
      "fun2play": 7,
      "tags": [
        "HighMobility",
        "HighSkill",
        "Snowball",
        "2TapPotential ",
        "TunnelPotential ",
        "SluggingPotential ",
        "AreaControl",
        "Strong1v1",
        "MapDependent",
        "StrongOnOutdoors"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "10.1.2",
      "recommendedCombos": []
    },
    {
      "id": "twins",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "B-",
      "fun2play": 0,
      "tags": [
        "HighMobility",
        "Snowball",
        "AreaControl",
        "2TapPotential ",
        "SluggingPotential ",
        "Hit&Run",
        "PassiveSlowdown",
        "DashAttack",
        "StatusEffect"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "trickster",
      "difficulty": "Medium",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "D-",
      "fun2play": 0,
      "tags": [
        "Range",
        "Snowball",
        "AreaControl",
        "2TapPotential ",
        "TunnelPotential ",
        "CampingPotential ",
        "MapDependent"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "nemesis",
      "difficulty": "Medium",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "E+",
      "fun2play": 0,
      "tags": [
        "Range",
        "Strong1v1",
        "PassiveSlowdown"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "cenobite",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "E+",
      "fun2play": 0,
      "tags": [
        "Range",
        "2TapPotential ",
        "M1",
        "PassiveSlowdown",
        "MapDependent",
        "StatusEffect"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "artist",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "C+",
      "fun2play": 0,
      "tags": [
        "Range",
        "AreaControl",
        "HalfM1",
        "Strong1v1"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "onryo",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "E-",
      "fun2play": 0,
      "tags": [
        "Stealth",
        "M1",
        "TunnelPotential ",
        "PassiveSlowdown",
        "Teleport",
        "Hit&Run",
        "StrongOnIndoors",
        "Setup"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "dredge",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "E",
      "fun2play": 0,
      "tags": [
        "Snowball",
        "M1",
        "Teleport",
        "Hit&Run",
        "StrongOnIndoors",
        "Stealth",
        "Setup"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "mastermind",
      "difficulty": "Medium",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "C",
      "fun2play": 0,
      "tags": [
        "BeginnerFriendly",
        "HalfM1",
        "CampingPotential ",
        "PassiveSlowdown",
        "DashAttack",
        "MapDependent",
        "StatusEffect"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "knight",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "E+",
      "fun2play": 0,
      "tags": [
        "AreaControl",
        "M1",
        "Strong1v1",
        "PassiveSlowdown",
        "RNG"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "skullmerchant",
      "difficulty": "Beginner",
      "skillFloor": 1,
      "skillCeiling": 5.5,
      "personalRank": 0,
      "tier": "F",
      "fun2play": 2.5,
      "tags": [
        "Stealth",
        "AreaControl",
        "M1",
        "PassiveSlowdown",
        "StatusEffect",
        "Setup"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "singularity",
      "difficulty": "Very Hard",
      "skillFloor": 7.2,
      "skillCeiling": 8.5,
      "personalRank": 0,
      "tier": "B+",
      "fun2play": 6.8,
      "tags": [
        "HighSkill",
        "AreaControl",
        "M1",
        "SluggingPotential ",
        "Strong1v1",
        "PassiveSlowdown",
        "MapDependent",
        "StrongOnOutdoors",
        "Setup"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "10.1.2",
      "recommendedCombos": []
    },
    {
      "id": "xenomorph",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "D",
      "fun2play": 0,
      "tags": [
        "Range",
        "2TapPotential ",
        "Strong1v1",
        "PassiveSlowdown",
        "Teleport",
        "HalfM1"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "goodguy",
      "difficulty": "Medium",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "C",
      "fun2play": 0,
      "tags": [
        "Stealth",
        "2TapPotential ",
        "Strong1v1",
        "DashAttack",
        "HalfM1",
        "StrongOnIndoors"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "unknown",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "C-",
      "fun2play": 0,
      "tags": [
        "Range",
        "Snowball",
        "2TapPotential ",
        "RNG",
        "Teleport",
        "HalfM1",
        "StrongOnIndoors",
        "Setup"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "lich",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "D+",
      "fun2play": 0,
      "tags": [
        "HighMobility",
        "2TapPotential ",
        "M1",
        "Strong1v1"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "darklord",
      "difficulty": "Hard",
      "skillFloor": 5.2,
      "skillCeiling": 8.4,
      "personalRank": 0,
      "tier": "A",
      "fun2play": 8.5,
      "tags": [
        "HighMobility",
        "Range",
        "Snowball",
        "CampingPotential ",
        "Strong1v1",
        "Teleport",
        "DashAttack"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [
        "Medusa's Hair",
        "Lapis Lazuli"
      ],
      "patch": "10.1.2",
      "recommendedCombos": [
        {
          "name": "",
          "addons": [
            "Medusa's Hair",
            "Lapis Lazuli"
          ]
        }
      ]
    },
    {
      "id": "houndmaster",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "E-",
      "fun2play": 0,
      "tags": [
        "Range",
        "2TapPotential ",
        "M1",
        "RNG",
        "CampingPotential ",
        "MapDependent"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "ghoul",
      "difficulty": "Easy",
      "skillFloor": 3,
      "skillCeiling": 9.2,
      "personalRank": 0,
      "tier": "A",
      "fun2play": 10,
      "tags": [
        "HighMobility",
        "BeginnerFriendly",
        "Snowball",
        "AreaControl",
        "M1",
        "MapDependent"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "10.1.2",
      "recommendedCombos": []
    },
    {
      "id": "animatronic",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "D",
      "fun2play": 0,
      "tags": [
        "Stealth",
        "Range",
        "2TapPotential ",
        "TunnelPotential ",
        "CampingPotential ",
        "Teleport",
        "HalfM1",
        "StatusEffect"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "krasue",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "C-",
      "fun2play": 0,
      "tags": [
        "HighMobility",
        "Snowball",
        "2TapPotential ",
        "SluggingPotential ",
        "Strong1v1",
        "DashAttack",
        "StatusEffect"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "first",
      "difficulty": "Hard",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "B",
      "fun2play": 0,
      "tags": [
        "Range",
        "Snowball",
        "AreaControl",
        "2TapPotential ",
        "RNG",
        "SluggingPotential ",
        "Strong1v1"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "slasher",
      "difficulty": "Medium",
      "skillFloor": 0,
      "skillCeiling": 0,
      "personalRank": 0,
      "tier": "B+",
      "fun2play": 0,
      "tags": [
        "HighMobility",
        "Range",
        "2TapPotential ",
        "TunnelPotential ",
        "CampingPotential ",
        "Teleport",
        "HalfM1",
        "MapDependent",
        "StatusEffect"
      ],
      "addonNotes": "placeholder",
      "recommendedAddons": [],
      "patch": "",
      "recommendedCombos": []
    },
    {
      "id": "judgment",
      "difficulty": "Extremely Hard",
      "skillFloor": 7.8,
      "skillCeiling": 10,
      "fun2play": 6.8,
      "tier": "S",
      "personalRank": 0,
      "patch": "10.1.2",
      "tags": [
        "HighSkill",
        "Range",
        "Snowball",
        "AreaControl",
        "2TapPotential ",
        "TunnelPotential ",
        "Strong1v1",
        "Hit&Run"
      ],
      "addonNotes": "placeholder",
      "recommendedCombos": [],
      "recommendedAddons": []
    }
  ],
  "builds": [
    {
      "name": "Build Without Limitations",
      "killerIds": [
        "trapper"
      ],
      "tags": [
        "GenRegression",
        "GenBlocking"
      ],
      "addonImages": [
        "https://otz-addon-tierlist.pages.dev/public/addons/trapper/iridescentstone.png",
        "https://otz-addon-tierlist.pages.dev/public/addons/trapper/bloodycoil.png"
      ],
      "description": "A fairly typical build with no chase perks, so winning consistently may be difficult. Still, it is a solid build with generator regression and Agitation, designed to play near the basement and secure a win.",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "id": "b1790005623137",
      "perkIds": [
        "K26P02",
        "CorruptIntervention",
        "Agitation",
        "K42P01"
      ]
    },
    {
      "id": "hens_animatronic_1",
      "name": "Best Animatronic Without Limitations",
      "killerIds": [
        "animatronic"
      ],
      "tags": [
        "Hens",
        "Chase",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Foxy's Hook",
        "Restaurant Menu"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "K42P01",
        "Mindbreaker"
      ]
    },
    {
      "id": "hens_animatronic_2",
      "name": "Funny Animatronic",
      "killerIds": [
        "animatronic"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Stealth",
        "Chase",
        "Haste",
        "Obsession",
        "Info"
      ],
      "addons": [
        "Foxy's Hook",
        "Celebrate! Poster"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K34P03",
        "FurtiveChase",
        "K32P03",
        "K35P01"
      ]
    },
    {
      "id": "hens_animatronic_3",
      "name": "Best Beginner Animatronic",
      "killerIds": [
        "animatronic"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Chase",
        "Info"
      ],
      "addons": [
        "Restaurant Menu",
        "Help Wanted Ad"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Brutal_Strength",
        "Tinkerer",
        "K40P02",
        "K25P03"
      ]
    },
    {
      "id": "hens_artist_4",
      "name": "Best Artist Without Limitations",
      "killerIds": [
        "artist"
      ],
      "tags": [
        "Hens",
        "Chase",
        "GenRegression",
        "GenBlocking",
        "Haste"
      ],
      "addons": [
        "Severed Hands",
        "Untitled Agony"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "killer:dead-man-s-switch",
        "K33P02"
      ]
    },
    {
      "id": "hens_artist_5",
      "name": "Funny Artist",
      "killerIds": [
        "artist"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Severed Hands",
        "Festering Carrion"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:barbecue-chilli",
        "Surveillance",
        "K22P02",
        "Discordance"
      ]
    },
    {
      "id": "hens_artist_6",
      "name": "Best Beginner Artist",
      "killerIds": [
        "artist"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "Stealth",
        "GenRegression",
        "GenBlocking",
        "Hex"
      ],
      "addons": [
        "Thick Tar",
        "Festering Carrion"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K26P03",
        "K26P02",
        "K26P01",
        "K25P02"
      ]
    },
    {
      "id": "hens_artist_7",
      "name": "Unique Artist — Stagger Shot Artist",
      "killerIds": [
        "artist"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Severed Hands",
        "Thick Tar"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Discordance",
        "K22P02",
        "Surveillance",
        "killer:barbecue-chilli"
      ]
    },
    {
      "id": "hens_blight_8",
      "name": "Best Blight Without Limitations",
      "killerIds": [
        "blight"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Blighted Crow",
        "Alchemist's Ring"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K26P02",
        "CorruptIntervention",
        "K24P03",
        "pop_goes_the_weasel"
      ]
    },
    {
      "id": "hens_blight_9",
      "name": "Funny Blight",
      "killerIds": [
        "blight"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Info"
      ],
      "addons": [
        "Blighted Crow",
        "Blighted Rat"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:barbecue-chilli",
        "K24P01",
        "K29P02",
        "Agitation"
      ]
    },
    {
      "id": "hens_blight_10",
      "name": "Best Beginner Blight",
      "killerIds": [
        "blight"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Chase",
        "GenBlocking"
      ],
      "addons": [
        "Canker Thorn",
        "Shredded Notes"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Brutal_Strength",
        "Enduring",
        "K25P03",
        "K25P01"
      ]
    },
    {
      "id": "hens_blight_11",
      "name": "Unique Blight — Stealth Blight",
      "killerIds": [
        "blight"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "Info"
      ],
      "addons": [
        "Rose Tonic",
        "Vigo's Journal"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "NurseCalling",
        "Gearhead",
        "Spies_From_The_Shadows",
        "Tinkerer"
      ]
    },
    {
      "id": "hens_cannibal_12",
      "name": "Best Cannibal Without Limitations",
      "killerIds": [
        "cannibal"
      ],
      "tags": [
        "Hens",
        "Chase",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "The Beast's Marks",
        "Iridescent Flesh"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "K42P01",
        "Bamboozle"
      ]
    },
    {
      "id": "hens_cannibal_13",
      "name": "Funny Cannibal",
      "killerIds": [
        "cannibal"
      ],
      "tags": [
        "Hens",
        "Fun",
        "Stealth",
        "Chase",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "The Beast's Marks",
        "Primer Bulb"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "Bamboozle",
        "K35P02",
        "K26P02"
      ]
    },
    {
      "id": "hens_cannibal_14",
      "name": "Best Beginner Cannibal",
      "killerIds": [
        "cannibal"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AuraReading",
        "Chase",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Primer Bulb",
        "Vegetable Oil"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Enduring",
        "Bamboozle",
        "pop_goes_the_weasel",
        "killer:barbecue-chilli"
      ]
    },
    {
      "id": "hens_cannibal_15",
      "name": "Unique Cannibal — Snowball Bubba",
      "killerIds": [
        "cannibal"
      ],
      "tags": [
        "Hens",
        "Stealth",
        "Slugging",
        "Info"
      ],
      "addons": [
        "Iridescent Flesh",
        "The Beast's Marks"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Insidious",
        "InfectiousFright",
        "Ironmaiden",
        "K32P02"
      ]
    },
    {
      "id": "hens_cenobite_16",
      "name": "Best Cenobite Without Limitations",
      "killerIds": [
        "cenobite"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Impaling Wire",
        "Greasy Black Lens"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K26P02",
        "killer:dead-man-s-switch",
        "CorruptIntervention",
        "K42P01"
      ]
    },
    {
      "id": "hens_cenobite_17",
      "name": "Funny Cenobite",
      "killerIds": [
        "cenobite"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "AntiHeal",
        "GenRegression",
        "Hex",
        "Info"
      ],
      "addons": [
        "Larry's Remains",
        "Frank's Heart"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Hex_Ruin",
        "Sloppy_Butcher",
        "K24P01",
        "killer:barbecue-chilli"
      ]
    },
    {
      "id": "hens_cenobite_18",
      "name": "Best Beginner Cenobite",
      "killerIds": [
        "cenobite"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "Stealth",
        "AntiHeal",
        "Chase",
        "GenBlocking",
        "Hex"
      ],
      "addons": [
        "Skewered Rat",
        "Liquified Gore"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Brutal_Strength",
        "K25P01",
        "K25P02",
        "K25P03"
      ]
    },
    {
      "id": "hens_cenobite_19",
      "name": "Unique Cenobite — Infinite Chainhunt Pinhead",
      "killerIds": [
        "cenobite"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "AntiHeal",
        "GenRegression",
        "Hex",
        "Info"
      ],
      "addons": [
        "Frank's Heart",
        "Larry's Blood"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Hex_Ruin",
        "killer:barbecue-chilli",
        "K24P01",
        "Sloppy_Butcher"
      ]
    },
    {
      "id": "hens_clown_20",
      "name": "Best Clown Without Limitations",
      "killerIds": [
        "clown"
      ],
      "tags": [
        "Hens",
        "Exposed",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Garish Make-Up Kit",
        "Cheap Gin Bottle"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "K24P03",
        "killer:dragon-s-grip"
      ]
    },
    {
      "id": "hens_clown_21",
      "name": "Funny Clown",
      "killerIds": [
        "clown"
      ],
      "tags": [
        "Hens",
        "Fun",
        "Chase",
        "GenRegression",
        "GenBlocking",
        "Haste"
      ],
      "addons": [
        "Flask of Bleach",
        "Ether 15 Vol%"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K33P02",
        "killer:dead-man-s-switch",
        "K26P02",
        "Brutal_Strength"
      ]
    },
    {
      "id": "hens_clown_22",
      "name": "Best Beginner Clown",
      "killerIds": [
        "clown"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Chase",
        "GenRegression"
      ],
      "addons": [
        "Starling Feather",
        "Thick Cork Stopper"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "pop_goes_the_weasel",
        "Brutal_Strength",
        "Sloppy_Butcher",
        "Bamboozle"
      ]
    },
    {
      "id": "hens_clown_23",
      "name": "Unique Clown — Speed Clown",
      "killerIds": [
        "clown"
      ],
      "tags": [
        "Hens",
        "Stealth",
        "Chase",
        "Haste",
        "Obsession"
      ],
      "addons": [
        "Garish Make-Up Kit",
        "Cheap Gin Bottle"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K33P02",
        "K32P03",
        "K22P03",
        "Save_The_Best_For_Last"
      ]
    },
    {
      "id": "hens_darklord_24",
      "name": "Best Dark Lord Without Limitations",
      "killerIds": [
        "darklord"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "Hex"
      ],
      "addons": [
        "Lapis Lazuli",
        "Winged Boots"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K42P03",
        "Hex_Thrill_Of_The_Hunt",
        "Hex_Ruin",
        "K26P03"
      ]
    },
    {
      "id": "hens_darklord_25",
      "name": "Funny Dark Lord",
      "killerIds": [
        "darklord"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "GenRegression",
        "Hex",
        "Info"
      ],
      "addons": [
        "Traveller's Hat",
        "Clock Tower Gear"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Hex_Ruin",
        "killer:barbecue-chilli",
        "Spies_From_The_Shadows",
        "HexUndying"
      ]
    },
    {
      "id": "hens_darklord_26",
      "name": "Best Beginner Dark Lord",
      "killerIds": [
        "darklord"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "Stealth",
        "AntiHeal",
        "Hex"
      ],
      "addons": [
        "Clock Tower Gear",
        "Traveller's Hat"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K37P01",
        "K37P03",
        "K25P03",
        "K25P02"
      ]
    },
    {
      "id": "hens_darklord_27",
      "name": "Unique Dark Lord — Wolf Dracula",
      "killerIds": [
        "darklord"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "Stealth",
        "Chase",
        "Haste",
        "Info"
      ],
      "addons": [
        "Warg's Fang",
        "Force of Echo"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K24P01",
        "K22P03",
        "K33P02",
        "K35P02"
      ]
    },
    {
      "id": "hens_deathslinger_28",
      "name": "Best Deathslinger Without Limitations",
      "killerIds": [
        "deathslinger"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Bayshore's Cigar",
        "Iridescent Coin"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "killer:dead-man-s-switch",
        "K42P01"
      ]
    },
    {
      "id": "hens_deathslinger_29",
      "name": "Funny Deathslinger",
      "killerIds": [
        "deathslinger"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Stealth",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Warden's Keys",
        "Bayshore's Cigar"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K35P02",
        "K24P03",
        "K26P02",
        "killer:barbecue-chilli"
      ]
    },
    {
      "id": "hens_deathslinger_30",
      "name": "Best Beginner Deathslinger",
      "killerIds": [
        "deathslinger"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AuraReading",
        "Stealth",
        "AntiHeal",
        "GenBlocking",
        "Hex",
        "Info"
      ],
      "addons": [
        "Warden's Keys",
        "Modified Ammo Belt"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "NurseCalling",
        "killer:dead-man-s-switch",
        "K25P03",
        "K25P02"
      ]
    },
    {
      "id": "hens_deathslinger_31",
      "name": "Unique Deathslinger — 0 Terror Radius Deathslinger",
      "killerIds": [
        "deathslinger"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "Stealth",
        "Info"
      ],
      "addons": [
        "Marshal's Badge",
        "Gold Creek Whiskey"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "MonitorAndAbuse",
        "Gearhead",
        "Whispers",
        "killer:barbecue-chilli"
      ]
    },
    {
      "id": "hens_demogorgon_32",
      "name": "Best Demogorgon Without Limitations",
      "killerIds": [
        "demogorgon"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Barb's Glasses",
        "Leprose Lichen"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "K42P01",
        "killer:dead-man-s-switch"
      ]
    },
    {
      "id": "hens_demogorgon_33",
      "name": "Funny Demogorgon",
      "killerIds": [
        "demogorgon"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "GenRegression",
        "GenBlocking",
        "Info"
      ],
      "addons": [
        "Black Heart",
        "Barb's Glasses"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:barbecue-chilli",
        "K26P02",
        "CorruptIntervention",
        "K26P01"
      ]
    },
    {
      "id": "hens_demogorgon_34",
      "name": "Best Beginner Demogorgon",
      "killerIds": [
        "demogorgon"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Chase",
        "GenRegression"
      ],
      "addons": [
        "Barb's Glasses",
        "Black Heart"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Bamboozle",
        "Enduring",
        "pop_goes_the_weasel",
        "K25P03"
      ]
    },
    {
      "id": "hens_demogorgon_35",
      "name": "Unique Demogorgon — Devour Demogorgon",
      "killerIds": [
        "demogorgon"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "Exposed",
        "Hex",
        "Haste",
        "Info"
      ],
      "addons": [
        "Deer Lung",
        "Lifeguard Whistle"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Hex_Devour_Hope",
        "HexUndying",
        "Hex_Thrill_Of_The_Hunt",
        "K26P03"
      ]
    },
    {
      "id": "hens_doctor_36",
      "name": "Best Doctor Without Limitations",
      "killerIds": [
        "doctor"
      ],
      "tags": [
        "Hens",
        "Chase",
        "GenRegression",
        "GenBlocking",
        "Haste"
      ],
      "addons": [
        "\"Discipline\" - Carter's Notes",
        "High Stimulus Electrode"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "killer:dead-man-s-switch",
        "K33P02"
      ]
    },
    {
      "id": "hens_doctor_37",
      "name": "Funny Doctor",
      "killerIds": [
        "doctor"
      ],
      "tags": [
        "Hens",
        "Fun",
        "Chase",
        "GenRegression",
        "GenBlocking",
        "Haste"
      ],
      "addons": [
        "\"Discipline\" - Carter's Notes",
        "\"Discipline\" - Class II"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K33P02",
        "CorruptIntervention",
        "K26P02",
        "K27P03"
      ]
    },
    {
      "id": "hens_doctor_38",
      "name": "Best Beginner Doctor",
      "killerIds": [
        "doctor"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Chase",
        "GenRegression"
      ],
      "addons": [
        "\"Discipline\" - Class II",
        "Polished Electrode"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Agitation",
        "pop_goes_the_weasel",
        "Brutal_Strength",
        "K25P03"
      ]
    },
    {
      "id": "hens_doctor_39",
      "name": "Unique Doctor — Terror Radius Doctor",
      "killerIds": [
        "doctor"
      ],
      "tags": [
        "Hens",
        "Stealth",
        "Hex",
        "Info"
      ],
      "addons": [
        "\"Calm\" - Class II",
        "\"Calm\" - Carter's Notes"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K27P03",
        "K35P02",
        "MonitorAndAbuse",
        "K30P02"
      ]
    },
    {
      "id": "hens_dredge_40",
      "name": "Best Dredge Without Limitations",
      "killerIds": [
        "dredge"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Ottomarian Writing",
        "Lavalier Microphone"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "pop_goes_the_weasel",
        "K26P02",
        "K24P03",
        "CorruptIntervention"
      ]
    },
    {
      "id": "hens_dredge_41",
      "name": "Funny Dredge",
      "killerIds": [
        "dredge"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AntiHeal",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Broken Doll",
        "Haddie's Calendar"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K24P03",
        "CorruptIntervention",
        "K26P02",
        "Sloppy_Butcher"
      ]
    },
    {
      "id": "hens_dredge_42",
      "name": "Best Beginner Dredge",
      "killerIds": [
        "dredge"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AuraReading",
        "AntiHeal",
        "Chase",
        "Info"
      ],
      "addons": [
        "Haddie's Calendar",
        "Malthinker's Skull"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "NurseCalling",
        "Tinkerer",
        "Brutal_Strength",
        "K25P03"
      ]
    },
    {
      "id": "hens_dredge_43",
      "name": "Unique Dredge — One Shot Dredge",
      "killerIds": [
        "dredge"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "Exposed",
        "Hex",
        "Haste",
        "Obsession",
        "Info"
      ],
      "addons": [
        "Field Recorder",
        "Lavalier Microphone"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "MakeYourChoice",
        "killer:dragon-s-grip",
        "Hex_Devour_Hope",
        "killer:friends-til-the-end"
      ]
    },
    {
      "id": "hens_executioner_44",
      "name": "Best Executioner Without Limitations",
      "killerIds": [
        "executioner"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "Hex"
      ],
      "addons": [
        "Obsidian Goblet",
        "Cinderella Music Box"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Hex_Ruin",
        "Hex_Thrill_Of_The_Hunt",
        "K26P03",
        "K42P03"
      ]
    },
    {
      "id": "hens_executioner_45",
      "name": "Funny Executioner",
      "killerIds": [
        "executioner"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Stealth",
        "Exposed",
        "Chase",
        "Info"
      ],
      "addons": [
        "Burning Man Painting",
        "Wax Doll"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "TrailofTorment",
        "killer:dragon-s-grip",
        "NurseCalling",
        "Mindbreaker"
      ]
    },
    {
      "id": "hens_executioner_46",
      "name": "Best Beginner Executioner",
      "killerIds": [
        "executioner"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Chase",
        "GenBlocking",
        "Info"
      ],
      "addons": [
        "Spearhead",
        "Wax Doll"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Brutal_Strength",
        "Spies_From_The_Shadows",
        "K25P01",
        "K25P03"
      ]
    },
    {
      "id": "hens_executioner_47",
      "name": "Unique Executioner — Jumpscare One Shot Pyramid Head",
      "killerIds": [
        "executioner"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "Stealth",
        "Exposed",
        "Chase",
        "Info"
      ],
      "addons": [
        "Obsidian Goblet",
        "Crimson Ceremony Book"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Mindbreaker",
        "killer:dragon-s-grip",
        "TrailofTorment",
        "NurseCalling"
      ]
    },
    {
      "id": "hens_first_48",
      "name": "Best First Without Limitations",
      "killerIds": [
        "first"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "Hex"
      ],
      "addons": [
        "Rabbit Remains",
        "Smashed Cassette Deck"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K42P03",
        "Hex_Ruin",
        "Hex_Thrill_Of_The_Hunt",
        "K26P03"
      ]
    },
    {
      "id": "hens_ghostface_49",
      "name": "Best Ghost Face Without Limitations",
      "killerIds": [
        "ghostface"
      ],
      "tags": [
        "Hens",
        "Chase",
        "GenRegression",
        "GenBlocking",
        "Haste",
        "Obsession"
      ],
      "addons": [
        "Drop-Leg Knife Sheath",
        "Walleye's Matchbook"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "Play_With_Your_Food",
        "K42P01"
      ]
    },
    {
      "id": "hens_ghostface_50",
      "name": "Funny Ghost Face",
      "killerIds": [
        "ghostface"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AntiHeal",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Driver's License",
        "Drop-Leg Knife Sheath"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Surge",
        "Discordance",
        "Spies_From_The_Shadows",
        "Sloppy_Butcher"
      ]
    },
    {
      "id": "hens_ghostface_51",
      "name": "Best Beginner Ghost Face",
      "killerIds": [
        "ghostface"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AuraReading",
        "AntiHeal",
        "GenRegression",
        "GenBlocking",
        "Hex",
        "Info"
      ],
      "addons": [
        "\"Philly\"",
        "Walleye's Matchbook"
      ],
      "addonImages": [
        "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/philly.png",
        "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/walleyesmatchbook.png"
      ],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Sloppy_Butcher",
        "NurseCalling",
        "Hex_Ruin",
        "K25P01"
      ]
    },
    {
      "id": "hens_ghostface_52",
      "name": "Unique Ghost Face — Jumpscare License Ghostface",
      "killerIds": [
        "ghostface"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Driver's License",
        "\"Philly\""
      ],
      "addonImages": [
        "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/philly.png"
      ],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Spies_From_The_Shadows",
        "pop_goes_the_weasel",
        "K27P01",
        "Discordance"
      ]
    },
    {
      "id": "hens_ghoul_53",
      "name": "Best Ghoul Without Limitations",
      "killerIds": [
        "ghoul"
      ],
      "tags": [
        "Hens",
        "Chase",
        "GenRegression",
        "Hex"
      ],
      "addons": [
        "Yamori's Mask",
        "Fresh Coffee"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K42P03",
        "Hex_Ruin",
        "Hex_Thrill_Of_The_Hunt",
        "killer:hex-blood-favour"
      ]
    },
    {
      "id": "hens_ghoul_54",
      "name": "Funny Ghoul",
      "killerIds": [
        "ghoul"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "AntiHeal",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Blood-Stained Handkerchief",
        "Rize's Glasses"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K26P02",
        "killer:barbecue-chilli",
        "Surge",
        "Thanatophobia"
      ]
    },
    {
      "id": "hens_ghoul_55",
      "name": "Unique Ghoul — Endgame Kaneki",
      "killerIds": [
        "ghoul"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "Exposed",
        "Endgame",
        "Hex",
        "Haste",
        "Info"
      ],
      "addons": [
        "Blood-Stained Handkerchief",
        "Hide's Headphones"
      ],
      "addonImages": [
        "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/hidesheadphones.png"
      ],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K23P03",
        "K39P03",
        "No_One_Escapes_Death",
        "Bitter_Murmur"
      ]
    },
    {
      "id": "hens_ghoul_56",
      "name": "Best Beginner Ghoul",
      "killerIds": [
        "ghoul"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Chase",
        "Info"
      ],
      "addons": [
        "Fresh Coffee",
        "Blood-Stained Handkerchief"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K39P02",
        "Brutal_Strength",
        "Spies_From_The_Shadows",
        "K25P03"
      ]
    },
    {
      "id": "hens_goodguy_57",
      "name": "Best Good Guy Without Limitations",
      "killerIds": [
        "goodguy"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Straight Razor",
        "Jump Rope"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K26P02",
        "CorruptIntervention",
        "K42P01",
        "killer:dead-man-s-switch"
      ]
    },
    {
      "id": "hens_goodguy_58",
      "name": "Funny Good Guy",
      "killerIds": [
        "goodguy"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Chase",
        "GenRegression",
        "GenBlocking",
        "Info"
      ],
      "addons": [
        "Power Drill",
        "Jump Rope"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:barbecue-chilli",
        "Brutal_Strength",
        "K26P02",
        "CorruptIntervention"
      ]
    },
    {
      "id": "hens_goodguy_59",
      "name": "Best Beginner Good Guy",
      "killerIds": [
        "goodguy"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AuraReading",
        "Stealth",
        "AntiHeal",
        "Exposed",
        "Chase",
        "Hex",
        "Obsession",
        "Info"
      ],
      "addons": [
        "Power Drill",
        "Jump Rope"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Brutal_Strength",
        "killer:friends-til-the-end",
        "K25P02",
        "K25P03"
      ]
    },
    {
      "id": "hens_goodguy_60",
      "name": "Unique Good Guy — Infinite Dash Chucky",
      "killerIds": [
        "goodguy"
      ],
      "tags": [
        "Hens",
        "Endgame",
        "Obsession"
      ],
      "addons": [
        "Portable TV",
        "Power Drill"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "RememberMe",
        "K23P03",
        "ZanshinTactics",
        "K29P03"
      ]
    },
    {
      "id": "hens_hag_61",
      "name": "Best Hag Without Limitations",
      "killerIds": [
        "hag"
      ],
      "tags": [
        "Hens",
        "AntiHeal",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Rusty Shackles",
        "Mint Rag"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K42P01",
        "Sloppy_Butcher",
        "K26P02"
      ]
    },
    {
      "id": "hens_hag_62",
      "name": "Funny Hag",
      "killerIds": [
        "hag"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "AntiHeal",
        "GenBlocking",
        "Info"
      ],
      "addons": [
        "Swamp Orchid Necklet",
        "Cypress Necklet"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Sloppy_Butcher",
        "CorruptIntervention",
        "NurseCalling",
        "Spies_From_The_Shadows"
      ]
    },
    {
      "id": "hens_hag_63",
      "name": "Best Beginner Hag",
      "killerIds": [
        "hag"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Exposed",
        "GenRegression",
        "Hex",
        "Haste"
      ],
      "addons": [
        "Cypress Necklet",
        "Dragonfly Wings"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Hex_Thrill_Of_The_Hunt",
        "Hex_Devour_Hope",
        "Hex_Ruin",
        "Sloppy_Butcher"
      ]
    },
    {
      "id": "hens_hag_64",
      "name": "Unique Hag — Chase Hag",
      "killerIds": [
        "hag"
      ],
      "tags": [
        "Hens",
        "Chase",
        "Haste",
        "Obsession"
      ],
      "addons": [
        "Waterlogged Shoe",
        "Scarred Hand"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Unrelenting",
        "K33P02",
        "Save_The_Best_For_Last",
        "Play_With_Your_Food"
      ]
    },
    {
      "id": "hens_hillbilly_65",
      "name": "Best Hillbilly Without Limitations",
      "killerIds": [
        "hillbilly"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "GenRegression",
        "GenBlocking",
        "Info"
      ],
      "addons": [
        "Iridescent Engravings",
        "Spiked Boots"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:barbecue-chilli",
        "K26P02",
        "K42P01",
        "killer:dead-man-s-switch"
      ]
    },
    {
      "id": "hens_hillbilly_66",
      "name": "Funny Hillbilly",
      "killerIds": [
        "hillbilly"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Info"
      ],
      "addons": [
        "Iridescent Engravings",
        "Spiked Boots"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:barbecue-chilli",
        "K24P01",
        "K29P02",
        "Agitation"
      ]
    },
    {
      "id": "hens_hillbilly_67",
      "name": "Best Beginner Hillbilly",
      "killerIds": [
        "hillbilly"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Chase",
        "Info"
      ],
      "addons": [
        "Spiked Boots",
        "Dad's Boots"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Enduring",
        "Bamboozle",
        "Spies_From_The_Shadows",
        "K25P03"
      ]
    },
    {
      "id": "hens_hillbilly_68",
      "name": "Unique Hillbilly — Jumpscare Billy",
      "killerIds": [
        "hillbilly"
      ],
      "tags": [
        "Hens",
        "Stealth",
        "Chase",
        "Hex",
        "Haste"
      ],
      "addons": [
        "Apex Muffler",
        "Spiked Boots"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K32P03",
        "Mindbreaker",
        "TrailofTorment",
        "K25P02"
      ]
    },
    {
      "id": "hens_houndmaster_69",
      "name": "Best Houndmaster Without Limitations",
      "killerIds": [
        "houndmaster"
      ],
      "tags": [
        "Hens",
        "Exposed",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Barley Meal",
        "Spiked Collar"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "K42P01",
        "K23P01"
      ]
    },
    {
      "id": "hens_houndmaster_70",
      "name": "Funny Houndmaster",
      "killerIds": [
        "houndmaster"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Exposed",
        "Info"
      ],
      "addons": [
        "Ship Figurehead",
        "Young Coconut"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Agitation",
        "K29P02",
        "K23P01",
        "killer:barbecue-chilli"
      ]
    },
    {
      "id": "hens_houndmaster_71",
      "name": "Best Beginner Houndmaster",
      "killerIds": [
        "houndmaster"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Chase",
        "Info"
      ],
      "addons": [
        "Smoked Snapper",
        "Young Coconut"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K38P03",
        "Brutal_Strength",
        "Spies_From_The_Shadows",
        "K25P03"
      ]
    },
    {
      "id": "hens_huntress_72",
      "name": "Best Huntress Without Limitations",
      "killerIds": [
        "huntress"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Flower Babushka",
        "Rose Root"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "killer:dead-man-s-switch",
        "K42P01"
      ]
    },
    {
      "id": "hens_huntress_73",
      "name": "Funny Huntress",
      "killerIds": [
        "huntress"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Info"
      ],
      "addons": [
        "Flower Babushka",
        "Glowing Concoction"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K28P02",
        "killer:barbecue-chilli",
        "K24P01",
        "Bitter_Murmur"
      ]
    },
    {
      "id": "hens_huntress_74",
      "name": "Best Beginner Huntress",
      "killerIds": [
        "huntress"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AuraReading",
        "Chase",
        "GenBlocking",
        "Info"
      ],
      "addons": [
        "Oak Haft",
        "Shiny Pin"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Brutal_Strength",
        "Bitter_Murmur",
        "NurseCalling",
        "K25P01"
      ]
    },
    {
      "id": "hens_huntress_75",
      "name": "Unique Huntress — Jump Scare Melee Huntress",
      "killerIds": [
        "huntress"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "Chase",
        "Info"
      ],
      "addons": [
        "Soldier's Puttee",
        "Wooden Fox"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Discordance",
        "Spies_From_The_Shadows",
        "K28P02",
        "K22P03"
      ]
    },
    {
      "id": "hens_knight_76",
      "name": "Best Knight Without Limitations",
      "killerIds": [
        "knight"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "Hex"
      ],
      "addons": [
        "Dried Horsemeat",
        "Call to Arms"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Hex_Ruin",
        "K42P03",
        "Hex_Thrill_Of_The_Hunt",
        "K26P03"
      ]
    },
    {
      "id": "hens_knight_77",
      "name": "Funny Knight",
      "killerIds": [
        "knight"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "GenRegression",
        "GenBlocking",
        "Info"
      ],
      "addons": [
        "Call to Arms",
        "Map of the Realm"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Discordance",
        "killer:barbecue-chilli",
        "K26P02",
        "CorruptIntervention"
      ]
    },
    {
      "id": "hens_knight_78",
      "name": "Best Beginner Knight",
      "killerIds": [
        "knight"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AuraReading",
        "AntiHeal",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Call to Arms",
        "Map of the Realm"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K30P01",
        "Spies_From_The_Shadows",
        "pop_goes_the_weasel",
        "K25P03"
      ]
    },
    {
      "id": "hens_knight_79",
      "name": "Unique Knight — Languid Spies Knight",
      "killerIds": [
        "knight"
      ],
      "tags": [
        "Hens",
        "Stealth",
        "Haste",
        "Info"
      ],
      "addons": [
        "Knight's Contract",
        "Call to Arms"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K32P03",
        "Spies_From_The_Shadows",
        "K36P02",
        "Discordance"
      ]
    },
    {
      "id": "hens_krasue_80",
      "name": "Best Krasue Without Limitations",
      "killerIds": [
        "krasue"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "GenRegression",
        "GenBlocking",
        "Hex",
        "Info"
      ],
      "addons": [
        "Chicken Head",
        "Framed Newspaper"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K26P02",
        "Hex_Ruin",
        "HexUndying",
        "killer:dead-man-s-switch"
      ]
    },
    {
      "id": "hens_krasue_81",
      "name": "Funny Krasue",
      "killerIds": [
        "krasue"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Chase",
        "GenRegression",
        "Hex",
        "Info"
      ],
      "addons": [
        "Framed Newspaper",
        "Dulled Knife"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Bamboozle",
        "killer:barbecue-chilli",
        "Hex_Ruin",
        "HexUndying"
      ]
    },
    {
      "id": "hens_krasue_82",
      "name": "Best Beginner Krasue",
      "killerIds": [
        "krasue"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "Stealth",
        "AntiHeal",
        "Chase",
        "Hex",
        "Info"
      ],
      "addons": [
        "Luckless Mouse",
        "Pig's Eye"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Bamboozle",
        "Spies_From_The_Shadows",
        "K25P02",
        "K25P03"
      ]
    },
    {
      "id": "hens_legion_83",
      "name": "Best Legion Without Limitations",
      "killerIds": [
        "legion"
      ],
      "tags": [
        "Hens",
        "Chase",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Scratched Ruler",
        "Iridescent Button"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "K42P01",
        "Bamboozle"
      ]
    },
    {
      "id": "hens_legion_84",
      "name": "Funny Legion",
      "killerIds": [
        "legion"
      ],
      "tags": [
        "Hens",
        "Fun",
        "Chase",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Julie's Mix Tape",
        "Iridescent Button"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "Enduring",
        "SpiritFury"
      ]
    },
    {
      "id": "hens_legion_85",
      "name": "Best Beginner Legion",
      "killerIds": [
        "legion"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Chase",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Mischief List",
        "Friendship Bracelet"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Discordance",
        "Bamboozle",
        "pop_goes_the_weasel",
        "K25P03"
      ]
    },
    {
      "id": "hens_legion_86",
      "name": "Unique Legion — 150% Speed Legion",
      "killerIds": [
        "legion"
      ],
      "tags": [
        "Hens",
        "Stealth",
        "Exposed",
        "Endgame",
        "Chase",
        "Hex",
        "Haste"
      ],
      "addons": [
        "BFFs",
        "Mural Sketch"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K23P03",
        "No_One_Escapes_Death",
        "K34P03",
        "K32P03"
      ]
    },
    {
      "id": "hens_lich_87",
      "name": "Best Lich Without Limitations",
      "killerIds": [
        "lich"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "Slugging",
        "GenRegression",
        "GenBlocking",
        "Info"
      ],
      "addons": [
        "Boots of Speed",
        "Raven's Feather"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K26P02",
        "CorruptIntervention",
        "K42P01",
        "Deerstalker"
      ]
    },
    {
      "id": "hens_lich_88",
      "name": "Funny Lich",
      "killerIds": [
        "lich"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "AntiHeal",
        "Chase",
        "GenRegression",
        "Haste",
        "Info"
      ],
      "addons": [
        "Pearl of Power",
        "Ring of Spell Storing"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:barbecue-chilli",
        "K33P02",
        "K26P02",
        "K25P03"
      ]
    },
    {
      "id": "hens_lich_89",
      "name": "Best Beginner Lich",
      "killerIds": [
        "lich"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AuraReading",
        "AntiHeal",
        "Info"
      ],
      "addons": [
        "Potion of Speed",
        "Raven's Feather"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "NurseCalling",
        "K36P02",
        "Spies_From_The_Shadows",
        "K25P03"
      ]
    },
    {
      "id": "hens_lich_90",
      "name": "Unique Lich — Sneak Fake Chest Vecna",
      "killerIds": [
        "lich"
      ],
      "tags": [
        "Hens",
        "Stealth",
        "Exposed",
        "Chase",
        "Haste"
      ],
      "addons": [
        "Cloak of Invisibility",
        "Bag of Holding"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "TrailofTorment",
        "K33P02",
        "K32P03",
        "killer:dragon-s-grip"
      ]
    },
    {
      "id": "hens_mastermind_91",
      "name": "Best Mastermind Without Limitations",
      "killerIds": [
        "mastermind"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Iridescent Uroboros Vial",
        "Lab Photo"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "pop_goes_the_weasel",
        "K26P02",
        "K24P03",
        "K26P01"
      ]
    },
    {
      "id": "hens_mastermind_92",
      "name": "Funny Mastermind",
      "killerIds": [
        "mastermind"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Chase",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Egg (Gold)",
        "Leather Gloves"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:barbecue-chilli",
        "Brutal_Strength",
        "K26P02",
        "K24P01"
      ]
    },
    {
      "id": "hens_mastermind_93",
      "name": "Best Beginner Mastermind",
      "killerIds": [
        "mastermind"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "Stealth",
        "AntiHeal",
        "Chase",
        "Hex",
        "Info"
      ],
      "addons": [
        "Uroboros Tendril",
        "Leather Gloves"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Brutal_Strength",
        "Spies_From_The_Shadows",
        "K25P02",
        "K25P03"
      ]
    },
    {
      "id": "hens_mastermind_94",
      "name": "Unique Mastermind — Throw Wesker",
      "killerIds": [
        "mastermind"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "Stealth",
        "Chase",
        "Hex",
        "Info"
      ],
      "addons": [
        "Jewel Beetle",
        "Lion Medallion"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K37P03",
        "HexUndying",
        "killer:hex-blood-favour",
        "K25P02"
      ]
    },
    {
      "id": "hens_nemesis_95",
      "name": "Best Nemesis Without Limitations",
      "killerIds": [
        "nemesis"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking",
        "Info"
      ],
      "addons": [
        "Marvin's Blood",
        "Licker Tongue"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K42P01",
        "Discordance",
        "CorruptIntervention",
        "K26P02"
      ]
    },
    {
      "id": "hens_nemesis_96",
      "name": "Funny Nemesis",
      "killerIds": [
        "nemesis"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "GenRegression",
        "GenBlocking",
        "Hex",
        "Info"
      ],
      "addons": [
        "Depleted Ink Ribbon",
        "Shattered S.T.A.R.S. Badge"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "Hex_Ruin",
        "HexUndying",
        "Discordance"
      ]
    },
    {
      "id": "hens_nemesis_97",
      "name": "Best Beginner Nemesis",
      "killerIds": [
        "nemesis"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AuraReading",
        "AntiHeal",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Marvin's Blood",
        "Mikhail's Eye"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "pop_goes_the_weasel",
        "K24P03",
        "K24P01",
        "K25P03"
      ]
    },
    {
      "id": "hens_nemesis_98",
      "name": "Unique Nemesis — Speed Zombie Nemesis",
      "killerIds": [
        "nemesis"
      ],
      "tags": [
        "Hens",
        "Slugging",
        "GenRegression",
        "Hex",
        "Info"
      ],
      "addons": [
        "Shattered S.T.A.R.S. Badge",
        "Depleted Ink Ribbon"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Hex_Ruin",
        "Discordance",
        "K30P02",
        "InfectiousFright"
      ]
    },
    {
      "id": "hens_nightmare_99",
      "name": "Best Nightmare Without Limitations",
      "killerIds": [
        "nightmare"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Unicorn Block",
        "Jump Rope"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "pop_goes_the_weasel",
        "K24P03"
      ]
    },
    {
      "id": "hens_nightmare_100",
      "name": "Funny Nightmare",
      "killerIds": [
        "nightmare"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "AntiHeal",
        "Chase",
        "GenRegression",
        "Haste",
        "Info"
      ],
      "addons": [
        "Pill Bottle",
        "Unicorn Block"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "pop_goes_the_weasel",
        "killer:barbecue-chilli",
        "K33P02",
        "Sloppy_Butcher"
      ]
    },
    {
      "id": "hens_nightmare_101",
      "name": "Best Beginner Nightmare",
      "killerIds": [
        "nightmare"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Chase",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Garden Rake",
        "Outdoor Rope"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "pop_goes_the_weasel",
        "Tinkerer",
        "Brutal_Strength",
        "K25P03"
      ]
    },
    {
      "id": "hens_nightmare_102",
      "name": "Unique Nightmare — Skillcheck Freddy",
      "killerIds": [
        "nightmare"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "Hex",
        "Info"
      ],
      "addons": [
        "Green Dress",
        "Blue Dress"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K27P03",
        "GeneratorOvercharge",
        "Hex_HuntressLullaby",
        "K22P02"
      ]
    },
    {
      "id": "hens_nurse_103",
      "name": "Best Nurse Without Limitations",
      "killerIds": [
        "nurse"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Jenner's Last Breath",
        "Heavy Panting"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K26P02",
        "K24P03",
        "K24P01",
        "K30P01"
      ]
    },
    {
      "id": "hens_nurse_104",
      "name": "Funny Nurse",
      "killerIds": [
        "nurse"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Info"
      ],
      "addons": [
        "Fragile Wheeze",
        "Heavy Panting"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:barbecue-chilli",
        "K24P01",
        "K27P01",
        "Agitation"
      ]
    },
    {
      "id": "hens_nurse_105",
      "name": "Best Beginner Nurse",
      "killerIds": [
        "nurse"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Info"
      ],
      "addons": [
        "Bad Man Keepsake",
        "Wooden Horse"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Spies_From_The_Shadows",
        "Thanatophobia",
        "Predator",
        "K25P03"
      ]
    },
    {
      "id": "hens_nurse_106",
      "name": "Unique Nurse — 5 Blink Nurse",
      "killerIds": [
        "nurse"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "Stealth",
        "Hex",
        "Info"
      ],
      "addons": [
        "Torn Bookmark",
        "Jenner's Last Breath"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:barbecue-chilli",
        "Discordance",
        "K24P01",
        "K25P02"
      ]
    },
    {
      "id": "hens_oni_107",
      "name": "Best Oni Without Limitations",
      "killerIds": [
        "oni"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Splintered Hull",
        "Akito's Crutch"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K24P03",
        "K26P02",
        "killer:dead-man-s-switch"
      ]
    },
    {
      "id": "hens_oni_108",
      "name": "Funny Oni",
      "killerIds": [
        "oni"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Chase",
        "GenRegression",
        "GenBlocking",
        "Info"
      ],
      "addons": [
        "Splintered Hull",
        "Lion Fang"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:barbecue-chilli",
        "CorruptIntervention",
        "K26P02",
        "Brutal_Strength"
      ]
    },
    {
      "id": "hens_oni_109",
      "name": "Best Beginner Oni",
      "killerIds": [
        "oni"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Chase",
        "GenRegression"
      ],
      "addons": [
        "Ink Lion",
        "Cracked Sakazuki"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "pop_goes_the_weasel",
        "Brutal_Strength",
        "Bamboozle",
        "K25P03"
      ]
    },
    {
      "id": "hens_oni_110",
      "name": "Unique Oni — All Seeing Oni",
      "killerIds": [
        "oni"
      ],
      "tags": [
        "Hens",
        "Stealth",
        "Chase",
        "Haste",
        "Info"
      ],
      "addons": [
        "Renjiro's Bloody Glove",
        "Splintered Hull"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K32P03",
        "Tinkerer",
        "Mindbreaker",
        "TrailofTorment"
      ]
    },
    {
      "id": "hens_onryo_111",
      "name": "Best Onryo Without Limitations",
      "killerIds": [
        "onryo"
      ],
      "tags": [
        "Hens",
        "AntiHeal",
        "GenRegression",
        "GenBlocking",
        "Hex",
        "Info"
      ],
      "addons": [
        "Remote Control",
        "Bloody Fingernails"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "Sloppy_Butcher",
        "Hex_Ruin",
        "K30P02"
      ]
    },
    {
      "id": "hens_onryo_112",
      "name": "Funny Onryo",
      "killerIds": [
        "onryo"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AntiHeal",
        "Hex",
        "Info"
      ],
      "addons": [
        "Old Newspaper",
        "Bloody Fingernails"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K30P02",
        "Sloppy_Butcher",
        "Discordance",
        "Spies_From_The_Shadows"
      ]
    },
    {
      "id": "hens_onryo_113",
      "name": "Best Beginner Onryo",
      "killerIds": [
        "onryo"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AuraReading",
        "AntiHeal",
        "GenRegression",
        "Hex",
        "Info"
      ],
      "addons": [
        "Reiko's Watch",
        "Old Newspaper"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Spies_From_The_Shadows",
        "Sloppy_Butcher",
        "NurseCalling",
        "Hex_Ruin"
      ]
    },
    {
      "id": "hens_onryo_114",
      "name": "Unique Onryo — Infinite Teleport Onryo",
      "killerIds": [
        "onryo"
      ],
      "tags": [
        "Hens",
        "AntiHeal",
        "GenRegression",
        "Hex",
        "Info"
      ],
      "addons": [
        "Bloody Fingernails",
        "Iridescent Videotape"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Surveillance",
        "K22P02",
        "Sloppy_Butcher",
        "K30P02"
      ]
    },
    {
      "id": "hens_pig_115",
      "name": "Best Pig Without Limitations",
      "killerIds": [
        "pig"
      ],
      "tags": [
        "Hens",
        "Chase",
        "GenRegression"
      ],
      "addons": [
        "Rules Set No.2",
        "Video Tape"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K26P02",
        "pop_goes_the_weasel",
        "K24P03",
        "Brutal_Strength"
      ]
    },
    {
      "id": "hens_pig_116",
      "name": "Funny Pig",
      "killerIds": [
        "pig"
      ],
      "tags": [
        "Hens",
        "Fun",
        "Stealth",
        "AntiHeal",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Workshop Grease",
        "Last Will"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Sloppy_Butcher",
        "K26P02",
        "MonitorAndAbuse",
        "Whispers"
      ]
    },
    {
      "id": "hens_pig_117",
      "name": "Best Beginner Pig",
      "killerIds": [
        "pig"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "Stealth",
        "AntiHeal",
        "Chase",
        "Hex",
        "Info"
      ],
      "addons": [
        "Combat Straps",
        "John's Medical File"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Whispers",
        "Brutal_Strength",
        "K25P03",
        "K25P02"
      ]
    },
    {
      "id": "hens_pig_118",
      "name": "Unique Pig — Scream Pig",
      "killerIds": [
        "pig"
      ],
      "tags": [
        "Hens",
        "Slugging",
        "Hex",
        "Info"
      ],
      "addons": [
        "Razor Wires",
        "Interlocking Razor"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K30P02",
        "K33P01",
        "InfectiousFright",
        "K31P02"
      ]
    },
    {
      "id": "hens_plague_119",
      "name": "Best Plague Without Limitations",
      "killerIds": [
        "plague"
      ],
      "tags": [
        "Hens",
        "Chase",
        "GenRegression",
        "Hex"
      ],
      "addons": [
        "Devotee's Amulet",
        "Iridescent Seal"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Hex_Ruin",
        "Hex_Thrill_Of_The_Hunt",
        "killer:hex-blood-favour",
        "K26P03"
      ]
    },
    {
      "id": "hens_plague_120",
      "name": "Funny Plague",
      "killerIds": [
        "plague"
      ],
      "tags": [
        "Hens",
        "Fun",
        "Stealth",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Rubbing Oil",
        "Infected Emetic"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "K24P03",
        "TrailofTorment"
      ]
    },
    {
      "id": "hens_plague_121",
      "name": "Best Beginner Plague",
      "killerIds": [
        "plague"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "Stealth",
        "AntiHeal",
        "GenBlocking",
        "Hex"
      ],
      "addons": [
        "Blessed Apple",
        "Emetic Potion"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "Thanatophobia",
        "K25P02",
        "K25P01"
      ]
    },
    {
      "id": "hens_plague_122",
      "name": "Unique Plague — Speed Plague",
      "killerIds": [
        "plague"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "Stealth",
        "Chase",
        "Haste",
        "Obsession",
        "Info"
      ],
      "addons": [
        "Rubbing Oil",
        "Infected Emetic"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Play_With_Your_Food",
        "K34P03",
        "FurtiveChase",
        "K32P03"
      ]
    },
    {
      "id": "hens_shape_123",
      "name": "Best Shape Without Limitations",
      "killerIds": [
        "shape"
      ],
      "tags": [
        "Hens",
        "Chase",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Lock of Hair",
        "Vanity Mirror"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "K42P01",
        "Bamboozle"
      ]
    },
    {
      "id": "hens_shape_124",
      "name": "Funny Shape",
      "killerIds": [
        "shape"
      ],
      "tags": [
        "Hens",
        "Fun",
        "Chase"
      ],
      "addons": [
        "J. Myers Memorial",
        "Memorial Flower"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Bamboozle",
        "FireUp",
        "K29P01",
        "K36P03"
      ]
    },
    {
      "id": "hens_shape_125",
      "name": "Best Beginner Shape",
      "killerIds": [
        "shape"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "Chase",
        "GenRegression",
        "Haste",
        "Obsession",
        "Info"
      ],
      "addons": [
        "Memorial Flower",
        "Dead Rabbit"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Bamboozle",
        "pop_goes_the_weasel",
        "Play_With_Your_Food",
        "Tinkerer"
      ]
    },
    {
      "id": "hens_shape_126",
      "name": "Unique Shape — Speed Vault Wallhack Myers",
      "killerIds": [
        "shape"
      ],
      "tags": [
        "Hens",
        "Stealth",
        "Chase",
        "Hex",
        "Info"
      ],
      "addons": [
        "Dead Rabbit",
        "Vanity Mirror"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Bamboozle",
        "K29P01",
        "MonitorAndAbuse",
        "K30P02"
      ]
    },
    {
      "id": "hens_singularity_127",
      "name": "Best Singularity Without Limitations",
      "killerIds": [
        "singularity"
      ],
      "tags": [
        "Hens",
        "Chase",
        "GenRegression",
        "Haste"
      ],
      "addons": [
        "Denied Requisition Form",
        "Diagnostic Tool (Repair)"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K33P02",
        "K26P02",
        "K24P03",
        "pop_goes_the_weasel"
      ]
    },
    {
      "id": "hens_singularity_128",
      "name": "Funny Singularity",
      "killerIds": [
        "singularity"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AntiHeal",
        "Chase",
        "GenRegression",
        "GenBlocking",
        "Haste"
      ],
      "addons": [
        "Kid's Ball Glove",
        "Soma Family Photo"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K33P02",
        "Sloppy_Butcher",
        "K26P02"
      ]
    },
    {
      "id": "hens_singularity_129",
      "name": "Best Beginner Singularity",
      "killerIds": [
        "singularity"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AuraReading",
        "Stealth",
        "AntiHeal",
        "Haste",
        "Info"
      ],
      "addons": [
        "Diagnostic Tool (Repair)",
        "Nutritional Slurry"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K32P03",
        "K32P01",
        "NurseCalling",
        "K25P03"
      ]
    },
    {
      "id": "hens_singularity_130",
      "name": "Unique Singularity — Speed Singularity",
      "killerIds": [
        "singularity"
      ],
      "tags": [
        "Hens",
        "Chase",
        "Haste"
      ],
      "addons": [
        "Iridescent Crystal Shard",
        "Diagnostic Tool (Repair)"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Enduring",
        "K30P03",
        "K22P03",
        "K34P03"
      ]
    },
    {
      "id": "hens_skullmerchant_131",
      "name": "Best Skull Merchant Without Limitations",
      "killerIds": [
        "skullmerchant"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Vital Targeting Processor",
        "Ultrasonic Speaker"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "K42P01",
        "killer:dead-man-s-switch"
      ]
    },
    {
      "id": "hens_skullmerchant_132",
      "name": "Funny Skull Merchant",
      "killerIds": [
        "skullmerchant"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Chase",
        "GenRegression",
        "Hex",
        "Info"
      ],
      "addons": [
        "Adaptive Lighting",
        "Ultrasonic Speaker"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K28P01",
        "Hex_Ruin",
        "HexUndying",
        "killer:barbecue-chilli"
      ]
    },
    {
      "id": "hens_skullmerchant_133",
      "name": "Best Beginner Skull Merchant",
      "killerIds": [
        "skullmerchant"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AuraReading",
        "AntiHeal",
        "Chase",
        "Info"
      ],
      "addons": [
        "Adaptive Lighting",
        "Ultrasonic Speaker"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K31P03",
        "NurseCalling",
        "Brutal_Strength",
        "K25P03"
      ]
    },
    {
      "id": "hens_skullmerchant_134",
      "name": "Unique Skull Merchant — Wall Beam Skull Merchant",
      "killerIds": [
        "skullmerchant"
      ],
      "tags": [
        "Hens",
        "Stealth",
        "Chase",
        "Slugging",
        "Haste",
        "Obsession",
        "Info"
      ],
      "addons": [
        "Low-Power Mode",
        "Iridescent Unpublished Manuscript"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K28P01",
        "K33P02",
        "DarkDevotion",
        "InfectiousFright"
      ]
    },
    {
      "id": "hens_spirit_135",
      "name": "Best Spirit Without Limitations",
      "killerIds": [
        "spirit"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Mother-Daughter Ring",
        "Rusty Flute"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K26P02",
        "CorruptIntervention",
        "K42P01",
        "K32P01"
      ]
    },
    {
      "id": "hens_spirit_136",
      "name": "Funny Spirit",
      "killerIds": [
        "spirit"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "AntiHeal",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Muddy Sports Day Cap",
        "Rusty Flute"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:barbecue-chilli",
        "K38P02",
        "K26P02",
        "K25P03"
      ]
    },
    {
      "id": "hens_spirit_137",
      "name": "Best Beginner Spirit",
      "killerIds": [
        "spirit"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "Exposed",
        "GenRegression",
        "Hex",
        "Haste"
      ],
      "addons": [
        "Rusty Flute",
        "Muddy Sports Day Cap"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Hex_Ruin",
        "Hex_HauntedGround",
        "Hex_Devour_Hope",
        "Hex_Thrill_Of_The_Hunt"
      ]
    },
    {
      "id": "hens_spirit_138",
      "name": "Unique Spirit — One Shot Spirit",
      "killerIds": [
        "spirit"
      ],
      "tags": [
        "Hens",
        "Chase"
      ],
      "addons": [
        "Kintsugi Teacup",
        "Muddy Sports Day Cap"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K30P03",
        "FireUp",
        "Brutal_Strength",
        "Enduring"
      ]
    },
    {
      "id": "hens_trapper_139",
      "name": "Best Trapper Without Limitations",
      "killerIds": [
        "trapper"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Bloody Coil",
        "Iridescent Stone"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "Agitation",
        "K26P02",
        "K42P01"
      ]
    },
    {
      "id": "hens_trapper_140",
      "name": "Funny Trapper",
      "killerIds": [
        "trapper"
      ],
      "tags": [
        "Hens",
        "Fun",
        "Chase",
        "Obsession"
      ],
      "addons": [
        "Coffee Grounds",
        "Fastening Tools"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Save_The_Best_For_Last",
        "Agitation",
        "FireUp",
        "MadGrit"
      ]
    },
    {
      "id": "hens_trapper_141",
      "name": "Best Beginner Trapper",
      "killerIds": [
        "trapper"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "Chase",
        "GenRegression"
      ],
      "addons": [
        "Makeshift Wrap",
        "Bear Oil"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Agitation",
        "Brutal_Strength",
        "Bamboozle",
        "pop_goes_the_weasel"
      ]
    },
    {
      "id": "hens_trapper_142",
      "name": "Unique Trapper — Small Room Trapper",
      "killerIds": [
        "trapper"
      ],
      "tags": [
        "Hens",
        "Stealth",
        "Exposed"
      ],
      "addons": [
        "Trapper Bag",
        "Fastening Tools"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Insidious",
        "killer:dragon-s-grip",
        "Agitation",
        "MadGrit"
      ]
    },
    {
      "id": "hens_trickster_143",
      "name": "Best Trickster Without Limitations",
      "killerIds": [
        "trickster"
      ],
      "tags": [
        "Hens",
        "Chase",
        "GenRegression",
        "Hex"
      ],
      "addons": [
        "Cut Thru U Single",
        "Ripper Brace"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K26P03",
        "Hex_Ruin",
        "Hex_Thrill_Of_The_Hunt",
        "K23P02"
      ]
    },
    {
      "id": "hens_trickster_144",
      "name": "Funny Trickster",
      "killerIds": [
        "trickster"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Chase",
        "GenRegression",
        "GenBlocking",
        "Hex",
        "Info"
      ],
      "addons": [
        "Memento Blades",
        "Waiting For You Watch"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:barbecue-chilli",
        "killer:hex-blood-favour",
        "CorruptIntervention",
        "K26P02"
      ]
    },
    {
      "id": "hens_trickster_145",
      "name": "Best Beginner Trickster",
      "killerIds": [
        "trickster"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "Stealth",
        "AntiHeal",
        "Chase",
        "GenBlocking",
        "Hex"
      ],
      "addons": [
        "Tequila Moonrock",
        "Caged Heart Shoes"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K23P02",
        "K25P01",
        "K25P03",
        "K25P02"
      ]
    },
    {
      "id": "hens_trickster_146",
      "name": "Unique Trickster — Main Event Trickster",
      "killerIds": [
        "trickster"
      ],
      "tags": [
        "Hens",
        "Stealth",
        "Chase",
        "Slugging",
        "Haste",
        "Info"
      ],
      "addons": [
        "Memento Blades",
        "Waiting For You Watch"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K32P02",
        "K34P03",
        "Discordance",
        "K32P03"
      ]
    },
    {
      "id": "hens_twins_147",
      "name": "Best Twins Without Limitations",
      "killerIds": [
        "twins"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "Hex"
      ],
      "addons": [
        "Forest Stew",
        "Madeleine's Scarf"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K26P03",
        "Hex_Ruin",
        "K42P03",
        "Hex_Thrill_Of_The_Hunt"
      ]
    },
    {
      "id": "hens_twins_148",
      "name": "Funny Twins",
      "killerIds": [
        "twins"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Slugging",
        "GenRegression",
        "GenBlocking",
        "Info"
      ],
      "addons": [
        "Madeleine's Scarf",
        "Forest Stew"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Deerstalker",
        "K26P02",
        "CorruptIntervention",
        "K32P02"
      ]
    },
    {
      "id": "hens_twins_149",
      "name": "Best Beginner Twins",
      "killerIds": [
        "twins"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Chase",
        "GenRegression",
        "Hex"
      ],
      "addons": [
        "Tiny Fingernail",
        "Toy Sword"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Hex_Thrill_Of_The_Hunt",
        "Hex_Ruin",
        "K22P03",
        "K25P03"
      ]
    },
    {
      "id": "hens_twins_150",
      "name": "Unique Twins — Insidious Twins",
      "killerIds": [
        "twins"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "Stealth",
        "Exposed",
        "Slugging",
        "Info"
      ],
      "addons": [
        "Tiny Fingernail",
        "Bloody Black Hood"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Deerstalker",
        "Insidious",
        "K32P02",
        "killer:dragon-s-grip"
      ]
    },
    {
      "id": "hens_unknown_151",
      "name": "Best Unknown Without Limitations",
      "killerIds": [
        "unknown"
      ],
      "tags": [
        "Hens",
        "GenRegression",
        "GenBlocking"
      ],
      "addons": [
        "Captured by the Dark",
        "Iridescent OSS Report"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "CorruptIntervention",
        "K26P02",
        "killer:dead-man-s-switch",
        "K24P03"
      ]
    },
    {
      "id": "hens_unknown_152",
      "name": "Funny Unknown",
      "killerIds": [
        "unknown"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Slashed Backpack",
        "Notebook of Theories"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K26P02",
        "killer:barbecue-chilli",
        "K24P03",
        "K30P01"
      ]
    },
    {
      "id": "hens_unknown_153",
      "name": "Best Beginner Unknown",
      "killerIds": [
        "unknown"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AuraReading",
        "Stealth",
        "AntiHeal",
        "Chase",
        "Info"
      ],
      "addons": [
        "Blurry Photo",
        "Notebook of Theories"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K35P02",
        "Brutal_Strength",
        "NurseCalling",
        "K25P03"
      ]
    },
    {
      "id": "hens_unknown_154",
      "name": "Unique Unknown — Fake Illusion Unknown",
      "killerIds": [
        "unknown"
      ],
      "tags": [
        "Hens",
        "AuraReading",
        "Stealth",
        "Exposed",
        "Info"
      ],
      "addons": [
        "Last Known Recording",
        "Notebook of Theories"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:dragon-s-grip",
        "Insidious",
        "Discordance",
        "K27P01"
      ]
    },
    {
      "id": "hens_wraith_155",
      "name": "Best Wraith Without Limitations",
      "killerIds": [
        "wraith"
      ],
      "tags": [
        "Hens",
        "AntiHeal",
        "Chase",
        "GenRegression"
      ],
      "addons": [
        "\"Shadow Dance\" - Blood",
        "\"Swift Hunt\" - Blood"
      ],
      "addonImages": [
        "https://otz-addon-tierlist.pages.dev/public/addons/wraith/shadowdanceblood.png",
        "https://otz-addon-tierlist.pages.dev/public/addons/wraith/swifthuntblood.png"
      ],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Sloppy_Butcher",
        "K26P02",
        "K24P03",
        "Bamboozle"
      ]
    },
    {
      "id": "hens_wraith_156",
      "name": "Funny Wraith",
      "killerIds": [
        "wraith"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AntiHeal",
        "Chase",
        "GenRegression"
      ],
      "addons": [
        "\"Swift Hunt\" - Blood",
        "\"Shadow Dance\" - Blood"
      ],
      "addonImages": [
        "https://otz-addon-tierlist.pages.dev/public/addons/wraith/swifthuntblood.png",
        "https://otz-addon-tierlist.pages.dev/public/addons/wraith/shadowdanceblood.png"
      ],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Bamboozle",
        "Sloppy_Butcher",
        "K24P03",
        "K26P02"
      ]
    },
    {
      "id": "hens_wraith_157",
      "name": "Best Beginner Wraith",
      "killerIds": [
        "wraith"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AuraReading",
        "AntiHeal",
        "Chase",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Bone Clapper",
        "\"Swift Hunt\" - Mud"
      ],
      "addonImages": [
        "https://otz-addon-tierlist.pages.dev/public/addons/wraith/swifthuntmud.png"
      ],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "pop_goes_the_weasel",
        "Bamboozle",
        "NurseCalling",
        "K25P03"
      ]
    },
    {
      "id": "hens_wraith_158",
      "name": "Unique Wraith — Dissolution Wraith",
      "killerIds": [
        "wraith"
      ],
      "tags": [
        "Hens",
        "Chase",
        "Hex",
        "Haste"
      ],
      "addons": [
        "\"The Serpent\" - Soot",
        "\"The Beast\" - Soot"
      ],
      "addonImages": [
        "https://otz-addon-tierlist.pages.dev/public/addons/wraith/theserpentsoot.png",
        "https://otz-addon-tierlist.pages.dev/public/addons/wraith/thebeastsoot.png"
      ],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K28P01",
        "K33P02",
        "K23P02",
        "K22P03"
      ]
    },
    {
      "id": "hens_xenomorph_159",
      "name": "Best Xenomorph Without Limitations",
      "killerIds": [
        "xenomorph"
      ],
      "tags": [
        "Hens",
        "Chase",
        "GenRegression",
        "Hex"
      ],
      "addons": [
        "Self-Destruct Bolt",
        "Harpoon Gun"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "K26P03",
        "Hex_Ruin",
        "Hex_Thrill_Of_The_Hunt",
        "killer:hex-blood-favour"
      ]
    },
    {
      "id": "hens_xenomorph_160",
      "name": "Funny Xenomorph",
      "killerIds": [
        "xenomorph"
      ],
      "tags": [
        "Hens",
        "Fun",
        "AuraReading",
        "Chase",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Self-Destruct Bolt",
        "Lambert's Star Map"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": true,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "killer:barbecue-chilli",
        "K26P02",
        "K24P03",
        "Bamboozle"
      ]
    },
    {
      "id": "hens_xenomorph_161",
      "name": "Best Beginner Xenomorph",
      "killerIds": [
        "xenomorph"
      ],
      "tags": [
        "Hens",
        "BeginnerFriendly",
        "AntiHeal",
        "Chase",
        "GenRegression",
        "Info"
      ],
      "addons": [
        "Cereal Rations",
        "Lambert's Star Map"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Bamboozle",
        "Spies_From_The_Shadows",
        "pop_goes_the_weasel",
        "K25P03"
      ]
    },
    {
      "id": "hens_xenomorph_162",
      "name": "Unique Xenomorph — One Shot Xenomorph",
      "killerIds": [
        "xenomorph"
      ],
      "tags": [
        "Hens",
        "Chase"
      ],
      "addons": [
        "Acidic Blood",
        "Self-Destruct Bolt"
      ],
      "addonImages": [],
      "description": "",
      "patch": "10.1.2",
      "version": "",
      "favorite": false,
      "currentlyUsing": false,
      "changes": "",
      "perkIds": [
        "Bamboozle",
        "Enduring",
        "K29P01",
        "SpiritFury"
      ]
    }
  ],
  "survivorBuilds": [],
  "loadouts": [],
  "survivorInfo": {
    "count": "55",
    "perkCount": "176",
    "note": "",
    "patch": ""
  }
};
if(typeof window!=="undefined")window.INITIAL_DATA=INITIAL_DATA;
