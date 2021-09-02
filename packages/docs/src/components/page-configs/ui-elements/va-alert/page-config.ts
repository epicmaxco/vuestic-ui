import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaAlert from 'vuestic-ui/src/components/va-alert/VaAlert.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('alert.title'),
  DocsHelper.paragraph('alert.summaryText'),

  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'alert.examples.default.title',
    'alert.examples.default.text',
    'va-alert/Default',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.styles.title',
    'alert.examples.styles.text',
    'va-alert/Styles',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.color.title',
    'alert.examples.color.text',
    'va-alert/Color',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.border.title',
    'alert.examples.border.text',
    'va-alert/Border',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.dense.title',
    'alert.examples.dense.text',
    'va-alert/Dense',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.title.title',
    'alert.examples.title.text',
    'va-alert/Title',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.icon.title',
    'alert.examples.icon.text',
    'va-alert/Icon',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.closeable.title',
    'alert.examples.closeable.text',
    'va-alert/Closeable',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.center.title',
    'alert.examples.center.text',
    'va-alert/Center',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaAlert, apiOptions),
]

export default config
