import merge from 'lodash/merge.js'
import cloneDeep from 'lodash/cloneDeep.js'
import { ref, inject, Ref, getCurrentInstance } from 'vue'
import { GlobalConfig, GlobalConfigUpdater } from './types'
import { getComponentsDefaultConfig } from './config-default'
import { createIconsConfig } from '../icon-config/icon-config-helpers'
import { colorsPresets } from '../color-config/color-theme-presets'
import { getBreakpointDefaultConfig } from '../breakpoint'
import { getGlobalProperty } from '../../vuestic-plugin/utils'

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
    breakpoint: getBreakpointDefaultConfig(),
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

export function useGlobalConfig (): ProvidedGlobalConfig {
  const injected = inject<ProvidedGlobalConfig>(GLOBAL_CONFIG)

  if (!injected) {
    // TODO: Hotfix, maybe deal with inject
    const vm = getCurrentInstance()
    if (!vm) { throw new Error('useGlobalConfig must be called in setup function') }

    const config = getGlobalProperty(vm.appContext, '$vaConfig')

    if (!config) {
      throw new Error('Vuestic GlobalConfigPlugin is not registered')
    }

    return config
  }

  return injected
}

export * from './types'
