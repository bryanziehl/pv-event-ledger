/**
 * Prima Veritas Kernel — Canonical Hash Insertion-Order Test
 *
 * Responsibility:
 * Prove that canonical hashing is independent of object key insertion order.
 *
 * Determinism Guarantees:
 * - Same semantic object → same canonical hash
 *
 * Stability Contract:
 * Any failure here is a breaking regression.
 */

import assert from "assert";
import { hashCanonical } from "../04_LEDGER/canonical_hash.mjs";

console.log("Running canonical hash insertion-order test…");

const a = {};
a.b = 2;
a.a = 1;
a.c = { y: 2, x: 1 };

const b = {};
b.c = { x: 1, y: 2 };
b.a = 1;
b.b = 2;

const ha = hashCanonical(a);
const hb = hashCanonical(b);

assert.strictEqual(
  ha,
  hb,
  "Canonical hash depends on insertion order (regression)"
);

console.log("✔ canonical hash insertion-order independent");
