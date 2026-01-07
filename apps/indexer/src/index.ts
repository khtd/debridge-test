import { runIndexer } from './indexer.js';

runIndexer().catch((err) => {
  console.error('Indexer crashed', err);
  process.exit(1);
});