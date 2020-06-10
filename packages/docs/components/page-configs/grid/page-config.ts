import { BlockType, ApiDocsBlock } from '../../../types/configTypes'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'grid.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'grid.summaryText',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'grid.examples.default.title',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'grid/Default',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'grid.examples.breakpoints.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'grid.examples.breakpoints.text',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'grid.examples.breakpoints.sizes.xs',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'grid.examples.breakpoints.sizes.sm',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'grid.examples.breakpoints.sizes.md',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'grid.examples.breakpoints.sizes.lg',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'grid.examples.breakpoints.sizes.xl',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'grid/Breakpoints',
  },
  {
    type: BlockType.HEADLINE,
    translationString: 'grid.examples.offsets.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'grid.examples.offsets.text',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'grid.examples.offsets.sizes.xs',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'grid.examples.offsets.sizes.sm',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'grid.examples.offsets.sizes.md',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'grid.examples.offsets.sizes.lg',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'grid.examples.offsets.sizes.xl',
  },
  {
    type: BlockType.EXAMPLE,
    component: 'grid/Offsets',
  },
] as ApiDocsBlock[]
