import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaAccordion from 'vuestic-ui/src/components/va-accordion/VaAccordion.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('accordion.title'),
  block.paragraph('accordion.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'accordion.examples.default.title',
    'accordion.examples.default.text',
    'Default',
  ),

  ...block.exampleBlock(
    'accordion.examples.multiple.title',
    'accordion.examples.multiple.text',
    'Multiple',
  ),

  ...block.exampleBlock(
    'accordion.examples.inset.title',
    'accordion.examples.inset.text',
    'Inset',
  ),

  ...block.exampleBlock(
    'accordion.examples.popout.title',
    'accordion.examples.popout.text',
    'Popout',
  ),

  ...block.exampleBlock(
    'accordion.examples.flat.title',
    '',
    'Flat',
  ),

  ...block.exampleBlock(
    'accordion.examples.menu.title',
    'accordion.examples.menu.text',
    'Menu',
  ),

  block.subtitle('all.api'),
  block.api(VaAccordion, apiOptions),
]

export default config
