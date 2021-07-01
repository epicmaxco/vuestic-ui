import { ApiDocsBlock } from '@/types/configTypes'
import { DocsHelper } from '@/helpers/DocsHelper'
import { t } from '@/helpers/I18nHelper'
import { languages } from '@/components/languages'

const translationStatuses = languages.map((lang) => [`${lang.name} (${lang.code})`, lang.status])

export default [
  DocsHelper.title('translation.title'),
  DocsHelper.paragraph('translation.description'),
  DocsHelper.table(
    [t('translation.table.language'), t('translation.table.supported')],
    translationStatuses
  ),
] as ApiDocsBlock[]
