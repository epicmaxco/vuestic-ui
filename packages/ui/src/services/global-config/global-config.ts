import merge from 'lodash/merge.js'
import cloneDeep from 'lodash/cloneDeep.js'
import { ref, inject, getCurrentInstance, Ref } from 'vue'
import { GlobalConfig, GlobalConfigUpdater } from './types'
import { getComponentsAllDefaultConfig, getComponentsDefaultConfig } from './config-default'
import { createIconsConfig } from '../icon-config/icon-config-helpers'
import { colorsPresets } from '../color-config/color-theme-presets'

export type ProvidedGlobalConfig = {
  globalConfig: Ref<GlobalConfig>,
  getGlobalConfig: () => GlobalConfig,
  setGlobalConfig: (updater: GlobalConfig | GlobalConfigUpdater) => void,
  mergeGlobalConfig: (updater: GlobalConfig | GlobalConfigUpdater) => void
}

export const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG')

export const createGlobalConfig = () => {
  const globalConfig = ref<GlobalConfig>({
    colors: colorsPresets.default,
    icons: createIconsConfig({}),
    components: getComponentsDefaultConfig(),
    componentsAll: getComponentsAllDefaultConfig(),
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

export function useGlobalConfig () {
  const globalConfig = inject<ProvidedGlobalConfig>(
    GLOBAL_CONFIG,
    getCurrentInstance()?.appContext.config.globalProperties.$vaConfig,
  )

  if (!globalConfig) {
    throw new Error('Global config plugin is not registered')
  }

  return globalConfig
}

export function setGlobalConfig (updater: GlobalConfig | GlobalConfigUpdater) {
  useGlobalConfig().setGlobalConfig(updater)
}

/** Merge current config with new value */
export function mergeGlobalConfig (updater: GlobalConfig | GlobalConfigUpdater) {
  useGlobalConfig().mergeGlobalConfig(updater)
}

export function getGlobalConfig (): GlobalConfig {
  return useGlobalConfig().getGlobalConfig()
}

export * from './types'
