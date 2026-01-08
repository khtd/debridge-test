import { Effect } from 'effect';
import { NodeRuntime } from '@effect/platform-node';
import { utils } from '@debridge-test/common';
import { PriceEnrichmentService } from './services/PriceEnrichmentService.js';
import { DailyVolumeSerive } from './services/DailyVolumeService.js';

const program = Effect.gen(function* () {
  yield* Effect.log('boot: starting aggregator');

  yield* Effect.all(
    [
      utils.serviceEffect(new PriceEnrichmentService("price_enrichment"), "10 seconds"),
      utils.serviceEffect(new DailyVolumeSerive("daily_volume"), "10 minutes")
    ],
    { concurrency: 'unbounded' }
  );
});

NodeRuntime.runMain(program)