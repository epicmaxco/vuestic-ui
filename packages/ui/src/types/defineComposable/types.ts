import type { ExtractPropTypes, Prop } from 'vue'

/** Utility type. Adds key to object if value is not undefined */
type OptionalObject<Key extends string, Value> = Value extends undefined ? Record<'', never> : Record<Key, Value>

/** Utility type. Extracts names from array */
type ExtractKeys<T> = T extends Array<infer V> ? V : never

/** This of composable function */
export type TypedComposableThis<Props, Emits> = {
  /** Current instance props */
  readonly props: ExtractPropTypes<Props>,
  /** Current instance emit */
  readonly emit: (event: ExtractKeys<Emits>, ...args: any[]) => void,
}

export type TypedComposable<
  C extends (...args: any[]) => any,
  Props,
  Emits,
> = C & OptionalObject<'$props', Props> & OptionalObject<'$emits', Emits>

/** Vue props options types */
export type PropOptions<P = Record<any, any>> = { [K in keyof P]: Prop<P[K]> | null; }
