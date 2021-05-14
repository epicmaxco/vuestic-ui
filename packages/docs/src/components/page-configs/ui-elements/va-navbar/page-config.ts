import { ApiDocsBlock } from '../../../../types/configTypes'
import VaNavbar from 'vuestic-ui/src/components/vuestic-components/va-navbar/VaNavbar.vue'
import apiOptions from './api-options'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('navbar.title'),

  DocsHelper.subtitle('all.examples'),

  // examples
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

  DocsHelper.api(VaNavbar, apiOptions),
] as ApiDocsBlock[]
