import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaCollapse from 'vuestic-ui/src/components/va-collapse/VaCollapse.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-collapse/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('collapse.title'),

  block.paragraph('collapse.summaryText'),

  block.subtitle('all.examples'),

  // examples
  ...block.exampleBlock(
    'collapse.examples.default.title',
    'collapse.examples.default.text',
    'Default',
  ),

  ...block.exampleBlock(
    'collapse.examples.solid.title',
    'collapse.examples.solid.text',
    'Solid',
  ),

  ...block.exampleBlock(
    'collapse.examples.icon.title',
    'collapse.examples.icon.text',
    'Icon',
  ),

  ...block.exampleBlock(
    'collapse.examples.color.title',
    'collapse.examples.color.text',
    'Color',
  ),

  ...block.exampleBlock(
    'collapse.examples.flat.title',
    '',
    'Flat',
  ),

  block.api(VaCollapse, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
