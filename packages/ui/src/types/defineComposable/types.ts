import type { ExtractPropTypes, Prop, ComponentInternalInstance } from 'vue'

/** Utility type. Adds key to object if value is not undefined */
type OptionalObject<Key extends string, Value> = Value extends undefined ? Record<'', never> : Record<Key, Value>

/** This of composable function */
export type TypedComposableContext<Props, Emits> = {
  /** Current instance props */
  readonly props: ExtractPropTypes<Props>,
  /** Current instance emit */
  readonly emit: (event: Emits, ...args: any[]) => void,
} & Omit<ComponentInternalInstance, 'props' | 'emit'>

export type TypedComposable<
  C,
  Props,
  Emits,
> = C & OptionalObject<'$props', Props> & OptionalObject<'$emits', Emits>

/** Vue props options types */
export type PropOptions<P = Record<any, any>> = { [K in keyof P]: Prop<P[K]> | null; }
