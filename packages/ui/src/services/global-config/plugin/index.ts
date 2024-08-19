import { App } from 'vue'
import { createGlobalConfig, GLOBAL_CONFIG } from '../global-config'
import { PartialGlobalConfig } from '../types'
import { defineGlobalProperty, defineVuesticPlugin } from '../../vue-plugin/utils'

/** Provides global configuration to Vuestic components */
export const GlobalConfigPlugin = defineVuesticPlugin((config: PartialGlobalConfig | undefined = {}) => ({
  install (app: App) {
    const globalConfig = createGlobalConfig(config)

    // @ts-ignore
    if (config?.componentsAll) {
      console.warn('Global config -> `componentsAll` was moved to Global config -> components.all. ' +
        'Please replace this to make it work. ' +
        'More info here: https://github.com/epicmaxco/vuestic-ui/issues/1967')
    }

    app.provide(GLOBAL_CONFIG, globalConfig)

    defineGlobalProperty(app, '$vaConfig', globalConfig)
  },
}))

declare module 'vue' {
  export interface ComponentCustomProperties {
    $vaConfig: ReturnType<typeof createGlobalConfig>
  }
}
