import { useDomChangesObserver } from './useDomChangesObserver'
import { getElementBackground } from './utils'
import { ref, Ref, onMounted } from 'vue'
import { applyColors, useColors } from '../useColors'
import { useEl } from '../useEl'

type Maybe<T> = T | null | undefined

const isTransparent = (color: string) => color === 'rgba(0, 0, 0, 0)'

const recursiveGetBackground = (element: Maybe<HTMLElement>): string => {
  if (!element) { return '#fff' } // Likely doesn't have a color, so let's just return white
  if (element.nodeType !== Node.ELEMENT_NODE) { return recursiveGetBackground(element.parentElement) }

  const bg = getElementBackground(element)

  if (!bg) { return recursiveGetBackground(element.parentElement) }

  if (isTransparent(bg)) {
    const parentBg = recursiveGetBackground(element.parentElement)
    return parentBg
  }

  return applyColors(recursiveGetBackground(element.parentElement), bg)
}

/** Can be null before component is mounted */
export const useElementBackground = (element?: Ref<HTMLElement | undefined>) => {
  const el = element || useEl()
  const { getColor } = useColors()
  const background = ref(getColor('background-primary'))

  const updateBackground = () => {
    requestAnimationFrame(() => {
      const bg = recursiveGetBackground(el.value)
      background.value = bg
    })
  }

  useDomChangesObserver(updateBackground, el)

  onMounted(updateBackground)

  return {
    background,
  }
}
