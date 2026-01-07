import  { type VersionedBlockResponse, PublicKey } from '@solana/web3.js';
import { EventParser } from '@coral-xyz/anchor';
import { DLN_PROGRAM, ProgramDataDic, TxParsedLogs, type LogType } from './types.js';
import { utils } from "@coral-xyz/anchor";

export function hasRelevantInstructions(tx: VersionedBlockResponse["transactions"][number], programDataDic: ProgramDataDic) {
  const instructions = [
    ...tx.transaction.message.compiledInstructions.map(({data, ...rest}) => ({ data: Buffer.from(data), ...rest })), 
    ...((tx.meta?.innerInstructions ?? []).flatMap(ii => ii.instructions)).map(({ data, ...rest}) => ({ data: utils.bytes.bs58.decode(data), ...rest })),
  ]

  const accounts = [
    ...(tx.transaction.message.version == "legacy" ? tx.transaction.message.accountKeys : tx.transaction.message.staticAccountKeys), 
    ...(tx.meta?.loadedAddresses?.writable ?? []), 
    ...(tx.meta?.loadedAddresses?.readonly ?? []),
  ].map(acc => new PublicKey(acc))
    
  const hasDLNInstruction = instructions.some(
    (ix) => {
      const programId = accounts[ix.programIdIndex]
      return Object.values(programDataDic).some(prgrm => {
        return true
          && prgrm.programPubkey.equals(programId)
          && prgrm.insructionsToIndex.some(pix => pix == prgrm.coder.instruction.decode(ix.data)?.name)
      });
    }
  );

  return hasDLNInstruction;
}

export function parseLogs(tx: VersionedBlockResponse["transactions"][number], programDataDic: ProgramDataDic): TxParsedLogs {
  const parsed: TxParsedLogs = {}

  for (const program of Object.keys(programDataDic) as DLN_PROGRAM[]) {
    const parser = new EventParser(
      programDataDic[program].programPubkey,
      programDataDic[program].coder
    );

    const logs = [...parser.parseLogs(tx.meta?.logMessages ?? [])];
    if (logs && logs.length > 0) {
      parsed[program] = logs as LogType<any>[]
    }
  }

  return parsed;
}