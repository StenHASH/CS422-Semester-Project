// Metadata search: each item's metadata lives in ITEMS below.
// To add an item page, add one object here. Nothing else needs to change.
const ITEMS = [
  { name: "Plastic Containers", page: "plastic-containers.html", material: "Plastic",
    desc: "Takeout boxes, tubs and clamshells",
    keywords: ["takeout container", "takeout box", "clamshell", "food container", "tub", "yogurt tub", "tupperware", "deli container", "leftovers"] },
  { name: "Plastic Bottles", page: "plastic-bottles.html", material: "Plastic",
    desc: "Water, soda and juice bottles",
    keywords: ["water bottle", "soda bottle", "juice bottle", "drink bottle", "shampoo bottle", "jug", "cap", "label"] },
  { name: "Plastic Cups", page: "plastic-cups.html", material: "Plastic",
    desc: "Cold drink cups and party cups",
    keywords: ["cup", "solo cup", "party cup", "iced coffee cup", "smoothie cup", "drink cup", "lid", "straw"] },
  { name: "Food Paper Container/Bag", page: "paper-food.html", material: "Paper",
    desc: "Paper bags and boxes that held food",
    keywords: ["pizza box", "paper bag", "takeout bag", "paper container", "grease", "greasy", "fast food bag", "food wrapper", "cardboard"] },
  { name: "Office Paper", page: "paper-office.html", material: "Paper",
    desc: "Printer paper, notebooks and envelopes",
    keywords: ["printer paper", "copy paper", "notebook", "envelope", "homework", "worksheet", "notes", "documents", "staples"] },
  { name: "Metal Cans", page: "metal-cans.html", material: "Metal",
    desc: "Drink cans and food cans",
    keywords: ["soda can", "aluminum can", "tin can", "soup can", "food can", "beer can", "energy drink", "aluminum", "steel"] },
  { name: "Batteries", page: "batteries.html", material: "Batteries",
    desc: "Everyday and rechargeable batteries",
    keywords: ["AA", "AAA", "rechargeable", "alkaline", "lithium", "lithium-ion", "power bank", "button cell", "charger", "remote", "electronics", "drop-off"] }
];
 
const MATERIALS = ["All", ...new Set(ITEMS.map(i => i.material))];
let material = "All";
 
const $ = id => document.getElementById(id);
// Lowercase, strip punctuation, and reduce plurals ("batteries" -> "battery", "cups" -> "cup") so "battery" finds "Batteries".
const stem = w => w.length > 3 ? w.replace(/ies$/, "y").replace(/s$/, "") : w;
const norm = s => s.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter(Boolean).map(stem).join(" ");
 
function score(item, tokens) {
  const name = norm(item.name);
  const kws = item.keywords.map(norm);
  const all = [name, norm(item.material), norm(item.desc), ...kws].join(" | ");
  let total = 0;
  for (const t of tokens) {
    if (!all.includes(t)) return 0;                      // every word must match somewhere
    if (name.includes(t)) total += 3;
    else if (kws.some(k => k === t || k.split(" ").some(w => w.startsWith(t)))) total += 2;
    else total += 1;
  }
  return total;
}
 
function render() {
  const q = norm($("ms-input").value);
  const tokens = q ? q.split(" ") : [];
  let list = ITEMS.filter(i => material === "All" || i.material === material);
  if (tokens.length) {
    list = list.map(i => ({ i, s: score(i, tokens) })).filter(x => x.s > 0)
               .sort((a, b) => b.s - a.s || a.i.name.localeCompare(b.i.name)).map(x => x.i);
  }
 
  const results = $("ms-results");
  results.replaceChildren();
  $("ms-count").textContent = list.length
    ? `${list.length} item${list.length === 1 ? "" : "s"}${q ? ` for "${$("ms-input").value.trim()}"` : ""}`
    : "";
 
  if (!list.length) {
    const li = document.createElement("li");
    li.className = "ms-empty";
    li.textContent = `No items match "${$("ms-input").value.trim()}"${material !== "All" ? ` in ${material}` : ""}. ` +
      "Try a simpler word like \"bottle\" or \"paper\", or browse the catalog at the top of the page.";
    results.append(li);
    $("ms-count").textContent = "No results";
    return;
  }
 
  for (const item of list) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "ms-card"; a.href = item.page;
    const top = document.createElement("div"); top.className = "ms-card-top";
    const n = document.createElement("span"); n.className = "ms-card-name"; n.textContent = item.name;
    const t = document.createElement("span"); t.className = "ms-card-tag"; t.textContent = item.material;
    top.append(n, t);
    const d = document.createElement("p"); d.className = "ms-card-desc"; d.textContent = item.desc;
    a.append(top, d); li.append(a); results.append(li);
  }
}
 
function buildChips() {
  const box = $("ms-chips");
  for (const m of MATERIALS) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "ms-chip"; b.textContent = m;
    b.setAttribute("aria-pressed", String(m === material));
    b.addEventListener("click", () => {
      material = m;
      box.querySelectorAll(".ms-chip").forEach(c => c.setAttribute("aria-pressed", String(c.textContent === m)));
      render();
    });
    box.append(b);
  }
}
 
function syncUrl() {
  const v = $("ms-input").value.trim();
  try { history.replaceState(null, "", v ? `?q=${encodeURIComponent(v)}` : location.pathname); } catch (e) {}
}
 
document.addEventListener("DOMContentLoaded", () => {
  buildChips();
  const start = new URLSearchParams(location.search).get("q");
  if (start) $("ms-input").value = start;
  $("ms-input").addEventListener("input", () => { render(); syncUrl(); });
  $("ms-form").addEventListener("submit", e => { e.preventDefault(); render(); syncUrl(); });
  render();
});