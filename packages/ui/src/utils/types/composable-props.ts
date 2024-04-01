type Pretty<T> = true extends boolean ? T : never
type NonUndefined<T> = Pretty<T extends undefined ? never : T>
type NativeType = null | number | string | boolean | symbol | ((...args: any[]) => any)
type InferDefault<P, T> = Pretty<NonUndefined<T> extends NativeType ? T : (props: P) => NonUndefined<T>>
type InferDefaults<T> = Pretty<{
  [K in keyof T]?: InferDefault<T, T[K]>
}>

export type DefinePropsDefault<Props> = Pretty<InferDefaults<Props>>
export type DefineProps<T extends Record<string, any>> = T
export type DefineEmits<T extends Record<string, any[]>> = T

/** @private Use this later as composables arguments */
export type ComposableProps<T extends Record<string, any>> = {
  [key in keyof T]-?: T[key]
}
