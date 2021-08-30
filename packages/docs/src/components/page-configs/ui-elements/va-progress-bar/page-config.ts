import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaProgressBar
  from 'vuestic-ui/src/components/va-progress-bar/progress-types/VaProgressBar.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('progressBar.title'),
  DocsHelper.paragraph('progressBar.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'progressBar.examples.default.title',
    'progressBar.examples.default.text',
    'va-progress-bar/Default',
  ),
  ...DocsHelper.exampleBlock(
    'progressBar.examples.indeterminate.title',
    'progressBar.examples.indeterminate.text',
    'va-progress-bar/Indeterminate',
  ),
  ...DocsHelper.exampleBlock(
    'progressBar.examples.coloring.title',
    'progressBar.examples.coloring.text',
    'va-progress-bar/Coloring',
  ),
  ...DocsHelper.exampleBlock(
    'progressBar.examples.sizing.title',
    'progressBar.examples.sizing.text',
    'va-progress-bar/Sizing',
  ),
  ...DocsHelper.exampleBlock(
    'progressBar.examples.slots.title',
    'progressBar.examples.slots.text',
    'va-progress-bar/Slots',
  ),
  ...DocsHelper.exampleBlock(
    'progressBar.examples.buffer.title',
    'progressBar.examples.buffer.text',
    'va-progress-bar/Buffer',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaProgressBar, apiOptions),
]

export default config
