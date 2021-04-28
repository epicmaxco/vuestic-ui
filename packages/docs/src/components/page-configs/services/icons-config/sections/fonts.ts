import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { locale } from '../../../../../helpers/I18nHelper'
import { fontCodeExample, fontTransformationsExample } from '../examples'

const prefix = (text: string) => `iconsConfig.fonts.${text}`
const example = (text: string) => prefix(`example.${text}`)

export const config = [
  // Fonts
  DocsHelper.subtitle(prefix('title')),
  DocsHelper.paragraph(prefix('about')),

  // FontNamePattern
  DocsHelper.headline(prefix('fontNamePattern.title')),
  DocsHelper.paragraph(prefix('fontNamePattern.about')),
  DocsHelper.example('icons-config/font'),

  // Example
  DocsHelper.headline(example('title')),
  DocsHelper.paragraph(example('about')),
  DocsHelper.code(fontCodeExample),
  DocsHelper.paragraph(example('explain')),
  DocsHelper.code(fontTransformationsExample),

  DocsHelper.link(prefix('advancedFontsUsage'), `/${locale}/services/global-config`, { preText: prefix('readMore') }),
]
