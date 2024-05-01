import { PropType } from 'vue'
import { SizesConfig } from '../services/component-config/theme'

/**
 * You could add these props to any component by destructuring them inside props option.
 * @example
 * props: { ...useSizeProps, componentsOwnProp, etc. }
 * It's better to add props at the beginning, to make sure that Component own props will be used instead in case of collision
 */
export const useSizeProps = {
  size: {
    type: [String, Number],
    validator: (size: string | number) => {
      return typeof size === 'string' || typeof size === 'number'
    },
  },

  sizesConfig: {
    type: Object as PropType<SizesConfig<string, string>>,
  },
}
