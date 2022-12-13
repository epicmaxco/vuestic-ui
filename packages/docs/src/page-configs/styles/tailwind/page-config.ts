import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

import { installationObject, packageCommands, configuringVuesticFull, configuringVuesticPartial, configExample } from './code-examples'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('tailwind.title'),
  block.paragraph('tailwind.summaryText'),

  block.alert('tailwind.deprecated', 'primary'),

  block.headline('tailwind.features.integration.title'),
  block.paragraph('tailwind.features.integration.text'),

  block.paragraph('tailwind.features.integration.instructionIntro'),

  block.paragraph('tailwind.features.integration.instruction[0]'),
  block.code(installationObject, 'bash'),

  block.paragraph('tailwind.features.integration.instruction[1]'),
  block.code(packageCommands),

  block.paragraph('tailwind.features.integration.instruction[2]'),
  block.code(configuringVuesticFull),

  block.paragraph('tailwind.features.integration.instruction[3]'),
  block.code(configuringVuesticPartial),

  block.paragraph('tailwind.features.integration.instruction[4]'),
  block.code(configExample),
]

export default config
