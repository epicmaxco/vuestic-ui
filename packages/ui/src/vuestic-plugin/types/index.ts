import type { App, Plugin } from 'vue'

// TODO: Replace with define component or take argument type from `app.component`
export type VuesticComponent = any

type PluginInstallFn<ARGS = []> = (app: App, ...options: ARGS[]) => void

/** Vuestic internal plugin */
export type VuesticPlugin<ARGS = any[]> = {
  install: PluginInstallFn<ARGS>
} & Plugin

export type CreateVuesticPlugin<OPTIONS extends any[]> = (...options: OPTIONS) => VuesticPlugin

export const defineVuesticPlugin = <O extends any[]>(fabric: (...args: O) => VuesticPlugin) => fabric

// TOOD: Maybe we can move $vaConfig and $vaColorConfig to $vuestic
// declare module '@vue/runtime-core' {
//   export interface ComponentCustomProperties {
//     $vuestic: {
//       [key: string]: any
//     }
//   }
// }
