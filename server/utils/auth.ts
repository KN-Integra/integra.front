import { createKysely } from '@vercel/postgres-kysely'

import * as jwt from '~/server/utils/jwt'
import verifyAccess from '~/server/utils/rbac'

import type { NuxtError } from '@nuxt/types'
import type { H3Event } from 'h3'
import type { Database } from '~/models'
import type { AccessResourceMethods } from '~/models/AccessResources'
import type UserPayload from '~/types/UserPayload'

export interface AuthContext {
  id: string
  email: string
  permission: string
}

/**
 * Verify access to a resource
 * @param {H3Event} event The event object
 * @returns {AuthContext | NuxtError} The user context or an error
 */
export async function user(event: H3Event): Promise<AuthContext | NuxtError> {
  const db = createKysely<Database>()
  const header = getHeader(event, 'Authorization')
  const query = getQuery(event)

  if (!header) return createError({ statusCode: 401, message: 'Unauthorized' })

  const [type, token] = header.split(' ')

  let data: UserPayload | Error

  switch (type) {
    case 'Bearer':
      data = await jwt.decrypt<UserPayload>(token)
      break
    default:
      throw createError({ statusCode: 401, message: 'Invalid token type' })
  }

  if (data instanceof Error) {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }

  const usr = await db
    .withSchema('integra')
    .selectFrom('users')
    .innerJoin('permissions', 'users.permission_id', 'permissions.id')
    .select(['users.id', 'users.email', 'permissions.name as permission'])
    .where('email', '=', data.email)
    .where('permissions.name', '!=', 'blocked')
    .executeTakeFirst()

  if (!usr) {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }

  if (usr.permission === 'unverified') {
    throw createError({ statusCode: 401, message: 'Please verify your email' })
  }

  if (usr.permission === 'unverified') {
    return createError({ statusCode: 401, message: 'Please verify your account' })
  }

  if (query.resource) {
    const hasAccess = verifyAccess(
      usr,
      query.resource as string,
      (query.resourceMethod as AccessResourceMethods | undefined) || 'GET'
    )

    if (!hasAccess) {
      return createError({ statusCode: 403, message: 'Forbidden' })
    }
  }

  return { id: usr.id, email: usr.email, permission: usr.permission }
}

/**
 *
 * @param event
 */
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
