import { rpc } from './rpc.js';

export async function getBlock(slot: bigint) {
  return rpc
    .getBlock(slot, {
      commitment: 'confirmed',
      maxSupportedTransactionVersion: 0,
    })
    .send();
}