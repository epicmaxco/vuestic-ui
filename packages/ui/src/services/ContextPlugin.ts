import OurVue, { VueConstructor } from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $vaContextConfig?: ContextConfig;
  }
}

export type ContextConfig = Record<string, Record<string, any>>

/**
 * The global configuration reference
 */
export const GlobalConfig: ContextConfig = OurVue.observable({})

/**
 * Plugin provides global config to Vue component through prototype
 */
export const ContextPlugin = {
  install (Vue: VueConstructor, config: ContextConfig) {
    Vue.prototype.$vaContextConfig = Object.assign(GlobalConfig, config)
  },
}

type Updater = (config: ContextConfig) => ContextConfig

/**
 * The global configuration's setter
 */
export const setRef = (updater: ContextConfig | Updater) => {
  if (typeof updater === 'function') {
    Object.assign(GlobalConfig, updater(GlobalConfig))
  } else {
    Object.assign(GlobalConfig, updater)
  }
}
