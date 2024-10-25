import { createKysely } from '@vercel/postgres-kysely'

import * as auth from '~/server/utils/auth'

import type { NuxtError } from '@nuxt/types'
import type Database from '~/models/Database'

export interface BaseUserPayload {
  id: string
  first_name: string
  last_name: string
  email: string
  gender: string
}

export interface AdminUserPayload extends BaseUserPayload {
  permission: string
  student_id: number
  last_login_at: Date
}

export default defineEventHandler(
  async (
    event
  ): Promise<
    | NuxtError
    | {
        statusCode: number
        results: BaseUserPayload[] | AdminUserPayload[]
      }
  > => {
    const db = createKysely<Database>()

    const context = await auth.user(event)

    if (context instanceof Error) {
      return context
    }

    const { permission } = context as auth.AuthContext

    if (permission !== 'admin') {
      const users = (await db
        .withSchema('integra')
        .selectFrom('users')
        .select(['first_name', 'last_name', 'email', 'gender'])
        .execute()) as BaseUserPayload[]

      return {
        statusCode: 200,
        results: users
      }
    }

    const users = (await db
      .withSchema('integra')
      .selectFrom('users')
      .innerJoin('permissions', 'users.permission_id', 'permissions.id')
      .select(({ selectFrom }) => [
        selectFrom('access_tokens')
          .whereRef('users.id', '=', 'access_tokens.user_id')
          .select('access_tokens.created_at')
          .orderBy('access_tokens.created_at', 'desc')
          .limit(1)
          .as('last_login_at')
      ])
      .select([
        'users.id',
        'users.first_name',
        'users.last_name',
        'users.student_id',
        'users.gender',
        'users.email',
        'permissions.name as permission'
      ])
      .execute()) as AdminUserPayload[]

    return {
      statusCode: 200,
      results: users
    }
  }
)
