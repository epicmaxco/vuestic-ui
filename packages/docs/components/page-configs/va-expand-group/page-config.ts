import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaExpandGroup from 'vuestic-ui/src/components/vuestic-components/va-expand-group/VaExpandGroup.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'expandGroup.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'expandGroup.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'expandGroup.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'expandGroup.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-expand-group/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'expandGroup.examples.multiply.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'expandGroup.examples.multiply.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-expand-group/Multiply',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'expandGroup.examples.inset.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'expandGroup.examples.inset.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-expand-group/Inset',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'expandGroup.examples.popout.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'expandGroup.examples.popout.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-expand-group/Popout',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaExpandGroup,
    apiOptions,
  },
] as ApiDocsBlock[]
