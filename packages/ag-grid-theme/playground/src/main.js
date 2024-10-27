import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(createVuestic()).mount('#app')
