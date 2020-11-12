import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaExpand from 'vuestic-ui/src/components/vuestic-components/va-expand/VaExpand.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'expand.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'expand.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'expand.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'expand.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-expand/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'expand.examples.solid.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'expand.examples.solid.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-expand/Solid',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'expand.examples.icon.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'expand.examples.icon.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-expand/Icon',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'expand.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'expand.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-expand/Color',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaExpand,
    apiOptions,
  },
] as ApiDocsBlock[]
