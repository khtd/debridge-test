import { cleanEnv, str, num } from 'envalid'

export const config = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: "development" }),
  SOLANA_RPC_URL: str({ 
    /* devDefault: "https://api.devnet.solana.com", */
    default:  "https://api.mainnet.solana.com",
  }),
  INDEXER_NAME: str({ default: 'dln-indexer' }),
  INDEXER_BATCH_SIZE: num({ default: 50 }),
})