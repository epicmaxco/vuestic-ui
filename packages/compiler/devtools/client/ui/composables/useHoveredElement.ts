import { onBeforeMount, onMounted, ref, watch } from "vue"
import { useTargetElementStore } from "../store/useTargetElementStore"
import { PREFIX } from "../../../shared/CONST"

export const useHoveredElement = () => {
  const { targetElement: selectedElement } = useTargetElementStore()

  const hoveredElement = ref<HTMLElement | null>(null)

  const elementHasPaddings = (el: HTMLElement) => {
    const style = window.getComputedStyle(el)
    const paddings = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'] as const
    return paddings.some((padding) => parseInt(style[padding]) > 0)
  }

  const onMouseMove = (event: MouseEvent) => {
    const elementsUnderPointer = document.elementsFromPoint(event.x, event.y)
        .filter((el) => {
          if (!(el instanceof HTMLElement)) {
            return false
          }

          return PREFIX in el.dataset
        })
        .reverse()

    if (elementsUnderPointer.length === 0) {
      hoveredElement.value = null
      return
    }

    const clickedElement = elementsUnderPointer.find((el) => {
      if (el.contains(selectedElement.value)) {
        return false
      }

      // TODO: Check if element is HTML element
      const hasPaddings = elementHasPaddings(el as HTMLElement)

      if (hasPaddings) {
        return false
      }

      return true
    }) ?? elementsUnderPointer[elementsUnderPointer.length - 1]

    hoveredElement.value = clickedElement as HTMLElement
  }

  onMounted(() => {
    window.addEventListener('mousemove', onMouseMove, { capture: true })
  })

  onBeforeMount(() => {
    window.removeEventListener('mousemove', onMouseMove, { capture: true })
  })

  return hoveredElement
}
