import { useUserStore } from '~/store/user.store'

import type { RouteLocationNormalized } from '#vue-router'
import type { AuthContext } from '~/server/utils/auth'

/**
 * @description This is a function that returns a redirect object if the user is not logged in.
 * @param {RouteLocationNormalized} to - The route that the user is navigating to.
 * @returns {RouteLocationNormalized} - The redirect object.
 */
export async function adminRouteMiddleware(to: RouteLocationNormalized): Promise<RouteLocationNormalized | void> {
  const userStore = useUserStore()

  if (!(userStore.tokenType && userStore.accessToken)) {
    return {
      path: '/diana/login',
      query: { redirect: to.fullPath },
      redirectedFrom: to.fullPath
    } as unknown as RouteLocationNormalized
  }

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

export default defineNuxtRouteMiddleware((to) => adminRouteMiddleware(to))
