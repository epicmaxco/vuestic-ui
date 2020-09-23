import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaButtonToggle from 'vuestic-ui/src/components/vuestic-components/va-button-toggle/VaButtonToggle.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'buttonToggle.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'buttonToggle.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'buttonToggle.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'buttonToggle.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-button-toggle/Default',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaButtonToggle,
    apiOptions,
  },
] as ApiDocsBlock[]
