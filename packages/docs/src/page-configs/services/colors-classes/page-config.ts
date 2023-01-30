import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

import type { TableColumn, TableData } from '../../../components/DocsTable/DocsTableTypes'
import { colorsClassesType, setupExample } from './code-examples'

const block = new PageGenerationHelper(__dirname)

const columns: TableColumn[] = [
  { title: 'prop', type: 'markdown' },
  { title: 'type', type: 'code' },
  { title: 'Description', type: 'markdown' },
]

const tableData: TableData = [
  ['colorsClasses', colorsClassesType, 'colorsClasses.configDescription'],
]

const config: ApiDocsBlock[] = [
  block.title('colorsClasses.title'),
  block.paragraph('colorsClasses.about'),
  block.paragraph('colorsClasses.defaultColors'),
  block.paragraph('colorsClasses.readMoreAboutDefaultColor'),

  block.subtitle('colorsClasses.setup.title'),
  block.paragraph('colorsClasses.setup.about'),
  block.code(setupExample),
  block.paragraph('colorsClasses.setup.explanation'),
  block.paragraph('colorsClasses.setup.example'),
  block.example('Default'),

  block.subtitle('colorsClasses.api.title'),
  block.table(columns, tableData),
]

export default config
