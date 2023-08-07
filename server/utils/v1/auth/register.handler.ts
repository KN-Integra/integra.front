import { sql } from '@vercel/postgres'
import bcrypt from 'bcrypt'

export interface IRegisterPayload {
  full_name: string
  email: string
  password: string
}

export interface IRegisterResponse {
  statusCode: number
}

export default async function registerHandler(payload: IRegisterPayload): Promise<IRegisterResponse | Error> {
  if (!(payload.email && payload.password && payload.full_name)) {
    return new Error('full_name, email and password are required', {
      cause: 400
    })
  }

  try {
    const { rows } = await sql`
      SELECT id FROM IntegraUsers WHERE email = ${payload.email};
    `

    if (rows.length) {
      return new Error('user already exists', {
        cause: 409
      })
    }

    const passwordHash = await bcrypt.hash(payload.password, 10)

    await sql`
      INSERT INTO IntegraUsers (id, full_name, email, password, permission_level)
      VALUES (uuid_generate_v4(), ${payload.full_name}, ${payload.email}, ${passwordHash}, (
          SELECT id FROM IntegraPermissions WHERE level = 0
      ))
      RETURNING id;
    `

    return {
      statusCode: 204
    }
  } catch (e) {
    return new Error('internal server error', {
      cause: 500
    })
  }
}
