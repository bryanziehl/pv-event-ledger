## Quickstart — Prima Veritas Core

*(Zero setup. Explicit paths only.)*

---

### 📌 Note for Non-Technical Operators

Prima Veritas runs using **PowerShell** — the built-in command window included with Windows.

To open PowerShell:

- Click **Start**
- Type **PowerShell**
- Press **Enter**

You will see:


PS C:>


You do not need programming knowledge.  
Just copy and paste the commands below exactly.

---

## Execution Model

The **Prima Veritas Core** is a reproducible event-ledger engine.

It does **not**:

- connect to external systems  
- install dependencies  
- auto-configure  
- fetch remote data  

Everything is explicit.

---

## 1. Navigate to the Core


cd C:\PRIMA_VERITAS_CORE


---

## 2. Run Verification Tests

These tests confirm that:

- hashing is canonical  
- insertion order does not affect results  
- tampering is detected  
- replay is reproducible  

Run:


node 09_TESTS/canonical_hash_insertion_order.test.mjs
node 09_TESTS/determinism.test.mjs
node 09_TESTS/micro_tamper_detection.test.mjs


If all tests pass, you will see:


✔ canonical hash insertion-order independent
✔ micro ledger + replay deterministic
✔ tamper detected


This confirms the core is sealed and reproducible.

---

## 3. What the Core Actually Does

The core performs:

- canonical ingest  
- canonical normalization  
- atomic event extraction  
- ordered hash-chain ledger construction  
- reproducible replay  
- cryptographic verification  

It does **not**:

- interpret meaning  
- generate conclusions  
- repair inconsistent data  
- produce analytics  

---

## 4. How It Will Be Used in Practice

In real deployments:

1. A system exports structured records  
2. Those records are fed into the core  
3. The core produces:

   - atomic events  
   - a sealed ledger  
   - a canonical ledger hash  

Independent parties can replay and verify the ledger.

Adapters and domain-specific logic live **outside this repository**.

---

## 5. Where to Look Next

Authoritative documents:

- `KERNEL_CHARTER.md`
- `SYSTEM_MAP.md`
- `HEADER_GUIDANCE.md`

These define invariants and scope.

---

## ✅ Done

You have verified:

- canonical hashing  
- insertion-order independence  
- tamper detection  
- replay integrity  

The **Prima Veritas Core** is now live and verifiable on your machine.