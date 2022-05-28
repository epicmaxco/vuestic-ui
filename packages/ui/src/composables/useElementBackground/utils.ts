import { getWindow } from '../../utils/ssr-utils'

export type ColorArray = [number, number, number, number]

const FLOAT_NUMBERS_REGEX = /\d+(\.\d+)?/g

export const parseRGBA = (color: string): ColorArray | undefined => color
  .match(FLOAT_NUMBERS_REGEX)?.map((n) => parseFloat(n ?? 1)) as ColorArray

const window = getWindow()

export const getElementBackground = (element: HTMLElement) => {
  return window?.getComputedStyle(element).backgroundColor
}
