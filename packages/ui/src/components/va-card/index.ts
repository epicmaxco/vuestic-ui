import withConfigTransport from '../../services/config-transport/withConfigTransport'
import VaCard from './VaCard.vue'
import VaCardContentBase from './VaCardContent.vue'
import VaCardTitleBase from './VaCardTitle.vue'
import VaCardActionsBase from './VaCardActions.vue'

export const VaCardContent = withConfigTransport(VaCardContentBase)
export const VaCardTitle = withConfigTransport(VaCardTitleBase)
export const VaCardActions = withConfigTransport(VaCardActionsBase)

export default withConfigTransport(VaCard)
