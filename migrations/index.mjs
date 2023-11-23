import { createKysely } from '@vercel/postgres-kysely'
import * as path from 'path'
// import { Pool } from 'pg'
import { promises as fs } from 'fs'
import { Kysely, Migrator, FileMigrationProvider } from 'kysely'

async function migrateToLatest() {
  // const db =
  //   new Kysely() <
  //   Database >
  //   {
  //     dialect: new PostgresDialect({
  //       pool: new Pool({
  //         host: 'localhost',
  //         database: 'kysely_test'
  //       })
  //     })
  //   }

  const db = createKysely()

  Object.defineProperty(db.getExecutor().adapter, 'supportsTransactionalDdl', () => false)

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(process.cwd(), 'migrations')
    })
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

migrateToLatest()