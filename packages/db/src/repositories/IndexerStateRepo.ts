// packages/db/src/repositories/CheckpointsRepo.ts
import { sql } from 'kysely';
import { db } from '../infra/db.js';
import { IndexerMode } from '../infra/db.types.js';

export class IndexerStateRepo {
  async getState(programId: string) {
    return db.selectFrom('indexerState').selectAll().where('programId', '=', programId).executeTakeFirst();
  }

  async setState(programId: string, lastSignature: string, mode: IndexerMode = "historical") {
    await db
      .insertInto('indexerState')
      .values({ programId, lastSignature, mode, updatedAt: sql`now()` })
      .onConflict((oc) => oc.column('programId').doUpdateSet({ lastSignature, mode, updatedAt: sql`now()` }))
      .execute();
  }
}
