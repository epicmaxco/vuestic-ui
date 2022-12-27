import withConfigTransport from '../../services/config-transport/withConfigTransport'

import _VaCard from './VaCard.vue'
import VaCardContentBase from './components/va-card-content/VaCardContent.vue'
import VaCardTitleBase from './components/va-card-title/VaCardTitle.vue'
import VaCardActionsBase from './components/va-card-actions/VaCardActions.vue'
import VaCardBlockBase from './components/va-card-block/VaCardBlock.vue'

export const VaCardContent = withConfigTransport(VaCardContentBase)
export const VaCardTitle = withConfigTransport(VaCardTitleBase)
export const VaCardActions = withConfigTransport(VaCardActionsBase)
export const VaCardBlock = withConfigTransport(VaCardBlockBase)

export const VaCard = withConfigTransport(_VaCard)
