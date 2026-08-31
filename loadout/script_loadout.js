/*
  DBD Inventory Reader
  --------------------
  Prototyp działający całkowicie po stronie przeglądarki.
*/

const BASE_W = 1920;
const BASE_H = 1080;

const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const killerNameEl = document.getElementById("killerName");
const pageNameEl = document.getElementById("pageName");
const inventoryEl = document.getElementById("inventory");
const copyButton = document.getElementById("copyButton");
const debugCanvas = document.getElementById("debugCanvas");

let selectedFile = null;
let isScanning = false; // Zabezpieczenie przed wielokrotnym odpalaniem


// ============================================================
// WYBÓR / PRZECIĄGANIE SCREENSHOTU
// ============================================================

dropZone.addEventListener("click", () => {
    if (isScanning) return;
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    if (fileInput.files.length && !isScanning) {
        selectedFile = fileInput.files[0];
        scan(selectedFile);
    }
});

["dragenter", "dragover"].forEach(eventName => {
    dropZone.addEventListener(eventName, e => {
        e.preventDefault();
        dropZone.classList.add("dragover");
    });
});

["dragleave", "drop"].forEach(eventName => {
    dropZone.addEventListener(eventName, e => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
    });
});

dropZone.addEventListener("drop", e => {
    if (e.dataTransfer.files.length && !isScanning) {
        selectedFile = e.dataTransfer.files[0];
        scan(selectedFile);
    }
});


// ============================================================
// KOPIOWANIE WYNIKÓW
// ============================================================

copyButton.addEventListener("click", async () => {
    const values = [...document.querySelectorAll(".slot input")]
        .map(input => input.value);

    const text =
        `Killer: ${killerNameEl.textContent}\n` +
        `${pageNameEl.textContent}\n` +
        `Addony: ${values.join(", ")}`;

    await navigator.clipboard.writeText(text);
    statusEl.textContent = "Wyniki skopiowane.";
});


// ============================================================
// WCZYTANIE OBRAZU
// ============================================================

function loadImage(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}


// ============================================================
// WYCINANIE FRAGMENTU SCREENSHOTU
// ============================================================

function crop(image, x, y, w, h) {
    const sx = image.naturalWidth / BASE_W;
    const sy = image.naturalHeight / BASE_H;

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(w * sx));
    canvas.height = Math.max(1, Math.round(h * sy));

    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, x * sx, y * sy, w * sx, h * sy, 0, 0, canvas.width, canvas.height);
    return canvas;
}


// ============================================================
// POWIĘKSZENIE FRAGMENTU
// ============================================================

function resizeCanvas(source, scale = 5) {
    const canvas = document.createElement("canvas");
    canvas.width = source.width * scale;
    canvas.height = source.height * scale;

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    return canvas;
}


// ============================================================
// KONWERSJA DO SKALI SZAROŚCI
// ============================================================

function preprocess(source) {
    const canvas = document.createElement("canvas");
    canvas.width = source.width;
    canvas.height = source.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(source, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
}


// ============================================================
// WYZNACZANIE KOLORU TŁA ADDONU I INTEGRALNOŚĆ
// ============================================================

const expectedPage1 = [
    'czerwony', 'czerwony', 'fioletowy', 'fioletowy', 'fioletowy', 
    'fioletowy', 'niebieski', 'niebieski', 'niebieski', 'niebieski', 
    'niebieski', 'zielony', 'zielony', 'zielony', 'zielony'          
];

const expectedPage2 = [
    'zielony', 'brązowy', 'brązowy', 'brązowy', 'brązowy' 
];

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; 
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h * 360, s * 100, l * 100];
}

function classifyColor(r, g, b) {
    const [h, s, l] = rgbToHsl(r, g, b);
    if (h < 20 || h >= 335) return 'czerwony';
    if (h >= 20 && h < 50) return 'brązowy';
    if (h >= 50 && h < 160) return 'zielony';
    if (h >= 160 && h < 250) return 'niebieski';
    if (h >= 250 && h < 335) return 'fioletowy';
    return 'nieznany';
}

function checkAddonsIntegrity(image, page, positions) {
    const expected = page === 1 ? expectedPage1 : expectedPage2;

    for (let i = 0; i < positions.length; i++) {
        if (i >= expected.length) break; 

        const [x, y] = positions[i];
        const patch = crop(image, x + 5, y + 5, 10, 10);
        const ctx = patch.getContext('2d');
        const data = ctx.getImageData(0, 0, patch.width, patch.height).data;

        let r = 0, g = 0, b = 0;
        for (let j = 0; j < data.length; j += 4) {
            r += data[j];
            g += data[j + 1];
            b += data[j + 2];
        }
        const count = data.length / 4;
        r /= count; g /= count; b /= count;

        const colorName = classifyColor(r, g, b);
        
        if (colorName !== expected[i]) {
            return { 
                isValid: false, 
                slot: i + 1, 
                expected: expected[i], 
                found: colorName 
            };
        }
    }
    return { isValid: true };
}


// ============================================================
// CZYSZCZENIE TEKSTU OCR ORAZ LISTA KILLERÓW
// ============================================================

function cleanText(text) {
    return (text || "").replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}

const KILLERS = [
    "THE TRAPPER", "THE WRAITH", "THE HILLBILLY", "THE NURSE", "THE SHAPE",
    "THE HAG", "THE DOCTOR", "THE HUNTRESS", "THE CANNIBAL", "THE NIGHTMARE",
    "THE PIG", "THE CLOWN", "THE SPIRIT", "THE LEGION", "THE PLAGUE",
    "THE GHOST FACE", "THE DEMOGORGON", "THE ONI", "THE DEATHSLINGER",
    "THE EXECUTIONER", "THE BLIGHT", "THE TWINS", "THE TRICKSTER", "THE NEMESIS",
    "THE CENOBITE", "THE ARTIST", "THE ONRYO", "THE DREDGE", "THE MASTER MIND",
    "THE KNIGHT", "THE SKULL MERCHANT", "THE SINGULARITY", "THE XENOMORPH",
    "THE GOOD GUY", "THE UNKNOWN", "THE LICH", "THE DARK LORD", "THE SLASHER"
];

function levenshtein(a, b) {
    const row = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
        let previous = row[0];
        row[0] = i;
        for (let j = 1; j <= b.length; j++) {
            const old = row[j];
            row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
            previous = old;
        }
    }
    return row[b.length];
}

function normalizeKiller(raw) {
    const cleaned = raw.toUpperCase().replace(/[^A-Z ]/g, "").replace(/\s+/g, " ").trim();
    if (!cleaned) return "Nie rozpoznano";

    let best = cleaned;
    let bestDistance = Infinity;

    for (const killer of KILLERS) {
        const distance = levenshtein(cleaned, killer);
        if (distance < bestDistance) {
            bestDistance = distance;
            best = killer;
        }
    }
    return bestDistance <= 6 ? best : cleaned;
}

async function recognizeText(worker, canvas, whitelist = null) {
    const options = { tessedit_pageseg_mode: "7" };
    if (whitelist) options.tessedit_char_whitelist = whitelist;
    await worker.setParameters(options);
    const result = await worker.recognize(canvas);
    return cleanText(result.data.text);
}

function extractNumber(text) {
    let value = (text || "").toUpperCase()
        .replace(/O/g, "0").replace(/I/g, "1").replace(/L/g, "1")
        .replace(/Z/g, "2").replace(/S/g, "5").replace(/B/g, "8");
    const numbers = value.match(/\d+/g);
    if (!numbers) return "";
    return numbers.join("").slice(0, 4);
}

async function readCount(worker, image, x, y) {
    const candidates = [];
    const positions = [[x, y], [x - 4, y], [x + 4, y], [x, y - 3], [x, y + 3]];

    for (const [px, py] of positions) {
        const small = crop(image, px, py, 40, 20);
        const big = resizeCanvas(small, 6);
        const prepared = preprocess(big);
        const text = await recognizeText(worker, prepared, "0123456789");
        const number = extractNumber(text);
        if (/^\d{1,4}$/.test(number)) candidates.push(number);
    }

    if (!candidates.length) return "";
    const counts = {};
    for (const value of candidates) {
        counts[value] = (counts[value] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function averageBrightness(canvas) {
    const ctx = canvas.getContext("2d");
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let total = 0;
    for (let i = 0; i < data.length; i += 4) {
        total += (data[i] + data[i + 1] + data[i + 2]) / 3;
    }
    return total / (data.length / 4);
}

function detectPage(image) {
    const one = crop(image, 555, 790, 28, 35);
    const two = crop(image, 580, 790, 28, 35);
    return averageBrightness(one) >= averageBrightness(two) ? 1 : 2;
}

function drawDebug(image, page) {
    const scale = 0.55;
    debugCanvas.width = image.naturalWidth * scale;
    debugCanvas.height = image.naturalHeight * scale;
    const ctx = debugCanvas.getContext("2d");
    ctx.drawImage(image, 0, 0, debugCanvas.width, debugCanvas.height);

    ctx.strokeStyle = "#ff4444";
    ctx.lineWidth = 3;

    function drawRect(x, y, w, h) {
        ctx.strokeRect(x * scale, y * scale, w * scale, h * scale);
    }

    drawRect(315, 20, 190, 52);
    const xs = [313, 422, 531, 640, 749];
    const rows = page === 1 ? [490, 586, 682] : [490];

    for (const y of rows) {
        for (const x of xs) {
            drawRect(x + 45, y + 60, 45, 25);
        }
    }
}


// ============================================================
// GŁÓWNA FUNKCJA SKANOWANIA
// ============================================================

async function scan(file) {
    if (isScanning) return;
    isScanning = true;

    if (!file.type.startsWith("image/")) {
        statusEl.textContent = "Wybierz plik graficzny.";
        isScanning = false;
        return;
    }

    resultEl.classList.remove("hidden");
    inventoryEl.innerHTML = "";
    statusEl.textContent = "Wczytywanie obrazu...";

    const image = await loadImage(file);
    statusEl.textContent = "Uruchamianie OCR...";

    const worker = await Tesseract.createWorker("eng", 1, {
        logger: message => {
            if (message.status) {
                const progress = message.progress ? ` ${Math.round(message.progress * 100)}%` : "";
                statusEl.textContent = `OCR: ${message.status}${progress}`;
            }
        }
    });

    try {
        const killerCrop = crop(image, 315, 20, 210, 60);
        const killerText = await recognizeText(worker, resizeCanvas(killerCrop, 4));
        killerNameEl.textContent = normalizeKiller(killerText);

        const page = detectPage(image);
        pageNameEl.textContent = `Strona ${page}`;

        drawDebug(image, page);

        const positions = [];
        const xs = [313, 422, 531, 640, 749];

        if (page === 1) {
            const ys = [490, 586, 682];
            for (const y of ys) {
                for (const x of xs) {
                    positions.push([x, y]);
                }
            }
        } else {
            for (const x of xs) {
                positions.push([x, 490]);
            }
        }

        statusEl.textContent = "Sprawdzanie kompletności addonów...";
        const validation = checkAddonsIntegrity(image, page, positions);
        
        if (!validation.isValid) {
            inventoryEl.innerHTML = `
                <div style="grid-column: 1 / -1; color: #ff5555; padding: 20px; text-align: center; font-size: 16px; border: 1px solid #ff5555; border-radius: 8px; background: rgba(255,85,85,0.1);">
                    <strong>Nie odnaleziono wszystkich addonów!</strong><br><br>
                    Brakuje jakiegoś addonu i układ kafelków uległ przesunięciu.<br>
                    W slocie <b>${validation.slot}</b> oczekiwano koloru <b>${validation.expected}</b>, a wykryto <b>${validation.found}</b>.
                </div>
            `;
            statusEl.textContent = "Przerwano analizę. Brakujące addony.";
            await worker.terminate();
            isScanning = false;
            return;
        }

        const results = [];
        for (let i = 0; i < positions.length; i++) {
            statusEl.textContent = `Odczytywanie addonu ${i + 1}/${positions.length}...`;
            const [x, y] = positions[i];
            const value = await readCount(worker, image, x + 45, y + 60);
            const colorGroup = (page === 1 ? expectedPage1 : expectedPage2)[i];
            results.push({ value, colorGroup, id: i + 1 });
        }

        const averages = {};
        results.forEach(r => {
            if (!averages[r.colorGroup]) averages[r.colorGroup] = { sum: 0, count: 0 };
            const num = parseInt(r.value);
            if (!isNaN(num)) {
                averages[r.colorGroup].sum += num;
                averages[r.colorGroup].count += 1;
            }
        });

        inventoryEl.innerHTML = ""; // Czyszczenie przed ostatecznym wstawieniem

        results.forEach(r => {
            const avg = averages[r.colorGroup].count > 1 ? averages[r.colorGroup].sum / averages[r.colorGroup].count : null;
            const num = parseInt(r.value);
            const isSuspicious = avg && (num < avg * 0.5 || num > avg * 1.5);

            const slot = document.createElement("div");
            slot.className = "slot";
            slot.innerHTML = `
                <div class="slot-number">Slot ${r.id} ${isSuspicious ? '⚠️' : ''}</div>
                <input value="${r.value}" inputmode="numeric" style="${isSuspicious ? 'border-color: #ffaa00;' : ''}">
            `;
            inventoryEl.appendChild(slot);
        });

        statusEl.textContent = "Gotowe. Oznaczone ⚠️ wyniki mogą wymagać weryfikacji.";

    } catch (error) {
        console.error(error);
        statusEl.textContent = "Wystąpił błąd podczas analizy: " + error.message;
    } finally {
        await worker.terminate();
        isScanning = false;
    }
}