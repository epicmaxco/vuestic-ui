import type { VuesticComponent, VuesticPlugin, VuesticPluginFabric } from '../types'
import { defineVuesticPlugin } from '../types'
import type { GlobalConfig } from '../../services/global-config/global-config'
import { usePlugin } from '../utils'

import { GlobalConfigPlugin, ColorConfigPlugin } from '../vuestic-plugins'

const ESSENTIAL_PLUGIN_NAMES = ['GlobalConfigPlugin', 'ColorConfigPlugin']

/**
 * Register only essential Vuestic Plugins.
 *
 * This plugin will register globally only provided component and plugins in options.
 * @notice this plugin will not bundle all vuestic conponents and plugins
 *
 * @example
 * ```ts
 * createVuesticEssential({
 *   plugins: [VaToastPlugin],  // or [VaToastPlugin({ makeLifeEasier: true })],
 *   components: { VaButton, VaInput },
 *   config: { VaButton: { color: '#f0f' } }
 * })
 * ```
 */
export const createVuesticEssential = defineVuesticPlugin((options: {
  config?: GlobalConfig,
  components?: Record<string, VuesticComponent>,
  plugins?: Record<string, VuesticPlugin | VuesticPluginFabric>
 } = {}) => ({
  install (app) {
    const { config, components, plugins } = options

    /** Register essential plugins before any other */
    usePlugin(app, plugins?.GlobalConfigPlugin || GlobalConfigPlugin, config)
    usePlugin(app, plugins?.ColorConfigPlugin || ColorConfigPlugin)

    if (plugins) {
      Object.entries(plugins).forEach(([name, plugin]) => {
        if (ESSENTIAL_PLUGIN_NAMES.includes(name)) { return }
        usePlugin(app, plugin)
      })
    }

    if (components) {
      Object.entries(components).forEach(([name, component]) => {
        app.component(name, component)
      })
    }
  },
}))
