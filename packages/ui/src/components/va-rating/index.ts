import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaRating from './VaRating.vue'
export { default as VaRatingItem } from './components/VaRatingItem'

export const VaRating = withConfigTransport(_VaRating)
