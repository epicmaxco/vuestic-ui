import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaColorSlider from 'vuestic-ui/src/components/vuestic-components/va-color-slider/VaColorSlider.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'colorSlider.title',
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
    componentOptions: VaColorSlider,
    apiOptions,
  },
] as ApiDocsBlock[]
