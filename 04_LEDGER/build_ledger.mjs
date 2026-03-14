/*
Prima Veritas Kernel — Ledger Construction Module

Responsibility
--------------
Build a deterministic, append-only ledger from atomic events.
This module establishes ordering, immutability, and hash-chain integrity.

This module orchestrates ledger construction using:
- sealEntry() for deterministic entry sealing
- computeLedgerHash() for final ledger attestation

It does not interpret events.
It does not assess correctness.
It does not summarize or analyze content.

Determinism Guarantees
---------------------
- No randomness
- No timestamps generated
- No environment-dependent behavior
- Fixed ordering based solely on input sequence
- Cryptographic operations are deterministic
- Identical input events → identical ledger, bit-for-bit

Determinism Assumptions
----------------------
- Event objects are already canonicalized upstream
- sealEntry() is deterministic
- Hash canonicalization is insertion-order independent

If these assumptions are violated upstream, determinism is not guaranteed
and execution should be considered invalid.

Non-Goals / Explicit Refusals
-----------------------------
- Will not reorder events
- Will not merge or collapse events
- Will not infer causality, correctness, or meaning
- Will not repair malformed events
- Will not skip or silently drop entries
- Will not re-hash or reinterpret payload structure

Stability Contract
------------------
- Ledger entry structure is BREAKING if changed
- Hash semantics and chaining rules must remain stable
- Any behavior change requires:
  - version bump
  - full replay diff
  - justification against KERNEL_CHARTER.md

Hash Scope Clarification
-----------------------
- The ledger hash attests to:
  - kernel version
  - spec version
  - entry count
  - final entry hash (ordering + immutability)
- It does NOT attest to reports, interpretations, or downstream artifacts

This boundary is intentional and must not be expanded.
*/

import {
  kernel_version as KERNEL_VERSION,
  spec_version,
  hash_algorithm
} from "../00_SYSTEM/kernel_constants.mjs";

import { sealEntry } from "./seal_entry.mjs";
import { computeLedgerHash } from "./ledger_hash.mjs";

/**
 * Build a deterministic ledger from atomic events.
 *
 * @param {Object[]} events - Atomic event array (ordered)
 *
 * @returns {Object} ledger
 */
export function buildLedger(events) {
  if (!Array.isArray(events)) {
    throw new Error("LEDGER_INPUT_NOT_ARRAY");
  }

  const ledger = {
    header: {
      kernel_version: KERNEL_VERSION,
      spec_version,
      hash_algorithm
    },
    entry_count: events.length,
    entries: []
  };

  let previous_hash = null;

  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    const entry = sealEntry({
      index: i,
      event,
      previous_hash
    });

    ledger.entries.push(entry);
    previous_hash = entry.entry_hash;
  }

  ledger.ledger_hash = computeLedgerHash({
    final_entry_hash: previous_hash,
    entry_count: ledger.entry_count
  });

  return ledger;
}
