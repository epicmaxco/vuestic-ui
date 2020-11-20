import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaTabs, * as Components from './VaTabs.vue'

export const VaTab = withConfigTransport(Components.VaTab)
export const VaTabsItems = withConfigTransport(Components.VaTabsItems)
export const VaTabsContent = withConfigTransport(Components.VaTabsContent)

export default withConfigTransport(VaTabs)
