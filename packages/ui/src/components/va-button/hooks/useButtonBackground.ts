import { computed, Ref, ComputedRef, getCurrentInstance } from 'vue'

import { useColors } from '../../../composables'

import type { ButtonPropsTypes } from '../types'

type UseButtonBackground = (
  colorComputed: Ref<string>,
  isPressed: Ref<boolean>,
  isHovered: Ref<boolean>,
  ) => {
  backgroundMaskOpacity: ComputedRef<number>;
  backgroundMaskColor: ComputedRef<string>;
  backgroundColor: ComputedRef<string>;
  backgroundColorOpacity: ComputedRef<number>;
}

export const useButtonBackground: UseButtonBackground = (
  color,
  isPressed,
  isHovered,
) => {
  const instance = getCurrentInstance()
  if (!instance) { throw new Error('`useButtonBackground` hook must be used only inside of setup function!') }
  const props = instance.props as Required<ButtonPropsTypes>

  const { getColor, getGradientBackground } = useColors()

  const colorRaw = computed(() => {
    return getColor(color.value)
  })

  const backgroundColor = computed(() => {
    if (props.plain) { return 'transparent' }

    return props.gradient
      ? getGradientBackground(colorRaw.value)
      : colorRaw.value
  })

  const hoveredBgState = computed(() => !props.plain && isHovered.value)
  const pressedBgState = computed(() => !props.plain && isPressed.value)

  const backgroundColorOpacity = computed(() => {
    if (pressedBgState.value && props.pressedBehavior === 'opacity') { return props.pressedOpacity }
    if (hoveredBgState.value && props.hoverBehavior === 'opacity') { return Number(props.hoverOpacity) }

    return Number(props.backgroundOpacity)
  })

  const hoveredMaskState = computed(() => hoveredBgState.value && props.hoverBehavior === 'mask')
  const pressedMaskState = computed(() => pressedBgState.value && props.pressedBehavior === 'mask')

  const backgroundMaskOpacity = computed(() => {
    if (pressedMaskState.value) { return props.pressedOpacity }
    if (hoveredMaskState.value) { return Number(props.hoverOpacity) }

    return 0
  })
  const backgroundMaskColor = computed(() => {
    if (pressedMaskState.value) { return getColor(props.pressedMaskColor) }
    if (hoveredMaskState.value) { return getColor(props.hoverMaskColor) }

    return 'transparent'
  })

  return {
    backgroundColor,
    backgroundColorOpacity,
    backgroundMaskOpacity,
    backgroundMaskColor,
  }
}
