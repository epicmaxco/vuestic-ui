import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaAccordion from 'vuestic-ui/src/components/va-accordion/VaAccordion.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('accordion.title'),
  DocsHelper.paragraph('accordion.summaryText'),

  DocsHelper.subtitle('all.examples'),
  DocsHelper.headline('accordion.examples.default.title'),
  DocsHelper.paragraph('accordion.examples.default.text'),
  DocsHelper.example('va-accordion/Default'),

  DocsHelper.headline('accordion.examples.multiply.title'),
  DocsHelper.paragraph('accordion.examples.multiply.text'),
  DocsHelper.example('va-accordion/Multiply'),

  DocsHelper.headline('accordion.examples.inset.title'),
  DocsHelper.paragraph('accordion.examples.inset.text'),
  DocsHelper.example('va-accordion/Inset'),

  DocsHelper.headline('accordion.examples.popout.title'),
  DocsHelper.paragraph('accordion.examples.popout.text'),
  DocsHelper.example('va-accordion/Popout'),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaAccordion, apiOptions),
]

export default config
