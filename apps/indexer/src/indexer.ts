import { getBlock, getLatestSlot } from './utils/solana.js';
import { CheckpointsRepo } from '@debridge-test/db';
import { handleTransaction } from './handlers/handleTransaction.js';
import { config } from './config.js';

const checkpointsRepo = new CheckpointsRepo();

export async function runIndexer() {
  const checkpoint =
    (await checkpointsRepo.getCheckpoint(config.INDEXER_NAME));

  let currentSlot = checkpoint?.lastProcessedSlot ? Number(checkpoint?.lastProcessedSlot) : 391305928; //TEMP

  while (true) {
    const latestSlot = await getLatestSlot();
    const toSlot =
      currentSlot + config.INDEXER_BATCH_SIZE < latestSlot
        ? currentSlot + config.INDEXER_BATCH_SIZE
        : latestSlot;

    if (currentSlot >= toSlot) {
      await sleep(1000);
      continue;
    }

    for (let slot = currentSlot + 1; slot <= toSlot; slot++) {
      const block = await getBlock(slot);

      if (block) {
        console.log(`slot: ${slot} blockhash: ${block.blockhash}, transaction ${block.transactions.length}`)

        const { blockTime } = block;
        if (blockTime == null) {
          console.warn(`skipped block due to NULL blockTime`);
          continue; 
        }
        
        await Promise.all(block.transactions.map((tx => handleTransaction(tx, blockTime))));
      }

      await checkpointsRepo.setCheckpoint(config.INDEXER_NAME, BigInt(slot));
      currentSlot = slot;
    }
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
