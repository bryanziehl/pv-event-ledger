/**
 * Prima Veritas Kernel — Determinism Test (Micro)
 *
 * Responsibility:
 * Prove determinism of sealing + replay on a small, synthetic event stream.
 * No external fixtures. No casework. No ingest/normalize/atomize.
 *
 * Determinism Guarantees:
 * - No randomness
 * - No timestamps generated
 * - No environment-dependent behavior
 *
 * Stability Contract:
 * If ledger_hash or replay output drifts across identical runs, kernel is broken.
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

console.log("Running Prima Veritas determinism test (micro)…");

const events = [makeEvent(0), makeEvent(1), makeEvent(2)];

const ledgerA = buildLedger(events);
const replayA = replaySequence(ledgerA);

const ledgerB = buildLedger(events);
const replayB = replaySequence(ledgerB);

assert.strictEqual(
  ledgerA.ledger_hash,
  ledgerB.ledger_hash,
  "Ledger hash drift detected"
);

assert.deepStrictEqual(
  replayA,
  replayB,
  "Replay output drift detected"
);

console.log("✔ micro ledger + replay deterministic");
console.log("All determinism tests passed.");
