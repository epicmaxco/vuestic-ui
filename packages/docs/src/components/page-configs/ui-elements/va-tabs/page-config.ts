import { ApiDocsBlock, BlockType } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaTabs from 'vuestic-ui/src/components/va-tabs/VaTabs.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'tabs.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tabs.summaryText',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tabs.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tabs.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tabs/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tabs.examples.pagination.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tabs.examples.pagination.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tabs/Pagination',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tabs.examples.vertical.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tabs.examples.vertical.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tabs/Vertical',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'tabs.examples.stateful.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'tabs.examples.stateful.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-tabs/Stateful',
  },

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaTabs, apiOptions),

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
