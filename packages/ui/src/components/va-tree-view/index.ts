import withConfigTransport from '../../services/config-transport/withConfigTransport'
import VaTreeView from './VaTreeView.vue'

export { default as VaTreeNode } from './VaTreeNode'

export default withConfigTransport(VaTreeView as any)
