import withConfigTransport from '../../services/config-transport/withConfigTransport'
import _VaCarousel from './VaCarousel.vue'
import _VaCarouselV2 from './VaCarouselV2.vue'
import _VaCarouselGroup from './components/VaCarouselGroup.vue'
import _VaCarouselScrollContainer from './components/VaCarouselScrollContainer.vue'

export const VaCarousel = withConfigTransport(_VaCarousel)
export const VaCarouselV2 = withConfigTransport(_VaCarouselV2)
export const VaCarouselGroup = withConfigTransport(_VaCarouselGroup)
export const VaCarouselScrollContainer = withConfigTransport(_VaCarouselScrollContainer)
