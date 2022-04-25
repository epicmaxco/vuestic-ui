import type { GlobalConfig } from '../../services/global-config/global-config'
import type { VuesticPlugin } from '../types'
import { GlobalConfigPlugin, VaDropdownPlugin, VaToastPlugin, ColorConfigPlugin } from '../vuestic-plugins'
import * as vuesticComponents from '../vuestic-components'

/**
 * Globally register all vuestic components and plugins
 * @notice using this method will bundle all vuestic components.
 * Use `createVuesticEssential` if you want tree shaking to work.
 */
export const createVuestic = (options: { config?: GlobalConfig } = {}): VuesticPlugin => {
  return {
    install (app) {
      const { config } = options

      Object.entries(vuesticComponents).forEach(([name, component]) => {
        app.component(name, component)
      })

      app.use(GlobalConfigPlugin, config)
      app.use(ColorConfigPlugin)
      app.use(VaDropdownPlugin)
      app.use(VaToastPlugin)
    },
  }
}
