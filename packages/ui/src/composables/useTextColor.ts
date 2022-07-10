import { computed, getCurrentInstance, Ref, unref } from 'vue'

import { useColors } from './useColors'

type PropsType = {
  textColor: string,
  color?: string
}

/**
 * @param componentColor component color. By default `props.color`.
 * @param isTransparent if transparent will return component color as text color.
 * @returns Computed text color based on component's color if `props.textColor` if provided.
 */
export const useTextColor = (componentColor?: Ref<string> | undefined, isTransparent: boolean | Ref<boolean> = false) => {
  const { props } = getCurrentInstance() as unknown as { props: PropsType }
  const { getColor, getTextColor } = useColors()

  const textColorComputed = computed(() => {
    if (props.textColor) { return getColor(props.textColor) }

    const componentColorHex = getColor(unref(componentColor) || props.color)
    return unref(isTransparent) ? componentColorHex : getColor(getTextColor(componentColorHex))
  })

  return { textColorComputed }
}
