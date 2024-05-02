import { ArrayElementType } from '../../utils/types/array'
export { defaultSizes as sizes, DefaultSizes as Sizes } from '../../composables'

export const variables = [
  'display',
  'justifyContent',
  'alignItems',
  'backgroundImage',
  'boxShadow',
  'borderWidth',
  'borderColor',
  'borderStyle',
  'fontWeight',
  'transition',
  'padding',
  'cursor',
  'size',
  'contentPy',
  'contentPx',
  'onlyIconContentPx',
  'fontSize',
  'letterSpacing',
  'lineHeight',
  'borderRadius',
  'iconsSpacing',
  'iconSidePadding',
  'borderedBorder',
  'borderedStyle',
] as const

export type Variables = ArrayElementType<typeof variables>
