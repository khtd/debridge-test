// packages/db/src/repositories/CheckpointsRepo.ts
import { sql } from 'kysely';
import { db } from '../infra/db.js';
 
export class CheckpointsRepo {
  async getCheckpoint(name: string) {
    return db.selectFrom('checkpoints').selectAll().where('name', '=', name).executeTakeFirst();
  }

  async setCheckpoint(name: string, slot: bigint) {
    await db
      .insertInto('checkpoints')
      .values({ name, last_processed_slot: slot.toString(), updated_at: sql`now()` })
      .onConflict((oc) => oc.column('name').doUpdateSet({ last_processed_slot: slot.toString(), updated_at: sql`now()` }))
      .execute();
  }
}
