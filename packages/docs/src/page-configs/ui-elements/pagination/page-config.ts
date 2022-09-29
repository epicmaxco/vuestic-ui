import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaPagination from 'vuestic-ui/src/components/va-pagination/VaPagination.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-pagination/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('pagination.title'),
  block.paragraph('pagination.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'pagination.examples.default.title',
    'pagination.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'pagination.examples.limitVisible.title',
    'pagination.examples.limitVisible.text',
    'LimitVisible',
  ),
  ...block.exampleBlock(
    'pagination.examples.presets.title',
    'pagination.examples.presets.text',
    'Presets',
  ),
  ...block.exampleBlock(
    'pagination.examples.colors.title',
    'pagination.examples.colors.text',
    'Colors',
  ),
  ...block.exampleBlock(
    'pagination.examples.gapped.title',
    'pagination.examples.gapped.text',
    'Gapped',
  ),
  ...block.exampleBlock(
    'pagination.examples.sizes.title',
    'pagination.examples.sizes.text',
    'Sizes',
  ),
  ...block.exampleBlock(
    'pagination.examples.bordered.title',
    'pagination.examples.bordered.text',
    'Bordered',
  ),
  ...block.exampleBlock(
    'pagination.examples.rounded.title',
    'pagination.examples.rounded.text',
    'Rounded',
  ),
  ...block.exampleBlock(
    'pagination.examples.activeColor.title',
    'pagination.examples.activeColor.text',
    'ActiveColor',
  ),
  ...block.exampleBlock(
    'pagination.examples.icons.title',
    'pagination.examples.icons.text',
    'Icons',
  ),
  ...block.exampleBlock(
    'pagination.examples.withInput.title',
    'pagination.examples.withInput.text',
    'WithInput',
  ),
  ...block.exampleBlock(
    'pagination.examples.totalAndPageSize.title',
    'pagination.examples.totalAndPageSize.text',
    'TotalAndPageSize',
  ),
  ...block.exampleBlock(
    'pagination.examples.prevAndNextLinks.title',
    'pagination.examples.prevAndNextLinks.text',
    'PrevAndNextLinks',
  ),

  block.subtitle('all.api'),
  block.api(VaPagination, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),

  block.subtitle('all.faq'),

  block.headline('pagination.faq.questions[0].question'),
  block.paragraph('pagination.faq.questions[0].answer'),

  block.headline('pagination.faq.questions[1].question'),
  block.paragraph('pagination.faq.questions[1].answer'),
]

export default config
