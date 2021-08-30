import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaParallax from 'vuestic-ui/src/components/va-parallax/VaParallax.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('parallax.title'),
  DocsHelper.paragraph('parallax.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'parallax.examples.default.title',
    'parallax.examples.default.text',
    'va-parallax/Default',
  ),
  ...DocsHelper.exampleBlock(
    'parallax.examples.custom.title',
    'parallax.examples.custom.text',
    'va-parallax/Custom',
  ),
  ...DocsHelper.exampleBlock(
    'parallax.examples.reversed.title',
    'parallax.examples.reversed.text',
    'va-parallax/Reversed',
  ),
  ...DocsHelper.exampleBlock(
    'parallax.examples.slot.title',
    'parallax.examples.slot.text',
    'va-parallax/Slot',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaParallax, apiOptions),
]

export default config
