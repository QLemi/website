
const tiles = [
  {
    title: "Killer Loadout Checker",
    image: "./main_image/loadout-checker.png",   
    link:  "./loadout/loadout.html"                            
  },
  {
    title: "Tierlista Widzów - De_Destru",
    image: "./main_image/tierlista-widzow.png",
    link:  "./tierlista_widzów/tierlista_widzów.html"
  },
  {
    title: "Streaki",
    image: "./main_image/streaki.png",
    link:  "./streaki/streaki.html"
  },
  {
    title: "Statystyki",
    image: "./main_image/statystyki.png",
    link:  "./stats/stats.html"
  },
  {
    title: "Kalendarz",
    image: "./main_image/kalendarz.png",
    link:  "./kalendarz/kalendarz.html"
  },
  {
    title: "DBD Builds & Info",
    image: "./main_image/dbd-killers-info.png",
    link:  "./DBDKillersInfo/DBDKillersInfo.html"
  }
];

// generacja
const container = document.getElementById("tiles");

tiles.forEach(tile => {
  const a = document.createElement("a");
  a.href = tile.link;
  a.className = "tile";
  a.style.backgroundImage = `url(${tile.image})`;

  const title = document.createElement("div");
  title.className = "tile-title";
  title.textContent = tile.title;

  a.appendChild(title);
  container.appendChild(a);
});
