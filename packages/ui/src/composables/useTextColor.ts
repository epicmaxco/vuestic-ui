import { computed, getCurrentInstance, Ref, unref } from 'vue'
import { useColors } from '../services/color-config/color-config'

export const useTextColor = (componentColor: string | Ref<string>, isTransparent: boolean | Ref<boolean> = false) => {
  const { props } = getCurrentInstance()!
  const { getColor, getTextColor } = useColors()

  const textColorComputed = computed(() => {
    const hexColor = getColor(unref(componentColor))
    const textColorProp = props.textColor as string

    if (unref(isTransparent)) {
      return hexColor
    }

    return props.textColor ? getColor(textColorProp) : getColor(getTextColor(hexColor))
  })

  return { textColorComputed }
}
