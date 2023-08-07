import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user-store',
  persist: true,
  state: () => {
    return {
      email: '',
      accessToken: '',
      tokenType: ''
    }
  },
  actions: {
    logout() {
      this.email = ''
      this.accessToken = ''
      this.tokenType = ''
    },
    async login(email: string, password: string) {
      this.email = email

      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        this.accessToken = data.accessToken
        this.tokenType = data.tokenType

        return data
      }

      throw response
    }
  }
})
