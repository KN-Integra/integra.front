import { useUserStore } from '~/store/user.store'

import { authRouteMiddleware } from './auth'

import type { RouteLocationNormalized } from '#vue-router'
import type { AuthContext } from '~/server/utils/auth'

/**
 *
 * @param to
 */
export async function adminRouteMiddleware(): Promise<RouteLocationNormalized | void> {
  const userStore = useUserStore()

  try {
    const { data, error } = await useFetch<{ results: AuthContext }>('/v1/auth/me', {
      headers: {
        Authorization: `${userStore.tokenType} ${userStore.accessToken}`
      }
    })

    if (error.value) {
      throw error.value
    }

    if (!data.value) {
      throw new Error('No data returned')
    }

    const me = data.value.results

    if (me.permission !== 'admin') {
      throw new Error('Permission denied')
    }
  } catch (error) {
    userStore.logout()

    return {
      path: '/diana'
    } as unknown as RouteLocationNormalized
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  const redirect = await authRouteMiddleware(to)

  if (redirect) {
    return redirect
  }

  return await adminRouteMiddleware()
})
