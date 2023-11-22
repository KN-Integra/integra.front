import { createKysely } from '@vercel/postgres-kysely'
import Qty from 'js-quantities'

import * as jwt from '~/server/utils/jwt'

import type { Database } from '~/models'
import type UserPayload from '~/types/UserPayload'

const runtimeConfig = useRuntimeConfig()

export interface ILoginRequestBody {
  email: string
  password: string
}

export interface ILoginResponseBody {
  accessToken: string
  tokenType: string
}

export default defineEventHandler(async (event): Promise<ILoginResponseBody | Error> => {
  const db = createKysely<Database>()

  if (!runtimeConfig.JWT_EXPIRES_IN) return createError({ statusCode: 500, message: 'JWT_EXPIRES_IN is not defined' })

  const { email, password } = await readBody(event)

  const user = await db
    .selectFrom('users')
    .innerJoin('permissions', 'users.permission_id', 'permissions.id')
    .select(['users.id', 'users.email', 'permissions.name as permission_name'])
    .where('email', '=', email)
    .where('password', '=', await hash(password))
    .where('permissions.name', '!=', 'blocked')
    .executeTakeFirst()

  if (!user) {
    return createError({ statusCode: 401, message: 'Invalid email or password' })
  }

  if (user.permission_name === 'unverified') {
    return createError({ statusCode: 401, message: 'Please verify your email' })
  }

  const lastToken = await db
    .selectFrom('access_tokens')
    .select('token')
    .where('user_id', '=', user.id)
    .where('expires_at', '>', new Date())
    .orderBy('expires_at', 'desc')
    .executeTakeFirst()

  if (lastToken) {
    try {
      await jwt.decrypt<UserPayload>(lastToken.token)

      return {
        accessToken: lastToken.token,
        tokenType: 'Bearer'
      }
    } catch (error) {
      // console.info('Invalid token', error)
    }
  }

  const token = await jwt.encrypt<UserPayload>({ email })

  db.insertInto('access_tokens')
    .values({
      token,
      user_id: user.id,
      expires_at: new Date(Date.now() + Qty(runtimeConfig.JWT_EXPIRES_IN).to('ms').scalar)
    })
    .execute()

  return {
    accessToken: token,
    tokenType: 'Bearer'
  }
})
