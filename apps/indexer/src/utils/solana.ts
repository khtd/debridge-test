import { Connection, PublicKey, SolanaJSONRPCError, SolanaJSONRPCErrorCode } from '@solana/web3.js';
import { config } from '../config.js';

export const solanaConnection = new Connection(config.SOLANA_RPC_URL, {
  commitment: 'confirmed',
});

export async function getLatestSlot(): Promise<number> {
  return await solanaConnection.getSlot({ commitment: 'confirmed' });
}

export async function getBlock(slot: number) {
  try {
    return await solanaConnection
      .getBlock(slot, {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 0,
      });
  } catch (err: unknown) {
    if (
      err instanceof SolanaJSONRPCError &&
      err.code == SolanaJSONRPCErrorCode.JSON_RPC_SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED
    ) {
      console.log("here")
      return;
    }

    throw err;
  }
}

export async function getSignaturesForAddress(address: PublicKey, opts: { before?: string; until?: string } = {}) {
  return await solanaConnection.getSignaturesForAddress(
    address,
    { limit: 1000, ...opts }
  );
}

export async function getTransaction(signature: string) {
  return await solanaConnection.getTransaction(signature, {
    commitment: 'confirmed',
    maxSupportedTransactionVersion: 0,
  });
}