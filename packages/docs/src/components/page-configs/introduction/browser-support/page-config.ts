import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('browserSupport.title'),
  DocsHelper.paragraph('browserSupport.description'),
  DocsHelper.table(
    ['browserSupport.table.browser', 'browserSupport.table.supported'],
    [
      // TODO Figure exact versions we support. Show on hover.
      ['Chromium (Chrome, Edge)', '+'],
      ['Firefox', '+'],
      ['Safari (10+)', '+'],
      ['IE11/Safari 9', '-'],
    ]),
] as ApiDocsBlock[]
