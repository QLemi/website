#!/usr/bin/env node
/**
 * Full refresh of data/otz-addons.js (pure data, no helper functions).
 * Usage: node tools/fetch-otz.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "data", "otz-addons.js");
const SRC = "https://otz-addon-tierlist.pages.dev/";

const TIER_MAP = {
  strongest: "S",
  good: "A",
  decent: "B",
  "almost-no-effect": "C",
  detrimental: "D",
};

function decode(s) {
  return String(s)
    .replace(/&#47;/g, "/")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');
}

function parseOtzHtml(html) {
  const result = {};
  const parts = html.split(/<div class="killerGroup">/).slice(1);
  for (const part of parts) {
    const km = part.match(
      /<img src="\.\/public\/killers\/([^"]+)"[^>]*alt="([^"]*)"/
    );
    if (!km) continue;
    const key = km[1].replace(/\.png$/i, "").toLowerCase();
    const alt = (km[2] || key).trim();
    const addons = [];
    const re =
      /<div class="addon-back\s+([^"]+)">\s*<div class="addon"\s+data-comment="([^"]*)"[\s\S]*?<img[^>]+src="(\.\/public\/addons\/[^"]+)"/g;
    let m;
    while ((m = re.exec(part)) !== null) {
      const tierClass = m[1].trim();
      let commentRaw = decode(m[2]);
      const nameM = commentRaw.match(/<b[^>]*>\s*([^<]+?)\s*<\/b>/i);
      let name = nameM
        ? nameM[1].trim()
        : m[3].split("/").pop().replace(/\.png$/i, "");
      let text = commentRaw
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/?(ul|li|p|i|span|a|b)[^>]*>/gi, (tag) =>
          tag.startsWith("</") || /li/i.test(tag) ? "\n" : ""
        )
        .replace(/<[^>]+>/g, "");
      text = text.replace(/\n{3,}/g, "\n\n").trim();
      text = text
        .replace(
          new RegExp(
            "^" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*:?\\s*",
            "i"
          ),
          ""
        )
        .trim();
      addons.push({
        name,
        tier: TIER_MAP[tierClass] || tierClass,
        img: SRC + m[3].replace(/^\.\//, ""),
        tierClass,
        comment: text.slice(0, 1200),
      });
    }
    if (addons.length) result[key] = { displayName: alt, addons };
  }
  return result;
}

const res = await fetch(SRC, { cache: "no-store" });
if (!res.ok) throw new Error("HTTP " + res.status);
const data = parseOtzHtml(await res.text());
const keys = Object.keys(data);
if (!keys.length) throw new Error("Parsed 0 killers");

const out =
  `// OTZ ADDONS — pure data only (logic lives in js/app.js)\n` +
  `// Key must equal killer.id on the site (or normalized name) for auto-match\n` +
  `// Generated: ${new Date().toISOString()}\n` +
  `// Source: ${SRC}\n` +
  `// Refresh all: node tools/fetch-otz.mjs\n` +
  `// Add one: Settings → Fetch → paste entry under the key = your killer.id\n\n` +
  `var OTZ_ADDONS = ${JSON.stringify(data, null, 2)};\n\n` +
  `if (typeof window !== "undefined") window.OTZ_ADDONS = OTZ_ADDONS;\n`;

fs.writeFileSync(OUT, out, "utf8");
console.log("Wrote", OUT);
console.log("Killers:", keys.length);
console.log("Keys:", keys.join(", "));
