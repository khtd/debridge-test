// packages/db/src/repositories/EventsRepo.ts
import { Insertable } from 'kysely';
import { db } from '../infra/db.js';
import { DB } from '../infra/db.types.js';

export class EventsRepo {
  async insertEvent(event: Insertable<DB['events']>) {
    await db.insertInto('events').values(event).execute();
  }

  async getUnprocessed(limit: number, offset: number = 0) {
    return await db
      .selectFrom("events")
      .selectAll()
      .where("processed", "=", false)
      .orderBy("blockTime", "asc")
      .limit(limit)
      .offset(offset)
      .execute()
  }

  async countUnprocessed() {
    const result =  await db
      .selectFrom("events")
      .select((eb) => [
        eb.fn.countAll().as('count'),
      ])
      .where("processed", "=", false)
      .execute();

    return Number(result[0].count)
  }

  async markAsProcessed(id: number) {
    await db
      .updateTable("events")
      .where("id", "=", id)
      .set("processed", true)
      .execute()
  }
}
