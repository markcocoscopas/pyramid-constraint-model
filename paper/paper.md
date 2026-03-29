---
title: 'Fourth Dynasty Constraint Engine: A Browser-Based Throughput Model for Evaluating Ancient Construction Programme Feasibility'
tags:
  - constraint analysis
  - throughput modelling
  - ancient Egypt
  - pyramid construction
  - operations research
  - Theory of Constraints
authors:
  - name: Mark Copas
    orcid: 0000-0000-0000-0000
    affiliation: 1
affiliations:
  - name: Independent Researcher
    index: 1
date: 29 March 2026
bibliography: paper.bib
---

# Summary

The Fourth Dynasty Constraint Engine is a browser-based interactive tool for modelling throughput constraints in the Egyptian Fourth Dynasty pyramid-building programme (c. 2610–2510 BCE). It evaluates whether published capacity estimates for quarrying, transport, and block placement can deliver six major pyramids — Meidum, Bent, Red, Great Pyramid (Khufu), Khafre, and Menkaure — within their historically attested construction timelines.

The tool applies the Theory of Constraints [@goldratt1984], treating each material supply chain as a throughput-limited subsystem where capacity is determined by the bottleneck. It models three primary subsystems: core limestone (quarried locally, transported across the plateau, and placed), Tura casing limestone (quarried across the Nile and transported by boat), and Aswan granite (quarried 500 miles upstream). Annual demand is calculated per active structure with optional non-linear profiles reflecting the physical reality that lower pyramid courses contain more volume, casing is applied late, and granite is concentrated during chamber construction.

# Statement of Need

Despite decades of scholarship on Fourth Dynasty pyramid construction, no openly available tool exists for quantitatively evaluating the logistical feasibility of published construction models. Capacity estimates from Arnold [-@arnold1991], Lehner [-@lehner1997], and Stocks [-@stocks2003] are widely cited but have never been systematically stress-tested as an integrated throughput system across the full dynasty programme. Scholars and students assessing competing construction hypotheses — including the recent Cannibalisation Hypothesis [@choi2026] proposing stone recycling between structures — lack a reproducible, interactive means of testing whether stated capacities can meet stated demands within stated timelines.

The Fourth Dynasty Constraint Engine fills this gap. It provides a self-contained, zero-dependency HTML application that any researcher can open in a browser, adjust parameters to match any published estimate, and immediately observe the resulting deficit profile, actual construction duration, bottleneck identification, and sensitivity analysis. All outputs are exportable as CSV for further analysis or inclusion in publications.

# Functionality

The engine provides the following analytical capabilities:

**Throughput analysis.** For each year of the programme, demand from all active structures is compared against the effective annual capacity of each subsystem. The accumulated deficit — the running total of annual shortfalls — quantifies the degree of systemic constraint failure.

**Non-linear demand profiles.** Rather than distributing material demand uniformly across construction timelines, the engine models volume-per-course decay (core limestone peaks early), phased casing installation (concentrates late), and chamber-driven granite demand (peaks mid-build).

**Seasonal workforce modelling.** Three Egyptian seasons — Akhet (flood), Peret (growing), and Shemu (harvest) — modify workforce availability and water transport capacity, reflecting the agricultural calendar's impact on construction logistics.

**Labour allocation.** The workforce is distributed across quarrying, transport, and placement subsystems via adjustable percentage allocations, preventing the methodological error of double-counting the same workers as simultaneously quarrying, transporting, and placing blocks.

**Duration calculator.** For each structure, the engine calculates the actual construction duration at current capacity settings, independent of the assumed timeline. This translates abstract deficit figures into concrete time: at Lehner's default rates, the Great Pyramid requires approximately 68 years rather than the attested 20.

**Reverse solver.** Given a target construction duration, the engine calculates the minimum required daily rate for each subsystem and identifies which current rates are insufficient, with the required multiplier displayed.

**Sensitivity matrix.** An automated stress test runs the full model at baseline, +25%, +50%, and +100% for each subsystem independently, producing a matrix that identifies the key lever — the subsystem whose improvement has the greatest impact on programme feasibility. Rows showing no change indicate non-binding subsystems.

**Cannibalisation hypothesis.** The Choi/Lee hypothesis [@choi2026] is modelled as an optional toggle. When enabled, each structure uses an overbuilt mass parameter; upon completion, the surplus (overbuilt minus final mass) becomes available as recycled core limestone for subsequent structures, capped at 60% of annual core demand to reflect reprocessing limits.

**Scenario comparison and export.** Configurations can be saved as named scenarios for side-by-side comparison. Year-by-year data is exportable as CSV including demand, capacity, deficit, utilisation, and binding constraint per year.

# Design and Implementation

The engine is implemented as a single self-contained HTML file using vanilla JavaScript with HTML Canvas for chart rendering. It has zero external dependencies — no frameworks, no CDN calls, no build tools. This design ensures long-term reproducibility: the file will render identically in any modern browser without requiring server infrastructure, package management, or internet connectivity.

Four capacity presets (Lehner, Stocks, High Estimate, Best Case) and three structure group presets (Sneferu Only, Giza Only, Full Dynasty) enable rapid scenario exploration. Every parameter, metric, and toggle includes a hover tooltip explaining its function, making the tool accessible to non-specialists.

This model deliberately evaluates only primary material subsystems. Secondary constraints — including copper tool supply, dock throughput, barge scheduling, and food provisioning — are omitted. Each would introduce additional constraint pressure on an already infeasible system, so the reported deficits represent a lower bound on the true systemic shortfall.

# Research Context

This tool was developed in support of a series of papers applying constraint-based analysis to Fourth Dynasty construction [@copas2026a; @copas2026b; @copas2026c]. It operationalises the Constraint-Based Evaluation Framework (CBEF), a portable evaluation protocol for adjudicating orthodox and heterodox claims in archaeology by testing whether published parameters produce feasible outcomes when modelled as integrated systems.

# References
