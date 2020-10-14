import OurVue, { VueConstructor } from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $vaGlobalConfig?: {
      value: GlobalConfig;
    };
  }
}

export type GlobalConfig = Record<string, Record<string, any> | undefined>;

/**
 * The global configuration reference
 */
export const globalConfigRef = OurVue.observable({
  value: {
    theme: undefined,
  },
})

type Updater = (config: GlobalConfig) => GlobalConfig;

/**
 * The global configuration's setter
 */
export const setGlobalConfig = (updater: GlobalConfig | Updater) => {
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
 * The global configuration's getter
 */
export const getGlobalConfig = () => {
  return globalConfigRef.value
}

/**
 * Plugin provides global config to Vue component through prototype
 */
const GlobalConfigPlugin = {
  install (Vue: VueConstructor, config: GlobalConfig = {}) {
    setGlobalConfig(config)

    Object.defineProperty(Vue.prototype, '$vaGlobalConfig', {
      configurable: true,
      get () {
        return globalConfigRef.value
      },
    })
  },
}

export default GlobalConfigPlugin
