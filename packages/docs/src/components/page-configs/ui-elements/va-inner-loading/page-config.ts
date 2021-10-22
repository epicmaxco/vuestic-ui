import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaInnerLoading from 'vuestic-ui/src/components/va-inner-loading/VaInnerLoading.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-inner-loading'

const config: ApiDocsBlock[] = [
  DocsHelper.title('innerLoading.title'),
  DocsHelper.paragraph('innerLoading.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'innerLoading.examples.default.title',
    'innerLoading.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'innerLoading.examples.color.title',
    'innerLoading.examples.color.text',
    configPath,
    'Color',
  ),
  ...DocsHelper.exampleBlock(
    'innerLoading.examples.size.title',
    'innerLoading.examples.size.text',
    configPath,
    'Size',
  ),
  ...DocsHelper.exampleBlock(
    'innerLoading.examples.icon.title',
    'innerLoading.examples.icon.text',
    configPath,
    'Icon',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaInnerLoading, apiOptions),
]

export default config
