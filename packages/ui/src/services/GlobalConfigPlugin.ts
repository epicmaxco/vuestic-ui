import { ref, inject, App } from 'vue'

import { getDefaultConfig } from '../components/vuestic-components/va-config/config-default'
import { DEFAULT_THEME } from './Theme'
import { merge } from 'lodash'

export type Theme = Record<string, any> // TODO: @m0ksem: need better typing
export type GlobalConfig = Record<string, Record<string, any> | undefined> & { theme?: Theme };

type Updater = (config: GlobalConfig) => GlobalConfig;

/**
 * The global configuration reference
 */
const globalConfigRef = ref({
  theme: DEFAULT_THEME as Theme,
  ...getDefaultConfig(),
}) as Record<string, any>

export const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG')

export function useGlobalConfig () {
  const globalConfig = inject(GLOBAL_CONFIG, {} as any)

  return {
    getGlobalConfig: globalConfig?.get,
    setGlobalConfig: globalConfig?.set,
  }
}

const setGlobalConfig = (updater: GlobalConfig | Updater): void => {
  if (typeof updater === 'function') {
    globalConfigRef.value = merge(
      globalConfigRef.value,
      updater(globalConfigRef.value),
    )
  } else {
    globalConfigRef.value = merge(globalConfigRef.value, updater)
  }
}

const getGlobalConfig = (): GlobalConfig => globalConfigRef.value

/**
 * Plugin provides global config to Vue component through prototype
 */
const GlobalConfigPlugin = {
  install (app: App, options?: GlobalConfig) {
    if (options) { setGlobalConfig(options) }

    const config = { get: getGlobalConfig, set: setGlobalConfig }

    app.provide(GLOBAL_CONFIG, config)
  },
}

export default GlobalConfigPlugin
