import type { App, Plugin } from 'vue'

// TODO: Replace with define component or take argument type from `app.component`
export type VuesticComponent = any

type PluginInstallFn<ARGS = []> = (app: App, ...options: ARGS[]) => void

/** Vuestic internal plugin */
export type VuesticPlugin = {
  install: PluginInstallFn<[]>
} & Plugin

export type VuesticPluginFabric<O extends any[] = []> = (...args: O) => VuesticPlugin

export const defineVuesticPlugin = <O extends any[]>(fabric: VuesticPluginFabric<O>) => fabric

// TOOD: Maybe we can move $vaConfig and $vaColorConfig to $vuestic
// declare module '@vue/runtime-core' {
//   export interface ComponentCustomProperties {
//     $vuestic: {
//       [key: string]: any
//     }
//   }
// }
