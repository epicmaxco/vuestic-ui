import type { VuesticComponentsMap } from '../vue-plugin'
import type { VNodeProps, AllowedComponentProps, HTMLAttributes, VNode, DefineComponent } from 'vue'
import { ComponentSlots } from '../../utils/component-options'

export type VuesticComponentName = keyof VuesticComponentsMap
export type VueDefaultPropNames = keyof (VNodeProps & AllowedComponentProps) | `on${string}`

export type PropTypes<C> = C extends { new(): { $props: infer Props } } ? Omit<Props, VueDefaultPropNames> : never

export type VuesticComponentPropsMap = {
  // key-value hack to avoid generics in type (like Omit, PropTypes, etc.)
  // `key: type` as result
  [componentName in VuesticComponentName]: {
    [key in keyof PropTypes<VuesticComponentsMap[componentName]>]?: PropTypes<VuesticComponentsMap[componentName]>[key]
  } & HTMLAttributes
}

export type Props = { [propName: string]: any }

/**
 *  Removes index signature from object
 *
 * @example
 *
 * Type:
 * ```
 * RemoveIndex<{
 *   [index: string]: number
 *   a: number
 *   b: number
 * }>
 * ```
 * Converts to
 *
 * ```
 * { a: number, b: number }
 * ```
 *
 */
type RemoveIndex<T> = {
  [ K in keyof T as
    string extends K
      ? never
      : number extends K
        ? never
        : symbol extends K
          ? never
          : K
  ]: T[K];
}

type VuesticComponentSlotsMap = {
  [componentName in VuesticComponentName]: {
    [key in keyof RemoveIndex<ComponentSlots<VuesticComponentsMap[componentName]>>]?: ComponentSlots<VuesticComponentsMap[componentName]>[key]
  }
}

type SlotPropPrefix<T extends string> = `slot:${T}`

export type SlotProp<Scope> = VNode | string | DefineComponent<Partial<Scope>, {}, {}, {}, {}>

type VuesticComponentSlotPropsMap = {
  [componentName in VuesticComponentName]: {
    // @ts-ignore
    [key in keyof VuesticComponentSlotsMap[componentName] as SlotPropPrefix<key>]: SlotProp<Parameters<VuesticComponentSlotsMap[componentName][key]>[0]>
  }
}

type VuesticComponentPreset<T extends VuesticComponentName> = VuesticComponentPropsMap[T] & VuesticComponentSlotPropsMap[T]

export type Presets = {
  [componentName in VuesticComponentName]?: {
    [presetName: string]: VuesticComponentPreset<componentName>
  }
}

export type ComponentConfig = Partial<VuesticComponentPropsMap & { all: Props, presets: Presets }>

export type { DefineComponent as VuesticComponent } from 'vue'
