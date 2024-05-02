import { ArrayElementType } from '../../utils/types/array'
export { defaultSizes as sizes, DefaultSizes as Sizes } from '../../composables'

export const variables = [
  'verticalAlign',
  'userSelect',
  'size',
] as const

export type Variables = ArrayElementType<typeof variables>
