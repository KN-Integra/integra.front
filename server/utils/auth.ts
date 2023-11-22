import { createKysely } from '@vercel/postgres-kysely'

import * as jwt from '~/server/utils/jwt'

import type { H3Event } from 'h3'
import type { Database } from '~/models'
import type UserPayload from '~/types/UserPayload'

/**
 *
 * @param event
 */
export default async function (event: H3Event) {
  const db = createKysely<Database>()
  const header = getHeader(event, 'Authorization')

  if (!header) return

  const [type, token] = header.split(' ')

  let data: UserPayload

  switch (type) {
    case 'Bearer':
      data = await jwt.decrypt<UserPayload>(token)
      break
    default:
      throw createError({ statusCode: 401, message: 'Invalid token type' })
  }

  const user = await db
    .selectFrom('users')
    .innerJoin('permissions', 'users.permission_id', 'permissions.id')
    .select(['users.id', 'users.email', 'permissions.name as permission_name'])
    .where('email', '=', data.email)
    .where('permissions.name', '!=', 'blocked')
    .executeTakeFirst()

  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }

  if (user.permission_name === 'unverified') {
    throw createError({ statusCode: 401, message: 'Please verify your email' })
  }

  return { id: user.id, email: user.email, permission: user.permission_name }
}
