import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaTreeView from './VaTreeView.vue'

export { VaTreeNode } from './components/VaTreeNode'

export const VaTreeView = withConfigTransport(_VaTreeView)
