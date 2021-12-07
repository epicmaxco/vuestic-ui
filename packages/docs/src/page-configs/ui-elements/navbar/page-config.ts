import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaNavbar from 'vuestic-ui/src/components/va-navbar/VaNavbar.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('navbar.title'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'navbar.examples.default.title',
    'navbar.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'navbar.examples.colors.title',
    'navbar.examples.colors.text',
    'Colors',
  ),
  ...block.exampleBlock(
    'navbar.examples.shape.title',
    'navbar.examples.shape.text',
    'Shape',
  ),

  block.subtitle('all.api'),
  block.api(VaNavbar, apiOptions),
]

export default config
