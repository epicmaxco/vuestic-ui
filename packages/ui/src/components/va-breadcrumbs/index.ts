import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaBreadcrumbs from './VaBreadcrumbs.vue'
import _VaBreadcrumbsItem from './VaBreadcrumbsItem/VaBreadcrumbsItem.vue'

export const VaBreadcrumbsItem = withConfigTransport(_VaBreadcrumbsItem)
export const VaBreadcrumbs = withConfigTransport(_VaBreadcrumbs)
