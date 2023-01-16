import { createApp } from 'vue';
// @ts-ignore
import { registerVuesticWebComponents, VaButton, VaSelect, VaTab, VaTabs, VaConfig } from 'vuestic-ui/web-components'
import { v } from 'vuestic-ui/dist/web-components/src/services/vue-plugin/components'
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


registerVuesticWebComponents({
  components: v,

  css: `
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
}
  `
})

// createApp(App).use(i18n).mount('#kitchensink')
