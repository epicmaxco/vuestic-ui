import { useLocalConfig } from '../../components/va-config/VaConfig'
import { useGlobalConfig } from '../global-config/global-config'
import { ComponentInternalInstance, computed, DefineComponent } from 'vue'

export type Props = { [propName: string]: any }
export type ComponentConfig = { [componentName: string]: Props }
export type ComponentPreset = { [componentName: string]: { [presetName: string]: Props } }

export const useComponentConfigProps = <T extends DefineComponent>(component: T, instance: ComponentInternalInstance) => {
  const localConfig = useLocalConfig()
  const { globalConfig } = useGlobalConfig()

  return computed(() => {
    const globalConfigProps = {
      ...globalConfig.value.componentsAll,
      ...globalConfig.value.components?.[component.name],
    }

    const localConfigProps = localConfig.value
      .reduce((finalConfig, config) => config[component.name] ? { ...finalConfig, ...config[component.name] } : finalConfig, {})

    const presetName = instance.props?.preset || localConfigProps.preset || globalConfigProps.preset
    const getPresetProps = () => globalConfig.value.componentsPresets?.[component.name]?.[presetName]

    const presetProps = presetName && getPresetProps()

    const props = { ...globalConfigProps, ...localConfigProps, ...presetProps }

    return props
  })
}
