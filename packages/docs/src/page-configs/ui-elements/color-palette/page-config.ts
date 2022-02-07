import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaColorPalette from 'vuestic-ui/src/components/va-color-palette/VaColorPalette.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('colorPalette.title'),
  block.paragraph('colorPalette.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'colorPalette.examples.default.title',
    'colorPalette.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'colorPalette.examples.indicator.title',
    'colorPalette.examples.indicator.text',
    'Indicator',
  ),

  block.subtitle('all.api'),
  block.api(VaColorPalette, apiOptions),
]

export default config
