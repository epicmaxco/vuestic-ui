import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaCard from './VaCard.vue'
import VaCardContentBase from './VaCardContent.vue'
import VaCardTitleBase from './VaCardTitle.vue'

export const VaCardContent = withConfigTransport(VaCardContentBase)
export const VaCardTitle = withConfigTransport(VaCardTitleBase)

export default withConfigTransport(VaCard)
