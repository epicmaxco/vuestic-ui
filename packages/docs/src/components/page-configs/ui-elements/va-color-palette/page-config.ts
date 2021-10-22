import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaColorPalette from 'vuestic-ui/src/components/va-color-palette/VaColorPalette.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-color-palette'

const config: ApiDocsBlock[] = [
  DocsHelper.title('colorPalette.title'),
  DocsHelper.paragraph('colorPalette.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'colorPalette.examples.default.title',
    'colorPalette.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'colorPalette.examples.indicator.title',
    'colorPalette.examples.indicator.text',
    configPath,
    'Indicator',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaColorPalette, apiOptions),
]

export default config
