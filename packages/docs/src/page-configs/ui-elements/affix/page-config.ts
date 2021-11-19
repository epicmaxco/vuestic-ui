import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaAffix from 'vuestic-ui/src/components/va-affix/VaAffix.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('affix.title'),
  block.paragraph('affix.summaryText'),

  block.subtitle('all.examples'),
  block.headline('affix.examples.top.title'),
  block.example('Top'),

  block.headline('affix.examples.target.title'),
  block.example('Target'),

  block.headline('affix.examples.bottom.title'),
  block.example('Bottom'),

  block.subtitle('all.api'),
  block.api(VaAffix, apiOptions),
]

export default config
