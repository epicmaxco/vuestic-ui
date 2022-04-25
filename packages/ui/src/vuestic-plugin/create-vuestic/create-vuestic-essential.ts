import type { VuesticComponent, VuesticPlugin } from '../types'
import type { GlobalConfig } from '../../services/global-config/global-config'

import { GlobalConfigPlugin, ColorConfigPlugin } from '../vuestic-plugins'

const ESSENTIAL_PLUGIN_NAMES = ['GlobalConfigPlugin', 'ColorConfigPlugin']

/**
 * Register only essential Vuestic Plugins.
 *
 * This plugin will register globally only provided component and plugins in options.
 * @notice this plugin will not bundle all vuestic conponents and plugins
 */
export const createVuesticEssential = (options: {
  config?: GlobalConfig,
  components?: Record<string, VuesticComponent>,
  plugins?: Record<string, VuesticPlugin>
 } = {}): VuesticPlugin => {
  return {
    install (app) {
      const { config, components, plugins } = options

      /** Register essential plugins before any other */
      app.use(GlobalConfigPlugin, config)
      app.use(ColorConfigPlugin)

      if (plugins) {
        Object.entries(plugins).forEach(([name, plugin]) => {
          if (ESSENTIAL_PLUGIN_NAMES.includes(name)) { return }
          app.use(plugin)
        })
      }

      if (components) {
        Object.entries(components).forEach(([name, component]) => {
          app.component(name, component)
        })
      }
    },
  }
}
