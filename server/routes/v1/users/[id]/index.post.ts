import { createKysely } from '@vercel/postgres-kysely'

import * as auth from '~/server/utils/auth'

import type { Database } from '~/models'

export interface EditUserPayload {
  first_name: string
  last_name: string
  email: string
  student_id: number
  permission_id: string
}

export default defineEventHandler(async (event) => {
  const db = createKysely<Database>()

  const params = event.context.params

  const body = (await readBody(event)) as Partial<EditUserPayload>

  if (!(params && typeof params.id === 'string')) {
    return createError({
      statusCode: 400,
      message: 'Invalid user ID'
    })
  }

  const context = await auth.user(event)

  if (context instanceof Error) {
    return context
  }

  const { permission, id } = context as auth.AuthContext

  if (permission !== 'admin') {
    if (params.id !== id) {
      return createError({
        statusCode: 403,
        message: 'You do not have permission to edit this user'
      })
    }

    const user = await db
      .updateTable('users')
      .set({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email
      })
      .where('id', '=', params.id)
      .returning(['first_name', 'last_name', 'email'])
      .executeTakeFirst()

    if (!user) {
      return createError({
        statusCode: 404,
        message: 'User not found'
      })
    }

    return {
      statusCode: 200,
      results: user
    }
  }

  const user = await db
    .updateTable('users')
    .set((eb) => ({
      first_name:
        body.first_name || eb.selectFrom('users').select('users.first_name').where('users.id', '=', params.id).limit(1),
      last_name:
        body.last_name || eb.selectFrom('users').select('users.last_name').where('users.id', '=', params.id).limit(1),
      email: body.email || eb.selectFrom('users').select('users.email').where('users.id', '=', params.id).limit(1),
      permission_id:
        body.permission_id ||
        eb.selectFrom('users').select('users.permission_id').where('users.id', '=', params.id).limit(1),
      student_id: body.student_id
        ? Number(body.student_id)
        : eb.selectFrom('users').select('users.student_id').where('users.id', '=', params.id).limit(1)
    }))
    .where('id', '=', params.id)
    .returning(['first_name', 'last_name', 'email', 'permission_id', 'student_id'])
    .executeTakeFirst()

  if (!user) {
    return createError({
      statusCode: 404,
      message: 'User not found'
    })
  }

  return {
    statusCode: 200,
    results: user
  }
})
