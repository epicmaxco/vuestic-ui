import { ArrayElementType } from '../../utils/types/array'
export { defaultSizes as sizes, DefaultSizes as Sizes } from '../../composables'

const variables = [
  'display',
  'numberItemMargin',
  'numberItemFontWeight',
  'numberItemCursor',
  'numberItemSize',
  'itemWrapperCursor',
  'fontSize',
  'borderRadius',
  'fontWeight',
  'margin',
] as const

export type Variables = ArrayElementType<typeof variables>
