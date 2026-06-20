import { create } from 'zustand'
import api from '../lib/api'

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  initializing: true,

  initialize: async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      set({ initializing: false })
      return
    }
    try {
      const res = await api.get('/auth/profile')
      const user = res.data.data
      set({ user, token, isAuthenticated: true, initializing: false })
    } catch {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      set({ user: null, token: null, isAuthenticated: false, initializing: false })
    }
  },

  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { token, user } = res.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ user, token, isAuthenticated: true })
    return user
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
    } catch {
      // ignore
    }
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null, isAuthenticated: false })
  },
}))

export default useAuthStore
