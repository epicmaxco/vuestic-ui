import { computed } from 'vue'
import { useGlobalConfig } from '../../global-config/global-config'
import { warn } from '../../utils'

export const useTheme = () => {
  const { globalConfig } = useGlobalConfig()

  const currentPresetName = computed(() => globalConfig.value.colors!.currentPresetName)

  const colors = computed(() => globalConfig.value.colors!.variables)
  const presets = computed(() => globalConfig.value.colors!.presets)

  const applyPreset = (presetName: string) => {
    globalConfig.value.colors!.currentPresetName = presetName
    if (!globalConfig.value.colors!.presets[presetName]) {
      return warn(`Preset ${presetName} does not exist`)
    }
    globalConfig.value.colors!.variables = globalConfig.value.colors!.presets[presetName]
  }

  return {
    currentPresetName,
    colors,
    presets,
    applyPreset,
  }
}
