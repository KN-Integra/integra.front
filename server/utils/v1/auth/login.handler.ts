import { sql } from '@vercel/postgres'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '~~/models/User'

export interface ILoginPayload {
  email: string
  password: string
}

export interface ILoginResponse {
  statusCode: number
  accessToken: string
  tokenType: string
}

export interface IJwtToken {
  email: string
  full_name: string
  permission_level: string
}

/**
 * Login handler
 *
 * @param {ILoginPayload} payload - Login payload
 * @returns {ILoginResponse} Login response
 */
export default async function loginHandler(payload: ILoginPayload): Promise<ILoginResponse | Error> {
  const { PRIVATE_KEY, LOGIN_EXPIRATION_TIMEOUT } = process.env

  if (!(PRIVATE_KEY && LOGIN_EXPIRATION_TIMEOUT)) {
    return new Error('internal server error', {
      cause: 500
    })
  }

  if (!(payload.email && payload.password)) {
    return new Error('email and password are required', {
      cause: 400
    })
  }

  try {
    const { rows } = await sql<User>`
      SELECT u.*, p.* AS permission_level
      FROM IntegraUsers u
      JOIN IntegraPermissions p ON u.permission_level = p.id
      WHERE u.email = ${payload.email}
        AND p.level > 0;
    `

    if (!rows.length) {
      return new Error('user does not exist', {
        cause: 404
      })
    }

    const user = rows[0]

    const verifyPassword = await bcrypt.compare(payload.password, user.password)

    if (!verifyPassword) {
      return new Error('invalid password', {
        cause: 401
      })
    }

    const accessToken = jwt.sign(
      {
        exp: Math.floor((Date.now() + Number(LOGIN_EXPIRATION_TIMEOUT)) / 1000),
        data: {
          full_name: user.full_name,
          email: user.email,
          permission_level: user.permission_level
        }
      },
      PRIVATE_KEY,
      { algorithm: 'RS256' }
    )

    return {
      statusCode: 200,
      accessToken,
      tokenType: 'Bearer'
    }
  } catch {
    return new Error('internal server error', {
      cause: 500
    })
  }
}
