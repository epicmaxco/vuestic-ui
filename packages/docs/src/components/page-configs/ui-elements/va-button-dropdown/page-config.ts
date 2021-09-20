import { DocsHelper } from '../../../../helpers/DocsHelper'
import { ApiDocsBlock } from '../../../../types/configTypes'
import VaButtonDropdown from 'vuestic-ui/src/components/va-button-dropdown/VaButtonDropdown.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('buttonDropdown.title'),
  DocsHelper.paragraph('buttonDropdown.summaryText'),
  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.default.title',
    'buttonDropdown.examples.default.text',
    'va-button-dropdown/Default',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.split.title',
    'buttonDropdown.examples.split.text',
    'va-button-dropdown/Split',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.colors.title',
    'buttonDropdown.examples.colors.text',
    'va-button-dropdown/Colors',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.sizes.title',
    'buttonDropdown.examples.sizes.text',
    'va-button-dropdown/Sizes',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.styles.title',
    'buttonDropdown.examples.styles.text',
    'va-button-dropdown/Styles',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.disabled.title',
    'buttonDropdown.examples.disabled.text',
    'va-button-dropdown/Disabled',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.icons.title',
    'buttonDropdown.examples.icons.text',
    'va-button-dropdown/Icons',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.events.title',
    'buttonDropdown.examples.events.text',
    'va-button-dropdown/Events',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.clickInside.title',
    'buttonDropdown.examples.clickInside.text',
    'va-button-dropdown/ClickInside',
  ),
  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaButtonDropdown, apiOptions),
]

export default config
