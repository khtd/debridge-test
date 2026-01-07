import { Effect, Schedule } from "effect";
import { AbstractService } from "../services/AbstractService.js";

export function serviceEffect(service: AbstractService, intervalMs: number) {
  const schedule = Schedule.spaced(`${intervalMs} millis`);

  return Effect.repeat(
    Effect.tryPromise({
      try: service.run,
      catch: (e) => {
        console.error(`[${service.name}]`, e);
        return e;
      },
    }),
    schedule
  );
}