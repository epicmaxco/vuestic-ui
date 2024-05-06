import { ArrayElementType } from '../../utils/types/array'
import { defaultSizes } from '../../composables'

export const variables = [] as const

export type Variables = ArrayElementType<typeof variables>

export const sizes = [
  ...defaultSizes,
  'auto',
] as const

export type Sizes = ArrayElementType<typeof sizes>
