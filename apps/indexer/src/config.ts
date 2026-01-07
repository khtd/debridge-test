import { cleanEnv, str, num } from 'envalid'

export const config = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: "development" }),
  SOLANA_RPC_URL: str({ 
    /* devDefault: "https://api.devnet.solana.com", */
    default:  "https://api.mainnet.solana.com",
  }),
  INDEXER_NAME: str({ default: 'dln-indexer' }),
  INDEXER_BATCH_SIZE: num({ default: 50 }),
  DLN_SRC_PROGRAM_ID: str({ default: 'src5qyZHqTqecJV4aY6Cb6zDZLMDzrDKKezs22MPHr4' }),
  DLN_DST_PROGRAM_ID: str({ default: 'dst5MGcFPoBeREFAA5E3tU5ij8m5uVYwkzkSAbsLbNo' }),
})