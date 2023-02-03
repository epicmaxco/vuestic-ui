import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaSkeleton from 'vuestic-ui/src/components/va-skeleton/VaSkeleton.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('skeleton.title'),

  block.subtitle('all.examples'),

  // examples
  ...block.exampleBlock(
    'skeleton.examples.yourExample.title',
    'skeleton.examples.yourExample.text',
    'Example',
  ),

  block.api(VaSkeleton, apiOptions),
]

export default config
