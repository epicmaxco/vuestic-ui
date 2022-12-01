import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

import { installationObject, packageCommands, configuringVuesticFull, configuringVuesticPartial, configExample } from './code-examples'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('grid.title'),
  block.paragraph('grid.summaryText'),

  block.alert('grid.deprecated', 'primary'),

  block.headline('grid.features.integration.title'),
  block.paragraph('grid.features.integration.text'),

  block.paragraph('grid.features.integration.instructionIntro'),

  block.paragraph('grid.features.integration.instruction[0]'),
  block.code(installationObject, 'bash'),

  block.paragraph('grid.features.integration.instruction[1]'),
  block.code(packageCommands),

  block.paragraph('grid.features.integration.instruction[2]'),
  block.code(configuringVuesticFull),

  block.paragraph('grid.features.integration.instruction[3]'),
  block.code(configuringVuesticPartial),

  block.paragraph('grid.features.integration.instruction[4]'),
  block.code(configExample),
]

export default config
