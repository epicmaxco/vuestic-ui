import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaTreeRoot from './VaTreeRoot.vue'

export { default as VaTreeNode } from './VaTreeNode'
export { default as VaTreeCategory } from './VaTreeCategory'

export default withConfigTransport(VaTreeRoot as any)
