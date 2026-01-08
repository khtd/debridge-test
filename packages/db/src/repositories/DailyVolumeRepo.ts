import { sql } from "kysely";
import { db } from '../infra/db.js';

export class DailyVolumeRepo {
  async getDailyVolume({ from, to }: { to?: string; from?: string } = {}) {
    let q = db
      .selectFrom('dailyUsdVolume')
      .selectAll()
      .orderBy('day', 'asc')

    if (from) q = q.where('day', '>=', from)
    if (to) q = q.where('day', '<=', to)

    return await q.execute()
  }

  async recomputeAll() {
    await db.transaction().execute(async trx => {
      await trx.deleteFrom("dailyUsdVolume").execute();

      await sql`
        insert into daily_usd_volume (
          day,
          created_volume_usd,
          fulfilled_volume_usd
        )
        select
          day,
          sum(created_usd),
          sum(fulfilled_usd)
        from (
          select
            date_trunc('day', created_at)::date as day,
            usd_amount as created_usd,
            0::numeric as fulfilled_usd
          from orders
          where usd_amount is not null

          union all

          select
            date_trunc('day', fulfilled_at)::date as day,
            0::numeric as created_usd,
            usd_amount as fulfilled_usd
          from orders
          where
            usd_amount is not null
            and fulfilled_at is not null
        ) t
        group by day
      `.execute(trx);
    });
  }
}
