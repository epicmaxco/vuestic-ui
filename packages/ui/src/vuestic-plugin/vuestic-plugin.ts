import { App } from 'vue'

import { installPlatform } from '../components/va-popup/install'
import DropdownPopperSubplugin
  from '../components/va-dropdown/dropdown-popover-subplugin'
import ToastInstall from '../components/va-toast/install'

import ColorHelpersPlugin from '../services/color-config/color-css-variables-updater'
import { GlobalConfig } from '../services/global-config/global-config'
import { GlobalConfigPlugin } from '../services/global-config/global-config-plugin'

import * as vuesticComponentMap from './vuestic-components'

installPlatform()

export const VuesticPlugin = {
  install (app: App, vuesticConfig: GlobalConfig): void {
    Object.entries(vuesticComponentMap).forEach(([name, component]) => {
      app.component(name, component)
    })

    app.use(DropdownPopperSubplugin)

    app.use(ToastInstall)

    app.use(GlobalConfigPlugin, vuesticConfig)

    app.use(ColorHelpersPlugin)
  },
}
