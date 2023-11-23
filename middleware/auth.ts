import { useUserStore } from '~/store/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()

  if (!(userStore.tokenType && userStore.accessToken)) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
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
      path: '/login',
      query: { redirect: from.fullPath }
    }
  }
})
