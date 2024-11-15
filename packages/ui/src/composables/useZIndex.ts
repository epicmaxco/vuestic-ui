import { Ref, computed, onBeforeUnmount, onMounted, watch } from 'vue'
import { useAppGlobal, useComponentUuid } from './'

/**
 * A composable function to manage the z-index of a component within a stack. Used to prevent incorrect z-index stacking for floating components.
 */
export const useZIndex = (isVisible: Ref<boolean>) => {
  const instance = useComponentUuid()

  const zIndexStack = useAppGlobal('zIndexStack', [] as string[])

  const register = () => {
    if (zIndexStack.value.includes(instance)) {
      return
    }
    zIndexStack.value.push(instance)
  }

  const unregister = () => {
    const index = zIndexStack.value.findIndex((item) => item === instance)
    if (index !== -1) {
      zIndexStack.value.splice(index, 1)
    }
  }

  const zIndex = computed(() => {
    const index = zIndexStack.value.findIndex((item) => item === instance)

    return index === -1 ? -1 : index + 1
  })

  const isTop = computed(() => zIndex.value === zIndexStack.value.length - 1)
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
  }
}
