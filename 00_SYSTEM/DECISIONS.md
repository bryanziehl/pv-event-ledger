# PV Kernel — Decisions (Normative)

This file records small, binding choices that prevent drift.
Each entry is short, dated, and explicit.

---

## 2026-02-13 — Naming + Structure

### Namespace strategy
- Folder hierarchy is the namespace.
- Do NOT encode full hierarchy into filenames (no fully-qualified mega-filenames).

### File naming
- Kernel modules: `snake_case.mjs`
- Tests: `*.test.mjs`
- Contract docs: `UPPER_SNAKE.md` (e.g., `KERNEL_CHARTER.md`, `SYSTEM_MAP.md`, `HEADER_GUIDANCE.md`)
- Other docs: `kebab-case.md` or existing repo style, but be consistent within `/docs`.

### Folder hygiene
- No cross-layer imports into kernel.
- Kernel must be importable as a unit (clean exports).
- Datasets/casework are non-kernel and must never be imported by kernel code.

---

## 2026-02-13 — Determinism + Hashing (Hard Invariant)

- All hashing must use a single canonicalization path.
- No raw `JSON.stringify()` in any hash construction.
- Key insertion order must not affect hashes (tested).
- Floats: forbidden unless an explicit normalization spec is adopted (default: forbid).

---

## 2026-02-13 — Scope (v0.1)

- No store, API, SDK, or auth in this repo until kernel surface is extracted and stable.
