import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaButton from 'vuestic-ui/src/components/va-button/VaButton.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('button.title'),
  DocsHelper.paragraph('button.summaryText'),

  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'button.examples.default.title',
    'button.examples.default.text',
    'va-button/Default',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withColor.title',
    'button.examples.withColor.text',
    'va-button/WithColor',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withGradient.title',
    'button.examples.withGradient.text',
    'va-button/WithGradient',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withTextColor.title',
    'button.examples.withTextColor.text',
    'va-button/WithTextColor',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withSize.title',
    'button.examples.withSize.text',
    'va-button/WithSize',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withStyle.title',
    'button.examples.withStyle.text',
    'va-button/WithStyle',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withIcon.title',
    'button.examples.withIcon.text',
    'va-button/WithIcon',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withConfig.title',
    'button.examples.withConfig.text',
    'va-button/WithConfig',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withLoading.title',
    'button.examples.withLoading.text',
    'va-button/WithLoading',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.disabled.title',
    'button.examples.disabled.text',
    'va-button/Disabled',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaButton, apiOptions),
]

export default config
