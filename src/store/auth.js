import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('userData')) || null,
    token: JSON.parse(localStorage.getItem('accessToken')) || null,
  }),
  actions: {
    async login(username, password) {
      try {
        const { data: resData } = await axios.post('http://localhost:3000/auth/login', {
          username: username,
          password: password,
        })

        this.user = resData.data
        this.token = resData.token
        localStorage.setItem('accessToken', JSON.stringify(resData.token))
        localStorage.setItem('userData', JSON.stringify(resData.data))

        return true
      } catch (err) {
        return false
      }
    },
    logout() {
      this.user = this.token = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userData')
    },
  },
})
