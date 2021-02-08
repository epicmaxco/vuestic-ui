import { ApiDocsBlock } from '../../../../types/configTypes'
import VaButtonToggle from 'vuestic-ui-dev/src/components/vuestic-components/va-button-toggle/VaButtonToggle.vue'
import apiOptions from './api-options'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
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
] as ApiDocsBlock[]
