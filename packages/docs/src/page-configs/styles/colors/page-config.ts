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
  block.subtitle('colors.reactivity.subtitle'),
  block.paragraph('colors.reactivity.about'),
  block.paragraph('colors.reactivity.additional'),

  block.subtitle('colors.theme.title'),
  block.paragraph('colors.theme.description'),
  block.paragraph('colors.theme.autoTextColor'),
  block.example('theme', { hideTemplate: true }),
  block.example('theme-examples', { hideCode: true }),
]

export default config
