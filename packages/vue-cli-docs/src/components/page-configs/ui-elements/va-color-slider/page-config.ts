import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaColorSlider from 'vuestic-ui-dev/src/components/vuestic-components/va-color-slider/VaColorSlider.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'colorSlider.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorSlider.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'colorSlider.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'colorSlider.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-color-slider/Default',
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
