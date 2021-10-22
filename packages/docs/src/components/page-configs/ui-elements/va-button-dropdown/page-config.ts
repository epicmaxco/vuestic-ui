import { DocsHelper } from '../../../../helpers/DocsHelper'
import { ApiDocsBlock } from '../../../../types/configTypes'
import VaButtonDropdown from 'vuestic-ui/src/components/va-button-dropdown/VaButtonDropdown.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-button-dropdown'
const config: ApiDocsBlock[] = [
  DocsHelper.title('buttonDropdown.title'),
  DocsHelper.paragraph('buttonDropdown.summaryText'),
  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.default.title',
    'buttonDropdown.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.split.title',
    'buttonDropdown.examples.split.text',
    configPath,
    'Split',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.colors.title',
    'buttonDropdown.examples.colors.text',
    configPath,
    'Colors',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.sizes.title',
    'buttonDropdown.examples.sizes.text',
    configPath,
    'Sizes',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.styles.title',
    'buttonDropdown.examples.styles.text',
    configPath,
    'Styles',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.disabled.title',
    'buttonDropdown.examples.disabled.text',
    configPath,
    'Disabled',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.icons.title',
    'buttonDropdown.examples.icons.text',
    configPath,
    'Icons',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.events.title',
    'buttonDropdown.examples.events.text',
    configPath,
    'Events',
  ),
  ...DocsHelper.exampleBlock(
    'buttonDropdown.examples.clickInside.title',
    'buttonDropdown.examples.clickInside.text',
    configPath,
    'ClickInside',
  ),
  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaButtonDropdown, apiOptions),
]

export default config
