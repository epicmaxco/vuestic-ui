import { computed, Ref, ComputedRef } from 'vue'
import {
  colorToRgba,
  getGradientBackground,
  getStateMaskGradientBackground,
} from '../../../services/color-config/color-functions'
import { useColors } from '../../../composables/useColor'

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
  const { getColor } = useColors()

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

  const defaultBackground = computed(() => ({ ...getOpacityStateBackground(props.backgroundOpacity as number) }))

  const getStateBackground = (maskColor: string, stateOpacity: number, stateBehaviour: string) => {
    if (stateBehaviour === 'opacity') { return { ...getOpacityStateBackground(stateOpacity) } }

    return { background: getStateMaskGradientBackground(colorComputed.value, maskColor, stateOpacity) }
  }

  const hoverMaskColorComputed = computed(() => getColor(props.hoverMaskColor))
  const hoverBackgroundComputed = computed(() => {
    return getStateBackground(hoverMaskColorComputed.value, props.hoverOpacity as number, props.hoverBehaviour as string)
  })

  const pressedMaskColorComputed = computed(() => getColor(props.pressedMaskColor))
  const pressedBackgroundComputed = computed(() => {
    return getStateBackground(pressedMaskColorComputed.value, props.pressedOpacity as number, props.pressedBehaviour as string)
  })

  return computed(() => {
    if (isTransparentBg.value) { return { background: 'transparent' } }
    if (isPressed.value) { return pressedBackgroundComputed.value }
    if (isHovered.value) { return hoverBackgroundComputed.value }

    return defaultBackground.value
  })
}
