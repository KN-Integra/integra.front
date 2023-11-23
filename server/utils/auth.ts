import { createKysely } from '@vercel/postgres-kysely'

import * as jwt from '~/server/utils/jwt'

import type { NuxtError } from '@nuxt/types'
import type { H3Event } from 'h3'
import type { Database } from '~/models'
import type UserPayload from '~/types/UserPayload'

export interface AuthContext {
  id: string
  email: string
  permission: string
}

/**
 *
 * @param event
 */
export async function user(event: H3Event): Promise<AuthContext | NuxtError> {
  const db = createKysely<Database>()
  const header = getHeader(event, 'Authorization')

  if (!header) return createError({ statusCode: 401, message: 'Unauthorized' })

  const [type, token] = header.split(' ')

  let data: UserPayload

  switch (type) {
    case 'Bearer':
      data = await jwt.decrypt<UserPayload>(token)
      break
    default:
      throw createError({ statusCode: 401, message: 'Invalid token type' })
  }

  const usr = await db
    .selectFrom('users')
    .innerJoin('permissions', 'users.permission_id', 'permissions.id')
    .select(['users.id', 'users.email', 'permissions.name as permission_name'])
    .where('email', '=', data.email)
    .where('permissions.name', '!=', 'blocked')
    .executeTakeFirst()

  if (!usr) {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }

  if (usr.permission_name === 'unverified') {
    throw createError({ statusCode: 401, message: 'Please verify your email' })
  }

  return { id: usr.id, email: usr.email, permission: usr.permission_name }
}

export async function admin(event: H3Event): Promise<AuthContext | NuxtError> {
  const context = await user(event)

  if (context instanceof Error) {
    return context
  }

  if ((context as AuthContext).permission !== 'admin') {
    throw createError({ statusCode: 403, message: 'Permission denied' })
  }

  return context
}
