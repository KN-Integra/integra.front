import { defineStore } from 'pinia'

import type { ILoginResponseBody } from '~/server/routes/v1/auth/login.post'

export const useUserStore = defineStore({
  id: 'user-store',
  persist: true,
  state: () => {
    return {
      accessToken: '',
      tokenType: ''
    }
  },
  actions: {
    async logout() {
      const { data, error } = await useFetch<{ message: string }>('/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${this.tokenType} ${this.accessToken}`
        }
      })

      this.accessToken = ''
      this.tokenType = ''

      if (error.value) {
        if (error.value?.statusCode === 401) {
          return navigateTo('/diana/login')
        }

        throw error
      }

      if (!data.value) throw new Error('No value')

      return navigateTo('/diana/login')
    },
    async login(email: string, password: string) {
      const { data, error } = await useFetch<ILoginResponseBody>('/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          email,
          password
        }
      })

      if (error.value) throw error

      if (!data.value) throw new Error('No value')

      this.accessToken = data.value.accessToken
      this.tokenType = data.value.tokenType
    }
  }
})
