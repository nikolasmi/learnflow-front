import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import type { ToastContainerOptions } from 'vue3-toastify'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import 'md-editor-v3/lib/style.css'
import primeVueThemeConfig from './config/primeVueThemeConfig'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'

const app = createApp(App)

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'bottom-left',
  theme: 'colored'
} as ToastContainerOptions)
app.use(PrimeVue, {
  theme: {
    preset: primeVueThemeConfig,
    options: {
      darkModeSelector: '.dark',
      cssLayer: false
    }
  }
})
app.use(ConfirmationService)
app.use(createPinia())

app.use(router)

app.mount('#app')
