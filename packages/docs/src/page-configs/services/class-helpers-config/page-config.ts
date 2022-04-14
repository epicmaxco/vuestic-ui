import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import {
  defaultClasses,
  setupCodeExample,
  classHelpersType,
} from '@/page-configs/services/class-helpers-config/code-examples'

import { TableColumn, TableData } from '../../../components/DocsTable/DocsTableTypes'

const columns: TableColumn[] = [
  { title: 'prop', type: 'markdown' },
  { title: 'type', type: 'code' },
  { title: 'Description', type: 'markdown' },
]

const tableData: TableData = [
  ['classHelpers', classHelpersType, 'classHelpersConfig.configDescription'],
]

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('classHelpersConfig.title'),
  block.paragraph('classHelpersConfig.about'),
  block.paragraph('classHelpersConfig.default'),
  block.code(defaultClasses, 'scss'),
  block.paragraph('classHelpersConfig.defaultColors'),
  block.link('classHelpersConfig.readMoreAboutDefaultColor', '/styles/colors#default-color-themes'),

  // setup
  block.subtitle('classHelpersConfig.setup.title'),
  block.paragraph('classHelpersConfig.setup.about'),
  block.code(setupCodeExample),
  block.paragraph('classHelpersConfig.setup.explanation'),
  block.paragraph('classHelpersConfig.setup.example'),
  block.example('customClasses'),

  // api
  block.subtitle('classHelpersConfig.api.title'),
  block.table(columns, tableData),
]

export default config
