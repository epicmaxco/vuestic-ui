import { ApiDocsBlock } from '../../../../types/configTypes';
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { TranslationStatusPath, languages } from '../../../../locales';

const translationStatusPaths: TranslationStatusPath = {
  full: 'translation.status.full',
  part: 'translation.status.part',
}

const translationStatuses = languages.map((lang) => [
  lang.translationPath,
  lang.code,
  translationStatusPaths[lang.status as keyof TranslationStatusPath]
])

export default [
  DocsHelper.title('translation.title'),
  DocsHelper.paragraph('translation.description'),
  DocsHelper.table(
    ['translation.table.language', 'translation.table.code', 'translation.table.supported'],
    translationStatuses
  ),
] as ApiDocsBlock[]
