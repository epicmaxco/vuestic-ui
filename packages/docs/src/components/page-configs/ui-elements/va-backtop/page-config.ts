import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaBacktop from 'vuestic-ui/src/components/va-backtop/VaBacktop.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('backtop.title'),
  DocsHelper.paragraph('backtop.summaryText'),

  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'backtop.examples.default.title',
    'backtop.examples.default.text',
    'va-backtop/Default',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaBacktop, apiOptions),
]

export default config
