import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaDivider from 'vuestic-ui/src/components/va-divider/VaDivider.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('divider.title'),
  DocsHelper.paragraph('divider.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'divider.examples.default.title',
    'divider.examples.default.text',
    'va-divider/Default',
  ),
  ...DocsHelper.exampleBlock(
    'divider.examples.customContent.title',
    'divider.examples.customContent.text',
    'va-divider/CustomContent',
  ),
  ...DocsHelper.exampleBlock(
    'divider.examples.vertical.title',
    'divider.examples.vertical.text',
    'va-divider/Vertical',
  ),
  ...DocsHelper.exampleBlock(
    'divider.examples.inset.title',
    'divider.examples.inset.text',
    'va-divider/Inset',
  ),
  ...DocsHelper.exampleBlock(
    'divider.examples.dashed.title',
    'divider.examples.dashed.text',
    'va-divider/Dashed',
  ),
  ...DocsHelper.exampleBlock(
    'divider.examples.withList.title',
    'divider.examples.withList.text',
    'va-divider/WithList',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaDivider, apiOptions),
]

export default config
