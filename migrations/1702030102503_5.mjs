import { Kysely, sql } from 'kysely'

/**
 * @description
 * @param {Kysely<any>} db - The database instance.
 */
export async function up(db) {
  await db.schema
    .createTable('access_control')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('name', 'varchar(10)', (col) => col.notNull().unique())
    .addColumn('method', 'varchar(10)', (col) => col.notNull())
    .addColumn('path', 'varchar', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) => col.references('users.id').onDelete('cascade').notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute()
}

/**
 * @description
 * @param {Kysely<any>} db - The database instance.
 */
export async function down(db) {
  await db.schema.dropTable('access_control').execute()
}
