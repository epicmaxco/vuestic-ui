import { computed, onBeforeUnmount, onMounted, shallowReactive } from 'vue'
import { generateUniqueId } from '../utils/uuid'

const createInstance = () => {
  return generateUniqueId()
}

const zIndexStack = shallowReactive<ReturnType<typeof createInstance>[]>([])

export const useZIndex = () => {
  const instance = createInstance()

  const register = () => {
    if (zIndexStack.includes(instance)) {
      return
    }
    zIndexStack.push(instance)
  }

  const unregister = () => {
    const index = zIndexStack.findIndex((item) => item === instance)
    if (index !== -1) {
      zIndexStack.splice(index, 1)
    }
  }

  const zIndex = computed(() => {
    const index = zIndexStack.findIndex((item) => item === instance)

    if (index === -1) { return -1 }

    return index + 1
  })

  const isTop = computed(() => zIndex.value === zIndexStack.length - 1)
  const isLowest = computed(() => zIndex.value === 0)

  return {
    zIndex,
    isTop,
    isLowest,
    register,
    unregister,
  }
}
