import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaToast from 'vuestic-ui/src/components/va-toast/VaToast.vue'
import apiOptions from './api-options'
import compositionApiExample from './examples/composition-api'
import optionsApiExample from './examples/options-api'
import { methodsApi, optionsApi } from './toast-api'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('toast.title'),
  block.paragraph('toast.summaryText'),
  block.paragraph('toast.optionsAPI'),
  block.code(optionsApiExample),

  block.paragraph('toast.compositionAPI'),
  block.code(compositionApiExample),

  methodsApi(block),
  block.subtitle('toast.toastOptionsHeader'),
  optionsApi(block),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'toast.examples.default.title',
    'toast.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'toast.examples.color.title',
    'toast.examples.color.text',
    'Color',
  ),
  ...block.exampleBlock(
    'toast.examples.offset.title',
    'toast.examples.offset.text',
    'Offset',
  ),
  ...block.exampleBlock(
    'toast.examples.position.title',
    'toast.examples.position.text',
    'Position',
  ),
  ...block.exampleBlock(
    'toast.examples.close.title',
    'toast.examples.close.text',
    'Close',
  ),
  ...block.exampleBlock(
    'toast.examples.click.title',
    'toast.examples.click.text',
    'Click',
  ),

  block.subtitle('all.api'),
  block.api(VaToast, apiOptions),

  block.subtitle('all.faq'),
  block.headline('toast.faq.questions[0].question'),
  block.paragraph('toast.faq.questions[0].answer'),
]

export default config
