import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaNavbar from 'vuestic-ui/src/components/va-navbar/VaNavbar.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/navbar'

const config: ApiDocsBlock[] = [
  DocsHelper.title('navbar.title'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'navbar.examples.default.title',
    'navbar.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'navbar.examples.colors.title',
    'navbar.examples.colors.text',
    configPath,
    'Colors',
  ),
  ...DocsHelper.exampleBlock(
    'navbar.examples.shape.title',
    'navbar.examples.shape.text',
    configPath,
    'Shape',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaNavbar, apiOptions),
]

export default config
