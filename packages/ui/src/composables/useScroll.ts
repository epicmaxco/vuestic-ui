import { onMounted, onBeforeUnmount, shallowRef } from 'vue'

/** @deprecated */
function getTargetElement (target: HTMLElement | string | undefined) {
  if (!target) {
    throw new Error('Cant find target')
  }

  return typeof target === 'string' ? document.querySelector(target) as HTMLElement : target
}

export function setupScroll (target: HTMLElement | string, onScrollCallback: (e: Event) => void) {
  const scrollRoot = shallowRef<HTMLElement>()
  let targetElement: HTMLElement | null

  onMounted(() => {
    targetElement = getTargetElement(target || scrollRoot.value)
    targetElement?.addEventListener('scroll', onScrollCallback)
  })

  onBeforeUnmount(() => {
    targetElement?.removeEventListener('scroll', onScrollCallback)
  })

  return scrollRoot
}
