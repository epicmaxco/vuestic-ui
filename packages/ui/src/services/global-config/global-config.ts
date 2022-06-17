import merge from 'lodash/merge.js'
import cloneDeep from 'lodash/cloneDeep.js'
import { ref, inject, Ref } from 'vue'
import { GlobalConfig, GlobalConfigUpdater } from './types'
import { getComponentsDefaultConfig } from './config-default'
import { createIconsConfig } from '../icon-config/icon-config-helpers'
import { colorsPresets } from '../color-config/color-theme-presets'

export type ProvidedGlobalConfig = {
  globalConfig: Ref<GlobalConfig>,
  getGlobalConfig: () => GlobalConfig,
  /**
   * Set new global config
   * @see mergeGlobalConfig if you want to update existing config
   */
  setGlobalConfig: (updater: GlobalConfig | GlobalConfigUpdater) => void,
  mergeGlobalConfig: (updater: GlobalConfig | GlobalConfigUpdater) => void
}

export const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG')

export const createGlobalConfig = () => {
  const globalConfig = ref<GlobalConfig>({
    colors: colorsPresets.default,
    icons: createIconsConfig({}),
    components: getComponentsDefaultConfig(),
  })

  const getGlobalConfig = (): GlobalConfig => globalConfig.value
  const setGlobalConfig = (updater: GlobalConfig | GlobalConfigUpdater) => {
    const config = typeof updater === 'function' ? updater(globalConfig.value) : updater
    globalConfig.value = cloneDeep(config)
  }

  const mergeGlobalConfig = (updater: GlobalConfig | GlobalConfigUpdater) => {
    const config = typeof updater === 'function' ? updater(globalConfig.value) : updater
    globalConfig.value = merge(cloneDeep(globalConfig.value), config)
  }

  return {
    getGlobalConfig,
    setGlobalConfig,
    mergeGlobalConfig,
    globalConfig,
  }
}

/** Use this function if you don't want to throw error if hook used outside setup function by useGlobalConfig */
export function useGlobalConfigSafe () {
  return inject<ProvidedGlobalConfig>(GLOBAL_CONFIG)
}

export function useGlobalConfig () {
  const injected = inject<ProvidedGlobalConfig>(GLOBAL_CONFIG)

  if (!injected) {
    throw new Error('useGlobalConfig must be used in setup function or Vuestic GlobalConfigPluign is not registered')
  }

  return injected
}

export * from './types'
