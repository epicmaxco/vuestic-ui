import { computed, getCurrentInstance, Ref, unref } from 'vue'

import { isColorTransparent, useColors } from './useColors'

type PropsType = {
  textColor: string,
  color?: string
}

/**
 * @param componentColor component color. By default `props.color`. If undefined passed in ref, `currentColor` will be returned.
 * @param isTransparent if transparent will return component color as text color.
 * @returns Computed text color based on component's color if `props.textColor` if provided.
 */
export const useTextColor = (componentColor?: Ref<string | undefined> | string | undefined, isTransparent: boolean | Ref<boolean> = false) => {
  const { props } = getCurrentInstance() as unknown as { props: PropsType }
  const { getColor, getTextColor } = useColors()

  const textColorComputed = computed(() => {
    if (props.textColor) { return getColor(props.textColor) }

    const bg = componentColor ? unref(componentColor) : props.color

    if (!bg) { return 'currentColor' }

    const componentColorHex = getColor(bg)

    if (isColorTransparent(componentColorHex)) { return 'currentColor' }

    return unref(isTransparent) ? componentColorHex : getColor(getTextColor(componentColorHex))
  })

  return { textColorComputed }
}
