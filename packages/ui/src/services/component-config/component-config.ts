import { useLocalConfig } from '../../components/va-config/VaConfig'
import { useGlobalConfig } from '../global-config/global-config'
import { ComponentInternalInstance, computed } from 'vue'
import type { VuesticComponentsMap } from '../../vuestic-plugin/global-components'
import type { DefineComponent, VNodeProps, AllowedComponentProps } from 'vue'

type VuesticComponentName = keyof VuesticComponentsMap
type VueDefaultPropNames = keyof (VNodeProps & AllowedComponentProps) | `on${string}`

export type Props = { [propName: string]: any }
export type Presets = { [componentName in VuesticComponentName]: { [presetName: string]: Props } }
export type PropTypes<C> = C extends { new(): { $props: infer Props } } ? Omit<Props, VueDefaultPropNames> : never
export type ComponentConfig = Partial<{
  // key-value hack to avoid generics in type (like Omit, PropTypes, etc.)
  // `key: type` as result
  [componentName in VuesticComponentName]: {
    [key in keyof PropTypes<VuesticComponentsMap[componentName]>]: PropTypes<VuesticComponentsMap[componentName]>[key]
  }
} & { all: Props | Presets, presets: Presets }>

const extracPresetProp = (props: any) => 'preset' in props ? props.preset as string : null
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
      , {} as NonNullable<ComponentConfig[VuesticComponentName]>)

    const presetName = instance.props?.preset || extracPresetProp(localConfigProps) || globalConfigProps.preset
    const getPresetProps = () => globalConfig.value.components?.presets?.[component.name as VuesticComponentName]?.[presetName]

    const presetProps = presetName && getPresetProps()

    const props = { ...globalConfigProps, ...localConfigProps, ...presetProps }

    return props
  })
}
