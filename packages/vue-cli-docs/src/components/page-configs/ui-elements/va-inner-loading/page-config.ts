import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaInnerLoading from 'vuestic-ui-dev/src/components/vuestic-components/va-inner-loading/VaInnerLoading.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'innerLoading.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'innerLoading.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'innerLoading.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'innerLoading.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-inner-loading/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'innerLoading.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'innerLoading.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-inner-loading/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'innerLoading.examples.size.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'innerLoading.examples.size.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-inner-loading/Size',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'innerLoading.examples.icon.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'innerLoading.examples.icon.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-inner-loading/Icon',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaInnerLoading,
    apiOptions,
  },
] as ApiDocsBlock[]
