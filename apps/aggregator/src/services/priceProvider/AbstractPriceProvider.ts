export abstract class AbstractPriceProvider {
  abstract name: string;
  abstract getDailyPriceUSD(
    token: string,
    chainId: number,
    day: string
  ): Promise<number>;
}