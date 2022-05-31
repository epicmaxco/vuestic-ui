import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

import { TableColumn, TableData } from '../../../components/DocsTable/DocsTableTypes'
import { colorsCustomClassesType, setupExample } from './code-examples'

const columns: TableColumn[] = [
  { title: 'prop', type: 'markdown' },
  { title: 'type', type: 'code' },
  { title: 'Description', type: 'markdown' },
]

const tableData: TableData = [
  ['colorsCustomClasses', colorsCustomClassesType, 'colorsCustomClasses.configDescription'],
]

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('colorsCustomClasses.title'),
  block.example('default'),

  block.subtitle('colorsCustomClasses.setup.title'),
  block.paragraph('colorsCustomClasses.setup.about'),
  block.code(setupExample),
  block.paragraph('colorsCustomClasses.setup.explanation'),
  block.paragraph('colorsCustomClasses.setup.example'),

  block.subtitle('classHelpersConfig.api.title'),
  block.table(columns, tableData),
]

export default config
