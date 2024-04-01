import { Kysely } from 'kysely'

/**
 * @description This migration changes the permissions table by renaming the
 * 'banned' permission to 'blocked' and removing the 'moderator' permission.
 * @param {Kysely<any>} db - The database instance.
 */
export async function up(db) {
  await db
    .updateTable('permissions')
    .set({
      name: 'blocked'
    })
    .where('name', '=', 'banned')
    .execute()

  await db.deleteFrom('permissions').where('name', '=', 'moderator').execute()
}

/**
 * @description This migration changes back the permissions table by renaming the
 * 'blocked' permission to 'banned' and adding the 'moderator' permission.
 * @param {Kysely<any>} db - The database instance.
 */
export async function down(db) {
  await db
    .updateTable('permissions')
    .set({
      name: 'banned'
    })
    .where('name', '=', 'blocked')
    .execute()

  await db
    .insertInto('permissions')
    .values({
      name: 'moderator'
    })
    .execute()
}
