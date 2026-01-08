import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('price_cache')
    .addColumn('chain_id', 'text', (col) => col.notNull())
    .addColumn('token', 'text', (col) => col.notNull())
    .addColumn('price_usd', 'numeric', (col) => col.notNull())
    .addColumn('day', 'char(10)', (col) => col.notNull())
    .addColumn('source', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .addPrimaryKeyConstraint('deduplication_key_pk', ["chain_id", "day", "token"])
    .execute();

  await db.schema
    .createTable('daily_usd_volume')
    .addColumn('day', 'char(10)', (col) => col.primaryKey())
    .addColumn('created_volume_usd', 'numeric', (col) => col.notNull())
    .addColumn('fulfilled_volume_usd', 'numeric', (col) => col.notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("price_cache").execute();
  await db.schema.dropTable("daily_usd_volume").execute();
}