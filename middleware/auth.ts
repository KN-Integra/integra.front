import { useUserStore } from '~/store/user.store'

import type { RouteLocationNormalized } from '#vue-router'

/**
 * @description This is a function that returns a redirect object if the user is not logged in.
 * @param {RouteLocationNormalized} to - The route that the user is navigating to.
 * @returns {RouteLocationNormalized} - The redirect object.
 */
export async function authRouteMiddleware(to: RouteLocationNormalized): Promise<RouteLocationNormalized | void> {
  const userStore = useUserStore()

  if (!(userStore.tokenType && userStore.accessToken)) {
    return {
      path: '/diana/login',
      query: { redirect: to.fullPath },
      redirectedFrom: to.fullPath
    } as unknown as RouteLocationNormalized
  }

  try {
    await useFetch('/v1/auth/me', {
      headers: {
        Authorization: `${userStore.tokenType} ${userStore.accessToken}`
      }
    })
  } catch (error) {
    userStore.logout()

    return {
      path: '/diana/login',
      query: { redirect: to.fullPath },
      redirectedFrom: to.fullPath
    } as unknown as RouteLocationNormalized
  }
}

export default defineNuxtRouteMiddleware((to) => authRouteMiddleware(to))
