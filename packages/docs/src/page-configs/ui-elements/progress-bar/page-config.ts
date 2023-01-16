import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaProgressBar
  from 'vuestic-ui/src/components/va-progress-bar/VaProgressBar.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-progress-bar/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('progressBar.title'),
  block.paragraph('progressBar.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'progressBar.examples.default.title',
    'progressBar.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'progressBar.examples.indeterminate.title',
    'progressBar.examples.indeterminate.text',
    'Indeterminate',
  ),
  ...block.exampleBlock(
    'progressBar.examples.coloring.title',
    'progressBar.examples.coloring.text',
    'Coloring',
  ),
  ...block.exampleBlock(
    'progressBar.examples.sizing.title',
    'progressBar.examples.sizing.text',
    'Sizing',
  ),
  ...block.exampleBlock(
    'progressBar.examples.slots.title',
    'progressBar.examples.slots.text',
    'Slots',
  ),
  ...block.exampleBlock(
    'progressBar.examples.buffer.title',
    'progressBar.examples.buffer.text',
    'Buffer',
  ),
  ...block.exampleBlock(
    'progressBar.examples.max.title',
    'progressBar.examples.max.text',
    'Max',
  ),

  block.subtitle('all.api'),
  block.api(VaProgressBar, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
