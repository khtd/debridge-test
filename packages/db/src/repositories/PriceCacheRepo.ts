// packages/db/src/repositories/OrdersRepo.ts
import { Selectable, Insertable } from 'kysely';
import { db } from '../infra/db.js';
import { DB } from '../infra/db.types.js';

type Key = Pick<Selectable<DB['priceCache']>, "chainId" |"day" | "token">

export class PriceCacheRepo {
  async insertPrice(value: Insertable<DB['priceCache']>) {
    await db
      .insertInto('priceCache')
      .values(value)
      .onConflict((oc) => oc.constraint('deduplication_key_pk').doNothing())
      .execute();
  }

  async getPriceByKey({ chainId, day, token }: Key) {
    return await db
      .selectFrom('priceCache')
      .selectAll()
      .where("chainId", "=", chainId)
      .where("day", "=", day)
      .where("token", "=", token)
      .executeTakeFirst();
  }
}
