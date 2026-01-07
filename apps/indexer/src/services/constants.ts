import { PublicKey } from "@solana/web3.js";
import { DLN_PROGRAM, ProgramDataDic } from "../types.js";
import { IndexerMode } from '@debridge-test/db';
import { config } from "../config.js";
import { DlnDstIdl, DlnSrcIdl } from '@debridge-test/dln-idl';
import { BorshCoder } from "@coral-xyz/anchor";

export const FETCHER_DEFAULT_MODE: IndexerMode = "historical";

export const DLN_PROGRAMS_DIC: ProgramDataDic = {
  [DLN_PROGRAM.src]: {
    programId: config.DLN_SRC_PROGRAM_ID,
    programPubkey: new PublicKey(config.DLN_SRC_PROGRAM_ID),
    idl: DlnSrcIdl,
    coder: new BorshCoder(DlnSrcIdl),
    insructionsToIndex: ["createOrderWithNonce", "createOrder"]
  },
  [DLN_PROGRAM.dst]: {
    programId: config.DLN_DST_PROGRAM_ID,
    programPubkey: new PublicKey(config.DLN_DST_PROGRAM_ID),
    idl: DlnDstIdl,
    coder: new BorshCoder(DlnDstIdl),
    insructionsToIndex: ["fulfillOrder"]
  }
}