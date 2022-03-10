import { VuesticPlugin } from 'vuestic-ui'
import { vuesticConfig } from './config'
import 'vuestic-ui/styles/vuestic-styles.scss'

export default defineNuxtPlugin(({ vueApp }) => {
  // TODO: Replace with createNuxtVuestic
  vueApp.use(VuesticPlugin as any, vuesticConfig)
})