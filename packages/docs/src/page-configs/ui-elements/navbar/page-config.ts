import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaNavbar from 'vuestic-ui/src/components/va-navbar/VaNavbar.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-navbar/_variables.scss')

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

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
