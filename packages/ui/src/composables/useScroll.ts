import { onMounted, onBeforeUnmount, shallowRef } from 'vue'

/** @deprecated */
function getTargetElement (target: Element | string | undefined) {
  if (!target) {
    throw new Error('Cant find target')
  }

  return typeof target === 'string' ? document.querySelector(target) : target
}

export function setupScroll (target: Element | string, onScrollCallback: (e: Event) => void) {
  const scrollRoot = shallowRef<HTMLElement>()
  let targetElement: Element | null

  onMounted(() => {
    targetElement = getTargetElement(target || scrollRoot.value)
    targetElement?.addEventListener('scroll', onScrollCallback)
  })

  onBeforeUnmount(() => {
    targetElement?.removeEventListener('scroll', onScrollCallback)
  })

  return scrollRoot
}
