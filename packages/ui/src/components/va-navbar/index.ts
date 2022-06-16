import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaNavbar from './VaNavbar.vue'
import VaNavbarItemComponent from './VaNavbarItem/VaNavbarItem.vue'

export const VaNavbar = withConfigTransport(_VaNavbar)
export const VaNavbarItem = withConfigTransport(VaNavbarItemComponent)
