import { onMounted, onBeforeUnmount, ref } from 'vue'

function getTargetElement (target: Element | string | null) {
  if (!target) {
    throw new Error('Cant find target')
  }

  return typeof target === 'string' ? document.querySelector(target) : target
}

/** @deprecated */
export function setupScroll (target: Element | string, onScrollCallback: (e: Event) => void) {
  const scrollRoot = ref(null)
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
