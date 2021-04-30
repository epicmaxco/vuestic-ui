import { DocsHelper } from '../../../../../helpers/DocsHelper'

const t = (text: string) => `sidebarItem.examples.components.${text}`

export default DocsHelper.exampleBlock(
  t('title'),
  t('text'),
  'va-sidebar-item/Components',
)
