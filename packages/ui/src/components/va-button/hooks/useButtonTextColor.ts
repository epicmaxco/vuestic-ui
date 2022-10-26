import { computed, Ref, ComputedRef, getCurrentInstance } from 'vue'

import { useColors } from '../../../composables'

import { ButtonPropsTypes } from '../types'

type UseButtonTextColor = (
  textColorComputed: Ref<string>,
  colorComputed: Ref<string>,
  isPressed: Ref<boolean>,
  isHovered: Ref<boolean>,
) => ComputedRef<{
  color: string
  background?: string
  opacity?: number
  'background-clip'?: 'text',
  '-webkit-background-clip'?: 'text',
}>

export const useButtonTextColor: UseButtonTextColor = (
  textColorComputed,
  colorComputed,
  isPressed,
  isHovered,
) => {
  const instance = getCurrentInstance()
  if (!instance) { throw new Error('`useButtonTextColor` hook must be used only inside of setup function!') }

  const props = instance.props as Required<ButtonPropsTypes>

  const { getColor, colorToRgba, getStateMaskGradientBackground } = useColors()

  const plainColorStyles = computed(() => ({
    background: 'transparent',
    color: 'transparent',
    '-webkit-background-clip': 'text',
    'background-clip': 'text',
    opacity: getPlainTextOpacity.value,
  }))

  const getStateColor = (maskColor: string, stateOpacity: number, stateBehavior: string) => {
    const maskStateColor = getColor(maskColor)

    const res = stateBehavior === 'opacity'
      ? { color: colorToRgba(textColorComputed.value, stateOpacity) }
      : { background: getStateMaskGradientBackground(colorComputed.value, maskStateColor, stateOpacity) }
    return { ...plainColorStyles.value, ...res }
  }

  const hoverTextColorComputed = computed(() => {
    return getStateColor(props.hoverMaskColor, props.hoverOpacity, props.hoverBehavior)
  })

  const pressedTextColorComputed = computed(() => {
    return getStateColor(props.pressedMaskColor, props.pressedOpacity, props.pressedBehavior)
  })

  const getPlainTextOpacity = computed(() => {
    if (props.disabled) { return undefined }
    if (props.textOpacity === 1 || (isHovered.value && !isPressed.value)) { return 1 }
    return isPressed.value ? 0.9 : props.textOpacity
  })

  return computed(() => {
    const defaultColorStyles = {
      color: textColorComputed.value,
      background: 'transparent',
    }

    props.plain && Object.assign(defaultColorStyles, plainColorStyles.value, { background: textColorComputed.value })

    if (!props.plain) { return defaultColorStyles }
    if (isPressed.value) { return pressedTextColorComputed.value }
    if (isHovered.value) { return hoverTextColorComputed.value }
    return defaultColorStyles
  })
}
