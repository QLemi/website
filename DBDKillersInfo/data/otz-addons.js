// OTZ_ADDONS — key must equal killer.id (paste new entries from Settings → Fetch)
// Full refresh: node tools/fetch-otz.mjs

var OTZ_ADDONS = {
  "trapper": {
    "displayName": "Trapper",
    "addons": [
      {
        "name": "Bloody Coil",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/bloodycoil.png",
        "tierClass": "strongest",
        "comment": "Passively injures any healthy Survivor that disarms a trap. Note that injured Survivors that are partially healed can still disarm them and then finish their heal afterwards. Obviously, this add-on isn't ideal if you plan to hide all of your traps very carefully but it's quite useful if you play more aggressively and place traps in high-traffic areas that would normally be useless when spotted and disarmed. Critically, Survivors have no way of knowing if this add-on is in play until at least one healthy person tries disarming a trap. At its worst, it will force Survivors to be very careful. At its best, it can keep a team injured or even prevent them from being able to rescue someone trapped in basement altogether. Injuring people with this add-on also has many synergies with perks such as &#34;Hysteria&#34;, &#34;Blood Favor&#34;, etc."
      },
      {
        "name": "Iridescent Stone",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/iridescentstone.png",
        "tierClass": "strongest",
        "comment": "Disarmed traps on the ground will reactivate based on an internal timer. Not very effective at the start of the match or when there's several disarmed traps, but can be quite powerful when there's only a few of them. For this reason, it pairs particularly well with the purple Trapper Sack, since there will be less traps to cycle through. It also pairs well with the iridescent Bloody Coil to create lose-lose situations where disarming traps can backfire for Survivors. It can also be used on exit gates as part of endgame builds; if Survivors disarm the trap and begin to open the gate they run the risk of being caught when it re-opens later. When not using the Trapper Sack, you might also have instances where Survivors run into the randomly spawned traps since they don't expect them to be there."
      },
      {
        "name": "Trapper Sack",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/trappersack.png",
        "tierClass": "good",
        "comment": "Makes you start with all of your traps on your inventory at the cost of not being able to pick them up and relocate them anymore. Despite the downside making you a bit less flexible in some scenarios, this add-on is still incredibly powerful as it removes a lot of randomness and mitigates many of the Trapper's weaknesses. Carrying all of your traps at once enables a lot of different playstyles; you can set up aggressively at the start, set up lots of traps in chase in key areas or even completely lock down all entrances after a basement hook. Since there's no random trap spawns around the map, Survivors might also take longer to realize they're playing against a Trapper. Keep in mind that even though you cannot pick up traps, you can still rearm them on the ground. Overall this is a great add-on but very experienced Trappers might prefer to juggle traps throughout the match without it so that they can use two add-ons for other, more impactful effects."
      },
      {
        "name": "Honing Stone",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/honingstone.png",
        "tierClass": "good",
        "comment": "Removes all luck involved from escaping a trap, making Survivors completely unable to free themselves without help unless they are ready to put themselves in the dying state. Notably, Survivors that down themselves will trigger certain Killer perks such as &#34;Infectious Fright&#34; or &#34;Eruption&#34;. More importantly, this add-on gives you the certainty that either a Survivor will go down or that at least you'll be bothering multiple Survivors if someone is going for the rescue. This add-on is particularly mean against solo players that might not go for the rescue since they have no idea that this add-on is in play. In some situations, this effect can literally win you an entire game by paralyzing a Survivor and allowing you to chase the only other standing person. However, even with this add-on, you should still follow the general guideline of staying close to your traps. Despite its obvious strength, this add-on can still be 100% useless if Survivors only step in traps next to you or don't step in any trap in the first place."
      },
      {
        "name": "Fastening Tools",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/fasteningtools.png",
        "tierClass": "good",
        "comment": "Noticeably speeds up the setting and resetting of bear traps. On top of that, it also slows down the escape and rescue times which can sometimes mean the difference between a successful down or a narrow escape. This add-on provides nice value and pairs well with almost anything else."
      },
      {
        "name": "Trapper Bag",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/trapperbag.png",
        "tierClass": "good",
        "comment": "Increases your trap carrying capacity, allowing you to be a bit more flexible in your approach or set up more aggressively around a certain area. It's also quite helpful if you keep placing traps during chase, since Survivors are more likely to run out of options before you run out of traps. Keep in mind that normally this add-on doesn't change the amount of traps on the map (10). However, when used together with the purple Trapper Sack it will actually spawn one extra (11 in total)."
      },
      {
        "name": "Makeshift Wrap",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/makeshiftwrap.png",
        "tierClass": "good",
        "comment": "Enables the ability to walk through your own traps without getting caught in them. Any traps stepped on are automatically disarmed. This effect might seem like something that only a beginner would benefit from, but it actually enables a few unique and powerful strategies. First, it allows you to walk through your own traps on your way to hook someone in an already trapped shack basement or similar structure. Second, it can catch Survivors by surprise if they are disarming a trap unaware of the presence of this add-on. And finally, it can also be used to put a trap on the edge of a loop to help you in chase; even if Survivors see the trap, they'll have to walk around it to avoid it while you can go straight through it and thus catch up to them faster around the loop."
      },
      {
        "name": "Secondary Coil",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/secondarycoil.png",
        "tierClass": "good",
        "comment": "Significantly delays the already long animation that Survivors must perform to disarm a trap. In some critical situations, this extra time can allow you to prevent multiple Survivors from escaping a trapped basement shack since you can hit one and still interrupt the other one before they can finish the disarm. It also helps a bit to slow down Survivors that are constantly chasing after you trying to disarm every trap you set up. This add-on is great for brute-force strategies but not that useful when you're trying to keep most of your traps hidden from Survivors."
      },
      {
        "name": "Coffee Grounds",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/coffeegrounds.png",
        "tierClass": "decent",
        "comment": "Provides a small speed boost when placing or resetting a trap. This effect stacks with the natural speed boost that the Trapper gets normally. This effect is very small when it comes to overall mobility, but it can make a difference when catching up to a Survivor after placing a trap during chase. A decent effect, but don't let it affect your playstyle in a negative way; sometimes it's best to fake out a trap placement instead of actually placing it."
      },
      {
        "name": "Oily Coil",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/oilycoil.png",
        "tierClass": "decent",
        "comment": "Allows you to briefly see the aura of whatever Survivor interacted with a disarmed trap. If you pay attention during the match, you can use this effect to quickly locate specific Survivors that you're hunting down. Doing this can sometimes be extremely helpful in the late game when a particularly vulnerable Survivor is trying to stay hidden. Keep in mind, however, that aura reading can be countered by several Survivor perks. In other instances, you might also find that some Survivors are constantly around you and that this effect is simply redundant. This add-on pairs well with the iridescent Bloody Coil, since it might help you find an injured Survivor after they disarm a trap."
      },
      {
        "name": "4-Coil Spring Kit",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/4coilspringkit.png",
        "tierClass": "decent",
        "comment": "Not as powerful as its blue counterpart, but still has a noticeable effect. It can be stacked together with it, but it's typically better to pair it with other aggressive add-ons such as the Iridescent Stone."
      },
      {
        "name": "Trapper Gloves",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/trappergloves.png",
        "tierClass": "decent",
        "comment": "Gives a small but noticeable boost to your trap setting and resetting speed. Overall quite decent for its rarity but obviously outclassed by its blue counterpart which also has an extra secondary effect."
      },
      {
        "name": "Tension Spring",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/tensionspring.png",
        "tierClass": "decent",
        "comment": "This add-on provides a powerful yet situational effect. Whenever a Survivor escapes or is rescued, the trap they stepped in will be immediately rearmed. Keep in mind that this does not trigger when you grab or hit a Survivor out of a trap yourself, only when they escape it. Even though it's quite rare, this add-on can create very chaotic situations where a Survivor steps on a trap, escapes and then gets unexpectedly caught again. This scenario occurs often if a Survivor is caught when trying to cleanse a hex totem or open a gate, since they'll stay on the same spot trying to finish the action. Most of the times you will try your best to stay close to your own traps, so this add-on simply doesn't come into play very often."
      },
      {
        "name": "Tar Bottle",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/tarbottle.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on significantly darkens the appearance of the traps, making them far less visible on dark surfaces and when hidden under dark grass. Unfortunately, this effect is very likely to backfire unless you know which map you will be playing in. In many maps, the ground is actually very bright and this add-on will actually make the traps even more visible than before. This inherent risk makes this add-on far less appealing compared to other options."
      },
      {
        "name": "Wax Brick",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/waxbrick.png",
        "tierClass": "almost-no-effect",
        "comment": "Slows down the the process of escaping or being rescued from a trap. The effect is nice, but without a bit of luck the effects of this add-on on its own won't always make a big difference. Ideally, you should keep your traps close to yourself so that they'll be effective even if Survivors manage to escape quickly."
      },
      {
        "name": "Rusted Jaws",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/rustedjaws.png",
        "tierClass": "almost-no-effect",
        "comment": "Can make healing take a bit longer after a Survivors steps on a trap. However, unlike other Killers, the Trapper often doesn't down Survivors directly with their power and you'll find that this add-on doesn't even come into play that often. The status effect also has a limited duration making it even less likely that it will make a difference."
      },
      {
        "name": "Lengthened Jaws",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/lengthenedjaws.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts the Deep Wound status effect to a Survivor. Not particularly useful, since you will typically either down or immediately chase that Survivor anyway. In some rare scenarios, it might allow you outplay certain Survivor perks or prevent them from immediately using a medkit. Other add-ons with more consistent effects are typically a better option."
      },
      {
        "name": "Serrated Jaws",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/serratedjaws.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts the Haemorrhage status effect on Survivors getting caught on a trap. The effect lasts until healed. Sounds nice in theory, but in practice you will almost never benefit from this add-on. It's extremely rare that someone will step in a trap and later be interrupted while healing. Other add-ons with more consistent effects are typically a better option."
      },
      {
        "name": "Bear Oil",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/bearoil.png",
        "tierClass": "almost-no-effect",
        "comment": "Silences the metallic sound that normally occurs when setting or resetting traps. Sounds useful, but even if Survivors aren't directly seeing you, they might still hear the leathery sounds that the Trapper typically makes when performing these animations. The silent trap placement might come in clutch in some very specific scenarios but it's simply too situational. It's typically preferable to go for add-ons with stronger or more consistent effects."
      },
      {
        "name": "Padded Jaws",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trapper/paddedjaws.png",
        "tierClass": "detrimental",
        "comment": "Makes your traps not injure healthy Survivors that get caught in them. This is overall a massive downside and is not worth bringing, even considering the extra bloodpoints it provides. Keep in mind that if you're using it along with the purple Honing Stone, Survivors will be healthy if rescued but still down themselves if they escape on their own. Since trapped Survivors can be hit twice with this add-on, you could also use it to quickly gain stacks of the perk &#34;Save the Best for Last&#34; but even then, it's probably not worth it."
      }
    ]
  },
  "wraith": {
    "displayName": "Wraith",
    "addons": [
      {
        "name": "&#34;Windstorm&#34; - Blood",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/windstormblood.png",
        "tierClass": "strongest",
        "comment": "Increases your movement speed when cloaked. The increased mobility helps you find targets quicker, cover big distances faster and makes it even more viable to cloak after a hit for an easier time catching up. It also makes a tremendous difference when it comes to moving ahead of Survivors in chase to bodyblock them and prevent them from reaching safety."
      },
      {
        "name": "&#34;Windstorm&#34; - White",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/windstormwhite.png",
        "tierClass": "strongest",
        "comment": "Increases your movement speed when cloaked. The increased mobility helps you find targets quicker, cover big distances faster and makes it even more viable to cloak after a hit for an easier time catching up. It also makes a tremendous difference when it comes to moving ahead of Survivors in chase to bodyblock them and prevent them from reaching safety."
      },
      {
        "name": "&#34;Swift Hunt&#34; - Blood",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/swifthuntblood.png",
        "tierClass": "strongest",
        "comment": "Allows you to uncloak sooner. This is almost universally helpful and gives Survivors far less time to reach safety after being ambushed or suddenly bodyblocked during chase. Since the uncloaking animation is very slow, all add-ons of this type have a very noticeable effect."
      },
      {
        "name": "&#34;Swift Hunt&#34; - White",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/swifthuntwhite.png",
        "tierClass": "strongest",
        "comment": "Allows you to uncloak sooner. This is almost universally helpful and gives Survivors far less time to reach safety after being ambushed or suddenly bodyblocked during chase. Since the uncloaking animation is very slow, all add-ons of this type have a very noticeable effect."
      },
      {
        "name": "&#34;All Seeing&#34; - Spirit",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/allseeingspirit.png",
        "tierClass": "good",
        "comment": "Allows you to accurately gauge the progress of all generators when cloaked. This greatly reduces the need for information perks and is very effective on builds that rely on keeping the generators regressing. Not a bad effect at all, but experienced players might trust their own ability to control the map without this information and might prefer other add-ons that help in chase a bit more directly."
      },
      {
        "name": "&#34;All Seeing&#34; - Blood",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/allseeingblood.png",
        "tierClass": "good",
        "comment": "Allows you to see Survivor auras when nearby. This helps with tracking and finding stealthy Survivors but is also very useful even during chase, since seeing the precise location of your target enables a lot of plays that would otherwise be very risky. The effects of this add-on can unfortunately be mitigated by certain Survivor perks that can conceal their aura and prevent it from being revealed."
      },
      {
        "name": "&#34;Swift Hunt&#34; - Mud",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/swifthuntmud.png",
        "tierClass": "good",
        "comment": "Allows you to uncloak sooner. This is almost universally helpful and gives Survivors far less time to reach safety after being ambushed or suddenly bodyblocked during chase. Since the uncloaking animation is very slow, all add-ons of this type have a very noticeable effect."
      },
      {
        "name": "&#34;Windstorm&#34; - Mud",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/windstormmud.png",
        "tierClass": "good",
        "comment": "Increases your movement speed when cloaked. The increased mobility helps you find targets quicker, cover big distances faster and makes it even more viable to cloak after a hit for an easier time catching up. Not as powerful as its blue and purple counterparts, but still quite good."
      },
      {
        "name": "Coxcombed Clapper",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/coxcombedclapper.png",
        "tierClass": "good",
        "comment": "Completely silences the bell sound. Keep in mind that you're not 100% silent since the Wraith himself produces a characteristic sound. Similar effect as the Bone Clapper, but obviously doesn't pair well together with it."
      },
      {
        "name": "Bone Clapper",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/boneclapper.png",
        "tierClass": "good",
        "comment": "Makes your cloak and uncloak sounds non-directional. This can disorient Survivors and keep them paranoid even when you're not actively going after them. It also allows you to ambush Survivors from unusual angles that would otherwise be impossible with directional sound cues."
      },
      {
        "name": "&#34;Shadow Dance&#34; - Blood",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/shadowdanceblood.png",
        "tierClass": "good",
        "comment": "Increases your action speed when cloaked, greatly speeding up actions such as vaults or pallet breaks. If used correctly, the faster action speed can be quite oppressive by shredding through pallets or vaulting so fast that some structures become unsafe for Survivors. Also quite fun in gimmicky builds when stacked with other add-ons or perks that revolve around fast actions."
      },
      {
        "name": "&#34;Shadow Dance&#34; - White",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/shadowdancewhite.png",
        "tierClass": "good",
        "comment": "Increases your action speed when cloaked, greatly speeding up actions such as vaults or pallet breaks. If used correctly, the faster action speed can be quite oppressive by shredding through pallets or vaulting so fast that some structures become unsafe for Survivors. Also quite fun in gimmicky builds when stacked with other add-ons or perks that revolve around fast actions."
      },
      {
        "name": "&#34;Blind Warrior&#34; - White",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/blindwarriorwhite.png",
        "tierClass": "decent",
        "comment": "Apllies the Mangled and Haemorrhage status effects when hitting a Survivor shortly after an ambush. This is a powerful effect for a stealth Killer, but the limited duration and slightly inconsistent trigger condition makes it a bit less appealing. Can be easily replaced by the perk &#34;Sloppy Butcher&#34; if you don't want to use an add-on slot for this effect."
      },
      {
        "name": "&#34;The Ghost&#34; - Soot",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/theghostsoot.png",
        "tierClass": "decent",
        "comment": "Keeps you stealthy for a few extra seconds after uncloaking. Doesn't have much utility in chase, but it can be used to surprise players and even get grabs on unsuspecting Survivors. Pairs very well with the green Bone Clapper or the iridescent Coxcombed Clapper to keep things unpredictable."
      },
      {
        "name": "&#34;Blink&#34; - White",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/blinkwhite.png",
        "tierClass": "almost-no-effect",
        "comment": "Allows you to cloak sooner. Since cloaking is very fast and you don't really slow down during the animation, this effect is virtually useless outside of chase. Within chase, however, you might find it relatively useful if you cloak after a hit to catch up to the Survivor. Since the cloaking occurs slightly sooner, you begin to benefit from the increased speed a little bit sooner. Pairs well with the Windstorm family of add-ons."
      },
      {
        "name": "&#34;Blink&#34; - Mud",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/blinkmud.png",
        "tierClass": "almost-no-effect",
        "comment": "Allows you to cloak sooner. Since cloaking is very fast and you don't really slow down during the animation, this effect is virtually useless outside of chase. Within chase, however, you might find it relatively useful if you cloak after a hit to catch up to the Survivor. Since the cloaking occurs slightly sooner, you begin to benefit from the increased speed a little bit sooner. Pairs well with the Windstorm family of add-ons."
      },
      {
        "name": "&#34;Blind Warrior&#34; - Mud",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/blindwarriormud.png",
        "tierClass": "almost-no-effect",
        "comment": "Apllies the Blindness status effects when hitting a Survivor shortly after an ambush. Not a terrible effect, but also not consistent enough to be worth the add-on slot."
      },
      {
        "name": "&#34;The Serpent&#34; - Soot",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/theserpentsoot.png",
        "tierClass": "almost-no-effect",
        "comment": "Automatically uncloaks the Wraith after performing the break action on a pallet, wall or generator. This is slightly awkward and sometimes unnecesarry, but it can also be used as part of gimmick builds with the &#34;Shadow Dance&#34; add-ons. It has fun synergies with perks that can automatically &#34;break&#34; things for you such as &#34;Turn Back The Clock&#34;, since it can allow you to automatically uncloak at unexpected times. Generally speaking, the &#34;Swift Hunt&#34; family of add-ons is simply a better alternative if you want reliability."
      },
      {
        "name": "&#34;The Hound&#34; - Soot",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/thehoundsoot.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the visibility of pools of blood when cloaked, making it even easier to track them. Not bad, especially for beginners, but there's simply better add-ons that help in more direct ways."
      },
      {
        "name": "&#34;The Beast&#34; - Soot",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wraith/thebeastsoot.png",
        "tierClass": "detrimental",
        "comment": "This add-on makes your terror radius stay even when cloaked, effectively reducing your ability to move around the map in stealth. This is ostensibly a really bad effect that should be avoided, but it does create some fun interactions and synergies with other add-ons and perks. Notably, it can be paired with perks like &#34;Dissolution&#34; and the brown Serpent add-on to instantly break pallets and automatically uncloak when this happens. It can also be paired with perks such as &#34;Coulrophobia&#34; to keep apply their affects quickly around the map. You can also catch Survivors by surprise by pairing it with the brown Ghost add-on, since you'll temporarily gain a brief period of having no terror radius."
      }
    ]
  },
  "hillbilly": {
    "displayName": "Hillbilly",
    "addons": [
      {
        "name": "Iridescent Engravings",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/iridescentengravings.png",
        "tierClass": "strongest",
        "comment": "Slows the rate at which you charge you saw, but also increases its speed by a significant amount. This helps with map mobility (although it does make turning harder) and makes several loops even less safe to play around for Survivors. Particularly deadly in the hands of experienced players."
      },
      {
        "name": "Spiked Boots",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/spikedboots.png",
        "tierClass": "good",
        "comment": "Noticeably increases your turn rate during your chainsaw sprint. This doesn't affect the initial curve, but it starts helping out immediately after and can make it easier to land certain hits or navigate the map without having to bump into anything. This effect is almost universally useful and can make the extra speed from the Iridescent Engravings more manageable."
      },
      {
        "name": "Dad's Boots",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/dadsboots.png",
        "tierClass": "good",
        "comment": "Noticeably increases your turn rate during your chainsaw sprint. This doesn't affect the initial curve, but it starts helping out immediately after and can make it easier to land certain hits or navigate the map without having to bump into anything."
      },
      {
        "name": "LoPro Chains",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/loprochains.png",
        "tierClass": "good",
        "comment": "Allows you to chainsaw through pallets without interrupting your sprint. This increases your mobility, speeds up your recovery and even allows you to damage a Survivor for a single health state, although it will inflict Deep Wound on injured Survivors instead of downing them."
      },
      {
        "name": "The Thompsons' Mix",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/thethompsonsmix.png",
        "tierClass": "good",
        "comment": "Reduces your cooldown after using your chainsaw. Small effect itself, but quite useful still. Does not work during Overdrive mode."
      },
      {
        "name": "Greased Throttle",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/greasedthrottle.png",
        "tierClass": "good",
        "comment": "Reduces your cooldown after using your chainsaw. Small effect itself, but quite useful still. Does not work during Overdrive mode. Can be stacked with its blue counterpart."
      },
      {
        "name": "Tuned Carburettor",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/tunedcarburettor.png",
        "tierClass": "decent",
        "comment": "Permanently reduces your normal movement speed down to 110% (4.4m/s) but also greatly increases your charge speed, making it easier to use it at a moment's notice. Some players might find this tradeoff useful in specific situations, but be very careful when using this add-on since it might make some already difficult chases even harder. Can be quite deadly when paired with the Iridescent Engravings, but only in the hands of a seasoned player. Stay away from it unless you know what you're doing."
      },
      {
        "name": "Off-Brand Motor Oil",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/offbrandmotoroil.png",
        "tierClass": "decent",
        "comment": "Makes it easier to reach Overdrive mode by using your chainsaw, allowing you to go into it sooner. Not a bad effect at all."
      },
      {
        "name": "Clogged Intake",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/cloggedintake.png",
        "tierClass": "decent",
        "comment": "Increases the duration of the Overdrive mode by 15%, which is normally only 20 seconds. Not a huge effect but still welcome."
      },
      {
        "name": "Apex Muffler",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/apexmuffler.png",
        "tierClass": "decent",
        "comment": "Makes your chainsaw silent outside of your terror radius. This allows you to sneak up on Survivors more easily, especially if paired with other add-ons or perks that reduce or remove your terror radius entirely. Unfortunately, not every map lends itself to this type of strategy."
      },
      {
        "name": "Begrimed Chains",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/begrimedchains.png",
        "tierClass": "decent",
        "comment": "Applies the Mangled and Haemorrhage status effects with each chainsaw hit, discouraging Survivors from healing quickly after being unhooked. Not a bad effect, but keep in mind that it doesn't really help you to land the chainsaw hit in the first place."
      },
      {
        "name": "Filthy Slippers",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/filthyslippers.png",
        "tierClass": "decent",
        "comment": "Gives the Undetectable status effect after performing the chainsaw sprint for a bit. Some maps are too small to trigger this effect consistently, and even then the chainsaw itself is still quite noisy so you won't be catching too many Survivors by surprise. Pairs well with the Apex Muffler so that the chainsaw also becomes silent."
      },
      {
        "name": "High-Speed Idler Screw",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/highspeedidlerscrew.png",
        "tierClass": "decent",
        "comment": "One of several add-ons that reduce the loss of Overdrive meter over time. Not extremely impactful, but having at least one of these add-ons can mitigate the normal loss that occurs during periods such as the transporation of a downed Survivor to the nearest hook. In general, add-ons that delay the start of the dissipation are better than the ones that reduce the dissipation rate."
      },
      {
        "name": "Ragged Engine",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/raggedengine.png",
        "tierClass": "decent",
        "comment": "One of several add-ons that reduce the loss of Overdrive meter over time. Not extremely impactful, but having at least one of these add-ons can mitigate the normal loss that occurs during periods such as the transporation of a downed Survivor to the nearest hook. In general, add-ons that delay the start of the dissipation are better than the ones that reduce the dissipation rate."
      },
      {
        "name": "Discarded Air Filter",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/discardedairfilter.png",
        "tierClass": "decent",
        "comment": "One of several add-ons that reduce the loss of Overdrive meter over time. Not extremely impactful, but having at least one of these add-ons can mitigate the normal loss that occurs during periods such as the transporation of a downed Survivor to the nearest hook. In general, add-ons that delay the start of the dissipation are better than the ones that reduce the dissipation rate."
      },
      {
        "name": "Thermal Casing",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/thermalcasing.png",
        "tierClass": "decent",
        "comment": "One of several add-ons that reduce the loss of Overdrive meter over time. Not extremely impactful, but having at least one of these add-ons can mitigate the normal loss that occurs during periods such as the transporation of a downed Survivor to the nearest hook. In general, add-ons that delay the start of the dissipation are better than the ones that reduce the dissipation rate."
      },
      {
        "name": "Low Kickback Chains",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/lowkickbackchains.png",
        "tierClass": "almost-no-effect",
        "comment": "Reduces the stun animation when bumping into an object. Not a terrible effect, especially for beginners that are still learning."
      },
      {
        "name": "Steel Toe Boots",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/steeltoeboots.png",
        "tierClass": "almost-no-effect",
        "comment": "Reduces the stun animation when bumping into an object. Not a terrible effect, especially for beginners that are still learning."
      },
      {
        "name": "Counterweight",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/counterweight.png",
        "tierClass": "detrimental",
        "comment": "This add-on removes the &#34;curving&#34; functionality of your chainsaw that allows you to sharply change direction at the start of your chainsaw sprint. Curving is an important part of the Hillbilly's kit and thus removing it is obviously a terrible idea. There's almost no reason to ever use this unless you really want to avoid this mechanic."
      },
      {
        "name": "Cracked Primer Bulb",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hillbilly/crackedprimerbulb.png",
        "tierClass": "detrimental",
        "comment": "Removes your chainsaw's natural ability to instantly down Survivors, making it only damage one health state instead. Despite the small boost it provides to overdrive generation, this add-on's effect is obviously terrible and should only be used by players that want to challenge themselves."
      }
    ]
  },
  "nurse": {
    "displayName": "Nurse",
    "addons": [
      {
        "name": "Torn Bookmark",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/tornbookmark.png",
        "tierClass": "strongest",
        "comment": "Reduces your blink charge recovery speed, but provides 1 extra blink charge. The slower recovery can be very punishing when mistakes happen, but having 3 blinks makes it almost impossible for Survivors to last more than a few seconds in chase. The extra blink also allows you to perform 2-blink sequences with basically no downtime in between, which can be deadly and result in very quick downs. Overall, a very powerful effect with a manageable downside. Beginner players might want to avoid using this add-on if they don't want to rely on it too much."
      },
      {
        "name": "Fragile Wheeze",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/fragilewheeze.png",
        "tierClass": "strongest",
        "comment": "A very simple add-on that is almost always universally useful. Despite the 70 second timer, the Nurse's fast paced gameplay can absolutely make the Mangled effect worth applying, especially when you consider how dangerous it is to remain injured against her."
      },
      {
        "name": "&#34;Bad Man's&#34; Last Breath",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/badmanslastbreath.png",
        "tierClass": "good",
        "comment": "The occasional Undetectable status effects prevents your aura from being revealed to Survivors and allows you to catch them by surprise, especially in small maps. A simple add-on that can do a lot of damage and that doesn't require a lot of thinking from your part."
      },
      {
        "name": "Heavy Panting",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/heavypanting.png",
        "tierClass": "good",
        "comment": "A simple but powerful add-on that increases the Nurse's lunge without any downside. Makes it even harder for Survivors to outplay you."
      },
      {
        "name": "Jenner's Last Breath",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/jennerslastbreath.png",
        "tierClass": "good",
        "comment": "A unique add-on that allows you to quickly teleport back to your previous blink location. Not particularly useful for beginners, but advanced players can find several ways to make this ability worth it. Among other things, it allows you to quickly scout an area before returning to the hook or hit a Survivor that runs back into you. Also very useful if you end up teleporting into a wrong floor and need a quick return."
      },
      {
        "name": "Campbell's Last Breath",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/campbellslastbreath.png",
        "tierClass": "good",
        "comment": "A fairly complex add-on that allows you to sacrifice your second blink in favor of a shorter, almost instant blink. With a bit of practice, this add-on can help you to cover certain gaps much faster than usual and catch Survivors by surprise. If you don't need to use this effect, you can charge your blink to almost full capacity to avoid wasting it."
      },
      {
        "name": "Catatonic Boy's Treasure",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/catatonicboystreasure.png",
        "tierClass": "good",
        "comment": "Reduces some of the extra fatigue that happens when you perform multiple blinks. A small but universally useful effect that can make a difference over the course of the game."
      },
      {
        "name": "Ataxic Respiration",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/ataxicrespiration.png",
        "tierClass": "decent",
        "comment": "Slightly reduces the duration of all fatigues by 7%. The effect is small, but unlike other add-ons, it affects all types of fatigue regardless of circumstances."
      },
      {
        "name": "Wooden Horse",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/woodenhorse.png",
        "tierClass": "decent",
        "comment": "This add-on removes half of the fatigue penalty that occurs when you miss a blink attack, saving you half a second each time this happens. This is useful for anyone, but especially for beginner players that still struggle with being accurate."
      },
      {
        "name": "Bad Man Keepsake",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/badmankeepsake.png",
        "tierClass": "decent",
        "comment": "Provides a miniature version of the effect from &#34;A Nurse's Calling&#34;, allowing you to see healing Survivors for some time after being hit. Doesn't always come into play, but the effect itself is very useful when it does."
      },
      {
        "name": "Metal Spoon",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/metalspoon.png",
        "tierClass": "decent",
        "comment": "The increased grunt volume from this add-on is easy to apply and can often make tracking a bit easier. Very decent effect for an add-on of this rarity."
      },
      {
        "name": "Kavanagh's Last Breath",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/kavanaghslastbreath.png",
        "tierClass": "decent",
        "comment": "Applies 40 seconds of Blindness to Survivors when you entire fatigue near them. Not a particularly strong or reliable effect, but it's better than nothing and might make a small difference over the course of the match."
      },
      {
        "name": "Dark Cincture",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/darkcincture.png",
        "tierClass": "decent",
        "comment": "Increases your movement speed during the period that occurs between blinks. The effect is small, but it can sometimes make a difference since it can allow you to maneuver around an obstacle to gain better visibility before it's too late."
      },
      {
        "name": "Anxious Gasp",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/anxiousgasp.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on can sometimes reveal Survivors that you would have otherwise missed, but overall the screaming effect is quite gimmicky and not very impactful."
      },
      {
        "name": "Plaid Flannel",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/plaidflannel.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on displays a visual marker that roughly shows your landing spot. Some people that suffer from motion sickness while playing Nurse might find it useful as it gives you something to focus on visually. It can also be useful for beginners, especially if they take a bit of time to observe how their inputs affect the final teleporting spot. For non-beginners, this add-on offers no value whatsoever and can be really distracting."
      },
      {
        "name": "Matchbox",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/matchbox.png",
        "tierClass": "detrimental",
        "comment": "Increases your movement speed to be almost comparable to the standard Killer, but at the cost of reducing your maximum blink charges by 1. This completely changes the way Nurse is played. Some players might find this appealing for their particular taste, but for the average person this is a downgrade from the normal Nurse."
      },
      {
        "name": "Pocket Watch",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/pocketwatch.png",
        "tierClass": "detrimental",
        "comment": "Slightly increases the window of time between blinks, allowing you to have more time to make a decision or charge your next blink for longer. Unfortunately, this also means that if you want to do only one blink you'll be forced to wait even longer before you go into fatigue, wasting extra time. In most scenarios, this add-on will do more harm than good."
      },
      {
        "name": "Spasmodic Breath",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/spasmodicbreath.png",
        "tierClass": "detrimental",
        "comment": "Turns the Nurse into a Killer with regular speed for a brief time after a successful blink attack. This can sometimes catch Survivors by surprise or lead to very unexpected situations, which is certainly fun. However, giving up your teleporting ability is a massive downside and there's no good reason to do this if you're playing seriously."
      },
      {
        "name": "White Nit Comb",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/whitenitcomb.png",
        "tierClass": "detrimental",
        "comment": "Reduces the reach of your lunge after a blink, forcing you to be much more precise with them. This is a massive downside that should typically be avoided at all costs, but it can be a decent training tool if you want to challenge yourself."
      },
      {
        "name": "Dull Bracelet",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nurse/dullbracelet.png",
        "tierClass": "detrimental",
        "comment": "Reduces the maximum range of your blink teleports. This is a massive downside and doesn't even provide a fun challenge. Avoid at all costs unless you are a masochist."
      }
    ]
  },
  "myers": {
    "displayName": "Myers,Shape",
    "addons": [
      {
        "name": "Judith's Tombstone",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/judithstombstone.png",
        "tierClass": "strongest",
        "comment": "Resets the timer of the Evil Within mode after hooking a Survivor, making it easier to keep the pressure up if there are still Survivors nearby (although its duration can never be extended with other add-ons now). This effect can be particularly devastating if you also bring specific perks to make you stealthy or keep the momentum going after each hook (such as the combo of &#34;Friends til' the End&#34; + &#34;Furtive Chase&#34;). This add-on can also be paired with the purple Lock of Hair in case you want to immediately end your power and keep 50% of it as stalk progress. Keep in mind that this add-on has the downside of locking the duration of Evil Within to 40 seconds, making it not work with certain other add-ons."
      },
      {
        "name": "Hair Brush",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/hairbrush.png",
        "tierClass": "strongest",
        "comment": "When activating Evil Within mode, your next pallet break is much faster, an effect that can be further stacked with perks of similar nature. Sounds somewhat redundant when you remember that the Evil Within special attack already shred through pallets pretty quickly, but doing this slows you down and makes your strike go on cooldown. Being able to shred through a pallet very fast can speed up chases very significantly (especially if you trick a Survivor into positioning themselves badly right before you do it). Since it's an add-on, it does not suffer from the effects of diminishing returns so you can pair it with perks like Brutal Strength for even faster pallet breaks. Keep in mind that this one-time pallet breaking bonus does not remain after Evil Within ends, so you cannot save it for later."
      },
      {
        "name": "Mirror Shard",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/mirrorshard.png",
        "tierClass": "strongest",
        "comment": "Increases the duration of your slaughtering strike by 0.25 seconds, making it last a total of 1.75 seconds at full charge. Interestingly, it gives you this extra duration on your strike even if you don't fully charge it. It's a strong effect that will generally make you even deadlier in small loops where a Survivor has to make a play and can't afford to just walk away. However, it comes with a small downside of a slightly longer charge time that could mess with your muscle memory if you're still not used to it. Keep this in mind when using it. Needless to say, this add-on is not useful at all if you're doing some kind of gimmick where the slaughtering strike ability is not used (such as Scratched Mirror builds)."
      },
      {
        "name": "Tombstone Piece",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/tombstonepiece.png",
        "tierClass": "good",
        "comment": "Provides a decent 20 seconds of Undetectable status effect when activating the Evil Within mode, which can be used strategically in a variety of ways to catch Survivors by surprise (who might be expecting a huge terror radius instead). Keep in mind that the iridescent Judith's Tombstone does not re-trigger this add-on's effect when hooking someone. If you're running this, try using other add-ons that allow you to re-enter Evil Within mode often rather than extending it."
      },
      {
        "name": "Vanity Mirror",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/vanitymirror.png",
        "tierClass": "good",
        "comment": "Shows you the auras of all Survivors when Evil Within mode ends, allowing you to plan out your next chase and possibly ambush someone with the Stalker mode. This obviously doesn't help you in chase but the information can be invaluable. A really useful effect in general but particularly so if you're ending the mode manually with the purple Lock of Hair, since you can choose when to benefit from the aura read."
      },
      {
        "name": "Lock of Hair",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/lockofhair.png",
        "tierClass": "good",
        "comment": "Unlocks the ability to manually end the Evil Within mode and keep the remaining gauge as stalk progress which makes it easier to return to Evil Within mode again sooner. A useful effect that pairs well with a variety of other add-ons that revolve around entering or leaving Evil Within mode."
      },
      {
        "name": "Hair Bow",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/hairbow.png",
        "tierClass": "good",
        "comment": "Increases the duration of Evil Within mode by 20 seconds (bringing it to a total of 60 seconds) but also increases the stalk time required to reach it. Potentially outclassed by the iridescent Judith's Tombstone if you plan on hooking a Survivor that you've downed, but it's still a decent effect. You can try to mitigate the downside of this add-on by pairing with something like the blue Jewelry Box."
      },
      {
        "name": "Jewellery Box",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/jewellerybox.png",
        "tierClass": "good",
        "comment": "Significantly improves your overall stalking rate at the cost of reducing your stalk range from 32 to 16 meters, effectively halving it. This seems like a harsh penalty that removes some stalking opportunities in large open maps, but in practice you will still be able to stalk Survivors in most situations perfectly fine, even with just a 16 meter range stalk."
      },
      {
        "name": "Dead Rabbit",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/deadrabbit.png",
        "tierClass": "decent",
        "comment": "Decreases your terror radius while in Pursuer mode (making it 16m instead of 24m) and increases it during Evil Wihin mode (making it 50m instead of 40m). The extra stealth during Pursuer mode isn't terrible but it might not be very necessary if you're switching to the Stalker mode when attempting to ambush. However, it's still quite useful since the game locks you into Pursuer mode when your stalk meter is full. The bigger terror radius during Evil Within mode could be used to trigger the effects of some perks but it's otherwise not very valuable on its own."
      },
      {
        "name": "Judith's Journal",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/judithsjournal.png",
        "tierClass": "decent",
        "comment": "Significantly improves your stalking rate when stalking the Obsession. Not the most reliable by itself but it can pair well with perks that change or reveal the Obsession, especially with a build centered around it."
      },
      {
        "name": "Tacky Earrings",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/tackyearrings.png",
        "tierClass": "decent",
        "comment": "Increases your movement speed while actively stalking. A noticeable effect that makes the process feel quite smoother. Not very strong by any means but a decent choice considering its rarity. Just remember that stalking while moving gains less progress than stalking while standing still. This add-on is for those situations where standing still isn't an option."
      },
      {
        "name": "J. Myers Memorial",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/jmyersmemorial.png",
        "tierClass": "decent",
        "comment": "Massively speeds up the pick-up and hook actions during Evil Within mode. This saves a bit of time but doesn't even come close to the extra time that you'd get from the iridescent Judith's Tombstone or the blue Hair Bow. The real value from this add-on comes from the fact that it makes flashlight and pallet rescues much harder to pull off. The quicker hook animation might also occasionally catch Survivors by surprise."
      },
      {
        "name": "Boyfriend's Memo",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/boyfriendsmemo.png",
        "tierClass": "almost-no-effect",
        "comment": "Extends the maximum stalk range by 8 meters, making it 40 meters in total. Mostly unnecessary unless you're in a huge map with very long lines of sight. It can be used to mitigate the downside of the blue Jewelry Box."
      },
      {
        "name": "Memorial Flower",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/memorialflower.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases your movement speed to 4.4m/s while in Stalker mode, making you move at 110% of the normal Survivor speed instead of 105%. Ideally, you shouldn't be using the stalker mode unnecessarily to the point where this add-on is constantly in play, but it's obviously really good with the iridescent Scratched Mirror that permanently locks you into Stalker mode."
      },
      {
        "name": "Jewellery",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/jewellery.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the stalk rate by 10% on stationary, non-moving Survivors. This can help you activate Evil Within mode a bit faster if Survivors fail to notice you stalking them when working on a generator, for example. However, the extra 10% is not that noticeable and you're probably better off using something else."
      },
      {
        "name": "Glass Fragment",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/glassfragment.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the movement speed of the slaughtering strike by 5%, but at the cost of longer charge time. This effect should theoretically make your power harder to avoid in situations where a Survivor is already cornered and you have plenty of time to fully charge it. However, in practice, the slightly faster speed is rarely worth the add-on slot and the downside of 10% slower charge."
      },
      {
        "name": "Blond Hair",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/blondhair.png",
        "tierClass": "almost-no-effect",
        "comment": "Doubles the duration of scratchmarks and blood left on the environment by Survivors when you're in Stalker mode. It's a considerable effect but one that you generally don't need as much as you'd think. Keep in mind that seeing extremely old scratchmarks could make you start chasing a Survivor that is already extremely far away and lead to unproductive chases."
      },
      {
        "name": "Fragrant Tuft of Hair",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/fragranttuftofhair.png",
        "tierClass": "detrimental",
        "comment": "Removes Myers' new slaughtering strike and replaces it with a longer lunge Basic Attack that automatically applies the Exposed status effect to all Survivors, essentially reenabling his old power kit. This add-on gives you a more immediate instadown (although you still have to go through the mode transition animation) and can help you have better synergy with certain perks that would only trigger with basic attacks and that would normally not work with his special slaughtering strike. Losing the slaughtering strike ability makes your power worse in certain loops and also removes your ability to break pallets quickly with it. Use it only if you really know what you're doing or if you want to have a simplified version of his power for some reason."
      },
      {
        "name": "Scratched Mirror",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/scratchedmirror.png",
        "tierClass": "detrimental",
        "comment": "Gives the Stalker mode a very significant aura read on Survivors when stalking, but it permanently locks you into it. This effect can be absolutely terrifying in certain maps (mostly the indoor ones) but will often not be nearly as impactful in more open maps with good visibility for Survivors. You'll most likely want to pair this with the brown Memorial Flower add-on to benefit from the increased 4.4m/s movement speed. Against prepared teams, the downsides of this add-on might be too much but it can certainly be strong if you know what you're doing and fully lean into a stealthy hit and run playstyle. Just be sure to understand the risks of this add-on before you use it."
      },
      {
        "name": "Reflective Fragment",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/myers/reflectivefragment.png",
        "tierClass": "detrimental",
        "comment": "Extends the duration of your Evil Within mode each time you land a hit by 20 seconds (making it easier to keep it going for a long time) but at the cost of making your slaughtering strike not instadown Survivors. This downside is absolutely crippling and makes this add-on generally not worth running, especially when you consider that there are other add-ons to extend the Evil Within duration without compromising its lethality."
      }
    ]
  },
  "hag": {
    "displayName": "Hag",
    "addons": [
      {
        "name": "Rusty Shackles",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/rustyshackles.png",
        "tierClass": "strongest",
        "comment": "Triggered traps no longer spawn a fake mud clone and instead remain completely stealthy. This effect has several implications. First, it makes Survivors more likely to get hit or even grabbed out of a generator if they fail to notice that they triggered a trap. Secondly, the removal of the teleport animation indirectly makes you able to hit or move even sooner than normal. That being said, it also comes with a small downside. Since the mud phantasm no longer appears, the traps won't affect the Survivor's camera so it is impossible to use that to your advantage anymore. You also cannot rely on the aura of the fake phantasm to see which direction a Survivor is going after they trigger it. Despite these things, this add-on is very easy to use and can be quite devastating against an unprepared team."
      },
      {
        "name": "Mint Rag",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/mintrag.png",
        "tierClass": "strongest",
        "comment": "Enables the ability to manually teleport to any trap with a short cooldown. During this cooldown, your normal teleporting abilities remain the same. When it's not on cooldown, this add-on comes with a heavy downside, since it effectively removes your ability to spam the teleport button to quickly react to a trap that was just triggered. If you press the teleport button at the wrong time you can end up teleporting to the wrong trap across the entire map. That being said, this add-on holds immense utility if you specialize in its use. The map-wide teleport enables a lot of powerful builds and strategies and can even be somewhat useful in chase when you learn its quirks. Unlike traps triggered by Survivors, the manual teleport keeps your camera direction the same, so it requires a bit of adjusting. Definitely not suited for beginners or anyone still learning the basics of Hag."
      },
      {
        "name": "Willow Wreath",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/willowwreath.png",
        "tierClass": "good",
        "comment": "Shows a Survivor's aura when they trigger a trap, with a longer duration than its green counterpart. Seeing this aura is helpful in almost every possible scenario. It can help you keep track of a Survivor after a successful teleport hit, keep an eye on aggressive Survivors that try to disrupt your traps, give an early warning that someone has a perk to hide their aura, and much more."
      },
      {
        "name": "Swamp Orchid Necklet",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/swamporchidnecklet.png",
        "tierClass": "good",
        "comment": "Increases the trap setting speed.This saves quite a bit of time and also allows you to teleport to a trap sooner if it's triggered during your trap setting animation. This family of add-ons also helps with the common strategy of teleporting, attacking and immediately resetting an important trap. The effects can also be stacked together, but one is typically good enough."
      },
      {
        "name": "Cypress Necklet",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/cypressnecklet.png",
        "tierClass": "good",
        "comment": "Increases the trap setting speed.This saves quite a bit of time and also allows you to teleport to a trap sooner if it's triggered during your trap setting animation. This family of add-ons also helps with the common strategy of teleporting, attacking and immediately resetting an important trap. The effects can also be stacked together, but one is typically good enough."
      },
      {
        "name": "Dried Cicada",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/driedcicada.png",
        "tierClass": "good",
        "comment": "Allows you to teleport even further than normal to a triggered trap. The default range is already quite good, but with this family of add-ons you can make it even larger to help catch distant Survivors. Be warned, however, that spreading your traps thinly across the entire map is generally not a very solid idea. It's best to hold a certain area and only place other traps at key locations."
      },
      {
        "name": "Dragonfly Wings",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/dragonflywings.png",
        "tierClass": "good",
        "comment": "Allows you to teleport even further than normal to a triggered trap. The default range is already quite good, but with this family of add-ons you can make it even larger to help catch distant Survivors. Be warned, however, that spreading your traps thinly across the entire map is generally not a very solid idea. It's best to hold a certain area and only place other traps at key locations."
      },
      {
        "name": "Dead Fly Mud",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/deadflymud.png",
        "tierClass": "good",
        "comment": "Allows you to teleport even further than normal to a triggered trap. The default range is already quite good, but with this family of add-ons you can make it even larger to help catch distant Survivors. Be warned, however, that spreading your traps thinly across the entire map is generally not a very solid idea. It's best to hold a certain area and only place other traps at key locations."
      },
      {
        "name": "Pussy Willow Catkins",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/pussywillowcatkins.png",
        "tierClass": "good",
        "comment": "Shows a Survivor's aura for a brief moment. Not as nice as its blue counterpart, but still nice. Seeing this aura is helpful in almost every possible scenario. It can help you keep track of a Survivor after a successful teleport hit, keep an eye on aggressive Survivors that try to disrupt your traps, give an early warning that someone has a perk to hide their aura, and much more."
      },
      {
        "name": "Rope Necklet",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/ropenecklet.png",
        "tierClass": "decent",
        "comment": "Increases the trap setting speed.This saves quite a bit of time and also allows you to teleport to a trap sooner if it's triggered during your trap setting animation. This family of add-ons also helps with the common strategy of teleporting, attacking and immediately resetting an important trap. The effects can also be stacked together, but one is typically good enough."
      },
      {
        "name": "Cracked Turtle Egg",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/crackedturtleegg.png",
        "tierClass": "decent",
        "comment": "Extends the time that the fake Hag phantasm stays up when a trap is triggered. This can help you make sure that you're still able to teleport to it even if you're too far or too busy doing something else. It's also helpful in chase, since you can chase a Survivor back into a trap that they triggered several seconds ago and catch them by surprise. The effect can be stacked with other similar add-ons as well. The longer phantasm duration can also help you track a Survivor since the phantasm will always face the person that triggered it. Overall, these add-ons are decent but are ultimately outclassed by other add-ons that have more consistent effects."
      },
      {
        "name": "Half Eggshell",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/halfeggshell.png",
        "tierClass": "decent",
        "comment": "Extends the time that the fake Hag phantasm stays up when a trap is triggered. This can help you make sure that you're still able to teleport to it even if you're too far or too busy doing something else. It's also helpful in chase, since you can chase a Survivor back into a trap that they triggered several seconds ago and catch them by surprise. The effect can be stacked with other similar add-ons as well. The longer phantasm duration can also help you track a Survivor since the phantasm will always face the person that triggered it. Overall, these add-ons are decent but are ultimately outclassed by other add-ons that have more consistent effects."
      },
      {
        "name": "Powdered Eggshell",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/powderedeggshell.png",
        "tierClass": "decent",
        "comment": "Extends the time that the fake Hag phantasm stays up when a trap is triggered. This can help you make sure that you're still able to teleport to it even if you're too far or too busy doing something else. It's also helpful in chase, since you can chase a Survivor back into a trap that they triggered several seconds ago and catch them by surprise. The effect can be stacked with other similar add-ons as well. The longer phantasm duration can also help you track a Survivor since the phantasm will always face the person that triggered it. Overall, these add-ons are decent but are ultimately outclassed by other add-ons that have more consistent effects."
      },
      {
        "name": "Grandma's Heart",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/grandmasheart.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on creates a fake terror radius when someone triggers a trap and simultaneously sets your own terror radius to zero for the duration. The fake terror radius doesn't have any of the properties of the real one and does not apply the effects of any terror radius related perks. Notably, even though your terror radius becomes zero, you also do not gain the Undetectable status effect yourself. Overall, this add-on has basically no effect on the Survivor that triggers a trap but it can occasionally help you catch someone else by surprise."
      },
      {
        "name": "Bog Water",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/bogwater.png",
        "tierClass": "almost-no-effect",
        "comment": "With this family of add-ons, your traps have a shorter trigger radius and cover a smaller range of the map. This makes them easier to avoid but also more accurate if someone triggers them, since they will be closer to you if you teleport right away. Unlike its blue counterpart, the green and brown versions have a smaller effect that offers a better balance of risk and reward. That being said, these add-ons should probably never be used together or your traps will simply be too small."
      },
      {
        "name": "Bloodied Water",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/bloodiedwater.png",
        "tierClass": "almost-no-effect",
        "comment": "With this family of add-ons, your traps have a shorter trigger radius and cover a smaller range of the map. This makes them easier to avoid but also more accurate if someone triggers them, since they will be closer to you if you teleport right away. Unlike its blue counterpart, the green and brown versions have a smaller effect that offers a better balance of risk and reward. That being said, these add-ons should probably never be used together or your traps will simply be too small."
      },
      {
        "name": "Bloodied Mud",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/bloodiedmud.png",
        "tierClass": "almost-no-effect",
        "comment": "With this family of add-ons, your traps have a shorter trigger radius and cover a smaller range of the map. This makes them easier to avoid but also more accurate if someone triggers them, since they will be closer to you if you teleport right away. The 30% smaller range from this add-on is definitely too much, though, and is often not worth it."
      },
      {
        "name": "Disfigured Ear",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/disfiguredear.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on muffles certain sounds for 6 seconds when a Survivor triggers a trap. During this time, Survivors will hear certain sounds almost as if they are under water. However, some sounds are more affected than others. Survivors can still track your growling and other sounds perfectly. Overall, this add-on is almost entirely useless."
      },
      {
        "name": "Waterlogged Shoe",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/waterloggedshoe.png",
        "tierClass": "detrimental",
        "comment": "This add-on completely removes your ability to teleport to triggered traps. In return, it increases your base movement speed to 117.5% (which is a little bit faster than the average Killer) and makes your traps hinder anyone that triggers them. Overall, this is a really bad trade-off. However, if you want to play Hag in a much simpler way, this add-on might be for you."
      },
      {
        "name": "Scarred Hand",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/hag/scarredhand.png",
        "tierClass": "detrimental",
        "comment": "This add-on completely removes your ability to teleport to your triggered traps. In return, it makes your traps have a collision which means they can be used to block certain tight spots. Overall, this is a really bad trade-off that takes away the main strength of your power. It can be used together with the Waterlogged Shoe to make it a little bit better."
      }
    ]
  },
  "doctor": {
    "displayName": "Doctor",
    "addons": [
      {
        "name": "Iridescent Queen",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/iridescentqueen.png",
        "tierClass": "strongest",
        "comment": "Your shocks and blast now give a &#34;Static Charge&#34; to any Survivor unless they are right next to someone else. This charge lingers on them and will be discharged when they come close to another Survivor (even hooked ones!) resulting in a shock to both of them. This add-on heavily punishes altruism and can create some lose-lose situations where Survivors keep increasing each other's madness levels, resulting in additional time wasted. Coordinated teams with self-reliant Survivors will definitely be less hindered by this effect, however."
      },
      {
        "name": "&#34;Discipline&#34; - Carter's Notes",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/disciplinecartersnotes.png",
        "tierClass": "strongest",
        "comment": "Discipline's main effect makes your shock hit Survivors significantly sooner. This helps massively in chase, making your shock much more consistent and allowing you to deny the use of pallets or windows with much more success than usual. The secondary passive effect of this add-on is also quite powerful, since it removes the red stain during chase and can be quite disorienting while in Madness Tier 3. Keep in mind that all passive effects do not stack with other instances of themselves."
      },
      {
        "name": "&#34;Discipline&#34; - Class III",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/disciplineclassiii.png",
        "tierClass": "good",
        "comment": "Discipline's main effect makes your shock hit Survivors significantly sooner. This helps massively in chase, making your shock much more consistent and allowing you to deny the use of pallets or windows with much more success than usual. The secondary passive effect of this add-on is also quite powerful, since it removes the red stain during chase and can be quite disorienting while in Madness Tier 3. Keep in mind that all passive effects do not stack with other instances of themselves."
      },
      {
        "name": "Iridescent King",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/iridescentking.png",
        "tierClass": "good",
        "comment": "This add-on inflicts the passive effects of the four main family of add-ons: Calm, Discipline, Restraint and Order. Keep in mind that the passive effects can never stack with other instances of themselves. This combinaton of several effects causes a lot of small effects to happen at once which can be quite overwhelming against less experienced or coordinated Survivors. Against stronger Survivors, you might find it preferable to run other add-ons with more impactful effects."
      },
      {
        "name": "High Stimulus Electrode",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/highstimuluselectrode.png",
        "tierClass": "good",
        "comment": "Increases the maximum range of your shock. This extra range isn't always necessary in chase but it's still helpful to interrupt Survivors performing critical actions such as finishing generators or attempting an unhook. Can be stacked with other range add-ons, but it's typically best to run it with some other add-on that brings more utility."
      },
      {
        "name": "&#34;Discipline&#34; - Class II",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/disciplineclassii.png",
        "tierClass": "good",
        "comment": "Discipline's main effect makes your shock hit Survivors significantly sooner. It's still noticeable despite being weaker than its blue and purple counterparts. The secondary passive effect of this add-on is also quite powerful, since it removes the red stain during chase and can be quite disorienting while in Madness Tier 3. Keep in mind that all passive effects do not stack with other instances of themselves. The passive effects are also the same across all rarities."
      },
      {
        "name": "&#34;Restraint&#34; - Carter's Notes",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/restraintcartersnotes.png",
        "tierClass": "good",
        "comment": "Restraint's main effect is to briefly show you the auras of Survivors that gain a madness level. This can help when trying to track a distant Survivor or even during chase. Restraint's passive effect makes Doctor hallucinations last longer and makes them visible at all levels of madness, which can sometimes help track specific Survivors across the map. Keep in mind that the aura reading effect of this family of add-ons can be extended with the perk &#34;Lethal Pursuer&#34; but does not stack with other instances of itself. For that reason, there's no point in running two Restraint add-ons together. As usual, the passive effect doesn't stack either."
      },
      {
        "name": "&#34;Restraint&#34; - Class III",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/restraintclassiii.png",
        "tierClass": "good",
        "comment": "Restraint's main effect is to briefly show you the auras of Survivors that gain a madness level. This can help when trying to track a distant Survivor or even during chase. Restraint's passive effect makes Doctor hallucinations last longer and makes them visible at all levels of madness, which can sometimes help track specific Survivors across the map. Keep in mind that the aura reading effect of this family of add-ons can be extended with the perk &#34;Lethal Pursuer&#34; but does not stack with other instances of itself. For that reason, there's no point in running two Restraint add-ons together. As usual, the passive effect doesn't stack either."
      },
      {
        "name": "Polished Electrode",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/polishedelectrode.png",
        "tierClass": "good",
        "comment": "Increases the maximum range of your shock. This extra range isn't always necessary in chase but it's still helpful to interrupt Survivors performing critical actions such as finishing generators or attempting an unhook. Can be stacked with other range add-ons, but it's typically best to run it with some other add-on that brings more utility."
      },
      {
        "name": "Mouldy Electrode",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/mouldyelectrode.png",
        "tierClass": "decent",
        "comment": "Increases the maximum range of your shock. This extra range isn't always necessary in chase but it's still helpful to interrupt Survivors performing critical actions such as finishing generators or attempting an unhook. Can be stacked with other range add-ons, but it's typically best to run it with some other add-on that brings more utility."
      },
      {
        "name": "&#34;Calm&#34; - Carter's Notes",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/calmcartersnotes.png",
        "tierClass": "decent",
        "comment": "Calm's main effect is to increase your terror radius when you're ready to use your blast (which increases its reach) and decrease it when you're in cooldown, which can make you quite stealthy when combined with other Calm add-ons or perks such as &#34;Monitor & Abuse&#34;. The passive effect makes Survivors with madness hear an occasional fake terror radius that can sometimes disorient them. Keep in mind that all passive effects do not stack with other instances of themselves. The passive effects are also the same across all rarities."
      },
      {
        "name": "&#34;Calm&#34; - Class II",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/calmclassii.png",
        "tierClass": "decent",
        "comment": "Calm's main effect is to increase your terror radius when you're ready to use your blast (which increases its reach) and decrease it when you're in cooldown, which can make you quite stealthy when combined with other Calm add-ons or perks such as &#34;Monitor & Abuse&#34;. The passive effect makes Survivors with madness hear an occasional fake terror radius that can sometimes disorient them. Keep in mind that all passive effects do not stack with other instances of themselves. The passive effects are also the same across all rarities."
      },
      {
        "name": "&#34;Restraint&#34; - Class II",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/restraintclassii.png",
        "tierClass": "decent",
        "comment": "Restraint's main effect is to briefly show you the auras of Survivors that gain a madness level. This green version unfortunately only lasts one second, but it's still a decent effect. Restraint's passive effect makes Doctor hallucinations last longer and makes them visible at all levels of madness, which can sometimes help track specific Survivors across the map. Keep in mind that the aura reading effect of this family of add-ons can be extended with the perk &#34;Lethal Pursuer&#34; but does not stack with other instances of itself. For that reason, there's no point in running two Restraint add-ons together. As usual, the passive effect doesn't stack either."
      },
      {
        "name": "Interview Tape",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/interviewtape.png",
        "tierClass": "decent",
        "comment": "This add-on changes the shape of your shock. Instead of a cone, it will now be a beam with greater range but thinner width. The extra range is nice (and can be used to great effect by veteran Doctor players) but overall this add-on makes it much harder to shock Survivors normally at close range. Only use it if you know what you're doing."
      },
      {
        "name": "&#34;Calm&#34; - Class I",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/calmclassi.png",
        "tierClass": "decent",
        "comment": "Calm's main effect is to increase your terror radius when you're ready to use your blast (which increases its reach) and decrease it when you're in cooldown, which can make you quite stealthy when combined with other Calm add-ons or perks such as &#34;Monitor & Abuse&#34;. The passive effect makes Survivors with madness hear an occasional fake terror radius that can sometimes disorient them. Keep in mind that all passive effects do not stack with other instances of themselves. The passive effects are also the same across all rarities."
      },
      {
        "name": "&#34;Order&#34; - Carter's Notes",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/ordercartersnotes.png",
        "tierClass": "almost-no-effect",
        "comment": "Order's main effect is to slightly reduce the cooldown timer of your blast, allowing you to use it more frequently. However, even when stacked together, this reduction only amounts to a few seconds. The secondary passive periodically creates fake illusory pallets on the spots where real pallets were broken. These pallets are visible to perks such as &#34;Windows of Opportunity&#34; but are relatively easy to see through upon close inspection, since the debris of a real broken pallet is visible below them. While they can occasionally trick a Survivor into making a mistake, they're ultimately not very reliable. Keep in mind that all passive effects are exactly the same across all rarities and that they do not stack with other instances of themselves."
      },
      {
        "name": "&#34;Order&#34; - Class II",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/orderclassii.png",
        "tierClass": "almost-no-effect",
        "comment": "Order's main effect is to slightly reduce the cooldown timer of your blast, allowing you to use it more frequently. However, even when stacked together, this reduction only amounts to a few seconds. The secondary passive periodically creates fake illusory pallets on the spots where real pallets were broken. These pallets are visible to perks such as &#34;Windows of Opportunity&#34; but are relatively easy to see through upon close inspection, since the debris of a real broken pallet is visible below them. While they can occasionally trick a Survivor into making a mistake, they're ultimately not very reliable. Keep in mind that all passive effects are exactly the same across all rarities and that they do not stack with other instances of themselves."
      },
      {
        "name": "&#34;Order&#34; - Class I",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/orderclassi.png",
        "tierClass": "almost-no-effect",
        "comment": "Order's main effect is to slightly reduce the cooldown timer of your blast, allowing you to use it more frequently. However, even when stacked together, this reduction only amounts to a few seconds. The secondary passive periodically creates fake illusory pallets on the spots where real pallets were broken. These pallets are visible to perks such as &#34;Windows of Opportunity&#34; but are relatively easy to see through upon close inspection, since the debris of a real broken pallet is visible below them. While they can occasionally trick a Survivor into making a mistake, they're ultimately not very reliable. Keep in mind that all passive effects are exactly the same across all rarities and that they do not stack with other instances of themselves."
      },
      {
        "name": "Maple Knight",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/mapleknight.png",
        "tierClass": "detrimental",
        "comment": "This add-on shows a preview of your shock's range. Quite useful for beginners that are still learning the basics or want to see the exact shape of the shock when using one of several add-ons that modify it. Other than that, this add-on provides no value and might actually be detrimental since it's quite distracting."
      },
      {
        "name": "Scrapped Tape",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/doctor/scrappedtape.png",
        "tierClass": "detrimental",
        "comment": "This add-on completely changes the shape of your shock. Instead of being a wide cone, it will have the shape of a donut placed in front of you. Generally speaking, this add-on is completely useless and actually hurts your ability to accurately shock Survivors in chase. If paired with the blue Interview Tape add-on, however, both shapes will actually combine together. Using both tapes makes them a bit more manageable but it's still a very lackluster effect that might do more harm than good."
      }
    ]
  },
  "huntress": {
    "displayName": "Huntress",
    "addons": [
      {
        "name": "Oak Haft",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/oakhaft.png",
        "tierClass": "strongest",
        "comment": "Reduces your already short cooldown after throwing a hatchet by 0.2 seconds. This faster recovery is universally useful and allows to do anything sooner: begin to move at normal speed again, throw another hatchet or even follow-up with a basic attack. With this add-on, it becomes possible to consistently interrupt Survivors before they can even perform an unhook."
      },
      {
        "name": "Flower Babushka",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/flowerbabushka.png",
        "tierClass": "strongest",
        "comment": "Increases your wind up speed, allowing you to throw a hatchet a bit earlier by 0.12s. A strong effect that can even be stacked with its green counterpart. Be sure not to get too used to the effect of this add-on, as it might hurt your muscle memory if you suddenly stop using it."
      },
      {
        "name": "Glowing Concoction",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/glowingconcoction.png",
        "tierClass": "strongest",
        "comment": "Highlights the aura of Survivors hit by a hatchet, allowing you to do follow-up shots from a distance or effortlessly mindgame them at loops since you can see their exact location. Very strong effect, but can still be countered by certain Survivor perks that conceal their aura."
      },
      {
        "name": "Bandaged Haft",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/bandagedhaft.png",
        "tierClass": "good",
        "comment": "Reduces your already short cooldown after throwing a hatchet by 0.1 seconds. Not as useful as its green counterpart, but still incredibly powerful for an add-on of this rarity. Can be stacked together."
      },
      {
        "name": "Shiny Pin",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/shinypin.png",
        "tierClass": "good",
        "comment": "Provides a noticeable boost to your walking speed while holding a hatchet. This helps in almost every situation, allowing you to lose less distance when Survivors are running away from you. In some loops, the increased speed also allows you to put Survivors in lose-lose situations where you'll hit them before they reach the next corner."
      },
      {
        "name": "Manna Grass Braid",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/mannagrassbraid.png",
        "tierClass": "good",
        "comment": "Increases your wind up speed, allowing you to throw a hatchet a bit earlier by 0.08s. Not a bad effect at all, and can be stacked with its blue counterpart. Be sure not to get too used to the effect of this add-on, as it might hurt your muscle memory if you suddenly stop using it."
      },
      {
        "name": "Iridescent Head",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/iridescenthead.png",
        "tierClass": "good",
        "comment": "Permanently reduces your maximum hatchet capacity to 1, but makes the hatchet insta-down Survivors. This effect is really powerful and can devastate unprepared teams that fail to play around it. Needless to say, it also makes hook rescues or altruism almost impossible. Overall, however, losing so many hatchets is not necessarily an upgrade against coordinated teams and you might find that this add-on doesn't perform as well against them."
      },
      {
        "name": "Rose Root",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/roseroot.png",
        "tierClass": "good",
        "comment": "Increases the flight speed of your hatchets, making them fly straighter and hit their targets a bit earlier. This is particularly noticeable for long distance shots, but keep in mind that you'll need to get used to the slightly different hatchet flight angle."
      },
      {
        "name": "Venomous Concoction",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/venomousconcoction.png",
        "tierClass": "good",
        "comment": "Inflicts the Exhausted status effect, making Survivors much more predictable in chase and removing several common options for them to gain distance."
      },
      {
        "name": "Wooden Fox",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/woodenfox.png",
        "tierClass": "good",
        "comment": "Makes you Undetectable for a period of time after reloading from a locker. Despite not removing the permanent lullaby, losing your terror radius and being immune to aura reading can still catch many Survivors by surprise. Particularly useful in indoor maps where Survivors have no visibility from afar."
      },
      {
        "name": "Begrimed Head",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/begrimedhead.png",
        "tierClass": "decent",
        "comment": "Inflicts both Mangled and Haemorrhage with each hatchet attack, which is pretty useful given the Huntress' natural ability to injure several Survivors quickly and punish teams that do not heal. Should not be used together with its blue counterpart, since they share the same effects and they do not stack."
      },
      {
        "name": "Rusty Head",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/rustyhead.png",
        "tierClass": "decent",
        "comment": "Inflicts the Mangled status effect each hatchet attack, which is pretty useful given the Huntress' natural ability to injure several Survivors quickly and punish teams that do not heal."
      },
      {
        "name": "Amanita Toxin",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/amanitatoxin.png",
        "tierClass": "decent",
        "comment": "Inflicts the Blindness status effect on Survivors hit by a hatchet. Quite easy to apply, and lasts long enought to deny the natural aura reading that Survivors have while they're on the hook. Not super impactful, but not too bad either."
      },
      {
        "name": "Coarse Stone",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/coarsestone.png",
        "tierClass": "decent",
        "comment": "Increases the grunt volume of Survivors injured by hatchets, which helps with tracking. Notably, this effect does not have a timer and remains on indefinitely until the Survivor heals. Not bad at all for an add-on of this rarity."
      },
      {
        "name": "Yellowed Cloth",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/yellowedcloth.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the flight speed of your hatchets, making them fly straighter and hit their targets a bit earlier. This is particularly noticeable for long distance shots, but keep in mind that you'll need to get used to the slightly different hatchet flight angle."
      },
      {
        "name": "Weighted Head",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/weightedhead.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts the rare Incapacitated status effect, making Survivors unable to do certain actions such as healing or repairing for a few seconds. In some rare situations, this add-on can have a massive impact by denying the ability to quickly finish a generator or preventing someone from quickly using an item during chase. Outside of these rare scenarios, this add-on doesn't have much impact at all since Survivors can still perform many important actions: vaulting, pallet dropping, opening gates, unhooking..."
      },
      {
        "name": "Infantry Belt",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/infantrybelt.png",
        "tierClass": "almost-no-effect",
        "comment": "Provides a tiny increase of movement speed after landing a hatchet shot. Sadly this effect is simply too small to make a significant difference and you're almost always better off running one of the two hatchet throw cooldown add-ons instead."
      },
      {
        "name": "Deerskin Gloves",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/deerskingloves.png",
        "tierClass": "almost-no-effect",
        "comment": "Saves you approximately 0.6 seconds each time you reload at a locker. A nice and simple effect, but ideally you should not be reloading often enough to benefit too much from it. Can be stacked with the perk &#34;Iron Maiden&#34; for even faster reloading speed."
      },
      {
        "name": "Soldier's Puttee",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/soldiersputtee.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases your movement from 110% (4.4m/s) to 115% (4.6m/s) when completely out of hatchets, allowing you to chase as a standard Killer. Might sound appealing at first, but this is a situation that you almost always want to avoid in the first place. Even when used together with the Iridescent Head, you might find other add-ons to be better alternatives."
      },
      {
        "name": "Leather Loop",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/huntress/leatherloop.png",
        "tierClass": "almost-no-effect",
        "comment": "Provides a tiny increase of movement speed after landing a hatchet shot. Sadly this effect is simply too small to make a significant difference and you're almost always better off running one of the two hatchet throw cooldown add-ons instead."
      }
    ]
  },
  "leatherface": {
    "displayName": "Leatherface,Bubba,Cannibal",
    "addons": [
      {
        "name": "The Beast's Marks",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/thebeastsmarks.png",
        "tierClass": "strongest",
        "comment": "Increases your chainsaw sweep speed at the cost of a small penalty to charge rate. The increased speed makes the chainsaw very deadly in certain loops when used correctly and allows you to cover an enormous amount of distance. Particularly deadly in the hands of experienced Cannibal players that can use the increased speed to put Survivors in lose-lose situations."
      },
      {
        "name": "Iridescent Flesh",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/iridescentflesh.png",
        "tierClass": "strongest",
        "comment": "This add-on allows you to quickly refresh your chainsaw tokens and keep extending your sweep after a hit. This effect can be extremely punishing if Survivors make a mistake or find themselves grouped up after an unhook, for example. Makes you even stronger at camping and making unhooks extremely unsafe, but it's obviously not as useful against players that split up and play efficiently. Note that this add-on has the effect of limiting the duration of your tantrum to a fixed maximum regardless of how many tokens are actually used. This can also catch some Survivors by surprise. Even if it doesn't do a lot for most of the match, a single mistake can allow this add-on to immediately win you the game for you when used correctly."
      },
      {
        "name": "Primer Bulb",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/primerbulb.png",
        "tierClass": "good",
        "comment": "Allows you to recovery your chainsaw tokens faster. Useful in prolonged chases where you use your saw multiple times. Being able to use several chainsaw charges quicker allows you to exert more and more pressure in chase, and is almost universally useful in any build or in combination with most other add-ons. Great for beginners and seasoned players alike."
      },
      {
        "name": "Knife Scratches",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/knifescratches.png",
        "tierClass": "good",
        "comment": "Increases your chainsaw sweep speed at the cost of a small penalty to charge rate. This add-on is inferior to its blue counterpart, but the penalty is also smaller. Still a very powerful effect, especially in the hands of experienced players."
      },
      {
        "name": "Depth Gauge Rake",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/depthgaugerake.png",
        "tierClass": "good",
        "comment": "This add-on gives you a 4th chainsaw charge at the cost of a small nerf to your movement speed. This used to be a terrible trade-off, but with the increased basekit numbers for the Cannibal, it's now a decent choice especially when paired with other synergistic add-ons. With the green Primer Bulb, for example, you can have a near constant source of charges to always be ready to shred pallets or use the saw in chase. With the Iridescent Flesh, you can regenerate 4 tokens and keep your saw going for very long periods of time. Quite scary when used right, but keep in mind that the lowered speed makes your chainsaw slightly more predictable in chase."
      },
      {
        "name": "Light Chassis",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/lightchassis.png",
        "tierClass": "good",
        "comment": "Very useful to quickly find people hiding in bushes or see through walls at certain loops. Keep in mind that since the aura read is not on a timer, it does not benefit from being used with Lethal Pursuer."
      },
      {
        "name": "Spark Plug",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/sparkplug.png",
        "tierClass": "good",
        "comment": "Allows you to recover your chainsaw tokens faster. Useful in prolonged chases where you use your saw multiple times. Also allows you to be ready for another chainsaw attack sooner if you enter a tantrum and lose all of your charges."
      },
      {
        "name": "Award-winning Chilli",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/awardwinningchilli.png",
        "tierClass": "decent",
        "comment": "The two Chili add-ons slightly increase the distance that you cover with each saw charge, making your power much harder to outrun when using it for long chainsaw sweeps. However, by extending your overall duration, they also indirectly extend the slower period that happens near the start of your sweep, which means that you take about 0.2 seconds longer to reach full speed. This makes your chainsaw slightly worse during the first few moments. Considering this downside and the latest buffs to the Cannibal's basekit numbers, these two add-ons are far less appealing than before."
      },
      {
        "name": "Chilli",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/chilli.png",
        "tierClass": "decent",
        "comment": "The two Chili add-ons slightly increase the distance that you cover with each saw charge, making your power much harder to outrun when using it for long chainsaw sweeps. However, by extending your overall duration, they also indirectly extend the slower period that happens near the start of your sweep, which means that you take about 0.2 seconds longer to reach full speed. This makes your chainsaw slightly worse during the first few moments. Considering this downside and the latest buffs to the Cannibal's basekit numbers, these two add-ons are far less appealing than before."
      },
      {
        "name": "Rusted Chains",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/rustedchains.png",
        "tierClass": "decent",
        "comment": "The Broken status effects lasts a decent amount of time, often keeping Survivors unable to heal upon being unhooked. This is quite impactful and a great way to outplay quick heals but keep in mind that Survivors that cannot heal will prioritize doing repairs instead."
      },
      {
        "name": "Vegetable Oil",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/vegetableoil.png",
        "tierClass": "decent",
        "comment": "Speeds up the brief cooldown animation that occurs after a chainsaw sweep (not including the ones that end in tantrum or pallet break). Small effect but it's still quite useful in some situations, such as a Survivor dodging your saw by hopping into a locker. With this add-on you'll find it even easier to punish such strategies. Keep in mind that this cooldown's duration also depends on the amount of chainsaw tokens that you have consumed. This recovery effect is even more noticeable when it happens after a chainsaw hit on a Survivor."
      },
      {
        "name": "Grisly Chains",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/grislychains.png",
        "tierClass": "decent",
        "comment": "Making it slightly harder for Survivors to heal is a good effect, even if it's on a timer. However, just like all other utility add-ons, it doesn't do anything to make landing the chainsaw hits easier or more consistent."
      },
      {
        "name": "Begrimed Chains",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/begrimedchains.png",
        "tierClass": "decent",
        "comment": "Making Survivors drop their item can make them waste a bit of time but it's not an incredibly powerful effect otherwise. Keep in mind that just like with the perk &#34;Franklin's Demise&#34;, items lost with this add-on retain their full charges while being left on the ground. Can be used with certain synergistic perks such as &#34;Hoarder&#34; or &#34;Weave Attunement&#34; if you want to squeeze some more value out of it."
      },
      {
        "name": "Homemade Muffler",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/homemademuffler.png",
        "tierClass": "almost-no-effect",
        "comment": "Helpful for beginner players that still find themselves bumping into obstacles often. However, with the current Cannibal's reduced tantrum duration, this effect only amounts to 0.5 seconds, which isn't that much. It does, however, provide the benefit of making the locker juke plays even riskier for Survivors if you bump into a locker that they entered during your sweep."
      },
      {
        "name": "Chainsaw File",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/chainsawfile.png",
        "tierClass": "almost-no-effect",
        "comment": "Helpful for beginner players that still find themselves bumping into obstacles often. However, with the current Cannibal's reduced tantrum duration, this effect only amounts to 0.25 seconds, which isn't that much."
      },
      {
        "name": "Shop Lubricant",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/shoplubricant.png",
        "tierClass": "almost-no-effect",
        "comment": "Hides the aura of a Survivor that you down with your chainsaw, making it harder for others to know their exact location if they're not communicating. This effect can be useful against uncoordinated teams. However, there's no way to know when the effects of this add-on have triggered, so you'll always have to guess whether or not it's actually doing anything. Overall, an incredibly situational add-on that's rarely worth the add-on slot."
      },
      {
        "name": "The Grease",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/thegrease.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on gives you more time to hold your chainsaw before you &#34;overheat&#34; and go into a tantrum. However, during normal gameplay this will never happen. There is simply no reason to continuously rev your chainsaw without using it. Can be stacked with its green counterpart, but don't even bother."
      },
      {
        "name": "Long Guide Bar",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/longguidebar.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on gives you more time to hold your chainsaw before you &#34;overheat&#34; and go into a tantrum. However, during normal gameplay this will never happen. There is simply no reason to continuously rev your chainsaw without using it. Can be stacked with its blue counterpart, but don't even bother."
      },
      {
        "name": "Carburettor Tuning Guide",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/carburettortuningguide.png",
        "tierClass": "detrimental",
        "comment": "This add-on combines all of your chainsaw tokens into a single long one, which can pair well with some other add-ons such as the Iridescent Flesh. The simplicity of this add-on might make it appealing to beginners. However, the small penalty that comes with this add-on hurts its potential at higher levels. With all of your charges combined into a single one, doing things such as breaking a pallet with your saw depletes all of them at once. Feel free to use this add-on for fun if you understand the risks and downsides that it implies."
      },
      {
        "name": "Speed Limiter",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/leatherface/speedlimiter.png",
        "tierClass": "detrimental",
        "comment": "This add-on makes your chainsaw not insta-down Survivors. It's obviously detrimental, but it can be quite fun and even decent if paired together with the Iridescent Flesh add-on."
      }
    ]
  },
  "freddy": {
    "displayName": "Freddy,Nightmare",
    "addons": [
      {
        "name": "Jump Rope",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/jumprope.png",
        "tierClass": "strongest",
        "comment": "Increases the already long movement penalty hinder applied by your snares. This makes them even more oppressive and hard to outplay in chase. The duration is so long that you can hit a Survivor with a snare right before a basic attack and they'll still be affected by the time their post-hit speed runs out. It's also one of the few ways to minimize the negative effect of Vigil, a perk that reduces the duration of this and other negative effects. A safe choice for any player."
      },
      {
        "name": "Pill Bottle",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/pillbottle.png",
        "tierClass": "strongest",
        "comment": "Makes the Survivors' sleep timer shorter each time they wake up, proggressively forcing them to waste time more frequently if they want to stay awake. This effect can become quite oppressive in prolonged matches."
      },
      {
        "name": "&#34;Z&#34; Block",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/zblock.png",
        "tierClass": "good",
        "comment": "The aura reading from this add-on is very useful and triggers many times during a match, making it a very safe choice. Particularly useful when paired with the perk Lethal Pursuer, since it increases the aura read duration. Being able to see how Survivors move after being hit by a snare will eventually deepen your understanding of how they play against you, which makes this add-on an excellent training tool that will help you even when you eventually stop using it."
      },
      {
        "name": "Nancy's Sketch",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/nancyssketch.png",
        "tierClass": "good",
        "comment": "Reduces the immunity period that Survivors obtain after waking up from a clock, removing 6 seconds and bringing it down to 24 instead of 30 seconds. A really solid effect, since immune Survivors can be really challenging to chase. This effect is most noticeable when you're making the most out of the Nightmare's kit, teleporting often and switching targets constantly against a competent team that is trying to stay awake. Needless to say, if you focus on chasing the same Survivor for a long period of time and don't give them a chance to use a clock, this add-on will do nothing. It will also do nothing if Survivors don't make an effort to wake up frequently, but this is already a good scenario for you anyway."
      },
      {
        "name": "Unicorn Block",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/unicornblock.png",
        "tierClass": "good",
        "comment": "Increases the range of the fake pallet's explosion by 0.5 meters when detonated by you. The larger radius makes it harder for Survivors to get away at the last second. The extra half meter makes a huge difference in several structures since it can allow the radius to envelop them fully and catch a Survivor that is looping them tightly. Even if you miss, the fact that a Survivor has to go further out of their way to dodge the explosion might make them easier to hit with a basic attack. Overall, this is a strong add-on with no downsides that will shine most in the hands of an experienced Nightmare player that can constantly micro-manage illusory pallet explosions."
      },
      {
        "name": "Class Photo",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/classphoto.png",
        "tierClass": "good",
        "comment": "The ability to teleport to exit gates has great synergy with endgame builds but can also be used even earlier during the match in situations where an exit gate is located at a particularly useful spot to control an area or cut someone off. Pairs well with the iridescent Black Box."
      },
      {
        "name": "Garden Rake",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/gardenrake.png",
        "tierClass": "good",
        "comment": "Increases the size of snares by 10%. Not extremely noticeable at first glance but a solid effect nonetheless, especially when you're trying to land snare hits on distant Survivors with unpredictable movement."
      },
      {
        "name": "Nancy's Masterpiece",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/nancysmasterpiece.png",
        "tierClass": "good",
        "comment": "Reduces the teleport cooldown by 10%, saving you about 3 seconds each time you hit a Survivor with a snare or fake pallet. This effect can be quite noticeable and result in much faster teleports, especially if multiple Survivors are hit in quick succession. However, having a shorter teleport cooldown isn't always extremely necessary, since you don't always need to use it right away anyway."
      },
      {
        "name": "Outdoor Rope",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/outdoorrope.png",
        "tierClass": "decent",
        "comment": "Increases the speed of the dream snare projectile. More useful when hitting Survivors at a slight distance, but be careful not to rely too much on it since it might mess with your muscle memory when you take it off."
      },
      {
        "name": "Prototype Claws",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/prototypeclaws.png",
        "tierClass": "decent",
        "comment": "Increases the speed at which you can charge and release dream snares. Seems quite redundant, since the charge timer is so fast already, but being able to do it even faster does help make it feel more smooth during chase."
      },
      {
        "name": "Black Box",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/blackbox.png",
        "tierClass": "decent",
        "comment": "When each exit gate is opened, this add-on traps any asleep Survivors for 15 seconds (and for a small extra 3 seconds if they wake up in any way). Highly situational, but this effect can catch Survivors off-guard and allow you to secure an extra kill at the endgame. Keep in mind that it can work once on each gate. If a Survivor is awake, you can put them to sleep with a basic attack or hit them from afar with a snare or two to prevent them from escaping at the last moment. Pairs well with endgame builds and the Class Photo for obvious reasons."
      },
      {
        "name": "Green Dress",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/greendress.png",
        "tierClass": "decent",
        "comment": "Slightly increases the duration of the wake up action that Survivors can perform on each other. Many Survivors will wake each other up before healing to avoid being teleported to, so this will delay them for a bit each time. This add-on is more valuable in lobbies without too many medkits where Survivors must rely on each other to heal. Not a bad effect at all, but remember that Survivors also have other ways to wake up that are not affected by this add-on."
      },
      {
        "name": "Cat Block",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/catblock.png",
        "tierClass": "decent",
        "comment": "Reduces the teleport cooldown by 10%, saving you about 3 seconds if you need to use it again. Not a terrible effect, but not extremely impactful either since you don't necessarily want to teleport right away anyway. Pretty useful if you're feeling lost and need to teleport to a different area of the map as soon as possible."
      },
      {
        "name": "Wool Shirt",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/woolshirt.png",
        "tierClass": "almost-no-effect",
        "comment": "Reduces the delay of fake pallets when detonated remotely, giving Survivors less time to dodge or run past them. Pairs well with the blue Unicorn Block to make the pallets deadlier overall, but keep in mind that pallets can be quite hard to use early on in some maps and that it might be a risky idea to dedicate two add-ons to them. You can also try to make up for the lack of this add-on by triggering the explosion slightly sooner, if possible. Overall, this add-on's effect is nice but so small that it's sometimes hard to notice."
      },
      {
        "name": "Paint Thinner",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/paintthinner.png",
        "tierClass": "almost-no-effect",
        "comment": "Unlocks the ability to teleport to Survivors that drop a fake pallet at a faster rate than usual, and also reveals their location for a while with Killer Instinct. This is overall a very situational tool that might not even come into play a single time during the match. On top of that, Survivors that try to disrupt your fake pallets are probably not the ones you want to prioritize anyway. If you're gonna run it, try pairing it with the purple Swing Chains for a better chance to see value."
      },
      {
        "name": "Red Paint Brush",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/redpaintbrush.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on provides the extremely valuable ability to see distant Survivors who are asleep, giving you reliable information on their location. However, it comes at the huge cost of making their sleep timer 50% longer. This means they'll take 30 seconds longer to passively fall asleep and your snares will require one additional hit before putting them to sleep. Survivors being awake longer means they'll have an easier time healing without the fear of being teleported to. Overall, the tradeoff of this add-on is very negative and not worth the add-on slot unless you really know what you're doing."
      },
      {
        "name": "Kid's Drawing",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/kidsdrawing.png",
        "tierClass": "almost-no-effect",
        "comment": "Slightly increases the sleep timer &#34;damage&#34; of all of your abilities, making Survivors fall asleep sooner when hit by them. In some situations, this effect can occasionally save 3 or 6 seconds and allow you to immediately use a snare on a Survivor in chase. However, in most scenarios, Survivors will fall asleep after being hit with snares and this add-on will make basically no difference. Not a terrible effect for a brown add-on, but there are simply better ones."
      },
      {
        "name": "Sheep Block",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/sheepblock.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the time that a dream world clock is unavailable after being used, forcing Survivors to wait slightly longer before being able to use it again. Not terrible for an add-on of this rarity, but the effect is quite small. Don't forget that Survivors can also wake up in other ways."
      },
      {
        "name": "Swing Chains",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/swingchains.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on blocks windows in a small 16 meter radius upon a successful teleport. Sadly, the effect is too brief and triggers way too late to be consistently useful. It can be paired with the Paint Thinner to possibly catch a Survivor by surprise who was trying to disrupt your fake pallets."
      },
      {
        "name": "Blue Dress",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/freddy/bluedress.png",
        "tierClass": "detrimental",
        "comment": "This add-on reverts the snares back to their previous form before Freddy's rework. Instead of being a projectile, they become static circles. Not bad if you're feeling nostalgic, but overall a major downgrade compared to the default snares."
      }
    ]
  },
  "pig": {
    "displayName": "Pig,Amanda Young",
    "addons": [
      {
        "name": "Jigsaw's Sketch",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/jigsawssketch.png",
        "tierClass": "strongest",
        "comment": "Having an extra reverse beartrap is an amazing effect by itself as long as you're getting enough downs to use all of them. With this add-on, you're even more likely to have at least one person trapped and unable to escape through exit gates during the endgame, which can allow you to bounce back from a difficult game. It can also be used to mitigate the downside of the iridescent Video Tape. The secondary effect of highlighting generators isn't always relevant, but it's nice to have still."
      },
      {
        "name": "Crate of Gears",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/crateofgears.png",
        "tierClass": "good",
        "comment": "Increasing the search time of Jigsaw boxes is an amazing effect that is guaranteed to give you reliable slowdown if you manage to use all of your reverse beartraps. The longer removal timer also means that it's easier for you to interrupt and reset them and that it's more likely that someone could actually die if their timer runs out."
      },
      {
        "name": "Tampered Timer",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/tamperedtimer.png",
        "tierClass": "good",
        "comment": "Reduces the timer for active reverse traps, making it more likely that an unlucky Survivor might die to them. Since the amount of searches is not entirely random, this add-on can make it almost impossible for at least some Survivors to actually have enough time to remove their trap before they die. Not particularly strong by itself, but its effect is much more consistent when you also bring the purple Crate of Gears or if you are on a particular map that is difficult to navigate. Certain perks such as &#34;Hex: Face the Darkness&#34; can also randomly interrupt Survivors during searches to make them even longer. Keep in mind that this add-on will do literally nothing if your downs take too long and Survivors' traps aren't actually active for a long time."
      },
      {
        "name": "Amanda's Secret",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/amandassecret.png",
        "tierClass": "good",
        "comment": "Reveals the location of a Survivor when they remove their reverse beartrap. With this add-on, you can often find vulnerable Survivors as soon as they start healing or right before they can work on generators again. A powerful effect, sadly limited by the Pig's own lack of mobility to fully take advange of it. Try to keep a mental image of where each trapped Survivor might be and you might have a better chance to hunt them down successfully."
      },
      {
        "name": "Video Tape",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/videotape.png",
        "tierClass": "good",
        "comment": "Places all of your reverse beartraps on the Survivors at the start of the game, typically making it so that every Survivor starts out trapped (unless you run Amanda's Letter). This effect is really powerful agaisnt uncoordinated teams (especially in maps that are difficult to navigate) and can buy you a lot of time at the start of the game. However, if you fail to capitalize on this early slowdown, you will find yourself in a really weak position where all Survivors have removed their traps and you no longer have anything to hold them back. Can be paired with the Annotated Plan or Jigsaw's Sketch to keep one more trap as a back up."
      },
      {
        "name": "Jigsaw's Annotated Plan",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/jigsawsannotatedplan.png",
        "tierClass": "good",
        "comment": "Having an extra reverse beartrap is an amazing effect by itself as long as you're getting enough downs to use all of them. With this add-on, you're even more likely to have at least one person trapped and unable to escape through exit gates during the endgame, which can allow you to bounce back from a difficult game. It can also be used to mitigate the downside of the iridescent Video Tape. The secondary effect is quite strange and actually visible for Survivors, since they get a debuff icon showing that a timer has been shortened. Most of the times, this secondary effect will do nothing (especially considering that it doesn't actually shorten the active timer if a generator is completed while the trapped Survivor is on the hook)."
      },
      {
        "name": "Bag of Gears",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/bagofgears.png",
        "tierClass": "good",
        "comment": "Increasing the search time of Jigsaw boxes is an amazing effect that is guaranteed to give you reliable slowdown if you manage to use all of your reverse beartraps. The longer removal timer also means that it's easier for you to interrupt and reset them and that it's more likely that someone could actually die if their timer runs out."
      },
      {
        "name": "Workshop Grease",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/workshopgrease.png",
        "tierClass": "good",
        "comment": "The increased charge speed is a really strong effect that makes the ambush easier to use. As explained for the Shattered Syringe add-on, the cooldown reduction effect is not very useful."
      },
      {
        "name": "Last Will",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/lastwill.png",
        "tierClass": "good",
        "comment": "With the extra speed, your ambush covers more distance and is harder to react to. The downside of a longer charge can be mitigated by using the green Workshop Grease and doesn't always matter if a Survivor is already cornered. With these two add-ons combined, the Pig actually gains some distance on Survivors by the end of her ambush and can land hits that would otherwise be missed by a regular lunge attack. Overall, a pretty good effect."
      },
      {
        "name": "Rules Set No.2",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/rulessetno2.png",
        "tierClass": "decent",
        "comment": "Removes the (normally visible) auras of the Jigsaw boxes until a Survivor's trap is active. This can be very disorienting for newer players or in indoor maps, where boxes are hard to find. Overall, this effect isn't all that powerful by itself since you typically do not want to encourage Survivors to repair generators instead of removing their trap. However, it can be quite useful when paired with the iridescent Video Tape (since everyone starts with a trap and the first generator won't be repaired for a while)."
      },
      {
        "name": "Combat Straps",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/combatstraps.png",
        "tierClass": "decent",
        "comment": "Speeds up the animation of crouching and uncrouching. Somewhat noticeable in chase (especially if a Survivor keeps preemptively leaving the loop when they see you crouch), but the effect itself is quite small."
      },
      {
        "name": "Face Mask",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/facemask.png",
        "tierClass": "decent",
        "comment": "Applies the Blindness status effect to anyone wearing a reverse beartrap. A decevingly powerful effect, since it prevents Survivors from seeing all of their team mates while they're on the hook and also counters perks such as &#34;Windows of Opportunity&#34;  afterwards. Keep in mind that power-related props such as the Jigsaw boxes are still visible for blind Survivors, though."
      },
      {
        "name": "Amanda's Letter",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/amandasletter.png",
        "tierClass": "decent",
        "comment": "Allows you to see Survivor auras near you at the cost of losing two of your beartraps. The aura reading effect is phenomenal and helps both in and out of chase (as long as Survivors don't have perks that hide their auras). However, the downside of losing half of your beartraps can be devastating in many cases, so one must use this add-on carefully."
      },
      {
        "name": "John's Medical File",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/johnsmedicalfile.png",
        "tierClass": "decent",
        "comment": "Slightly increases your movement speed when crouched. Even with this add-on, it's still generally not a good idea to crouch around the entire map looking for Survivors, as it's quite slow and inefficient. However, it pairs very well with information perks (so that you know where you're going) or aura reading from the iridescent Amanda's Letter. Some veteran Pig players might also be able to take advantage of this increased crouch speed to set up sneaky ambushes during chase."
      },
      {
        "name": "Rusty Attachments",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/rustyattachments.png",
        "tierClass": "almost-no-effect",
        "comment": "Applies the Mangled status effect to trapped Survivors. This can induce them into not healing after being unhooked or force them to waste a little bit of extra time, but it also has the potential to do nothing at all since it has a relatively short timer. Overall, this add-on is greatly outclassed by the Bag and Crate of Gears, since they provide a much more consistent form of slowdown that can actually make a much bigger difference."
      },
      {
        "name": "Slow-Release Toxin",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/slowreleasetoxin.png",
        "tierClass": "almost-no-effect",
        "comment": "Applies the Exhaustion status effect to any trapped Survivor. Generally speaking, it's not a great idea to focus on chasing a trapped Survivor so making them exhausted is not extremely useful. Situationally useful, but definitely not a reliable choice."
      },
      {
        "name": "Razor Wires",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/razorwires.png",
        "tierClass": "almost-no-effect",
        "comment": "Much like its brown counterpart, this add-on is very unlikely to work in regular gameplay. However, it can be particularly useful when paired together with the Video Tape add-on. Since many Survivors will be frantically trying to remove their traps at the start of the game, the chances for one of them to be interrupted and take damage are much higher."
      },
      {
        "name": "Utility Blades",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/utilityblades.png",
        "tierClass": "almost-no-effect",
        "comment": "Applies the Haemorrhage status effect on Survivors with a reverse beartrap. This effect is simply too situational to be reliable. Trying to disrupt a trapped Survivor is often not ideal. Not to mention that some Survivors won't even try to heal if they're concerned about their timer running low."
      },
      {
        "name": "Interlocking Razor",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/interlockingrazor.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicting Deep Wound is a good effect, but the chances for this to trigger in a regular match are very, very low. There's not much you can do to actively make the skillchecks harder."
      },
      {
        "name": "Shattered Syringe",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pig/shatteredsyringe.png",
        "tierClass": "almost-no-effect",
        "comment": "The cooldown reduction effect is very small and does not actually work if you hit an obstacle. Hitting an obstacle is actually a good idea if you're about to miss an ambush as it has a shorter cooldown itself."
      }
    ]
  },
  "clown": {
    "displayName": "Clown",
    "addons": [
      {
        "name": "Cheap Gin Bottle",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/cheapginbottle.png",
        "tierClass": "strongest",
        "comment": "Increases your speed by 3% when invigorated by yellow bottles. Particularly useful when used by experienced players that use both types of bottles effectively during chase. Pairs well with the blue Flask of Bleach."
      },
      {
        "name": "Garish Make-Up Kit",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/garishmakeupkit.png",
        "tierClass": "strongest",
        "comment": "Increases the duration of the yellow bottle's speed boost. It can be stacked with its green counterpart. If used with the Cigar Box, it also extends the time during which you can see auras. It's a strong effect if you're using yellow bottles often."
      },
      {
        "name": "Ether 15 Vol%",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/ether15vol.png",
        "tierClass": "good",
        "comment": "Increases the lingering effect of the slowdown bottles by 0.5 seconds which is an additional 50%. A really strong and straight-forward effect."
      },
      {
        "name": "Sticky Soda Bottle",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/stickysodabottle.png",
        "tierClass": "good",
        "comment": "Increases your speed by 2% when invigorated by yellow bottles. Particularly useful when used by experienced players that use both types of bottles effectively during chase. Pairs well with the blue Flask of Bleach."
      },
      {
        "name": "Thick Cork Stopper",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/thickcorkstopper.png",
        "tierClass": "good",
        "comment": "Slightly increases the reload speed. Particularly useful if you use a yellow bottle at your feet right before reloading, as it can make the reloading process even smoother and make you lose minimal distance against a Survivor running away from you. Arguably more useful than its blue counterpart, although you can combine both of them if you want to have super fast reloads."
      },
      {
        "name": "Tattoo's Middle Finger",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/tattoosmiddlefinger.png",
        "tierClass": "good",
        "comment": "A very simple add-on that shows the aura of Survivors affected by your bottles. Very easy to use and the aura reading is almost always helpful in one way or another, even if it's just to inform you that a Survivor managed to utilize one of your yellow gas clouds against you."
      },
      {
        "name": "Solvent Jug",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/solventjug.png",
        "tierClass": "good",
        "comment": "Increases the duration of the already decent yellow bottle speed boost. It can be stacked with its purple counterpart."
      },
      {
        "name": "Cigar Box",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/cigarbox.png",
        "tierClass": "decent",
        "comment": "Turns your yellow bottles into information-gathering tools that can help you to keep track of Survivors during chase and sometimes even outside of it, if you're lucky enough. It has quite a limited range, however."
      },
      {
        "name": "Sulphuric Acid Vial",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/sulphuricacidvial.png",
        "tierClass": "decent",
        "comment": "Applies a decently useful status effect, but applying it to multiple Survivors at once is very difficult on a Killer with such a limited mobility."
      },
      {
        "name": "Smelly Inner Soles",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/smellyinnersoles.png",
        "tierClass": "decent",
        "comment": "Greatly increases your movement speed during reload, making the process a lot smoother overall. The effects are very noticeable if you made a mistake and must reload while you're chasing after a Survivor. If you're reloading at a loop while the Survivor is stuck with you, this add-on will basically do nothing."
      },
      {
        "name": "Starling Feather",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/starlingfeather.png",
        "tierClass": "decent",
        "comment": "Reduces the bottle toss cooldown significantly, allowing you to spam bottle throws or perform an attack sooner, for example. Can be stacked with its brown counterpart, although there's not much reason to do so."
      },
      {
        "name": "Robin Feather",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/robinfeather.png",
        "tierClass": "decent",
        "comment": "Reduces the bottle toss cooldown significantly, allowing you to spam bottle throws or perform an attack sooner, for example. It's almost as strong as its green counterpart."
      },
      {
        "name": "Flask of Bleach",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/flaskofbleach.png",
        "tierClass": "decent",
        "comment": "Slightly increases the hinder effect from your slowdown bottles. This can sometimes make a difference in loops (where Survivors are forced to go through the entire gas cloud) or if you're running the purple Ether 15 Vol% to increase the lingering duration. However, in most situations, the 2% increase is simply not worth the add-on slot over other options."
      },
      {
        "name": "Fingerless Parade Gloves",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/fingerlessparadegloves.png",
        "tierClass": "decent",
        "comment": "This add-on sharply changes the throw angle of the bottles, making them follow a more straight path similar to Huntress hatchets instead of their normal curved arc. Generally speaking, this throw angle is completely unnecessary and will often hurt your ability to learn Clown as a beginner. It also makes throwing bottles over some obstacles much harder. However, despite these clear downsides, this add-on does have some unique advantages. Its secondary effect of increasing the throw speed by +25% is very helpful to hit Survivors in some situations where a regular throw would be too slow. The faster speed also means that bottles can travel further, allowing you to throw them at distant targets more easily. Advanced players might get some value from this add-on if they learn its unique quirks, but new players would do well to stay away from it."
      },
      {
        "name": "Kerosene Can",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/kerosenecan.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on provides an easy way to apply blindness, but it typically comes too late in chase to have any real utility. The duration is also very short, which means it won't do much afterwards."
      },
      {
        "name": "Bottle of Chloroform",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/bottleofchloroform.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on increases the size of the slowdown gas clouds and also makes them spread out slightly faster indirectly. This makes it even harder for Survivors to avoid them in some cases, but the situations where this effect makes a real difference are pretty rare. In a worst case scenario, it can even help Survivors by spreading the gas clouds too far apart and creating gaps between them. If you want to enhance your slowdown bottles, the Ether 15 Vol% is a much better choice."
      },
      {
        "name": "VHS Porn",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/vhsporn.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on increases the size of the slowdown gas clouds and also makes them spread out slightly faster indirectly. This makes it even harder for Survivors to avoid them in some cases, but the situations where this effect makes a real difference are pretty rare. In a worst case scenario, it can even help Survivors by spreading the gas clouds too far apart and creating gaps between them. If you want to enhance your slowdown bottles, the Ether 15 Vol% is a much better choice."
      },
      {
        "name": "Party Bottle",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/partybottle.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on has no effect and since the confetti is visible to Survivors, they will become immediately aware that you wasted an add-on slot. If you need the extra bloodpoints, don't worry about it though."
      },
      {
        "name": "Spirit of Hartshorn",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/spiritofhartshorn.png",
        "tierClass": "detrimental",
        "comment": "Increasing the size of yellow clouds is not particularly useful. At best, it can help to make sure that you don't accidentally walk past it and miss out on the effects. At worst, it could spill out too far and end up on the wrong side of a loop which could benefit Survivors. Definitely not worth running compared to other add-ons of its rarity."
      },
      {
        "name": "Redhead's Pinkie Finger",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/clown/redheadspinkiefinger.png",
        "tierClass": "detrimental",
        "comment": "This add-on provides a strong insta-down (if you can successfully land a direct hit with your bottle) but comes at the huge cost of limiting your maximum capacity to a single bottle. This greatly diminishes the versatility of your bottles and is typically not worth running over other add-ons unless you really know what you're doing. You might want to pair this with the green Thick Cork Stopper to at least reload faster after each bottle toss."
      }
    ]
  },
  "spirit": {
    "displayName": "Spirit,Rin",
    "addons": [
      {
        "name": "Rusty Flute",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/rustyflute.png",
        "tierClass": "strongest",
        "comment": "Provides a significant boost to the cooldown recovery speed after using your phase. Being able to use your power again sooner helps with your mobility and lethality. Pairs well with almost any other add-on that isn't related to recovery."
      },
      {
        "name": "Muddy Sports Day Cap",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/muddysportsdaycap.png",
        "tierClass": "strongest",
        "comment": "Increases the Spirit's movement speed while phasing, giving you more mobility (without any penalty to recovery) and making you harder to predict or react. Not a bad effect at all."
      },
      {
        "name": "White Hair Ribbon",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/whitehairribbon.png",
        "tierClass": "good",
        "comment": "Decreases the time it takes to begin your phasing. Doing so gives Survivors less time to create distance while you activate your power and makes everything easier for you. Can be stacked with its brown counterpart."
      },
      {
        "name": "Mother-Daughter Ring",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/motherdaughterring.png",
        "tierClass": "good",
        "comment": "Provides a significant boost to your phasing movement speed at the cost of not being able to see scratchmarks at all when using your power. Not very beginner-friendly, but still powerful in the hands of experienced Spirit players that rely mostly on sound cues. It can pair well with the purple Dried Cherry Blossom, since the downside of using this add-on is exactly the same."
      },
      {
        "name": "Dried Cherry Blossom",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/driedcherryblossom.png",
        "tierClass": "good",
        "comment": "Allows you to detect nearby Survivors with Killer Instinct during phase, but comes at the cost of not being able to see scratchmarks. This add-on removes a lot of sound-based counterplay from Survivors and can be quite useful, but some experienced players might prefer to rely on sound cues instead. It can pair well with the iridescent Mother-Daughter Ring, since the downside of using this add-on is exactly the same."
      },
      {
        "name": "Rin's Broken Watch",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/rinsbrokenwatch.png",
        "tierClass": "good",
        "comment": "Boosts the power recovery speed, allowing you to phase again sooner. Universally useful."
      },
      {
        "name": "Gifted Bamboo Comb",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/giftedbamboocomb.png",
        "tierClass": "good",
        "comment": "Decreases the time it takes to begin your phasing. It's a small but incredibly critical effect since it gives Survivors less time to create distance while you activate your power. Can be stacked with its green counterpart."
      },
      {
        "name": "Uchiwa",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/uchiwa.png",
        "tierClass": "decent",
        "comment": "This add-on provides a method to instantly recover your entire power after being stunned by a pallet. It can sometimes be quite effective (especially if you bring a build around it), but overall it's just less reliable than the regular recovery add-ons."
      },
      {
        "name": "Kintsugi Teacup",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/kintsugiteacup.png",
        "tierClass": "decent",
        "comment": "This add-on provides a method to instantly recover your entire power after breaking a pallet or breakable wall. Particularly useful in maps that have several breakable walls, but much less effective in the ones that don't. Survivors that have a keen understanding of the Spirit's cooldowns might be caught by surprise with this add-on, but overall it's just less reliable than the regular recovery add-ons."
      },
      {
        "name": "Zori",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/zori.png",
        "tierClass": "decent",
        "comment": "Increases the Spirit's movement speed while phasing, giving you more mobility (without any penalty to recovery) and making you harder to predict or react. A nice effect, but quite small."
      },
      {
        "name": "Origami Crane",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/origamicrane.png",
        "tierClass": "decent",
        "comment": "Boosts the power recovery speed, allowing you to phase again sooner. Less powerful than its green and blue counterparts, but still useful."
      },
      {
        "name": "Katana Tsuba",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/katanatsuba.png",
        "tierClass": "decent",
        "comment": "Increases your speed when coming out of a phase, allowing you to catch up a bit sooner or better yet, perform a lunge that approximately covers 1 meter of extra distance. Not a bad effect, but depending on your playstyle you might find this add-on somewhat unnecessary."
      },
      {
        "name": "Kaiun Talisman",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/kaiuntalisman.png",
        "tierClass": "decent",
        "comment": "Increases your maximum phasing duration by +1 second, which is an extra 20%. Keep in mind that longer power duration results in longer recovery time, so this effect isn't always needed. The extra second can still be quite useful in critical situations where you need the extra mobility."
      },
      {
        "name": "Furin",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/furin.png",
        "tierClass": "decent",
        "comment": "This add-on makes a map-wide sound to people further than 24m away from you when you are phasing. Perceptive Survivors will know when you're getting close and this add-on should have minimal effects against them. However, the map-wide sound might scare some Survivors into leaving generators or playing more passively. This can make perks like Dead Man's Switch a bit more effective."
      },
      {
        "name": "Shiawase Amulet",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/shiawaseamulet.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases your maximum phasing duration by +0.5 seconds, which is an extra 10%. Keep in mind that longer power duration results in longer recovery time, so this effect isn't extremely useful."
      },
      {
        "name": "Wakizashi Saya",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/wakizashisaya.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on gives you the unique ability to cancel your phase and reappear back at your starting husk location. Can be useful to pull off some mindgames but is otherwise extremely gimmicky. Generally speaking, Survivors always try to make distance away from you so teleporting back is not particularly useful."
      },
      {
        "name": "Senko Hanabi",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/senkohanabi.png",
        "tierClass": "almost-no-effect",
        "comment": "Briefly blocks window vaults near your starting phasing location. The effect sounds useful, but in practice Survivors will almost always run away from your starting location so it's extremely rare for this add-on to come into play."
      },
      {
        "name": "Juniper Bonsai",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/juniperbonsai.png",
        "tierClass": "almost-no-effect",
        "comment": "The Spirit has a passive ability which makes her body flicker and disappear briefly, which can occasionally throw Survivors off. This add-on slightly increases the frequency and duration of this effect. As the Killer, you have no way of knowing when this passive ability happens so it's impossible to use it actively during chase."
      },
      {
        "name": "Mother's Glasses",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/mothersglasses.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on triggers Killer Instinct on any Survivor that gets close to the husk that you leave behind when starting a phase. However, Survivors almost never run back into you when you use your power, so this add-on is extremely situational."
      },
      {
        "name": "Yakuyoke Amulet",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/spirit/yakuyokeamulet.png",
        "tierClass": "detrimental",
        "comment": "This add-on used to be very strong, but when they nerfed it they seemingly forgot to remove its penalty to movement speed. If you want extra duration for some reason, you're better off with the green counterpart which has no inherent downsides."
      }
    ]
  },
  "legion": {
    "displayName": "Legion",
    "addons": [
      {
        "name": "Iridescent Button",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/iridescentbutton.png",
        "tierClass": "strongest",
        "comment": "The ability to destroy pallets during Feral Frenzy is huge, especially if Survivors are clumsy and drop important pallets during this time. Great on its own, but also pairs well with the green Julie's Mix Tape and/or the perk &#34;Enduring&#34; so you can be completely fearless around any pallet."
      },
      {
        "name": "Fuming Mix Tape",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/fumingmixtape.png",
        "tierClass": "strongest",
        "comment": "Allows you to accurately determine the progress of gens from a distance while using your power. This reduces the need to bring information perks and can allow you to constantly have good awareness of the overall location of Survivors across the map. Particularly useful when trying to look for a specific Survivor that is trying to stay safe working on distant generators."
      },
      {
        "name": "Filthy Blade",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/filthyblade.png",
        "tierClass": "good",
        "comment": "Increases the mending timer of all Survivors, which can result in a lot of extra wasted time over the course of a match. Interestingly, it also affects the mending timer of any Deep Wound status effect, even ones not caused by your power."
      },
      {
        "name": "Friendship Bracelet",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/friendshipbracelet.png",
        "tierClass": "good",
        "comment": "The extended lunge that this add-on provides during Feral Frenzy makes it even easier to hit Survivors before they reach safety. Might not seem too impactful at first, but experienced players that understand just how far the lunge can reach will benefit a lot from running this add-on."
      },
      {
        "name": "Mischief List",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/mischieflist.png",
        "tierClass": "good",
        "comment": "Do not be deceived by the small numbers of this add-on, the extra 1 second duration that it provides is pretty useful and allows you to more consistently hit Survivors that would otherwise be out of reach. Very decent for its rarity."
      },
      {
        "name": "Etched Ruler",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/etchedruler.png",
        "tierClass": "good",
        "comment": "Inflicts 60 seconds of the Oblivious status effect on Survivors as soon as they are hit by Feral Frenzy. This has a minor downside of making them undetectable by your Killer Instinct if they mend. Despite this downside, the effect of this add-on is really powerful and can allow you to catch a Survivor by surprise when they believe that you've already left to target someone else. Particularly useful when ran together with the blue Stylish Sunglasses add-on."
      },
      {
        "name": "Stab Wounds Study",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/stabwoundsstudy.png",
        "tierClass": "decent",
        "comment": "Shows you the aura of Survivors that mend themselves, allowing you to ambush vulnerable targets or simply gain awareness of their location to help in your decision-making. A useful effect, but unfortunately easy to miss and can still be prevented by some Survivor perks that conceal their auras."
      },
      {
        "name": "Stylish Sunglasses",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/stylishsunglasses.png",
        "tierClass": "decent",
        "comment": "Shows you the auras of Survivors mending within 24 meters of you. Not always extremely useful, but pairs very well with the green Etched Ruler since the Survivors won't hear your approach."
      },
      {
        "name": "Susie's Mix Tape",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/susiesmixtape.png",
        "tierClass": "decent",
        "comment": "Significantly extends the detection range of your Killer Instinct, which is typically 40m, now making it 60m in total. This provides a great level of awareness even in larger maps, making it easier to tell where everyone is once you've already hit someone. Keep in mind, however, that very distant Survivors won't always be easily reached. You might have to simply remember their location and cancel your power early so it's ready to be used again when you close the gap normally. Oddly enough, this add-on can help you detect people even when your Terror Radius would be zero."
      },
      {
        "name": "Mural Sketch",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/muralsketch.png",
        "tierClass": "decent",
        "comment": "Increases the bonus movement speed that you get for each consecutive hit in Feral Frenzy, giving you a nice boost of speed (and thus, distance). Not bad at all, although the distance gained is not as signficant as the one gained from the brown Mischief List add-on."
      },
      {
        "name": "Never-Sleep Pills",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/neversleeppills.png",
        "tierClass": "decent",
        "comment": "Makes your Feral Frenzy significantly slower but basically doubles its duration. This effect can be devastating against uncoordinated Survivors since the massive extra duration will give you plenty of time to catch up to almost anyone on the map. Pairs pretty well with the green Mural Sketch to compensate for the loss of speed. Against better teams, however, you will find that this add-on is ultimately not that strong. Coordinated Survivors can bodyblock for each other, preventing you from hitting a non-mending target and resetting your power completely. The slower speed in Feral Frenzy can also make your first hit very difficult and be very punishing if you make any mistakes at all."
      },
      {
        "name": "The Legion Pin",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/thelegionpin.png",
        "tierClass": "decent",
        "comment": "Inflicts the Broken status effect on Survivors that mend their own wounds. Not extremely impactful (since being injured against the Legion is pretty common), but you might find this effect useful if you have a build that benefits from keeping multiple Survivors injured for some particular reason."
      },
      {
        "name": "Julie's Mix Tape",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/juliesmixtape.png",
        "tierClass": "decent",
        "comment": "Completely refills your power upon being stunned by a pallet, making it far easier to get your first hit going even if you make a small mistake. Obviously, being stunned will still reset your power so you won't be able to easily chain four Feral Frenzy hits anymore if this happens. Still, it is a comfortable add-on to run for beginners and works particularly well with the perk &#34;Enduring&#34; if you want to become fearless around pallets. More advanced players will probably find other add-ons more appealing."
      },
      {
        "name": "Defaced Smiley Pin",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/defacedsmileypin.png",
        "tierClass": "decent",
        "comment": "Inflicts the Mangled status effect on Survivors that mend their own wounds. Might seem useful, but healing against the Legion is often a very pointless exercise due to how easy it is for Survivors to become injured again."
      },
      {
        "name": "Stolen Sketch Book",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/stolensketchbook.png",
        "tierClass": "almost-no-effect",
        "comment": "Makes Survivors drop their items starting on your second chained hit during Feral Frenzy. If you need to, you can even double-tap a single Survivor to achieve this effect if you don't mind losing your power immediately. Dropped items do not lose charges but they can waste a small amount of the Survivor's time if they want to retrieve them. Ultimately, this add-on is simply not that important since the Legion is already capable of neutralizing medkits (Survivors cannot use them while in Deep Wound). You might find some utility with certain item-related perks such as &#34;Hoarder&#34; or &#34;Weave Attunement&#34;."
      },
      {
        "name": "BFFs",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/bffs.png",
        "tierClass": "almost-no-effect",
        "comment": "A very unique add-on that provides a permanent Haste status effect in the endgame if you accumulate enough tokens. Hitting multiple Survivors in a row builds up tokens, and you can even hit the same Survivor twice if you need some extra ones quickly before the endgame. This add-on is generally not extremely reliable but it's fun, unexpected and pairs well with endgame builds if you want to give it a try."
      },
      {
        "name": "Scratched Ruler",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/scratchedruler.png",
        "tierClass": "almost-no-effect",
        "comment": "The faster recovery is quite helpful for beginners that lose their power before a hit often. More advanced players won't find much of a need for this add-on."
      },
      {
        "name": "Smiley Face Pin",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/smileyfacepin.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts the Blindness status effect on Survivors that mend their own wounds. Can occasionally mess with Survivors a bit, but the effect itself is often not very impactful."
      },
      {
        "name": "Frank's Mix Tape",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/franksmixtape.png",
        "tierClass": "almost-no-effect",
        "comment": "An incredibly situational add-on that typically offers no real value. You should almost never kick generators or breakable walls during your power anyway."
      },
      {
        "name": "Joey's Mix Tape",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/legion/joeysmixtape.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts the Haemorrhage status effect on Survivors that mend their own wounds. Might seem useful, but healing against the Legion is often a very pointless exercise due to how easy it is for Survivors to become injured again."
      }
    ]
  },
  "plague": {
    "displayName": "Plague,Adiris",
    "addons": [
      {
        "name": "Iridescent Seal",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/iridescentseal.png",
        "tierClass": "strongest",
        "comment": "If paired with perks to prevent generators from being repaired simultaneously (mostly No Holds Barred), this add-on can guarantee at least 5 or 6 uses of your power. Paired with the Devotee's Amulet, this gives you roughly 5 minutes of power throughout the game, which is very deadly."
      },
      {
        "name": "Black Incense",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/blackincense.png",
        "tierClass": "strongest",
        "comment": "The information provided by this add-on can be very impactful, especially if Survivors don't realize it's being used (which is a common occurrence if nobody is running Distortion or Object of Obsession)."
      },
      {
        "name": "Ashen Apple",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/ashenapple.png",
        "tierClass": "good",
        "comment": "Very similar to the green Apple, but spawns one extra fountain. This brings some small advantages and disadvantages, including the fact that corrupting all pools at once becomes slightly harder."
      },
      {
        "name": "Blessed Apple",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/blessedapple.png",
        "tierClass": "good",
        "comment": "Gives an extra guaranteed pre-corrupted fountain, giving another 60 seconds of power and increasing the chance that one of your fountains will be at a very advantageous spot that's easy to reach."
      },
      {
        "name": "Devotee's Amulet",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/devoteesamulet.png",
        "tierClass": "good",
        "comment": "The extra 20 seconds of power are decent on their own, but extremely deadly when paired with the Iridescent Seal, since they are guaranteed to happen at least 5 or 6 times. Otherwise, it's typically better to bring an Apple instead."
      },
      {
        "name": "Severed Toe",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/severedtoe.png",
        "tierClass": "good",
        "comment": "This add-on increases the infection rate when Survivors do anything other than stand still or walk. That means that anyone running or repairing will become broken much faster. Stacks nicely with the Prayer Tablet Fragment."
      },
      {
        "name": "Prayer Tablet Fragment",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/prayertabletfragment.png",
        "tierClass": "good",
        "comment": "A deceivingly strong add-on that has one major downside but several effects that make up for it. Notably, it makes object infections last a very long time and accelerates the rate at which Survivors become infected when working on them. If used properly with an appropriate build, it can be quite powerful. Just remember that you will NOT be able to directly infect Survivors when running this add-on, you will need to instead puke on elements of the map that they will interact with."
      },
      {
        "name": "Rubbing Oil",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/rubbingoil.png",
        "tierClass": "decent",
        "comment": "Decreases the time it takes for you to shoot your projectiles, which is very helpful considering the slow projectile speed of the Plague's puke. This add-on affects both red and green puke."
      },
      {
        "name": "Potent Tincture",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/potenttincture.png",
        "tierClass": "decent",
        "comment": "This add-on makes your recovery after each puke a little bit faster, and affects both types of puke. Keep in mind that even with this add-on, Survivors have an invulnerability period and cannot be hit twice in quick succession with the red puke. Faster recovery also means that you regain your normal movement speed sooner."
      },
      {
        "name": "Healing Salve",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/healingsalve.png",
        "tierClass": "decent",
        "comment": "This add-on makes your recovery after each puke a little bit faster, and affects both types of puke. Keep in mind that even with this add-on, Survivors have an invulnerability period and cannot be hit twice in quick succession with the red puke. Faster recovery also means that you regain your normal movement speed sooner."
      },
      {
        "name": "Haematite Seal",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/haematiteseal.png",
        "tierClass": "decent",
        "comment": "Extending the infection timer on all objects is very useful in the early game and can force passive players to be very inefficient. Not too useful against aggressive teams or once everyone is already infected."
      },
      {
        "name": "Limestone Seal",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/limestoneseal.png",
        "tierClass": "decent",
        "comment": "Extending the infection timer on all objects is very useful in the early game and can force passive players to be very inefficient. Not too useful against aggressive teams or once everyone is already infected."
      },
      {
        "name": "Infected Emetic",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/infectedemetic.png",
        "tierClass": "decent",
        "comment": "The increased infection from direct puking can sometimes lead to almost immediate full infections but obviously has no effect during Corrupt Purge (red puke). The effects are undeniably strong when used correctly, but sometimes it's best to infect Survivors just a little and move on. Do not keep attempting to fully infect a Survivor in chase if it's not working."
      },
      {
        "name": "Emetic Potion",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/emeticpotion.png",
        "tierClass": "decent",
        "comment": "The increased infection from direct puking can sometimes lead to almost immediate full infections but obviously has no effect during Corrupt Purge (red puke). The effects are undeniably strong when used correctly, but sometimes it's best to infect Survivors just a little and move on. Do not keep attempting to fully infect a Survivor in chase if it's not working."
      },
      {
        "name": "Worship Tablet",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/worshiptablet.png",
        "tierClass": "decent",
        "comment": "Increases your movement from 110% (4.4m/s) to 115% (4.6m/s) when holding your Corrupt Purge (red puke). Holding the attack and moving at full Killer speed can make certain loops feel completely inescapable (and will also likely catch some Survivors by surprise). This add-on also slightly speeds up the animation of drinking from a fountain. These effects are nice but they're often not worth the add-on slot compared to other choices."
      },
      {
        "name": "Vile Emetic",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/vileemetic.png",
        "tierClass": "almost-no-effect",
        "comment": "The increase to your projectile speed is not very noticeable, since it's already pretty slow. However, this add-on also indirectly increases the maximum range that you can reach with both types of puke and makes it slightly easier to pull off some fancy tricks. Experienced players might want to experiment with it, but this is generally not recommended for beginners."
      },
      {
        "name": "Incensed Ointment",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/incensedointment.png",
        "tierClass": "almost-no-effect",
        "comment": "Finding people around your fountain seems useful, but most of the times you should not be drinking from a fountain if you don't already have a solid idea of where at least some Survivors might be. If you want to guarantee that you get to use your power, other add-ons are simply better."
      },
      {
        "name": "Olibanum Incense",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/olibanumincense.png",
        "tierClass": "almost-no-effect",
        "comment": "A decent add-on for beginners that still struggle to track Survivors during a match. Experienced players can use the white aura of the fountain that just appeared to figure out where the cleansing took place, making this add-on slightly redundant."
      },
      {
        "name": "Exorcism Amulet",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/exorcismamulet.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on has a similar effect to the Devotee's Amulet, but there's never a situation where it's preferable to use it. If you want an add-on to pair with Iridescent Seal, the Devotee's Amulet is just superior. If you want to increase the overall duration and reliability of your power, the Apple add-ons are much better as well."
      },
      {
        "name": "Prophylactic Amulet",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/plague/prophylacticamulet.png",
        "tierClass": "detrimental",
        "comment": "This add-on removes two Pools of Devotion from the map, making it slightly easier for Survivors to cleanse and corrupt all available fountains. In some rare scenarios, this can be a positive outcome, but on average it is highly detrimental for you."
      }
    ]
  },
  "ghostface": {
    "displayName": "Ghostface",
    "addons": [
      {
        "name": "Outdoor Security Camera",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/outdoorsecuritycamera.png",
        "tierClass": "strongest",
        "comment": "Provides critical information about the position of all Survivors as long as you're going for marked downs. The duration can be extended for even longer with the perk Lethal Pursuer, which is pretty good on Ghostface already. However, it can be slightly unreliable when Survivors bring perks to conceal their aura."
      },
      {
        "name": "Drop-Leg Knife Sheath",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/droplegknifesheath.png",
        "tierClass": "good",
        "comment": "The haste effect is really useful to catch Survivors at small loops and make up for the small delay that you incur when stalking someone briefly. Quite impactful in the hands of a seasoned player, but tnot too useful if you don't plan to stalk people or if Survivors are completely clueless about your position."
      },
      {
        "name": "&#34;Ghost Face Caught on Tape&#34;",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/ghostfacecaughtontape.png",
        "tierClass": "good",
        "comment": "Recovery immediately after a down allows you to go back into stealth immediately or play aggressively and stalk someone else before picking up, both of which are really useful. Pairs well with a number of other add-ons, such as the green Chewed Pen since the person that you downed won't be able to quickly reveal you anymore."
      },
      {
        "name": "Olsen's Wallet",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/olsenswallet.png",
        "tierClass": "good",
        "comment": "Allows you to skip your power cooldown entirely when you break a pallet or wall, which sometimes allows you to fully stalk unsuspecting Survivors during chase. Particularly useful in pallet-dense maps."
      },
      {
        "name": "&#34;Philly&#34;",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/philly.png",
        "tierClass": "good",
        "comment": "Making each Survivor easier to fully stalk by 10% is a decent effect for an add-on of this rarity."
      },
      {
        "name": "Driver's License",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/driverslicense.png",
        "tierClass": "good",
        "comment": "One of the few add-ons that can affect generator progress. Can be extremely game-changing if you're lucky enough to use it multiple times. Not as useful in certain maps where the line of sight is very limited."
      },
      {
        "name": "Walleye's Matchbook",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/walleyesmatchbook.png",
        "tierClass": "good",
        "comment": "This add-on shortens the already short power cooldown another 2 seconds. Decent effect by itself, especially considering its rarity. Does not pair well with other add-ons that automatically recover your power like the blue Olsen's Wallet."
      },
      {
        "name": "Olsen's Address Book",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/olsensaddressbook.png",
        "tierClass": "decent",
        "comment": "The aura reading during chase can sometimes come in clutch, but keep in mind that you should generally not mark Survivors unless you're confident that they'll go down shortly. Don't forget that some perks can also hide their auras from you, making this add-on sometimes unreliable."
      },
      {
        "name": "Night Vision Monocular",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/nightvisionmonocular.png",
        "tierClass": "decent",
        "comment": "Exhausting Survivors can make chases more predictable, even though it's not always valuable. With this add-on, you might sometimes want to purposefully allow a Survivor to reveal you before a hit to ensure that it triggers."
      },
      {
        "name": "Victim's Detailed Routine",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/victimsdetailedroutine.png",
        "tierClass": "decent",
        "comment": "Exhausting Survivors can make chases more predictable. This one exhausts a Survivor after you fully mark them, preventing thing such as a last second Sprint Burst from activating. You could even go out of your way to mark already injured Survivors to prevent Dead Hard, for example. Not a terrible effect but slightly redundant sometimes."
      },
      {
        "name": "Chewed Pen",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/chewedpen.png",
        "tierClass": "decent",
        "comment": "By extending the amount of time a Survivor on the ground needs to reveal you, this add-on allows you to easily stalk someone else for a brief moment and leave them for later. Pairs very well with the &#34;Caught on Tape&#34; add-on."
      },
      {
        "name": "Lasting Perfume",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/lastingperfume.png",
        "tierClass": "decent",
        "comment": "By extending the amount of time a Survivor on the hook needs to reveal you, this add-on allows you to easily stalk coming for an unhook at the last moment. It also makes it almost impossible for a hooked Survivor to reveal you while you walk away from the hook."
      },
      {
        "name": "Knife Belt Clip",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/knifebeltclip.png",
        "tierClass": "decent",
        "comment": "The smaller terror radius is not as useful as it might sound, since crouching will also reduce your movement speed. However, paired with &#34;Monitor & Abuse&#34;, you can have a ridiculously small terror radius allowing stealth even outside of your power. Can be used as a gimmick to throw off Survivors."
      },
      {
        "name": "Telephoto Lens",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/telephotolens.png",
        "tierClass": "almost-no-effect",
        "comment": "The obliviousness effect is slightly redundant on a stealth Killer, but the effect can be triggered often and might leave some Survivors guessing about your actual location for a while. A very passive add-on that is not too bad for beginners."
      },
      {
        "name": "Cheap Cologne",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/cheapcologne.png",
        "tierClass": "almost-no-effect",
        "comment": "The extra marked duration is not a bad effect per se, but you should almost never stalk someone fully if you're not confident that you can down them in a short period of time. That being said, this add-on can still be useful to keep a Survivor vulnerable for an extended period of time so that they have a difficult time being altruistic."
      },
      {
        "name": "Olsen's Journal",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/olsensjournal.png",
        "tierClass": "almost-no-effect",
        "comment": "The obliviousness effect is slightly redundant on a stealth Killer, especially considering that a marked Survivor cannot reveal you out of your power. You also should generally not mark people unless you expect to down them very soon. That being said, if you fail to down a Survivor, this add-on could keep them guessing for a while."
      },
      {
        "name": "Headline Cut-Outs",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/headlinecutouts.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on noticeably increases your movement when you hold the stalk button and move at the same time. However, when actively stalking a Survivor, your movement speed drops very dramatically and the effect of this add-on is very small. On top of that, you generally want to stalk while leaning out of cover, so this add-on is completely useless in those scenarios. Using the Drop-Leg Knife Sheath is a much better alternative if you want to increase your movement speed."
      },
      {
        "name": "Leather Knife Sheath",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/leatherknifesheath.png",
        "tierClass": "almost-no-effect",
        "comment": "Gives a decent boost to your movement speed while crouched, but this isn't all that useful. You should not travel around the map crouched anyway. Using the crouch to avoid being revealed or to temporarily hide your exact position behind a small loop is a decent strategy, but you can also do it without this add-on."
      },
      {
        "name": "Marked Map",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/markedmap.png",
        "tierClass": "almost-no-effect",
        "comment": "It's already typically pretty easy to tell the location of the Survivor that revealed you, so this add-on doesn't help too much. Ideally, you should also not aim to be revealed too often by Survivors."
      },
      {
        "name": "Cinch Straps",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghostface/cinchstraps.png",
        "tierClass": "detrimental",
        "comment": "This add-on might seem useful for beginners that are afraid of losing their power due to a missed attack, but it's actually really detrimental. Sometimes, you might want to purposefully miss an attack to reset your cooldown and have your power ready at a specific moment. This add-on completely prevents you from doing that and should generally be avoided."
      }
    ]
  },
  "demogorgon": {
    "displayName": "Demogorgon",
    "addons": [
      {
        "name": "Barb's Glasses",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/barbsglasses.png",
        "tierClass": "strongest",
        "comment": "The Demogorgon is already very good at zoning Survivors into unfavorable corners, and this add-on allows you to capitalize on this strength even further. The quicker recovery after breaking pallets or walls makes it harder for Survivors to reach the next loop without being hit."
      },
      {
        "name": "Black Heart",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/blackheart.png",
        "tierClass": "strongest",
        "comment": "The slightly faster recovery after a successful shred attack isn't always game-changing, but it is a very consistently useful effect. Also makes it much easier to deal with bodyblocks from altruistic Survivors and similar situations."
      },
      {
        "name": "Leprose Lichen",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/leproselichen.png",
        "tierClass": "good",
        "comment": "Allows you to quickly gather information about the location of Survivors, potentially revealing all of them if you're lucky enough. This information isn't always consistent, but it's still a very decent effect compared to the rest of the add-ons available."
      },
      {
        "name": "Red Moss",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/redmoss.png",
        "tierClass": "good",
        "comment": "The very long extra Undetectable duration allows you to cover a large portion of the map while trying to catch Survivors off-guard. Keep in mind that this add-on makes your animation coming out of a portal quieter, but Survivors still hear a map-wide sound. Alert Survivors won't always get caught off-guard even with this add-on."
      },
      {
        "name": "Mews' Guts",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/mewsguts.png",
        "tierClass": "good",
        "comment": "Allows you to recover faster after a missed shred attack. This helps you when Survivors crouch under your shred, and also allows you to recover even faster when launching yourself with a shred from an elevated area. Keep in mind that the cooldown after hitting an obstacle does not count as a missed attack and won't benefit from this add-on. The extra portal is also a nice bonus, especially considering the fact that portals cannot be easily removed or replaced."
      },
      {
        "name": "Lifeguard Whistle",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/lifeguardwhistle.png",
        "tierClass": "good",
        "comment": "Increases your portal count by two. This gives you a bit more room for mistakes and allows you to control more areas of the map if that's your preferred playstyle. Just keep in mind that the green Mews' Guts does something similar but also gives another useful effect."
      },
      {
        "name": "Vermilion Webcap",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/vermilionwebcap.png",
        "tierClass": "good",
        "comment": "The extra stealth that this add-on provides stacks nicely with the default Undetectable duration, allowing you to sometimes catch Survivors off-guard. Not too impactful otherwise."
      },
      {
        "name": "Rat Liver",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/ratliver.png",
        "tierClass": "decent",
        "comment": "The slight increase to your movement speed while charging your shred is not too noticeable in most scenarios, but can sometimes make a difference in chase."
      },
      {
        "name": "Rat Tail",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/rattail.png",
        "tierClass": "decent",
        "comment": "Simple effect, but saves you quite a bit of time when placing a portal, allowing to reposition faster after you hook someone or if you need to return to a certain area."
      },
      {
        "name": "Upside Down Resin",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/upsidedownresin.png",
        "tierClass": "decent",
        "comment": "A simple effect, but pairs well with other add-ons to increase the defensive and tracking utility of portals. Still, not extremely worth bringing over the other add-ons that have more impactful effects."
      },
      {
        "name": "Eleven's Soda",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/elevenssoda.png",
        "tierClass": "decent",
        "comment": "Gives you occasional information about which generators are being repaired, although you can't always rely on it."
      },
      {
        "name": "Rotten Green Tripe",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/rottengreentripe.png",
        "tierClass": "decent",
        "comment": "Provides a noticeable boost to your portal traversing speed. Not as strong as the Deer Lung, but this one has no downsides."
      },
      {
        "name": "Violet Waxcap",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/violetwaxcap.png",
        "tierClass": "decent",
        "comment": "Increasing the undetectable period after a teleport is relatively useful, but this add-on only does it for 1 extra second. It's completely outclassed by its purple counterpart, the Vermillion Webcap."
      },
      {
        "name": "Sticky Lining",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/stickylining.png",
        "tierClass": "decent",
        "comment": "The extra detection radius is actually fairly useful and pairs well with other add-ons that revolve around portals. This add-on allows to reliably detect Survivors near generators even when the portal is a bit far away."
      },
      {
        "name": "Thorny Vines",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/thornyvines.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the utility of active portals and pairs well with other add-ons geared towards defensive portal strategies."
      },
      {
        "name": "Brass Case Lighter",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/brasscaselighter.png",
        "tierClass": "almost-no-effect",
        "comment": "The 60 seconds of Blindness is a decent effect, but it is very difficult to ensure that it will affect Survivors consistently. To increase its effectiveness, try placing it at chokepoints that Survivors must pass to reach their objective. The portal must be active for this effect to trigger at all."
      },
      {
        "name": "Unknown Egg",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/unknownegg.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on shortens the cooldown between teleports, allowing you to use a portal again much faster. However, it's very rare to find yourself in a situation where you need to teleport twice in a row quickly. For that reason, the effect of this add-on is almost entirely unnecessary."
      },
      {
        "name": "Viscous Webbing",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/viscouswebbing.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on has a very minimal effect on the portal destruction speed from Survivors, and obviously has no effect at all if Survivors choose to ignore them or you don't set that many portals up in the first place. Its effects are also completely outclassed by the superior purple Upside Down Resin."
      },
      {
        "name": "Deer Lung",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/deerlung.png",
        "tierClass": "detrimental",
        "comment": "Provides a noticeable boost to your portal traversing speed but has the unfortunate downside of limiting your portal amount. You don't always use all of your portals, but in some situations you will find that only having four portals can be highly detrimental. Using the green Rotten Green Tripe  a similar effect can be achieved without any downsides."
      },
      {
        "name": "Rotten Pumpkin",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/demogorgon/rottenpumpkin.png",
        "tierClass": "detrimental",
        "comment": "This add-on destroys a portal as you use it, which gives you the ability to remove portals that you no longer want around. However, since placing portals is already a time consuming action, this add-on forces you to spend even more time doing so. Could be paired with the Deer Lung to offset its downside, but even then, it's not generally worth it."
      }
    ]
  },
  "oni": {
    "displayName": "Oni",
    "addons": [
      {
        "name": "Lion Fang",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/lionfang.png",
        "tierClass": "strongest",
        "comment": "Extends the maximum duration of Blood Fury by an additional 10 seconds (with the default duration being ~45 seconds). The longer duration is particularly useful in situations where you down multiple Survivors, since each down typically causes a penalty to your remaining Blood Fury timer. Additionally, since your overall timer is longer, exiting your power early will result in having more charges left over. This makes it easier to quickly regain it again. Stacks with other add-ons of its type."
      },
      {
        "name": "Splintered Hull",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/splinteredhull.png",
        "tierClass": "strongest",
        "comment": "Increases the frequency at which Survivors passively drop orbs when injured and also makes them drop one additional orb every time they perform certain actions. Can be stacked with its blue counterpart, but it's generally not necessary as the effects of a single add-on are strong enough on their own. The increased blood spawn is incredibly helpful and makes it much easier to gain your power during your first chase or after finding a spot where a Survivor has healed or repaired while they were injured. Keep in mind that orbs temporarily disappear during Blood Fury mode, so this add-on has no effect during its duration."
      },
      {
        "name": "Wooden Oni Mask",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/woodenonimask.png",
        "tierClass": "strongest",
        "comment": "Increases the frequency at which Survivors passively drop orbs when injured and also makes them drop one additional orb every time they perform certain actions. Can be stacked with its purple counterpart, but it's generally not advised as the effects of a single add-on are strong enough on their own. The increased blood spawn is incredibly helpful and makes it much easier to gain your power during your first chase or after finding a spot where a Survivor has healed or repaired while they were injured. Keep in mind that orbs temporarily disappear during Blood Fury mode, so this add-on has no effect during its duration."
      },
      {
        "name": "Akito's Crutch",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/akitoscrutch.png",
        "tierClass": "strongest",
        "comment": "Increases the movement speed when dashing during Blood Fury. This makes the power slightly harder to control but also provides a boost to map mobility and makes you harder to predict during chase. The main benefit of having this additional speed is the fact that you can become lethal in certain smaller loops that would be playable for Survivors with your default movement speed. At higher levels of play, this add-on can arguably become one of Oni's best."
      },
      {
        "name": "Yamaoka Sashimono",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/yamaokasashimono.png",
        "tierClass": "good",
        "comment": "Extends the maximum duration of Blood Fury by an additional 8 seconds (with the default duration being ~45 seconds). The longer duration is particularly useful in situations where you down multiple Survivors, since each down typically causes a penalty to your remaining Blood Fury timer. Additionally, since your overall timer is longer, exiting your power early will result in having more charges left over. This makes it easier to quickly regain it again. Stacks with other add-ons of its type."
      },
      {
        "name": "Chipped Saihai",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/chippedsaihai.png",
        "tierClass": "good",
        "comment": "Extends the maximum duration of Blood Fury by an additional 6 seconds (with the default duration being ~45 seconds). The longer duration is particularly useful in situations where you down multiple Survivors, since each down typically causes a penalty to your remaining Blood Fury timer. Additionally, since your overall timer is longer, exiting your power early will result in having more charges left over. This makes it easier to quickly regain it again. Stacks with other add-ons of its type."
      },
      {
        "name": "Kanai-Anzen Talisman",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/kanaianzentalisman.png",
        "tierClass": "good",
        "comment": "Increases the movement speed when dashing during Blood Fury. This makes the power slightly harder to control but also provides a boost to map mobility and makes you harder to predict during chase. The main benefit of having this additional speed is the fact that you can become lethal in certain smaller loops that would be playable for Survivors with your default movement speed."
      },
      {
        "name": "Scalped Topknot",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/scalpedtopknot.png",
        "tierClass": "good",
        "comment": "Reduces the charge time of your dash during Blood Fury, allowing you to begin your sprint a bit sooner. The effect is very small to make a difference when it comes to map mobility but it does help a lot in chase, since it gives Survivors less time to react to an incoming dash. A pretty comfortable add-on to use, although high-level Oni players typically favor other add-ons."
      },
      {
        "name": "Renjiro's Bloody Glove",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/renjirosbloodyglove.png",
        "tierClass": "decent",
        "comment": "This add-on makes the blood orbs turn into a source of information. Survivors near them will automatically absorb them and reveal their aura for a brief moment. Not a terrible effect, but not extremely reliable either. Keep in mind that all orbs are gone while you're in Blood Fury mode, so this add-on does absolutely nothing once you start using your power and only starts working again when Blood Fury ends."
      },
      {
        "name": "Iridescent Family Crest",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/iridescentfamilycrest.png",
        "tierClass": "decent",
        "comment": "Allows to quickly check if anyone is near by missing an attack during Blood Fury. Quite a useful effect, but the range is quite limited and you should generally not use your power if you're not already aware of Survivor locations."
      },
      {
        "name": "Tear-Soaked Tenugui",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/tearsoakedtenugui.png",
        "tierClass": "decent",
        "comment": "This add-on decreases the penalty that you incur every time you down a Survivor with your power. If you down several Survivors, the effects will be more noticeable and your power will last longer than it would otherwise. However, this add-on is completely outclassed by all three duration add-ons, which also result in more power duration but without any conditions. Additionally, if you grab a Survivor (for example, out of a locker) the penalty to your power gauge is zero, which means that this add-on will have no effect whatsoever."
      },
      {
        "name": "Ink Lion",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/inklion.png",
        "tierClass": "decent",
        "comment": "Very similar to the brown add-on Cracked Sakazuki, but with a small extra effect. Not too bad."
      },
      {
        "name": "Cracked Sakazuki",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/crackedsakazuki.png",
        "tierClass": "decent",
        "comment": "Slightly speeds up the animation of entering and leaving Blood Fury. Not a hugely impactful effect, but not too bad for its rarity. Keep in mind that if you grab a Survivor during your power, you'll completely skip the animation and not benefit from the faster exiting animation."
      },
      {
        "name": "Bloody Sash",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/bloodysash.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on and its brown counterpart provide a noticeable boost to your movement speed while gathering blood orbs. However, you don't typically do this for very long so the effect is not very impactful."
      },
      {
        "name": "Blackened Toenail",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/blackenedtoenail.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on and its green counterpart provide a noticeable boost to your movement speed while gathering blood orbs. However, you don't typically do this for very long so the effect is not very impactful."
      },
      {
        "name": "Child's Wooden Sword",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/childswoodensword.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on only helps you find orbs that are hidden behind obstacles. Orbs in the open are still visible from afar."
      },
      {
        "name": "Rotting Rope",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/rottingrope.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on only helps you find orbs that are hidden behind obstacles. Orbs in the open are still visible from afar."
      },
      {
        "name": "Shattered Wakizashi",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/shatteredwakizashi.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on increases your passive gain of power over time. Even though the numbers look pretty high, the speed at which you obtain your power is still painfully slow even if you stack both of these add-ons. On top of that, this add-on doesn't help you if your power is almost complete, since it doesn't go past the 98% cap."
      },
      {
        "name": "Polished Maedate",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/polishedmaedate.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on increases your passive gain of power over time. Even though the numbers look pretty high, the speed at which you obtain your power is still painfully slow even if you stack both of these add-ons. On top of that, this add-on doesn't help you if your power is almost complete, since it doesn't go past the 98% cap."
      },
      {
        "name": "Paper Lantern",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/oni/paperlantern.png",
        "tierClass": "almost-no-effect",
        "comment": "Accelerates the rate at which blood orbs are dragged to you when you hold your power button. This effect is almost entirely useless, as they're already pretty fast and you typically absorb orbs from a very short distance anyway."
      }
    ]
  },
  "deathslinger": {
    "displayName": "Deathslinger",
    "addons": [
      {
        "name": "Iridescent Coin",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/iridescentcoin.png",
        "tierClass": "strongest",
        "comment": "The ability to occasionally instadown Survivors is extremely game-changing and should never be ignored. Even after Survivors become aware of its presence, this add-on will continue to exert pressure on them since they'll never be safe whenever they are in the open. To know if a Survivor has been affected by this add-on, look at the Bloodpoint score event; if it's &#34;Sharpshooter&#34; (400) you will be able to instadown them. If it's &#34;Speared&#34; (200) you were too close."
      },
      {
        "name": "Warden's Keys",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/wardenskeys.png",
        "tierClass": "good",
        "comment": "Increases your reload speed, which is universally useful. During chase, a faster reload can sometimes allow you to shoot a Survivor again before they reach safety."
      },
      {
        "name": "Bayshore's Cigar",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/bayshorescigar.png",
        "tierClass": "good",
        "comment": "Reduces the stun that occurs when injuring a Survivor via chain break by 0.75 seconds. This super fast recover sometimes allows you to catch a Survivor again almost immediately before they can reach safety. Can be stacked with its green counterpart."
      },
      {
        "name": "Modified Ammo Belt",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/modifiedammobelt.png",
        "tierClass": "good",
        "comment": "Increases your reload speed, which is universally useful. During chase, a faster reload can sometimes allow you to shoot a Survivor again before they reach safety."
      },
      {
        "name": "Tin Oil Can",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/tinoilcan.png",
        "tierClass": "good",
        "comment": "Reduces the cooldown that happens after a missed shot by 0.5 seconds, which allows you to get back into the chase sooner. A deceivingly strong effect, even for advanced players that don't miss very often. This add-on is often overlooked in favor of the simpler and more universally useful reload add-ons."
      },
      {
        "name": "Rusted Spike",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/rustedspike.png",
        "tierClass": "decent",
        "comment": "Applies a Mangled effect upon hitting speared Survivors, which lasts 60 seconds. A simple and useful effect, although the Deathslinger's gameplay isn't always fast-paced enough to really make the Mangled effect a huge deal."
      },
      {
        "name": "Chewing Tobacco",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/chewingtobacco.png",
        "tierClass": "decent",
        "comment": "Reduces the stun that occurs when injuring a Survivor via chain break by 0.25 seconds. Can be stacked with its purple counterpart, though you're typically better off with a reload add-on instead."
      },
      {
        "name": "Honey Locust Thorn",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/honeylocustthorn.png",
        "tierClass": "decent",
        "comment": "Applies a Mangled effect upon breaking a chain, which lasts 70 seconds. Not terrible but also not always impactful enough to be worth running."
      },
      {
        "name": "Gold Creek Whiskey",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/goldcreekwhiskey.png",
        "tierClass": "decent",
        "comment": "Reduces your terror radius by a significant amount (-8 meters) when holding your aim. Unlike its green counterpart, this one's effect are strong enough to be used on their own. This add-on can be paired with the perk &#34;Monitor & Abuse&#34; to temporarily achieve a 16 meter TR and make it easier to sneak up on Survivors, which is very effective with the insta-down capabilities of the Iridescent Coin. Keep in mind that the Deathslinger maximum range is 18 meters, so you can manage to spear a Survivor that doesn't even hear your terror radius. Needless to say, this strategy is much stronger on certain maps."
      },
      {
        "name": "Barbed Wire",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/barbedwire.png",
        "tierClass": "decent",
        "comment": "The longer mending timer is also applied to any other instances that cause Deep Wound, such as being hit immediately upon being unhooked."
      },
      {
        "name": "Hellshire Iron",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/hellshireiron.png",
        "tierClass": "decent",
        "comment": "Provides a very brief Undetectable Status effect that lingers for a few seconds after spearing a Survivor. It might catch Survivors by surprise sometimes, but the effect itself isn't particularly consistent or powerful."
      },
      {
        "name": "Prison Chain",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/prisonchain.png",
        "tierClass": "decent",
        "comment": "Increases your chain's durability by 10%, making it easier to pull and hit Survivors before they break out. Sounds powerful, but the effect is surprisingly unnecessary in almost every scenario and the longer durability makes it more time consuming to break your own chain on purpose if you plan to use Bayshore's Cigar or other similar add-ons."
      },
      {
        "name": "Poison Oak Leaves",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/poisonoakleaves.png",
        "tierClass": "decent",
        "comment": "The longer mending timer is also applied to any other instances that cause Deep Wound, such as being hit immediately upon being unhooked."
      },
      {
        "name": "Spit Polish Rag",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/spitpolishrag.png",
        "tierClass": "decent",
        "comment": "Reduces the cooldown that happens after a missed shot by 0.25 seconds, which allows you to get back into the chase sooner. A small effect, but still quite useful especially for beginners."
      },
      {
        "name": "Marshal's Badge",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/marshalsbadge.png",
        "tierClass": "almost-no-effect",
        "comment": "Reduces your terror radius by a small amount (-4 meters) when holding your aim. Although it can be stacked with its purple counterpart for a decent combined effect, there's almost never a reason to use this add-on. Read the commentary of the purple Gold Creek Whiskey for more information."
      },
      {
        "name": "Wanted Poster",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/wantedposter.png",
        "tierClass": "almost-no-effect",
        "comment": "Slightly increases your movement speed while holding up your rifle. This effect is completely unnecessary since you are already pretty fast and you almost never want to hold your aim for extended periods of time anyway. Almost never worth running over other add-ons."
      },
      {
        "name": "Jaw Smasher",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/jawsmasher.png",
        "tierClass": "almost-no-effect",
        "comment": "Slightly increases your movement speed while holding up your rifle. This effect is completely unnecessary since you are already pretty fast and you almost never want to hold your aim for extended periods of time anyway. Almost never worth running over other add-ons."
      },
      {
        "name": "Bayshore's Gold Tooth",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/bayshoresgoldtooth.png",
        "tierClass": "almost-no-effect",
        "comment": "Increase the speed at which speared Survivors are reeled when you pull them towards you. Unfortunately, the effect itself is almost insignificant and doesn't make a real difference in almost any situation. This add-on and its brown counterpart also indirectly speed up the movement of a Survivor's struggle, making them slightly harder to control in some critical situations."
      },
      {
        "name": "Snake Oil",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/snakeoil.png",
        "tierClass": "almost-no-effect",
        "comment": "Increase the speed at which speared Survivors are reeled when you pull them towards you. Unfortunately, the effect itself is almost insignificant and doesn't make a real difference in almost any situation. This add-on and its blue counterpart also indirectly speed up the movement of a Survivor's struggle, making them slightly harder to control in some critical situations."
      },
      {
        "name": "Rickety Chain",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/deathslinger/ricketychain.png",
        "tierClass": "detrimental",
        "comment": "Your chain breaks at a much faster rate when spearing a Survivor. This is a terrible downside and should generally be avoided. In the best case scenario, this add-on will do nothing at all or even save you a bit of time when you purposefully want to break your chain to injure someone. Even considering this, there are better alternative add-ons for this purpose, such as the purple Bayshore's Cigar."
      }
    ]
  },
  "pyramid head": {
    "displayName": "Pyramid Head,Executioner",
    "addons": [
      {
        "name": "Iridescent Seal of Metatron",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/iridescentsealofmetatron.png",
        "tierClass": "strongest",
        "comment": "Changes your punishment range to become dynamic, starting at 50% of its normal range but goes up to 200% the more you drag it on the ground. This pairs very well with information perks (to find Survivors from afar and capitalize on your ranged hits) and other add-ons related to dragging the sword repeatedly. The maximum range will also reset back to 50% after each successful hit, but if you don't mind doing a bit of extra work, this add-on can make you wildy unpredictable."
      },
      {
        "name": "Black Strap",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/blackstrap.png",
        "tierClass": "good",
        "comment": "Decreases your punishment's range but widens its width, making it easier to hit Survivors at close range. The reduced range makes your power slightly less versatile but also more consistent in most chase scenarios. Should not be used carelessly, but it can certainly be powerful."
      },
      {
        "name": "Cinderella Music Box",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/cinderellamusicbox.png",
        "tierClass": "good",
        "comment": "Slightly shortens your recovery time after performing a punishment attack. This allows you to regain full control and movement speed sooner after a hit or even try to do another one if you missed. It's not extremely noticeable or critical if you're still a beginner, but experienced players will certainly notice and take full advantage of this small effect."
      },
      {
        "name": "Misty Day, Remains of Judgement",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/mistydayremainsofjudgement.png",
        "tierClass": "good",
        "comment": "Reveals a Survivor's aura after being hit by punishment attacks, which can help you track them when they run away or even go for a follow up, especially if they're behind a wall and don't expect it. If you're running the perk Lethal Pursuer, the total aura time will be extended by two seconds which can even give you a second chance to hit them even if you miss once. Very decent effect, and it can also indirectly reveal the presence or abscence of the perk Off the Record, giving you information about whether or not a Survivor is susceptible to being tunneled after being unhooked."
      },
      {
        "name": "Obsidian Goblet",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/obsidiangoblet.png",
        "tierClass": "good",
        "comment": "Enables the ability to break breakable walls and pallets with your punishment attack, which can make it very easy to quickly get rid of safety and create dead zones for Survivors . You can run the green Cinderella Music Box if you want to partially compensate for the increased cooldown recovery debuff from this add-on."
      },
      {
        "name": "Scarlet Egg",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/scarletegg.png",
        "tierClass": "good",
        "comment": "Tormented Survivors now leave a short-duration trail as they run around, often triggering it on themselves when they walk back and forth during chase. This makes tracking easier and can easily apply effects such as Exhaustion from the blue Mannequin Foot. Keep in mind that this add-on makes your trails not visible, however."
      },
      {
        "name": "Crimson Ceremony Book",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/crimsonceremonybook.png",
        "tierClass": "good",
        "comment": "This add-on applies its Mangled & Hemorrhage status effects on all punishment hits, even ones that Survivors withstand with Endurance status effect. This makes it very easy to apply it to multiple Survivors when an unhook happens right in front of you. Overall, these two effects combined provide a very decent value considering their long duration and how easily the Executioner can interrupt heals even from a slight distance. A pretty safe add-on choice if you don't want to pick something more gimmicky."
      },
      {
        "name": "Tablet of the Oppressor",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/tabletoftheoppressor.png",
        "tierClass": "good",
        "comment": "Gives the Undetectable status effect when dragging your sword across the ground. Pyramid Head is somewhat loud and you won't really catch anyone by surprise from really close up, but this is still an amazing effect to prevent Survivors from running away early which is one of the most effective counters they have against you. Especially useful when paired with information perks or add-ons that will let you know exactly where to strike, or with add-ons that extend the time you can drag the sword on the ground. The sudden loss of terror radius can also be used in chase to confuse a Survivor that has lost sight of you, possibly inducing them into making a mistake."
      },
      {
        "name": "Mannequin Foot",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/mannequinfoot.png",
        "tierClass": "decent",
        "comment": "Inflicts Exhausted for a decently long time when a Survivor has stepped on your trails. Normally not extremely consistent, but it can be paired with the purple Scarlet Egg to basically gurantee that any Survivor affected by it will constantly reset the exhaustion timer."
      },
      {
        "name": "Copper Ring",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/copperring.png",
        "tierClass": "decent",
        "comment": "Increases the maximum amount of time that you can drag your sword by 5 seconds (50% more). This is a fairly strong effect that allows you to have more room for mistakes when going for multiple punishment attacks in a row or when drawing long trails around the map or get more utility out of other add-ons that require you to leave trails."
      },
      {
        "name": "Forgotten Videotape",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/forgottenvideotape.png",
        "tierClass": "decent",
        "comment": "NOTE: THIS ADD-ON SEEMS CURRENTLY BUGGED AND DOESN'T ACTUALLY SEEM TO DO ANYTHING. Increases the speed at which the punishment attack travels forward by 10%. This has minimal implications for close-range hits, but the increased speed can make it harder for Survivors to react and dodge out of the way at longer distances. It's probably better than the green Wax Doll if you want to hit people at the end of your range."
      },
      {
        "name": "Lost Memories Book",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/lostmemoriesbook.png",
        "tierClass": "decent",
        "comment": "Unlike the description suggests, this add-on applies its Obliviousness effect to all Survivors hit by the punishment attack, even if they go into Deep Wound after taking a hit with the Endurance status effect. This makes it very easy to apply it to multiple Survivors when an unhook happens right in front of you. Overall, making Survivors oblivious isn't extremely game-changing but its long duration can force them to play more carefully or even make a mistake here and there."
      },
      {
        "name": "Rust-Coloured Egg",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/rustcolouredegg.png",
        "tierClass": "decent",
        "comment": "Instantly recovers a chunk of your power when hitting a Survivor with a punishment attack, essentially refunding you the cost of using it and allowing you to immediately draw more trails on the ground or keep using the punishment. This pairs well with add-ons that require you to drag the sword for extended periods of time, especially the Iridescent Seal of Metatron. It's a decent effect that can allow you to keep the pressure up, but it will do very little if you're already struggling. Not extremely useful by itself."
      },
      {
        "name": "Dead Butterfly",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/deadbutterfly.png",
        "tierClass": "decent",
        "comment": "Increases the power recovery by a small margin, allowing you to use your punishment or draw extended trails a bit sooner and more consistently. Not a terrible effect, especially considering its rarity, but for most players this increased recovery isn't very important because they won't be using their trails so often. It's a bit more valuable if you have other add-ons related to leaving tons of trails on the ground."
      },
      {
        "name": "Wax Doll",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/waxdoll.png",
        "tierClass": "decent",
        "comment": "Increases the maximum range of punishment but only by a very small amount. This can sometimes make the difference between a hit and a miss but with such a small effect, you might want to use other more meaningful add-ons instead."
      },
      {
        "name": "Spearhead",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/spearhead.png",
        "tierClass": "almost-no-effect",
        "comment": "Reveals the aura of the rescuing Survivor when someone is rescued from a cage. This add-on is not really necessary for basic information (because getting rescued from a cage already creates a loud noise notification for the Killer) but it can help you to accurately track someone's position and maybe even get a surprise hit through a wall, for example. That being said, lingering around cages waiting for an opportunity to strike isn't always ideal or even possible. Do keep in mind that if you're too close to a cage for a few seconds, it will be transported to another side of the map as well. Needless to say, this add-on does nothing if you're not tormenting Survivors and using the cages often."
      },
      {
        "name": "Valtiel Sect Photograph",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/valtielsectphotograph.png",
        "tierClass": "almost-no-effect",
        "comment": "Increasingly reduces your terror radius by -2 meters for each Survivor afflicted with torment, eventually granting -8 meters if all Survivors are tormented. Unfortunately, this effect is too small and takes too long to build up. Survivors also remove their torment when saving or being saved from cages, so you won't keep this reduced terror radius unless you also decide to completely stop using cages. Overall, this add-on takes too much effort especially when you compare it to the blue Tablet of the Oppressor, which is much better at making you stealthy and unpredictable."
      },
      {
        "name": "Leopard-Print Fabric",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/leopardprintfabric.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases your recovery from pallet stuns by 15% when dragging your sword on the ground. Getting stunned during this period isn't extremely common, but it might happen here and there. Critically, getting stunned does not actually cancel your punishment if you already pressed the button, so you can sometimes injure or down a Survivor right as they drop a pallet on you. That being said, this add-on's effect is extremely tiny and almost negligible. There are very, very few situations where it will provide a meaningful advantage to justify using an add-on slot. You could stack it with the perk Enduring for an even greater stun reduction, but Enduring on its own is probably completely fine."
      },
      {
        "name": "Burning Man Painting",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/burningmanpainting.png",
        "tierClass": "almost-no-effect",
        "comment": "Reveals the aura of nearby Survivors when you've missed your punishment special attack. However, the range of 3 meters is absolutely pitiful and only activates after the punishment attack itself has happened. In other words, any Survivor moving away from you will almost always be further away than 3 meters and completely avoid this effect even if you were right on top of them when you missed the punishment attack. If a Survivor is that close, hitting them with a normal or special attack should be very easy anyway. In its current form, there is almost zero reason to use this add-on."
      },
      {
        "name": "Lead Ring",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pyramid head/leadring.png",
        "tierClass": "detrimental",
        "comment": "Increases your punishment's range, at the cost of narrowing its width. This is generally a really bad deal since a narrower punishment makes it even harder to land hits on Survivors in most scenarios. You should generally not use this add-on unless you know what you're doing. If you want some extra range with less downsides, the green Wax Doll or even the Iridescent Seal of Metatron might be more appropriate. Stacking the Iridescent Seal with this add-on is a really funny idea if you want to go for maximum possible range."
      }
    ]
  },
  "blight": {
    "displayName": "Blight",
    "addons": [
      {
        "name": "Shredded Notes",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/shreddednotes.png",
        "tierClass": "strongest",
        "comment": "Increases your rush token recovery rate with no other downside. A simple but very useful effect for players of any level."
      },
      {
        "name": "Iridescent Blight Tag",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/iridescentblighttag.png",
        "tierClass": "strongest",
        "comment": "Provides a small yet impactful extra speed during rushes but also limits your total rushes to 3. Despite having fewer rush tokens, your extra speed still allows great map mobility and also makes you deadlier in any chase that can be solved by just a few rushes (the majority of them). Note that it also slightly increases the look angle during a rush, allowing you to look around yourself more freely while rushing. Pairs well with the green Shredded Notes to make the recovery even faster."
      },
      {
        "name": "Compound Thirty-Three",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/compoundthirtythree.png",
        "tierClass": "strongest",
        "comment": "Provides a small boost to turning rate and rush duration, while also limiting the amount of total rush tokens to 5. The downside isn't particularly impactful, and the effect is quite comparable to other similar add-ons. Pairs well with the blue Blighted Crow to have rushes that slowly get better in every way. If you prefer consistancy from the first rush, you're generally better off using the purple Alchemist's Ring if you need the extra duration or the blue Umbra Salts if you need the increased turn rate."
      },
      {
        "name": "Blighted Crow",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/blightedcrow.png",
        "tierClass": "strongest",
        "comment": "Slightly increases your rush speed, with the effect becoming stronger with each consecutive rush. This helps with map mobility but it's particularly noticeable in chase, since the extra speed leaves even less time for the Survivors to reach safety around corners. This add-on is often stacked with its green counterpart."
      },
      {
        "name": "Blighted Rat",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/blightedrat.png",
        "tierClass": "good",
        "comment": "Slightly increases your rush speed, with the effect becoming stronger with each consecutive rush. This helps with map mobility but it's particularly noticeable in chase, since the extra speed leaves even less time for the Survivors to reach safety around corners. This add-on is often stacked with its blue counterpart."
      },
      {
        "name": "Compound Twenty-One",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/compoundtwentyone.png",
        "tierClass": "good",
        "comment": "Reveals the aura of nearby Survivors when bumping into objects; this is a massively helpful effect in chase since it removes the need to guess where a Survivor is moving if you lose sight of them behind an obstacle. It can also allow you to find people randomly as you traverse the map. Crucially, it allows you to observe the typical Survivor reactions when they're behind cover and so that you can anticipate them even when you're not using this add-on anymore. Needless to say, watch out for Survivors running perks that prevent their aura from being revealed, since they'll be immune to the effects of this add-on."
      },
      {
        "name": "Alchemist's Ring",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/alchemistsring.png",
        "tierClass": "good",
        "comment": "Progressively increases the duration of your rushes each time you perform one. It starts with 20% (+0.6s) and keeps increasing each time. Stacks with other add-ons that have similar effects. Notably, this add-on also indirectly increases the slowdown period at the end of a rush. For this reason, it might be a good idea to swing at the end to skip that part of the animation. Overall, this add-on increases your map mobility nicely but is ultimately less useful in chase compared to other add-ons. Newer players might find the variable length of a rush a slightly confusing feature, but experienced players can get a lot of value by learning to fully utilize the increasingly longer duration of each consecutive rush. Needless to say, do not pair this add-on with any other add-on that reduces the total amount of available rushes."
      },
      {
        "name": "Vigo's Journal",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/vigosjournal.png",
        "tierClass": "good",
        "comment": "Makes you stealthy for the duration of your rushes, allowing you to sometimes catch Survivors by surprise. Not particularly useful once you've started a chase, but a pretty good effect still. It synergizes well with other add-ons that extend the amount or duration of rush tokens."
      },
      {
        "name": "Umbra Salts",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/umbrasalts.png",
        "tierClass": "decent",
        "comment": "Increases your turn rate during a rush, making it slightly easier to navigate around certain areas. This effect isn't always needed or too helpful, but it's certainly noticeable and can sometimes make a difference. Can be stacked with other add-ons with similar effects."
      },
      {
        "name": "Plague Bile",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/plaguebile.png",
        "tierClass": "decent",
        "comment": "Increases your turn rate during a rush, making it slightly easier to navigate around certain areas. This effect isn't always needed or too helpful, but it's certainly noticeable and can sometimes make a difference. Can be stacked with other add-ons with similar effects."
      },
      {
        "name": "Rose Tonic",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/rosetonic.png",
        "tierClass": "decent",
        "comment": "This add-on and its green counterpart give you more time to perform your next rush before the fatigue kicks in. This effect might seem unnecessary or only suited for beginners at first glance, but it actually provides a lot of indirect value. By massively extending the animation that occurs between rushes, both of these add-ons also noticeably increase your movement speed for a brief moment. This extra speed allows you to reposition yourself or move around a small obstacle before initiating your next rush. This makes them useful even if you don't utilize the extra time they give you. Without these add-ons, you'll notice that the Blight's default movement speed during this moment is basically zero. Overall, a small but still decent effect."
      },
      {
        "name": "Pustula Dust",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/pustuladust.png",
        "tierClass": "decent",
        "comment": "This add-on and its blue counterpart give you more time to perform your next rush before the fatigue kicks in. This effect might seem unnecessary or only suited for beginners at first glance, but it actually provides a lot of indirect value. By massively extending the animation that occurs between rushes, both of these add-ons also noticeably increase your movement speed for a brief moment. This extra speed allows you to reposition yourself or move around a small obstacle before initiating your next rush. This makes them useful even if you don't utilize the extra time they give you. Without these add-ons, you'll notice that the Blight's default movement speed during this moment is basically zero. Overall, a small but still decent effect."
      },
      {
        "name": "Adrenaline Vial",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/adrenalinevial.png",
        "tierClass": "decent",
        "comment": "Increases your maximum rush tokens by 2 and increases your speed, but comes at the cost of a significant reduction of your turning rate. Some people might find this add-on's effects appealing, but for most players the downsides are simply too harsh to be worth it, especially when you consider that some other add-ons provide bonuses without any downsides at all."
      },
      {
        "name": "Soul Chemical",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/soulchemical.png",
        "tierClass": "decent",
        "comment": "Increases the speed of your initial rush, making you harder to outplay in chase and also allowing you to go further when traversing the map. Quite a good effect."
      },
      {
        "name": "Canker Thorn",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/cankerthorn.png",
        "tierClass": "almost-no-effect",
        "comment": "Slighly decreases your missed cooldown when a rush ends without bumping into anything. Useful, but a very small effect. Keep in mind that it does not affect your cooldown after a successful attack."
      },
      {
        "name": "Foxglove",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/foxglove.png",
        "tierClass": "almost-no-effect",
        "comment": "Slighly decreases your missed cooldown when a rush ends without bumping into anything. Useful, but a very small effect. Keep in mind that it does not affect your cooldown after a successful attack."
      },
      {
        "name": "Summoning Stone",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/summoningstone.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the duration of your first rush by an extra 0.5 seconds (3.5 seconds in total). If used to its full extent, this gives you a few extra meters of distance. However, this effect doesn't help in chase at all and isn't even that noticeable compared to other add-ons that increase duration or speed."
      },
      {
        "name": "Compound Seven",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/compoundseven.png",
        "tierClass": "detrimental",
        "comment": "This add-on automatically turns your characters towards a Survivor (as long as they're nearby and within your view). It's meant to help newer players but the effect is totally unnecessary and might even confuse you when multiple Survivors get in your way."
      },
      {
        "name": "Chipped Monocle",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/chippedmonocle.png",
        "tierClass": "detrimental",
        "comment": "Highlighting your landing area can be somewhat useful for beginners that are still getting used to Blight's power. For almost anyone else, this add-on is an unnecessary distraction that offers no real advantage."
      },
      {
        "name": "Placebo Tablet",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/blight/placebotablet.png",
        "tierClass": "detrimental",
        "comment": "Lowering your speed makes navigation a bit easier but is otherwise a horrible effect that hurts your overall mobility and chase potential. Considering that Blight is already a really good Killer when it comes to generating bloodpoints, you most definitely do not need to use this add-on under basically any circumstance. Keep in mind that the reduced speed also results in a shorter attack with less reach than normal."
      }
    ]
  },
  "twins": {
    "displayName": "Twins",
    "addons": [
      {
        "name": "Forest Stew",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/foreststew.png",
        "tierClass": "strongest",
        "comment": "The increased movement speed helps to land hits and contributes to Victor's ability to quickly cover large areas when necessary."
      },
      {
        "name": "Silencing Cloth",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/silencingcloth.png",
        "tierClass": "strongest",
        "comment": "The stealth from this add-on triggers every time you transition back to Charlotte and can be used at will throughout the match. Incredibly punishing against uncoordinated Survivors and in smaller indoor maps."
      },
      {
        "name": "Madeleine's Scarf",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/madeleinesscarf.png",
        "tierClass": "strongest",
        "comment": "The increased movement speed helps to land hits and contributes to Victor's ability to quickly cover large areas when necessary."
      },
      {
        "name": "Toy Sword",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/toysword.png",
        "tierClass": "strongest",
        "comment": "Slightly increases the speed at which you can initiate your pounce attack. The effect is small but still noticeable, especially around certain small loops where Survivors can be hard to hit as they hug the corner."
      },
      {
        "name": "Spinning Top",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/spinningtop.png",
        "tierClass": "good",
        "comment": "Making Survivors drop their item. Even though Survivors can choose to go back to retrieve it later, this hurts their efficiency and increases the risks they have to take. It also prevents Survivors from immediately healing with a medkit, which is a common strategy against Twins."
      },
      {
        "name": "Iridescent Pendant",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/iridescentpendant.png",
        "tierClass": "good",
        "comment": "The ability to instantly down a healthy Survivor is always nice, but this add-on doesn't come into play very often. Keep in mind, the Exposed effect only applies if Survivors kick Victor while he is dormant and not during a missed pounce cooldown. This makes this add-on far less desirable."
      },
      {
        "name": "Tiny Fingernail",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/tinyfingernail.png",
        "tierClass": "good",
        "comment": "Being able to deploy Victor slightly sooner is surprisingly helpful in chase. Very decent effect for its rarity."
      },
      {
        "name": "Stale Biscuit",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/stalebiscuit.png",
        "tierClass": "good",
        "comment": "Reduces the time window where Victor is vulnerable to being kicked, which can result in a nasty surprise for Survivors that have a keen sense of timing and try to kick you at the last second. Even if it only works once or twice per match, it's still a decent effect."
      },
      {
        "name": "Bloody Black Hood",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/bloodyblackhood.png",
        "tierClass": "decent",
        "comment": "This add-on provides a similar effect as the Tiny Fingernail, but in reverse; it saves half a second when switching back to Charlotte. Recovering sooner is always nice and sometimes can even help in chase."
      },
      {
        "name": "Madeleine's Glove",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/madeleinesglove.png",
        "tierClass": "decent",
        "comment": "Increases the detection radius of Victor while he's dormant or being carried by a Survivor. This increases your awareness of Survivor locations and is overall a very decent effect. Can be stacked with the Soured Milk add-on."
      },
      {
        "name": "Cat's Eye",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/catseye.png",
        "tierClass": "decent",
        "comment": "Makes Victor completely silent while he holds his pounce attack. Moving while holding the attack is very slow and should not be done at all times, but the effect of this add-on can lead to some nasty surprise attacks if you already know where Survivors are."
      },
      {
        "name": "Drop of Perfume",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/dropofperfume.png",
        "tierClass": "decent",
        "comment": "A very situational add-on that can mess with Survivors in maps with multiple floors or in tight buildings. In these scenarios, Survivors might not be able to discern your exact location with Charlotte. This add-on is utterly outclassed by the Silencing Cloth, which is much stronger and easier to use."
      },
      {
        "name": "Soured Milk",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/souredmilk.png",
        "tierClass": "decent",
        "comment": "Increases the detection radius of Victor while he's dormant or being carried by a Survivor. This increases your awareness of Survivor locations and is overall a very decent effect. The effect is weaker than Madeleine's Glove, but you can stack them both together."
      },
      {
        "name": "Victor's Soldier",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/victorssoldier.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on reveals the aura of Survivors that kick Victor, but the information it provides is almost always redundant. It can also be unreliable if Survivors run perks that can hide their aura."
      },
      {
        "name": "Weighty Rattle",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/weightyrattle.png",
        "tierClass": "almost-no-effect",
        "comment": "Similar to other add-ons of its type, the effect only triggers if Survivors actively remove Victor. If they hold him hostage and you recall him, the effect simply doesn't trigger. For this reason, these add-ons are very mediocre."
      },
      {
        "name": "Ceremonial Candelabrum",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/ceremonialcandelabrum.png",
        "tierClass": "almost-no-effect",
        "comment": "Slightly increases the time a Survivor needs to kick Victor, which can sometimes result in a cancelled kick. Often paired with the Stale Biscuit for this reason. The effects are very small and questionably useful, however."
      },
      {
        "name": "Sewer Sludge",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/sewersludge.png",
        "tierClass": "almost-no-effect",
        "comment": "Survivors removing Victor as soon as possible is typically a good thing for you, as that allows you to deploy him again sooner. In that regard, this add-on is actually counterproductive. However, there are some situations where a Survivor might need to desperately remove Victor (such as if they need to escape at an exit gate). In these cases, this add-on could be marginally useful."
      },
      {
        "name": "Rusted Needle",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/rustedneedle.png",
        "tierClass": "almost-no-effect",
        "comment": "Similar to other add-ons of its type, the effect only triggers if Survivors actively remove Victor. If they hold him hostage and you recall him, the effect simply doesn't trigger. For this reason, these add-ons are very mediocre."
      },
      {
        "name": "Baby Teeth",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/babyteeth.png",
        "tierClass": "almost-no-effect",
        "comment": "Similar to other add-ons of its type, the effect only triggers if Survivors actively remove Victor. If they hold him hostage and you recall him, the effect simply doesn't trigger. For this reason, these add-ons are very mediocre."
      },
      {
        "name": "Cat Figurine",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/twins/catfigurine.png",
        "tierClass": "detrimental",
        "comment": "Shows you a bright light indicating the landing spot of Victor's pounce. This light is not too helpful, often misleading and can obstruct your view of the Survivor that you're trying to attack."
      }
    ]
  },
  "trickster": {
    "displayName": "Trickster",
    "addons": [
      {
        "name": "Iridescent Photocard",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/iridescentphotocard.png",
        "tierClass": "strongest",
        "comment": "Doubles the duration of Main Event and also triggers a series of additional effects; all generators become blocked and Survivor and Killer auras are revealed to each other briefly. These secondary effects have strong synergies with some already strong perks such as Secret Project (which will make you Undectable for a long time). Overall a really strong add-on, especially if your build complements it."
      },
      {
        "name": "Death Throes Compilation",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/deaththroescompilation.png",
        "tierClass": "strongest",
        "comment": "Automatically reloads 75% of your blade ammo upon finishing Main Event, greatly reducing the need to reload and lose momentum between chases. A simple but strong effect that shines best if you have a build that constantly feeds you information and points you towards the next chase."
      },
      {
        "name": "Trick Blades",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/trickblades.png",
        "tierClass": "good",
        "comment": "Makes blades bounce off surfaces once, allowing you to hit Survivors around obstacles. Veteran Trickster players favor this add-on as it allows them to hit Survivors hiding behind certain obstacles or when they go around certain corners without a direct line of sight. Experienced players can use this effect to deal with the Trickster's main weakness: structures with long walls such as main buildings or jungle gyms. Additionally, this add-on also provides a randomized effect every 8th blade hit after a bounce. This might seem almost impossible to trigger consistently, but you can always aim at the ground behind a Survivor to land ricochet hits more consistently. Overall, this is a strong add-on but is not the most beginner-friendly, since it can induce players to waste a lot of blades unnecessarily. Works best in maps with many flat walls that enable predictable bounces. If you want to benefit from the extra effects of this add-on in a simple way, you can always aim at the ground directly behind a Survivor to land a nearly-guaranteed ricochet blade hit."
      },
      {
        "name": "Cut Thru U Single",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/cutthruusingle.png",
        "tierClass": "good",
        "comment": "Triggers Killer Instinct on nearby Survivors when you're close to reaching S-tier rank and about to unlock Main Event, potentially helping you to find the most vulnerable targets."
      },
      {
        "name": "Ripper Brace",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/ripperbrace.png",
        "tierClass": "good",
        "comment": "Provides an increasingly bigger bonus to action speeds (break and vault) based on your current style rank. Particularly useful when you reach the maximum S-rank since it lasts for 66 seconds by default and allows you to benefit from this effect for quite a long time. Not a bad effect but it can sometimes be somewhat counter-productive if you're going out of your way to perform breaks or vaults at inappropriate times. These effects can be stacked with perks such as Brutal Strength or Fire Up."
      },
      {
        "name": "Tequila Moonrock",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/tequilamoonrock.png",
        "tierClass": "good",
        "comment": "Increases the throw rate of blades by a noticeable 8% for a short duration after gaining a style rank point. The effect is noticeable but sometimes triggers at awkward times when you can't really make the most out of it. Not the most beginner-friendly add-on but skilled players will make good use of it."
      },
      {
        "name": "Killing Part Chords",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/killingpartchords.png",
        "tierClass": "good",
        "comment": "Increases the time before rank decreases from D to A by 50%. Each rank has a unique timer that ranges from 30 to 20 seconds, so this add-on will give you an average of about 12 extra seconds before your rank is depleted. Keeping your rank for longer makes it easier to unlock Main Event and comes with other benefits such as higher throw rate. The effect of this add-on is decent for newer players that struggle to build up rank and is a safe choice for any build, especially considering its rarity."
      },
      {
        "name": "Diamond Cufflinks",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/diamondcufflinks.png",
        "tierClass": "good",
        "comment": "Reveals the aura of Survivors when they're one blade away from taking damage. This comes into play very often and allows you to easily track a Survivor after damaging them or land the final blade on someone who managed to break line of sight temporarily. A pretty good and simple effect, especially useful if it helps you land blade hits through small gaps (which grants extra style points)."
      },
      {
        "name": "Trick Pouch",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/trickpouch.png",
        "tierClass": "good",
        "comment": "Increases your blade ammo counter by 8, leading to less frequent reloads and a better ability to pressure Survivors without interruptions. A simple but great effect, especially for beginners that do not always get full value of the Main Event's temporary infinite blades."
      },
      {
        "name": "Edge of Revival Album",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/edgeofrevivalalbum.png",
        "tierClass": "good",
        "comment": "Essentially doubles the damage of each blade hit when they're hit from further than 20 meters away. A powerful and certainly map-dependent effect that is best used by experienced players, especially with a good supporting build that provides information or stealth to catch Survivors by surprise."
      },
      {
        "name": "Lucky Blade",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/luckyblade.png",
        "tierClass": "good",
        "comment": "Triggers one of three randomized effects after each 8 blade hits. You don't have a lot of control over exactly what effect is triggered and when but they are generally quite useful."
      },
      {
        "name": "Fizz-Spin Soda",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/fizzspinsoda.png",
        "tierClass": "decent",
        "comment": "Decreases the amount of consecutive blades needed before the throw rate is increased (down to 3-8 instead of the original 5-10). This makes it easier to throw more blades per second when you're performing many consecutive throws but doesn't really have any effects when throwing them in very small bursts or during Main Event. Being able to squeeze in one or two additional hits here and there can make a difference, but the effect of this add-on is simply too small in most situations."
      },
      {
        "name": "Caged Heart Shoes",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/cagedheartshoes.png",
        "tierClass": "decent",
        "comment": "Provides a one-time brief increase of movement speed when holding and throwing knives. This effect begins when you start aiming and reactivates each time you break a pallet or breakable wall. Not a terrible effect, especially if you prepare it between chases and get a map with tons of breakable objects, but the trigger condition makes it somewhat situational."
      },
      {
        "name": "Waiting For You Watch",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/waitingforyouwatch.png",
        "tierClass": "decent",
        "comment": "Reveals the aura of a Survivor for a very decent duration of 10 seconds when their laceration fully decays. Useful when you land a knife or two on a target that you lose sight of momentarily. It can also help you keep track of a group of Survivors that has scattered away after being interrupted by your blades. Do keep in mind that the laceration decay is 100% paused during S-rank, delaying the effects of this add-on."
      },
      {
        "name": "On Target Single",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/ontargetsingle.png",
        "tierClass": "decent",
        "comment": "Extends the duration of Main Event, making it about 5% longer for each blade that you hit (0.5s per blade). This could theoretically keep Main Event going for an additional 20 seconds at most. A few extra seconds can still be devastating against Survivors that are grouped up after unhooking (for example), but you'll often find that there are a lot of situations where a longer Main Event is redundant or unnecessary."
      },
      {
        "name": "Ji-Woon's Autograph",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/jiwoonsautograph.png",
        "tierClass": "decent",
        "comment": "Increases the duration of Main Event by a flat 44%. A strong effect if you manage to trigger Main Event next to several vulnerable Survivors but it's still completely outclassed by the Iridescent Photocard."
      },
      {
        "name": "Inferno Wires",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/infernowires.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the time before S-rank decreases by about 12 seconds. However, the normal S-rank timer is already very generous and these extra few seconds rarely make a difference unless you really need to delay using Main Event for some reason. You might choose to run this add-on if you're trying to extend the S-rank duration to benefit from another add-on such as the blue Ripper Brace."
      },
      {
        "name": "Bloody Boa",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/bloodyboa.png",
        "tierClass": "almost-no-effect",
        "comment": "Signicantly extends the rate at which Survivors lose laceration (partial knife damage), although it doesn't seem to have an effect on the first laceration token (only subsequent ones). A simple and useful effect for beginners that might struggle to track Survivors in chase. Just keep in mind that this add-on has bad synergy with the blue Waiting For You Watch and that laceration does not decay at all when you're in S-rank."
      },
      {
        "name": "Melodious Murder",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/melodiousmurder.png",
        "tierClass": "almost-no-effect",
        "comment": "Saves you approximately 0.6 seconds each time you reload at a locker, bringing it down to 2.4 seconds in total. Good Trickster players don't often benefit too much from this small effect since they make optimal use of Main Event to save ammo frequently and don't need to reload very often, especially if they're running the iridescent Death Throes Compilation to replenish their ammo automatically. Can be stacked with the perk &#34;Iron Maiden&#34; for even faster reloading speed."
      },
      {
        "name": "Memento Blades",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/trickster/mementoblades.png",
        "tierClass": "almost-no-effect",
        "comment": "Creates an aiming reticle in the middle of your screen when you hold the power button to help you aim. Some people might find it useful if they don't have a built-in reticle available on their monitor but otherwise this add-on doesn't really provide any real value."
      }
    ]
  },
  "nemesis": {
    "displayName": "Nemesis",
    "addons": [
      {
        "name": "Licker Tongue",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/lickertongue.png",
        "tierClass": "strongest",
        "comment": "Extends the duration of the Hindered status effect that Survivors receive when they become infected. This sometimes allows you to catch up several seconds earlier and makes it much harder for Survivors to outrun you towards a safe area. Keep in mind that it doesn't work on subsequent hits on already infected Survivors."
      },
      {
        "name": "Marvin's Blood",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/marvinsblood.png",
        "tierClass": "strongest",
        "comment": "Increases the mutation rate that you gain from hitting Survivors with a tentacle strike, adding +0.5 points for each hit. This makes it possible to reach Tier 2 even earlier, since two tentacle strikes now give you 3.5 and 1.5 points, instantly giving you enough to reach it. Without this add-on, you'd need to hit two Survivors, hit the same Survivor again, or hit a Zombie to reach Tier 2. It also speds up your Tier 3, which is very valuable as well."
      },
      {
        "name": "Broken Recovery Coin",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/brokenrecoverycoin.png",
        "tierClass": "good",
        "comment": "Removes one vaccine case from the trial, leaving only 3 in total for Survivors to use. This is particularly useful in prolonged matches where Survivors run out of vaccines and become permanently infected. Removing a case also makes it harder for Survivors to immediately notice which Killer they're playing against and forces infected Survivors to travel a longer distance to find a vaccine. Unfortunately, this add-on has bad synergy with others that require Survivors to use the vaccines such as the brown Damaged Syringe. You will also find that it has basically no effect if Survivors play extremely efficiently and don't give you any time to infect them often in the first place. For that reason, it's best to use this add-on when you have at least some slowdown or endgame perks that will guarantee a somewhat long match where Survivors are more likely to run out of vaccines."
      },
      {
        "name": "Serotonin Injector",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/serotonininjector.png",
        "tierClass": "good",
        "comment": "Gives you the Undetectable status effect for a few seconds after a Zombie dies by any means. Despite his massive size and loud footsteps, Nemesis still benefits greatly from stealth because it allows him to catch groups of unaware Survivors and often get free hits before they can find safety. Pairs well with other add-ons that encourage you to kill your own Zombies, such as the blue T-Virus Sample."
      },
      {
        "name": "Depleted Ink Ribbon",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/depletedinkribbon.png",
        "tierClass": "good",
        "comment": "Permanently increases Zombie movement speed. This allows them to roam the map more effectively and be slightly more annoying when they pressure Survivors. Unlike its other counterparts, this add-on also has some nice extra effects. It decreases the respawn timer when Zombies are killed and also makes them spawn behind the exit gates during the endgame. This last effect is quite gimmicky but overall this is a fairly solid add-on."
      },
      {
        "name": "T-Virus Sample",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/tvirussample.png",
        "tierClass": "good",
        "comment": "Increases the mutation rate that you gain from killing your own zombies with a tentacle strike. Unlike the other two similar add-ons, this one has a stronger effect that makes it much less situational. With it, you can reach Tier 2 after killing 3 Zombies or after killing 1 Zombie and hitting a non-infected Survivor once with your tentacle. Pairs quite well with the blue Serotonin Injector, allowing you to kill a zombie and catch someone by Surprise shortly after. The extra mutation rate might even help you reach Tier 3 a bit sooner as well."
      },
      {
        "name": "Jill's Sandwich",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/jillssandwich.png",
        "tierClass": "decent",
        "comment": "Reveals the aura of anyone opening a vaccine case for a decently long duration. This effect is sometimes easy to miss since there's no loud notification, but perceptive Nemesis players can use it along with other add-ons and perks to immediately find a vulnerable Survivor. Pairs well with the Iridescent Umbrella Badge, especially if the Victim suffers from the Oblivious status effect or you're stealthy somehow. Even if you initially miss the aura reading, you might still see it if a Survivor immediately uses the vaccine after retrieving it. Keep in mind that just like any other aura-related add-on, this one is susceptible to being countered by certain Survivor perks that hide their aura."
      },
      {
        "name": "Iridescent Umbrella Badge",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/iridescentumbrellabadge.png",
        "tierClass": "decent",
        "comment": "Inflicts any Survivor that is vaccinated with the Exposed status effect for 60 seconds, making them vulnerable to being instantly downed. This effect is quite powerful in the right circumstances and might catch someone by surprise, but it's still quite situational. Many times, a vaccinated Survivor will be too far out of reach or will already be injured. Even if Survivors become aware of its presence, this add-on can still passively put pressure on them by preventing them from using vaccines and immediately being altruistic near you."
      },
      {
        "name": "Shattered S.T.A.R.S. Badge",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/shatteredstarsbadge.png",
        "tierClass": "decent",
        "comment": "Massively increases the Zombie movement speed for 60 seconds after a generator is completed. This effect can stack with other similar add-ons and even with itself if multiple generators are completed rapidly, although there is a hard cap to Zombie speed that prevents it from being too high. This add-on makes Zombies quite annoying for a while, but keep in mind that they are still susceptible to being blinded or killed."
      },
      {
        "name": "Damaged Syringe",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/damagedsyringe.png",
        "tierClass": "decent",
        "comment": "Makes the process of using a vaccine (which is normally only 2 seconds) take much longer (7 seconds in total). This makes it almost impossible to perform during chase and also provides a relatively consistent form of slowdown as long as Survivors are using the vaccines. Pairs well with the blue Plant 43 Vines since they have a similar effect."
      },
      {
        "name": "Plant 43 Vines",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/plant43vines.png",
        "tierClass": "decent",
        "comment": "Increases the time required to open a vaccine case, effectively doubling the default 4 seconds into 8 seconds total. This makes it harder for Survivors to find a vaccine quickly at the start of the match and also slows them down a little as long as they're using vaccines. Keep in mind that if you manage to interrupt a Survivor after they open a vaccine case, the case will automatically close again and will need to be reopened. Pairs well with the brown Damaged Syringe since they have similar effects."
      },
      {
        "name": "Admin Wristband",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/adminwristband.png",
        "tierClass": "decent",
        "comment": "Improves the range and peripheral vision of Zombies, allowing them to detect Survivors slightly more consistently. Can be stacked with its brown counterpart. Keep in mind, however, that increasing the detection range doesn't always provide consistent effects. Sometimes Zombies will roam empty parts of the map or immediately get blinded or killed. Additionally, Zombies can be attracted to certain sounds (like a missed skillcheck) regardless of their actual detection range."
      },
      {
        "name": "Visitor Wristband",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/visitorwristband.png",
        "tierClass": "decent",
        "comment": "Improves the range and peripheral vision of Zombies, allowing them to detect Survivors slightly more consistently. Can be stacked with its green counterpart. Keep in mind, however, that increasing the detection range doesn't always provide consistent effects. Sometimes Zombies will roam empty parts of the map or immediately get blinded or killed. Additionally, Zombies can be attracted to certain sounds (like a missed skillcheck) regardless of their actual detection range."
      },
      {
        "name": "Mikhail's Eye",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/mikhailseye.png",
        "tierClass": "decent",
        "comment": "Permanently increases Zombie movement speed by a small margin. This allows them to roam the map more effectively and be slightly more annoying when they pressure Survivors. Not a bad effect for its rarity, but keep in mind that Zombies are still very inconsistent even when they're a bit faster."
      },
      {
        "name": "Brian's Intestine",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/briansintestine.png",
        "tierClass": "decent",
        "comment": "Permanently increases Zombie movement speed by a small margin. This allows them to roam the map more effectively and be slightly more annoying when they pressure Survivors. Not a bad effect for its rarity, but keep in mind that Zombies are still very inconsistent even when they're a bit faster."
      },
      {
        "name": "Ne-α Parasite",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/neparasite.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts the Oblivious status effect to any Survivor when they initially become infected. Since this effect does not reapply with each tentacle hit, the status effect will likely run out soon after the Survivor is hooked or abandoned. Overall, this add-on can cause a bit of chaos and uncertainty but the effect itself is far too situational and not very reliable."
      },
      {
        "name": "Tyrant Gore",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/tyrantgore.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the mutation rate that you gain from killing your own zombies with a tentacle strike. Unfortunately, the effect is so small that it doesn't typically make enough of a difference in most scenarios. Even with this add-on, you'd still need to kill 4 Zombies to reach the very important mutation Tier 2. This particular add-on is slightly better than its green counterpart since it also decreases the Zombies' spawn timer."
      },
      {
        "name": "Zombie Heart",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/zombieheart.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the mutation rate that you gain from killing your own zombies with a tentacle strike. Unfortunately, the effect is so small that it doesn't typically make enough of a difference in most scenarios. Even with this add-on, you'd still need to kill 4 Zombies to reach the very important mutation Tier 2. On top of that, killing a Zombie also prevents it from giving you information and patrolling the area for some time. Although this add-on can be stacked with others with similar effects, it's almost never a good idea to do so since their combined value is still often very situational."
      },
      {
        "name": "Adrenaline Injector",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/adrenalineinjector.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the duration of the Killer Instinct that naturally happens when a Survivor removes their infection with a vaccine. Typically, Survivors will do this when they're far away from you and the extra duration can be somewhat helpful to keep track of them for slightly longer. Overall, this effect is still pretty mediocre and mostly not worth the add-on slot."
      },
      {
        "name": "S.T.A.R.S. Field Combat Manual",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/nemesis/starsfieldcombatmanual.png",
        "tierClass": "almost-no-effect",
        "comment": "Changes the Zombies' aura from white to yellow briefly after they hit a Survivor. This effect might seem useful at first glance but it's incredibly situational and unnecessary. Most of the times, Zombies will hit Survivors right in front of you during chase. Even if they don't, you can immediately tell when someone gets infected thanks to the infection audio cue and know exactly where they are by looking at your zombies and seeing which one just recovered from doing the hit animation. To put it simply, there is almost no situation where this add-on would give you information that you don't already have. Not to mention that at higher levels, it's not even rare to have entire matches where Survivors don't get hit by a Zombie a single time."
      }
    ]
  },
  "pinhead": {
    "displayName": "Pinhead,Cenobite",
    "addons": [
      {
        "name": "Larry's Remains",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/larrysremains.png",
        "tierClass": "strongest",
        "comment": "Increases the time a Survivor needs to solve the box by 2 seconds. The effect might seem small but it's actually really critical. The longer duration allows you to interrupt Survivors that are solving the box much more consistently even if they're very far away from you by using a long distance Possessed Chain. Once interrupted, that Survivor can then be downed which will activate the Chain Hunt, slowing everyone down. You'll find that without this add-on, Survivors often have just enough time to solve the box right before you can actually stop them."
      },
      {
        "name": "Impaling Wire",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/impalingwire.png",
        "tierClass": "strongest",
        "comment": "Normally, breaking a Possessed Chain via the environment causes an additional chain to spawn and attempt to hit. This add-on increases it to two additional chains spawned instead. This makes your power much more consistent. Since Survivors are slower for each chain attached to them (up to a maximum of 3), this add-on also helps to ensure that you slow them down as much as possible during chase."
      },
      {
        "name": "Iridescent Lament Configuration",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/iridescentlamentconfiguration.png",
        "tierClass": "good",
        "comment": "Hides the aura of the box to anyone that isn't nearby until the moment the Chaint Hunt begins. Normally, Survivors see the aura of the box at all times and can easily find it. With this add-on, however, they'll need to move around the map and search for it if they want to solve it early. Overall, this add-on makes solving the box a slightly harder task for coordinated teams and a much more difficult one for uncoordinated teams. Keep in mind that smart Survivors that understand the box spawn logic can still sometimes guess where the box will be even if they don't see it yet and will quickly locate the approximate location and start seeing the box when they are close enough. This add-on is a &#34;low-maintenance&#34; type that's easy to use, but you might want to use other add-ons if you expect to face tough Survivors."
      },
      {
        "name": "Original Pain",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/originalpain.png",
        "tierClass": "good",
        "comment": "Reveals the aura of a Survivor who has been hit witth a Possessed Chain when they break one of the chains (inlcuding if you yourself break one of your chains by walking into it). Almost an identical effect as the purple Greasy Black Lens, although it typically lasts a tiny bit longer and could thus be considered slightly better as a result. Running both add-ons together doesn't really stack their duration and is not recommended. It can also be stacked with the perk &#34;Lethal Pursuer&#34; but this one does not pair well with the iridescent Engineer's Fang, since the initial injuring hit will not produce any breakable chains to trigger the aura read."
      },
      {
        "name": "Greasy Black Lens",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/greasyblacklens.png",
        "tierClass": "good",
        "comment": "Reveals the aura of a Survivor after hitting them with a Possessed Chain. This effect is incredibly helpful in almost every situation, provided that the Survivor doesn't have a perk to hide their aura. Can be stacked with the perk &#34;Lethal Pursuer&#34; to extend the duration even further. Pairs well with the iridescent Engineer's Fang as it will show you the aura of Survivors when injuring them as well."
      },
      {
        "name": "Liquified Gore",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/liquifiedgore.png",
        "tierClass": "good",
        "comment": "Increases the time a Survivor needs to solve the box by 1 second. The effect might seem small but it's actually really critical. The longer duration allows you to interrupt Survivors that are solving the box much more consistently even if they're very far away from you by using a long distance Possessed Chain. Once interrupted, that Survivor can then be downed which will activate the Chain Hunt, slowing everyone down. Not as powerful as its blue counterpart, but it can be stacked together if you want."
      },
      {
        "name": "Engineer's Fang",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/engineersfang.png",
        "tierClass": "good",
        "comment": "Healthy Survivors hit by a Possessed Chain will instantly become injured. Keep in mind that this only affects the Possessed Chain controlled by the Cenobite, not the random ones spawned during the Chain Hunt. This effect is incredibly powerful but comes with a heavy downside; when using your power, Survivors will only be bound by 2 chains instead of 3. This downside greatly hurts your chase potential and makes it much harder to catch Survivors once they're already injured. This add-on can certainly be devastating in the hands of someone that has mastered it and has a build around it, but the average player might be better off running other powerful add-ons that don't have such a downside. As a fun fact, this add-on can be stacked with the brown Bent Nail since they have the same effect, resulting in a really weak chase power."
      },
      {
        "name": "Frank's Heart",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/franksheart.png",
        "tierClass": "decent",
        "comment": "Increases the maximum range at which you spawn your Possessed Chain by 8 meters. This extra range doesn't help in chase but it can be very useful to prevent a Survivor from solving the box from a very long distance. It can also help you to scout more distant areas with your power to gather information or interrupt Survivors from doing certain actions such as cleansing a totem. Overall, not a particularly useful add-on for beginners but it might find a place in the arsenal of a more experienced player. Pairs particularly well with the blue Larry's Remains to help interrupt the box at almost any range."
      },
      {
        "name": "Chatterer's Tooth",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/chattererstooth.png",
        "tierClass": "decent",
        "comment": "Reveals the aura of the box to the Killer (which is normally hidden) and grants the Undetectable status effect for a long time if you pick it up. However, picking up the box yourself will not restart it and instead will disable it as if a Survivor had solved it. Losing the ability to find and immediately activate the box is a massive downside but this add-on can still be useful in certain circumstances with a build tailored around the stealth and interruption that it provides. Keep in mind that if you don't pick up the box yourself and just defend it, the Chain Hunt will still happen as normal. However, if you linger over the box for too long it will automatically disable itself to prevent you from holding the game hostage."
      },
      {
        "name": "Skewered Rat",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/skeweredrat.png",
        "tierClass": "decent",
        "comment": "Reduces the cooldown of your Possessed Chain after using it, allowing you to use it again sooner. Useful, but the effect itself is quite small (9%)."
      },
      {
        "name": "Slice of Frank",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/sliceoffrank.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts any Survivor carrying the box with the Exhausted status effect until they get rid of it. This can make them slighty easier to catch if you interrupt them but it's still quite situational. Obviously, the add-on also has no effect whatsoever if Survivors solve the box without being interrupted or if you pick it up yourself."
      },
      {
        "name": "Torture Pillar",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/torturepillar.png",
        "tierClass": "almost-no-effect",
        "comment": "Shortens the timer before the box activates and the Chain Hunt commences by 6 seconds. This is a very simple and passive effect that beginners might find appealing, but its actual value is too small to really be worth running at higher levels. Can be stacked with its brown counterpart, but even then, the effect is very miniscule."
      },
      {
        "name": "Flickering Television",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/flickeringtelevision.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the maximum range at which you spawn your Possessed Chain by 4 meters. Despite their similarities, there's no reason to run this add-on instead of the better blue Frank's Heart. Since you typically want to pair Frank's Heart with some other utility add-on, there's also no good reason to pair these two together."
      },
      {
        "name": "Wriggling Maggots",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/wrigglingmaggots.png",
        "tierClass": "almost-no-effect",
        "comment": "Slightly improves the turning rate of your Possessed Chain. Normally, this isn't a very important effect since you typically want to place a portal right next to the Survivor and hit them directly anyway. However, the increased turning can be useful to navigate around certain obstacles or hit a Survivor that is trying to dodge an incoming chain. Can be stacked together with its brown counterpart for a more noticeable effect."
      },
      {
        "name": "Lively Crickets",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/livelycrickets.png",
        "tierClass": "almost-no-effect",
        "comment": "Slightly improves the turning rate of your Possessed Chain. Normally, this isn't a very important effect since you typically want to place a portal right next to the Survivor and hit them directly anyway. However, the increased turning can be useful to navigate around certain obstacles or hit a Survivor that is trying to dodge an incoming chain. Can be stacked together with its green counterpart for a more noticeable effect."
      },
      {
        "name": "Burning Candle",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/burningcandle.png",
        "tierClass": "almost-no-effect",
        "comment": "Shortens the timer before the box activates and the Chain Hunt commences by 3 seconds. This is a very simple and passive effect that beginners might find appealing, but its actual value is too small to really be worth running at higher levels. Can be stacked with its blue counterpart, but even then, the effect is very miniscule."
      },
      {
        "name": "Leather Strip",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/leatherstrip.png",
        "tierClass": "almost-no-effect",
        "comment": "Reduces the cooldown of your Possessed Chain after using it, allowing you to use it again sooner. Sounds nice in theory, but in practice the effect is really small and almost unnoticeable (3% faster recovery)."
      },
      {
        "name": "Larry's Blood",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/larrysblood.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the maximum distance that your Possessed Chain can travel before disappearing by a small margin (4 meters). Hitting Survivors with a long distance chain is typically a very risky and pointless idea, since it's much safer to spawn the chain near them and then hit them from up close. There are very few exceptions to this rule and even in those situations the extra 4 meters is still not that impactful. Needless to say, this add-on has basically zero effect during normal chases and can even be detrimental if you accidentally miss a chain into the sky, as it will take longer to disappear and waste additional time. Keep in mind that your Possessed Chain accelerates and gains speed over time, so it's very difficult to control it accurately over a long distance. If you want an add-on that helps you to interrupt Survivors from afar, Frank's Heart is the superior choice."
      },
      {
        "name": "Spoiled Meal",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/spoiledmeal.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the maximum distance that your Possessed Chain can travel before disappearing by a very small margin (2 meters). There are almost no situations where you need to hit a Survivor at the end of your chain path and even then, the effect of this add-on is really tiny."
      },
      {
        "name": "Bent Nail",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/pinhead/bentnail.png",
        "tierClass": "detrimental",
        "comment": "Removes one of the extra chains that normally bind a Survivor when you successfully hit them with your power. This means that only two chains will appear in total, or only one if you pair this add-on with the Engineer's Fang (but please don't do that). Overall, this is a massive nerf to the Cenobite's already inconsistent power and should generally be avoided at all costs."
      }
    ]
  },
  "artist": {
    "displayName": "Artist",
    "addons": [
      {
        "name": "Severed Hands",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/severedhands.png",
        "tierClass": "strongest",
        "comment": "Swarmed Survivors now contaminate and spread the swarm to any other nearby Survivor. This is an incredibly powerful effect with several implications. First, it now becomes possible to swarm multiple Survivors with a single bird, allowing you to do a quick follow up and potentially damaging multiple Survivors at once as a result. Normally, this would be impossible since you'd need to use more than one bird and have a very long cooldown as a result. This add-on also allows you to damage grouped Survivors with only two birds that are slightly spaced apart; the first bird will hit a Survivor and swarm them both, and then the second bird will go through the first Survivor (since they have a brief immunity that protects from being hit again too soon) and injure the second Survivor (which does not have any immunity if swarmed by the effects of this add-on). This add-on also makes it very easy for Survivors that repel a swarm to become swarmed immediately if they accidentally get too close to someone else. This makes it almost impossible to be altruistic since Survivors will constantly reset each other's swarm timers."
      },
      {
        "name": "Matias' Baby Shoes",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/matiasbabyshoes.png",
        "tierClass": "strongest",
        "comment": "Shows the aura of any Survivor within proximity to a placed Dire Crow. This makes your birds extremely deadly even in loops with very limited visibility. It also completely reduces the need to guess a Survivor's location, allowing you to place very threatening birds aimed at windows and other chokepoints. Since the detection range is pretty generous and lingers for a brief time, you can also use birds to help you track Survivors in certain structures. For example, a bird placed on the bottom floor will sometimes reveal the aura of a Survivor on the floor above. Overall, this is a very deadly add-on that removes a huge element of counterplay from the Artist's gameplay. Be careful when dealing with Survivors with perks that hide their aura, however."
      },
      {
        "name": "Festering Carrion",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/festeringcarrion.png",
        "tierClass": "good",
        "comment": "Reduces the cooldown that you experience when shooting birds, which is almost always universally helpful. Keep in mind that if you shoot more than 1 bird, Survivors will typically still have enough time to remove their swarm even with this add-on."
      },
      {
        "name": "Garden of Rot",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/gardenofrot.png",
        "tierClass": "good",
        "comment": "Briefly makes a Survivor insta-downable for a few seconds after they remove their swarm. This can lead to nasty Surprises in the early stages of the game but also has a much less obvious value even when Survivors become aware of it. Since Survivors can no longer remove their swarm right in front of you, they're less likely to get away with certain altruistic plays and need to be extremely careful in chase. Keep in mind that if Survivors don't remove their swarm or keep resetting it, you'll constantly see the aura of the swarm, making them easier to track."
      },
      {
        "name": "Thick Tar",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/thicktar.png",
        "tierClass": "good",
        "comment": "Slightly increases the time it takes for Survivors to remove their swarm after being hit by a Dire Crow. This is overall a really simple and useful add-on that will result in Survivors wasting more time when hit by a bird outside of chase. Within chase, it also gives a bigger chance to hit with a follow-up bird after the initial hit. Keep in mind that this add-on does almost nothing if you hit a Survivor from afar and they just hop into a locker, since that removes the swarm immediately."
      },
      {
        "name": "Severed Tongue",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/severedtongue.png",
        "tierClass": "good",
        "comment": "Reduces the slowdown that the Artist naturally experiences when firing a bird. It's a subtle effect but quite noticeable for veteran players. This allows you to be more aggressive with your birds in general and harder for Survivors to reach safety after a bird is shot."
      },
      {
        "name": "Velvet Fabric",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/velvetfabric.png",
        "tierClass": "good",
        "comment": "When a swarmed Survivor begins to repel the birds, the white aura of the birds remains visible for only 2.5 seconds. With this add-on, the white aura will remain visible for up to 4 seconds. This makes it much easier to snipe distant Survivors or keep track of a Survivor's exact location during chase. Overall, a really solid effect. Since the aura being revealed is not the Survivor's, this effect cannot be countered by stealth perks such as &#34;Distortion&#34;."
      },
      {
        "name": "Thorny Nest",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/thornynest.png",
        "tierClass": "good",
        "comment": "Inflicts temporary Mangled and Haemorrhage effects to any Survivor hit by a bird. This is pretty helpful, especially when you consider that it lingers enough to affect a Survivor after they get rescued from a hook."
      },
      {
        "name": "Untitled Agony",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/untitledagony.png",
        "tierClass": "good",
        "comment": "Inflicts a brief but powerful Hindered status effect on any Survivor swarmed by any means. This effect is almost always helpful and can actually make a difference in certain loops, turning them completely unsafe. Since the Artist herself is also slowed down when firing a bird, you might find it useful to pair this add-on with the purple Severed Tongue or even placing the bird at the loop preemptively, similar to what you would do with Clown bottles."
      },
      {
        "name": "Silver Bell",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/silverbell.png",
        "tierClass": "decent",
        "comment": "Makes swarmed Survivors oblivious until they repel the birds. This generally doesn't have a huge impact in chase, but it can be used to confuse distant Survivors that don't have a direct line of sight with you. Since they don't hear the terror radius briefly, it might be difficult for them to be sure about your location. Not a terribly powerful effect, especially against coordinated teams, but it can catch people by surprise from time to time."
      },
      {
        "name": "O Grief, O Lover",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/ogriefolover.png",
        "tierClass": "decent",
        "comment": "Inflicts Survivors with the Exhaustion status effect while they're swarmed. Since it doesn't have a lingering duration, this effect can be easily removed and doesn't provide value if you hit Survivors from afar. However, it can be very useful in chase to deny a Survivor the ability to trigger certain perks such as &#34;Balanced Landing&#34; or &#34;Lithe&#34; right before they can use them. It can also be used to completely outplay perks such as &#34;Dead Hard&#34; or &#34;Overcome&#34; before they even have a chance to be used. Definitely situational, but a nice effect nonetheless."
      },
      {
        "name": "Ink Egg",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/inkegg.png",
        "tierClass": "decent",
        "comment": "Allows you to place one extra Dire Crow, up to four in total. However, placing an extra bird still takes time and also results in an even longer cooldown. The add-on also has a penalty to the timer before a bird disintegrates. Overall, there are very few situations where having so many birds is useful, making this add-on quite situational. It can be helpful when you're just trying to find someone (since you want to send out as many brids as possible for a chance to detect a Survivor) and also in situations where a Survivor doesn't have time to remove their swarm at all and you want to ensure that at least one bird will hit."
      },
      {
        "name": "Iridescent Feather",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/iridescentfeather.png",
        "tierClass": "decent",
        "comment": "Reduces the maximum amount of Dire Crows that you can fire at once but gives you the ability to become stealthy during your recovery. Not having access to 3 birds isn't necessarily a huge downside (since veteran Artist players typically only fire 1 or 2 at once), but the stealth from this add-on is simply not strong or consistent enough to always be worth running. It can be paired with other add-ons to further confuse Survivors (such as the blue Silver Bell) or to keep your recovery slow which extends your stealth time (Ink Egg)."
      },
      {
        "name": "Automatic Drawing",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/automaticdrawing.png",
        "tierClass": "decent",
        "comment": "Allows you to use your power sooner after a bird's timer expires. Instead of waiting 2 seconds, you'll be ready in only 0.5 seconds. It's a really decent effect although it doesn't always come up in chase."
      },
      {
        "name": "Oil Paints",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/oilpaints.png",
        "tierClass": "decent",
        "comment": "Makes your Dire Crows have a larger detection range that highlights nearby Survivors with Killer Instinct. With this add-on, you're more likely to detect Survivors that barely dodge an incoming bird. It also allows you to consistently detect Survivors on elevated floors when you send a bird that flies below them. Not a terrible effect but ideally you shouldn't be shooting birds blindly all the time."
      },
      {
        "name": "Darkest Ink",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/darkestink.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts the Blindness status effect for a brief time when swarming Survivors with birds. Can be useful to deny a Survivor the ability to use aura reading during chase, from perks such as &#34;Windows of Opportunity&#34; or keys. Its very short duration unfortunately keeps it from being useful in almost any other scenario. Overall, not a very impactful add-on."
      },
      {
        "name": "Vibrant Obituary",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/vibrantobituary.png",
        "tierClass": "almost-no-effect",
        "comment": "When your Dire Crows fly close to a Survivor without hitting it, they trigger a Killer Instinct effect. This add-on extends the duration of that Killer Instinct by 3 seconds making it slightly easier to track that person. In general, these extra few seconds give almost no useful information that you didn't already have, so the effect itself is pretty mediocre."
      },
      {
        "name": "Choclo Corn",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/choclocorn.png",
        "tierClass": "almost-no-effect",
        "comment": "Extending the time that Dire Crows stay active can sometimes be helpful, but in most cases this can actually hurt you. In some instances, it's better to let your birds expire so that you get your power back sooner. With this add-on, you'll need to wait extra time or shoot the bird yourself to begin the cooldown. If more than one bird is shot at once, this cooldown is pretty long and will hurt your ability to pressure Survivors."
      },
      {
        "name": "Still Life Crow",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/stilllifecrow.png",
        "tierClass": "almost-no-effect",
        "comment": "Extending the time that Dire Crows stay active can be helpful sometimes, but in most cases this can actually hurt you. In some instances, it's better to let your birds expire so that you get your power back sooner. With this add-on, you'll need to wait extra time or shoot the bird yourself to begin the cooldown. If more than one bird is shot at once, this cooldown is pretty long and will hurt your ability to pressure Survivors."
      },
      {
        "name": "Charcoal Stick",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/artist/charcoalstick.png",
        "tierClass": "detrimental",
        "comment": "Removes the visual trail that Dire Crows produce when they fly, making it slightly harder to see them coming when they're fired from a distance. This effect would be decent by itself but unfortunately this add-on comes with an incredibly awful downside. When placing any birds, their auras will be visible to all Survivors briefly. This makes your power much easier to outplay in general. With this add-on, it basically becomes impossible to trick Survivors into dodging in the wrong direction since they'll see exactly where your birds are aimed at even if you placed them behind a wall. Overall, an absolutely horrible add-on that should be avoided at all costs. If you want to use birds for long distance shots there are much better and cheaper alternatives such as the blue Velvet Fabric or the Festering Carrion."
      }
    ]
  },
  "onryo": {
    "displayName": "Onryo,Sadako",
    "addons": [
      {
        "name": "Bloody Fingernails",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/bloodyfingernails.png",
        "tierClass": "strongest",
        "comment": "Massively increases the already powerful speed boost that you gain when emerging from a TV after a teleport, allowing you to cover distances quickly or even perform a huge lunge attack to hit a Survivor nearby. Almost universally useful."
      },
      {
        "name": "Remote Control",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/remotecontrol.png",
        "tierClass": "strongest",
        "comment": "Reveals the auras of Survivors near powered TVs when teleporting. This information greatly contributes to your awareness of Survivors' locations and sometimes allows you to interrupt them before they're able to interact with a TV to reduce their condemn. Very easy to use compared to other add-ons and particularly deadly in the small maps where this Killer already performs well."
      },
      {
        "name": "Mother's Comb",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/motherscomb.png",
        "tierClass": "good",
        "comment": "Highlights the aura of turned-off TVs in yellow (which helps with overall awareness) and more importantly, gives a loud noise notification whenever a Survivor turns a TV off. This can help you focus on a particularly vulnerable target and makes it much less likely that a Survivor will manage to sneakily remove their condemn around you. This information isn't always necessary if you already have a great intuition or awareness, but it's certainly a strong effect."
      },
      {
        "name": "Reiko's Watch",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/reikoswatch.png",
        "tierClass": "good",
        "comment": "Slightly increases the flickering invisibility that occurs periodically while you're demanifested. With this add-on, the invisibility lasts long enough to consistently confuse Survivors and make them walk into you at smaller loops if you time your movements correctly. Definetely not suited for beginners that still need to learn how to pull this off, but quite strong in the hands of experienced players that know how to fully utilize it."
      },
      {
        "name": "Well Water",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/wellwater.png",
        "tierClass": "good",
        "comment": "Keeps your Undetectable status effect when manifesting manually or after teleporting through a TV. This can allow you to occasionally ambush Survivors or catch them by surprise once they lower their guard. Since you're no longer technically demanifested, they also won't hear the usual lullaby-type sounds that would normally play. Not a bad effect."
      },
      {
        "name": "Ring Drawing",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/ringdrawing.png",
        "tierClass": "decent",
        "comment": "When hooking a Survivor with a tape, applies 1 stack of condemn to everyone else. A decent effect that can slowly help to make sure that Survivors must waste time interacting with TVs."
      },
      {
        "name": "Videotape Copy",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/videotapecopy.png",
        "tierClass": "decent",
        "comment": "Extends the range at which powered TVs can inflict condemn stacks on Survivors when you teleport. Despite the small increase of only 2 meters, this contributes to an overall gain of 25% extra range, which can really make a difference in some maps. A fairly simple add-on to use if you want to make your condemn even more oppressive."
      },
      {
        "name": "Old Newspaper",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/oldnewspaper.png",
        "tierClass": "decent",
        "comment": "Slightly increases the flickering periods of invisibility that occur when you manifest. This makes it even more possible to confuse a Survivor about your exact current location for long enough to catch them by surprise at a small loop and land a hit that would otherwise be impossible. Not a bad effect, but not ideal for beginners that still haven't mastered this type of trick yet."
      },
      {
        "name": "Yoichi's Fishing Net",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/yoichisfishingnet.png",
        "tierClass": "decent",
        "comment": "Applies a continuous Blindness status effect to any Survivor with 4 or more stacks of condemn. This can cripple an already vulnerable Survivor's ability to gather critical information. In some situations, the effect can last for a long time (or even permanently) if a Survivor has enough locked stacks of condemn after being hooked. Definitely situational, but quite powerful given the right circumstances."
      },
      {
        "name": "Well Stone",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/wellstone.png",
        "tierClass": "decent",
        "comment": "Reduces the cooldown of TVs by -7 seconds (10%), making them activate again sooner after being turned off by a Survivor (normally 70 seconds). This effect will not trigger often if you're playing her very aggressively and teleporting to TVs a lot to build up condemn, but it can help you pressure Survivors sooner if they manage to turn a few TVs off while you were busy doing something else."
      },
      {
        "name": "Cabin Sign",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/cabinsign.png",
        "tierClass": "decent",
        "comment": "Reduces the cooldown of TVs by 4.5 seconds (10%), making them activate again sooner after teleporting to them yourself (normally 45 seconds). Not a bad effect for its rarity."
      },
      {
        "name": "Distorted Photo",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/distortedphoto.png",
        "tierClass": "almost-no-effect",
        "comment": "Nearby Survivors will scream and briefly have their auras revealed for 4 seconds if they're looking at you when you manifest. This effect can occasionally help you discover or keep track of Survivors that run out of line of sight, but it's otherwise quite gimmicky. Very occasionally, you might find yourself able to interrupt a Survivor inserting a tape or doing some other critical action, although the scream itself doesn't prevent them from using pallets or windows in chase."
      },
      {
        "name": "VCR",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/vcr.png",
        "tierClass": "almost-no-effect",
        "comment": "Makes all TVs play the same sound as the one that you're actually teleporting to, which can occasionally scare some Survivors to induce them to waste a bit of time before they realize what's going on. Sadly, this effect just isn't that impactful."
      },
      {
        "name": "Rickety Pinwheel",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/ricketypinwheel.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts Survivors with the Oblivious status effect when within 8m of a powered TV, which lingers for an additional 7 seconds after they leave its radius. Not a terribly impactful add-on, especially considering that Sadako has her own lullaby-type sound that will always give away your approach. This add-on might also have the downside of making Survivors more aware of the presence of powered TVs and thus encourage to disable them even more."
      },
      {
        "name": "Sea-Soaked Cloth",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/seasoakedcloth.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts Survivors with the Blindness status effect when within 8m of a powered TV, which lingers for an additional 7 seconds after they leave its radius. Not a terribly impactful add-on, and might even have the downside of making Survivors more aware of the presence of powered TVs and thus encourage to disable them even more."
      },
      {
        "name": "Telephone",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/telephone.png",
        "tierClass": "almost-no-effect",
        "comment": "When demanifesting within 7 meters of a Survivor, this add-on inflicts them with an extremely brief and small hindered effect (-3% speed for 3 seconds). This should help you close the gap and make certain hits easier to land, but the effect itself is so tiny that it's honestly hard to even tell when it has made an actual difference."
      },
      {
        "name": "Mother's Mirror",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/mothersmirror.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the time period where flickering invisibility occurs after you manifest, making it last an extra 2 seconds. You can pair this with the brown Old Newspaper to get the most out of this invisibility, or simply use it on its own and hope that the effect will help you passively. Since this period of invisibility itself isn't that long, this add-on simply isn't that reliable."
      },
      {
        "name": "Clump of Hair",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/clumpofhair.png",
        "tierClass": "almost-no-effect",
        "comment": "When using this add-on, Survivors will begin to see your flickering body a bit later as you approach them. However, the effect is very small and in most situations you don't approach Survivors in the open, since it's typically a better idea to conceal your approach. Unfortunately, this add-on doesn't change the noise or &#34;lullaby&#34; that you emit so Survivors can still react to that to know that you're coming."
      },
      {
        "name": "Tape Editing Deck",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/tapeeditingdeck.png",
        "tierClass": "almost-no-effect",
        "comment": "Makes all Survivors start with a tape on their hand that they must deliver to the furthest spawned TV, and also reveals their auras whenever they successfully insert a tape into a TV to remove their condemn. The aura reveal effect is slightly redundant but not too bad. Making all Survivors start with a tape, however, is generally a detrimental effect that makes it easier for them to immediately begin to undo any condemn they might have gained. Arguably, you could use this add-on to easily figure out someone's target TV that they need to reach and play defensive around it, but risk and reward of this strategy isn't always favorable. Definitely stay away from this add-on unless you know what you're doing."
      },
      {
        "name": "Iridescent Videotape",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/onryo/iridescentvideotape.png",
        "tierClass": "detrimental",
        "comment": "This add-on is meant to increase your mobility by allowing you teleport to the same TV repeateadly without turning it off. However, there's almost never a situation where doing this is necessary. It also makes TVs take longer to reactivate when Survivors disable them. On top of that, it has the horrible downside of removing your ability to spread condemn every time you teleport."
      }
    ]
  },
  "dredge": {
    "displayName": "Dredge",
    "addons": [
      {
        "name": "Ottomarian Writing",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/ottomarianwriting.png",
        "tierClass": "strongest",
        "comment": "Reduces the power cooldown outside of Nightfall from 10 to 8 seconds, saving you 2 seconds every time you teleport to a locker or to your remnant. The shorter cooldown helps to use your power aggressively, recover from a mistake sooner and even spam remnant teleports to fill up the Nightfall meter sooner. Since you'll spend most of the match outside of Nightfall, you'll benefit from this effect more often than not. Keep in mind that this add-on doesn't affect your cooldown during Nightfall, which is much faster by default (only 4 seconds)."
      },
      {
        "name": "Field Recorder",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/fieldrecorder.png",
        "tierClass": "strongest",
        "comment": "This add-on forces Nightfall to begin at the start of the game and when the last generator is completed. Keep in mind that despite starting out in Nightfall mode, your initial cooldown is not any faster, which means that you cannot teleport fast immediately. Despite this, having two extra Nightfalls is a really powerful effect that pairs extremely well with certain other add-ons (such as the blue Broken Doll) and endgame perks. Additionally, this add-on has a secondary effect that exhausts anyone that comes into contact with your remnant. It doesn't come into play very often, but it's still nice to have. Overall, a strong add-on that is particularly difficult to deal with for beginner Survivors."
      },
      {
        "name": "Broken Doll",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/brokendoll.png",
        "tierClass": "good",
        "comment": "Adds an extra 20 seconds to the duration of Nightfall, bringing it to a total of 80 seconds. A simple yet powerful effect, it pairs well with other add-ons to trigger Nightfall more frequently such as the green Malthinker's Skull or purple Field Recorder."
      },
      {
        "name": "Haddie's Calendar",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/haddiescalendar.png",
        "tierClass": "good",
        "comment": "Allows you to emerge from a locked locker slightly faster by about 0.4 seconds. This effect is noticeable and gives Survivors less time to get away from you. Keep in mind that your speed when coming out of unlocked lockers is not affected by this add-on at all. This add-on is universally useful but it pairs particularly well with other add-ons related to locked lockers, such as the blue Worry Stone or the brown Caffeine Tablets."
      },
      {
        "name": "Lavalier Microphone",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/lavaliermicrophone.png",
        "tierClass": "good",
        "comment": "Reveals the auras of all Survivors when you've used all of your teleport tokens. Even though you won't be able to teleport again to immediately act on this information, seeing everyone at once is still a really powerful effect. Additionally, the secondary effect of this add-on will make lockers open as if you were coming out of them whenever you teleport. This can scare Survivors into leaving a generator (which can trigger certain perks). More importantly, if you pay attention to locker auras during your teleport, this locker animation can reveal which lockers have Survivors next to them before you even trigger the main aura reading effect. Overall, the information that you can gather with this add-on can be incredibly game-changing but you might be ultimately unable to act on it due to your other limitations and weaknesses."
      },
      {
        "name": "Malthinker's Skull",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/malthinkersskull.png",
        "tierClass": "good",
        "comment": "Increases the passive gain that occurs when Survivors are injured. The effect is obviously stronger when multiple Survivors are injured at the same time. Generally stronger than the other add-ons that speed up Nightfall, but it's still probably less impactful than the Broken Doll or Field Recorder. Keep in mind that Survivors on the ground or on a hook do not count as injured."
      },
      {
        "name": "Iridescent Wooden Plank",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/iridescentwoodenplank.png",
        "tierClass": "good",
        "comment": "Makes all Survivors vulnerable to being insta-downed in the final few seconds of Nightfall. This is highly situational and not too reliable, but getting an insta-down is a powerful effect even if you only manage to do it once or twice. Keep in mind that extending the Nightfall duration with the blue Broken Doll add-on doesn't increase the duration of this one. Pairs well with the Field Recorder for a chance to instadown at the start and near the end of the game."
      },
      {
        "name": "Boat Key",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/boatkey.png",
        "tierClass": "good",
        "comment": "Slightly increases your teleporting speed when outside of Nightfall, which is particularly helpful on some of the larger maps. This effect is also very helpful when teleporting to a locker to intercept a Survivor during chase. Additionally, the secondary effect of this add-on breaks all existing lockers as soon as the exit gates are powered, giving it good synergy with endgame builds. Keep in mind that your teleporting speed during Nightfall is unaffected by this add-on, but that's not an issue since it's already so fast anyway."
      },
      {
        "name": "Worry Stone",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/worrystone.png",
        "tierClass": "decent",
        "comment": "Shows you the auras of any Survivors that lock a locker. This information is particularly helpful earlier on, since Survivors typically start the match by locking nearby lockers. Despite being countered by some Survivor perks that prevent auras from being revealed, this is still a strong effect if you pay enough attention to your surroundings. The aura shown might come too late to really capitalize on it, but at least it will make sure that you're entering chases early and possibly throughout the match."
      },
      {
        "name": "Tilling Blade",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/tillingblade.png",
        "tierClass": "decent",
        "comment": "A unique add-on that applies several status effects when injuring a healthy Survivor during Nightfall. The main issue of this add-on comes from the fact that it only affects healthy Survivors. Since being injured accelerates the Nightfall meter, it's very common to enter Nightfall when many Survivors are already injured in the first place."
      },
      {
        "name": "Caffeine Tablets",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/caffeinetablets.png",
        "tierClass": "decent",
        "comment": "When charging your power, this add-on highlights all locked lockers in a distinct yellow color. This can help you get a sense of the places where Survivors have been and also allows you to find an unlocked locker if it's available. It's also really useful early on in case you're struggling to get a sense of where the Survivors spawned."
      },
      {
        "name": "Follower's Cowl",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/followerscowl.png",
        "tierClass": "decent",
        "comment": "This add-on unlocks the ability to detect Survivors within a short range of 16 meters when teleporting back to your remnant, which is something that normally only happens during Nightfall. This is a great tool to quickly search areas where you suspect a Survivor might be hiding, since the Killer Instinct detection cannot be countered by any Survivor perk. The only unfortunate downside is that activating this ability will reset your power cooldown of 10 seconds. For that reason, it pairs well with the blue Ottomarian Writing, which reduces your cooldown to only 8 seconds. Remember that teleporting to your remnant also gives a small bump of progress to the Nightfall meter as well, so it can be a good idea to do it if you've got nothing else to do for a bit."
      },
      {
        "name": "Fallen Shingle",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/fallenshingle.png",
        "tierClass": "almost-no-effect",
        "comment": "Slightly increases the passive gain of Nightfall meter when you're inside lockers. This includes the time when you're actively traversing and the brief moments when you're breaking a lock before emerging. The passive Nightfall meter gain from being in lockers is already extremely high, but with this add-on you can gain it even more aggressively. In some rare situations, it can really pay off to wait inside a locker for a few moments to make Nightfall happen a bit sooner. Unfortunately, this add-on is also extremely outclassed by the green Malthinker's Skull."
      },
      {
        "name": "Burnt Letters",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/burntletters.png",
        "tierClass": "almost-no-effect",
        "comment": "Gives a small boost to the Nightfall meter gain when injuring a healthy Survivor. Unfortunately, the extra gain is only 1.6% of the total meter. It's also extremely outclassed by the effects of the green Malthinker's Skull."
      },
      {
        "name": "Sacrificial Knife",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/sacrificialknife.png",
        "tierClass": "almost-no-effect",
        "comment": "Blocking windows seems like a strong effect but this add-on simply has too many conditions; the vault needs to be within 16 meters; the blocking only lasts 5 seconds; Survivors can vault when they hear your locker arrival sound before you emerge (especially if the locker is locked); it has no effect on pallets; it doesn't work outside of Nightfall... and more importantly, it won't help you in maps with bad locker placements. For all of these reasons, this add-on is incredibly underwhelming. At its best, it might deny a strong vault momentarily and force a Survivor to take a riskier path or give up a strong pallet, but even then, it's an extremely mediocre effect considering its rarity."
      },
      {
        "name": "Destroyed Pillow",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/destroyedpillow.png",
        "tierClass": "almost-no-effect",
        "comment": "Decreases your power cooldown during Nightfall from 4 to only 1.5 seconds. This allows you to teleport almost constantly or use your remnant very aggressively. However, since your recovery is already pretty short, this add-on is slightly redundant and is typically outclassed by others that help accelerate Nightfall or help you outside of it (when you are at your weakest)."
      },
      {
        "name": "Wooden Plank",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/woodenplank.png",
        "tierClass": "almost-no-effect",
        "comment": "Gives a small boost to the Nightfall meter gain when hook a Survivor. Unfortunately, the extra gain is only 1.6% of the total meter. It's extremely outclassed by the effects of the green Malthinker's Skull."
      },
      {
        "name": "Air Freshener",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/airfreshener.png",
        "tierClass": "almost-no-effect",
        "comment": "Gives you a 4th teleport token, allowing you to teleport one more time before having to emerge from a locker. Particularly useful when you accidentally teleport to the wrong locker. Otherwise, the extra teleport is often unnecessary. If you want to speed up your mobility or improve your ability to track Survivors, there are several other add-ons that help much more than this one."
      },
      {
        "name": "War Helmet",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/warhelmet.png",
        "tierClass": "almost-no-effect",
        "comment": "Extending the Killer Instinct duration is simply a really useless effect. If you want to increase your ability to track or follow Survivors in general, there are far better options available."
      },
      {
        "name": "Mortar and Pestle",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dredge/mortarandpestle.png",
        "tierClass": "detrimental",
        "comment": "This add-on changes the direction that the Dredge faces when teleporting back to his remnant. It gives you a bit more flexibility, since you get to chose exactly where to look, but overall it's best to not get used to this add-on. When placing a remnant, you generally want to place it looking at the best possible angle in the first place."
      }
    ]
  },
  "wesker": {
    "displayName": "Wesker",
    "addons": [
      {
        "name": "Unicorn Medallion",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/unicornmedallion.png",
        "tierClass": "strongest",
        "comment": "This add-on makes your shorter first bound a bit longer at the cost of making the second one slightly shorter. Despite making your overall distance a tiny bit worse, this add-on is certainly worth bringing. The extra range allows you to position yourself quickly and outplay Survivors trying to run around the corners of common structures like jungle gyms or the shack. You can also occasionally hit a Survivor before they reach safety with a single dash thanks to this add-on. On top of that, shortening your second dash makes it less punishing to miss a Survivor with your bound, as you won't end up as far. Some advanced players also seek this add-on for its potential to help you pull off certain tricks that involve sliding along certain obstacles."
      },
      {
        "name": "Lab Photo",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/labphoto.png",
        "tierClass": "strongest",
        "comment": "Allows you to very quickly break a pallet with your special attack. This often allows you to trap Survivors in certain areas without giving them the chance to reach the next point of safety. Keep in mind that this add-on completely removes your ability to vault pallets, which in some rare cases you might actually prefer over the pallet break. Many advanced players like to run the perk &#34;Brutal Strength&#34; to help them stay on target after a pallet break, and this add-on can serve as a replacement for it. Compared to breaking a pallet normally, this add-on also allows you to move sooner and regain your speed and momentum a little bit sooner. Since you might have a single token left, you will sometimes be able to use it to immediately grab a Survivor that didn't make enough distance. For that reason, it pairs very well with the brown Unicorn Medallion."
      },
      {
        "name": "Iridescent Uroboros Vial",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/iridescenturoborosvial.png",
        "tierClass": "good",
        "comment": "Makes all Survivors start infected, which will typically force them to waste precious seconds frantically trying to remove the infection early. If interrupted early, this can lead to a very difficult first chase. Forcing the use of several sprays early on also makes it easier for Survivors to eventually run out of them, which is hard to achieve but very scary for Survivors nonetheless. The secondary effect of this add-on is also quite powerful, making Survivors exposed to an insta-down with a basic attack which stays for 30 seconds and doesn't go away after removing the infection."
      },
      {
        "name": "Loose Crank",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/loosecrank.png",
        "tierClass": "good",
        "comment": "Increasing the movement speed between your dashes (after performing the first bound but before activating the second one. This increased speed allows you to readjust your position to reach around a corner or obstacle and make sure that you'll land the follow up dash. Overall a very solid and safe choice for any player."
      },
      {
        "name": "Jewel Beetle",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/jewelbeetle.png",
        "tierClass": "good",
        "comment": "This add-on significantly shortens the amount of distance that you drag Survivors before throwing them, making it much easier to throw them against a wall instead of slamming them. Even though throwing has some situational downsides, it generally leads to more dangerous situations where Survivors are unable to reach safety before they are hit again. It also makes your dash token recovery start sooner. If used by an experienced player, this add-on can often shorten your chases very dramatically."
      },
      {
        "name": "Leather Gloves",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/leathergloves.png",
        "tierClass": "good",
        "comment": "Provides a small but noticeable boost to the token recovery speed, allowing you to gain your ability to perform multiple dashes quicker. Keep in mind that your recovery also gets slightly faster for each Survivor that is currently infected. This add-on stacks on top of this passive effect."
      },
      {
        "name": "Bullhorn",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/bullhorn.png",
        "tierClass": "good",
        "comment": "Survivors lose the ability to hear your terror radius for some time after removing the infection with a first aid spray. This can confuse certain players or force them into playing very passively if they're unaware of your location. Particularly useful when paired with other add-ons to detect infected Survivors."
      },
      {
        "name": "Egg (Gold)",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/egggold.png",
        "tierClass": "good",
        "comment": "Extends the window of time between your dashes, allowing you to reposition for longer before using second dash. In some rare cases, this longer period can lead to more wasted time, but overall this is a solid add-on that catches many Survivors off-guard when they think you're already in cooldown. Even more importantly, this add-on indirectly affects the speed at which you move during this period so in can result in slightly faster movement."
      },
      {
        "name": "Uroboros Tendril",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/uroborostendril.png",
        "tierClass": "decent",
        "comment": "Increases your movement speed while charging your dash, something that you will do very often throughout the match. This makes it less punishing to fake or cancel your power during chase and overall increases your ability to zone Survivors away from safety."
      },
      {
        "name": "Lion Medallion",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/lionmedallion.png",
        "tierClass": "decent",
        "comment": "This add-on extends the distance that Survivors are thrown after being grabbed, making it easier to ensure that they hit an obstacle and take damage. Throwing Survivors against obstacles has several advantages over slamming; it starts your token recovery sooner and often leads to easy follow-up hits. Pairs well with the brown Jewel Beetle add-on to make throws even more consistent. Keep in mind that if you slam a Survivor against a wall, this add-on has no effect whatsoever. There's also some rare situations where slamming is actually preferable, such as when a healthy Survivor is fully infected. Additionally, some surfaces have &#34;soft&#34; edges where Survivors will often slide instead of being damaged, and this add-on unfortunately does not always help in these cases."
      },
      {
        "name": "Chalice (Gold)",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/chalicegold.png",
        "tierClass": "decent",
        "comment": "This add-on extends the distance that Survivors are dragged before being thrown, making it far more likely that you will slam them against a wall directly. It also reduces the likelihood of accidentally throwing them into nothing, which is particularly helpful for beginners. Advanced players often don't need this extra help and prefer to throw Survivors into obstacles instead of slamming, since this makes it much harder for the Survivor to avoid a follow-up attack. Keep in mind that if a healthy Survivor is fully infected, you will only insta-down them with a slam. In those cases, this add-on is quite helpful."
      },
      {
        "name": "Helicopter Stick",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/helicopterstick.png",
        "tierClass": "decent",
        "comment": "Shows you the aura of a Survivor that just had their infection removed with a first aid spray. This add-on can immediately give away the presence of the perk &#34;Off the Record&#34;, giving you valuable information about how vulnerable a Survivor is shortly after being unhooked. In bigger maps, it also allows you to approach a Survivor with efficient pathing despite your large terror radius. This add-on pairs well with anything that provides stealth, including perks like &#34;Hex: Fortune's Fool&#34; or the green Bullhorn add-on."
      },
      {
        "name": "Video Conference Device",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/videoconferencedevice.png",
        "tierClass": "decent",
        "comment": "This add-on provides a massive boost to the passive infection that Survivors build up over time. This has become slightly less oppressive after the overall nerf to infection effects, but it still holds decent value. Becoming fully infected quicker is still very punishing for Survivors, as they become hindered and exposed. This add-on pairs well with a variety of others and makes it even easier to put a lot of pressure on Survivors via infection, especially in hectic situations where a team might find itself overwhelmed and unable to quickly remove infections."
      },
      {
        "name": "Dark Sunglasses",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/darksunglasses.png",
        "tierClass": "decent",
        "comment": "If a Survivor reaches full infection, you will become stealthy for a short period of time. With a bit of luck, this can allow you to ambush them or other Survivors unexpectedly. Keep in mind that Survivors don't always reach full infection, so this add-on is somewhat unreliable."
      },
      {
        "name": "Uroboros Virus",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/uroborosvirus.png",
        "tierClass": "decent",
        "comment": "Allows you to quickly locate a Survivor that has become fully infected and is now vulnerable to being insta-downed. Particularly useful in chaotic situations and when paired with the green Bullhorn add-on, which might hide your approach. However, keep in mind that there are several Survivor perks that could prevent their aura from being revealed and that many times Survivors never even reach full infection in the first place."
      },
      {
        "name": "Red Herb",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/redherb.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on increases the usage time of first aid sprays from 5 to 7 seconds. In most scenarios, this small increase won't make much of a difference."
      },
      {
        "name": "Green Herb",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/greenherb.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the infection build up that occurs after grabbing a Survivor with your special attack. Seems nice in theory, but in practice this almost never makes a difference. The effects of this add-on are extremely mediocre and are completely outclassed by the blue Video Conference Device add-on, which is a more consistent choice if you're trying to keep Survivors fully infected."
      },
      {
        "name": "Portable Safe",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/portablesafe.png",
        "tierClass": "almost-no-effect",
        "comment": "Haemorrhage is not that particularly strong on its own, and you're not even always guaranteed to get decent value out of this add-on unless you finish the chase with a special attack."
      },
      {
        "name": "Maiden Medallion",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/maidenmedallion.png",
        "tierClass": "almost-no-effect",
        "comment": "Blindness does not have a consistently strong effect on Survivors, especially when it happens only during full infection which is already a pretty rare event."
      },
      {
        "name": "R.P.D. Shoulder Walkie",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/wesker/rpdshoulderwalkie.png",
        "tierClass": "detrimental",
        "comment": "This add-on shortens your already short first bound and extends your second bound. Despite giving you slightly more distance overall, this extra mobility is almost unnoticeable and is not worth the trouble. The main issue with this add-on is that it greatly limits your ability to use your power around common structures. If you ever miss a follow-up dash, which happens frequently, the extra distance will also work against you by sending you even further than usual. Some advanced players use this add-on for its potential to help you land some rare tricks in certain maps, but this add-on is best avoided in general."
      }
    ]
  },
  "knight": {
    "displayName": "Knight",
    "addons": [
      {
        "name": "Call to Arms",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/calltoarms.png",
        "tierClass": "strongest",
        "comment": "This add-on allows you to send out the guards faster and further, even slightly outside of your 32 meter terror radius. This effect is almost universally useful and thus this add-on pairs well with basically anything else. Placing guards far away allows you to interrupt gens and has other benefits as well, such as the small haste effect after deploying a distant guard. Without this add-on, you'll often find yourself unable to act on the information provided by your perks without having to spend precious seconds traveling around the map first. Being able to place guards from very far distances also makes it less likely that Survivors will hear yout terror radius and begin to run away preemptively."
      },
      {
        "name": "Dried Horsemeat",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/driedhorsemeat.png",
        "tierClass": "strongest",
        "comment": "The extra timer can really help distract Survivors for longer, ensure that your guards get a hit, or delay their deactivation timer even if you happen to get a bit close to them (which normally makes this timer go much faster). A solid choice to ensure that Survivors are kept busy if they try to outrun guards."
      },
      {
        "name": "Town Watch's Torch",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/townwatchstorch.png",
        "tierClass": "strongest",
        "comment": "Being Undetectable during a Hunt is a really decent effect and triggers fairly frequently. Not bad at all, especially if you're able to consistently keep Survivors busy with long distance hunts. Particularly effective in maps with low visibility for Survivors."
      },
      {
        "name": "Map of the Realm",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/mapoftherealm.png",
        "tierClass": "good",
        "comment": "This add-on provides a boost to the detection radius of all your guards, making them more likely to locate a Survivor when placed nearby and also making them better at covering an area that Survivors might want to step into. A very decent effect and a perfectly safe pick if you don't want to overthink your add-ons."
      },
      {
        "name": "Sharpened Mount",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/sharpenedmount.png",
        "tierClass": "good",
        "comment": "Increases the delay before Survivors can grab the banner to escape a guard hunt, which is particularly noticeable on the Jailer since he has the longest delay of all guards. The increase of 15% doesn't make a huge difference but it will consistently buy you some extra distraction time against Survivors that try to grab the flag (which is typically the best strategy to follow if they're not being actively chased by you as well)."
      },
      {
        "name": "Iridescent Company Banner",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/iridescentcompanybanner.png",
        "tierClass": "good",
        "comment": "Powerful window-blocking effect, but if you reveal it early on, Survivors will expect the exit gate blockage later on."
      },
      {
        "name": "Blacksmith's Hammer",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/blacksmithshammer.png",
        "tierClass": "good",
        "comment": "Inflicts Broken for 60 seconds if a guard gets a hit. Even if it only triggers a couple times per match, it can occasionally cripple a team's ability to get back on its feet."
      },
      {
        "name": "Knight's Contract",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/knightscontract.png",
        "tierClass": "decent",
        "comment": "Allows you to kick gens, walls or pallets with your guards and still detect and chase nearby Survivors afterwards. Obviously more useful with the Carnifex, since he'll be able to detect them earlier after his quick break animation. The main advantage of this add-on is the fact that you'll be both regressing the generator and pushing a Survivor away from it afterwards, instead of just one of those things. An overall very decent effect in theory, but the current bug makes it wildly inconsistent. NOTE: Unfortunately, this add-on seems to be currently bugged and does not work as intended, making guards linger without detecting nearby Survivors for some reason."
      },
      {
        "name": "Cold Steel Manacles",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/coldsteelmanacles.png",
        "tierClass": "decent",
        "comment": "Reduces the cooldown of the Jailer by -20%. Useful if you want to keep Survivors busy for the longest possible time often, since that's what the Jailer exceeds at."
      },
      {
        "name": "Battle Axe Head",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/battleaxehead.png",
        "tierClass": "decent",
        "comment": "Reduces the cooldown of the Carnifex by -20%. This guard already has the shortest cooldown of all three of them, but he is quite useful in chase and it's not a terrible effect. Particularly useful if you plan to use him to break pallets quickly in chase."
      },
      {
        "name": "Treated Blade",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/treatedblade.png",
        "tierClass": "decent",
        "comment": "Reduces the cooldown of the Assassin by -20%. Since Assassin has the longest cooldown of all three (30 seconds), this effect is even more noticeable. Useful if you want to use the Assassin frequently to increase your chances to passively hit Survivors, sometimes even without any direct chase involved."
      },
      {
        "name": "Healing Poultice",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/healingpoultice.png",
        "tierClass": "decent",
        "comment": "Provides a particular useful aura reading on a Survivor near the spawn point of the Assassin, which can help you pinpoint their direction early and make it easier to ambush them. Keep in mind that you can also generally find out the direction of a Survivor by looking at your guard and seeing where they're facing as they begin the hunt, so this effect is slightly redundant in most situations."
      },
      {
        "name": "Flint and Steel",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/flintandsteel.png",
        "tierClass": "decent",
        "comment": "Shows auras of Survivors near downed pallets when using the Carnifex. Interesting effect, but doesn't come into play all that much. Also gets countered by anti-aura reading perks. Can be quite interesting if you leave some unsafe downed pallets around the map to increase its chances to detect Survivors across it."
      },
      {
        "name": "Grim Iron Mask",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/grimironmask.png",
        "tierClass": "almost-no-effect",
        "comment": "Unlike other add-ons, this one triggers immediately upon the start of a hunt, making it a bit more consistent and a decent way to deny information from aura perks."
      },
      {
        "name": "Broken Hilt",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/brokenhilt.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts Haemorrhage and Mangled for 70 seconds if a guard gets a hit. A nice effect, but guards rarely get hits by themselves (especially if you're already dedicating one add-on slot to this add-on)."
      },
      {
        "name": "Ironworker's Tongs",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/ironworkerstongs.png",
        "tierClass": "almost-no-effect",
        "comment": "Makes a Survivor Oblivious for 60 seconds when they escape a hunt, making things slightly more unpredictable for them. Keep in mind that hitting a Survivor that is being hunted does not trigger this add-on. They need to fully escape it themselves. This add-on shines a bit more if you pair it with the blue Town Watcher's Torch to double down on the idea of being stealthy."
      },
      {
        "name": "Tattered Tabard",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/tatteredtabard.png",
        "tierClass": "almost-no-effect",
        "comment": "Increase a guard's patrol time, making it more effective and controlling an area for a while. Particularly useful on the Jailer. Do be careful not to keep guards in useless areas for too long, however, as this would delay their eventual cooldown timer and keep them unavailable when you actually need them."
      },
      {
        "name": "Pillaged Mead",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/pillagedmead.png",
        "tierClass": "almost-no-effect",
        "comment": "Breaking pallets, walls or generators slightly faster is typically not too impactful. The Carnifex is already almost instant and the other two are still too slow for you to wait until a pallet or wall has been broken. Furthermore, in some rare situations, you might actually want the action to be slow so that it prevents Survivors from interacting with a generator for even longer."
      },
      {
        "name": "Jailer's Chimes",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/jailerschimes.png",
        "tierClass": "almost-no-effect",
        "comment": "Shows the auras of Survivors crossing the patrol path of the Jailer. Sounds useful, but this trigger condition is simply too rare and will almost never happen."
      },
      {
        "name": "Gritty Lump",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/knight/grittylump.png",
        "tierClass": "detrimental",
        "comment": "Since guards begin to walk backwards upon their spawn, making them patrol faster can sometimes lead to them failing to detect a Survivor that's running away. Feel free to use it if you know what you're doing, though. If you want their detection to be more reliable, the brown Map of the Realm is the superior choice."
      }
    ]
  },
  "skull merchant": {
    "displayName": "Skull Merchant",
    "addons": [
      {
        "name": "Ultrasonic Speaker",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/ultrasonicspeaker.png",
        "tierClass": "strongest",
        "comment": "Slightly reduces the invulnerability period when scanned by a drone, making it easier for Survivors to be scanned multiple times quickly. It's only a 0.25s reduction but it will come into play pretty often if you're using your drones in chase and it can make a huge difference if it manages to catch a Survivor that would otherwise get away."
      },
      {
        "name": "Vital Targeting Processor",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/vitaltargetingprocessor.png",
        "tierClass": "good",
        "comment": "Increases the slowdown that Survivors experience from 8% to 10%, improving your chances to catch them at certain loops. Keep in mind that Survivors are only slowed down after they get scanned at least 4 times, so this effect won't come up during chase immediately. When it does, however, it will make getting away from you even harder."
      },
      {
        "name": "Prototype Rotor",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/prototyperotor.png",
        "tierClass": "good",
        "comment": "Slightly increases the rotation speed of the drones' scan lines by 10%. One of the only ways to improve the effectiveness of your drones. Can be used with the brown Ultrasonic Speaker to make the drone scans slightly more consistent or the blue Vital Targeting Processor to increase the chances that a slowdown occurs."
      },
      {
        "name": "Geographical Readout",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/geographicalreadout.png",
        "tierClass": "good",
        "comment": "Gives a small but noticeable 20% boost to action speeds (breaking, vaulting...) for 8 seconds after placing a drone. A pretty universally useful effect that makes you even more efficient and saves quite a bit of time over the course of a full match. Needless to say, it can be stacked with perks such as &#34;Brutal Strength&#34; or &#34;Bamboozle&#34; if you want an even faster action speed."
      },
      {
        "name": "Iridescent Unpublished Manuscript",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/iridescentunpublishedmanuscript.png",
        "tierClass": "good",
        "comment": "Produces a terror radius on any drone that becomes disabled, while also giving you the Undetectable status for the same duration (15 seconds). This is not extremely powerful on its own but it can work quite well with terror radius based perks that apply annoying effects. It also indirectly works as an early warning that someone is sabotaging your drones. The extended stealth effect is particularly useful in maps with low visibility if you don't want to micro-manage your own drones to achieve prolonged stealth."
      },
      {
        "name": "Expired Batteries",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/expiredbatteries.png",
        "tierClass": "good",
        "comment": "Makes all Survivors start claw-trapped (with a one-time shorter duration than normal), which immediately applies effects from other add-ons. More importantly, it reveals all Survivor locations in your radar and gives you a decent chance to ambush them or at least disrupt several of them at once. The secondary effect increases the duration of claw-traps progressively each time Survivors get them, making them slightly more effective."
      },
      {
        "name": "Brown Noise Generator",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/brownnoisegenerator.png",
        "tierClass": "decent",
        "comment": "Keeps a Survivor in the Oblivious status effect for as long as they are claw-trapped, which by default is 45 seconds. Not a terrible effect at all when it happens outside of chase, since you could use their lack of awareness to easily ambush them with your radar. However, this effect can sometimes feel redundant since Survivors might already be aware of your location or you might already have your own stealth anyway. This add-on can be paired with the iridescent Expired Batteries to make everyone Oblivious at the start for about 20 seconds."
      },
      {
        "name": "Powdered Glass",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/powderedglass.png",
        "tierClass": "decent",
        "comment": "Applies the Mangled and Haemorrhage effects for 70 seconds after landing a basic attack on a claw-trapped a Survivor. Unlike some other add-ons, this effect doesn't become redundant if you down the Survivor, as they'll need to deal with the slower healing when they become unhooked later. It can also be quite nasty if you find yourself slugging one or multiple Survivors on the ground for extended periods of time after a chaotic turn of events. Not a terrible effect, but it also doesn't help in chase directly."
      },
      {
        "name": "Adaptive Lighting",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/adaptivelighting.png",
        "tierClass": "decent",
        "comment": "Increases the duration of the Undetectable status that you normally get after recalling a drone (8 seconds by default), giving you an extra couple seconds before it ends. Useless if you never cycle through your drones but can shine a bit if you use them intermittently to help you have less downtime on the Undetectable. That being said, if you're constantly cycling through your drones you can keep a very good level of stealth even without this add-on. This can be easily achieved by keeping one drone in hand that you're constantly placing and removing immediately (occasionally replacing redundant drones here and there to improve their location)."
      },
      {
        "name": "Randomised Strobes",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/randomisedstrobes.png",
        "tierClass": "decent",
        "comment": "Adds an extra 1 second to the time that Survivors become hindered when tagged by a drone several times. Most of the times, this slightly longer duration simply does not make a difference in chase. The blue Vital Targeting Processor is more likely to give you noticeable results instead."
      },
      {
        "name": "Stereo Remote Mic",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/stereoremotemic.png",
        "tierClass": "decent",
        "comment": "Very slightly reduces the downtime of disabled drones, allowing them to come back online sooner after being disarmed by Survivors. Drones will reactivate in ~38 seconds instead of the usual 45 seconds. A pretty simple add-on that helps to keep Survivors busy if you cannot replace the drone yourself, but the effect itself is quite small."
      },
      {
        "name": "Loose Screw",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/loosescrew.png",
        "tierClass": "decent",
        "comment": "Exhausts any Survivor that becomes claw-trapped. Despite the duration only being 6 seconds, you can obviously force it to last a much longer time if you keep chasing the Survivor and dont' give them a chance to recover from it. This add-on can occasionally prevent Survivors from using common exhaustion perks and simplify your chases, but it's quite unreliable since there's a chance that the Survivor might have already used their exhaustion perk before they're claw-trapped."
      },
      {
        "name": "Supercharge",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/supercharge.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the lifespan of claw-traps, making them last ~52 seconds instead of the default 45 seconds. Not a terrible effect since it delays a Survivor's ability to start healing again (and keeps them on your radar for longer). It synergizes with other add-ons related to claw-traps, but the extra duration isn't always critical since many times you'll end up downing the claw-trapped Survivor before the duration expires anyway. In chase, the timer is reset each time a Survivor is scanned. Outside of chase, it's exceedingly rare that Survivors become claw-trapped anyway."
      },
      {
        "name": "Shotgun Speakers",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/shotgunspeakers.png",
        "tierClass": "almost-no-effect",
        "comment": "Removes the skill check warning sounds for claw-trapped Survivors. This is a much stronger effect than that of the brown Adi Valente Issue 1, since even a few missed skill checks can make a huge difference over the course of a match. Still, this is a highly situational add-on that might genuinely provide no value if you're a bit unlucky."
      },
      {
        "name": "High-Power Floodlight",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/highpowerfloodlight.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts the Blindness status effect to claw-trapped Survivors, which normally lasts for 45 seconds. This can occasionally confuse Survivors during chase or prevent them from gathering some critical information, but overall this effect is simply not reliable enough to be worth the add-on slot. Keep in mind that once you down Survivors, their claw trap is immediately removed so the blindness won't even affect them while they're on the hook."
      },
      {
        "name": "Advanced Movement Prediction",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/advancedmovementprediction.png",
        "tierClass": "almost-no-effect",
        "comment": "Reveals the aura of claw-trapped Survivors for 6 seconds. Sounds useful, until you remember that most claw-trapped Survivors are already in front of you and that they can easily be tracked with your radar even if they're outside of your line of sight. For this reason, it's not terribly impactful."
      },
      {
        "name": "Infrared Upgrade",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/infraredupgrade.png",
        "tierClass": "almost-no-effect",
        "comment": "Briefly reveals the auras of Survivors for 4 seconds after their claw-trap is removed. This effect is sometimes redundant (for example, if you end up downing the Survivor) and rarely contributes to your awareness since you were able to track that Survivor with your radar anyway."
      },
      {
        "name": "Adi Valente Issue 1",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/adivalenteissue1.png",
        "tierClass": "almost-no-effect",
        "comment": "Slightly reduces the skill check size for any Survivor claw-trapped, which typically lasts for 45 seconds. Might seem somewhat useful at first (especially with a skill check oriented build) but keep in mind that it's exceedingly rare to claw-trap Survivors outside of chase enough for this add-on to come into play often. Even when it does, the 20% reduction of size isn't even that big of a deal on its own."
      },
      {
        "name": "High-Current Upgrade",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/highcurrentupgrade.png",
        "tierClass": "almost-no-effect",
        "comment": "Adds 1 extra second of scanned visibility to any Survivor tagged by a drone, making it last 13 seconds in total. Not an extremely impactful effect."
      },
      {
        "name": "Low-Power Mode",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/skull merchant/lowpowermode.png",
        "tierClass": "detrimental",
        "comment": "This add-on completely removes the rotation from the drone's scanning lasers. This makes them more consistent when it comes to covering certain choke points but also much more predictable and easy to avoid overall. For most players, this makes the Skull Merchant's power worse. However, it's ultimately up to you to decide if this playstyle suits you."
      }
    ]
  },
  "singularity": {
    "displayName": "Singularity,HUX-A7-13",
    "addons": [
      {
        "name": "Denied Requisition Form",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/deniedrequisitionform.png",
        "tierClass": "strongest",
        "comment": "Makes every Survivor start the match slipstreamed and delays the initial availability of the EMP stations. Having four Survivors slipstreamed makes anyone susceptible to being injured and downed very quickly at the start of the game. A pretty strong effect, but its utility fades as the match goes on."
      },
      {
        "name": "Diagnostic Tool (Repair)",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/diagnostictoolrepair.png",
        "tierClass": "strongest",
        "comment": "Increases the range at which your biopods can detect Survivors by 4 meters. Sounds small, but this provides a massive increase to their ability to cover large areas. It also makes it more likely that Survivors will be caught in their radius when holding the button to attempt an automatic lock-on when controlling a biopod. Since this add-on allows you to space out your biopods even more, it also makes it harder for Survivors to remove several of them at once with a single EMP use."
      },
      {
        "name": "Nutritional Slurry",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/nutritionalslurry.png",
        "tierClass": "good",
        "comment": "Allows you to place an extra 2 biopods in total. Not always immediately necessary, but the ability to place more biopods is always helpful in prolonged matches since it allows you to control even more parts of the map. Keep in mind that you're capable of removing redundant biopods remotely as well."
      },
      {
        "name": "Nanomachine Gel",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/nanomachinegel.png",
        "tierClass": "good",
        "comment": "Reduces the cooldown of your biopods, sometimes helping you to &#34;infect&#34; and then perform a follow-up teleport on a Survivor caught in the open before they can use an EMP or find safety. Not a bad effect, but it is quite small and it's not always ideal to wait for the cooldown period anyway. Keep in mind, however, that all biopods share a cooldown after successfully slipstreaming a Survivor, so this add-on can help even when switching to a different biopod camera!"
      },
      {
        "name": "Foreign Plant Fibres",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/foreignplantfibres.png",
        "tierClass": "good",
        "comment": "Reduces the duration of the huge movement slowdown that occurs when a pallet is dropped on you during Overclock. In the right scenario, this add-on can save you quite a bit of time and give Survivors far less distance. However, there are many situations where this slowdown doesn't occur or doesn't matter much in the first place."
      },
      {
        "name": "Live Wires",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/livewires.png",
        "tierClass": "good",
        "comment": "Survivors that get cleansed from slipstream with an EMP scream and interrupt their current action. This can trigger certain perks but most importantly, it helps to keep you aware of the Survivor locations and makes it even harder for vulnerable targets to go undetected for long. It's also really helpful to locate groups of Survivors right before they can finish a group heal."
      },
      {
        "name": "Spent Oxygen Tank",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/spentoxygentank.png",
        "tierClass": "good",
        "comment": "Applies a brief but critical Exhaustion status effect to Survivors when they become slipstreamed. Despite the brief duration, the Exhaustion will last a long time if you force them to be on the move and can prevent them from using many important perks in chase. Not the most consistent or reliable effect, since you don't really know or control which perks Survivors bring, but not bad still."
      },
      {
        "name": "Iridescent Crystal Shard",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/iridescentcrystalshard.png",
        "tierClass": "decent",
        "comment": "Allows you to see the aura of Survivors near your biopods, allowing you to use them as chasing tools or even find stealthy Survivors randomly. Not a bad effect, but you won't be typically placing most of your biopods too close to Survivors anyway, since they're better off being placed in high areas with tons of visibility."
      },
      {
        "name": "Diagnostic Tool (Construction)",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/diagnostictoolconstruction.png",
        "tierClass": "decent",
        "comment": "Reveals the auras of Survivors when they pick up EMPs. This can be really useful to find a particular target or anticipate an altruistic play from Survivors before it happens. Not a bad effect at all."
      },
      {
        "name": "Ultrasonic Sensor",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/ultrasonicsensor.png",
        "tierClass": "decent",
        "comment": "Reduces your terror radius by a significant amount (12 meters) after slipstreaming a Survivor with a biopod, making it more likely to catch them or someone else by surprise shortly after."
      },
      {
        "name": "Cremated Remains",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/crematedremains.png",
        "tierClass": "decent",
        "comment": "Inflicts the Blindness status effect to slipstreamed Survivors. Not particularly impactful during regular gameplay, but it might occasionally deny some key information from Survivors. Since the duration is infinite, it can be really useful with aggressive slugging strategies where multiple Survivors are left on the ground, especially if they're not coordinated. It can also be used with the iridescent Denied Requisition Form to immediately make each Survivor start out with the status effect."
      },
      {
        "name": "Kid's Ball Glove",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/kidsballglove.png",
        "tierClass": "almost-no-effect",
        "comment": "Slightly extends the duration of Overclock by about half a second, which also indirectly increases the duration of the Haste status effect that you get during it. Sounds good in theory but sometimes it's better to end your Overclock mode a bit earlier so that you can once again teleport by shooting a Survivor directly with your power. For that reason, this add-on often hinders you as much as it helps you, so it might be worth not to rely on it very much."
      },
      {
        "name": "Cryo Gel",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/cryogel.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts Haemorrhage for 60 seconds when a slipstreamed Survivors is hit by a basic attack. Easy enough to trigger, but the fact that it does not also apply the Mangled effect makes this far too situational to be useful."
      },
      {
        "name": "Hyperawareness Spray",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/hyperawarenessspray.png",
        "tierClass": "almost-no-effect",
        "comment": "Slipstreamed Survivors hear a constant fake terror radius (which does not apply any terror radius related effects). This faint terror radius makes it a bit harder to tell exactly how far the Killer is but it might also have the effect of making Survivors even more likely to seek out EMPs. Not a terrible effect, but definitely quite gimmicky."
      },
      {
        "name": "Broken Security Key",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/brokensecuritykey.png",
        "tierClass": "almost-no-effect",
        "comment": "Reduces the time that biopods become disabled for by 15% when hit by an EMP. The default downtime is 45 seconds, so this add-on reduces it by roughly 5 seconds. Needless to say, waiting such a long time for a biopod to come back online is not something that you can afford to do. If nearby, disabled biopods should be removed and replaced by a new one to avoid this long wait. Distant biopods can also be remotely destroyed if you need them elsewhere. In some rare situations, the small effect of this add-on might come in clutch, but it's still not something that you should rely on."
      },
      {
        "name": "Crew Manifest",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/crewmanifest.png",
        "tierClass": "almost-no-effect",
        "comment": "Reveals the aura of an &#34;infected&#34; Survivor if they spread the slipstream effect to other players. Keep in mind that when this happens, you already get a Killer Instinct effect on the newly slipstreamed player, so this add-on isn't necessary to find them. That being said, seeing the exact location of a Survivor, even briefly, can sometimes be quite helpful during chaotic situations. Similar to the green Android Arm, this add-on also increases the minimum &#34;infection&#34; distance by 2 meters, making it easier for Survivors to accidentally spread their slipstream to other Survivors, which is really not very impactful in most scenarios."
      },
      {
        "name": "Hologram Generator",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/hologramgenerator.png",
        "tierClass": "almost-no-effect",
        "comment": "Survivors become Oblivious for 60 seconds after you teleport to them. Typically, this effect has very little impact as the Survivors will be either downed or in chase anyway. It might occasionally mess with Survivors in certain maps, but this add-on doesn't have a lot going for it otherwise. Keep in mind that this effect only triggers when teleporting to them from a biopod, so it's even more situational than it might seem at first glance."
      },
      {
        "name": "Soma Family Photo",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/somafamilyphoto.png",
        "tierClass": "almost-no-effect",
        "comment": "Provides a small movement speed hinder to Survivors when you slipstream them with a biopod. Slowing down Survivor movement is never a bad thing but this effect is really tiny and almost negligible, especially when you consider that using biopods brings you to a full stop yourself. At best, you can pair this add-on with the blue Nanomachine Gel and hope that it helps you catch a Survivor right before they make it to a corner in some very specific scenarios."
      },
      {
        "name": "Android Arm",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/androidarm.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the &#34;infection&#34; distance by 2 meters, making it easier for Survivors to accidentally spread their slipstream to other Survivors. Might seem useful at first, but this add-on makes very little difference in most cases and doesn't change the fact that Survivors need a clear line of sight between them for the infection to occur. Even with this add-on, two Survivors can work on opposite ends of a generator without spreading the slipstream."
      },
      {
        "name": "Heavy Water",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/singularity/heavywater.png",
        "tierClass": "almost-no-effect",
        "comment": "Reduces the distance from which EMP crafting stations can be seen by Survivors by 8 meters, bringing it down from 32 to 24 meters. Not a terribly impacful effect, since Survivors can still easily find them, but it might force them to search a bit longer in larger maps. Keep in mind that once a Survivor is slipstreamed, they have full map aura reading of each EMP crafting station, so this add-on does nothing unless they're not slipstreamed."
      }
    ]
  },
  "xenomorph": {
    "displayName": "Xenomorph,Alien",
    "addons": [
      {
        "name": "Harpoon Gun",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/harpoongun.png",
        "tierClass": "strongest",
        "comment": "Screaming interrupts certain actions and can have good synergy with certain builds while providing consistent information throughout the match. Fun fact: if you manage to hit Survivors quickly enough, you can trigger the effect of this add-on more than once."
      },
      {
        "name": "Self-Destruct Bolt",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/selfdestructbolt.png",
        "tierClass": "good",
        "comment": "Provides a noticeable boost to your vaulting speed during crawler mode. Even though Xenomorph doesn't always need to chase Survivors through windows, this add-on can help you deal with some of the most difficult buildings and structures. The speed boost stacks with the effect of perks such as &#34;Bamboozle&#34;, but it's also decent on its own."
      },
      {
        "name": "Lambert's Star Map",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/lambertsstarmap.png",
        "tierClass": "good",
        "comment": "Reduces the range of the turrets, allowing you to get a little closer before you start getting hit by their flames. The smaller range also makes it more likely that you can sometimes ignore some turrets altogether without having to bother to destroy them in the first place. A very decent effect."
      },
      {
        "name": "Semiotic Keyboard",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/semiotickeyboard.png",
        "tierClass": "good",
        "comment": "This add-on turns turrets into sources of information, and will often reveal which generators need your attention multiple times during a match. This add-on provides a really nice boost to the Xenomorph's ability to gather information with his power without using any perk slots."
      },
      {
        "name": "Emergency Helmet",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/emergencyhelmet.png",
        "tierClass": "good",
        "comment": "Increases your resistance to the turret fire, which makes it harder for them to burn you out of your power. This increased resistance makes it less likely to lose your power if you come across an unexpected turret during chase, but your default resistance should be enough in most situations. In instances where you come across two turrets in close proximity, even this add-on won't be enough to make a difference."
      },
      {
        "name": "Moulted Skin",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/moultedskin.png",
        "tierClass": "good",
        "comment": "Applies a huge 30 seconds of Exhaustion to a Survivor after they deploy a turret. This effect can come into play very early and happen a decent amount of times throughout the match. It's often hard to know exactly when this add-on is preventing a perk from being used, but on average it should be quite helpful since exhaustion perks are always popular. Needless to say, this add-on will do basically nothing if your Survivors are not using turrets or have have no exhaustion perks, but that should be a pretty ideal scenario anyway. You can pair this add-on with the perk Mindbreaker to keep repairing Survivors constantly at a 30 second Exhaustion timer."
      },
      {
        "name": "Crew Headset",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/crewheadset.png",
        "tierClass": "good",
        "comment": "Increases the radius at which you can detect Survivor footsteps above when travelling through tunnels, making it even more likely that you'll find someone. Particularly useful at the start of the game and when used on builds that don't have any information perks."
      },
      {
        "name": "Ovomorph",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/ovomorph.png",
        "tierClass": "decent",
        "comment": "Increases the passive rate at which you initiate the crawler mode when outside of a tunnel. Even though you should try not to lose your power during chase, this add-on can be really helpful if you do. It also allows you to slip back into crawler mode faster after hooking a Survivor, since that also makes you lose part of your power."
      },
      {
        "name": "Cereal Rations",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/cerealrations.png",
        "tierClass": "decent",
        "comment": "Shows you the auras of all deployed turrets when you're travelling through tunnels. This gives indirect information about Survivor locations and makes it less likely that a turret will catch you by surprise. However, be sure not to rely too much on this add-on to find Survivors. Sometimes it's best to be proactive and look for vulnerable targets with your ability to detect footsteps above you."
      },
      {
        "name": "Kane's Helmet",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/kaneshelmet.png",
        "tierClass": "decent",
        "comment": "This add-on makes all of your tail attacks inflict Mangled for a set amount of time. Useful and pretty simple to use, but the limited duration of the effect makes it slightly less appealing."
      },
      {
        "name": "Multipurpose Hatchet",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/multipurposehatchet.png",
        "tierClass": "decent",
        "comment": "Applies the Haemorrhage status effect with each tail attack. This effect only gives value if you interrupt Survivors during a heal. Unlike many other add-ons, however, this one has unlimited duration. Pairs well with the blue Kane's Helment to make healing take longer as well."
      },
      {
        "name": "Improvised Cattle Prod",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/improvisedcattleprod.png",
        "tierClass": "decent",
        "comment": "Provides aura reading on Survivors around key areas when generators get completed. It's typically quite helpful, but don't forget that several Survivor perks can prevent their aura from being revealed."
      },
      {
        "name": "Light Wand",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/lightwand.png",
        "tierClass": "decent",
        "comment": "When emerging from a tunnel, you have a natural immunity period where turrets are disabled. This add-on extends that period by 3 second. Not the most impactful, but it does allow you to sometimes completely ignore a turret and chase a Survivor immediately instead."
      },
      {
        "name": "Acidic Blood",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/acidicblood.png",
        "tierClass": "decent",
        "comment": "This add-on simplifies your chases for a brief time after emerging from a portal, making it even less likely that Survivors will manage to outplay you around a pallet. However, if you're good at using your power you should typically not have any issues getting hits around pallets in the first place."
      },
      {
        "name": "Ripley's Watch",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/ripleyswatch.png",
        "tierClass": "decent",
        "comment": "Automatically destroys a turret that has knocked you out of your power, saving you a little bit of time. This is quite helpful for beginners that are still learning how to deal with them, but veteran players should avoid this situation in the first place. It can also save a bit of time if you need to deal with two stacked turrets that managed to burn you."
      },
      {
        "name": "Cat Carrier",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/catcarrier.png",
        "tierClass": "almost-no-effect",
        "comment": "Gives you a decently long period of stealth after losing your power to a turret. However, keep in mind that even with the Undetectable status effect, the Xenomorph is never 100% stealthy. Survivors can still predict your approach by listening to the proximity sensor of the turrets. This add-on can help you bounce back from a mistake but it's ultimately not too reliable. Ideally, you should try to avoid being knocked out your power in the first place."
      },
      {
        "name": "Drinking Bird",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/drinkingbird.png",
        "tierClass": "almost-no-effect",
        "comment": "Extends the Killer Instinct duration of nearby Survivors when you emerge from a nearby portal. The default duration is more than enough to help you locate your targets, so the effect of this add-on is almost entirely unnecessary."
      },
      {
        "name": "Parker's Headband",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/parkersheadband.png",
        "tierClass": "almost-no-effect",
        "comment": "Even a moderate boost to movement speed is always helpful, but this effect is very small and Xenomorph doesn't need to close the gap as tightly as other Killers anyway. If you catch up to a Survivor and they're slightly too far, you're typically still able to hit them with a tail attack. For that reason, the speed boost from this add-on rarely has any impact."
      },
      {
        "name": "Brett's Cap",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/brettscap.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on gives an unreliable and inconsistent method of applying the Blindness status effect. This effect is really not that impactful and its duration is also pretty short."
      },
      {
        "name": "Ash's Innards",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/xenomorph/ashsinnards.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on delays the time a turret becomes available to be deployed again after being destroyed. However, since there are multiple turrets available, this add-on only really comes into play if Survivors are constantly trying to reset turrets, which rarely happens. Even if Survivors are using turrets a lot, there are other add-ons that are much better at helping you deal with them."
      }
    ]
  },
  "chucky": {
    "displayName": "Chucky,Good Guy",
    "addons": [
      {
        "name": "Jump Rope",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/jumprope.png",
        "tierClass": "strongest",
        "comment": "This add-on increases the maximum reach of all of your dashes, which can allow you to hit Survivors that would otherwise be slightly too far away. It also helps a bit when using your power for mobility. It's a modest effect but still quite reliable and can often make the difference between a miss and a hit."
      },
      {
        "name": "Power Drill",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/powerdrill.png",
        "tierClass": "strongest",
        "comment": "Slightly reduces your power recovery after a successful special attack. Being able to use your power again sooner is almost always useful to help end chases sooner, even if it's only a little."
      },
      {
        "name": "Straight Razor",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/straightrazor.png",
        "tierClass": "good",
        "comment": "Good and simple effect. The status effect only lasts 80 seconds but that should be plenty for most scenarios."
      },
      {
        "name": "Yardstick",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/yardstick.png",
        "tierClass": "good",
        "comment": "The aura read can sometimes reveal hidden Survivors and make it easier to track the ones that you're after. It doesn't always come into play, but the effect is quite decent still, especially if you're adept at chaining his scamper to occasionally cover large distances quickly. Pairs well with other scamper-related add-ons."
      },
      {
        "name": "Iridescent Amulet",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/iridescentamulet.png",
        "tierClass": "good",
        "comment": "Has a small downside but makes your power last much longer. Since going into stealth mode makes Survivors see illusory footprints, you don't necessarily want to always be using your power if you don't know where you're going. This add-on pairs best with information perks so that you can approach undetected and keep every Survivor on the map guessing where you might be. It's definitely at its strongest when playing against newer Survivors or on indoor maps where even experienced Survivors don't have much visibility."
      },
      {
        "name": "Rat Poison",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/ratpoison.png",
        "tierClass": "good",
        "comment": "This add-on reveals Survivors during you dash attack. Critically, the aura remains for a bit of time after the hit, which often allows you to perfectly track Survivors and avoid losing them when out of line of sight. The initial aura reveal also makes it even easier to land your special attacks in some scenarios. Particularly useful when paired with the perk Lethal Pursuer to enhance its lingering effect."
      },
      {
        "name": "Hair Spray & Candle",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/hairspraycandle.png",
        "tierClass": "good",
        "comment": "This add-on reduces the amount of power gauge that you lose if you use a basic attack on a Survivor. This can sometimes allow you to retain enough power to be able to follow up a basic attack with a special dash attack, which could easily happen if a healthy Survivor comes to take a hit to protect a vulnerable teammate. Even if it only triggers a few times per match, it can still be quite decent."
      },
      {
        "name": "Portable TV",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/portabletv.png",
        "tierClass": "decent",
        "comment": "Only works during endgame, but the effect is ridiculously strong. You can catch up to Survivors very quickly or cut them off before they reach an exit gate. Keep in mind that if you perform a long dash and then vault a window or pallet, you will get another long rush immediately after."
      },
      {
        "name": "Running Shoes",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/runningshoes.png",
        "tierClass": "decent",
        "comment": "This add-on provides a small 2% haste speed boost after a scamper, but since you're not able to transition into normal movement afterwards, this boost is not particularly usable in small loops. However, this increased speed does allow you to reach further and possibly even chain multiple scampers together to cover large distances quickly. Chaining multiple scampers also makes the 2% boost stack on top of itself briefly, possibly giving you 4% or 6% for a brief moment, which can make your miss cooldown feel a bit less punishing. If you want to have a longer dash consistently even without scamper, using the green Jump Rope is probably a better idea, although you can also pair them together. Don't bother running this add-on if you're not confident in your ability to scamper correctly and consistently."
      },
      {
        "name": "Automatic Screwdriver",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/automaticscrewdriver.png",
        "tierClass": "decent",
        "comment": "Allows you to recover slightly faster and use your power again sooner after a missed attack. The effect is rather small and doesn't help if you are accurate with your special attacks, but it's still fairly decent otherwise."
      },
      {
        "name": "Hard Hat",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/hardhat.png",
        "tierClass": "decent",
        "comment": "This add-on allows you to break a pallet when you scamper underneath it. This does not have a downside itself, but scampering under pallets during chase isn't always the best idea since you have very little control of where your dash can go afterwards. Keep in mind that Chucky used to be able to scamper pallets without starting a Slice & Dice dash, but then this ability was taken out of his kit at one point. This add-on is best used to clean up dropped pallets after a chase has ended and while you're chaining scampers together to traverse the map."
      },
      {
        "name": "Strobing Light",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/strobinglight.png",
        "tierClass": "decent",
        "comment": "The reduction of terror radius is already nice on its own, but it can shine even further when paired with other things that also reduce your terror radius."
      },
      {
        "name": "Silk Pillow",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/silkpillow.png",
        "tierClass": "decent",
        "comment": "This add-on has a signficant downside and should never be used carelessly. However, it can be somewhat decent when paired with other add-ons and perks that reduce your terror radius. You will need some information gathering perks to make the most of this reduced terror radius, but it can definitely work out sometimes."
      },
      {
        "name": "Good Guy Box",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/goodguybox.png",
        "tierClass": "almost-no-effect",
        "comment": "Reducing your cooldown is always a good thing, but this add-on has a very tiny effect that is almost unnoticeable and doesn't typically make much of a difference in chase."
      },
      {
        "name": "Electric Carving Knife",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/electriccarvingknife.png",
        "tierClass": "almost-no-effect",
        "comment": "Reducing your cooldown is always a good thing, but this add-on has a very tiny effect that is almost unnoticeable and doesn't typically make much of a difference in chase."
      },
      {
        "name": "Doll Eyes",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/dolleyes.png",
        "tierClass": "almost-no-effect",
        "comment": "You should generally only use your power when you're already chasing a Survivor, so the information from this add-on isn't always super relevant. Still, not too bad."
      },
      {
        "name": "Pile of Nails",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/pileofnails.png",
        "tierClass": "almost-no-effect",
        "comment": "Ending your power manually is something that happens very rarely during normal gameplay, but with this add-on you can do it on purpose to catch Survivors off-guard with an extra Undetectable status effect. Perceptive Survivors will typically notice the illusory footprints and when they disappear, so they'll assume that you're far away somewhere else, making them less likely to run away early. However, the extremely limited duration of 3 seconds and your below average mobility makes this strategy almost impossible to consistently pull off. It's best paired with perks such as Discordance that will maximize your chance to actually catch one or more Survivors off-guard when you remain Undetectable for those 3 seconds."
      },
      {
        "name": "Plastic Bag",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/plasticbag.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on can sometimes cause Exhaustion to random Survivors across the map, but the effects are highly inconsistent, especially if you use your power in short bursts (which you should). On top of that, it's basically impossible to tell if a Survivor has been affected by this add-on. Needless to say, if Survivors don't have any exhaustion perks, this add-on is also completely useless."
      },
      {
        "name": "Tiny Scalpel",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/tinyscalpel.png",
        "tierClass": "almost-no-effect",
        "comment": "You should generally only use your power when you're already chasing a Survivor, so the small tracking advantage that this add-on provides is almost useless."
      },
      {
        "name": "Mirror Shards",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/chucky/mirrorshards.png",
        "tierClass": "detrimental",
        "comment": "The tracking that this add-on provides is incredibly inconsistent and situational. Generally speaking, you do not want to go into stealth mode if you don't already know where Survivors are. On top of that, it also makes the illusory footsteps audible, which results in their sounds getting mixed together with the real sounds from Survivor footsteps and overall making tracking harder. Don't run this unless you know what you're doing."
      }
    ]
  },
  "unknown": {
    "displayName": "Unknown",
    "addons": [
      {
        "name": "Captured by the Dark",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/capturedbythedark.png",
        "tierClass": "strongest",
        "comment": "Automatically weakens all Survivors at the start of the match. This helps in your first chases and also encourages them to seek you out to remove it, which can buy you quite a bit of time. Keep in mind that the add-on has the small downside of reducing the maximum amount of hallucinations that you can place on the map (from 4 to 3)."
      },
      {
        "name": "Iridescent OSS Report",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/iridescentossreport.png",
        "tierClass": "strongest",
        "comment": "After a teleport, the Unknown normally leaves a fake decoy behind. This add-on greatly extends the time it stays up and also gives it a terror radius (which does apply the effects of any relevant perks). Additionally, it also provides a reduction of 5 seconds to the teleport cooldown (which goes from 25 to 20 seconds). Unlike some of the other strong add-ons, this one has no immediate downside and as such it is a very safe choice for anyone to use."
      },
      {
        "name": "B-Movie Poster",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/bmovieposter.png",
        "tierClass": "good",
        "comment": "Applies the Broken status effect to any Survivor you injure for a brief period. Also works when hitting Survivors with Endurance when they go into Deep Wound. The duration isn't very long, but it can still be helpful to prevent a Survivor from immediately using a medkit or getting healed passively by perks such as &#34;Adrenaline&#34;."
      },
      {
        "name": "Hypnotist's Watch",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/hypnotistswatch.png",
        "tierClass": "good",
        "comment": "A much simpler way to inflict exhaustion than its purple counterpart. Keep in mind that the projectile has to physically hit the Survivor while it's airborne, not just with the explosion. When your UVX projectile goes through a Survivor it plays a special sound effect that is quite easy to recognize, letting you know that this add-on has been applied."
      },
      {
        "name": "Obscure Game Cartridge",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/obscuregamecartridge.png",
        "tierClass": "good",
        "comment": "Increases your action speed for a brief moment after teleporting. It's almost always useful, but keep in mind that the Unknown has tools to play around pallets and windows without having to vault or destroy them, so it's not always extremely impactful in that regard."
      },
      {
        "name": "Sketch Attempt",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/sketchattempt.png",
        "tierClass": "good",
        "comment": "Applies the Oblivious status effect briefly after a UVX blast. Not extremely impactful when you focus on one Survivor at a time and chase them in an open area with high visibility, but it can be quite confusing when you blast multiple people at a time or quickly switch targets. The sudden loss of a terror radius can also be very confusing if Survivors lose sight of you and lead into small but meaningful mistakes. Definitely a decent effect for an add-on of this rarity."
      },
      {
        "name": "Footprint Cast",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/footprintcast.png",
        "tierClass": "good",
        "comment": "This add-on saves 5 seconds worth of recovery on each UVX hit, not 15 seconds as the description would suggest. The add-on itself is simply boosting the already existing default value of 10 to 15. Not a terrible effect but it's generally outclassed by the blue Front-Page article and other add-ons."
      },
      {
        "name": "Front-Page Article",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/frontpagearticle.png",
        "tierClass": "good",
        "comment": "Helps quite a bit, especially in early chases if you break a pallet or wall, to ensure that you're leaving at least one clone behind. One of the better options to improve your hallucination spawn timer if you're planning to use the blue Vanishing Box, which comes with a heavy downside."
      },
      {
        "name": "Notebook of Theories",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/notebookoftheories.png",
        "tierClass": "good",
        "comment": "Provides a small boost to the duration of the Hindered status effect that Survivors get when hit directly by your projectile before it explodes. A small effect, but it doesn't hurt to have it. When your UVX projectile goes through a Survivor it plays a special sound effect that is quite easy to recognize, letting you know that the hinder effect is happening."
      },
      {
        "name": "Blurry Photo",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/blurryphoto.png",
        "tierClass": "decent",
        "comment": "On top of slightly reducing the slowdown that occurs after a teleport, it also allows you to hit a Survivor or perform an action sooner. Not a bad effect at all considering its rarity."
      },
      {
        "name": "Vanishing Box",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/vanishingbox.png",
        "tierClass": "decent",
        "comment": "Weakens any Survivors that finish repairing a generator. Can also apply to multiple Survivors if they finish the generator together. This is overall a fantastic effect that can punish Survivors that finish a generator in front of you or lead to an easy injury later on. Additionally, Survivors that become weakened by this add-on also speed up your next hallucination spawn (just as if you had weakened them yourself directly). However, this add-on comes with a massive nerf to your hallucination spawn timer which will be very noticeable throughout the game. It's recommended that you try to use another add-on to make up for this, such as the blue Front-Page Article. Overall, this add-on can be a decent crutch when playing against beginner Survivors but you will likely want to stop using it when going against stronger opponents."
      },
      {
        "name": "Victim's Map",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/victimsmap.png",
        "tierClass": "decent",
        "comment": "Briefly reveals the location of Survivors with Killer Instinct when they stare at you long enough to remove their weakened status. Not incredibly useful, but it can occasionally reveal the location of Survivors that you might have not been aware of."
      },
      {
        "name": "Slashed Backpack",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/slashedbackpack.png",
        "tierClass": "decent",
        "comment": "The main utility of this add-on is to help you remove unnecessary Hallucinations from afar and reset them in better spots very quickly. The ability to detonate your UVX projectile on a clone is sometimes useful but definitely won't come into play very often. A nice add-on to pair with the blue Vanishing Box to counter its downside."
      },
      {
        "name": "Device of Undisclosed Origin",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/deviceofundisclosedorigin.png",
        "tierClass": "decent",
        "comment": "Applies a sudden dose of Oblivious status effect to anyone coming close to your hallucinations. This can sometimes backfire and actually warn them that they're running into one, but for the most part this add-on is a simple way to occasionally mess with Survivors and keep them guessing about your actual location. Probably not a good idea to combine this with the green Last Known Recording, since you'd be actively making it less likely to come into play."
      },
      {
        "name": "Last Known Recording",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/lastknownrecording.png",
        "tierClass": "decent",
        "comment": "Reduces visible aura range of your clones (by default 8m) by almost 3m. Not a huge direct impact outside of chase, but anything that keeps Survivors unaware of your hallucinations is helpful, especially if you teleport to them during chase."
      },
      {
        "name": "Homemade Mask",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/homemademask.png",
        "tierClass": "almost-no-effect",
        "comment": "Applies a 60 second long Blindness effect to Survivors who dispel your clones. Quite a mediocre effect that doesn't even happen if Survivors ignore your hallucinations, but that is a pretty optimal scenario for you anyway."
      },
      {
        "name": "Serum Vial",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/serumvial.png",
        "tierClass": "almost-no-effect",
        "comment": "Exhaustion is useful, but it's hard to tell when this add-on has applied its effect since it's only triggered when a Survivor walks into the range of a Hallucination, making it inferior to its blue counterpart."
      },
      {
        "name": "Punctured Eyeball",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/puncturedeyeball.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts the Deep Wound status effect on injured Survivors that dispel a hallucination while weakened. The effect itself is quite powerful, but it's too situational to be reliable."
      },
      {
        "name": "Rabbit's Foot",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/rabbitsfoot.png",
        "tierClass": "almost-no-effect",
        "comment": "Applies the Haemorrhage status effect for an extremely brief period of time after a hit, so short that it's almost useless. Only really helpful if you managed to land a hit on a group of Survivors that were healing, since you could potentially revert their healing progress. Also increases the visibility of pools of blood when charging your power, but this doesn't have much of an impact in regular gameplay since it's not a very good idea to walk around holding the power button because it slows you down significantly. Tapping the power button repeteadly does allow you to move at normal speed, but unfortunately this doesn't help to make the blood consistently brigther."
      },
      {
        "name": "Discarded Milk Carton",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/unknown/discardedmilkcarton.png",
        "tierClass": "detrimental",
        "comment": "The increased bounciness is unnecessary in most scenarios and the unpredictable behaviour of your projectile will likely mess with your muscle memory if you're still learning the basics of this Killer. However, advanced players might opt to run this add-on and play into its unique strengths, namely the fact that your shots are now faster and are sometimes much harder to react against, especially for Survivors who are only used to the Unknown's default projectile speed. Keep in mind that this add-on makes it significantly harder to detonate the UVX blast on a flat floor in front of you, although you can try to compensate this by making it bounce of walls into the ground more often instead. Overall, a very risky add-on that should only be used by veteran players willing to specialize in its use."
      }
    ]
  },
  "vecna": {
    "displayName": "Vecna,Lich",
    "addons": [
      {
        "name": "Iridescent Book of Vile Darkness",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/iridescentbookofviledarkness.png",
        "tierClass": "strongest",
        "comment": "Reduces the amount of skulls in your projectile attack, but also lowers it to ground level to make it impossible to dodge by crouching. Also makes your flight capable of blocking windows for an extended period of time if you fly over them, which is particularly helpful in structures like shack or certain main buildings. Despite the initial downside, this add-on brings a lot of utility and holds great value for anyone who wants to specialize in learning how to play with it. Keep in mind that you can increase the skulls from 2 to 3 if you pair with the blue Ornate Horn add-on. While powerful, this add-on fundamentally changes how Vecna's power works and it might be a bad idea to get used to it while you learn this Killer, as you may grow  dependent on it."
      },
      {
        "name": "Bag of Holding",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/bagofholding.png",
        "tierClass": "good",
        "comment": "This add-on guarantees that two out of the six magical chests will be mimics, slowing down Survivors and reducing their chances to obtain useful magical items early on. Since those mimics remain, it also forces Survivors to share other chests and wait for the long cooldown before new magical items respawn. Clumsy Survivors might even take damage if they fail the mimic skill check interaction. It also makes them Oblivious briefly after using these chests. Overall, a decent effect if you want to run an add-on that doesn't require you to plan around it."
      },
      {
        "name": "Robe of Eyes",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/robeofeyes.png",
        "tierClass": "good",
        "comment": "Occasionally reveals the auras of Survivors anywhere on the map if they happen to be near one of the six magical item chests when you use a spell. Since using spells often is already a good idea in general, the effects of this add-on will often trigger throughout the match, giving you information about Survivors both near and far. Pairs particularly well with the perk Lethal Pursuer which will extend the duration of each aura read by two seconds. If you use this add-on, consider pairing it with other add-ons that allow you to cycle through spells more quickly such as the blue Pearl of Power. Sometimes, it might be worth to even use a spell randomly just for the chance to find a Survivor with it."
      },
      {
        "name": "Raven's Feather",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/ravensfeather.png",
        "tierClass": "good",
        "comment": "Slightly increases the time that you can fly by an extra 0.5 seconds, which overall gives you about ~4 extra meters of distance by the end of your flight. A really useful effect (especially considering its rarity) if you plan on using your Fly spell for maximum mobility. Keep in mind, however, that many times you don't even need to use the full length of the flight anyway."
      },
      {
        "name": "Pearl of Power",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/pearlofpower.png",
        "tierClass": "good",
        "comment": "Reduces your spell cooldowns by 2 seconds whenever you land a basic attack. More situational than the green Ring of Spell Storing, but still very useful since it can almost guarantee that you'll be able to use your spells sooner in prolonged encounters or right after a down, even though your normal spell cooldown is already pretty short. It's a safe add-on to use if you're looking for a simple but dependable effect."
      },
      {
        "name": "Ornate Horn",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/ornatehorn.png",
        "tierClass": "good",
        "comment": "Spawns an extra skull for your projectile attack, making it slightly harder for Survivors to find a gap between them to dodge it. Keep in mind that they can still be dodged by crouching. Particularly useful when paired with the Iridescent Book of Vile Darkness, since it gives you 3 skulls in total. Having 3 skulls makes aiming easier, since one of them will face exactly in front of you at all times."
      },
      {
        "name": "Staff of Withering",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/staffofwithering.png",
        "tierClass": "good",
        "comment": "Inflicts Exhaustion on any survivor detected by the Dispelling Sphere. Can be used preemptively as you approach a Survivor or aggressively during chase if you want to deny a Survivor from using their exhaustion perk. However, not every Survivor runs exhaustion perks so the effect of this add-on can be highly situational."
      },
      {
        "name": "Ring of Spell Storing",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/ringofspellstoring.png",
        "tierClass": "good",
        "comment": "Consistently reduces the cooldown of all spells by a small margin of 1 second. This effect is universally useful since it applies to all cooldowns throughout the game but a single second is often not that big of a deal. Definitely a decent add-on for its rarity."
      },
      {
        "name": "Lantern of Revealing",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/lanternofrevealing.png",
        "tierClass": "good",
        "comment": "A very simple and useful add-on that reveals the auras of Survivors that narrowly dodge your projectile attack. On top of being a solid effect that will trigger often, it also allows you to understand why exactly your attack missed so that you can be more accurate the next time. It benefits from being used together with the perk Lethal Pursuer since it will extend the aura duration by 2 seconds."
      },
      {
        "name": "Dragontooth Dagger",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/dragontoothdagger.png",
        "tierClass": "decent",
        "comment": "Inflicts Mangled and Haemorrhage to any Survivor hit by a basic attack if they have a magical item. Can be triggered quite consistently, but its duration is limited to 60 seconds which sometimes hinders its potential. Does not pair well with the purple Bag of Holding, since ideally you want Survivors to actually hold magical items to trigger this add-on's effect. Some Survivors don't even bother to pick up magical items throughout the match, and sadly this add-on will never trigger any effect on them."
      },
      {
        "name": "Cloak of Invisibility",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/cloakofinvisibility.png",
        "tierClass": "decent",
        "comment": "Gives you 20 seconds of Undetectable anytime all of your spells are on cooldown. It's not very easy to have this occur naturally, since the cooldowns of some spells are quite short, but you can always go out of your way to force it so you can benefit from this effect."
      },
      {
        "name": "Glass Eye",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/glasseye.png",
        "tierClass": "decent",
        "comment": "Increases the size and speed of the Dispelling Sphere, making it slightly more effective at covering big distances or hitting someone right in front of you before they can dodge it. Not a terrible effect and pretty helpful when you're using other add-ons that trigger only with the Dispelling Sphere, such as the Staff of Withering."
      },
      {
        "name": "Boots of Speed",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/bootsofspeed.png",
        "tierClass": "decent",
        "comment": "Provides a very small dose of Haste, increasing your movement speed briefly after using the Mage Hand spell. Not necessary in every situation, and even in the best case scenario, the effect itself is incredibly small. Considering its rarity, you're probably better off with something else."
      },
      {
        "name": "Crystal Ball",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/crystalball.png",
        "tierClass": "decent",
        "comment": "Being able to track the Survivors hit by the Dispelling Sphere a bit longer is not a terrible effect, especially if you are dilligent at using it as often as possible. It doesn't help a lot when detecting Survivors from afar, but it can make the difference when tracking a Survivor with unpredictable movement who has managed to slip out of your sight."
      },
      {
        "name": "Trickster's Glove",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/trickstersglove.png",
        "tierClass": "decent",
        "comment": "With this add-on, the Mage Hand prevents a pallet from being dropped for an extra 0.3 seconds. This can sometimes give you a bit more margin for error in chase and in some lucky scenarios, it could possibly make it harder for Survivors to rescue a teammate if you pick them up under a pallet that is being held by the Mage Hand. If the Survivor that you pick up is at the center of the pallet, however, even this add-on is not enough to prevent a well-timed pallet rescue. So even for this purpose, this add-on is not 100% consistent either. That being said, if you run the perks Fire Up or Forever Entwined (both of which increase your pick up speed), this add-on can basically guarantee that pallet saves become impossible."
      },
      {
        "name": "Cloak of Elvenkind",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/cloakofelvenkind.png",
        "tierClass": "almost-no-effect",
        "comment": "Reduces your terror radius by a very large amount (22 meters) during flight. Despite the significant number, the effect itself is massively mitigated by the fact that flying is quite loud already (including a directional sound queue when in close proximity) and Survivors might even be able to see your aura during your flight anyway thanks to a certain magical item from the magical chests. Still, if you use the Fly spell often enough, the large shift in terror radius size will likely confuse Survivors at least a few times per match."
      },
      {
        "name": "Potion of Speed",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/potionofspeed.png",
        "tierClass": "almost-no-effect",
        "comment": "Reduces the cooldown that occurs after flight, making it slightly easier to hit a Survivor shortly after flying and also slightly increasing your mobility since you spend less time slowed down. That being said, the effect itself is incredibly small and really hard to notice. The brown Raven's Feather is the superior choice if you're looking for an add-on to improve your Fly spell."
      },
      {
        "name": "Tattered Headband",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/tatteredheadband.png",
        "tierClass": "almost-no-effect",
        "comment": "The extra range on the damaging skulls is almost never relevant since it's typically used as a close-range attack. Creative players might find ways to take advantage of the extra range, however, especially when paired with the Iridescent Book of Vile Darkness which brings your skeletons closer to ground level. For most players, however, this add-on will rarely make any difference."
      },
      {
        "name": "Ring of Telekinesis",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/ringoftelekinesis.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases your vault speed slightly after blocking a pallet with Mage Hand. This effect is quite small and rather situational, so you might prefer to run an add-on that provides more consistent value. The blue Boots of Speed is probably a better alternative in almost every scenario."
      },
      {
        "name": "Vorpal Sword",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/vecna/vorpalsword.png",
        "tierClass": "detrimental",
        "comment": "Gives some anti-healing properties to the Dispelling Sphere and makes the Mage Hand turn into a delayed pallet-breaker instead of the normal instant pallet-lifter. Since the Mage Hand takes a while to break a pallet, it can also be used as a method to block it and prevent a Survivor from vaulting during chase. Overall, this is a questionable tradeoff and not much of an upgrade at all. The default pallet lifting is simply better in most situations. The add-on also gives extra utility to the Dispelling Sphere, but not enough to make it really worth it. If you create a build around this add-on, you can actually make the forced Broken status effect quite a nuisance for Survivors. Otherwise, you probably won't want to use it on its own."
      }
    ]
  },
  "dracula": {
    "displayName": "Dracula,Dark Lord",
    "addons": [
      {
        "name": "Warg's Fang",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/wargsfang.png",
        "tierClass": "strongest",
        "comment": "Briefly reveals the auras of Survivors whose scent orbs you have collected when your pounce attack is ready in Wolf form. This effect starts out slow but it becomes very oppressive later since it allows you to track basically the entire team once the match has progressed enough and you've collected everyone's orbs at least once. This effect can be further enhanced with the passive ability of the perk Lethal Pursuer."
      },
      {
        "name": "Lapis Lazuli",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/lapislazuli.png",
        "tierClass": "strongest",
        "comment": "Blocks window vaults when you teleport to them during Bat form. A very decent way to deal with strong windows or preemptively disable them when starting a chase in places like the shack. If you have sharp ears, you can immediately determine the direction of the Survivor and make sure that you fly through the window into the appropiate side. Not extremely impactful in certain maps like Gideon that revolve mostly around pallets, but it can single-handedly deny certain windows that would otherwise give you some trouble."
      },
      {
        "name": "Killer Doll",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/killerdoll.png",
        "tierClass": "good",
        "comment": "Increases the pounce cooldown recovery that you normally obtain from collecting scent orbs during Wolf form. For reference, the normal pounce cooldown is 20 seconds. Each orb scent saves approximately ~6 seconds, and with this add-on they'll save 30% more or roughly ~8 seconds. A decent effect if you plan to stay on Wolf form for a while. Sometimes you will get your pounce back after collecting two orbs regardless of add-ons, however, making this add-on slightly redundant on some occasions."
      },
      {
        "name": "Force of Echo",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/forceofecho.png",
        "tierClass": "good",
        "comment": "Increases the rate at which Survivors drop scent orbs, which you can see and collect during Wolf form. This provides information but also a short haste effect (non-stackable) that can really make a difference over time. It also helps you regain the ability to perform a pounce in Wolf form, although the blue Killer Doll add-on is possibly better in that regard. Either way, neither of these add-ons increase the value of these orbs by an extreme amount."
      },
      {
        "name": "Iridescent Ring of Vlad",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/iridescentringofvlad.png",
        "tierClass": "good",
        "comment": "Changes the behaviour of your Hellfire pillars by introducing a slight tracking, making Hellfire sometimes land a hit that would otherwise miss. This effect is most noticeable towards the furthest pillars, but the curving can help you land hits around obstacles even from relatively close distances. It's best to try it once you already have a solid understanding of the hellfire mechanic so it doesn't mess with your muscle memory while you're still learning."
      },
      {
        "name": "Cerberus Talon",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/cerberustalon.png",
        "tierClass": "good",
        "comment": "Doubles the range at which you can see the auras of scent orbs. A fairly noticeable effect that can allow you to detect orbs from much further, which is a great way to gather information. Do keep in mind that going out of your way to pick up orbs might not be always worth it however, especially if you aren't using other add-ons (such as the purple Warg's Fang). Survivors only leave orbs when sprinting, so teams that move around the map carefully will definitely be harder to track even with this add-on."
      },
      {
        "name": "Medusa's Hair",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/medusashair.png",
        "tierClass": "good",
        "comment": "Inflicts a brief Hindered effect on Survivors near spots that you've teleported to as a Bat. Due to its limited range, this effect is not very useful if you're just generally moving around the map or if you're not using the ability much in the first place. However, it can make a significant difference when using it aggressively in chase and teleporting right on top of a dropped pallet/window that Survivors are using, since their reduced movement speed will let you catch up a bit easier. Lapis Lazuli and Medusa's Hair can work great when paired together."
      },
      {
        "name": "Moonstone Necklace",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/moonstonenecklace.png",
        "tierClass": "good",
        "comment": "Permanently reduces the terror radius by -8 meters while in Vampire or Wolf form, making it 24 meters in total. Obviously does not apply during Bat form, since you're undetectable anyway. This reduction gives Survivors approximately two fewer seconds of reaction time when you approach them in a straight line and is not a bad effect at all. This add-on is a great and safe choice for anyone, but especially for newer players that are not extremely confident in their ability to track during Bat form yet."
      },
      {
        "name": "Winged Boots",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/wingedboots.png",
        "tierClass": "good",
        "comment": "Increases the maximum Bat teleportation distance by 20%, bringing it from 32 meters to 38.4 meters, also allowing you to see vaults from further. Increases your overall awareness of vaults around the map and can save some time, but not extremely impactful, especially if you're not using the ability much in the first place. Keep in mind that Survivors see your bat as it teleports to a vault point, so they'll often start running away from it."
      },
      {
        "name": "Magical Ticket",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/magicalticket.png",
        "tierClass": "decent",
        "comment": "Increases the maximum speed of Bat teleportation by 10%. Can save some time when traversing the map, but not extremely impactful, especially if you're not using the ability much in the first place. Since Survivors can see you perform this action, this add-on can sometimes reduce their ability to react and create distance away from you by a small margin, which might make a difference if you're using it alongside the purple Lapis Lazuli add-on."
      },
      {
        "name": "Pocket Watch",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/pocketwatch.png",
        "tierClass": "decent",
        "comment": "Completely resets the Bat teleport ability when performing the break action on a pallet or breakable wall, which normally has a fixed cooldown of 15 seconds. Many beginner players don't use the teleport ability often, let alone two times in a row, so this effect will be wasted on them. However, this add-on does enable a particular strategy which can save you a bit of time; teleport to a dropped pallet or near a breakable wall, destroy it, and then immediately teleport again to keep the pressure up. Leaving weak pallets as teleport points for later becomes an even more viable strategy. Particularly useful in pallet-dense maps where you might need to do a lot of cleanup after a chase."
      },
      {
        "name": "Blood-Filled Goblet",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/bloodfilledgoblet.png",
        "tierClass": "decent",
        "comment": "Makes scent orbs, which are visible during Wolf form, last an extra 6 seconds (bringing it from 10 to 16s). Not a terrible effect, since it might allow you to find more of them when you transform and makes it harder for Survivors to stay in one location without feeding several orbs that boost your movement speed. Keep in mind that the boost from these orbs does not stack multiple times, however. The only unfortunate downside of this add-on is that it indirectly makes it harder to guess where the Survivor who left the orb will be (since they could literally be across the map by the time 16 seconds have passed)."
      },
      {
        "name": "Sylph Feather",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/sylphfeather.png",
        "tierClass": "decent",
        "comment": "Decreases the cooldown of Hellfire for each pallet broken by -5%, resulting in a noticeably shorter cooldown after you've broken several pallets which stacks until it's approximately two seconds shorter. Not a terrible option if you're very good at using Hellfire and you expect a match to last a while, but Dracula is so good at playing around dropped pallets that you don't always want to break them mindlessly. As explained in the description of the brown Ruby Circlet, Dracula is not a Killer that necessarily wants to focus on the same ability repeatedly anyway."
      },
      {
        "name": "Alucard's Shield",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/alucardsshield.png",
        "tierClass": "decent",
        "comment": "Produces a constant barrage of fire pillars at exit gates when they are open. Not much of a threat by themselves, but they can make a tricky endgame situation even more difficult for Survivors."
      },
      {
        "name": "Ruby Circlet",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/rubycirclet.png",
        "tierClass": "almost-no-effect",
        "comment": "Decreases the cooldown of Hellfire (normally 9.5 seconds) by 5%, saving you about half a second of recovery time until you can use it again. This is a small effect and not incredibly impactful, as Hellfire requires precise timing and is not typically an ability that you want to use as soon as possible anyway. Generally speaking, it's best to time your abilities carefully and cycle through them during your cooldowns instead of focusing entirely on just one of them. You can combine it with the blue Sylph Feather if you want to have an even shorter recovery period."
      },
      {
        "name": "Cube of Zoe",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/cubeofzoe.png",
        "tierClass": "almost-no-effect",
        "comment": "Creates random fire pillars around you for a brief duration each time a generator gets completed. Their location is random and they are generally not much of a threat unless several Survivors are currently swarming you, but they can occasionally give you a hit here and there. It's certainly a fun and chaotic effect, but it's extremely unreliable and generally not worth the add-on slot, especially compared to other add-ons of this rarity and below."
      },
      {
        "name": "Clock Tower Gear",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/clocktowergear.png",
        "tierClass": "almost-no-effect",
        "comment": "Allows you to change forms more frequently, reducing the Shapeshift cooldown of 3.5 seconds by approximately 0.18s. Shortening this cooldown is quite useful, but the effect itself is very tiny and rarely enough to make a critical difference. That being said, it's a safe choice if you want a simple add-on and plan on switching forms very often."
      },
      {
        "name": "Traveller's Hat",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/travellershat.png",
        "tierClass": "almost-no-effect",
        "comment": "Makes the transitions from one form to another very slightly faster. This transition is usually 1 second (or 1.5 if switching from Bat form) so the 5% is practically almost unnoticeable. The effect itself isn't bad, but it's too small to justify the add-on slot in almost every scenario."
      },
      {
        "name": "White Wolf Medallion",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/whitewolfmedallion.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the duration of the Killer Instinct that triggers anytime Survivors perform a rushed action during Wolf form. Killer Instinct provides a heartbeat-like effect and hightlights the Survivors in a certain color and is notably uncounterable by any Survivor perk or item. This can make it easier to track a sneaky Survivors that could otherwise get away with a stealth perk such as &#34;Quick and Quiet&#34; but the extended duration from this add-on is very minimal and does not really help in any significant way."
      },
      {
        "name": "Sunglasses",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/dracula/sunglasses.png",
        "tierClass": "detrimental",
        "comment": "Increases the range of Hellfire pillars in Vampire form, but at the cost of longer charge time. Might allow you to catch some Survivors off-guard with this extra range, but it's generally not a worthy trade-off. Feel free to try it out for fun if you know what you're doing, but perhaps stay away from it if you're still learning this Killer."
      }
    ]
  },
  "houndmaster": {
    "displayName": "Houndmaster",
    "addons": [
      {
        "name": "Torn Novel",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/tornnovel.png",
        "tierClass": "strongest",
        "comment": "Gives useful aura reading abilities, increasing your chances to outplay a Survivor when manually redirecting your dog. The lingering aura afterwards is very useful to help keep track of them during chase."
      },
      {
        "name": "Barley Meal",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/barleymeal.png",
        "tierClass": "good",
        "comment": "Increasing the dog's initial chase range is unnecessary in most chase scenarios, but it can occasionally become useful when you're trying to interrupt a distant Survivor or send the dog around a distant corner. It also allows you to place the dog further in order to take control of it briefly and check if anyone is nearby with the built-in Killer Instinct detection, although this is something that can also be done without this add-on, albeit with reduced range. Do not underestimate how useful it is to use the dog this way."
      },
      {
        "name": "Spiked Collar",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/spikedcollar.png",
        "tierClass": "good",
        "comment": "Classic type of add-on that inflicts Mangled & Hemorrhage. Not bad, but the limited duration and inconsistent trigger condition means you won't benefit from it every single time."
      },
      {
        "name": "Iridescent Wheel Handle",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/iridescentwheelhandle.png",
        "tierClass": "good",
        "comment": "Become undetectable whenever you send the dog out to search, making it possible to ambush Survivors throughout the match. Not a bad effect, especially if you have information perks to know where to strike. Keep in mind that it also makes the dog linger for longer at its target destination, which will slightly delay his return and availability."
      },
      {
        "name": "Fatty Meat",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/fattymeat.png",
        "tierClass": "good",
        "comment": "Forces Survivors to scream, then scream again for a while. Extremely useful to trigger perks like Dead Man's Switch or interrupt Survivors from doing totems. Keep in mind that these screams do not reveal their location like usual."
      },
      {
        "name": "Unfinished Map",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/unfinishedmap.png",
        "tierClass": "decent",
        "comment": "Allows you to chase Survivors with the certainty that their exhaustion perks won't come into play. Can even be triggered by performing a short distance search near a Survivor during chase. Not a bad effect at all."
      },
      {
        "name": "Smoked Snapper",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/smokedsnapper.png",
        "tierClass": "decent",
        "comment": "Reduces the short cooldown of the dog. Unfortunately, the cooldown is still largely variable based on how quickly the dog returns to you after certain actions."
      },
      {
        "name": "Belaying Pins",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/belayingpins.png",
        "tierClass": "decent",
        "comment": "Making Survivors oblivious to your terror radius is a neat effect but it will yield very inconsistent results depending on how coordinated their team is."
      },
      {
        "name": "Ship Figurehead",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/shipfigurehead.png",
        "tierClass": "decent",
        "comment": "Increases your terror radius when the dog is with you and decreases it when he's not. Can be used as part of a &#34;big terror radius&#34; type of build or to become extra sneaky with a smaller than usual terror radius. Just be sure to use your dog often if you're doing this, otherwise the larger terror radius will be a downside."
      },
      {
        "name": "Gunpowder Tin",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/gunpowdertin.png",
        "tierClass": "decent",
        "comment": "Gives a small but noticeable boost to the action speed of breaking pallets, walls and generators. Not a bad effect, but the short duration makes it quite situational. Smart Survivors often don't drop pallets immediately against Houndmaster, so sometimes this add-on can really not do much at all."
      },
      {
        "name": "Marlinspike",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/marlinspike.png",
        "tierClass": "decent",
        "comment": "Applies the Houndsense debuff to other Survivors nearby when you catch someone with the dog. Not very useful by itself, but it can sometimes help reveal nearby targets and apply debuffs from other add-ons like the blue Unfinished Map if Survivors are being altruistic."
      },
      {
        "name": "Sticky Pitch",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/stickypitch.png",
        "tierClass": "decent",
        "comment": "This add-on only increases your speed by 2% when walking on the path left by the search command. This is a pretty minor effect when traversing the map, but experienced Houndmaster players can take advantage of it to help catch people in chase."
      },
      {
        "name": "Spyglass",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/spyglass.png",
        "tierClass": "almost-no-effect",
        "comment": "Shows you the auras of Survivors when their Houndsense timer expires (but not if you make it go away by hitting them). Attentive players can use this to keep track of the team's general location or track down an elusive target. However, it's not a very proactive strategy and many times the Survivor with Houndsense will lose it by getting hit anyway."
      },
      {
        "name": "Trainer's Book",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/trainersbook.png",
        "tierClass": "almost-no-effect",
        "comment": "Increasing the duration of Houndsense provides a bigger window to put Survivors into the mending state and increases the effects of a few other add-ons. However, Houndsense simply doesn't do enough on its own to justify this add-on slot. You're better off with two add-ons that have actual powerful effects on their own."
      },
      {
        "name": "Training Bell",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/trainingbell.png",
        "tierClass": "almost-no-effect",
        "comment": "Revealing a Survivor's aura for 5 seconds is a sweet effect, which could be enhanced further with Lethal Pursuer. However, you will rarely have a match where the dog gets stunned often enough to justify bringing this add-on."
      },
      {
        "name": "Creature's Bone",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/creaturesbone.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on can help you bounce back from a mistake by allowing your dog to be used sooner after it gets stunned by a pallet. That being said, stuns are rare during normal gameplay or often happen in situations where the shorter cooldown does not really come into play. It's a safe choice for beginners due to its availability, but you might want to run something a bit more impactful."
      },
      {
        "name": "Knotted Rope",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/knottedrope.png",
        "tierClass": "almost-no-effect",
        "comment": "The reduction of your main attack's cooldown is a universally useful effect, however this add-on was nerfed very severely until a future rework. Right now it only has a 2% effect which is completely negligible. Do not bother using it."
      },
      {
        "name": "Young Coconut",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/youngcoconut.png",
        "tierClass": "detrimental",
        "comment": "THIS ADD-ON IS CURRENTLY BUGGED and doesn't seem to work at all. Slightly increases the dog's speed when chasing, making you have an easier time catching up to Survivors before they reach safety. Not a bad effect at all for an add-on of this rarity."
      },
      {
        "name": "Leather Harness",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/leatherharness.png",
        "tierClass": "detrimental",
        "comment": "THIS ADD-ON IS CURRENTLY BUGGED and doesn't seem to work at all. Gives a large boost to the dog's speed after a gen is completed (for a short time) and after all gens are completed (permanently). Best used on endgame builds that can extend the duration of this part of the match."
      },
      {
        "name": "Waterskin",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/houndmaster/waterskin.png",
        "tierClass": "detrimental",
        "comment": "Increases the maximum distance the dog will travel when manually redirected during chase. There's almost zero situations where this distance will make a real difference, and sending the dog further might end up costing you since his cooldown only resets when he has returned to you. Unless you really know what you're doing, you're better off without this add-on."
      }
    ]
  },
  "ghoul": {
    "displayName": "Ghoul,Ken Kaneki",
    "addons": [
      {
        "name": "Yamori's Mask",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/yamorismask.png",
        "tierClass": "strongest",
        "comment": "Makes other Survivors scream when hooking someone while enraged as long as they are 40 meters away. Since enraged is fairly easy to keep going, this add-on can trigger many times during a match and will certainly provide very valuable information for such a high-mobility Killer. The scream also forces Survivors to interrupt their action, which can trigger perks such as Dead Man's Switch or completely reset the progress of a totem cleansing action."
      },
      {
        "name": "Fresh Coffee",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/freshcoffee.png",
        "tierClass": "strongest",
        "comment": "Provides a small increase to your leaping speed, something universally useful whether you're enraged or not. The effect is not incredibly noticeable, but it's certainly there and will probably be quite helpful over the course of the match."
      },
      {
        "name": "Red-Headed Centipede",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/redheadedcentipede.png",
        "tierClass": "good",
        "comment": "Blocks windows after vaulting them in any way while you're enraged. Since staying enraged constantly is fairly easy, you'll be able to use it very often. Blocking windows isn't always extremely necessary with this Killer, but it can help you shut down structures like shack very quickly, forcing Survivors to give up resources even faster."
      },
      {
        "name": "Rize's Glasses",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/rizesglasses.png",
        "tierClass": "good",
        "comment": "Shows auras of Survivors when you enter enraged mode. You should ideally not be losing enraged mode very frequently but being occasionally aware of Survivor locations is really helpful due to the Ghoul's immense mobility."
      },
      {
        "name": "Blood-Stained Handkerchief",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/bloodstainedhandkerchief.png",
        "tierClass": "good",
        "comment": "Extends the maximum distance that you can reach with your kagune tentacles, effectively making it easier to travel longer distances a bit more consistently. The effect is not huge, however, as it's only one extra meter."
      },
      {
        "name": "Iridescent Eye Patch",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/iridescenteyepatch.png",
        "tierClass": "good",
        "comment": "Automatically destroys pallets that you vault during your third leap, which can only be done during enraged mode. Trying to trigger it constantly in chase is not recommended, as it might actually backfire. Instead, it's best to use it occasionally when the right opportunity presents itself during chase. You can also use it outside of chase to clean up dropped pallets while you traverse the map. When used correctly, the effect is certainly quite decent."
      },
      {
        "name": "Hide's Headphones",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/hidesheadphones.png",
        "tierClass": "good",
        "comment": "Gives Survivors the Oblivious status effect for as long as they're marked, which typically lasts for as long as they're in deep wound. Even if you decide not to chase them, they might still waste a bit of time being extra cautious. Not a bad effect for its rarity."
      },
      {
        "name": "Broken Chain",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/brokenchain.png",
        "tierClass": "decent",
        "comment": "This add-on noticeably shortens the power recovery after you use your leap, allowing you to use it again much sooner, but only when you're not enraged. Since it's very easy to keep the enraged status going, this add-on will often be inactive. That being said, it's still quite helpful and can help you ensure that you put pressure on Survivors with minimal downtime at key times, such as the start of the game. Not a bad effect for an add-on of this rarity."
      },
      {
        "name": "Kaneki's Satchel",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/kanekissatchel.png",
        "tierClass": "decent",
        "comment": "Provides a significant boost of 30% speed to the final third leap, which only happens when you're enraged. This effect seems quite significant, but do keep in mind that your final leap never has any sliding and that it will typically be much shorter than the initial ones. For that reason, the effect of this add-on is somewhat diminished. Still not a bad effect, especially considering its rarity."
      },
      {
        "name": "Amon's Necktie",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/amonsnecktie.png",
        "tierClass": "decent",
        "comment": "Highlights the auras of nearby points of safety similarly to Zanshin Tactics' or Windows of Opportunity's effect, but only during the brief period between leaps instead of permanently. This effect isn't incredibly impactful but it can occasionally improve your awareness of your surroundings and help you in chase. Pairs well with the purple Red-Headed Centipede add-on to help you remember where you've left dropped pallets so you can break them with your vault."
      },
      {
        "name": "Kaneki's Wallet",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/kanekiswallet.png",
        "tierClass": "decent",
        "comment": "Greatly extends the time between leaps during which you can damage a Survivor with your tentacle. Similar effect to Wesker's Egg or Nurse's Watch, but since you can manually end this period with a button press, this add-on does not actually have any downsides. The effect of this add-on is quite noticeable and can sometimes help you land a hit after maneveuring around some obstacles, but the situations where it makes a difference are very rare. Keep in mind that during this period, your movement speed is very slow and you cannot navigate your surroundings effectively. If you find yourself unable to land a hit after leaping, it's sometimes best to cancel your second leap manually since you'll be able to try again very soon anyway."
      },
      {
        "name": "Hinami's Umbrella",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/hinamisumbrella.png",
        "tierClass": "decent",
        "comment": "This add-on provides a 10 second increase to your enraged mode timer, but only if you hit the &#34;perfect timing&#34; prompt that occurs when you initially injure someone with your power. If you press the attack button at the perfect time, you'll hear a sound effect and see a score bonus confirming that you did it correctly. This effect helps you to stay in this mode more consistently, but it's not extremely necessary."
      },
      {
        "name": "Red Spider Lily",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/redspiderlily.png",
        "tierClass": "decent",
        "comment": "Makes your basic attacks apply the Haemorrhage status effect for 60 seconds while enraged, which is typically pretty often. This can occasionally waste their healing progress when interrupted, but this is simply not that terribly necessary for a Killer that already has such an easy time injuring Survivors repeatedly anyway."
      },
      {
        "name": "Mado's Glove",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/madosglove.png",
        "tierClass": "decent",
        "comment": "Inflicts a decently long 15 seconds of Exhaustion status effect to any Survivor that removes the kagune mark, which typically happens when they mend their deep wound status effect. This does not normally provide any value during prolonged chase, but it can occasionally rob Survivors of their exhaustion perks when you're bouncing between multiple targets. Not a terrible effect, but it's quite hard to know when exactly it is being helpful."
      },
      {
        "name": "Aogiri Tree Robe",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/aogiritreerobe.png",
        "tierClass": "decent",
        "comment": "Gives you Undetectable status effect for a few seconds when a generator gets repaired and you're enraged, which will be more often than not. This can occasionally help you catch someone by surprise, but since you don't really control it, it has far fewer chances to be useful compared to the green Hide's Headphones, which can be triggered many times in a match."
      },
      {
        "name": "Taiyaki",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/taiyaki.png",
        "tierClass": "almost-no-effect",
        "comment": "Slightly extends the timer of your enraged status effect, giving you more time to keep it going before it disappears. This effect seems really useful, but the current timer is already quite generous and you can easily keep it going for as long as you don't lose track of Survivors for a while. For that reason, this add-on will most likely feel redundant."
      },
      {
        "name": "CCG ID Card",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/ccgidcard.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on reveals the auras of Survivors when you perform a vault using your leap. Sounds useful in theory, but keep in mind that this aura reveal is extremely brief and it'll typically happen when the Survivor is already in front of you. It also only reveals Survivors that are marked by your power. This add-on might occasionally reveal someone hiding nearby or allow you to pull off some unusual mindgame, but it's extremely situational and generally not worth bringing."
      },
      {
        "name": "Torture Apparatus",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/tortureapparatus.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on gives a very tiny haste effect that boosts your movement speed for a few seconds. This effect is supposed to help you bounce back after you've lost your enraged status, but if you play the Ghoul properly you will not lose it very often. You could quite literally play through an entire match and only trigger this add-on a few times, typically outside of chase. It's most definitely not worth running."
      },
      {
        "name": "The Black Goat's Egg",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/theblackgoatsegg.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on has zero effect on gameplay. It only provides additional bloodpoints when you successfully click the &#34;attack&#34; when the icon flashes on screen when you're injuring someone with your kagune tentacle. In case you're not aware, getting this perfect time awards extra points and makes the enraged mode last longer, but that's about it."
      },
      {
        "name": "Anteiku Apron",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/ghoul/anteikuapron.png",
        "tierClass": "detrimental",
        "comment": "This add-on removes the &#34;slide&#34; that occurs after leaping. This makes it slightly easier to control your movement but it's overall a really awful effect, since the sliding gives you extra distance and is very worth keeping. Keep in mind that your final leap already lacks any sliding and that you can also minimize the slide by cancelling the leap mid-air without the use of this add-on. For that reason, there's almost zero reason to run this add-on unless you're 100% sure that you know what you're doing."
      }
    ]
  },
  "springtrap": {
    "displayName": "Springtrap,Animatronic",
    "addons": [
      {
        "name": "Bonnie's Guitar Strings",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/bonniesguitarstrings.png",
        "tierClass": "strongest",
        "comment": "Allows you to determine the repair progress of all generators by changing their color when you're in a security door. Non-repaired generators will appear white and will gradually turn into a deeper color as they are closer to completion. This effect is unbelievably strong, as it allows you to consistently find the most progressed generator after each chase to make sure that it's stopped in its tracks. Using strong slowdown perks such as Pop Goes the Weasel or Eruption makes it even easier to ensure that generators will never be done behind your back. Unfortunately, this add-on comes with the downside of completlely removing the stealth that you normally have when coming out of a security door. This downside is noticeable (and will likely result in smart Survivors noticing that you have this add-on) but the add-on is still worth running if you dedicate your entire build to slowdown perks and you keep your chases short. Just make sure that you don't obsessively use the security doors at times when it's best to focus on a chase. If your chases aren't going well, the information that this add-on provides simply won't be enough to help you win."
      },
      {
        "name": "Endo CPU",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/endocpu.png",
        "tierClass": "good",
        "comment": "When walking inside of your axe's area of effect, you gain a noticeable 40% boost to your kick speed (which applies to kicking generators, pallets and breakable walls). This can be used during chase to minimize the amount of distance a Survivor can create after dropping a pallet. This effect stacks nicely with perks such as Fire Up or Brutal Strength. Since it lingers for a few seconds, it's even possible to traverse through the security door and still benefit from it when you kick a generator after coming out of it (if you're quick enough)."
      },
      {
        "name": "Foxy's Hook",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/foxyshook.png",
        "tierClass": "good",
        "comment": "Gives a small 7% haste bonus to movement speed to any player that walks through the axe's area of effect. Can be used in some scenarios to guarantee hits that would otherwise be very difficult, but keep in mind that Survivors can also benefit from this effect if you're not careful. Like any other add-on that works only in the &#34;area of effect&#34;, this add-on only triggers once the axe lands on something and not before. Keep in mind that it's possible for a Survivor to be detected while the axe is mid-air and give off Killer Instinct without technically being inside its area of effect yet. One trick to check if a Survivor entered the area of effect is to look at the top right side of your screen and check for the score events. If you get two of them, that means the Survivor entered the area of effect after the axe landed. If you only get one, that means that they only got detected by the axe mid-air and they did not get a speed boost from this add-on."
      },
      {
        "name": "Party Hat",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/partyhat.png",
        "tierClass": "good",
        "comment": "Quickly increases the active area of effect of your axe, making it easier to detect Survivors near it and apply effects from other add-ons. Sounds gimmicky, but this effect is surprisingly useful in many areas to help you keep track of a Survivor that is currently out of your view. Unfortunately, it comes with the small downside of making the actual area of effect last -20% of the usual 10 second duration. To make this add-on shine, be sure to throw your axe often when you're not actively using it and pair it with things such as the purple Endo CPU. Beware of using it together with the blue Foxy's Hook as you might give haste to Survivors accidentally."
      },
      {
        "name": "Ripped Curtain",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/rippedcurtain.png",
        "tierClass": "good",
        "comment": "Applies Mangled and Haemorrhage for 60 seconds after an axe hit. Delaying and possibly regressing the healing progress of Survivors is useful on any Killer, but particularly so on stealthy ones. Will likely provide consistent value since it's easy to apply."
      },
      {
        "name": "Restaurant Menu",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/restaurantmenu.png",
        "tierClass": "good",
        "comment": "Reduces the recall time of a missed axe that is left in the environment (normally 6 seconds), making it faster by 10%. It's a small but welcome effect for beginners that are still not too accurate with their axe but also for experienced players, since throwing your axe around is generally a good idea to make yourself 5% faster (until you need to recall it at a later point). Pairs very well with any add-on that gives you effects that trigger when walking into your axe's area of effect, such as the blue Foxy's Hook or the purple Endo CPU. It does not, however, reduce the recall time when the axe is lodged in a Survivor after hitting them."
      },
      {
        "name": "Streamers",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/streamers.png",
        "tierClass": "good",
        "comment": "Slightly increases the speed at which you perform the animation of exiting the security doors when you teleport by about half a second. Not a huge effect, but it can help give Survivors slightly less reaction time if they're nearby when this happens since it also speeds up the animation of emerging from the door. This effect is more useful if you have perks or other add-ons that tell you exactly where to go (such as the blue Bonnie's Guitar Strings). Don't bother running it if you're not using the security doors often."
      },
      {
        "name": "Purple Guy Drawing",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/purpleguydrawing.png",
        "tierClass": "good",
        "comment": "Reveals the aura of axe-holding Survivors briefly when they vault and again when they remove the axe themselves. The value from this add-on is quite situational, but it's a very decent effect when it triggers at the right time. To make this add-on shine, you can try to strategically leave Survivors mid-chase and approach them again from an unexpected angle once their aura is revealed. This works best in indoor maps."
      },
      {
        "name": "Faz-Coin",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/fazcoin.png",
        "tierClass": "good",
        "comment": "Creates a copy of  your terror radius (24 meters) at the point where you throw your axe and gives you Undetectable for 10 seconds. This can confuse nearby Survivors and allow you to sneak up to players from afar. Pairs well with the purple Access Panel, since you can teleport the axe from one door to another and also become stealthy on command whenever you detect someone near a security door. Keep in mind that even without a terror radius, Springtrap is sometimes rather noisy and easy to hear from a distance, however."
      },
      {
        "name": "Celebrate! Poster",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/celebrateposter.png",
        "tierClass": "good",
        "comment": "Gives all nearby players (Killer and Survivors) a noticeable boost to their vaulting speed and movement speed after landing a hatchet hit. Since this bonus is multiplicative and the Killer's movement speed is faster, the Killer technically benefits from this add-on slightly more than the Survivors, by a difference of about 3%. This add-on can make some loops unpredictable and dangerous but it should be used carefully, as giving speed to Survivors can result in them dragging you too far away from the objectives that you need to defend and the areas that you want to remain in. Perhaps stay away from it if you want to avoid confusing your muscle memory."
      },
      {
        "name": "Chica's Bib",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/chicasbib.png",
        "tierClass": "good",
        "comment": "Applies a brief 5 seconds of Exhaustion status effect to any Survivor inside the axe's area of effect. Sounds like a very small amount, but it's actually more than enough since Survivors cannot recover from exhaustion while they're running anyway. This effect can help you counter many Survivor perks before they have a chance to be used. Like any other add-on that works only in the &#34;area of effect&#34;, this add-on only triggers once the axe lands on something and not before. Keep in mind that it's possible for a Survivor to be detected while the axe is mid-air and give off Killer Instinct without technically being inside its area of effect yet. One trick to check if a Survivor entered the area of effect is to look at the top right side of your screen and check for the score events. If you get two of them, that means the Survivor entered the area of effect after the axe landed. If you only get one, that means that they only got detected by the axe mid-air."
      },
      {
        "name": "Access Panel",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/accesspanel.png",
        "tierClass": "decent",
        "comment": "When holding your axe, reveals any Survivor within 4 meters of a security door. On top of being able to reliably find people using security doors, it can occasionally reveal Survivors working on generators near them. While most generators are too far away from them, some maps may have 1 or 2 generators close enough to a gate to make detection with this add-on unavoidable. Being able to briefly tap your power button to get immediate information on Survivor locations is very powerful and pairs well with several other add-ons, such as the iridescent Faz-Coin. If you use the Faz-Coin and detect a Survivor near a door, you can get rid of your axe and begin to approach them while stealthy. This add-on also unlocks the ability to throw your axe through security doors, making it come out of whatever other door is linked to it. This ability is not generally very useful, but you can pair it with the Faz-Coin to immediately create a fake terror radius across the map."
      },
      {
        "name": "Security Guard's Badge",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/securityguardsbadge.png",
        "tierClass": "decent",
        "comment": "Extends the duration of the Undetectable status effect that you get from coming out of a security door by 5 seconds, bringing it to a total of 25 seconds. This is particularly useful if you fail to find someone right away or need to ambush a second survivor after the first one gets away. Not very useful if you ignore the use of security doors, but it's an okay effect considering its rarity."
      },
      {
        "name": "Rotten Pizza",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/rottenpizza.png",
        "tierClass": "decent",
        "comment": "Doubles the duration of the Killer Instinct that occurs when a Survivor is near your thrown axe. Not a tremendously impactful effect, but the extra tracking can be pretty useful and help not lose track of a Survivor in places with low visibility. Decent value for its rarity, especially when paired with the green Party Hat."
      },
      {
        "name": "Loot Bag",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/lootbag.png",
        "tierClass": "decent",
        "comment": "Survivors with an axe stuck on them cannot leave through the exit gates and also block it for other nearby Survivors. Unlike other Killers, there is no period of grace and if you down a Survivor with a basic attack, they'll immediately be able to crawl out and escape. For that reason, it's very important that you get close enough to pull the axe out of them and grab them directly when you're using this add-on (or go for another Survivor that is more vulnerable instead). Needless to say, this effect only works in the endgame and as such it is quite situational, but it will very likely catch a lot of Survivors by surprise, since most healthy Survivors expect to be able to escape after one hit near the exit gates."
      },
      {
        "name": "Greasy Paper Plate",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/greasypaperplate.png",
        "tierClass": "almost-no-effect",
        "comment": "Makes Survivors take longer to remove the axe after you've hit them with it (normally 8 seconds), making it take 1.2 seconds longer. This can extend the duration of other add-ons and also indirectly make you faster, since removing the axe automatically returns it to the Killer and makes you move 5% slower again. It also gives you a slightly better chance to grab the axe from the Survivor directly. That being said, you will often be the one manually recalling the axe during chase, so this effect isn't always necessary."
      },
      {
        "name": "Office Phone",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/officephone.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts various status effects (Oblivious and Broken if they are injured) to nearby Survivors when you hit someone with your axe. The effects themselves are not extremely powerful and they often last very little, so this add-on is highly situational. In a best case scenario, you could prevent a Survivor from using a medkit add-on on themselves but most of the time this add-on will literally do nothing. Can be paired with the brown Greasy Paper Plate if you want to extend the duration of its effects."
      },
      {
        "name": "Help Wanted Ad",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/helpwantedad.png",
        "tierClass": "almost-no-effect",
        "comment": "When holding your power, this add-on quickly shows you the actual trajectory that your axe will follow. This is an excellent tool for beginners (to help them learn how Survivors move when outside of your sight). Can also be used if you want to practice a specific throw in a controlled environment. Otherwise, this add-on is not very necessary so feel free to take it off in favor of something else."
      },
      {
        "name": "Iridescent Remnant",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/iridescentremnant.png",
        "tierClass": "almost-no-effect",
        "comment": "Blocks all non-dropped pallets within 32 meters when you come out of a security door. This effect isn't always extremely impactful, but it can provide a lot of value if you're teleporting often and you know exactly where Survivors are (thanks to your perks or other add-ons such as the blue Bonnie's Guitar Strings). Unfortunately, the blocking effect happens slightly before you emerge from the security doors which can give an indirect warning to the nearby Survivors that you're coming. Don't bother running this add-on if you don't plan on using your security doors much."
      },
      {
        "name": "Freddy's Hat",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/springtrap/freddyshat.png",
        "tierClass": "detrimental",
        "comment": "Increases the &#34;weight&#34; of your axe, making its trajectory fall off much sooner. In some situations, this effect might help curve your axe around certain obstacles. However, the shorter range is a massive downside that effectively nerfs your maximum range. With this add-on equipped, you will no longer be able to punish distracted Survivors at medium range and all of your axe attacks will have to be performed from very close. Avoid this add-on unless you know what you're doing."
      }
    ]
  },
  "krasue": {
    "displayName": "Krasue",
    "addons": [
      {
        "name": "Chicken Head",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/chickenhead.png",
        "tierClass": "strongest",
        "comment": "Makes all Survivors start leeched, which forces them to find a mushroom to cleanse themselves before the leech eventually makes them injured and broken. It also spawns an initial extra two mushrooms which makes this process a bit easier for them (even though they will still have to consume four of them, making it a net positive for you). Even though this does not really distract the Survivor team for a long time, it gives you the opportunity to immediately switch to head form at the start of the match and possibly have a very fast first chase. This add-on also applies the effects from the purple Lorenza's Remains, possibly keeping a single Survivor blind for the entirety of their first chase."
      },
      {
        "name": "Spattered Handkerchief",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/spatteredhandkerchief.png",
        "tierClass": "strongest",
        "comment": "Automatically infects everyone with leeched when the exit gates are powered, making it easier to quickly finish your next chase or two and make sure that Survivors don't have a comeback in the endgame. It also makes it even easier to run out of mushrooms by permanently disabling the spawn of a single mushroom that normally happens when you switch to head form. Not a bad effect at all if you're trying to create a build around the endgame, but there's better options if you need a consistent add-on before that part of the match. Keep in mind that if you use certain perks such as No Way Out you could possibly stall all Survivors long enough to make them automatically injured if they reach Leeched Tier II if they can't find a mushroom to cleanse its effect. Making a full build around this effect can be extremely oppressive if you commit to it."
      },
      {
        "name": "Shredded Gown",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/shreddedgown.png",
        "tierClass": "good",
        "comment": "With this add-on, switching forms will reveal the auras of Survivors that are near mushrooms or that are holding them. This will generally result in lots of auras shown to you over the course of the game but you're not always guaranteed to find specific Survivors at favorable times. Since this add-on has no downside, it's still perfectly safe to use it if you can't think of anything else you'd rather bring. This effect can really help you find Survivors early on since many of them rush to find a mushroom at the start. It can also make sure you don't lose someone in chase or even help you in some late-game scenario where Survivors are desperately trying to find some of the last mushrooms available."
      },
      {
        "name": "Framed Newspaper",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/framednewspaper.png",
        "tierClass": "good",
        "comment": "This add-on essentially increases your flight form duration by 50% and also slightly increases its recharge rate. It has a small &#34;downside&#34; that prevents you from flying when the power gauge is under 50% charge (normally it must be above 25%) but it's not a big deal at all. This is definitely one of the better add-ons to increase your overall mobility. Particularly nasty when paired with the green Crumpled Sheet Music, since they stack nicely and allow you to have ridiculous levels of mobility."
      },
      {
        "name": "Crumpled Sheet Music",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/crumpledsheetmusic.png",
        "tierClass": "good",
        "comment": "This add-on essentially recharges your entire head form flight duration after hitting a Survivor with your leeching gland. This is a decent effect, as you often want to immediately switch to head form after leeching someone. However, there's really not that many situations where you'll find yourself completely depleted of charges when this happens. It's a decent effect for its rarity and it can reward some aggressive gameplay but that's about it. When paired with the blue Framed Newspaper, however, it can provide really ridiculous levels of sustained mobility."
      },
      {
        "name": "Lorenza's Remains",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/lorenzasremains.png",
        "tierClass": "good",
        "comment": "Applies Blindness to all leeched Survivors as well as a small hinderance to their movement speed if they become fully leeched (which happens after 60 seconds). The hindered part of this add-on is not super impactful, as it's pretty rare for Survivors to reach full infection. This add-on shines a bit more when brought together with the iridescent Chicken Head since it will make it affect everyone at the start of the match or the blue Spattered Handkerchief to make everyone blind during the endgame."
      },
      {
        "name": "Luckless Mouse",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/lucklessmouse.png",
        "tierClass": "good",
        "comment": "Increases the total amount of charges by +2, giving you a couple extra seconds of head form flight. Not always necessary in every situation, but it's a great effect considering its low rarity."
      },
      {
        "name": "Queen's Sceptre",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/queenssceptre.png",
        "tierClass": "decent",
        "comment": "Provides the unique effect of creating leeching gland splatters any time you hit a Survivor with the head form's whip attack. These splatters do not affect the Survivor you hit, but they can leech a nearby teammate and save you the trouble of having to switch forms to infect them, which can really help you keep the pressure up. Not a bad effect if you're expecting bodyblocks, but there's more consistent add-ons that you might prefer instead. Similar to the other purple add-on of similar effect, players that are good at multi-tasking will benefit the most."
      },
      {
        "name": "Defective Metronome",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/defectivemetronome.png",
        "tierClass": "decent",
        "comment": "Provides a simple Exhaustion effect to any Survivor under the effect of the cleansing mushrooms, a process that you'll be able to immediately identify when their portrait is glowing green. This can simplify your chases and deny certain perks at key times such as Dead Hard. Just keep in mind that it will never really come into play if you're constantly harassing Survivors and never really let them use mushrooms in the first place."
      },
      {
        "name": "First Libretto",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/firstlibretto.png",
        "tierClass": "decent",
        "comment": "Reduces the consumption rate of your head flight for 15 seconds after you hook a leeched Survivor, which will be almost every time. This essentially guarantees that your next flight will cover the entire map if necessary, although you could always go for a simpler and more consistent option with the brown Luckless Mouse if this add-on seems too situational."
      },
      {
        "name": "Pig's Eye",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/pigseye.png",
        "tierClass": "decent",
        "comment": "Shows the aura of any Survivor who begins cleansing their leech status with a mushroom from further than 40 meters away from you. When using this add-on, you'll want to keep an eye out for any leeched Survivor whose HUD icon turns green and you might be able to spot them across the map. This add-on used to be very strong when the leeched status effect remained after being unhooked, but right now this is no longer the case as unhooked Survivors don't have a need to use the mushrooms. Currently best paired with the Iridescent Chicken Head if you want to find people early on. Otherwise, it can still provide some value if you're planning to slug Survivors or bounce back and forth between different targets, although the Krasue's main strength typically comes from focusing on one target at a time. Definitely not worth using if you're planning on targetting a Survivor after the unhook right away anyway or if you don't want to pay much attention to the HUD during your gameplay."
      },
      {
        "name": "Dulled Knife",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/dulledknife.png",
        "tierClass": "decent",
        "comment": "Provides a significant boost to the recharge speed of your flying ability but at the cost of giving Survivors several buffs when consuming mushrooms (small haste and stealth effects). This downside makes this add-on slightly dangerous and not particularly attractive considering that there are already several other add-ons that do similar things without any downside, but you can still decide to run it if you want to take advantage of the extra duration it will provide. Make sure not to pair this add-on with the green Pig's Eye as the stealth effect that Survivors gain when using a mushroom completely negates its effect. Keep in mind that since this add-on gives a visible boost to Survivors, they will know that you're running it."
      },
      {
        "name": "Broken Tiara",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/brokentiara.png",
        "tierClass": "decent",
        "comment": "Provides a simple effect that can occasionally help you catch Survivors by surprise. Not extremely consistent on its own but it can pair well with the green Pig's Eye if you want to ambush Oblivious Survivors from afar."
      },
      {
        "name": "Chunk of Malai",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/chunkofmalai.png",
        "tierClass": "almost-no-effect",
        "comment": "Slows down the process of cleansing the leech infection when using a mushroom, which you'll be able to immediately identify when a Survivor's portrait is glowing green. This normally takes anywhere from 20 to 40 seconds depending on their infection level. Getting rid of the leech status quickly is very important, as it makes Survivors far less vulnerable but this add-on only adds between ~2 to 4 extra seconds. This effect is absolutely tiny and often doesn't make a single difference, especially when you consider that most of the times it will be happening passively in the background while the Survivor is healing or repairing. That being said, pairing this with the Chicken Head can at least guarantee some value early on."
      },
      {
        "name": "Wriggling Parasite",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/wrigglingparasite.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the passive growth rate that makes a leeched Survivor eventually become broken. This process normally takes 60 seconds and this add-on will shorten that timer by 9 seconds, making it take 51 seconds instead. Sounds like a nice effect that could be paired with add-ons such as Lorenza's Remains to punish Survivors that are too passive or that run out of mushrooms, but in reality it's really not that powerful. Most of the times, the 51 second timer is not short enough to influence Survivors to do anything that they wouldn't already be doing. If you're actively chasing them, they'll definitely be downed much sooner than that anyway."
      },
      {
        "name": "Janjira's Hand",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/janjirashand.png",
        "tierClass": "almost-no-effect",
        "comment": "Provides a small boost to your head form flight by immediately restoring some charges and reducing its depletion rate for a few seconds each time a generator is completed. This effect is honestly very tiny and brief, but in the endgame this add-on does provide a significant increase to your head form's duration permanently. This should theoretically make it pair well with endgame builds (perhaps using the blue Spattered Handkerchief), but this add-on is ultimately outclassed by simpler ones such as the brown Luckless Mouse."
      },
      {
        "name": "Rotten Swine",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/rottenswine.png",
        "tierClass": "almost-no-effect",
        "comment": "Provides a +15% bonus kick speed to any generator, wall or pallet that you spit on with your leeching gland. This effect is rather small and not extremely noticeable on its own, but it can occasionally make a difference if you're smart about when you apply it. Needless to say, it can be stacked with perks such as Brutal Strength for an even faster kick. Just keep in mind that the Krasue is already good at dealing with some dropped pallets, so you don't necessarily need to break them all mindlessly."
      },
      {
        "name": "Mysterious Elixir",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/mysteriouselixir.png",
        "tierClass": "almost-no-effect",
        "comment": "Spitting on a window with your leeching gland applies a mark on it. Vaulting that window blocks it for 10 seconds and removes the mark. Very similar to other Killer add-ons of this same type, and pretty useful. Make sure to occasionally apply it to certain strong windows such as the ones in the shack and you'll be able to occasionally deny them in chase later. Not a terrible effect at all but certainly situational. Similarly to the other purple add-on of similar effect, players that are good at multi-tasking will benefit the most. The reason why this add-on isn't stronger is because the Krasue is generally already very good at dealing with most windows in the game."
      },
      {
        "name": "Theatre Binoculars",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/theatrebinoculars.png",
        "tierClass": "almost-no-effect",
        "comment": "Reveals the auras of Survivors when you hit a non-leeched Survivor in head form for 5 seconds within 24 meters of you. Using the head form's intestinal whip attack on non-leeched Survivors is typically a bad idea since you'd need to do it four times in order to deal one single health state of damage. However, with this add-on, you can strategically do it to try and find someone else nearby. It might also happen if you accidentally hit someone that's trying to bodyblock for their partner. It's a quirky effect but at the end of the day it only triggers when you do something very suboptimal, so it's not often worth the add-on slot."
      },
      {
        "name": "Sticky Lozenge",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/krasue/stickylozenge.png",
        "tierClass": "almost-no-effect",
        "comment": "Displays a dynamic cursor when holding your leeching gland spit power, making it easier to accurately hit whatever you're aiming at from a distance. Slightly more useful and less awkward than other Killer add-ons of this type. Still, this effect can easily be replaced by a monitor crosshair or similar feature."
      }
    ]
  },
  "first": {
    "displayName": "First",
    "addons": [
      {
        "name": "Pizza Goggles",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/pizzagoggles.png",
        "tierClass": "strongest",
        "comment": "A transformative high-risk, high-reward type of add-on. Speeds up the Undergate exit animation significantly and massively reduces its recovery timer (from 35 to 10 seconds), making it pretty much always available. This indirectly allows you to go underground just a few seconds into the match and start beneffiting from the increased mobility and third person view. However, it has the massive downside of shrinking its radius to a tiny circle, completely removing any chance you might have of actually hitting a Survivor with it. Losing the ability to hit Survivors with this power is a serious downside but it's less of an issue against competent Survivors that would dodge it most of the time anyway. If your build and playstyle require constant mobility, give this add-on a try. Pairs well with the Bloody Roller Skate and other Undergate-related add-ons since you'll be benefitting from their effects more often. Overall, this add-on has the potential to elevate your map presence significantly but comes at the cost of having to be extra accurate with your Vine attacks. Best used by experienced players that already know what they're doing."
      },
      {
        "name": "Bloody Roller Skate",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/bloodyrollerskate.png",
        "tierClass": "strongest",
        "comment": "After fully emerging from your Undergate attack, you gain a noticeable 20% boost for 1.5 seconds, giving you an extremely valuable couple meters worth of distance when catching up to a Survivor running away (which is the most common scenario). Since this Killer's ability becomes exponentially more dangerous the closer he is to a Survivor, this is a pretty universally useful effect and a safe choice for any player to use."
      },
      {
        "name": "Chess Piece",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/chesspiece.png",
        "tierClass": "good",
        "comment": "Splits your Vine attack into two smaller, separate attacks that can be used consecutively. This is a really transformative add-on that forces both Killer and Survivors to adapt and play quite differently. New players should absolutely stay away from this add-on until they understand the basics of the default power first. Being able to hit twice does come with some amazing benefits for experienced players, since you can sometimes hit two different Survivors or even the same Survivor back to back if your accuracy is on point. Experienced players should try it for themselves and find out if it fits their playstyle."
      },
      {
        "name": "Iridescent Soteria Chip",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/iridescentsoteriachip.png",
        "tierClass": "good",
        "comment": "Makes you Undetectable and provides a steady aura-reading ability on nearby Survivors with at least one power token within 12 meters when you enter Worldbreaker mode. This effect goes away when you attack for the first time or go underground, so if you want to get the most value, you should avoid going underground unnecessarily and refrain from using your Vine attack carelessly. Instead, take your time to be accuratate with the Vine attack (possibly breaking line of sight momentarily while you see their aura) or better yet, perform a basic attack if possible. Basic attacks do not reset this add-on and this will allow to stay stealthy for longer. If all of this sounds like too much work, you can use other simpler add-ons instead."
      },
      {
        "name": "Electrode Cap",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/electrodecap.png",
        "tierClass": "good",
        "comment": "Gives you aura read on Survivors that are further than 26 meters at the start of the second phase of your Worldbreaker mode, the one that cannot be shortened by clocks anymore. Extremely helpful in large maps (where everyone is constantly beyond the 26 meter range) or in situations where a Survivor has taken you far away from where the action is taking place. Remember to use visual and audio cues to notice the exact moment when this happens so you don't miss out on the information. Not too useful if you're constantly distracted or already have powerful perks to help you know where to go. Keep in mind that this add-on only shows you auras of distant Survivors, so if you find yourself in the middle of the map, don't rely exclusively on this add-on's information and use your own judgement. Not every bit of information needs to be acted upon. Particularly useful when paired with the blue Pizza Goggles and their increased mobility."
      },
      {
        "name": "Rabbit Remains",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/rabbitremains.png",
        "tierClass": "good",
        "comment": "Adds another layer of utility to your Undergate attack, making its radius inflict Survivors with the Exhausted status even before your attack fully emerges. This is a great way to nullify the effects of perks such as &#34;Sprint Burst&#34; or &#34;Lithe&#34; which would otherwise make it really easy for Survivors to create distance against you. It also makes it basically impossible to use a perfectly timed &#34;Dead Hard&#34; to avoid damage. Exhaustion perks are powerful tools against this Killer, so dedicating an add-on to counter them is actually not a bad idea at all. However, this add-on comes with the downside of increasing the long recovery timer of going underground even further by an extra 5 seconds."
      },
      {
        "name": "Smashed Cassette Deck",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/smashedcassettedeck.png",
        "tierClass": "good",
        "comment": "Removes one of the Grandfather Clocks that spawn around the map, making it slightly harder for Survivors to find one and start shortening your Worldbreaker mode's duration with it. Additionally, it also makes all four Survivors begin with a single temporary token that will make your very first Vine attack immediately trigger Worldbreaker mode. This effect can drastically speed up the pace of the match and allow you to start damaging Survivors sooner, which is great if your build benefits from a strong start. However, keep in mind that this add-on will make it harder to stack tokens on one or multiple Survivors early on. Normally you would enter Worldbreaker for the first time when at least one Survivor has two tokens, but this add-on will leave all Survivors at zero tokens by the time this happens. For that reason, use this add-on carefully."
      },
      {
        "name": "Gutted Supercom",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/guttedsupercom.png",
        "tierClass": "good",
        "comment": "Briefly shows you the aura of a Survivor who you've hit with a Vine attack (outside of Worldbreaker mode), making it easy to determine which direction they're headed into if they break your line of sight. The duration of only 1.5 seconds can greatly be enhanced by pairing with the perk &#34;Lethal Pursuer&#34;, but it's still good even by itself."
      },
      {
        "name": "Bead Maze",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/beadmaze.png",
        "tierClass": "good",
        "comment": "Reliably extends the second phase of the Worldbreaker mode, the one that Survivors cannot shorten in any way. For most of the match, this will grant 10 extra seconds (going from 50 to 60) which is more than decent value considering its low rarity. Safe choice for players of any level."
      },
      {
        "name": "Neck Tendril",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/necktendril.png",
        "tierClass": "decent",
        "comment": "Applies the usual combination of Mangled and Haemorrhage for 70 seconds when landing a Vine attack in Worldbreaker Mode. A decent effect similar to many other Killers' add-ons. Doesn't have a lot of inherent synergies with other add-ons, so be sure to have a build that takes advantage of the slower healing time this applies."
      },
      {
        "name": "Black Widow Spider",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/blackwidowspider.png",
        "tierClass": "decent",
        "comment": "Reveals the location of a distant Survivor (the furthest one that's at least 36 meters away) the first time you go underground during Worldbreaker mode. Notably, this effect cannot be countered by stealth perks since it reveals both their aura and location simultaneously. Seeing someone's aura from afar can sometimes trick you into chasing a very distant Survivor and possibly waste too much time, but it's still a very welcome source of information if everyone is hiding or if you're looking for a specific Survivor. This add-on also often highlights a Survivor that might be busy using the Grandfather clock to reduce your timer. At best, this add-on can give you critical information when the match is already pretty advanced, like for example using it to deduce the location of the most vulnerable Survivor who is dead on hook. This is one of those add-ons that greatly benefit from using the blue Pizza Googles for increased mobility."
      },
      {
        "name": "Electroshock Collar",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/electroshockcollar.png",
        "tierClass": "decent",
        "comment": "Has the simple effect of blocking all vault locations within 32 meters for 12 seconds when you emerge with your Undergate attack. This effect triggers right after you emerge, so you cannot use it to preemptively block a window. Vaulting in chase against this Killer is extremely dangerous, so many Survivors will instead look to create as much distance as possible while you're emerging from underground. That being said, this add-on suddenly becomes a lot more usable when paired with the blue Pizza Goggles since you'll be emerging faster and more often."
      },
      {
        "name": "Broken Skateboard",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/brokenskateboard.png",
        "tierClass": "decent",
        "comment": "Activates for 65 seconds when Worldbreaker mode begins. During this time, your vault speed is increased by 30% (which is basically useless as The First is the type of Killer that very rarely vaults windows in chase anyway). The other effect is a lot nicer, however, since it also highlights the location of pallets and windows which can be a decent way to increase your awareness of the map or even help you line up a nasty Vine attack on a Survivor that leaves your line of sight. Keep in mind that, just like any other add-on that activates at the start of Worldbreaker mode, this one can really do very little if you're already having a difficult match where you struggle to reach it."
      },
      {
        "name": "Forged Death Certificate",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/forgeddeathcertificate.png",
        "tierClass": "almost-no-effect",
        "comment": "Makes you Undetectable after a successful Vine attack. The effect ends when entering Worldbreaker (which happens anytime a Survivor has 2 tokens). You could theoretically extend this Undectable duration by strategically switching targets but doing that is already a very time-consuming and risky idea, since you're not pressuring Survivors with injuries or downs. Overall a fun and gimmicky add-on that is typically outclassed by the much more consistent Iridescent Soteria Chip."
      },
      {
        "name": "Shattered Wrist Rocket",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/shatteredwristrocket.png",
        "tierClass": "almost-no-effect",
        "comment": "Adds another layer of utility to your Undergate attack, making it damage all generators and break all pallets and breakable walls in its radius when you emerge from it. This effect sounds extremely powerful, but it's not all that game-changing. Since this Killer deals with pallets mostly fine, going out of your way to destroy them is not a huge priority. At best, this add-on will help you save a bit of time kicking generators and cleaning up around the map, which is still perfectly good for an add-on of this rarity. Keep in mind that automatically damaging a generator has bad synergies with perks that require you to kick one, such as &#34;Nowhere to Hide&#34; or &#34;Pop Goes the Weasel&#34;, so plan your build carefully. You might also choose to run a build that already damages and blocks generators passively, making this effect redundant."
      },
      {
        "name": "Orderly ID",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/orderlyid.png",
        "tierClass": "almost-no-effect",
        "comment": "Slightly increases your Vine attack reach by 2 meters, but only when outside of Worldbreaker mode. This can help you land nasty hits from surprising distances, especially if you're reading the aura of an unaware Survivor. However, it has no effect during Worldbreaker mode and the two different maximum distances could mess with your muscle memory and learning process. This add-on is best used by experienced players who are already quite familiar with the default Vine attack range. Constantly going for crazy long distance hits can be really fun but it can also backfire very quickly if you keep missing. For that reason, this add-on is unfortunately rarely worth the add-on slot."
      },
      {
        "name": "Mid-Century Radio",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/midcenturyradio.png",
        "tierClass": "almost-no-effect",
        "comment": "This add-on can point you in the direction of a distant Survivor who is interacting with the clocks to shorten your Worldbreaker mode's duration. This allows you to interrupt them or simply gain some awareness of where the Survivors are generally located throughout the match. Not a terrible effect, but the minimum range of 32 meters really hurts its utility in a lot of maps where Survivors will be within that distance but still behind tons of walls and obstacles. If you chase after a Survivor that's too far away, you'll still likely have most of your power already drained by the time you arrive."
      },
      {
        "name": "Clock Hands",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/clockhands.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts Oblivious on Survivors trying to shorten your Worldbreaker mode by interacting with the clocks around the map, which lingers for 12 seconds afterwards as well. Survivors will see a red debuff icon and immediately notice the effects of this add-on. Not extremely impactful but it can lead to some surprise hits if you pair it with other information add-ons or perks (such as the brown Mid-century Radio). At the very least, it will make the Survivors want to play a bit more carefully and perhaps waste a few seconds. Needless to say, this add-on does nothing if Survivors ignore clocks, but that's a really good scenario for you anyway."
      },
      {
        "name": "Stained Glass Mural",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/stainedglassmural.png",
        "tierClass": "almost-no-effect",
        "comment": "Shortens the cooldown time of using your Undergate power (normally 35 seconds) by a flat -12 seconds each time you break a pallet or breakable wall. This isn't a terrible effect, but unfortunately too many conditions are necessary for this add-on to shine. Since the Vine attacks allow you to play around dropped pallets, you don't always need to break them in chase. And even when you do, you won't always need to transition into the Undergate mode anyway. Still, a decent effect for a low rarity add-on. Keep in mind that breaking a pallet or wall with the green Shattered Wrist Rocket add-on does not trigger the effect of this one, unfortunately. Keep in mind that this Killer can traverse through breakable walls when he is underground, so you sometimes have even less of a reason to break them compared to others."
      },
      {
        "name": "Victor's Razor Blade",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/first/victorsrazorblade.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts Survivors with the Broken status effect for 20 seconds at the end of Worldbreaker mode. Keeping Survivors injured is never a bad thing, but the short duration and very specific trigger conditions make this add-on really not that attractive. At best, it can occasionally help you to paralyze a team momentarily and prevent them from healing someone that really needs it for a while. This effect can be even worse if the Survivor is using a perk like Vigil that can shorten these types of effects."
      }
    ]
  },
  "jason": {
    "displayName": "Jason,Slasher",
    "addons": [
      {
        "name": "Deputy's Badge",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/deputysbadge.png",
        "tierClass": "strongest",
        "comment": "Allows you to passively damage generators while in Omnipresent Evil mode by getting close to them. If a Survivor is working on it, they'll get a special skill-check instead. This effect is simple but saves a ton of time while synergizing with certain perks such as Surveillance."
      },
      {
        "name": "Sauna Rock",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/saunarock.png",
        "tierClass": "good",
        "comment": "Has the simple (but annoying) effect of inflicting a small duration of Exhausted to any Survivor that you jumpscare with your power. If you see them highlighted with Killer Instinct when ending Omnipresent Evil, then you can be sure that this add-on has worked. Exhaustion perks are one of the very few ways that Survivors can create distance against you and disabling them right before a chase starts (or resumes) is incredibly valuable. Considering how common exhaustion perks are, this add-on is simply a safe choice for anyone."
      },
      {
        "name": "Sleeping Bag",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/sleepingbag.png",
        "tierClass": "good",
        "comment": "Reveals the outline (not aura) of Survivors near hooks whenever you reload during Omnipresent Evil. You won't get a lot of value if you never reload during this mode (or if you keep reloading while hooking Survivors). However, if you slightly out of your way you can sometimes waste spears and reload more than you normally would to trigger this add-on's effect. Sometimes, none of the Survivors will be near hooks and this add-on will do nothing. At its best, it can give you critical information when Survivors are trying to stay undetected. Overall a very solid choice if you make sure to trigger it often. Keep in mind that Survivors can avoid detection by crouching around while you're in Omnipresent Evil mode and that this add-on is one of the very few ways that you can outplay this."
      },
      {
        "name": "Eye Goop",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/eyegoop.png",
        "tierClass": "good",
        "comment": "Provides 13 seconds of stealth every time you reload a spike, including when you hook someone and automatically refill it. Might not seem like much, but this effect can be triggered dozens of times per match and can help avoid detection quite frequently. If your Survivors are consistently hiding whenever you go into Omnipresent Evil, this might be a great way to find them when they're not expecting you to be stealthy."
      },
      {
        "name": "Imprinted Aluminum",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/imprintedaluminum.png",
        "tierClass": "good",
        "comment": "Applies the typical combination of Mangled and Haemorrhage for 70 seconds. Nice and simple effect that will make Survivors struggle even more to keep up with the pace of the game if you're accurate with your spear throws."
      },
      {
        "name": "Missing Corkscrew",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/missingcorkscrew.png",
        "tierClass": "good",
        "comment": "Creates a fake terror radius and grants you Undetectable when a Survivor becomes impaled, which remains and lingers for 13 seconds after it has been removed. This is a really useful and easy to trigger effect no matter what. The temporary stealth prevents your aura from being read, hides your red stain and allows you to catch other Survivors by surprise if you switch targets."
      },
      {
        "name": "Coroner's Coffee",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/coronerscoffee.png",
        "tierClass": "good",
        "comment": "Your spikes push Survivors even further than normal (assuming that they don't collide with the environment or go down), and when this happens you also gain a +13% movement speed boost for a brief moment. This sounds like a nice effect and in many cases it's exactly that, especially if your spear pushes a Survivor away from safety. However, the effectiveness of this add-on can also be reduced if the opposite happens and you actually make a Survivor harder to catch by pushing them further away from you."
      },
      {
        "name": "Two Nails",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/twonails.png",
        "tierClass": "good",
        "comment": "Reveals the aura of a Survivor for a few seconds if your thrown spear flies near them (whether it's a hit or miss). This information can sometimes be a little redundant but it will definitely shine in a lot of tiles where you can easily mindgame a Survivor if you know their exact location. A very safe choice for beginners and experienced players alike."
      },
      {
        "name": "Dirty Money",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/dirtymoney.png",
        "tierClass": "good",
        "comment": "This add-on grants you the ability to automatically reload your missing spear by vaulting or breaking a pallet/wall. This also works if you do one of these actions when reappearing from the Omnipresent Evil mode. Each automatic reload requires a token, and these tokens are granted whenever a generator is completed. This is a really useful effect for beginners that still struggle to multi-task and reload during difficult chases. For intermediate players, the automatic reload is still a nice feature that might help occasionally if they find themselves in an area without any easy spots to reload from. Experienced Jason players will likely want to stay away from this add-on, since they can probably manage to reload very frequently without losing much time at all."
      },
      {
        "name": "Bloody Smile",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/bloodysmile.png",
        "tierClass": "decent",
        "comment": "Extends the distance that your power can &#34;sense&#34; Survivors in Omnipresent Evil and the distance that they'll be detected and highlighted by Killer Instinct when you exit it from 16 to 20 meters. Not a bad effect at all, although you might struggle to get any value if you forget to use Omnipresent Evil or if Survivors really commit to crouching while you're doing it (which makes them immune to detection)."
      },
      {
        "name": "Bloody Magazine",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/bloodymagazine.png",
        "tierClass": "decent",
        "comment": "Missed spears make Survivors scream and reveal their auras for a short period of 3 seconds. This effect is nice and can help you keep track of a Survivor behind cover after you barely missed them, especially if you extend it by running the perk Lethal Pursuer with it. If you're a bit creative, you could even purposefully miss a spear to check if someone is hiding in a certain spot or to mindgame a Survivor from behind a tall obstacle. However, this add-on does absolutely nothing if you hit your target or if you miss by a lot. Keep in mind that it also ONLY triggers with spears that you retrieve from Sacrificial Hooks specifically. It will not work on spears that you collect from the various reload scrap piles that spawn around the map, unfortunately."
      },
      {
        "name": "Knitting Needle",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/knittingneedle.png",
        "tierClass": "decent",
        "comment": "Extends the time that a Survivor needs to remove the spike lodged into their body by 20%, bringing it to 6 seconds total. This can sometimes be completely redundant, but that extra second has some positive implications. Survivors removing the spike have a slight penalty to their movement speed. This can also extend the duration of the fake terror radius created by the purple Missing Corkscrew add-on. Remember that if someone refuses or forgets to remove their spike, you will see its aura which can be quite helpful."
      },
      {
        "name": "Iridescent Boat Motor",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/iridescentboatmotor.png",
        "tierClass": "almost-no-effect",
        "comment": "Enables the ability to block windows briefly if you pass through them right before reappearing from Omnipresent Evil. If you do it quickly, this can be a somewhat effective way to block vaults such as the shack's window to reduce the options that Survivors have and force them to try their luck with pallets instead. Sounds powerful, but sometimes it's best to simply reappear as quickly as possible instead of wasting time setting up the effect of this add-on, since Survivors could use this time to create distance away from you. You can theoretically block multiple windows and make a small area very unsafe if Survivors are somehow trapped in it, but in practice you'll realize that this effect is very rarely necessary."
      },
      {
        "name": "Burnt Fuse",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/burntfuse.png",
        "tierClass": "almost-no-effect",
        "comment": "An endgame add-on that allows you to trap one or multiple Survivors by the exit gate. Can result in some extra kills if you use it well. You could pair it with the brown Knitting Needle if you want to delay the removal of the spike for even longer. It's a really fun effect but not one that will help you outside of some very specific endgame scenario."
      },
      {
        "name": "Orderly's Shoe",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/orderlysshoe.png",
        "tierClass": "almost-no-effect",
        "comment": "The haste that you get from using your power is great but it does not benefit that much from a tiny extra 5 seconds. Keep in mind that by default, you already have 25 seconds to use it. Either way it's not a terrible effect and a perfectly safe choice for beginners that might not be able to end a chase quickly enough."
      },
      {
        "name": "Mirror Shards",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/mirrorshards.png",
        "tierClass": "almost-no-effect",
        "comment": "Inflicts Survivors with a 30 second Broken status effect after they remove their spike, making them unable to heal normally and possibly keeping them injured for a bit longer than they'd like. This effect isn't really that powerful, especially if you're focusing on chasing Survivors one at a time. Delaying their healing can occasionally be useful, but it rarely feels worthy of an add-on slot."
      },
      {
        "name": "Bent Wheel",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/bentwheel.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the distance from which you can select a spot to reappear from Omnipresent Evil. This might save you a fraction of a second if you're trying to teleport to a specific point as quickly as possible. It might also allow you to actually teleport outside of basement towards a point that would otherwise be slightly out of reach. A safe choice considering its rarity, but the effect is not extremely noticeable for most players."
      },
      {
        "name": "Toxic Waste",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/toxicwaste.png",
        "tierClass": "almost-no-effect",
        "comment": "Makes Survivors Oblivious for 13 seconds if they're close to a hook when you exit Omnipresent Evil. This effect happens somewhat randomly and is very short (which means that Survivors will likely be on high alert during it). Not particularly useful on its own unless you play in an indoor map. However, you could consider running it if your build has perks that work better outside of your terror radius such as Hex: Face the Darkness."
      },
      {
        "name": "Party Noisemaker",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/partynoisemaker.png",
        "tierClass": "almost-no-effect",
        "comment": "Reveals the aura of very distant Survivors if you exit Omnipresent Evil by breaking a downed pallet or breakable wall. This is a great way to find the 4th Survivor at the end of the game and can also be used if you're desperately looking for anyone at a time when Survivors are all hiding. In some maps with many breakable walls, you could also consider using it at the start of the game to find all Survivors quickly. Other than that, this add-on very rarely gives any real information during normal gameplay. Since using your Omnipresent Evil to trigger this power puts your mobility into a cooldown, the information that it gives is simply not that easy to act upon. If you want a better information-gathering add-on, try the Sleeping Bag instead."
      },
      {
        "name": "Garden Claw",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/jason/gardenclaw.png",
        "tierClass": "almost-no-effect",
        "comment": "Much like other Killer Instinct duration-extending add-ons, this one is pretty useless. However, it might occasionally help you keep track of a Survivor if you detect multiple of them at once or if they were outside of your point of view when you initially detected them."
      }
    ]
  },
  "judgement": {
    "displayName": "Judgement",
    "addons": [
      {
        "name": "Blindfold of the Devoted",
        "tier": "S",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/blindfoldofthedevoted.png",
        "tierClass": "strongest",
        "comment": "When activated, shows you the auras of distant Survivors (specifically the ones with the fewest hook stages among those that are currently beyond 32 meters). This can reveal multiple Survivors if they're tied on hook stages (for example, they both have zero hook stages). On most other Killers this effect would be very mediocre, but the Judgment's insane ability to injure Survivors from afar makes this aura reading extremely powerful and a constant threat throughout the entire match. Survivors revealed will often be working on generators or doing other actions (like healing someone else) which leave them vulnerable and might often result in multiple hits at once. Keep in mind that this effect triggers when you exile a Survivor that has the fewest hook stages in the team (you can see their hook stages next to their portrait in the HUD). If multiple Survivors are tied, any of them will count towards activating this add-on. It's important to understand that when triggered, this add-on will ignore any Survivors within 32 meters of you. That means that it can actually reveal Survivors that have more hook stages than their team mates if they're unlucky enough to he be only ones far away f"
      },
      {
        "name": "Aurora's Telereceptor",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/aurorastelereceptor.png",
        "tierClass": "good",
        "comment": "Any Survivor that gains Heresy has their aura revealed to you for a brief duration (and vice-versa too). This typically happens when you hit them with a Divine Light pillar but can also trigger from other sources. The add-on also has a downside that allows heretic Survivors to see your aura for +2 seconds longer (which you can turn into a disadvantage with the perk Deerstalker). Overall, it's a nice and easy-to-trigger way to gain some information during normal gameplay but not the absolute best information add-on available, especially when compared to the blue Blindfold of the Devoted. Running it with Deerstalker is quite a powerful idea, since you can often see a Survivor for long enough to snipe them with a follow-up pillar (this is particularly useful when you're in Zealous mode which provides a shorter cooldown and more control over your pillar so it's harder to dodge). Try this combo if you're an advanced player that's good at micro-adjusting the path of the Divine Light pillar already. If you're really good at perfectly placing your pillar on top of them, the fact that Survivors can see your aura too will not be such a huge deal anyway."
      },
      {
        "name": "Magnetised Manacles",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/magnetisedmanacles.png",
        "tierClass": "good",
        "comment": "Extends the duration of Zealous mode, which carries several benefits that make your power deadlier (and that can enhance certain other add-ons). This add-on works when you exile a Survivor that has the fewest hook stages in the team (you can see their hook stages next to their portrait in the HUD). If multiple Survivors are tied, any of them will count towards activating this add-on. Each trigger will give you a permanent +10% duration to your Zealous mode, making it last an extra 30 seconds if you trigger it the maximum amount of 5 times. Even with some bad luck, you'll still likely get at least a couple stracks which is still great value. Experienced Judgment players will appreciate how valuable it is to constantly remain in Zealous mode. If you're constantly sending people to exile this add-on can feel slightly redundant, but at that point you'll likely already be winning the game anyway."
      },
      {
        "name": "Mark of the Adherent",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/markoftheadherent.png",
        "tierClass": "good",
        "comment": "Increases the radius of your Divine Light pillars by +10% when not in Zealous mode, which is the same bonus as you get when you're in Zealous mode normally. This makes your pillars consistently the same size in both modes and is an overall very safe choice for a player of any level."
      },
      {
        "name": "Prayer Kneeler",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/prayerkneeler.png",
        "tierClass": "good",
        "comment": "A great choice for people struggling to learn this Killer and that want an easier method of using its power. This add-on simplifies this Killer's power at the cost of removing certain depth from it. Instead of constantly moving away from you, your Divine Light will get stuck and stay in place if it hits an obstacle during the casting animation. This makes it significantly easier to control this power and cast it at a nearby Survivor."
      },
      {
        "name": "Crown of the Destroyer",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/crownofthedestroyer.png",
        "tierClass": "good",
        "comment": "NOTE: MORE TESTING ON MY PART IS NEEDED TO ACCURATELY PLACE THIS ADD-ON. THIS IS PROVISIONAL RANKING. Whenever you send a Survivor into exile, you become Undetectable and project a smaller version of your terror radius to all the shrine statues that are scattered across the map. It's a fun effect that can help you confuse Survivors and find your next chase a bit sooner."
      },
      {
        "name": "Electric Torch",
        "tier": "A",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/electrictorch.png",
        "tierClass": "good",
        "comment": "Increases the speed at which you place the Divine Light before casting it and also your own movement speed while doing so by a little bit. This effect is powerful in theory (and makes it far easier and faster to reach distant targets at a moment's notice) but it also indirectly makes your power slightly harder to control, since the Divine Light will move away from you noticeably quicker. Not recommended for beginners due to its risky nature but feel free to use it if you know what you're doing. Builds with tons of aura-revealing perks will benefit the most from using this add-on. You can also pair it with the Prayer Kneeler if you don't want to deal with the main downside."
      },
      {
        "name": "Confessor's War Horn",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/confessorswarhorn.png",
        "tierClass": "decent",
        "comment": "Applies a decent 10 seconds of Exhaustion to any Survivor that gains Heresy by any means, including being hit by your power, taunting you with repeated crouching or even the effects of other add-ons. It's not a terrible effect but with experience you will notice that the Judgment is not as bothered by exhaustion perks as some other Killers that lack range. You might want to use another add-on that helps you land your pillars more consistently instead."
      },
      {
        "name": "Improvised Detonators",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/improviseddetonators.png",
        "tierClass": "decent",
        "comment": "This add-on gains a token when you exile a Survivor that has the fewest hook stages in the team (you can see their hook stages next to their portrait in the HUD). If multiple Survivors are tied, any of them will count towards activating this add-on. As an example, sending a Survivor to exile at the start of the game will grant a token (since everyone is tied for zero hook stages at that point). This add-on will begin to trigger on your 4th token (and 5th, 6th, etc...) but only if all Survivors are still alive. Each activation will make the most progressed generator explode, losing 20% of progress and starting to regress afterwards (although this explosion sadly does not create a notification for you). This is a really nice effect, and if you notice it happening nearby it can provide indirect information since you'll know that there's no other gens that had higher progress than that one. The main issue comes from the fact that while your first few tokens are easy to get, the last one can be really difficult to obtain unless you're already in a very comfortable winning position. For that reason, this add-on can sometimes feel like a &#34;win more&#34; that only helps when you're alre"
      },
      {
        "name": "Holy Winged Icon",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/holywingedicon.png",
        "tierClass": "decent",
        "comment": "Enables an alternative way of controlling your Divine Light by making it return back to you when you press the active ability button. Unfortunately, the minimum distance required to damage someone with this alternative type of pillar is very demanding and requires you to line it up very carefully. This add-on also doesn't damage non-heretic Survivors and only gives them Heresy instead if it hits them (which could trigger things such as Exhaustion from the green Confessor's Warn Horn). Your general idea with this add-on is to play normally until you apply Heresy with a pillar on someone and then continue to play normally unless you see a great opportunity to utilize it (for example if you notice a Survivor locking themselves in the animation of dropping a pallet while you're holding your pillar behind them). Perhaps not the absolute best add-on, but it adds some interesting depth to your gameplay and it's overall quite fun without having any downside. Just make sure that you're not using it mindlessly and save it for the right situations."
      },
      {
        "name": "Superheated Glass",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/superheatedglass.png",
        "tierClass": "decent",
        "comment": "During Zealous mode, your pillars can now destroy pallets and breakable walls on their path. Doing this also makes nearby Survivors scream and gain Heresy. This is a nice effect that lets you clean up the map and enables some fun strategies in chase. However, it does come with the unfortunate downside of reducing the Zealous mode timer by about 12 seconds."
      },
      {
        "name": "Order of Inquisition",
        "tier": "B",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/orderofinquisition.png",
        "tierClass": "decent",
        "comment": "Your Divine Light radius becomes dynamic; it starts out -25% smaller but quickly grows over time to become +50% larger than usual. This effect is not noticeable at medium range but becomes really powerful towards the end of your pillar's path, making it much easier to hit Survivors at a distance. However, the smaller initial radius makes your power very unreliable at close distances and when casting a pillar near a Survivor, which is something that you'll be forced to do from time to time. This downside makes this add-on quite a dangerous choice, but feel free to use it if you know what you're doing and want to focus entirely on long-distance casts."
      },
      {
        "name": "Koenrad's Gauntlet",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/koenradsgauntlet.png",
        "tierClass": "almost-no-effect",
        "comment": "Makes your power easier to handle by giving you extra time to control your cast and lowering its speed. It's a small but helpful effect when you're still learning how to use this Killer's power. However, the lower speed makes it harder to cast a distant pillar quickly and essentially slows down your ability to hit distant targets at a moment's notice. For that reason, you'll probably want to stop using this add-on as you become more experienced. If you pair it with the brown Prayer Kneeler you can benefit from the longer control time and have a bit more time to line up the pillar, if you want."
      },
      {
        "name": "Eyes of Gerhardt",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/eyesofgerhardt.png",
        "tierClass": "almost-no-effect",
        "comment": "Reveals the aura of all Survivors with Heresy anytime one of them does one of several actions (completing a generator, opening an exit gate or coming out of a locker). Unfortunately, these specific actions are too rare and limited for this add-on to trigger frequently. Even when it does trigger, there's a good chance that you won't have enough Survivors with Heresy to truly benefit from the information that it provides. Since it's not very common to have multiple Survivors with Heresy lost around the map, you can sometimes go entire matches where this add-on gives you useless information or no information at all. If you want more consistent aura reading, try the blue Blindfold of the Devoted or the green Aurora's Telereceptor."
      },
      {
        "name": "Heretic's Mark",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/hereticsmark.png",
        "tierClass": "almost-no-effect",
        "comment": "Increases the distance at which you'll detect Survivors if your Divine Light nearly misses them. The description seems to suggest that this add-on also increases the Killer Instinct reveal time, but it actually doesn't. This is a safe add-on choice for a beginner if they have nothing else, but it is otherwise really not that useful."
      },
      {
        "name": "Searcher's Skull",
        "tier": "C",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/searchersskull.png",
        "tierClass": "almost-no-effect",
        "comment": "Survivors blinding you with a flashlight (or other methods) will gain Heresy (and get blinded themselves if they were already heretic). Gaining Heresy allows you to immediately send them to exile and has some other minor downsides but it's generally not a very impactful thing when triggered by this add-on, since you're already gonna be applying Heresy to them with your main power. Most of the times, this add-on will do absolutely nothing but you can try running it for fun if you notice several flashlights in the lobby."
      },
      {
        "name": "Obsidian Feather",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/obsidianfeather.png",
        "tierClass": "detrimental",
        "comment": "Massively increases your movement speed when holding your Divine Light, making you move much faster than normal and quickly gain distance. However, this add-on has several small downsides and a very noticeable big one; you cannot cancel or choose when to cast your pillar, instead it will cast automatically at the end of your holding animation. The speed from this add-on is genuinely very useful and it can somewhat work in your favor if you are very adept at controlling it. You can pair it with the brown Prayer Kneeler if you want to make your automatic pillar of light a bit easier to manage."
      },
      {
        "name": "Undying Flame",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/undyingflame.png",
        "tierClass": "detrimental",
        "comment": "During Zealous mode, this add-on increases the maximum travel time of your Divine Light when you cast it, making it go pretty much across the entire map. This might seem attractive but Survivors can also see the outline of the pillar from much further than usual. On top of that, this add-on makes your pillar -20% narrower which is an absolutely atrocious downside (even if it only happens when Zealous). There's almost no reason to ever run this add-on, especially when you consider that you can you easily hit distant targets by placing the pillar far away from you first. Consider using add-ons to extend your Zealous mode or the blue Electric Torch if you want to focus on long range casts. Remember that outside of Zealous mode (when your range is naturally more limited) this add-on does nothing."
      },
      {
        "name": "Mirror of the Creators",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/mirrorofthecreators.png",
        "tierClass": "detrimental",
        "comment": "Changes the behaviour of your cast pillars, making them bounce off surfaces (with a small delay) instead of going through walls. This is a really chaotic and fun effect, since the bouncing of the pillars feels very random and it can hit Survivors in unexpected ways. However, this is generally a massive downside to the regular pillars and their ability to ignore obstacles. When using this add-on, you'll need to be careful and not cast the Divine Light right in front of an obstacle. If you want something to help you spawn it further easily, try pairing with the blue Electric Torch."
      },
      {
        "name": "Chains of the Heretic",
        "tier": "D",
        "img": "https://otz-addon-tierlist.pages.dev/public/addons/judgement/chainsoftheheretic.png",
        "tierClass": "detrimental",
        "comment": "This add-on transforms your power completely when entering Zealous mode, turning your Divine Light into a reverse slingshot during its entire duration. This new type of Divine Light can be occasionally useful in chase but being completely forced into it removes a lot of this Killer's potential to damage Survivors from afar. Since the pillar always comes at you no matter what, you also cannot curve it by moving your camera (which is normally possible to do when you're in Zealous mode). If you want a similar effect without this awful downside, consider using the blue Holy Winged Icon instead."
      }
    ]
  }
};

if (typeof window !== "undefined") window.OTZ_ADDONS = OTZ_ADDONS;
