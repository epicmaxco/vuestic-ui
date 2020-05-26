import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaImage from 'vuestic-ui/src/components/vuestic-components/va-image/VaImage.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'image.title',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-image/Example',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaImage,
    apiOptions,
  },
] as ApiDocsBlock[]
