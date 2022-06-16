import * as vuesticComponents from './vuestic-components'

/** Utility type: Show type instad of import word */
type Map<O extends Record<any, any>> = { [K in keyof O]: O[K] }
/** Utility type: Check if key exist in object before access */
type SafeAccess<O, K> = K extends keyof O ? O[K] : never

/** List of all exported components */
type VuesticComponentsMap = Map<typeof vuesticComponents>
/** Component names */
type VuesticComponentNames = keyof VuesticComponentsMap

/**
 * Names of Vuestic components that must be accessable globally.
 *
 * @example
 * This will register all vuestic components globally:
 * ```
 * declare module 'vue' {
 *   export interface GlobalComponents extends VuesticComponents {}
 * }
 * ```
 *
 * @example
 * If you using tree-shaking and want to register only specific components:
 * ```
 * declare module 'vue' {
 *   export interface GlobalComponents extends VuesticComponents<'VaButton' | 'VaInput'> {}
 * }
 * ```
 * Now only `VaButton` and `VaInput` types will be registered globally.
 *
 * @notice this will only register types, you need to use createVuesticEssetial to register components.
 *
 * @important Prefer interface instead of type, this will break all component types.
 * @eslint You can safely ignore `@typescript-eslint/no-empty-interface` eslint rule
 * */
export type VuesticComponents<NAMES extends string = VuesticComponentNames> = {
  [name in NAMES]: SafeAccess<VuesticComponentsMap, name>
}

export {}
