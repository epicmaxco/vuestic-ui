import type { App, Plugin, Component } from 'vue'

export type VuesticComponent = Component

type PluginInstallFn<ARGS = []> = (app: App, ...options: ARGS[]) => void

/** Vuestic internal plugin */
export type VuesticPlugin = {
  install: PluginInstallFn<[]>,
} & Plugin

export type VuesticPluginFabric<O extends any[] = any[]> = (...args: O) => VuesticPlugin

export * from './components'
