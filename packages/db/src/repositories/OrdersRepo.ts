// packages/db/src/repositories/OrdersRepo.ts
import { Insertable, UpdateObject } from 'kysely';
import { db } from '../infra/db.js';
import { DB } from '../infra/db.types.js';

export class OrdersRepo {
  async insertOrder(order: Insertable<DB['orders']>) {
    await db
      .insertInto('orders')
      .values(order)
      .onConflict((oc) => oc.column('orderId').doNothing())
      .execute();
  }

  async updateOrderByOrderId(orderId: string, order: UpdateObject<DB, "orders">) {
    return await db
      .updateTable('orders')
      .set(order)
      .where("orderId", "=", orderId)
      .execute();
  }

  async getAllOrders() {
    return db.selectFrom('orders').selectAll().execute();
  }

  async getOrdersWithoutPrice(limit: number) {
    return db
      .selectFrom('orders')
      .selectAll()
      .where('usdAmount', 'is', null)
      .limit(limit)
      .orderBy("createdAt", "asc")
      .execute();
  }
}
