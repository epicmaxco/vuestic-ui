import { ArrayElementType } from '../../utils/types/array'
export { defaultSizes as sizes, DefaultSizes as Sizes } from '../../composables'

export const variables = [
  'display',
  'justifyContent',
  'alignItems',
  'textAlign',
  'verticalAlign',
  'position',
  'lineHeight',
  'borderRadius',
  'size',
  'fontSize',
] as const

export type Variables = ArrayElementType<typeof variables>
