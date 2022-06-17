import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaSpacer from 'vuestic-ui/src/components/va-spacer/VaSpacer.vue'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('spacer.title'),
  block.paragraph('spacer.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'spacer.examples.default.title',
    'spacer.examples.default.text',
    'Default',
  ),
]

export default config
