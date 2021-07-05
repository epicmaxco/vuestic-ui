import { ApiDocsBlock } from '@/types/configTypes'
import { DocsHelper } from '@/helpers/DocsHelper'
import { languages } from '@/components/languages'

const translationStatusPaths: { [key: string]: string } = {
  full: 'translation.status.full',
  part: 'translation.status.part',
}

const translationStatuses = languages.map((lang) => [
  lang.translationPath,
  lang.code,
  translationStatusPaths[lang.status]
])

export default [
  DocsHelper.title('translation.title'),
  DocsHelper.paragraph('translation.description'),
  DocsHelper.table(
    ['translation.table.language', 'translation.table.code', 'translation.table.supported'],
    translationStatuses
  ),
] as ApiDocsBlock[]
