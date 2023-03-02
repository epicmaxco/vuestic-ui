import { computed, Ref, ComputedRef, getCurrentInstance } from 'vue'

import { colorToRgba, useColors } from '../../../composables'

import type { ButtonPropsTypes } from '../types'

type UseButtonBackground = (
  colorComputed: Ref<string>,
  ) => {
  backgroundColor: string;
  hoverBackgroundColor: string;
  pressedBackgroundColor: string;
}

export const useButtonBackground: UseButtonBackground = (
  colorComputed,
) => {
  const instance = getCurrentInstance()
  if (!instance) { throw new Error('`useButtonBackground` hook must be used only inside of setup function!') }
  const props = instance.props as Required<ButtonPropsTypes>

  const { getColor, getGradientBackground } = useColors()

  if (props.plain) {
    return {
      backgroundColor: 'transparent',
      hoverBackgroundColor: 'transparent',
      pressedBackgroundColor: 'transparent',
    }
  }

  const background = props.gradient ? getGradientBackground(colorComputed.value) : colorComputed.value

  const getBackgroundWithOpacity = (background: string, opacity: number) => {
    return props.gradient ? background : colorToRgba(background === 'transparent' ? '#FFFFFF' : background, opacity)
  }

  const backgroundColor = getBackgroundWithOpacity(background, props.backgroundOpacity)

  const hoverBackgroundColor = () => {
    const opacity = props.hoverBehavior === 'opacity' ? props.hoverOpacity : props.backgroundOpacity
    const color = props.hoverBehavior === 'mask' ? getColor(props.hoverMaskColor) : background
    console.log(props.hoverBehavior, background, opacity, color)
    return getBackgroundWithOpacity(color, opacity)
  }

  const pressedBackgroundColor = () => {
    const opacity = props.pressedBehavior === 'opacity' ? props.pressedOpacity : props.backgroundOpacity
    const color = props.pressedBehavior === 'mask' ? getColor(props.pressedMaskColor) : background
    return getBackgroundWithOpacity(color, opacity)
  }

  return {
    backgroundColor,
    hoverBackgroundColor: hoverBackgroundColor(),
    pressedBackgroundColor: pressedBackgroundColor(),
  }
}
