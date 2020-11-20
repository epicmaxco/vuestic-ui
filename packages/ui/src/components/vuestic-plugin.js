import VueCompositionAPI from '@vue/composition-api'
import { BusPlugin } from 'vue-epic-bus'

import Toasted from './vuestic-mixins/VuesticToasted'
import StickyScroll from './vuestic-directives/StickyScroll'
import { installPlatform } from './vuestic-components/va-popup/install'
import { DropdownPopperPlugin } from './vuestic-components/va-dropdown/dropdown-popover-subplugin'
import { registerVuesticObject } from './resize-events'
import ToastInstall from './vuestic-components/va-toast/install'
import GlobalConfigPlugin from '../services/GlobalConfigPlugin'
import * as components from './vuestic-components'

installPlatform()

const VuesticPlugin = {
  install (Vue) {
    Object.values(components).forEach(component => {
      Vue.component(component.name, component)
    })

    registerVuesticObject(Vue)

    Vue.use(BusPlugin)

    Vue.use(DropdownPopperPlugin)

    Vue.use(ToastInstall)

    Vue.use(GlobalConfigPlugin)

    Vue.use(VueCompositionAPI)

    Vue.mixin(Toasted)

    Vue.directive('sticky-scroll', StickyScroll)
  },
}

export default VuesticPlugin
