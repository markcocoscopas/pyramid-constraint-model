# Fourth Dynasty Constraint Engine, User Guide

**Version 4.1**

---

## What This Tool Does

The Fourth Dynasty Constraint Engine models the entire Old Kingdom Fourth Dynasty pyramid-building programme as a **constrained throughput system**. It calculates whether the supply-side capacity of ancient Egypt, meaning quarrying rates, dressing rates, transport logistics, workforce availability, and block placement, could realistically meet the demand imposed by constructing six major pyramids within their historically attested timelines.

The tool covers **Sneferu's three pyramids** (Meidum, Bent, and Red) and the **three Giza pyramids** (Khufu, Khafre, and Menkaure), spanning approximately 2610 to 2510 BCE.

It also incorporates the **Cannibalisation Hypothesis** (after Huni Choi, presented via Dami Lee, 2026), which proposes that structures were deliberately overbuilt, then carved down, with surplus stone recycled sequentially into subsequent builds.

The tool runs entirely in your web browser. No installation, no server, and no internet connection required.

> **What a deficit means:** it shows where a set of capacity estimates is inconsistent with the attested timeline, that the assumed rates were too low, not that the monuments were impossible to build. The engine tests the *numbers*, not the pyramids.

---

## Opening the Tool

Double-click `index.html` in any modern browser (Chrome, Firefox, Edge, Safari, or Vivaldi). Everything runs locally with zero external dependencies. Fonts fall back gracefully if offline. Saved scenarios persist in the browser between sessions.

---

## Header Controls

Six buttons, each with a tooltip that opens on hover or tap (**ⓘ**):

- **CANNIBALISE** enables the Choi/Lee overbuilt-then-carved hypothesis. Surplus stone from each completed structure becomes available for the next in sequence.
- **NON-LINEAR** applies realistic demand curves: core limestone peaks early (large lower courses), Tura casing concentrates late (top-down application), and granite peaks mid-build (chamber construction). Profiles are normalised per structure and per stream, so total demand equals the entered masses exactly whether this is on or off.
- **SEASONAL** applies the three Egyptian seasons: Akhet (flood, workforce ×1.3, water transport ×1.8, placement ×0.9), Peret (growing, neutral), and Shemu (harvest, workforce ×0.7, water transport ×0.6, quarrying ×0.95).
- **PRESENT** switches to Presentation Mode. See the section below.
- **?** opens the quick reference panel.
- **RESET** returns everything to defaults.

---

## Preset Buttons

Two rows of presets at the top of the sidebar. **Active presets are highlighted**, gold for capacity presets and teal for structure groups. Manually adjusting any slider clears the capacity preset highlight; toggling individual structures clears the group highlight.

### Capacity Presets

| Preset | Core quarry | Core dress | Tura quarry | Tura dress | Aswan quarry | Granite dress | Plateau | Tura tpt | Aswan tpt | Placement | Workforce | Days |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Lehner** | 340 t/d | 340 | 40 | 50 | 15 | 10 | 300 | 35 | 10 | 280 | 25,000 | 300 |
| **Stocks** | 240 t/d | 280 | 30 | 40 | 10 | 3 | 220 | 25 | 8 | 200 | 25,000 | 300 |
| **High** | 500 t/d | 500 | 60 | 70 | 20 | 20 | 450 | 50 | 15 | 400 | 40,000 | 300 |
| **Best Case** | 800 t/d | 800 | 120 | 130 | 50 | 40 | 800 | 100 | 40 | 600 | 100,000 | 350 |

All four presets use the same labour split of 35/25/25/15.

- **Lehner** is the baseline from Lehner (1997), the orthodox starting point.
- **Stocks** applies more conservative rates reflecting Stocks's experimental archaeology (2003), and produces longer durations.
- **High** applies optimistic estimates for testing upper bounds.
- **Best Case** sets every parameter to maximum plausible. If the programme still fails here, the orthodox model is infeasible by definition.

### Structure Groups

- **Sneferu Only** enables Meidum, Bent, and Red, and disables Giza.
- **Giza Only** enables Khufu, Khafre, and Menkaure, and disables Sneferu.
- **Full Dynasty** enables all six structures.

---

## Sidebar Parameters

All sliders have tooltips explaining what each parameter controls.

### Quarrying Rates (tonnes per day)

Base daily rates at the reference workforce of 25,000.

- **Core Limestone** from the plateau quarries. The primary material by volume. Scales with workforce.
- **Tura Casing**, fine white limestone from across the Nile. Specialist-limited, does not scale with workforce.
- **Aswan Granite**, 500 miles upstream. Chambers and relieving stones. Specialist-limited, does not scale with workforce.

### Dressing Rates (tonnes per day)

Dressing is a separate stage between quarrying and transport, added in version 4. Each material stream has its own rate because the operations are not comparable.

- **Core Rough Dressing** brings plateau limestone to laying tolerance. Mass labour, so it scales with workforce.
- **Tura Joint-Fitting** produces the fine joints of the casing. Specialist work, does not scale with workforce.
- **Granite Dressing** is pounding and abrasion of Aswan granite. Specialist work, does not scale with workforce.

Dressing rates are provisional pending a per-block audit against Stocks (2003). The fine casing-smoothing correction follows Haase (2012, via Arnold) and is modelled as a terminal post-completion phase rather than an in-pipeline per-block rate, which is what the Finishing Duration control below represents.

### Transport Capacity (tonnes per day)

- **Plateau Delivery** from quarry to construction site. Scales with workforce.
- **Tura to Site**, the Nile crossing. Boat-limited, does not scale with workforce.
- **Aswan to Site**, 500-mile upstream transport. Boat-limited, does not scale with workforce.

### Placement and Workforce

- **Block Placement**, the daily positioning rate. Scales with workforce.
- **Peak Workforce**, total workers. Core quarrying, core dressing, plateau transport, and placement scale proportionally (baseline 25,000 = 1.0×). The scale factor displays below the slider. Tura and Aswan quarrying, dressing, and transport are all independent of workforce, being specialist-limited or boat-limited.
- **Working Days/Year** applies only when the seasonal model is off. When seasonal is on, each season calculates its own working days, giving 329 in total.

### Labour Allocation

Four percentage sliders controlling how the workforce is distributed:

- **Quarrying %**, default 35 per cent.
- **Transport %**, default 25 per cent.
- **Dressing %**, default 25 per cent.
- **Placement %**, default 15 per cent.

The total is shown with a warning if it does not equal 100 per cent. The model does not enforce it, so the warning is advisory and you can deliberately over- or under-allocate to see what happens.

This allocation **prevents double-counting**, since the same workers cannot simultaneously quarry, dress, transport, and place blocks. Daily rates scale proportionally with each allocation, so reducing the quarrying allocation reduces quarrying throughput even if the total workforce increases.

### Structure Parameters

Click to expand. Shows the enabled structure count, for example "6/6 enabled". Each structure has:

- **On/Off** to enable or disable. Disabled structures are greyed out and excluded from all calculations.
- **Solo**, one-click isolation, which disables everything else.
- **Total Mass, Core, Tura, Granite**, the material breakdown in tonnes.
- **Overbuilt Mass**, cannibalisation mode only, the initial mass before carving down.
- **Start/End BCE**, the construction timeline.
- **Finishing Duration**, the terminal smoothing phase in years, applied after the block-laying window closes.

**Duration Calculator**, the blue box below each structure, shows actual build time at current capacity, with an overrun warning and identification of the binding constraint.

---

## Default Structure Data

| Structure | Total mass | Core | Tura | Granite | Timeline | Overbuilt | Finishing |
|---|---|---|---|---|---|---|---|
| Meidum (Sneferu) | 640K t | 610K | 25K | 5K | 2610 to 2595 BCE | 900K | 0.5 yr |
| Bent (Sneferu) | 3.5M t | 3.38M | 100K | 20K | 2600 to 2585 BCE | 4.5M | 1 yr |
| Red (Sneferu) | 4.0M t | 3.87M | 120K | 10K | 2590 to 2575 BCE | 5.2M | 1 yr |
| Khufu | 6.1M t | 5.96M | 115K | 8K | 2580 to 2560 BCE | 8.0M | 2 yr |
| Khafre | 4.88M t | 4.74M | 120K | 20K | 2558 to 2532 BCE | 6.5M | 1.5 yr |
| Menkaure | 700K t | 520K | 60K | 120K | 2530 to 2510 BCE | 1.0M | 0.5 yr |

Total entered mass across all six structures is 19.80M tonnes. With mass-conserving profiles, Programme Demand should equal that figure exactly at full dynasty scope. If it does not, a structure parameter has been altered.

Sneferu's timelines overlap. Meidum, Bent, and Red were under concurrent construction, creating demand spikes that stress the supply chain.

---

## Summary Cards

Top of the main panel. Each has a tooltip.

- **Programme Demand**, total stone across all enabled structures, with year span and structure count.
- **Annual Capacity**, combined throughput of all subsystems.
- **Accumulated Deficit**, the cumulative shortfall, shown orange if above zero.
- **Longest Structure**, the longest single build at current capacity.
- **Programme Completion**, end-to-end length from earliest start to latest overrun-adjusted finish. This differs from Longest Structure by design, because concurrent builds and overruns interact.
- **Recycled**, cannibalisation mode only, total recycled stone.
- **Deficit Δ**, percentage change against the orthodox model. Negative means cannibalisation makes it worse.
- **Bottleneck**, the most frequently binding subsystem.
- **Core Util**, average core utilisation. Above 100 per cent means over-committed.

---

## Analysis Tabs

### 1. Deficit

Accumulated deficit curve. Rising means systemic constraint failure. With cannibalisation on, the solid line is cannibalised and the dashed line is orthodox. The gap between them is the recycling impact, or the lack of it.

### 2. Demand/Cap

Annual demand lines against capacity bars. Demand exceeding bars marks deficit years.

### 3. Bottlenecks

**Subsystem Deficit**, stacked bars by material (core orange, Tura blue-grey, Aswan teal).

**Utilisation**, a line chart with a 100 per cent reference. The legend is **clickable** to toggle subsystems on and off.

**Binding Frequency**, which subsystem constrains most often.

### 4. Material Flow

Stacked area chart showing demand by material type over the programme duration.

### 5. Sensitivity

**Automatic stress-test matrix.** Each row tests increasing one subsystem's rate by 25, 50, and 100 per cent while holding everything else constant. Columns show the resulting duration and deficit.

Eleven rows are tested: core quarry, core dressing, plateau transport, placement, Tura quarry, casing dressing, Tura transport, Aswan quarry, granite dressing, Aswan transport, and All Rates.

Reading the matrix:

- **Green cells** mean improvement against baseline.
- **Orange cells** mean worse than baseline.
- **"no change"** means that subsystem is not currently binding, so increasing its rate has no effect because the bottleneck is elsewhere.
- **◀ KEY LEVER** marks the row with the largest improvement at 100 per cent, highlighted with a teal border. This is the subsystem most worth investigating.
- The **All Rates** row shows what happens when every rate increases simultaneously.

This tab answers the question of which subsystem, if improved, has the biggest impact on feasibility. If most rows show "no change" but one row lights up green, that row is your binding constraint.

### 6. Reverse Solver

Per-structure target duration slider. Shows the annual throughput each subsystem would need to meet that target, compared against the same effective capacity the forward engine applies, and colour-coded green for sufficient or orange for a required increase.

### 7. Scenarios

Side-by-side comparison of saved configurations. Saved scenarios persist in browser storage across refreshes.

---

## Presentation Mode

Click **PRESENT** for a projector-friendly view. It shows oversized headline numbers and a plain-English status line of the form "Required throughput exceeds capacity by X Mt, with Y binding for Z years". Six key levers are exposed rather than the full sidebar, the binding subsystem is highlighted automatically, and a live *baseline, changed value, consequence* readout updates as you drag a lever. A one-click Orthodox Baseline reset returns to the reference configuration.

Note that Presentation Mode compares against the Lehner startup capacities as its baseline, whereas the standard cannibalisation comparison uses your current capacities with cannibalisation switched off. The two baselines answer different questions and are deliberately not the same.

---

## Recommended Workflows

### The Three-Scenario Table (Core Argument)

1. Click **Full Dynasty** and **Lehner**. Save as "Lehner Full Dynasty".
2. Click **Stocks**. Save as "Stocks Full Dynasty".
3. Click **Best Case**. Save as "Best Case Full Dynasty".
4. The Scenarios tab now contains your central table. Lehner and Stocks show large deficits while Best Case closes, so the argument is clear: the programme is feasible only at capacity levels no Egyptologist has proposed.

### Testing Cannibalisation

1. Run any preset with cannibalisation off. Note the deficit and save.
2. Toggle cannibalisation on and check the Deficit Δ card. A negative value means cannibalisation makes it worse.
3. Save and compare in the Scenarios tab.
4. The key insight is that cannibalisation front-loads constraint pressure onto the first structure, which receives zero recycled stone, while adding overbuilt mass demand across the entire programme.

### Sneferu versus Giza Isolation

1. Click **Sneferu Only** and observe the overlapping build timelines creating demand spikes.
2. Click **Giza Only** and compare the deficit profile.
3. The Sneferu programme alone stresses the system before Giza begins.

### Finding the Break-Even Workforce

1. Solo any structure, for example Khufu.
2. Adjust the workforce slider upward.
3. Watch the Duration Calculator until it reports "Achievable".
4. The workforce at that point is the minimum required for that structure alone. Compare it against orthodox estimates.

Note that this works for single structures but not for the full programme, where no workforce closes the gap. See finding 3 below.

### Sensitivity-Driven Analysis

1. Open the Sensitivity tab.
2. Find the row marked **◀ KEY LEVER**, which has the biggest impact.
3. Rows showing "no change" are not currently binding and can be deprioritised.
4. Note whether the key lever at 100 per cent eliminates the deficit or merely reduces it. If 100 per cent still shows a deficit, the constraint is structural rather than a rate problem.

---

## Understanding the Calculations

### Demand

Per active structure per year, material mass divided by construction duration, modified by the non-linear profile if enabled. Profiles are normalised per structure and per material stream, so the total always equals the entered mass regardless of profile shape.

### Capacity

Annual capacity is the **minimum** of quarrying, dressing, transport, and placement within each material stream, following Theory of Constraints. The three streams are accounted separately:

- Core limestone: quarrying, rough dressing, plateau transport, and placement.
- Tura casing: quarrying, joint-fitting, and Nile transport.
- Aswan granite: quarrying, dressing, and upstream transport.

Deficits are calculated per stream and clipped at zero before being summed, so surplus capacity in one stream cannot offset a shortfall in another.

### Workforce Scaling

Workforce scales core quarrying, core dressing, plateau transport, and placement. It does not scale Tura or Aswan quarrying, dressing, or transport, which are specialist-limited or boat-limited. This is why adding workers has diminishing and eventually zero returns.

### Labour Allocation

A workforce of W workers at allocation Q/T/D/P per cent means:

- Core quarrying scales by (W/25000) × (Q/35)
- Plateau transport scales by (W/25000) × (T/25)
- Core dressing scales by (W/25000) × (D/25)
- Placement scales by (W/25000) × (P/15)

The divisors are the baseline percentages, so the default 35/25/25/15 gives a scale factor of 1.0 on every stage. This ensures total labour is distributed rather than duplicated.

### Duration Calculator

Actual duration is the **maximum** of each subsystem's independent time, being material divided by annual capacity, since all subsystems must complete. Build years are rounded up, then the structure's finishing duration is added as a fractional terminal phase.

### Seasonal Model

When seasonal is on, each season computes its own working days as 90 per cent of its calendar length, giving 108, 108, and 113 days for a total of 329. Workforce, water transport, quarrying, and placement each carry their own per-season multipliers.

### Sensitivity Matrix

For each subsystem, the engine runs the full model at baseline and at 25, 50, and 100 per cent above that subsystem's daily rate, holding everything else constant. The All Rates row increases every rate simultaneously.

### Cannibalisation

When a structure completes, the difference between overbuilt and final mass becomes available as recycled core limestone for subsequent structures, capped at 60 per cent of annual core demand per year. The reserve is drawn on before the completing structure's surplus is added, so the first structure in any chain receives nothing.

---

## Verifying the Numbers

The repository includes a regression harness at `tests/engine-regression.html`. Open it in a browser and select `index.html`. It runs a recorded fixture set and reports any divergence, covering all four presets, every structure scope, the full toggle matrix, mass conservation, tie resolution, and agreement between the reverse solver and the forward engine.

Every figure quoted in this guide was produced by the version 4.1 engine and is reproducible from the defaults described above. See `tests/FIXTURES.md` for what is covered and what is pinned as current rather than intended behaviour.

---

## Colour Key

- Core limestone, orange (#cc5500)
- Tura casing, blue-grey (#5b98d4)
- Aswan granite, teal (#4a9)
- Duration and solver, blue (#5b98d4)
- Deficit and warning, orange (#cc5500)
- Sufficient and achievable, green (#4a9)
- Active preset, gold highlight
- Active group, teal highlight

---

## Parameter Sources

| Parameter | Default | Source |
|---|---|---|
| Core quarrying | 340 t/d | Arnold (1991), Stocks (2003) |
| Core rough dressing | 340 t/d | Stocks (2003), provisional |
| Tura quarrying | 40 t/d | Arnold (1991), Lehner (1997) |
| Tura joint-fitting | 50 t/d | Stocks (2003), provisional |
| Aswan quarrying | 15 t/d | Stocks (2003) |
| Granite dressing | 10 t/d | Stocks (2003), provisional |
| Plateau transport | 300 t/d | Lehner (1997) |
| Tura transport | 35 t/d | Arnold (1991) |
| Aswan transport | 10 t/d | Arnold (1991), Stocks (2003) |
| Placement rate | 280 t/d | Lehner (1997) |
| Peak workforce | 25,000 | Lehner (1997), Hawass (2003) |
| Working days per year | 300 | Lehner (1997) |
| Labour split | 35/25/25/15 per cent | Model assumption |
| Terminal finishing | 0.5 to 2 yr | Haase (2012, via Arnold) |
| Khufu mass | 6.1M t | Lehner (1997) |
| Sneferu masses | Various | Verner (2001), Stadelmann (1997) |
| Overbuilt masses | Choi estimates | Choi/Lee (2026) |

---

## Key Findings Enabled by This Tool

The following results are directly producible by anyone using this tool. All figures are at full dynasty scope, non-linear demand, seasonal model on, and cannibalisation off unless stated.

1. **Internal inconsistency.** Lehner's own capacity estimates cannot deliver the programme within the attested timelines. The accumulated deficit at Lehner defaults is 12.40M tonnes, with 74 of 101 years in deficit and average core utilisation of 136 per cent. Stocks gives 14.15M tonnes across 85 years, and High still gives 5.78M tonnes across 54 years.

2. **Cannibalisation failure.** The Choi/Lee cannibalisation hypothesis increases the programme deficit in every realistic scenario, by 10.5 per cent at Lehner rates, 9.5 per cent at Stocks rates, and 32.4 per cent at High capacity, because overbuilt masses add more demand than recycling recovers. The first structure in any cannibalisation chain bears the full cost with zero recycled stone.

3. **No workforce closes the programme.** At Lehner daily rates the deficit falls as workers are added but never reaches zero. It is 12.40M tonnes at 25,000 workers, 7.07M at 50,000, 3.98M at 70,000, and 1.76M at 100,000, then asymptotes at roughly 0.08M tonnes and stops improving entirely: 200,000 workers and one million workers give the same result. The floor is set by granite dressing and Tura quarrying, neither of which scales with workforce. Closing the programme requires higher per-channel rates, not more people.

4. **Best-case feasibility only.** The programme reaches an effectively zero deficit, around 4,800 tonnes across the whole programme, only under the Best Case preset at 800 t/d quarrying, 100,000 workers, and 350 working days, a configuration beyond any published estimate.

5. **Sneferu front-loading.** The overlapping construction of Meidum, Bent, and Red creates demand spikes that saturate the supply chain before Giza construction begins.

At Lehner defaults only two subsystems ever bind: placement in 65 years and granite dressing in 9. Core quarrying never binds, which is worth noting because it is the parameter most often argued over.

---

## Changes from Version 3

Version 4 added a dressing stage that version 3 did not model at all, and version 4.1 corrected the demand profiles. The combined effect changes every headline figure, so results from earlier versions are not comparable.

| Lehner defaults | v3.1 | v4.1 |
|---|---|---|
| Programme demand | 16.38M t | 19.80M t |
| Accumulated deficit | 9.17M t | 12.40M t |
| Years in deficit | 71 of 100 | 74 of 101 |
| Average core utilisation | 129.1 per cent | 136.4 per cent |
| Residual at 100,000 workers | 0.87M t | 1.76M t |
| Cannibalisation penalty | 3.2 per cent | 10.5 per cent |

The root cause is the first row. Entered mass is 19.80M tonnes, and version 3.1's demand profiles summed to only 82.7 per cent of it, so a sixth of the programme was silently discarded. Version 4.1 conserves mass exactly, and everything downstream moves as a result.

Two conclusions change rather than merely shifting in magnitude. The cannibalisation penalty more than triples, so it is no longer a marginal effect. And the version 3 guide stated that 70,000 to 100,000 workers would achieve zero deficit; under the corrected model no workforce does, which is finding 3 above.

Other changes: labour allocation moved from three shares at 40/35/25 to four at 35/25/25/15; each structure gained a terminal finishing duration; programme-year counting became inclusive; the reverse solver now uses the same effective capacity as the forward engine; Longest Structure and Programme Completion became separate metrics; the sensitivity matrix grew from eight rows to eleven; and Presentation Mode, scenario persistence, and RFC-4180 CSV export were added.

---

## Citation

> Fourth Dynasty Constraint Engine, v4.1. Full dynasty constrained throughput model with per-stream dressing, sensitivity analysis, labour allocation, and cannibalisation hypothesis testing. Developed in support of the Constraint-Based Evaluation Framework for disputed claims in archaeology.

Cite the version you used. The concept DOI 10.5281/zenodo.19332530 always resolves to the most recent release, and individual releases carry their own version DOIs. Results reported from a specific version should cite that version.

For methodology, see the accompanying papers on Zenodo (Copas 2026).
