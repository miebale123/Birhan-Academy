import { defineStore } from 'pinia'
import { authApiService } from '@/features/auth/api/services/authApi.service'

function getFirstName(name = '') {
  const normalizedName = name.trim()
  return normalizedName ? normalizedName.split(/\s+/)[0] : ''
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null,
    isHydrated: false,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.currentUser),
    isFirstSession: (state) => Boolean(state.currentUser?.isFirstSession),
    firstName: (state) => getFirstName(state.currentUser?.name),
    userInitial() {
      return this.firstName ? this.firstName.charAt(0).toUpperCase() : ''
    },
  },
  actions: {
    hydrate() {
      this.currentUser = authApiService.getCurrentUser()
      this.isHydrated = true
    },
    async signIn(credentials) {
      const user = await authApiService.signIn(credentials)
      this.currentUser = user
      this.isHydrated = true
      return user
    },
    async signUp(userData) {
      const user = await authApiService.signUp(userData)
      this.currentUser = user
      this.isHydrated = true
      return user
    },
    signOut() {
      authApiService.signOut()
      this.currentUser = null
      this.isHydrated = true
    },
  },
})
