# Prima Veritas Core

## What This Core Is

The Prima Veritas Core is an event-ledger engine for reconstructing verifiable operational timelines.

It transforms structured inputs into:

- atomic events  
- ordered hash-chain ledgers  
- replayable, verifiable artifacts  

It does this without:

- interpretation  
- inference  
- analytics  
- data repair  
- heuristics  

The core preserves structure and order.  
It does not create meaning.

---

## What This Core Is For

Operational systems often produce records that:

- arrive out of order  
- contain duplication  
- drift across systems  
- disagree in formatting  

The Prima Veritas Core reconstructs a single reproducible event sequence from those records.

It is intended for:

- post-incident reconstruction  
- audit scenarios  
- compliance review  
- dispute analysis  
- system reconciliation  

It establishes what was recorded and in what order — nothing more.

---

## Reproducibility Contract

The core guarantees:

- identical input → identical output  
- across machines  
- across operators  
- across time  

Hashing is canonical and insertion-order independent.

If reproducibility cannot be preserved, execution must fail.

---

## What This Repository Contains

This repository contains only the core event-ledger engine:

```
00_SYSTEM
01_INGEST
02_NORMALIZE
03_ATOMIZE
04_LEDGER
05_REPLAY
06_INVARIANTS
07_ERRORS
08_CLI
09_TESTS
```

It does **not** contain:

- client datasets  
- domain casework  
- reporting layers  
- analytics engines  
- projections beyond replay  

Those layers belong outside the core.

---

## Running Core Tests

All tests are self-contained and reproducible.

From the root directory:

```bash
node 09_TESTS/canonical_hash_insertion_order.test.mjs
node 09_TESTS/determinism.test.mjs
node 09_TESTS/micro_tamper_detection.test.mjs
```

If all tests pass, the core is sealed and reproducible.

---

## Operator Notes (Non-Technical)

You do not need programming knowledge to run tests.

Open PowerShell:

1. Click Start  
2. Type **PowerShell**  
3. Press Enter  

Navigate to the core directory:

```bash
cd C:\PRIMA_VERITAS_CORE
```

Run tests using the commands above.

No installation required.  
No configuration required.

---

## Design Principles

The core:

- preserves ambiguity  
- refuses heuristic correction  
- records missing data as missing  
- surfaces conflicts without resolving them  
- fails loudly instead of guessing  

Interpretation must occur outside the core.

---

## Canonical Contract

The canonical hash attests to:

- `kernel_version`
- `spec_version`
- `entry_count`
- `final_entry_hash`

It does **not** attest to:

- reports  
- summaries  
- legal arguments  
- analytics  
- projections  

That boundary is intentional.

---

## Governance

See:

- `KERNEL_CHARTER.md`
- `SYSTEM_MAP.md`
- `HEADER_GUIDANCE.md`

These documents define scope, invariants, and change control.

---

## Status

Core Version: 1.0.0  
Status: Reproducible core sealed  
Scope: Domain-agnostic