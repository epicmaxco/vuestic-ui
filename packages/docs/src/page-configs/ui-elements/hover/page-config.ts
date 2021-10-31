import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaHover from 'vuestic-ui/src/components/va-hover/VaHover.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('hover.title'),
  block.paragraph('hover.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'hover.examples.vModel.title',
    'hover.examples.vModel.text',
    'VModel',
  ),
  ...block.exampleBlock(
    'hover.examples.slot.title',
    'hover.examples.slot.text',
    'Slot',
  ),
  ...block.exampleBlock(
    'hover.examples.disabled.title',
    'hover.examples.disabled.text',
    'Disabled',
  ),

  block.subtitle('all.api'),
  block.api(VaHover, apiOptions),

  block.subtitle('all.faq'),
  block.headline('hover.faq.questions[0].question'),
  block.paragraph('hover.faq.questions[0].answer'),
]

export default config
