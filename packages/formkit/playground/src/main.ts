import { createApp } from 'vue'
import App from './App.vue'
import { plugin, defaultConfig } from '@formkit/vue'
// @ts-ignore
import 'vuestic-ui/css'
import { createVuestic } from 'vuestic-ui'

createApp(App).use(plugin, defaultConfig).use(createVuestic()).mount('#app')
