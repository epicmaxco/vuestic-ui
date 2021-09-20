import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaNavbar from 'vuestic-ui/src/components/va-navbar/VaNavbar.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('navbar.title'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'navbar.examples.default.title',
    'navbar.examples.default.text',
    'va-navbar/Default',
  ),
  ...DocsHelper.exampleBlock(
    'navbar.examples.colors.title',
    'navbar.examples.colors.text',
    'va-navbar/Colors',
  ),
  ...DocsHelper.exampleBlock(
    'navbar.examples.shape.title',
    'navbar.examples.shape.text',
    'va-navbar/Shape',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaNavbar, apiOptions),
]

export default config
