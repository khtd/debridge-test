// apps/indexer/src/indexer.ts
import { getLatestSlot } from './solana/slots.js';
import { getBlock } from './solana/blocks.js';
import { CheckpointsRepo } from '@debridge-test/db';
import { handleTransaction } from './handlers/handleTransaction.js';
import { config } from './config.js';

const checkpointsRepo = new CheckpointsRepo();

export async function runIndexer() {
  const checkpoint =
    (await checkpointsRepo.getCheckpoint(config.INDEXER_NAME));

  let currentSlot = BigInt(checkpoint?.last_processed_slot ?? 0);

  while (true) {
    const latestSlot = await getLatestSlot();
    const toSlot =
      currentSlot + BigInt(config.INDEXER_BATCH_SIZE) < latestSlot
        ? currentSlot + BigInt(config.INDEXER_BATCH_SIZE)
        : latestSlot;

    if (currentSlot >= toSlot) {
      await sleep(1000);
      continue;
    }

    for (let slot = currentSlot + BigInt(1); slot <= toSlot; slot++) {
      const block = await getBlock(slot);
      if (!block) continue;

      for (const tx of block.transactions) {
        await handleTransaction(tx, slot);
      }

      await checkpointsRepo.setCheckpoint(config.INDEXER_NAME, slot);
      currentSlot = slot;
    }
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
