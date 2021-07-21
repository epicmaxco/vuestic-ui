import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaContent from './VaContent.vue'
import VaContentBreakBase from './VaContentBreak.vue'

export default withConfigTransport(VaContent)
export const VaContentBreak = withConfigTransport(VaContentBreakBase)
