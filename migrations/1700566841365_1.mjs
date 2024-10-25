import { Kysely, sql } from 'kysely'

/**
 * @description This migration creates the permissions, users and access_tokens
 * tables. It also creates indexes for the email, student_id and permission_id
 * columns. Finally, it inserts the default permissions into the permissions
 * table.
 * @param {Kysely<any>} db - The database instance.
 */
export async function up(db) {
  await db.schema
    .withSchema('integra')
    .createTable('permissions')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('name', 'varchar(10)', (col) => col.notNull().unique())
    .execute()

  await db
    .withSchema('integra')
    .insertInto('permissions')
    .values({
      name: 'admin'
    })
    .execute()

  await db
    .withSchema('integra')
    .insertInto('permissions')
    .values({
      name: 'moderator'
    })
    .execute()

  await db
    .withSchema('integra')
    .insertInto('permissions')
    .values({
      name: 'user'
    })
    .execute()

  await db
    .withSchema('integra')
    .insertInto('permissions')
    .values({
      name: 'unverified'
    })
    .execute()

  await db
    .withSchema('integra')
    .insertInto('permissions')
    .values({
      name: 'banned'
    })
    .execute()

  const unverifiedPermission = await db
    .withSchema('integra')
    .selectFrom('permissions')
    .select('id')
    .where('name', '=', 'unverified')
    .executeTakeFirst()

  await db.schema
    .withSchema('integra')
    .createTable('users')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('first_name', 'varchar', (col) => col.notNull())
    .addColumn('last_name', 'varchar', (col) => col.notNull())
    .addColumn('gender', 'varchar(10)', (col) => col.notNull())
    .addColumn('student_id', 'integer', (col) => col.notNull().unique())
    .addColumn('email', 'varchar', (col) => col.notNull().unique())
    .addColumn('password', 'varchar', (col) => col.notNull())
    .addColumn('permission_id', 'uuid', (col) =>
      col.references('permissions.id').onDelete('cascade').defaultTo(unverifiedPermission.id).notNull()
    )
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute()

  await db.schema
    .withSchema('integra')
    .createTable('access_tokens')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('user_id', 'uuid', (col) => col.references('users.id').onDelete('cascade').notNull())
    .addColumn('expires_at', 'timestamp', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute()

  await db.schema.withSchema('integra').createIndex('permission_name_index').on('permissions').column('name').execute()
  await db.schema.withSchema('integra').createIndex('user_email_index').on('users').column('email').execute()
  await db.schema.withSchema('integra').createIndex('user_student_id_index').on('users').column('student_id').execute()
  await db.schema
    .withSchema('integra')
    .createIndex('user_permission_id_index')
    .on('users')
    .column('permission_id')
    .execute()
  await db.schema
    .withSchema('integra')
    .createIndex('user_id_access_token_index')
    .on('access_tokens')
    .column('user_id')
    .execute()
}

/**
 * @description This migration drops the permissions, users and access_tokens
 * tables. It also drops the indexes for the email, student_id and permission_id
 * columns.
 * @param {Kysely<any>} db - The database instance.
 */
export async function down(db) {
  await db.schema.withSchema('integra').dropTable('access_token').execute()
  await db.schema.withSchema('integra').dropTable('user').execute()
  await db.schema.withSchema('integra').dropTable('permission').execute()

  await db.schema.withSchema('integra').dropIndex('permission_name_index').on('permissions').execute()
  await db.schema.withSchema('integra').dropIndex('user_email_index').on('users').execute()
  await db.schema.withSchema('integra').dropIndex('user_student_id_index').on('users').execute()
}
