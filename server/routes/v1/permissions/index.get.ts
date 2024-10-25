import { createKysely } from '@vercel/postgres-kysely'

import * as auth from '~/server/utils/auth'

import type { Database } from '~/models'

export default defineEventHandler(async (event) => {
  const db = createKysely<Database>()

  const context = await auth.user(event)

  if (context instanceof Error) {
    return context
  }

  const permissions = await db.withSchema('integra').selectFrom('permissions').select(['id', 'name']).execute()

  return {
    statusCode: 200,
    results: permissions
  }
})
