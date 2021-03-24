import 'vuestic-ui/dist/vuestic-ui.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { i18n } from 'vue-lang-router'

import { VuesticPlugin } from 'vuestic-ui'

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(VuesticPlugin)
  .mount('#app')
