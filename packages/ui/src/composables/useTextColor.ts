import { computed, getCurrentInstance, Ref, unref } from 'vue'
import { useColors } from '../services/color-config/color-config'

export const useTextColor = (componentColor: string | Ref<string>, isTransparent: boolean | Ref<boolean> = false) => {
  const { props } = getCurrentInstance()!
  const { getColor, getTextColor } = useColors()
  const textColorComputed = computed(() => {
    if (unref(isTransparent)) {
      return getColor(unref(componentColor))
    }
    return props.textColor ? getColor(props.textColor as string) : getColor(getTextColor(getColor(unref(componentColor))))
  })

  return { textColorComputed }
}
