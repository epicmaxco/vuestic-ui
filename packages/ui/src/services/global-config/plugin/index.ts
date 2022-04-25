import { App } from 'vue'
import { createGlobalConfig, GLOBAL_CONFIG } from '../global-config'
import { GlobalConfig } from '../types'
import { defineGlobalProperty } from '../../../vuestic-plugin/utils'

/** Provides global configuration to Vuestic components */
export const GlobalConfigPlugin = {
  install (app: App, options?: GlobalConfig) {
    const globalConfig = createGlobalConfig()

    if (options) { globalConfig.mergeGlobalConfig(options) }

    app.provide(GLOBAL_CONFIG, globalConfig)

    defineGlobalProperty(app, '$vaConfig', globalConfig)
  },
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $vaConfig: ReturnType<typeof createGlobalConfig>
  }
}
