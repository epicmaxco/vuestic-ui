import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { ApiDocsBlock } from '@/types/configTypes'
import VaButtonDropdown from 'vuestic-ui/src/components/va-button-dropdown/VaButtonDropdown.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('buttonDropdown.title'),
  block.paragraph('buttonDropdown.summaryText'),
  block.subtitle('all.examples'),
  ...block.exampleBlock(
    'buttonDropdown.examples.default.title',
    'buttonDropdown.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'buttonDropdown.examples.split.title',
    'buttonDropdown.examples.split.text',
    'Split',
  ),
  ...block.exampleBlock(
    'buttonDropdown.examples.colors.title',
    'buttonDropdown.examples.colors.text',
    'Colors',
  ),
  ...block.exampleBlock(
    'buttonDropdown.examples.sizes.title',
    'buttonDropdown.examples.sizes.text',
    'Sizes',
  ),
  ...block.exampleBlock(
    'buttonDropdown.examples.styles.title',
    'buttonDropdown.examples.styles.text',
    'Styles',
  ),
  ...block.exampleBlock(
    'buttonDropdown.examples.disabled.title',
    'buttonDropdown.examples.disabled.text',
    'Disabled',
  ),
  ...block.exampleBlock(
    'buttonDropdown.examples.icons.title',
    'buttonDropdown.examples.icons.text',
    'Icons',
  ),
  ...block.exampleBlock(
    'buttonDropdown.examples.events.title',
    'buttonDropdown.examples.events.text',
    'Events',
  ),
  ...block.exampleBlock(
    'buttonDropdown.examples.clickInside.title',
    'buttonDropdown.examples.clickInside.text',
    'ClickInside',
  ),
  block.subtitle('all.api'),
  block.api(VaButtonDropdown, apiOptions),
]

export default config
