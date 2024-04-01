import { useUserStore } from '~/store/user.store'

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore()

  if (userStore.tokenType && userStore.accessToken) {
    try {
      await useFetch('/v1/auth/me', {
        headers: {
          Authorization: `${userStore.tokenType} ${userStore.accessToken}`
        }
      })

      return {
        path: (to.query.redirect as string | undefined) || '/diana'
      }
    } catch (error) {
      userStore.logout()
    }
  }
})
