import { Kysely, sql } from 'kysely'

/**
 * @description
 * @param {Kysely<any>} db - The database instance.
 */
export async function up(db) {
  await db.schema
    .createTable('resources')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('name', 'varchar(10)', (col) => col.notNull().unique())
    .addColumn('shop_url', 'varchar', (col) => col.notNull().unique())
    .addColumn('shop_item_id', 'varchar', (col) => col.notNull().unique())
    .addColumn('amount', 'integer', (col) =>
      col.notNull().generatedAlwaysAsIdentity(sql`( INCREMENT 1 START 0 MINVALUE 0 )`)
    )
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute()
}

/**
 * @description
 * @param {Kysely<any>} db - The database instance.
 */
export async function down(db) {
  await db.schema.dropTable('resources').execute()
}
