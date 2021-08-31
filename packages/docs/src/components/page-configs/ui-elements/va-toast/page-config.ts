import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaToast from 'vuestic-ui/src/components/va-toast/VaToast.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('toast.title'),
  DocsHelper.paragraph('toast.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'toast.examples.default.title',
    'toast.examples.default.text',
    'va-toast/Default',
  ),
  ...DocsHelper.exampleBlock(
    'toast.examples.color.title',
    'toast.examples.color.text',
    'va-toast/Color',
  ),
  ...DocsHelper.exampleBlock(
    'toast.examples.offset.title',
    'toast.examples.offset.text',
    'va-toast/Offset',
  ),
  ...DocsHelper.exampleBlock(
    'toast.examples.position.title',
    'toast.examples.position.text',
    'va-toast/Position',
  ),
  ...DocsHelper.exampleBlock(
    'toast.examples.close.title',
    'toast.examples.close.text',
    'va-toast/Close',
  ),
  ...DocsHelper.exampleBlock(
    'toast.examples.click.title',
    'toast.examples.click.text',
    'va-toast/Click',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaToast, apiOptions),

  DocsHelper.subtitle('all.faq'),
  DocsHelper.headline('toast.faq.questions[0].question'),
  DocsHelper.paragraph('toast.faq.questions[0].answer'),
]

export default config
