import { Effect, Schedule, pipe } from "effect";
import { DurationInput } from "effect/Duration";

export abstract class AbstractService {
  abstract name: string;
  abstract run(): Promise<void>;
}

export function serviceEffect(service: AbstractService, repeat: DurationInput) {
  const schedule = Schedule.spaced(repeat);
  const program = Effect.gen(function*() {
    console.log(`[${service.name}] starting`)
    const result = yield* Effect.tryPromise({
      try: service.run.bind(service),
      catch: (e) => {
        console.error(`[${service.name}]`, e);
        return e;
      },
    })
    console.log(`[${service.name}] finished`)
    return result
  })

  return Effect.repeat(program, schedule);
}