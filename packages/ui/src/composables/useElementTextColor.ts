import type { Ref } from 'vue'
import type { CssColor } from '../composables/useColors'
import { useElementBackground } from './useElementBackground'
import { useTextColor } from './useTextColor'

const isRefString = (r: any): r is Ref<string> => typeof r?.value === 'string'

/**
 * Returns text color based on element background.
 *
 * If HTMLElement provided will take element background counting opacity.
 *
 * If string (CSS color) provided will use it as background color.
 *
 * If element not provided current instance element will be used.
 */
export const useElementTextColor = (background?: Ref<HTMLElement | CssColor | undefined> | CssColor) => {
  if (isRefString(background) || typeof background === 'string') {
    const { textColorComputed } = useTextColor(background)
    return textColorComputed
  }

  const { background: elBg } = useElementBackground(background as Ref<HTMLElement | undefined>)
  const { textColorComputed } = useTextColor(elBg)
  return textColorComputed
}
