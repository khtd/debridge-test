// packages/db/src/repositories/EventsRepo.ts
import { Insertable } from 'kysely';
import { db } from '../infra/db.js';
import { DB } from '../types.js';

export class EventsRepo {
  async insertEvent(event: Insertable<DB['order_events']>) {
    await db.insertInto('order_events').values(event).execute();
  }
}
