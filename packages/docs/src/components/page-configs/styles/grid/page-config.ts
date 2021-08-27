import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

const config: ApiDocsBlock[] = [
  DocsHelper.title('grid.title'),
  DocsHelper.paragraph('grid.summaryText'),

  DocsHelper.headline('grid.examples.default.title'),
  DocsHelper.example('grid/Default'),

  DocsHelper.headline('grid.examples.breakpoints.title'),
  DocsHelper.paragraph('grid.examples.breakpoints.text'),
  DocsHelper.paragraph('grid.examples.breakpoints.sizes.xs'),
  DocsHelper.paragraph('grid.examples.breakpoints.sizes.sm'),
  DocsHelper.paragraph('grid.examples.breakpoints.sizes.md'),
  DocsHelper.paragraph('grid.examples.breakpoints.sizes.lg'),
  DocsHelper.paragraph('grid.examples.breakpoints.sizes.xl'),
  DocsHelper.example('grid/Breakpoints'),

  DocsHelper.headline('grid.examples.offsets.title'),
  DocsHelper.paragraph('grid.examples.offsets.text'),
  DocsHelper.paragraph('grid.examples.offsets.sizes.xs'),
  DocsHelper.paragraph('grid.examples.offsets.sizes.sm'),
  DocsHelper.paragraph('grid.examples.offsets.sizes.md'),
  DocsHelper.paragraph('grid.examples.offsets.sizes.lg'),
  DocsHelper.paragraph('grid.examples.offsets.sizes.xl'),
  DocsHelper.example('grid/Offsets'),

  DocsHelper.headline('grid.examples.gutters.title'),
  DocsHelper.paragraph('grid.examples.gutters.text'),
  DocsHelper.paragraph('grid.examples.gutters.sizes.xs'),
  DocsHelper.paragraph('grid.examples.gutters.sizes.sm'),
  DocsHelper.paragraph('grid.examples.gutters.sizes.md'),
  DocsHelper.paragraph('grid.examples.gutters.sizes.lg'),
  DocsHelper.paragraph('grid.examples.gutters.sizes.xl'),
  DocsHelper.example('grid/Gutters'),

  DocsHelper.subtitle('all.api'),
  DocsHelper.headline('grid.api.align.title'),
  DocsHelper.paragraph('grid.api.align.variants[0]'),
  DocsHelper.paragraph('grid.api.align.variants[1]'),
  DocsHelper.paragraph('grid.api.align.variants[2]'),
  DocsHelper.paragraph('grid.api.align.variants[3]'),

  DocsHelper.headline('grid.api.alignSelf.title'),
  DocsHelper.paragraph('grid.api.alignSelf.variants[0]'),
  DocsHelper.paragraph('grid.api.alignSelf.variants[1]'),
  DocsHelper.paragraph('grid.api.alignSelf.variants[2]'),
  DocsHelper.paragraph('grid.api.alignSelf.variants[3]'),

  DocsHelper.headline('grid.api.alignContent.title'),
  DocsHelper.paragraph('grid.api.alignContent.variants[0]'),
  DocsHelper.paragraph('grid.api.alignContent.variants[1]'),
  DocsHelper.paragraph('grid.api.alignContent.variants[2]'),
  DocsHelper.paragraph('grid.api.alignContent.variants[3]'),
  DocsHelper.paragraph('grid.api.alignContent.variants[4]'),

  DocsHelper.headline('grid.api.justify.title'),
  DocsHelper.paragraph('grid.api.justify.variants[0]'),
  DocsHelper.paragraph('grid.api.justify.variants[1]'),
  DocsHelper.paragraph('grid.api.justify.variants[2]'),
  DocsHelper.paragraph('grid.api.justify.variants[3]'),
  DocsHelper.paragraph('grid.api.justify.variants[4]'),

  DocsHelper.headline('grid.api.justifySelf.title'),
  DocsHelper.paragraph('grid.api.justifySelf.variants[0]'),
  DocsHelper.paragraph('grid.api.justifySelf.variants[1]'),
  DocsHelper.paragraph('grid.api.justifySelf.variants[2]'),
  DocsHelper.paragraph('grid.api.justifySelf.variants[3]'),
]

export default config
