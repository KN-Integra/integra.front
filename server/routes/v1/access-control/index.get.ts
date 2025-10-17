import { createKysely } from '@vercel/postgres-kysely'

import * as auth from '~/server/utils/auth'
import verifyAccess from '~/server/utils/rbac'

import type { NuxtError } from '@nuxt/types'
import type { AccessControlRow } from '~/models/AccessResources'
import type Database from '~/models/Database'

export default defineEventHandler(
  async (
    event
  ): Promise<
    | NuxtError
    | {
        statusCode: number
        results: Partial<AccessControlRow>[]
      }
  > => {
    const db = createKysely<Database>()

    const context = await auth.user(event)

    if (context instanceof Error) {
      return context
    }

    const access = await verifyAccess(context as AuthContext, '/access-control', 'GET')

    if (!access) {
      return createError({ statusCode: 403, message: 'Forbidden' })
    }

    const { permission, id } = context as auth.AuthContext

    if (permission !== 'admin') {
      const accessControl = await db
        .withSchema('integra')
        .selectFrom('access_control')
        .select(['id', 'name', 'method', 'path'])
        .where('user_id', '=', id)
        .execute()

      return {
        statusCode: 200,
        results: accessControl
      }
    }

    const accessControl = await db
      .withSchema('integra')
      .selectFrom('access_control')
      .innerJoin('users', 'access_control.user_id', 'users.id')
      .select([
        'access_control.id',
        'access_control.name',
        'access_control.method',
        'access_control.path',
        'access_control.created_at',
        'users.id as user_id',
        'users.email as user_email',
        'users.first_name as user_first_name',
        'users.last_name as user_last_name'
      ])
      .execute()

    return {
      statusCode: 200,
      results: accessControl
    }
  }
)
