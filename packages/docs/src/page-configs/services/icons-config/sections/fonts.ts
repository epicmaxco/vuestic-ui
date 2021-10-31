import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { fontCodeExample, fontTransformationsExample } from '../code-examples'

const block = new PageGenerationHelper(__dirname)

export const config: ApiDocsBlock[] = [
  block.subtitle('iconsConfig.fonts.title'),
  block.paragraph('iconsConfig.fonts.about'),

  block.headline('iconsConfig.fonts.fontNamePattern.title'),
  block.paragraph('iconsConfig.fonts.fontNamePattern.about'),
  block.example('font'),

  block.headline('iconsConfig.fonts.example.title'),
  block.paragraph('iconsConfig.fonts.example.about'),
  block.code(fontCodeExample),
  block.paragraph('iconsConfig.fonts.example.explain'),
  block.code(fontTransformationsExample),

  block.link(
    'iconsConfig.fonts.advancedFontsUsage',
    '/services/global-config',
    { preText: 'iconsConfig.fonts.readMore' },
  ),
]
