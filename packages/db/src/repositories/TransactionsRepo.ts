// packages/db/src/repositories/EventsRepo.ts
import { Insertable } from 'kysely';
import { db } from '../infra/db.js';
import { DB } from '../infra/db.types.js';

export class TransactionsRepo {
  async insertTransactions(transaction: Insertable<DB['transactions']>[]) {
    await db.insertInto('transactions').values(transaction).onConflict(sql => sql.doNothing()).execute();
  }

  async getFirstNUnprocessed(N: number) {
    return await db
      .selectFrom("transactions")
      .selectAll()
      .where("processed", "=", false)
      .orderBy("blockTime", "desc")
      .limit(N)
      .execute()
  }

  async markAsProcessed(signatures: string[]) {
    const [result] = await db
      .updateTable("transactions")
      .where("signature", "in", signatures)
      .set("processed", true)
      .execute()
    return result;
  }
}
