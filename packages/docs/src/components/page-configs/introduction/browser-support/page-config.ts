import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { t } from '@/helpers/I18nHelper'

export default [
  DocsHelper.title('browserSupport.title'),
  DocsHelper.paragraph('browserSupport.description'),
  DocsHelper.table(
    [t('browserSupport.table.browser'), t('browserSupport.table.supported')],
    [
      // TODO Figure exact versions we support. Show on hover.
      ['Chromium (Chrome, Edge)', '+'],
      ['Firefox', '+'],
      ['Safari (10+)', '+'],
      ['IE11/Safari 9', '-'],
    ]),
] as ApiDocsBlock[]
