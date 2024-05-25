const menuB = document.getElementById("menuB");
const menuG = document.getElementById("menuG");
menuB.addEventListener('click', e => {
   if (menuG.style.display == "block") {
      menuG.style.display = "none";
   } else {
      menuG.style.display = "block";
   }
});

document.getElementById("m1").addEventListener("click", e => {
   window.location.href = "gotowanie.html";
})
document.getElementById("m2").addEventListener("click", e => {
   window.location.href = "sniadania_kolacje.html";
})
document.getElementById("m3").addEventListener("click", e => {
   window.location.href = "dania_glowne.html";
})
document.getElementById("m4").addEventListener("click", e => {
   window.location.href = "zupy.html";
})
document.getElementById("m5").addEventListener("click", e => {
   window.location.href = "wypieki.html";
})
document.getElementById("m6").addEventListener("click", e => {
   window.location.href = "salatki.html";
})
