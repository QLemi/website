
const tiles = [
  {
    title: "Killer Loadout Checker",
    image: "./main_image/loadout.jpg",   
    link:  "./loadout/loadout.html"                            
  },
  {
    title: "Tierlista Widzów - De_Destru",
    image: "./main_image/Tierlista_widzów.jpg",
    link:  "./tierlista_widzów/tierlista_widzów.html"
  },
  {
    title: "Streaki",
    image: "./main_image/streaki.png",
    link:  "./streaki/streaki.html"
  },
  {
    title: "Statystyki",
    image: "./main_image/streaki.png",
    link:  "./stats/stats.html"
  },
  {
    title: "Kalendarz",
    image: "./main_image/kalendarz.png",
    link:  "./kalendarz/kalendarz.html"
  },
  {
    title: "DBD Killers Info",
    image: "./main_image/unknown.png",
    link:  "./kalendarz/DBDKillersInfo.html"
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
