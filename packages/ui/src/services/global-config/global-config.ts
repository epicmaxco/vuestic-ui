import cloneDeep from 'lodash/cloneDeep.js'
import { ref, getCurrentInstance, Ref } from 'vue'
import { GlobalConfig, GlobalConfigUpdater, PartialGlobalConfig, ProvidedGlobalConfig } from './types'
import { getComponentsDefaultConfig } from '../component-config'
import { getIconDefaultConfig } from '../icon'
import { getColorDefaultConfig } from '../color'
import { getI18nConfigDefaults } from '../i18n'
import { getBreakpointDefaultConfig } from '../breakpoint'
import { getCurrentApp } from '../current-app'
import { mergeDeep } from '../../utils/merge-deep'
import { getColorsClassesDefaultConfig } from '../colors-classes/config/default'

export const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG')

const getDefaultConfig = () => ({
  colors: getColorDefaultConfig(),
  icons: getIconDefaultConfig(),
  components: getComponentsDefaultConfig(),
  breakpoint: getBreakpointDefaultConfig(),
  i18n: getI18nConfigDefaults(),
  colorsClasses: getColorsClassesDefaultConfig(),
  /**
   * global config variable to pass nuxt-link component to vuestic-ui via @vuestic/nuxt
   * TODO: give a try to integrate inertia js router components via this option
   * TODO: if this try won't be success, may be remake to provide/inject
   */
  routerComponent: undefined,
})

export const createGlobalConfig = (defaultConfig: PartialGlobalConfig = {}) => {
  const globalConfig = ref<GlobalConfig>(mergeDeep(getDefaultConfig(), defaultConfig)) as Ref<GlobalConfig>

  const getGlobalConfig = (): GlobalConfig => globalConfig.value
  const setGlobalConfig = (updater: GlobalConfig | GlobalConfigUpdater<GlobalConfig>) => {
    const config = typeof updater === 'function' ? updater(globalConfig.value) : updater
    globalConfig.value = cloneDeep(config)
  }

  const mergeGlobalConfig = (updater: PartialGlobalConfig | GlobalConfigUpdater<PartialGlobalConfig>) => {
    const config = typeof updater === 'function' ? updater(globalConfig.value as PartialGlobalConfig) : updater
    globalConfig.value = mergeDeep(cloneDeep(globalConfig.value), config)
  }

  return {
    getGlobalConfig,
    setGlobalConfig,
    mergeGlobalConfig,
    globalConfig,
  }
}

export const provideForCurrentApp = <T>(provide: T) => {
  const provides = getCurrentInstance()?.appContext.provides || getCurrentApp()?._context.provides

  if (!provides) { throw new Error('Vue app not found for provide') }

  provides[GLOBAL_CONFIG] = provide

  return provide
}

export { useGlobalConfig } from '../../composables/useGlobalConfig'

export * from './types'
