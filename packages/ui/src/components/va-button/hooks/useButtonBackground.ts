import { computed, Ref, ComputedRef, getCurrentInstance } from 'vue'

import { useColors } from '../../../composables'

import { ButtonPropsTypes } from '../types'

type UseButtonBackground = (
  colorComputed: Ref<string>,
  isPressed: Ref<boolean>,
  isHovered: Ref<boolean>,
  ) => ComputedRef<{ background: string }>

export const useButtonBackground: UseButtonBackground = (
  colorComputed,
  isPressed,
  isHovered,
) => {
  const instance = getCurrentInstance()
  if (!instance) { throw new Error('`useButtonBackground` hook must be used only inside of setup function!') }

  const props = instance.props as Required<ButtonPropsTypes>

  const { getColor, colorToRgba, getGradientBackground, getStateMaskGradientBackground } = useColors()

  const isGradientBg = computed(() => props.gradient && props.backgroundOpacity === 1)

  const backgroundColorComputed = computed(() => (
    // may be we should change this to useElementBackground hook later
    isGradientBg.value
      ? getGradientBackground(colorComputed.value)
      : colorComputed.value
  ))

  const getOpacityStateBackground = (stateOpacity: number) => ({
    background: isGradientBg.value
      ? backgroundColorComputed.value
      : colorToRgba(backgroundColorComputed.value, stateOpacity),
  })

  const defaultBackground = computed(() => ({ ...getOpacityStateBackground(props.backgroundOpacity) }))

  const getStateBackground = (maskColor: string, stateOpacity: number, stateBehaviour: string) => {
    if (stateBehaviour === 'opacity') { return { ...getOpacityStateBackground(stateOpacity) } }

    const maskStateColor = getColor(maskColor)
    return { background: getStateMaskGradientBackground(colorComputed.value, maskStateColor, stateOpacity) }
  }

  const hoverBackgroundComputed = computed(() => {
    return getStateBackground(props.hoverMaskColor, props.hoverOpacity, props.hoverBehaviour)
  })

  const pressedBackgroundComputed = computed(() => {
    return getStateBackground(props.pressedMaskColor, props.pressedOpacity, props.pressedBehaviour)
  })

  return computed(() => {
    if (props.plain) { return { background: 'transparent' } }
    if (isPressed.value) { return pressedBackgroundComputed.value }
    if (isHovered.value) { return hoverBackgroundComputed.value }

    return defaultBackground.value
  })
}
