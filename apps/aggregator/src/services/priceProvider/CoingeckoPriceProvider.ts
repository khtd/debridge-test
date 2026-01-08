import { AbstractPriceProvider } from "./AbstractPriceProvider.js";
import Coingecko  from '@coingecko/coingecko-typescript';

export class CoingeckoPriceProvider implements AbstractPriceProvider {
  public name = CoingeckoPriceProvider.name;

  private readonly client: Coingecko;
  private chainsList?: Coingecko.AssetPlatforms.AssetPlatformGetResponse
  private coinsList?: Coingecko.Coins.List.ListGetResponse;

  constructor(apiKey: string) {
    this.client = new Coingecko({
      environment: 'pro',
      proAPIKey: apiKey,
    });
  }

  async getDailyPriceUSD(token: string, chainId: number, day: string) {
    const coinId = await this.mapCoin(token, chainId)
    if (!coinId) {
      throw new Error(`could map coin: ${JSON.stringify({ token, chainId, day })}`)
    }

    const data = await this.client.coins.history.get(coinId, {
      date: day
    })
    
    const usdPrice = data.market_data?.current_price?.usd;
    if (!usdPrice) {
      throw new Error(`could not fetch price for coin: ${JSON.stringify({ token, chainId, day })}`)
    }

    return usdPrice;
  }

  async mapCoin(token: string, chainId: number): Promise<string | undefined> {
    this.chainsList ??= await this.client.assetPlatforms.get()
    this.coinsList ??= await this.client.coins.list.get({ include_platform: true });

    const chain = this.chainsList.find(el => el.chain_identifier === chainId);
    if (!chain || !chain.name) {
      console.error(`could not map chain for coingecko: ${chainId}`);
      return;
    }

    const coinId = this.coinsList.find(el => el.platforms![chain.name!] == token);
    return coinId?.id;
  }
}