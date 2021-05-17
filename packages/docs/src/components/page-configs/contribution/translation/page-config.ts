import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { t } from '@/helpers/I18nHelper'

export default [
  DocsHelper.title('translation.title'),
  DocsHelper.paragraph('translation.description'),
  DocsHelper.table(
    [t('translation.table.language'), t('translation.table.supported')],
    [
      ['English (en)', '+'],
      ['Spain (es)', 'partial'],
    ]),
] as ApiDocsBlock[]
