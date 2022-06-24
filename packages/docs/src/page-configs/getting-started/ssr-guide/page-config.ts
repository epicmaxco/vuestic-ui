import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import * as code from './code-examples'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('ssrGuide.title'),
  block.paragraph('ssrGuide.description'),

  block.subtitle('ssrGuide.cssVariables.title'),
  block.paragraph('ssrGuide.cssVariables.description'),
  block.code(code.cssVariables),

  block.subtitle('ssrGuide.solutions.title'),
  block.paragraph('ssrGuide.solutions.description'),

  block.link('ssrGuide.solutions.nuxt', '/en/getting-started/nuxt'),

  block.headline('ssrGuide.solutions.viteSsrPlugin.title'),
  block.paragraph('ssrGuide.solutions.viteSsrPlugin.description'),
  block.code(code.viteSsrPlugin),
  block.headline('ssrGuide.solutions.vitesse.title'),
  block.paragraph('ssrGuide.solutions.vitesse.description'),
  block.code(code.vitesse),
]

export default config
