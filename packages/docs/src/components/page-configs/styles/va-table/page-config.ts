import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

const configPath = 'styles/va-table'
const config: ApiDocsBlock[] = [
  DocsHelper.title('table.title'),
  DocsHelper.paragraph('table.summaryText'),

  DocsHelper.subtitle('all.examples'),

  DocsHelper.headline('table.examples.default.title'),
  DocsHelper.paragraph('table.examples.default.text'),
  DocsHelper.example(configPath, 'Default'),

  DocsHelper.headline('table.examples.hoverable.title'),
  DocsHelper.paragraph('table.examples.hoverable.text'),
  DocsHelper.example(configPath, 'Hoverable'),

  DocsHelper.headline('table.examples.striped.title'),
  DocsHelper.paragraph('table.examples.striped.text'),
  DocsHelper.example(configPath, 'Striped'),

  DocsHelper.headline('table.examples.clickable.title'),
  DocsHelper.paragraph('table.examples.clickable.text'),
  DocsHelper.example(configPath, 'Clickable'),
]

export default config
