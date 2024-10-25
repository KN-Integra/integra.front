import { createKysely } from '@vercel/postgres-kysely'

import * as auth from '~/server/utils/auth'

import type { Database } from '~/models'
import type { GenderType, InsertableUserRow } from '~/models/Users'

interface CreateUserPayload {
  first_name: string
  last_name: string
  gender: GenderType
  email: string
  student_id: number
  permission_id: string
  password: string
  confirm_password: string
}

export default defineEventHandler(async (event) => {
  const db = createKysely<Database>()

  const context = await auth.admin(event)

  const body = (await readBody(event)) as Partial<CreateUserPayload>

  if (context instanceof Error) {
    return context
  }

  if (!(body.password && body.confirm_password)) {
    return createError({
      statusCode: 400,
      message: 'Password and confirm password are required'
    })
  }

  if (body.password !== body.confirm_password) {
    return createError({
      statusCode: 400,
      message: 'Password and confirm password do not match'
    })
  }

  const row = {
    first_name: body.first_name,
    last_name: body.last_name,
    gender: body.gender,
    email: body.email,
    student_id: body.student_id,
    permission_id: body.permission_id,
    password: body.password
  } as InsertableUserRow

  const user = await db
    .withSchema('integra')
    .insertInto('users')
    .values(row)
    .returning(['first_name', 'last_name', 'email'])
    .executeTakeFirst()

  if (!user) {
    return createError({
      statusCode: 500,
      message: 'Failed to create user'
    })
  }

  return {
    statusCode: 200,
    results: user
  }
})
