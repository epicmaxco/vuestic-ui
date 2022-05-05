import { watch, ref, getCurrentInstance, Ref, onMounted, onBeforeUnmount } from 'vue'

type Maybe<T> = T | null | undefined

const rgba2hex = (rgba: string) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)!.slice(1).map((n: string, i: number) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`

const recursiveGetBackground = (element: Maybe<HTMLElement>): string => {
  if (!element) { return '#fff' } // Likely document doesn't have a color, so let's just return white

  const bg = window.getComputedStyle(element).backgroundColor

  if (bg && !bg.includes('rgba(0, 0, 0, 0)')) {
    return rgba2hex(bg)
  }

  return recursiveGetBackground(element.parentElement)
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
      background.value = recursiveGetBackground(element?.value || proxy?.$el)
    })

    // TODO: not sure how to handle if element parents are changed.
    observer.observe(window.document, {
      attributeFilter: ['style', 'class'],
      childList: true,
    })

    background.value = recursiveGetBackground(element?.value || proxy?.$el)
  }

  onMounted(() => observe())
  onBeforeUnmount(() => observer?.disconnect())

  return {
    background,
  }
}
