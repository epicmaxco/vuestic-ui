import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaBacktop from 'vuestic-ui/src/components/va-backtop/VaBacktop.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('backtop.title'),
  block.paragraph('backtop.summaryText'),

  block.subtitle('all.examples'),
  ...block.exampleBlock(
    'backtop.examples.default.title',
    'backtop.examples.default.text',
    'Default',
  ),

  block.subtitle('all.api'),
  block.api(VaBacktop, apiOptions),
]

export default config
