import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaSidebar from './VaSidebar.vue'
export { default as VaSidebarItem, VaSidebarItemContent, VaSidebarItemTitle } from './VaSidebarItem'

export const VaSidebar = withConfigTransport(_VaSidebar)
