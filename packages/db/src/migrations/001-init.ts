import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('orders')
    .ifNotExists()
    .addColumn('order_id', 'text', (col) => col.primaryKey())
    .addColumn('created_at', 'timestamp', (col) => col.notNull())
    .addColumn('fulfilled_at', 'timestamp')
    .addColumn('src_chain', 'text', (col) => col.notNull())
    .addColumn('dst_chain', 'text', (col) => col.notNull())
    .addColumn('token', 'text', (col) => col.notNull())
    .addColumn('amount', 'numeric', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('order_events')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('order_id', 'text', (col) => col.notNull())
    .addColumn('type', 'text', (col) => col.notNull())
    .addColumn('timestamp', 'timestamp', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('checkpoints')
    .ifNotExists()
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull().unique())
    .addColumn('last_processed_slot', 'text', (col) => col.notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}