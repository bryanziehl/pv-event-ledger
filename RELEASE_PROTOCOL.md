## Prima Veritas Core — Release Protocol

### Structural Change Discipline

Every structural change requires:

- `SYSTEM_MAP.md` update  
- `HEADER_GUIDANCE.md` review  
- Snapshot discipline review  


### Versioning Rules

The `VERSION` file must be incremented when any of the following change:

- Ledger semantics  
- Replay logic  
- Invariant enforcement  
- CLI contract  


### Snapshot Integrity

- No retroactive edits to prior release snapshots.


### Release Verification Requirements

All releases must pass:

- Replay verification  
- Invariant checks  
- CLI integrity checks  


### Release Tagging Convention
