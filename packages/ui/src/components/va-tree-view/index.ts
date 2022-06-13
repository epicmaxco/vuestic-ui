import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaTreeView from './VaTreeView.vue'

export { default as VaTreeNode } from './components/VaTreeNode'

export const VaTreeView = withConfigTransport(_VaTreeView)
