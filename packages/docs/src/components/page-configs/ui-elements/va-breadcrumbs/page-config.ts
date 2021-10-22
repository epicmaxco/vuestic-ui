import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaBreadcrumbs from 'vuestic-ui/src/components/va-breadcrumbs/VaBreadcrumbs.vue'
import VaBreadcrumbsItem from 'vuestic-ui/src/components/va-breadcrumbs/VaBreadcrumbsItem/VaBreadcrumbsItem.vue'
import vaBreadcrumbsApiOptions from './va-breadcrumbs-api-options'
import vaBreadcrumbsItemApiOptions from './va-breadcrumbs-item-api-options'

const configPath = 'ui-elements/va-breadcrumbs'

const config: ApiDocsBlock[] = [
  DocsHelper.title('breadcrumbs.title'),
  DocsHelper.paragraph('breadcrumbs.text'),

  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'breadcrumbs.examples.default.title',
    'breadcrumbs.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'breadcrumbs.examples.align.title',
    'breadcrumbs.examples.align.text',
    configPath,
    'Align',
  ),
  ...DocsHelper.exampleBlock(
    'breadcrumbs.examples.separator.title',
    'breadcrumbs.examples.separator.text',
    configPath,
    'Separator',
  ),
  ...DocsHelper.exampleBlock(
    'breadcrumbs.examples.color.title',
    'breadcrumbs.examples.color.text',
    configPath,
    'Color',
  ),
  ...DocsHelper.exampleBlock(
    'breadcrumbs.examples.activeColor.title',
    'breadcrumbs.examples.activeColor.text',
    configPath,
    'ActiveColor',
  ),
  ...DocsHelper.exampleBlock(
    'breadcrumbs.examples.item.title',
    'breadcrumbs.examples.item.text',
    configPath,
    'Item',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaBreadcrumbs, vaBreadcrumbsApiOptions),

  DocsHelper.subtitle('breadcrumbs.api.item.title'),
  DocsHelper.paragraph('breadcrumbs.api.item.text'),
  DocsHelper.api(VaBreadcrumbsItem, vaBreadcrumbsItemApiOptions),

  DocsHelper.subtitle('all.faq'),
  DocsHelper.headline('breadcrumbs.faq.questions[0].question'),
  DocsHelper.paragraph('breadcrumbs.faq.questions[0].answer'),
]

export default config
