import axios from 'axios'
import { defineStore } from 'pinia'
import { notify } from '@kyvg/vue3-notification'

export const usePollStore = defineStore({
  id: 'poll',
  state: () => ({
    poll: {},
  }),
  actions: {
    async get(token, id, forced = false) {
      const URL = 'http://localhost:3000/polls/' + id
      try {
        if (this.poll.id !== id) {
          this.poll = {}
        } else if (!forced) {
          return this.poll
        }

        const { data: res } = await axios.get(URL, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })

        const t = this
        setTimeout(function () {
          res.data.totalVotes = res.data.options.reduce((acc, o) => acc + o.users.length + o.is_voted, 0)
          res.data.options.forEach((o) => {
            o.percent = Math.round((o.users.length + o.is_voted / res.data.totalVotes) * 100)
          })
          t.poll = { ...t.poll, ...res.data }
        }, 1000)
      } catch (err) {
        return err
      }
    },
    async add(token, data) {
      const URL = 'http://localhost:3000/polls/' + this.poll.id + '/add'
      try {
        const { data: res } = await axios.post(URL, data, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        if (res) this.get(token, this.poll.id, true)
      } catch (error) {
        console.log(error)
      }
    },
    async delete(token, data) {
      const URL = 'http://localhost:3000/polls/' + this.poll.id + '/delete'
      try {
        const { data: res } = await axios.delete(URL, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
          data: {
            options: data,
          },
        })
        if (res) this.get(token, this.poll.id, true)
      } catch (error) {
        console.log(error)
      }
    },
    async vote(token, data) {
      const URL = 'http://localhost:3000/polls/' + this.poll.id + '/vote/' + data
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
          text: err.response,
        })
      }
    },
  },
})
