import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaImage from 'vuestic-ui-dev/src/components/vuestic-components/va-image/VaImage.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'image.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'image.summaryText',
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
    translationString: 'image.examples.defaultSlot.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'image.examples.defaultSlot.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-image/DefaultSlot',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'image.examples.loaderSlot.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'image.examples.loaderSlot.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-image/LoaderSlot',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'image.examples.errorSlot.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'image.examples.errorSlot.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-image/ErrorSlot',
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
