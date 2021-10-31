import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaButton from 'vuestic-ui/src/components/va-button/VaButton.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('button.title'),
  block.paragraph('button.summaryText'),

  block.subtitle('all.examples'),
  ...block.exampleBlock(
    'button.examples.default.title',
    'button.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'button.examples.withColor.title',
    'button.examples.withColor.text',
    'WithColor',
  ),
  ...block.exampleBlock(
    'button.examples.withGradient.title',
    'button.examples.withGradient.text',
    'WithGradient',
  ),
  ...block.exampleBlock(
    'button.examples.withTextColor.title',
    'button.examples.withTextColor.text',
    'WithTextColor',
  ),
  ...block.exampleBlock(
    'button.examples.withSize.title',
    'button.examples.withSize.text',
    'WithSize',
  ),
  ...block.exampleBlock(
    'button.examples.withStyle.title',
    'button.examples.withStyle.text',
    'WithStyle',
  ),
  ...block.exampleBlock(
    'button.examples.withIcon.title',
    'button.examples.withIcon.text',
    'WithIcon',
  ),
  ...block.exampleBlock(
    'button.examples.withConfig.title',
    'button.examples.withConfig.text',
    'WithConfig',
  ),
  ...block.exampleBlock(
    'button.examples.withLoading.title',
    'button.examples.withLoading.text',
    'WithLoading',
  ),
  ...block.exampleBlock(
    'button.examples.disabled.title',
    'button.examples.disabled.text',
    'Disabled',
  ),

  block.subtitle('all.api'),
  block.api(VaButton, apiOptions),
]

export default config
