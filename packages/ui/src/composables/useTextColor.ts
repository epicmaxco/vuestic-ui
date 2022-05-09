import { computed, getCurrentInstance, Ref, unref } from 'vue'
import { useColors } from '../services/color-config/color-config'

export const useTextColor = (background: string | Ref<string>) => {
  const { props } = getCurrentInstance()!
  const { getColor, getTextColor } = useColors()
  const textColor = computed(() => props.textColor ? getColor(props.textColor as string) : getTextColor(unref(background)))

  return { textColor }
}
