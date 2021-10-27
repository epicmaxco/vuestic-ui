import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaIcon from 'vuestic-ui/src/components/va-icon/VaIcon.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/icon'

const config: ApiDocsBlock[] = [
  DocsHelper.title('icon.title'),
  DocsHelper.paragraph('icon.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'icon.examples.default.title',
    'icon.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'icon.examples.color.title',
    'icon.examples.color.text',
    configPath,
    'Color',
  ),
  ...DocsHelper.exampleBlock(
    'icon.examples.size.title',
    'icon.examples.size.text',
    configPath,
    'Size',
  ),
  ...DocsHelper.exampleBlock(
    'icon.examples.rotation.title',
    'icon.examples.rotation.text',
    configPath,
    'Rotation',
  ),
  ...DocsHelper.exampleBlock(
    'icon.examples.spin.title',
    'icon.examples.spin.text',
    configPath,
    'Spin',
  ),
  ...DocsHelper.exampleBlock(
    'icon.examples.text.title',
    'icon.examples.text.text',
    configPath,
    'Text',
  ),
  ...DocsHelper.exampleBlock(
    'icon.examples.tag.title',
    'icon.examples.tag.text',
    configPath,
    'Tag',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaIcon, apiOptions),
]

export default config
