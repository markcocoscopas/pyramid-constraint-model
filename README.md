# Fourth Dynasty Constraint Engine

**A browser-based interactive tool for modelling throughput constraints in the Fourth Dynasty Egyptian pyramid-building programme.**

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.19332531.svg)](https://doi.org/10.5281/zenodo.19332531)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

The Fourth Dynasty Constraint Engine models the entire Old Kingdom Fourth Dynasty pyramid programme (c. 2610–2510 BCE) as a constrained throughput system. It evaluates whether orthodox capacity estimates — quarrying rates, transport logistics, workforce availability, block placement — can deliver six major pyramids within their historically attested timelines.

The tool covers Sneferu's three pyramids (Meidum, Bent, Red) and the three Giza pyramids (Khufu, Khafre, Menkaure), with adjustable parameters drawn from Arnold (1991), Lehner (1997), Stocks (2003), and Verner (2001).

It also incorporates the Cannibalisation Hypothesis (Choi/Lee, 2026), which proposes that structures were deliberately overbuilt then carved down, with surplus stone recycled sequentially into subsequent builds.

## Key Features

- **Six structures** spanning the full Fourth Dynasty with adjustable mass, material, and timeline parameters
- **Four capacity presets**: Lehner, Stocks, High Estimate, Best Case (maximum plausible)
- **Non-linear demand profiles**: core limestone peaks early (large lower courses), Tura casing concentrates late, granite peaks mid-build
- **Three-season Egyptian calendar**: Akhet (flood), Peret (growing), Shemu (harvest) with workforce and transport multipliers
- **Labour allocation panel**: distributes workforce across quarrying, transport, and placement to prevent double-counting
- **Duration calculator**: shows actual build time at current capacity vs set timeline, per structure
- **Reverse solver**: given a target duration, calculates required daily rates per subsystem
- **Sensitivity matrix**: auto-runs +25%, +50%, +100% stress tests across all subsystems, identifies the key lever
- **Cannibalisation modelling**: overbuilt masses with sequential stone recycling, capped at 60% of annual core demand
- **Scenario comparison**: save and compare multiple configurations
- **CSV export**: year-by-year data for use in papers or further analysis

## Quick Start

1. Download `index.html`
2. Open in any modern browser (Chrome, Firefox, Edge, Safari, Vivaldi)
3. No installation, no server, no internet connection required

The tool runs entirely client-side as a single self-contained HTML file with zero external dependencies.

## Usage

See the full [User Guide](docs/USER_GUIDE.md) for detailed instructions, parameter explanations, recommended workflows, and calculation methodology.

### Typical Workflow

1. Select a capacity preset (Lehner, Stocks, High, Best Case)
2. Select a structure group (Sneferu Only, Giza Only, Full Dynasty)
3. Observe the summary cards: accumulated deficit, actual duration, binding constraint
4. Explore tabs: Deficit curve, Demand vs Capacity, Bottlenecks, Material Flow, Sensitivity, Reverse Solver
5. Save scenarios for comparison
6. Export CSV for papers

## Methodology

The engine applies the **Theory of Constraints**: throughput is determined by the bottleneck subsystem. For each year of the programme, demand is calculated per active structure (with optional non-linear profiles and seasonal variation), and compared against the effective annual capacity of three material supply chains:

- **Core limestone**: quarrying → plateau transport → placement (workforce-scaled)
- **Tura casing**: quarrying → Nile transport (boat-limited)
- **Aswan granite**: quarrying → 500-mile upstream transport (boat-limited)

Annual deficit = max(0, demand − capacity) per subsystem. The accumulated deficit is the running total across the programme. A rising curve indicates systemic constraint failure.

This model deliberately evaluates only primary material subsystems. Secondary constraints — copper tool supply, dock throughput, barge scheduling, food provisioning, water supply — are omitted. Each would introduce additional constraint pressure, so the reported deficits represent a **lower bound** on the true systemic shortfall.

## Default Parameter Sources

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
| Structure masses | Various | Lehner (1997), Verner (2001), Stadelmann (1997) |

## Citation

If you use this tool in your research, please cite:

```bibtex
@software{copas_2026_constraint_engine,
  author       = {Copas, Mark},
  title        = {Fourth Dynasty Constraint Engine: A Throughput Model for Ancient Construction Programmes},
  year         = {2026},
  url          = {https://github.com/markcocoscopas/pyramid-constraint-model},
  version      = {3.0}
}
```

## Related Work

- Copas, M. (2026). Throughput, Labour, and Subsystem Constraints in the Sneferu Pyramid Programme. *Zenodo*. (Paper 2)
- Copas, M. (2026). Systemic Capacity Constraints in Fourth Dynasty Monument Construction. *Zenodo*. (Paper 3)
- Copas, M. (2026). Convergent Constraint Failure in the Fourth Dynasty Pyramid Programme. *Zenodo*. (Paper 4)

## Contributing

Contributions are welcome. Please open an issue to discuss proposed changes before submitting a pull request. Areas of particular interest:

- Refined mass estimates for Sneferu's pyramids
- Additional subsystem modelling (copper, food, docks)
- Experimental archaeology data points
- Fifth/Sixth Dynasty structure data

## Licence

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.
