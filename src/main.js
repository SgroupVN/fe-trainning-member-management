import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'
import router from './router'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(Notifications)

app.mount('#app')
