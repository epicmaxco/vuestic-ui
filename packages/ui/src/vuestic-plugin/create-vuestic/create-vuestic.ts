import type { PartialGlobalConfig } from '../../services/global-config/types'
import { defineVuesticPlugin, usePlugin } from '../utils'
import { GlobalConfigPlugin, VaDropdownPlugin, VaToastPlugin, VaModalPlugin, ColorConfigPlugin, BreakpointConfigPlugin } from '../vuestic-plugins'
import * as vuesticComponents from '../vuestic-components'
import type { VuesticComponents } from '../global-components'

// Declare all components globally
declare module 'vue' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface GlobalComponents extends VuesticComponents {}
}

/**
 * Globally register all vuestic components and plugins
 * @notice using this method will bundle all vuestic components.
 * Use `createVuesticEssential` if you want tree shaking to work.
 */
export const createVuestic = defineVuesticPlugin((options: { config?: PartialGlobalConfig } = {}) => ({
  install (app) {
    const { config } = options

    Object.entries(vuesticComponents).forEach(([name, component]) => {
      app.component(name, component)
    })

    usePlugin(app, GlobalConfigPlugin(config))
    usePlugin(app, BreakpointConfigPlugin)
    usePlugin(app, ColorConfigPlugin)
    usePlugin(app, VaDropdownPlugin)
    usePlugin(app, VaToastPlugin)
    usePlugin(app, VaModalPlugin)
  },
}))
