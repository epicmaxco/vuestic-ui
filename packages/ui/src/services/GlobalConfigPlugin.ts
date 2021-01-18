import { ref, inject, App } from 'vue'

export type GlobalConfig = Record<string, Record<string, any> | undefined> & { theme?: Record<string, any> };

type Updater = (config: GlobalConfig) => GlobalConfig;

/**
 * The global configuration reference
 */
const globalConfigRef = ref({})

export const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG')

export function useGlobalConfig () {
  const globalConfig = inject(GLOBAL_CONFIG, {} as any)

  return {
    getGlobalConfig: globalConfig.get,
    setGlobalConfig: globalConfig.set,
  }
}

const set = (updater: GlobalConfig | Updater): void => {
  if (typeof updater === 'function') {
    globalConfigRef.value = {
      ...globalConfigRef.value,
      ...updater(globalConfigRef.value),
    }
  } else {
    globalConfigRef.value = { ...globalConfigRef.value, ...updater }
  }
}

const get = (): GlobalConfig => globalConfigRef.value

/**
 * Plugin provides global config to Vue component through prototype
 */
const GlobalConfigPlugin = {
  install (app: App, options: GlobalConfig = {}) {
    const config = { get, set }

    app.provide(GLOBAL_CONFIG, config)

    app.mixin({
      created () {
        set(options)
      },
    })
  },
}

export default GlobalConfigPlugin
