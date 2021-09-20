import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaTabs from 'vuestic-ui/src/components/va-tabs/VaTabs.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('tabs.title'),
  DocsHelper.paragraph('tabs.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'tabs.examples.default.title',
    'tabs.examples.default.text',
    'va-tabs/Default',
  ),
  ...DocsHelper.exampleBlock(
    'tabs.examples.pagination.title',
    'tabs.examples.pagination.text',
    'va-tabs/Pagination',
  ),
  ...DocsHelper.exampleBlock(
    'tabs.examples.vertical.title',
    'tabs.examples.vertical.text',
    'va-tabs/Vertical',
  ),
  ...DocsHelper.exampleBlock(
    'tabs.examples.stateful.title',
    'tabs.examples.stateful.text',
    'va-tabs/Stateful',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaTabs, apiOptions),

  DocsHelper.subtitle('all.faq'),
  DocsHelper.headline('tabs.faq.questions[0].question'),
  DocsHelper.paragraph('tabs.faq.questions[0].answer'),
]

export default config
