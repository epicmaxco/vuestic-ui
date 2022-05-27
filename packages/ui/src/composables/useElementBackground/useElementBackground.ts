import { ColorArray, parseRGBA, getElementBackground } from './utils'
import { ref, getCurrentInstance, watch, Ref, onMounted } from 'vue'
import { useDomChangesObserver } from './useDomChangesObserver'
import { useTempMap } from './useTempMap'
import { useColors } from '../../services/color-config/color-config'

type Maybe<T> = T | null | undefined

const WHITE_COLOR_ARRAY: ColorArray = [255, 255, 255, 1]
const ALPHA_ARRAY_INDEX = 3

const rgba2hex = (rgba: number[]) => `#${rgba.map((n: number, i: number) => (i === 3 ? Math.round(n * 255) : n).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

const isTransparent = (color: string) => color === 'rgba(0, 0, 0, 0)'

const mixColors = (color1Array: ColorArray, color2Array: ColorArray, weight: number) => {
  const newColor = []

  for (let i = 0; i < 4; i++) {
    newColor.push(Math.round((color1Array[i]) * (1 - weight) + (color2Array[i]) * weight))
  }

  return newColor as ColorArray
}

const tempCache = useTempMap<HTMLElement, ColorArray>(100)

const recursiveGetBackground = (element: Maybe<HTMLElement>): ColorArray => {
  if (!element) { return WHITE_COLOR_ARRAY } // Likely doesn't have a color, so let's just return white
  if (element.nodeType !== Node.ELEMENT_NODE) { return recursiveGetBackground(element.parentElement) }

  // if (tempCache.get(element)) { return tempCache.get(element) }

  const bg = getElementBackground(element)

  if (!bg) { return recursiveGetBackground(element.parentElement) }

  if (isTransparent(bg)) {
    const parentBg = recursiveGetBackground(element.parentElement)
    tempCache.set(element, parentBg)
    return parentBg
  }

  const color = parseRGBA(bg)

  if (!color) {
    // It's must be impossible, because computed backgroundColor should be rgba or transparent
    console.log('Could not parse background color of', element)
    throw new Error('Vuestic unable to parse background. Maybe some parent has color set as keyword')
  }

  // Color without alpha or with alpha of 1
  if (!color[ALPHA_ARRAY_INDEX] || Number(color[ALPHA_ARRAY_INDEX]) === 1) { return color }

  // Mix current color with parent's color
  return mixColors(
    recursiveGetBackground(element.parentElement),
    color,
    color[ALPHA_ARRAY_INDEX],
  )
}

/** Can be null before component is mounted */
export const useElementBackground = (element?: Ref<HTMLElement | undefined>) => {
  const { proxy } = getCurrentInstance()!
  const getEl = (): HTMLElement => element?.value || proxy?.$el
  const { colors, getColor } = useColors()
  const background = ref(getColor('background'))

  const updateBackground = () => {
    const bg = recursiveGetBackground(getEl())
    background.value = rgba2hex(bg)
  }

  useDomChangesObserver(updateBackground, getEl)

  if (element) {
    watch(element, updateBackground)
  }

  onMounted(updateBackground)
  watch(colors, updateBackground)

  return {
    background,
  }
}
