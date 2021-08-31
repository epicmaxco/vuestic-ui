import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaAppBar from 'vuestic-ui/src/components/va-app-bar/VaAppBar.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('appBar.title'),
  DocsHelper.paragraph('appBar.summaryText'),
  DocsHelper.subtitle('all.examples'),
  DocsHelper.headline('appBar.examples.default.title'),
  DocsHelper.paragraph('appBar.examples.default.text'),
  DocsHelper.example('va-app-bar/Default'),
  DocsHelper.headline('appBar.examples.color.title'),
  DocsHelper.paragraph('appBar.examples.color.text'),
  DocsHelper.example('va-app-bar/Color'),
  DocsHelper.headline('appBar.examples.bottom.title'),
  DocsHelper.paragraph('appBar.examples.bottom.text'),
  DocsHelper.example('va-app-bar/Bottom'),
  DocsHelper.headline('appBar.examples.hide.title'),
  DocsHelper.paragraph('appBar.examples.hide.text'),
  DocsHelper.example('va-app-bar/Hide'),
  DocsHelper.headline('appBar.examples.shadow.title'),
  DocsHelper.paragraph('appBar.examples.shadow.text'),
  DocsHelper.example('va-app-bar/Shadow'),
  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaAppBar, apiOptions),
]

export default config
