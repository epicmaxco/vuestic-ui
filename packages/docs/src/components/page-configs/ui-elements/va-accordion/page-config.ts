import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaAccordion from 'vuestic-ui/src/components/va-accordion/VaAccordion.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-accordion'
const config: ApiDocsBlock[] = [
  DocsHelper.title('accordion.title'),
  DocsHelper.paragraph('accordion.summaryText'),

  DocsHelper.subtitle('all.examples'),
  DocsHelper.headline('accordion.examples.default.title'),
  DocsHelper.paragraph('accordion.examples.default.text'),
  DocsHelper.example(configPath, 'Default'),

  DocsHelper.headline('accordion.examples.multiply.title'),
  DocsHelper.paragraph('accordion.examples.multiply.text'),
  DocsHelper.example(configPath, 'Multiply'),

  DocsHelper.headline('accordion.examples.inset.title'),
  DocsHelper.paragraph('accordion.examples.inset.text'),
  DocsHelper.example(configPath, 'Inset'),

  DocsHelper.headline('accordion.examples.popout.title'),
  DocsHelper.paragraph('accordion.examples.popout.text'),
  DocsHelper.example(configPath, 'Popout'),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaAccordion, apiOptions),
]

export default config
