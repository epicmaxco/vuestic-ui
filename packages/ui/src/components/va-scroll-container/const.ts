import { ArrayElementType } from '../../utils/types/array'
export { defaultSizes as sizes, DefaultSizes as Sizes } from '../../composables'

export const variables = [
  'scrollbarGradientTo',
  'scrollbarSize',
] as const

export type Variables = ArrayElementType<typeof variables>
