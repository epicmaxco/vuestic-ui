import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaInnerLoading from 'vuestic-ui/src/components/va-inner-loading/VaInnerLoading.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-inner-loading/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('innerLoading.title'),
  block.paragraph('innerLoading.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'innerLoading.examples.default.title',
    'innerLoading.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'innerLoading.examples.color.title',
    'innerLoading.examples.color.text',
    'Color',
  ),
  ...block.exampleBlock(
    'innerLoading.examples.size.title',
    'innerLoading.examples.size.text',
    'Size',
  ),
  ...block.exampleBlock(
    'innerLoading.examples.icon.title',
    'innerLoading.examples.icon.text',
    'Icon',
  ),

  block.subtitle('all.api'),
  block.api(VaInnerLoading, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
