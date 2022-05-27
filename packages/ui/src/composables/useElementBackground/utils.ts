import { isCSSVariable, isColor } from './../../services/color-config/color-functions'
export type ColorArray = [number, number, number, number]

const FLOAT_NUMBERS_REGEX = /\d+(\.\d+)?/g

export const parseRGBA = (color: string): ColorArray | undefined => color
  .match(FLOAT_NUMBERS_REGEX)?.map((n) => parseFloat(n ?? 1)) as ColorArray

export const getElementBackground = (element: HTMLElement) => {
  const bg = element.style.backgroundColor || element.style.background

  if (isCSSVariable(bg) || isColor(bg)) { return bg }

  return undefined
}
