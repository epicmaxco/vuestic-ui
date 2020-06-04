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
export const globalConfigRef: ContextConfig = OurVue.observable({
  value: {},
})

type Updater = (config: ContextConfig) => ContextConfig;

/**
 * The global configuration's setter
 */
export const setRef = (updater: ContextConfig | Updater) => {
  if (typeof updater === 'function') {
    globalConfigRef.value = { ...globalConfigRef.value, ...updater(globalConfigRef.value) }
  } else {
    globalConfigRef.value = { ...globalConfigRef.value, ...updater }
  }
}

export const TRY_SETTING_CONTEXT_CONFIG_LOCALLY =
  'You cannot set `$vaContextConfig` itself. Use `setRef` instead.'

/**
 * Plugin provides global config to Vue component through prototype
 */
export const ContextPlugin = {
  install (Vue: VueConstructor, config: ContextConfig) {
    setRef(config)

    Object.defineProperty(Vue.prototype, '$vaContextConfig', {
      get () {
        return globalConfigRef.value
      },
      set () {
        throw new Error(TRY_SETTING_CONTEXT_CONFIG_LOCALLY)
      },
      configurable: false,
    })
  },
}
