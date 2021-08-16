import { ApiDocsBlock } from '../../../../types/configTypes'
import VaCollapse from 'vuestic-ui/src/components/va-collapse/VaCollapse.vue'
import apiOptions from './api-options'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('collapse.title'),

  DocsHelper.paragraph('collapse.summaryText'),

  DocsHelper.subtitle('all.examples'),

  // examples
  ...DocsHelper.exampleBlock(
    'collapse.examples.default.title',
    'collapse.examples.default.text',
    'va-collapse/Default',
  ),

  ...DocsHelper.exampleBlock(
    'collapse.examples.solid.title',
    'collapse.examples.solid.text',
    'va-collapse/Solid',
  ),

  ...DocsHelper.exampleBlock(
    'collapse.examples.icon.title',
    'collapse.examples.icon.text',
    'va-collapse/Icon',
  ),

  ...DocsHelper.exampleBlock(
    'collapse.examples.color.title',
    'collapse.examples.color.text',
    'va-collapse/Color',
  ),

  DocsHelper.api(VaCollapse, apiOptions),
] as ApiDocsBlock[]
