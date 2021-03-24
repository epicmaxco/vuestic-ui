import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaCollapse from 'vuestic-ui-dev/src/components/vuestic-components/va-collapse/VaCollapse.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'collapse.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'collapse.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'collapse.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'collapse.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-collapse/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'collapse.examples.solid.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'collapse.examples.solid.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-collapse/Solid',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'collapse.examples.icon.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'collapse.examples.icon.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-collapse/Icon',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'collapse.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'collapse.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-collapse/Color',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaCollapse,
    apiOptions,
  },
] as ApiDocsBlock[]
