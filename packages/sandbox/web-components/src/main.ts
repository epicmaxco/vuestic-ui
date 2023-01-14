import { createApp } from 'vue';
// @ts-ignore
import { registerVuesticWebComponents, VaButton, VaSelect, VaTab, VaTabs, VaConfig } from 'vuestic-ui/web-components'
import { v } from 'vuestic-ui/dist/web-components/src/services/vue-plugin/components'
import 'vuestic-ui/css'
import { kebabCase } from 'lodash'
import App from './App.vue'
import { createI18n } from 'vue-i18n'

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

// const kitchensink = document.getElementById('kitchensink')

// const createDemoDiv = (content: Node, title: string) => {
//   const div = document.createElement('div')
//   const h1 = document.createElement('h1')
//   h1.innerText = title

//   div.appendChild(h1)
//   div.appendChild(content)
//   div.classList.add('kitchensink__demo')

//   return div
// }

// Object.entries(v).forEach(([name, vueComponent]) => {
//   const el = document.createElement(kebabCase(name))
//   ;(el as any).stateful = true

//   const demo = createDemoDiv(el as any, name)

//   kitchensink?.appendChild(demo)
// })

createApp(App).use(i18n).mount('#kitchensink')
