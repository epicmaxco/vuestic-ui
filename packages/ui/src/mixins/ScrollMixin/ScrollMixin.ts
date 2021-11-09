import { onMounted, onBeforeUnmount, ref } from 'vue'

function getTargetElement (target: Element | string | null) {
  if (!target) {
    throw new Error('Cant find target')
  }

  if (typeof target === 'string') {
    const targetElement = document.querySelector(target)
    if (targetElement) {
      return targetElement
    }
    return null
  }

  return target as Element
}

export function setupScroll (target: Element | string, onScrollCallback: (e?: any) => unknown) {
  const root = ref(null)
  let targetElement: Element | null

  onMounted(() => {
    targetElement = getTargetElement(target || root.value)
    if (targetElement) {
      targetElement.addEventListener('scroll', onScrollCallback)
    }
  })

  onBeforeUnmount(() => {
    if (targetElement) {
      targetElement.removeEventListener('scroll', onScrollCallback)
    }
  })

  return root
}
