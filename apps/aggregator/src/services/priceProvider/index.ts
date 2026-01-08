import { config } from "../../config.js";
import { AbstractPriceProvider } from "./AbstractPriceProvider.js";
import { CoingeckoPriceProvider } from "./CoingeckoPriceProvider.js";
import { MockPriceProvider } from "./MockPriceProvider.js";

export const priceProvider: AbstractPriceProvider  =
  config.USE_MOCK_PRICES
    ? new MockPriceProvider()
    : new CoingeckoPriceProvider(config.CG_API_KEY!);