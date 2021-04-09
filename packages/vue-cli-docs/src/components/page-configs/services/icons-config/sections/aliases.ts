import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { locale } from '../../../../../helpers/I18nHelper'
import { aliasCodeExample, aliasesTransformationsExample } from '../examples'

const prefix = (text: string) => `iconsConfig.aliases.${text}`

export const config = [
  DocsHelper.subtitle(prefix('title')),
  DocsHelper.paragraph(prefix('about')),
  DocsHelper.headline(prefix('example.title')),
  DocsHelper.code(aliasCodeExample),
  DocsHelper.paragraph(prefix('example.about')),
  DocsHelper.code(aliasesTransformationsExample),
  DocsHelper.paragraph(prefix('example.explain')),
]
