/**
 * Prima Veritas Kernel — Tamper Detection Test (Micro)
 *
 * Responsibility:
 * Ensure replay verification fails if any event payload is mutated after sealing.
 *
 * Stability Contract:
 * If this stops failing on tamper, the kernel is broken.
 */

import assert from "assert";

import { buildLedger } from "../04_LEDGER/build_ledger.mjs";
import { replaySequence } from "../05_REPLAY/replay_sequence.mjs";

function makeEvent(i) {
  return {
    event_id: `deterministic:${i}`,
    sequence_index: i,
    timestamp: null,
    source: { origin: "micro", location: `row_${i}` },
    payload: { kind: "micro", value: i, nested: { ok: true } },
    provenance: { ingest_id: "micro_ingest", normalize_id: "micro_norm" },
    notes: null
  };
}

console.log("Running tamper detection test (micro)…");

const events = [makeEvent(0), makeEvent(1)];

const ledger = buildLedger(events);

// Tamper: mutate a nested value inside an event AFTER sealing
ledger.entries[1].event.payload.nested.ok = false;

let threw = false;
try {
  replaySequence(ledger);
} catch (err) {
  threw = true;
}

assert.strictEqual(threw, true, "Expected replaySequence to fail on tampered ledger");

console.log("✔ tamper detected");
