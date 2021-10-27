import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaProgressBar
  from 'vuestic-ui/src/components/va-progress-bar/progress-types/VaProgressBar.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/progress-bar'

const config: ApiDocsBlock[] = [
  DocsHelper.title('progressBar.title'),
  DocsHelper.paragraph('progressBar.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'progressBar.examples.default.title',
    'progressBar.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'progressBar.examples.indeterminate.title',
    'progressBar.examples.indeterminate.text',
    configPath,
    'Indeterminate',
  ),
  ...DocsHelper.exampleBlock(
    'progressBar.examples.coloring.title',
    'progressBar.examples.coloring.text',
    configPath,
    'Coloring',
  ),
  ...DocsHelper.exampleBlock(
    'progressBar.examples.sizing.title',
    'progressBar.examples.sizing.text',
    configPath,
    'Sizing',
  ),
  ...DocsHelper.exampleBlock(
    'progressBar.examples.slots.title',
    'progressBar.examples.slots.text',
    configPath,
    'Slots',
  ),
  ...DocsHelper.exampleBlock(
    'progressBar.examples.buffer.title',
    'progressBar.examples.buffer.text',
    configPath,
    'Buffer',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaProgressBar, apiOptions),
]

export default config
