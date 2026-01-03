import { rpc } from './rpc.js';

export async function getLatestSlot(): Promise<bigint> {
  const slot = await rpc.getSlot({ commitment: 'confirmed' }).send();
  return slot;
}