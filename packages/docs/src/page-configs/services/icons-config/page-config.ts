import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import {
  aliasCodeExample,
  aliasesTransformationsExample,
  fontCodeExample,
  fontTransformationsExample,
  setupCodeExample,
} from '@/page-configs/services/icons-config/code-examples'

import { TableData, TableColumn } from '../../../components/DocsTable/DocsTableTypes'

const columns: TableColumn[] = [
  'Prop',
  { title: 'Type', type: 'code' },
  { title: 'Description', type: 'markdown' },
]

const tableData: TableData = [
  ['name', 'string | RegExp', 'iconsConfig.api.name'],
  [
    'class',
    'string | ((...dynamicSegments: string[]) => string) | undefined',
    'iconsConfig.api.iconClass',
  ],
  [
    'content',
    'string | ((...dynamicSegments: string[]) => string | undefined) | undefined',
    'iconsConfig.api.content',
  ],
  [
    'component',
    '`VueComponent | undefined`',
    'iconsConfig.api.component',
  ],
  [
    'componentProps',
    '`Record<string, any> | ((...dynamicSegments: string[]) => Record<string, any>) | undefined`',
    'iconsConfig.api.componentProps',
  ],
  ['to', '`string | undefined`', 'iconsConfig.api.to'],
  ['tag', '`string | undefined`', 'iconsConfig.api.tag'],
  ['color', '`string | undefined`', 'iconsConfig.api.color'],
  ['rotation', '`number | string | undefined`', 'iconsConfig.api.rotation'],
  ['spin', "`'clockwise' | 'counter-clockwise' | undefined`", 'iconsConfig.api.spin'],
]

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('iconsConfig.title'),
  block.paragraph('iconsConfig.about'),
  block.link('iconsConfig.readBeforeStart', '/ui-elements/icon'),

  block.paragraph('iconsConfig.problem.definition'),
  block.paragraph('iconsConfig.problem.materialIcons'),
  block.code('<span class="material-icons">star</span>'),

  block.paragraph('iconsConfig.problem.fontAwesome'),
  block.code('<i class="fas fa-star"></i>'),

  block.paragraph('iconsConfig.problem.summary'),

  // fonts
  block.subtitle('iconsConfig.fonts.title'),
  block.paragraph('iconsConfig.fonts.about'),

  block.headline('iconsConfig.fonts.fontNamePattern.title'),
  block.paragraph('iconsConfig.fonts.fontNamePattern.about'),
  block.example('font', { hideCode: true }),

  block.headline('iconsConfig.fonts.example.title'),
  block.paragraph('iconsConfig.fonts.example.about'),
  block.code(fontCodeExample),
  block.paragraph('iconsConfig.fonts.example.explain'),
  block.code(fontTransformationsExample),

  block.link(
    'iconsConfig.fonts.advancedFontsUsage',
    '/services/global-config',
    { preText: 'iconsConfig.fonts.readMore' },
  ),

  // aliases
  block.subtitle('iconsConfig.aliases.title'),
  block.paragraph('iconsConfig.aliases.about'),

  block.headline('iconsConfig.aliases.example.title'),
  block.code(aliasCodeExample),

  block.paragraph('iconsConfig.aliases.example.about'),
  block.code(aliasesTransformationsExample),
  block.paragraph('iconsConfig.aliases.example.explain'),

  // setup
  block.subtitle('iconsConfig.setup.title'),
  block.paragraph('iconsConfig.setup.about'),
  block.code(setupCodeExample),

  // api
  block.subtitle('iconsConfig.api.title'),
  block.table(columns, tableData),
]

export default config
