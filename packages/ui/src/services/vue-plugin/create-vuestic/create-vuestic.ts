import type { PartialGlobalConfig } from '../../global-config/types'
import { defineVuesticPlugin, usePlugin } from '../utils'
import { GlobalConfigPlugin, VaDropdownPlugin, VaToastPlugin, VaModalPlugin, ColorConfigPlugin, BreakpointConfigPlugin, CachePlugin } from '../plugins'
import * as vuesticComponents from '../components'
import { setCurrentApp } from '../../current-app'
import { ColorsClassesPlugin } from '../../colors-classes'

/**
 * Globally register all vuestic components and plugins
 * @notice using this method will bundle all vuestic components.
 * Use `createVuesticEssential` if you want tree shaking to work.
 */
export const createVuestic = defineVuesticPlugin((options: { config?: PartialGlobalConfig } = {}) => ({
  install (app) {
    const { config } = options

    setCurrentApp(app)

    Object.entries(vuesticComponents).forEach(([name, component]) => {
      app.component(name, component)
    })

    // These plugins have dependant plugins, so have to be registered first.
    usePlugin(app, GlobalConfigPlugin(config))
    usePlugin(app, CachePlugin)
    usePlugin(app, ColorConfigPlugin(config))
    usePlugin(app, ColorsClassesPlugin)

    usePlugin(app, BreakpointConfigPlugin)
    usePlugin(app, VaDropdownPlugin)
    usePlugin(app, VaToastPlugin)
    usePlugin(app, VaModalPlugin)

    setCurrentApp(null)
  },
}))
