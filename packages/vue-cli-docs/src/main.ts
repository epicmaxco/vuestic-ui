import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from 'vue-lang-router'

import { VuesticPlugin } from 'vuestic-ui/src/main'

createApp(App)
  .use(router)
  .use(i18n)
  .use(VuesticPlugin)
  .mount('#app')
