import { VuesticPlugin } from './vuestic-plugin'
import { VuesticPluginsWithoutComponents } from './vuestic-plugin-without-components'
import type { GlobalConfig } from '../services/global-config/global-config'
import { App } from 'vue'

type NuxtPlugin = (context:{ vueApp: App }) => any

const defineNuxtPlugin = (plugin: NuxtPlugin) => plugin

export const createVuesticNuxtPlugin = (config?: GlobalConfig, registerComponentsGlobally = true) => {
  return defineNuxtPlugin(({ vueApp }) => {
    if (registerComponentsGlobally) {
      vueApp.use(VuesticPlugin, config)
    } else {
      vueApp.use(VuesticPluginsWithoutComponents, config)
    }
  })
}
