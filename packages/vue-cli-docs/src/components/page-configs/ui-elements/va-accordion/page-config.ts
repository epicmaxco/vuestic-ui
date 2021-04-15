import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import VaAccordion from 'vuestic-ui/src/components/vuestic-components/va-accordion/VaAccordion.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'accordion.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'accordion.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'accordion.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'accordion.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-accordion/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'accordion.examples.multiply.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'accordion.examples.multiply.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-accordion/Multiply',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'accordion.examples.inset.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'accordion.examples.inset.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-accordion/Inset',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'accordion.examples.popout.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'accordion.examples.popout.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-accordion/Popout',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaAccordion,
    apiOptions,
  },
] as ApiDocsBlock[]
