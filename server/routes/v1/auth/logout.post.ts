import { createKysely } from '@vercel/postgres-kysely'

import * as auth from '~/server/utils/auth'

import type { Database } from '~/models'

export default defineEventHandler(async (event) => {
  const db = createKysely<Database>()

  const header = getHeader(event, 'Authorization')

  if (!header) {
    return createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const token = header.split(' ')[1]

  const context = await auth.user(event)

  if (!context) {
    return createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { id: userId } = context as auth.AuthContext

  const lastToken = await db
    .withSchema('integra')
    .selectFrom('access_tokens')
    .select('token')
    .where('user_id', '=', userId)
    .where('token', '=', token)
    .orderBy('expires_at', 'desc')
    .executeTakeFirst()

  if (lastToken) {
    await db
      .withSchema('integra')
      .updateTable('access_tokens')
      .set({ expires_at: new Date() })
      .where('token', '=', lastToken.token)
      .execute()
  }

  return {
    statusCode: 200,
    body: { message: 'Logged out' }
  }
})
