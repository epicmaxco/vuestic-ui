import { computed, getCurrentInstance, Ref, unref } from 'vue'
import { useColors } from '../services/color-config/color-config'

export const useTextColor = (componentColor: string | Ref<string>, isTransparent: boolean | Ref<boolean> = false) => {
  const { props } = getCurrentInstance()!
  const { getColor, getTextColor } = useColors()

  const textColorComputed = computed(() => {
    const textColorProp = props.textColor as string

    if (textColorProp) { return getColor(textColorProp) }
    const componentColorHex = getColor(unref(componentColor))

    return unref(isTransparent) ? componentColorHex : getColor(getTextColor(componentColorHex))
  })

  return { textColorComputed }
}
