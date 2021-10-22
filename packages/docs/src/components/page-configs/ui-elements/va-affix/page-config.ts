import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaAffix from 'vuestic-ui/src/components/va-affix/VaAffix.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-affix'

const config: ApiDocsBlock[] = [
  DocsHelper.title('affix.title'),
  DocsHelper.paragraph('affix.summaryText'),

  DocsHelper.subtitle('all.examples'),
  DocsHelper.headline('affix.examples.top.title'),
  DocsHelper.example(configPath, 'Top'),

  DocsHelper.headline('affix.examples.target.title'),
  DocsHelper.example(configPath, 'Target'),

  DocsHelper.headline('affix.examples.bottom.title'),
  DocsHelper.example(configPath, 'Bottom'),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaAffix, apiOptions),
]

export default config
