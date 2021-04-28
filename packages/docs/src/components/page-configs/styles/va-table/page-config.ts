import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('table.title'),
  DocsHelper.paragraph('table.summaryText'),

  DocsHelper.subtitle('all.examples'),

  DocsHelper.headline('table.examples.default.title'),
  DocsHelper.paragraph('table.examples.default.text'),
  DocsHelper.example('va-table/Default'),

  DocsHelper.headline('table.examples.hoverable.title'),
  DocsHelper.paragraph('table.examples.hoverable.text'),
  DocsHelper.example('va-table/Hoverable'),

  DocsHelper.headline('table.examples.striped.title'),
  DocsHelper.paragraph('table.examples.striped.text'),
  DocsHelper.example('va-table/Striped'),

  DocsHelper.headline('table.examples.clickable.title'),
  DocsHelper.paragraph('table.examples.clickable.text'),
  DocsHelper.example('va-table/Clickable'),

] as ApiDocsBlock[]
