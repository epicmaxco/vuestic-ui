import { ApiDocsBlock } from '../../../../types/configTypes'
import VaProgressCircle
  from 'vuestic-ui-dev/src/components/vuestic-components/va-progress-bar/progress-types/VaProgressCircle.vue'
import apiOptions from './api-options'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('progressCircle.title'),
  DocsHelper.paragraph('progressCircle.summaryText'),

  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'progressCircle.examples.default.title',
    'progressCircle.examples.default.text',
    'va-progress-circle/Default',
  ),
  ...DocsHelper.exampleBlock(
    'progressCircle.examples.indeterminate.title',
    'progressCircle.examples.indeterminate.text',
    'va-progress-circle/Indeterminate',
  ),
  ...DocsHelper.exampleBlock(
    'progressCircle.examples.coloring.title',
    'progressCircle.examples.coloring.text',
    'va-progress-circle/Coloring',
  ),
  ...DocsHelper.exampleBlock(
    'progressCircle.examples.sizing.title',
    'progressCircle.examples.sizing.text',
    'va-progress-circle/Sizing',
  ),
  ...DocsHelper.exampleBlock(
    'progressCircle.examples.slots.title',
    'progressCircle.examples.slots.text',
    'va-progress-circle/Slots',
  ),
  ...DocsHelper.exampleBlock(
    'progressCircle.examples.thickness.title',
    'progressCircle.examples.thickness.text',
    'va-progress-circle/Thickness',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaProgressCircle, apiOptions),
] as ApiDocsBlock[]
