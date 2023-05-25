import { useDomChangesObserver } from './useDomChangesObserver'
import { getElementBackground } from './utils'
import { ref, Ref, onMounted } from 'vue'
import { applyColors, useColors } from '../useColors'
import { useEl } from '../useEl'
import { useCache } from '../useCache'

type Maybe<T> = T | null | undefined
type Cache = Map<HTMLElement, string>

const isTransparent = (color: string) => color === 'rgba(0, 0, 0, 0)'

const withCache = (cb: (element: HTMLElement, cache: Cache) => string) => {
  return (element: Maybe<HTMLElement>, cache: Cache) => {
    if (!element) { return '#fff' }
    if (cache.has(element)) { return cache.get(element)! }
    cache.set(element, cb(element, cache))
    return cache.get(element)!
  }
}

/** Can be null before component is mounted */
export const useElementBackground = (element?: Ref<HTMLElement | undefined>) => {
  const el = element || useEl()
  const { getColor } = useColors()
  const background = ref(getColor('background-primary'))

  const { bgTempCache: tempCache } = useCache()

  const recursiveGetBackground = withCache((element, cache): string => {
    if (!element) { return '#fff' } // Likely doesn't have a color, so let's just return white
    if (element.nodeType !== Node.ELEMENT_NODE) { return recursiveGetBackground(element.parentElement, cache) }

    const bg = getElementBackground(element)

    if (!bg) { return recursiveGetBackground(element.parentElement, cache) }

    if (isTransparent(bg)) {
      return recursiveGetBackground(element.parentElement, cache)
    }

    return applyColors(recursiveGetBackground(element.parentElement, cache), bg)
  })

  const updateBackground = (cache: Cache = tempCache) => {
    background.value = recursiveGetBackground(el.value, cache)
  }

  useDomChangesObserver(updateBackground, el)

  onMounted(updateBackground)

  return {
    background,
  }
}
