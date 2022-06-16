import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaBacktop from 'vuestic-ui/src/components/va-backtop/VaBacktop.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-backtop/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('backtop.title'),
  block.paragraph('backtop.summaryText'),

  block.subtitle('all.examples'),
  ...block.exampleBlock(
    'backtop.examples.default.title',
    'backtop.examples.default.text',
    'Default',
  ),

  block.subtitle('all.api'),
  block.api(VaBacktop, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
