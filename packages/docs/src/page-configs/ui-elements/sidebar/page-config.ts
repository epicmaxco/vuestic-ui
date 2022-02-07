import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaSidebar from 'vuestic-ui/src/components/va-sidebar/VaSidebar.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('sidebar.title'),
  block.paragraph('sidebar.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'sidebar.examples.default.title',
    'sidebar.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'sidebar.examples.minimized.title',
    'sidebar.examples.minimized.text',
    'Minimized',
  ),
  ...block.exampleBlock(
    'sidebar.examples.width.title',
    'sidebar.examples.width.text',
    'Width',
  ),
  ...block.exampleBlock(
    'sidebar.examples.minimizedWidth.title',
    'sidebar.examples.minimizedWidth.text',
    'MinimizedWidth',
  ),
  ...block.exampleBlock(
    'sidebar.examples.color.title',
    'sidebar.examples.color.text',
    'Color',
  ),
  ...block.exampleBlock(
    'sidebar.examples.gradient.title',
    'sidebar.examples.gradient.text',
    'Gradient',
  ),
  ...block.exampleBlock(
    'sidebar.examples.position.title',
    'sidebar.examples.position.text',
    'Position',
  ),
  ...block.exampleBlock(
    'sidebar.examples.hoverable.title',
    'sidebar.examples.hoverable.text',
    'Hoverable',
  ),
  ...block.exampleBlock(
    'sidebar.examples.vModel.title',
    'sidebar.examples.vModel.text',
    'VModel',
  ),

  block.subtitle('all.api'),
  block.api(VaSidebar, apiOptions),

  block.subtitle('all.faq'),
  block.headline('sidebar.faq.questions[0].question'),
  block.paragraph('sidebar.faq.questions[0].answer'),
]

export default config
