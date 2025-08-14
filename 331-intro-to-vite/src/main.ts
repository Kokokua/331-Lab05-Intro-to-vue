// import './assets/main.css'
import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'nprogress/nprogress.css'

import App from './App.vue'
import router from './router'
import { inject } from '@vercel/analytics'

const app = createApp(App)
inject()

app.use(createPinia())
app.use(router)

app.mount('#app')
