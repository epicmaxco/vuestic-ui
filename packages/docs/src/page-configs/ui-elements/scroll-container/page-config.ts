import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaScrollContainer from 'vuestic-ui/src/components/va-scroll-container/VaScrollContainer.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('scrollContainer.title'),
  block.paragraph('scrollContainer.description'),

  block.subtitle('all.examples'),

  // examples
  ...block.exampleBlock(
    'scrollContainer.examples.Default.title',
    'scrollContainer.examples.Default.text',
    'Default',
  ),

  ...block.exampleBlock(
    'scrollContainer.examples.Color.title',
    'scrollContainer.examples.Color.text',
    'Color',
  ),

  block.api(VaScrollContainer, apiOptions),
]

export default config
