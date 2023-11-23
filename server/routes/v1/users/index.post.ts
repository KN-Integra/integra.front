import { createKysely } from '@vercel/postgres-kysely'
import type { Database } from '~/models'
import * as auth from '~/server/utils/auth'

interface CreateUserPayload {
  first_name: string
  last_name: string
  email: string
  student_id: number
  permission_id: string
}

export default defineEventHandler(async (event) => {
  const db = createKysely<Database>()

  const context = await auth.admin(event)

  const body = (await readBody(event)) as Partial<CreateUserPayload>

  if (context instanceof Error) {
    return context
  }

  // TODO: Password
  const password = (Math.random() + 1).toString(36).substring(7)

  const user = await db
    .insertInto('users')
    .values({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      student_id: body.student_id,
      permission_id: body.permission_id,
      password: hash(password)
    })
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
