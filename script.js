// =====================================================
// TUTAJ DODAJESZ / USUWASZ KAFELKI
// Każdy obiekt = jeden kafelek
// =====================================================
const tiles = [
  {
    title: "Killer Loadout Checker",
    image: "./main_image/loadout.jpg",   // link do zdjęcia tła
    link:  "./loadout/loadout.html"                              // ścieżka do podstrony
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
  }
  // dodaj kolejne obiekty tutaj...
];

// =====================================================
// Kod generujący kafelki (nie musisz go ruszać)
// =====================================================
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