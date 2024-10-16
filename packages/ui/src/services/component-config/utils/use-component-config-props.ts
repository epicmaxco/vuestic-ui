import { injectChildPropsFromParent } from './../../config-transport/useChildComponents'
import { VuesticComponentName, Props, VuesticComponent } from '../types'
import { useLocalConfig } from '../../../composables/useLocalConfig'
import { useGlobalConfig } from '../../global-config/global-config'
import { computed } from 'vue'
import { ComponentPresetProp, PresetPropValue } from '../../../composables'
import { notNil } from '../../../utils/isNilValue'

const withPresetProp = <P extends Props>(props: P): props is P & ComponentPresetProp => 'preset' in props
const getPresetProp = <P extends Props>(props: P) => withPresetProp(props) ? props.preset : undefined

export const useComponentConfigProps = <T extends VuesticComponent>(component: T, originalProps: Props) => {
  const localConfig = useLocalConfig()
  const { globalConfig } = useGlobalConfig()

  const componentName = component.name as VuesticComponentName

  const getPresetProps = (presetPropValue: PresetPropValue): Props => {
    return (presetPropValue instanceof Array ? presetPropValue : [presetPropValue]).reduce<Props>((acc, presetName) => {
      const presetProps = globalConfig.value.components?.presets?.[componentName]?.[presetName]

      if (!presetProps) {
        return acc
      }

      const extendedPresets = getPresetProp(presetProps)

      return {
        ...acc,
        ...(extendedPresets ? getPresetProps(extendedPresets) : undefined),
        ...presetProps,
      }
    }, {})
  }
  const parentInjectedProps = injectChildPropsFromParent()

  return computed(() => {
    const globalConfigProps: Props = {
      ...globalConfig.value.components?.all,
      ...globalConfig.value.components?.[componentName],
    }

    const localConfigProps = localConfig.value
      .reduce<Props>((finalConfig, config) => {
        const componentConfigProps = config[componentName]

        return componentConfigProps
          ? { ...finalConfig, ...componentConfigProps }
          : finalConfig
      }, {})

    const presetProp = [
      originalProps,
      parentInjectedProps?.value,
      localConfigProps,
      globalConfigProps,
    ]
      .filter(notNil)
      .map(getPresetProp)
      .filter(notNil)
      .at(0)

    const presetProps = presetProp ? getPresetProps(presetProp) : undefined

    return { ...globalConfigProps, ...localConfigProps, ...presetProps }
  })
}
