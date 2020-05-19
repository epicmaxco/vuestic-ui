import { ApiDocsBlock, BlockType } from '../../../types/configTypes'
import VaTabs
  from '../../../../ui/src/components/vuestic-components/va-tabs/VaTabs.vue'
import apiOptions from './api-options'
import { VueConstructor } from 'vue'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'tabs.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tabs.paragraph',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'tabs.basic.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tabs.basic.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tabs/Basic',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'pagination.examples.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'pagination.examples.paragraph',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tabs.examples.pagination.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tabs.examples.pagination.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tabs/Pagination',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tabs.examples.vertical.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tabs.examples.vertical.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tabs/Vertical',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tabs.examples.stateful.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tabs.examples.stateful.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tabs/Stateful',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'tabs.api.subtitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tabs.api.paragraph',
  },
  {
    type: BlockType.API,
    componentOptions: VaTabs as unknown as VueConstructor,
    apiOptions: apiOptions,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'tabs.faq.subtitle',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tabs.faq.questions[0].question',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tabs.faq.questions[0].answer',
  },
] as ApiDocsBlock[]
