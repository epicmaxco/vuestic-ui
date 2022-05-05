import { watch, ref, getCurrentInstance, Ref, onMounted, onBeforeUnmount } from 'vue'

type Maybe<T> = T | null | undefined

const WHITE_COLOR_ARRAY = [255, 255, 255, 1]
const ALPHA_ARRAY_INDEX = 3

const rgba2hex = (rgba: number[]) => `#${rgba.map((n: number, i: number) => (i === 3 ? Math.round(n * 255) : n).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

const isTransparent = (color: string) => color === 'transparent' || color === 'rgba(0, 0, 0, 0)'

const rgba = (color: string) => color
  .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
  ?.slice(1)
  .map((n) => parseFloat(n))
  .filter((n) => !Number.isNaN(n))

const mixColors = (color1Array: number[], color2Array: number[], weight: number) => {
  return color1Array.map((n, i) => Math.round(n * (1 - weight) + color2Array[i] * weight))
}

const recursiveGetBackground = (element: Maybe<HTMLElement>): number[] => {
  if (!element) { return WHITE_COLOR_ARRAY } // Likely doesn't have a color, so let's just return white
  if (element.nodeType !== Node.ELEMENT_NODE) { return recursiveGetBackground(element.parentElement) }

  const style = window.getComputedStyle(element)
  let bg = style.backgroundColor

  if (bg === 'currentColor') { bg = style.color }

  if (isTransparent(bg)) {
    return recursiveGetBackground(element.parentElement)
  }

  const color = rgba(bg)

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
  const background = ref<null | string>(null)
  let observer: MutationObserver | null = null

  const observe = () => {
    if (observer) {
      observer.disconnect()
    }

    observer = new MutationObserver(() => {
      background.value = rgba2hex(recursiveGetBackground(element?.value || proxy?.$el))
    })

    // TODO: not sure how to handle if element parents are changed.
    observer.observe(window.document, {
      attributeFilter: ['style', 'class'],
      subtree: true,
      attributes: true,
    })

    background.value = rgba2hex(recursiveGetBackground(element?.value || proxy?.$el))
  }

  onMounted(() => observe())
  onBeforeUnmount(() => observer?.disconnect())

  return {
    background,
  }
}
