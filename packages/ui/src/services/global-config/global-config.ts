import cloneDeep from 'lodash/cloneDeep.js'
import { Ref, ref } from 'vue'
import { GlobalConfig, GlobalConfigUpdater, PartialGlobalConfig, ProvidedGlobalConfig } from './types'
import { getComponentsDefaultConfig } from '../component-config'
import { getIconDefaultConfig } from '../icon'
import { getColorDefaultConfig } from '../color'
import { getI18nConfigDefaults } from '../i18n'
import { getBreakpointDefaultConfig } from '../breakpoint'
import { inject, provide } from '../current-app'
import { mergeDeep } from '../../utils/merge-deep'
import { getColorsClassesDefaultConfig } from '../colors-classes'

export const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG')

export const createGlobalConfig = (): ProvidedGlobalConfig => {
  const globalConfig = ref<GlobalConfig>({
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
  }) as Ref<GlobalConfig>

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
export function useGlobalConfig () {
  let injected = inject<ProvidedGlobalConfig>(GLOBAL_CONFIG) as ProvidedGlobalConfig

  if (!injected) {
    injected = createGlobalConfig()

    provide(GLOBAL_CONFIG, injected)
  }

  return injected
}

export * from './types'
