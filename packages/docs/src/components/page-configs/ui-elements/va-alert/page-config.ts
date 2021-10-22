import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaAlert from 'vuestic-ui/src/components/va-alert/VaAlert.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-alert'
const config: ApiDocsBlock[] = [
  DocsHelper.title('alert.title'),
  DocsHelper.paragraph('alert.summaryText'),

  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'alert.examples.default.title',
    'alert.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.styles.title',
    'alert.examples.styles.text',
    configPath,
    'Styles',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.color.title',
    'alert.examples.color.text',
    configPath,
    'Color',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.border.title',
    'alert.examples.border.text',
    configPath,
    'Border',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.dense.title',
    'alert.examples.dense.text',
    configPath,
    'Dense',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.title.title',
    'alert.examples.title.text',
    configPath,
    'Title',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.icon.title',
    'alert.examples.icon.text',
    configPath,
    'Icon',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.closeable.title',
    'alert.examples.closeable.text',
    configPath,
    'Closeable',
  ),
  ...DocsHelper.exampleBlock(
    'alert.examples.center.title',
    'alert.examples.center.text',
    configPath,
    'Center',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaAlert, apiOptions),
]

export default config
