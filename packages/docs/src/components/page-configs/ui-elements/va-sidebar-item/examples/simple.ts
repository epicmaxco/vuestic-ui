import { DocsHelper } from '../../../../../helpers/DocsHelper'

const t = (text: string) => `sidebarItem.examples.simple.${text}`

export default DocsHelper.exampleBlock(
  t('title'),
  t('text'),
  'va-sidebar-item/Simple',
)
