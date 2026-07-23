# Regression fixtures

Characterisation tests for the Fourth Dynasty Constraint Engine. They record what the
engine currently does, so that any later change to structure, performance, or style has
to declare itself rather than move a published figure silently.

## Running them

Open `engine-regression.html` in a browser and select an engine HTML file. No server, no
install, no build. The engine file is read, never modified, so the artefact you test is
byte-identical to the one you archive.

The harness loads the engine headlessly, runs every fixture, and reports divergence with
the expected and actual values side by side. Pointing it at an older engine is a
supported use: it is the quickest way to see exactly where two versions differ.

## Regenerating them

    node generate-fixtures.js path/to/engine.html

Run it from inside `tests/`. It overwrites `fixtures.json` and patches the copy embedded in
`engine-regression.html`, so the two cannot drift. The harness carries its own copy because
a browser opened from `file://` cannot fetch a sibling JSON file.

Only regenerate when a behaviour change is intended, and read the diff before committing.
Every changed value is a change to a published figure until you have shown otherwise.

## What is covered

Forty checks in three tiers.

Tier 1 protects published figures. Four capacity presets across three structure scopes,
each structure in isolation, and the full toggle matrix of cannibalisation, non-linear
profiles, and seasonality. Each case pins the aggregate summary, the per-structure
duration and binding stage, and a digest over every annual row.

Tier 2 protects internal consistency. The reverse solver and the forward engine
independently reimplement the cannibalised-mass rule and the stage-to-capacity mapping.
The round-trip check asserts that they still agree. If those duplicated rules ever drift,
this is the check that catches it.

Tier 3 pins conventions. Mass conservation in both profile modes, inclusive programme
years, deficit clipping per stream before summing, utilisation clipping at 200 per cent,
tie resolution when two stages have exactly equal capacity, workforce scaling applying to
mass labour but not to specialist or boat-limited stages, startup capacities matching the
Lehner preset, and labour allocation being warned about rather than enforced.

## Tolerance

Aggregates and per-column annual totals compare at a relative tolerance of 1e-9. Stage
names, binding labels, frequencies, row counts, and the per-year sequence of binding
stages compare exactly.

Nothing compares raw doubles bit for bit, and this matters more than it looks. The core
and granite demand profiles call `Math.sin`, which ECMAScript does not require to be
correctly rounded, so the same engine run in Chrome, Firefox, and Safari can differ in the
last bit. An earlier version of this harness hashed exact double strings and reported those
differences as failures on every browser except the one the fixtures were generated on.

The comparison now works in two layers. Per-column annual totals decide pass or fail, at
tolerance. A row digest over values rounded to ten significant figures runs alongside them:
ten figures is coarse enough to absorb last-bit variation and fine enough that no realistic
change survives it. If the digest differs while every column total and the binding sequence
match, the harness reports that as floating-point variation rather than a failure.

One consequence worth knowing. Granite deficit totals are small residuals left after large
cancellations, sometimes only tens of tonnes across the whole programme, so their relative
tolerance is easier to exceed than the headline figures. A failure confined to `aDef` on a
small-scope case is worth checking before assuming a regression.

## Intent flags

Each case is marked `intended` or `current`.

`intended` means the recorded behaviour is believed correct and a failure is a
regression.

`current` means the behaviour is recorded so that a change is visible, not because it is
endorsed. One case carries this flag: tie resolution, which is a convention that falls out
of the order of the conditional chain rather than a derivation, and is pinned so that
reordering the chain cannot change a binding label unnoticed.

The same-year and reversed-date cases were previously flagged `current`. A chronology guard
in `setStruct` now enforces a minimum one-year span, so neither state can be produced from
the interface. The model retains its `ty <= 0` and `dur <= 0` branches, and both cases are
kept as `intended` records of that defensive behaviour for programmatic callers.

## Known gap

The set covers the numerical model. It does not cover rendering, CSV export, scenario
persistence, or malformed `localStorage`. Those need browser-level smoke tests and are
out of scope here.
