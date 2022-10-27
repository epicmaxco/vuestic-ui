import type { VuesticComponent, VuesticPlugin, VuesticPluginFabric } from '../types'
import { defineVuesticPlugin } from '../types'
import type { PartialGlobalConfig } from '../../services/global-config/global-config'
import { usePlugin } from '../utils'
import { setCurrentApp } from '../../services/current-app'

import { GlobalConfigPlugin, ColorConfigPlugin, CachePlugin } from '../vuestic-plugins'

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
  config?: PartialGlobalConfig,
  components?: Record<string, VuesticComponent>,
  plugins?: Record<string, VuesticPlugin | VuesticPluginFabric>
 } = {}) => ({
  install (app) {
    const { config, components, plugins } = options

    setCurrentApp(app)

    // These plugins have dependant plugins, so have to be registered first.
    usePlugin(app, plugins?.GlobalConfigPlugin || GlobalConfigPlugin, config)
    usePlugin(app, plugins?.CachePlugin || CachePlugin)

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

    setCurrentApp(null)
  },
}))
