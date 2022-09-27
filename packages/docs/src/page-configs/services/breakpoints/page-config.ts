import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { TableData, TableColumn } from '@/components/DocsTable/DocsTableTypes'
import { helpersCodeSetup, configCode, bodyClassCode } from '@/page-configs/services/breakpoints/code-examples'

const columnsHelpersTypes: TableColumn[] = [
  'name',
  { title: 'type', type: 'code' },
  { title: 'description', type: 'markdown' },
]

const tableDataHelpersTypes: TableData = [
  ['current', 'string<"xs" | "sm" | "md" | "lg" | "xl">', 'breakpoints.helpers.list.current'],
  ['thresholds', 'Record<"xs" | "sm" | "md" | "lg" | "xl", number>', 'breakpoints.helpers.list.thresholds'],
  ['width', 'number', 'breakpoints.helpers.list.width'],
  ['height', 'number', 'breakpoints.helpers.list.height'],
  ['xs', 'boolean', 'breakpoints.helpers.list.exactThreshold'],
  ['sm', 'boolean', 'breakpoints.helpers.list.exactThreshold'],
  ['md', 'boolean', 'breakpoints.helpers.list.exactThreshold'],
  ['lg', 'boolean', 'breakpoints.helpers.list.exactThreshold'],
  ['xl', 'boolean', 'breakpoints.helpers.list.exactThreshold'],
  ['smUp', 'boolean', 'breakpoints.helpers.list.upHelper'],
  ['mdUp', 'boolean', 'breakpoints.helpers.list.upHelper'],
  ['lgUp', 'boolean', 'breakpoints.helpers.list.upHelper'],
  ['smDown', 'boolean', 'breakpoints.helpers.list.downHelper'],
  ['mdDown', 'boolean', 'breakpoints.helpers.list.downHelper'],
  ['lgDown', 'boolean', 'breakpoints.helpers.list.downHelper'],
]

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('breakpoints.title'),
  block.paragraph('breakpoints.about'),
  block.example('Default'),

  block.paragraph('breakpoints.sizes.intro'),
  block.paragraph('breakpoints.sizes.xs'),
  block.paragraph('breakpoints.sizes.sm'),
  block.paragraph('breakpoints.sizes.md'),
  block.paragraph('breakpoints.sizes.lg'),
  block.paragraph('breakpoints.sizes.xl'),

  block.subtitle('breakpoints.helpers.title'),
  block.paragraph('breakpoints.helpers.about'),
  block.code(helpersCodeSetup),
  block.paragraph('breakpoints.helpers.list.title'),
  block.table(columnsHelpersTypes, tableDataHelpersTypes),

  block.subtitle('breakpoints.class.title'),
  block.paragraph('breakpoints.class.about'),
  block.code(bodyClassCode),

  block.subtitle('breakpoints.configuring.title'),
  block.paragraph('breakpoints.configuring.about'),
  block.code(configCode),
]

export default config
