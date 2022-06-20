import { computed, Ref, ComputedRef } from 'vue'
import {
  colorToRgba,
  getStateMaskGradientBackground,
} from '../../../services/color-config/color-functions'
import { useColors } from '../../../composables/useColor'

import { ButtonPropsTypes } from '../types'

type UseButtonTextColor = (
  props: ButtonPropsTypes,
  textColorComputed: Ref<string>,
  colorComputed: Ref<string>,
  isPressed: Ref<boolean>,
  isHovered: Ref<boolean>,
  isTransparentBg: Ref<boolean>,
) => ComputedRef<{
  color: string
  background?: string
  opacity?: number
  'background-clip'?: 'text',
  '-webkit-background-clip'?: 'text',
}>

export const useButtonTextColor: UseButtonTextColor = (
  props,
  textColorComputed,
  colorComputed,
  isPressed,
  isHovered,
  isTransparentBg,
) => {
  const { getColor } = useColors()

  const plainColorStyles = computed(() => ({
    color: 'transparent',
    '-webkit-background-clip': 'text',
    'background-clip': 'text',
    background: textColorComputed.value,
    opacity: getPlainTextOpacity.value,
  }))

  const getStateColor = (maskColor: string, stateOpacity: number, stateBehaviour: string) => {
    const res = stateBehaviour === 'opacity'
      ? { color: colorToRgba(textColorComputed.value, stateOpacity) }
      : { background: getStateMaskGradientBackground(colorComputed.value, maskColor, stateOpacity) }
    return { ...plainColorStyles.value, ...res }
  }

  const hoverMaskColorComputed = computed(() => getColor(props.hoverMaskColor))
  const hoverTextColorComputed = computed(() => {
    return getStateColor(hoverMaskColorComputed.value, props.hoverOpacity as number, props.hoverBehaviour as string)
  })

  const pressedMaskColorComputed = computed(() => getColor(props.pressedMaskColor))
  const pressedTextColorComputed = computed(() => {
    return getStateColor(pressedMaskColorComputed.value, props.pressedOpacity as number, props.pressedBehaviour as string)
  })

  const getPlainTextOpacity = computed(() => {
    if (props.disabled) { return undefined }
    if (props.textOpacity === 1 || (isHovered.value && !isPressed.value)) { return 1 }
    return isPressed.value ? 0.9 : props.textOpacity
  })

  return computed(() => {
    const defaultColorStyles = {
      color: textColorComputed.value,
    }

    props.plain && Object.assign(defaultColorStyles, plainColorStyles.value)

    if (!isTransparentBg.value) { return defaultColorStyles }
    if (isPressed.value) { return pressedTextColorComputed.value }
    if (isHovered.value) { return hoverTextColorComputed.value }
    return defaultColorStyles
  })
}
