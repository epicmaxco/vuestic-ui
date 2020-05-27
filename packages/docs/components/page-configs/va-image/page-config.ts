import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaImage from 'vuestic-ui/src/components/vuestic-components/va-image/VaImage.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'image.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'image.text',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'image.examples.default.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-image/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'image.examples.ratio.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'image.examples.ratio.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-image/Ratio',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'image.examples.contain.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'image.examples.contain.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-image/Contain',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'image.examples.slots.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'image.examples.slots.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-image/Slots',
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
