import { computed, Ref, ComputedRef, getCurrentInstance } from 'vue'

import { useColors } from '../../../composables'
import { isServer } from '../../../utils/ssr'

import { ButtonPropsTypes } from '../types'

type ButtonTextColorStyles = {
  color: string
  background?: string
  opacity?: number
  'background-clip'?: 'text',
  '-webkit-background-clip'?: 'text',
}

type UseButtonTextColor = (
  textColorComputed: Ref<string>,
  colorComputed: Ref<string>,
  isPressed: Ref<boolean>,
  isHovered: Ref<boolean>,
) => ComputedRef<ButtonTextColorStyles>

/*
* Inverts opacity depending on browser (webkit/chromium)
* TODO: Check if Safari <16 version will be less then 1% and remove function
*
* @param {number} opacity - Opacity value
* @returns {number} Inverted opacity value
* */
const getOpacity = (opacity: number): number => {
  if (isServer()) { return opacity }

  if (opacity > 0) {
    const userAgent = window?.navigator?.userAgent
    const isSafari = userAgent && /^((?!chrome|android).)*safari/i.test(window?.navigator?.userAgent)
    const isLatestSafari = userAgent && /(version.)15|16/i.test(window?.navigator?.userAgent)

    if (isSafari && !isLatestSafari) {
      return opacity < 1 ? 1 - opacity : opacity
    }
  }

  return opacity
}

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
    color: textColorComputed.value,
    '-webkit-background-clip': 'text',
    'background-clip': 'text',
    opacity: getPlainTextOpacity.value,
  }))

  const getStateColor = (maskColor: string, stateOpacity: number, stateBehavior: string) => {
    const maskStateColor = getColor(maskColor)
    let stateStyles: Partial<ButtonTextColorStyles>

    if (stateBehavior === 'opacity') {
      stateStyles = { color: colorToRgba(textColorComputed.value, stateOpacity) }
    } else {
      stateStyles = {
        background: getStateMaskGradientBackground(colorComputed.value, maskStateColor, stateOpacity),
        color: stateOpacity < 1 ? colorToRgba(textColorComputed.value, getOpacity(stateOpacity)) : maskStateColor,
      }
    }

    return { ...plainColorStyles.value, ...stateStyles }
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
