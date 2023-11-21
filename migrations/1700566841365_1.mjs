import { sql } from 'kysely'

/**
 * @description This migration creates the tables for the users, permissions and access tokens.
 * The permissions table is populated with the default permissions.
 * The users table has a foreign key to the permissions table.
 * The access tokens table has a foreign key to the users table.
 * The permissions table has an index on the name column.
 * The users table has an index on the email column.
 * The users table has an index on the student_id column.
 * The users table has an index on the permission_id column.
 * The access tokens table has an index on the user_id column.
 * @param {import('kysely').Kysely} db - The database connection.
 */
export async function up(db) {
  await db.schema
    .createTable('permissions')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('name', 'varchar(10)', (col) => col.notNull().unique())
    .execute()

  await db
    .insertInto('permissions')
    .values({
      name: 'admin'
    })
    .execute()

  await db
    .insertInto('permissions')
    .values({
      name: 'moderator'
    })
    .execute()

  await db
    .insertInto('permissions')
    .values({
      name: 'user'
    })
    .execute()

  await db
    .insertInto('permissions')
    .values({
      name: 'unverified'
    })
    .execute()

  await db
    .insertInto('permissions')
    .values({
      name: 'banned'
    })
    .execute()

  const unverifiedPermission = await db
    .selectFrom('permissions')
    .select('id')
    .where('name', '=', 'unverified')
    .executeTakeFirst()

  await db.schema
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
    .createTable('access_tokens')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('user_id', 'uuid', (col) => col.references('users.id').onDelete('cascade').notNull())
    .addColumn('expires_at', 'timestamp', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute()

  await db.schema.createIndex('permission_name_index').on('permissions').column('name').execute()
  await db.schema.createIndex('user_email_index').on('users').column('email').execute()
  await db.schema.createIndex('user_student_id_index').on('users').column('student_id').execute()
  await db.schema.createIndex('user_permission_id_index').on('users').column('permission_id').execute()
  await db.schema.createIndex('user_id_access_token_index').on('access_tokens').column('user_id').execute()
}

/**
 * @description This migration drops the tables for the users, permissions and access tokens.
 * This is the opposite of the up migration.
 * @param {import('kysely').Kysely} db - The database connection.
 */
export async function down(db) {
  await db.schema.dropTable('access_token').execute()
  await db.schema.dropTable('user').execute()
  await db.schema.dropTable('permission').execute()
}
