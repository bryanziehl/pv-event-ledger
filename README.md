# PV Event Ledger

Reconstructs and sequences operational events into a reproducible, verifiable event ledger.

Transforms structured inputs into atomic events, ordered hash-chain ledgers, and replayable, verifiable artifacts.

Identical input always produces identical output across machines, operators, and time.

---

## Repository Purpose

This repository contains the reference implementation of the Prima Veritas Event Ledger.

It is used for:

* event sequencing
* reproducible ledger construction
* operational history reconstruction

It is not a full Prima Veritas system.

The production system includes additional infrastructure, validation layers, and operational components not included here.

---

## What It Does

Transforms structured inputs into:

* atomic events
* ordered hash-chain ledgers
* replayable, verifiable artifacts

The system:

* preserves structure and order
* does not create meaning
* does not perform interpretation or inference

---

## Design Constraints

The system operates without:

* interpretation
* inference
* analytics
* data repair
* heuristics

Ambiguity is preserved.  
Conflicts are surfaced.  
Missing data remains missing.  

If reproducibility cannot be preserved, execution fails.

---

## Guarantees

Identical input produces:

* identical event ordering
* identical ledger structure
* identical hash outputs

Hashing is canonical and insertion-order independent.

---

## What It Solves

Operational systems often produce records that:

* arrive out of order
* contain duplication
* drift across systems
* disagree in formatting

The PV Event Ledger reconstructs a single reproducible event sequence from those records.

It establishes what was recorded and in what order — nothing more.

---

## Repository Structure


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


---

## What It Does Not Include

* client datasets
* domain casework
* reporting layers
* analytics engines
* projections beyond replay

These layers belong outside the system.

---

## Running Tests

All tests are self-contained and reproducible.

From the repository root:

node 09_TESTS/canonical_hash_insertion_order.test.mjs
node 09_TESTS/determinism.test.mjs
node 09_TESTS/micro_tamper_detection.test.mjs

Operator Notes

No programming knowledge is required.

Open PowerShell:

Start → type “PowerShell” → Enter

Navigate to the repository directory:

cd C:\pv_event_ledger

Run the test commands above.

No installation required.
No configuration required.

Design Principles

The system:

preserves ambiguity
refuses heuristic correction
records missing data as missing
surfaces conflicts without resolving them
fails loudly instead of guessing

Interpretation must occur outside the system.

Canonical Contract

The canonical hash attests to:

kernel_version
spec_version
entry_count
final_entry_hash

It does not attest to:

reports
summaries
legal arguments
analytics
projections

That boundary is intentional.

Governance

See:

KERNEL_CHARTER.md
SYSTEM_MAP.md
HEADER_GUIDANCE.md

These documents define scope, invariants, and change control.

Status

Version: 1.0.0
Status: Reproducible system sealed
Scope: Domain-agnostic