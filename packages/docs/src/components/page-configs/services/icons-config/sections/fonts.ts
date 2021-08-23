import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { fontCodeExample, fontTransformationsExample } from '../examples'

export const config = [
  // Fonts
  DocsHelper.subtitle('iconsConfig.fonts.title'),
  DocsHelper.paragraph('iconsConfig.fonts.about'),

  // FontNamePattern
  DocsHelper.headline('iconsConfig.fonts.fontNamePattern.title'),
  DocsHelper.paragraph('iconsConfig.fonts.fontNamePattern.about'),
  DocsHelper.example('icons-config/font'),

  // Example
  DocsHelper.headline('iconsConfig.fonts.example.title'),
  DocsHelper.paragraph('iconsConfig.fonts.example.about'),
  DocsHelper.code(fontCodeExample),
  DocsHelper.paragraph('iconsConfig.fonts.example.explain'),
  DocsHelper.code(fontTransformationsExample),

  DocsHelper.link('iconsConfig.fonts.advancedFontsUsage', '/services/global-config', { preText: 'iconsConfig.fonts.readMore' }),
]
