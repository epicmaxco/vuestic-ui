import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaProgressBar
  from 'vuestic-ui/src/components/va-progress-bar/VaProgressBar.vue'
import apiOptions from './api-options'

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

  block.subtitle('all.api'),
  block.api(VaProgressBar, apiOptions),
]

export default config
