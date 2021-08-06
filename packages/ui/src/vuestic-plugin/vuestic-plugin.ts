import { App } from 'vue'

import { installPlatform } from '../components/va-popup/install'
import DropdownPopperSubplugin
  from '../components/va-dropdown/dropdown-popover-subplugin'
import ToastInstall from '../components/va-toast/install'

import ColorHelpersPlugin from '../services/color-config/color-css-variables-updater'
import { GlobalConfig } from '../services/global-config/global-config'
import { GlobalConfigPlugin } from '../services/global-config/global-config-plugin'

import { vuesticComponentMap } from './vuestic-components'

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

export const VuesticPluginsWithoutComponents = {
  install (app: App, vuesticConfig: GlobalConfig): void {
    app.use(DropdownPopperSubplugin)

    app.use(ToastInstall)

    app.use(GlobalConfigPlugin, vuesticConfig)

    app.use(ColorHelpersPlugin)
  },
}

export { GlobalConfigPlugin } from '../services/global-config/global-config-plugin'
export { default as ColorHelpersPlugin } from '../services/color-config/color-css-variables-updater'
export { default as ToastInstall } from '../components/va-toast/install'
export { default as DropdownPopperSubplugin }
  from '../components/va-dropdown/dropdown-popover-subplugin'
