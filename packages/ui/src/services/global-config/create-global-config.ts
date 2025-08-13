import { cloneDeep } from 'lodash'
import { ref, Ref } from 'vue'
import { mergeDeep } from '../../utils/merge-deep'
import { PartialGlobalConfig, GlobalConfig, GlobalConfigUpdater } from './types'
import { getBreakpointDefaultConfig } from '../breakpoint'
import { getColorDefaultConfig } from '../color'
import { getColorsClassesDefaultConfig } from '../colors-classes/config/default'
import { getComponentsDefaultConfig } from '../component-config'
import { getI18nConfigDefaults } from '../i18n'
import { getIconDefaultConfig } from '../icon'

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
