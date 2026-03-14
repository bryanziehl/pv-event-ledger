# Prima Veritas Core — Naming Conventions (Normative)

Purpose  
This document enforces a consistent, scalable naming and folder hygiene standard
for the Prima Veritas Core repository.

Naming is treated as an operational control:
- reduces ambiguity
- reduces drift
- preserves maintainability under stress
- makes diffs and audits easier

This standard is **normative** for the repository.

---

## 1) Scope Labels (Repository-Level)

This repository contains two scopes:

### CORE KERNEL (normative, hash-affecting)

Folders that are part of the **Core Kernel**:

- `00_SYSTEM`
- `04_LEDGER`
- `05_REPLAY`
- `06_INVARIANTS`
- `07_ERRORS`
- `08_CLI`
- `09_TESTS`

Kernel files:

- MUST follow `HEADER_GUIDANCE.md`
- MUST remain deterministic
- MUST treat behavior changes as breaking
- MUST not introduce environment-dependent behavior
- MUST not introduce non-deterministic iteration or hashing

---

### REFERENCE ADAPTERS (non-kernel, replaceable)

Folders that are **not part of the kernel**:

- `20_REFERENCE_ADAPTERS/**`

Reference adapters:

- illustrate deterministic ingestion and normalization patterns
- may be replaced by production connectors
- are not protected by the Kernel Charter
- must not modify kernel invariants

Adapters may be deterministic but they are **not normative kernel components**.

---

## 2) Folder Naming (Top Level)

### Canonical Pattern


NN_LABEL/


Where:

- `NN` is a two-digit numeric prefix used for stable ordering
- `LABEL` is uppercase with underscores

Examples:


00_SYSTEM/
04_LEDGER/
20_REFERENCE_ADAPTERS/


Rules:

- No spaces
- No hyphens in folder labels
- No mixed case in top-level folder labels
- Numeric prefixes must remain stable once introduced

This guarantees deterministic repository ordering across tools and operating systems.

---

## 3) File Naming (General)

### JavaScript / ESM Modules

Use **snake_case** for `.mjs` files.

Examples:


build_ledger.mjs
hash_utils.mjs
replay_sequence.mjs
seal_entry.mjs
canonical_hash.mjs


Reasons:

- stable and readable in terminals
- consistent with existing Prima Veritas conventions
- avoids case-sensitivity traps across filesystems

---

### JSON / Rule Files

Use **snake_case** and explicit meaning.

Examples:


ledger_schema.json
event_schema.json
normalize_rules.json
immutability.rules.json


Rules files should always clearly describe the rule domain.

---

### Markdown Docs

Use **UPPERCASE** for top-level normative documents:


KERNEL_CHARTER.md
SYSTEM_MAP.md
HEADER_GUIDANCE.md
NAMING_CONVENTIONS.md
QUICKSTART.md
README.md


Within subfolders:

- `README.md` → local usage documentation
- `snake_case.md` → non-normative documentation

---

## 4) Export Naming (Public Surface)

### Exports in Kernel Modules

Exports MUST be:

- camelCase for functions
- PascalCase for classes (rare; discouraged)
- SCREAMING_SNAKE_CASE only for true constants

Examples:

export function buildLedger(...) { ... }  
export function replaySequence(...) { ... }  
export const kernel_version = "1.0.0"

Rules:

- File name is snake_case
- Export name is camelCase
- Do not mirror file names exactly as exports

This keeps JavaScript idiomatic while preserving deterministic behavior.

---

## 5) Test File Naming

All tests live in `09_TESTS/`.

Naming convention:

- `*.test.mjs`

Examples:

- determinism.test.mjs
- micro_tamper_detection.test.mjs
- canonical_hash_insertion_order.test.mjs
- ledger_chain_integrity.test.mjs

Test names should clearly describe the invariant they enforce.

---

## 6) Versioning + Breaking Changes

### Version strings

Kernel identity values:

- kernel_version
- spec_version

Both follow semantic versioning.

Examples:

- 1.0.0
- 1.1.0
- 2.0.0

Rules:

Any kernel behavior change that can alter:

- hashes
- replay output
- ledger structure

is considered **breaking**.

Breaking changes require:

- version bump
- explicit commit message
- justification in `00_SYSTEM/DECISIONS.md`
- replay validation against golden fixtures

---

## 7) “No Drift” Rules (Hygiene)

### No ambiguous utility buckets

Avoid junk-drawer folders like:

- utils/
- misc/
- helpers/

Unless the module is extremely small and tightly scoped.

Preferred approach:

- place utilities next to the layer that owns them
- if shared, place in `00_SYSTEM/` with a narrow responsibility header

### No duplicate implementations

If two files implement the same concept (hashing, canonicalization, verification), that is a defect unless explicitly justified in `00_SYSTEM/DECISIONS.md`.

### No implicit scope creep

Client-specific behavior belongs in `20_REFERENCE_ADAPTERS`, not the kernel.

Kernel modules must remain domain-neutral.

---

## 8) Determinism-Related Naming Discipline

Any module that participates in hash construction or ledger integrity must make that clear in its name or header.

Recommended patterns:

- hash_*
- canonical_*
- verify_*
- seal_*
- replay_*

Avoid misleading names like:

- clean_*
- fix_*
- smart_*
- infer_*
- auto_*

These imply prohibited behavior such as inference or correction.

Kernel modules must perform mechanical, deterministic operations only.

---

## 9) Reserved Prefixes (Future Growth)

Reserved top-level ranges:

- `30_` to `69_` → expansion modules (store, api, sdk, service layers)
- `90_` to `99_` → artifacts, reports, templates (if reintroduced)

These ranges should not be used casually.

If artifacts or datasets are introduced:

- they must be clearly labeled **NON-KERNEL**
- kernel modules must never import them
- artifacts must never influence hash semantics

---

## 10) Enforcement

This repository is considered healthy when:

- module responsibilities are narrow and obvious
- naming predicts behavior
- folder placement is deterministic
- kernel vs adapter boundaries are obvious

If naming is unclear, the default action is:

- refuse new files
- rename first
- document the decision
- then merge

Naming clarity is treated as a **first-class maintainability control**.