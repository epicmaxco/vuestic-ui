import { ArrayElementType } from '../../utils/types/array'

export { defaultSizes as sizes, DefaultSizes as Sizes } from '../../composables'

export const variables = [
  'position',
  'overflow',
  'width',
  'height',
  'overlayTransition',
  'size',
  'fontSize',
] as const

export type Variables = ArrayElementType<typeof variables>
