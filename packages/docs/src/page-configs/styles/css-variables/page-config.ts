import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { overriding } from './code-examples/overriding'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('cssVariables.title'),
  block.paragraph('cssVariables.description'),

  block.component('convention'),

  block.list([
    'cssVariables.convention.list[0]',
    'cssVariables.convention.list[1]',
  ]),
  block.alert('cssVariables.convention.notice', 'info'),

  ...block.exampleBlock(
    'cssVariables.examples.profile.title',
    'cssVariables.examples.profile.description',
    'profile',
    { forceShowCode: true, hideTemplate: true },
  ),

  block.headline('cssVariables.overriding.title'),
  block.paragraph('cssVariables.overriding.description'),
  block.code(overriding, 'scss'),
  block.component('global-overriding'),
]

export default config
