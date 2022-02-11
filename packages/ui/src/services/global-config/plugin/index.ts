import { App } from 'vue'
import { getGlobalConfig, setGlobalConfig, mergeGlobalConfig } from '../global-config'
import { GlobalConfig } from '../types'

export const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG')

type ProvidedGlobalConfig = { get: typeof getGlobalConfig, set: typeof setGlobalConfig, merge: typeof mergeGlobalConfig }

/** Provides global configuration to Vuestic components */
export const GlobalConfigPlugin = {
  install (app: App, options?: GlobalConfig) {
    if (options) { mergeGlobalConfig(options) }

    const config = { get: getGlobalConfig, set: setGlobalConfig, merge: mergeGlobalConfig }

    app.provide<ProvidedGlobalConfig>(GLOBAL_CONFIG, config)
  },
}
