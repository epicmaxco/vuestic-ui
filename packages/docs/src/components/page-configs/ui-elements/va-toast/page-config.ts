import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaToast from 'vuestic-ui/src/components/va-toast/VaToast.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-toast'

const config: ApiDocsBlock[] = [
  DocsHelper.title('toast.title'),
  DocsHelper.paragraph('toast.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'toast.examples.default.title',
    'toast.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'toast.examples.color.title',
    'toast.examples.color.text',
    configPath,
    'Color',
  ),
  ...DocsHelper.exampleBlock(
    'toast.examples.offset.title',
    'toast.examples.offset.text',
    configPath,
    'Offset',
  ),
  ...DocsHelper.exampleBlock(
    'toast.examples.position.title',
    'toast.examples.position.text',
    configPath,
    'Position',
  ),
  ...DocsHelper.exampleBlock(
    'toast.examples.close.title',
    'toast.examples.close.text',
    configPath,
    'Close',
  ),
  ...DocsHelper.exampleBlock(
    'toast.examples.click.title',
    'toast.examples.click.text',
    configPath,
    'Click',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaToast, apiOptions),

  DocsHelper.subtitle('all.faq'),
  DocsHelper.headline('toast.faq.questions[0].question'),
  DocsHelper.paragraph('toast.faq.questions[0].answer'),
]

export default config
