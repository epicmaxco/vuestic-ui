import { Ref, ref, watch } from 'vue'
import { useResizeObserver } from '../../../composables'

const makeTextElement = (textarea: HTMLTextAreaElement) => {
  const div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.top = '0'
  div.style.left = '0'
  div.style.width = 'auto'
  const { font } = window.getComputedStyle(textarea)
  div.style.font = font
  div.textContent = 'Vuestic'
  div.style.zIndex = '-1'
  div.style.pointerEvents = 'none'
  div.style.opacity = '0'
  div.ariaHidden = 'true'
  div.innerText = textarea.value

  return div
}

/**
 * Used to get textarea textHeight. Uses resizeObserver and fake div, because
 * font family may be loaded after the component is mounted.
 */
export const useTextHeight = (textarea: Ref<HTMLTextAreaElement | undefined>, text: Ref<string | number>) => {
  const textElement = ref<HTMLElement>()
  const textHeight = ref<number>()

  watch(textarea, (el) => {
    if (el) {
      textElement.value = makeTextElement(el)
      textarea.value?.parentElement?.appendChild(textElement.value)
    }
  })

  useResizeObserver(textElement, (newElement) => {
    if (!newElement || !textarea.value) { return }

    textHeight.value = newElement[0].contentRect.height
  })

  watch(text, (newText) => {
    if (!textElement.value) { return }
    textElement.value.innerText = String(newText)
    // Add space to correctly handle new lines with br
    textElement.value.innerHTML += '&nbsp;;'
  })

  return textHeight
}
