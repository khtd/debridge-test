import  { type VersionedBlockResponse, PublicKey } from '@solana/web3.js';
import { DlnSrcIdl, DlnDstIdl } from "@debridge-test/dln-idl";
import { BorshCoder } from '@coral-xyz/anchor';
import { config } from '../config.js';
import { DLN_PROGRAM, ProgramDataDic } from './types.js';
import { hasRelevantInstructions, parseLogs } from './utils.js';
import { OrdersRepo, EventsRepo } from '@debridge-test/db';

const ordersRepo = new OrdersRepo()
const eventsRepo = new EventsRepo()

const DLN_PROGRAMS_DIC: ProgramDataDic = {
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

export async function handleTransaction(
  tx: VersionedBlockResponse["transactions"][number],
  blockTime: number,
) {
  if (!hasRelevantInstructions(tx, DLN_PROGRAMS_DIC)) return;
  
  const logs = parseLogs(tx, DLN_PROGRAMS_DIC)

  if (logs.src) {
    while(logs.src.length > 0) {
      const event = logs.src.shift();
      if (event && event.name == 'CreatedOrder') {
        await eventsRepo.insertEvent({
          type: event.name,
          data: JSON.stringify(event.data),
          timestamp: new Date(blockTime * 1000),
        })

        const nextEvent = logs.src.shift();
        if (!nextEvent || nextEvent.name !== "CreatedOrderId") {
          throw new Error("expectred to find CreatedOrderId after CreatedOrder")
        }

        await ordersRepo.insertOrder({
          orderId: decodeOrderId(nextEvent.data.orderId),
          createdAt: new Date(blockTime * 1000),
          giveAmount: BigInt('0x' + Buffer.from(event.data.order.give.amount).toString('hex')).toString(10),
          giveChainId: decodeChainId(event.data.order.give.chainId).toString(),
          giveToken: Buffer.from(event.data.order.give.tokenAddress).toString("hex"),
          takeAmount: BigInt('0x' + Buffer.from(event.data.order.take.amount).toString('hex')).toString(10),
          takeChainId: decodeChainId(event.data.order.take.chainId).toString(),
          takeToken: Buffer.from(event.data.order.take.tokenAddress).toString("hex"),
        })
      }
    }
  }

  if (logs.dst) {
    for (const event of logs.dst) {
      if (event.name === "Fulfilled") {
        await eventsRepo.insertEvent({
          type: event.name,
          data: JSON.stringify(event.data),
          timestamp: new Date(blockTime * 1000),
        })

        const orderId = event.data.orderId;
        await ordersRepo.updateOrderByOrderId(decodeOrderId(orderId), { fulfilledAt: new Date(blockTime * 1000) });
      }
    }
  }
}

function decodeOrderId(orderId: number[]) {
  return Buffer.from(orderId).toString("hex")
}

function decodeChainId(chainIdBytes: number[]): number {
  const hex = Buffer.from(chainIdBytes).toString('hex');
  const value = BigInt('0x' + hex);

  if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error('chainId exceeds JS safe integer range');
  }

  return Number(value);
}