// Regenerates the golden fixture set from an engine HTML file.
//
//   node generate-fixtures.js ../giza-constraint-engine.html > /dev/null
//
// Writes fixtures.json alongside itself. Run this only when a behaviour change is
// intended, and review the diff before committing: every changed value is a change
// to a published figure until proven otherwise.
const fs = require('fs');
const path = require('path');
const enginePath = process.argv[2];
if (!enginePath) { console.error("usage: node generate-fixtures.js <engine.html>"); process.exit(1); }
const html = fs.readFileSync(enginePath, 'utf8');
const script = (html.match(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/i) || [])[1];
if (!script) { console.error("No script block found."); process.exit(1); }
// The model core runs from the state declarations to the formatting helpers. Everything
// after that point touches the DOM and cannot be evaluated outside a browser.
const start = script.indexOf('var S={');
const end   = script.indexOf('// \u2500\u2500 Format \u2500\u2500');
if (start < 0 || end < 0) { console.error("Could not locate the model core section markers."); process.exit(1); }
const src = script.slice(start, end);
eval(src);

const PRESETS = {
  lehner: {qr:340,tq:40,aq:15,dc:340,dt:50,da:10,tc:300,tt:35,at:10,pr:280,wf:25000,wd:300,lQ:35,lT:25,lD:25,lP:15},
  stocks: {qr:240,tq:30,aq:10,dc:280,dt:40,da:3,tc:220,tt:25,at:8,pr:200,wf:25000,wd:300,lQ:35,lT:25,lD:25,lP:15},
  high:   {qr:500,tq:60,aq:20,dc:500,dt:70,da:20,tc:450,tt:50,at:15,pr:400,wf:40000,wd:300,lQ:35,lT:25,lD:25,lP:15},
  best:   {qr:800,tq:120,aq:50,dc:800,dt:130,da:40,tc:800,tt:100,at:40,pr:600,wf:100000,wd:350,lQ:35,lT:25,lD:25,lP:15}
};
const GROUPS = {
  all:      ["meidum","bent","red","khufu","khafre","menkaure"],
  sneferu:  ["meidum","bent","red"],
  giza:     ["khufu","khafre","menkaure"]
};

const S_ = v => (v === Infinity ? "Infinity" : v === -Infinity ? "-Infinity" : String(v));
// Math.sin is not required by ECMAScript to be correctly rounded, so raw doubles are
// not portable between JavaScript engines. Round to 10 significant figures before
// hashing: far coarser than a bit-level difference, far finer than any real change.
const R_ = v => {
  if (typeof v !== "number") return String(v);
  if (!isFinite(v)) return S_(v);
  if (v === 0) return "0";
  return String(Number(v.toPrecision(10)));
};
const COLS = ["cD","tD","aD","totD","ru","effD","cDef","tDef","aDef","totDef","accDef","ra","cU","tU","aU"];
function fnv(str){let h=0x811c9dc5;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return h.toString(16).padStart(8,"0")}

function scope(ids){
  return JSON.parse(JSON.stringify(initStructs)).map(s => { s.enabled = ids.indexOf(s.id) > -1; return s; });
}

function caseOut(st, c, cann, nl, seas){
  const r = run(st, c, cann, nl, seas);
  const rowDigest = fnv(r.res.map(d =>
    [d.y, d.cD, d.tD, d.aD, d.totD, d.ru, d.effD, d.cDef, d.tDef, d.aDef, d.totDef,
     d.accDef, d.ra, d.bc, d.bn.join("|"), d.cU, d.tU, d.aU].map(R_).join(",")
  ).join(";"));
  // Per-column totals, compared with tolerance. These are what decide pass or fail;
  // the digest only distinguishes a real change from floating-point noise.
  const colSums = {};
  COLS.forEach(k => { colSums[k] = S_(r.res.reduce((x, d) => x + (d[k] || 0), 0)); });
  const bcSeq = fnv(r.res.map(d => d.bc).join(","));
  const durs = st.filter(s => s.enabled).map(s => {
    const d = calcDuration(s, c, cann, seas);
    return {id: s.id, years: S_(d.years), buildYears: S_(d.buildYears), finYears: S_(d.finYears), binding: d.binding};
  });
  return {
    rows: r.res.length,
    rowDigest: rowDigest,
    colSums: colSums,
    bcSeq: bcSeq,
    sum: {
      totD: S_(r.sum.totD), totCap: S_(r.sum.totCap), totDef: S_(r.sum.totDef),
      totR: S_(r.sum.totR), py: S_(r.sum.py), dfy: S_(r.sum.dfy), avgU: S_(r.sum.avgU),
      bf: r.sum.bf
    },
    durations: durs
  };
}

const fixtures = {
  engineVersion: "4.1",
  generated: "characterisation of current behaviour, not a statement of intended behaviour",
  cases: []
};

function overridesOf(st){
  const base = {}; initStructs.forEach(s => base[s.id] = s);
  const out = [];
  st.forEach(s => {
    const b = base[s.id]; const o = {id: s.id};
    ["tm","cl","cs","gr","sy","ey","ob","fin"].forEach(k => { if (s[k] !== b[k]) o[k] = s[k]; });
    if (Object.keys(o).length > 1) out.push(o);
  });
  return out.length ? out : null;
}

function add(name, tier, intent, st, c, cann, nl, seas, note){
  fixtures.cases.push({
    name, tier, intent, note: note || null,
    input: {capacities: c, enabled: st.filter(s=>s.enabled).map(s=>s.id), overrides: overridesOf(st), cann, nl, seas},
    expect: caseOut(st, c, cann, nl, seas)
  });
}

// Tier 1: presets x scope, default toggles
for (const p of Object.keys(PRESETS))
  for (const g of Object.keys(GROUPS))
    add(`preset-${p}--scope-${g}`, 1, "intended", scope(GROUPS[g]), PRESETS[p], false, true, true);

// Tier 1: solo structures, Lehner
for (const id of GROUPS.all)
  add(`solo-${id}--lehner`, 1, "intended", scope([id]), PRESETS.lehner, false, true, true);

// Tier 1: toggle matrix, Lehner, full dynasty
for (const cann of [false, true])
  for (const nl of [false, true])
    for (const seas of [false, true])
      add(`toggles--cann${+cann}-nl${+nl}-seas${+seas}`, 1, "intended",
          scope(GROUPS.all), PRESETS.lehner, cann, nl, seas);

// Tier 3: forced ties. The tie-break order in calcDuration is a convention, not a
// derivation, and no preset reaches it because one stage is always strictly lowest.
const TIE = Object.assign({}, PRESETS.lehner, {qr:500, dc:500, tc:280, pr:280, tq:60, dt:35, tt:35, aq:20, da:10, at:10});
for (const g of ["all","sneferu","giza"])
  add(`tie--equal-stage-capacities--${g}`, 3, "current", scope(GROUPS[g]), TIE, false, true, false,
      "Plateau transport ties placement, casing dressing ties Tura transport, granite dressing ties Aswan transport. Pins which stage receives the binding label when capacities are exactly equal.");

// Tier 3: labour allocation is warned about in the UI but not enforced in the model.
const OVER = Object.assign({}, PRESETS.lehner, {lQ:45, lT:35, lD:30, lP:25});
add("labour--allocation-over-100", 3, "intended", scope(GROUPS.all), OVER, false, true, true,
    "Allocations sum to 135 per cent. The model scales on them regardless. Deliberate: the UI warns rather than clamps.");

// Tier 3: distinct labour allocations across both capacity branches. With the default
// 35/25/25/15 split several allocation scalars are numerically equal, so a swap between
// them is invisible. These cases separate every share.
const OVER2 = Object.assign({}, PRESETS.lehner, {lQ:45, lT:35, lD:30, lP:25});
const SPLIT = Object.assign({}, PRESETS.lehner, {lQ:30, lT:20, lD:35, lP:15});
for (const seas of [true, false])
  add(`labour--distinct-shares--seas${+seas}`, 3, "intended", scope(GROUPS.all), SPLIT, false, true, seas,
      "Quarry, transport, dressing, and placement shares are all different, so each scalar is independently pinned in both the seasonal and non-seasonal branches.");
add("labour--allocation-over-100--nonseasonal", 3, "intended", scope(GROUPS.all), OVER2, false, true, false,
    "As the seasonal over-allocation case, against the non-seasonal capacity branch.");

// Tier 3: conventions pinned deliberately
add("edge--empty-scope", 3, "intended", scope([]), PRESETS.lehner, false, true, true,
    "No enabled structures returns a zeroed summary and no rows.");

const sameYear = scope(["khufu"]); sameYear.find(s=>s.id==="khufu").ey = -2580;
add("edge--same-year-dates", 3, "intended", sameYear, PRESETS.lehner, false, true, true,
    "sy === ey. Normalisation allows N=1 but the annual loop exits on dur<=0, so demand is zero. The chronology guard in setStruct enforces a minimum one-year span, so this state is no longer reachable from the interface. Retained as a defensive record for programmatic callers.");

const reversed = scope(["khufu"]); const k = reversed.find(s=>s.id==="khufu"); k.sy = -2560; k.ey = -2580;
add("edge--reversed-dates", 3, "intended", reversed, PRESETS.lehner, false, true, true,
    "ey < sy reaches the ty<=0 guard and returns an empty programme. The chronology guard in setStruct now prevents the sliders producing this, so it is unreachable from the interface. Retained as a defensive record for programmatic callers.");

fs.writeFileSync(path.join(__dirname, 'fixtures.json'), JSON.stringify(fixtures, null, 1));
console.log("cases:", fixtures.cases.length);

// The harness embeds its own copy of the fixtures, because a browser opened from
// file:// cannot fetch a sibling JSON file. Patch it here so the two cannot drift.
(function(){
  const hp = path.join(__dirname, 'engine-regression.html');
  if (!fs.existsSync(hp)) { console.log("engine-regression.html not found, skipped."); return; }
  let h = fs.readFileSync(hp, 'utf8');
  const open = 'var FIXTURES = ', close = ';\n\nvar TOL';
  const a = h.indexOf(open), b = h.indexOf(close);
  if (a < 0 || b < 0 || b < a) { console.log("Could not locate the embed markers, harness NOT updated."); return; }
  const embedded = Object.assign({}, fixtures, {
    lehnerPreset: JSON.parse(h.slice(a + open.length, b)).lehnerPreset
  });
  h = h.slice(0, a + open.length) + JSON.stringify(embedded) + h.slice(b);
  fs.writeFileSync(hp, h);
  console.log("engine-regression.html updated in place.");
})();

// ── Reporting checks used to sanity-read the set ──
const lehAll = fixtures.cases.find(c => c.name === "preset-lehner--scope-all");
console.log("Lehner/full dynasty rows:", lehAll.expect.rows, "py:", lehAll.expect.sum.py);
console.log("  totD:", lehAll.expect.sum.totD);
console.log("  totDef:", lehAll.expect.sum.totDef);
console.log("  avgU:", lehAll.expect.sum.avgU);
console.log("  bf:", JSON.stringify(lehAll.expect.sum.bf));
console.log("  durations:", lehAll.expect.durations.map(d=>`${d.id}=${d.years}(${d.binding})`).join(" "));

// Defaults == Lehner preset?
const defaultsMatchLehner = JSON.stringify(initC) === JSON.stringify(PRESETS.lehner);
console.log("\nstartup C === lehner preset:", defaultsMatchLehner);

// Mass conservation, Lehner full dynasty, nl on
(function(){
  const st = scope(GROUPS.all);
  const r = run(st, PRESETS.lehner, false, true, true);
  let c=0,t=0,a=0; r.res.forEach(d=>{c+=d.cD;t+=d.tD;a+=d.aD});
  const wantC = st.reduce((x,s)=>x+s.cl,0), wantT = st.reduce((x,s)=>x+s.cs,0), wantA = st.reduce((x,s)=>x+s.gr,0);
  console.log("mass conservation core:", c, "want", wantC, "delta", c-wantC);
  console.log("mass conservation tura:", t, "want", wantT, "delta", t-wantT);
  console.log("mass conservation aswan:", a, "want", wantA, "delta", a-wantA);
})();

// Round-trip: reverseSolve -> forward agreement
(function(){
  console.log("\nround-trip reverseSolve vs calcDuration:");
  const st = scope(GROUPS.all);
  st.filter(s=>s.enabled).forEach(s=>{
    const tgt = 20;
    const rs = reverseSolve(s, tgt, PRESETS.lehner, false, true);
    const cap = sCap(PRESETS.lehner, true);
    console.log(`  ${s.id}: buildTgt=${rs.buildTgt} reqCore=${rs.core.req} curCore=${rs.core.cur} ok=${rs.core.ok}`);
  });
})();
