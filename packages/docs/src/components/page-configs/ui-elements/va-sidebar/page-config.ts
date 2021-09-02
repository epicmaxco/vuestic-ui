import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaSidebar from 'vuestic-ui/src/components/va-sidebar/VaSidebar.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('sidebar.title'),
  DocsHelper.paragraph('sidebar.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'sidebar.examples.default.title',
    'sidebar.examples.default.text',
    'va-sidebar/Default',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.minimized.title',
    'sidebar.examples.minimized.text',
    'va-sidebar/Minimized',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.width.title',
    'sidebar.examples.width.text',
    'va-sidebar/Width',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.minimizedWidth.title',
    'sidebar.examples.minimizedWidth.text',
    'va-sidebar/MinimizedWidth',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.color.title',
    'sidebar.examples.color.text',
    'va-sidebar/Color',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.gradient.title',
    'sidebar.examples.gradient.text',
    'va-sidebar/Gradient',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.position.title',
    'sidebar.examples.position.text',
    'va-sidebar/Position',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.hoverable.title',
    'sidebar.examples.hoverable.text',
    'va-sidebar/Hoverable',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.vModel.title',
    'sidebar.examples.vModel.text',
    'va-sidebar/VModel',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaSidebar, apiOptions),

  DocsHelper.subtitle('all.faq'),
  DocsHelper.headline('sidebar.faq.questions[0].question'),
  DocsHelper.paragraph('sidebar.faq.questions[0].answer'),
]

export default config
