import type { VuesticComponentsMap } from '../vue-plugin'
import type { VNodeProps, AllowedComponentProps } from 'vue'

export type VuesticComponentName = keyof VuesticComponentsMap
export type VueDefaultPropNames = keyof (VNodeProps & AllowedComponentProps) | `on${string}`

export type Props = { [propName: string]: any }
export type Presets = { [componentName in VuesticComponentName]?: { [presetName: string]: Props } }
export type PropTypes<C> = C extends { new(): { $props: infer Props } } ? Omit<Props, VueDefaultPropNames> : never

export type ComponentConfig = Partial<{
  // key-value hack to avoid generics in type (like Omit, PropTypes, etc.)
  // `key: type` as result
  [componentName in VuesticComponentName]: {
    [key in keyof PropTypes<VuesticComponentsMap[componentName]>]: PropTypes<VuesticComponentsMap[componentName]>[key]
  }
} & { all: Props, presets: Presets }>

export type { DefineComponent as VuesticComponent } from 'vue'
