import { mergeDeep } from './../../../utils/merge-deep'
import cloneDeep from 'lodash/cloneDeep'
import { provide, computed, Ref } from 'vue'
import { useGlobalConfig } from '../../../composables'
import { GLOBAL_CONFIG, GlobalConfig, GlobalConfigUpdater, PartialGlobalConfig } from '../../../services/global-config'

export const useGlobalConfigProvider = (next: Ref<PartialGlobalConfig>) => {
  const { globalConfig } = useGlobalConfig()

  const nextChain = computed(() => {
    const gcCopy = cloneDeep(globalConfig.value)
    const compiledCopy: GlobalConfig = {
      ...gcCopy,
      colors: {
        ...gcCopy.colors,
        get variables () {
          return this.presets[this.currentPresetName]
        },
        set variables (value) {
          this.presets[this.currentPresetName] = value
        },
      },
    }

    return mergeDeep(compiledCopy, next.value) as GlobalConfig
  })

  const getGlobalConfig = (): GlobalConfig => nextChain.value
  const setGlobalConfig = (updater: GlobalConfig | GlobalConfigUpdater<GlobalConfig>) => {
    throw new Error('setGlobalConfig can not be used in VaConfig')
  }

  const mergeGlobalConfig = (updater: PartialGlobalConfig | GlobalConfigUpdater<PartialGlobalConfig>) => {
    throw new Error('mergeGlobalConfig can not be used in VaConfig')
  }

  provide(GLOBAL_CONFIG, {
    getGlobalConfig,
    setGlobalConfig,
    mergeGlobalConfig,
    globalConfig: nextChain,
  })

  return nextChain
}
