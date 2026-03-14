# PV Kernel — Freeze Snapshot (Normative)

This file defines the frozen public contracts of the Prima Veritas Kernel.
Any change to shapes or hashing semantics here is BREAKING and requires:
- explicit discussion
- version bump
- replay diff against golden fixtures

## 1) Kernel Identity (Hash-Relevant)

Source: `00_SYSTEM/kernel_constants.mjs`

- kernel_version: "1.0.0"
- spec_version: "1.0.0"
- hash_algorithm: "sha256"
- canonical_encoding: "utf-8"

## 2) Canonical Hashing (Single Path)

Source: `04_LEDGER/canonical_hash.mjs`

### canonicalStringify(value)
- null → "null"
- string → JSON.stringify(value)
- boolean → "true" | "false"
- number:
  - non-finite → error CANONICALIZE_NON_FINITE_NUMBER
  - float (non-integer) → error CANONICALIZE_FLOAT_FORBIDDEN
  - integer → String(value)
- array → preserves order: `[v0,v1,...]` (each element canonicalized)
- object → keys sorted lexicographically; keys escaped with JSON.stringify(k)

Unsupported JS types → error CANONICALIZE_UNSUPPORTED_TYPE.

### hashCanonical(value)
- serialized = canonicalStringify(value)
- sha256(serialized, utf8) → hex digest

HARD INVARIANT:
All ledger + replay hash checks use hashCanonical (not raw JSON.stringify).

## 3) Ledger Object Shape

Source: `04_LEDGER/build_ledger.mjs`

buildLedger(events:Array<Object>) → ledger:Object

Ledger shape:

{
  "header": {
    "kernel_version": <string>,
    "spec_version": <string>,
    "hash_algorithm": <string>
  },
  "entry_count": <number>,
  "entries": [ <LedgerEntry>... ],
  "ledger_hash": <string>
}

Rules:
- events must be an array else LEDGER_INPUT_NOT_ARRAY
- event ordering is the input array order; the kernel will not reorder.

## 4) Ledger Entry Shape

Source: `04_LEDGER/seal_entry.mjs`

sealEntry({ index, event, previous_hash }) → entry:Object

Entry shape:

{
  "index": <number>,
  "event_id": <string>,            // copied from event.event_id
  "event_hash": <string>,          // hashCanonical(event)
  "previous_hash": <string|null>,
  "event": <object>,               // embedded verbatim
  "entry_hash": <string>           // hashCanonical(entry) after fields above exist
}

Notes:
- entry_hash cryptographically binds the embedded `event` object.
- previous_hash forms an append-only chain: previous_hash = prior entry.entry_hash.

## 5) Ledger Hash Scope

Source: `04_LEDGER/ledger_hash.mjs`

computeLedgerHash({ final_entry_hash, entry_count }) → ledger_hash:string

Ledger hash attests ONLY to:

{
  "kernel_version": <string>,
  "spec_version": <string>,
  "entry_count": <number>,
  "final_entry_hash": <string|null>
}

It does NOT attest to projections, reports, or downstream artifacts.

## 6) Replay Verification Rules

Source: `05_REPLAY/replay_sequence.mjs`

replaySequence(ledger | { ledger, atoms, returnFinalHash }) → events:Array<Object> | { events, finalHash }

Required header match:
- ledger.header.kernel_version === KERNEL_VERSION
- ledger.header.spec_version === spec_version
- ledger.header.hash_algorithm === hash_algorithm
Mismatch → REPLAY_HEADER_VERSION_MISMATCH

Entry verification (for each i):
- entry.index === i else REPLAY_INDEX_MISMATCH
- entry.previous_hash === previousHash else REPLAY_CHAIN_BROKEN
- hashCanonical(entry.event) === entry.event_hash else REPLAY_EVENT_HASH_MISMATCH
- hashCanonical({ index,event_id,event_hash,previous_hash,event }) === entry.entry_hash
  else REPLAY_ENTRY_HASH_MISMATCH

Return:
- default: reconstructed events array in ledger order
- if returnFinalHash: { events, finalHash: ledger.ledger_hash }

Note:
- `atoms` is accepted in the call shape but not currently used.

## 7) CLI Verify Interface (Binary)

Source: `08_CLI/pv_verify.mjs`

Arguments (required):
- --ledger <path>
- --atoms <path>
- --expected-hash <path>

Behavior:
1) Load ledger JSON; require ledger.ledger_hash string.
2) Compare: ledger.ledger_hash === expectedHash
   - mismatch → KernelError VERIFICATION_FAILED
3) Run replaySequence({ ledger, atoms, returnFinalHash:false }) as sanity check.
4) On success: prints "VERIFICATION PASSED"

Output contract:
- PASS: "VERIFICATION PASSED"
- FAIL: formatted KernelError, exit code 1
