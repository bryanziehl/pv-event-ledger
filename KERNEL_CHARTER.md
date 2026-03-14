# PRIMA VERITAS — KERNEL CHARTER (v1.1.0)

Status: ACTIVE  
Scope: All kernel code, present and future

---

## Purpose

The Prima Veritas Kernel exists to produce deterministic, replayable, verifiable event-ledger artifacts from structured inputs, without interpretation, inference, correction, enrichment, or domain-specific logic.

The kernel is a **truth-preserving machine**, not:

- an analytics engine
- an ETL pipeline
- a data-cleaning service
- a business rules engine
- a decision or scoring system
- a reporting system

Its outputs must be:

- bit-for-bit reproducible
- auditable
- machine-verifiable
- environment-independent
- operator-independent

The kernel guarantees **structure and order only**.

---

## What the Kernel IS

The kernel is responsible for only the following functions.

### 1. Deterministic Ingest

- Accepting input exactly as provided
- Recording raw structure and ordering
- Rejecting malformed or unsupported inputs
- Never coercing, repairing, or inferring

---

### 2. Canonical Normalization

Applying deterministic, declared transforms only.

Rules:

- No heuristics
- No probabilistic logic
- No silent mutation

All transforms must:

- be explicitly defined
- be deterministic
- preserve provenance
- be reversible in principle

The kernel never invents structure.

---

### 3. Event Atomization

Breaking structured input into atomic events.

Requirements:

- Preserving declared ordering
- Capturing ambiguity explicitly
- Recording absence as absence

The kernel **does not resolve ambiguity**.

---

### 4. Hash-Chain Sealing

The kernel produces a **cryptographically sealed, append-only ledger**.

Hashing rules:

- All hashes must use a single canonicalization path
- Raw `JSON.stringify` is forbidden in hash construction
- Key ordering must be deterministic
- Environment differences must not affect hash output

The canonical ledger hash attests only to:

- `kernel_version`
- `spec_version`
- `entry_count`
- `final_entry_hash`

It does **not** attest to:

- reports
- interpretations
- projections
- downstream artifacts

This boundary is **absolute**.

---

### 5. Deterministic Replay

Replay is responsible for:

- Reconstructing the exact event sequence
- Verifying hash continuity
- Verifying header invariants
- Verifying event integrity

Replay emits **structure, not meaning**.

---

### 6. Invariant Enforcement

The kernel enforces:

- Immutability
- Deterministic ordering
- Non-inference
- Canonical hashing discipline
- Refusal on ambiguity or drift

If determinism cannot be guaranteed, execution must stop.

---

## What the Kernel IS NOT

The kernel will never:

- ❌ Infer intent, causality, motive, fault, or responsibility
- ❌ Interpret domain semantics
- ❌ Reconcile business inconsistencies
- ❌ Collapse events into summaries
- ❌ Fill gaps
- ❌ Apply heuristics
- ❌ Perform analytics
- ❌ Generate narratives or conclusions
- ❌ Embed client-specific rules

If requested functionality violates these boundaries, it must live **outside the kernel**.

---

## Boundary of Responsibility

| Layer | Responsibility |
|------|---------------|
| Client / Operator | Data preparation, domain semantics, interpretation |
| Kernel | Deterministic ingest → normalize → atomize → seal → replay |
| Adapters / Services | Domain-specific validation, storage, transport |
| Analysis / Reporting | Meaning, summaries, conclusions |

The kernel **does not cross upward into meaning**.

---

## Error Philosophy

Errors are **first-class outputs**.

- Ambiguity is preserved
- Conflicts are surfaced
- Missing data is recorded
- Assumptions are forbidden
- Silent coercion is prohibited

If something cannot be represented truthfully, execution must stop.

---

## Determinism Requirements

The following must always hold:

- Same input → same ledger
- Same ledger → same replay

Across:

- machines
- time
- Node versions (within declared support window)
- operators

If determinism cannot be guaranteed, the kernel must **refuse execution**.

---

## Extensibility Rules

All new kernel modules must:

- Declare invariants
- Declare input/output schema
- Use canonical hashing utilities
- Avoid environment dependence
- Avoid domain logic

Domain adapters must live **outside the kernel boundary**.

The kernel must remain **domain-agnostic**.

---

## Repository Discipline

This repository contains:

- deterministic kernel code
- deterministic test suites
- normative system map
- invariant declarations

This repository does **not** contain:

- embedded casework
- embedded client datasets
- domain-specific demonstrations
- interpretive artifacts

Proof datasets, demonstrations, and casework live in **separate repositories**.

---

## Change Control

This charter is versioned.

Changes require:

- explicit version bump
- written rationale
- acknowledgment of scope impact

Silent drift is prohibited.

---

## Final Invariant

The kernel preserves **structure and order**; it does **not create meaning**.

If a proposal violates that sentence, it does not belong here.

---

Charter Version: **v1.1.0**  
Status: **ACTIVE**  
Scope: **All kernel code, present and future**