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


let currentHighlightedIndex = -1; // Indeks aktualnie podświetlonego elementu

function search() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const searchContainers = document.querySelectorAll('.catCard');

    document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
    if (query === "") { return }

    let found = false;

    searchContainers.forEach(container => {
        const headers = container.querySelectorAll('h3');
        const lists = container.querySelectorAll('ul li');

        headers.forEach(header => {
            if (header.textContent.toLowerCase().includes(query)) {
                header.classList.add('highlight');
                if (!found) {
                    header.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    found = true;
                }
            }
        });

        lists.forEach(item => {
            if (item.textContent.toLowerCase().includes(query)) {
                item.classList.add('highlight');
                if (!found) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    found = true;
                }
            }
        });
    });

    if (!found) {
        alert("Nie znaleziono żadnego pasującego elementu.");
    } else {
        currentHighlightedIndex = 0; // Ustawienie indeksu na pierwszy znaleziony element
    }
}

// Obsługa klawisza Enter
document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const highlightedElements = document.querySelectorAll('.highlight');
        if (highlightedElements.length > 0) {
            currentHighlightedIndex = (currentHighlightedIndex + 1) % highlightedElements.length;
            highlightedElements[currentHighlightedIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert("Nie ma więcej pasujących elementów.");
        }
    }
});

// Obsługa kliknięcia przycisku wyszukiwania
document.getElementById('buttonsearch').addEventListener('click', function(event) {
   const highlightedElements = document.querySelectorAll('.highlight');
   if (highlightedElements.length > 0) {
       currentHighlightedIndex = (currentHighlightedIndex + 1) % highlightedElements.length;
       highlightedElements[currentHighlightedIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
   } else {
       alert("Nie ma więcej pasujących elementów.");
   }

});