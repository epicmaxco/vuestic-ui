import { merge, cloneDeep } from 'lodash-es'
import { ref } from 'vue'
import { GlobalConfig, GlobalConfigUpdater } from './types'
import { getComponentsAllDefaultConfig, getComponentsDefaultConfig } from './config-default'
import { createIconsConfig } from '../icon-config/icon-config-helpers'
import { colorsPresets } from '../color-config/color-theme-presets'

const globalConfigRef = ref<GlobalConfig>({
  colors: colorsPresets.default,
  icons: createIconsConfig({}),
  components: getComponentsDefaultConfig(),
  componentsAll: getComponentsAllDefaultConfig(),
})

export function setGlobalConfig (updater: GlobalConfig | GlobalConfigUpdater) {
  const config = typeof updater === 'function' ? updater(globalConfigRef.value) : updater
  globalConfigRef.value = cloneDeep(config)
}

/** Merge current config with new value */
export function mergeGlobalConfig (updater: GlobalConfig | GlobalConfigUpdater) {
  const config = typeof updater === 'function' ? updater(globalConfigRef.value) : updater
  globalConfigRef.value = merge(cloneDeep(globalConfigRef.value), config)
}

export function getGlobalConfig (): GlobalConfig {
  return globalConfigRef.value
}

export function useGlobalConfig () {
  return { setGlobalConfig, getGlobalConfig, mergeGlobalConfig, globalConfig: globalConfigRef }
}

export * from './types'
