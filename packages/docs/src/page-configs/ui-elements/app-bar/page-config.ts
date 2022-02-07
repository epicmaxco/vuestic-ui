import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaAppBar from 'vuestic-ui/src/components/va-app-bar/VaAppBar.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('appBar.title'),
  block.paragraph('appBar.summaryText'),
  block.subtitle('all.examples'),
  block.headline('appBar.examples.default.title'),
  block.paragraph('appBar.examples.default.text'),
  block.example('Default'),
  block.headline('appBar.examples.color.title'),
  block.paragraph('appBar.examples.color.text'),
  block.example('Color'),
  block.headline('appBar.examples.bottom.title'),
  block.paragraph('appBar.examples.bottom.text'),
  block.example('Bottom'),
  block.headline('appBar.examples.hide.title'),
  block.paragraph('appBar.examples.hide.text'),
  block.example('Hide'),
  block.headline('appBar.examples.shadow.title'),
  block.paragraph('appBar.examples.shadow.text'),
  block.example('Shadow'),
  block.subtitle('all.api'),
  block.api(VaAppBar, apiOptions),
]

export default config
