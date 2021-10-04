import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaIcon from 'vuestic-ui/src/components/va-icon/VaIcon.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('icon.title'),
  DocsHelper.paragraph('icon.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'icon.examples.default.title',
    'icon.examples.default.text',
    'va-icon/Default',
  ),
  ...DocsHelper.exampleBlock(
    'icon.examples.color.title',
    'icon.examples.color.text',
    'va-icon/Color',
  ),
  ...DocsHelper.exampleBlock(
    'icon.examples.size.title',
    'icon.examples.size.text',
    'va-icon/Size',
  ),
  ...DocsHelper.exampleBlock(
    'icon.examples.rotation.title',
    'icon.examples.rotation.text',
    'va-icon/Rotation',
  ),
  ...DocsHelper.exampleBlock(
    'icon.examples.spin.title',
    'icon.examples.spin.text',
    'va-icon/Spin',
  ),
  ...DocsHelper.exampleBlock(
    'icon.examples.text.title',
    'icon.examples.text.text',
    'va-icon/Text',
  ),
  ...DocsHelper.exampleBlock(
    'icon.examples.tag.title',
    'icon.examples.tag.text',
    'va-icon/Tag',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaIcon, apiOptions),
]

export default config
