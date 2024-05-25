function killer() {
    document.getElementById("k1").style.display = "block";
    document.getElementById("s1").style.display = "none";
}
function surv() {
    document.getElementById("k1").style.display = "none";
    document.getElementById("s1").style.display = "block";
}
document.getElementById("search").addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        szukaj();
    }
})
window.addEventListener('keypress', function (event) {
    if (event.key === "K") {
        killer();
    }
    if (event.key === "S") {
        surv();
    }
})
function szukaj() {
    window.find(document.getElementById("search").value, false, true, true);
}