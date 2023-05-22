import type { ComponentOptionsBase, PropType, ExtractPropTypes, DefineComponent } from 'vue'
import { VaAlert } from '../../components'

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

// ExtractOptionProp taken from Vue3 source code
declare type ExtractDefineComponentOptionProp<T> = T extends DefineComponent<infer P, any, any, any, any, any, any, any> ? true : false;
// Remove useless readonly and nullable key here:
// -readonly removes readonly
// -? removes undefined from key, so we can be sure that prop exists and should have type.
declare type ExtractDefineComponentPropsType<T> = T extends DefineComponent<infer P, any, any> ? P : false

// true extends boolean ? {
//   -readonly [K in Exclude<keyof ComponentProps<T>, `on${Capitalize<string>}`>]-?: {
//     type: PropType<ComponentProps<T>[K]>,
//     required: undefined extends ComponentProps<T>[K] ? false : true,
//     default: undefined extends ComponentProps<T>[K] ? undefined : ComponentProps<T>[K],
//   }
// } : never

export type ExtractComponentProps<T extends DefineComponentOptions> = true extends boolean ? ExtractDefineComponentPropsType<T> : never
export type ExtractComponentEmits<T> = T extends ComponentOptionsBase<any, any, any, any, any, any, any, infer E> ? E : []

export type ExtractComponentPropTypes<T extends DefineComponentOptions> = ComponentProps<T>
