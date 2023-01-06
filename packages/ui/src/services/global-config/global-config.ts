import cloneDeep from 'lodash/cloneDeep.js'
import { ref, getCurrentInstance } from 'vue'
import { GlobalConfig, GlobalConfigUpdater, PartialGlobalConfig, ProvidedGlobalConfig } from './types'
import { getComponentsDefaultConfig } from '../component-config'
import { getIconDefaultConfig } from '../icon'
import { getColorDefaultConfig } from '../color'
import { getI18nConfigDefaults } from '../i18n'
import { getBreakpointDefaultConfig } from '../breakpoint'
import { getGlobalProperty } from '../vue-plugin/utils'
import { inject } from '../current-app'
import { mergeDeep } from '../../utils/merge-deep'

export const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG')

export const createGlobalConfig = () => {
  const globalConfig = ref<GlobalConfig>({
    colors: getColorDefaultConfig(),
    icons: getIconDefaultConfig(),
    components: getComponentsDefaultConfig(),
    breakpoint: getBreakpointDefaultConfig(),
    i18n: getI18nConfigDefaults(),
  })

  const getGlobalConfig = (): GlobalConfig => globalConfig.value
  const setGlobalConfig = (updater: GlobalConfig | GlobalConfigUpdater<GlobalConfig>) => {
    const config = typeof updater === 'function' ? updater(globalConfig.value) : updater
    globalConfig.value = cloneDeep(config)
  }

  const mergeGlobalConfig = (updater: PartialGlobalConfig | GlobalConfigUpdater<PartialGlobalConfig>) => {
    const config = typeof updater === 'function' ? updater(globalConfig.value) : updater
    globalConfig.value = mergeDeep(cloneDeep(globalConfig.value), config)
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
