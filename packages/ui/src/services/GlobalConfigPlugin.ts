import OurVue, { VueConstructor } from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $vaGlobalConfig?: {
      value: ContextConfig;
    };
  }
}

export type ContextConfig = Record<string, Record<string, any>>;

/**
 * The global configuration reference
 */
export const globalConfigRef = OurVue.observable({
  value: {},
})

type Updater = (config: ContextConfig) => ContextConfig;

/**
 * The global configuration's setter
 */
export const setGlobalConfig = (updater: ContextConfig | Updater) => {
  if (typeof updater === 'function') {
    globalConfigRef.value = {
      ...globalConfigRef.value,
      ...updater(globalConfigRef.value),
    }
  } else {
    globalConfigRef.value = { ...globalConfigRef.value, ...updater }
  }
}

/**
 * Plugin provides global config to Vue component through prototype
 */
export const GlobalConfigPlugin = {
  install (Vue: VueConstructor, config: ContextConfig) {
    setGlobalConfig(config)

    Object.defineProperty(Vue.prototype, '$vaGlobalConfig', {
      get () {
        return globalConfigRef.value
      },
    })
  },
}
