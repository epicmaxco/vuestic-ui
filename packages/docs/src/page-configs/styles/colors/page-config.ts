import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { scheme } from './code-examples'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('colors.title'),
  block.paragraph('colors.description'),
  block.example('CustomAlert'),
  block.subtitle('colors.syntax.title'),
  block.paragraph('colors.syntax.description'),
  block.code(scheme),
  block.paragraph('colors.syntax.colorsUsed'),
  block.subtitle('colors.defaultColorThemes.title'),
  block.paragraph('colors.defaultColorThemes.description'),
  block.example('DefaultColors', { hideCode: true }),
  block.subtitle('colors.reactivity.subtitle'),
  block.paragraph('colors.reactivity.about'),
  block.paragraph('colors.reactivity.additional'),

  block.subtitle('colors.theme'),
  block.paragraph('colors.theme.auto-text-color'),
  block.example('theme'),
  block.example('theme-examples', { hideCode: true }),
]

export default config
