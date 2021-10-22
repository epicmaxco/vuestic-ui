import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaProgressCircle
  from 'vuestic-ui/src/components/va-progress-bar/progress-types/VaProgressCircle.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-progress-circle'

const config: ApiDocsBlock[] = [
  DocsHelper.title('progressCircle.title'),
  DocsHelper.paragraph('progressCircle.summaryText'),

  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'progressCircle.examples.default.title',
    'progressCircle.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'progressCircle.examples.indeterminate.title',
    'progressCircle.examples.indeterminate.text',
    configPath,
    'Indeterminate',
  ),
  ...DocsHelper.exampleBlock(
    'progressCircle.examples.coloring.title',
    'progressCircle.examples.coloring.text',
    configPath,
    'Coloring',
  ),
  ...DocsHelper.exampleBlock(
    'progressCircle.examples.sizing.title',
    'progressCircle.examples.sizing.text',
    configPath,
    'Sizing',
  ),
  ...DocsHelper.exampleBlock(
    'progressCircle.examples.slots.title',
    'progressCircle.examples.slots.text',
    configPath,
    'Slots',
  ),
  ...DocsHelper.exampleBlock(
    'progressCircle.examples.thickness.title',
    'progressCircle.examples.thickness.text',
    configPath,
    'Thickness',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaProgressCircle, apiOptions),
]

export default config
