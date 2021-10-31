import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import {
  componentsConfigCodeExample,
  componentsConfigCodeExampleDefaultSizes,
  componentsAllConfigCodeExample,
} from './code-examples'
import { TableColumn, TableData } from '../../../components/DocsTable/DocsTable'

const columns: TableColumn[] = [
  'Name',
  { title: 'Type', type: 'code' },
  { title: 'Description', type: 'markdown' },
]

const tableData: TableData = [
  [
    'ComponentsConfig',
    '{ [componentName: string]: Props }',
    'componentsConfig.api.ComponentConfig',
  ],
  [
    'Props',
    '{ [propName: string]: any }',
    'componentsConfig.api.ComponentsAllConfig',
  ],
]

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('componentsConfig.title'),
  block.paragraph('componentsConfig.subtitle'),
  block.code(componentsConfigCodeExample),

  block.paragraph('componentsConfig.demoTitle'),
  block.example('button'),

  block.subtitle('componentsConfig.componentsAll.title'),
  block.paragraph('componentsConfig.componentsAll.subtitle'),
  block.code(componentsAllConfigCodeExample),
  block.paragraph('componentsConfig.componentsAll.description'),

  block.subtitle('componentsConfig.vaConfig.title'),
  block.paragraph('componentsConfig.vaConfig.subtitle'),
  block.example('va-config'),
  block.paragraph('componentsConfig.vaConfig.explain'),

  block.subtitle('componentsConfig.defaultSizes.title'),
  block.paragraph('componentsConfig.defaultSizes.description'),
  block.code(componentsConfigCodeExampleDefaultSizes),

  // api
  block.subtitle('componentsConfig.api.title'),
  block.headline('componentsConfig.api.types'),
  block.table(columns, tableData),
]

export default config
