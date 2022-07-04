import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import _VaSidebarItem from './VaSidebarItem.vue'
import _VaSidebarItemContent from './VaSidebarItemContent.vue'
import _VaSidebarItemTitle from './VaSidebarItemTitle.vue'

export const VaSidebarItemContent = withConfigTransport(_VaSidebarItemContent)
export const VaSidebarItemTitle = withConfigTransport(_VaSidebarItemTitle)
export const VaSidebarItem = withConfigTransport(_VaSidebarItem)
