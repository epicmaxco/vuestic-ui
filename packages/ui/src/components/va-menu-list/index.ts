import { withConfigTransport } from '../../services/config-transport'
import _VaMenuList from './VaMenuList.vue'
import _VaMenuItem from './components/VaMenuItem.vue'
import _VaMenuGroup from './components/VaMenuGroup.vue'
export { default as VaMenuFull } from './components/VaMenuFull.vue'

export const VaMenuList = withConfigTransport(_VaMenuList)
export const VaMenuItem = withConfigTransport(_VaMenuItem)
export const VaMenuGroup = withConfigTransport(_VaMenuGroup)
