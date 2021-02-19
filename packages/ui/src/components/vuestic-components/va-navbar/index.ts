import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaNavbar from './VaNavbar.vue'
import VaNavbarItemComponent from './VaNavbarItem/VaNavbarItem.vue'

export default withConfigTransport(VaNavbar)
export const VaNavbarItem = withConfigTransport(VaNavbarItemComponent)
