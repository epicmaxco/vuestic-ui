import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaButtonGroup from 'vuestic-ui/src/components/va-button-group/VaButtonGroup.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-button-group/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('buttonGroup.title'),
  block.paragraph('buttonGroup.summaryText'),

  block.subtitle('all.examples'),
  ...block.exampleBlock(
    'buttonGroup.examples.default.title',
    'buttonGroup.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'buttonGroup.examples.colors.title',
    'buttonGroup.examples.colors.text',
    'Colors',
  ),
  ...block.exampleBlock(
    'buttonGroup.examples.gradient.title',
    'buttonGroup.examples.gradient.text',
    'Gradient',
  ),
  ...block.exampleBlock(
    'buttonGroup.examples.sizes.title',
    'buttonGroup.examples.sizes.text',
    'Sizes',
  ),
  ...block.exampleBlock(
    'buttonGroup.examples.grow.title',
    'buttonGroup.examples.grow.text',
    'Grow',
  ),
  ...block.exampleBlock(
    'buttonGroup.examples.styles.title',
    'buttonGroup.examples.styles.text',
    'Styles',
  ),
  ...block.exampleBlock(
    'buttonGroup.examples.icons.title',
    'buttonGroup.examples.icons.text',
    'Icons',
  ),

  block.subtitle('all.api'),
  block.api(VaButtonGroup, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
