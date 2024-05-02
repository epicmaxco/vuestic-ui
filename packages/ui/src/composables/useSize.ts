import { PropType } from 'vue'
import { SizesConfig, SizeValue } from '../services/component-config/theme'
import { ArrayElementType } from '../utils/types/array'

export const defaultSizes = [
  'small',
  'medium',
  'large',
] as const

export type DefaultSizes = ArrayElementType<typeof defaultSizes>

/**
 * You could add these props to any component by destructuring them inside props option.
 * @example
 * props: { ...useSizeProps, componentsOwnProp, etc. }
 * It's better to add props at the beginning, to make sure that Component own props will be used instead in case of collision
 */
export const useSizeProps = <Variables extends string, SizeName extends string>(defaultSize?: SizeName) => ({
  size: {
    type: [String, Number] as PropType<SizeValue<SizeName>>,
    validator: (size: string | number) => {
      return typeof size === 'string' || typeof size === 'number'
    },
    default: defaultSize,
  },

  sizesConfig: {
    type: Object as PropType<SizesConfig<Variables, SizeName>>,
  },
})
