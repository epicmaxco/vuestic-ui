import { computed, getCurrentInstance, Ref, unref } from 'vue'
import { useColors } from '../services/color-config/color-config'

export const useTextColor = (background: string | Ref<string>, isTransparent: boolean | Ref<boolean> = false) => {
  const { props } = getCurrentInstance()!
  const { getColor, getTextColor } = useColors()
  const textColorComputed = computed(() => {
    if (unref(isTransparent)) {
      return 'background'
    }
    return props.textColor ? getColor(props.textColor as string) : getTextColor(getColor(unref(background)))
  })

  return { textColorComputed }
}
