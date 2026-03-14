/*
Prima Veritas Kernel — Ledger Hash Module

Responsibility
--------------
Compute the deterministic ledger-level attestation hash.

The ledger hash attests to:
- kernel_version
- spec_version
- entry_count
- final_entry_hash

It does NOT attest to:
- projections
- reports
- interpretations
- downstream artifacts

Determinism Guarantees
---------------------
- Canonical hashing only
- No environment-dependent behavior
- Identical inputs → identical hash

Stability Contract
------------------
- Ledger hash scope is strictly defined
- Expanding scope is a BREAKING change
*/

import {
  kernel_version as KERNEL_VERSION,
  spec_version
} from "../00_SYSTEM/kernel_constants.mjs";

import { hashCanonical } from "./canonical_hash.mjs";

/**
 * Compute deterministic ledger hash.
 *
 * @param {string|null} final_entry_hash
 * @param {number} entry_count
 *
 * @returns {string} ledger_hash
 */
export function computeLedgerHash({ final_entry_hash, entry_count }) {
  return hashCanonical({
    kernel_version: KERNEL_VERSION,
    spec_version,
    entry_count,
    final_entry_hash
  });
}
