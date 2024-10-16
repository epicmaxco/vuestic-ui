import { Ref, onBeforeUnmount, onMounted, ref } from 'vue'

export const useElementRect = (element: Ref<HTMLElement | null>) => {
  const rect = ref({ top: 0, left: 0, width: 0, height: 0, bottom: 0, right: 0 }) satisfies Ref<{
    top: number
    left: number
    width: number
    height: number
    bottom: number
    right: number
  }>

  let resizeObserver: ResizeObserver | undefined
  let mutationObserver: MutationObserver | undefined

  const updateRect = () => {
    if (element.value) {
      rect.value = element.value.getBoundingClientRect()
    }
  }

  onMounted(() => {
    resizeObserver = new ResizeObserver(updateRect)
    mutationObserver = new MutationObserver(updateRect)

    element.value && resizeObserver.observe(element.value)
    element.value && mutationObserver.observe(element.value, { attributes: true, childList: true, subtree: true })

    window.addEventListener('resize', updateRect)
    window.addEventListener('scroll', updateRect)

    updateRect()
  })

  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    mutationObserver?.disconnect()

    window.removeEventListener('resize', updateRect)
    window.removeEventListener('scroll', updateRect)

    resizeObserver = undefined
    mutationObserver = undefined
  })

  return rect
}
