import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('orders')
    .addColumn('order_id', 'char(64)', (col) => col.primaryKey())
    .addColumn('created_at', 'timestamp', (col) => col.notNull())
    .addColumn('fulfilled_at', 'timestamp')
    .addColumn('give_chain_id', 'text', (col) => col.notNull())
    .addColumn('give_token', 'text', (col) => col.notNull())
    .addColumn('give_amount', 'text', (col) => col.notNull())
    .addColumn('take_chain_id', 'text', (col) => col.notNull())
    .addColumn('take_token', 'text', (col) => col.notNull())
    .addColumn('take_amount', 'text', (col) => col.notNull())
    .addColumn('usd_amount', 'numeric')
    .execute();

  await db.schema
    .createTable('order_events')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('type', 'text', (col) => col.notNull())
    .addColumn('timestamp', 'timestamp', (col) => col.notNull())
    .addColumn('data', 'jsonb', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('checkpoints')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull().unique())
    .addColumn('last_processed_slot', 'text', (col) => col.notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("checkpoints").execute();
  await db.schema.dropTable("order_events").execute();
  await db.schema.dropTable("orders").execute();
}