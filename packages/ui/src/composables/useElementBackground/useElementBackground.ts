import { useInterval } from './useInterval'
import { ColorArray, parseRGBA, getElementBackground } from './utils'
import { ref, getCurrentInstance, watch, Ref, onMounted } from 'vue'
import { useTempMap } from './useTempMap'
import { appyColors, useColors } from '../useColors'

type Maybe<T> = T | null | undefined

const isTransparent = (color: string) => color === 'rgba(0, 0, 0, 0)'
const tempCache = useTempMap<HTMLElement, string>(100)

const recursiveGetBackground = (element: Maybe<HTMLElement>): string => {
  if (!element) { return '#fff' } // Likely doesn't have a color, so let's just return white
  if (element.nodeType !== Node.ELEMENT_NODE) { return recursiveGetBackground(element.parentElement) }

  if (tempCache.get(element)) { return tempCache.get(element) }

  const bg = getElementBackground(element)

  if (!bg) { return recursiveGetBackground(element.parentElement) }

  if (isTransparent(bg)) {
    const parentBg = recursiveGetBackground(element.parentElement)
    tempCache.set(element, parentBg)
    return parentBg
  }

  return appyColors(recursiveGetBackground(element.parentElement), bg)
}

/** Can be null before component is mounted */
export const useElementBackground = (element?: Ref<HTMLElement | undefined>) => {
  const { proxy } = getCurrentInstance()!
  const getEl = (): HTMLElement => element?.value || proxy?.$el
  const { getColor } = useColors()
  const background = ref(getColor('background'))

  const updateBackground = () => {
    const bg = recursiveGetBackground(getEl())
    background.value = bg
  }

  useInterval(updateBackground)

  return {
    background,
  }
}
