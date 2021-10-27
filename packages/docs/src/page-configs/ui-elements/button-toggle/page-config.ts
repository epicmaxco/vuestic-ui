import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaButtonToggle from 'vuestic-ui/src/components/va-button-toggle/VaButtonToggle.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/button-toggle'

const config: ApiDocsBlock[] = [
  DocsHelper.title('buttonToggle.title'),
  DocsHelper.paragraph('buttonToggle.summaryText'),

  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'buttonToggle.examples.default.title',
    'buttonToggle.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'buttonToggle.examples.colors.title',
    'buttonToggle.examples.colors.text',
    configPath,
    'Colors',
  ),
  ...DocsHelper.exampleBlock(
    'buttonToggle.examples.toggleColor.title',
    'buttonToggle.examples.toggleColor.text',
    configPath,
    'ToggleColor',
  ),
  ...DocsHelper.exampleBlock(
    'buttonToggle.examples.gradient.title',
    'buttonToggle.examples.gradient.text',
    configPath,
    'Gradient',
  ),
  ...DocsHelper.exampleBlock(
    'buttonToggle.examples.sizes.title',
    'buttonToggle.examples.sizes.text',
    configPath,
    'Sizes',
  ),
  ...DocsHelper.exampleBlock(
    'buttonToggle.examples.styles.title',
    'buttonToggle.examples.styles.text',
    configPath,
    'Styles',
  ),
  ...DocsHelper.exampleBlock(
    'buttonToggle.examples.disabled.title',
    'buttonToggle.examples.disabled.text',
    configPath,
    'Disabled',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaButtonToggle, apiOptions),
]

export default config
