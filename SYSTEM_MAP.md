## Prima Veritas Core — System Map

This document defines the canonical structure of the **Prima Veritas Core** repository.

This map is **normative**.

If code or folders diverge from this structure, the divergence must be justified against `KERNEL_CHARTER.md` and this file.

---

## Repository Exposure Policy

All contents of this repository are safe for public distribution.

Canonical artifacts are limited to:

- Core engine code  
- Core configuration  
- Verification tests  
- Versioned constants  

This repository contains **no domain data, casework, or client material**.

Nothing in this repository expresses opinions, conclusions, or interpretations.

---

## Repository Structure


PRIMA_VERITAS_CORE/
│
├── KERNEL_CHARTER.md ← locked (core scope + invariants)
├── SYSTEM_MAP.md ← normative (this file)
├── HEADER_GUIDANCE.md ← core-wide header contract
├── README.md
├── QUICKSTART.md
│
├── 00_SYSTEM/ ← core-wide constants + shared utilities
│ ├── kernel_constants.mjs
│ ├── DECISIONS.md
│ └── .keep
│
├── 01_INGEST/ ← raw intake (no interpretation)
│ ├── ingest_file.mjs
│ ├── ingest_directory.mjs
│ ├── ingest_manifest.mjs
│ └── README.md
│
├── 02_NORMALIZE/ ← canonical transforms only
│ ├── normalize_structured.mjs
│ ├── normalize_text.mjs
│ ├── normalize_rules.json
│ ├── normalize_text.rules.json
│ └── README.md
│
├── 03_ATOMIZE/ ← atomic event extraction
│ ├── atomize_events.mjs
│ ├── event_schema.json
│ └── README.md
│
├── 04_LEDGER/ ← hash chain + sealing
│ ├── build_ledger.mjs
│ ├── hash_utils.mjs
│ ├── ledger_schema.json
│ └── .keep
│
├── 05_REPLAY/ ← verification + replay
│ ├── replay_sequence.mjs
│ └── README.md
│
├── 06_INVARIANTS/ ← declarative rules only (no logic)
│ ├── ordering.rules.json
│ ├── immutability.rules.json
│ ├── rejection.rules.json
│ └── README.md
│
├── 07_ERRORS/ ← first-class execution failures
│ ├── kernel_error.mjs
│ ├── error_codes.json
│ └── .keep
│
├── 08_CLI/ ← thin operator surface (no business logic)
│ ├── pv_ingest.mjs
│ ├── pv_replay.mjs
│ ├── pv_verify.mjs
│ └── .keep
│
└── 09_TESTS/ ← reproducibility + tamper guarantees
├── determinism.test.mjs
├── canonical_hash_insertion_order.test.mjs
├── micro_tamper_detection.test.mjs
└── README.md


---

## Core Boundary

This repository contains only the **core event reconstruction engine**.

It does not contain:

- datasets  
- casework reports  
- domain adapters  
- analytics  
- projections beyond replay  
- client-specific logic  

Domain adapters, ingestion pipelines, storage layers, APIs, and reporting systems must live **outside the core repository**.

The core is intentionally narrow.

---

## Reproducibility Guarantees

All core modules must:

- be deterministic  
- be environment-independent  
- produce identical outputs for identical inputs  
- use canonical hashing only  
- refuse heuristic behavior  

Any deviation from reproducibility is a **breaking change**.

---

## Final Constraint

The core is complete when:

- identical atomic events produce identical ledgers  
- replay verification is portable  
- hashes are canonical and insertion-order independent  
- interpretation remains external  

Any change that violates these conditions is **out of scope**.