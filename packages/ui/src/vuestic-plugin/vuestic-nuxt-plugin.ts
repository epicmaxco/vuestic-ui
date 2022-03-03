import { VuesticPlugin } from './vuestic-plugin'
import { VuesticPluginsWithoutComponents } from './vuestic-plugin-without-components'
import type { GlobalConfig } from '../services/global-config/global-config'
import { App } from 'vue'

type NuxtPlugin = (context:{ vueApp: App }) => any

const defineNuxtPlugin = (plugin: NuxtPlugin) => plugin

export const createVuesticNuxtPlugin = (config?: GlobalConfig) => {
  return defineNuxtPlugin(({ vueApp }) => {
    vueApp.use(VuesticPlugin, config)
  })
}

export const createVuesticNuxtPluginWithoutComponents = (config?: GlobalConfig) => {
  return defineNuxtPlugin(({ vueApp }) => {
    vueApp.use(VuesticPluginsWithoutComponents, config)
  })
}
