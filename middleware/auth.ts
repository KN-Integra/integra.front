import { useUserStore } from '~~/store/user.store'

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()

  if (!userStore.accessToken) {
    userStore.logout()

    return {
      path: '/diana/login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})
