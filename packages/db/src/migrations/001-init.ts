import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createType(`indexer_mode`).asEnum(['historical', 'live']).execute()

  await db.schema
    .createTable('indexer_state')
    .addColumn('program_id', 'text', (col) => col.primaryKey())
    .addColumn('last_signature', 'text', (col) => col.notNull().unique())
    .addColumn('mode', sql`indexer_mode`, (col) => col.notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable('transactions')
    .addColumn('signature', 'text', (col) => col.primaryKey())
    .addColumn('slot', 'text', (col) => col.notNull())
    .addColumn('block_time', 'timestamptz', (col) => col.notNull())
    .addColumn('program_id', 'text', (col) => col.notNull())
    .addColumn('processed', 'boolean', (col) => col.notNull().defaultTo(false))
    .execute();

  await db.schema
    .createTable('events')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('signature', 'text', (col) => col.references(`transactions.signature`).notNull())
    .addColumn('slot', 'text', (col) => col.notNull())
    .addColumn('block_time', 'timestamptz', (col) => col.notNull())
    .addColumn('event_type', 'text', (col) => col.notNull())
    .addColumn('order_id', 'char(64)', (col) => col.notNull())
    .addColumn('raw_data', 'jsonb', (col) => col.notNull())
    .addColumn('processed', 'boolean', (col) => col.notNull().defaultTo(false))
    .execute();

  await db.schema
    .createTable('orders')
    .ifNotExists()
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
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("events").execute();
  await db.schema.dropTable("orders").execute();
  await db.schema.dropTable("indexer_state").execute();
  await db.schema.dropType(`indexer_mode`).ifExists().execute()
  await db.schema.dropTable("transactions").execute();
}