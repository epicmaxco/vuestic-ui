import { computed, Ref, ComputedRef } from 'vue'
import {
  colorToRgba,
  getGradientBackground,
  getStateMaskGradientBackground,
} from '../../../services/color-config/color-functions'

import { ButtonPropsTypes } from '../types'

type UseButtonBackground = (
  props: ButtonPropsTypes,
  colorComputed: Ref<string>,
  isPressed: Ref<boolean>,
  isHovered: Ref<boolean>,
  isTransparentBg: Ref<boolean>,
  ) => ComputedRef<{ background: string }>

export const useButtonBackground: UseButtonBackground = (
  props,
  colorComputed,
  isPressed,
  isHovered,
  isTransparentBg,
) => {
  const isGradientBg = computed(() => props.gradient && props.backgroundOpacity === 1)

  const backgroundColorComputed = computed(() => (
    // may be we should change this to useElementBackground hook later
    isGradientBg.value
      ? getGradientBackground(colorComputed.value)
      : colorComputed.value
  ))

  const getOpacityStateBackground = (stateOpacity = 1) => ({
    background: isGradientBg.value
      ? backgroundColorComputed.value
      : colorToRgba(backgroundColorComputed.value, stateOpacity),
  })

  const defaultBackground = computed(() => ({ ...getOpacityStateBackground(props.backgroundOpacity) }))

  const getStateBackground = (maskColor: string, stateOpacity: number, stateBehaviour: string) => {
    if (stateBehaviour === 'opacity') { return { ...getOpacityStateBackground(stateOpacity) } }

    return { background: getStateMaskGradientBackground(colorComputed.value, maskColor, stateOpacity) }
  }

  const hoverBackgroundComputed = computed(() => {
    return getStateBackground(props.hoverMaskColor as string, props.hoverOpacity as number, props.hoverBehaviour as string)
  })

  const pressedBackgroundComputed = computed(() => {
    return getStateBackground(props.pressedMaskColor as string, props.pressedOpacity as number, props.pressedBehaviour as string)
  })

  return computed(() => {
    if (isTransparentBg.value) { return { background: 'transparent' } }
    if (isPressed.value) { return pressedBackgroundComputed.value }
    if (isHovered.value) { return hoverBackgroundComputed.value }

    return defaultBackground.value
  })
}
