# Fourth Dynasty Constraint Engine — User Guide

**Version 3.0**

---

## What This Tool Does

The Fourth Dynasty Constraint Engine models the entire Old Kingdom Fourth Dynasty pyramid-building programme as a **constrained throughput system**. It calculates whether the supply-side capacity of ancient Egypt — quarrying rates, transport logistics, workforce availability, block placement — could realistically meet the demand imposed by constructing six major pyramids within their historically attested timelines.

The tool covers **Sneferu's three pyramids** (Meidum, Bent, Red) and the **three Giza pyramids** (Khufu, Khafre, Menkaure), spanning approximately 2610–2510 BCE.

It also incorporates the **Cannibalisation Hypothesis** (after Huni Choi, presented via Dami Lee, 2026), which proposes that structures were deliberately overbuilt, then carved down, with surplus stone recycled sequentially into subsequent builds.

The tool runs entirely in your web browser. No installation, no server, no internet connection required.

---

## Opening the Tool

Double-click the `.html` file in any modern browser (Chrome, Firefox, Edge, Safari, Vivaldi). Everything runs locally with zero external dependencies. Fonts fall back gracefully if offline.

---

## Header Controls

Five toggle buttons, each with a hover tooltip (**ⓘ**):

- **CANNIBALISE** — Enables the Choi/Lee overbuilt-then-carved hypothesis. Surplus stone from each completed structure becomes available for the next in sequence.
- **NON-LINEAR** — Applies realistic demand curves: core limestone peaks early (large lower courses), Tura casing concentrates late (top-down application), granite peaks mid-build (chamber construction).
- **SEASONAL** — Three Egyptian seasons: Akhet (flood — +30% workforce, ×1.8 water transport), Peret (normal), Shemu (harvest — −30% workforce, ×0.6 water transport).
- **?** — Quick reference panel.
- **RESET** — Returns everything to defaults.

---

## Preset Buttons

Two rows of presets at the top of the sidebar. **Active presets are highlighted** — gold for capacity presets, teal for structure groups. Manually adjusting any slider clears the capacity preset highlight; toggling individual structures clears the group highlight.

### Capacity Presets

| Preset | Core Quarry | Tura | Aswan | Transport | Placement | Workforce | Days |
|--------|------------|------|-------|-----------|-----------|-----------|------|
| **Lehner** | 340 t/d | 40 | 15 | 300 | 280 | 25,000 | 300 |
| **Stocks** | 240 t/d | 30 | 10 | 220 | 200 | 25,000 | 300 |
| **High** | 500 t/d | 60 | 20 | 450 | 400 | 40,000 | 300 |
| **Best Case** | 800 t/d | 120 | 50 | 800 | 600 | 100,000 | 350 |

- **Lehner** — baseline from Lehner (1997). The orthodox starting point.
- **Stocks** — more conservative rates reflecting Stocks's experimental archaeology (2003). Produces longer durations.
- **High** — optimistic estimates for testing upper bounds.
- **Best Case** — every parameter at maximum plausible. If the programme still fails here, the orthodox model is infeasible by definition.

### Structure Groups

- **Sneferu Only** — enables Meidum, Bent, Red. Disables Giza.
- **Giza Only** — enables Khufu, Khafre, Menkaure. Disables Sneferu.
- **Full Dynasty** — enables all six structures.

---

## Sidebar Parameters

All sliders have hover tooltips explaining what each parameter controls.

### Quarrying Rates (tonnes per day)

Base daily rates at the reference workforce of 25,000. These scale with workforce changes.

- **Core Limestone** — Plateau quarries. Primary material by volume.
- **Tura Casing** — Fine white limestone from across the Nile.
- **Aswan Granite** — 500 miles upstream. Chambers, relieving stones.

### Transport Capacity (tonnes per day)

- **Plateau Delivery** — Quarry to construction site. Scales with workforce.
- **Tura → Site** — Nile crossing. Boat-limited, does NOT scale with workforce.
- **Aswan → Site** — 500-mile upstream transport. Boat-limited, does NOT scale with workforce.

### Placement & Workforce

- **Block Placement** — Daily positioning rate. Scales with workforce.
- **Peak Workforce** — Total workers. Rates for quarrying, plateau transport, and placement scale proportionally (baseline 25,000 = 1.0×). The scale factor displays below the slider. Tura and Aswan transport are boat-limited and unaffected by workforce changes.
- **Working Days/Year** — Only applies when seasonal model is off. When seasonal is on, each season calculates its own working days.

### Labour Allocation

Three percentage sliders controlling how the workforce is distributed:

- **Quarrying %** — Proportion allocated to quarrying operations. Default: 40%.
- **Transport %** — Proportion allocated to transport operations. Default: 35%.
- **Placement %** — Proportion allocated to block placement. Default: 25%.

The total is shown with a warning if it doesn't equal 100%. This allocation **prevents double-counting** — the same workers cannot simultaneously quarry, transport, and place blocks. The daily rates scale proportionally with each allocation, so reducing quarrying allocation reduces quarrying throughput even if the total workforce increases.

### Structure Parameters

Click to expand. Shows enabled structure count (e.g., "6/6 enabled"). Each structure has:

- **On/Off** — Enable or disable. Disabled structures are greyed out and excluded from all calculations.
- **Solo** — One-click isolation. Disables everything else.
- **Total Mass, Core, Tura, Granite** — Material breakdown in tonnes.
- **Overbuilt Mass** — (Cannibalisation mode only) Initial mass before carving down.
- **Start/End BCE** — Construction timeline.

**Duration Calculator** — blue box below each structure showing actual build time at current capacity, with overrun warning and binding constraint identification.

---

## Default Structure Data

| Structure | Total Mass | Core | Tura | Granite | Timeline | Overbuilt |
|-----------|-----------|------|------|---------|----------|-----------|
| Meidum (Sneferu) | 640K t | 610K | 25K | 5K | 2610–2595 BCE | 900K |
| Bent (Sneferu) | 3.5M t | 3.38M | 100K | 20K | 2600–2585 BCE | 4.5M |
| Red (Sneferu) | 4.0M t | 3.87M | 120K | 10K | 2590–2575 BCE | 5.2M |
| Khufu | 6.1M t | 5.96M | 115K | 8K | 2580–2560 BCE | 8.0M |
| Khafre | 4.88M t | 4.74M | 120K | 20K | 2558–2532 BCE | 6.5M |
| Menkaure | 700K t | 520K | 60K | 120K | 2530–2510 BCE | 1.0M |

Note: Sneferu's timelines overlap — Meidum, Bent, and Red were under concurrent construction, creating demand spikes that stress the supply chain.

---

## Summary Cards

Top of the main panel. Each has a hover tooltip.

- **Programme Demand** — Total stone across all enabled structures, with year span and structure count.
- **Annual Capacity** — Combined throughput of all subsystems.
- **Accumulated Deficit** — Cumulative shortfall (orange if above zero).
- **Actual Duration** — Longest structure's real build time at current capacity (blue card).
- **Recycled** — (Cannibalisation mode) Total recycled stone.
- **Deficit Δ** — Percentage change vs orthodox model. Negative = cannibalisation makes it worse.
- **Bottleneck** — Most frequently binding subsystem.
- **Core Util** — Average core utilisation. Above 100% = over-committed.

---

## Analysis Tabs

### 1. Deficit

Accumulated deficit curve. Rising = systemic constraint failure. With cannibalisation: solid line = cannibalised, dashed = orthodox. Gap between them = recycling impact (or lack of it).

### 2. Demand/Cap

Annual demand lines against capacity bars. Demand exceeding bars = deficit years.

### 3. Bottlenecks

**Subsystem Deficit** — Stacked bars by material (Core orange, Tura blue-grey, Aswan teal).

**Utilisation** — Line chart with 100% reference. **Clickable legend** — toggle subsystems on/off.

**Binding Frequency** — Which subsystem constrains most often.

### 4. Material Flow

Stacked area chart showing demand by material type over the programme duration.

### 5. Sensitivity

**Automatic stress-test matrix.** Each row tests increasing ONE subsystem's rate by +25%, +50%, and +100% while holding everything else constant. Columns show resulting duration and deficit.

Reading the matrix:
- **Green cells** = improvement vs baseline.
- **Orange cells** = worse than baseline.
- **"no change"** = that subsystem is not currently binding. Increasing its rate has no effect because the bottleneck is elsewhere.
- **◀ KEY LEVER** — the row with the largest improvement at +100% is automatically highlighted with a teal border and labelled. This is the subsystem most worth investigating.
- The **"All Rates"** row shows what happens when every rate increases simultaneously.

This tab answers: "Which subsystem, if improved, has the biggest impact on feasibility?" If most rows show "no change" but one row lights up green, that's your binding constraint.

### 6. Reverse Solver

Per-structure target duration slider. Shows the required daily rate for each subsystem to meet that target, colour-coded green (sufficient) or orange (need X× increase).

### 7. Scenarios

Side-by-side comparison of saved configurations.

---

## Recommended Workflows

### The Three-Scenario Table (Core Argument)

1. Click **Full Dynasty** and **Lehner**. Save as "Lehner Full Dynasty".
2. Click **Stocks**. Save as "Stocks Full Dynasty".
3. Click **Best Case**. Save as "Best Case Full Dynasty".
4. The Scenarios tab now contains your central table. If Lehner and Stocks show massive deficits but Best Case works, the argument is clear: the programme is feasible only at capacity levels no Egyptologist has proposed.

### Testing Cannibalisation

1. Run any preset with cannibalisation OFF. Note the deficit. Save.
2. Toggle cannibalisation ON. Note the Deficit Δ card — if negative, cannibalisation makes it worse.
3. Save. Compare in Scenarios tab.
4. Key insight: cannibalisation front-loads constraint pressure onto the first structure (which receives zero recycled stone) while adding overbuilt mass demand across the entire programme.

### Sneferu vs Giza Isolation

1. Click **Sneferu Only**. Observe the overlapping build timelines creating demand spikes.
2. Click **Giza Only**. Compare the deficit profile.
3. The Sneferu programme alone stresses the system before Giza even begins.

### Finding the Break-Even Workforce

1. Solo any structure (e.g., Khufu).
2. Adjust the workforce slider upward.
3. Watch the Duration Calculator until it shows "Achievable".
4. The workforce number at that point is the minimum required — compare it against orthodox estimates.

### Sensitivity-Driven Analysis

1. Open the Sensitivity tab.
2. Look for the row marked **◀ KEY LEVER** — this is the subsystem with the biggest impact.
3. Rows showing "no change" are not currently binding and can be deprioritised.
4. Note whether the key lever at +100% eliminates the deficit or merely reduces it. If +100% still shows a deficit, the constraint is structural, not just a rate problem.

---

## Understanding the Calculations

### Demand

Per active structure per year: material mass ÷ construction duration, modified by non-linear profile if enabled.

### Capacity

Annual capacity = **minimum** of quarrying, transport, and placement per subsystem (Theory of Constraints). Workforce scales quarrying, plateau transport, and placement proportionally via the labour allocation percentages. Tura and Aswan water transport are boat-limited and workforce-independent.

### Duration Calculator

Actual duration = **maximum** of each subsystem's independent time (material ÷ annual capacity). The slowest subsystem determines the real build time since all must complete.

### Labour Allocation

Workforce of W workers at allocation Q%/T%/P% means:
- Quarrying throughput scales by (W/25000) × (Q/40)
- Transport throughput scales by (W/25000) × (T/35)
- Placement throughput scales by (W/25000) × (P/25)

This ensures the total labour is distributed, not duplicated.

### Sensitivity Matrix

For each subsystem, the engine runs the full model at baseline, +25%, +50%, and +100% of that subsystem's daily rate, holding everything else constant. The "All Rates" row increases every rate simultaneously.

### Cannibalisation

When a structure completes, the difference between overbuilt and final mass becomes available as recycled core limestone for subsequent structures, capped at 60% of annual core demand per year.

---

## Colour Key

- **Core Limestone** — Orange (#cc5500)
- **Tura Casing** — Blue-grey (#5b98d4)
- **Aswan Granite** — Teal (#4a9)
- **Duration/Solver** — Blue (#5b98d4)
- **Deficit/Warning** — Orange (#cc5500)
- **Sufficient/Achievable** — Green (#4a9)
- **Active Preset** — Gold highlight
- **Active Group** — Teal highlight

---

## Parameter Sources

| Parameter | Default | Source |
|-----------|---------|--------|
| Core quarrying | 340 t/d | Arnold (1991), Stocks (2003) |
| Tura quarrying | 40 t/d | Arnold (1991), Lehner (1997) |
| Aswan quarrying | 15 t/d | Stocks (2003) |
| Plateau transport | 300 t/d | Lehner (1997) |
| Tura transport | 35 t/d | Arnold (1991) |
| Aswan transport | 10 t/d | Arnold (1991), Stocks (2003) |
| Placement rate | 280 t/d | Lehner (1997) |
| Peak workforce | 25,000 | Lehner (1997), Hawass (2003) |
| Khufu mass | 6.1M t | Lehner (1997) |
| Sneferu masses | Various | Verner (2001), Stadelmann (1997) |
| Overbuilt masses | Choi estimates | Choi/Lee (2026) |

---

## Key Findings Enabled by This Tool

The following results are directly producible by anyone using this tool:

1. **Internal inconsistency**: Lehner's own capacity estimates cannot deliver the Giza programme within the attested timelines. The accumulated deficit at Lehner defaults exceeds 9 million tonnes.

2. **Cannibalisation failure**: The Choi/Lee cannibalisation hypothesis increases the programme deficit by 3–43% (depending on capacity assumptions) because overbuilt masses add more demand than recycling recovers. The first structure in any cannibalisation chain bears the full cost with zero recycled stone.

3. **Workforce requirements**: Achieving zero deficit at Lehner's daily rates requires approximately 70,000–100,000 workers — 3–4× the orthodox estimate of 25,000.

4. **Best-case feasibility**: The programme is achievable only at capacity levels (800 t/d quarrying, 100,000 workers, 350 working days) that no Egyptologist has proposed or defended.

5. **Sneferu front-loading**: The overlapping construction of Meidum, Bent, and Red pyramids creates demand spikes that saturate the supply chain before Giza construction begins.

---

## Citation

> Fourth Dynasty Constraint Engine, v3.0. Full dynasty constrained throughput model with sensitivity analysis, labour allocation, and cannibalisation hypothesis testing. Developed in support of the Constraint-Based Evaluation Framework for disputed claims in archaeology.

For methodology: Papers 2–4, Zenodo (Copas, 2026).
