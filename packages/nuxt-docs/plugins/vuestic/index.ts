import { VuesticPlugin } from 'vuestic-ui'
import { vuesticConfig } from './config'
import { HeadClient } from '@vueuse/head'
import 'vuestic-ui/styles/vuestic-styles.scss'

export default defineNuxtPlugin(({ vueApp }) => {
  // TODO: Replace with createNuxtVuestic
  vueApp.use(VuesticPlugin as any, vuesticConfig)

  const head = vueApp.config.globalProperties.$head as HeadClient

  head.addHeadObjs(ref({
    htmlAttrs: {
      style: vueApp.config.globalProperties.$vaColorConfig.renderCSSVarialbes()
    }
  }))
})
