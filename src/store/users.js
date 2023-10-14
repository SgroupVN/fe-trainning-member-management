import axios from 'axios'
import { defineStore } from 'pinia'
import { notify } from '@kyvg/vue3-notification'

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    items: [],
    query: '',
    total: 0,
    page: 1,
    itemPerPage: 0,
  }),
  actions: {
    async get(token) {
      const URL =
        'http://localhost:3000/users?query=' + this.query + '&limit=' + this.itemPerPage + '&page=' + this.page
      try {
        const { data: res } = await axios.get(URL, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        const t = this
        setTimeout(function () {
          t.items = res.data.data.items
          t.total = res.data.data.total
        }, 1000)
      } catch (err) {
        notify({
          type: 'error',
          title: 'Error!',
          text: err.response.data.err,
        })
      }
    },
    async add(token, data) {
      const URL = 'http://localhost:3000/users/add'
      try {
        const { data: res } = await axios.post(URL, data, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        return res
      } catch (err) {
        notify({
          type: 'error',
          title: 'Error!',
          text: err.response.data.err,
        })
      }
    },
    async delete(token, id) {
      const URL = 'http://localhost:3000/users/' + id
      try {
        const { data: res } = await axios.delete(URL, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        this.get(token)
        return res
      } catch (err) {
        notify({
          type: 'error',
          title: 'Error!',
          text: err.response.data.err,
        })
      }
    },
  },
})
