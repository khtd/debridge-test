import { getTransaction } from "../utils/solana.js";
import { AbstractService } from "./AbstractService.js"
import { DLN_PROGRAMS_DIC } from "./constants.js";
import { EventsRepo, TransactionsRepo } from '@debridge-test/db';
import { decodeOrderId, hasRelevantInstructions, parseLogs } from "../utils/decoder.js";

const transactionsRepo = new TransactionsRepo();
const eventsRepo = new EventsRepo();

export class EventParserService extends AbstractService {
  constructor(public readonly name: string) {
    super()
  }

  run = async () => {
    const transactions = await transactionsRepo.getFirstNUnprocessed(10);
    console.log(`running event parser for the next ${transactions.length} transactions`)
    for (const trx of transactions) {
      await this.processTransaction(trx.signature)
    }

    if (transactions.length > 0) {
      const lastTrx = transactions[transactions.length - 1];
      console.log(`last processed transaction block time - ${lastTrx.blockTime.toISOString()}`)
    }
  }

  async processTransaction(signature: string) {
    const transactionData = await getTransaction(signature);
    if (!transactionData) throw new Error(`transaction ${signature} - failed to fetch`);

    if (hasRelevantInstructions(transactionData, DLN_PROGRAMS_DIC)) {
      const logs = parseLogs(transactionData, DLN_PROGRAMS_DIC);

      if (logs.src) {
        while(logs.src.length > 0) {
          const event = logs.src.shift();
          if (event && event.name == 'CreatedOrder') {
            const nextEvent = logs.src.shift();
            if (!nextEvent || nextEvent.name !== "CreatedOrderId") {
              throw new Error("expectred to find CreatedOrderId after CreatedOrder")
            }

            const orderId = decodeOrderId(nextEvent.data.orderId);

            await eventsRepo.insertEvent({
              eventType: event.name,
              rawData: JSON.stringify(event.data),
              blockTime: new Date(transactionData.blockTime! * 1000),
              slot: transactionData.slot.toString(),
              orderId,
              signature,
              processed: false,
            })
          }
        }
      }

      if (logs.dst) {
        for (const event of logs.dst) {
          if (event.name === "Fulfilled") {
            const orderId = decodeOrderId(event.data.orderId);
            const blockTime = new Date(transactionData.blockTime! * 1000);

            await eventsRepo.insertEvent({
              eventType: event.name,
              rawData: JSON.stringify(event.data),
              blockTime,
              slot: transactionData.slot.toString(),
              orderId,
              signature,
              processed: false,
            })
          }
        }
      }
    }

    const result = await transactionsRepo.markAsProcessed([signature]);
    if (result.numUpdatedRows < 1) throw new Error(`trx for sig ${signature} was not updated`)
  }
}

