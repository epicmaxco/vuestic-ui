import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaSidebar from 'vuestic-ui/src/components/va-sidebar/VaSidebar.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/sidebar'

const config: ApiDocsBlock[] = [
  DocsHelper.title('sidebar.title'),
  DocsHelper.paragraph('sidebar.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'sidebar.examples.default.title',
    'sidebar.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.minimized.title',
    'sidebar.examples.minimized.text',
    configPath,
    'Minimized',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.width.title',
    'sidebar.examples.width.text',
    configPath,
    'Width',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.minimizedWidth.title',
    'sidebar.examples.minimizedWidth.text',
    configPath,
    'MinimizedWidth',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.color.title',
    'sidebar.examples.color.text',
    configPath,
    'Color',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.gradient.title',
    'sidebar.examples.gradient.text',
    configPath,
    'Gradient',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.position.title',
    'sidebar.examples.position.text',
    configPath,
    'Position',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.hoverable.title',
    'sidebar.examples.hoverable.text',
    configPath,
    'Hoverable',
  ),
  ...DocsHelper.exampleBlock(
    'sidebar.examples.vModel.title',
    'sidebar.examples.vModel.text',
    configPath,
    'VModel',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaSidebar, apiOptions),

  DocsHelper.subtitle('all.faq'),
  DocsHelper.headline('sidebar.faq.questions[0].question'),
  DocsHelper.paragraph('sidebar.faq.questions[0].answer'),
]

export default config
