// packages/db/src/repositories/OrdersRepo.ts
import { Insertable } from 'kysely';
import { db } from '../infra/db.js';
import { DB } from '../types.js';

export class OrdersRepo {
  async insertOrder(order: Insertable<DB['orders']>) {
    await db
      .insertInto('orders')
      .values(order)
      .onConflict((oc) => oc.column('order_id').doNothing())
      .execute();
  }

  async getAllOrders() {
    return db.selectFrom('orders').selectAll().execute();
  }
}
