import type { App } from 'vue'
import { VuesticPluginFabric, VuesticPlugin } from '../types'

const isPluginFabric = <O extends any[]>(plugin: VuesticPlugin | VuesticPluginFabric<O>): plugin is VuesticPluginFabric<O> => typeof plugin === 'function'

/**
 * Allow user to use plugin as function or just pass it.
 *
 * @example
 * ```
 * createVuesticEssential({
 *   plugins: [GlobalConfigPlugin]
 * })
 * ```
 *
 * or
 *
 * ```
 * createVuesticEssential({
 *   plugins: [GlobalConfigPlugin({ VaButton: { color: 'primary' } })]
 * })
 * ```
 */
export const usePlugin = <O>(app: App, plugin: VuesticPlugin | VuesticPluginFabric<O[]>, ...options: O[]) => {
  if (isPluginFabric(plugin)) {
    app.use(plugin(...options))
  } else {
    app.use(plugin) // Do not pass options, because it should be passed to fabric
  }
}
