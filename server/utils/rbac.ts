import { createKysely } from '@vercel/postgres-kysely'

import type { Database } from '~/models'
import type { AccessResourceMethods } from '~/models/AccessResources'

/**
 * @description Verify if the user has access to the resource
 * @param context
 * @param route
 * @param method
 * @returns {Promise<boolean>} - true if the user has access to the resource
 */
export default async function verifyAccess(
  context: AuthContext,
  route: string,
  method: AccessResourceMethods
): Promise<boolean> {
  try {
    if (context.permission === 'admin') {
      return true
    }

    const db = createKysely<Database>()

    const accessControl = await db
      .withSchema('integra')
      .selectFrom('access_control')
      .select(['method', 'path'])
      .where('user_id', '=', context.id)
      .execute()

    for (const ac of accessControl) {
      const regex = new RegExp(ac.path)

      if (ac.method === method && regex.test(route)) {
        return true
      }
    }

    return false
  } catch (err) {
    return false
  }
}
