import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const path = 'styles/va-table'
const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('table.title'),
  block.paragraph('table.summaryText'),

  block.subtitle('all.examples'),

  block.headline('table.examples.default.title'),
  block.paragraph('table.examples.default.text'),
  block.example('Default'),

  block.headline('table.examples.hoverable.title'),
  block.paragraph('table.examples.hoverable.text'),
  block.example('Hoverable'),

  block.headline('table.examples.striped.title'),
  block.paragraph('table.examples.striped.text'),
  block.example('Striped'),

  block.headline('table.examples.clickable.title'),
  block.paragraph('table.examples.clickable.text'),
  block.example('Clickable'),
]

export default config
