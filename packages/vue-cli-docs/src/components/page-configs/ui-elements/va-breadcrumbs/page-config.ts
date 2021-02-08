import { ApiDocsBlock, BlockType } from '../../../../types/configTypes'
import VaBreadcrumbs from 'vuestic-ui-dev/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbs.vue'
import VaBreadcrumbsItem from 'vuestic-ui-dev/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbsItem.vue'
import { VueConstructor } from 'vue-class-component'
import vaBreadcrumbsApiOptions from './va-breadcrumbs-api-options'
import vaBreadcrumbsItemApiOptions from './va-breadcrumbs-item-api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'breadcrumbs.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.text',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'breadcrumbs.examples.default.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.examples.default.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-breadcrumbs/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'breadcrumbs.examples.align.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.examples.align.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-breadcrumbs/Align',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'breadcrumbs.examples.separator.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.examples.separator.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-breadcrumbs/Separator',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'breadcrumbs.examples.color.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.examples.color.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-breadcrumbs/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'breadcrumbs.examples.activeColor.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.examples.activeColor.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-breadcrumbs/ActiveColor',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'breadcrumbs.examples.item.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.examples.item.text',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-breadcrumbs/Item',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.api',
  },
  {
    type: BlockType.API,
    componentOptions: VaBreadcrumbs,
    apiOptions: vaBreadcrumbsApiOptions as unknown as VueConstructor,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'breadcrumbs.api.item.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.api.item.text',
  },
  {
    type: BlockType.API,
    componentOptions: VaBreadcrumbsItem,
    apiOptions: vaBreadcrumbsItemApiOptions as unknown as VueConstructor,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.faq',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'breadcrumbs.faq.questions[0].question',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.faq.questions[0].answer',
  },
] as ApiDocsBlock[]
