import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaParallax from 'vuestic-ui/src/components/vuestic-components/va-parallax/VaParallax.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'parallax.title',
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
    componentOptions: VaParallax,
    apiOptions,
  },
] as ApiDocsBlock[]
