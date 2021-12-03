import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { TranslationStatusPath, languages } from '../../../locales'
import { TableData, TableColumn } from '../../../components/DocsTable/DocsTableTypes'

const columns: TableColumn[] = [
  'translation.table.language',
  'translation.table.code',
  'translation.table.supported',
]

const translationStatusPaths: TranslationStatusPath = {
  full: 'translation.status.full',
  part: 'translation.status.part',
}

const translationStatuses: TableData = languages.map((lang) => [
  lang.translationPath,
  lang.code,
  translationStatusPaths[lang.status as keyof TranslationStatusPath],
])

export const translationSync = 'yarn sync:translation <target locale file>'
export const searchUnusedTranslations = 'yarn search:unused:translation'
export const searchMissedTranslations = 'yarn search:missed:translation'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('translation.title'),
  block.paragraph('translation.description'),
  block.table(columns, translationStatuses),

  block.subtitle('translation.sync.title'),
  block.paragraph('translation.sync.description'),
  block.code(translationSync, 'bash'),

  block.subtitle('translation.unused.title'),
  block.paragraph('translation.unused.description'),
  block.code(searchUnusedTranslations, 'bash'),

  block.subtitle('translation.missed.title'),
  block.paragraph('translation.missed.description'),
  block.code(searchMissedTranslations, 'bash'),
]

export default config
