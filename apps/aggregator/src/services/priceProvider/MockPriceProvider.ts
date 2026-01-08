import { AbstractPriceProvider } from "./AbstractPriceProvider.js";
import Prando from "prando";

export class MockPriceProvider extends AbstractPriceProvider {
  public name = MockPriceProvider.name;

  async getDailyPriceUSD(token: string, chainId: number, day: string) {
    
    const rnd = new Prando.default(`${day}:${chainId}:${token}`);

    return rnd.nextInt(0.01, 1000);
  }
}