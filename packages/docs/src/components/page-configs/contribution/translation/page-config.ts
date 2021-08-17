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

export const translationSync = `yarn sync:translation <target locale file>`
export const searchUnusedTranslations = `yarn search:unused:translation`
export const searchMissedTranslations = `yarn search:missed:translation`

export default [
  DocsHelper.title('translation.title'),
  DocsHelper.paragraph('translation.description'),
  DocsHelper.table(
    ['translation.table.language', 'translation.table.code', 'translation.table.supported'],
    translationStatuses
  ),

  DocsHelper.subtitle('translation.sync.title'),
  DocsHelper.paragraph('translation.sync.description'),
  DocsHelper.code(translationSync, 'bash'),

  DocsHelper.subtitle('translation.unused.title'),
  DocsHelper.paragraph('translation.unused.description'),
  DocsHelper.code(searchUnusedTranslations, 'bash'),

  DocsHelper.subtitle('translation.missed.title'),
  DocsHelper.paragraph('translation.missed.description'),
  DocsHelper.code(searchMissedTranslations, 'bash')
] as ApiDocsBlock[]
