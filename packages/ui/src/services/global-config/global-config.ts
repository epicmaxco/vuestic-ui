import { merge, cloneDeep } from 'lodash'
import { ref } from 'vue'
import { GlobalConfig, GlobalConfigUpdater } from './types'
import { getDefaultConfig } from '../../components/vuestic-components/va-config/config-default'
import { createIconsConfig } from '../icon-config/helpers'
import { colorsPresets } from '../color-config/color-theme-presets'

const globalConfigRef = ref<GlobalConfig>({
  colors: colorsPresets.default,
  icons: createIconsConfig({}),
  components: getDefaultConfig(),
})

export function setGlobalConfig (updater: GlobalConfig | GlobalConfigUpdater) {
  if (typeof updater === 'function') {
    const newConfig = updater(globalConfigRef.value)
    globalConfigRef.value = merge(cloneDeep(globalConfigRef.value), newConfig)
  } else {
    globalConfigRef.value = merge(cloneDeep(globalConfigRef.value), updater)
  }
}

export function getGlobalConfig () {
  return globalConfigRef.value
}

export function useGlobalConfig () {
  return { setGlobalConfig, getGlobalConfig, globalConfig: globalConfigRef }
}

export * from './types'
