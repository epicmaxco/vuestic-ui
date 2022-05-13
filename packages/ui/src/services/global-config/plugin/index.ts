import { App } from 'vue'
import { createGlobalConfig, GLOBAL_CONFIG } from '../global-config'
import { GlobalConfig } from '../types'
import { defineGlobalProperty, defineVuesticPlugin } from '../../../vuestic-plugin/utils'

/** Provides global configuration to Vuestic components */
export const GlobalConfigPlugin = defineVuesticPlugin((config: GlobalConfig | undefined) => ({
  install (app: App) {
    const globalConfig = createGlobalConfig()

    if (config) { globalConfig.mergeGlobalConfig(config) }

    app.provide(GLOBAL_CONFIG, globalConfig)

    defineGlobalProperty(app, '$vaConfig', globalConfig)
  },
}))

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $vaConfig: ReturnType<typeof createGlobalConfig>
  }
}
