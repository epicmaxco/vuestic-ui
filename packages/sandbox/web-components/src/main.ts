import { createApp } from 'vue';
import { registerVuesticWebComponents } from 'vuestic-ui/web-components'
import 'vuestic-ui/css'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import demos from './demos'

const demosEl = document.querySelector('.demos')

demos.forEach((demo) => {
  demosEl.appendChild(demo)
})


export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {},
})


registerVuesticWebComponents({})
