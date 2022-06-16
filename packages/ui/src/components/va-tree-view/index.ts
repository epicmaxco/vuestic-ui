import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaTreeView from './VaTreeView.vue'

export const VaTreeView = withConfigTransport(_VaTreeView)

export { VaTreeNode } from './VaTreeNode'
export { VaTreeCategory } from './VaTreeCategory'
