import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaButtonToggle from 'vuestic-ui/src/components/va-button-toggle/VaButtonToggle.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('buttonToggle.title'),
  DocsHelper.paragraph('buttonToggle.summaryText'),

  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'buttonToggle.examples.default.title',
    'buttonToggle.examples.default.text',
    'va-button-toggle/Default',
  ),
  ...DocsHelper.exampleBlock(
    'buttonToggle.examples.colors.title',
    'buttonToggle.examples.colors.text',
    'va-button-toggle/Colors',
  ),
  ...DocsHelper.exampleBlock(
    'buttonToggle.examples.toggleColor.title',
    'buttonToggle.examples.toggleColor.text',
    'va-button-toggle/ToggleColor',
  ),
  ...DocsHelper.exampleBlock(
    'buttonToggle.examples.gradient.title',
    'buttonToggle.examples.gradient.text',
    'va-button-toggle/Gradient',
  ),
  ...DocsHelper.exampleBlock(
    'buttonToggle.examples.sizes.title',
    'buttonToggle.examples.sizes.text',
    'va-button-toggle/Sizes',
  ),
  ...DocsHelper.exampleBlock(
    'buttonToggle.examples.styles.title',
    'buttonToggle.examples.styles.text',
    'va-button-toggle/Styles',
  ),
  ...DocsHelper.exampleBlock(
    'buttonToggle.examples.disabled.title',
    'buttonToggle.examples.disabled.text',
    'va-button-toggle/Disabled',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaButtonToggle, apiOptions),
]

export default config
