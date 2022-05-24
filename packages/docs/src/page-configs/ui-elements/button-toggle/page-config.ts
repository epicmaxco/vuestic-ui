import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaButtonToggle from 'vuestic-ui/src/components/va-button-toggle/VaButtonToggle.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('buttonToggle.title'),
  block.paragraph('buttonToggle.summaryText'),

  block.subtitle('all.examples'),
  ...block.exampleBlock(
    'buttonToggle.examples.default.title',
    'buttonToggle.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'buttonToggle.examples.colors.title',
    'buttonToggle.examples.colors.text',
    'Colors',
  ),
  ...block.exampleBlock(
    'buttonToggle.examples.toggleColor.title',
    'buttonToggle.examples.toggleColor.text',
    'ToggleColor',
  ),
  ...block.exampleBlock(
    'buttonToggle.examples.gradient.title',
    'buttonToggle.examples.gradient.text',
    'Gradient',
  ),
  ...block.exampleBlock(
    'buttonToggle.examples.sizes.title',
    'buttonToggle.examples.sizes.text',
    'Sizes',
  ),
  ...block.exampleBlock(
    'buttonToggle.examples.styles.title',
    'buttonToggle.examples.styles.text',
    'Styles',
  ),
  ...block.exampleBlock(
    'buttonToggle.examples.disabled.title',
    'buttonToggle.examples.disabled.text',
    'Disabled',
  ),
  ...block.exampleBlock(
    'buttonToggle.examples.icons.title',
    'buttonToggle.examples.icons.text',
    'Icons',
  ),

  block.subtitle('all.api'),
  block.api(VaButtonToggle, apiOptions),
]

export default config
