import { Ref, computed, onBeforeUnmount, onMounted, shallowReactive, watch } from 'vue'
import { generateUniqueId } from '../utils/uuid'

const createInstance = () => {
  return generateUniqueId()
}

const zIndexStack = shallowReactive<ReturnType<typeof createInstance>[]>([])

export const useZIndex = (isVisible: Ref<boolean>) => {
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

  onMounted(() => {
    if (isVisible.value) {
      register()
    }
  })

  onBeforeUnmount(() => {
    unregister()
  })

  watch(isVisible, (value) => {
    if (value) {
      register()
    } else {
      unregister()
    }
  })

  return {
    zIndex,
    isTop,
    isLowest,
    register,
    unregister,
  }
}
