import { useLocalConfig } from '../../components/va-config/VaConfig'
import { useGlobalConfig } from '../global-config/global-config'
import { ComponentInternalInstance, computed } from 'vue'
import type { VuesticComponentsMap } from '../../vuestic-plugin/global-components'
import type { DefineComponent, VNodeProps, AllowedComponentProps } from 'vue'

export type Props = { [propName: string]: any }
export type Presets = { [componentName: string]: { [presetName: string]: Props } }
// export type ComponentConfig = { [componentOrConfigName: string]: Props | Presets }

type VuesticComponentName = keyof VuesticComponentsMap
type VueDefaultPropNames = keyof (VNodeProps & AllowedComponentProps) | `on${string}`

export type PropTypes<C> = C extends { new(): { $props: infer Props } } ? Omit<Props, VueDefaultPropNames> : never
export type ComponentConfig = {
  // key-value hack to avoid generics in type (like Omit, PropTypes, etc.)
  // `key: type` as result
  [componentName in VuesticComponentName]?: {
    [key in keyof PropTypes<VuesticComponentsMap[componentName]>]: PropTypes<VuesticComponentsMap[componentName]>[key] | Presets
  }
} & { all: Props | Presets }

export const useComponentConfigProps = <T extends DefineComponent>(component: T, instance: ComponentInternalInstance) => {
  const localConfig = useLocalConfig()
  const { globalConfig } = useGlobalConfig()

  return computed(() => {
    const globalConfigProps: Props = {
      ...globalConfig.value.components?.all,
      ...globalConfig.value.components?.[component.name as VuesticComponentName],
    }

    const localConfigProps = localConfig.value
      .reduce((finalConfig, config) => config[component.name as VuesticComponentName]
        ? { ...finalConfig, ...config[component.name as VuesticComponentName] }
        : finalConfig
      , {})

    // TODO: fix types
    const presetName = instance.props?.preset || localConfigProps.preset || globalConfigProps.preset
    const getPresetProps = () => globalConfig.value.components?.presets?.[component.name]?.[presetName]

    const presetProps = presetName && getPresetProps()

    const props = { ...globalConfigProps, ...localConfigProps, ...presetProps }

    return props
  })
}
