import withConfigTransport from '../../../../services/config-transport/withConfigTransport'
import VaSidebarItem from './VaSidebarItem.vue'
import VaSidebarItemContentComponent from './VaSidebarItemContent.vue'
import VaSidebarItemTitleComponent from './VaSidebarItemTitle.vue'

export const VaSidebarItemContent = withConfigTransport(VaSidebarItemContentComponent)
export const VaSidebarItemTitle = withConfigTransport(VaSidebarItemTitleComponent)

export default withConfigTransport(VaSidebarItem)
