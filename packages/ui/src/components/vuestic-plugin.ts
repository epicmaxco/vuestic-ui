import { App } from 'vue'
import * as vuesticComponentMap from './vuestic-components'

// Excluded from v2
// import VaColorSlider from './vuestic-components/va-color-slider/VaColorSlider.vue'
// import VaColorPicker from './vuestic-components/va-color-picker/VaColorPicker.vue'
// import VaColorInput from './vuestic-components/va-color-input/VaColorInput.vue'
// import VaColorInputAdvanced from './vuestic-components/va-color-input/VaColorInputAdvanced.vue'
// import VaColorPaletteAdvanced from './vuestic-components/va-color-palette/VaColorPaletteAdvanced.vue'
// import VaColorPalette from './vuestic-components/va-color-palette/VaColorPalette.vue'
// import VaDataTable from './vuestic-components/va-data-table/VaDataTable.vue'
// import VaPopup from './vuestic-components/va-popup/popup/VaPopup.vue'

import { installPlatform } from './vuestic-components/va-popup/install'
import DropdownPopperSubplugin
  from './vuestic-components/va-dropdown/dropdown-popover-subplugin'
// import { registerVuesticObject } from './resize-events'
import ToastInstall from './vuestic-components/va-toast/install'

import ColorHelpersPlugin from '../services/color-config/color-css-variables-updater'
import { GlobalConfig } from '../services/global-config/global-config'
import { GlobalConfigPlugin } from '../services/global-config/global-config-plugin'

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
