// apps/indexer/src/handlers/handleTransaction.ts
import type { TransactionForFullJson } from '@solana/kit';
import {  } from "@debridge-test/dln-idl";

export async function handleTransaction(
  tx: TransactionForFullJson<0>,
  slot: bigint
) {
  // tx.transaction.message
  // tx.meta?.logMessages
}
