import { Kysely } from 'kysely'

/**
 * @description This migration changes the access tokens table by adding the
 * 'token' column.
 * @param {Kysely<any>} db - The database instance.
 */
export async function up(db) {
  await db.schema.alterTable('access_tokens').addColumn('token', 'varchar').execute()
}

/**
 * @description This migration changes back the access tokens table by removing
 * the 'token' column.
 * @param {Kysely<any>} db - The database instance.
 */
export async function down(db) {
  await db.schema.alterTable('access_tokens').dropColumn('token').execute()
}
