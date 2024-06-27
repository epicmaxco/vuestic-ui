import type { ComponentOptionsBase, DefineComponent, PropType, VNodeProps } from 'vue'

export type ComponentProps<T> =
  T extends new () => { $props: infer P } ? NonNullable<P> :
  T extends (...args: any[]) => { __ctx?: { props: infer P } } ? NonNullable<P> :
  T extends (props: infer P, ...args: any) => any ? P :
  unknown;

export type ComponentSlots<T> =
  T extends new () => { $slots: infer S; } ? NonNullable<S> :
    T extends (props: any, ctx: { slots: infer S; attrs: any; emit: any; }, ...args: any) => any ? NonNullable<S> :
      {};

export type UnKeyofString<T> = T extends infer E & ThisType<void> ? E : never
export type ExtractVolarEmitsType<T> = 'emits' extends keyof T
  ? UnKeyofString<(T['emits'] extends infer E | undefined ? E : never)>
  : never

export type ExtractVolarEmitTypes<T> = ExtractVolarEmitsType<T> extends string[]
  ? ExtractVolarEmitsType<T>
  : Array<keyof Exclude<ExtractVolarEmitsType<T>, string[]>>

export type ComponentEmit<T> =
  'emits' extends keyof T ? ExtractVolarEmitTypes<T> :
  T extends { emits: infer E } ? E :
  T extends new () => { $emit: infer E } ? E :
  T extends (props: any, ctx: { emit: infer E }, ...args: any) => any ? E :
  unknown;

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

declare type ExtractDefineComponentPropsType<T> = MakeProps<Omit<ComponentProps<T>, 'class' | 'style' | keyof VNodeProps>>

export type ExtractComponentProps<T> = true extends boolean ? ExtractDefineComponentPropsType<T> : never
export type ExtractComponentEmits<T> = ComponentEmit<T>

export type ExtractComponentPropTypes<T extends DefineComponentOptions> = ComponentProps<T>
