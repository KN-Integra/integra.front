import * as auth from '~/server/utils/auth'

import type { NuxtError } from '@nuxt/types'

export default defineEventHandler(
  async (
    event
  ): Promise<
    | NuxtError
    | {
        statusCode: number
        results: auth.AuthContext
      }
  > => {
    const context = await auth.user(event)

    if (context instanceof Error) {
      return context
    }

    return {
      statusCode: 200,
      results: context as auth.AuthContext
    }
  }
)
