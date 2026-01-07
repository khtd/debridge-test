// packages/db/src/repositories/EventsRepo.ts
import { Insertable } from 'kysely';
import { db } from '../infra/db.js';
import { DB } from '../infra/db.types.js';

export class EventsRepo {
  async insertEvent(event: Insertable<DB['orderEvents']>) {
    await db.insertInto('orderEvents').values(event).execute();
  }
}
