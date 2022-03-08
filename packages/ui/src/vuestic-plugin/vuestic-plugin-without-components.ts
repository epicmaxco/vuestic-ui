import type { GlobalConfig } from '../main'
import type { App } from 'vue'
import { GlobalConfigPlugin, VaDropdownPlugin, VaToastPlugin, ColorConfigPlugin } from './vuestic-plugins'

export const VuesticPluginsWithoutComponents = {
  install (app: App, vuesticConfig: GlobalConfig): void {
    app.use(VaDropdownPlugin)
    app.use(VaToastPlugin)

    app.use(GlobalConfigPlugin, vuesticConfig)
    app.use(ColorConfigPlugin)
  },
}
