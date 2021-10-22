import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaPagination from 'vuestic-ui/src/components/va-pagination/VaPagination.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-pagination'

const config: ApiDocsBlock[] = [
  DocsHelper.title('pagination.title'),
  DocsHelper.paragraph('pagination.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'pagination.examples.default.title',
    'pagination.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'pagination.examples.colors.title',
    'pagination.examples.colors.text',
    configPath,
    'Colors',
  ),
  ...DocsHelper.exampleBlock(
    'pagination.examples.sizes.title',
    'pagination.examples.sizes.text',
    configPath,
    'Sizes',
  ),
  ...DocsHelper.exampleBlock(
    'pagination.examples.limitVisible.title',
    'pagination.examples.limitVisible.text',
    configPath,
    'LimitVisible',
  ),
  ...DocsHelper.exampleBlock(
    'pagination.examples.icons.title',
    'pagination.examples.icons.text',
    configPath,
    'Icons',
  ),
  ...DocsHelper.exampleBlock(
    'pagination.examples.withInput.title',
    'pagination.examples.withInput.text',
    configPath,
    'WithInput',
  ),
  ...DocsHelper.exampleBlock(
    'pagination.examples.totalAndPageSize.title',
    'pagination.examples.totalAndPageSize.text',
    configPath,
    'TotalAndPageSize',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaPagination, apiOptions),

  DocsHelper.subtitle('all.faq'),

  DocsHelper.headline('pagination.faq.questions[0].question'),
  DocsHelper.paragraph('pagination.faq.questions[0].answer'),

  DocsHelper.headline('pagination.faq.questions[1].question'),
  DocsHelper.paragraph('pagination.faq.questions[1].answer'),
]

export default config
