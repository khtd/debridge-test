import { Effect, Layer, Runtime } from 'effect';
import { NodeRuntime } from '@effect/platform-node';

import { serviceEffect } from './utils/effect.js';
import { SignaturesFetcherService } from './services/SignaturesFetcherService.js';
import { DLN_PROGRAM } from './types.js';
import { EventParserService } from './services/EventParserService.js';
import { EventProcessorService } from './services/EventProcessorService.js';

const program = Effect.gen(function* () {
  yield* Effect.log('boot: starting indexer');

  yield* Effect.all(
    [
      serviceEffect(new SignaturesFetcherService("sig_fetcher_src", DLN_PROGRAM.src), 30_000),
      serviceEffect(new SignaturesFetcherService("sig_fetcher_dst", DLN_PROGRAM.dst), 30_000),
      serviceEffect(new EventParserService("event_parser"), 2_000),
      serviceEffect(new EventProcessorService("event_processor"), 15_000),
    ],
    { concurrency: 'unbounded' }
  );
});

NodeRuntime.runMain(program)