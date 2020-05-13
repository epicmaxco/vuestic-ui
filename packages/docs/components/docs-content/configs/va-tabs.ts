import { ApiDocsBlock, BlockType } from '../../../types/configTypes'
import VaTabsApi from '../api/va-tabs/VaTabsApi.vue'

const config: ApiDocsBlock[] = [
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
    component: VaTabsApi,
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
]

export default config
