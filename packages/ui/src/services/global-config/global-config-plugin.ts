import { App } from 'vue'
import { getGlobalConfig, setGlobalConfig } from './global-config'
import { GlobalConfig } from './types'

export const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG')

type ProvidedGlobalConfig = { get: typeof getGlobalConfig, set: typeof setGlobalConfig }

export const GlobalConfigPlugin = {
  install (app: App, options?: GlobalConfig) {
    if (options) { setGlobalConfig(options) }

    const config = { get: getGlobalConfig, set: setGlobalConfig }

    app.provide<ProvidedGlobalConfig>(GLOBAL_CONFIG, config)
  },
}
