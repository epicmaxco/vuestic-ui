import { PropType, computed, Ref, unref } from 'vue'
import { getColor } from '../services/color-config/color-config'

/**
 * You could add these props to any component by destructuring them inside props option.
 * @example
 * props: { ...useColorProps, componentsOwnProp, etc. }
 * It's better to add props at the beginning, to make sure that Component own props will be used instead in case of collision
 */
export const useColorProps = {
  color: {
    type: String as PropType<string>,
    default: '',
  },
}

export function useColor (props: any) {
  const hasColorTheme = true
  const theme = { getColor }

  const colorComputed = computed(() => {
    return theme.getColor(props.color)
  })

  const computeColor = (prop?: string, defaultColor?: string) => {
    return theme.getColor(prop, defaultColor)
  }

  return {
    hasColorTheme,
    theme,
    colorComputed,
    computeColor,
  }
}

export const useComputedColor = (color: Ref<string> | string) => {
  return computed(() => getColor(unref(color)))
}

export { useColors } from '../services/color-config/color-config'
