import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaAccordion from 'vuestic-ui/src/components/va-accordion/VaAccordion.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('accordion.title'),
  block.paragraph('accordion.summaryText'),

  block.subtitle('all.examples'),
  block.headline('accordion.examples.default.title'),
  block.paragraph('accordion.examples.default.text'),
  block.example('Default'),

  block.headline('accordion.examples.multiple.title'),
  block.paragraph('accordion.examples.multiple.text'),
  block.example('Multiple'),

  block.headline('accordion.examples.inset.title'),
  block.paragraph('accordion.examples.inset.text'),
  block.example('Inset'),

  block.headline('accordion.examples.popout.title'),
  block.paragraph('accordion.examples.popout.text'),
  block.example('Popout'),

  block.subtitle('all.api'),
  block.api(VaAccordion, apiOptions),
]

export default config
