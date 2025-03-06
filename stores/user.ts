import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null as string | null,
    user: null as any | null,
  }),
  
  actions: {
    setToken(token: string) {
      this.token = token
    },
    
    setUser(user: any) {
      this.user = user
    },
    
    clearUser() {
      this.token = null
      this.user = null
    }
  },
  
  persist: true
})
