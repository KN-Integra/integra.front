import { sql } from '@vercel/postgres'
import jwt from 'jsonwebtoken'

import User from '~~/models/User'

import { IJwtToken } from './login.handler'

export default async function getCurrentUserHandler(accessHeader?: string) {
  const { PRIVATE_KEY } = process.env

  if (!PRIVATE_KEY) {
    return new Error('internal server error', {
      cause: 500
    })
  }

  if (!accessHeader) {
    return new Error('unauthorized', {
      cause: 401
    })
  }

  try {
    const decoded = jwt.verify(accessHeader, process.env.PRIVATE_KEY as string) as IJwtToken

    const { rows } = await sql<User>`
      SELECT u.*, p.* AS permission_level
      FROM IntegraUsers u
      JOIN IntegraPermissions p ON u.permission_level = p.id
      WHERE u.email = ${decoded.email}
        AND p.level > 0;
    `

    if (!rows.length) {
      return new Error('user does not exist', {
        cause: 404
      })
    }

    return decoded
  } catch (e) {
    return new Error('unauthorized', {
      cause: 401
    })
  }
}
