import { PropType, computed, Ref, unref } from 'vue'
import { useColors } from '../services/color-config/color-config'

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

/** @deprecated Use useColors instead */
export function useColor (props: any) {
  const { getColor } = useColors()

  const colorComputed = computed(() => {
    return getColor(props.color)
  })

  /** @deprecated */
  const computeColor = (prop?: string, defaultColor?: string) => {
    return getColor(prop, defaultColor)
  }

  return {
    theme: { getColor },
    colorComputed,
    computeColor,
  }
}

export { useColors } from '../services/color-config/color-config'
