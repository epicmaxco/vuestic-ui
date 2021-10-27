import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaButton from 'vuestic-ui/src/components/va-button/VaButton.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/button'

const config: ApiDocsBlock[] = [
  DocsHelper.title('button.title'),
  DocsHelper.paragraph('button.summaryText'),

  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'button.examples.default.title',
    'button.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withColor.title',
    'button.examples.withColor.text',
    configPath,
    'WithColor',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withGradient.title',
    'button.examples.withGradient.text',
    configPath,
    'WithGradient',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withTextColor.title',
    'button.examples.withTextColor.text',
    configPath,
    'WithTextColor',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withSize.title',
    'button.examples.withSize.text',
    configPath,
    'WithSize',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withStyle.title',
    'button.examples.withStyle.text',
    configPath,
    'WithStyle',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withIcon.title',
    'button.examples.withIcon.text',
    configPath,
    'WithIcon',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withConfig.title',
    'button.examples.withConfig.text',
    configPath,
    'WithConfig',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.withLoading.title',
    'button.examples.withLoading.text',
    configPath,
    'WithLoading',
  ),
  ...DocsHelper.exampleBlock(
    'button.examples.disabled.title',
    'button.examples.disabled.text',
    configPath,
    'Disabled',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaButton, apiOptions),
]

export default config
