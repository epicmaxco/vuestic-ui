import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaBreadcrumbs from './VaBreadcrumbs.vue'
import VaBreadcrumbsItemBase from './VaBreadcrumbsItem/VaBreadcrumbsItem.vue'

export const VaBreadcrumbsItem = withConfigTransport(VaBreadcrumbsItemBase)

export const VaBreadcrumbs = withConfigTransport(_VaBreadcrumbs)
