import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('grid.title'),
  block.paragraph('grid.summaryText'),

  block.headline('grid.examples.default.title'),
  block.example('Default'),

  block.headline('grid.examples.breakpoints.title'),
  block.paragraph('grid.examples.breakpoints.text'),
  block.paragraph('grid.examples.breakpoints.sizes.xs'),
  block.paragraph('grid.examples.breakpoints.sizes.sm'),
  block.paragraph('grid.examples.breakpoints.sizes.md'),
  block.paragraph('grid.examples.breakpoints.sizes.lg'),
  block.paragraph('grid.examples.breakpoints.sizes.xl'),
  block.example('Breakpoints'),

  block.headline('grid.examples.offsets.title'),
  block.paragraph('grid.examples.offsets.text'),
  block.paragraph('grid.examples.offsets.sizes.xs'),
  block.paragraph('grid.examples.offsets.sizes.sm'),
  block.paragraph('grid.examples.offsets.sizes.md'),
  block.paragraph('grid.examples.offsets.sizes.lg'),
  block.paragraph('grid.examples.offsets.sizes.xl'),
  block.example('Offsets'),

  block.headline('grid.examples.gutters.title'),
  block.paragraph('grid.examples.gutters.text'),
  block.paragraph('grid.examples.gutters.sizes.xs'),
  block.paragraph('grid.examples.gutters.sizes.sm'),
  block.paragraph('grid.examples.gutters.sizes.md'),
  block.paragraph('grid.examples.gutters.sizes.lg'),
  block.paragraph('grid.examples.gutters.sizes.xl'),
  block.example('Gutters'),

  block.subtitle('all.api'),
  block.headline('grid.api.align.title'),
  block.paragraph('grid.api.align.variants[0]'),
  block.paragraph('grid.api.align.variants[1]'),
  block.paragraph('grid.api.align.variants[2]'),
  block.paragraph('grid.api.align.variants[3]'),

  block.headline('grid.api.alignSelf.title'),
  block.paragraph('grid.api.alignSelf.variants[0]'),
  block.paragraph('grid.api.alignSelf.variants[1]'),
  block.paragraph('grid.api.alignSelf.variants[2]'),
  block.paragraph('grid.api.alignSelf.variants[3]'),

  block.headline('grid.api.alignContent.title'),
  block.paragraph('grid.api.alignContent.variants[0]'),
  block.paragraph('grid.api.alignContent.variants[1]'),
  block.paragraph('grid.api.alignContent.variants[2]'),
  block.paragraph('grid.api.alignContent.variants[3]'),
  block.paragraph('grid.api.alignContent.variants[4]'),

  block.headline('grid.api.justify.title'),
  block.paragraph('grid.api.justify.variants[0]'),
  block.paragraph('grid.api.justify.variants[1]'),
  block.paragraph('grid.api.justify.variants[2]'),
  block.paragraph('grid.api.justify.variants[3]'),
  block.paragraph('grid.api.justify.variants[4]'),

  block.headline('grid.api.justifySelf.title'),
  block.paragraph('grid.api.justifySelf.variants[0]'),
  block.paragraph('grid.api.justifySelf.variants[1]'),
  block.paragraph('grid.api.justifySelf.variants[2]'),
  block.paragraph('grid.api.justifySelf.variants[3]'),
]

export default config
