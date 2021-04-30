import { DocsHelper } from '../../../../../helpers/DocsHelper'

const t = (text: string) => `sidebarItem.examples.active.${text}`

export default DocsHelper.exampleBlock(
  t('title'),
  t('text'),
  'va-sidebar-item/Active',
)
