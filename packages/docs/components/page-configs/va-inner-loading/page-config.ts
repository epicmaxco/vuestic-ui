import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaInnerLoading from 'vuestic-ui/src/components/vuestic-components/va-inner-loading/VaInnerLoading.vue'
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
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaInnerLoading,
    apiOptions,
  },
] as ApiDocsBlock[]
