import { mergeDeep } from './../../../utils/merge-deep'
import { cloneDeep } from '../../../utils/clone-deep'
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

    const config = mergeDeep(compiledCopy, next.value) as GlobalConfig

    // Variables is a virtual property, so we need to merge it manually after preset in chosen!
    if (next.value.colors?.variables) {
      Object.keys(next.value.colors.variables).forEach((key) => {
        config.colors.variables[key] = next.value.colors!.variables![key]!
      })
    }

    return config
  })

  provide(GLOBAL_CONFIG, {
    mergeGlobalConfig,
    setGlobalConfig,
    getGlobalConfig,
    globalConfig: nextChain,
  })

  return nextChain
}
