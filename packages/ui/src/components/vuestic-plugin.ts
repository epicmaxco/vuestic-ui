import Toasted from './vuestic-mixins/VuesticToasted'
import StickyScroll from './vuestic-directives/StickyScroll.js'
import _Vue from 'vue'

// @ts-ignore
import { installPlatform } from './vuestic-components/va-popup/install'
// @ts-ignore
import { DropdownPopperPlugin } from './vuestic-components/va-dropdown/dropdown-popover-subplugin'

// @ts-ignore
import { BusPlugin } from 'vue-epic-bus'
// @ts-ignore
import { registerVuesticObject } from './resize-events'

// TODO Replace when all components are converted to TS.
// import { allComponents } from './all-components'
import { allComponents } from './all-ts-components'

installPlatform()

export const VuesticPlugin = {
  install (Vue: typeof _Vue) {
    allComponents.forEach(component => {
      Vue.component(component.name, component)
    })

    registerVuesticObject(Vue)

    Vue.use(BusPlugin)

    Vue.use(DropdownPopperPlugin)

    Vue.mixin(Toasted)

    Vue.directive('sticky-scroll', StickyScroll)
  },
}

export default VuesticPlugin
