import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { locale } from '../../../../../helpers/I18nHelper'
import { setupCodeExample } from '../examples'

const prefix = (text: string) => `iconsConfig.setup.${text}`

export const config = [
  DocsHelper.subtitle(prefix('title')),
  DocsHelper.paragraph(prefix('about')),
  DocsHelper.code(setupCodeExample),
]
