import { ref, inject, App } from 'vue'

import { getDefaultConfig } from '../components/vuestic-components/va-config/config-default'
import { merge } from 'lodash'
import { colorsPresets } from './color-config/color-theme-presets'
import { ColorConfig } from './color-config/color-config'
import { ComponentConfig } from './component-config/component-config'
import { IconsConfig } from './icon-config/types'

export type GlobalConfig = {
  colors?: ColorConfig,
  icons?: IconsConfig,
  components?: ComponentConfig
};

type Updater = (config: GlobalConfig) => GlobalConfig;

// Global config is singleton and we wrap it into ref for reactivity.
const globalConfigRef = ref<GlobalConfig>({
  colors: colorsPresets.default as ColorConfig,
  components: getDefaultConfig(),
})

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

// We pass global config via provide so that we have a way to override it.
export const GlobalConfigPlugin = {
  install (app: App, options?: GlobalConfig) {
    if (options) { setGlobalConfig(options) }

    const config = { get: getGlobalConfig, set: setGlobalConfig }

    app.provide(GLOBAL_CONFIG, config)
  },
}
