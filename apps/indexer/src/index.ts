import { Effect } from 'effect';
import { NodeRuntime } from '@effect/platform-node';

import { utils } from '@debridge-test/common';
import { SignaturesFetcherService } from './services/SignaturesFetcherService.js';
import { DLN_PROGRAM } from './types.js';
import { EventParserService } from './services/EventParserService.js';
import { EventProcessorService } from './services/EventProcessorService.js';

const program = Effect.gen(function* () {
  yield* Effect.log('boot: starting indexer');

  yield* Effect.all(
    [
      utils.serviceEffect(new SignaturesFetcherService("sig_fetcher_src", DLN_PROGRAM.src), "30 seconds"),
      utils.serviceEffect(new SignaturesFetcherService("sig_fetcher_dst", DLN_PROGRAM.dst), "30 seconds"),
      utils.serviceEffect(new EventParserService("event_parser"), "1.5 second"),
      utils.serviceEffect(new EventProcessorService("event_processor"), "15 second"),
    ],
    { concurrency: 'unbounded' }
  );
});

NodeRuntime.runMain(program)