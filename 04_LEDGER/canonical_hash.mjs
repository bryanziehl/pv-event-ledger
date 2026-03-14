/*
Prima Veritas Kernel — Canonical Hash Utilities

Responsibility
--------------
Provide a single deterministic canonical serialization + hashing path
for all ledger and replay hash operations.

Determinism Guarantees
---------------------
- No randomness
- No timestamps
- No environment-dependent behavior
- Stable recursive key ordering
- Valid JSON key escaping
- UTF-8 encoding
- Fixed algorithm (SHA-256)

Non-Goals / Explicit Refusals
-----------------------------
- No heuristic normalization
- No schema inference
- No silent type coercion
- No float rounding or correction
- No interpretation of semantic meaning

Stability Contract
------------------
- HARD invariant
- Any change invalidates historical ledgers
- Changes require version bump + replay diff
*/

import crypto from "crypto";
import { hash_algorithm } from "../00_SYSTEM/kernel_constants.mjs";

/**
 * Deterministically stringify a JSON-serializable value
 * using stable recursive key ordering.
 *
 * @param {any} value
 * @returns {string}
 */
export function canonicalStringify(value) {
  if (value === null) return "null";

  const type = typeof value;

  if (type === "string") return JSON.stringify(value);
  if (type === "boolean") return value ? "true" : "false";

  if (type === "number") {
    if (!Number.isFinite(value)) {
      throw new Error("CANONICALIZE_NON_FINITE_NUMBER");
    }
    if (!Number.isInteger(value)) {
      throw new Error("CANONICALIZE_FLOAT_FORBIDDEN");
    }
    return String(value);
  }

  if (type !== "object") {
    throw new Error("CANONICALIZE_UNSUPPORTED_TYPE");
  }

  if (Array.isArray(value)) {
    return `[${value.map(canonicalStringify).join(",")}]`;
  }

  const keys = Object.keys(value).sort();

  const entries = keys.map((k) => {
    return `${JSON.stringify(k)}:${canonicalStringify(value[k])}`;
  });

  return `{${entries.join(",")}}`;
}

/**
 * Deterministically hash a value using canonicalStringify.
 *
 * @param {any} value
 * @returns {string}
 */
export function hashCanonical(value) {
  const serialized = canonicalStringify(value);
  return crypto
    .createHash(hash_algorithm)
    .update(serialized, "utf8")
    .digest("hex");
}
