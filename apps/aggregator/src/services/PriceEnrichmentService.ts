import { AbstractService } from "./AbstractService.js";
import { OrdersRepo, PriceCacheRepo } from '@debridge-test/db';
import { priceProvider } from "./priceProvider/index.js";

const ordersRepo = new OrdersRepo()
const priceCacheRepo = new PriceCacheRepo();

type Day = string;
type ChainId = string;
type TokenAddress = string;
type PriceCacheKey = `${Day}:${ChainId}:${TokenAddress}`;
type KeyData = {
  day: Day
  chainId: ChainId
  token: TokenAddress
}

export class PriceEnrichmentService extends AbstractService {
  private inMemoryCache = new Map<PriceCacheKey, number>();

  constructor(public readonly name: string) {
    super()
  }

  async run() {
    let unprocessed = await ordersRepo.getOrdersWithoutPrice(100);
    for (const order of unprocessed) {
      const keyData: KeyData = {
        day: extractDay(order.createdAt),
        chainId: order.giveChainId,
        token: order.giveToken,
      }

      const price = await this.getPrice(keyData);
      if (!price) continue;
      
      await ordersRepo.updateOrderByOrderId(order.orderId, { usdAmount: price });
    }
  }

  private async getPrice(keyData: KeyData) {
    const memo = this.inMemoryCache.get(this.keyDataToKey(keyData));
    if (memo) return memo;

    const cached = await priceCacheRepo.getPriceByKey(keyData)
    if (cached) {
      const priceUsd = Number(cached.priceUsd)
      this.inMemoryCache.set(this.keyDataToKey(keyData), priceUsd)
      return priceUsd;
    }

    try {
      const priceUsd = await priceProvider.getDailyPriceUSD(keyData.token, Number(keyData.chainId), keyData.day);
      await priceCacheRepo.insertPrice({
        ...keyData,
        priceUsd,
        source: priceProvider.name,
      })
      this.inMemoryCache.set(this.keyDataToKey(keyData), priceUsd)
      return priceUsd;
    } catch(err) {
      console.error(`failed to get price - ${JSON.stringify(keyData)}`)
      return;
    }
  }

  private keyDataToKey(keyData: KeyData): PriceCacheKey {
    return `${keyData.day}:${keyData.chainId}:${keyData.token}`
  }
}

function extractDay(date: Date) {
  return date.toISOString().slice(0, 10)
}