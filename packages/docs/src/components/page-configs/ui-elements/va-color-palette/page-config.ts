import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaColorPalette from 'vuestic-ui/src/components/va-color-palette/VaColorPalette.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('colorPalette.title'),
  DocsHelper.paragraph('colorPalette.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'colorPalette.examples.default.title',
    'colorPalette.examples.default.text',
    'va-color-palette/Default',
  ),
  ...DocsHelper.exampleBlock(
    'colorPalette.examples.indicator.title',
    'colorPalette.examples.indicator.text',
    'va-color-palette/Indicator',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaColorPalette, apiOptions),
]

export default config
