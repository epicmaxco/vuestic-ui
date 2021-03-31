import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaSidebar from './VaSidebar.vue'
export { default as VaSidebarLink } from './VaSidebarLink'
export { default as VaSidebarItem, VaSidebarItemContent, VaSidebarItemTitle } from './VaSidebarItem'

export default withConfigTransport(VaSidebar)
