import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaHover from 'vuestic-ui/src/components/va-hover/VaHover.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/hover'

const config: ApiDocsBlock[] = [
  DocsHelper.title('hover.title'),
  DocsHelper.paragraph('hover.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'hover.examples.vModel.title',
    'hover.examples.vModel.text',
    configPath,
    'VModel',
  ),
  ...DocsHelper.exampleBlock(
    'hover.examples.slot.title',
    'hover.examples.slot.text',
    configPath,
    'Slot',
  ),
  ...DocsHelper.exampleBlock(
    'hover.examples.disabled.title',
    'hover.examples.disabled.text',
    configPath,
    'Disabled',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaHover, apiOptions),

  DocsHelper.subtitle('all.faq'),
  DocsHelper.headline('hover.faq.questions[0].question'),
  DocsHelper.paragraph('hover.faq.questions[0].answer'),
]

export default config
