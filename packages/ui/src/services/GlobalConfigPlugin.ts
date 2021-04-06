import { ref, inject, App } from 'vue'

import { getDefaultConfig } from '../components/vuestic-components/va-config/config-default'
import { mergeWith } from 'lodash'
import { colorsPresets } from './color-config/color-theme-presets'
import { ColorConfig } from './color-config/color-config'
import { ComponentConfig } from './component-config/component-config'
import { IconsConfig } from './icon-config/types'
import { createIconsConfig } from './icon-config/helpers'

export type GlobalConfig = {
  colors?: ColorConfig,
  icons?: IconsConfig,
  components?: ComponentConfig
};

export type GlobalConfigUpdater = (config: GlobalConfig) => GlobalConfig;

// Global config is singleton and we wrap it into ref for reactivity.
const globalConfigRef = ref<GlobalConfig>({
  colors: colorsPresets.default as ColorConfig,
  icons: createIconsConfig({}),
  components: getDefaultConfig(),
})

export const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG')

function replaceArrayCustomizer (objValue: any[], srcValue: any[]) {
  if (Array.isArray(srcValue)) {
    return srcValue
  }
}

export const setGlobalConfig = (updater: GlobalConfig | GlobalConfigUpdater): void => {
  if (typeof updater === 'function') {
    globalConfigRef.value = mergeWith(
      globalConfigRef.value,
      updater(globalConfigRef.value),
      replaceArrayCustomizer,
    )
  } else {
    globalConfigRef.value = mergeWith(globalConfigRef.value, updater, replaceArrayCustomizer)
  }
}

export const getGlobalConfig = (): GlobalConfig => globalConfigRef.value

type ProvidedGlobalConfig = { get: typeof getGlobalConfig, set: typeof setGlobalConfig }

// We pass global config via provide so that we have a way to override it.
export const GlobalConfigPlugin = {
  install (app: App, options?: GlobalConfig) {
    if (options) { setGlobalConfig(options) }

    const config = { get: getGlobalConfig, set: setGlobalConfig }

    app.provide<ProvidedGlobalConfig>(GLOBAL_CONFIG, config)
  },
}

export function useGlobalConfig () {
  return { getGlobalConfig, setGlobalConfig }
}
