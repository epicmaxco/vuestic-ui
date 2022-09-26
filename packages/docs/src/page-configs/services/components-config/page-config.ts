import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import {
  componentsConfigCodeExample,
  componentsConfigCodeExampleDefaultSizes,
  componentsAllConfigCodeExample,
  componentsPresetsConfigCodeExample,
} from './code-examples'
import { TableColumn, TableData } from '../../../components/DocsTable/DocsTableTypes'

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
    'ComponentsAllConfig',
    '{ [propName: string]: any }',
    'componentsConfig.api.ComponentsAllConfig',
  ],
  [
    'ComponentsPresetsConfig',
    '{ [componentName: string]: { [propName: string]: any } }',
    'componentsConfig.api.ComponentsPresetsConfig',
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

  block.subtitle('componentsConfig.componentsPresets.title'),
  block.paragraph('componentsConfig.componentsPresets.subtitle'),
  block.code(componentsPresetsConfigCodeExample),
  block.example('presets'),

  block.subtitle('componentsConfig.vaConfig.title'),
  block.paragraph('componentsConfig.vaConfig.subtitle'),
  block.example('va-config'),
  block.paragraph('componentsConfig.vaConfig.explain'),

  block.subtitle('componentsConfig.priority.title'),
  block.paragraph('componentsConfig.priority.description'),
  block.example('priority', { hideCode: true }),

  block.subtitle('componentsConfig.defaultSizes.title'),
  block.paragraph('componentsConfig.defaultSizes.description'),
  block.code(componentsConfigCodeExampleDefaultSizes),

  // api
  block.subtitle('componentsConfig.api.title'),
  block.headline('componentsConfig.api.types'),
  block.table(columns, tableData),
]

export default config
