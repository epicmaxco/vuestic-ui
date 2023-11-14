import type { Ref } from 'vue'
import type { CssColor } from '../composables/useColors'
import { useTextColor } from './useTextColor'

const isRefString = (r: any): r is Ref<string> => typeof r?.value === 'string'

/**
 * Returns text color based on element background.
 *
 * If string (CSS color) provided will use it as background color.
 *
 * If element not provided current instance element will be used.
 */
export const useElementTextColor = (background: Ref<CssColor | undefined> | CssColor) => {
  const { textColorComputed } = useTextColor(background)
  return textColorComputed
}
