# PRIMA VERITAS KERNEL — HEADER GUIDANCE (v1.0.0)

## Purpose

Headers exist to protect determinism, scope, and operator intent.

They are **documentation contracts**, not style artifacts.

They define what a file is allowed to do, and—more importantly—what it must refuse to do.

---

## Applicability

This guidance applies to:

- all kernel modules (`00–08`)
- all CLI entrypoints
- any file whose behavior affects canonical hashes or replay outcomes

This guidance does **not** apply to:

- dataset materializers (`10_DATASETS/*/run.mjs`)
- reports, templates, or outreach artifacts
- non-kernel tooling

---

## Required Header Content (semantic, not cosmetic)

Every executable or core kernel module must clearly state the following.

---

### 1) Responsibility

What this file does — precisely and narrowly.

Example:

> “This file performs deterministic normalization of structured inputs into canonical form.”

Responsibility must be:

- singular
- bounded
- non-overlapping with adjacent layers

---

### 2) Determinism Guarantees

An explicit list of forbidden behaviors.

Must include language equivalent to:

- no randomness
- no timestamps
- no environment-dependent behavior
- no heuristics or inference
- fixed ordering only
- hash scope is explicit and stable

If a file contributes to a hash, it must say so.

---

### 3) Non-Goals / Refusals

What this file will **not** attempt, even if inputs are messy or incomplete.

Examples:

- will not guess missing fields
- will not auto-correct malformed data
- will not silently coerce types
- will not clean client dysfunction beyond explicit rules
- will not interpret meaning or intent

Refusals are mandatory.

Silence implies prohibition.

---

### 4) Stability Contract

How changes to this file must be treated.

Examples:

- “Changes here are breaking.”
- “Inputs/outputs must remain byte-stable.”
- “Any behavior change requires version bump + replay diff.”
- “Hash-affecting changes invalidate prior artifacts.”

If the file affects determinism, the header must say how.

---

## Optional Header Content (safe to omit)

These are **non-binding and refactorable**:

- version numbers
- decorative separators
- ASCII art
- historical notes
- contributor notes
- license repetition (handled elsewhere)

---

## Style Rules (lightweight)

- comment style does not matter
- formatting does not matter
- order of sections does not matter
- clarity > verbosity
- explicit refusals > clever explanations

---

## Kernel-Specific Rules

- kernel files do not contain dataset-specific logic
- kernel files do not “help” the user
- kernel files fail loudly instead of guessing
- kernel files assume adversarial inputs
- kernel files favor replayability over convenience
- kernel files do not embed interpretation or policy

---

## Operator Prompt (reuse verbatim)

“Operate under the Prima Veritas Kernel Header Guidance.  
Enforce strict determinism, explicit refusals, and narrow responsibility.  
Do not introduce heuristics, cleanup logic, interpretation, or implicit behavior.”

---

## Final Principle

Headers exist to stop **future-you** from being clever.

If cleverness is required, it belongs outside the kernel.