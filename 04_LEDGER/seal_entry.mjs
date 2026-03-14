/*
Prima Veritas Kernel — Entry Sealing Module

Responsibility
--------------
Deterministically seal a single ledger entry.

This module produces:
- event_hash
- entry_hash
- immutable entry structure

It does not:
- modify the event
- reorder fields
- inject metadata
- interpret content

Determinism Guarantees
---------------------
- Hashing uses canonical hashing only
- No randomness
- No timestamps
- Identical input → identical output

Stability Contract
------------------
- Entry structure is cryptographically bound
- Changing field order or shape is BREAKING
- entry_hash must remain insertion-order independent

This module is safe for incremental append models.
*/

import { hashCanonical } from "./canonical_hash.mjs";

/**
 * Deterministically seal a single ledger entry.
 *
 * @param {number} index
 * @param {Object} event
 * @param {string|null} previous_hash
 *
 * @returns {Object} sealed entry
 */
export function sealEntry({ index, event, previous_hash }) {
  const event_hash = hashCanonical(event);

  const entry = {
    index,
    event_id: event.event_id,
    event_hash,
    previous_hash,
    event
  };

  entry.entry_hash = hashCanonical(entry);

  return entry;
}
