import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaCarousel from './VaCarousel.vue'
import _VaCarouselV2 from './VaCarouselV2.vue'

export const VaCarousel = withConfigTransport(_VaCarousel)
export const VaCarouselV2 = withConfigTransport(_VaCarouselV2)
