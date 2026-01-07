import { AbstractService } from "./AbstractService.js"
import { EventsRepo, OrdersRepo } from '@debridge-test/db';
import { decodeChainId } from "../utils/decoder.js";
import { DLN_PROGRAM, LogType } from "../types.js";

const BATCH_SIZE = 50;

const eventsRepo = new EventsRepo();
const ordersRepo = new OrdersRepo();

type Event = Awaited<ReturnType<EventsRepo["getUnprocessed"]>>[number];

type FulfilledEvent = Omit<Event, "eventType" | "rawData"> & {
  eventType: "Fulfilled";
  rawData: LogType<DLN_PROGRAM.dst>["data"];
}

type CreatedOrderEvent = Omit<Event, "eventType" | "rawData"> & {
  eventType: "CreatedOrder";
  rawData: LogType<DLN_PROGRAM.src>["data"];
}

export class EventProcessorService extends AbstractService {
  constructor(public readonly name: string) {
    super()
  }

  run = async () => {
    let unprocessed = await eventsRepo.countUnprocessed();
    console.log(`runnning event processor for ${unprocessed} events`);
    for (let processed = 0; processed < unprocessed; processed += BATCH_SIZE) {
      const events = await eventsRepo.getUnprocessed(BATCH_SIZE, processed);
      for (const event of events) {
        await this.processEvent(event);
      }
    }
    console.log(`event processor finished`);
  }

  async processEvent(event: Event) {
    if (event.eventType == "CreatedOrder") {
      return this.processCreateorderEvent({
        ...event,
        eventType: "CreatedOrder",
        rawData: event.rawData as unknown as LogType<DLN_PROGRAM.src>["data"],
      });
    }

    if (event.eventType == "Fulfilled") {
      return this.processFulfillOrderEvent({
        ...event,
        eventType: "Fulfilled",
        rawData: event.rawData as unknown as LogType<DLN_PROGRAM.dst>["data"],
      });
    }
  }

  async processCreateorderEvent(event: CreatedOrderEvent) {
    await ordersRepo.insertOrder({
      orderId: event.orderId,
      createdAt: event.blockTime,
      giveAmount: BigInt('0x' + Buffer.from(event.rawData.order.give.amount).toString('hex')).toString(10),
      giveChainId: decodeChainId(event.rawData.order.give.chainId).toString(),
      giveToken: Buffer.from(event.rawData.order.give.tokenAddress).toString("hex"),
      takeAmount: BigInt('0x' + Buffer.from(event.rawData.order.take.amount).toString('hex')).toString(10),
      takeChainId: decodeChainId(event.rawData.order.take.chainId).toString(),
      takeToken: Buffer.from(event.rawData.order.take.tokenAddress).toString("hex"),
    })

    
  }

  async processFulfillOrderEvent(event: FulfilledEvent) {
    const [result] = await ordersRepo.updateOrderByOrderId(event.orderId, { fulfilledAt: event.blockTime });
    if (result.numUpdatedRows > 0) {
      await eventsRepo.markAsProcessed(event.id);
    }
  }
}

