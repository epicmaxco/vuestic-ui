import debounce from 'lodash/debounce.js'

export const useBreakpoint = () => {
  const sm = ref(false)

  const smScreenSize = 768

  const onResize = () => {
    if (typeof window === 'undefined') { return }

    sm.value = window.innerWidth <= smScreenSize
  }

  const onResizeDebounce = debounce(onResize, 500)
  onMounted(() => window.addEventListener('resize', onResizeDebounce))
  onBeforeMount(() => window.removeEventListener('resize', onResizeDebounce))
  
  onResize()

  return {
    sm
  }
}