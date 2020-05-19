import { ApiDocsBlock, BlockType } from '../../../types/configTypes'
import VaBreadcrumbs from 'vuestic-ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbs.vue'
import VaBreadcrumbsItem from 'vuestic-ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbsItem.vue'
import { VueConstructor } from 'vue'
import { vaBreadcrumbsApiOptions } from '../api/va-breadcrumbs/vaBreadcrumbsApiOptions'
import { vaBreadcrumbsItemApiOptions } from '../api/va-breadcrumbs/vaBreadcrumbsItemApiOptions'

const config: ApiDocsBlock[] = [
  {
    type: BlockType.TITLE,
    translationString: 'breadcrumbs.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.paragraph',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'all.examples',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'breadcrumbs.examples.default.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.examples.default.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-breadcrumbs/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'breadcrumbs.examples.align.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.examples.align.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-breadcrumbs/Align',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'breadcrumbs.examples.separator.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.examples.separator.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-breadcrumbs/Separator',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'breadcrumbs.examples.color.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.examples.color.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-breadcrumbs/Color',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'breadcrumbs.examples.activeColor.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.examples.activeColor.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-breadcrumbs/ActiveColor',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'breadcrumbs.examples.separatorColor.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.examples.separatorColor.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-breadcrumbs/SeparatorColor',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'breadcrumbs.examples.item.headline',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.examples.item.paragraph',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'va-breadcrumbs/Item',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'breadcrumbs.api.component.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'breadcrumbs.api.component.paragraph',
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
    translationString: 'breadcrumbs.api.item.paragraph',
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
]

export default config
