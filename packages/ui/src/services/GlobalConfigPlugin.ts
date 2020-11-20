import Vue, { VueConstructor } from 'vue'
import VueCompositionApi, { ref, provide, inject } from '@vue/composition-api'

Vue.use(VueCompositionApi)

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

export function provideGlobalConfig () {
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

  const config = { get, set }

  provide(GLOBAL_CONFIG, config)

  return config
}

/**
 * Plugin provides global config to Vue component through prototype
 */
const GlobalConfigPlugin = {
  install (Vue: VueConstructor, options: GlobalConfig = {}) {
    Vue.mixin({
      setup () {
        const { set } = provideGlobalConfig()

        set(options)
      },
    })
  },
}

export default GlobalConfigPlugin
