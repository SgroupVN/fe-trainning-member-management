import axios from 'axios'
import { defineStore } from 'pinia'
import { notify } from '@kyvg/vue3-notification'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: {},
  }),
  actions: {
    async get(token, id) {
      const URL = 'http://localhost:3000/users/' + id

      try {
        const { data: res } = await axios.get(URL, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        const t = this
        setTimeout(function () {
          t.userInfo = res.data.data
          if (t.userInfo.gender === 1) t.userInfo.gender = 'male'
          else if (t.userInfo.gender === 0) t.userInfo.gender = 'female'
          else t.userInfo = '---'
        }, 1000)
      } catch (err) {
        return err
      }
    },
    async updateDetail(token, putData) {
      const URL = 'http://localhost:3000/users/' + this.userInfo.id
      try {
        const { data: res } = await axios.put(URL, putData, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        console.log(res)
        this.userInfo = { ...this.userInfo, ...putData }
        return res
      } catch (err) {
        console.log(err)
        notify({
          type: 'error',
          title: 'Error!',
          text: err.response.data.err,
        })
      }
    },
  },
})
