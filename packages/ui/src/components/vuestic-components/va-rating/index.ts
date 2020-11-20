import withConfigTransport from '../../../services/config-transport/withConfigTransport'
import VaRating from './VaRating.vue'
import VaRatingItemBase from './VaRatingItem.vue'

export const VaRatingItem = withConfigTransport(VaRatingItemBase)

export default withConfigTransport(VaRating)
