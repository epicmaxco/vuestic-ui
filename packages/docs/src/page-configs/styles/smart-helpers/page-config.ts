import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('smartHelpers.title'),
  block.paragraph('smartHelpers.summaryText'),

  block.headline('smartHelpers.examples.gutters.title'),
  block.paragraph('smartHelpers.examples.gutters.text'),
  block.paragraph('smartHelpers.examples.gutters.sizes.xs'),
  block.paragraph('smartHelpers.examples.gutters.sizes.sm'),
  block.paragraph('smartHelpers.examples.gutters.sizes.md'),
  block.paragraph('smartHelpers.examples.gutters.sizes.lg'),
  block.paragraph('smartHelpers.examples.gutters.sizes.xl'),
  block.example('Gutters'),

  block.headline('smartHelpers.examples.spacing.title'),
  block.paragraph('smartHelpers.examples.spacing.text'),
  block.paragraph('smartHelpers.examples.spacing.sizes.xs'),
  block.paragraph('smartHelpers.examples.spacing.sizes.sm'),
  block.paragraph('smartHelpers.examples.spacing.sizes.md'),
  block.paragraph('smartHelpers.examples.spacing.sizes.lg'),
  block.paragraph('smartHelpers.examples.spacing.sizes.xl'),
  block.example('Spacing'),
]

export default config
