import { App } from 'vue'
import type { GlobalConfig } from '../../services/global-config/global-config'
import { GlobalConfigPlugin, VaDropdownPlugin, VaToastPlugin, VaModalPlugin, ColorConfigPlugin } from '../vuestic-plugins'
import * as vuesticComponentMap from '../vuestic-components'

/** @deprecated Use `createVuestic` instead */
export const VuesticPlugin = {
  install (app: App, vuesticConfig: GlobalConfig): void {
    app.use(GlobalConfigPlugin(vuesticConfig))
    app.use(ColorConfigPlugin())

    Object.entries(vuesticComponentMap).forEach(([name, component]) => {
      app.component(name, component)
    })

    app.use(VaDropdownPlugin())
    app.use(VaToastPlugin())
    app.use(VaModalPlugin())
  },
}
