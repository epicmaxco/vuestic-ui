import { ApiDocsBlock } from '@/types/configTypes'
import { DocsHelper } from '@/helpers/DocsHelper'
import { languages } from '@/components/languages'

const translationStatuses = languages.map((lang) => [
  `translation.language.${lang.code}`,
  lang.code,
  `translation.status.${lang.status}`
])

export default [
  DocsHelper.title('translation.title'),
  DocsHelper.paragraph('translation.description'),
  DocsHelper.table(
    ['translation.table.language', 'translation.table.code', 'translation.table.supported'],
    translationStatuses
  ),
] as ApiDocsBlock[]
