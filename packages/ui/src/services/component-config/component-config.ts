import { useLocalConfig } from '../../components/va-config/VaConfig'
import { useGlobalConfig } from '../global-config/global-config'
import { computed } from 'vue'
import type { VuesticComponentsMap } from '../../vuestic-plugin/global-components'
import type { DefineComponent, VNodeProps, AllowedComponentProps } from 'vue'

type VuesticComponentName = keyof VuesticComponentsMap
type VueDefaultPropNames = keyof (VNodeProps & AllowedComponentProps) | `on${string}`

export type PropTypes<C> = C extends { new(): { $props: infer Props } } ? Omit<Props, VueDefaultPropNames> : never
export type ComponentConfig = {
  // key-value hack to avoid generics in type (like Omit, PropTypes, etc.)
  // `key: type` as result
  [componentName in VuesticComponentName]?: {
    [key in keyof PropTypes<VuesticComponentsMap[componentName]>]: PropTypes<VuesticComponentsMap[componentName]>[key]
  }
}

export const useComponentConfigProps = <T extends DefineComponent>(component: T) => {
  const localConfig = useLocalConfig()
  const { globalConfig } = useGlobalConfig()

  return computed(() => {
    const globalConfigProps = {
      ...globalConfig.value.componentsAll,
      ...globalConfig.value.components?.[component.name as VuesticComponentName],
    }

    const localConfigProps = localConfig.value
      .reduce((finalConfig, config) => config[component.name as VuesticComponentName]
        ? { ...finalConfig, ...config[component.name as VuesticComponentName] }
        : finalConfig
      , {})

    const props = { ...globalConfigProps, ...localConfigProps }

    return props
  })
}
