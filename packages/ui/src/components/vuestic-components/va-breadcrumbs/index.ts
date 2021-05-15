import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaBreadcrumbs from './VaBreadcrumbs.vue'
import VaBreadcrumbsItemBase from './VaBreadcrumbsItem/VaBreadcrumbsItem.vue'

export const VaBreadcrumbsItem = withConfigTransport(VaBreadcrumbsItemBase)

export default withConfigTransport(VaBreadcrumbs)
