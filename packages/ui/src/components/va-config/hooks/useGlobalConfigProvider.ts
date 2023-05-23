import { mergeDeep } from './../../../utils/merge-deep'
import cloneDeep from 'lodash/cloneDeep'
import { provide, computed, Ref } from 'vue'
import { useGlobalConfig } from '../../../composables'
import { GLOBAL_CONFIG, GlobalConfig, GlobalConfigUpdater, PartialGlobalConfig } from '../../../services/global-config'
import { makeColorsConfig } from '../../../services/color/config/make-config'

export const useGlobalConfigProvider = (next: Ref<PartialGlobalConfig>) => {
  const { globalConfig, mergeGlobalConfig, setGlobalConfig, getGlobalConfig } = useGlobalConfig()

  const nextChain = computed(() => {
    const gcCopy = cloneDeep(globalConfig.value)
    const compiledCopy: GlobalConfig = {
      ...gcCopy,
      colors: makeColorsConfig(gcCopy.colors),
    }

    return mergeDeep(compiledCopy, next.value) as GlobalConfig
  })

  provide(GLOBAL_CONFIG, {
    mergeGlobalConfig,
    setGlobalConfig,
    getGlobalConfig,
    globalConfig: nextChain,
  })

  return nextChain
}
