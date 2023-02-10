import cloneDeep from 'lodash/cloneDeep.js'
import { ref, getCurrentInstance } from 'vue'
import { GlobalConfig, GlobalConfigUpdater, PartialGlobalConfig, ProvidedGlobalConfig } from './types'
import { getComponentsDefaultConfig } from '../component-config'
import { getIconDefaultConfig } from '../icon'
import { getColorDefaultConfig } from '../color'
import { getI18nConfigDefaults } from '../i18n'
import { getBreakpointDefaultConfig } from '../breakpoint'
import { getGlobalProperty } from '../vue-plugin/utils'
import { getCurrentApp, inject } from '../current-app'
import { mergeDeep } from '../../utils/merge-deep'
import { getColorsClassesDefaultConfig } from '../colors-classes'

export const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG')

export const createGlobalConfig = () => {
  const globalConfig = ref<GlobalConfig>({
    colors: getColorDefaultConfig(),
    icons: getIconDefaultConfig(),
    components: getComponentsDefaultConfig(),
    breakpoint: getBreakpointDefaultConfig(),
    i18n: getI18nConfigDefaults(),
    colorsClasses: getColorsClassesDefaultConfig(),
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

const provideForCurrentApp = <T>(provide: T) => {
  const provides = getCurrentInstance()?.appContext.provides || getCurrentApp()?._context.provides

  if (!provides) { throw new Error('Vue app not found for provide') }

  provides[GLOBAL_CONFIG] = provide

  return provide
}

/** Use this function if you don't want to throw error if hook used outside setup function by useGlobalConfig */
export function useGlobalConfig () {
  let injected = inject<ProvidedGlobalConfig>(GLOBAL_CONFIG) as ProvidedGlobalConfig

  if (!injected) {
    injected = createGlobalConfig()

    provideForCurrentApp(injected)
  }

  return injected
}

export * from './types'
