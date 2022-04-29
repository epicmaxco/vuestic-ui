import { defineVuesticPlugin, defineGlobalProperty } from '../../../vuestic-plugin/utils'

const vaDropdownPlugin = {
  closeDropdown () {
    let vm = this as any
    // Hide first parent dropdown.
    while ((vm = vm.$parent)) {
      const name = vm.$options.name
      if (name === 'VaDropdown') {
        vm.hide()
        break
      }
    }
  },
}

export const VaDropdownPlugin = defineVuesticPlugin(() => ({
  install (app) {
    defineGlobalProperty(app, '$closeDropdown', vaDropdownPlugin.closeDropdown)
    defineGlobalProperty(app, '$vaDropdown', vaDropdownPlugin)
  },
}))

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $vaDropdown: typeof vaDropdownPlugin

    /** @deprecated */
    $closeDropdown: typeof vaDropdownPlugin['closeDropdown']
  }
}
