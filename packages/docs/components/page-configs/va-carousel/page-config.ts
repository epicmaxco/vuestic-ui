import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaCarousel from 'vuestic-ui/src/components/vuestic-components/va-carousel/VaCarousel.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'carousel.title',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaCarousel,
    apiOptions,
  },
] as ApiDocsBlock[]
