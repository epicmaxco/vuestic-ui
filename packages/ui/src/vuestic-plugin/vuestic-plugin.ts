import { App } from 'vue'
import { GlobalConfig } from '../services/global-config/global-config'
import { GlobalConfigPlugin, VaDropdownPlugin, VaToastPlugin, ColorConfigPlugin } from './vuestic-plugins'
import * as vuesticComponentMap from './vuestic-components'

export const VuesticPlugin = {
  install (app: App, vuesticConfig: GlobalConfig): void {
    Object.entries(vuesticComponentMap).forEach(([name, component]) => {
      app.component(name, component)
    })

    app.use(VaDropdownPlugin)
    app.use(VaToastPlugin)

    app.use(GlobalConfigPlugin, vuesticConfig)

    app.use(ColorConfigPlugin)
  },
}
