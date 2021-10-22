import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaCollapse from 'vuestic-ui/src/components/va-collapse/VaCollapse.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-collapse'

const config: ApiDocsBlock[] = [
  DocsHelper.title('collapse.title'),

  DocsHelper.paragraph('collapse.summaryText'),

  DocsHelper.subtitle('all.examples'),

  // examples
  ...DocsHelper.exampleBlock(
    'collapse.examples.default.title',
    'collapse.examples.default.text',
    configPath,
    'Default',
  ),

  ...DocsHelper.exampleBlock(
    'collapse.examples.solid.title',
    'collapse.examples.solid.text',
    configPath,
    'Solid',
  ),

  ...DocsHelper.exampleBlock(
    'collapse.examples.icon.title',
    'collapse.examples.icon.text',
    configPath,
    'Icon',
  ),

  ...DocsHelper.exampleBlock(
    'collapse.examples.color.title',
    'collapse.examples.color.text',
    configPath,
    'Color',
  ),

  DocsHelper.api(VaCollapse, apiOptions),
]

export default config
