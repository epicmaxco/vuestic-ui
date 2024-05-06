import type { VuesticComponent, VuesticComponentName, Props } from '../types'
import { useLocalConfig } from '../../../composables/useLocalConfig'
import { useGlobalConfig } from '../../global-config/global-config'
import { computed } from 'vue'
import { injectChildPresetPropFromParent } from '../../../composables/useChildComponents'
import omit from 'lodash/omit'

export const useComponentConfigProps = <T extends VuesticComponent>(component: T, originalProps: Props) => {
  const localConfig = useLocalConfig()
  const { globalConfig } = useGlobalConfig()

  const instancePreset = computed(() => originalProps.preset)
  const getPresetProps = (presetName: string) => globalConfig.value.components?.presets?.[component.name as VuesticComponentName]?.[presetName]
  const parentPropPreset = injectChildPresetPropFromParent()

  return computed(() => {
    const globalConfigProps: Props = {
      ...globalConfig.value.components?.all,
      ...globalConfig.value.components?.[component.name as VuesticComponentName],
    }

    const localConfigProps: Props = localConfig.value
      .reduce((finalConfig, config) => config[component.name as VuesticComponentName]
        ? { ...finalConfig, ...config[component.name as VuesticComponentName] }
        : finalConfig
      , {})

    const presetName = parentPropPreset?.value || instancePreset.value || localConfigProps.preset || globalConfigProps.preset
    const presetProps = presetName && getPresetProps(presetName)

    return omit({ ...globalConfigProps, ...localConfigProps, ...presetProps }, 'sizesConfig')
  })
}
