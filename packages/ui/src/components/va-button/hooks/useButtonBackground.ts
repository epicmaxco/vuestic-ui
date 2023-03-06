import { Ref, getCurrentInstance } from 'vue'

import { colorToRgba, getGradientBackgroundWithOpacity, useColors } from '../../../composables'

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

  const { getColor } = useColors()

  if (props.plain) {
    return {
      backgroundColor: 'transparent',
      hoverBackgroundColor: 'transparent',
      pressedBackgroundColor: 'transparent',
    }
  }

  const getBackgroundWithOpacity = (background: string, opacity: number) => {
    return props.gradient ? getGradientBackgroundWithOpacity(background, opacity) : colorToRgba(background === 'transparent' ? '#FFFFFF' : background, opacity)
  }

  const backgroundColor = getBackgroundWithOpacity(colorComputed.value, props.backgroundOpacity)

  const hoverBackgroundColor = () => {
    const opacity = props.hoverBehavior === 'opacity' ? props.hoverOpacity : props.backgroundOpacity
    const color = props.hoverBehavior === 'mask' ? getColor(props.hoverMaskColor) : colorComputed.value
    return getBackgroundWithOpacity(color, opacity)
  }

  const pressedBackgroundColor = () => {
    const opacity = props.pressedBehavior === 'opacity' ? props.pressedOpacity : props.backgroundOpacity
    const color = props.pressedBehavior === 'mask' ? getColor(props.pressedMaskColor) : colorComputed.value
    return getBackgroundWithOpacity(color, opacity)
  }

  return {
    backgroundColor,
    hoverBackgroundColor: hoverBackgroundColor(),
    pressedBackgroundColor: pressedBackgroundColor(),
  }
}
