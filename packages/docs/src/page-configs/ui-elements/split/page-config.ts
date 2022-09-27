import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaSplit from 'vuestic-ui/src/components/va-split/VaSplit.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-split/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('split.title'),
  block.paragraph('split.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'split.examples.default.title',
    '',
    'Default',
  ),

  ...block.exampleBlock(
    'split.examples.vertical.title',
    'split.examples.vertical.text',
    'Vertical',
  ),

  ...block.exampleBlock(
    'split.examples.customGrabber.title',
    'split.examples.customGrabber.text',
    'CustomGrabber',
  ),

  ...block.exampleBlock(
    'split.examples.customLimits.title',
    'split.examples.customLimits.text',
    'CustomLimits',
  ),

  ...block.exampleBlock(
    'split.examples.snapping.title',
    'split.examples.snapping.text',
    'Snapping',
  ),

  ...block.exampleBlock(
    'split.examples.nested.title',
    'split.examples.nested.text',
    'Nested',
  ),

  ...block.exampleBlock(
    'split.examples.maximization.title',
    'split.examples.maximization.text',
    'Maximization',
  ),

  ...block.exampleBlock(
    'split.examples.disabled.title',
    'split.examples.disabled.text',
    'Disabled',
  ),

  block.subtitle('all.api'),
  block.api(VaSplit, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
