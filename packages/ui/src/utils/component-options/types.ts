import type { ComponentOptionsBase, PropType, DefineComponent, VNodeProps, ExtractPropTypes } from 'vue'
import { VaButton } from '../../components'

export type ComponentProps<T> =
  T extends new () => { $props: infer P } ? NonNullable<P> :
  T extends (props: infer P, ...args: any) => any ? P :
  {};

export type ComponentEmit<T> =
  T extends new () => { $emit: infer E } ? NonNullable<E> :
  T extends (props: any, ctx: { emit: infer E }, ...args: any) => any ? NonNullable<E> :
  {};

// `type TEST<T> = true extends boolean ? T : never` returns type value instead of TEST<T>, so we can clearly see props types
// because they are hidden behind type alias

// Define component
export type DefineComponentOptions = ComponentOptionsBase<any, any, any, any, any, any, any, any>

// Remove useless readonly and nullable key here:
// -readonly removes readonly
// -? removes undefined from key, so we can be sure that prop exists and should have type.
type MakeProps<T extends Record<string, any>> = {
  [K in keyof T]-?: {
    type: PropType<NonNullable<T[K]>>,
    required: true,
    default: T[K]
  }
}

declare type ExtractDefineComponentPropsType<T> = T extends {
  new(): {
    $props: infer P
  }
} ? P extends Record<string, any> ? MakeProps<Omit<P, 'class' | 'style' | keyof VNodeProps>> : {} : {}

type B = ExtractDefineComponentPropsType<typeof VaButton>
type BP = ExtractPropTypes<B>

export type ExtractComponentProps<T extends DefineComponent<any, any, any, any, any, any, any, any, any, any>> = true extends boolean ? ExtractDefineComponentPropsType<T> : never
export type ExtractComponentEmits<T> = T extends ComponentOptionsBase<any, any, any, any, any, any, any, infer E> ? E : []

export type ExtractComponentPropTypes<T extends DefineComponentOptions> = ComponentProps<T>
