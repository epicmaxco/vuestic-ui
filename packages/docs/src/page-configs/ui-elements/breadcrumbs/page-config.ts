import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaBreadcrumbs from 'vuestic-ui/src/components/va-breadcrumbs/VaBreadcrumbs.vue'
import VaBreadcrumbsItem from 'vuestic-ui/src/components/va-breadcrumbs/VaBreadcrumbsItem/VaBreadcrumbsItem.vue'
import vaBreadcrumbsApiOptions from './va-breadcrumbs-api-options'
import vaBreadcrumbsItemApiOptions from './va-breadcrumbs-item-api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-breadcrumbs/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('breadcrumbs.title'),
  block.paragraph('breadcrumbs.text'),

  block.subtitle('all.examples'),
  ...block.exampleBlock(
    'breadcrumbs.examples.default.title',
    'breadcrumbs.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'breadcrumbs.examples.align.title',
    'breadcrumbs.examples.align.text',
    'Align',
  ),
  ...block.exampleBlock(
    'breadcrumbs.examples.separator.title',
    'breadcrumbs.examples.separator.text',
    'Separator',
  ),
  ...block.exampleBlock(
    'breadcrumbs.examples.color.title',
    'breadcrumbs.examples.color.text',
    'Color',
  ),
  ...block.exampleBlock(
    'breadcrumbs.examples.activeColor.title',
    'breadcrumbs.examples.activeColor.text',
    'ActiveColor',
  ),
  ...block.exampleBlock(
    'breadcrumbs.examples.item.title',
    'breadcrumbs.examples.item.text',
    'Item',
  ),

  block.subtitle('all.api'),
  block.api(VaBreadcrumbs, vaBreadcrumbsApiOptions),

  block.subtitle('breadcrumbs.api.item.title'),
  block.paragraph('breadcrumbs.api.item.text'),
  block.api(VaBreadcrumbsItem, vaBreadcrumbsItemApiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),

  block.subtitle('all.faq'),
  block.headline('breadcrumbs.faq.questions[0].question'),
  block.paragraph('breadcrumbs.faq.questions[0].answer'),
]

export default config
