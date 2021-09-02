import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaHover from 'vuestic-ui/src/components/va-hover/VaHover.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('hover.title'),
  DocsHelper.paragraph('hover.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'hover.examples.vModel.title',
    'hover.examples.vModel.text',
    'va-hover/VModel',
  ),
  ...DocsHelper.exampleBlock(
    'hover.examples.slot.title',
    'hover.examples.slot.text',
    'va-hover/Slot',
  ),
  ...DocsHelper.exampleBlock(
    'hover.examples.disabled.title',
    'hover.examples.disabled.text',
    'va-hover/Disabled',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaHover, apiOptions),

  DocsHelper.subtitle('all.faq'),
  DocsHelper.headline('hover.faq.questions[0].question'),
  DocsHelper.paragraph('hover.faq.questions[0].answer'),
]

export default config
