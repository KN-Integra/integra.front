import { createKysely } from '@vercel/postgres-kysely'

import * as auth from '~/server/utils/auth'

import type { Database } from '~/models'
import type { GenderType } from '~/models/Users'

export interface EditUserPayload {
  first_name: string
  last_name: string
  email: string
  student_id: number
  permission_id: string
  password: string
  confirm_password: string
  gender: GenderType
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

  const currentUser = await db
    .selectFrom('users')
    .select(['first_name', 'last_name', 'gender', 'email', 'password', 'permission_id', 'student_id'])
    .where('users.id', '=', params.id)
    .executeTakeFirst()

  if (body.password !== body.confirm_password) {
    return createError({
      statusCode: 400,
      message: 'Password and confirm password do not match'
    })
  }

  if (!currentUser) {
    return createError({
      statusCode: 404,
      message: 'User not found'
    })
  }

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
        email: body.email || currentUser.email,
        password: body.password || currentUser.password
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
    .set({
      first_name: body.first_name || currentUser.first_name,
      last_name: body.last_name || currentUser.last_name,
      gender: body.gender || currentUser.gender,
      email: body.email || currentUser.email,
      password: body.password || currentUser.password,
      permission_id: body.permission_id || currentUser.permission_id,
      student_id: body.student_id ? Number(body.student_id) : currentUser.student_id
    })
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
