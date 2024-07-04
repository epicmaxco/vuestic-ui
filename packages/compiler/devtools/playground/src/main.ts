import { createApp } from 'vue'
import App from './App.vue'
import { createVuesticDevtools } from '../../client'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

createApp(App)
  .use(createVuestic())
  .use(createVuesticDevtools())
  .mount('#app')
