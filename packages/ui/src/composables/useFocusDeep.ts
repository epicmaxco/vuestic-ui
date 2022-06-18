import { onMounted, onBeforeUnmount, ref, getCurrentInstance, onUpdated, computed, nextTick } from 'vue'

const useCaptureEvent = (event: string, cb: (...args: any[]) => void) => {
  onMounted(() => {
    window.addEventListener(event, cb, true)
    cb()
  })
  onBeforeUnmount(() => {
    window.removeEventListener(event, cb)
  })
}

const useActiveElement = () => {
  const activeEl = ref<HTMLElement>()

  const onFocus = () => {
    activeEl.value = document.activeElement as HTMLElement
  }

  useCaptureEvent('focus', onFocus)
  useCaptureEvent('blur', onFocus)

  return activeEl
}

const useCurrentElement = () => {
  const vm = getCurrentInstance()!
  const el = ref<HTMLElement>()
  onMounted(() => { el.value = vm.proxy!.$el })
  onUpdated(() => { el.value = vm.proxy!.$el })

  return el
}

export const useFocusDeep = () => {
  const focused = useActiveElement()
  const current = useCurrentElement()

  return computed({
    get () {
      if (!focused.value) { return false }
      if (focused.value === current.value) { return true }
      return current.value?.contains(focused.value)
    },
    set (value) {
      if (value) {
        current.value?.focus()
      } else {
        current.value?.blur()
      }
    },
  })
}
